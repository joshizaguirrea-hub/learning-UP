/**
 * core/verb-tips.js — Genera "pops" (tarjetas de ayuda) para un verbo.
 *
 * Logica PURA. A partir de las formas del verbo arma explicaciones de la regla,
 * cuando se usa cada tiempo y notas utiles, para aprovechar el espacio lateral
 * y ayudar a ENTENDER el verbo, no solo memorizarlo.
 *
 * Cada tip: { tone: 'rule'|'use'|'note', title, body }
 */

// Notas especiales para verbos con trampas comunes.
const NOTES = {
  read: "OJO: 'read' se escribe igual en las 3 formas, pero el pasado y el participio se PRONUNCIAN 'red' (como el color).",
  get: "En ingles de EE.UU. el participio es 'gotten'; en britanico suele ser 'got'.",
  go: "'go' + '-ing' (going to) se usa para planes futuros: I'm going to travel.",
  make: "Diferencia clave: 'make' = crear/producir; 'do' = realizar una accion o tarea.",
  see: "Con sentidos (see, hear) no se usa el continuo: di 'I see it', no 'I am seeing it'.",
  come: "'come' = venir (hacia el hablante); 'go' = ir (alejandose). No los confundas.",
};

/**
 * @param {object} item - { front, past?, participle?, back }
 * @returns {Array<{tone,title,body}>}
 */
export function generateTips(item) {
  const tips = [];
  const base = item.front;
  const past = item.past || item.back; // regular: back es el pasado
  const participle = item.participle || null;
  const irregular = !!item.participle;

  // 1) La regla del verbo.
  tips.push({
    tone: "rule",
    icon: "book",
    grad: "from-indigo-500 to-blue-600",
    title: "La regla",
    body: irregular
      ? `"${base}" es IRREGULAR: sus formas no siguen la regla -ed, hay que memorizarlas. ` +
        `Base: ${base} - Pasado: ${past} - Participio: ${participle}.`
      : `"${base}" es REGULAR: el pasado y el participio se forman agregando -ed -> "${past}".`,
  });

  // 2) Presente simple.
  tips.push({
    tone: "use",
    icon: "clock",
    grad: "from-emerald-500 to-teal-600",
    title: "Presente simple",
    body: `Para rutinas y hechos generales. Con I/you/we/they usas la base: "${base}". ` +
      `Ej: I ${base} every day.`,
  });

  // 3) Pasado simple.
  tips.push({
    tone: "use",
    icon: "clock",
    grad: "from-sky-500 to-indigo-600",
    title: "Pasado simple",
    body: `Para una accion terminada en el pasado. Usa "${past}". ` +
      `Suele acompanarse de yesterday, last week, ago. Ej: Yesterday I ${past}.`,
  });

  // 4) Present perfect (solo si hay participio distinto util).
  if (participle) {
    tips.push({
      tone: "use",
      icon: "clock",
      grad: "from-fuchsia-500 to-purple-600",
      title: "Present perfect",
      body: `have/has + PARTICIPIO ("${participle}"). Para experiencias o acciones con efecto en el presente. ` +
        `Va con ever, never, already, just, yet. Ej: I have ${participle} before.`,
    });
  }

  // 5) Nota especial del verbo, si existe.
  if (NOTES[base]) {
    tips.push({ tone: "note", icon: "bulb", grad: "from-amber-500 to-orange-600", title: "Tip", body: NOTES[base] });
  }

  return tips;
}
