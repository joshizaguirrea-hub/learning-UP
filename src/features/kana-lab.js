/**
 * features/kana-lab.js — "Escritura japonesa": laboratorio de Hiragana.
 *
 * NUEVO SEGMENTO (pedido de Joshua, ver docs/ROADMAP-JAPONES.md): aprender a
 * LEER/ESCRIBIR kana de verdad vive AQUI, separado del avance tematico de las
 * unidades (que ahora va en romaji -- ver ui/bilingual-term.js). Independiente
 * del nivel/unidad: se entra desde el hub y se avanza a tu propio ritmo.
 *
 * FASE 1 (este archivo): RECONOCER el caracter -- leerlo y encontrarlo entre
 * opciones. Nada de trazos/teclado todavia (eso es Fase 2+ del roadmap).
 * Ciclo por lote (fila del gojuon): Aprende (flashcard + mnemotecnia + audio +
 * ejemplo) -> Quiz (opcion multiple) -> alimenta el SRS (mismo motor que el
 * vocabulario, ver services/srs.js -- un caracter es, ni mas ni menos, una
 * tarjeta mas que recordar).
 */
import { el, mount, replaceKids } from "../ui/dom.js";
import { ICONS } from "../ui/icons.js";
import { backHome, screenHeader } from "../ui/hub-ui.js";
import { speakButton } from "../ui/speech.js";
import { playCorrect, playWrong } from "../ui/sound.js";
import { kanaRows, charsForRow, buildKanaQuiz, scorePct } from "../core/kana-lab.js";
import { ensureCards, getCardsByIds, saveCard } from "../services/srs.js";
import { review, newCard } from "../core/srs.js";

const ROW_LABEL = {
  a: "Vocales \u00b7 a i u e o",
  ka: "Fila \u304b \u00b7 ka ki ku ke ko",
  sa: "Fila \u3055 \u00b7 sa shi su se so",
};
const OK_CLS = "border-emerald-400 bg-emerald-500/25 text-emerald-100";
const BAD_CLS = "border-rose-400 bg-rose-500/25 text-rose-100";

/** Pantalla principal: elige un lote (fila) para estudiar. */
export async function renderKanaLab(container, user) {
  mount(container, el("div", { class: "max-w-3xl mx-auto space-y-5" },
    backHome(),
    screenHeader({
      icon: ICONS.book, grad: "from-rose-500 to-pink-700",
      title: "Escritura japonesa", subtitle: "Aprende a LEER hiragana, caracter por caracter",
    }),
    el("div", { class: "grid grid-cols-1 sm:grid-cols-3 gap-3" },
      ...kanaRows().map((row) => rowCard(row, user)))));
}

function rowCard(row, user) {
  const chars = charsForRow(row);
  return el("button", {
    type: "button",
    class: "text-left rounded-2xl bg-slate-900 border border-slate-800 p-5 hover:border-rose-400 " +
      "transition focus:outline focus:outline-2 focus:outline-rose-400",
    onclick: () => openRow(row, chars, user),
  },
    el("p", { class: "text-3xl font-black text-slate-100 tracking-wider" }, chars.map((k) => k.kana).join(" ")),
    el("p", { class: "mt-2 text-sm font-semibold text-rose-300" }, ROW_LABEL[row] || row),
    el("p", { class: "mt-1 text-xs text-slate-500" }, chars.length + " caracteres"));
}

/** Abre el estudio de un lote: Aprende -> Quiz -> Resultado (overlay). */
function openRow(row, chars, user) {
  let idx = 0;        // indice en la fase "aprende"
  let qIdx = 0;        // indice en la fase "quiz"
  let correct = 0;
  let quiz = [];        // preguntas de la ronda de quiz en curso
  const stats = {};    // charId -> { right, total } para alimentar el SRS

  const stage = el("div", { class: "mt-4" });
  const close = () => overlay.remove();

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl " +
      "max-h-[92dvh] overflow-y-auto",
    role: "dialog", "aria-label": "Escritura: " + (ROW_LABEL[row] || row), "aria-modal": "true",
  },
    el("div", { class: "flex items-center justify-between" },
      el("p", { class: "font-bold text-rose-300" }, ROW_LABEL[row] || row),
      el("button", {
        class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg",
        "aria-label": "Cerrar", onclick: close,
      }, "\u2715")),
    stage);

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);
  document.body.append(overlay);

  // --- FASE 1: Aprende (flashcard + mnemotecnia + ejemplo) ---------------
  function renderLearn() {
    const k = chars[idx];
    const sb = speakButton(k.kana, { lang: "ja" });
    replaceKids(stage,
      el("p", { class: "text-xs uppercase tracking-wide text-slate-500" },
        "Caracter " + (idx + 1) + " de " + chars.length),
      el("div", { class: "mt-3 text-center" },
        el("p", { class: "text-7xl font-black text-white leading-none" }, k.kana),
        el("p", { class: "mt-2 text-2xl font-bold text-rose-300" }, k.romaji),
        sb ? el("div", { class: "mt-2 flex justify-center" }, sb) : null),
      el("div", { class: "mt-4 rounded-xl bg-slate-800/60 border border-slate-700 p-3" },
        el("p", { class: "text-xs font-bold uppercase text-slate-400 mb-1" }, "Para recordarlo"),
        el("p", { class: "text-sm text-slate-200 leading-relaxed" }, k.mnemonic)),
      el("div", { class: "mt-3 rounded-xl bg-rose-500/10 border border-rose-400/30 p-3" },
        el("p", { class: "text-xs font-bold uppercase text-rose-300 mb-1" }, "Ejemplo"),
        el("p", { class: "text-slate-100" }, k.example.term + " \u2014 " + k.example.translation)),
      el("button", {
        type: "button",
        class: "mt-5 w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold px-5 py-3 " +
          "rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-rose-400",
        onclick: () => { idx++; idx >= chars.length ? startQuiz() : renderLearn(); },
      }, idx === chars.length - 1 ? "Empezar el quiz \u2192" : "Siguiente \u2192"));
  }

  // --- FASE 2: Quiz (opcion multiple, leer + encontrar) -------------------
  function startQuiz() {
    qIdx = 0; correct = 0;
    for (const k in stats) delete stats[k];
    quiz = buildKanaQuiz(chars);
    renderQuiz();
  }

  function renderQuiz() {
    if (qIdx >= quiz.length) return renderDone();
    const q = quiz[qIdx];
    const t = stats[q.charId] || (stats[q.charId] = { right: 0, total: 0 });
    let done = false;
    const fb = el("div");

    const btns = q.options.map((opt) => {
      const b = el("button", {
        type: "button",
        class: "block w-full text-left px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-slate-200 " +
          "mt-2 hover:bg-white/10 transition focus:outline focus:outline-2 focus:outline-rose-400",
        onclick: () => {
          if (done) return;
          done = true;
          const ok = !!opt.correct;
          correct += ok ? 1 : 0;
          t.total++; if (ok) t.right++;
          ok ? playCorrect() : playWrong();
          btns.forEach((x) => {
            if (x._opt.correct) x.className += " " + OK_CLS;
            else if (x === b) x.className += " " + BAD_CLS;
            x.disabled = true;
          });
          fb.replaceChildren(el("p", { class: "mt-3 text-sm font-semibold " + (ok ? "text-emerald-300" : "text-amber-300") },
            ok ? "\u2714 \u00a1Correcto!" : "\u2717 Era: " + q.options.find((o) => o.correct).text));
          next.disabled = false;
        },
      }, opt.text);
      b._opt = opt;
      return b;
    });

    const next = el("button", {
      type: "button", disabled: true,
      class: "mt-4 w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold px-5 py-3 " +
        "rounded-xl hover:brightness-110 disabled:opacity-40 focus:outline focus:outline-2 focus:outline-rose-400",
      onclick: () => { qIdx++; renderQuiz(); },
    }, qIdx === quiz.length - 1 ? "Ver resultado" : "Siguiente \u2192");

    const sb = q.kind === "read" ? speakButton(q.prompt, { lang: "ja" }) : null;
    replaceKids(stage,
      el("p", { class: "text-xs uppercase tracking-wide text-slate-500" },
        "Pregunta " + (qIdx + 1) + " de " + quiz.length),
      el("p", { class: "mt-2 text-sm text-slate-400" },
        q.kind === "read" ? "\u00bfC\u00f3mo se lee?" : "\u00bfCual caracter es \u201c" + q.prompt + "\u201d?"),
      el("div", { class: "mt-1 flex items-center gap-2" },
        el("p", { class: "text-5xl font-black text-white" }, q.prompt),
        sb),
      el("div", { class: "mt-3" }, ...btns),
      fb, next);
  }

  // --- RESULTADO: alimenta el SRS y cierra el ciclo -----------------------
  async function renderDone() {
    const pct = scorePct(correct, quiz.length);
    await syncSrs();
    replaceKids(stage,
      el("div", { class: "text-center py-4" },
        el("p", { class: "text-5xl" }, pct >= 70 ? "\uD83C\uDF89" : "\uD83D\uDCAA"),
        el("h3", { class: "text-xl font-bold text-slate-100 mt-2" },
          pct >= 70 ? "\u00a1Lote dominado!" : "Buen intento"),
        el("p", { class: "mt-2 text-slate-300" },
          "Acertaste " + correct + " de " + quiz.length + " (" + pct + "%)."),
        el("p", { class: "mt-1 text-xs text-slate-500" }, "Estos caracteres entraron a tu repaso diario (SRS)."),
        el("div", { class: "mt-5 flex flex-col gap-2" },
          el("button", {
            class: "bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold px-6 py-3 rounded-xl hover:brightness-110",
            onclick: () => { idx = 0; renderLearn(); },
          }, "Repasar este lote otra vez"),
          el("button", {
            class: "text-sm text-slate-400 hover:text-slate-200 underline",
            onclick: close,
          }, "Volver a los lotes"))));
  }

  /** Igual que vocab-lab.js: crea tarjetas si faltan y reprograma cada una. */
  async function syncSrs() {
    if (!user?.id) return;
    try {
      const ids = Object.keys(stats);
      if (!ids.length) return;
      await ensureCards(user.id, chars.filter((c) => ids.includes(c.id)));
      const existing = await getCardsByIds(user.id, ids);
      await Promise.all(ids.map((cid) => {
        const t = stats[cid];
        const cur = existing[cid];
        const c = cur
          ? { ease: Number(cur.ease), interval: cur.interval, reps: cur.reps, due: cur.due }
          : newCard();
        const grade = (t.right / t.total) >= 0.6 ? "good" : "again";
        return saveCard(user.id, cid, review(c, grade));
      }));
    } catch (e) { console.error("[kana-lab] SRS sync fallo:", e); }
  }

  renderLearn();
}
