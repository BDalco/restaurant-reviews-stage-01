var staticCacheName = 'restaurant-reviews-v3';

self.addEventListener('install', function(event) {
  event.waitUntil(caches.open(staticCacheName).then(function(cache) {
    return cache.addAll([
      '/',
    	'index.html',
      'restaurant.html',
    	'css/styles.css',
    	'data/restaurants.json',
    	'js/dbhelper.js',
      'js/main.js',
      'js/restaurant_info.js',
      'img/1.jpg',
      'img/2.jpg',
      'img/3.jpg',
      'img/4.jpg',
      'img/5.jpg',
      'img/6.jpg',
      'img/7.jpg',
      'img/8.jpg',
      'img/9.jpg',
      'img/10.jpg',
      'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
      'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
      'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.css'
    	]);
  	})
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(caches.keys().then(function(cacheNames) {
    return Promise.all(cacheNames.filter(function(cacheName) {
      return cacheName.startsWith('restaurant-reviews-v') && cacheName != staticCacheName;
    }).map(function(cacheName) {
      return caches.delete(cacheName);
    }));
  }));
});

self.addEventListener('fetch', function (event) {
  var requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === '/') {
      event.respondWith(caches.match('/'));
      return;
    }
  }

  event.respondWith(caches.match(event.request).then(function(response) {
    return response || fetch(event.request);
  }));
});

self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});