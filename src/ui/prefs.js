/**
 * ui/prefs.js — Preferencias locales de UI (color de acento del perfil).
 *
 * Se guardan en localStorage (no requiere migracion de BD). Pequenas
 * personalizaciones visuales del usuario.
 */
const ACCENT_KEY = "linguapath.accent";
const TEXT_SIZE_KEY = "linguapath.textsize";
const CONTRAST_KEY = "linguapath.contrast";
const AUTOPLAY_KEY = "linguapath.autoplay";
const THEME_KEY = "linguapath.theme";

/** Paleta de acentos para el avatar/perfil. */
export const ACCENTS = [
  { id: "indigo", label: "Indigo", grad: "from-indigo-500 to-fuchsia-600" },
  { id: "emerald", label: "Esmeralda", grad: "from-emerald-500 to-teal-600" },
  { id: "rose", label: "Rosa", grad: "from-rose-500 to-pink-600" },
  { id: "amber", label: "Ambar", grad: "from-amber-500 to-orange-600" },
  { id: "sky", label: "Cielo", grad: "from-sky-500 to-cyan-600" },
  { id: "purple", label: "Purpura", grad: "from-purple-500 to-violet-700" },
];

/** Devuelve el acento elegido (objeto). Default: indigo. */
export function getAccent() {
  const id = localStorage.getItem(ACCENT_KEY) || "indigo";
  return ACCENTS.find((a) => a.id === id) || ACCENTS[0];
}

/** Guarda el acento por su id. */
export function setAccent(id) {
  localStorage.setItem(ACCENT_KEY, id);
}

// --- Tema claro / oscuro ----------------------------------------------------

/** Opciones de tema. 'system' sigue la preferencia del dispositivo. */
export const THEMES = [
  { id: "system", label: "Sistema", desc: "Sigue tu dispositivo" },
  { id: "light", label: "Claro", desc: "Fondo luminoso" },
  { id: "dark", label: "Oscuro", desc: "Fondo oscuro" },
];

/** Devuelve el id del tema elegido. Default: system. */
export function getTheme() {
  return localStorage.getItem(THEME_KEY) || "system";
}

/** True si el tema efectivo (resolviendo 'system') es claro. */
function isLightTheme(id) {
  if (id === "light") return true;
  if (id === "dark") return false;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
}

/** Guarda el tema y lo aplica al instante. */
export function setTheme(id) {
  localStorage.setItem(THEME_KEY, id);
  applyTheme();
}

/** Aplica el tema guardado al documento (llamar al arrancar). */
export function applyTheme() {
  const root = document.documentElement;
  const light = isLightTheme(getTheme());
  if (light) root.setAttribute("data-theme", "light");
  else root.removeAttribute("data-theme");
  // Sincroniza el color de la barra del navegador/PWA.
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", light ? "#eef2f7" : "#0a1120");
}

// --- Tamano de texto (accesibilidad) ---------------------------------------

/** Niveles de tamano de texto. Aplican via html[data-text-size]. */
export const TEXT_SIZES = [
  { id: "base", label: "A", desc: "Normal" },
  { id: "lg", label: "A+", desc: "Grande" },
  { id: "xl", label: "A++", desc: "Muy grande" },
];

/** Devuelve el id del tamano de texto elegido. Default: base. */
export function getTextSize() {
  return localStorage.getItem(TEXT_SIZE_KEY) || "base";
}

/** Guarda el tamano de texto y lo aplica al instante. */
export function setTextSize(id) {
  localStorage.setItem(TEXT_SIZE_KEY, id);
  applyTextSize();
}

/** Aplica el tamano de texto guardado al documento (llamar al arrancar). */
export function applyTextSize() {
  const id = getTextSize();
  const root = document.documentElement;
  if (id === "base") root.removeAttribute("data-text-size");
  else root.setAttribute("data-text-size", id);
}

// --- Alto contraste (accesibilidad) ----------------------------------------

/** True si el modo alto contraste esta activo. */
export function getHighContrast() {
  return localStorage.getItem(CONTRAST_KEY) === "high";
}

/** Activa/desactiva alto contraste y lo aplica. */
export function setHighContrast(on) {
  localStorage.setItem(CONTRAST_KEY, on ? "high" : "normal");
  applyContrast();
}

/** Aplica el contraste guardado al documento (llamar al arrancar). */
export function applyContrast() {
  const root = document.documentElement;
  if (getHighContrast()) root.setAttribute("data-contrast", "high");
  else root.removeAttribute("data-contrast");
}

// --- Auto-reproducir audio (accesibilidad) ---------------------------------

/** True si se debe reproducir el audio automaticamente al mostrar una palabra. */
export function getAutoplay() {
  return localStorage.getItem(AUTOPLAY_KEY) === "on";
}

/** Activa/desactiva el auto-audio. */
export function setAutoplay(on) {
  localStorage.setItem(AUTOPLAY_KEY, on ? "on" : "off");
}

// --- Nivel preferido para generar ejemplos ---------------------------------

const GENLEVEL_KEY = "linguapath.genlevel";

/** Devuelve el nivel guardado para generar ejemplos. Default: intermedio. */
export function getGenLevel() {
  return localStorage.getItem(GENLEVEL_KEY) || "intermedio";
}

/** Guarda el nivel preferido para generar ejemplos. */
export function setGenLevel(id) {
  localStorage.setItem(GENLEVEL_KEY, id);
}
