# tiltify-api
use it by doing something like
```javascript
const TiltifyClient = require("@danielhlockard/tiltify-api")

client = new TiltifyClient(process.env.TILTIFY_ACCESS_TOKEN)

client.Campaigns.get("27286", function (data) {
    console.log(data)
})
```
functions are passed a callback when the data is returned.

The above will print the data about Campaign with ID 27286.

Getting donations from a campaign only returns the first page. Getting all donations from a campaign is in the works once I figure out how best to implement it.


