/**
 * ui/practice-end.js — Cierre de un ejercicio DETERMINISTA (los labs).
 *
 * Por que existe: `ui/session-end.js` sabe PINTAR el cierre (felicitar + pedir
 * nivel), pero cada lab tendria que repetir el mismo cableado: leer el nivel
 * guardado de su competencia, llamar al dialogo, persistir lo que eligio el
 * alumno y reiniciar con la nueva dificultad. Seis copias de lo mismo es
 * exactamente lo que veniamos a borrar.
 *
 * Aqui va ese pegamento UNA vez. Un lab solo necesita:
 *
 *   const end = practiceEnd({ skill: "reading", unit, userId });
 *   // ...al terminar:
 *   const again = await end.show({ title, subtitle, pct });
 *   if (again) restart(end.level);   // end.level ya trae el nivel elegido
 *
 * Capa de presentacion: la logica de niveles es pura y vive en core/difficulty.
 */
import { sessionEnd } from "./session-end.js";
import {
  makeSkillKey, getSkillLevel, setSkillLevel, levelFromCefr, levelShape,
} from "../core/difficulty.js";

/**
 * Crea el ayudante de cierre para un ejercicio.
 *
 * @param {object} cfg
 * @param {string} cfg.skill  - competencia (grammar|vocabulary|reading|...)
 * @param {object} [cfg.unit] - unidad; de ella salen idioma y nivel MCER inicial
 * @param {string} [cfg.userId]
 * @returns {{ level:number, shape:object, show:Function }}
 *   - `level` nivel vigente (arranca en el guardado de esa competencia)
 *   - `shape` palancas del nivel (rate, hints, maxOptions...) ya resueltas
 *   - `show(opts)` -> Promise<boolean> true si quiere otra ronda
 */
export function practiceEnd({ skill, unit, userId } = {}) {
  const lang = unit?.language || "en";
  const key = skill ? makeSkillKey(userId, lang, skill) : "";
  // Si nunca eligio nivel en esta competencia, arranca por su nivel MCER.
  const fallback = levelFromCefr(unit?.level);

  const api = {
    level: key ? getSkillLevel(key, fallback) : fallback,
    get shape() { return levelShape(api.level); },

    /**
     * Muestra el cierre y devuelve si el alumno quiere otra ronda.
     * Persiste SIEMPRE el nivel elegido (aunque se vaya): la proxima vez que
     * abra esta competencia, arranca donde lo dejo.
     */
    async show(opts = {}) {
      const { again, level } = await sessionEnd({
        ...opts,
        skill,
        level: api.level,
      });
      api.level = key ? setSkillLevel(key, level) : level;
      return again;
    },
  };

  return api;
}
