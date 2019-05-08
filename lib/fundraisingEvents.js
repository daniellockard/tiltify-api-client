class FundraisingEvents {
  constructor (self) {
    this._sendRequest = self._sendRequest
    this._doRequest = self._doRequest
    this.apiKey = self.apiKey
  }
  list (callback) {
    this._sendRequest(`fundraising-events`, callback)
  }
  get (id, callback) {
    this._sendRequest(`fundraising-events/${id}`, callback)
  }
  getCampaigns (id, callback) {
    this._sendRequest(`fundraising-events/${id}/campaigns`, callback)
  }
  getDonations (id, callback) {
    this._sendRequest(`fundraising-events/${id}/donationss`, callback)
  }
  getIncentives (id, callback) {
    this._sendRequest(`fundraising-events/${id}/incentives`, callback)
  }
  getLeaderboards (id, callback) {
    this._sendRequest(`fundraising-events/${id}/leaderboards`, callback)
  }
  getRegistrations (id, callback) {
    this._sendRequest(`fundraising-events/${id}/registrations`, callback)
  }
  getRegistrationFields (id, callback) {
    this._sendRequest(`fundraising-events/${id}/registration-fields`, callback)
  }
  getSchedule (id, callback) {
    this._sendRequest(`fundraising-events/${id}/schedule`, callback)
  }
  getVisibilityOptions (id, callback) {
    this._sendRequest(`fundraising-events/${id}/visibility-options`, callback)
  }
}

module.exports = FundraisingEvents
