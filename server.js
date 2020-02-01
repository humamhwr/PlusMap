require('dotenv').config();

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