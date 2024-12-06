const client = require("./test_client.js")

describe('fundraising event tests -', () => {
  beforeAll (async () => {
    await client.initialize()
  })
  test('correct Tiltify fundraising event returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot([{
        total_amount_raised: {
          value: expect.any(String)
        }
      }])
      done()
    }
    client.FundraisingEvents.get('4ffe1f38-1407-43a8-a44c-d3761a85be09', callback)
  })

  test.skip('correct Tiltify fundraising event top donors returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    client.FundraisingEvents.getTopDonors('4ffe1f38-1407-43a8-a44c-d3761a85be09', 'all', callback)
  },100000)

  test.skip('correct Tiltify fundraising event leaderboards returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot()
      done()
    }
    client.FundraisingEvents.getLeaderboards('4ffe1f38-1407-43a8-a44c-d3761a85be09', 'all', callback)
  })

})
