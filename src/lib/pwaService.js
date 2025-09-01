// PWA Service Worker utilities for Malaysian Contractors Hub

class PWAService {
  constructor() {
    this.isSupported = 'serviceWorker' in navigator;
    this.registration = null;
    this.updateAvailable = false;
  }

  // Register service worker
  async register() {
    if (!this.isSupported) {
      console.log('Service Worker not supported');
      return false;
    }

    try {
      this.registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      console.log('Service Worker registered successfully');

      // Listen for updates
      this.registration.addEventListener('updatefound', () => {
        const newWorker = this.registration.installing;
        
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            this.updateAvailable = true;
            this.notifyUpdateAvailable();
          }
        });
      });

      return true;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return false;
    }
  }

  // Update service worker
  async update() {
    if (this.registration) {
      await this.registration.update();
    }
  }

  // Skip waiting and activate new service worker
  async skipWaiting() {
    if (this.registration && this.registration.waiting) {
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  }

  // Notify user about available update
  notifyUpdateAvailable() {
    // Dispatch custom event for UI to handle
    window.dispatchEvent(new CustomEvent('pwa-update-available', {
      detail: { registration: this.registration }
    }));
  }

  // Check if app is running in standalone mode (installed as PWA)
  isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true;
  }

  // Check if app can be installed
  canInstall() {
    return !this.isStandalone() && 'beforeinstallprompt' in window;
  }

  // Cache management
  async clearCache(cacheName) {
    if ('caches' in window) {
      await caches.delete(cacheName);
    }
  }

  async clearAllCaches() {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
    }
  }

  // Offline status
  isOnline() {
    return navigator.onLine;
  }

  // Listen for online/offline events
  onNetworkChange(callback) {
    window.addEventListener('online', () => callback(true));
    window.addEventListener('offline', () => callback(false));
  }

  // Background sync (if supported)
  async requestBackgroundSync(tag) {
    if (this.registration && 'sync' in this.registration) {
      try {
        await this.registration.sync.register(tag);
        return true;
      } catch (error) {
        console.error('Background sync registration failed:', error);
        return false;
      }
    }
    return false;
  }

  // Push notifications (if supported)
  async requestNotificationPermission() {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }

  async subscribeToPush() {
    if (this.registration && 'pushManager' in this.registration) {
      try {
        const subscription = await this.registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.urlBase64ToUint8Array(process.env.REACT_APP_VAPID_PUBLIC_KEY)
        });
        return subscription;
      } catch (error) {
        console.error('Push subscription failed:', error);
        return null;
      }
    }
    return null;
  }

  // Utility function for VAPID key conversion
  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // App installation prompt
  async showInstallPrompt(deferredPrompt) {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      return outcome === 'accepted';
    }
    return false;
  }

  // Get app info
  getAppInfo() {
    return {
      isSupported: this.isSupported,
      isStandalone: this.isStandalone(),
      canInstall: this.canInstall(),
      isOnline: this.isOnline(),
      updateAvailable: this.updateAvailable
    };
  }
}

// Create singleton instance
const pwaService = new PWAService();

// Auto-register service worker in production
if (process.env.NODE_ENV === 'production') {
  pwaService.register();
}

export default pwaService;