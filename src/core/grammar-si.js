/**
 * core/grammar-si.js — "Structured Input" (Processing Instruction, VanPatten). PURO.
 *
 * La idea pedagogica: los aprendices tienden a IGNORAR la gramatica y adivinar el
 * significado por el vocabulario o el orden. El Structured Input les OBLIGA a
 * procesar la FORMA para captar el significado, con actividades REFERENCIALES
 * (tienen una respuesta correcta). Aqui generamos dos familias 100% deterministas
 * y detectables con fiabilidad a partir del contenido real de la unidad:
 *
 *   1) TIEMPO (el ejemplo estrella de VanPatten): oyes/lees una frase SIN adverbio
 *      de tiempo y decides si YA PASO, PASA AHORA/SIEMPRE o VA A PASAR. Como no
 *      hay "yesterday/tomorrow" que te salve, tienes que mirar el VERBO.
 *   2) POLARIDAD: la frase AFIRMA o NIEGA (procesar not / -n't / never).
 *
 * Solo se incluye una familia si la unidad tiene VARIEDAD real (>=2 tiempos, o
 * afirmativas + negativas); si no, seria trivial y se descarta. La presentacion
 * (POP con voz) vive en features/grammar-input.js. Esto es logica pura y testeable.
 */

// Pasados irregulares comunes e INEQUIVOCOS (se excluyen los que coinciden con el
// presente: put/read/let/cut/hit/cost/set/shut, que serian ambiguos).
const IRREGULAR_PAST = new Set([
  "was", "were", "had", "went", "saw", "ate", "made", "took", "came", "got",
  "said", "bought", "thought", "found", "gave", "told", "felt", "left", "met",
  "knew", "wrote", "ran", "sat", "won", "spoke", "drank", "drove", "flew",
  "brought", "taught", "began", "broke", "chose", "drew", "fell", "forgot",
  "grew", "heard", "held", "kept", "lost", "paid", "rode", "rose", "sang",
  "sent", "slept", "sold", "stood", "swam", "understood", "wore", "woke", "did",
]);

// Adjetivos terminados en -ed que NO son verbos en pasado (evita falsos positivos).
const ADJ_ED = new Set([
  "tired", "bored", "scared", "excited", "worried", "interested", "surprised",
  "confused", "crowded", "talented", "gifted", "red", "used",
]);

// Adverbios/expresiones de tiempo: si aparecen, la frase NO sirve para la
// actividad de TIEMPO (seria demasiado facil; hay que forzar mirar el verbo).
const TIME_MARKERS = [
  "yesterday", "today", "tomorrow", "tonight", "now", " ago", "last ", "next ",
  "always", "usually", "currently", "this morning", "this afternoon",
  "this evening", "these days", "right now", "in the future", "in the past",
];

const NEG_MARKERS = ["n't", " not", "never", "nobody", "nothing", "none", " no "];

const TENSE_LABEL = {
  past: "Ya pas\u00f3 (pasado)",
  present: "Pasa ahora o siempre (presente)",
  future: "Va a pasar (futuro)",
};

/** Normaliza y parte en palabras en minusculas. */
function words(s) {
  return String(s).toLowerCase().replace(/[.,!?;:"]/g, " ").split(/\s+/).filter(Boolean);
}

/** Asegura que la frase termine con un signo de puntuacion. */
function tidy(s) {
  const t = String(s).trim();
  return /[.!?]$/.test(t) ? t : t + ".";
}

/** ¿La frase contiene un adverbio/expresion de tiempo explicito? */
export function hasTimeMarker(sentence) {
  const s = " " + String(sentence).toLowerCase() + " ";
  return TIME_MARKERS.some((m) => s.includes(m));
}

/**
 * Detecta el tiempo verbal de una frase inglesa: 'past' | 'present' | 'future'
 * | null (si no se puede afirmar con confianza). El ORDEN importa: primero futuro,
 * luego marcas explicitas de pasado/presente (was/were/did vs am/is/are/do), y al
 * final la heuristica de -ed. Asi "I am tired" (adjetivo -ed) sale PRESENTE.
 */
export function detectTense(sentence) {
  const s = " " + String(sentence).toLowerCase() + " ";
  const w = words(sentence);
  // 1) Futuro
  if (s.includes("will ") || s.includes("'ll ") || s.includes("going to ") || s.includes("gonna ")) return "future";
  // 2) Pasado explicito (be/aux)
  if (w.some((x) => ["was", "were", "did", "didn't"].includes(x))) return "past";
  // 3) Presente explicito (be/aux) -> resuelve adjetivos -ed como "am tired"
  if (w.some((x) => ["am", "is", "are", "do", "does", "don't", "doesn't", "has", "have"].includes(x))) return "present";
  // 4) Pasado irregular inequivoco
  if (w.some((x) => IRREGULAR_PAST.has(x))) return "past";
  // 5) Pasado regular -ed (que no sea un adjetivo conocido)
  if (w.some((x) => /^[a-z]{4,}ed$/.test(x) && !ADJ_ED.has(x))) return "past";
  // 6) Presente por defecto si hay algun verbo terminado en -s (she works)
  if (w.some((x) => /^[a-z]{3,}s$/.test(x))) return "present";
  return null; // no arriesgamos
}

/** Detecta polaridad: 'neg' si niega, 'aff' si afirma. */
export function detectPolarity(sentence) {
  const s = " " + String(sentence).toLowerCase() + " ";
  return NEG_MARKERS.some((m) => s.includes(m)) ? "neg" : "aff";
}

/** Reune y limpia las frases-fuente de la unidad (gramatica + vocab). */
export function sourceSentences(unit) {
  const g = grammarOf(unit);
  const fromGrammar = [...(g?.examples || []), ...((g?.mistakes || []).map((m) => m.right))];
  const fromVocab = (unit?.vocab || []).slice(0, 8).map((v) => v.example).filter(Boolean);
  const seen = new Set();
  const out = [];
  for (const raw of [...fromGrammar, ...fromVocab]) {
    if (!raw) continue;
    const s = tidy(raw);
    const key = s.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(s);
  }
  return out;
}

/** Extrae el objeto grammar de la unidad (de su leccion de gramatica). */
export function grammarOf(unit) {
  return (unit?.lessons || []).find((l) => l && l.grammar)?.grammar || null;
}

/**
 * Construye la sesion de Structured Input de una unidad.
 * @param {object} unit
 * @param {object} [opts] { max = 8 }
 * @returns {{ focus, form, rule, examples, items }} items = actividades referenciales.
 *   item = { id, family:'tense'|'polarity', sentence, question, options:[{text,correct}], explain }
 */
export function buildGrammarInput(unit, opts = {}) {
  const max = opts.max || 8;
  const g = grammarOf(unit);
  const pool = sourceSentences(unit);

  // --- Familia TIEMPO (solo frases SIN adverbio de tiempo) ---
  const tenseRaw = pool
    .filter((s) => !hasTimeMarker(s))
    .map((s) => ({ s, t: detectTense(s) }))
    .filter((x) => x.t);
  const distinctTenses = new Set(tenseRaw.map((x) => x.t));
  const tenseItems = distinctTenses.size >= 2 ? tenseRaw.map((x, i) => ({
    id: "t" + i,
    family: "tense",
    sentence: x.s,
    question: "\u00bfCu\u00e1ndo ocurre? (f\u00edjate en el VERBO, no hay pista de tiempo)",
    options: [
      { text: TENSE_LABEL.past, correct: x.t === "past" },
      { text: TENSE_LABEL.present, correct: x.t === "present" },
      { text: TENSE_LABEL.future, correct: x.t === "future" },
    ],
    explain: "La forma del verbo indica: " + TENSE_LABEL[x.t] + ".",
  })) : [];

  // --- Familia POLARIDAD (solo si hay afirmativas Y negativas) ---
  const polRaw = pool.map((s) => ({ s, p: detectPolarity(s) }));
  const hasAff = polRaw.some((x) => x.p === "aff");
  const hasNeg = polRaw.some((x) => x.p === "neg");
  const polItems = (hasAff && hasNeg) ? polRaw.map((x, i) => ({
    id: "p" + i,
    family: "polarity",
    sentence: x.s,
    question: "\u00bfLa frase AFIRMA o NIEGA?",
    options: [
      { text: "Afirma (s\u00ed)", correct: x.p === "aff" },
      { text: "Niega (no)", correct: x.p === "neg" },
    ],
    explain: x.p === "neg" ? "Lleva una marca negativa (not / -n't / never)." : "No lleva marca negativa: afirma.",
  })) : [];

  // Intercala las dos familias para que no sea monotono, y acota.
  const items = interleave(tenseItems, polItems).slice(0, max);

  return {
    focus: g?.title || "Gram\u00e1tica",
    form: g?.form || "",
    rule: g?.rule || "",
    examples: g?.examples || [],
    items,
  };
}

/** Intercala dos listas (a[0], b[0], a[1], b[1], ...). */
function interleave(a, b) {
  const out = [];
  const n = Math.max(a.length, b.length);
  for (let i = 0; i < n; i++) {
    if (i < a.length) out.push(a[i]);
    if (i < b.length) out.push(b[i]);
  }
  return out;
}

/** % de aciertos redondeado. */
export function scorePct(correct, total) {
  return total ? Math.round((correct / total) * 100) : 0;
}
