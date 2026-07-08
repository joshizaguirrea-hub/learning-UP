/**
 * ui/a11y.js — Utilidades de accesibilidad (WCAG 2.2 AA).
 *
 * Capa de presentacion. Herramientas para anuncios a lectores de pantalla
 * y manejo de foco al cambiar de vista.
 */

let liveRegion = null;

/** Crea (una vez) la region "aria-live" para anuncios. */
function ensureLiveRegion() {
  if (liveRegion) return liveRegion;
  liveRegion = document.createElement("div");
  liveRegion.setAttribute("aria-live", "polite");
  liveRegion.setAttribute("aria-atomic", "true");
  liveRegion.className = "sr-only";
  document.body.appendChild(liveRegion);
  return liveRegion;
}

/** Anuncia un mensaje a lectores de pantalla sin cambiar el foco. */
export function announce(message) {
  const region = ensureLiveRegion();
  region.textContent = "";
  // Un pequeno retraso asegura que el lector detecte el cambio.
  setTimeout(() => (region.textContent = message), 50);
}

/** Mueve el foco al primer encabezado de una vista recien montada. */
export function focusMainHeading(container) {
  const heading = container.querySelector("h1, h2, [role='heading']");
  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus();
  }
}
