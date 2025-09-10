import client from "./test_client.js"

describe('cause tests -', () => {
  
  beforeAll (async () => {
    await client.initialize()
  })

  test('correct Tiltify cause returned', async () => {
    const data = await client.Causes.get('400f5687-6017-4d1a-a4d9-7c9166b984c2')
    expect(data).toMatchSnapshot()
  }, 10000)

  // test.skip('correct Tiltify cause donations returned', done => {
  //   function callback (data) {
  //     expect(data).toMatchSnapshot()
  //     done()
  //   }
  //   client.Causes.getTopDonors('35', callback)
  // })

  test('correct Tiltify cause fundraising events returned', async () => {
    const data = await client.Causes.getFundraisingEvents('400f5687-6017-4d1a-a4d9-7c9166b984c2')
    data.forEach(element => {
      expect(element).toMatchSnapshot({ total_amount_raised: expect.any(Object) })
    })
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
