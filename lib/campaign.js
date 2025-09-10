/* jshint esversion: 8 */

class Campaign {
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
  get (id) {
    return new Promise((resolve, reject) => {
      this._doRequest(`public/campaigns/${id}`).then((response) => {
        if (response && response.data) resolve(response.data.data)
      }).catch(reject)
    })
  }

  /**
   * returns the most recent page of donations.
   * Use this if polling for new donations.
   * @param {string} id The campaign ID that you're looking up
   * @param {requestCallback} callback A function to call when we're done getting data
   */
  getRecentDonations (id) {
    return new Promise((resolve, reject) => {
      this._doRequest(`public/campaigns/${id}/donations`).then((response) => {
        if (response && response.data) resolve(response.data.data)
      }).catch(reject)
    })
  }

  /**
   * returns ALL donations from a campaign.
   * @param {string} id The campaign ID that you're looking up
   * @param {requestCallback} callback A function to call when we're done getting data
   */
  getDonations (id) {
    return new Promise((resolve, reject) => {
      this._sendRequest(`public/campaigns/${id}/donations?limit=100`, resolve)
    })
  }

  /**
   * returns all donation matching offers from a campaign
   * @param {string} id The campaign ID that you're looking up
   * @param {requestCallback} callback A function to call when we're done getting data
   */
  getDonationMatches (id) {
    return new Promise((resolve, reject) => {
      this._sendRequest(`public/campaigns/${id}/donation_matches?limit=100`, resolve)
    })
  }

  /**
   * returns all rewards for a campaign
   * @param {string} id The campaign ID that you're looking up
   * @param {requestCallback} callback A function to call when we're done getting data
   */
  getRewards (id) {
    return new Promise((resolve, reject) => {
      this._sendRequest(`public/campaigns/${id}/rewards?limit=100`, resolve)
    })
  }

  /**
   * returns all polls for a campaign
   * @param {string} id The campaign ID that you're looking up
   * @param {requestCallback} callback A function to call when we're done getting data
   */
  getPolls (id) {
    return new Promise((resolve, reject) => {
      this._sendRequest(`public/campaigns/${id}/polls?limit=100`, resolve)
    })
  }

  /**
   * returns all targets for a campaign
   * @deprecated replaced with getTargets to match tiltify naming scheme
   * @param {string} id The campaign ID that you're looking up
   * @param {requestCallback} callback A function to call when we're done getting data
   */
  getChallenges (id) {
    return new Promise((resolve, reject) => {
      console.log('WARN: Using deprecated method getChallenges, please use getTarets')
      this._sendRequest(`public/campaigns/${id}/targets?limit=100`, resolve)
    })
  }

  /**
   * returns all targets for a campaign
   * @param {string} id The campaign ID that you're looking up
   * @param {requestCallback} callback A function to call when we're done getting data
   */
  getTargets (id) {
    return new Promise((resolve, reject) => {
      this._sendRequest(`public/campaigns/${id}/targets?limit=100`, resolve)
    })
  }

  /**
   * returns all polls for a campaign
   * @param {string} id The campaign ID that you're looking up
   * @param {requestCallback} callback A function to call when we're done getting data
   */
  getMilestones (id) {
    return new Promise((resolve, reject) => {
      this._sendRequest(`public/campaigns/${id}/milestones?limit=100`, resolve)
    })
  }

  /**
   * returns the schedule of a campaign
   * @param {string} id The campaign ID that you're looking up
   * @param {requestCallback} callback A function to call when we're done getting data
   */
  getSchedule (id) {
    return new Promise((resolve, reject) => {
      this._sendRequest(`public/campaigns/${id}/schedules?limit=100`, resolve)
    })
  }

  /**
   * returns the donors of a campaign
   * @param {string} id The campaign ID that you're looking up
   * @param {requestCallback} callback A function to call when we're done getting data
   */
  getDonors (id) {
    return new Promise((resolve, reject) => {
      this._sendRequest(`public/campaigns/${id}/donor_leaderboard?limit=100`, resolve)
    })
  }
}

export default Campaign
