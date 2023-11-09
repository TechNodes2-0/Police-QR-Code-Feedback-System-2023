// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const SID = `ACf84b54349fc2ac3fefdddb3ab394728e`;
const KEY = `77b00bfc5234d3ad691c2852d7073f50`;
const accountSid = SID;
const authToken = KEY;
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
    body: "Hiii",
    from: "+12055264759",
    to: "+12252542523",
  })
  .then((message) => console.log(message.sid));

console.log(client._httpClient.lastRequest.data);
  // console.log(client);