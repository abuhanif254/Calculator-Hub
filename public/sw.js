// Self-unregistering & push-unsubscribing Service Worker kill switch.
// Permanently revokes legacy push notification subscriptions and unregisters the worker.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('push', (event) => {
  if (event && typeof event.stopImmediatePropagation === 'function') {
    event.stopImmediatePropagation();
  }
  event.waitUntil(
    self.registration.pushManager
      .getSubscription()
      .then((sub) => (sub ? sub.unsubscribe() : false))
      .catch(() => false)
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.registration.pushManager
        ? self.registration.pushManager
            .getSubscription()
            .then((sub) => (sub ? sub.unsubscribe() : false))
            .catch(() => false)
        : Promise.resolve(false),
      typeof caches !== 'undefined'
        ? caches
            .keys()
            .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
            .catch(() => [])
        : Promise.resolve([]),
    ])
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll())
      .then((clients) => {
        clients.forEach((client) => {
          if (client && 'navigate' in client) {
            // Optional no-op: worker is now unregistered cleanly
          }
        });
      })
      .catch(() => {})
  );
});
