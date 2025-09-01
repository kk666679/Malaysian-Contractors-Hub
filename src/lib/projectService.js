// API Base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Project Service for API calls
class ProjectService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.offlineProjects = this.getOfflineProjects();
  }

  // Offline storage helpers
  getOfflineProjects() {
    try {
      return JSON.parse(localStorage.getItem('offlineProjects') || '[]');
    } catch {
      return [];
    }
  }

  saveOfflineProjects(projects) {
    localStorage.setItem('offlineProjects', JSON.stringify(projects));
  }

  addPendingProject(project) {
    const pending = JSON.parse(localStorage.getItem('pendingProjects') || '[]');
    pending.push({ ...project, tempId: this.generateId() });
    localStorage.setItem('pendingProjects', JSON.stringify(pending));
  }

  generateId() {
    return Math.random().toString(36).substring(2, 15);
  }

  // Network status check
  isOnline() {
    return navigator.onLine;
  }

  // Get authorization headers
  getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  }

  // Get all projects
  async getAllProjects() {
    try {
      if (!this.isOnline()) {
        return {
          success: true,
          data: { projects: this.offlineProjects },
          offline: true
        };
      }

      const response = await fetch(`${this.baseURL}/projects`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Cache projects for offline use
      if (data?.projects) {
        this.offlineProjects = data.projects;
        this.saveOfflineProjects(this.offlineProjects);
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      
      // Return offline data if available
      if (this.offlineProjects.length > 0) {
        return {
          success: true,
          data: { projects: this.offlineProjects },
          offline: true
        };
      }
      
      throw error;
    }
  }

  // Get project by ID
  async getProjectById(id) {
    try {
      const response = await fetch(`${this.baseURL}/projects/${id}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  }

  // Create new project
  async createProject(projectData) {
    try {
      if (!this.isOnline()) {
        // Store for later sync
        const tempProject = {
          ...projectData,
          id: this.generateId(),
          tempId: this.generateId(),
          status: 'PLANNING',
          createdAt: new Date().toISOString(),
          offline: true
        };
        
        this.offlineProjects.unshift(tempProject);
        this.saveOfflineProjects(this.offlineProjects);
        this.addPendingProject(projectData);
        
        return {
          success: true,
          data: { project: tempProject },
          offline: true
        };
      }

      const response = await fetch(`${this.baseURL}/projects`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Update offline cache
      if (data?.project) {
        this.offlineProjects.unshift(data.project);
        this.saveOfflineProjects(this.offlineProjects);
      }
      
      return data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  // Update project
  async updateProject(id, projectData) {
    try {
      const response = await fetch(`${this.baseURL}/projects/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  }

  // Delete project
  async deleteProject(id) {
    try {
      const response = await fetch(`${this.baseURL}/projects/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }

  // Get project tasks
  async getProjectTasks(projectId) {
    try {
      const response = await fetch(`${this.baseURL}/projects/${projectId}/tasks`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching project tasks:', error);
      throw error;
    }
  }

  // Create project task
  async createProjectTask(projectId, taskData) {
    try {
      const response = await fetch(`${this.baseURL}/projects/${projectId}/tasks`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating project task:', error);
      throw error;
    }
  }

  // Update project task
  async updateProjectTask(projectId, taskId, taskData) {
    try {
      const response = await fetch(`${this.baseURL}/projects/${projectId}/tasks/${taskId}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating project task:', error);
      throw error;
    }
  }

  // Delete project task
  async deleteProjectTask(projectId, taskId) {
    try {
      const response = await fetch(`${this.baseURL}/projects/${projectId}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Error deleting project task:', error);
      throw error;
    }
  }

  // Get project team members
  async getProjectTeam(projectId) {
    try {
      const response = await fetch(`${this.baseURL}/projects/${projectId}/team`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching project team:', error);
      throw error;
    }
  }

  // Add team member to project
  async addTeamMember(projectId, userId, role) {
    try {
      const response = await fetch(`${this.baseURL}/projects/${projectId}/team`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ userId, role }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding team member:', error);
      throw error;
    }
  }

  // Remove team member from project
  async removeTeamMember(projectId, userId) {
    try {
      const response = await fetch(`${this.baseURL}/projects/${projectId}/team/${userId}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Error removing team member:', error);
      throw error;
    }
  }

  // Upload project document
  async uploadDocument(projectId, file, documentData) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', documentData.name);
      formData.append('description', documentData.description || '');

      const token = localStorage.getItem('authToken');
      const response = await fetch(`${this.baseURL}/projects/${projectId}/documents`, {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  }

  // Get project documents
  async getProjectDocuments(projectId) {
    try {
      const response = await fetch(`${this.baseURL}/projects/${projectId}/documents`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching project documents:', error);
      throw error;
    }
  }

  // Download project document
  async downloadDocument(projectId, documentId) {
    try {
      const response = await fetch(`${this.baseURL}/projects/${projectId}/documents/${documentId}/download`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.blob();
    } catch (error) {
      console.error('Error downloading document:', error);
      throw error;
    }
  }

  // Delete project document
  async deleteDocument(projectId, documentId) {
    try {
      const response = await fetch(`${this.baseURL}/projects/${projectId}/documents/${documentId}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  }
}

// Export singleton instance
const projectService = new ProjectService();
export default projectService;
