// API service for general resources (blog posts, documentation, etc.)
import { apiClient } from './apiClient';

export const resourcesService = {
  // Blog posts
  getBlogPosts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiClient.request(`/resources/blog-posts${queryString ? '?' + queryString : ''}`);
  },

  getBlogPost: async (id) => {
    return apiClient.request(`/resources/blog-posts/${id}`);
  },

  createBlogPost: async (postData) => {
    return apiClient.request('/resources/blog-posts', {
      method: 'POST',
      body: JSON.stringify(postData)
    });
  },

  updateBlogPost: async (id, updates) => {
    return apiClient.request(`/resources/blog-posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  },

  deleteBlogPost: async (id) => {
    return apiClient.request(`/resources/blog-posts/${id}`, {
      method: 'DELETE'
    });
  },

  // Documentation
  getDocumentation: async (category = null) => {
    const endpoint = category
      ? `/resources/documentation?category=${category}`
      : '/resources/documentation';
    return apiClient.request(endpoint);
  },

  getDocumentationArticle: async (id) => {
    return apiClient.request(`/resources/documentation/${id}`);
  },

  // Resources
  getResources: async (type = null) => {
    const endpoint = type
      ? `/resources?type=${type}`
      : '/resources';
    return apiClient.request(endpoint);
  },

  downloadResource: async (id) => {
    return apiClient.request(`/resources/${id}/download`, {
      method: 'GET',
      headers: {
        'Accept': 'application/octet-stream'
      }
    });
  }
};
