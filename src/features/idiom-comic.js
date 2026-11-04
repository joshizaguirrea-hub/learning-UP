/**
 * features/idiom-comic.js — Un modismo como JUEGO de adivinanza + mini-comic.
 *
 * POR QUE
 * -------
 * Version anterior (solo el reveal): la pantalla de ANTES de adivinar seguia
 * siendo la flashcard gris de toda la vida -- "Nuevo", "Piensa la respuesta y
 * luego comprueba", un boton. Aburrido. Feedback directo: "necesito que seamos
 * mas divertidos, aprendizaje con diversion".
 *
 * AHORA es un juego de dos tiempos:
 *  1. La PISTA (nada de spoiler): la traduccion LITERAL, palabra por palabra
 *     -- que de por si ya es el chiste ("hit the sack" = "golpear el costal").
 *  2. EL RETO: 3 opciones de significado real (la correcta + 2 de otros
 *     modismos del mismo mazo, mezcladas) para ADIVINAR, no para leer pasivo.
 * Acertar revela el mini-comic de confirmacion (literal vs real, lado a lado)
 * con sonido y confeti. Mismo contenido de siempre (item.literal/item.back),
 * solo que ahora se JUEGA en vez de solo leerse.
 */
import { el, mount } from "../ui/dom.js";
import { playCorrect, playWrong } from "../ui/sound.js";
import { confettiBurst } from "../ui/confetti.js";

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

/** Mini-comic de CONFIRMACION (se muestra al acertar): literal vs real. */
export function buildIdiomComic(item) {
  if (!item.literal) return null;
  return el("div", { class: "mt-3 grid sm:grid-cols-2 gap-3 text-left" },
    panel({ emoji: "\uD83D\uDE35", label: "Si lo traduces LITERAL...", text: item.literal, tone: "amber" }),
    panel({ emoji: "\u2728", label: "Pero en realidad significa...", text: item.back, tone: "emerald" }));
}

function panel({ emoji, label, text, tone }) {
  const tones = {
    amber: "border-amber-500/30 bg-amber-500/5",
    emerald: "border-emerald-500/30 bg-emerald-500/5",
  };
  return el("div", { class: "rounded-2xl border p-4 text-center " + (tones[tone] || tones.amber) },
    el("p", { class: "text-3xl", "aria-hidden": "true" }, emoji),
    el("p", { class: "mt-1 text-[10px] uppercase tracking-wide text-slate-500" }, label),
    el("p", { class: "mt-1 font-semibold text-slate-100 text-sm leading-snug" }, text));
}

/**
 * Juego completo: pista literal + 3 opciones para adivinar el significado
 * real. Al acertar, revela buildIdiomComic() como confirmacion y llama
 * onComplete (misma funcion que aprende el item en el SRS, ver bonus.js).
 * @param {object} item - { front, back, literal, examples }
 * @param {object} deck - el mazo completo (para sacar distractores de otros items)
 * @param {function} [onComplete]
 * @returns {HTMLElement|null} null si el item no tiene `literal` (no es un
 *   modismo con este formato -- bonus.js cae al reveal clasico en ese caso).
 */
export function buildIdiomGuessGame(item, deck, onComplete) {
  if (!item.literal) return null;

  const pool = (deck.items || []).filter((i) => i.id !== item.id && i.back);
  const distractors = shuffle(pool).slice(0, 2).map((i) => i.back);
  const options = shuffle([item.back, ...distractors].filter(Boolean));

  let done = false;
  const reveal = el("div", { class: "mt-4" });
  const choicesWrap = el("div", { class: "mt-3 grid gap-2.5" });

  function paintChoices() {
    choicesWrap.replaceChildren(...options.map((opt) => {
      const btn = el("button", {
        type: "button",
        class: "w-full text-center px-4 py-3.5 rounded-2xl border-2 border-slate-700 bg-slate-800/70 " +
          "text-slate-100 font-semibold text-sm hover:border-indigo-400 hover:bg-slate-700/70 " +
          "focus:outline focus:outline-2 focus:outline-indigo-400 transition disabled:cursor-default",
        onclick: () => {
          if (done) return;
          void btn.offsetWidth;
          if (opt === item.back) {
            done = true;
            btn.classList.add("answer-pop", "border-emerald-400", "bg-emerald-500/20", "text-emerald-200");
            [...choicesWrap.children].forEach((b) => (b.disabled = true));
            playCorrect();
            confettiBurst({ count: 50, duration: 1400 });
            mount(reveal, el("div", {},
              el("p", { class: "text-center text-emerald-300 font-semibold text-sm" }, "\u00a1Exacto!"),
              buildIdiomComic(item)));
            onComplete?.();
          } else {
            btn.classList.add("answer-shake", "border-red-400", "bg-red-500/10");
            btn.disabled = true;
            playWrong();
          }
        },
      }, opt);
      return btn;
    }));
  }
  paintChoices();

  return el("div", { class: "mt-2" },
    el("div", { class: "rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-center" },
      el("p", { class: "text-2xl", "aria-hidden": "true" }, "\uD83D\uDE35"),
      el("p", { class: "mt-1 text-[10px] uppercase tracking-wide text-amber-400" }, "Pista: si lo traduces LITERAL..."),
      el("p", { class: "mt-1 font-bold text-slate-100" }, item.literal)),
    el("p", { class: "mt-4 text-center text-xs uppercase tracking-wide text-slate-500" }, "\u00bfQu\u00e9 crees que significa de VERDAD?"),
    choicesWrap, reveal);
}
