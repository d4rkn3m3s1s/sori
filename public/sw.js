// Service Worker for Qratex PWA
const CACHE_NAME = 'qratex-v1.0.0'
const STATIC_CACHE_NAME = 'qratex-static-v1.0.0'
const DYNAMIC_CACHE_NAME = 'qratex-dynamic-v1.0.0'

// Files to cache for offline functionality
const STATIC_FILES = [
  '/',
  '/index.html',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
]

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /\/api\/feedback/,
  /\/api\/badges/,
  /\/api\/analytics/,
  /\/api\/user/
]

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static files')
        return cache.addAll(STATIC_FILES)
      })
      .then(() => {
        console.log('Service Worker: Static files cached successfully')
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache static files', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('Service Worker: Activated successfully')
        return self.clients.claim()
      })
  )
})

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return
  }

  // Handle different types of requests
  if (isStaticFile(request.url)) {
    // Static files - cache first strategy
    event.respondWith(cacheFirst(request))
  } else if (isAPIRequest(request.url)) {
    // API requests - network first strategy
    event.respondWith(networkFirst(request))
  } else {
    // HTML pages - network first with cache fallback
    event.respondWith(networkFirst(request))
  }
})

// Cache first strategy for static files
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    console.error('Cache first strategy failed:', error)
    return new Response('Offline content not available', { status: 503 })
  }
}

// Network first strategy for dynamic content
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('Network failed, trying cache:', error)
    
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }

    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/index.html')
    }

    return new Response('Offline content not available', { status: 503 })
  }
}

// Check if request is for static file
function isStaticFile(url) {
  return url.includes('/static/') || 
         url.includes('/icons/') || 
         url.includes('/manifest.json') ||
         url.endsWith('.js') ||
         url.endsWith('.css') ||
         url.endsWith('.png') ||
         url.endsWith('.jpg') ||
         url.endsWith('.svg')
}

// Check if request is for API
function isAPIRequest(url) {
  return API_CACHE_PATTERNS.some(pattern => pattern.test(url))
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered', event.tag)
  
  if (event.tag === 'feedback-sync') {
    event.waitUntil(syncFeedback())
  } else if (event.tag === 'badge-sync') {
    event.waitUntil(syncBadges())
  }
})

// Sync feedback data when online
async function syncFeedback() {
  try {
    // Get pending feedback from IndexedDB
    const pendingFeedback = await getPendingFeedback()
    
    for (const feedback of pendingFeedback) {
      try {
        await fetch('/api/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(feedback)
        })
        
        // Remove from pending list
        await removePendingFeedback(feedback.id)
        console.log('Feedback synced successfully:', feedback.id)
      } catch (error) {
        console.error('Failed to sync feedback:', feedback.id, error)
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error)
  }
}

// Sync badge data when online
async function syncBadges() {
  try {
    const pendingBadges = await getPendingBadges()
    
    for (const badge of pendingBadges) {
      try {
        await fetch('/api/badges', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(badge)
        })
        
        await removePendingBadge(badge.id)
        console.log('Badge synced successfully:', badge.id)
      } catch (error) {
        console.error('Failed to sync badge:', badge.id, error)
      }
    }
  } catch (error) {
    console.error('Badge sync failed:', error)
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received')
  
  const options = {
    body: 'Yeni bir bildirim var!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Görüntüle',
        icon: '/icons/icon-96x96.png'
      },
      {
        action: 'close',
        title: 'Kapat',
        icon: '/icons/icon-96x96.png'
      }
    ]
  }

  if (event.data) {
    const data = event.data.json()
    options.body = data.body || options.body
    options.data = { ...options.data, ...data }
  }

  event.waitUntil(
    self.registration.showNotification('Qratex', options)
  )
})

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked')
  
  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/customer/dashboard')
    )
  } else if (event.action === 'close') {
    // Just close the notification
    return
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Helper functions for IndexedDB operations
async function getPendingFeedback() {
  // This would interact with IndexedDB
  // For now, return empty array
  return []
}

async function removePendingFeedback(id) {
  // This would remove from IndexedDB
  console.log('Removing pending feedback:', id)
}

async function getPendingBadges() {
  // This would interact with IndexedDB
  return []
}

async function removePendingBadge(id) {
  // This would remove from IndexedDB
  console.log('Removing pending badge:', id)
}

