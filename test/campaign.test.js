const client = require("./test_client.js")


describe('campaign tests -', () => {

  beforeAll (async () => {
    await client.initialize()
  })

  test('correct Tiltify campaign returned', done => {
    function callback (data) {
      expect(data.amount_raised.value).toBe("220.00")
      done()
    }
    client.Campaigns.get('7099d7ba-cbce-40a6-8263-a5704d72b324', callback)
  })

  test('correct Tiltify campaign recent donations returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    client.Campaigns.getRecentDonations('7099d7ba-cbce-40a6-8263-a5704d72b324', callback)
  })

  test('correct Tiltify campaign donations returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    client.Campaigns.getDonations('7099d7ba-cbce-40a6-8263-a5704d72b324', callback)
  }, 1000000)

  test('correct Tiltify campaign rewards returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    client.Campaigns.getRewards('7099d7ba-cbce-40a6-8263-a5704d72b324', callback)
  })

  test('correct Tiltify campaign polls returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    client.Campaigns.getPolls('7099d7ba-cbce-40a6-8263-a5704d72b324', callback)
  })

  test('correct Tiltify campaign targets returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    client.Campaigns.getTargets('7099d7ba-cbce-40a6-8263-a5704d72b324', callback)
  })

  test('correct Tiltify campaign schedule returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    client.Campaigns.getSchedule('7099d7ba-cbce-40a6-8263-a5704d72b324', callback)
  })

})
