/**
 * ui/teacher-presenter.js — Decide QUE cara del profe se muestra: el robot Bymax
 * (SVG, siempre disponible) o un profe HUMANO 3D (three.js / Ready Player Me),
 * segun la preferencia del alumno (getTeacher3d).
 *
 * Expone una API UNICA para quien lo use (bymax-session, etc.) -> no tiene que
 * saber cual esta activo (DRY):
 *   const p = mountTeacher(container);
 *   p.setTalking(true|false);   // mueve la boca
 *   p.dispose();                // limpia (importante para el 3D: libera GPU)
 *
 * El avatar 3D se carga con IMPORT DINAMICO: quien elige el robot NO descarga
 * three.js (lazy load). El lip-sync del humano usa el analizador singleton de la
 * voz de nube (cloud-tts.getTtsAnalyser) -> la boca se abre con el volumen real.
 *
 * @module ui/teacher-presenter
 */
import { el } from "./dom.js";
import { bymaxMascot, setBymaxTalking } from "./bymax-mascot.js";
import { getTeacher3d } from "./robot-prefs.js";
import { getTtsAnalyser } from "./cloud-tts.js";

// Avatares 3D incluidos en el repo (vendor/avatars) POR ROL -> un profe distinto
// para cada contexto. Funcionan en cualquier red y offline. Si el archivo del rol
// no existe todavia, cae con gracia a la profe de curso (profe-mujer).
//   course    = Megan   (da las clases)
//   speaking  = Mathias (conversacion)
//   interview = Susan   (entrevista laboral)
// TODO: agregar profe-conversacion.glb (hombre, Mathias).
const ROLE_AVATARS = {
  course: "./vendor/avatars/profe-curso.glb",
  speaking: "./vendor/avatars/profe-conversacion.glb",
  interview: "./vendor/avatars/profe-entrevista.glb",
};

/**
 * Monta el profe dentro de `container` y devuelve controles.
 * @param {HTMLElement} container
 * @param {object} [opts] - { size:"sm|md|lg", stageClass } (stageClass = tamaño del canvas 3D)
 * @returns {{ setTalking:(on:boolean)=>void, dispose:()=>void, is3d:boolean }}
 */
export function mountTeacher(container, opts = {}) {
  const pref = getTeacher3d();
  const role = opts.role || "course";

  // Modo ROBOT (default): la mascota SVG de siempre. Cero descarga extra.
  if (pref.mode !== "human") {
    container.appendChild(bymaxMascot(opts.size || "md"));
    return { is3d: false, setTalking: (on) => setBymaxTalking(on), greet: () => {}, dispose: () => {} };
  }

  // Modo HUMANO 3D: canvas con tamaño fijo (el renderer se ajusta al contenedor).
  const stage = el("div", {
    class: "shrink-0 rounded-xl overflow-hidden bg-slate-800/40 " + (opts.stageClass || "w-20 h-24"),
  });
  container.appendChild(stage);

  let inst = null, want = false, disposed = false, robotFallback = false;

  (async () => {
    try {
      const mod = await import("./avatar3d.js");
      if (disposed) return;
      // Prueba en orden: URL del alumno > avatar del rol > profe de curso.
      const candidates = [pref.url, ROLE_AVATARS[role], ROLE_AVATARS.course].filter(Boolean);
      for (const url of candidates) {
        try { inst = await mod.createAvatar3d(stage, { url }); break; }
        catch (err) { console.warn("[teacher3d] no cargo", url, err); }
        if (disposed) return;
      }
      if (!inst) inst = mod.createDemoHead(stage, { gender: pref.gender || "F" });
      if (disposed) { inst.dispose(); inst = null; return; }
      const an = getTtsAnalyser();      // lip-sync REAL por amplitud de la voz
      if (an) inst.attachAnalyser(an);
      if (pref.hairColor) inst.setHairColor(pref.hairColor);
      if (pref.skinTone) inst.setSkinTone(pref.skinTone);
      inst.setEmotion("happy");
      inst.setTalking(want);
    } catch (e) {
      console.error("[teacher3d] fallo al montar el avatar 3D, uso Bymax:", e);
      if (disposed) return;
      robotFallback = true;
      stage.replaceWith(bymaxMascot(opts.size || "md")); // no dejar hueco vacio
    }
  })();

  return {
    is3d: true,
    setTalking: (on) => {
      want = !!on;
      if (inst) inst.setTalking(!!on);
      else if (robotFallback) setBymaxTalking(!!on);
    },
    /** Saludo con la mano + sonrisa (solo avatar 3D humano). */
    greet: () => { if (inst && inst.greet) inst.greet(); },
    dispose: () => { disposed = true; if (inst) { inst.dispose(); inst = null; } },
  };
}
