const express = require('express');
const cors = require('cors');
const axios = require('axios');
const NodeCache = require('node-cache');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Create a cache instance with 5 minute TTL (in seconds)
const cache = new NodeCache({ stdTTL: 300 });

// Middleware
app.use(cors());
app.use(express.json());

// Load cities from JSON file
const citiesFilePath = path.join(__dirname, 'cities.json');
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

// API endpoint to get weather data for all cities
app.get('/api/weather', async (req, res) => {
  try {
    console.log('Fetching weather data for all cities');
    const weatherPromises = cities.map(city => fetchWeatherData(city.id));
    const weatherData = await Promise.all(weatherPromises);
    res.json(weatherData);
  } catch (error) {
    console.error('Error in /api/weather endpoint:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// API endpoint to get weather data for a specific city
app.get('/api/weather/:cityId', async (req, res) => {
  try {
    const cityId = parseInt(req.params.cityId);
    const weatherData = await fetchWeatherData(cityId);
    res.json(weatherData);
  } catch (error) {
    console.error(`Error in /api/weather/${cityId} endpoint:`, error.message);
    res.status(500).json({ error: 'Failed to fetch weather data for city' });
  }
});

// API endpoint to get list of cities
app.get('/api/cities', (req, res) => {
  res.json(cities);
});

app.listen(port, () => {
  console.log(`Weather backend server running on port ${port}`);
});