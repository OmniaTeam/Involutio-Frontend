const CACHE_NAME = 'involution-cache';

self.addEventListener("install", (event) => {
    caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll([
            "../public/robots.txt",
            "../public/fonts/Oswald/Oswald-VariableFont_wght.ttf",
            "../src/assets/home.svg",
            "../src/assets/logout.svg",
            "../src/assets/report.svg",
            "../src/assets/users.svg",
            "../src/global.scss",
            "../index.html"
        ]);
    })
});

self.addEventListener('activate', (event) => {
    var expectedCacheNames = Object.keys(CACHE_NAME).map(function(key) {
        return CACHE_NAME[key];
    });
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (expectedCacheNames.indexOf(cacheName) === -1) {
                        console.log('Deleting out of date cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    console.log('Service Worker has been activated');
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

function fromCache(request) {
    return caches.open(CACHE_NAME).then((cache) =>
        cache.match(request).then((matching) =>
            matching || Promise.reject('no-match')
        ));
}