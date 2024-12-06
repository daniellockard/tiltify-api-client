/* jshint esversion: 8 */
/**
 * This callback type is called `requestCallback` and is displayed as a global symbol.
 *
 * @callback requestCallback
 * @param {object} data the data returned from the endpoint
 */
const { URL } = require('url')
const axios = require('axios')
const schedule = require('node-schedule')

const Campaign = require('./lib/campaign')
const TeamCampaign = require('./lib/teamCampaign')
const Cause = require('./lib/cause')
const FundraisingEvents = require('./lib/fundraisingEvents')
const Team = require('./lib/team')
const User = require('./lib/user')
const Webhook = require('./lib/webhook')

class TiltifyClient {
  #clientID
  #clientSecret
  #schedule
  apiKey
  refreshToken
  // Self-referential to split the subclass this and the client this... since it's not an extended class cant use 'super'
  parent = this

  /**
   * A TiltifyClient contains all of the sub-types that exist on the Tiltify API
   * @param {string} clientID The Client ID that you got from Tiltify.
   * @param {string} clientSecret The Client Secret that you got from Tiltify.
   * @constructor
   */
  constructor (clientID, clientSecret) {
    this.#clientID = clientID
    this.#clientSecret = clientSecret
    /**
     * this.Campaigns is used to get info about campaigns
     * @type Campaign
     */
    this.Campaigns = new Campaign(this)
    /**
     * this.TeamCampaign is used to get info about team campaigns
     * @type TeamCampaign
     */
    this.TeamCampaigns = new TeamCampaign(this)
    /**
     * this.Causes is used to get info about causes
     * @type Cause
     */
    this.Causes = new Cause(this)
    /**
     * this.FundraisingEvents is used to get info about fundraising events
     * @type FundraisingEvents
     */
    this.FundraisingEvents = new FundraisingEvents(this)
    /**
     * this.Team is used to get info about a team
     * @type Team
     */
    this.Team = new Team(this)
    /**
     * this.User is used to get info about a user
     * @type User
     */
    this.User = new User(this)
    /**
     * this.Webhook is used to get info, subscribe, and manage webhooks
     * @type User
     */
    this.Webhook = new Webhook(this)
  }

  /**
   * Generate access key and fully initialize the client
   */
  async initialize () {
    await this.generateKey().catch(e => {
      console.error("Error authenticating with Tiltify");
    })
  }

  /**
   * Set the API key manually, this also disables the refresh checker.
   * Primarily used for testing
   * @param {string} key API key
   */
  setKey (key) {
    this.apiKey = key
    this.#schedule.cancel()
  }

  scheduleRetry (attempt) {
    // Schedule renew job to try again, recursively call this function
    const currentDate = new Date()
    const retryDate = new Date(currentDate.getTime() + 5000) // Add 5000 milliseconds (5 seconds) * attempt count
    this.#schedule = schedule.scheduleJob(retryDate, function () {
      "Retrying connection"
      this.generateKey(attempt + 1).catch(() => { })
    }.bind(this))
  }

  /**
   * Generate an access token to call the api, recursively calls itself when regenerating keys
   * @param {int} attempt Attempt counter, for spacing out retries
   */
  async generateKey (attempt = 1) {
    // console.log("Gen Key", Boolean(this.refreshToken), new Date(Date.now()));
    console.log("Authenticating Tiltify");
    const tail = this.refreshToken ? `grant_type=refresh_token&refresh_token=${this.refreshToken}` : "grant_type=client_credentials&scope=public webhooks:write"
    const url = `https://v5api.tiltify.com/oauth/token?client_id=${this.#clientID}&client_secret=${this.#clientSecret}&${tail}`
    const options = {
      url,
      method: 'POST'
    }
    try {
      const payload = await axios(options).catch(e => { this.scheduleRetry(); throw e })
      if (payload.status === 200) {
        this.apiKey = payload.data?.access_token
        this.refreshToken = payload.data?.refresh_token
        // console.log("Auth data", payload.data);
        // Only wait a quarter of time, since it expires early and I'm playing it safe
        const expDate = new Date(new Date(payload.data?.created_at).getTime() + (payload.data?.expires_in * 250) - 100) // Date token will have to be regenerated at, based on supplied expired time
        // Schedule renew job, recursively call this function
        this.#schedule = schedule.scheduleJob(expDate, function () {
          this.generateKey()
        }.bind(this))
        return this.apiKey
      } else {
        console.warn("Tiltify authentication failed, retrying");
        this.scheduleRetry(attempt);
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * _doRequest does a single request and returns the response.
   * Normally this is wrapped in _sendRequest, but for some
   * endpoints like Campaigns.getRecentDonations(id) need to send
   * only a single request. This function is not actually called in
   * the TiltifyClient, and is passed down to each of the types.
   * @param {string} path The path, without /api/.
   * @param {string} method HTTP method to make calls with, default to GET
   * @param {Object} payload JSON payload to send
   */
  async _doRequest (path, method = 'GET', payload) {
    if (!this.parent.apiKey) {
      console.error('tiltify-api-client ERROR Client has not been initalized or apiKey is missing')
      return
    }
    const url = `https://v5api.tiltify.com/api/${path}`
    const options = {
      url,
      headers: {
        Authorization: `Bearer ${this.parent.apiKey}`,
        'Content-Type': 'application/json'
      },
      method
    }
    if (payload) {
      options.data = JSON.stringify(payload)
    }
    try {
      const payload = await axios(options).catch((e) => {
        this.parent.errorParse(e, `Error sending request to ${path}:`)
        // return Promise.reject(e);
      })
      return payload
    } catch (e) {
      this.parent.errorParse(e, `Error sending request to ${path}:`);
      // this.errorParse(e, `Error sending request to ${path}:`);
      // return Promise.reject(error)
    }
  }

  /**
   * _sendRequest is used for all endpoints, but only has a recursive
   * effect when called againt an endpoint that contains a `metadata.after` string
   * @param {string} path The path, without /api/public/
   * @param {function} callback A function to call when we're done processing.
   */
  async _sendRequest (path, callback) {
    try {
      let results = []
      let keepGoing = true
      while (keepGoing) {
        const r = (await this.parent._doRequest(path).catch((e) => { throw e }))
        if (!r) break;
        const response = r.data;
        if (
          response.data !== undefined &&
          response.metadata !== undefined &&
          response.metadata.after !== undefined &&
          response.metadata.after !== null
        ) {
          const url = 'https://temp.com/' + path // Combine the base URL and path
          const urlObj = new URL(url) // Create a URL object
          urlObj.searchParams.set('after', response.metadata.after) // Set the 'after' query parameter
          const updatedPath = urlObj.pathname.replace('/', '') + urlObj.search // Get the updated path with query parameters. Remove first /
          path = updatedPath
        } else {
          keepGoing = false
        }
        results = results.concat(response.data)
        if (response.data == null || response.data.length === 0 || response.metadata?.after == null) {
          keepGoing = false
          callback(results)
        }
      }
    } catch (e) {
      this.parent.errorParse(e, `Error sending request to ${path}`);
    }
  }

  errorParse(e, msg = undefined) {
    if (msg) console.error(msg);

    if (e === undefined) console.error(e);
    else if (e.response) console.error(e.response.status, e.response.statusText);
    // else if (e.request) console.error(e.request);
    else if (e.cause) console.error(e.cause);
    else if (e.message) console.error(e.message);
    else console.error(e);
    // console.debug(e);
  }
}
module.exports = TiltifyClient
