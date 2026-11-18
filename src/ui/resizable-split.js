/**
 * ui/resizable-split.js — Divisor(es) arrastrable(s) para un layout de 2
 * paneles (lado a lado O apilado, decidido por CSS/orientacion -- ver
 * styles/app.css: .grammar-split). Logica GENERICA de arrastre + limites +
 * persistencia; no sabe nada de Bymax/chat ni de Gramatica -- lo usa
 * features/bymax-session.js para el panel de "Tu guia de clase", pero sirve
 * para cualquier otro layout de 2 paneles que necesite "ajustar margenes"
 * en PC y celular (vertical u horizontal).
 *
 * Arma DOS divisores (uno para el ANCHO, otro para el ALTO) porque el CSS
 * decide CUAL se ve segun orientacion/tamano de pantalla: celular vertical
 * -> apilado -> se ve el de alto; celular horizontal o escritorio -> lado a
 * lado -> se ve el de ancho (ver .grammar-split-handle-h/-v en app.css).
 * Mismo patron de accesibilidad en los dos: arrastre con mouse/touch
 * (Pointer Events, funcionan igual para ambos), flechas de teclado, doble
 * clic para resetear al valor por defecto.
 */
import { el } from "./dom.js";

const PX_STEP = { normal: 16, big: 48 };
const VH_STEP = { normal: 3, big: 8 };

/**
 * @param {object} opts
 * @param {() => HTMLElement} opts.getOverlay - devuelve el elemento donde se
 *   setean las variables CSS (--grammar-sidebar-w/-h). Es una FUNCION (no el
 *   nodo directo) porque el overlay puede no existir todavia cuando se arma
 *   el divisor (orden de construccion del DOM en bymax-session.js).
 * @param {{get: () => number, set: (n:number) => number, limits: {min:number,max:number,default:number}}} opts.width
 *   lee/guarda el ANCHO (px) -- ver ui/prefs.js (getGrammarSidebarWidth...).
 * @param {{get: () => number, set: (n:number) => number, limits: {min:number,max:number,default:number}}} opts.height
 *   lee/guarda el ALTO (vh) -- ver ui/prefs.js (getGrammarSidebarHeight...).
 * @returns {{hHandle: HTMLElement, vHandle: HTMLElement, applyInitial: () => void, destroy: () => void}}
 */
export function attachResizableSplit({ getOverlay, width, height }) {
  let w = width.get();
  let h = height.get();

  // El ancho nunca pasa del 60% de la pantalla -- en un celular angosto en
  // horizontal, un ancho guardado desde la PC (ej. 500px) dejaria el otro
  // panel aplastado. El limite absoluto (width.limits) sigue aplicando
  // ademas de este; se usa el que sea mas chico.
  const applyW = (next) => {
    const cap = Math.floor(window.innerWidth * 0.6);
    w = Math.min(width.limits.max, cap, Math.max(width.limits.min, next));
    getOverlay().style.setProperty("--grammar-sidebar-w", w + "px");
  };
  const applyH = (next) => {
    h = Math.min(height.limits.max, Math.max(height.limits.min, next));
    getOverlay().style.setProperty("--grammar-sidebar-h", h + "vh");
  };

  // --- Divisor del ANCHO (modo lado a lado: escritorio u horizontal) --------
  const hHandle = el("div", {
    class: "grammar-split-handle-h focus:outline focus:outline-2 focus:outline-indigo-400",
    role: "separator", "aria-orientation": "vertical",
    "aria-label": "Arrastra (o usa las flechas izquierda/derecha) para cambiar el ancho de la guia",
    tabindex: "0",
  }, el("span", { class: "w-0.5 h-8 rounded-full bg-slate-600", "aria-hidden": "true" }));

  const onMoveW = (e) => applyW(window.innerWidth - e.clientX);
  const onUpW = () => {
    window.removeEventListener("pointermove", onMoveW);
    window.removeEventListener("pointerup", onUpW);
    document.body.style.cursor = ""; document.body.style.userSelect = "";
    width.set(w); // persiste SOLO al soltar (no en cada pixel arrastrado)
  };
  hHandle.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    document.body.style.cursor = "col-resize"; document.body.style.userSelect = "none";
    window.addEventListener("pointermove", onMoveW);
    window.addEventListener("pointerup", onUpW);
  });
  // Izquierda = panel MAS ancho (mueve el divisor hacia la izquierda) --
  // pedido textual de Joshua.
  hHandle.addEventListener("keydown", (e) => {
    const step = e.shiftKey ? PX_STEP.big : PX_STEP.normal;
    if (e.key === "ArrowLeft") { applyW(w + step); width.set(w); }
    else if (e.key === "ArrowRight") { applyW(w - step); width.set(w); }
    else return;
    e.preventDefault();
  });
  hHandle.addEventListener("dblclick", () => { applyW(width.limits.default); width.set(w); });

  // --- Divisor del ALTO (modo apilado: celular vertical) --------------------
  const vHandle = el("div", {
    class: "grammar-split-handle-v focus:outline focus:outline-2 focus:outline-indigo-400",
    role: "separator", "aria-orientation": "horizontal",
    "aria-label": "Arrastra (o usa las flechas arriba/abajo) para cambiar el alto de la guia",
    tabindex: "0",
  }, el("span", { class: "w-8 h-0.5 rounded-full bg-slate-600", "aria-hidden": "true" }));

  const onMoveH = (e) => applyH(((window.innerHeight - e.clientY) / window.innerHeight) * 100);
  const onUpH = () => {
    window.removeEventListener("pointermove", onMoveH);
    window.removeEventListener("pointerup", onUpH);
    document.body.style.cursor = ""; document.body.style.userSelect = "";
    height.set(h);
  };
  vHandle.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    document.body.style.cursor = "row-resize"; document.body.style.userSelect = "none";
    window.addEventListener("pointermove", onMoveH);
    window.addEventListener("pointerup", onUpH);
  });
  // Arriba = panel MAS alto (mueve el divisor hacia arriba), mismo criterio
  // que el de ancho.
  vHandle.addEventListener("keydown", (e) => {
    const step = e.shiftKey ? VH_STEP.big : VH_STEP.normal;
    if (e.key === "ArrowUp") { applyH(h + step); height.set(h); }
    else if (e.key === "ArrowDown") { applyH(h - step); height.set(h); }
    else return;
    e.preventDefault();
  });
  vHandle.addEventListener("dblclick", () => { applyH(height.limits.default); height.set(h); });

  // Si el dispositivo GIRA (o cambia de tamano) mientras esta abierto, el
  // ancho/alto guardados podrian pasarse de los limites de ESTA pantalla --
  // se recalculan solos, sin que el alumno tenga que arrastrar de nuevo.
  const onViewportChange = () => { applyW(w); applyH(h); };
  window.addEventListener("orientationchange", onViewportChange);
  window.addEventListener("resize", onViewportChange);

  return {
    hHandle, vHandle,
    /** Primer pintado: aplica los valores guardados YA recortados a los
     * limites de ESTA pantalla (llamar una vez que `getOverlay()` ya existe). */
    applyInitial: () => { applyW(w); applyH(h); },
    /** Limpia los listeners globales -- llamar al cerrar quien use esto,
     * si no se queda un listener de `window` colgado para siempre. */
    destroy: () => {
      window.removeEventListener("orientationchange", onViewportChange);
      window.removeEventListener("resize", onViewportChange);
    },
  };
}

/**
 * Mantiene `overlay` ajustado al alto REAL visible (VisualViewport), para que
 * el teclado del celular no lo tape. Los navegadores NO encogen el layout
 * viewport cuando el teclado abre -- un elemento `fixed` se queda clavado a
 * la altura COMPLETA y el teclado se monta ENCIMA, tapando lo de abajo (ej.
 * el input de un chat). El VisualViewport SI reporta el alto REAL visible
 * (se achica de verdad con el teclado abierto); esta funcion lo usa para
 * 1) re-medir `overlay` a ese alto real, y 2) alternar una clase cuando el
 * teclado PROBABLEMENTE este abierto, para que el CSS pueda reaccionar (ver
 * .grammar-split-kb-open en styles/app.css).
 * @param {HTMLElement} overlay - elemento `fixed` (top-0, SIN bottom-0) a
 *   mantener del alto correcto.
 * @param {object} [opts]
 * @param {string} [opts.kbOpenClass] - clase a alternar cuando hay teclado.
 * @param {number} [opts.threshold] - bajo que fraccion del alto normal se
 *   considera "hay teclado" (default 0.75 -- un teclado real se come
 *   35-45%; la barra de direcciones al hacer scroll cambia mucho menos).
 * @returns {() => void} funcion de limpieza (sin VisualViewport, no hace nada).
 */
export function trackVisualViewport(overlay, { kbOpenClass = "kb-open", threshold = 0.75 } = {}) {
  if (!window.visualViewport) return () => {};
  const vv = window.visualViewport;
  const sync = () => {
    overlay.style.height = vv.height + "px";
    overlay.style.top = vv.offsetTop + "px";
    overlay.classList.toggle(kbOpenClass, vv.height < window.innerHeight * threshold);
  };
  sync();
  vv.addEventListener("resize", sync);
  vv.addEventListener("scroll", sync);
  return () => {
    vv.removeEventListener("resize", sync);
    vv.removeEventListener("scroll", sync);
  };
}
