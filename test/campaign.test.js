import client from "./test_client.js"


describe('campaign tests -', () => {

  beforeAll (async () => {
    await client.initialize()
  })

  test('correct Tiltify campaign returned', async () => {
    const data = await client.Campaigns.get('7099d7ba-cbce-40a6-8263-a5704d72b324')
    expect(data.amount_raised.value).toBe("425.00")
  })

  test('correct Tiltify campaign recent donations returned', async () => {
    const data = await client.Campaigns.getRecentDonations('7099d7ba-cbce-40a6-8263-a5704d72b324')
    expect(data).toMatchSnapshot()
  })

  test('correct Tiltify campaign donations returned', async () => {
    const data = await client.Campaigns.getDonations('7099d7ba-cbce-40a6-8263-a5704d72b324')
    expect(data).toMatchSnapshot()
  }, 1000000)

  test('correct Tiltify campaign rewards returned', async () => {
    const data = await client.Campaigns.getRewards('7099d7ba-cbce-40a6-8263-a5704d72b324')
    expect(data).toMatchSnapshot()
  })

  test('correct Tiltify campaign polls returned', async () => {
    const data = await client.Campaigns.getPolls('7099d7ba-cbce-40a6-8263-a5704d72b324')
    expect(data).toMatchSnapshot()
  })

  test('correct Tiltify campaign targets returned', async () => {
    const data = await client.Campaigns.getTargets('7099d7ba-cbce-40a6-8263-a5704d72b324')
    expect(data).toMatchSnapshot()
  })

  test('correct Tiltify campaign schedule returned', async () => {
    const data = await client.Campaigns.getSchedule('7099d7ba-cbce-40a6-8263-a5704d72b324')
    expect(data).toMatchSnapshot()
  })

})
