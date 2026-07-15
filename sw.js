/**
 * sw.js — Service Worker (PWA).
 *
 * Cache-first para el "app shell". La version se sincroniza con VERSION via
 * tools/stamp_version.py (ADR-002): NO editar CACHE a mano en cada release.
 */
const CACHE = "linguapath-v0.105.0";

const SHELL = [
  "./",
  "./index.html",
  "./styles/app.css",
  "./manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  // Solo GET del mismo origen; el resto (Supabase, Worker, CDN) pasa directo.
  if (request.method !== "GET" || new URL(request.url).origin !== location.origin) {
    return;
  }
  // NETWORK-FIRST: siempre intenta lo mas nuevo (asi las actualizaciones llegan
  // al instante). Si no hay red, cae al cache guardado (offline sigue andando).
  event.respondWith(
    fetch(request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(request))
  );
});
