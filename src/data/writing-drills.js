/**
 * data/writing-drills.js — GENERADORES de ejercicios deterministas de escritura.
 *
 * Datos PUROS (cero DOM, cero red). Leen lo que la unidad YA trae:
 *   - unit.vocab: [{ term, translation, example }]
 *   - unit.lessons[].grammar: { form, examples[], explain:{tr[]}, mistakes:[{wrong,right}] }
 *
 * y escupen "drills" que el reproductor (features/writing-drills-player.js) sabe
 * pintar y corregir SOLO (sin IA => gratis, instantaneo, offline). DRY: en vez de
 * escribir ejercicios a mano en 57 unidades, los derivamos del contenido existente.
 *
 * Modelo de drill (uniforme para el player):
 *   { kind, prompt, promptEs?, choices?, pairs?, answer, explain?, say? }
 *   - kind "pick"  -> elige la opcion correcta (choices[] con trampas). answer = texto correcto.
 *   - kind "match" -> empareja columnas. pairs: [{left,right}].
 *   - kind "fix"   -> corrige una frase con error. answer = frase correcta.
 *   - kind "recall"-> traduce/reconstruye desde el espanol. answer = frase en ingles.
 *   - say = texto en INGLES a pronunciar tras acertar (refuerzo auditivo).
 */

const norm = (s) => String(s || "").trim().toLowerCase();
/** Quita "to " inicial y puntuacion suave para comparar respuestas de forma justa. */
export function normAnswer(s) {
  return norm(s).replace(/^to\s+/, "").replace(/[.,;:!?"']/g, "").replace(/\s+/g, " ");
}
const shuffle = (arr) => arr.map((x) => [Math.random(), x]).sort((a, b) => a[0] - b[0]).map((p) => p[1]);
const pickN = (arr, n) => shuffle(arr).slice(0, n);

/** Todas las secciones de gramatica de la unidad (una por leccion que la tenga). */
function unitGrammars(unit) {
  return (unit?.lessons || []).map((l) => l.grammar).filter(Boolean);
}
/** Todas las mistakes {wrong,right} de la unidad, aplanadas y deduplicadas. */
function unitMistakes(unit) {
  const seen = new Set();
  const out = [];
  for (const g of unitGrammars(unit)) {
    for (const m of g.mistakes || []) {
      if (!m || !m.wrong || !m.right) continue;
      const k = norm(m.right);
      if (seen.has(k)) continue;
      seen.add(k);
      out.push(m);
    }
  }
  return out;
}

/** Vocab con ejemplo en ingles y una sola palabra (util para blanks limpios). */
function usableVocab(unit) {
  return (unit?.vocab || []).filter((v) => v.term && v.translation);
}

/**
 * COMPLETAR: toma el ejemplo en ingles de una palabra del vocab, borra la palabra
 * y ofrece un banco (respuesta + 3 distractores del MISMO tema = trampas ricas).
 */
export function genCompletar(unit, n = 6) {
  const vocab = usableVocab(unit).filter((v) => v.example && new RegExp(`\\b${v.term}\\b`, "i").test(v.example));
  const terms = [...new Set(vocab.map((v) => v.term))];
  if (vocab.length < 2 || terms.length < 3) return [];
  return pickN(vocab, n).map((v) => {
    const blanked = v.example.replace(new RegExp(`\\b${v.term}\\b`, "i"), "____");
    const distractors = pickN(terms.filter((t) => norm(t) !== norm(v.term)), 3);
    return {
      kind: "pick",
      prompt: blanked,
      promptEs: v.translation ? `(pista: "${v.translation}")` : "",
      choices: shuffle([v.term, ...distractors]),
      answer: v.term,
      explain: `"${v.term}" = ${v.translation}.`,
      say: v.example,
    };
  });
}

/**
 * ASOCIAR: empareja termino en ingles con su traduccion. Se parte en tandas de 4
 * para que sea agil en movil.
 */
export function genAsociar(unit, perRound = 4) {
  const vocab = usableVocab(unit);
  if (vocab.length < 3) return [];
  const rounds = [];
  const chunks = pickN(vocab, Math.min(vocab.length, perRound * 3));
  for (let i = 0; i < chunks.length; i += perRound) {
    const slice = chunks.slice(i, i + perRound);
    if (slice.length < 2) break;
    rounds.push({
      kind: "match",
      prompt: "Empareja cada palabra con su significado:",
      pairs: slice.map((v) => ({ left: v.term, right: v.translation })),
    });
  }
  return rounds;
}

/**
 * TRAMPA: entre la version CON error y la correcta (de grammar.mistakes), elige la
 * correcta. Entrena el "ojo" para detectar el fallo tipico del tema.
 */
export function genTrampa(unit, n = 6) {
  const mistakes = unitMistakes(unit);
  if (!mistakes.length) return [];
  return pickN(mistakes, n).map((m) => ({
    kind: "pick",
    prompt: "\u00bfCu\u00e1l oraci\u00f3n es CORRECTA?",
    choices: shuffle([m.right, m.wrong]),
    answer: m.right,
    explain: `Correcto: "${m.right}". Evita: "${m.wrong}".`,
    say: m.right,
  }));
}

/**
 * CAZA-ERRORES: muestra la frase CON error y el alumno escribe la version correcta.
 * Corrige comparando con m.right (tolerante a mayusculas/puntuacion). Reutilizable
 * por Writing y Grammar (misma data, mismo player) = DRY total.
 */
export function genCazaErrores(unit, n = 6) {
  const mistakes = unitMistakes(unit);
  if (!mistakes.length) return [];
  return pickN(mistakes, n).map((m) => ({
    kind: "fix",
    prompt: m.wrong,
    promptEs: "Reescribe la frase SIN el error.",
    answer: m.right,
    explain: `Correcto: "${m.right}".`,
    say: m.right,
  }));
}

/**
 * TRADUCCION INVERSA / DICTOGLOSS: muestra el modelo en ingles (con su traduccion),
 * lo escondemos y el alumno lo reconstruye desde el espanol. Usa los examples de la
 * gramatica + su explain.tr (traducciones ya escritas en la unidad).
 */
export function genTraduccion(unit, n = 6) {
  const items = [];
  for (const g of unitGrammars(unit)) {
    const ex = g.examples || [];
    const tr = (g.explain && g.explain.tr) || [];
    ex.forEach((en, i) => {
      const es = tr[i];
      if (en && es) items.push({ en, es });
    });
  }
  // Respaldo: usa el vocab (ejemplo EN) si la gramatica no trajo traducciones.
  if (items.length < 2) return [];
  return pickN(items, n).map((it) => ({
    kind: "recall",
    prompt: it.es,
    promptEs: "Escr\u00edbelo en INGL\u00c9S (recuerda el modelo).",
    answer: it.en,
    explain: `Modelo: "${it.en}".`,
    say: it.en,
  }));
}

/** Etiquetas + generador de cada tipo determinista (para armar el hub sin repetir). */
export const DRILL_TYPES = [
  { id: "completar", label: "Completar la oraci\u00f3n", desc: "Rellena el hueco con la palabra correcta (ojo con las trampas).", gen: genCompletar },
  { id: "asociar", label: "Asociar", desc: "Empareja cada palabra con su significado.", gen: genAsociar },
  { id: "trampa", label: "Oraciones con trampa", desc: "Detecta cu\u00e1l oraci\u00f3n es la correcta.", gen: genTrampa },
  { id: "caza", label: "Caza-errores", desc: "Encuentra el error y reescribe la frase.", gen: genCazaErrores },
  { id: "traduccion", label: "Traducci\u00f3n inversa", desc: "Ves el modelo, se esconde y lo reconstruyes.", gen: genTraduccion },
];
