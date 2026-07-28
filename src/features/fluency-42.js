/**
 * features/fluency-42.js — Tecnica de fluidez 4/3/2 (Nation & Maurice).
 *
 * Cuentas la MISMA historia 3 veces con menos tiempo cada vez (4 -> 3 -> 2 min).
 * El techo de tiempo baja pero el contenido se mantiene: tu cerebro automatiza el
 * habla y tus palabras-por-minuto SUBEN mientras las muletillas BAJAN. Al final,
 * un dashboard prueba tu ganancia de fluidez y alimenta tu Speaking Score.
 *
 * Reusa el microfono (ui/mic.js, modo continuo) y el motor puro core/fluency-42.js.
 */
import { el } from "../ui/dom.js";
import { speechSupported, createDictation } from "../ui/mic.js";
import {
  ROUND_PLAN, countWords, analyzeRound, summarize, fluencyScore,
} from "../core/fluency-42.js";
import { recordSpeakingScore, scoreLabel } from "../core/speaking-score.js";

// Temas de monologo (en ingles: hablas en ingles). El alumno elige uno.
const TOPICS = [
  "A trip you'll never forget", "Your typical day", "A person you admire",
  "Your dream job", "The best meal you've had", "A hobby you love",
  "A movie or show you'd recommend", "How technology changed your life",
  "A goal for this year", "A place everyone should visit",
];

const TONE = scoreLabel; // reusa la etiqueta motivadora del Speaking Score

/**
 * Abre la practica 4/3/2 en un overlay.
 * @param {object} [opts]
 * @param {string} [opts.level] - nivel MCER (informativo)
 * @param {string} [opts.userId] - para guardar el Speaking Score
 */
export function openFluency42(opts = {}) {
  const userId = opts.userId || "anon";
  let topic = "";
  const rounds = []; // rondas ya analizadas
  let dictation = null;
  let timer = null;

  const cleanup = () => { try { dictation?.abort(); } catch { /* nada */ } if (timer) { clearInterval(timer); timer = null; } };
  const close = () => { cleanup(); overlay.remove(); };

  const body = el("div", { class: "mt-4 flex-1 min-h-0 overflow-y-auto pr-1" });
  const heading = el("p", { class: "font-bold text-purple-300" }, "Fluidez 4/3/2");

  const card = el("div", {
    class: "robot-pop max-w-md w-full bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl flex flex-col max-h-[90vh]",
    role: "dialog", "aria-label": "Practica de fluidez 4/3/2", "aria-modal": "true",
  },
    el("div", { class: "flex items-center justify-between" },
      heading,
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),
    body);

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);
  document.body.append(overlay);

  if (!speechSupported()) { renderNoMic(); return; }
  renderIntro();

  // --- Sin micrófono: degradacion elegante -----------------------------------
  function renderNoMic() {
    heading.textContent = "Fluidez 4/3/2";
    body.replaceChildren(el("div", { class: "text-center py-6" },
      el("p", { class: "text-4xl", "aria-hidden": "true" }, "\uD83C\uDFA4"),
      el("p", { class: "mt-3 text-slate-200 font-semibold" }, "Esta practica necesita micr\u00f3fono"),
      el("p", { class: "mt-1 text-sm text-slate-400" }, "Usa Chrome (PC o Android) y permite el micr\u00f3fono para hablar y medir tu fluidez."),
      el("button", { class: "mt-5 px-5 py-3 rounded-xl bg-white/5 border border-white/15 text-slate-200 hover:bg-white/10", onclick: close }, "Cerrar")));
  }

  // --- Paso 1: elegir tema + explicacion -------------------------------------
  function renderIntro() {
    heading.textContent = "Fluidez 4/3/2";
    const chips = TOPICS.map((t) => el("button", {
      type: "button",
      class: "text-left px-3 py-2 rounded-xl bg-slate-800/70 border border-slate-700 text-sm text-slate-200 hover:bg-slate-700/70 focus:outline focus:outline-2 focus:outline-purple-400",
      onclick: () => { topic = t; runRound(0); },
    }, t));

    body.replaceChildren(
      el("div", { class: "rounded-2xl bg-gradient-to-br from-purple-600/20 to-fuchsia-600/10 border border-purple-500/30 p-4" },
        el("p", { class: "text-sm text-slate-200 leading-relaxed" },
          "Cuenta la ", el("b", {}, "misma historia 3 veces"),
          ": primero en ", el("b", {}, "4 min"), ", luego ", el("b", {}, "3 min"), " y por \u00faltimo ", el("b", {}, "2 min"),
          ". Menos tiempo, mismo tema \u2192 hablas m\u00e1s r\u00e1pido y con menos muletillas. \u00a1As\u00ed se automatiza el ingl\u00e9s!")),
      el("p", { class: "mt-4 text-xs uppercase tracking-wide text-purple-400 font-semibold" }, "Elige tu tema"),
      el("div", { class: "mt-2 grid grid-cols-1 gap-2" }, ...chips));
  }

  // --- Paso 2: correr una ronda ----------------------------------------------
  function runRound(i) {
    const plan = ROUND_PLAN[i];
    let remaining = plan.seconds;
    let transcript = "";
    let started = 0;
    let done = false;

    heading.textContent = "Ronda " + (i + 1) + " de 3 \u00b7 " + plan.label;

    const timeEl = el("p", { class: "text-5xl font-black text-purple-300 tabular-nums", "aria-live": "off" }, fmt(remaining));
    const wordsEl = el("span", { class: "font-bold text-slate-100" }, "0");
    const liveEl = el("div", { class: "mt-3 min-h-[4rem] max-h-40 overflow-y-auto text-left text-sm text-slate-300 bg-slate-800/50 rounded-xl p-3 leading-relaxed" },
      el("span", { class: "text-slate-500 italic" }, "Tu transcripci\u00f3n aparecer\u00e1 aqu\u00ed mientras hablas..."));
    const finishBtn = el("button", {
      type: "button",
      class: "mt-5 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-semibold hover:brightness-110 focus:outline focus:outline-2 focus:outline-purple-300",
      onclick: () => finish(),
    }, "Terminar ronda");

    const paint = () => {
      liveEl.replaceChildren(transcript
        ? document.createTextNode(transcript)
        : el("span", { class: "text-slate-500 italic" }, "Escuchando... \u00a1habla!"));
      wordsEl.textContent = String(countWords(transcript));
    };

    body.replaceChildren(
      el("div", { class: "text-center" },
        el("p", { class: "text-xs uppercase tracking-wide text-slate-400" }, "Habla sobre"),
        el("p", { class: "text-lg font-bold text-slate-100 mt-0.5" }, topic),
        el("div", { class: "mt-4 flex items-center justify-center gap-2" },
          el("span", { class: "w-3 h-3 rounded-full bg-red-500 animate-pulse" }),
          timeEl),
        el("p", { class: "mt-1 text-sm text-slate-400" }, "Palabras: ", wordsEl)),
      liveEl,
      finishBtn,
      i === 0 ? el("p", { class: "mt-3 text-xs text-slate-500 text-center" }, "Consejo: no pares aunque dudes. La meta es no callar.") : null);

    // Micrófono en modo continuo (monologo largo).
    dictation = createDictation({
      lang: "en-US", continuous: true,
      onInterim: (t) => { paint2(t); },
      onFinal: (t) => { transcript = t; paint(); },
      onError: (code) => { if (code === "not-allowed") micDenied(); },
    });
    function paint2(interim) {
      liveEl.replaceChildren(document.createTextNode(transcript + " " + interim));
      wordsEl.textContent = String(countWords(transcript + " " + interim));
    }
    function micDenied() {
      cleanup();
      body.replaceChildren(el("div", { class: "text-center py-6" },
        el("p", { class: "text-amber-300 text-sm" }, "\u26a0\ufe0f No pude usar el micr\u00f3fono. Da permiso y vuelve a intentar."),
        el("button", { class: "mt-4 px-5 py-3 rounded-xl bg-white/5 border border-white/15 text-slate-200 hover:bg-white/10", onclick: renderIntro }, "Volver")));
    }

    dictation.start();
    started = Date.now();
    timer = setInterval(() => {
      remaining = plan.seconds - Math.round((Date.now() - started) / 1000);
      if (remaining <= 0) { remaining = 0; timeEl.textContent = fmt(0); finish(); return; }
      timeEl.textContent = fmt(remaining);
    }, 250);

    function finish() {
      if (done) return; // evita doble disparo (timer + boton)
      done = true;
      if (timer) { clearInterval(timer); timer = null; }
      try { dictation?.stop(); } catch { /* nada */ }
      const secs = Math.max(1, Math.min(plan.seconds, Math.round((Date.now() - started) / 1000)));
      rounds.push(analyzeRound({ transcript, seconds: secs }));
      if (i + 1 < ROUND_PLAN.length) renderBetween(i + 1);
      else renderResults();
    }
  }

  // --- Entre rondas: mismo tema, menos tiempo --------------------------------
  function renderBetween(i) {
    const plan = ROUND_PLAN[i];
    const prev = rounds[i - 1];
    heading.textContent = "\u00a1Vamos por la ronda " + (i + 1) + "!";
    body.replaceChildren(el("div", { class: "text-center py-4" },
      el("p", { class: "text-4xl", "aria-hidden": "true" }, "\uD83D\uDD01"),
      el("p", { class: "mt-3 text-slate-200" },
        "Cuenta ", el("b", {}, "la misma historia"), ", pero ahora en ", el("b", { class: "text-purple-300" }, plan.label), "."),
      el("p", { class: "mt-1 text-sm text-slate-400" }, "Ronda anterior: " + prev.wpm + " palabras/min. \u00a1A ver si subes el ritmo!"),
      el("button", {
        class: "mt-5 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-semibold hover:brightness-110 focus:outline focus:outline-2 focus:outline-purple-300",
        onclick: () => runRound(i),
      }, "Empezar ronda " + (i + 1))));
  }

  // --- Paso 3: resultados + Speaking Score -----------------------------------
  function renderResults() {
    const s = summarize(rounds);
    const score = fluencyScore(rounds);
    const saved = recordSpeakingScore(userId, score);
    const info = TONE(score);
    heading.textContent = "Tu fluidez";

    const maxWpm = Math.max(1, s.bestWpm);
    const bars = rounds.map((r, idx) => {
      const pct = Math.round((r.wpm / maxWpm) * 100);
      return el("div", { class: "flex items-center gap-2" },
        el("span", { class: "w-10 text-xs text-slate-400 shrink-0" }, ROUND_PLAN[idx].label),
        el("div", { class: "flex-1 bg-slate-700/60 rounded-full h-4 overflow-hidden",
          role: "progressbar", "aria-valuenow": String(r.wpm), "aria-valuemin": "0", "aria-valuemax": String(maxWpm),
          "aria-label": "Ronda " + (idx + 1) + ": " + r.wpm + " palabras por minuto" },
          el("div", { class: "bg-gradient-to-r from-purple-400 to-fuchsia-500 h-4 rounded-full transition-all", style: "width:" + pct + "%" })),
        el("span", { class: "w-14 text-right text-sm font-bold text-slate-100 shrink-0" }, r.wpm + " wpm"));
    });

    const gainMsg = s.fluencyGain
      ? el("p", { class: "text-emerald-400 font-semibold text-sm" },
        "\u25b2 +" + s.deltaWpm + " palabras/min de la 1\u00aa a la 3\u00aa ronda. \u00a1Eso es fluidez ganada!")
      : el("p", { class: "text-amber-400 font-semibold text-sm" },
        "Esta vez el ritmo no subi\u00f3. Truco: en la ronda corta, no repitas detalles \u2014 ve al grano m\u00e1s r\u00e1pido.");

    body.replaceChildren(
      el("div", { class: "text-center" },
        el("div", { class: "relative w-28 h-28 rounded-full grid place-items-center mx-auto",
          style: "background: conic-gradient(#a855f7 " + (score * 3.6) + "deg, rgba(148,163,184,.2) 0deg)" },
          el("div", { class: "w-20 h-20 rounded-full bg-slate-900 grid place-items-center" },
            el("div", {},
              el("p", { class: "text-3xl font-extrabold text-purple-300 leading-none" }, String(score)),
              el("p", { class: "text-[10px] text-slate-400 uppercase tracking-wide" }, "fluidez")))),
        el("p", { class: "mt-3 text-lg font-bold text-slate-100" }, info.label),
        el("p", { class: "text-xs text-slate-400 mt-1" },
          "Speaking Score \u00b7 mejor: " + saved.best + " \u00b7 promedio: " + saved.avg + " \u00b7 sesiones: " + saved.sessions)),
      el("div", { class: "mt-5" },
        el("p", { class: "text-xs uppercase tracking-wide text-purple-400 font-semibold mb-2" }, "Ritmo por ronda (palabras/min)"),
        el("div", { class: "space-y-2" }, ...bars),
        el("div", { class: "mt-3" }, gainMsg),
        el("p", { class: "mt-1 text-xs text-slate-400" },
          "Muletillas: ronda 1 = " + rounds[0].fillerRate + "/100 palabras \u00b7 ronda " + rounds.length + " = " + rounds[rounds.length - 1].fillerRate + "/100" +
          (s.fillerDrop > 0 ? "  (\u25bc bajaron, \u00a1genial!)" : ""))),
      el("div", { class: "mt-6 flex gap-2" },
        el("button", {
          class: "flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-semibold hover:brightness-110 focus:outline focus:outline-2 focus:outline-purple-300",
          onclick: () => { rounds.length = 0; renderIntro(); },
        }, "Otra historia"),
        el("button", {
          class: "px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 focus:outline focus:outline-2 focus:outline-white",
          onclick: close,
        }, "Cerrar")));
  }

  function fmt(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
  }
}
