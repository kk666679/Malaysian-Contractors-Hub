// Enhanced notification service for Malaysian Contractors Hub
import { useState, useEffect } from 'react';

class NotificationService {
  constructor() {
    this.notifications = [];
    this.listeners = [];
    this.maxNotifications = 5;
  }

  // Add a new notification
  add(notification) {
    const id = this.generateId();
    const newNotification = {
      id,
      timestamp: Date.now(),
      type: 'info',
      duration: 5000,
      dismissible: true,
      ...notification
    };

    this.notifications.unshift(newNotification);

    // Limit number of notifications
    if (this.notifications.length > this.maxNotifications) {
      this.notifications = this.notifications.slice(0, this.maxNotifications);
    }

    this.notifyListeners();

    // Auto-dismiss if duration is set
    if (newNotification.duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, newNotification.duration);
    }

    return id;
  }

  // Remove a notification
  remove(id) {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.notifyListeners();
  }

  // Clear all notifications
  clear() {
    this.notifications = [];
    this.notifyListeners();
  }

  // Get all notifications
  getAll() {
    return this.notifications;
  }

  // Subscribe to notification changes
  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  // Notify all listeners
  notifyListeners() {
    this.listeners.forEach(callback => callback(this.notifications));
  }

  // Generate unique ID
  generateId() {
    return Math.random().toString(36).substring(2, 15);
  }

  // Convenience methods for different notification types
  success(message, options = {}) {
    return this.add({
      type: 'success',
      title: 'Success',
      message,
      ...options
    });
  }

  error(message, options = {}) {
    return this.add({
      type: 'error',
      title: 'Error',
      message,
      duration: 0, // Don't auto-dismiss errors
      ...options
    });
  }

  warning(message, options = {}) {
    return this.add({
      type: 'warning',
      title: 'Warning',
      message,
      duration: 7000,
      ...options
    });
  }

  info(message, options = {}) {
    return this.add({
      type: 'info',
      title: 'Information',
      message,
      ...options
    });
  }

  // Project-specific notifications
  projectCreated(projectName) {
    return this.success(`Project "${projectName}" has been created successfully.`, {
      title: 'Project Created',
      actions: [
        {
          label: 'View Project',
          action: () => window.location.href = '/projects'
        }
      ]
    });
  }

  projectUpdated(projectName) {
    return this.success(`Project "${projectName}" has been updated.`, {
      title: 'Project Updated'
    });
  }

  calculationCompleted(calculationType) {
    return this.success(`${calculationType} calculation completed successfully.`, {
      title: 'Calculation Complete',
      duration: 3000
    });
  }

  calculationError(calculationType, error) {
    return this.error(`Failed to complete ${calculationType} calculation: ${error}`, {
      title: 'Calculation Error'
    });
  }

  // Network status notifications
  networkOnline() {
    return this.success('Connection restored. All features are now available.', {
      title: 'Back Online',
      duration: 3000
    });
  }

  networkOffline() {
    return this.warning('You are currently offline. Some features may be limited.', {
      title: 'Offline Mode',
      duration: 0
    });
  }

  // Authentication notifications
  loginSuccess(userName) {
    return this.success(`Welcome back, ${userName}!`, {
      title: 'Login Successful',
      duration: 3000
    });
  }

  loginError(error) {
    return this.error(`Login failed: ${error}`, {
      title: 'Login Error'
    });
  }

  sessionExpired() {
    return this.warning('Your session has expired. Please log in again.', {
      title: 'Session Expired',
      duration: 0,
      actions: [
        {
          label: 'Login',
          action: () => window.location.href = '/login'
        }
      ]
    });
  }

  // Compliance notifications
  complianceCheck(status, standards) {
    if (status === 'passed') {
      return this.success(`Design complies with ${standards.join(', ')}.`, {
        title: 'Compliance Check Passed'
      });
    } else {
      return this.warning(`Design may not comply with ${standards.join(', ')}. Please review.`, {
        title: 'Compliance Warning',
        duration: 0
      });
    }
  }

  // File upload notifications
  fileUploadStart(fileName) {
    return this.info(`Uploading "${fileName}"...`, {
      title: 'File Upload',
      duration: 0,
      dismissible: false
    });
  }

  fileUploadSuccess(fileName) {
    return this.success(`"${fileName}" uploaded successfully.`, {
      title: 'Upload Complete'
    });
  }

  fileUploadError(fileName, error) {
    return this.error(`Failed to upload "${fileName}": ${error}`, {
      title: 'Upload Failed'
    });
  }

  // PWA notifications
  pwaUpdateAvailable() {
    return this.info('A new version of the app is available.', {
      title: 'Update Available',
      duration: 0,
      actions: [
        {
          label: 'Update Now',
          action: () => window.location.reload()
        },
        {
          label: 'Later',
          action: (id) => this.remove(id)
        }
      ]
    });
  }

  pwaInstallPrompt() {
    return this.info('Install Malaysian Contractors Hub for a better experience.', {
      title: 'Install App',
      duration: 10000,
      actions: [
        {
          label: 'Install',
          action: () => {
            // This would trigger the install prompt
            window.dispatchEvent(new CustomEvent('pwa-install-prompt'));
          }
        }
      ]
    });
  }

  // Sync notifications
  syncInProgress() {
    return this.info('Syncing your data...', {
      title: 'Syncing',
      duration: 0,
      dismissible: false
    });
  }

  syncComplete() {
    return this.success('All data has been synced successfully.', {
      title: 'Sync Complete',
      duration: 3000
    });
  }

  syncError(error) {
    return this.error(`Sync failed: ${error}`, {
      title: 'Sync Error'
    });
  }

  // Validation notifications
  formValidationError(errors) {
    const errorCount = Object.keys(errors).length;
    return this.error(`Please fix ${errorCount} validation error${errorCount > 1 ? 's' : ''} before submitting.`, {
      title: 'Form Validation',
      duration: 5000
    });
  }

  // Malaysian-specific notifications
  monsoonAlert(region, riskLevel) {
    const riskColors = {
      low: 'info',
      medium: 'warning',
      high: 'error'
    };

    return this.add({
      type: riskColors[riskLevel] || 'warning',
      title: 'Monsoon Alert',
      message: `${riskLevel.toUpperCase()} monsoon risk detected in ${region}. Consider adjusting project schedules.`,
      duration: 0
    });
  }

  complianceStandardUpdate(standard) {
    return this.info(`Malaysian standard ${standard} has been updated. Please review your designs.`, {
      title: 'Standard Update',
      duration: 0
    });
  }
}

// Create singleton instance
const notificationService = new NotificationService();

// React hook for using notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications(notificationService.getAll());
    
    const unsubscribe = notificationService.subscribe(setNotifications);
    return unsubscribe;
  }, []);

  return {
    notifications,
    add: notificationService.add.bind(notificationService),
    remove: notificationService.remove.bind(notificationService),
    clear: notificationService.clear.bind(notificationService),
    success: notificationService.success.bind(notificationService),
    error: notificationService.error.bind(notificationService),
    warning: notificationService.warning.bind(notificationService),
    info: notificationService.info.bind(notificationService)
  };
};

export default notificationService;