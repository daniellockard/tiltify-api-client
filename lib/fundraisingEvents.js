/* jshint esversion: 8 */

class FundraisingEvents {
  /**
   * A new fundraising events api object.
   * @param {object} self is `this` from index.js
   * @constructor
   */
  constructor(self) {
    this._sendRequest = self._sendRequest;
    this._doRequest = self._doRequest;
    this.apiKey = self.apiKey;
  }
  /**
   * returns a list of fundraising events
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  list(callback) {
    this._sendRequest(`fundraising-events`, callback);
  }
  /**
   * returns info about a fundraising event
   * @param {string} id fundraising event id to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  get(id, callback) {
    this._sendRequest(`fundraising-events/${id}`, callback);
  }
  /**
   * returns campaigns for a fundraising event
   * @param {string} id fundraising event id to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getCampaigns(id, callback) {
    this._sendRequest(`fundraising-events/${id}/campaigns`, callback);
  }
  /**
   * returns donations for a fundraising event
   * @param {string} id fundraising event id to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getDonations(id, callback) {
    this._sendRequest(`fundraising-events/${id}/donationss`, callback);
  }
  /**
   * returns incentives for a fundraising event
   * @param {string} id fundraising event id to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getIncentives(id, callback) {
    this._sendRequest(`fundraising-events/${id}/incentives`, callback);
  }
  /**
   * returns leaderboards for a fundraising event
   * @param {string} id fundraising event id to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getLeaderboards(id, callback) {
    this._sendRequest(`fundraising-events/${id}/leaderboards`, callback);
  }
  /**
   * returns registrations for a fundraising event
   * @param {string} id fundraising event id to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getRegistrations(id, callback) {
    this._sendRequest(`fundraising-events/${id}/registrations`, callback);
  }
  /**
   * returns a registration fields for a fundraising event
   * @param {string} id fundraising event id to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getRegistrationFields(id, callback) {
    this._sendRequest(`fundraising-events/${id}/registration-fields`, callback);
  }
  /**
   * returns a schedule for a fundraising event
   * @param {string} id fundraising event id to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getSchedule(id, callback) {
    this._sendRequest(`fundraising-events/${id}/schedule`, callback);
  }
  /**
   *
   * @param {string} id fundraising event id to look up
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getVisibilityOptions(id, callback) {
    this._sendRequest(`fundraising-events/${id}/visibility-options`, callback);
  }
}

module.exports = FundraisingEvents;
