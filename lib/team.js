/* jshint esversion: 8 */

class Team {
  /**
   * A new team api object.
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
   * returns info about a team
   * @param {string} id the team id to look up
   * @param {requestCallback} callback a function to call when data is returned
   */
  get (id) {
    return new Promise((resolve, reject) => {
      this._doRequest(`public/teams/${id}`).then((response) => {
        if (response && response.data) resolve(response.data.data)
      }).catch(reject)
    })
  }

  /**
   * returns campaigns for a team
   * @param {string} id the team id to look up
   * @param {*} callback a function to call when data is returned
   */
  getCampaigns (id) {
    return new Promise((resolve, reject) => {
      this._sendRequest(`public/teams/${id}/team_campaigns`, resolve)
    })
  }

  /**
   * returns a info about a campaign attached to a team
   * @param {string} id the team id to look up
   * @param {string} callback a function to call when data is returned
   */
  getMembers (id) {
    return new Promise((resolve, reject) => {
      this._sendRequest(`public/teams/${id}/members`, resolve)
    })
  }
}

export default Team
