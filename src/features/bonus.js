/**
 * features/bonus.js — Mazos "Bonus" de conocimiento + medallas de logro.
 *
 * /bonus        -> lista de mazos con su medalla y progreso.
 * /bonus/:id    -> estudio del mazo como flashcards (reutiliza SRS).
 *
 * Una medalla se GANA al dominar el mazo: todos sus items con reps >= MASTER_REPS.
 */
import { BONUS_DECKS, bonusDeckById } from "../data/bonus-decks.js";
import { ensureCards, saveCard, getCardsByIds } from "../services/srs.js";
import { recordActivity } from "../services/profiles.js";
import { buildPractice } from "../core/verb-practice.js";
import { generateExamples, GEN_LEVELS } from "../core/example-gen.js";
import { generateTips } from "../core/verb-tips.js";
import { normalize } from "../core/activities.js";
import { MASTER_REPS, bonusMedals } from "../core/gamification.js";
import { CEFR_ORDER } from "../data/cefr.js";
import { speakButton, speak } from "../ui/speech.js";
import { getAutoplay, getGenLevel, setGenLevel } from "../ui/prefs.js";
import { ICONS } from "../ui/icons.js";
import { el, mount } from "../ui/dom.js";
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

// Clases de color por nivel de dificultad de las practicas.
const LEVEL_CLS = {
  Facil: "bg-emerald-500/20 text-emerald-300",
  Intermedio: "bg-amber-500/20 text-amber-300",
  Dificil: "bg-red-500/20 text-red-300",
};

function learnedCount(deck, cardMap) {
  return deck.items.filter((it) => (cardMap[it.id]?.reps || 0) >= MASTER_REPS).length;
}

// ---------------------------------------------------------------------------
// Lista de mazos + vitrina de medallas
// ---------------------------------------------------------------------------
export async function renderBonus(container, user) {
  const allIds = BONUS_DECKS.flatMap((d) => d.items.map((i) => i.id));
  const cardMap = await getCardsByIds(user.id, allIds);

  const decks = bonusMedals(BONUS_DECKS, cardMap);

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

    const back = el("div", { class: "mt-4 hidden" },
      el("p", { class: "text-2xl font-semibold text-indigo-300" }, item.back),
      formsRow(item),
      examplesBlock(item.examples),
      deck.practice ? generatorBlock(item) : null,
      deck.practice ? practiceBlock(item, completeVerb) : null);

    const showBtn = el("button", { class: "mt-6 " + BTN,
      onclick: () => {
        back.classList.remove("hidden");
        showBtn.classList.add("hidden");
        if (!deck.practice) completeVerb(); // sin practicas: aprende al revelar
      } },
      "Comprobar respuesta");

    // Navegacion entre verbos: solo Devolverse y Siguiente.
    const navCls = "font-semibold px-6 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 " +
      "hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed focus:outline focus:outline-2 focus:outline-indigo-400";
    const nav = el("div", { class: "mt-6 flex items-center justify-between gap-3" },
      el("button", { class: navCls, disabled: index === 0, onclick: () => { index--; showCard(); } }, "Devolverse"),
      el("button", { class: navCls, onclick: () => { index++; showCard(); } }, index === last ? "Terminar" : "Siguiente"));

    const cardEl = el("div", { class: PANEL + " text-center" },
      el("button", { type: "button", class: "block text-sm text-indigo-400 hover:text-indigo-300 text-left focus:outline focus:outline-2 focus:outline-indigo-400 rounded", onclick: goBack }, "< Volver"),
      el("p", { class: "text-sm text-slate-400 mt-2" }, `${deck.title} - ${index + 1} de ${deck.items.length}`),
      dotsHolder,
      deck.recall ? el("p", { class: "mt-3 text-xs uppercase tracking-wide text-indigo-300" }, deck.recall) : null,
      el("div", { class: "mt-2 flex items-center justify-center gap-3" },
        el("h1", { class: "text-6xl font-extrabold text-slate-100" }, item.front),
        speakButton(item.front, { cls: "w-11 h-11" })),
      statusHolder,
      el("p", { class: "mt-2 text-xs text-slate-500" },
        deck.practice ? "Completa las practicas para aprender el verbo." : "Piensa la respuesta y luego comprueba."),
      back, showBtn, doneMsg, nav);

    // Panel lateral con "pops" de ayuda (regla, usos, tips). Solo verbos.
    const aside = deck.practice ? tipsAside(item) : null;

    mount(container, el("div", { class: "grid lg:grid-cols-3 gap-6 items-start" },
      el("div", { class: "lg:col-span-2" }, cardEl),
      aside ? el("aside", { class: "lg:col-span-1" }, aside) : null));
    focusMainHeading(container);
    announce(`Tarjeta ${index + 1} de ${deck.items.length}`);
    if (getAutoplay()) speak(item.front);
  }

  // Panel lateral de "pops": iconos estilo iPhone que despliegan la regla al tocar.
function tipsAside(item) {
  const tips = generateTips(item);
  return el("div", { class: "space-y-2 text-left" },
    el("p", { class: "text-xs uppercase tracking-wide text-slate-500 mb-1" }, "Toca para aprender"),
    ...tips.map(tipAccordion));
}

// Un "pop" plegable: icono llamativo + titulo; al tocar despliega el contenido.
function tipAccordion(t) {
  const body = el("div", { class: "hidden mt-3 text-sm text-slate-200 leading-relaxed" }, t.body);
  const chev = el("span", { class: "w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0", html: ICONS.chevron });
  let open = false;

  const header = el("button", {
    type: "button",
    "aria-expanded": "false",
    class: "w-full flex items-center gap-3 text-left focus:outline focus:outline-2 focus:outline-indigo-400 rounded-xl",
    onclick: () => {
      open = !open;
      body.classList.toggle("hidden", !open);
      header.setAttribute("aria-expanded", open ? "true" : "false");
      chev.style.transform = open ? "rotate(180deg)" : "";
    },
  },
    iosIcon(t.icon, t.grad),
    el("span", { class: "flex-1 font-semibold text-slate-100" }, t.title),
    chev);

  return el("div", { class: "rounded-2xl bg-slate-800/40 border border-slate-700/60 p-3 hover:bg-slate-800/70 transition-colors" },
    header, body);
}

// Tile estilo icono de iPhone: cuadrado redondeado, degradado vibrante y brillo.
function iosIcon(icon, grad) {
  return el("span", {
    class: "relative inline-flex items-center justify-center w-12 h-12 rounded-2xl " +
      "bg-gradient-to-br " + (grad || "from-slate-500 to-slate-700") + " text-white shadow-lg shrink-0 overflow-hidden",
  },
    el("span", { class: "absolute inset-x-0 top-0 h-1/2 bg-white/25" }),
    el("span", { class: "relative w-6 h-6", html: ICONS[icon] || ICONS.info }));
}

// Generador de mas ejemplos adaptados al nivel (offline, plantillas).
function generatorBlock(item) {
  const out = el("div", { class: "mt-2 space-y-2" });

  const select = el("select", {
    "aria-label": "Nivel de los ejemplos",
    class: "rounded-md bg-slate-900 border border-slate-700 text-slate-100 px-2 py-1.5 text-sm " +
      "focus:outline focus:outline-2 focus:outline-indigo-500",
    onchange: () => setGenLevel(select.value), // recuerda la preferencia
  }, ...GEN_LEVELS.map((l) => el("option", { value: l.id }, l.label)));
  select.value = getGenLevel();

  const genBtn = el("button", {
    type: "button",
    class: "px-4 py-1.5 rounded-md bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-500 " +
      "focus:outline focus:outline-2 focus:outline-indigo-400",
    onclick: () => {
      const level = select.value;
      const items = generateExamples(item, level, 2);
      items.forEach((ex) => out.append(generatedRow(ex)));
    },
  }, "Generar mas ejemplos");

  return el("div", { class: "mt-4 text-left rounded-lg border border-slate-700/60 p-3" },
    el("p", { class: "text-xs uppercase tracking-wide text-slate-500 text-center" }, "Mas ejemplos a tu nivel"),
    el("div", { class: "mt-2 flex items-center justify-center gap-2 flex-wrap" },
      el("span", { class: "text-sm text-slate-400" }, "Nivel:"), select, genBtn),
    out);
}

// Fila de un ejemplo generado: audio + frase + boton para convertirlo en practica.
function generatedRow(ex) {
  const row = el("div", { class: "rounded-lg bg-slate-800/60 border border-slate-700 p-3" });
  const view = el("div", { class: "flex items-center gap-2" },
    speakButton(ex.en),
    el("p", { class: "flex-1 text-slate-100" }, ex.en),
    el("button", {
      type: "button",
      class: "text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 " +
        "focus:outline focus:outline-2 focus:outline-indigo-400 shrink-0",
      onclick: () => mount(row, clozeFromExample(ex)),
    }, "Practicar"));
  mount(row, view);
  return row;
}

// Convierte un ejemplo generado en un ejercicio de completar (cloze).
function clozeFromExample(ex) {
  const re = new RegExp("\\b" + ex.answer.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i");
  const prompt = ex.en.replace(re, "_____");
  const fb = el("div", { class: "mt-2 text-sm", role: "status" });
  const input = el("input", {
    type: "text", autocomplete: "off", autocapitalize: "none",
    class: "flex-1 rounded-md bg-slate-900 border border-slate-700 text-slate-100 px-3 py-2 " +
      "focus:outline focus:outline-2 focus:outline-indigo-500",
    placeholder: "Escribe el verbo",
  });
  const check = () => {
    if (normalize(input.value) === normalize(ex.answer))
      mount(fb, el("p", { class: "text-emerald-300" }, `Correcto! "${ex.answer}". ${ex.en}`));
    else mount(fb, el("p", { class: "text-amber-300" }, "Aun no, intenta otra vez."));
  };
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); check(); } });
  return el("div", {},
    el("p", { class: "text-slate-100" }, prompt),
    el("div", { class: "mt-2 flex gap-2" }, input,
      el("button", { type: "button", class: "px-4 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-500", onclick: check }, "Comprobar")),
    fb);
}

// Fila con las tres formas del verbo, cada una con su audio.
function formsRow(item) {
  if (!item.past && !item.participle) return null;
  const chip = (label, value) => el("div", { class: "px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-center" },
    el("p", { class: "text-[10px] uppercase tracking-wide text-slate-500" }, label),
    el("div", { class: "flex items-center justify-center gap-1" },
      el("p", { class: "text-sm font-semibold text-slate-100" }, value),
      speakButton(value, { cls: "w-6 h-6" })));
  return el("div", { class: "mt-3 flex flex-wrap justify-center gap-2" },
    chip("Base", item.front),
    chip("Pasado", item.past),
    chip("Participio", item.participle));
}

// Bloque de ejemplos de uso (ingles con audio + traduccion).
function examplesBlock(examples) {
  if (!examples || !examples.length) return null;
  return el("div", { class: "mt-4 text-left space-y-2" },
    el("p", { class: "text-xs uppercase tracking-wide text-slate-500 text-center" }, "Ejemplos de uso"),
    ...examples.map((ex) => el("div", { class: "rounded-lg bg-slate-800/60 border border-slate-700 p-3" },
      el("div", { class: "flex items-center gap-2" },
        speakButton(ex.en),
        el("p", { class: "text-slate-100" }, ex.en)),
      el("p", { class: "mt-1 text-sm text-slate-400 pl-9" }, ex.es))));
}

// Bloque de practica interactiva (3 ejercicios auto-corregibles por dificultad).
// Al resolver TODOS correctamente, llama onComplete() para aprender el verbo.
function practiceBlock(item, onComplete) {
  const exercises = buildPractice(item);
  if (!exercises.length) { if (onComplete) onComplete(); return null; }
  let solved = 0;
  const onSolved = () => {
    solved++;
    if (solved >= exercises.length && onComplete) onComplete();
  };
  return el("div", { class: "mt-5 text-left" },
    el("p", { class: "text-xs uppercase tracking-wide text-slate-500 text-center" }, "Practica el uso (completa las 3 para aprender)"),
    el("div", { class: "mt-2 space-y-3" }, ...exercises.map((ex) => exerciseCard(ex, onSolved))));
}

function exerciseCard(ex, onSolved) {
  let done = false;
  const fb = el("div", { class: "mt-2 text-sm", role: "status" });
  const ok = (ex2) => {
    mount(fb, el("div", { class: "rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-2" },
      el("p", { class: "text-emerald-300 font-semibold" }, "Correcto! " + (ex2.explain || "")),
      ex2.why ? el("p", { class: "mt-1 text-slate-300 text-xs" }, "Por que: " + ex2.why) : null));
    if (!done) { done = true; if (onSolved) onSolved(); } // cuenta una sola vez
  };
  const retry = () => mount(fb, el("p", { class: "text-amber-300" }, "Aun no, intenta otra vez."));

  let body;
  if (ex.kind === "choice") {
    body = el("div", { class: "mt-3 grid gap-2" },
      ...ex.choices.map((c, i) => {
        const b = el("button", {
          type: "button",
          class: "w-full text-left px-3 py-2 rounded-lg border border-slate-700 text-slate-200 " +
            "hover:bg-slate-700/60 focus:outline focus:outline-2 focus:outline-indigo-500",
          onclick: () => {
            if (i === ex.answer) { b.classList.add("bg-emerald-500/20", "border-emerald-500/50"); ok(ex); }
            else { b.classList.add("bg-red-500/15", "border-red-500/40"); retry(); }
          },
        }, c);
        return b;
      }));
  } else {
    const input = el("input", {
      type: "text", autocomplete: "off", autocapitalize: "none",
      class: "flex-1 rounded-md bg-slate-900 border border-slate-700 text-slate-100 px-3 py-2 " +
        "focus:outline focus:outline-2 focus:outline-indigo-500",
      placeholder: "Escribe el verbo",
    });
    const check = () => {
      if (normalize(input.value) === normalize(ex.answer)) ok(ex);
      else retry();
    };
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); check(); } });
    body = el("div", { class: "mt-3 flex gap-2" }, input,
      el("button", { type: "button", class: "px-4 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-500", onclick: check }, "Comprobar"));
  }

  return el("div", { class: "rounded-lg bg-slate-800/60 border border-slate-700 p-3" },
    el("div", { class: "flex items-center gap-2" },
      el("span", { class: "text-[10px] uppercase px-2 py-0.5 rounded-full " + (LEVEL_CLS[ex.level] || "bg-slate-700 text-slate-300") }, ex.level),
      el("p", { class: "text-slate-100 text-sm" }, ex.prompt)),
    ex.es ? el("p", { class: "text-xs text-slate-500 mt-1" }, ex.es) : null,
    body, fb);
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
