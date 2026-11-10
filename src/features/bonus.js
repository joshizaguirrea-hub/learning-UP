/**
 * features/bonus.js — Mazos "Bonus" de conocimiento + medallas de logro.
 *
 * /bonus        -> lista de mazos con su medalla y progreso.
 * /bonus/:id    -> estudio del mazo como flashcards (reutiliza SRS).
 *
 * Una medalla se GANA al dominar el mazo: todos sus items con reps >= MASTER_REPS.
 */
import { bonusDeckById, bonusDecksForLanguage } from "../data/bonus-decks.js";
import { ensureCards, saveCard, getCardsByIds } from "../services/srs.js";
import { recordActivity } from "../services/profiles.js";
import { buildVerbTimeline } from "./verb-timeline.js";
import { buildVerbChallenge } from "./verb-challenge.js";
import { buildGuessGame } from "./flashcard-game.js";
import { MASTER_REPS, bonusMedals } from "../core/gamification.js";
import { stripMd, parseDeepenAnswer } from "../core/ai-deepen.js";
import { CEFR_ORDER } from "../data/cefr.js";
import { currentLangCode } from "../ui/nav.js";
import { micCode, languageName } from "../data/languages.js";
import { speakButton, speak } from "../ui/speech.js";
import { getAutoplay } from "../ui/prefs.js";
import { askBymax } from "../services/bymax-ai.js";
import { bymaxAiEnabled } from "../config/bymax.js";
import { ICONS } from "../ui/icons.js";
import { el, mount, replaceKids } from "../ui/dom.js";
import { buildContentTabs } from "../ui/content-tabs.js";
import { announce, focusMainHeading } from "../ui/a11y.js";
import { go } from "../ui/router.js";

const PANEL = "bg-slate-900 border border-slate-800 rounded-2xl p-5";
const BTN = "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-6 py-2.5 rounded-lg " +
  "hover:from-indigo-400 hover:to-fuchsia-400 focus:outline focus:outline-2 focus:outline-indigo-400";

// Vuelve a la pantalla anterior (la UNIDAD si entraste desde ahi, o la lista de
// bonos si venias de /bonus). Si no hay historial (recarga directa en el mazo),
// cae a la lista de bonos. Asi el boton "Volver" respeta de donde venias.
function goBack() {
  const before = location.hash;
  history.back();
  setTimeout(() => { if (location.hash === before) go("/bonus"); }, 80);
}

function learnedCount(deck, cardMap) {
  return deck.items.filter((it) => (cardMap[it.id]?.reps || 0) >= MASTER_REPS).length;
}

// ---------------------------------------------------------------------------
// Lista de mazos + vitrina de medallas
// ---------------------------------------------------------------------------
export async function renderBonus(container, user) {
  const langDecks = bonusDecksForLanguage(currentLangCode());
  const allIds = langDecks.flatMap((d) => d.items.map((i) => i.id));
  const cardMap = await getCardsByIds(user.id, allIds);

  const decks = bonusMedals(langDecks, cardMap);

  const medalsEarned = decks.filter((d) => d.mastered).length;

  mount(container, el("div", { class: "max-w-4xl mx-auto space-y-6" },
    el("div", {},
      el("h1", { class: "text-2xl font-bold" }, "Bonus: conocimiento y medallas"),
      el("p", { class: "text-slate-400 text-sm mt-1" },
        `Domina mazos de memoria y gana medallas. Medallas ganadas: ${medalsEarned}/${decks.length}.`)),
    el("section", {},
      el("h2", { class: "text-lg font-bold mb-3" }, "Medallas"),
      el("div", { class: "grid grid-cols-2 sm:grid-cols-3 gap-3" }, ...decks.map(medalCard))),
    el("section", {},
      el("h2", { class: "text-lg font-bold mb-3" }, "Mazos de estudio"),
      ...levelGroups(decks))));
  focusMainHeading(container);
}

// Agrupa las tarjetas de mazo por nivel CEFR, con un encabezado por grupo.
function levelGroups(decks) {
  const byLevel = new Map();
  decks.forEach((d) => {
    const lv = d.deck.level || "Otros";
    if (!byLevel.has(lv)) byLevel.set(lv, []);
    byLevel.get(lv).push(d);
  });
  const order = [...CEFR_ORDER, "Otros"];
  return order.filter((lv) => byLevel.has(lv)).map((lv) =>
    el("div", { class: "mb-5" },
      el("h3", { class: "text-sm font-bold text-indigo-300 uppercase tracking-wide mb-2" }, "Nivel " + lv),
      el("div", { class: "grid sm:grid-cols-2 gap-3" }, ...byLevel.get(lv).map(deckCard))));
}

function medalCard(d) {
  const earned = d.mastered;
  return el("div", {
    class: "p-4 rounded-xl border text-center " +
      (earned ? "bg-amber-500/10 border-amber-500/40" : "bg-slate-800/40 border-slate-700 opacity-70"),
  },
    el("div", { class: "mx-auto w-12 h-12 rounded-full flex items-center justify-center " +
      (earned ? "bg-amber-500/20 text-amber-300" : "bg-slate-700 text-slate-500"), html: ICONS.star }),
    el("p", { class: "mt-2 text-sm font-semibold " + (earned ? "text-amber-300" : "text-slate-400") }, d.deck.medalTitle),
    el("p", { class: "text-xs text-slate-500 mt-1" }, earned ? d.deck.medalDesc : `${d.done}/${d.total} para ganarla`));
}

function deckCard(d) {
  return el("a", {
    href: `#/bonus/${d.deck.id}`,
    class: `block relative overflow-hidden rounded-xl bg-gradient-to-r ${d.deck.gradient} shadow-lg ` +
      "hover:brightness-110 focus:outline focus:outline-2 focus:outline-white/60",
  },
    el("div", { class: "p-4" },
      el("div", { class: "flex items-center justify-between" },
        el("div", {},
          el("p", { class: "font-bold text-white text-lg" }, d.deck.title),
          el("p", { class: "text-white/80 text-sm" }, d.deck.subtitle)),
        d.mastered ? el("span", { class: "text-xs bg-white/20 text-white px-2 py-1 rounded-full" }, "Dominado") : null),
      el("div", { class: "mt-3 w-full bg-black/25 rounded-full h-2" },
        el("div", { class: "bg-white h-2 rounded-full", style: `width:${d.pct}%` })),
      el("p", { class: "mt-1 text-xs text-white/80" }, `${d.done}/${d.total} dominadas`)));
}

// ---------------------------------------------------------------------------
// Ampliacion con IA de un VERBO (ejemplos en contexto + nota gramatical) y
// produccion libre ("como la usarias tu") -- MISMO tratamiento que ya tiene
// la Clase de Vocabulario (features/vocab-class.js): titulo grande, contenido
// YA desplegado sin pedir click, y una frase propia con feedback real.
// ---------------------------------------------------------------------------

/** Prompt de "profundizar" para un verbo: ejemplos en varios tiempos + nota. */
function verbDeepenPrompt(item, langName) {
  const front = item.front;
  const past = item.past;
  const participle = item.participle;
  const formsNote = past
    ? `(pasado: "${past}"${participle ? `, participio: "${participle}"` : ""})`
    : "(verbo regular)";
  const secondLine = past
    ? `2. <frase en PASADO usando "${past}">\n   = <traduccion>\n`
    : "2. <otra frase en presente, OTRO contexto>\n   = <traduccion>\n";
  const thirdLine = participle
    ? `3. <frase en PRESENT PERFECT usando "have/has ${participle}">\n   = <traduccion>\n\n`
    : "3. <otra frase mas, OTRO contexto>\n   = <traduccion>\n\n";
  return (
    `Actua como profesor de ${langName} para un hispanohablante. El verbo es "${front}" ${formsNote}. ` +
    "Responde EXACTAMENTE en este formato, sin texto extra antes ni despues, sin markdown ni asteriscos:\n\n" +
    "EJEMPLOS:\n" +
    `1. <frase natural en PRESENTE usando "${front}", contexto cotidiano>\n   = <traduccion al espanol>\n` +
    secondLine + thirdLine +
    "NOTA GRAMATICAL:\n" +
    "<1-2 frases en espanol con algo UTIL y ESPECIFICO de este verbo: si es transitivo o " +
    "intransitivo, una preposicion comun que lo acompana (phrasal verb), un error tipico de " +
    "hispanohablantes con el, o un verbo parecido con el que se confunde. Nada generico.>\n"
  );
}

/** Prompt para corregir el intento de frase PROPIA del alumno con el verbo. */
function verbUseItPrompt(item, langName, attempt) {
  return (
    `Eres profesor de ${langName} para un hispanohablante. El alumno debe usar el verbo "${item.front}" ` +
    `en una frase propia. El alumno escribio:\n"${attempt}"\n\n` +
    "Evalua en ESPANOL, MAXIMO 3 lineas, sin markdown ni asteriscos:\n" +
    "- Si la uso bien (verbo Y tiempo verbal correctos): felicitalo brevemente.\n" +
    "- Si hay un error (forma del verbo, tiempo verbal, preposicion...): da la version corregida " +
    "completa y UNA frase breve explicando el porque, con carino, sin reganar.\n"
  );
}

/** Escenario gratis (sin IA) para que el alumno produzca su propia frase. */
function verbScenarioFor(item) {
  return item.past
    ? `Tu turno: escribe una frase usando "${item.front}" en pasado ("${item.past}").`
    : `Tu turno: escribe tu propia frase usando "${item.front}".`;
}

/**
 * Dispara la ampliacion del verbo (ejemplos en contexto + nota gramatical)
 * SOLA, sin esperar click -- mismo patron que vocab-class.js: el contenido
 * ya debe estar desplegado, no escondido detras de un boton. Devuelve DOS
 * cajas que se llenan JUNTAS cuando responde la UNICA llamada a la IA.
 */
function buildVerbDeepenBoxes(item, langLabel, level) {
  if (!bymaxAiEnabled) return { examplesBox: null, grammarBox: null };

  const examplesBox = el("div", { class: "rounded-2xl bg-indigo-500/10 border border-indigo-400/30 p-5 text-left" },
    el("p", { class: "text-sm font-bold uppercase tracking-wide text-indigo-300 mb-2" }, "Ejemplos en contexto"),
    el("p", { class: "text-base text-slate-400 italic" }, "Generando ejemplos..."));

  const grammarBox = el("div", { class: "rounded-2xl bg-amber-500/10 border border-amber-400/30 p-5 text-left" },
    el("p", { class: "text-sm font-bold uppercase tracking-wide text-amber-300 mb-2 flex items-center gap-1.5" },
      el("span", { class: "w-4 h-4", html: ICONS.bulb }), "Nota gramatical"),
    el("p", { class: "text-base text-slate-400 italic" }, "Generando..."));

  (async () => {
    const { answer, error } = await askBymax({
      mode: "chat", topic: "verbos", level: level || "B1", role: "course",
      question: verbDeepenPrompt(item, langLabel),
    });
    if (error || !answer) {
      replaceKids(examplesBox,
        el("p", { class: "text-sm font-bold uppercase tracking-wide text-indigo-300 mb-2" }, "Ejemplos en contexto"),
        el("p", { class: "text-base text-slate-400" }, error || "No pude generar el contenido ahora."));
      grammarBox.remove(); // una sola caja de error basta, no duplicarlo
      return;
    }
    const parsed = parseDeepenAnswer(answer);
    replaceKids(examplesBox,
      el("p", { class: "text-sm font-bold uppercase tracking-wide text-indigo-300 mb-2" }, "Ejemplos en contexto"),
      el("p", { class: "text-lg text-slate-100 whitespace-pre-wrap leading-relaxed text-left" },
        stripMd(parsed.examples) || "Sin ejemplos esta vez."));
    replaceKids(grammarBox,
      el("p", { class: "text-sm font-bold uppercase tracking-wide text-amber-300 mb-2 flex items-center gap-1.5" },
        el("span", { class: "w-4 h-4", html: ICONS.bulb }), "Nota gramatical"),
      el("p", { class: "text-lg text-slate-100 leading-relaxed text-left" },
        stripMd(parsed.grammar) || "Sin nota esta vez."));
  })();

  return { examplesBox, grammarBox };
}

/**
 * Bloque "Tu turno": el alumno PRODUCE su PROPIA frase con el verbo y el
 * profe IA la corrige -- mismo bloque que vocab-class.js, con el prompt
 * adaptado a verbos (el feedback revisa el TIEMPO verbal, no solo la palabra).
 */
function buildVerbUseItBlock(item, langLabel, level) {
  if (!bymaxAiEnabled) return null;
  const input = el("textarea", {
    rows: "2", maxlength: "200",
    placeholder: "Escribe tu frase aqu\u00ed...",
    class: "w-full rounded-xl bg-slate-950/40 border border-fuchsia-400/30 px-4 py-3 text-slate-100 text-lg " +
      "focus:outline focus:outline-2 focus:outline-fuchsia-400 resize-none",
  });
  const status = el("p", { class: "mt-2 text-sm text-slate-400 min-h-[1.25rem]" }, "");
  const out = el("div", { class: "mt-2" });

  const checkBtn = el("button", {
    type: "button",
    class: "mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-fuchsia-400/40 " +
      "bg-fuchsia-500/20 text-fuchsia-200 font-bold text-lg hover:bg-fuchsia-500/30 " +
      "focus:outline focus:outline-2 focus:outline-fuchsia-400 disabled:opacity-50",
    onclick: async () => {
      const attempt = input.value.trim();
      if (!attempt) { status.textContent = "Escribe algo primero."; return; }
      checkBtn.disabled = true;
      status.textContent = "Revisando tu frase...";
      out.replaceChildren();
      const { answer, error } = await askBymax({
        mode: "chat", topic: "verbos", level: level || "B1", role: "course",
        question: verbUseItPrompt(item, langLabel, attempt),
      });
      checkBtn.disabled = false;
      if (error || !answer) { status.textContent = error || "No pude revisarla ahora."; return; }
      status.textContent = "";
      out.replaceChildren(el("div", {
        class: "rounded-2xl bg-emerald-500/15 border border-emerald-400/30 p-4 text-lg text-slate-100 " +
          "whitespace-pre-wrap leading-relaxed text-left",
      }, stripMd(answer)));
    },
  }, el("span", { class: "w-5 h-5", html: ICONS.check }), "Revisar mi frase");

  return el("div", { class: "rounded-2xl bg-fuchsia-500/10 border border-fuchsia-400/30 p-5 text-left" },
    el("p", { class: "text-lg font-bold text-fuchsia-200 flex items-center gap-2" },
      el("span", { class: "w-5 h-5", html: ICONS.chat }), "\u00bfC\u00f3mo la usar\u00edas t\u00fa?"),
    el("p", { class: "mt-1 text-base text-slate-300" }, verbScenarioFor(item)),
    el("div", { class: "mt-3" }, input),
    checkBtn, status, out);
}

// ---------------------------------------------------------------------------
// Estudio de un mazo (flashcards)
// ---------------------------------------------------------------------------
export async function renderBonusDeck(container, params, user) {
  const deck = bonusDeckById(params.id);
  if (!deck) { mount(container, el("div", { class: PANEL }, el("p", {}, "Mazo no encontrado."))); return; }

  mount(container, el("div", { class: PANEL + " max-w-xl mx-auto text-center" },
    el("p", { class: "text-slate-400" }, "Cargando mazo...")));

  // Asegura que existan las tarjetas SRS de este mazo, luego lee su estado.
  await ensureCards(user.id, deck.items);
  const cardMap = await getCardsByIds(user.id, deck.items.map((i) => i.id));

  let index = 0;
  let recorded = false;
  showCard();

  function showCard() {
    if (index >= deck.items.length) { showDone(); return; }
    const item = deck.items[index];
    // Idioma de la VOZ del mazo (front + ejemplos). pt->voz pt, it->voz it, etc.
    const spLang = micCode(deck.language || "en");
    const langLabel = languageName(deck.language || "en").toLowerCase();
    const card = cardMap[item.id] || { ease: 2.5, interval: 0, reps: 0, due: null };
    const last = deck.items.length - 1;

    // Contenedores que se actualizan en vivo al aprender el verbo.
    const statusHolder = el("div", {}, statusChip(card.reps || 0));
    const dotsHolder = el("div", {}, itemDots(deck, cardMap, index));
    const doneMsg = el("div", { class: "mt-3", role: "status" });

    // Marca el verbo como aprendido (al completar practicas, o al revelar si no hay).
    const completeVerb = async () => {
      if ((cardMap[item.id]?.reps || 0) >= MASTER_REPS) return; // ya aprendido
      const updated = { ease: 2.5, interval: 1, reps: MASTER_REPS, due: null };
      cardMap[item.id] = { ...card, ...updated };
      await saveCard(user.id, item.id, updated);
      if (!recorded) { recorded = true; await recordActivity(user.id); }
      mount(statusHolder, statusChip(MASTER_REPS));
      mount(dotsHolder, itemDots(deck, cardMap, index));
      mount(doneMsg, el("p", { class: "text-emerald-300 font-semibold" }, "Verbo aprendido! Puedes avanzar al siguiente."));
      announce("Verbo aprendido.");
    };

    // VERBOS (deck.practice): mismo tratamiento "libro" que la Clase de
    // Vocabulario -- titulo grande arriba, contenido en PESTAÑAS ya
    // desplegado por seccion (sin boton que tape nada), y produccion libre
    // con la IA. Feedback directo del alumno: esconder el verbo detras de
    // "Comprobar respuesta" sirve para EXAMINAR algo ya visto, no para
    // APRENDERLO la primera vez. El "comprobar" de verdad vive en el reto de
    // abajo (buildVerbChallenge, en features/verb-challenge.js), que si
    // exige recordar -- un reto a la vez, con su propio feedback.
    //
    // OTROS mazos (idioms, sinonimos, expresiones...): sin cambios -- juego
    // de adivinanza universal (features/flashcard-game.js).
    let wordDisplay;
    let body;
    if (deck.practice) {
      wordDisplay = el("div", { class: "relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 " +
        "to-rose-600 px-6 sm:px-10 py-5 sm:py-6 shadow-lg shadow-orange-950/40 flex flex-wrap " +
        "items-center justify-center sm:justify-between gap-4 text-center sm:text-left" },
        el("div", { class: "absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/15 blur-2xl", "aria-hidden": "true" }),
        el("div", { class: "absolute -bottom-12 -left-8 w-32 h-32 rounded-full bg-white/10 blur-2xl", "aria-hidden": "true" }),
        el("p", { class: "relative text-4xl sm:text-5xl font-black text-white tracking-tight drop-shadow" }, item.front),
        el("div", { class: "relative" }, speakButton(item.front, { cls: "w-12 h-12 bg-white/20 text-white hover:bg-white/30", lang: spLang })));

      const { examplesBox, grammarBox } = buildVerbDeepenBoxes(item, langLabel, deck.level);
      const useItBlock = buildVerbUseItBlock(item, langLabel, deck.level);

      // BOOK_COLS: layout de "libro abierto" -- pagina izquierda / pagina
      // derecha. En celular (sin lados que aprovechar) se apila 1 columna
      // igual que antes; desde tablet/PC se reparte en 2 para usar TODO el
      // ancho en vez de dejarlo vacio a los costados.
      const bookCols = (left, right) => (left || right)
        ? el("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-5 items-start text-left" }, left, right)
        : null;

      // CONTENIDO por PESTAÑAS (ui/content-tabs.js): cada pestaña es una
      // "pagina" del libro repartida en 2 columnas cuando hay espacio. La
      // PRACTICA (el reto) ahora TAMBIEN es una pestaña mas -- antes vivia
      // pegada debajo de TODO, sumando scroll extra aunque las pestañas de
      // arriba ya fueran compactas.
      body = buildContentTabs([
        {
          label: "L\u00ednea de tiempo",
          content: bookCols(
            buildVerbTimeline(item, { lang: spLang }),
            examplesBlock(item.examples, spLang)),
        },
        { label: "Ejemplos IA", content: examplesBox },
        { label: "Gram\u00e1tica", content: bookCols(grammarBox, useItBlock) },
        {
          label: "Pr\u00e1ctica",
          content: el("div", {},
            buildVerbChallenge(item, completeVerb),
            doneMsg),
        },
      ]);
    } else {
      wordDisplay = el("div", { class: "flex items-center justify-center gap-3" },
        el("h1", { class: "text-6xl font-extrabold text-slate-100" }, item.front),
        speakButton(item.front, { cls: "w-11 h-11", lang: spLang }));
      body = el("div", { class: "mt-2" },
        buildGuessGame(item, deck, completeVerb),
        examplesBlock(item.examples, spLang));
    }

    // Navegacion entre verbos: solo Devolverse y Siguiente.
    const navCls = "font-semibold px-6 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 " +
      "hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed focus:outline focus:outline-2 focus:outline-indigo-400";
    const nav = el("div", { class: "mt-6 flex items-center justify-between gap-3" },
      el("button", { class: navCls, disabled: index === 0 ? "" : null, onclick: () => { index--; showCard(); } }, "Devolverse"),
      el("button", { class: navCls, onclick: () => { index++; showCard(); } }, index === last ? "Terminar" : "Siguiente"));

    const cardEl = el("div", { class: PANEL + " text-center" },
      el("button", { type: "button", class: "block text-sm text-indigo-400 hover:text-indigo-300 text-left focus:outline focus:outline-2 focus:outline-indigo-400 rounded", onclick: goBack }, "< Volver"),
      el("p", { class: "text-sm text-slate-400 mt-2" }, `${deck.title} - ${index + 1} de ${deck.items.length}`),
      dotsHolder,
      el("div", { class: "mt-3" }, wordDisplay),
      statusHolder,
      el("p", { class: "mt-2 text-xs text-slate-500" },
        deck.practice ? "Repasa el verbo y completa el reto para aprenderlo." : "Adivina el significado -- toca una opcion."),
      body,
      deck.practice ? null : doneMsg,
      nav);

    // Ancho: ahora que cada pestaña usa 2 columnas tipo libro abierto en
    // pantallas anchas, max-w-4xl aprovecha ese espacio sin estirar las
    // columnas de texto demasiado (siguen leyendose comodas).
    mount(container, el("div", { class: (deck.practice ? "max-w-4xl" : "max-w-2xl") + " mx-auto" }, cardEl));
    focusMainHeading(container);
    announce(`Tarjeta ${index + 1} de ${deck.items.length}`);
    if (getAutoplay()) speak(item.front);
  }

  // Bloque de ejemplos de uso (idioma meta con audio + traduccion).
  function examplesBlock(examples, lang = "en-US") {
    if (!examples || !examples.length) return null;
    return el("div", { class: "rounded-2xl bg-sky-500/10 border border-sky-400/30 p-5 text-left" },
      el("p", { class: "text-sm font-bold uppercase tracking-wide text-sky-300 mb-2" }, "Ejemplos de uso"),
      el("div", { class: "space-y-2" },
        ...examples.map((ex) => el("div", { class: "rounded-lg bg-slate-900/50 border border-slate-700/60 p-3" },
          el("div", { class: "flex items-center gap-2" },
            speakButton(ex.en, { lang }),
            el("p", { class: "text-lg text-slate-100" }, ex.en)),
          el("p", { class: "mt-1 text-sm text-slate-400 pl-9" }, ex.es)))));
  }

  // Chip de estado del item segun sus repasos (Nuevo / En progreso / Dominado).
  function statusChip(reps) {
    if (reps >= MASTER_REPS) {
      return el("span", { class: "inline-flex items-center gap-1 mt-2 text-sm px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300" },
        el("span", { class: "w-4 h-4", html: ICONS.check }), "Aprendido");
    }
    return el("span", { class: "inline-block mt-2 text-sm px-3 py-1 rounded-full bg-slate-700 text-slate-300" }, "Nuevo");
  }

  // Fila de puntitos: un punto por item, coloreado por dominio, resalta el actual.
  function itemDots(deck, cardMap, currentIndex) {
    return el("div", { class: "flex flex-wrap justify-center gap-1.5 mt-3" },
      ...deck.items.map((it, i) => {
        const reps = cardMap[it.id]?.reps || 0;
        const cls = reps >= MASTER_REPS ? "bg-emerald-400" : reps > 0 ? "bg-amber-400" : "bg-slate-600";
        const ring = i === currentIndex ? " ring-2 ring-white ring-offset-1 ring-offset-slate-900" : "";
        return el("span", { class: `w-2.5 h-2.5 rounded-full ${cls}${ring}`, title: it.front });
      }));
  }

  function showDone() {
    const done = learnedCount(deck, cardMap);
    const total = deck.items.length;
    const mastered = done === total;
    mount(container, el("div", { class: PANEL + " max-w-xl mx-auto text-center" },
      mastered
        ? el("div", {},
            el("div", { class: "mx-auto w-16 h-16 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center", html: ICONS.star }),
            el("h1", { class: "text-2xl font-bold mt-3 text-amber-300" }, "Medalla ganada!"),
            el("p", { class: "mt-1 text-slate-300" }, deck.medalTitle))
        : el("div", {},
            el("h1", { class: "text-2xl font-bold" }, "Buen trabajo!"),
            el("p", { class: "mt-2 text-slate-400" }, `Llevas ${done}/${total} dominadas. Repite el mazo para ganar la medalla.`)),
      el("div", { class: "mt-6 flex gap-3 justify-center flex-wrap" },
        el("button", { class: BTN, onclick: () => { index = 0; recorded = true; showCard(); } }, "Repasar de nuevo"),
        el("button", { type: "button", class: "bg-slate-800 border border-slate-700 text-slate-100 font-semibold px-6 py-2.5 rounded-lg hover:bg-slate-700 focus:outline focus:outline-2 focus:outline-indigo-400", onclick: goBack }, "Volver"))));
    announce(mastered ? "Medalla ganada!" : "Mazo terminado.");
  }
}
