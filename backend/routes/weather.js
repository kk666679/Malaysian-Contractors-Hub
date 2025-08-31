import express from 'express';
const router = express.Router();
import weatherController from '../controllers/weatherController.js';

// Get weather data for all regions
router.get('/', weatherController.getAllWeather);

// Get monsoon forecast
router.get('/monsoon/forecast', weatherController.getMonsoonForecast);

// Get weather data for a specific region
router.get('/:region', weatherController.getRegionWeather);

export default router;
