/**
 * features/cv-document.js - Convierte el texto del CV en un DOCUMENTO.
 *
 * POR QUE EXISTE
 * --------------
 * El coach entregaba el CV como texto plano dentro de un <pre>, con un boton
 * "Descargar .txt". Nadie manda un .txt a un reclutador. El contenido era
 * bueno pero el entregable no servia: el usuario tenia que copiarlo a Word y
 * maquetarlo a mano, que es justo el trabajo que venia a evitar.
 *
 * Ahora el mismo texto se parsea en secciones y se pinta como un CV de
 * verdad, con dos salidas:
 *   - Imprimir / Guardar como PDF  (dialogo nativo del navegador)
 *   - Descargar .doc               (lo abre Word y se puede editar)
 *
 * SIN LIBRERIAS. Un generador de PDF pesa cientos de KB y esta app carga como
 * modulos sueltos sin empaquetador. window.print() sobre un HTML bien hecho da
 * un PDF identico, pesa cero y funciona offline.
 *
 * POR QUE PARSEAR EN VEZ DE PEDIR JSON
 * ------------------------------------
 * Seria tentador pedirle JSON a la IA, pero un modelo saturado devuelve JSON
 * roto y entonces no hay CV. El texto plano SIEMPRE se puede mostrar: si el
 * parser no reconoce una seccion, cae a parrafo y el usuario igual tiene su
 * contenido. Degradar a feo es aceptable; degradar a nada, no.
 */

import { el } from "../ui/dom.js";

/**
 * Traduce un error tecnico a algo accionable.
 *
 * La pantalla mostraba el JSON crudo del proveedor:
 *   {"error":{"code":503,"message":"This model is currently experiencing high
 *   demand","status":"UNAVAILABLE"}}
 * Eso no le dice a nadie que basta con reintentar en un minuto. Peor: parece
 * que la app se rompio, cuando el servicio del otro lado solo esta ocupado.
 */
export function mensajeError(error) {
  const txt = String(error || "");
  if (/503|UNAVAILABLE|high demand|overload/i.test(txt)) {
    return "El servicio de IA esta saturado ahora mismo. Espera un minuto y " +
      "vuelve a pulsar el boton: tu texto sigue aqui.";
  }
  if (/429|rate|quota|limite/i.test(txt)) {
    return "Demasiadas peticiones seguidas. Espera un momento y reintenta.";
  }
  if (/red|network|fetch|conexion/i.test(txt)) {
    return "Sin conexion con el servicio. Revisa tu internet y reintenta.";
  }
  return "No pude generarlo ahora. Vuelve a intentarlo en un momento.";
}

// Encabezados que la IA usa (CV_PROMPT pide MAYUSCULAS). Se detectan por
// contenido, no por posicion: el orden puede variar entre respuestas.
const SECCIONES = [
  "PROFESSIONAL SUMMARY", "SUMMARY", "PROFILE",
  "CORE SKILLS", "SKILLS", "TECHNICAL SKILLS", "KEY SKILLS",
  "PROFESSIONAL EXPERIENCE", "EXPERIENCE", "WORK EXPERIENCE", "EMPLOYMENT",
  "EDUCATION", "CERTIFICATIONS", "CERTIFICATES", "LANGUAGES",
  "EXTRAS", "ADDITIONAL INFORMATION", "PROJECTS", "ACHIEVEMENTS",
];

/** True si la linea es un titulo de seccion. */
function esSeccion(linea) {
  const limpia = linea.replace(/[:\s]+$/, "").trim();
  if (limpia.length > 42) return false;           // un parrafo, no un titulo
  const up = limpia.toUpperCase();
  if (SECCIONES.includes(up)) return true;
  // Heuristica: linea corta, TODO EN MAYUSCULAS, sin terminar en punto.
  return limpia.length > 2 && limpia === up && /^[A-Z][A-Z\s&/-]+$/.test(limpia);
}

/** True si la linea es una vineta. */
function esVineta(linea) {
  return /^\s*[-•*\u2022]\s+/.test(linea);
}

/**
 * Parte el texto de la IA en: cabecera, secciones y notas en espanol.
 * @returns {{nombre, headline, contacto: string[], secciones: Array, notas: string[]}}
 */
export function parseCv(texto) {
  const lineas = String(texto).split("\n").map((l) => l.trimEnd());

  // Las "Notas:" en espanol van al final y NO son parte del CV: se separan
  // para no imprimirlas en el documento que ve el reclutador.
  const iNotas = lineas.findIndex((l) => /^notas\s*:?\s*$/i.test(l.trim()));
  const cuerpo = iNotas >= 0 ? lineas.slice(0, iNotas) : lineas;
  const notas = iNotas >= 0
    ? lineas.slice(iNotas + 1).filter((l) => l.trim()).map((l) => l.replace(/^[-•*]\s*/, ""))
    : [];

  // Cabecera: todo lo anterior a la primera seccion.
  const iPrimera = cuerpo.findIndex(esSeccion);
  const cabecera = (iPrimera > 0 ? cuerpo.slice(0, iPrimera) : cuerpo.slice(0, 4))
    .filter((l) => l.trim());

  const nombre = cabecera[0] || "[Tu nombre]";
  const headline = cabecera[1] || "";
  const contacto = cabecera.slice(2);

  // Secciones.
  const secciones = [];
  let actual = null;
  for (const linea of (iPrimera >= 0 ? cuerpo.slice(iPrimera) : [])) {
    if (esSeccion(linea)) {
      actual = { titulo: linea.replace(/[:\s]+$/, "").trim(), bloques: [] };
      secciones.push(actual);
    } else if (actual && linea.trim()) {
      actual.bloques.push({
        tipo: esVineta(linea) ? "vineta" : "texto",
        texto: linea.replace(/^\s*[-•*\u2022]\s+/, "").trim(),
      });
    }
  }

  return { nombre, headline, contacto, secciones, notas };
}

/** CSS del documento. Pensado para que al imprimir salga un A4 decente. */
const ESTILOS = `
  * { box-sizing: border-box; }
  body { margin: 0; padding: 0; background: #fff; color: #1a1a1a;
         font-family: Georgia, "Times New Roman", serif; font-size: 10.5pt;
         line-height: 1.38; }
  .hoja { max-width: 8.5in; margin: 0 auto; padding: 0.5in 0.6in; }
  .nombre { font-size: 20pt; font-weight: 700; letter-spacing: .3px; margin: 0; }
  .headline { font-size: 11pt; color: #444; margin: 1px 0 0; font-style: italic; }
  .contacto { font-size: 9.5pt; color: #333; margin: 5px 0 0;
              border-bottom: 1.5px solid #222; padding-bottom: 6px; }
  h2 { font-size: 10.5pt; text-transform: uppercase; letter-spacing: 1px;
       border-bottom: 1px solid #999; padding-bottom: 2px;
       margin: 11px 0 5px; font-weight: 700; }
  p { margin: 3px 0; text-align: justify; }
  ul { margin: 3px 0 3px 15px; padding: 0; }
  li { margin: 1.5px 0; }

  /* SKILLS A DOS COLUMNAS. Son lineas cortas (3-6 palabras): en una sola
   * columna dejan media hoja de blanco a la derecha y empujan la experiencia
   * -- lo importante -- fuera de la primera pagina. El reclutador escanea el
   * CV en segundos, asi que lo que mas pesa debe caber arriba. */
  ul.cols { columns: 2; column-gap: 26px; margin-left: 15px; }
  ul.cols li { break-inside: avoid; }

  /* PAGINACION.
   * Antes habia "section { break-inside: avoid }", que obliga a que la
   * seccion entera quepa en la pagina. "Professional Experience" con varios
   * empleos mide mas que el hueco restante casi siempre, asi que saltaba
   * COMPLETA a la hoja siguiente y dejaba medio folio en blanco.
   *
   * OJO: aqui NO se pueden usar backticks. Este comentario vive DENTRO del
   * template literal ESTILOS, y un backtick lo cierra antes de tiempo: el
   * archivo entero deja de parsear. Me paso al escribir este mismo aviso.
   *
   * Lo correcto es dejar que el contenido fluya y proteger solo lo pequeno:
   * que un titulo no quede solo al final de la pagina (orphans/widows) y que
   * una vineta no se parta por la mitad. */
  h2 { break-after: avoid; page-break-after: avoid; }
  li { break-inside: avoid; page-break-inside: avoid; }
  p { orphans: 2; widows: 2; }

  @media print {
    @page { margin: 0.5in; size: letter; }
    .hoja { padding: 0; max-width: none; }
    .no-print { display: none !important; }
  }
`;

/** Escapa texto para meterlo en HTML sin romper nada. */
function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

/** Construye el HTML del CV (sin las notas: esas son para el candidato). */
export function cvToHtml(cv, { conEstilos = true } = {}) {
  const partes = [];
  partes.push(`<div class="hoja">`);
  partes.push(`<h1 class="nombre">${esc(cv.nombre)}</h1>`);
  if (cv.headline) partes.push(`<p class="headline">${esc(cv.headline)}</p>`);
  if (cv.contacto.length) {
    partes.push(`<p class="contacto">${cv.contacto.map(esc).join(" &nbsp;|&nbsp; ")}</p>`);
  }

  for (const s of cv.secciones) {
    partes.push(`<section><h2>${esc(s.titulo)}</h2>`);
    // Las skills van a dos columnas: son lineas cortas y en una sola columna
    // desperdician media hoja. Solo si son varias y de verdad cortas; una
    // seccion con frases largas a dos columnas se lee fatal.
    const vinetas = s.bloques.filter((b) => b.tipo === "vineta");
    const esListaCorta = /SKILL|COMPETEN|LANGUAGE|IDIOMA|CERTIFIC/i.test(s.titulo) &&
      vinetas.length >= 4 &&
      vinetas.every((b) => b.texto.length <= 60);
    const claseUl = esListaCorta ? ' class="cols"' : "";

    let enLista = false;
    for (const b of s.bloques) {
      if (b.tipo === "vineta") {
        if (!enLista) { partes.push(`<ul${claseUl}>`); enLista = true; }
        partes.push(`<li>${esc(b.texto)}</li>`);
      } else {
        if (enLista) { partes.push("</ul>"); enLista = false; }
        partes.push(`<p>${esc(b.texto)}</p>`);
      }
    }
    if (enLista) partes.push("</ul>");
    partes.push("</section>");
  }
  partes.push("</div>");

  const cuerpo = partes.join("\n");
  if (!conEstilos) return cuerpo;
  return `<!DOCTYPE html><html><head><meta charset="utf-8">` +
    `<title>${esc(cv.nombre)} - CV</title><style>${ESTILOS}</style></head>` +
    `<body>${cuerpo}</body></html>`;
}

/**
 * Abre el dialogo de impresion con el CV maquetado.
 * El usuario elige "Guardar como PDF" y tiene su documento.
 */
export function printCv(cv) {
  // iframe oculto en vez de window.open(): los bloqueadores de popups matan
  // las ventanas nuevas sin avisar, y el usuario solo veria que no pasa nada.
  const marco = el("iframe", {
    style: "position:fixed;right:0;bottom:0;width:0;height:0;border:0;",
    "aria-hidden": "true",
  });
  document.body.appendChild(marco);

  const doc = marco.contentDocument;
  doc.open();
  doc.write(cvToHtml(cv));
  doc.close();

  // Espera a que el iframe pinte antes de imprimir; si no, sale en blanco.
  marco.onload = () => {
    marco.contentWindow.focus();
    marco.contentWindow.print();
    // Se quita despues: si se borra ya, el dialogo se cierra solo.
    setTimeout(() => marco.remove(), 1000);
  };
}

/**
 * Descarga el CV como .doc (HTML que Word abre y deja editar).
 *
 * No es un .docx real (eso necesita ZIP + XML, o sea una libreria). Word,
 * LibreOffice y Google Docs abren este formato sin rechistar desde hace
 * decadas, y asi el usuario puede retocar antes de enviar.
 */
export function downloadCvDoc(cv) {
  const html = `<!DOCTYPE html><html xmlns:w="urn:schemas-microsoft-com:office:word">` +
    `<head><meta charset="utf-8"><title>${esc(cv.nombre)} - CV</title>` +
    `<style>${ESTILOS}</style></head><body>${cvToHtml(cv, { conEstilos: false })}</body></html>`;

  const blob = new Blob(["\ufeff", html], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const a = el("a", {
    href: url,
    download: (cv.nombre || "CV").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "_") + "_CV.doc",
  });
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
