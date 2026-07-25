/**
 * ui/bymax-mascot.js — Mascota de CUERPO COMPLETO de Bymax (la "cara" de la IA).
 *
 * Capa de presentacion. SVG dibujado a mano (viewBox 0 0 120 150), sin marcas
 * registradas y sin archivos pesados: escala perfecto y se anima con puro CSS.
 * Reutiliza las clases vivas ya existentes (.bymax-alive respira/parpadea,
 * .robot-float flota) para NO duplicar animaciones (DRY). Estados:
 *   - hablar  -> setBymaxTalking(true/false)  (la boca se mueve)
 *   - pensar/feliz/triste -> se disparan con bymaxEmote() de ui/avatars.js
 *
 * Vive en el chat con Bymax (features/conversation.js), pero es reutilizable.
 */
import { el } from "./dom.js";
import { getRobot } from "./robot-prefs.js";
import { animalMascotSvg } from "./mascot-bodies.js";

// SVG del personaje: Bymax con CUERPO DE PERRITO (robo-cachorro sentado).
// Colores de la marca Bymax (indigo/violeta + ojos cian). Orejas floppy, cuatro
// paticas y colita (class "bymax-tail" para menearse). La boca lleva class
// "bymax-mouth" para animarse al hablar (ver app.css).
const MASCOT_SVG = `<svg viewBox="6 0 140 150" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" role="img" aria-hidden="true">
  <defs>
    <linearGradient id="byBody" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#818cf8"/><stop offset="1" stop-color="#6d28d9"/>
    </linearGradient>
    <linearGradient id="byHead" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#a5b4fc"/><stop offset="1" stop-color="#6366f1"/>
    </linearGradient>
    <radialGradient id="byEye" cx="0.35" cy="0.35" r="0.75">
      <stop offset="0" stop-color="#ecfeff"/><stop offset="0.5" stop-color="#67e8f9"/><stop offset="1" stop-color="#06b6d4"/>
    </radialGradient>
  </defs>

  <!-- sombra flotante suave -->
  <ellipse cx="70" cy="143" rx="42" ry="6" fill="#0f172a" opacity="0.18"/>

  <!-- colita meneable (se anima con .bymax-tail) -->
  <path class="bymax-tail" d="M102 106 Q128 100 124 76 Q113 90 98 94 Z" fill="#6d28d9"/>

  <!-- patas traseras (sentado) -->
  <ellipse cx="41" cy="120" rx="16" ry="18" fill="#6d28d9"/>
  <ellipse cx="99" cy="120" rx="16" ry="18" fill="#6d28d9"/>

  <!-- cuerpo sentado -->
  <ellipse cx="70" cy="106" rx="33" ry="35" fill="url(#byBody)"/>
  <ellipse cx="70" cy="106" rx="33" ry="35" fill="none" stroke="#312e81" stroke-width="1.5" opacity="0.5"/>

  <!-- patitas delanteras -->
  <rect x="53" y="116" width="14" height="27" rx="7" fill="#818cf8"/>
  <rect x="73" y="116" width="14" height="27" rx="7" fill="#818cf8"/>
  <ellipse cx="60" cy="142" rx="9" ry="4.5" fill="#4c1d95"/>
  <ellipse cx="80" cy="142" rx="9" ry="4.5" fill="#4c1d95"/>
  <circle cx="57" cy="142" r="1.3" fill="#c7d2fe"/><circle cx="60" cy="143" r="1.3" fill="#c7d2fe"/><circle cx="63" cy="142" r="1.3" fill="#c7d2fe"/>
  <circle cx="77" cy="142" r="1.3" fill="#c7d2fe"/><circle cx="80" cy="143" r="1.3" fill="#c7d2fe"/><circle cx="83" cy="142" r="1.3" fill="#c7d2fe"/>

  <!-- panel/corazon del pecho -->
  <circle cx="70" cy="102" r="9" fill="#0f172a"/>
  <circle cx="70" cy="102" r="5" fill="#34d399"/>

  <!-- antena -->
  <line x1="70" y1="22" x2="70" y2="8" stroke="#a5b4fc" stroke-width="3" stroke-linecap="round"/>
  <circle cx="70" cy="6" r="4.5" fill="#f472b6"/>
  <circle cx="70" cy="6" r="1.8" fill="#fce7f3"/>

  <!-- cabeza -->
  <rect x="40" y="20" width="60" height="52" rx="22" fill="url(#byHead)"/>
  <rect x="40" y="20" width="60" height="52" rx="22" fill="none" stroke="#3730a3" stroke-width="1.5" opacity="0.5"/>

  <!-- orejas floppy de perrito -->
  <path d="M47 24 Q29 26 27 52 Q30 62 41 58 Q46 43 51 31 Z" fill="#6366f1"/>
  <path d="M93 24 Q111 26 113 52 Q110 62 99 58 Q94 43 89 31 Z" fill="#6366f1"/>

  <!-- pantalla/cara -->
  <rect x="47" y="30" width="46" height="34" rx="14" fill="#0f172a"/>
  <!-- ojos -->
  <circle cx="60" cy="45" r="6" fill="url(#byEye)"/>
  <circle cx="80" cy="45" r="6" fill="url(#byEye)"/>
  <circle cx="58" cy="43" r="1.8" fill="#ffffff"/>
  <circle cx="78" cy="43" r="1.8" fill="#ffffff"/>
  <!-- cachetes -->
  <ellipse cx="51" cy="55" rx="4" ry="2.5" fill="#f472b6" opacity="0.55"/>
  <ellipse cx="89" cy="55" rx="4" ry="2.5" fill="#f472b6" opacity="0.55"/>
  <!-- naricita + boca (se anima al hablar) -->
  <ellipse cx="70" cy="52" rx="3" ry="2.2" fill="#f472b6"/>
  <rect class="bymax-mouth" x="63" y="57" width="14" height="4" rx="2" fill="#67e8f9"/>
</svg>`;

const SIZES = { sm: "w-16", md: "w-24", lg: "w-32", xl: "w-40" };

/**
 * Nodo de la mascota de Bymax (cuerpo completo). Si el alumno eligio un robo-
 * animal con cuerpo (gato, leon, dino...), muestra ESE cuerpo; si no, el perrito.
 * @param {"sm"|"md"|"lg"|"xl"} [size]
 * @param {string} [id] - avatar a dibujar (por defecto, el elegido por el alumno)
 * @returns {HTMLElement}
 */
export function bymaxMascot(size = "md", id) {
  const w = SIZES[size] || SIZES.md;
  const avatar = id || getRobot().avatar;
  const svg = animalMascotSvg(avatar) || MASCOT_SVG; // animal con cuerpo, o el perrito Bymax
  const inner = el("span", { class: "bymax-alive block w-full h-full", html: svg });
  return el("div", {
    class: "shrink-0 robot-float " + w,
    "aria-hidden": "true",
  }, inner);
}

/**
 * Activa/desactiva la animacion de "hablar" (boca en movimiento) en TODAS las
 * mascotas visibles. Se usa mientras Bymax responde/lee su mensaje.
 * @param {boolean} on
 */
export function setBymaxTalking(on) {
  if (typeof document === "undefined") return;
  document.querySelectorAll(".bymax-alive").forEach((node) => {
    node.classList.toggle("is-talking", !!on);
  });
}
