"use strict";

const express = require("express");
const app = express();
const path = require("path");
const port = 1776;

// Serves the front-end content in the public directory
app.use("", express.static(path.join(__dirname, "./public")));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Create Demo JSON Current Weather Object to Return
let demoCurrentWeather = {
    "weather": [
        {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
        }
    ],
    "main": {
        "temp": 22.08,
        "feels_like": 13.62,
        "temp_min": 20.48,
        "temp_max": 24.03,
        "pressure": 1028,
        "humidity": 68
    },
    "visibility": 10000,
    "wind": {
        "speed": 6.91,
        "deg": 350
    },
    "clouds": {
        "all": 100
    },
    "dt": 1740000984,
    "sys": {
        "type": 2,
        "id": 2020758,
        "country": "US",
        "sunrise": 1739968039,
        "sunset": 1740007475
    },
    "timezone": -18000,
    "id": 4304058,
    "name": "Pewee Valley",
    "cod": 200
  }

// Use the expreess Router object
let router = express.Router();

// Create Get to return aa list of all pies
router.get('/', function(req, res, next) {
    res.status(200).json(demoCurrentWeather);
});

// Configure router so all router are prefixed with /api/v1 
app.use('/api/', router);

// Serves the whole app
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log("Press Ctrl+C to end this process.");
})

/* Demo Current Weather JSON data
{
  "weather": [
      {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
      }
  ],
  "main": {
      "temp": 22.08,
      "feels_like": 13.62,
      "temp_min": 20.48,
      "temp_max": 24.03,
      "pressure": 1028,
      "humidity": 68
  },
  "visibility": 10000,
  "wind": {
      "speed": 6.91,
      "deg": 350
  },
  "clouds": {
      "all": 100
  },
  "dt": 1740000984,
  "sys": {
      "type": 2,
      "id": 2020758,
      "country": "US",
      "sunrise": 1739968039,
      "sunset": 1740007475
  },
  "timezone": -18000,
  "id": 4304058,
  "name": "Pewee Valley",
  "cod": 200
}

*/