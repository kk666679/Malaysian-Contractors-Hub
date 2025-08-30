const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Get weather data for all regions
router.get('/', weatherController.getAllWeather);

// Get weather data for a specific region
router.get('/:region', weatherController.getRegionWeather);

// Get monsoon forecast
router.get('/monsoon/forecast', weatherController.getMonsoonForecast);

module.exports = router;
