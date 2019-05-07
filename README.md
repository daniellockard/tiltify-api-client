# tiltify-api
use it by doing something like
```javascript
this.client = new TiltifyClient(process.env.TILTIFY_ACCESS_TOKEN)
function callback (data) {
  console.log(data)
}
this.client.Causes.get('35', callback)
```
functions are passed a callback when the data is returned.

The above will print the data about Cause with ID 35.
