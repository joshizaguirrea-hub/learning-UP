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
import { review } from "../core/srs.js";
import { buildPractice } from "../core/verb-practice.js";
import { normalize } from "../core/activities.js";
import { speakButton } from "../ui/speech.js";
import { ICONS } from "../ui/icons.js";
import { el, mount } from "../ui/dom.js";
import { announce, focusMainHeading } from "../ui/a11y.js";
import { go } from "../ui/router.js";

const PANEL = "bg-slate-900 border border-slate-800 rounded-2xl p-5";
const BTN = "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-6 py-2.5 rounded-lg " +
  "hover:from-indigo-400 hover:to-fuchsia-400 focus:outline focus:outline-2 focus:outline-indigo-400";
const MASTER_REPS = 2; // repasos correctos para considerar un item "dominado"

function learnedCount(deck, cardMap) {
  return deck.items.filter((it) => (cardMap[it.id]?.reps || 0) >= MASTER_REPS).length;
}

// ---------------------------------------------------------------------------
// Lista de mazos + vitrina de medallas
// ---------------------------------------------------------------------------
export async function renderBonus(container, user) {
  const allIds = BONUS_DECKS.flatMap((d) => d.items.map((i) => i.id));
  const cardMap = await getCardsByIds(user.id, allIds);

  const decks = BONUS_DECKS.map((deck) => {
    const done = learnedCount(deck, cardMap);
    const total = deck.items.length;
    const mastered = done === total;
    return { deck, done, total, mastered, pct: Math.round((done / total) * 100) };
  });

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
      el("div", { class: "grid sm:grid-cols-2 gap-3" }, ...decks.map(deckCard)))));
  focusMainHeading(container);
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

    const back = el("div", { class: "mt-4 hidden" },
      el("p", { class: "text-2xl font-semibold text-indigo-300" }, item.back),
      formsRow(item),
      examplesBlock(item.examples),
      deck.practice ? practiceBlock(item) : null);

    const grades = el("div", { class: "mt-6 grid grid-cols-3 gap-2 hidden" },
      gradeBtn("Otra vez", "again", "bg-red-500/20 text-red-300 hover:bg-red-500/30", item, card),
      gradeBtn("Bien", "good", "bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30", item, card),
      gradeBtn("Facil", "easy", "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30", item, card));

    const showBtn = el("button", { class: "mt-6 " + BTN,
      onclick: () => { back.classList.remove("hidden"); grades.classList.remove("hidden"); showBtn.classList.add("hidden"); } },
      "Comprobar respuesta");

    mount(container, el("div", { class: PANEL + " max-w-2xl mx-auto text-center" },
      el("a", { href: "#/bonus", class: "block text-sm text-indigo-400 hover:text-indigo-300 text-left" }, "< Volver a bonus"),
      el("p", { class: "text-sm text-slate-400 mt-2" }, `${deck.title} - ${index + 1} de ${deck.items.length}`),
      deck.recall ? el("p", { class: "mt-3 text-xs uppercase tracking-wide text-indigo-300" }, deck.recall) : null,
      el("div", { class: "mt-2 flex items-center justify-center gap-3" },
        el("h1", { class: "text-4xl font-extrabold text-slate-100" }, item.front),
        speakButton(item.front, { cls: "w-9 h-9" })),
      el("p", { class: "mt-2 text-xs text-slate-500" }, "Piensa la respuesta y luego comprueba."),
      back, showBtn, grades));
    focusMainHeading(container);
    announce(`Tarjeta ${index + 1} de ${deck.items.length}`);
  }

  // Fila con las tres formas del verbo (solo si el item las define).
function formsRow(item) {
  if (!item.past && !item.participle) return null;
  const chip = (label, value) => el("div", { class: "px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700" },
    el("p", { class: "text-[10px] uppercase tracking-wide text-slate-500" }, label),
    el("p", { class: "text-sm font-semibold text-slate-100" }, value));
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
const LEVEL_CLS = {
  Facil: "bg-emerald-500/20 text-emerald-300",
  Intermedio: "bg-amber-500/20 text-amber-300",
  Dificil: "bg-red-500/20 text-red-300",
};

function practiceBlock(item) {
  const exercises = buildPractice(item);
  if (!exercises.length) return null;
  return el("div", { class: "mt-5 text-left" },
    el("p", { class: "text-xs uppercase tracking-wide text-slate-500 text-center" }, "Practica el uso"),
    el("div", { class: "mt-2 space-y-3" }, ...exercises.map(exerciseCard)));
}

function exerciseCard(ex) {
  const fb = el("div", { class: "mt-2 text-sm", role: "status" });
  const ok = (msg) => mount(fb, el("p", { class: "text-emerald-300" }, "Correcto! " + (msg || "")));
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
            if (i === ex.answer) { b.classList.add("bg-emerald-500/20", "border-emerald-500/50"); ok(ex.explain); }
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
      if (normalize(input.value) === normalize(ex.answer)) ok(ex.explain);
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

function gradeBtn(label, key, cls, item, card) {    return el("button", {
      class: `${cls} font-semibold px-3 py-2 rounded-lg focus:outline focus:outline-2 focus:outline-indigo-400`,
      onclick: async () => {
        const updated = review({ ease: Number(card.ease), interval: card.interval, reps: card.reps, due: card.due }, key);
        await saveCard(user.id, item.id, updated);
        cardMap[item.id] = { ...card, ...updated };
        if (!recorded) { recorded = true; await recordActivity(user.id); }
        index++;
        showCard();
      },
    }, label);
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
        el("a", { href: "#/bonus", class: "bg-slate-800 border border-slate-700 text-slate-100 font-semibold px-6 py-2.5 rounded-lg hover:bg-slate-700" }, "Volver a bonus"))));
    announce(mastered ? "Medalla ganada!" : "Mazo terminado.");
  }
}
