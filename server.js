require('dotenv').config();
const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const app = express();
const api = require("@what3words/api");
            
api.setOptions({ key: process.env.WHAT3WORDS });

api.convertTo3wa({lat:51.520847, lng:-0.195521})
  .then(data => console.log(data));

api.autosuggest("freshen.overlook.clo", { 
    nFocusResults: 1,
    clipToCountry: ["FR"],
    focus: {lat:48.856618, lng:2.3522411},
    nResults: 1
  })
  .then(function(response) {
    var words = response.suggestions[0].words;
    console.log("Top 3 word address match: " + words);

    api.convertToCoordinates(words).then(function(response) {
      console.log("WGS84 Coordinates: " + 
        response.coordinates.lat + ', ' + response.coordinates.lng);
      console.log("Nearest Place: " + response.nearestPlace);
    });
  })
  .catch(function(error) {
    console.log("[code]", error.code);
    console.log("[message]", error.message);
  });




app.use(bodyParser.urlencoded({ extended: false }));

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  console.log(req.body.Body);
  
  twiml.message('The Robots are coming! Head for the hills!');
  
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
    console.log('Express server listening on port 1337');
});




// client.messages
//   .create({
//      body: 'want coffee!!',
//      from: '+16473706627',
//      to: '+'
//    })
//   .then(message => console.log(message.sid));