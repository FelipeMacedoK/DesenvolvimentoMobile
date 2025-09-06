self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.open('v1').then(cache => {
            return cache.addAll([
                'main.html',
                'style.css',
                'script.js',
                'manifest.json',
                'icon-192.jpg',
                'icon-512.jpg'
            ]);
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open('v1').then(cache =>
            cache.match(event.request).then(response =>
                response || fetch(event.request)
            )
        )
    );
});