const TiltifyClient = require('../index')

describe('user tests', () => {
  beforeAll(() => {
    this.client = new TiltifyClient(process.env.TILTIFY_ACCESS_TOKEN)
  })

  test.skip('correct Tiltify user self returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    this.client.User.self(callback)
  })

  test.skip('correct Tiltify user list returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    this.client.User.list(callback)
  })

  test('correct Tiltify user returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    this.client.User.get('3935', callback)
  })

  test('correct Tiltify user campaigns returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    this.client.User.getCampaigns('3935', callback)
  })

  test('correct Tiltify user campaign returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    this.client.User.getCampaign('3935', '19414', callback)
  })

  test('correct Tiltify user owned teams returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    this.client.User.getOwnedTeams('3935', callback)
  })

  test('correct Tiltify user teams returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    this.client.User.getOwnedTeams('3935', callback)
  })
})
