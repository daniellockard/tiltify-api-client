class Team {
  constructor (self) {
    this._sendRequest = self._sendRequest
    this.apiKey = self.apiKey
  }
  list (callback) {
    this._sendRequest(`teams`, callback)
  }
  get (id, callback) {
    this._sendRequest(`teams/${id}`, callback)
  }
  getCampaigns (id, callback) {
    this._sendRequest(`teams/${id}/campaigns`, callback)
  }
  getCampaign (teamid, campaignid, callback) {
    this._sendRequest(`teams/${teamid}/campaigns/${campaignid}`, callback)
  }
}

module.exports = Team
