/**
 * data/kana-hiragana.js — Catalogo de HIRAGANA para el nuevo segmento de
 * Escritura japonesa (features/kana-lab.js), separado del avance tematico.
 *
 * VERTICAL SLICE (ver docs/PEDAGOGIA.md seccion 7 y docs/ROADMAP-JAPONES.md):
 * arrancamos con las primeras 3 filas del gojuon (vocales + か + さ = 15
 * caracteres) para validar el patron completo -- mnemotecnia + ejemplo +
 * SRS + quiz -- ANTES de escalar a las 7 filas restantes, dakuten/handakuten,
 * yoon, katakana y kanji basico. Escalar despues es solo agregar datos aqui
 * (mismo molde), sin tocar motor ni UI.
 *
 * Cada caracter: { id, kana, romaji, row, mnemonic, example } -- igual de
 * "pura y testeable" que el resto de data/ (sin DOM, sin red).
 */

export const HIRAGANA = [
  // --- Fila あ (vocales) ---
  { id: "hira-a", kana: "\u3042", romaji: "a", row: "a",
    mnemonic: "Una 'A' estirada con una colita: abre la boca y di '¡Ah!' como sorprendido.",
    example: { term: "\u3042\u3055 (asa)", translation: "ma\u00f1ana" } },
  { id: "hira-i", kana: "\u3044", romaji: "i", row: "a",
    mnemonic: "Dos palitos parados, como dos ojos mirando fijo: 'iii'.",
    example: { term: "\u3044\u306c (inu)", translation: "perro" } },
  { id: "hira-u", kana: "\u3046", romaji: "u", row: "a",
    mnemonic: "Un gancho con una gotita arriba, como si dijeras '¡uuh, que frio!'.",
    example: { term: "\u3046\u307f (umi)", translation: "mar" } },
  { id: "hira-e", kana: "\u3048", romaji: "e", row: "a",
    mnemonic: "Parece la trompa enroscada de un elefante diciendo '¿eh?'.",
    example: { term: "\u3048\u304d (eki)", translation: "estaci\u00f3n (de tren)" } },
  { id: "hira-o", kana: "\u304a", romaji: "o", row: "a",
    mnemonic: "Tiene una colita rizada, como el rabito de un cerdito: 'o-oink'.",
    example: { term: "\u304a\u3061\u3083 (ocha)", translation: "t\u00e9" } },

  // --- Fila か (ka/ki/ku/ke/ko) ---
  { id: "hira-ka", kana: "\u304b", romaji: "ka", row: "ka",
    mnemonic: "Parece una pierna pateando (kick) hacia la derecha: '¡ka!'.",
    example: { term: "\u304b\u3055 (kasa)", translation: "paraguas" } },
  { id: "hira-ki", kana: "\u304d", romaji: "ki", row: "ka",
    mnemonic: "Tiene dientes como una llave (key) de verdad.",
    example: { term: "\u304d\u3044\u308d (kiiro)", translation: "amarillo" } },
  { id: "hira-ku", kana: "\u304f", romaji: "ku", row: "ka",
    mnemonic: "Un angulo abierto, como una boca tipo Pacman diciendo 'ku'.",
    example: { term: "\u304f\u308b\u307e (kuruma)", translation: "carro / auto" } },
  { id: "hira-ke", kana: "\u3051", romaji: "ke", row: "ka",
    mnemonic: "Parecida a \u304b pero con una pierna extra: alguien pateando dos veces.",
    example: { term: "\u3051\u3055 (kesa)", translation: "esta ma\u00f1ana" } },
  { id: "hira-ko", kana: "\u3053", romaji: "ko", row: "ka",
    mnemonic: "Dos palitos horizontales apilados, como dos 'cocos' chiquitos.",
    example: { term: "\u3053\u3069\u3082 (kodomo)", translation: "ni\u00f1o/a" } },

  // --- Fila さ (sa/shi/su/se/so) ---
  { id: "hira-sa", kana: "\u3055", romaji: "sa", row: "sa",
    mnemonic: "Parece unas tijeras (scissors) a medio cortar: 'sa'.",
    example: { term: "\u3055\u304b\u306a (sakana)", translation: "pescado" } },
  { id: "hira-shi", kana: "\u3057", romaji: "shi", row: "sa",
    mnemonic: "Un solo gancho curvo, como un anzuelo de pescar: 'shi-shh'.",
    example: { term: "\u3057\u308d (shiro)", translation: "blanco" } },
  { id: "hira-su", kana: "\u3059", romaji: "su", row: "sa",
    mnemonic: "Un remolino, como un caracol enroscandose: 'su'.",
    example: { term: "\u3059\u3057 (sushi)", translation: "sushi" } },
  { id: "hira-se", kana: "\u305b", romaji: "se", row: "sa",
    mnemonic: "Parece un cierre (zipper) a medio cerrar: 'se'.",
    example: { term: "\u305b\u3093\u305b\u3044 (sensei)", translation: "profesor/a (¡ya la conoces!)" } },
  { id: "hira-so", kana: "\u305d", romaji: "so", row: "sa",
    mnemonic: "Un zigzag como un relampago cruzando el cielo: 'so'.",
    example: { term: "\u305d\u3089 (sora)", translation: "cielo" } },
];

/** Agrupa el catalogo por fila (para el selector de lotes en la UI). */
export function hiraganaByRow() {
  const map = new Map();
  for (const k of HIRAGANA) {
    if (!map.has(k.row)) map.set(k.row, []);
    map.get(k.row).push(k);
  }
  return map;
}

/** Busca un caracter por id (o null). */
export function hiraganaById(id) {
  return HIRAGANA.find((k) => k.id === id) || null;
}
