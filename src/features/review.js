/**
 * features/review.js — Sesion de repaso espaciado (SRS).
 *
 * Capa de feature: toma las tarjetas vencidas, muestra el termino, revela la
 * traduccion y, segun como califiques tu recuerdo, reprograma la tarjeta usando
 * core/srs y la persiste con services/srs.
 */
import { getDueCards, saveCard } from "../services/srs.js";
import { recordActivity } from "../services/profiles.js";
import { vocabById } from "../data/units/index.js";
import { review } from "../core/srs.js";
import { el, mount } from "../ui/dom.js";
import { speakButton } from "../ui/speech.js";
import { announce, focusMainHeading } from "../ui/a11y.js";
import { go } from "../ui/router.js";

const CARD = "max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center";
const BTN = "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-6 py-2.5 rounded-lg " +
  "hover:from-indigo-400 hover:to-fuchsia-400 focus:outline focus:outline-2 focus:outline-indigo-400";
const GRADES = [
  { key: "again", label: "Otra vez", cls: "bg-red-500/20 text-red-300 hover:bg-red-500/30" },
  { key: "hard", label: "Dificil", cls: "bg-amber-500/20 text-amber-300 hover:bg-amber-500/30" },
  { key: "good", label: "Bien", cls: "bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30" },
  { key: "easy", label: "Facil", cls: "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30" },
];

export async function renderReview(container, user) {
  mount(container, el("div", { class: CARD }, el("p", { class: "text-slate-400" }, "Cargando repaso...")));

  const cards = await getDueCards(user.id);
  if (cards.length === 0) {
    mount(container, el("div", { class: CARD },
      el("h1", { class: "text-2xl font-bold" }, "Nada que repasar por hoy"),
      el("p", { class: "mt-2 text-slate-400" }, "Vuelve manana para mantener tu racha."),
      el("button", { class: "mt-6 " + BTN, onclick: () => go("/student") }, "Volver al inicio")));
    return;
  }

  let index = 0;
  let reviewed = 0;
  let recorded = false;
  showCard();

  function showCard() {
    if (index >= cards.length) { showDone(); return; }
    const card = cards[index];
    const vocab = vocabById(card.vocab_id) || { term: card.vocab_id, translation: "", example: "" };

    const back = el("div", { class: "mt-4 hidden" },
      el("p", { class: "text-2xl font-semibold text-indigo-300" }, vocab.translation),
      vocab.example ? el("p", { class: "mt-2 text-slate-400 italic flex items-center justify-center gap-2" },
        el("span", {}, `"${vocab.example}"`), speakButton(vocab.example)) : null);

    const grades = el("div", { class: "mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 hidden" },
      ...GRADES.map((g) => el("button", {
        class: `${g.cls} font-semibold px-3 py-2 rounded-lg focus:outline focus:outline-2 focus:outline-indigo-400`,
        onclick: async () => {
          const updated = review({ ease: Number(card.ease), interval: card.interval, reps: card.reps, due: card.due }, g.key);
          await saveCard(user.id, card.vocab_id, updated);
          if (!recorded) { recorded = true; await recordActivity(user.id); }
          reviewed++;
          index++;
          showCard();
        },
      }, g.label)));

    const showBtn = el("button", {
      class: "mt-6 " + BTN,
      onclick: () => { back.classList.remove("hidden"); grades.classList.remove("hidden"); showBtn.classList.add("hidden"); },
    }, "Mostrar respuesta");

    mount(container, el("div", { class: CARD },
      el("p", { class: "text-sm text-slate-400" }, `Tarjeta ${index + 1} de ${cards.length}`),
      el("div", { class: "mt-4 flex items-center justify-center gap-3" },
        el("h1", { class: "text-4xl font-extrabold text-slate-100" }, vocab.term),
        speakButton(vocab.term, { cls: "w-9 h-9" })),
      back, showBtn, grades));
    focusMainHeading(container);
    announce(`Tarjeta ${index + 1} de ${cards.length}`);
  }

  function showDone() {
    mount(container, el("div", { class: CARD },
      el("h1", { class: "text-2xl font-bold" }, "Repaso completado!"),
      el("p", { class: "mt-2 text-slate-400" }, `Repasaste ${reviewed} tarjetas. Buen trabajo.`),
      el("button", { class: "mt-6 " + BTN, onclick: () => go("/student") }, "Volver al inicio")));
    announce("Repaso completado.");
  }
}
