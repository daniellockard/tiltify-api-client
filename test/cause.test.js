const TiltifyClient = require('../index')
describe('cause tests -', () => {
  const client = new TiltifyClient('04c94777937dd4ccdaa36615125da8fcf0e7a04b49c26670fe47e8cb59c5015d','2bbdd1a3a739bb402e4f4942693cd88a343ea56e5d79fcccdaa455e0b36012a1')
  beforeAll( () => {
    client.initialize()
  });

  test('correct Tiltify cause returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    client.Causes.get('35', callback)
  })

  // test.skip('correct Tiltify cause donations returned', done => {
  //   function callback (data) {
  //     expect(data).toMatchSnapshot()
  //     done()
  //   }
  //   client.Causes.getTopDonors('35', callback)
  // })

  test('correct Tiltify cause fundraising events returned', done => {
    function callback (data) {
      data.forEach(element => {
        expect(element).toMatchSnapshot({ total_amount_raised: expect.any(Object) })
      })
      done()
    }
    client.Causes.getFundraisingEvents('35', callback)
  })

  // TODO: Find a cause with leaderboards
  // test('correct Tiltify cause leaderboards returned', done => {
  //   function callback (data) {
  //     expect(data).toMatchSnapshot()
  //     done()
  //   }
  //   client.Causes.getLeaderboards('35', callback)
  // })

})
