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
        api.convertToCoordinates(words).then((response) => {
            resolve({lat: response.coordinates.lat, lng: response.coordinates.lng});
        })
    })
}

wa = convertTo3WA(51.520847, -0.195521);
coords = convertToCoords("embedded.fizzled.trial");

wa.then((r) => {
   console.log(r); 
});

coords.then((r) => {
    console.log(r);
})


console.log(wa, coords);


app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();
    console.log(req.body.Body);

    twiml.message('The Robots are coming! Head for the hills!');

    res.writeHead(200, { 'Content-Type': 'text/xml' });
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