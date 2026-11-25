/**
 * core/ja-script.js — Separa KANA/KANJI de ROMAJI en el contenido japones.
 *
 * POR QUE: el contenido japones vive como UN string "texto (romaji)" (vocab,
 * ejemplos de gramatica) o como lineas alternadas kana/romaji (lecturas y
 * dialogos). Joshua pidio que las clases de HABLA/VOCABULARIO muestren el
 * ROMAJI primero (grande, lo que se lee y pronuncia de inmediato) y el kana
 * quede chiquito al lado (referencia pasiva, sin bloquear el avance) -- la
 * Escritura de verdad (leer/escribir kana) se mueve a su propio segmento
 * (ver features/kana-lab.js). Logica PURA y testeable: sin DOM, sin voz.
 *
 * BONUS (bug de audio real): antes el texto COMPLETO "kana (romaji)" se le
 * pasaba al motor de voz, que le quitaba los parentesis pero leia AMBAS
 * partes seguidas con la voz japonesa (kana bien, romaji sonando raro/
 * duplicado). `jaSpeakText()` devuelve SOLO el kana -> arregla eso de paso.
 */

/**
 * Divide "texto (romaji)" en sus dos partes. Si no hay parentesis al final,
 * `romaji` es null (se usa tal cual vino, sin romper nada).
 * @param {string} text
 * @returns {{ jp: string, romaji: string|null }}
 */
export function splitJa(text) {
  const s = String(text ?? "").trim();
  const m = /^(.*?)\s*\(([^()]+)\)\s*$/.exec(s);
  if (!m) return { jp: s, romaji: null };
  return { jp: m[1].trim(), romaji: m[2].trim() };
}

/**
 * Divide un bloque MULTILINEA (lecturas/dialogos) en pares {jp, romaji} por
 * linea logica. El contenido actual mezcla dos convenciones y esta funcion
 * soporta ambas:
 *   1) "texto (romaji)" en la MISMA linea (vocab suelto, lineas de dialogo).
 *   2) una linea en japones seguida de OTRA linea que es el romaji COMPLETO
 *      envuelto en parentesis (parrafos de lectura).
 * Las lineas vacias se conservan (separadores de parrafo) con `blank: true`.
 * @param {string} text
 * @returns {Array<{jp: string, romaji: string|null, blank?: boolean}>}
 */
export function splitJaBlock(text) {
  const lines = String(text ?? "").split("\n");
  const out = [];
  for (const raw of lines) {
    const trimmed = raw.trim();
    if (!trimmed) { out.push({ jp: "", romaji: null, blank: true }); continue; }
    const prev = out[out.length - 1];
    if (/^\(.*\)$/.test(trimmed) && prev && prev.romaji == null && !prev.blank) {
      prev.romaji = trimmed.slice(1, -1).trim();
      continue;
    }
    out.push(splitJa(trimmed));
  }
  return out;
}

/**
 * Texto seguro para TTS: SOLO la parte japonesa, sin importar si el string
 * trae romaji entre parentesis o no. Usar siempre que se hable contenido
 * japones (ver ui/bilingual-term.js: speakSource).
 */
export function jaSpeakText(text) {
  return splitJa(text).jp;
}

/**
 * Empareja un bloque japones (ver splitJaBlock) con su traduccion al espanol,
 * linea por linea (una traduccion por cada entrada NO vacia, en el MISMO
 * orden). Pedido real de un alumno: "no hago nada leyendo japones sin saber
 * que es" -- la lectura necesita el SIGNIFICADO visible, no solo romaji/kana
 * repetidos. Las lineas en blanco se conservan tal cual (separadores).
 * @param {string} text - bloque japones (lesson.content.reading)
 * @param {string[]} [translations] - una por cada linea NO vacia, en orden
 * @returns {Array<{jp: string, romaji: string|null, es?: string, blank?: boolean}>}
 */
export function zipJaReading(text, translations = []) {
  const lines = splitJaBlock(text);
  let i = 0;
  return lines.map((l) => {
    if (l.blank) return l;
    const es = translations[i] || "";
    i++;
    return { ...l, es };
  });
}
