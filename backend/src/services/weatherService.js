/*const axios = require('axios');
const cache = require('../utils/cache');
const fs = require('fs');
const path = require('path');

// Load cities from JSON file
const citiesFilePath = path.join(__dirname, '../data/cities.json');
let cities = [];

try {
  const citiesData = fs.readFileSync(citiesFilePath, 'utf8');
  cities = JSON.parse(citiesData);
  console.log('Cities loaded successfully:', cities.length, 'cities');
} catch (error) {
  console.error('Error loading cities:', error);
}

// Function to fetch weather data from OpenWeatherMap API
async function fetchWeatherData(cityId) {
  try {
    console.log(`Processing request for city ID: ${cityId}`);
    
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
      const error = new Error('OpenWeatherMap API key is missing. Please set OPENWEATHER_API_KEY in .env file.');
      console.error(error.message);
      throw error;
    }
    
    console.log(`Using API key: ${API_KEY.substring(0, 8)}...`);
    
    const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}&units=metric`;
    console.log(`Making request to: ${url}`);
    
    const response = await axios.get(url);
    
    // Log the response status
    console.log(`API response status for city ${cityId}: ${response.status}`);
    
    // Check if response data has the expected structure
    if (!response.data || !response.data.main || !response.data.weather) {
      const error = new Error(`Invalid API response structure for city ${cityId}`);
      console.error(error.message);
      console.error('Response data:', JSON.stringify(response.data, null, 2));
      throw error;
    }
    
    // Extract only the required fields as per the assignment
    const weatherData = {
      id: response.data.id,
      name: response.data.name,                         // City Name
      description: response.data.weather[0].description, // Weather Condition
      temperature: response.data.main.temp              // Temperature
    };
    
    // Store in cache
    cache.set(cityId.toString(), weatherData);
    console.log(`Data cached for city ID: ${cityId}`);
    
    return weatherData;
  } catch (error) {
    console.error(`Error fetching weather data for city ID ${cityId}:`, error.message);
    if (error.response) {
      console.error(`API response status: ${error.response.status}`);
      console.error(`API response data: ${JSON.stringify(error.response.data)}`);
    }
    if (error.stack) {
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
}

// Function to get weather data for all cities
async function getAllWeatherData() {
  try {
    console.log('Fetching weather data for all cities');
    console.log('Cities to fetch:', cities.map(c => c.id));
    
    const weatherPromises = cities.map(city => {
      console.log(`Creating promise for city ID: ${city.id}`);
      return fetchWeatherData(city.id);
    });
    
    console.log(`Created ${weatherPromises.length} promises`);
    const weatherData = await Promise.all(weatherPromises);
    console.log(`Successfully fetched data for ${weatherData.length} cities`);
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data for all cities:', error.message);
    if (error.stack) {
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
}

// Function to get cities list
function getCities() {
  console.log('Returning cities list:', cities.length, 'cities');
  return cities;
}

module.exports = {
  fetchWeatherData,
  getAllWeatherData,
  getCities
};*/

// backend/src/services/weatherService.js
const axios = require('axios');
const NodeCache = require('node-cache');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes

// Load city data
const citiesPath = path.join(__dirname, '../data/cities.json');
let cities = [];

try {
  const data = fs.readFileSync(citiesPath, 'utf8');
  const parsedData = JSON.parse(data);
  cities = parsedData.List || []; // Access the List property
} catch (error) {
  console.error('Error reading cities.json:', error);
}

function getCities() {
  return cities;
}

async function fetchWeatherData(cityId) {
  const cacheKey = `weather_${cityId}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) throw new Error('OPENWEATHER_API_KEY is missing in .env');

  const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const data = {
      id: cityId,
      name: response.data.name,
      description: response.data.weather[0].description,
      temperature: response.data.main.temp,
    };

    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error fetching data for city ${cityId}:`, error.message);
    throw new Error(`Failed to fetch weather data for city ID ${cityId}`);
  }
}

async function getAllWeatherData() {
  const results = [];
  for (const city of cities) {
    try {
      const data = await fetchWeatherData(city.CityCode);
      results.push(data);
    } catch (error) {
      console.error(`Error in getAllWeatherData for city ${city.CityCode}:`, error.message);
    }
  }
  return results;
}

module.exports = {
  getCities,
  fetchWeatherData,
  getAllWeatherData,
};
