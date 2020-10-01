/* jshint esversion: 8 */
/**
 * This callback type is called `requestCallback` and is displayed as a global symbol.
 *
 * @callback requestCallback
 * @param {object} data the data returned from the endpoint
 */

const request = require('request-promise')
const Campaign = require('./lib/campaign')
const Cause = require('./lib/cause')
const FundraisingEvents = require('./lib/fundraisingEvents')
const Team = require('./lib/team')
const User = require('./lib/user')

class TiltifyClient {
  /**
   * A TiltifyClient contains all of the sub-types that exist on the Tiltify API
   * @param {string} apiKey The access token that you got from Tiltify.
   * @constructor
   */
  constructor (apiKey) {
    this.apiKey = apiKey
    /**
     * this.Campaigns is used to get info about campaigns
     * @type Campaign
     */
    this.Campaigns = new Campaign(this)
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
    this.accumulatedData = []
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
    const url = `https://tiltify.com/api/v3/${path}`
    const options = {
      url: url,
      headers: {
        Authorization: `Bearer ${this.apiKey}`
      }
    }
    try {
      let payload = await request(options)
      return payload
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * _sendRequest is used for all endpoints, but only has a recursive
   * effect when called againt an endpoint that contains a `links.prev` string
   * @param {string} path The path, without /api/v3/.
   * @param {function} callback A function to call when we're done processing.
   */
  async _sendRequest (path, callback) {
    let results = []
    let keepGoing = true
    while (keepGoing) {
      let response = await this._doRequest(path)
      const parsedBody = JSON.parse(response)
      if (
        parsedBody.links !== undefined &&
        parsedBody.links.prev !== undefined
      ) {
        path = parsedBody.links.prev.replace('/api/v3/', '').replace('count=100', 'count=500')
      } else {
        keepGoing = false
        callback(parsedBody.data)
        return
      }
      results.push(parsedBody.data)
      if (parsedBody.data.length === 0) {
        keepGoing = false
        let concatResults = []
        results.forEach(block => {
          block.forEach(element => {
            concatResults.push(element)
          })
        })
        callback(concatResults)
      }
    }
  }
}
module.exports = TiltifyClient
