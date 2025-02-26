// DOM Elements
const cityNameElement = document.getElementById("city-name");
const weatherIconElement = document.getElementById("weather-icon");
const weatherConditionDetailsElement = document.getElementById("weather-condition-details");
const temperatureElement = document.getElementById("temperature");
const humidityElement = document.getElementById("humidity-display");
const windSpeedElement = document.getElementById("wind-speed-display");
const additionalWeatherDetailsElement = document.getElementById("additional-weather-details"); 
const pressureElement = document.getElementById("pressure-info");
const visibilityElement = document.getElementById("visibility-info");
const cloudinessElement = document.getElementById("cloudiness-info");
const rainChanceElement = document.getElementById("rain-chance-display");
const btnGetCityWeather = document.getElementById("btn-get-city-weather");
const cityInput = document.getElementById("city-input");
const toggleTempButton = document.getElementById("toggle-temp");
const forecastContainer = document.getElementById("forecast-container");
let isCelsius = false;

// Update Weather Display
const updateWeatherDisplay = (weatherData) => {
    cityNameElement.textContent = weatherData.name || "City not found";
    let tempF = Math.round(weatherData.main.temp);
    temperatureElement.textContent = `${tempF}°F`;
    isCelsius = false;
    weatherIconElement.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    weatherConditionDetailsElement.innerHTML = `<span>${weatherData.weather[0].description}</span>`;
    humidityElement.innerHTML = `Humidity: ${weatherData.main.humidity}%`;
    windSpeedElement.innerHTML = `Wind: ${weatherData.wind.speed} mph`;
    pressureElement.innerHTML = `Pressure: ${weatherData.main.pressure} hPa`;
    visibilityElement.innerHTML = `Visibility: ${weatherData.visibility / 1000} km`;
    cloudinessElement.innerHTML = `Cloudiness: ${weatherData.clouds.all}%`;
};

// Fetch Weather by City
const fetchWeatherByCity = async (city) => {
    const response = await fetch(`/api/weather_by_city?city=${city}`);
    if (!response.ok) throw new Error(`Failed to fetch weather data: ${response.status}`);
    const data = await response.json();
    updateWeatherDisplay(data);
};

// Fetch Weather by Geolocation
const fetchWeatherByLocation = async (lat, lon) => {
  const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
  if (!response.ok) throw new Error(`Failed to fetch weather data: ${response.status}`);
  const data = await response.json();
  updateWeatherDisplay(data);
};

// Get Current Geolocation and Fetch Weather Data
const fetchWeatherData = async () => {
  if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
  }
  try {
      navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude: lat, longitude: lon } = position.coords;
          await fetchWeatherByLocation(lat, lon);
          await getForecast(lat, lon);
      });
  } catch (error) {
      console.error("Error:", error);
  }
};

// Fetch Forecast by City
const getForecastByCity = async (city) => {
    const response = await fetch(`/api/forecast_by_city?city=${city}`);
    if (!response.ok) throw new Error(`Failed to fetch forecast data: ${response.status}`);
    const data = await response.json();
    updateForecast(data);
};

// Fetch Forecast by Geolocation
const getForecast = async (lat, lon) => {
    const response = await fetch(`/api/forecast?lat=${lat}&lon=${lon}`);
    if (!response.ok) throw new Error(`Failed to fetch forecast data: ${response.status}`);
    const data = await response.json();
    updateForecast(data);
};

// Update Time
setInterval(() => {
    const date = new Date();
    const currentDateTimeElement = document.getElementById("current-date-time");
    currentDateTimeElement.textContent = `${date.toLocaleString("en-US", { weekday: "short", hour: "2-digit", minute: "2-digit", hour12: true })}`;
}, 1000);

// Convert and update current and forecast temperature
toggleTempButton.onclick = function() {
  
  // Convert and update current temperature
  let temp = parseFloat(temperatureElement.textContent); 
  if (isCelsius) {
    temp = Math.round(temp * 1.8 +32);
    temperatureElement.innerText = `${temp}°F`
  }
  else {
    temp = Math.round((temp - 32) * 5 / 9);
    temperatureElement.innerText = `${temp}°C`
  }

  isCelsius = !isCelsius;
};

btnGetCityWeather.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherByCity(city);
        getForecastByCity(city);
    }
});

cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        const city = cityInput.value.trim();
        if (city) {
            fetchWeatherByCity(city);
            getForecastByCity(city);
        }
    }
});

document.addEventListener("DOMContentLoaded", fetchWeatherData);
