const CACHE_NAME = 'mindreader-pwa-cache-v1';
const urlsToCache = [
  'https://bvbnjghui.github.io/tell-me/',
  'https://bvbnjghui.github.io/tell-me/index.html',
  'https://bvbnjghui.github.io/tell-me/images/icon-192x192.png',
  'https://bvbnjghui.github.io/tell-me/images/icon-512x512.png'
];

self.addEventListener('install', event => {
  console.log('Service Worker: 安裝中...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: 正在快取所有內容');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Service Worker: 快取失敗', error);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('Service Worker: 從快取中回傳', event.request.url);
          return response;
        }
        console.log('Service Worker: 從網路中抓取', event.request.url);
        return fetch(event.request);
      })
  );
});
