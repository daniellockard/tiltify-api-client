const TiltifyClient = require('../index')
describe('campaign tests -', () => {
  beforeAll(() => {
    this.client = new TiltifyClient(process.env.TILTIFY_ACCESS_TOKEN)
  })

  test('correct Tiltify campaign returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot({
        amountRaised: expect.any(Number),
        totalAmountRaised: expect.any(Number)
      })
      done()
    }
    this.client.Campaigns.get('27286', callback)
  })

  test('correct Tiltify campaign recent donations returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    this.client.Campaigns.getRecentDonations('27286', callback)
  })

  test('correct Tiltify campaign donations returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    this.client.Campaigns.getDonations('27286', callback)
  }, 100000)

  test('correct Tiltify campaign rewards returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    this.client.Campaigns.getRewards('19414', callback)
  })

  test('correct Tiltify campaign polls returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    this.client.Campaigns.getPolls('19414', callback)
  })

  test('correct Tiltify campaign challenges returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    this.client.Campaigns.getChallenges('19414', callback)
  })

  test('correct Tiltify campaign schedule returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    this.client.Campaigns.getSchedule('19414', callback)
  })

  test('correct Tiltify campaign supporting campaigns returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    this.client.Campaigns.getSupportingCampaigns('27286', callback)
  })
})
