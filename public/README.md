# Weather App

A simple weather application that allows users to check the weather by using browser's GeoLocation or by entering a city name. The app provides real-time weather data, including temperature, conditions, and more. It is responsive and works on both desktop and mobile devices.

## Features

- Real-time weather data fetched using an API
- Responsive design with CSS Grid layout
- Toggle between Celsius and Fahrenheit
- Five-day weather forecast
- User-friendly interface
- Hosted locally at `http://localhost:1776/`

## Technologies Used

- HTML, CSS, JavaScript for front-end
- CSS Grid for layout
- API integration for weather data
- `.env` file for security
- Express.js for backend
- GitHub for version control

## How to Open the Project

Follow these steps to set up and open the project on your local machine:

1.  **Install Node.js and NPM**  
    If you don't have Node.js installed, download and install it from [nodejs.org](https://nodejs.org/). This will also install NPM (Node Package Manager).

2.  **Clone the Repository**  
    Clone this project to your local machine by running the following command in your terminal (make sure you have Git installed):

    ```sh
    git clone https://github.com/agshab/Forecastly.git

    ```

3.  **Navigate to Project Directory**  
    After cloning the repository, open your terminal (or command prompt) and navigate to the project directory using the following command:

    `cd Forecastly`

4.  **Install Project Dependencies**
    Install the necessary dependencies by running the following command:

    `npm install`

5.  **Create and Configure the .env File**
    Create a .env file in the root of the project directory and add your API key for weather data. You can get your API key from OpenWeatherMap by

    - [signing up here:](https://home.openweathermap.org/users/sign_up)

    Once you have your API key, add it to the .env file like this:

    WEATHER_API_KEY=[Enter_your_api_key_here!]

6.  **Start the Server**
    Start the development server with the following command:

    `npm start `

7.  **Open the App in Your Browser**
    After starting the server, open your browser and go to:

    http://localhost:1776/

    You should now see the weather app running locally on your machine.

## API Links

- [Current Weather API](https://openweathermap.org/current)
- [Five-Day Forecast API](https://openweathermap.org/forecast5)

## Project Tasks

### Milestone 1: Project Setup and Basic Structure

- [x] Setup basic Express server to serve index.html
- [x] Added basic HTML and CSS for responsive layout for mobile and desktop

### Milestone 2: Weather Data Fetching and Basic Endpoint

- [x] Set up Express endpoint and update frontend to securely fetch weather data (using API key)
- [x] Added hardcoded dummy current weather data to ensure the callout works

### Milestone 3: UI Improvements

- [x] Enhance UI for mobile & web, add geolocation & search, refine API handling
- [x] Add toggle button for temperature conversion (Celsius/Fahrenheit)

### Milestone 4: Adding Forecast API

- [x] Integrate five-day weather forecast API
- [x] Add HTML structure for 5-day forecast section
- [x] Add fetch function to script.js for retrieving and displaying 5-day forecast
- [x] Add CSS styling for 5-day forecast display

### Milestone 5: Code Optimization

- [ ] Optimize performance and clean up code

### Milestone 6: Final Testing and Debugging

- [ ] Final debugging and responsiveness testing
