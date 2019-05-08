# tiltify-api

## To install
* ```npm i --save @danielhlockard/tiltify-api```

## To use

You can use this library like this:

```javascript
const TiltifyClient = require("@danielhlockard/tiltify-api")

client = new TiltifyClient(process.env.TILTIFY_ACCESS_TOKEN)

client.Campaigns.get("27286", function (data) {
    console.log(data)
})
```

Functions are passed a callback to be called when the data is returned.

The above example will print the data about Campaign with ID 27286.

Only use client.Campaigns.getDonations(id) to do analysis on the donations. Pulling all the donations from a large campaign can take a while. Tiltify requests that you get 100 at a time, max.

Use client.Campaigns.getRecentDonations(id) to get the most recent 10. This saves on bandwidth and processing time.