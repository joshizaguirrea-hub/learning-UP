/**
 * ui/router.js — Router por hash (#/ruta). Sin dependencias.
 *
 * Capa de presentacion. Mapea rutas a funciones que renderizan una vista.
 * Simple a proposito: para un SPA pequeno no necesitamos History API ni libs.
 */

const routes = new Map();
let notFoundHandler = () => {};

/** Registra una ruta: on("/login", render) */
export function on(path, handler) {
  routes.set(path, handler);
}

/** Handler para rutas no encontradas. */
export function onNotFound(handler) {
  notFoundHandler = handler;
}

/** Navega a una ruta (actualiza el hash). */
export function go(path) {
  if (location.hash === `#${path}`) resolve();
  else location.hash = path;
}

/** Ruta actual (sin el '#'). Default '/'. */
export function currentPath() {
  return location.hash.slice(1) || "/";
}

/** Resuelve y ejecuta el handler de la ruta actual. */
function resolve() {
  const path = currentPath();
  const handler = routes.get(path) || notFoundHandler;
  handler();
}

/** Arranca el router y escucha cambios de hash. */
export function startRouter() {
  window.addEventListener("hashchange", resolve);
  resolve();
}
