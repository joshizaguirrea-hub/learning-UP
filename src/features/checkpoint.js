/**
 * features/checkpoint.js — "Repaso acumulativo": intercala varias unidades.
 *
 * El POP "Repaso" del hub abre esto (aparece desde la 2a unidad de un nivel).
 * Mezcla vocabulario y gramatica de la unidad ACTUAL + las ANTERIORES del mismo
 * nivel, INTERCALADAS (interleaving, Rohrer & Bjork = el repaso mas potente).
 * Al terminar, el vocabulario acertado/fallado ALIMENTA el SRS. Logica pura en
 * core/checkpoint.js.
 */
import { el } from "../ui/dom.js";
import { speakMono } from "../ui/speech.js";
import { cancelCloud } from "../ui/cloud-tts.js";
import { normalize, grade } from "../core/activities.js";
import { ICONS } from "../ui/icons.js";
import { celebrate } from "../ui/celebrate.js";
import { playCorrect, playWrong } from "../ui/sound.js";
import { bymaxMascot } from "../ui/bymax-mascot.js";
import { robotName } from "../ui/robot.js";
import { ttsCode } from "../data/languages.js";
import { unitsUpTo } from "../data/units/index.js";
import { buildCheckpoint, scorePct, unitsCovered } from "../core/checkpoint.js";
import { ensureCards, getCardsByIds, saveCard } from "../services/srs.js";
import { review, newCard } from "../core/srs.js";

const OK_CLS = "border-emerald-400 bg-emerald-500/25 text-emerald-100";
const BAD_CLS = "border-rose-400 bg-rose-500/25 text-rose-100";
const shuffle = (a) => a.map((x) => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map((z) => z[1]);

/** ¿Tiene sentido ofrecer repaso? (hay al menos 2 unidades del nivel hasta esta). */
export function hasCheckpoint(unit) {
  return unitsUpTo(unit.id, unit.language || "en").length >= 2;
}

/**
 * Abre el Repaso acumulativo de una unidad.
 * @param {object} unit - { id, title, level, language }
 * @param {object} [opts] - { userId, onComplete }
 */
export function openCheckpoint(unit, opts = {}) {
  const { userId, onComplete } = opts;
  const lang = unit.language || "en";
  const tts = ttsCode(lang);
  const units = unitsUpTo(unit.id, lang);
  const deck = buildCheckpoint(units).map(adapt);
  const name = robotName();
  let idx = 0, correct = 0;
  const byVocab = {}; // refId -> { right, total } para el SRS

  const stopAudio = () => { cancelCloud(); if ("speechSynthesis" in window) window.speechSynthesis.cancel(); };
  const close = () => { stopAudio(); overlay.remove(); };
  const say = (w) => w && speakMono(w, tts, { rate: 0.9 });

  const stage = el("div", { class: "mt-4 flex-1 min-h-0 overflow-y-auto pr-1" });
  const progress = el("div", { class: "w-full bg-black/25 rounded-full h-2 mt-3" },
    el("div", { class: "bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full transition-all", style: "width:0%" }));

  // Convierte un item del core en una pregunta uniforme para la UI:
  //  { tag, prompt, say, options:[{text,correct}]?, accepts:[]?, answer, explain, refId }
  function adapt(item) {
    if (item.kind === "choose") {
      return {
        tag: item.unitTitle, prompt: item.q, say: item.say, refId: item.refId,
        options: shuffle(item.options.map((o) => ({ text: o.text, correct: o.correct }))),
      };
    }
    // gramatica: cloze o multiple_choice (usa core/activities para calificar)
    const a = item.activity;
    if (a.type === "multiple_choice") {
      return {
        tag: item.unitTitle, prompt: a.prompt, explain: a.explain,
        options: shuffle(a.payload.choices.map((c, i) => ({ text: c, correct: i === a.payload.answer }))),
      };
    }
    return { // cloze
      tag: item.unitTitle, prompt: a.prompt, explain: a.explain,
      accepts: true, activity: a, answer: a.payload.answer,
    };
  }

  function tally(ok, refId) {
    if (ok) correct++;
    if (!refId) return;
    const t = byVocab[refId] || (byVocab[refId] = { right: 0, total: 0 });
    t.total++; if (ok) t.right++;
  }

  function feedbackBox(ok, answer, explain) {
    return el("div", {
      class: "mt-3 rounded-xl px-4 py-3 text-sm " + (ok
        ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-200"
        : "bg-amber-500/15 border border-amber-500/40 text-amber-200"),
    },
      el("p", { class: "font-semibold" }, ok ? "\u2714 \u00a1Correcto!" : "\u2717 Casi..."),
      answer ? el("p", { class: "mt-1" }, "Respuesta: ", el("span", { class: "font-bold text-slate-100" }, answer)) : null,
      explain ? el("p", { class: "mt-1 text-slate-300" }, explain) : null);
  }

  function nextBtn() {
    return el("button", {
      type: "button",
      class: "mt-4 w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-5 py-3 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-indigo-400",
      onclick: () => { idx++; render(); },
    }, idx === deck.length - 1 ? "Ver resultado" : "Siguiente \u2192");
  }

  function header(q) {
    return el("div", {},
      el("p", { class: "text-xs uppercase tracking-wide text-amber-400" },
        "Repaso \u00b7 paso " + (idx + 1) + " de " + deck.length + (q.tag ? " \u00b7 " + q.tag : "")),
      el("p", { class: "font-semibold text-slate-100 text-lg mt-1" }, q.prompt));
  }

  function renderChoice(q) {
    let selected = null, done = false;
    const fb = el("div");
    const btns = q.options.map((opt) => {
      const b = el("button", {
        type: "button",
        class: "block w-full text-left px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-slate-200 mt-2 hover:bg-white/10 transition focus:outline focus:outline-2 focus:outline-amber-400",
        onclick: () => {
          if (done) return;
          selected = opt;
          btns.forEach((x) => x.classList.remove("border-amber-400", "bg-amber-500/25"));
          b.classList.add("border-amber-400", "bg-amber-500/25");
        },
      }, opt.text);
      b._opt = opt;
      return b;
    });
    const checkBtn = el("button", {
      type: "button",
      class: "mt-4 w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold px-5 py-3 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-emerald-300",
      onclick: () => {
        if (done || !selected) return;
        done = true;
        const ok = !!selected.correct;
        tally(ok, q.refId);
        ok ? playCorrect() : playWrong();
        btns.forEach((b) => {
          if (b._opt.correct) b.className += " " + OK_CLS;
          else if (b._opt === selected) b.className += " " + BAD_CLS;
          b.disabled = true;
        });
        if (q.say) say(q.say);
        fb.replaceChildren(feedbackBox(ok, null, q.explain));
        checkBtn.replaceWith(nextBtn());
      },
    }, "Comprobar");
    stage.replaceChildren(header(q), el("div", { class: "mt-2" }, ...btns), fb, checkBtn);
  }

  function renderType(q) {
    let done = false;
    const fb = el("div");
    const input = el("input", {
      type: "text", autocomplete: "off", autocapitalize: "off", spellcheck: "false",
      class: "mt-3 w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-slate-100 focus:outline focus:outline-2 focus:outline-amber-500",
      placeholder: "Escribe la respuesta...",
    });
    const check = () => {
      if (done || !input.value.trim()) return;
      done = true;
      const ok = grade(q.activity, input.value);
      tally(ok, q.refId);
      ok ? playCorrect() : playWrong();
      input.disabled = true;
      input.className += ok ? " !border-emerald-400" : " !border-rose-400";
      fb.replaceChildren(feedbackBox(ok, q.answer, q.explain));
      checkBtn.replaceWith(nextBtn());
    };
    const checkBtn = el("button", {
      type: "button",
      class: "mt-4 w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold px-5 py-3 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-emerald-300",
      onclick: check,
    }, "Comprobar");
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); check(); } });
    stage.replaceChildren(header(q), input, fb, checkBtn);
    setTimeout(() => input.focus(), 100);
  }

  function render() {
    if (idx >= deck.length) return renderDone();
    progress.firstChild.style.width = Math.round((idx / deck.length) * 100) + "%";
    const q = deck[idx];
    if (q.options) return renderChoice(q);
    return renderType(q);
  }

  async function renderDone() {
    progress.firstChild.style.width = "100%";
    const pct = scorePct(correct, deck.length);
    const covered = unitsCovered(units.map((u) => ({ unitId: u.id })));
    stage.replaceChildren(el("div", { class: "text-center py-6" },
      el("div", { class: "w-24 mx-auto" }, bymaxMascot("lg")),
      el("h3", { class: "text-xl font-bold text-slate-100 mt-2" }, pct >= 60 ? "\u00a1Repaso superado!" : "Buen intento"),
      el("p", { class: "mt-2 text-slate-300" }, "Acertaste " + correct + " de " + deck.length + " (" + pct + "%)."),
      el("p", { class: "mt-1 text-xs text-slate-500" }, "Mezclaste " + covered + " unidades. El vocabulario entr\u00f3 a tu repaso (SRS)."),
      el("button", {
        class: "mt-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-6 py-3 rounded-xl hover:brightness-110",
        onclick: () => { idx = 0; correct = 0; for (const k in byVocab) delete byVocab[k]; render(); },
      }, "Repasar otra vez")));
    if (pct >= 60) celebrate({ title: "\u00a1Memoria fresca!", subtitle: pct + "% \u00b7 repaso intercalado", grand: pct >= 80 });
    if (typeof onComplete === "function") onComplete(pct);

    if (userId) {
      try {
        const ids = Object.keys(byVocab);
        if (ids.length) {
          const vocabItems = units.flatMap((u) => u.vocab || []).filter((v) => ids.includes(v.id));
          await ensureCards(userId, vocabItems);
          const existing = await getCardsByIds(userId, ids);
          await Promise.all(ids.map((vid) => {
            const t = byVocab[vid];
            const cur = existing[vid];
            const card = cur
              ? { ease: Number(cur.ease), interval: cur.interval, reps: cur.reps, due: cur.due }
              : newCard();
            const gradeStr = (t.right / t.total) >= 0.6 ? "good" : "again";
            return saveCard(userId, vid, review(card, gradeStr));
          }));
        }
      } catch (e) { console.error("[checkpoint] SRS sync fallo:", e); }
    }
  }

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col max-h-[92dvh] min-h-0",
    role: "dialog", "aria-label": "Repaso acumulativo con " + name, "aria-modal": "true",
  },
    el("div", { class: "flex items-center gap-3" },
      el("div", { class: "w-12 shrink-0" }, bymaxMascot("sm")),
      el("div", { class: "flex-1" },
        el("p", { class: "font-bold text-amber-300" }, "Repaso \u00b7 " + (unit.title || "")),
        el("p", { class: "text-xs text-slate-400" }, "Mezcla varias unidades \u00b7 nivel " + (unit.level || ""))),
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),
    progress, stage);

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);

  document.body.append(overlay);

  if (!deck.length) {
    stage.replaceChildren(el("p", { class: "text-slate-400 py-6 text-center" }, "Aun no hay suficiente contenido para un repaso."));
  } else {
    render();
  }
}
