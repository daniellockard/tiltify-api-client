const TiltifyClient = require('../index')

describe('teams tests -', () => {
  const client = new TiltifyClient('','')

  beforeAll(() => {
    client.setKey(process.env.TILTIFY_ACCESS_TOKEN)
  })

  test('correct Tiltify team returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot({
        total_amount_raised: expect.any(Object)
      })
      done()
    }
    client.Team.get('459', callback)
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
    client.Team.getCampaigns('459', callback)
  })

})
