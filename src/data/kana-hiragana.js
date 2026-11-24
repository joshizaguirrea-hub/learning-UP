/**
 * data/kana-hiragana.js — Catalogo de HIRAGANA para el nuevo segmento de
 * Escritura japonesa (features/kana-lab.js), separado del avance tematico.
 *
 * ESCALADO (ver docs/ROADMAP-JAPONES.md, Fase 1): arrancamos con 3 filas
 * (vocales + か + さ) como vertical slice; aqui se completan las 8 filas
 * restantes (た な は ま や ら わ + ん) -- las 46 sonidos base del gojuon.
 * Mismo molde exacto, sin tocar motor (core/kana-lab.js) ni UI
 * (features/kana-lab.js): ambos ya leen este array de forma generica.
 *
 * Pendiente (Fase 1-2 del roadmap, no en este archivo): dakuten/handakuten
 * (が ざ だ ば ぱ...), yoon (きゃ しゃ...) y katakana.
 *
 * Cada caracter: { id, kana, romaji, row, mnemonic, example } -- igual de
 * "pura y testeable" que el resto de data/ (sin DOM, sin red).
 */

export const HIRAGANA = [
  // --- Fila あ (vocales) ---
  { id: "hira-a", kana: "\u3042", romaji: "a", row: "a",
    mnemonic: "Una 'A' estirada con una colita: abre la boca y di '\u00a1Ah!' como sorprendido.",
    example: { term: "\u3042\u3055 (asa)", translation: "ma\u00f1ana" } },
  { id: "hira-i", kana: "\u3044", romaji: "i", row: "a",
    mnemonic: "Dos palitos parados, como dos ojos mirando fijo: 'iii'.",
    example: { term: "\u3044\u306c (inu)", translation: "perro" } },
  { id: "hira-u", kana: "\u3046", romaji: "u", row: "a",
    mnemonic: "Un gancho con una gotita arriba, como si dijeras '\u00a1uuh, que frio!'.",
    example: { term: "\u3046\u307f (umi)", translation: "mar" } },
  { id: "hira-e", kana: "\u3048", romaji: "e", row: "a",
    mnemonic: "Parece la trompa enroscada de un elefante diciendo '\u00bfeh?'.",
    example: { term: "\u3048\u304d (eki)", translation: "estaci\u00f3n (de tren)" } },
  { id: "hira-o", kana: "\u304a", romaji: "o", row: "a",
    mnemonic: "Tiene una colita rizada, como el rabito de un cerdito: 'o-oink'.",
    example: { term: "\u304a\u3061\u3083 (ocha)", translation: "t\u00e9" } },

  // --- Fila か (ka/ki/ku/ke/ko) ---
  { id: "hira-ka", kana: "\u304b", romaji: "ka", row: "ka",
    mnemonic: "Parece una pierna pateando (kick) hacia la derecha: '\u00a1ka!'.",
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
    example: { term: "\u305b\u3093\u305b\u3044 (sensei)", translation: "profesor/a (\u00a1ya la conoces!)" } },
  { id: "hira-so", kana: "\u305d", romaji: "so", row: "sa",
    mnemonic: "Un zigzag como un relampago cruzando el cielo: 'so'.",
    example: { term: "\u305d\u3089 (sora)", translation: "cielo" } },

  // --- Fila た (ta/chi/tsu/te/to) ---
  { id: "hira-ta", kana: "\u305f", romaji: "ta", row: "ta",
    mnemonic: "Una cruz con una ramita doblada: imagina decir '\u00a1ta-da!' al revelar algo.",
    example: { term: "\u305f\u3053 (tako)", translation: "pulpo" } },
  { id: "hira-chi", kana: "\u3061", romaji: "chi", row: "ta",
    mnemonic: "Parece un '5' chueco o una persona agachada: 'chi'.",
    example: { term: "\u3061\u305a (chizu)", translation: "mapa" } },
  { id: "hira-tsu", kana: "\u3064", romaji: "tsu", row: "ta",
    mnemonic: "Parece una ola pequenita (tsunami) curvandose: 'tsu'.",
    example: { term: "\u3064\u304d (tsuki)", translation: "luna" } },
  { id: "hira-te", kana: "\u3066", romaji: "te", row: "ta",
    mnemonic: "Parece un brazo doblado sosteniendo un telefono (telephone): 'te'.",
    example: { term: "\u3066 (te)", translation: "mano (¡la palabra completa!)" } },
  { id: "hira-to", kana: "\u3068", romaji: "to", row: "ta",
    mnemonic: "Parece el dedo gordo de un pie apuntando (toe): 'to'.",
    example: { term: "\u3068\u308a (tori)", translation: "pajaro" } },

  // --- Fila な (na/ni/nu/ne/no) ---
  { id: "hira-na", kana: "\u306a", romaji: "na", row: "na",
    mnemonic: "Parecen dos palitos cruzados clavando un papel a la pared: 'na'.",
    example: { term: "\u306a\u3064 (natsu)", translation: "verano" } },
  { id: "hira-ni", kana: "\u306b", romaji: "ni", row: "na",
    mnemonic: "Parece una rodilla (knee) doblada: 'ni'.",
    example: { term: "\u306b\u304f (niku)", translation: "carne" } },
  { id: "hira-nu", kana: "\u306c", romaji: "nu", row: "na",
    mnemonic: "Parece un fideo (noodle) enroscado con un rulo al final: 'nu'.",
    example: { term: "\u306c\u306e (nuno)", translation: "tela" } },
  { id: "hira-ne", kana: "\u306d", romaji: "ne", row: "na",
    mnemonic: "Parece un gato (neko) con la cola enroscada abajo: 'ne'.",
    example: { term: "\u306d\u3053 (neko)", translation: "gato" } },
  { id: "hira-no", kana: "\u306e", romaji: "no", row: "na",
    mnemonic: "Un solo trazo en espiral, como dibujar la palabra 'no' de un jalon.",
    example: { term: "\u306e\u3069 (nodo)", translation: "garganta" } },

  // --- Fila は (ha/hi/fu/he/ho) ---
  { id: "hira-ha", kana: "\u306f", romaji: "ha", row: "ha",
    mnemonic: "Parece una persona con dos piernas riendo a carcajadas: '\u00a1ha-ha!'.",
    example: { term: "\u306f\u306a (hana)", translation: "flor" } },
  { id: "hira-hi", kana: "\u3072", romaji: "hi", row: "ha",
    mnemonic: "Parece una sonrisa curva o una ceja: '\u00a1hi!' (saludo).",
    example: { term: "\u3072\u3068 (hito)", translation: "persona" } },
  { id: "hira-fu", kana: "\u3075", romaji: "fu", row: "ha",
    mnemonic: "Parece el Monte Fuji con sus laderas curvas: 'fu-fuji'.",
    example: { term: "\u3075\u3086 (fuyu)", translation: "invierno" } },
  { id: "hira-he", kana: "\u3078", romaji: "he", row: "ha",
    mnemonic: "Un solo trazo como un techo puntiagudo: '\u00a1he!' al tropezar.",
    example: { term: "\u3078\u3084 (heya)", translation: "cuarto / habitacion" } },
  { id: "hira-ho", kana: "\u307b", romaji: "ho", row: "ha",
    mnemonic: "Parecida a \u306f pero con una antena extra, como una casa con chimenea.",
    example: { term: "\u307b\u3093 (hon)", translation: "libro" } },

  // --- Fila ま (ma/mi/mu/me/mo) ---
  { id: "hira-ma", kana: "\u307e", romaji: "ma", row: "ma",
    mnemonic: "Parece una mama (mama) con el bebe enroscado en los brazos: 'ma'.",
    example: { term: "\u307e\u3069 (mado)", translation: "ventana" } },
  { id: "hira-mi", kana: "\u307f", romaji: "mi", row: "ma",
    mnemonic: "Parece un '3' curveado, como un caracolito: 'mi'.",
    example: { term: "\u307f\u305a (mizu)", translation: "agua" } },
  { id: "hira-mu", kana: "\u3080", romaji: "mu", row: "ma",
    mnemonic: "Parece la cara de una vaca mugiendo: '\u00a1muu!'.",
    example: { term: "\u3080\u3057 (mushi)", translation: "insecto" } },
  { id: "hira-me", kana: "\u3081", romaji: "me", row: "ma",
    mnemonic: "Parece un ojo (eye) mirando de lado: 'me'.",
    example: { term: "\u3081 (me)", translation: "ojo (¡la palabra completa!)" } },
  { id: "hira-mo", kana: "\u3082", romaji: "mo", row: "ma",
    mnemonic: "Parecida a \u3081 pero con una rayita extra arriba: 'mo'.",
    example: { term: "\u3082\u3082 (momo)", translation: "durazno" } },

  // --- Fila や (ya/yu/yo) ---
  { id: "hira-ya", kana: "\u3084", romaji: "ya", row: "ya",
    mnemonic: "Parece una resortera (slingshot) en forma de 'Y': 'ya'.",
    example: { term: "\u3084\u307e (yama)", translation: "montana" } },
  { id: "hira-yu", kana: "\u3086", romaji: "yu", row: "ya",
    mnemonic: "Parece una taza curva, como el simbolo de aguas termales: 'yu'.",
    example: { term: "\u3086\u304d (yuki)", translation: "nieve" } },
  { id: "hira-yo", kana: "\u3088", romaji: "yo", row: "ya",
    mnemonic: "Parece un gancho con un lazo, como decir '\u00a1yo!' saludando.",
    example: { term: "\u3088\u308b (yoru)", translation: "noche" } },

  // --- Fila ら (ra/ri/ru/re/ro) ---
  { id: "hira-ra", kana: "\u3089", romaji: "ra", row: "ra",
    mnemonic: "Parece un globo (balloon) atado a un palito: 'ra'.",
    example: { term: "\u304b\u3089\u3066 (karate)", translation: "karate (¡ya la conoces!)" } },
  { id: "hira-ri", kana: "\u308a", romaji: "ri", row: "ra",
    mnemonic: "Dos trazos simples como un riachuelo (river) fluyendo: 'ri'.",
    example: { term: "\u308a\u3093\u3054 (ringo)", translation: "manzana" } },
  { id: "hira-ru", kana: "\u308b", romaji: "ru", row: "ra",
    mnemonic: "Un solo trazo en rulo, como una montana rusa (loop): 'ru'.",
    example: { term: "\u3044\u308b (iru)", translation: "haber / estar (cosas vivas)" } },
  { id: "hira-re", kana: "\u308c", romaji: "re", row: "ra",
    mnemonic: "Parecida a \u306d pero sin el rulo final, como un gato estirandose: 're'.",
    example: { term: "\u308c\u3044 (rei)", translation: "cero" } },
  { id: "hira-ro", kana: "\u308d", romaji: "ro", row: "ra",
    mnemonic: "Un camino (road) curveado en espiral: 'ro'.",
    example: { term: "\u3044\u308d (iro)", translation: "color" } },

  // --- Fila わ (wa/wo) + ん ---
  { id: "hira-wa", kana: "\u308f", romaji: "wa", row: "wa",
    mnemonic: "Parece una persona saludando con la mano (wave): 'wa'.",
    example: { term: "\u308f\u305f\u3057 (watashi)", translation: "yo (¡la usas en cada clase!)" } },
  { id: "hira-wo", kana: "\u3092", romaji: "wo", row: "wa",
    mnemonic: "Parecida a \u304a pero mas angulosa -- se usa CASI SIEMPRE sola, como particula.",
    example: { term: "\u307b\u3093\u3092 (hon wo)", translation: "particula de objeto directo (marca lo que se hace)" } },
  { id: "hira-n", kana: "\u3093", romaji: "n", row: "n",
    mnemonic: "Un solo gancho: el UNICO sonido que es pura consonante, sin vocal pegada.",
    example: { term: "\u307b\u3093 (hon)", translation: "libro (\u3093 siempre CIERRA una silaba, nunca la abre)" } },
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

/**
 * MAPA COMPLETO del gojuon (46 sonidos base de hiragana), para la pantalla de
 * FAMILIARIZACION ("como se conforma todo el tema del kana", pedido directo
 * de Joshua) -- el alumno ve la tabla COMPLETA desde el primer dia, aunque
 * solo algunas filas ya tengan practica interactiva (mnemotecnia + ejemplo +
 * quiz, ver HIRAGANA arriba). Las demas se marcan "Proximamente" en la UI
 * (ver features/kana-lab.js) -- nunca se le oculta el panorama completo al
 * alumno, solo se le avisa que fila todavia no se puede practicar a fondo.
 * Fuente separada de HIRAGANA a proposito: esto es solo para DIBUJAR la
 * tabla de referencia, no necesita mnemotecnia/ejemplo por caracter.
 * `null` = casilla que no existe en el gojuon (ej. "yi", "wu", "we").
 */
export const GOJUON_TABLE = [
  { row: "a", label: "\u3042", cells: [
    { kana: "\u3042", romaji: "a" }, { kana: "\u3044", romaji: "i" }, { kana: "\u3046", romaji: "u" },
    { kana: "\u3048", romaji: "e" }, { kana: "\u304a", romaji: "o" },
  ] },
  { row: "ka", label: "\u304b", cells: [
    { kana: "\u304b", romaji: "ka" }, { kana: "\u304d", romaji: "ki" }, { kana: "\u304f", romaji: "ku" },
    { kana: "\u3051", romaji: "ke" }, { kana: "\u3053", romaji: "ko" },
  ] },
  { row: "sa", label: "\u3055", cells: [
    { kana: "\u3055", romaji: "sa" }, { kana: "\u3057", romaji: "shi" }, { kana: "\u3059", romaji: "su" },
    { kana: "\u305b", romaji: "se" }, { kana: "\u305d", romaji: "so" },
  ] },
  { row: "ta", label: "\u305f", cells: [
    { kana: "\u305f", romaji: "ta" }, { kana: "\u3061", romaji: "chi" }, { kana: "\u3064", romaji: "tsu" },
    { kana: "\u3066", romaji: "te" }, { kana: "\u3068", romaji: "to" },
  ] },
  { row: "na", label: "\u306a", cells: [
    { kana: "\u306a", romaji: "na" }, { kana: "\u306b", romaji: "ni" }, { kana: "\u306c", romaji: "nu" },
    { kana: "\u306d", romaji: "ne" }, { kana: "\u306e", romaji: "no" },
  ] },
  { row: "ha", label: "\u306f", cells: [
    { kana: "\u306f", romaji: "ha" }, { kana: "\u3072", romaji: "hi" }, { kana: "\u3075", romaji: "fu" },
    { kana: "\u3078", romaji: "he" }, { kana: "\u307b", romaji: "ho" },
  ] },
  { row: "ma", label: "\u307e", cells: [
    { kana: "\u307e", romaji: "ma" }, { kana: "\u307f", romaji: "mi" }, { kana: "\u3080", romaji: "mu" },
    { kana: "\u3081", romaji: "me" }, { kana: "\u3082", romaji: "mo" },
  ] },
  { row: "ya", label: "\u3084", cells: [
    { kana: "\u3084", romaji: "ya" }, null, { kana: "\u3086", romaji: "yu" }, null, { kana: "\u3088", romaji: "yo" },
  ] },
  { row: "ra", label: "\u3089", cells: [
    { kana: "\u3089", romaji: "ra" }, { kana: "\u308a", romaji: "ri" }, { kana: "\u308b", romaji: "ru" },
    { kana: "\u308c", romaji: "re" }, { kana: "\u308d", romaji: "ro" },
  ] },
  { row: "wa", label: "\u308f", cells: [
    { kana: "\u308f", romaji: "wa" }, null, null, null, { kana: "\u3092", romaji: "wo" },
  ] },
  { row: "n", label: "\u3093", cells: [
    { kana: "\u3093", romaji: "n" },
  ] },
];

/** Filas del gojuon que YA tienen practica interactiva (ver HIRAGANA arriba). */
export function readyRows() {
  return [...new Set(HIRAGANA.map((k) => k.row))];
}
