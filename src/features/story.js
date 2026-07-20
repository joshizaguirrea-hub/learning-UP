/**
 * features/story.js — "Cuento de la unidad": lectura tematica con voz + glosario.
 *
 * Alimenta el contenido con TEXTOS/CUENTOS enfocados en la unidad. Funciona en
 * DOS modos, sin depender de la red para lo esencial:
 *   1) OFFLINE (siempre): muestra el texto de lectura que la unidad YA trae,
 *      con lectura en voz alta (voz real por frase) y glosario tocable.
 *   2) IA (opcional): genera un cuento NUEVO, nivelado y tematico, con el Worker
 *      en modo "story" (requiere Worker desplegado). Si no esta, avisa amable.
 *
 * DRY: reutiliza speakSequence/speak (voz) y el vocab/lectura ya definidos.
 */
import { el } from "../ui/dom.js";
import { speak, speakSequence } from "../ui/speech.js";
import { cancelCloud } from "../ui/cloud-tts.js";
import { ICONS } from "../ui/icons.js";
import { BYMAX_WORKER_URL, bymaxAiEnabled } from "../config/bymax.js";
import { sagaForLevel } from "../data/sagas.js";
import { unitsForLevel } from "../data/units/index.js";

/** Clave de continuidad de la saga por nivel (recap del ultimo capitulo). */
const recapKey = (level) => "linguapath.saga." + level + ".recap";
function getRecap(level) { try { return localStorage.getItem(recapKey(level)) || ""; } catch { return ""; } }
function saveRecap(level, text) { try { localStorage.setItem(recapKey(level), String(text).slice(0, 400)); } catch { /* ignore */ } }

/** Texto de lectura base de la unidad (de su leccion de reading). */
function baseReading(unit) {
  for (const l of unit.lessons || []) {
    const r = (l.content && l.content.reading) || l.passage;
    if (r) return r;
  }
  return "";
}

/**
 * Limpia el texto del cuento: quita markdown (**negrita**, *, _, `) y las lineas
 * de marco en espanol que a veces mete la IA (saludo/despedida tipo "Aqui tienes
 * una historia...", "Excelente vocabulario!..."). Deja solo el cuento (+ MORAL).
 */
function sanitizeStory(text) {
  let t = String(text)
    .replace(/\*\*/g, "")
    .replace(/[*_`]/g, "")
    .replace(/^#+\s*/gm, "");
  const lines = t.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  const kept = lines.filter((l) => {
    if (/^moral\s*:/i.test(l)) return true;               // la moral en espanol si va
    const letters = l.replace(/[^a-z\u00e1\u00e9\u00ed\u00f3\u00fa\u00f1]/gi, "");
    const spanishHints = /(hola|aqu\u00ed|historia|vocabulario|te animas|t\u00fa puedes|excelente|espero|practicando|traducir|frases)/i;
    // Descarta lineas de marco: mayormente espanol Y con senales de saludo/cierre.
    if (spanishHints.test(l) && !/["\u201c]/.test(l)) return false;
    return letters.length > 0;
  });
  return kept.join("\n\n");
}

/** Divide un texto en frases para leerlo con pausas naturales. */
function toSentences(text) {
  return String(text)
    .split(/\n+/)
    .flatMap((line) => line.split(/(?<=[.!?])\s+/))
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Renderiza un texto (parrafos) dentro de un contenedor. */
function renderText(host, text) {
  const paras = String(text).split(/\n{2,}|\n/).map((p) => p.trim()).filter(Boolean);
  host.replaceChildren(...paras.map((p) => {
    const moral = /^moral\s*:/i.test(p);
    return el("p", {
      class: moral
        ? "mt-3 text-sm text-amber-200 bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2"
        : "text-slate-100 leading-relaxed mt-2",
    }, p);
  }));
}

/**
 * Abre el lector de cuentos de una unidad.
 * @param {object} unit - { title, level, vocab, lessons }
 */
export function openStory(unit) {
  const close = () => { cancelCloud(); if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel(); overlay.remove(); };
  let currentText = baseReading(unit);

  // --- Serializacion (telenovela): saga del nivel + numero de capitulo -------
  const saga = sagaForLevel(unit.level);
  const lvlUnits = unitsForLevel(unit.level);
  const chapterNum = Math.max(1, lvlUnits.findIndex((u) => u.id === unit.id) + 1);
  const recap = getRecap(unit.level);

  const storyBox = el("div", { class: "mt-3" });
  const status = el("p", { class: "mt-2 text-xs text-slate-500" },
    saga ? "Cap\u00edtulo " + chapterNum + " \u00b7 lectura de la unidad" : "Lectura de la unidad");

  function readAloud() {
    const items = toSentences(currentText).map((s) => ({
      text: s.replace(/^moral\s*:\s*/i, ""),
      lang: /^moral\s*:/i.test(s) ? "es-MX" : "en-US",
      opts: { rate: 0.95 },
    }));
    speakSequence(items);
  }

  const listenBtn = el("button", {
    type: "button",
    class: "inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white " +
      "font-semibold px-4 py-2.5 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-indigo-400",
    onclick: readAloud,
  }, el("span", { class: "w-5 h-5", html: ICONS.sound }), "Escuchar cuento");

  const stopBtn = el("button", {
    type: "button",
    class: "inline-flex items-center gap-2 border border-white/15 bg-white/5 text-slate-200 px-3 py-2.5 " +
      "rounded-xl hover:bg-white/10 focus:outline focus:outline-2 focus:outline-indigo-400",
    onclick: () => { cancelCloud(); if ("speechSynthesis" in window) window.speechSynthesis.cancel(); },
  }, "Detener");

  const iaBtn = el("button", {
    type: "button",
    class: "inline-flex items-center gap-2 border border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-200 px-3 py-2.5 " +
      "rounded-xl hover:bg-fuchsia-500/20 focus:outline focus:outline-2 focus:outline-fuchsia-400",
    onclick: newStoryIA,
  }, el("span", { class: "w-5 h-5", html: ICONS.bulb }), "Cuento nuevo (IA)");

  async function newStoryIA() {
    if (!bymaxAiEnabled) {
      status.textContent = "El cuento con IA requiere el Worker de Bymax activo. Por ahora disfruta la lectura de la unidad.";
      return;
    }
    iaBtn.disabled = true;
    status.textContent = "Creando el pr\u00f3ximo cap\u00edtulo para ti...";
    const keywords = (unit.vocab || []).slice(0, 8).map((v) => v.term).join(", ");
    const sagaCtx = saga
      ? `Es una SAGA llamada "${saga.title}". Premisa: ${saga.premise}. Personajes: ${saga.cast.join(", ")}. ` +
        `Este es el CAPITULO ${chapterNum}. ` +
        (recap ? `Anteriormente: ${recap} ` : "") +
        `Continua la historia con esos personajes y termina con un pequeno cliffhanger (gancho). `
      : "";
    const question = `Escribe UNICAMENTE el siguiente capitulo (cuento corto) en INGLES sobre "${unit.title}", ` +
      `nivel ${unit.level || "B1"} (MCER). ${sagaCtx}Incluye de forma natural estas palabras: ${keywords}. ` +
      `La primera linea es un titulo corto; luego 2 o 3 parrafos. NO uses asteriscos ni markdown. ` +
      `NO escribas introduccion, saludo, despedida ni traducciones en espanol: SOLO el capitulo en ingles ` +
      `y, al final, una sola linea "MORAL: " con una frase breve en espanol.`;
    try {
      const res = await fetch(BYMAX_WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, mode: "story", topic: unit.title, level: unit.level }),
      });
      const data = await res.json().catch(() => ({}));
      if (data && data.answer) {
        currentText = sanitizeStory(data.answer);
        renderText(storyBox, currentText);
        if (saga) saveRecap(unit.level, currentText.replace(/\n+/g, " ").slice(0, 380));
        status.textContent = (saga ? "Cap\u00edtulo " + chapterNum + " " : "") + "generado con IA - nivel " + (unit.level || "");
        readAloud();
      } else {
        const why = [data && data.error, data && data.detail].filter(Boolean).join(" | ");
        status.textContent = why ? ("No se pudo crear el cuento: " + why) : "No se pudo crear el cuento ahora. Intenta luego.";
      }
    } catch (err) {
      console.error("[story] fallo IA:", err);
      status.textContent = "Sin conexion para crear el cuento. Disfruta la lectura de la unidad.";
    } finally {
      iaBtn.disabled = false;
    }
  }

  // Glosario tocable (pronuncia el termino en ingles).
  const glossary = el("div", { class: "mt-4 flex flex-wrap gap-2" },
    ...(unit.vocab || []).slice(0, 12).map((v) => el("button", {
      type: "button",
      class: "text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10",
      onclick: () => speak(v.term, "en-US", { rate: 0.9 }),
      title: v.translation || "",
    }, v.term)));

  const card = el("div", {
    class: "robot-pop max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col max-h-[88vh]",
    role: "dialog", "aria-label": "Cuento de la unidad", "aria-modal": "true",
  },
    el("div", { class: "flex items-center gap-3" },
      el("div", { class: "w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-700 grid place-items-center text-white", html: ICONS.book }),
      el("div", { class: "flex-1" },
        el("p", { class: "font-bold text-indigo-300" }, saga ? (saga.title + " \u00b7 Cap. " + chapterNum) : ("Cuento \u00b7 " + (unit.title || ""))),
        el("p", { class: "text-xs text-slate-400" }, saga ? (unit.title + " \u00b7 nivel " + (unit.level || "")) : ("Lee y escucha \u00b7 nivel " + (unit.level || "")))),
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),
    el("div", { class: "mt-3 flex flex-wrap gap-2" }, listenBtn, stopBtn, iaBtn),
    status,
    el("div", { class: "mt-2 overflow-y-auto pr-1", style: "max-height:46vh" },
      saga ? el("div", { class: "mb-3 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/25 p-3" },
        el("p", { class: "text-xs uppercase tracking-wide text-fuchsia-300" }, "Saga: " + saga.title),
        el("p", { class: "text-xs text-slate-300 mt-1" }, saga.premise),
        recap ? el("p", { class: "text-xs text-slate-400 mt-2 italic" }, "Anteriormente: " + recap) : null) : null,
      storyBox, glossary));

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);

  document.body.append(overlay);

  if (currentText) renderText(storyBox, currentText);
  else storyBox.append(el("p", { class: "text-slate-400" }, "Esta unidad aun no tiene lectura. Prueba \"Cuento nuevo (IA)\"."));
}
