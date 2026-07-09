/**
 * ui/prefs.js — Preferencias locales de UI (color de acento del perfil).
 *
 * Se guardan en localStorage (no requiere migracion de BD). Pequenas
 * personalizaciones visuales del usuario.
 */
const ACCENT_KEY = "linguapath.accent";

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
