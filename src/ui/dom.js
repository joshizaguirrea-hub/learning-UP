/**
 * ui/dom.js — Helpers minimos de DOM.
 *
 * Capa de presentacion. Pequenas utilidades para no repetir document.xxx.
 * Nada de logica de negocio aqui.
 */

/** querySelector corto. */
export const qs = (sel, root = document) => root.querySelector(sel);

/** querySelectorAll como array. */
export const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];

/**
 * Crea un elemento con atributos e hijos.
 * @example el("button", { class: "btn", onclick: fn }, "Enviar")
 */
export function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === "class") node.className = value;
    else if (key === "html") node.innerHTML = value;
    else if (key.startsWith("on") && typeof value === "function") {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (value !== null && value !== undefined) {
      node.setAttribute(key, value);
    }
  }
  for (const child of children.flat()) {
    if (child == null) continue;
    node.append(child.nodeType ? child : document.createTextNode(String(child)));
  }
  return node;
}

/** Reemplaza el contenido de un contenedor por un nodo. */
export function mount(container, node) {
  container.replaceChildren(node);
}
