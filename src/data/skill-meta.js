/**
 * data/skill-meta.js — Metadatos visuales de las competencias (datos puros).
 *
 * Define como se ve cada habilidad en el dashboard estilo "tarjetas de colores"
 * (gradiente, icono SVG, subtitulo). El ORDEN de las claves define el orden en
 * pantalla. Los iconos son SVG (sin emojis) que heredan el color del texto.
 *
 * IDIOMA DE LAS ETIQUETAS: el nombre de la competencia se muestra en el idioma
 * META que el alumno estudia (inmersion: si estudias frances, lees "Lecture").
 * El SUBTITULO sigue en espanol (L1) porque explica, no ensena.
 * Modulo PURO: no importa nada de ui/. Quien pinta pasa el `lang`
 * (ui/nav.js: currentLangCode()). Asi data/ nunca depende de ui/.
 */

const svg = (path) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ` +
  `stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6">${path}</svg>`;

/**
 * Nombre de cada competencia por idioma META. Se eligen formas CORTAS: estas
 * etiquetas viven dentro de un POP circular de 84px, no en un parrafo.
 * Si falta un idioma o una clave, cae a ingles (ver skillLabel).
 */
const SKILL_LABELS = {
  en: { grammar: "Grammar", vocabulary: "Vocabulary", reading: "Reading", listening: "Listening", writing: "Writing", speaking: "Speaking" },
  es: { grammar: "Gramatica", vocabulary: "Vocabulario", reading: "Lectura", listening: "Escucha", writing: "Escritura", speaking: "Habla" },
  pt: { grammar: "Gramatica", vocabulary: "Vocabulario", reading: "Leitura", listening: "Escuta", writing: "Escrita", speaking: "Fala" },
  it: { grammar: "Grammatica", vocabulary: "Lessico", reading: "Lettura", listening: "Ascolto", writing: "Scrittura", speaking: "Parlato" },
  fr: { grammar: "Grammaire", vocabulary: "Lexique", reading: "Lecture", listening: "Ecoute", writing: "Ecriture", speaking: "Oral" },
  ja: { grammar: "\u6587\u6cd5", vocabulary: "\u5358\u8a9e", reading: "\u8aad\u89e3", listening: "\u8074\u89e3", writing: "\u4f5c\u6587", speaking: "\u4f1a\u8a71" },
};

/**
 * Etiqueta de una competencia en el idioma META dado.
 * @param {string} key - grammar | vocabulary | reading | listening | writing | speaking
 * @param {string} lang - codigo ISO del idioma meta (default "en")
 * @returns {string} nombre de la competencia, o la propia clave si no existe
 */
export function skillLabel(key, lang = "en") {
  return SKILL_LABELS[lang]?.[key] || SKILL_LABELS.en[key] || key;
}

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
