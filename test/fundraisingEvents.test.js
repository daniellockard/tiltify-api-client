const TiltifyClient = require('../index')
describe('fundraising event tests -', () => {
  beforeAll(() => {
    this.client = new TiltifyClient(process.env.TILTIFY_ACCESS_TOKEN)
  })

  test('correct Tiltify fundraising event returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot({
        totalAmountRaised: expect.any(Number)
      })
      done()
    }
    this.client.FundraisingEvents.get('136', callback)
  })

  test.skip('correct Tiltify fundraising event donations returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    this.client.FundraisingEvents.getDonations('136', callback)
  })

  test.skip('correct Tiltify fundraising event incentives returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    this.client.FundraisingEvents.getIncentives('136', callback)
  })

  test.skip('correct Tiltify fundraising event leaderboards returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot({
        individual: expect.any(Array),
        team: expect.any(Array),
        weekly: expect.any(Array)
      })
      done()
    }
    this.client.FundraisingEvents.getLeaderboards('136', callback)
  })

  test.skip('correct Tiltify fundraising event registrations returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    this.client.FundraisingEvent.getRegistrations('136', callback)
  })

  test.skip('correct Tiltify fundraising event registration-fields returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    this.client.FundraisingEvents.getRegistrationFields('136', callback)
  })

  test.skip('correct Tiltify fundraising event visibility options returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    this.client.FundraisingEvents.getVisibilityOptions('136', callback)
  })
})
