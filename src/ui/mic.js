/**
 * ui/mic.js — Reconocimiento de voz (speech-to-text) con la Web Speech API.
 *
 * GRATIS y sin servidor: usa window.SpeechRecognition / webkitSpeechRecognition.
 * Permite al alumno HABLAR en ingles y que se transcriba a texto (para la
 * conversacion con la IA). Degradacion elegante: si el navegador no lo soporta,
 * speechSupported() devuelve false y quien lo use oculta el boton de microfono.
 *
 * Nota: requiere HTTPS o localhost (GitHub Pages y el server local cumplen).
 */

/** True si el navegador soporta reconocimiento de voz. */
export function speechSupported() {
  return typeof window !== "undefined" &&
    !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

/**
 * Crea un dictado por voz. Devuelve un controlador { start, stop, abort } o null
 * si no hay soporte.
 * @param {object} cb
 * @param {string} [cb.lang="en-US"] idioma a reconocer
 * @param {function} [cb.onInterim] (texto) resultado parcial en vivo
 * @param {function} [cb.onFinal]   (texto) resultado final consolidado
 * @param {function} [cb.onStart]   al empezar a escuchar
 * @param {function} [cb.onEnd]     (textoFinal) al terminar
 * @param {function} [cb.onError]   (codigo) si algo falla (ej. "not-allowed")
 */
export function createDictation({ lang = "en-US", onInterim, onFinal, onStart, onEnd, onError } = {}) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return null;

  const rec = new SR();
  rec.lang = lang;
  rec.interimResults = true;   // texto en vivo mientras hablas
  rec.continuous = false;      // una frase por toma (natural para chat)
  rec.maxAlternatives = 1;

  let finalText = "";

  rec.onstart = () => onStart?.();
  rec.onerror = (e) => onError?.(e.error || "error");
  rec.onend = () => onEnd?.(finalText.trim());
  rec.onresult = (e) => {
    let interim = "";
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const t = e.results[i][0].transcript;
      if (e.results[i].isFinal) finalText += t;
      else interim += t;
    }
    if (interim) onInterim?.(interim);
    if (finalText) onFinal?.(finalText.trim());
  };

  return {
    start() { finalText = ""; try { rec.start(); } catch { /* ya activo */ } },
    stop() { try { rec.stop(); } catch { /* nada que parar */ } },
    abort() { try { rec.abort(); } catch { /* nada */ } },
  };
}
