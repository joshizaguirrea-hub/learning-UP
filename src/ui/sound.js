/**
 * ui/sound.js — Efectos de sonido cortos con WebAudio (sin archivos externos).
 *
 * Capa de presentacion. Genera tonos sinteticos para feedback (acierto, error)
 * y una pequena fanfarria para los logros. Respeta el silencio si el navegador
 * bloquea el audio hasta la primera interaccion (todo va en try/catch).
 */

let ctx = null;

function audioCtx() {
  if (ctx) return ctx;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    ctx = AC ? new AC() : null;
  } catch {
    ctx = null;
  }
  return ctx;
}

/** Reproduce un tono simple. freq en Hz, dur en segundos. */
function tone(freq, start = 0, dur = 0.14, type = "sine", gain = 0.15) {
  const ac = audioCtx();
  if (!ac) return;
  try {
    if (ac.state === "suspended") ac.resume();
    const osc = ac.createOscillator();
    const vol = ac.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    const t0 = ac.currentTime + start;
    vol.gain.setValueAtTime(0.0001, t0);
    vol.gain.exponentialRampToValueAtTime(gain, t0 + 0.02);
    vol.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(vol).connect(ac.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  } catch {
    /* silencio si algo falla */
  }
}

/** Ding alegre de respuesta correcta (dos notas ascendentes). */
export function playCorrect() {
  tone(660, 0, 0.12, "triangle", 0.18);
  tone(880, 0.09, 0.16, "triangle", 0.18);
}

/** Sonido suave de error (nota baja, no castigador). */
export function playWrong() {
  tone(196, 0, 0.22, "sine", 0.16);
}

/**
 * Fanfarria de logro escalonada: cada llamada con indice i sube un poco el tono,
 * asi los logros que aparecen "uno tras otro" suenan como una escalera alegre.
 */
export function playAchievement(i = 0) {
  const scale = [523, 659, 784, 988, 1175, 1319];
  tone(scale[Math.min(i, scale.length - 1)], 0, 0.2, "triangle", 0.2);
}

/** Acorde final de celebracion (do-mi-sol-do). */
export function playFanfare() {
  [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.12, 0.35, "triangle", 0.18));
}
