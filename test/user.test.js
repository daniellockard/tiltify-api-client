const TiltifyClient = require('../index')

describe('user tests', () => {
  const client = new TiltifyClient('','')


  beforeAll(() => {
    client.setKey(process.env.TILTIFY_ACCESS_TOKEN)
  })

  test.skip('correct Tiltify user self returned', done => {
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
