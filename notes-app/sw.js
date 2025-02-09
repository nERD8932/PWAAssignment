// Service Worker Lifecycle: Install Event
// This event is the first step in the service worker lifecycle. It's used to set up the local environment for the service worker, like caching the necessary assets.
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open("notes-app-cache").then(function (cache) {
          cache.addAll([
            "/",
            "/index.html",
            "/icons/favicon-32x32.png",
            "/icons/favicon-16x16png",
            "/icons/apple-touch-icon.png",
            "/script.js",
            "/src/main.tsx",
            "/src/App.tsx",
            "/src/index.css",
            "/src/App.css",
            "/icons/site.webmanifest",
            "/icons/favicon.ico",
            "/icons/favicon.svg",
          ]);
        })
      );
    });
    
    // return cached response
    self.addEventListener("fetch", function (event) {
      event.respondWith(
        caches.match(event.request).then(function (res) {
          return res;
        })
      );

});