/**
 * ui/avatar-palette.js — Paletas del profe humano 3D (sin dependencias).
 *
 * Vive aparte de avatar3d.js (que importa three.js) para poder usarse en la UI
 * de Ajustes SIN forzar la descarga de three.js al arranque (lazy-safe).
 *
 * @module ui/avatar-palette
 */

/** Colores de pelo para el profe humano (hex null = dejar el original del modelo). */
export const HAIR_COLORS = [
  { id: "orig", label: "Original", hex: null, swatch: "#6B4423" },
  { id: "rubia", label: "Rubia", hex: "#E8C67A", swatch: "#E8C67A" },
  { id: "castana", label: "Castana", hex: "#6B4423", swatch: "#6B4423" },
  { id: "negra", label: "Negra", hex: "#1B1712", swatch: "#1B1712" },
  { id: "pelirroja", label: "Pelirroja", hex: "#B0561F", swatch: "#B0561F" },
  { id: "canas", label: "Canas", hex: "#C9CBD0", swatch: "#C9CBD0" },
];
