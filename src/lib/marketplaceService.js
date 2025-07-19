// API service for marketplace functionality

// API base URL - change this to match your backend server
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
    console.error('API request error:', error);
    throw error;
  }
};

export const marketplaceService = {
  // Specialists
  getSpecialists: async (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    return apiRequest(`/marketplace/specialists${queryString ? '?' + queryString : ''}`);
  },
  
  getSpecialistDetails: async (specialistId) => {
    return apiRequest(`/marketplace/specialist/${specialistId}`);
  },
  
  hireSpecialist: async (data) => {
    return apiRequest('/marketplace/hire', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },
  
  getSpecialistCategories: async () => {
    return apiRequest('/marketplace/categories');
  },
  
  searchSpecialists: async (searchCriteria) => {
    return apiRequest('/marketplace/search', {
      method: 'POST',
      body: JSON.stringify(searchCriteria)
    });
  },
  
  // Projects
  getProjects: async (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    return apiRequest(`/marketplace/projects${queryString ? '?' + queryString : ''}`);
  },
  
  createProject: async (projectData) => {
    return apiRequest('/marketplace/projects', {
      method: 'POST',
      body: JSON.stringify(projectData)
    });
  },
  
  getProjectDetails: async (projectId) => {
    return apiRequest(`/marketplace/projects/${projectId}`);
  },
  
  submitProposal: async (projectId, proposalData) => {
    return apiRequest(`/marketplace/projects/${projectId}/proposals`, {
      method: 'POST',
      body: JSON.stringify(proposalData)
    });
  },
  
  getProjectProposals: async (projectId) => {
    return apiRequest(`/marketplace/projects/${projectId}/proposals`);
  },
  
  // Suppliers
  getSuppliers: async (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    return apiRequest(`/marketplace/suppliers${queryString ? '?' + queryString : ''}`);
  },
  
  getSupplierCategories: async () => {
    return apiRequest('/marketplace/suppliers/categories');
  },
  
  getSupplierDetails: async (supplierId) => {
    return apiRequest(`/marketplace/suppliers/${supplierId}`);
  },
  
  getSupplierProducts: async (supplierId, filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    return apiRequest(`/marketplace/suppliers/${supplierId}/products${queryString ? '?' + queryString : ''}`);
  },
  
  requestQuote: async (supplierId, quoteData) => {
    return apiRequest(`/marketplace/suppliers/${supplierId}/quote`, {
      method: 'POST',
      body: JSON.stringify(quoteData)
    });
  }
};

// Fallback to mock data if API is not available
export const useMockData = (process.env.NODE_ENV === 'development');

// Mock service implementation for development/testing
export const mockMarketplaceService = {
  // Specialists
  getSpecialists: async (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            specialists: [], // This would be populated with mock data
            total: 0,
            filters_applied: filters
          }
        });
      }, 500);
    });
  },
  
  getSpecialistDetails: async (specialistId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {} // This would be populated with mock data
        });
      }, 500);
    });
  },
  
  hireSpecialist: async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Hiring request submitted successfully',
          data: {
            request_id: `HR${Math.floor(Math.random() * 100000)}`,
            specialist_id: data.specialist_id,
            status: 'Pending'
          }
        });
      }, 1000);
    });
  },
  
  // Projects
  getProjects: async (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            projects: [], // This would be populated with mock data
            total: 0,
            filters_applied: filters
          }
        });
      }, 500);
    });
  },
  
  createProject: async (projectData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Project created successfully',
          data: {
            project_id: `PRJ${Math.floor(Math.random() * 100000)}`,
            ...projectData,
            status: 'Open',
            posted_date: new Date().toISOString()
          }
        });
      }, 1000);
    });
  },
  
  // Other mock methods would be implemented similarly
};

// Export the appropriate service based on environment
export default useMockData ? mockMarketplaceService : marketplaceService;