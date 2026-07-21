/**
 * sw.js — Service Worker (PWA).
 *
 * Cache-first para el "app shell". La version se sincroniza con VERSION via
 * tools/stamp_version.py (ADR-002): NO editar CACHE a mano en cada release.
 */
const CACHE = "linguapath-v0.160.0";

const SHELL = [
  "./",
  "./index.html",
  "./styles/app.css?v=0.160.0",
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
  // NETWORK-FIRST + BYPASS del cache HTTP del navegador (cache:"reload"). Clave:
  // los modulos ES se importan sin ?v=, y el navegador servia versiones viejas
  // desde SU cache (motor de voz atorado). Con "reload" siempre pedimos a la red
  // la version fresca. Si no hay red, caemos al cache del SW (offline sigue ok).
  event.respondWith(
    fetch(request, { cache: "reload" })
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(request))
  );
});
