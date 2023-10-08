
let cacheName = "appV1";
let assets = [
    '/',
    '/static/js/bundle.js',
    'https://jsonplaceholder.typicode.com/users',
    '/favicon.ico',
    '/manifest.json',
    '/logo192.png',
    '/bootstrap.min.css', 
    '/bootstrap.min.js',  
];

this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
        return cache.addAll(assets); // Added 'return' here
        })
    );
});

this.addEventListener("fetch", (event) => { 
    if (!navigator.onLine) {
        event.respondWith(
        caches.match(event.request).then((res) => {
            if (res) {
            return res;
            }
            let requestUrl = event.request.clone();
            return fetch(requestUrl); 
        })
        );
    }
});
