const CACHE_NAME = "mazin-app-v2";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./hobby.html",
    "./change.html",
    "./grading.html",
    "./converter.html",
    "./distance.html",
    "./style.css",
    "./manifest.json"
];

// Install Event
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
            .then(() => self.skipWaiting())
    );
});

// Activate Event (حذف الكاش القديم عند التحديث)
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Event
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
