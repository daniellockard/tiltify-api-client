const request = require('request-promise')
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
    this.accumulatedData = []
  }

  async _doRequest (path) {
    const url = `https://tiltify.com/api/v3/${path}`
    const options = {
      url: url,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    }
    let payload = await request(options)
    return payload
  }

  async _sendRequest (path, callback) {
    let results = []
    let keepGoing = true
    while (keepGoing) {
      let response = await this._doRequest(path)
      const parsedBody = JSON.parse(response)
      if (parsedBody.links !== undefined && parsedBody.links.prev !== undefined) {
        path = parsedBody.links.prev.replace('/api/v3/', '')
      } else {
        keepGoing = false
        callback(parsedBody.data)
        return
      }
      await results.push(parsedBody.data)
      if (parsedBody.data.length == 0) {
        keepGoing = false
        let concatResults = []
        results.forEach(block => {
          block.forEach(element => {
            concatResults.push(element)
          })
        })
        callback(concatResults)
      }
    }
  }
}
module.exports = TiltifyClient
