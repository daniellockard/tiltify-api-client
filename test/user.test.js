import client from "./test_client.js"

describe('user tests', () => {
  beforeAll (async () => {
    await client.initialize()
  })

  test('correct Tiltify user self returned', async () => {
    const data = await client.User.self()
    expect(data).toMatchSnapshot()
  })

  test('correct Tiltify user returned', async () => {
    const data = await client.User.get('3935')
    expect(data).toMatchSnapshot()
  })

  test('correct Tiltify user campaigns returned', async () => {
    const data = await client.User.getSelfCampaigns('3935')
    expect(data).toMatchSnapshot()
  })

  test('correct Tiltify user teams returned', async () => {
    const data = await client.User.getTeams('3935')
    expect(data).toMatchSnapshot()
  })

})
