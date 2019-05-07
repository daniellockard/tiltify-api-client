const request = require('request')
const Campaign = require('./lib/campaign')
const Cause = require('./lib/cause')
const FundraisingEvent = require('./lib/fundraisingEvents')
const Team = require('./lib/team')
const User = require('./lib/user')

class TiltifyClient {
  constructor (apiKey) {
    this.apiKey = apiKey
    this.Campaigns = new Campaign(this)
    this.Causes = new Cause(this)
    this.FundraisingEvent = new FundraisingEvent(this)
    this.Team = new Team(this)
    this.User = new User(this)
  }

  _sendRequest (path, callback) {
    const url = `https://tiltify.com/api/v3/${path}`
    const options = {
      url: url,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    }

    request(options, function (error, response, body) {
      if (error) {
        callback({ error: error, body: body })
        return
      }
      if (!error & response.statusCode === 200) {
        callback(JSON.parse(body).data)
      }
    })
  }
}
module.exports = TiltifyClient
