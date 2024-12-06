/* jshint esversion: 8 */

class User {
  /**
   * A new user api object.
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
   * returns your own user
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  self (callback) {
    this._sendRequest('public/current-user', callback)
  }

  /**
   * returns a specific user's profile
   * @param {string} id the user id to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  get (id, callback) {
    this._doRequest(`public/users/${id}`).then(function (response) {
      if (response && response.data) callback(response.data.data)
    })
  }

  /**
   * returns self campaigns for a user
   * @param {string} id the user id to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getSelfCampaigns (id, callback) {
    this._sendRequest(`public/users/${id}/campaigns?limit=100`, callback)
  }

  /**
   * returns an both team and self campaigns for a user
   * @param {string} id the user to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getAllCampaign (id, callback) {
    this._sendRequest(`public/users/${id}/integration_campaigns`, callback)
  }

  /**
   * get teams a user is part of
   * @param {string} id the user to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getTeams (id, callback) {
    this._sendRequest(`public/users/${id}/teams`, callback)
  }
}

module.exports = User
