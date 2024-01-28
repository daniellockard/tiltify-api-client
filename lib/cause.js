/* jshint esversion: 8 */

class Cause {
  /**
   * A new cause api object.
   * @param {object} self is `this` from index.js
   * @constructor
   */
  constructor(self) {
    this.parent = self.parent
    this._sendRequest = self._sendRequest
    this._doRequest = self._doRequest
    this._checkKey = self._checkKey
  }

  /**
   * returns info about a cause
   * @param {string} id cause id to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  get(id, callback) {
    this._doRequest(`public/causes/${id}`).then((response) => {
      if (response && response.data) callback(response.data.data)
    })
  }

  /**
   * returns top donors for a cause
   * @param {string} id cause id to look up
   * @param {string} timeType Time range for leaderboard (daily, weekly, monthly, yearly, ytd, all)
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getTopDonors(id, timeType, callback) {
    this._sendRequest(`public/causes/${id}/donor_leaderboard${timeType ? '?time_type' + timeType : ''}`, callback)
  }

  /**
   * returns top donors for a cause
   * @param {string} id cause id to look up
   * @param {string} timeType Time range for leaderboard (daily, weekly, monthly, yearly, ytd, all)
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getTopTeams(id, timeType, callback) {
    this._sendRequest(`public/causes/${id}/team_leaderboard${timeType ? '?time_type' + timeType : ''}`, callback)
  }

  /**
   * returns fundraising events for a cause
   * @param {string} id cause id to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getFundraisingEvents(id, callback) {
    this._sendRequest(`public/causes/${id}/fundraising_events`, callback)
  }

  /**
   * returns leaderboards for a cause
   * @param {string} id cause id to look up
   * @param {string} timeType Time range for leaderboard (daily, weekly, monthly, yearly, ytd, all)
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getLeaderboards(id, timeType, callback) {
    this._sendRequest(`public/causes/${id}/user_leaderboard${timeType ? '?time_type' + timeType : ''}`, callback)
  }
}

module.exports = Cause
