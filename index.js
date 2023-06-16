/* jshint esversion: 8 */
/**
 * This callback type is called `requestCallback` and is displayed as a global symbol.
 *
 * @callback requestCallback
 * @param {object} data the data returned from the endpoint
 */
const { URLSearchParams, URL } = require('url');
const axios = require('axios')
const Campaign = require('./lib/campaign')
const TeamCampaign = require('./lib/teamCampaign')
const Cause = require('./lib/cause')
const FundraisingEvents = require('./lib/fundraisingEvents')
const Team = require('./lib/team')
const User = require('./lib/user')

class TiltifyClient {
  #client_id
  #client_secret
  exp_time = new Date('1/1/1970')
  apiKey
  // Self-referential to split the subclass this and the client this... since it's not an extended class cant use 'super'
  parent = this
  
  /**
   * A TiltifyClient contains all of the sub-types that exist on the Tiltify API
   * @param {string} client_id The Client ID that you got from Tiltify.
   * @param {string} client_secret The Client Secret that you got from Tiltify.
   * @constructor
   */
  constructor (client_id, client_secret) {
    this.#client_id = client_id
    this.#client_secret = client_secret
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
  }

  /**
   * Set the API key manually, this also disables the refresh checker.
   * Primarily used for testing
   * @param {string} key API key
   */
  setKey(key) {
    this.apiKey = key
    this.exp_time = new Date('1/1/9999')
  }

  async _checkKey () {
    // Check if key is expired
    if(this.parent.exp_time.getTime() < new Date().getTime()) {
      // Regenerate
      await this.parent.generateKey()
    }
    return this.parent.apiKey
  }

  async generateKey () {
    console.log("Making new key")
    const url = `https://v5api.tiltify.com/oauth/token?client_id=${this.#client_id}&client_secret=${this.#client_secret}&grant_type=client_credentials`
    const options = {
      url,
      method: 'POST'
    }
    try {
      let payload = await axios(options)
      this.parent.apiKey = payload.data?.access_token
      this.parent.exp_time = new Date(new Date().getTime() + (payload.data?.expires_in*1000) - 5000) // Date token will have to be regenerated at, based on supplied expired time + 5s buffer
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
   * @param {string} path The path, without /api/v3/.
   */
  async _doRequest (path) {
    const key = await this.parent._checkKey()
    const url = `https://v5api.tiltify.com/api/public/${path}`
    const options = {
      url,
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json'
      }
    }
    try {
      let payload = await axios(options)
      return payload
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * _sendRequest is used for all endpoints, but only has a recursive
   * effect when called againt an endpoint that contains a `metadata.after` string
   * @param {string} path The path, without /api/public/
   * @param {function} callback A function to call when we're done processing.
   */
  async _sendRequest (path, callback) {
    let results = []
    let keepGoing = true
    while (keepGoing) {
      let response = (await this.parent._doRequest(path)).data
      if (
        response.data !== undefined &&
        response.metadata !== undefined &&
        response.metadata.after !== undefined && 
        response.metadata.after !== null
      ) {
        const url = 'https://temp.com/' + path; // Combine the base URL and path
        const urlObj = new URL(url); // Create a URL object
        urlObj.searchParams.set('after', response.metadata.after); // Set the 'after' query parameter
        const updatedPath = urlObj.pathname.replace('/','') + urlObj.search; // Get the updated path with query parameters. Remove first /
        path = updatedPath
      } else {
        keepGoing = false
      }
      results = results.concat(response.data)
      if (response.data.length === 0 || response.metadata?.after == null) {
        keepGoing = false
        callback(results)
      }
    }
  }
}
module.exports = TiltifyClient
