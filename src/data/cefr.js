/**
 * data/cefr.js — Niveles del Marco Comun Europeo de Referencia (MCER/CEFR).
 *
 * Datos PUROS (sin logica, sin I/O). Fuente unica de verdad para los niveles.
 * Cualquier modulo que necesite hablar de niveles importa desde aqui.
 */

/** Orden oficial de menor a mayor. "Native" es un extra para profesores. */
export const CEFR_ORDER = ["A1", "A2", "B1", "B2", "C1", "C2", "Native"];

/** Descripciones cortas y amigables por nivel (en espanol). */
export const CEFR_INFO = {
  A1: { label: "Principiante", blurb: "Frases basicas y necesidades cotidianas." },
  A2: { label: "Basico", blurb: "Situaciones simples y rutinarias." },
  B1: { label: "Intermedio", blurb: "Ideas sobre temas familiares y viajes." },
  B2: { label: "Intermedio alto", blurb: "Conversacion fluida con nativos." },
  C1: { label: "Avanzado", blurb: "Uso flexible y eficaz del idioma." },
  C2: { label: "Maestria", blurb: "Practicamente como un nativo." },
  Native: { label: "Nativo", blurb: "Hablante nativo del idioma." },
};

/** Devuelve el indice del nivel (para comparar). -1 si no existe. */
export function cefrRank(level) {
  return CEFR_ORDER.indexOf(level);
}

/** True si `a` es un nivel igual o superior a `b`. */
export function isAtLeast(a, b) {
  return cefrRank(a) >= cefrRank(b) && cefrRank(a) !== -1;
}

/** Devuelve el siguiente nivel del estudiante (o null si ya es el maximo). */
export function nextLevel(level) {
  const i = CEFR_ORDER.indexOf(level);
  // No proponemos "Native" como meta para estudiantes: el tope es C2.
  if (i < 0 || level === "C2" || level === "Native") return null;
  return CEFR_ORDER[i + 1];
}
