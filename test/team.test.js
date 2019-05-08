const TiltifyClient = require('../index')

describe('teams tests -', () => {
  beforeAll(() => {
    this.client = new TiltifyClient(process.env.TILTIFY_ACCESS_TOKEN)
  })

  test.skip('correct Tiltify team list returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    this.client.Team.list(callback)
  })

  test('correct Tiltify team returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot({
        totalAmountRaised: expect.any(Number)
      })
      done()
    }
    this.client.Team.get('459', callback)
  })

  test('correct Tiltify team campaigns returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    this.client.Team.getCampaigns('459', callback)
  })

  test('correct Tiltify team campaign returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot({
        totalAmountRaised: expect.any(Number),
        supportingAmountRaised: expect.any(Number)
      })
      done()
    }
    this.client.Team.getCampaign('459', '27490', callback)
  })
})
