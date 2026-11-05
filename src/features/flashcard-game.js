/**
 * features/flashcard-game.js — Cualquier mazo "de pensar" como juego de
 * adivinanza con 3 opciones, en vez de flashcard pasiva (frente -> revelar).
 *
 * POR QUE
 * -------
 * Antes: SOLO los idioms (deck.comic) jugaban como adivinanza; el resto de
 * mazos "de pensar" (Expresiones de tiempo, sinonimos, antonimos...) seguian
 * siendo la flashcard clasica ("Piensa la respuesta y luego comprueba" + un
 * boton). Feedback directo: "quiero presentarlas de manera distinta" -- sobre
 * Idioms Y Expresiones a la vez. Asi que esto ya no es exclusivo de idioms:
 * es el reemplazo UNIVERSAL de la flashcard pasiva para TODO mazo sin
 * practica (deck.practice falsy). Mismos datos de siempre (item.front/back/
 * examples), solo cambia COMO se juega.
 *
 * Mecanica: 3 opciones (la correcta + 2 distractores de OTROS items del mismo
 * mazo, mezcladas) con colores e identificador A/B/C -- un juego de opcion
 * multiple con cara de concurso, no una lista gris de botones iguales. Si el
 * item tiene `literal` (idioms), se muestra ademas la pista comica antes de
 * elegir, y el reveal final es el mini-comic de 2 vinetas (literal vs real).
 */
import { el, mount } from "../ui/dom.js";
import { playCorrect, playWrong } from "../ui/sound.js";
import { confettiBurst } from "../ui/confetti.js";
import { buildIdiomComic } from "./idiom-comic.js";

// Una identidad de color + letra por opcion -- se ve a un concurso de
// preguntas, no a un formulario. Se reasignan en el orden en que se pintan
// (no por indice de respuesta correcta), asi la correcta no siempre es "A".
const OPTION_STYLES = [
  { letter: "A", badge: "bg-sky-500", base: "border-sky-500/40 bg-sky-500/10 hover:bg-sky-500/20 hover:border-sky-400" },
  { letter: "B", badge: "bg-fuchsia-500", base: "border-fuchsia-500/40 bg-fuchsia-500/10 hover:bg-fuchsia-500/20 hover:border-fuchsia-400" },
  { letter: "C", badge: "bg-amber-500", base: "border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 hover:border-amber-400" },
];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

/** Panel de confirmacion simple (mazos SIN `literal`): emoji + la respuesta. */
function simpleReveal(item) {
  return el("div", { class: "rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-center" },
    el("p", { class: "text-3xl", "aria-hidden": "true" }, "\u2728"),
    el("p", { class: "mt-1 text-[10px] uppercase tracking-wide text-slate-500" }, "Significado"),
    el("p", { class: "mt-1 font-bold text-slate-100" }, item.back));
}

/**
 * Juego de adivinanza con 3 opciones para cualquier item {front, back}.
 * @param {object} item
 * @param {object} deck - el mazo completo (para sacar distractores)
 * @param {function} [onComplete] - se llama al acertar (aprende el item en SRS)
 * @returns {HTMLElement}
 */
export function buildGuessGame(item, deck, onComplete) {
  const pool = (deck.items || []).filter((i) => i.id !== item.id && i.back && i.back !== item.back);
  const distractors = shuffle(pool).slice(0, 2).map((i) => i.back);
  const options = shuffle([item.back, ...distractors].filter(Boolean));
  // Mazo chico (menos de 3 items distintos): no hay de donde sacar 2
  // distractores. Mejor avisar honesto que mostrar un juego con una sola
  // opcion (eso si seria raro).
  if (options.length < 2) {
    return el("div", { class: "mt-2" }, simpleReveal(item));
  }

  let done = false;
  const reveal = el("div", { class: "mt-4" });
  const choicesWrap = el("div", { class: "mt-3 grid gap-2.5" });

  function paintChoices() {
    choicesWrap.replaceChildren(...options.map((opt, i) => {
      const style = OPTION_STYLES[i % OPTION_STYLES.length];
      const btn = el("button", {
        type: "button",
        class: "w-full flex items-center gap-3 text-left px-4 py-3.5 rounded-2xl border-2 font-semibold text-sm " +
          "text-slate-100 transition disabled:cursor-default " + style.base,
        onclick: () => {
          if (done) return;
          void btn.offsetWidth;
          if (opt === item.back) {
            done = true;
            btn.classList.add("answer-pop");
            btn.className = btn.className.replace(style.base, "border-emerald-400 bg-emerald-500/20 text-emerald-200");
            [...choicesWrap.children].forEach((b) => (b.disabled = true));
            playCorrect();
            confettiBurst({ count: 50, duration: 1400 });
            const confirmation = item.literal
              ? el("div", {}, el("p", { class: "text-center text-emerald-300 font-semibold text-sm mb-2" }, "\u00a1Exacto!"), buildIdiomComic(item))
              : simpleReveal(item);
            mount(reveal, confirmation);
            onComplete?.();
          } else {
            btn.classList.add("answer-shake");
            btn.className = btn.className.replace(style.base, "border-red-400 bg-red-500/10 text-red-200");
            btn.disabled = true;
            playWrong();
          }
        },
      },
        el("span", { class: `shrink-0 w-7 h-7 rounded-full grid place-items-center text-white text-xs font-black ${style.badge}` }, style.letter),
        el("span", { class: "flex-1" }, opt));
      return btn;
    }));
  }
  paintChoices();

  const hint = item.literal ? el("div", { class: "rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-center" },
    el("p", { class: "text-2xl", "aria-hidden": "true" }, "\uD83D\uDE35"),
    el("p", { class: "mt-1 text-[10px] uppercase tracking-wide text-amber-400" }, "Pista: si lo traduces LITERAL..."),
    el("p", { class: "mt-1 font-bold text-slate-100" }, item.literal)) : null;

  return el("div", { class: "mt-2" },
    hint,
    el("p", { class: "mt-4 text-center text-xs uppercase tracking-wide text-slate-500" }, "\u00bfQu\u00e9 crees que significa?"),
    choicesWrap, reveal);
}
