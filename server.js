const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;


const client = require('twilio')(accountSid, authToken);


client.messages
  .create({
     body: 'want coffee!!',
     from: '+16473706627',
     to: '+15144330161'
   })
  .then(message => console.log(message.sid));