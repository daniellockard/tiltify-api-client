const TiltifyClient = require('../index')
describe('cause tests -', () => {
  beforeAll(() => {
    this.client = new TiltifyClient('','').setKey(process.env.TILTIFY_ACCESS_TOKEN)
  })

  test('correct Tiltify cause returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    this.client.Causes.get('35', callback)
  })

  // test.skip('correct Tiltify cause donations returned', done => {
  //   function callback (data) {
  //     expect(data).toMatchSnapshot()
  //     done()
  //   }
  //   this.client.Causes.getTopDonors('35', callback)
  // })

  test('correct Tiltify cause fundraising events returned', done => {
    function callback (data) {
      data.forEach(element => {
        expect(element).toMatchSnapshot({ total_amount_raised: expect.any(Object) })
      })
      done()
    }
    this.client.Causes.getFundraisingEvents('35', callback)
  })

  // TODO: Find a cause with leaderboards
  // test('correct Tiltify cause leaderboards returned', done => {
  //   function callback (data) {
  //     expect(data).toMatchSnapshot()
  //     done()
  //   }
  //   this.client.Causes.getLeaderboards('35', callback)
  // })

})
