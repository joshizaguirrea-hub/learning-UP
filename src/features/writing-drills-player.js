/**
 * features/writing-drills-player.js — Reproductor de ejercicios DETERMINISTAS.
 *
 * Corre una baraja de "drills" (data/writing-drills.js) uno por uno, con
 * correccion INSTANTANEA (sin IA => gratis, offline). Da feedback verde/rojo,
 * pronuncia el modelo en ingles al acertar y, al terminar, celebra y avisa
 * (onFinish) para marcar la leccion. Presentacion pura: no genera contenido.
 *
 * Reutilizable por Writing y Grammar (comparten el caza-errores) via openDrillDeck.
 */
import { el } from "../ui/dom.js";
import { speak } from "../ui/speech.js";
import { celebrate } from "../ui/celebrate.js";
import { bymaxMascot } from "../ui/bymax-mascot.js";
import { normAnswer } from "../data/writing-drills.js";
import { makeResumeKey, saveProgress, loadProgress, clearProgress, resumeCard } from "../ui/resume.js";

const OK_CLS = "border-emerald-400 bg-emerald-500/25 text-emerald-100";
const BAD_CLS = "border-rose-400 bg-rose-500/25 text-rose-100";

/**
 * Abre un modal que corre una baraja de drills.
 * @param {object} cfg { title, subtitle, drills:[], onFinish?, resumeKey? }
 *   resumeKey: si viene, se autoguarda el avance y al reabrir ofrece continuar.
 */
export function openDrillDeck({ title, subtitle, drills = [], onFinish, resumeKey } = {}) {
  const deck = (drills || []).filter(Boolean);
  if (!deck.length) return;

  const rkey = resumeKey ? makeResumeKey(resumeKey) : null;
  let idx = 0;
  let correct = 0;
  const close = () => overlay.remove();

  const body = el("div", { class: "p-4 sm:p-5 overflow-y-auto flex-1 min-h-0" });
  const footer = el("div", { class: "p-4 border-t border-slate-800 flex items-center gap-3" });
  const progress = el("div", { class: "h-1.5 bg-slate-800 rounded-full overflow-hidden" },
    el("div", { class: "h-full bg-indigo-500 transition-all", style: "width:0%" }));

  function setProgress() {
    progress.firstChild.style.width = `${Math.round((idx / deck.length) * 100)}%`;
  }

  function finishDeck() {
    clearProgress(rkey);
    const score = Math.round((correct / deck.length) * 100);
    close();
    celebrate({
      title: score >= 80 ? "\u00a1Excelente!" : "\u00a1Terminaste!",
      subtitle: `Acertaste ${correct} de ${deck.length} (${score}%).`,
      grand: score >= 80,
    });
    if (typeof onFinish === "function") onFinish(score);
  }

  function next() {
    idx += 1;
    if (idx >= deck.length) { setProgress(); finishDeck(); return; }
    render();
  }

  function render() {
    setProgress();
    saveProgress(rkey, { idx, correct }); // autosave (solo si hay resumeKey)
    const drill = deck[idx];
    const ctrl = renderDrill(drill, () => { correct += 1; }, next);
    body.replaceChildren(
      el("p", { class: "text-xs text-slate-500 mb-2" }, `Ejercicio ${idx + 1} de ${deck.length}`),
      ctrl.node);
    footer.replaceChildren(...ctrl.footer);
  }

  const card = el("div", {
    class: "robot-pop max-w-xl w-full bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col max-h-[92dvh] overflow-hidden",
    role: "dialog", "aria-modal": "true", "aria-label": title || "Ejercicios",
  },
    el("div", { class: "flex items-center gap-3 p-4 border-b border-slate-800" },
      el("div", { class: "w-10 shrink-0" }, bymaxMascot("sm")),
      el("div", { class: "flex-1" },
        el("p", { class: "font-bold text-indigo-300" }, title || "Pr\u00e1ctica"),
        subtitle ? el("p", { class: "text-xs text-slate-400" }, subtitle) : null),
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),
    el("div", { class: "px-4 pt-3" }, progress),
    body, footer);

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);

  document.body.append(overlay);
  const saved = loadProgress(rkey);
  if (saved && saved.idx > 0 && saved.idx < deck.length) {
    setProgress();
    body.replaceChildren(resumeCard({
      step: saved.idx + 1, total: deck.length, accent: "indigo",
      onResume: () => { idx = saved.idx; correct = saved.correct || 0; render(); },
      onRestart: () => { clearProgress(rkey); render(); },
    }));
    footer.replaceChildren();
  } else {
    render();
  }
}

// --- Renderizadores por tipo. Cada uno devuelve { node, footer:[...botones] } --

function feedbackLine(ok, explain) {
  return el("p", { class: "mt-3 text-sm font-medium " + (ok ? "text-emerald-300" : "text-rose-300") },
    (ok ? "\u2714 \u00a1Correcto! " : "\u2717 Casi. ") + (explain || ""));
}

function nextBtn(label, onclick) {
  return el("button", {
    type: "button",
    class: "ml-auto px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 focus:outline focus:outline-2 focus:outline-white/70",
    onclick,
  }, label || "Siguiente");
}

function renderDrill(drill, onCorrect, advance) {
  switch (drill.kind) {
    case "match": return renderMatch(drill, onCorrect, advance);
    case "fix":
    case "recall": return renderText(drill, onCorrect, advance);
    default: return renderPick(drill, onCorrect, advance);
  }
}

/** PICK: elige una opcion. Marca verde/rojo, pronuncia el modelo al acertar. */
function renderPick(drill, onCorrect, advance) {
  let selected = null;
  let done = false;
  const feedback = el("div");
  const btns = drill.choices.map((text) => {
    const b = el("button", {
      type: "button",
      class: "block w-full text-left px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-slate-200 mt-2 hover:bg-white/10 transition",
      onclick: () => {
        if (done) return;
        selected = text;
        btns.forEach((x) => x.classList.remove("border-indigo-400", "bg-indigo-500/25"));
        b.classList.add("border-indigo-400", "bg-indigo-500/25");
      },
    }, text);
    return b;
  });

  const check = nextBtn("Comprobar", () => {
    if (done || selected == null) return;
    done = true;
    const ok = normAnswer(selected) === normAnswer(drill.answer);
    if (ok) onCorrect();
    btns.forEach((b) => {
      if (normAnswer(b.textContent) === normAnswer(drill.answer)) b.className += " " + OK_CLS;
      else if (b.textContent === selected) b.className += " " + BAD_CLS;
      b.disabled = true;
    });
    if (ok && drill.say) speak(drill.say, "en-US", { rate: 0.9 });
    feedback.replaceChildren(feedbackLine(ok, drill.explain));
    check.replaceWith(nextBtn(undefined, advance));
  });

  const node = el("div", {},
    el("p", { class: "font-medium text-slate-100 text-lg" }, drill.prompt),
    drill.promptEs ? el("p", { class: "text-sm text-slate-400 mt-1" }, drill.promptEs) : null,
    el("div", { class: "mt-3" }, ...btns),
    feedback);
  return { node, footer: [check] };
}

/** FIX / RECALL: escribe la frase correcta. Compara tolerante (mayus/puntuacion). */
function renderText(drill, onCorrect, advance) {
  let done = false;
  const feedback = el("div");
  const input = el("textarea", {
    rows: "2",
    class: "mt-3 w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-slate-100 focus:outline focus:outline-2 focus:outline-indigo-500",
    placeholder: "Escribe aqu\u00ed...",
  });

  const check = nextBtn("Comprobar", () => {
    if (done || !input.value.trim()) return;
    done = true;
    const ok = normAnswer(input.value) === normAnswer(drill.answer);
    if (ok) onCorrect();
    input.disabled = true;
    input.className += ok ? " !border-emerald-400" : " !border-rose-400";
    if (drill.say) speak(drill.say, "en-US", { rate: 0.9 });
    feedback.replaceChildren(
      feedbackLine(ok, ""),
      el("p", { class: "mt-1 text-sm text-slate-300" }, "Modelo: "),
      el("p", { class: "text-emerald-200 font-medium" }, drill.answer));
    check.replaceWith(nextBtn(undefined, advance));
  });

  const isRecall = drill.kind === "recall";
  const node = el("div", {},
    el("p", { class: "text-xs uppercase tracking-wide text-slate-500" }, isRecall ? "Traduce al ingl\u00e9s" : "Corrige el error"),
    el("p", { class: "font-medium text-slate-100 text-lg mt-1" }, drill.prompt),
    drill.promptEs ? el("p", { class: "text-sm text-slate-400 mt-1" }, drill.promptEs) : null,
    input, feedback);
  return { node, footer: [check] };
}

/** MATCH: dos columnas; tocas una ficha y su pareja. Verde = acierto, rojo = falla.
 * Se autoavanza al emparejar todas (estilo Duolingo). */
function renderMatch(drill, onCorrect, advance) {
  const pairs = drill.pairs;
  const total = pairs.length;
  let matched = 0;
  let sel = null;
  let busy = false;
  let scored = false;

  const shuffle = (a) => a.map((x) => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map((z) => z[1]);
  const TILE = "w-full px-3 py-3 rounded-xl border border-white/15 bg-white/5 text-slate-100 text-center font-medium hover:bg-white/10 transition focus:outline focus:outline-2 focus:outline-indigo-400";

  const feedback = el("div");
  function tile(text, side, i) {
    const b = el("button", { type: "button", class: TILE }, text);
    b._side = side; b._i = i; b._done = false;
    b.onclick = () => tap(b);
    return b;
  }
  const leftTiles = pairs.map((p, i) => tile(p.left, "L", i));
  const rightTiles = shuffle(pairs.map((p, i) => ({ t: p.right, i }))).map((o) => tile(o.t, "R", o.i));

  function clearSel() { if (sel) { sel.classList.remove("border-indigo-400", "bg-indigo-500/25"); sel = null; } }

  function tap(b) {
    if (busy || b._done) return;
    if (!sel) { sel = b; b.classList.add("border-indigo-400", "bg-indigo-500/25"); return; }
    if (sel === b) { clearSel(); return; }
    if (sel._side === b._side) { clearSel(); sel = b; b.classList.add("border-indigo-400", "bg-indigo-500/25"); return; }
    const ok = sel._i === b._i;
    if (ok) {
      [sel, b].forEach((n) => { n._done = true; n.disabled = true; n.classList.remove("border-indigo-400", "bg-indigo-500/25"); n.className += " " + OK_CLS; });
      speak(pairs[b._i].left, "en-US", { rate: 0.9 });
      clearSel();
      matched += 1;
      if (matched === total) {
        if (!scored) { scored = true; onCorrect(); }
        feedback.replaceChildren(feedbackLine(true, "\u00a1Todas emparejadas!"));
        setTimeout(advance, 700);
      }
    } else {
      busy = true;
      const pair = [sel, b];
      pair.forEach((n) => n.className += " " + BAD_CLS);
      setTimeout(() => { pair.forEach((n) => { n.className = TILE; }); clearSel(); busy = false; }, 450);
    }
  }

  const grid = el("div", { class: "mt-3 grid grid-cols-2 gap-2" },
    el("div", { class: "space-y-2" }, ...leftTiles),
    el("div", { class: "space-y-2" }, ...rightTiles));
  const node = el("div", {},
    el("p", { class: "font-medium text-slate-100 text-lg" }, drill.prompt),
    grid, feedback);
  // Match se autoavanza: el footer solo ofrece saltar si se traba.
  const skip = el("button", {
    type: "button",
    class: "ml-auto px-4 py-2.5 rounded-xl bg-white/5 text-slate-300 hover:bg-white/10",
    onclick: advance,
  }, "Saltar");
  return { node, footer: [skip] };
}
