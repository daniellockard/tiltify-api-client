/* jshint esversion: 8 */

class TeamCampaign {
  /**
   * A new campaign api object.
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
   * returns information about a campaign.
   * The total raised is in this returned object.
   * @param {string} id The campaign ID that you're looking up
   * @param {requestCallback} callback A function to call when we're done getting data
   */
  get (id, callback) {
    this._doRequest(`public/team_campaigns/${id}`).then(function (response) {
      if (response && response.data) callback(response.data.data)
    })
  }

  /**
   * returns the most recent page of donations.
   * Use this if polling for new donations.
   * @param {string} id The campaign ID that you're looking up
   * @param {requestCallback} callback A function to call when we're done getting data
   */
  getRecentDonations (id, callback) {
    this._doRequest(`public/team_campaigns/${id}/donations`).then(function (response) {
      if (response && response.data) callback(response.data.data)
    })
  }

  /**
   * returns ALL donations from a campaign.
   * @param {string} id The campaign ID that you're looking up
   * @param {requestCallback} callback A function to call when we're done getting data
   */
  getDonations (id, callback) {
    this._sendRequest(`public/team_campaigns/${id}/donations?limit=100`, callback)
  }

  /**
   * returns all donation matching offers from a campaign
   * @param {string} id The campaign ID that you're looking up
   * @param {requestCallback} callback A function to call when we're done getting data
   */
  getDonationMatches (id, callback) {
    this._sendRequest(`public/team_campaigns/${id}/donation_matches?limit=100`, callback)
  }

  /**
   * returns all rewards for a campaign
   * @param {string} id The campaign ID that you're looking up
   * @param {requestCallback} callback A function to call when we're done getting data
   */
  getRewards (id, callback) {
    this._sendRequest(`public/team_campaigns/${id}/rewards?limit=100`, callback)
  }

  /**
   * returns all polls for a campaign
   * @param {string} id The campaign ID that you're looking up
   * @param {requestCallback} callback A function to call when we're done getting data
   */
  getPolls (id, callback) {
    this._sendRequest(`public/team_campaigns/${id}/polls?limit=100`, callback)
  }

  /**
   * returns all targets for a campaign
   * @deprecated replaced with getTargets to match tiltify naming scheme
   * @param {string} id The campaign ID that you're looking up
   * @param {requestCallback} callback A function to call when we're done getting data
   */
  getChallenges (id, callback) {
    console.log('WARN: Using deprecated method getChallenges, please use getTarets')
    this._sendRequest(`public/team_campaigns/${id}/targets?limit=100`, callback)
  }

  /**
   * returns all targets for a campaign
   * @param {string} id The campaign ID that you're looking up
   * @param {requestCallback} callback A function to call when we're done getting data
   */
  getTargets (id, callback) {
    this._sendRequest(`public/team_campaigns/${id}/targets?limit=100`, callback)
  }

  /**
   * returns all polls for a campaign
   * @param {string} id The campaign ID that you're looking up
   * @param {requestCallback} callback A function to call when we're done getting data
   */
  getMilestones (id, callback) {
    this._sendRequest(`public/team_campaigns/${id}/milestones?limit=100`, callback)
  }

  /**
   * returns the schedule of a campaign
   * @param {string} id The campaign ID that you're looking up
   * @param {requestCallback} callback A function to call when we're done getting data
   */
  getSchedule (id, callback) {
    this._sendRequest(`public/team_campaigns/${id}/schedule?limit=100`, callback)
  }

  /**
   * returns leaderboards for a team campaign
   * @param {string} id team id to look up
   * @param {string} timeType Time range for leaderboard (daily, weekly, monthly, yearly, ytd, all)
   * @param {requestCallback} callback a function to call when we're done getting data
   */
  getLeaderboards (id, timeType, callback) {
    this._sendRequest(`public/team_campaigns/${id}/user_leaderboard${timeType ? '?time_type' + timeType : ''}`, callback)
  }

  /**
   * returns all supporting campaigns for a campaign
   * @param {string} id The campaign ID that you're looking up
   * @param {requestCallback} callback A function to call when we're done getting data
   */
  getSupportingCampaigns (id, callback) {
    this._sendRequest(`public/team_campaigns/${id}/supporting_campaigns`, callback)
  }
}

module.exports = TeamCampaign
