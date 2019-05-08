/* jshint esversion: 8 */

class Cause {
  /**
   * A new cause api object.
   * @param {object} self is `this` from index.js
   * @constructor
   */
  constructor(self) {
    this._sendRequest = self._sendRequest;
    this._doRequest = self._doRequest;
    this.apiKey = self.apiKey;
  }
  /**
   * returns info about a cause
   * @param {string} id cause id to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  get(id, callback) {
    this._sendRequest(`causes/${id}`, callback);
  }
  /**
   * returns campaigns for a cause
   * @param {string} id cause id to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getCampaigns(id, callback) {
    this._sendRequest(`causes/${id}/campaigns`, callback);
  }
  /**
   * returns donations for a cause
   * @param {string} id cause id to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getDonations(id, callback) {
    this._sendRequest(`causes/${id}/donationss`, callback);
  }
  /**
   * returns fundraising events for a cause
   * @param {string} id cause id to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getFundraisingEvents(id, callback) {
    this._sendRequest(`causes/${id}/fundraising-events`, callback);
  }
  /**
   * returns leaderboards for a cause
   * @param {string} id cause id to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getLeaderboards(id, callback) {
    this._sendRequest(`causes/${id}/leaderboards`, callback);
  }
  /**
   * returns visibility options for a cause
   * @param {string} id cause id to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getVisibilityOptions(id, callback) {
    this._sendRequest(`causes/${id}/visibility-options`, callback);
  }
  /**
   * returns permissions for a cause
   * @param {string} id cause id to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getPermissions(id, callback) {
    this._sendRequest(`causes/${id}/permissions`, callback);
  }
}

module.exports = Cause;
