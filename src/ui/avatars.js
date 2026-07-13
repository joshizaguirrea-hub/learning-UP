/**
 * ui/avatars.js — Avatares de robot (SVG originales, sin marcas registradas).
 *
 * Capa de presentacion. Cada avatar es un SVG inline (viewBox 0 0 64 64) que
 * escala segun el contenedor. Inspirados en arquetipos populares de robots pero
 * con diseno propio. El alumno elige uno y le pone nombre al crear su perfil.
 */
import { el } from "./dom.js";

// --- SVGs (cadenas) --------------------------------------------------------
const SVGS = {
  // Robot clasico amistoso (por defecto).
  beep: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <rect x="14" y="18" width="36" height="30" rx="8" fill="#6366f1"/>
    <rect x="19" y="24" width="26" height="14" rx="5" fill="#0f172a"/>
    <circle cx="27" cy="31" r="3.2" fill="#67e8f9"/><circle cx="37" cy="31" r="3.2" fill="#67e8f9"/>
    <rect x="28" y="8" width="8" height="8" rx="2" fill="#a5b4fc"/><circle cx="32" cy="7" r="2.6" fill="#f472b6"/>
    <rect x="24" y="48" width="16" height="6" rx="3" fill="#818cf8"/>
    <rect x="8" y="26" width="6" height="12" rx="3" fill="#818cf8"/><rect x="50" y="26" width="6" height="12" rx="3" fill="#818cf8"/>
  </svg>`,

  // Astro-droid rodante (estilo R2): cupula + cuerpo cilindrico azul.
  rondo: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <path d="M16 26a16 16 0 0 1 32 0z" fill="#e2e8f0"/>
    <rect x="16" y="26" width="32" height="28" rx="4" fill="#f8fafc"/>
    <rect x="16" y="26" width="32" height="28" rx="4" fill="none" stroke="#cbd5e1" stroke-width="1"/>
    <circle cx="32" cy="20" r="5" fill="#0ea5e9"/><circle cx="32" cy="20" r="2" fill="#e0f2fe"/>
    <rect x="22" y="32" width="20" height="8" rx="2" fill="#38bdf8"/>
    <circle cx="26" cy="46" r="2.4" fill="#38bdf8"/><circle cx="38" cy="46" r="2.4" fill="#ef4444"/>
    <rect x="30" y="30" width="4" height="24" fill="#cbd5e1"/>
  </svg>`,

  // Droide de protocolo humanoide dorado (estilo C-3PO).
  golden: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <rect x="22" y="10" width="20" height="24" rx="9" fill="#f59e0b"/>
    <rect x="22" y="10" width="20" height="24" rx="9" fill="none" stroke="#b45309" stroke-width="1.5"/>
    <ellipse cx="28" cy="21" rx="3" ry="4" fill="#111827"/><ellipse cx="36" cy="21" rx="3" ry="4" fill="#111827"/>
    <circle cx="28" cy="20" r="1" fill="#fde68a"/><circle cx="36" cy="20" r="1" fill="#fde68a"/>
    <rect x="28" y="28" width="8" height="3" rx="1.5" fill="#b45309"/>
    <rect x="24" y="34" width="16" height="18" rx="4" fill="#fbbf24"/>
    <rect x="30" y="34" width="4" height="18" fill="#d97706"/>
    <circle cx="32" cy="40" r="2" fill="#ef4444"/>
  </svg>`,

  // Robot compactador cuadrado (estilo WALL-E): cuerpo caja + binoculares.
  cubi: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <rect x="16" y="30" width="32" height="24" rx="4" fill="#eab308"/>
    <rect x="16" y="30" width="32" height="24" rx="4" fill="none" stroke="#a16207" stroke-width="1.5"/>
    <rect x="20" y="36" width="24" height="4" rx="2" fill="#a16207"/>
    <rect x="20" y="44" width="10" height="6" rx="1" fill="#a16207"/>
    <rect x="22" y="14" width="8" height="12" rx="4" fill="#78716c"/><rect x="34" y="14" width="8" height="12" rx="4" fill="#78716c"/>
    <circle cx="26" cy="19" r="3" fill="#e0f2fe"/><circle cx="38" cy="19" r="3" fill="#e0f2fe"/>
    <circle cx="26" cy="19" r="1.5" fill="#0f172a"/><circle cx="38" cy="19" r="1.5" fill="#0f172a"/>
    <rect x="30" y="24" width="4" height="8" fill="#78716c"/>
  </svg>`,

  // Robot sonda ovalado blanco (estilo EVA): huevo liso + ojos azules.
  ova: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <ellipse cx="32" cy="34" rx="18" ry="22" fill="#f8fafc"/>
    <ellipse cx="32" cy="34" rx="18" ry="22" fill="none" stroke="#e2e8f0" stroke-width="1"/>
    <path d="M18 24a14 9 0 0 1 28 0z" fill="#111827"/>
    <rect x="18" y="22" width="28" height="8" rx="4" fill="#111827"/>
    <path d="M24 26l4 3-4 3z" fill="#38bdf8" transform="rotate(-12 26 26)"/>
    <ellipse cx="27" cy="26" rx="2.4" ry="3.4" fill="#38bdf8"/><ellipse cx="37" cy="26" rx="2.4" ry="3.4" fill="#38bdf8"/>
  </svg>`,

  // Robot inflable de salud (estilo Baymax): cabeza grande blanca, ojos punto.
  puff: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <ellipse cx="32" cy="40" rx="18" ry="16" fill="#f1f5f9"/>
    <ellipse cx="32" cy="22" rx="15" ry="12" fill="#f8fafc"/>
    <ellipse cx="32" cy="22" rx="15" ry="12" fill="none" stroke="#e2e8f0" stroke-width="1"/>
    <circle cx="26" cy="22" r="2.3" fill="#0f172a"/><circle cx="38" cy="22" r="2.3" fill="#0f172a"/>
    <line x1="28" y1="22" x2="36" y2="22" stroke="#0f172a" stroke-width="1.6"/>
    <circle cx="32" cy="40" r="4" fill="#ef4444"/><path d="M32 37v6M29 40h6" stroke="#fff" stroke-width="1.4"/>
  </svg>`,
};

/** Lista para el selector: id + nombre descriptivo (no marca registrada). */
export const AVATAR_LIST = [
  { id: "beep", label: "Beep (clasico)" },
  { id: "rondo", label: "Rondo (astro-droide)" },
  { id: "golden", label: "Golden (dorado)" },
  { id: "cubi", label: "Cubi (cuadradito)" },
  { id: "ova", label: "Ova (sonda)" },
  { id: "puff", label: "Puff (inflable)" },
];

/** Devuelve el SVG (string) de un avatar; cae en 'beep' si no existe. */
export function avatarSvg(id) {
  return SVGS[id] || SVGS.beep;
}

/** Nodo del avatar dentro de un circulo con gradiente. size: sm|md|lg. */
export function avatarNode(id, size = "md") {
  const dims = { sm: "w-9 h-9 p-1", md: "w-12 h-12 p-1.5", lg: "w-24 h-24 p-3" }[size] || "w-12 h-12 p-1.5";
  return el("div", {
    class: "shrink-0 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 " +
      "flex items-center justify-center shadow-lg robot-float " + dims,
    "aria-hidden": "true",
    html: avatarSvg(id),
  });
}
