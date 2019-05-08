/* jshint esversion: 8 */

class Team {
  /**
   * A new team api object.
   * @param {object} self is `this` from index.js
   * @constructor
   */
  constructor(self) {
    this._sendRequest = self._sendRequest;
    this._doRequest = self._doRequest;
    this.apiKey = self.apiKey;
  }
  /**
   * returns a list of teams
   * @param {requestCallback} callback
   */
  list(callback) {
    this._sendRequest(`teams`, callback);
  }
  /**
   * returns info about a team
   * @param {string} id the team id to look up
   * @param {requestCallback} callback a function to call when data is returned
   */
  get(id, callback) {
    this._sendRequest(`teams/${id}`, callback);
  }
  /**
   * returns campaigns for a team
   * @param {string} id the team id to look up
   * @param {*} callback a function to call when data is returned
   */
  getCampaigns(id, callback) {
    this._sendRequest(`teams/${id}/campaigns`, callback);
  }
  /**
   * returns a info about a campaign attached to a team
   * @param {string} teamid the team id to look up
   * @param {string} campaignid the campaign id to look up
   * @param {string} callback a function to call when data is returned
   */
  getCampaign(teamid, campaignid, callback) {
    this._sendRequest(`teams/${teamid}/campaigns/${campaignid}`, callback);
  }
}

module.exports = Team;
