const client = require("./test_client.js")

describe('user tests', () => {
  beforeAll (async () => {
    await client.initialize()
  })

  test('correct Tiltify user self returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    client.User.self(callback)
  })

  test('correct Tiltify user returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    client.User.get('3935', callback)
  })

  test('correct Tiltify user campaigns returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    client.User.getSelfCampaigns('3935', callback)
  })

  test('correct Tiltify user teams returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    client.User.getTeams('3935', callback)
  })

})
