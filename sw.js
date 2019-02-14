const CACHE_NAME = 'service_worker_cache_test';
const urlsToCache = [
  '/index.html',
  '/install.js',
];

self.addEventListener('install', (event) => {
  console.log('installed');

  event.waitUntil(caches.open(CACHE_NAME).then((cache) => {
    console.log('Opened cache');

    const allUrls = urlsToCache.map(u => new Request(u))
      .concat(thirdPartyUrls.map(u => new Request(u, { mode: 'no-cors' })));
    return cache.addAll(allUrls);
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
    }));
});