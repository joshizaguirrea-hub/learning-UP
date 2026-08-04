/**
 * sw.js — Service Worker (PWA).
 *
 * Cache-first para el "app shell". La version se sincroniza con VERSION via
 * tools/stamp_version.py (ADR-002): NO editar CACHE a mano en cada release.
 */
const CACHE = "linguapath-v0.279.0";

const SHELL = [
  "./",
  "./index.html",
  "./styles/app.css?v=0.279.0",
  "./manifest.json",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
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
  // VENDOR (libs inmutables como three.js): CACHE-FIRST. No cambian nunca (van
  // versionadas por ruta), asi que no tiene sentido redescargar 1.27MB cada vez.
  // Se baja UNA vez (cuando el alumno usa el profe 3D) y luego sale del cache.
  if (new URL(request.url).pathname.includes("/vendor/")) {
    event.respondWith(
      caches.match(request).then((hit) => hit || fetch(request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(request, copy)).catch(() => {});
        return res;
      }))
    );
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
