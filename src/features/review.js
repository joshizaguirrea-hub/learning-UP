/**
 * features/review.js — Sesion de repaso espaciado (SRS).
 *
 * Capa de feature: toma las tarjetas vencidas, muestra el termino, revela la
 * traduccion y, segun como califiques tu recuerdo, reprograma la tarjeta usando
 * core/srs y la persiste con services/srs.
 */
import { getDueCards, saveCard } from "../services/srs.js";
import { vocabById } from "../data/units/index.js";
import { review } from "../core/srs.js";
import { el, mount } from "../ui/dom.js";
import { announce, focusMainHeading } from "../ui/a11y.js";
import { go } from "../ui/router.js";

const CARD = "max-w-xl mx-auto bg-white rounded-xl p-8 shadow-sm border border-slate-200 text-center";
const GRADES = [
  { key: "again", label: "Otra vez", cls: "bg-red-100 text-red-800 hover:bg-red-200" },
  { key: "hard", label: "Dificil", cls: "bg-amber-100 text-amber-800 hover:bg-amber-200" },
  { key: "good", label: "Bien", cls: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200" },
  { key: "easy", label: "Facil", cls: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" },
];

export async function renderReview(container, user) {
  mount(container, el("div", { class: CARD }, el("p", { class: "text-slate-500" }, "Cargando repaso...")));

  const cards = await getDueCards(user.id);
  if (cards.length === 0) {
    mount(container, el("div", { class: CARD },
      el("h1", { class: "text-2xl font-bold" }, "Nada que repasar por hoy"),
      el("p", { class: "mt-2 text-slate-600" }, "Vuelve manana para mantener tu racha."),
      el("button", { class: "mt-6 bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-indigo-800",
        onclick: () => go("/student") }, "Volver al inicio")));
    return;
  }

  let index = 0;
  let reviewed = 0;
  showCard();

  function showCard() {
    if (index >= cards.length) { showDone(); return; }
    const card = cards[index];
    const vocab = vocabById(card.vocab_id) || { term: card.vocab_id, translation: "", example: "" };

    const back = el("div", { class: "mt-4 hidden" },
      el("p", { class: "text-2xl font-semibold text-indigo-700" }, vocab.translation),
      vocab.example ? el("p", { class: "mt-2 text-slate-500 italic" }, `"${vocab.example}"`) : null);

    const grades = el("div", { class: "mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 hidden" },
      ...GRADES.map((g) => el("button", {
        class: `${g.cls} font-semibold px-3 py-2 rounded-lg focus:outline focus:outline-2 focus:outline-indigo-600`,
        onclick: async () => {
          const updated = review({ ease: Number(card.ease), interval: card.interval, reps: card.reps, due: card.due }, g.key);
          await saveCard(user.id, card.vocab_id, updated);
          reviewed++;
          index++;
          showCard();
        },
      }, g.label)));

    const showBtn = el("button", {
      class: "mt-6 bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-indigo-800 focus:outline focus:outline-2 focus:outline-indigo-900",
      onclick: () => { back.classList.remove("hidden"); grades.classList.remove("hidden"); showBtn.classList.add("hidden"); },
    }, "Mostrar respuesta");

    mount(container, el("div", { class: CARD },
      el("p", { class: "text-sm text-slate-400" }, `Tarjeta ${index + 1} de ${cards.length}`),
      el("h1", { class: "text-4xl font-extrabold mt-4" }, vocab.term),
      back, showBtn, grades));
    focusMainHeading(container);
    announce(`Tarjeta ${index + 1} de ${cards.length}`);
  }

  function showDone() {
    mount(container, el("div", { class: CARD },
      el("h1", { class: "text-2xl font-bold" }, "Repaso completado!"),
      el("p", { class: "mt-2 text-slate-600" }, `Repasaste ${reviewed} tarjetas. Buen trabajo.`),
      el("button", { class: "mt-6 bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-indigo-800",
        onclick: () => go("/student") }, "Volver al inicio")));
    announce("Repaso completado.");
  }
}
