const weatherService = require('../services/weatherService');

// Test controller
function test(req, res) {
  console.log('Test endpoint called');
  res.json({ message: 'Backend is working!', timestamp: new Date().toISOString() });
}

// Controller to get weather data for all cities
async function getWeather(req, res) {
  try {
    console.log('Received request for weather data for all cities');
    console.log('Calling weatherService.getAllWeatherData()');
    const weatherData = await weatherService.getAllWeatherData();
    console.log('Successfully fetched weather data for all cities');
    console.log('Returning', weatherData.length, 'cities');
    res.json(weatherData);
  } catch (error) {
    console.error('Error in getWeather controller:', error.message);
    if (error.stack) {
      console.error('Error stack:', error.stack);
    }
    res.status(500).json({ error: 'Failed to fetch weather data', details: error.message });
  }
}

// Controller to get weather data for a specific city
async function getWeatherByCity(req, res) {
  try {
    const cityId = parseInt(req.params.cityId);
    console.log(`Received request for weather data for city ID: ${cityId}`);
    console.log(`Calling weatherService.fetchWeatherData(${cityId})`);
    const weatherData = await weatherService.fetchWeatherData(cityId);
    console.log(`Successfully fetched weather data for city ID: ${cityId}`);
    res.json(weatherData);
  } catch (error) {
    console.error(`Error in getWeatherByCity controller for city ID ${req.params.cityId}:`, error.message);
    if (error.stack) {
      console.error('Error stack:', error.stack);
    }
    res.status(500).json({ error: 'Failed to fetch weather data for city', details: error.message });
  }
}

// Controller to get list of cities
function getCities(req, res) {
  try {
    console.log('Received request for cities list');
    console.log('Calling weatherService.getCities()');
    const cities = weatherService.getCities();
    console.log('Successfully fetched cities list');
    console.log('Returning', cities.length, 'cities');
    res.json(cities);
  } catch (error) {
    console.error('Error in getCities controller:', error.message);
    if (error.stack) {
      console.error('Error stack:', error.stack);
    }
    res.status(500).json({ error: 'Failed to fetch cities', details: error.message });
  }
}

module.exports = {
  test,
  getWeather,
  getWeatherByCity,
  getCities
};