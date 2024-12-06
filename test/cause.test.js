
const client = require("./test_client.js")

describe('cause tests -', () => {
  
  beforeAll (async () => {
    await client.initialize()
  })

  test('correct Tiltify cause returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    client.Causes.get('400f5687-6017-4d1a-a4d9-7c9166b984c2', callback)
  }, 10000)

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
    client.Causes.getFundraisingEvents('400f5687-6017-4d1a-a4d9-7c9166b984c2', callback)
  }, 10000)

  // TODO: Find a cause with leaderboards
  // test('correct Tiltify cause leaderboards returned', done => {
  //   function callback (data) {
  //     expect(data).toMatchSnapshot()
  //     done()
  //   }
  //   client.Causes.getLeaderboards('35', callback)
  // })

})
