const weatherService = require('../services/weatherService');

// Controller to get weather data for all cities
async function getWeather(req, res) {
  try {
    const weatherData = await weatherService.getAllWeatherData();
    res.json(weatherData);
  } catch (error) {
    console.error('Error in getWeather controller:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}

// Controller to get weather data for a specific city
async function getWeatherByCity(req, res) {
  try {
    const cityId = parseInt(req.params.cityId);
    const weatherData = await weatherService.fetchWeatherData(cityId);
    res.json(weatherData);
  } catch (error) {
    console.error(`Error in getWeatherByCity controller for city ID ${req.params.cityId}:`, error.message);
    res.status(500).json({ error: 'Failed to fetch weather data for city' });
  }
}

// Controller to get list of cities
function getCities(req, res) {
  try {
    const cities = weatherService.getCities();
    res.json(cities);
  } catch (error) {
    console.error('Error in getCities controller:', error.message);
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
}

module.exports = {
  getWeather,
  getWeatherByCity,
  getCities
};