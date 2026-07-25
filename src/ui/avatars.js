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

  // ---- ROBO-ANIMALES (cuerpo/cabeza de animal, alma de robot: ojos cian) ----
  // Perrito robot: orejas floppy + hocico.
  dog: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <path d="M17 24 L13 46 Q21 46 23 36 Z" fill="#6d28d9"/><path d="M47 24 L51 46 Q43 46 41 36 Z" fill="#6d28d9"/>
    <rect x="18" y="20" width="28" height="28" rx="13" fill="#8b5cf6"/>
    <rect x="24" y="34" width="16" height="12" rx="6" fill="#c4b5fd"/>
    <circle cx="27" cy="31" r="3" fill="#67e8f9"/><circle cx="37" cy="31" r="3" fill="#67e8f9"/>
    <ellipse cx="32" cy="40" rx="3" ry="2" fill="#4c1d95"/>
  </svg>`,

  // Gato robot: orejas triangulares + bigotes.
  cat: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <path d="M18 22 L15 9 L29 19 Z" fill="#d97706"/><path d="M46 22 L49 9 L35 19 Z" fill="#d97706"/>
    <rect x="17" y="18" width="30" height="27" rx="13" fill="#f59e0b"/>
    <circle cx="27" cy="30" r="3" fill="#67e8f9"/><circle cx="37" cy="30" r="3" fill="#67e8f9"/>
    <path d="M32 34 l-2 3 h4 z" fill="#7c2d12"/>
    <path d="M13 33 h9M13 37 h9M51 33 h-9M51 37 h-9" stroke="#78350f" stroke-width="1"/>
  </svg>`,

  // Cocodrilo robot: hocico largo con dientes.
  croc: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <rect x="10" y="32" width="42" height="12" rx="5" fill="#16a34a"/>
    <path d="M12 44 l4 4 4-4 4 4 4-4 4 4 4-4 4 4 4-4" fill="none" stroke="#ecfdf5" stroke-width="1.4"/>
    <rect x="16" y="18" width="26" height="16" rx="7" fill="#22c55e"/>
    <circle cx="24" cy="21" r="4" fill="#bbf7d0"/><circle cx="24" cy="21" r="2" fill="#0f172a"/>
    <circle cx="34" cy="21" r="4" fill="#bbf7d0"/><circle cx="34" cy="21" r="2" fill="#0f172a"/>
  </svg>`,

  // Canguro robot: orejas largas + hocico.
  kangaroo: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <rect x="24" y="6" width="5" height="16" rx="2.5" fill="#b45309"/><rect x="35" y="6" width="5" height="16" rx="2.5" fill="#b45309"/>
    <path d="M22 20 h14 q10 0 10 12 q0 10 -12 10 h-12 z" fill="#d97706"/>
    <circle cx="30" cy="28" r="2.7" fill="#67e8f9"/><circle cx="38" cy="28" r="2.7" fill="#67e8f9"/>
    <ellipse cx="44" cy="34" rx="3" ry="2.4" fill="#7c2d12"/>
  </svg>`,

  // Dino T-Rex robot: cabezota con mandibula y dientes.
  dino: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <path d="M14 40 Q14 18 34 18 L52 18 Q56 26 50 32 L36 32 Q33 36 33 42 Z" fill="#10b981"/>
    <rect x="33" y="36" width="20" height="8" rx="2" fill="#059669"/>
    <path d="M35 36 h16 v2 h-16 z" fill="#ecfdf5"/>
    <path d="M23 18 l3 -6 3 6 M30 18 l3 -6 3 6" fill="#047857"/>
    <circle cx="25" cy="28" r="3.2" fill="#67e8f9"/><circle cx="25" cy="28" r="1.4" fill="#0f172a"/>
  </svg>`,

  // Leon robot: melena + carita.
  lion: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <g fill="#b45309"><circle cx="32" cy="14" r="5"/><circle cx="18" cy="20" r="5"/><circle cx="46" cy="20" r="5"/><circle cx="14" cy="34" r="5"/><circle cx="50" cy="34" r="5"/><circle cx="20" cy="48" r="5"/><circle cx="44" cy="48" r="5"/><circle cx="32" cy="50" r="5"/></g>
    <circle cx="32" cy="32" r="18" fill="#d97706"/>
    <circle cx="32" cy="32" r="13" fill="#fbbf24"/>
    <circle cx="27" cy="30" r="2.7" fill="#0f172a"/><circle cx="37" cy="30" r="2.7" fill="#0f172a"/>
    <path d="M32 35 l-2.5 3 h5 z" fill="#7c2d12"/>
  </svg>`,

  // Elefante robot: orejotas + trompa.
  elephant: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <ellipse cx="16" cy="34" rx="10" ry="13" fill="#94a3b8"/><ellipse cx="48" cy="34" rx="10" ry="13" fill="#94a3b8"/>
    <rect x="20" y="16" width="24" height="28" rx="11" fill="#cbd5e1"/>
    <circle cx="28" cy="28" r="2.6" fill="#0f172a"/><circle cx="36" cy="28" r="2.6" fill="#0f172a"/>
    <path d="M32 36 q-3 9 -7 13" stroke="#94a3b8" stroke-width="5" fill="none" stroke-linecap="round"/>
  </svg>`,

  // Jirafa robot: cuello largo + cuernitos + manchas.
  giraffe: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <rect x="28" y="30" width="9" height="26" rx="2" fill="#f59e0b"/>
    <rect x="25" y="11" width="2.5" height="7" fill="#b45309"/><rect x="37" y="11" width="2.5" height="7" fill="#b45309"/>
    <circle cx="26" cy="11" r="2.6" fill="#78350f"/><circle cx="38" cy="11" r="2.6" fill="#78350f"/>
    <rect x="19" y="16" width="26" height="18" rx="9" fill="#fbbf24"/>
    <circle cx="28" cy="24" r="2.5" fill="#0f172a"/><circle cx="36" cy="24" r="2.5" fill="#0f172a"/>
    <circle cx="31" cy="42" r="3" fill="#d97706"/><circle cx="34" cy="50" r="3" fill="#d97706"/>
  </svg>`,

  // Hamster robot: cachetes inflados + orejitas.
  hamster: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <circle cx="20" cy="22" r="4.5" fill="#a16207"/><circle cx="44" cy="22" r="4.5" fill="#a16207"/>
    <ellipse cx="32" cy="34" rx="18" ry="16" fill="#fcd34d"/>
    <ellipse cx="22" cy="39" rx="5.5" ry="4.5" fill="#fde68a"/><ellipse cx="42" cy="39" rx="5.5" ry="4.5" fill="#fde68a"/>
    <circle cx="27" cy="32" r="2.5" fill="#0f172a"/><circle cx="37" cy="32" r="2.5" fill="#0f172a"/>
    <ellipse cx="32" cy="37" rx="2" ry="1.6" fill="#7c2d12"/>
  </svg>`,

  // Capibara robot: cabezota rectangular zen + hocico.
  capybara: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <circle cx="21" cy="19" r="3.5" fill="#78350f"/><circle cx="43" cy="19" r="3.5" fill="#78350f"/>
    <rect x="15" y="20" width="34" height="26" rx="10" fill="#a16207"/>
    <rect x="20" y="34" width="24" height="13" rx="6" fill="#854d0e"/>
    <circle cx="26" cy="28" r="2.5" fill="#0f172a"/><circle cx="38" cy="28" r="2.5" fill="#0f172a"/>
    <circle cx="25" cy="40" r="1.7" fill="#3f2a12"/><circle cx="39" cy="40" r="1.7" fill="#3f2a12"/>
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
  { id: "dog", label: "Robo-perro" },
  { id: "cat", label: "Robo-gato" },
  { id: "croc", label: "Robo-cocodrilo" },
  { id: "kangaroo", label: "Robo-canguro" },
  { id: "dino", label: "Robo-dino (T-Rex)" },
  { id: "lion", label: "Robo-leon" },
  { id: "elephant", label: "Robo-elefante" },
  { id: "giraffe", label: "Robo-jirafa" },
  { id: "hamster", label: "Robo-hamster" },
  { id: "capybara", label: "Robo-capibara" },
];

/** Devuelve el SVG (string) de un avatar; cae en 'beep' si no existe. */
export function avatarSvg(id) {
  return SVGS[id] || SVGS.beep;
}

/** Nodo del avatar dentro de un circulo con gradiente. size: sm|md|lg. */
export function avatarNode(id, size = "md") {
  const dims = { sm: "w-9 h-9 p-1", md: "w-12 h-12 p-1.5", lg: "w-24 h-24 p-3" }[size] || "w-12 h-12 p-1.5";
  // El SVG va en una capa interna "bymax-alive" (respira + parpadea) para no
  // pelear con el "robot-float" (flotar) del contenedor. Asi Bymax se siente vivo.
  const inner = el("span", { class: "bymax-alive block w-full h-full", html: avatarSvg(id) });
  return el("div", {
    class: "shrink-0 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 " +
      "flex items-center justify-center shadow-lg robot-float " + dims,
    "aria-hidden": "true",
  }, inner);
}

/**
 * Hace que TODOS los Bymax visibles reaccionen con una emocion breve.
 * @param {"happy"|"sad"|"think"} kind
 */
export function bymaxEmote(kind = "happy") {
  if (typeof document === "undefined") return;
  const cls = "bymax-" + kind;
  document.querySelectorAll(".bymax-alive").forEach((node) => {
    node.classList.remove("bymax-happy", "bymax-sad", "bymax-think");
    void node.offsetWidth; // reinicia la animacion
    node.classList.add(cls);
    if (kind !== "think") setTimeout(() => node.classList.remove(cls), 800);
  });
}
