/**
 * features/vocab-lab.js — "Vocab Lab" (Vocabulary 2.0): escalera de recuperacion.
 *
 * El POP de Vocabulary del hub abre esto. En vez de solo reconocer traducciones,
 * sube por una ESCALERA graduada (reconocer -> pista -> colocacion -> produccion
 * -> trampa auditiva) que fija las palabras de verdad. Al terminar ALIMENTA EL
 * SRS (services/srs.js) para que cada palabra entre a tu repaso espaciado segun
 * como te fue -> el conocimiento perdura. Logica pura en core/vocab-lab.js.
 */
import { el } from "../ui/dom.js";
import { speak, speakMono } from "../ui/speech.js";
import { cancelCloud } from "../ui/cloud-tts.js";
import { normalize } from "../core/activities.js";
import { ICONS } from "../ui/icons.js";
import { celebrate } from "../ui/celebrate.js";
import { playCorrect, playWrong } from "../ui/sound.js";
import { bymaxMascot } from "../ui/bymax-mascot.js";
import { robotName } from "../ui/robot.js";
import { completeLesson } from "../services/course.js";
import { lessonForSkill } from "./skill-class.js";
import { buildVocabLadder, scorePct } from "../core/vocab-lab.js";
import { ensureCards, getCardsByIds, saveCard } from "../services/srs.js";
import { review, newCard } from "../core/srs.js";
import { makeResumeKey, saveProgress, loadProgress, clearProgress, resumeCard } from "../ui/resume.js";

const LEVEL_LABEL = { 1: "Reconocer", 2: "Con pista", 3: "Colocaci\u00f3n", 4: "Producci\u00f3n", 5: "Trampa auditiva" };
const OK_CLS = "border-emerald-400 bg-emerald-500/25 text-emerald-100";
const BAD_CLS = "border-rose-400 bg-rose-500/25 text-rose-100";
const shuffle = (a) => a.map((x) => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map((z) => z[1]);

/**
 * Abre el Vocab Lab de una unidad.
 * @param {object} unit - { title, level, vocab, lessons }
 * @param {object} [opts] - { userId, progressId, onComplete }
 */
export function openVocabLab(unit, opts = {}) {
  const { userId, onComplete } = opts;
  const lesson = lessonForSkill(unit, "vocabulary");
  const progressId = opts.progressId || lesson?.id;
  const deck = buildVocabLadder(unit).map((ex) => ex.options ? { ...ex, options: shuffle(ex.options) } : ex);
  const name = robotName();
  const rkey = makeResumeKey(userId, unit.id, "vocablab");
  let idx = 0;
  let correct = 0;
  const byVocab = {}; // vocabId -> { right, total } para alimentar el SRS

  const stopAudio = () => { cancelCloud(); if ("speechSynthesis" in window) window.speechSynthesis.cancel(); };
  const close = () => { stopAudio(); overlay.remove(); };

  const stage = el("div", { class: "mt-4 flex-1 min-h-0 overflow-y-auto pr-1" });
  const progress = el("div", { class: "w-full bg-black/25 rounded-full h-2 mt-3" },
    el("div", { class: "bg-gradient-to-r from-pink-400 to-rose-500 h-2 rounded-full transition-all", style: "width:0%" }));

  function tally(ex, ok) {
    if (ok) correct++;
    const t = byVocab[ex.vocabId] || (byVocab[ex.vocabId] = { right: 0, total: 0 });
    t.total++; if (ok) t.right++;
  }

  function feedbackBox(ok, answer, extra) {
    return el("div", {
      class: "mt-3 rounded-xl px-4 py-3 text-sm " + (ok
        ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-200"
        : "bg-amber-500/15 border border-amber-500/40 text-amber-200"),
    },
      el("p", { class: "font-semibold" }, ok ? "\u2714 \u00a1Correcto!" : "\u2717 Casi..."),
      answer ? el("p", { class: "mt-1" }, "Respuesta: ", el("span", { class: "font-bold text-slate-100" }, answer)) : null,
      extra || null);
  }

  function nextBtn() {
    return el("button", {
      type: "button",
      class: "mt-4 w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-5 py-3 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-indigo-400",
      onclick: () => { idx++; render(); },
    }, idx === deck.length - 1 ? "Ver resultado" : "Siguiente \u2192");
  }

  function render() {
    if (idx >= deck.length) return renderDone();
    saveProgress(rkey, { idx, correct, byVocab }); // autosave: sobrevive a un desliz accidental
    progress.firstChild.style.width = Math.round((idx / deck.length) * 100) + "%";
    const ex = deck[idx];
    const header = el("p", { class: "text-xs uppercase tracking-wide text-slate-500" },
      "Paso " + (idx + 1) + " de " + deck.length + " \u00b7 " + (LEVEL_LABEL[ex.level] || ""));

    if (ex.kind === "choose" || ex.kind === "audio") return renderChoice(ex, header);
    return renderType(ex, header);
  }

  // --- CHOOSE / AUDIO: elegir opcion ---
  function renderChoice(ex, header) {
    let selected = null, done = false;
    const fb = el("div");
    const btns = ex.options.map((opt) => {
      const b = el("button", {
        type: "button",
        class: "block w-full text-left px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-slate-200 mt-2 hover:bg-white/10 transition focus:outline focus:outline-2 focus:outline-pink-400",
        onclick: () => {
          if (done) return;
          selected = opt;
          btns.forEach((x) => x.classList.remove("border-pink-400", "bg-pink-500/25"));
          b.classList.add("border-pink-400", "bg-pink-500/25");
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
        tally(ex, ok);
        ok ? playCorrect() : playWrong();
        btns.forEach((b) => {
          if (b._opt.correct) b.className += " " + OK_CLS;
          else if (b._opt === selected) b.className += " " + BAD_CLS;
          b.disabled = true;
        });
        if (ex.say) speakMono(ex.say, tts, { rate: 0.9 });
        fb.replaceChildren(feedbackBox(ok, ex.kind === "audio" ? ex.say : null));
        checkBtn.replaceWith(nextBtn());
      },
    }, "Comprobar");

    const audioBtn = ex.kind === "audio" ? el("button", {
      type: "button",
      class: "inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold px-4 py-2.5 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-pink-300",
      onclick: () => speakMono(ex.say, tts),
    }, el("span", { class: "w-5 h-5", html: ICONS.sound }), "Escuchar de nuevo") : null;

    stage.replaceChildren(header,
      el("p", { class: "font-semibold text-slate-100 text-lg mt-1" }, ex.q),
      audioBtn ? el("div", { class: "mt-2" }, audioBtn) : null,
      el("div", { class: "mt-2" }, ...btns),
      fb, checkBtn);

    if (ex.kind === "audio") setTimeout(() => speakMono(ex.say, tts), 350);
  }

  // --- TYPE: escribir la palabra ---
  function renderType(ex, header) {
    let done = false;
    const fb = el("div");
    const input = el("input", {
      type: "text", autocomplete: "off", autocapitalize: "off", spellcheck: "false",
      class: "mt-3 w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-slate-100 focus:outline focus:outline-2 focus:outline-pink-500",
      placeholder: "Escribe en ingl\u00e9s...",
    });

    const check = () => {
      if (done || !input.value.trim()) return;
      done = true;
      const ok = ex.accepts.includes(normalize(input.value));
      tally(ex, ok);
      ok ? playCorrect() : playWrong();
      input.disabled = true;
      input.className += ok ? " !border-emerald-400" : " !border-rose-400";
      if (ex.say) speakMono(ex.say, tts, { rate: 0.9 });
      fb.replaceChildren(feedbackBox(ok, ex.answer));
      checkBtn.replaceWith(nextBtn());
    };

    const checkBtn = el("button", {
      type: "button",
      class: "mt-4 w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold px-5 py-3 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-emerald-300",
      onclick: check,
    }, "Comprobar");
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); check(); } });

    stage.replaceChildren(header,
      el("p", { class: "font-semibold text-slate-100 text-lg mt-1" }, ex.q),
      ex.sentence ? el("p", { class: "mt-2 text-slate-200 bg-white/5 border border-white/10 rounded-xl px-3 py-2" }, ex.sentence) : null,
      ex.hint ? el("p", { class: "mt-2 text-sm text-slate-400" }, "Pista: ", el("span", { class: "font-mono tracking-widest text-slate-200" }, ex.hint)) : null,
      input, fb, checkBtn);
    setTimeout(() => input.focus(), 100);
  }

  // --- RESULTADO + alimentar SRS ---
  async function renderDone() {
    clearProgress(rkey); // ejercicio terminado -> ya no hay que retomar
    progress.firstChild.style.width = "100%";
    const pct = scorePct(correct, deck.length);
    stage.replaceChildren(el("div", { class: "text-center py-6" },
      el("div", { class: "w-24 mx-auto" }, bymaxMascot("lg")),
      el("h3", { class: "text-xl font-bold text-slate-100 mt-2" }, pct >= 60 ? "\u00a1Vocabulario dominado!" : "Buen intento"),
      el("p", { class: "mt-2 text-slate-300" }, "Acertaste " + correct + " de " + deck.length + " (" + pct + "%)."),
      el("p", { class: "mt-1 text-xs text-slate-500" }, "Estas palabras entraron a tu repaso diario (SRS)."),
      el("button", {
        class: "mt-5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold px-6 py-3 rounded-xl hover:brightness-110",
        onclick: () => { idx = 0; correct = 0; for (const k in byVocab) delete byVocab[k]; render(); },
      }, "Practicar otra vez")));

    if (pct >= 60) celebrate({ title: "\u00a1Palabras fijadas!", subtitle: `${pct}% \u00b7 y a tu repaso SRS`, grand: pct >= 80 });
    if (userId && progressId) completeLesson(userId, progressId, pct).catch(() => {});
    if (typeof onComplete === "function") onComplete(pct);

    // Alimenta el SRS: crea tarjetas si faltan y reprograma cada palabra segun
    // como te fue (>=60% aciertos -> "good"; si no -> "again", vuelve pronto).
    if (userId) {
      try {
        const ids = Object.keys(byVocab);
        await ensureCards(userId, (unit.vocab || []).filter((v) => ids.includes(v.id)));
        const existing = await getCardsByIds(userId, ids);
        await Promise.all(ids.map((vid) => {
          const t = byVocab[vid];
          const cur = existing[vid];
          const card = cur
            ? { ease: Number(cur.ease), interval: cur.interval, reps: cur.reps, due: cur.due }
            : newCard();
          const grade = (t.right / t.total) >= 0.6 ? "good" : "again";
          return saveCard(userId, vid, review(card, grade));
        }));
      } catch (e) { console.error("[vocab-lab] SRS sync fallo:", e); }
    }
  }

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col max-h-[92dvh] min-h-0",
    role: "dialog", "aria-label": "Vocab Lab con " + name, "aria-modal": "true",
  },
    el("div", { class: "flex items-center gap-3" },
      el("div", { class: "w-12 shrink-0" }, bymaxMascot("sm")),
      el("div", { class: "flex-1" },
        el("p", { class: "font-bold text-pink-300" }, "Vocab Lab \u00b7 " + (unit.title || "")),
        el("p", { class: "text-xs text-slate-400" }, "Escalera de memoria \u00b7 nivel " + (unit.level || ""))),
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),
    progress, stage);

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);

  document.body.append(overlay);

  if (!deck.length) {
    stage.replaceChildren(el("p", { class: "text-slate-400 py-6 text-center" }, "Esta unidad aun no tiene vocabulario para practicar."));
  } else {
    const saved = loadProgress(rkey);
    if (saved && saved.idx > 0 && saved.idx < deck.length) {
      stage.replaceChildren(resumeCard({
        step: saved.idx + 1, total: deck.length, accent: "pink",
        onResume: () => { idx = saved.idx; correct = saved.correct || 0; Object.assign(byVocab, saved.byVocab || {}); render(); },
        onRestart: () => { clearProgress(rkey); render(); },
      }));
    } else {
      render();
    }
  }
}
