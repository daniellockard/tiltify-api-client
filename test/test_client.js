const TiltifyClient = require('../index')
const axios = require("axios")

const client = new TiltifyClient('04c94777937dd4ccdaa36615125da8fcf0e7a04b49c26670fe47e8cb59c5015d','2bbdd1a3a739bb402e4f4942693cd88a343ea56e5d79fcccdaa455e0b36012a1')

axios.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2))
  return request
})

axios.interceptors.response.use(response => {
  console.log('Response:', JSON.stringify(response, null, 2))
  return response
})

beforeAll( () => {
  client.initialize()
});

module.exports = client