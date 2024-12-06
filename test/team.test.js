const TiltifyClient = require('../index')
const client = require("./test_client.js")


describe('teams tests -', () => {

  test('correct Tiltify team returned', done => {
    function callback (data) {
      expect(data).toMatchSnapshot({
        total_amount_raised: expect.any(Object)
      })
      done()
    }
    client.Team.get('1470f78e-f3f3-41ac-b3ee-6e80fc1049fd', callback)
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
    client.Team.getCampaigns('1470f78e-f3f3-41ac-b3ee-6e80fc1049fd', callback)
  })

})
