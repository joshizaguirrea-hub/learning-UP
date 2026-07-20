/**
 * features/share-card.js — Tarjeta COMPARTIBLE del progreso (crecimiento viral).
 *
 * Dibuja una imagen 1080x1080 (canvas) con tu nivel, racha y etapa de Bymax, y
 * la comparte con la Web Share API (o la descarga). Sin librerias externas.
 */
import { el } from "../ui/dom.js";
import { robotName } from "../ui/robot.js";
import { bymaxEvolution } from "../core/bymax-evolution.js";

const SITE = "learning UP";

function drawCard(canvas, { name, level, streak, xp }) {
  const ctx = canvas.getContext("2d");
  const W = 1080, H = 1080;
  // Fondo aurora.
  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, "#4f46e5"); g.addColorStop(0.5, "#7c3aed"); g.addColorStop(1, "#c026d3");
  ctx.fillStyle = "#0b1020"; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = g; ctx.globalAlpha = 0.92; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1;

  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.font = "bold 44px system-ui, sans-serif";
  ctx.fillText(SITE.toUpperCase(), W / 2, 120);

  // Emoji grande (robot).
  ctx.font = "220px system-ui, sans-serif";
  ctx.fillText("\uD83E\uDD16", W / 2, 400);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 72px system-ui, sans-serif";
  ctx.fillText(name || "Mi progreso", W / 2, 520);

  const evo = bymaxEvolution(xp || 0);
  ctx.font = "bold 40px system-ui, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.fillText("Nivel " + (level || "A1") + "  \u00b7  Bymax " + evo.stage.name, W / 2, 600);

  // Racha destacada.
  ctx.font = "bold 180px system-ui, sans-serif";
  ctx.fillText("\uD83D\uDD25 " + (streak || 0), W / 2, 800);
  ctx.font = "bold 40px system-ui, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.fillText("d\u00edas de racha aprendiendo ingl\u00e9s", W / 2, 870);

  ctx.font = "34px system-ui, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.fillText("Aprende ingl\u00e9s gratis con " + SITE, W / 2, 980);
}

export function openShareCard({ name = "", level = "A1", streak = 0, xp = 0 } = {}) {
  const first = (name || "").trim().split(/\s+/)[0] || robotName();
  const canvas = el("canvas", { width: "1080", height: "1080", class: "w-full rounded-xl border border-white/10" });
  drawCard(canvas, { name: first, level, streak, xp });

  const text = `Llevo ${streak} d\u00eda${streak === 1 ? "" : "s"} de racha aprendiendo ingl\u00e9s (nivel ${level}) con ${SITE}. \uD83D\uDD25\uD83E\uDD16`;
  const status = el("p", { class: "mt-2 text-xs text-slate-500 min-h-[1rem]" }, "");

  const toBlob = () => new Promise((r) => canvas.toBlob(r, "image/png"));

  async function share() {
    try {
      const blob = await toBlob();
      const file = new File([blob], "learning-up.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text });
        return;
      }
      if (navigator.share) { await navigator.share({ text }); return; }
      await navigator.clipboard.writeText(text);
      status.textContent = "Texto copiado. Pega en tu red favorita \uD83D\uDE09";
    } catch (e) {
      if (e && e.name === "AbortError") return;
      status.textContent = "No pude compartir aqu\u00ed. Usa \u201cDescargar\u201d.";
    }
  }

  async function download() {
    const blob = await toBlob();
    const url = URL.createObjectURL(blob);
    const a = el("a", { href: url, download: "learning-up.png" });
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    status.textContent = "Imagen descargada \u2705";
  }

  const close = () => overlay.remove();
  const card = el("div", {
    class: "robot-pop max-w-sm w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl",
    role: "dialog", "aria-label": "Compartir mi progreso", "aria-modal": "true",
  },
    el("div", { class: "flex items-center justify-between mb-3" },
      el("p", { class: "font-bold text-indigo-300" }, "Comparte tu progreso"),
      el("button", { class: "grid place-items-center w-9 h-9 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 text-lg", "aria-label": "Cerrar", onclick: close }, "\u2715")),
    canvas,
    status,
    el("div", { class: "mt-4 flex gap-2" },
      el("button", {
        class: "flex-1 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold px-4 py-3 rounded-xl hover:brightness-110 focus:outline focus:outline-2 focus:outline-indigo-400",
        onclick: share,
      }, "Compartir"),
      el("button", {
        class: "px-4 py-3 rounded-xl border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 focus:outline focus:outline-2 focus:outline-white",
        onclick: download,
      }, "Descargar")));

  const overlay = el("div", {
    class: "fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4",
    onclick: (e) => { if (e.target === overlay) close(); },
  }, card);
  document.body.append(overlay);
}
