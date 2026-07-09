/**
 * ui/radar.js — Grafico de radar (araña) en SVG puro. Sin dependencias.
 *
 * Devuelve un string SVG para incrustar con el atributo `html` de `el`.
 * Ideal para mostrar el dominio de las 6 competencias de un vistazo.
 */

/**
 * @param {Array<{label:string, value:number}>} items - value en 0..100
 * @param {object} [opts]
 * @returns {string} SVG
 */
export function radarSvg(items, opts = {}) {
  const size = opts.size || 260;
  const pad = opts.pad || 34; // espacio para etiquetas
  const c = size / 2;
  const r = c - pad;
  const n = items.length;
  const angle = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const pt = (i, radius) => [c + radius * Math.cos(angle(i)), c + radius * Math.sin(angle(i))];

  // Anillos de referencia (25/50/75/100%).
  let grid = "";
  for (const frac of [0.25, 0.5, 0.75, 1]) {
    const poly = items.map((_, i) => pt(i, r * frac).map((v) => v.toFixed(1)).join(",")).join(" ");
    grid += `<polygon points="${poly}" fill="none" stroke="#334155" stroke-width="1"/>`;
  }

  // Ejes + etiquetas.
  let axes = "";
  items.forEach((it, i) => {
    const [x, y] = pt(i, r);
    axes += `<line x1="${c}" y1="${c}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#334155" stroke-width="1"/>`;
    const [lx, ly] = pt(i, r + 16);
    const anchor = lx < c - 5 ? "end" : lx > c + 5 ? "start" : "middle";
    axes += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" fill="#cbd5e1" font-size="10" ` +
      `text-anchor="${anchor}" dominant-baseline="middle">${escapeXml(it.label)}</text>`;
  });

  // Poligono de datos.
  const dataPoly = items
    .map((it, i) => pt(i, r * Math.max(0, Math.min(100, it.value)) / 100).map((v) => v.toFixed(1)).join(","))
    .join(" ");
  const data = `<polygon points="${dataPoly}" fill="rgba(129,140,248,0.35)" stroke="#818cf8" stroke-width="2"/>`;

  // Puntos de datos.
  let dots = "";
  items.forEach((it, i) => {
    const [x, y] = pt(i, r * Math.max(0, Math.min(100, it.value)) / 100);
    dots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="#c7d2fe"/>`;
  });

  return `<svg viewBox="0 0 ${size} ${size}" width="100%" height="100%" role="img" ` +
    `aria-label="Radar de competencias">${grid}${axes}${data}${dots}</svg>`;
}

function escapeXml(s) {
  return String(s).replace(/[<>&]/g, (ch) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[ch]));
}
