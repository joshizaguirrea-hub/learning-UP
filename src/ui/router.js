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
    if (params) {
      try {
        const result = route.handler(params);
        // Si el handler es async y falla, no dejar la pantalla en blanco.
        if (result && typeof result.catch === "function") result.catch(reportRouteError);
      } catch (err) {
        reportRouteError(err);
      }
      return;
    }
  }
  notFoundHandler();
}

/** Muestra un panel de error legible en vez de una pantalla en blanco. */
function reportRouteError(err) {
  console.error("[router] Error al renderizar la ruta:", err);
  const app = document.getElementById("app");
  if (!app) return;
  app.innerHTML =
    '<div class="max-w-xl mx-auto bg-red-500/10 border border-red-500/40 rounded-2xl p-6">' +
    '<h1 class="text-xl font-bold text-red-300">Algo salio mal</h1>' +
    '<p class="mt-2 text-sm text-slate-300">Ocurrio un error al cargar esta pantalla. ' +
    'Tu progreso no se perdio. Intenta de nuevo.</p>' +
    '<pre class="mt-3 text-xs text-red-300/80 whitespace-pre-wrap">' +
    String(err && err.message ? err.message : err) + '</pre>' +
    '<a href="#/student" class="inline-block mt-4 bg-slate-800 border border-slate-700 ' +
    'rounded-lg px-4 py-2 text-slate-100 hover:bg-slate-700">Volver al inicio</a></div>';
}

/** Arranca el router y escucha cambios de hash. */
export function startRouter() {
  window.addEventListener("hashchange", resolve);
  resolve();
}
