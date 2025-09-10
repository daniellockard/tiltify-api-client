import client from "./test_client.js"


describe('teams tests -', () => {
  beforeAll (async () => {
    await client.initialize()
  })
  test('correct Tiltify team returned', async () => {
    const data = await client.Team.get('e646a005-cc58-43c4-96f6-ed4d7fa68343')
    expect(data).toMatchSnapshot({
      total_amount_raised: expect.any(Object)
    })
  })

  test('correct Tiltify team campaigns returned', async () => {
    const data = await client.Team.getCampaigns('e646a005-cc58-43c4-96f6-ed4d7fa68343')
    data.forEach(element => {
      expect(element).toMatchSnapshot({
        total_amount_raised: expect.any(Object),
        supporting_amount_raised: expect.any(Object)
      })
    });
  })

})
