const cityNameElement = document.getElementById("city-name");
const weatherIconElement = document.getElementById("weather-icon");
const weatherConditionDetailsElement = document.getElementById("weather-condition-details");
const temperatureElement = document.getElementById("temperature");
const humidityElement = document.getElementById("humidity-display");
const windSpeedElement = document.getElementById("wind-speed-display");
const additionalWeatherDetailsElement = document.getElementById("additional-weather-details"); 
const searchIcon = document.getElementById("search-icon");
const searchDropdown = document.getElementById("search-dropdown");
const btnGetCityWeather = document.getElementById("btn-get-city-weather");
const cityInput = document.getElementById("city-input");

const pressureElement = document.getElementById("pressure-info");
const visibilityElement = document.getElementById("visibility-infoy");
const cloudinessElement = document.getElementById("cloudiness-info");
const rainChanceElement = document.getElementById("rain-chance-display");


// Display current weather
const updateWeatherDisplay = (weatherData) => {

  // Display current city name in the header
  if (weatherData.name) {
    cityNameElement.textContent = weatherData.name;
  } else {
    cityNameElement.textContent = "City not found";
  }

  // Set weather icon in Section A
  const iconCode = weatherData.weather[0].icon;
  weatherIconElement.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  
  // Populate weather description and temperature in Section A
  weatherConditionDetailsElement.textContent = weatherData.weather[0].description;
  temperatureElement.textContent = `${Math.round(weatherData.main.temp)}°F`;
  humidityElement.innerHTML = `Humidity: ${weatherData.main.humidity}`
  windSpeedElement.innerHTML = `Wind: ${weatherData.wind.speed}`
  
  // Populate additional weather data in Section B
  additionalWeatherDetailsElement.innerHTML = `
    <p>Pressure: ${weatherData.main.pressure} hPa</p>
    <p>Visibility: ${weatherData.visibility / 1000} km</p>
    <p>Cloudiness: ${weatherData.clouds.all}%</p>
  `;
};

// On Page load gets the user's geolocation and calls api with lat lon to fetch Weather data
document.addEventListener("DOMContentLoaded", () => {
  
  // Function to get user's geolocation
  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };
    
  // Makes call to api to fetch Weather Data using lat & lon 
  const fetchWeatherByLocation = async (lat, lon) => {
    const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.status}`);
    }
    let data = await response.json()
    return data;
  };

  // Function to get date and time layout
  setInterval(() => {
    const currentDateTimeElement = document.getElementById("current-date-time");
    const date = new Date();
    currentDateTimeElement.textContent = `${date.toLocaleString("en-US", { weekday: "short", hour: "2-digit", minute: "2-digit", hour12: true })}`;
  }, 1000);

  // Function to fetch weather data from the server using user's location
  const fetchWeatherData = async () => {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by this browser.");
        return;
    }
    try {
        const position = await getCurrentPosition();
        const { latitude: lat, longitude: lon } = position.coords;
        const weatherData = await fetchWeatherByLocation(lat, lon);
        updateWeatherDisplay(weatherData);
    } catch (error) {
        console.error("Error:", error);
        weatherConditionDetailsElement.innerHTML = `<p>Failed to load weather data. ${error.message}</p>`;
    }
  };
  
  fetchWeatherData();
});

// Makes call to api to fetch Weather data using city search bar
async function fetchWeatherByCity (city) {
  const response = await fetch(`/api/weather_by_city?city=${city}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch weather data: ${response.status}`);
  }
  let data = await response.json()

  updateWeatherDisplay(data);
}

// Fetch weather by city when the user types in city and Clicks the button "Get Weather"
btnGetCityWeather.addEventListener("click", () => {
  const city = cityInput.value.trim();
  fetchWeatherByCity(city);
});

// Fetch weather by city when user types in city and press enter
cityInput.addEventListener("keydown", function(e) {
  if (e.key === "Enter") { 
    e.preventDefault();
    const city = cityInput.value.trim();
    fetchWeatherByCity(city); 
  }
});



