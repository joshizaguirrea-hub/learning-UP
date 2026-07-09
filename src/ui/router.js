/**
 * ui/router.js — Router por hash (#/ruta). Sin dependencias.
 *
 * Capa de presentacion. Mapea rutas a funciones que renderizan una vista.
 * Soporta un parametro dinamico por ruta, ej: on("/unidad/:id", (params) => ...).
 */

const routes = []; // { pattern: string[], handler }
let notFoundHandler = () => {};

/** Registra una ruta. El path puede incluir segmentos ":param". */
export function on(path, handler) {
  routes.push({ segments: path.split("/"), handler });
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

/** Intenta casar la ruta actual con un patron; devuelve params o null. */
function match(segments, pathSegments) {
  if (segments.length !== pathSegments.length) return null;
  const params = {};
  for (let i = 0; i < segments.length; i++) {
    if (segments[i].startsWith(":")) params[segments[i].slice(1)] = decodeURIComponent(pathSegments[i]);
    else if (segments[i] !== pathSegments[i]) return null;
  }
  return params;
}

/** Resuelve y ejecuta el handler de la ruta actual. */
function resolve() {
  const pathSegments = currentPath().split("/");
  for (const route of routes) {
    const params = match(route.segments, pathSegments);
    if (params) { route.handler(params); return; }
  }
  notFoundHandler();
}

/** Arranca el router y escucha cambios de hash. */
export function startRouter() {
  window.addEventListener("hashchange", resolve);
  resolve();
}
