"use strict";

require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const port = 1776;

const cors = require("cors");
app.use(cors());

const api_key = process.env.WEATHER_API_KEY;

// Serve front-end content in the public directory
app.use("", express.static(path.join(__dirname, "./public")));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Create a demo weather object to return
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
    "name": "Bardstown",
    "cod": 200
};

// Calls external weather api using lattitude and longitude parameters
async function getWeather(lat, lon) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${api_key}`;

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        console.log(data); // Check if data is received
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Define the route

// Returns Demo Current Weather
app.get('/api/weather', function(req, res) {
    res.status(200).json(demoCurrentWeather);
});

// Route returns Current Weather from external api call

// Serve the whole app
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log("Press Ctrl+C to end this process.");
});
