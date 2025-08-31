// Weather controller for handling weather-related operations
const weatherController = {
  // Mock weather data for Malaysian regions
  weatherData: {
    regions: [
      {
        name: 'Kuala Lumpur',
        current: {
          temperature: 32,
          humidity: 75,
          condition: 'Partly Cloudy',
          rainfall_chance: 30,
          wind_speed: 8,
          wind_direction: 'NE',
          visibility: 10,
          uv_index: 7,
          last_updated: new Date().toISOString()
        },
        forecast: [
          {
            date: this.generateDate(1),
            high: 33,
            low: 25,
            condition: 'Thunderstorms',
            rainfall_chance: 70,
            sunrise: '07:01',
            sunset: '19:22'
          },
          {
            date: this.generateDate(2),
            high: 32,
            low: 24,
            condition: 'Scattered Showers',
            rainfall_chance: 60,
            sunrise: '07:01',
            sunset: '19:22'
          },
          {
            date: this.generateDate(3),
            high: 31,
            low: 25,
            condition: 'Partly Cloudy',
            rainfall_chance: 40,
            sunrise: '07:02',
            sunset: '19:22'
          }
        ]
      },
      {
        name: 'Penang',
        current: {
          temperature: 30,
          humidity: 80,
          condition: 'Scattered Showers',
          rainfall_chance: 50,
          wind_speed: 12,
          wind_direction: 'SW',
          visibility: 8,
          uv_index: 6,
          last_updated: new Date().toISOString()
        },
        forecast: [
          {
            date: this.generateDate(1),
            high: 31,
            low: 26,
            condition: 'Heavy Rain',
            rainfall_chance: 80,
            sunrise: '07:05',
            sunset: '19:30'
          },
          {
            date: this.generateDate(2),
            high: 30,
            low: 25,
            condition: 'Thunderstorms',
            rainfall_chance: 70,
            sunrise: '07:05',
            sunset: '19:30'
          },
          {
            date: this.generateDate(3),
            high: 31,
            low: 26,
            condition: 'Scattered Showers',
            rainfall_chance: 60,
            sunrise: '07:05',
            sunset: '19:30'
          }
        ]
      },
      {
        name: 'Johor Bahru',
        current: {
          temperature: 31,
          humidity: 70,
          condition: 'Sunny',
          rainfall_chance: 10,
          wind_speed: 6,
          wind_direction: 'E',
          visibility: 12,
          uv_index: 8,
          last_updated: new Date().toISOString()
        },
        forecast: [
          {
            date: this.generateDate(1),
            high: 32,
            low: 24,
            condition: 'Sunny',
            rainfall_chance: 10,
            sunrise: '06:58',
            sunset: '19:15'
          },
          {
            date: this.generateDate(2),
            high: 33,
            low: 25,
            condition: 'Partly Cloudy',
            rainfall_chance: 20,
            sunrise: '06:58',
            sunset: '19:15'
          },
          {
            date: this.generateDate(3),
            high: 32,
            low: 25,
            condition: 'Scattered Showers',
            rainfall_chance: 40,
            sunrise: '06:59',
            sunset: '19:15'
          }
        ]
      }
    ],
    monsoon_forecast: {
      northeast_monsoon: {
        start_date: '2025-11-01',
        end_date: '2025-03-31',
        affected_regions: ['East Coast of Peninsular Malaysia', 'Sabah', 'Sarawak'],
        severity: 'Moderate to Heavy',
        rainfall_expected: 'Above Average',
        advisory: 'Potential for flooding in low-lying areas'
      },
      southwest_monsoon: {
        start_date: '2025-05-01',
        end_date: '2025-09-30',
        affected_regions: ['West Coast of Peninsular Malaysia'],
        severity: 'Mild to Moderate',
        rainfall_expected: 'Average',
        advisory: 'Generally fair weather with occasional showers'
      }
    },
    alerts: [
      {
        region: 'Kuala Lumpur',
        type: 'Thunderstorm',
        severity: 'Moderate',
        issued: new Date().toISOString(),
        valid_until: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(), // 3 hours from now
        description: 'Thunderstorms expected this afternoon'
      }
    ]
  },

  // Utility function to generate dynamic dates
  generateDate: function(daysFromNow) {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
  },

  // Get weather data for all regions
  getAllWeather: function(req, res) {
    try {
      res.json({
        success: true,
        timestamp: new Date().toISOString(),
        data: this.weatherData.regions,
        monsoon_forecast: this.weatherData.monsoon_forecast,
        alerts: this.weatherData.alerts
      });
    } catch (error) {
      console.error('Error getting all weather data:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // Get weather data for a specific region
  getRegionWeather: function(req, res) {
    try {
      const { region } = req.params;
      
      // Validate input
      if (!region || typeof region !== 'string' || region.length > 50) {
        return res.status(400).json({
          success: false,
          message: 'Invalid region parameter'
        });
      }
      
      const regionData = this.weatherData.regions.find(r =>
        r.name.toLowerCase() === region.toLowerCase().trim()
      );

      if (!regionData) {
        return res.status(404).json({
          success: false,
          message: 'Region not found. Available regions: Kuala Lumpur, Penang, Johor Bahru'
        });
      }

      res.json({
        success: true,
        timestamp: new Date().toISOString(),
        data: regionData
      });
    } catch (error) {
      console.error('Error getting region weather:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // Get monsoon forecast
  getMonsoonForecast: function(req, res) {
    try {
      res.json({
        success: true,
        timestamp: new Date().toISOString(),
        data: this.weatherData.monsoon_forecast
      });
    } catch (error) {
      console.error('Error getting monsoon forecast:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // Get weather alerts
  getWeatherAlerts: function(req, res) {
    try {
      const { region } = req.query;
      
      let alerts = this.weatherData.alerts;
      
      // Filter by region if provided
      if (region) {
        alerts = alerts.filter(alert => 
          alert.region.toLowerCase().includes(region.toLowerCase())
        );
      }
      
      res.json({
        success: true,
        timestamp: new Date().toISOString(),
        data: alerts
      });
    } catch (error) {
      console.error('Error getting weather alerts:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // Get weather comparison between regions
  compareRegions: function(req, res) {
    try {
      const { regions } = req.query;
      
      if (!regions) {
        return res.status(400).json({
          success: false,
          message: 'Regions parameter is required. Example: ?regions=Kuala Lumpur,Penang'
        });
      }
      
      const regionList = regions.split(',').map(region => region.trim());
      const comparisonData = [];
      
      for (const regionName of regionList) {
        const regionData = this.weatherData.regions.find(r =>
          r.name.toLowerCase() === regionName.toLowerCase()
        );
        
        if (regionData) {
          comparisonData.push({
            region: regionData.name,
            current: regionData.current
          });
        }
      }
      
      if (comparisonData.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No valid regions found for comparison'
        });
      }
      
      res.json({
        success: true,
        timestamp: new Date().toISOString(),
        data: comparisonData
      });
    } catch (error) {
      console.error('Error comparing regions:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
};

export default weatherController;