/**
 * ui/file-text.js — Extrae TEXTO de un archivo de CV (PDF / DOCX / TXT).
 *
 * Todo en el navegador (privacidad: el archivo NUNCA sale del dispositivo salvo
 * el texto que el usuario decida enviar). Las librerias pesadas (pdf.js, mammoth)
 * se cargan BAJO DEMANDA por CDN solo si el usuario sube ese tipo de archivo.
 */

const PDFJS_URL = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.7.76/build/pdf.min.mjs";
const PDFJS_WORKER = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.7.76/build/pdf.worker.min.mjs";
const MAMMOTH_URL = "https://cdn.jsdelivr.net/npm/mammoth@1.8.0/+esm";

const MAX_CHARS = 12000; // recorte de seguridad para el prompt

/**
 * Extrae texto plano de un File.
 * @param {File} file
 * @returns {Promise<string>} texto (recortado). Lanza Error con mensaje claro.
 */
export async function extractTextFromFile(file) {
  const name = (file.name || "").toLowerCase();
  let text = "";
  if (name.endsWith(".pdf")) text = await fromPdf(file);
  else if (name.endsWith(".docx")) text = await fromDocx(file);
  else if (name.endsWith(".txt") || name.endsWith(".md")) text = await file.text();
  else if (name.endsWith(".doc")) {
    throw new Error("Los .doc viejos no se pueden leer. Guardalo como PDF o DOCX (o pega el texto).");
  } else {
    // Ultimo intento: leerlo como texto.
    text = await file.text();
  }
  text = clean(text);
  if (!text) throw new Error("No pude extraer texto del archivo. Prueba con otro formato o pega el texto.");
  return text.slice(0, MAX_CHARS);
}

function clean(t) {
  return String(t || "")
    .replace(/\r/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function fromPdf(file) {
  const pdfjs = await import(/* @vite-ignore */ PDFJS_URL);
  pdfjs.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
  const data = new Uint8Array(await file.arrayBuffer());
  const doc = await pdfjs.getDocument({ data }).promise;
  const parts = [];
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();
    parts.push(content.items.map((it) => it.str).join(" "));
  }
  return parts.join("\n");
}

async function fromDocx(file) {
  const mammoth = await import(/* @vite-ignore */ MAMMOTH_URL);
  const arrayBuffer = await file.arrayBuffer();
  const res = await mammoth.extractRawText({ arrayBuffer });
  return res.value || "";
}
