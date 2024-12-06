const client = require("./test_client.js")


describe('teams tests -', () => {
  beforeAll (async () => {
    await client.initialize()
  })
  test('correct Tiltify team returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot({
        total_amount_raised: expect.any(Object)
      })
      done()
    }
    client.Team.get('e646a005-cc58-43c4-96f6-ed4d7fa68343', callback)
  })

  test('correct Tiltify team campaigns returned', done => {
    function callback (data) {
      data.forEach(element => {
        expect(element).toMatchSnapshot({
          total_amount_raised: expect.any(Object),
          supporting_amount_raised: expect.any(Object)
        })
      });
      done()
    }
    client.Team.getCampaigns('e646a005-cc58-43c4-96f6-ed4d7fa68343', callback)
  })

})
