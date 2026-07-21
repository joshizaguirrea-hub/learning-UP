/**
 * features/review.js — Repaso espaciado (SRS) como PRACTICA ACTIVA.
 *
 * Antes: se mostraba la palabra y TU te autocalificabas (Otra vez/Bien/Facil).
 * Eso no ensena ni valida nada. Ahora es una MINI-PRACTICA: se te reta a elegir
 * la traduccion correcta (a veces es->en, a veces en->es, para que no sea
 * mecanico). Si aciertas, la tarjeta avanza en el SRS (no vuelve pronto); si
 * fallas, se reprograma para hoy. La sesion se ACOTA (REVIEW_SESSION) para que
 * nunca sea "un monton de tarjetas": haces tu tanda, la completas, y listo.
 */
import { getDueCards, saveCard } from "../services/srs.js";
import { recordActivity } from "../services/profiles.js";
import { vocabById, allVocab } from "../data/units/index.js";
import { review } from "../core/srs.js";
import { el, mount } from "../ui/dom.js";
import { speakButton, speak } from "../ui/speech.js";
import { getAutoplay } from "../ui/prefs.js";
import { playCorrect, playWrong } from "../ui/sound.js";
import { confettiBurst } from "../ui/confetti.js";
import { announce, focusMainHeading } from "../ui/a11y.js";
import { go } from "../ui/router.js";

/** Tamano maximo de una tanda de repaso (evita el "monton de tarjetas"). */
export const REVIEW_SESSION = 12;

const CARD = "max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center";
const BTN = "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-6 py-2.5 rounded-lg " +
  "hover:from-indigo-400 hover:to-fuchsia-400 focus:outline focus:outline-2 focus:outline-indigo-400";

/** Baraja una copia del arreglo. */
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

export async function renderReview(container, user) {
  mount(container, el("div", { class: CARD }, el("p", { class: "text-slate-400" }, "Cargando repaso...")));

  const due = await getDueCards(user.id);
  if (due.length === 0) {
    mount(container, el("div", { class: CARD },
      el("h1", { class: "text-2xl font-bold" }, "Nada que repasar por hoy"),
      el("p", { class: "mt-2 text-slate-400" }, "Vuelve manana para mantener tu racha."),
      el("button", { class: "mt-6 " + BTN, onclick: () => go("/student") }, "Volver al inicio")));
    return;
  }

  // Acotamos la tanda: haces un bloque manejable y lo COMPLETAS.
  const cards = due.slice(0, REVIEW_SESSION);
  const pool = allVocab();
  let index = 0;
  let correct = 0;
  let recorded = false;
  showCard();

  function showCard() {
    if (index >= cards.length) { showDone(); return; }
    const card = cards[index];
    const vocab = vocabById(card.vocab_id) || { term: card.vocab_id, translation: "", example: "" };

    // Direccion aleatoria: unas veces es->en, otras en->es (menos mecanico).
    const es2en = Math.random() < 0.5 && vocab.translation;
    const promptText = es2en ? vocab.translation : vocab.term;
    const answerText = es2en ? vocab.term : vocab.translation;
    const promptLang = es2en ? "es-MX" : "en-US";
    const answerLang = es2en ? "en-US" : "es-MX";

    // Distractores: 3 traducciones distintas del pool (del mismo "lado").
    const others = shuffle(pool)
      .map((v) => (es2en ? v.term : v.translation))
      .filter((t) => t && t !== answerText);
    const uniqueOthers = [...new Set(others)].slice(0, 3);
    const options = shuffle([answerText, ...uniqueOthers]);

    const feedback = el("div", { class: "mt-5 min-h-[3rem]" });
    const nextBtn = el("button", {
      class: "mt-4 hidden " + BTN,
      onclick: () => { index++; showCard(); },
    }, index === cards.length - 1 ? "Ver resultado" : "Siguiente");

    const optBtns = options.map((opt) => el("button", {
      type: "button",
      class: "w-full text-left p-4 rounded-xl border border-white/12 bg-white/5 text-slate-100 text-lg " +
        "hover:bg-white/10 transition focus:outline focus:outline-2 focus:outline-indigo-400",
      onclick: () => choose(opt),
    },
      el("span", { class: "flex-1" }, opt)));

    async function choose(opt) {
      const ok = opt === answerText;
      if (ok) correct++;
      ok ? playCorrect() : playWrong();
      optBtns.forEach((b) => {
        b.disabled = true;
        const label = b.textContent;
        if (label === answerText) b.classList.add("border-emerald-400", "bg-emerald-500/20");
        else if (label === opt) b.classList.add("border-red-400", "bg-red-500/20");
        else b.classList.add("opacity-50");
      });
      // Refuerzo: pronuncia la respuesta correcta en su idioma.
      setTimeout(() => speak(answerText, answerLang, { rate: 0.95 }), 200);

      feedback.replaceChildren(el("div", {
        class: "rounded-xl p-3 " + (ok ? "bg-emerald-500/10 border border-emerald-500/30" : "bg-amber-500/10 border border-amber-500/30"),
      },
        el("p", { class: "font-bold " + (ok ? "text-emerald-300" : "text-amber-300") },
          ok ? "\u00a1Correcto!" : "Casi. La respuesta es:"),
        el("p", { class: "mt-1 text-slate-100 flex items-center justify-center gap-2" },
          el("span", {}, answerText), speakButton(answerText, { lang: answerLang })),
        vocab.example ? el("p", { class: "mt-2 text-sm text-slate-400 italic flex items-center justify-center gap-2" },
          el("span", {}, `"${vocab.example}"`), speakButton(vocab.example)) : null));

      // Reprograma en el SRS: acierto -> avanza (good); fallo -> vuelve hoy (again).
      const updated = review(
        { ease: Number(card.ease), interval: card.interval, reps: card.reps, due: card.due },
        ok ? "good" : "again");
      await saveCard(user.id, card.vocab_id, updated);
      if (!recorded) { recorded = true; await recordActivity(user.id); }
      nextBtn.classList.remove("hidden");
      nextBtn.focus();
    }

    mount(container, el("div", { class: CARD },
      el("p", { class: "text-sm text-slate-400" }, `Tarjeta ${index + 1} de ${cards.length}`),
      el("div", { class: "mt-2 w-full bg-slate-800 rounded-full h-1.5" },
        el("div", { class: "bg-gradient-to-r from-indigo-400 to-fuchsia-400 h-1.5 rounded-full transition-all", style: `width:${Math.round((index / cards.length) * 100)}%` })),
      el("p", { class: "mt-5 text-xs uppercase tracking-wide text-slate-500" },
        es2en ? "\u00bfComo se dice en ingles?" : "\u00bfQue significa?"),
      el("div", { class: "mt-2 flex items-center justify-center gap-3" },
        el("h1", { class: "text-3xl sm:text-4xl font-extrabold text-slate-100" }, promptText),
        speakButton(promptText, { cls: "w-9 h-9", lang: promptLang })),
      el("div", { class: "mt-6 space-y-2 text-left" }, ...optBtns),
      feedback, nextBtn));
    focusMainHeading(container);
    announce(`Tarjeta ${index + 1} de ${cards.length}`);
    if (getAutoplay()) speak(promptText, promptLang);
  }

  function showDone() {
    const pct = Math.round((correct / cards.length) * 100);
    if (pct >= 70) confettiBurst({ count: 100 });
    const remaining = Math.max(0, due.length - cards.length);
    mount(container, el("div", { class: CARD },
      el("h1", { class: "text-2xl font-bold" }, "\u00a1Tanda completada!"),
      el("p", { class: "mt-2 text-slate-300" }, `Acertaste ${correct} de ${cards.length} (${pct}%).`),
      remaining > 0
        ? el("p", { class: "mt-1 text-sm text-slate-400" }, `Te quedan ${remaining} para otra tanda cuando quieras. Sin prisa: poco y seguido rinde mas.`)
        : el("p", { class: "mt-1 text-sm text-emerald-300" }, "\u00a1Terminaste todo tu repaso de hoy! Crack."),
      el("div", { class: "mt-6 flex gap-2 justify-center flex-wrap" },
        remaining > 0 ? el("button", { class: BTN, onclick: () => { index = 0; correct = 0; renderReview(container, user); } }, "Otra tanda") : null,
        el("button", { class: remaining > 0 ? "px-6 py-2.5 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700" : BTN, onclick: () => go("/student") }, "Volver al inicio"))));
    announce("Repaso completado.");
  }
}
