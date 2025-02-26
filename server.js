"use strict";

require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const port = 1776;

const cors = require("cors");
app.use(cors());

const api_key = process.env.WEATHER_API_KEY;
// Define the API URL for the weather forecast
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={your-api-key}&units=imperal"; 


// Serve front-end content in the public directory
app.use("", express.static(path.join(__dirname, "./public")));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Created a demo weather object to return
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

// Calls external weather api using lattitude and longitude parameters -- returns weather Data or error
async function getWeather(lat, lon) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${api_key}`;

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        return data;     // Returns JSON Weather Data
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Calls external weather api using city -- returns weather Data or error
async function getWeatherByCity(city){
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${api_key}`;

    try{
        let response = await fetch(apiUrl);
        let data = await response.json();
        return data;
    }   
    catch (error){
        console.error(`Error fetching Weather for ${city}`)
    }
}


// Calls external weather API for 5-day forecast using latitude and longitude -- returns weather Data or error
async function getFiveDayForecast(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${api_key}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data; // Returns 5-day weather forecast data
    } catch (error) {
        console.error("Error fetching 5-day forecast data:", error);
        throw error; // Propagate the error to the calling function
    }
}

// Calls external weather API for 5-day forecast using city -- returns weather Data or error
async function getFiveDayForecastByCity(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${api_key}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;  // Returns weather data for the next 5 days (every 3 hours)
    } catch (error) {
        console.error(`Error fetching 5-day forecast for ${city}:`, error);
        throw error;  // Propagate the error to the calling function
    }
}


// Define the routes


// Returns 5-day forecast based on Latitude and Longitude values
app.get('/api/forecast', async function (req, res) {
    const { lat, lon } = req.query;
    console.log(`lat: ${lat} lon: ${lon}`);
    
    try {
        const forecastData = await getFiveDayForecast(lat, lon);
        res.status(200).json(forecastData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get weather data' });
    }
});

// Returns 5-day forecast based on City
app.get('/api/forecast_by_city', async function (req, res) {
    const city = req.query.city;
    console.log(`city: ${city}`);
    
    try {
        const forecastData = await getFiveDayForecastByCity(city);
        res.status(200).json(forecastData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get 5-day forecast data' });
    }
});

// Returns Current Weather Based on Latitude and Longitude values 
app.get('/api/weather', async function (req, res) {
    try {
        let weatherData = await getWeather(req.query.lat, req.query.lon);
        res.status(200).json(weatherData);
    } catch {
        res.status(500).json({ error: 'Failed to get weather Data' });
    }
});

// Returns Current Weather Based on City 
app.get('/api/weather_by_city', async function (req, res) {
    try {
        let weatherData = await getWeatherByCity(req.query.city);
        res.status(200).json(weatherData);
    } catch {
        res.status(500).json({ error: 'Failed to get weather Data' });
    }
});


// Serve the whole app
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log("Press Ctrl+C to end this process.");
});
