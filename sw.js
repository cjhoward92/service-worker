const CACHE_NAME = 'service_worker_cache_test';
const urlsToCache = [
  '/index.html',
  '/install.js',
];

self.addEventListener('install', (event) => {
  console.log('installed');

  event.waitUntil(caches.open(CACHE_NAME).then((cache) => {
    console.log('Opened cache');

    const allUrls = urlsToCache.map(u => new Request(u));
    return cache.addAll(allUrls);
  }).catch((err) => {
    console.error('Error in service worker install', err.message);
  }));
});

self.addEventListener('fetch', (event) => {
  console.log(`We fetched ${event}`);
  console.log(event.Request.url);
  event.respondWith(caches.match(event.request)
    .then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
    .catch(err => {
      console.error('Error in service worker fetch', err.message);
    }));
});