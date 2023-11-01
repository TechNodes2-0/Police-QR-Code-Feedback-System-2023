# textflow.js

[![NPM](https://nodei.co/npm/textflow.js.png?downloads=true&stars=true)](https://www.npmjs.com/package/textflow.js)

### Supported Node.js Versions
* Node.js 14
* Node.js 16
* Node.js 18

## Installation
`npm install textflow.js` or `yarn add textflow.js`

## Sending an SMS

To send an SMS, you have to create an API key using the [Textflow dashboard](https://textflow.me/api). When you register an account, you automatically get an API key with one free SMS which you can send anywhere.

### Just send a message

```javascript
const textflow = require("textflow.js");
textflow.useKey("YOUR_API_KEY"); //You can create one in the API Console at https://textflow.me

textflow.sendSMS("+381611231234", "Dummy message text...");
```

### Provide custom callback

```javascript
textflow.sendSMS("+381611231234", "Dummy message text...", (result) => {
  if (result.ok) {
    console.log("SUCCESS");
  }
})
```

### Await response

```javascript
async function async_function() {
  let result = await textflow.sendSMS("+381611231234", "Dummy message text...");
  console.log(result);
}
async_function();
```

### Example of the result of a successfully sent message

```json
{
    "ok": true,
    "status": 200,
    "message": "Message sent successfully",
    "data": {
        "to": "+381611231234",
        "content": "Dummy message text...",
        "country_code": "RS",
        "price": 0.05,
        "timestamp": 1674759108881
    }
}
```

### Example of the result of an unsuccessfully sent message

```json
{
    "ok": false,
    "status": 404,
    "message": "API key not found"
}
```

## Verifying a phone number

You can also use our service to easily verify a phone number, without storing data about the phones that you are about to verify, because we can do it for you.

### Example usage

Both `sendVerificationSMS` and `verifyCode` can also be used both by providing a callback or awaiting its promise, just like the `sendSMS`.

```js
//User has sent his phone number for verification
textflow.sendVerificationSMS("+11234567890", verificationOptions);

//Show him the code submission form
//We will handle the verification code ourselves

//The user has submitted the code
let result = await textflow.verifyCode("+11234567890", "USER_ENTERED_CODE"); 
//if `result.valid` is true, then the phone number is verified. 
```

#### Verification options

`VerificationOptions` the optional argument for the `sendVerificationSMS` function. It contains the parameters of the verification code that should be sent:

`service_name` is what the user will see in the verification message, e. g. `"Your verification code for Guest is: CODE"`

`seconds` is how many seconds the code is valid. Default is 10 minutes. Maximum is one day. 
```json
{
  "service_name": "Guest",
  "seconds": 600
}
```

## Getting help

If you need help installing or using the library, please check the [FAQ](https://textflow.me) first, and contact us at [support@textflow.me](mailto://support@textflow.me) if you don't find an answer to your question.

If you've found a bug in the API, package or would like new features added, you are also free to contact us!
