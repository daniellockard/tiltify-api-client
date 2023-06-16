/* jshint esversion: 8 */

class Cause {
  /**
   * A new cause api object.
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
   * returns info about a cause
   * @param {string} id cause id to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  get (id, callback) {
    this._doRequest(`causes/${id}`).then(function(response){
      callback(response.data.data)
    })
  }

  /**
   * returns top donors for a cause
   * @param {string} id cause id to look up
   * @param {string} time_type Time range for leaderboard (daily, weekly, monthly, yearly, ytd, all)
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getTopDonors (id, time_type, callback) {
    this._sendRequest(`causes/${id}/donor_leaderboard${time_type ? "?time_type"+time_type : ''}`, callback)
  }

  /**
   * returns top donors for a cause
   * @param {string} id cause id to look up
   * @param {string} time_type Time range for leaderboard (daily, weekly, monthly, yearly, ytd, all)
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getTopTeams (id, time_type, callback) {
    this._sendRequest(`causes/${id}/team_leaderboard${time_type ? "?time_type"+time_type : ''}`, callback)
  }

  /**
   * returns fundraising events for a cause
   * @param {string} id cause id to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getFundraisingEvents (id, callback) {
    this._sendRequest(`causes/${id}/fundraising_events`, callback)
  }

  /**
   * returns leaderboards for a cause
   * @param {string} id cause id to look up
   * @param {string} time_type Time range for leaderboard (daily, weekly, monthly, yearly, ytd, all)
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getLeaderboards (id, time_type, callback) {
    this._sendRequest(`causes/${id}/user_leaderboard${time_type ? "?time_type"+time_type : ''}`, callback)
  }

}

module.exports = Cause
