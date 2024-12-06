const TiltifyClient = require('../index')

describe('user tests', () => {
  const client = new TiltifyClient('04c94777937dd4ccdaa36615125da8fcf0e7a04b49c26670fe47e8cb59c5015d','2bbdd1a3a739bb402e4f4942693cd88a343ea56e5d79fcccdaa455e0b36012a1')
  beforeAll( () => {
    client.initialize()
  });

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
