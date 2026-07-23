/**
 * ui/install.js — Soporte para "Instalar app" (PWA) DENTRO de la app.
 *
 * El navegador dispara `beforeinstallprompt` cuando la PWA es instalable; hay que
 * capturarlo (y evitar que se muestre solo) para poder lanzarlo desde NUESTRO
 * boton. iOS/Safari no soporta ese evento -> ahi mostramos instrucciones.
 *
 * Este modulo registra los listeners AL IMPORTARSE (lo mas temprano posible)
 * para no perder el evento.
 */
let deferredPrompt = null;
const listeners = new Set();

function notify() {
  listeners.forEach((fn) => { try { fn(); } catch { /* noop */ } });
}

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();      // evita el mini-banner automatico del navegador
    deferredPrompt = e;      // lo guardamos para lanzarlo desde nuestro boton
    notify();
  });
  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    notify();
  });
}

/** Suscribe a cambios (aparece/desaparece la posibilidad de instalar). */
export function onInstallChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }

/** True si la app ya corre instalada (standalone). */
export function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;
}

/** True si es iPhone/iPad (no soporta beforeinstallprompt). */
export function isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
}

/** True si tenemos un prompt de instalacion listo para lanzar. */
export function canInstall() { return !!deferredPrompt; }

/**
 * Lanza el dialogo nativo de instalacion.
 * @returns {Promise<"accepted"|"dismissed"|"unavailable">}
 */
export async function promptInstall() {
  if (!deferredPrompt) return "unavailable";
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
  notify();
  return outcome;
}
