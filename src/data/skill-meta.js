/**
 * data/skill-meta.js — Metadatos visuales de las competencias (datos puros).
 *
 * Define como se ve cada habilidad en el dashboard estilo "tarjetas de colores"
 * (gradiente, icono SVG, subtitulo). El ORDEN de las claves define el orden en
 * pantalla. Los iconos son SVG (sin emojis) que heredan el color del texto.
 */

const svg = (path) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ` +
  `stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">${path}</svg>`;

export const SKILL_META = {
  grammar: {
    label: "Grammar",
    subtitle: "Gramatica y estructuras",
    gradient: "from-blue-600 to-indigo-800",
    icon: svg('<path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/>'),
  },
  vocabulary: {
    label: "Vocabulary",
    subtitle: "Palabras y expresiones",
    gradient: "from-pink-500 to-rose-700",
    icon: svg('<path d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2z"/><path d="M8 7h8M8 11h8M8 15h5"/>'),
  },
  reading: {
    label: "Reading",
    subtitle: "Comprension de lectura",
    gradient: "from-emerald-500 to-green-800",
    icon: svg('<path d="M12 6.5C10.8 5.7 9.2 5.5 7.5 5.5S4.2 5.7 3 6.5v13c1.2-.8 2.8-1 4.5-1s3.3.2 4.5 1m0-13c1.2-.8 2.8-1 4.5-1s3.3.2 4.5 1v13c-1.2-.8-2.8-1-4.5-1s-3.3.2-4.5 1m0-13v13"/>'),
  },
  listening: {
    label: "Listening",
    subtitle: "Comprension auditiva",
    gradient: "from-teal-500 to-cyan-800",
    icon: svg('<path d="M11 5L6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 010 7M18 6a8 8 0 010 12"/>'),
  },
  writing: {
    label: "Writing",
    subtitle: "Expresion escrita",
    gradient: "from-amber-500 to-orange-700",
    icon: svg('<path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5"/><path d="M17.5 3.5a2.1 2.1 0 013 3L12 15l-4 1 1-4z"/>'),
  },
  speaking: {
    label: "Speaking",
    subtitle: "Conversacion",
    gradient: "from-purple-500 to-fuchsia-800",
    icon: svg('<path d="M21 12a8 8 0 01-11.9 7L3 21l1.9-6.1A8 8 0 1121 12z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/>'),
  },
};
