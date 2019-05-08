class Cause {
  constructor (self) {
    this._sendRequest = self._sendRequest
    this._doRequest = self._doRequest
    this.apiKey = self.apiKey
  }
  get (id, callback) {
    this._sendRequest(`causes/${id}`, callback)
  }
  getCampaigns (id, callback) {
    this._sendRequest(`causes/${id}/campaigns`, callback)
  }
  getDonations (id, callback) {
    this._sendRequest(`causes/${id}/donationss`, callback)
  }
  getFundraisingEvents (id, callback) {
    this._sendRequest(`causes/${id}/fundraising-events`, callback)
  }
  getLeaderboards (id, callback) {
    this._sendRequest(`causes/${id}/leaderboards`, callback)
  }
  getVisibilityOptions (id, callback) {
    this._sendRequest(`causes/${id}/visibility-options`, callback)
  }
  getPermissions (id, callback) {
    this._sendRequest(`causes/${id}/permissions`, callback)
  }
}

module.exports = Cause
