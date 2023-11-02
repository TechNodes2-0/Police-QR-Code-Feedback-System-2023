const https = require('https');

TextFlow = {}

const API_KEY = { value: "" }


/**
* Set the API key, so that the service knows that you are authorized to use it.
* @param {string} apiKey Unique key created using the [API Console](https://textflow.me/api)
* @example
* textflow.useKey("YOUR_API_KEY");
*/
TextFlow.useKey = function (apiKey) {
    API_KEY.value = apiKey;
    return TextFlow;
}

/**
 * Information about the delivered message
 * @typedef {Object} SendMessageData
 * @property {string} to Recipient phone number
 * @property {string} content Message body
 * @property {string} country Recipient country
 * @property {number} price How much did you pay for the message
 * @property {integer} timestamp Timestamp that contains the time the message was sent
 */

/**
 * Information about the phone verification process
 * @typedef {Object} VerifyPhoneData
 * @property {string} verification_code The verification code
 * @property {integer} expires Timestamp that contains the code expiration time
 * @property {string} message_text Full text of the message sent to the user
 */

/**
 * Result status of the TextFlow Send SMS API call
 * @typedef {Object} SendMessageResult
 * @property {boolean} ok True if the message was successfully sent, false otherwise. 
 * @property {integer} status Status code
 * @property {string} message Status message
 * @property {SendMessageData} [data] If the message was sent successfully, additional data about the message is returned
 */

/**
 * Result status of the TextFlow Verify phone number API call
 * @typedef {Object} VerifyPhoneResult
 * @property {boolean} ok True if the verification message was successfully sent, false otherwise. 
 * @property {integer} status Status code
 * @property {string} message Status message
 * @property {VerifyPhoneData} [data] If the message was sent successfully, additional data about the verification is returned, including the message text, verification code and the expiration of the message as a timestamp.
 */

/**
 * Result status of the TextFlow Verify code API call
 * @typedef {Object} VerifyCodeResult
 * @property {boolean} ok True if there were no errors. 
 * @property {integer} status Status code
 * @property {string} message Status message
 * @property {boolean} valid True if the code the user has sent is valid, false otherwise. 
 * @property {boolean} [valid_code] True if the code the user has sent is valid, false otherwise. 
 * @property {integer} [expires] True if the code the user has sent is valid, false otherwise. 
 */

/**
 * Options about the verification process, including your identification, verification code length and how long is it valid for. 
 * @typedef {Object} VerificationOptions
 * @property {string} [service_name] What the user will see in the verification message, if the `service_name` is `"Guest"`, they would get the message: `"Your verification code for Guest is: CODE"`. Default is none. 
 * @property {integer} [seconds] How many seconds is the code valid for. Default is 10 minutes. Maximum is one day. 
 */

/**
 * Callback function that handles the result of a Send SMS request
 * @callback sendSMSCallback
 * @param {SendMessageResult} result Result status of the TextFlow Send SMS API call as {@link SendMessageResult}.
 */

/**
 * Callback function that handles the result of a Verify phone number request
 * @callback verifyPhoneCallback
 * @param {VerifyPhoneResult} result Result status of the TextFlow Verify phone number API call as  {@link VerifyPhoneResult}.
 */

/**
 * Callback function that handles the result of a Verify code request
 * @callback verifyCodeCallback
 * @param {VerifyCodeResult} result Result status of the TextFlow Verify code API call as  {@link VerifyCodeResult}.
 */


/**
 * Verify the code that the customer has submitted
 * @param {string} phone_number Phone number to verify, including country calling code, like `+381617581234`
 * @param {string} code Verification code that the user has submited. 
 * @param {verifyCodeCallback} callback Callback function that handles the result of the Verify code request
 * @returns {Promise<VerifyCodeResult> | undefined}  If callback is specified, the function does not return anything, but instead calls it, passing it the {@link VerifyCodeResult} as an argument. Otherwise, it returns the promise of {@link VerifyCodeResult}.
 * @example
 * // Prior to the call of this
 * // function, you have called the 
 * // sendVerificationSMS and the user
 * // has submitted the code to verify
 * 
 *  textflow.verifyCode(
 *      "+3811231234", "4045", 
 *      (result)=>{
 *          if(result.valid){
 *              //Phone number is valid
 *          }
 *      })
 */
TextFlow.verifyCode = async function (phone_number, code, callback) {
    if (!callback) {
        return new Promise((resolve, reject) => {
            TextFlow.verifyCode(phone_number, code, (result) => {
                resolve(result);
            });
        })
    }

    if (!phone_number) {
        let bad_phone_number = {
            ok: false,
            status: 400,
            message: "You have not specified the phone number. "
        };
        return callback(bad_phone_number);
    }
    if (!code) {
        let bad_code = {
            ok: false,
            status: 400,
            message: "You have not specified the verification code. "
        };
        return callback(bad_code);
    }

    if (!API_KEY.value) {
        let api_key_missing = {
            ok: false,
            status: 400,
            message: "You have not specified the API key. Specify it by calling the useKey function. "
        };
        return callback(api_key_missing);
    }

    let data = JSON.stringify({ phone_number, code });
    let reqOptions = {
        hostname: 'textflow.me',
        port: 443,
        path: '/api/verify-code',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + API_KEY.value
        }
    }
    let req = https
        .request(reqOptions, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                let res = JSON.parse(data);
                let result = {
                    ok: res.ok,
                    status: res.status,
                    message: res.message,
                    valid: res.valid
                };
                if (res.valid_code) {
                    result.valid_code = res.valid_code;
                }
                if (res.expires) {
                    result.expires = res.expires;
                }
                callback(result)
            });
        })
        .on('error', err => {
            console.log("EVO ERR");
            callback({
                ok: err.ok,
                status: err.status,
                message: err.message
            });
        })
    req.write(data);
    req.end();
}

/**
 * Send phone number verification SMS to your customers
 * @param {string} phone_number Phone number to verify, including country calling code, like `+381617581234`
 * @param {VerificationOptions?} options Options about the verification process, including your identification, verification code length and how long is it valid for. 
 * @param {verifyPhoneCallback?} callback Callback function that handles the result of the Verify phone number request
 * @returns {Promise<VerifyPhoneResult> | undefined}  If callback is specified, the function does not return anything, but instead calls it, passing it the {@link VerifyPhoneResult} as an argument. Otherwise, it returns the promise of {@link VerifyPhoneResult}.
 * @example
 * //User has sent his phone number for verification
 * textflow.sendVerificationSMS(phone_number);
 * 
 * //Show him the code submission form
 * 
 * //The user has submitted the code
 * let result = await textflow.verifyCode(phone_number, verification_code);
 * if(result.valid){
 *     //The user is real
 * }
 * else{
 *     //Maybe there was a typo?
 * }
 * 
 */
TextFlow.sendVerificationSMS = async function (phone_number, options, callback) {
    if (!callback) {
        return new Promise((resolve, reject) => {
            TextFlow.sendVerificationSMS(phone_number, options, (result) => {
                resolve(result);
            });
        })
    }

    if (!phone_number) {
        let bad_phone_number = {
            ok: false,
            status: 400,
            message: "You have not specified the phone number. "
        };
        return callback(bad_phone_number);
    }

    if (!API_KEY.value) {
        let api_key_missing = {
            ok: false,
            status: 400,
            message: "You have not specified the API key. Specify it by calling the useKey function. "
        };
        return callback(api_key_missing);
    }


    let data = JSON.stringify({
        phone_number,
        service_name: options?.service_name,
        seconds: options?.seconds
    });

    let reqOptions = {
        hostname: 'textflow.me',
        port: 443,
        path: '/api/send-code',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + API_KEY.value
        }
    }
    let req = https
        .request(reqOptions, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                let res = JSON.parse(data);
                let result = {
                    ok: res.ok,
                    status: res.status,
                    message: res.message
                };
                if (res.data) result.data = res.data;
                callback(result)
            });
        })
        .on('error', err => {
            callback({
                ok: err.ok,
                status: err.status,
                message: err.message
            });
        })
    req.write(data);
    req.end();


}


/**
* Method that is used to send an SMS. 
* @param {string} phone_number Recipient phone number, including country calling code, like `+381617581234`
* @param {string} text Message body
* @param {sendSMSCallback?} callback Callback function that handles the result of the Send SMS request
* @returns {Promise<SendMessageResult> | undefined} If callback is specified, the function does not return anything, but instead calls it, passing it the {@link SendMessageResult} as an argument. Otherwise, it returns the promise of {@link SendMessageResult}.
* @example
* textflow.useKey("YOUR_API_KEY");
* textflow.sendMessage(
    "+381617581234", 
    "This is message body. ", 
    result => { 
        if(!result.ok)
            return console.log("ERROR") 
        ...
    });
*/

TextFlow.sendSMS = async function (phone_number, text, callback) {
    if (!callback) {
        return new Promise((resolve, reject) => {
            TextFlow.sendSMS(phone_number, text, (result) => {
                resolve(result);
            });
        })
    }

    if (!phone_number) {
        let bad_phone_number = {
            ok: false,
            status: 400,
            message: "You have not specified the recipient phone number. "
        };
        return callback(bad_phone_number);
    }
    if (!text) {
        let bad_text = {
            ok: false,
            status: 400,
            message: "You have not specified the message body. "
        };
        return callback(bad_text);
    }
    if (!API_KEY.value) {
        let api_key_missing = {
            ok: false,
            status: 400,
            message: "You have not specified the API key. Specify it by calling the useKey function. "
        };
        return callback(api_key_missing);
    }
    let data = JSON.stringify({ phone_number, text });
    let reqOptions = {
        hostname: 'textflow.me',
        port: 443,
        path: '/api/send-sms',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + API_KEY.value
        }
    }
    let req = https
        .request(reqOptions, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                let res = JSON.parse(data);
                let result = {
                    ok: res.ok,
                    status: res.status,
                    message: res.message
                };
                if (res.data) result.data = res.data;
                callback(result)
            });
        })
        .on('error', err => {
            callback({
                ok: err.ok,
                status: err.status,
                message: err.message
            });
        })
    req.write(data);
    req.end();
}



module.exports = TextFlow
