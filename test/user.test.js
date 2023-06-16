const TiltifyClient = require('../index')

describe('user tests', () => {
  beforeAll(() => {
    this.client = new TiltifyClient('','').setKey(process.env.TILTIFY_ACCESS_TOKEN)
  })

  test.skip('correct Tiltify user self returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    this.client.User.self(callback)
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
    this.client.User.getSelfCampaigns('3935', callback)
  })

  test('correct Tiltify user teams returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    this.client.User.getTeams('3935', callback)
  })

})
