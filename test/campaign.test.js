const client = require("./test_client.js")



describe('campaign tests -', () => {

  test('correct Tiltify campaign returned', done => {
    function callback (data) {
      expect(data.amount_raised.value).toBe("2000.00")
      done()
    }
    client.Campaigns.get('45523826-ec1c-4e58-8a8b-d7874473f3bd', callback)
  })

  test('correct Tiltify campaign recent donations returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    client.Campaigns.getRecentDonations('45523826-ec1c-4e58-8a8b-d7874473f3bd', callback)
  })

  test('correct Tiltify campaign donations returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    client.Campaigns.getDonations('45523826-ec1c-4e58-8a8b-d7874473f3bd', callback)
  }, 1000000)

  test('correct Tiltify campaign rewards returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    client.Campaigns.getRewards('45523826-ec1c-4e58-8a8b-d7874473f3bd', callback)
  })

  test('correct Tiltify campaign polls returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    client.Campaigns.getPolls('45523826-ec1c-4e58-8a8b-d7874473f3bd', callback)
  })

  test('correct Tiltify campaign targets returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    client.Campaigns.getTargets('45523826-ec1c-4e58-8a8b-d7874473f3bd', callback)
  })

  test('correct Tiltify campaign schedule returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    client.Campaigns.getSchedule('45523826-ec1c-4e58-8a8b-d7874473f3bd', callback)
  })

})
