class User {
  constructor (self) {
    this._sendRequest = self._sendRequest
    this.apiKey = self.apiKey
  }
  self (callback) {
    this._sendRequest(`user`, callback)
  }
  list (callback) {
    this._sendRequest(`users`, callback)
  }
  get (id, callback) {
    this._sendRequest(`users/${id}`, callback)
  }
  getCampaigns (id, callback) {
    this._sendRequest(`users/${id}/campaigns`, callback)
  }
  getCampaign (teamid, campaignid, callback) {
    this._sendRequest(`users/${teamid}/campaigns/${campaignid}`, callback)
  }
  getOwnedTeams (id, callback) {
    this._sendRequest(`users/${id}/owned-teams`, callback)
  }
  getTeams (id, callback) {
    this._sendRequest(`users/${id}/teams`, callback)
  }
}

module.exports = User
