/**
 * core/example-gen.js — Generador de ejemplos por nivel (sin IA, offline).
 *
 * Logica PURA. A partir de las formas de un verbo (base / pasado / participio)
 * rellena plantillas de frases agrupadas por dificultad, para que el estudiante
 * pueda "Generar mas ejemplos" adaptados a su nivel cuantas veces quiera.
 *
 * Usa solo sujetos I/You/We/They para que el presente no necesite la -s de
 * tercera persona (evita generar frases gramaticalmente incorrectas).
 */

export const GEN_LEVELS = [
  { id: "basico", label: "Basico" },
  { id: "intermedio", label: "Intermedio" },
  { id: "avanzado", label: "Avanzado" },
];

// Plantillas por nivel y tiempo. {base}=presente, {past}=pasado, {part}=participio.
const FRAMES = {
  basico: {
    present: ["I {base} every day.", "We {base} together.", "They {base} a lot.", "You {base} very well."],
    past: ["Yesterday I {past}.", "We {past} last week.", "They {past} first.", "You {past} on time."],
    perfect: ["I have {part} before.", "We have {part} it already.", "They have {part} today.", "You have {part} enough."],
  },
  intermedio: {
    present: [
      "I usually {base} before work.",
      "We often {base} on weekends.",
      "They {base} whenever they get the chance.",
      "You {base} more than you think.",
    ],
    past: [
      "Last month they {past} without any problems.",
      "She {past} right after the meeting.",
      "We {past} earlier than planned.",
      "In the end, he {past} anyway.",
    ],
    perfect: [
      "I have already {part} it twice.",
      "She has never {part} anything like that.",
      "We have just {part} the whole thing.",
      "They have {part} it more than once.",
    ],
  },
  avanzado: {
    present: [
      "Whenever things get busy, we {base} to stay on track.",
      "They {base} in order to keep the team aligned.",
      "We tend to {base} even under pressure.",
      "I make a point to {base} no matter what.",
    ],
    past: [
      "Despite the setback, they {past} ahead of schedule.",
      "He {past} long before anyone else realized.",
      "Against all odds, we {past} without a hitch.",
      "Once the plan was clear, they {past} straight away.",
    ],
    perfect: [
      "Over the years, we have {part} more times than we can count.",
      "I have {part} it enough to know the risks.",
      "They have {part} their way through tougher situations.",
      "By now, she has {part} just about everything.",
    ],
  },
};

function fill(frame, forms) {
  return frame
    .replace("{base}", forms.base)
    .replace("{past}", forms.past)
    .replace("{part}", forms.part);
}

function pickN(arr, n) {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

/**
 * Genera `count` ejemplos nuevos para un item de verbo, en el nivel dado.
 * @param {object} item - { front, past?, participle?, back }
 * @param {string} level - 'basico' | 'intermedio' | 'avanzado'
 * @param {number} count
 * @returns {Array<{en:string, level:string}>}
 */
export function generateExamples(item, level = "intermedio", count = 2) {
  const bank = FRAMES[level] || FRAMES.intermedio;
  const forms = {
    base: item.front,
    past: item.past || item.back, // regulares: back es el pasado
    part: item.participle || null,
  };

  // Junta las plantillas de los tiempos disponibles (perfect solo si hay participio).
  const pool = [...bank.present, ...bank.past];
  if (forms.part) pool.push(...bank.perfect);

  return pickN(pool, count).map((frame) => ({ en: fill(frame, forms), level }));
}
