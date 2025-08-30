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
          wind_speed: 8
        },
        forecast: [
          {
            date: '2024-07-18',
            high: 33,
            low: 25,
            condition: 'Thunderstorms',
            rainfall_chance: 70
          },
          {
            date: '2024-07-19',
            high: 32,
            low: 24,
            condition: 'Scattered Showers',
            rainfall_chance: 60
          },
          {
            date: '2024-07-20',
            high: 31,
            low: 25,
            condition: 'Partly Cloudy',
            rainfall_chance: 40
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
          wind_speed: 12
        },
        forecast: [
          {
            date: '2024-07-18',
            high: 31,
            low: 26,
            condition: 'Heavy Rain',
            rainfall_chance: 80
          },
          {
            date: '2024-07-19',
            high: 30,
            low: 25,
            condition: 'Thunderstorms',
            rainfall_chance: 70
          },
          {
            date: '2024-07-20',
            high: 31,
            low: 26,
            condition: 'Scattered Showers',
            rainfall_chance: 60
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
          wind_speed: 6
        },
        forecast: [
          {
            date: '2024-07-18',
            high: 32,
            low: 24,
            condition: 'Sunny',
            rainfall_chance: 10
          },
          {
            date: '2024-07-19',
            high: 33,
            low: 25,
            condition: 'Partly Cloudy',
            rainfall_chance: 20
          },
          {
            date: '2024-07-20',
            high: 32,
            low: 25,
            condition: 'Scattered Showers',
            rainfall_chance: 40
          }
        ]
      }
    ],
    monsoon_forecast: {
      northeast_monsoon: {
        start_date: '2024-11-01',
        end_date: '2025-03-31',
        affected_regions: ['East Coast of Peninsular Malaysia', 'Sabah', 'Sarawak'],
        severity: 'Moderate to Heavy',
        rainfall_expected: 'Above Average'
      },
      southwest_monsoon: {
        start_date: '2024-05-01',
        end_date: '2024-09-30',
        affected_regions: ['West Coast of Peninsular Malaysia'],
        severity: 'Mild to Moderate',
        rainfall_expected: 'Average'
      }
    }
  },

  // Get weather data for all regions
  getAllWeather: (req, res) => {
    res.json({
      success: true,
      data: this.weatherData
    });
  },

  // Get weather data for a specific region
  getRegionWeather: (req, res) => {
    const { region } = req.params;
    const regionData = this.weatherData.regions.find(r => 
      r.name.toLowerCase() === region.toLowerCase()
    );
    
    if (!regionData) {
      return res.status(404).json({
        success: false,
        message: 'Region not found'
      });
    }
    
    res.json({
      success: true,
      data: regionData
    });
  },

  // Get monsoon forecast
  getMonsoonForecast: (req, res) => {
    res.json({
      success: true,
      data: this.weatherData.monsoon_forecast
    });
  }
};

module.exports = weatherController;
