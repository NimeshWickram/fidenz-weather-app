const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Test endpoint
router.get('/test', weatherController.test);

// API endpoint to get weather data for all cities
router.get('/weather', weatherController.getWeather);

// API endpoint to get weather data for a specific city
router.get('/weather/:cityId', weatherController.getWeatherByCity);

// API endpoint to get list of cities
router.get('/cities', weatherController.getCities);

module.exports = router;