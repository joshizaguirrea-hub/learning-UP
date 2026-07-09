/**
 * sw.js — Service Worker (PWA).
 *
 * Cache-first para el "app shell". La version se sincroniza con VERSION via
 * tools/stamp_version.py (ADR-002): NO editar CACHE a mano en cada release.
 */
const CACHE = "linguapath-v0.9.1";

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
  // Solo GET del mismo origen se cachea; el resto (Supabase, CDN) pasa directo.
  if (request.method !== "GET" || new URL(request.url).origin !== location.origin) {
    return;
  }
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  );
});
