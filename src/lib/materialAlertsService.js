// API service for material alerts functionality

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
    console.error('Material alerts API request error:', error);
    throw error;
  }
};

export const materialAlertsService = {
  // Get material price alerts with optional filters
  getMaterialAlerts: async (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    return apiRequest(`/material-alerts${queryString ? '?' + queryString : ''}`);
  },
  
  // Get material shortage alerts
  getShortageAlerts: async () => {
    return apiRequest('/material-alerts/shortages');
  },
  
  // Get material categories
  getMaterialCategories: async () => {
    return apiRequest('/material-alerts/categories');
  },
  
  // Subscribe to material alerts
  subscribeToAlert: async (alertId) => {
    return apiRequest(`/material-alerts/${alertId}/subscribe`, {
      method: 'POST'
    });
  },
  
  // Unsubscribe from material alerts
  unsubscribeFromAlert: async (alertId) => {
    return apiRequest(`/material-alerts/${alertId}/unsubscribe`, {
      method: 'POST'
    });
  },
  
  // Get user's subscribed alerts
  getSubscribedAlerts: async () => {
    return apiRequest('/material-alerts/subscriptions');
  },
  
  // Get market trends data
  getMarketTrends: async () => {
    return apiRequest('/material-alerts/market-trends');
  },
  
  // Get supply chain insights
  getSupplyChainInsights: async () => {
    return apiRequest('/material-alerts/supply-chain');
  },
  
  // Get material cost forecasts
  getCostForecasts: async () => {
    return apiRequest('/material-alerts/forecasts');
  }
};

// Fallback to mock data if API is not available
export const useMockData = (process.env.NODE_ENV === 'development');

// Mock service implementation for development/testing
export const mockMaterialAlertsService = {
  getMaterialAlerts: async (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            alerts: [
              {
                id: 1,
                material: "Steel Reinforcement Bars",
                category: "structural",
                priceChange: 8.5,
                currentPrice: 3250,
                unit: "per ton",
                trend: "up",
                impact: "high",
                date: "2024-08-01",
                suppliers: 4,
                notes: "Global steel prices rising due to increased demand and supply chain constraints."
              },
              {
                id: 2,
                material: "Portland Cement",
                category: "concrete",
                priceChange: -2.1,
                currentPrice: 21.50,
                unit: "per bag",
                trend: "down",
                impact: "medium",
                date: "2024-08-03",
                suppliers: 6,
                notes: "Local oversupply has led to price reductions from major suppliers."
              },
              {
                id: 3,
                material: "Copper Wiring",
                category: "electrical",
                priceChange: 12.3,
                currentPrice: 42.80,
                unit: "per kg",
                trend: "up",
                impact: "high",
                date: "2024-08-02",
                suppliers: 3,
                notes: "Significant price increase due to global copper shortage and high demand."
              }
            ],
            total: 3,
            filters_applied: filters
          }
        });
      }, 500);
    });
  },
  
  getShortageAlerts: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            shortages: [
              {
                id: 101,
                material: "Microchips for Building Automation",
                category: "automation",
                severity: "critical",
                estimatedDelay: "8-12 weeks",
                affectedRegions: ["All Malaysia", "Singapore", "Thailand"],
                alternatives: ["Simplified control systems", "Alternative suppliers from Taiwan"],
                date: "2024-08-01"
              },
              {
                id: 102,
                material: "Specialized Fire-Rated Glass",
                category: "fire_safety",
                severity: "moderate",
                estimatedDelay: "3-4 weeks",
                affectedRegions: ["Kuala Lumpur", "Selangor"],
                alternatives: ["Standard fire-rated alternatives", "Local substitutes with certification"],
                date: "2024-08-03"
              }
            ]
          }
        });
      }, 500);
    });
  },
  
  getMaterialCategories: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            categories: [
              { id: 'all', name: 'All Categories' },
              { id: 'structural', name: 'Structural' },
              { id: 'concrete', name: 'Concrete' },
              { id: 'electrical', name: 'Electrical' },
              { id: 'plumbing', name: 'Plumbing' },
              { id: 'mechanical', name: 'Mechanical' },
              { id: 'finishing', name: 'Finishing' },
              { id: 'automation', name: 'Automation' },
              { id: 'fire_safety', name: 'Fire Safety' }
            ]
          }
        });
      }, 300);
    });
  },
  
  subscribeToAlert: async (alertId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Successfully subscribed to alert',
          data: { alertId, subscribed: true }
        });
      }, 300);
    });
  },
  
  unsubscribeFromAlert: async (alertId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Successfully unsubscribed from alert',
          data: { alertId, subscribed: false }
        });
      }, 300);
    });
  },
  
  getSubscribedAlerts: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: { subscribedAlerts: [1, 3] }
        });
      }, 300);
    });
  },
  
  getMarketTrends: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            trends: [
              { name: 'Steel', priceChange: 15.2 },
              { name: 'Copper', priceChange: 22.8 },
              { name: 'Cement', priceChange: -3.5 }
            ]
          }
        });
      }, 500);
    });
  },
  
  getSupplyChainInsights: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            insights: [
              {
                title: "Port Congestion Alert",
                type: "warning",
                description: "Port Klang experiencing 3-5 day delays due to high volume. Consider alternative shipping routes.",
                updated: "2024-08-03"
              },
              {
                title: "Freight Rate Decrease",
                type: "positive",
                description: "International shipping rates decreased by 8% this month. Good time to import materials.",
                updated: "2024-08-01"
              }
            ]
          }
        });
      }, 500);
    });
  },
  
  getCostForecasts: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            forecasts: [
              {
                category: "Steel & Metals",
                currentTrend: "Rising",
                threeMonthForecast: "+5-8%",
                sixMonthForecast: "+10-15%",
                confidence: "High"
              },
              {
                category: "Concrete & Cement",
                currentTrend: "Falling",
                threeMonthForecast: "-2-4%",
                sixMonthForecast: "Stabilizing",
                confidence: "Medium"
              }
            ]
          }
        });
      }, 500);
    });
  }
};

// Export the appropriate service based on environment
export default useMockData ? mockMaterialAlertsService : materialAlertsService;
