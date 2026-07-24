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

// SVG del personaje. Colores de la marca Bymax (indigo/violeta + ojos cian).
// La boca lleva class "bymax-mouth" para animarse al hablar (ver app.css).
const MASCOT_SVG = `<svg viewBox="0 0 120 150" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" role="img" aria-hidden="true">
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
  <ellipse cx="60" cy="142" rx="26" ry="5" fill="#0f172a" opacity="0.18"/>

  <!-- piernitas -->
  <rect x="46" y="120" width="11" height="16" rx="5" fill="#6d28d9"/>
  <rect x="63" y="120" width="11" height="16" rx="5" fill="#6d28d9"/>
  <ellipse cx="51.5" cy="137" rx="8" ry="4" fill="#4c1d95"/>
  <ellipse cx="68.5" cy="137" rx="8" ry="4" fill="#4c1d95"/>

  <!-- bracitos -->
  <rect x="18" y="78" width="12" height="30" rx="6" fill="#818cf8"/>
  <rect x="90" y="78" width="12" height="30" rx="6" fill="#818cf8"/>
  <circle cx="24" cy="110" r="7" fill="#a5b4fc"/>
  <circle cx="96" cy="110" r="7" fill="#a5b4fc"/>

  <!-- cuerpo -->
  <rect x="30" y="74" width="60" height="50" rx="18" fill="url(#byBody)"/>
  <rect x="30" y="74" width="60" height="50" rx="18" fill="none" stroke="#312e81" stroke-width="1.5" opacity="0.5"/>
  <!-- panel/corazon del pecho -->
  <circle cx="60" cy="96" r="9" fill="#0f172a"/>
  <circle cx="60" cy="96" r="5" fill="#34d399"/>
  <circle cx="46" cy="112" r="2" fill="#c7d2fe"/><circle cx="54" cy="112" r="2" fill="#c7d2fe"/>
  <circle cx="62" cy="112" r="2" fill="#c7d2fe"/><circle cx="70" cy="112" r="2" fill="#c7d2fe"/>

  <!-- antena -->
  <line x1="60" y1="30" x2="60" y2="15" stroke="#a5b4fc" stroke-width="3" stroke-linecap="round"/>
  <circle cx="60" cy="11" r="5" fill="#f472b6"/>
  <circle cx="60" cy="11" r="2" fill="#fce7f3"/>

  <!-- cabeza -->
  <rect x="26" y="28" width="68" height="50" rx="20" fill="url(#byHead)"/>
  <rect x="26" y="28" width="68" height="50" rx="20" fill="none" stroke="#3730a3" stroke-width="1.5" opacity="0.5"/>
  <!-- orejitas -->
  <rect x="20" y="44" width="7" height="16" rx="3.5" fill="#6366f1"/>
  <rect x="93" y="44" width="7" height="16" rx="3.5" fill="#6366f1"/>

  <!-- pantalla/cara -->
  <rect x="33" y="36" width="54" height="34" rx="14" fill="#0f172a"/>
  <!-- ojos -->
  <circle cx="49" cy="52" r="6" fill="url(#byEye)"/>
  <circle cx="71" cy="52" r="6" fill="url(#byEye)"/>
  <circle cx="47" cy="50" r="1.8" fill="#ffffff"/>
  <circle cx="69" cy="50" r="1.8" fill="#ffffff"/>
  <!-- cachetes -->
  <ellipse cx="40" cy="61" rx="4" ry="2.5" fill="#f472b6" opacity="0.55"/>
  <ellipse cx="80" cy="61" rx="4" ry="2.5" fill="#f472b6" opacity="0.55"/>
  <!-- boca (se anima al hablar) -->
  <rect class="bymax-mouth" x="52" y="61" width="16" height="4" rx="2" fill="#67e8f9"/>
</svg>`;

const SIZES = { sm: "w-14", md: "w-20", lg: "w-28", xl: "w-36" };

/**
 * Nodo de la mascota de Bymax.
 * @param {"sm"|"md"|"lg"|"xl"} [size]
 * @returns {HTMLElement}
 */
export function bymaxMascot(size = "md") {
  const w = SIZES[size] || SIZES.md;
  const inner = el("span", { class: "bymax-alive block w-full h-full", html: MASCOT_SVG });
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
