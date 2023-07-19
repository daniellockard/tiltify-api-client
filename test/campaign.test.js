const TiltifyClient = require('../index')
describe('campaign tests -', () => {
  beforeAll(() => {
    this.client = new TiltifyClient('','').setKey(process.env.TILTIFY_ACCESS_TOKEN)
  })

  test('correct Tiltify campaign returned', done => {
    function callback (data) {
      expect(data.amount_raised.value).toBe("2000.00")
      done()
    }
    this.client.Campaigns.get('45523826-ec1c-4e58-8a8b-d7874473f3bd', callback)
  })

  test('correct Tiltify campaign recent donations returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    this.client.Campaigns.getRecentDonations('45523826-ec1c-4e58-8a8b-d7874473f3bd', callback)
  })

  test('correct Tiltify campaign donations returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    this.client.Campaigns.getDonations('45523826-ec1c-4e58-8a8b-d7874473f3bd', callback)
  }, 1000000)

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

  test('correct Tiltify campaign targets returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    this.client.Campaigns.getTargets('19414', callback)
  })

  test('correct Tiltify campaign schedule returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    this.client.Campaigns.getSchedule('19414', callback)
  })

})
