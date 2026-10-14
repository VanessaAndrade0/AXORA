// Service worker: permite instalar la app y abrir su pantalla aunque falle la red.
// Siempre intenta primero la red (así ves la versión más nueva) y usa la copia guardada solo sin conexión.
// Tus datos NO se guardan aquí: viven en Supabase.
const CACHE = 'nacar-v1';
const BASE = ['./', 'index.html', 'estilos.css', 'js/vendor/supabase.js', 'js/config.js', 'js/backend.js', 'js/app.js', 'manifest.webmanifest', 'icons/icon-192.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(BASE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then(r => {
      if (r.ok) { const copia = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copia)); }
      return r;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('index.html')))
  );
});
