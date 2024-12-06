/* jshint esversion: 8 */

class FundraisingEvents {
  /**
   * A new fundraising events api object.
   * @param {object} self is `this` from index.js
   * @constructor
   */
  constructor (self) {
    this.parent = self.parent
    this._sendRequest = self._sendRequest
    this._doRequest = self._doRequest
    this._checkKey = self._checkKey
  }

  /**
   * returns info about a fundraising event
   * @param {string} id fundraising event id to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  get (id, callback) {
    this._sendRequest(`public/fundraising_events/${id}`, callback)
  }

  /**
   * returns campaigns for a fundraising event
   * @param {string} id fundraising event id to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getCampaigns (id, callback) {
    this._sendRequest(`public/fundraising_events/${id}/supporting_events?limit=100`, callback)
  }

  /**
   * returns donations for a fundraising event
   * @param {string} id fundraising event id to look up
   * @param {string} timeType Time range for leaderboard (daily, weekly, monthly, yearly, ytd, all)
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getTopDonors (id, timeType, callback) {
    this._sendRequest(`public/fundraising_events/${id}/donor_leaderboard${timeType ? '?time_type=' + timeType : ''}`, callback)
  }

  /**
   * returns leaderboards for a fundraising event
   * @param {string} id fundraising event id to look up
   * @param {string} timeType Time range for leaderboard (daily, weekly, monthly, yearly, ytd, all)
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getLeaderboards (id, timeType, callback) {
    this._sendRequest(`public/fundraising_events/${id}/user_leaderboard${timeType ? '?time_type=' + timeType : ''}`, callback)
  }
}

module.exports = FundraisingEvents
