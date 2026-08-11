const CACHE_NAME = 'pwa-cache-v1';

// Lis fichye ou vle sit la siveye epi kenbe nan memwa
const ASSETS_TO_CACHE = [
  '/trading.html',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// 1. Enstalasyon Service Worker an ak anrejistreman kach la
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Anrejistreman fichye yo nan kach...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 2. Aktivasyon ak efasman ansyen kach si gen yon nouvo vèsyon
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Efasman ansyen kach:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Entèsepte rekèt yo (sèvi ak fichye nan kach la lè pa gen rezo)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
