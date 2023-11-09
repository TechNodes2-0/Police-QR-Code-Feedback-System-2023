// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure

const SID = `ACf84b54349fc2ac3fefdddb3ab394728e`;
const KEY = `77b00bfc5234d3ad691c2852d7073f50`;
const http = require("http");
const express = require("express");
const twilio = require("twilio");
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const app = express();
const port = process.env.PORT || 3000;
twilio(SID, KEY);

app.use(express.urlencoded({ extended: false }));

app.get("/",(req,res) => {
  const Welcome = "Welcome To Police Feedback System";
  res.status(200)
  res.end(Welcome);
});

app.post("/sms", (req, res) => {
  const twiml = new MessagingResponse();

  console.log(req);
  const messageBody = req.body.Body;
  const fromNumber = req.body.From;
  // Process the incoming message, e.g., by sending a reply

  twiml.message("Welcome To Police Feedback System");
  twiml.message(`Received your message: "${messageBody}" from ${fromNumber}`);

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

app.post("/sms-fails", (req,res) => {
  console.log(req);
  console.log("/sms Fails to Respond");
  res.status(500).end("Internal Server Error");
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
