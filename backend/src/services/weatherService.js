const axios = require('axios');
const cache = require('../utils/cache');
const fs = require('fs');
const path = require('path');

// Load cities from JSON file
const citiesFilePath = path.join(__dirname, '../data/cities.json');
let cities = [];

try {
  const citiesData = fs.readFileSync(citiesFilePath, 'utf8');
  cities = JSON.parse(citiesData);
  console.log('Cities loaded successfully');
} catch (error) {
  console.error('Error loading cities:', error);
}

// Function to fetch weather data from OpenWeatherMap API
async function fetchWeatherData(cityId) {
  try {
    // Check if data is in cache first
    const cachedData = cache.get(cityId.toString());
    if (cachedData) {
      console.log(`Cache hit for city ID: ${cityId}`);
      return cachedData;
    }

    // If not in cache, fetch from API
    console.log(`Fetching data from API for city ID: ${cityId}`);
    const API_KEY = process.env.OPENWEATHER_API_KEY;
    
    if (!API_KEY) {
      throw new Error('OpenWeatherMap API key is missing. Please set OPENWEATHER_API_KEY in .env file.');
    }
    
    const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}&units=metric`;
    const response = await axios.get(url);
    
    const weatherData = {
      id: response.data.id,
      name: response.data.name,
      description: response.data.weather[0].description,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      windSpeed: response.data.wind.speed
    };
    
    // Store in cache
    cache.set(cityId.toString(), weatherData);
    console.log(`Data cached for city ID: ${cityId}`);
    
    return weatherData;
  } catch (error) {
    console.error(`Error fetching weather data for city ID ${cityId}:`, error.message);
    throw error;
  }
}

// Function to get weather data for all cities
async function getAllWeatherData() {
  try {
    console.log('Fetching weather data for all cities');
    const weatherPromises = cities.map(city => fetchWeatherData(city.id));
    const weatherData = await Promise.all(weatherPromises);
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data for all cities:', error.message);
    throw error;
  }
}

// Function to get cities list
function getCities() {
  return cities;
}

module.exports = {
  fetchWeatherData,
  getAllWeatherData,
  getCities
};