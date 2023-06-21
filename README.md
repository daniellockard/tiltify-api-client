# tiltify-api-client

## v5 Breaking Changes

API keys are handled differently, they *actually* expire now. Instead of supplying a API token on construction, supply a client_id and client_secret from Tiltify, the client will regenerate the key as needed

Tiltify v5 limits are 100 per request, requests will take longer to process on large data calls.

`Campaign.getIncentives` -> `Campaign.getTargets` to match what tiltify calls incentives now. Previous call will continue to work, but with deprecated warnings

You must INITIALIZE the client with async function `initalize()` to generate the access tokens

**Removed APIs. Tiltify does not serve this data anymore:**
### User
* List users
* Get owned teams
### Campaigns
* Get supporting campaign
### Teams
* List teams
* Get single campaign from team. Just use `Campaigns`
### Cause
* List campaigns
* List donations (closest is `getTopDonors`)
* Get permissions
* Get visibility options
### Fundraising Events
* List fundraising events (Must be done per-cause now)
* List donations (closest is `getTopDonors`)
* Get Registrations
* Get Registration Fields
* Get Schedule
* Get Visibility Options

## Docs
[tiltify-api-client docs](https://daniellockard.github.io/tiltify-api-client/)

## To install
* `npm i --save tiltify-api-client`

## To use

You can use this library like this:

```javascript
const TiltifyClient = require("tiltify-api-client")

client = new TiltifyClient(process.env.TILTIFY_ACCESS_TOKEN)

client.Campaigns.get("882b8fa6-2115-4480-93dd-e901a053bc17", function (data) {
    console.log(data)
})
```

Functions are passed a callback to be called when the data is returned.

The above example will print the data about Campaign with ID 882b8fa6-2115-4480-93dd-e901a053bc17. Legacy IDs are also supported

Only use client.Campaigns.getDonations(id) to do analysis on the donations. Pulling all the donations from a large campaign can take a while. Tiltify requests that you get 100 at a time, max.

Use client.Campaigns.getRecentDonations(id) to get the most recent 10. This saves on bandwidth and processing time.
