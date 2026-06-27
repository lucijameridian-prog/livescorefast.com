// Bumped version invalidates all old caches (fixes stale-HTML white screen).
const CACHE = 'livescorefast-v3';
const STATIC = ['/manifest.json', '/icon-192.png', '/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // Never cache the API / data sources — always network.
  if (url.pathname.startsWith('/api/') || url.hostname.includes('thesportsdb') || url.hostname.includes('rss2json') || url.hostname.includes('rss')) {
    return; // let the browser handle it normally
  }

  // HTML navigations: NETWORK-FIRST so a new deploy is always picked up.
  if (e.request.mode === 'navigate' || (e.request.headers.get('accept') || '').includes('text/html')) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match('/index.html') || caches.match('/'))
    );
    return;
  }

  // Static, content-hashed assets (js/css/img): cache-first, then populate.
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      if (res && res.ok && (url.origin === self.location.origin)) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      }
      return res;
    }).catch(() => cached))
  );
});
