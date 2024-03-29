/* global VERSION */
/* eslint-disable no-restricted-globals */
/* eslint-env serviceworker */
// const VERSION = 1;

const CACHE_KEYS = {
  PRE_CACHE: `precache-${VERSION}`,
  RUNTIME: `runtime-${VERSION}`,
};

// add any urls that you don't want to be cached
const EXCLUDED_URLS = [];

// add any urls that you want cached when the service worker is installed
const PRE_CACHE_URLS = ["/", "/css/my.css"];

// add any hosts that you want to bypass
const IGNORED_HOSTS = ["localhost"];

// Helpers
// Installation
const addItemsToCache = (cacheName, items = []) => {
  caches.open(cacheName).then((cache) => cache.addAll(items));
};

self.addEventListener("install", () => {
  self.skipWaiting();

  addItemsToCache(CACHE_KEYS.PRE_CACHE, PRE_CACHE_URLS);
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        cacheNames.filter((item) => !Object.values(CACHE_KEYS).includes(item))
      )
      .then((itemsToDelete) =>
        Promise.all(itemsToDelete.map((item) => caches.delete(item)))
      )
      .then(() => self.clients.claim())
  );
});

// Runtime
self.addEventListener("fetch", (event) => {
  const { hostname } = new URL(event.request.url);

  // if it's an ignored host, do nothing
  if (IGNORED_HOSTS.indexOf(hostname) >= 0) {
    return;
  }

  // if it's an excluded url, do nothing
  if (EXCLUDED_URLS.some((page) => event.request.url.indexOf(page) > -1)) {
    return;
  }

  // return from cache, falling back to network
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return caches
        .open(CACHE_KEYS.RUNTIME)
        .then((cache) =>
          fetch(event.request).then((response) =>
            cache.put(event.request, response.clone()).then(() => response)
          )
        );
    })
  );
});
