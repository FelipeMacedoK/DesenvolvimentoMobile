const CACHE_NAME = 'v1';
const FILES_TO_CACHE = [
    'main.html',
    'style.css',
    'script.js',
    'manifest.json',
    'icon-192.jpg',
    'icon-512.jpg',
    'favicon.ico'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response =>
            response || fetch(event.request).catch(() =>
                caches.match('main.html')
            )
        )
    );
});

self.registration.showNotification('Cache updated!', {
    body: 'Resources cached for offline use.',
    icon: 'icon-192.jpg'
});