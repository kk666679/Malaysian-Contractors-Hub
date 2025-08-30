// API service for monsoon risk planner functionality

const API_BASE_URL = 'http://localhost:5000/api';

// Helper function for API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  
  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  };
  
  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error('Monsoon risk API request error:', error);
    throw error;
  }
};

export const monsoonRiskService = {
  // Fetch weather forecast for a state and number of days
  fetchWeatherForecast: async (state, days = 7) => {
    return apiRequest(`/weather/forecast?state=${encodeURIComponent(state)}&days=${days}`);
  },
  
  // Assess monsoon risk based on project parameters
  assessMonsoonRisk: async (riskData) => {
    return apiRequest('/weather/monsoon-risk', {
      method: 'POST',
      body: JSON.stringify(riskData)
    });
  }
};

// Fallback to mock data if API is not available
export const useMockData = (process.env.NODE_ENV === 'development');

// Mock service implementation for development/testing
export const mockMonsoonRiskService = {
  fetchWeatherForecast: async (state, days = 7) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            state,
            forecast: Array.from({ length: days }, (_, i) => {
              const date = new Date();
              date.setDate(date.getDate() + i);
              return {
                date: date.toISOString(),
                weather: 'sunny',
                rainfall: 0,
                risk: 'none'
              };
            })
          }
        });
      }, 500);
    });
  },
  
  assessMonsoonRisk: async (riskData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            risk_level: 'low',
            overall_risk_score: 1.2,
            risk_breakdown: {
              high_risk_days: 1,
              medium_risk_days: 2,
              low_risk_days: 3,
              safe_days: riskData.duration_days - 6
            },
            optimal_work_days: [],
            avoid_work_days: [],
            recommendations: [
              'Schedule excavation work during dry periods',
              'Consider additional drainage measures'
            ]
          }
        });
      }, 500);
    });
  }
};

// Export the appropriate service based on environment
export default useMockData ? mockMonsoonRiskService : monsoonRiskService;
