/**
 * features/pronunciation-lab.js — "Pronuncia Lab": el oido antes que la boca.
 *
 * Infraestructura AGNOSTICA al idioma: recibe la unidad, saca el paquete de
 * sonidos de su idioma (data/*-pronunciation.js) y corre un drill:
 *   - GUIA: tip en espanol + palabras para OIR con voz nativa (nube).
 *   - DISCRIMINAR: oyes UNA palabra de un par minimo y eliges cual fue.
 *
 * Base cientifica: la percepcion precede a la produccion (Flege). Primero afinas
 * el oido; asi despues puedes producir el sonido. Logica pura en core/pronunciation.js.
 */
import { el } from "../ui/dom.js";
import { speakMono } from "../ui/speech.js";
import { cancelCloud } from "../ui/cloud-tts.js";
import { ICONS } from "../ui/icons.js";
import { celebrate } from "../ui/celebrate.js";
import { playCorrect, playWrong } from "../ui/sound.js";
import { bymaxMascot } from "../ui/bymax-mascot.js";
import { robotName } from "../ui/robot.js";
import { ttsCode } from "../data/languages.js";
import { pronunciationPackFor } from "../data/pt-pronunciation.js";
import { buildPronunciationDrill, scorePct, scorableSteps } from "../core/pronunciation.js";

const OK_CLS = "border-emerald-400 bg-emerald-500/25 text-emerald-100";
const BAD_CLS = "border-rose-400 bg-rose-500/25 text-rose-100";
const shuffle = (a) => a.map((x) => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map((z) => z[1]);

/** ¿Hay contenido de pronunciacion para este idioma? (para mostrar u ocultar el POP). */
export function hasPronunciation(lang) {
  const pack = pronunciationPackFor(lang);
  return !!(pack && (pack.sounds || []).length);
}

/**
 * Abre el Pronuncia Lab de una unidad.
 * @param {object} unit - { title, level, language }
 * @param {object} [opts] - { onComplete }
 */
export function openPronunciationLab(unit, opts = {}) {
  const { onComplete } = opts;
  const lang = unit.language || "pt";
  const tts = ttsCode(lang);
  const pack = pronunciationPackFor(lang);
  const drill = buildPronunciationDrill(pack);
  const totalScorable = scorableSteps(drill);
  const name = robotName();
  let idx = 0;
  let correct = 0;

  const stopAudio = () => { cancelCloud(); if ("speechSynthesis" in window) window.speechSynthesis.cancel(); };
  const close = () => { stopAudio(); overlay.remove(); };
  const say = (w) => speakMono(w, tts, { rate: 0.9 });

  const stage = el("div", { class: "mt-4 flex-1 min-h-0 overflow-y-auto pr-1" });
  const progress = el("div", { class: "w-full bg-black/25 rounded-full h-2 mt-3" },
    el("div", { class: "bg-gradient-to-r from-cyan-400 to-sky-500 h-2 rounded-full transition-all", style: "width:0%" }));

  function nextBtn(last) {
    return el("button", {
      type: "button",
      class: "mt-4 w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-5 py-3 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-indigo-400",
      onclick: () => { idx++; render(); },
    }, last ? "Ver resultado" : "Siguiente \u2192");
  }

  function soundChip(word, sub) {
    return el("button", {
      type: "button",
      class: "inline-flex flex-col items-start gap-0.5 px-4 py-2.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-100 hover:bg-cyan-500/20 focus:outline focus:outline-2 focus:outline-cyan-300",
      onclick: () => say(word),
    },
      el("span", { class: "flex items-center gap-2 font-semibold" },
        el("span", { class: "w-4 h-4", html: ICONS.sound }), word),
      sub ? el("span", { class: "text-xs text-cyan-200/70" }, sub) : null);
  }

  // --- GUIA: presenta un sonido con tip + ejemplos para oir ---
  function renderGuide(step) {
    progress.firstChild.style.width = Math.round((idx / drill.length) * 100) + "%";
    stage.replaceChildren(
      el("p", { class: "text-xs uppercase tracking-wide text-cyan-400" }, "Sonido"),
      el("h3", { class: "font-bold text-slate-100 text-lg mt-1" }, step.label),
      el("p", { class: "mt-2 text-sm text-slate-300 leading-relaxed" }, step.tip),
      el("p", { class: "mt-4 text-xs uppercase tracking-wide text-slate-500" }, "Toca para oir (voz nativa)"),
      el("div", { class: "mt-2 flex flex-wrap gap-2" },
        ...step.examples.map((e) => soundChip(e.word, e.es))),
      nextBtn(idx === drill.length - 1));
    if (step.examples[0]) setTimeout(() => say(step.examples[0].word), 350);
  }

  // --- DISCRIMINAR: oyes una palabra y eliges cual fue (par minimo) ---
  function renderDiscriminate(step) {
    progress.firstChild.style.width = Math.round((idx / drill.length) * 100) + "%";
    // Re-aleatoriza cual palabra SUENA (oido de verdad) y el orden de opciones.
    const opts = shuffle(step.options.map((o) => ({ word: o.word, es: o.es })));
    const played = opts[Math.floor(Math.random() * opts.length)];
    let selected = null, done = false;
    const fb = el("div");

    const btns = opts.map((opt) => {
      const b = el("button", {
        type: "button",
        class: "block w-full text-left px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-slate-200 mt-2 hover:bg-white/10 transition focus:outline focus:outline-2 focus:outline-cyan-400",
        onclick: () => {
          if (done) return;
          selected = opt;
          btns.forEach((x) => x.classList.remove("border-cyan-400", "bg-cyan-500/25"));
          b.classList.add("border-cyan-400", "bg-cyan-500/25");
        },
      }, el("span", { class: "font-semibold" }, opt.word),
         opt.es ? el("span", { class: "block text-xs text-slate-400" }, opt.es) : null);
      b._opt = opt;
      return b;
    });

    const listenBtn = el("button", {
      type: "button",
      class: "inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-semibold px-4 py-2.5 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-cyan-300",
      onclick: () => say(played.word),
    }, el("span", { class: "w-5 h-5", html: ICONS.sound }), "Escuchar de nuevo");

    const checkBtn = el("button", {
      type: "button",
      class: "mt-4 w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold px-5 py-3 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-emerald-300",
      onclick: () => {
        if (done || !selected) return;
        done = true;
        const ok = selected.word === played.word;
        if (ok) correct++;
        ok ? playCorrect() : playWrong();
        btns.forEach((b) => {
          if (b._opt.word === played.word) b.className += " " + OK_CLS;
          else if (b._opt === selected) b.className += " " + BAD_CLS;
          b.disabled = true;
        });
        say(played.word);
        fb.replaceChildren(el("div", {
          class: "mt-3 rounded-xl px-4 py-3 text-sm " + (ok
            ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-200"
            : "bg-amber-500/15 border border-amber-500/40 text-amber-200"),
        },
          el("p", { class: "font-semibold" }, ok ? "\u2714 \u00a1Bien oido!" : "\u2717 Casi..."),
          el("p", { class: "mt-1" }, "Era: ", el("span", { class: "font-bold text-slate-100" }, played.word)),
          step.tip ? el("p", { class: "mt-1 text-slate-300" }, step.tip) : null));
        checkBtn.replaceWith(nextBtn(idx === drill.length - 1));
      },
    }, "Comprobar");

    stage.replaceChildren(
      el("p", { class: "text-xs uppercase tracking-wide text-cyan-400" }, "Entrena el oido \u00b7 " + step.label),
      el("p", { class: "font-semibold text-slate-100 text-lg mt-1" }, "\u00bfQu\u00e9 palabra escuchaste?"),
      el("div", { class: "mt-2" }, listenBtn),
      el("div", { class: "mt-2" }, ...btns),
      fb, checkBtn);
    setTimeout(() => say(played.word), 350);
  }

  function render() {
    if (idx >= drill.length) return renderDone();
    const step = drill[idx];
    if (step.kind === "guide") return renderGuide(step);
    return renderDiscriminate(step);
  }

  function renderDone() {
    progress.firstChild.style.width = "100%";
    const pct = scorePct(correct, totalScorable);
    stage.replaceChildren(el("div", { class: "text-center py-6" },
      el("div", { class: "w-24 mx-auto" }, bymaxMascot("lg")),
      el("h3", { class: "text-xl font-bold text-slate-100 mt-2" }, pct >= 60 ? "\u00a1Buen oido!" : "Sigue entrenando"),
      totalScorable
        ? el("p", { class: "mt-2 text-slate-300" }, "Distinguiste " + correct + " de " + totalScorable + " (" + pct + "%).")
        : el("p", { class: "mt-2 text-slate-300" }, "Repasaste los sonidos clave."),
      el("p", { class: "mt-1 text-xs text-slate-500" }, "El oido fino es el primer paso para pronunciar bien."),
      el("button", {
        class: "mt-5 bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-semibold px-6 py-3 rounded-xl hover:brightness-110",
        onclick: () => { idx = 0; correct = 0; render(); },
      }, "Practicar otra vez")));
    if (pct >= 60 && totalScorable) celebrate({ title: "\u00a1Oido afinado!", subtitle: pct + "% en discriminacion", grand: pct >= 80 });
    if (typeof onComplete === "function") onComplete(pct);
  }

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col max-h-[92dvh] min-h-0",
    role: "dialog", "aria-label": "Pronuncia Lab con " + name, "aria-modal": "true",
  },
    el("div", { class: "flex items-center gap-3" },
      el("div", { class: "w-12 shrink-0" }, bymaxMascot("sm")),
      el("div", { class: "flex-1" },
        el("p", { class: "font-bold text-cyan-300" }, "Pronuncia Lab \u00b7 " + (unit.title || "")),
        el("p", { class: "text-xs text-slate-400" }, "El oido antes que la boca \u00b7 nivel " + (unit.level || ""))),
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),
    progress, stage);

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);

  document.body.append(overlay);

  if (!drill.length) {
    stage.replaceChildren(el("p", { class: "text-slate-400 py-6 text-center" }, "Este idioma aun no tiene guia de pronunciacion."));
  } else {
    render();
  }
}
