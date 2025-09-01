// Service Worker for Malaysian Contractors Hub PWA

const CACHE_NAME = 'mch-v1.0.0';
const STATIC_CACHE = 'mch-static-v1.0.0';
const DYNAMIC_CACHE = 'mch-dynamic-v1.0.0';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png'
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /\/api\/weather/,
  /\/api\/civil-engineering\/standards/,
  /\/api\/electrical-systems\/standards/
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Static files cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Failed to cache static files:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension requests
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  // Handle different types of requests
  if (request.url.includes('/api/')) {
    // API requests - network first with cache fallback
    event.respondWith(handleApiRequest(request));
  } else if (request.destination === 'document') {
    // HTML documents - network first with cache fallback
    event.respondWith(handleDocumentRequest(request));
  } else {
    // Static assets - cache first with network fallback
    event.respondWith(handleStaticRequest(request));
  }
});

// Handle API requests
async function handleApiRequest(request) {
  const url = new URL(request.url);
  
  // Check if this API should be cached
  const shouldCache = API_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname));
  
  if (shouldCache) {
    try {
      // Try network first
      const networkResponse = await fetch(request);
      
      if (networkResponse.ok) {
        // Cache successful response
        const cache = await caches.open(DYNAMIC_CACHE);
        cache.put(request, networkResponse.clone());
        return networkResponse;
      }
    } catch (error) {
      console.log('Network failed, trying cache:', error);
    }
    
    // Fallback to cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
  }
  
  // For non-cached APIs or if cache miss, just try network
  try {
    return await fetch(request);
  } catch (error) {
    // Return offline response for critical APIs
    if (url.pathname.includes('/auth/') || url.pathname.includes('/projects/')) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'You are offline. Please check your connection.' 
        }),
        {
          status: 503,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    throw error;
  }
}

// Handle document requests
async function handleDocumentRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache successful response
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.log('Network failed for document, trying cache:', error);
  }
  
  // Fallback to cache
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Fallback to offline page
  const offlineResponse = await caches.match('/');
  if (offlineResponse) {
    return offlineResponse;
  }
  
  // Last resort - basic offline response
  return new Response(
    `<!DOCTYPE html>
    <html>
    <head>
      <title>Offline - Malaysian Contractors Hub</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
        .offline { color: #666; }
      </style>
    </head>
    <body>
      <div class="offline">
        <h1>You're Offline</h1>
        <p>Please check your internet connection and try again.</p>
        <button onclick="window.location.reload()">Retry</button>
      </div>
    </body>
    </html>`,
    {
      headers: { 'Content-Type': 'text/html' }
    }
  );
}

// Handle static asset requests
async function handleStaticRequest(request) {
  // Try cache first
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    // Try network
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache successful response
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Failed to fetch static asset:', request.url, error);
    throw error;
  }
}

// Background sync
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'project-sync') {
    event.waitUntil(syncProjects());
  } else if (event.tag === 'calculation-sync') {
    event.waitUntil(syncCalculations());
  }
});

// Sync projects when back online
async function syncProjects() {
  try {
    // Get pending projects from IndexedDB or localStorage
    const pendingProjects = JSON.parse(localStorage.getItem('pendingProjects') || '[]');
    
    for (const project of pendingProjects) {
      try {
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(project)
        });
        
        if (response.ok) {
          // Remove from pending list
          const updatedPending = pendingProjects.filter(p => p.tempId !== project.tempId);
          localStorage.setItem('pendingProjects', JSON.stringify(updatedPending));
        }
      } catch (error) {
        console.error('Failed to sync project:', error);
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Sync calculations when back online
async function syncCalculations() {
  try {
    const pendingCalculations = JSON.parse(localStorage.getItem('pendingCalculations') || '[]');
    
    for (const calc of pendingCalculations) {
      try {
        const response = await fetch(calc.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(calc.data)
        });
        
        if (response.ok) {
          const updatedPending = pendingCalculations.filter(c => c.tempId !== calc.tempId);
          localStorage.setItem('pendingCalculations', JSON.stringify(updatedPending));
        }
      } catch (error) {
        console.error('Failed to sync calculation:', error);
      }
    }
  } catch (error) {
    console.error('Calculation sync failed:', error);
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  console.log('Push notification received');
  
  const options = {
    body: 'You have new updates in Malaysian Contractors Hub',
    icon: '/logo192.png',
    badge: '/logo192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Updates',
        icon: '/logo192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/logo192.png'
      }
    ]
  };
  
  if (event.data) {
    const data = event.data.json();
    options.body = data.body || options.body;
    options.data = { ...options.data, ...data };
  }
  
  event.waitUntil(
    self.registration.showNotification('Malaysian Contractors Hub', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handling
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});