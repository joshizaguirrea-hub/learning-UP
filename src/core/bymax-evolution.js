/**
 * core/bymax-evolution.js — Evolucion de Bymax (logica pura, tipo Tamagotchi).
 *
 * Bymax "crece" contigo: segun tu XP (lecciones + vocabulario) sube de etapa,
 * gana un aura mas vistosa y una insignia. NO cambia el avatar que elegiste;
 * cambia su "energia" (aura + titulo + badge) -> tu Bymax se siente TUYO y vivo.
 *
 * Sin I/O ni DOM => testeable. Las etapas se miden por XP (mismo XP del perfil).
 */

/** Etapas en orden ascendente. aura = gradiente Tailwind; badge = clave de icono. */
export const BYMAX_STAGES = [
  { min: 0,    name: "Chispa",     aura: "from-slate-400 to-slate-600",     badge: null },
  { min: 150,  name: "Aprendiz",   aura: "from-sky-400 to-indigo-500",      badge: "bulb" },
  { min: 400,  name: "Explorador", aura: "from-emerald-400 to-teal-500",    badge: "map" },
  { min: 800,  name: "Aventurero", aura: "from-amber-400 to-orange-500",    badge: "flame" },
  { min: 1500, name: "Maestro",    aura: "from-fuchsia-400 to-purple-600",  badge: "star" },
  { min: 3000, name: "Leyenda",    aura: "from-yellow-300 to-amber-500",    badge: "star" },
];

/** Indice de la etapa actual segun XP. */
function stageIndex(xp = 0) {
  let i = 0;
  for (let k = 0; k < BYMAX_STAGES.length; k++) {
    if (xp >= BYMAX_STAGES[k].min) i = k;
  }
  return i;
}

/**
 * Info completa de evolucion para pintar la tarjeta de Bymax.
 * @param {number} xp
 * @returns {{ stage, index, next, into, span, pct, toNext, isMax }}
 */
export function bymaxEvolution(xp = 0) {
  const index = stageIndex(xp);
  const stage = BYMAX_STAGES[index];
  const next = BYMAX_STAGES[index + 1] || null;
  const isMax = !next;
  const base = stage.min;
  const ceil = next ? next.min : stage.min;
  const span = Math.max(1, ceil - base);
  const into = Math.min(span, Math.max(0, xp - base));
  const pct = isMax ? 100 : Math.round((into / span) * 100);
  const toNext = isMax ? 0 : Math.max(0, ceil - xp);
  return { stage, index, next, into, span, pct, toNext, isMax };
}
