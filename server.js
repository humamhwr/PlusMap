require('dotenv').config();
const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const app = express();
const api = require("@what3words/api");
app.use(bodyParser.urlencoded({ extended: false }));

api.setOptions({ key: process.env.WHAT3WORDS });

function convertTo3WA (lat, long) {
    return new Promise((resolve, reject) => {
        api.convertTo3wa({ lat: lat, lng: long }).then((response) => {
            resolve(response.words);
        });
    })
    
}


function convertToCoords(words) {
    return new Promise((resolve, reject) => {
        api.convertToCoordinates(words.replace(' ', '.')).then((response) => {
            resolve({lat: response.coordinates.lat, lng: response.coordinates.lng});
        })
    })
}

wa = convertTo3WA(51.520847, -0.195521);
coords = convertToCoords("embedded.fizzled.trial");






app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();
    sms = req.body.Body;


    if (/[0-9]/.test(sms)) {
        // it's coords
        longlat = sms.split('=')[1];
        longLatArray = longlat.split("%2C");

        convertTo3WA(longLatArray[0], longLatArray[1]).then((r) => {
            twiml.message(r);
            res.writeHead(200, { 'Content-Type': 'text/xml' });
            res.end(twiml.toString());
        });        

    } else { convertToCoords(sms).then((r)=> { 
      twiml.message(r);
      res.wristhead(200, {'content-type': 'text/xml'}); 
      res.end(twiml.toString());}
      ) 
    }
  
        // it's words
    }



    
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