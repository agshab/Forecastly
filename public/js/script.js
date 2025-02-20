document.addEventListener("DOMContentLoaded", () => {
    // Define the API URL for the Demo weather data
    const apiUrl = "/api/weather";

    // Function to fetch weather data from the server
    const fetchWeatherData = async () => {
        const weatherDisplay = document.getElementById("weather-display");

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Failed to fetch weather data.");
            }
            const weatherData = await response.json();

            // Display weather data in the #weather-display section
            const weatherHTML = `
                <h3> ${weatherData.name}</h3>
                <p>Temperature: ${weatherData.main.temp}°F</p>
                <p>Feels Like: ${weatherData.main.feels_like}°F</p>
                <p>Weather: ${weatherData.weather[0].description}</p>
            `;
            
            weatherDisplay.innerHTML = weatherHTML;
        } catch (error) {
            console.error("Error fetching weather data:", error);

            // Display error message to the user
            weatherDisplay.innerHTML = `<p>Failed to load weather data. Please try again later.</p>`;
        }
    };

    // Fetches the weather data when the page loads
    fetchWeatherData();
});
