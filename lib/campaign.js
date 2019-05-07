class Campaign {
  constructor (self) {
    this._sendRequest = self._sendRequest
    this.apiKey = self.apiKey
  }

  get (id, callback) {
    this._sendRequest(`campaigns/${id}`, callback)
  }

  getRecentDonations (id, callback) {
    this._sendRequest(`campaigns/${id}/donations`, callback)
  }

  getRewards (id, callback) {
    this._sendRequest(`campaigns/${id}/rewards`, callback)
  }

  getPolls (id, callback) {
    this._sendRequest(`campaigns/${id}/polls`, callback)
  }

  getChallenges (id, callback) {
    this._sendRequest(`campaigns/${id}/challenges`, callback)
  }

  getSchedule (id, callback) {
    this._sendRequest(`campaigns/${id}/schedule`, callback)
  }

  getSupportingCampaigns (id, callback) {
    this._sendRequest(`campaigns/${id}/supporting-campaigns`, callback)
  }
}

module.exports = Campaign
