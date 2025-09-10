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
  get (id) {
    return new Promise((resolve, reject) => {
      this._doRequest(`public/causes/${id}`).then((response) => {
        if (response && response.data) resolve(response.data.data)
      }).catch(reject)
    })
  }

  /**
   * returns top donors for a cause
   * @param {string} id cause id to look up
   * @param {string} timeType Time range for leaderboard (daily, weekly, monthly, yearly, ytd, all)
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getTopDonors (id, timeType) {
    return new Promise((resolve, reject) => {
      this._sendRequest(`public/causes/${id}/donor_leaderboard${timeType ? '?time_type' + timeType : ''}`, resolve)
    })
  }

  /**
   * returns top donors for a cause
   * @param {string} id cause id to look up
   * @param {string} timeType Time range for leaderboard (daily, weekly, monthly, yearly, ytd, all)
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getTopTeams (id, timeType) {
    return new Promise((resolve, reject) => {
      this._sendRequest(`public/causes/${id}/team_leaderboard${timeType ? '?time_type' + timeType : ''}`, resolve)
    })
  }

  /**
   * returns fundraising events for a cause
   * @param {string} id cause id to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getFundraisingEvents (id) {
    return new Promise((resolve, reject) => {
      this._sendRequest(`public/causes/${id}/fundraising_events`, resolve)
    })
  }

  /**
   * returns leaderboards for a cause
   * @param {string} id cause id to look up
   * @param {string} timeType Time range for leaderboard (daily, weekly, monthly, yearly, ytd, all)
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getLeaderboards (id, timeType) {
    return new Promise((resolve, reject) => {
      this._sendRequest(`public/causes/${id}/user_leaderboard${timeType ? '?time_type' + timeType : ''}`, resolve)
    })
  }
}

export default Cause
