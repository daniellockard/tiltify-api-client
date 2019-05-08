/* jshint esversion: 8 */

class User {
  /**
   * A new user api object.
   * @param {object} self is `this` from index.js
   * @constructor
   */
  constructor(self) {
    this._sendRequest = self._sendRequest;
    this._doRequest = self._doRequest;
    this.apiKey = self.apiKey;
  }
  /**
   * returns your own user
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  self(callback) {
    this._sendRequest(`user`, callback);
  }
  /**
   *
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  list(callback) {
    this._sendRequest(`users`, callback);
  }
  /**
   * returns a specific user's profile
   * @param {string} id the user id to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  get(id, callback) {
    this._sendRequest(`users/${id}`, callback);
  }
  /**
   * returns campaigns for a user
   * @param {string} id the user id to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getCampaigns(id, callback) {
    this._sendRequest(`users/${id}/campaigns`, callback);
  }
  /**
   * returns an individual campaign for a user
   * @param {string} userid the user to look up
   * @param {string} campaignid the campaign to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getCampaign(userid, campaignid, callback) {
    this._sendRequest(`users/${userid}/campaigns/${campaignid}`, callback);
  }
  /**
   * returns all teams a user owns
   * @param {string} id the user to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getOwnedTeams(id, callback) {
    this._sendRequest(`users/${id}/owned-teams`, callback);
  }
  /**
   * get teams a user is part of
   * @param {string} id the user to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getTeams(id, callback) {
    this._sendRequest(`users/${id}/teams`, callback);
  }
}

module.exports = User;
