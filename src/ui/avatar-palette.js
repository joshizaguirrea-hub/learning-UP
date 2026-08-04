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

/**
 * Tonos de piel (hex null = original). Se MULTIPLICAN sobre la textura de piel
 * (que ya es clara), asi que oscurecen el tono. Es una aproximacion: no cambia
 * pelo ni rasgos. El swatch es orientativo (el resultado depende de la textura).
 */
export const SKIN_TONES = [
  { id: "orig", label: "Original", hex: null, swatch: "#E7BE9A" },
  { id: "clara", label: "Clara", hex: "#F2D2B3", swatch: "#F2D2B3" },
  { id: "media", label: "Media", hex: "#C98D63", swatch: "#C98D63" },
  { id: "morena", label: "Morena", hex: "#9A6540", swatch: "#9A6540" },
  { id: "oscura", label: "Oscura", hex: "#6E4629", swatch: "#6E4629" },
];
