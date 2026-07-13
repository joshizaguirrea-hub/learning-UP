/**
 * ui/confetti.js — Explosion de confeti con <canvas> (sin librerias).
 *
 * Capa de presentacion. Un estallido corto y alegre para celebrar. Se limpia
 * solo al terminar y respeta a quien prefiere menos movimiento (accesibilidad).
 */
const COLORS = ["#6366f1", "#d946ef", "#34d399", "#f59e0b", "#38bdf8", "#f472b6"];

/** Lanza confeti. Opciones: { count, duration }. */
export function confettiBurst({ count = 130, duration = 2000 } = {}) {
  if (typeof window === "undefined") return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:60";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.append(canvas);
  const ctx = canvas.getContext("2d");

  const cx = canvas.width / 2;
  const parts = Array.from({ length: count }, () => ({
    x: cx + (Math.random() - 0.5) * 120,
    y: canvas.height * 0.28 + (Math.random() - 0.5) * 60,
    vx: (Math.random() - 0.5) * 12,
    vy: Math.random() * -9 - 4,
    size: Math.random() * 7 + 4,
    color: COLORS[(Math.random() * COLORS.length) | 0],
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3,
  }));

  const start = performance.now();
  function frame(now) {
    const t = now - start;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    parts.forEach((p) => {
      p.vy += 0.28; // gravedad
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, 1 - t / duration);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });
    if (t < duration) requestAnimationFrame(frame);
    else canvas.remove();
  }
  requestAnimationFrame(frame);
}
