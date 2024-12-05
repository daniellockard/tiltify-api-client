const TiltifyClient = require('../index')
describe('fundraising event tests -', () => {

  const client = new TiltifyClient('','')

  beforeAll(() => {
    client.setKey(process.env.TILTIFY_ACCESS_TOKEN)
  })

  test('correct Tiltify fundraising event returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot({
        total_amount_raised: expect.any(Object)
      })
      done()
    }
    client.FundraisingEvents.get('f6d18a9a-239d-4149-9473-a144604a71a6', callback)
  })

  test.skip('correct Tiltify fundraising event top donors returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    client.FundraisingEvents.getTopDonors('f6d18a9a-239d-4149-9473-a144604a71a6', 'all', callback)
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
    client.FundraisingEvents.getLeaderboards('f6d18a9a-239d-4149-9473-a144604a71a6', 'all', callback)
  })

})
