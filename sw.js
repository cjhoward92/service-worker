const CACHE_NAME = 'service_worker_cache_test';
const urlsToCache = [
  '/index.html',
  '/install.js',
  'https://fonts.google.com/?selection.family=Roboto',
];

self.addEventListener('install', (event) => {
  console.log('installed');

  event.waitUntil(caches.open(CACHE_NAME).then((cache) => {
    console.log('Opened cache');
    return cache.addAll(urlsToCache);
  }));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request)
    .then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    }));
});