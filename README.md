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

Only use client.Campaigns.getDonations to do analysis on the donations. Pulling all the donations from a large campaign can take a while.

Use client.Campaigns.getRecentDonations("27286") to get the most recent 10. this saves on bandwidth and processing time.