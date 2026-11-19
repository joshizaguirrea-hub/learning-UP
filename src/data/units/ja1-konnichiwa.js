/**
 * data/units/ja1-konnichiwa.js — Unidad A1 japones "こんにちは!" (saludos +
 * el verbo です/desu, equivalente a "ser/estar" para identidad).
 *
 * Datos PUROS. Mismo esquema que las unidades de ingles/portugues/italiano/
 * frances (1 leccion = 1 competencia). Convencion para el japones (sin
 * alfabeto latino): cada termino/ejemplo va en JAPONES (hiragana, sin kanji
 * en A1 -- es prematuro) seguido del romaji entre parentesis, y la
 * traduccion en espanol por separado (mismo campo `translation`/`tr` que ya
 * usan los demas idiomas). El motor de voz (ui/speech.js) lee el string
 * completo: el romaji entre parentesis lo ignora el oido pero ayuda al ojo
 * del alumno que apenas aprende a leer hiragana.
 *
 * NOTA PEDAGOGICA (vale la pena saberlo al escalar este patron a mas
 * unidades): a diferencia de "to be"/"essere"/"etre", です (desu) NO se
 * conjuga por persona -- es igual para yo/tu/el/nosotros/ellos. Lo que SI
 * cambia (y es el verdadero punto gramatical de esta unidad) es la
 * particula は (wa), que marca el TEMA de la frase. Por eso el cuadro de
 * `grammar.examples` muestra el patron [TEMA] + は + [identidad] + です,
 * no una tabla de conjugaciones como en los otros 3 idiomas.
 */

export const JA1_KONNICHIWA = {
  id: "ja1-konnichiwa",
  language: "ja",
  level: "A1",
  title: "\u3053\u3093\u306b\u3061\u306f! (Konnichiwa!)",
  subtitle: "Saludar, presentarte y usar \u3067\u3059 (desu) para decir quien eres",

  cando: [
    "Puedo saludar y despedirme en japones.",
    "Puedo presentarme y decir mi nombre, mi nacionalidad y mi ocupacion.",
    "Puedo usar \u3067\u3059 (desu) con la particula \u306f (wa) en frases simples.",
    "Puedo preguntar y responder datos personales basicos.",
  ],

  vocab: [
    { id: "ja1k-1", term: "\u3053\u3093\u306b\u3061\u306f (Konnichiwa)", translation: "hola (durante el dia)", example: "\u3053\u3093\u306b\u3061\u306f\u3001\u304a\u3052\u3093\u304d\u3067\u3059\u304b\u3002(Konnichiwa, o-genki desu ka?)" },
    { id: "ja1k-2", term: "\u3055\u3088\u3046\u306a\u3089 (Say\u014dnara)", translation: "adios", example: "\u3055\u3088\u3046\u306a\u3089\u3001\u307e\u305f\u3042\u3057\u305f\u3002(Say\u014dnara, mata ashita.)" },
    { id: "ja1k-3", term: "\u304a\u306f\u3088\u3046\u3054\u3056\u3044\u307e\u3059 (Ohay\u014d gozaimasu)", translation: "buenos dias (formal)", example: "\u304a\u306f\u3088\u3046\u3054\u3056\u3044\u307e\u3059\u3001\u305b\u3093\u305b\u3044\u3002(Ohay\u014d gozaimasu, sensei.)" },
    { id: "ja1k-4", term: "\u3053\u3093\u3070\u3093\u306f (Konbanwa)", translation: "buenas tardes/noches (al saludar)", example: "\u3053\u3093\u3070\u3093\u306f\u3001\u307f\u306a\u3055\u3093\u3002(Konbanwa, minasan.)" },
    { id: "ja1k-5", term: "\u304a\u3084\u3059\u307f\u306a\u3055\u3044 (Oyasuminasai)", translation: "buenas noches (al dormir)", example: "\u304a\u3084\u3059\u307f\u306a\u3055\u3044\u3001\u307e\u305f\u3042\u3057\u305f\u3002(Oyasuminasai, mata ashita.)" },
    { id: "ja1k-6", term: "\u306f\u3058\u3081\u307e\u3057\u3066 (Hajimemashite)", translation: "mucho gusto (al conocer a alguien)", example: "\u306f\u3058\u3081\u307e\u3057\u3066\u3001\u30a2\u30e4\u3067\u3059\u3002(Hajimemashite, Aya desu.)" },
    { id: "ja1k-7", term: "\u304a\u306d\u304c\u3044\u3057\u307e\u3059 (Onegaishimasu)", translation: "por favor", example: "\u3053\u3061\u3089\u3092\u3001\u304a\u306d\u304c\u3044\u3057\u307e\u3059\u3002(Kochira o, onegaishimasu.)" },
    { id: "ja1k-8", term: "\u3042\u308a\u304c\u3068\u3046\u3054\u3056\u3044\u307e\u3059 (Arigat\u014d gozaimasu)", translation: "gracias (formal)", example: "\u3042\u308a\u304c\u3068\u3046\u3054\u3056\u3044\u307e\u3059\uff01(Arigat\u014d gozaimasu!)" },
    { id: "ja1k-9", term: "\u306a\u307e\u3048 (namae)", translation: "nombre", example: "\u304a\u306a\u307e\u3048\u306f\uff1f(O-namae wa?)" },
    { id: "ja1k-10", term: "\u3068\u3082\u3060\u3061 (tomodachi)", translation: "amigo/a", example: "\u3053\u308c\u306f\u308f\u305f\u3057\u306e\u3068\u3082\u3060\u3061\u3067\u3059\u3002(Kore wa watashi no tomodachi desu.)" },
    { id: "ja1k-11", term: "\u305b\u3093\u305b\u3044 (sensei)", translation: "profesor/a (maestro/a)", example: "\u3042\u306e\u4eba\u306f\u305b\u3093\u305b\u3044\u3067\u3059\u3002(Ano hito wa sensei desu.)" },
    { id: "ja1k-12", term: "\u304a\u3052\u3093\u304d\u3067\u3059\u304b (O-genki desu ka?)", translation: "como estas?", example: "\u3053\u3093\u306b\u3061\u306f\u3001\u304a\u3052\u3093\u304d\u3067\u3059\u304b\u3002(Konnichiwa, o-genki desu ka?)" },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "ja1k-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: \u3042\u3044\u3055\u3064\u3068 \u3058\u3053\u3057\u3087\u3046\u304b\u3044 (saludos y presentaciones)",
      intro: "Competencia de LECTURA. Lee DOS textos en japones (con romaji de apoyo) y responde las preguntas.",
      content: {
        reading:
          "\u3076\u3093\u3057\u3087\u3046 1 - \u3042\u3084\u3055\u3093 (Aya-san)\n" +
          "\u306f\u3058\u3081\u307e\u3057\u3066\u3002\u308f\u305f\u3057\u306f\u3042\u3084\u3067\u3059\u3002\u306b\u307b\u3093\u3058\u3093\u3067\u3059\u3002\u304c\u304f\u305b\u3044\u3067\u3059\u3002\n" +
          "(Hajimemashite. Watashi wa Aya desu. Nihonjin desu. Gakusei desu.)\n" +
          "\u3053\u308c\u306f\u30c8\u30e0\u3055\u3093\u3067\u3059\u3002\u30c8\u30e0\u3055\u3093\u306f\u30ab\u30ca\u30c0\u3058\u3093\u3067\u3059\u3002\u305b\u3093\u305b\u3044\u3067\u3059\u3002\n" +
          "(Kore wa Tomu-san desu. Tomu-san wa Kanada-jin desu. Sensei desu.)\n" +
          "\u3069\u3046\u305e\u3088\u308d\u3057\u304f\u3002\n" +
          "(D\u014dzo yoroshiku.)\n\n" +
          "\u3076\u3093\u3057\u3087\u3046 2 - \u307f\u3058\u304b\u3044\u306a \u304b\u3044\u308f (un dialogo corto)\n" +
          "A: \u3053\u3093\u306b\u3061\u306f\u3002\u304a\u3052\u3093\u304d\u3067\u3059\u304b\u3002(Konnichiwa. O-genki desu ka.)\n" +
          "B: \u3052\u3093\u304d\u3067\u3059\u3002\u3042\u308a\u304c\u3068\u3046\u3054\u3056\u3044\u307e\u3059\u3002\u3042\u306a\u305f\u306f\uff1f(Genki desu. Arigat\u014d gozaimasu. Anata wa?)\n" +
          "A: \u308f\u305f\u3057\u3082\u3052\u3093\u304d\u3067\u3059\u3002\u304a\u306a\u307e\u3048\u306f\uff1f(Watashi mo genki desu. O-namae wa?)\n" +
          "B: \u308f\u305f\u3057\u306f\u30de\u30ea\u30a2\u3067\u3059\u3002\u30b9\u30da\u30a4\u30f3\u3058\u3093\u3067\u3059\u3002(Watashi wa Maria desu. Supein-jin desu.)\n" +
          "A: \u306f\u3058\u3081\u307e\u3057\u3066\u3001\u30de\u30ea\u30a2\u3055\u3093\u3002(Hajimemashite, Maria-san.)\n" +
          "B: \u306f\u3058\u3081\u307e\u3057\u3066\u3002(Hajimemashite.)",
        glossary: [
          { term: "\u306f\u3058\u3081\u307e\u3057\u3066 (hajimemashite)", translation: "mucho gusto" },
          { term: "\u308f\u305f\u3057\u306f (watashi wa)", translation: "yo (+ tema)" },
          { term: "\u3067\u3059 (desu)", translation: "soy / es / son (identidad)" },
          { term: "\u306b\u307b\u3093\u3058\u3093 (nihonjin)", translation: "japones/a (nacionalidad)" },
          { term: "\u304c\u304f\u305b\u3044 (gakusei)", translation: "estudiante" },
          { term: "\u3053\u308c\u306f (kore wa)", translation: "esto es / este es" },
          { term: "\u305b\u3093\u305b\u3044 (sensei)", translation: "profesor/a" },
          { term: "\u3069\u3046\u305e\u3088\u308d\u3057\u304f (d\u014dzo yoroshiku)", translation: "un gusto (saludo cortes)" },
          { term: "\u304a\u306a\u307e\u3048\u306f\uff1f (o-namae wa?)", translation: "como te llamas? (lit. 'tu nombre?')" },
        ],
        keyPhrases: [
          "Busca el patron en cada frase: [nombre/tema] + \u306f (wa) + [nacionalidad u ocupacion] + \u3067\u3059 (desu).",
          "En japones el verbo NO cambia segun quien habla: \u3067\u3059 es igual para 'yo', 'tu', 'el' o 'ellos'.",
        ],
        check: [
          { prompt: "\u3076\u3093\u3057\u3087\u3046 1: \u3042\u3084\u3055\u3093\u306f \u306b\u307b\u3093\u3058\u3093\u3067\u3059\u304b\u3002(Aya-san wa nihonjin desu ka?)", choices: ["\u306f\u3044\u3001\u306b\u307b\u3093\u3058\u3093\u3067\u3059 (si, japonesa)", "\u3044\u3044\u3048\u3001\u30ab\u30ca\u30c0\u3058\u3093\u3067\u3059 (no, canadiense)", "\u305b\u3093\u305b\u3044\u3067\u3059 (es profesora)"], answer: 0 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 1: \u3042\u3084\u3055\u3093\u306e \u3057\u3054\u3068\u306f\uff1f(Cual es la ocupacion de Aya?)", choices: ["\u305b\u3093\u305b\u3044 (profesora)", "\u304c\u304f\u305b\u3044 (estudiante)", "\u3068\u3082\u3060\u3061 (amiga)"], answer: 1 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 1: \u30c8\u30e0\u3055\u3093\u306f \u3069\u3053\u306e \u4eba\u3067\u3059\u304b\u3002(De donde es Tom?)", choices: ["\u65e5\u672c (Japon)", "\u30ab\u30ca\u30c0 (Canada)", "\u30b9\u30da\u30a4\u30f3 (Espana)"], answer: 1 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 2: B\u3055\u3093\u306e \u306a\u307e\u3048\u306f\uff1f(Como se llama la persona B?)", choices: ["\u3042\u3084 (Aya)", "\u307e\u308a\u3042 (Maria)", "\u3068\u3080 (Tom)"], answer: 1 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 2: \u30de\u30ea\u30a2\u3055\u3093\u306f \u3069\u3053\u306e \u4eba\u3067\u3059\u304b\u3002(De donde es Maria?)", choices: ["\u65e5\u672c (Japon)", "\u30b9\u30da\u30a4\u30f3 (Espana)", "\u30ab\u30ca\u30c0 (Canada)"], answer: 1 },
          { prompt: "\u3076\u3093\u3057\u3087\u3046 2: \u304b\u3044\u308f\u306f \u3069\u3046 \u304a\u308f\u308a\u307e\u3059\u304b\u3002(Como termina el dialogo?)", choices: ["\u3042\u308a\u304c\u3068\u3046 (gracias)", "\u306f\u3058\u3081\u307e\u3057\u3066 (mucho gusto)", "\u3055\u3088\u3046\u306a\u3089 (adios)"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "ja1k-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: \u3042\u3044\u3055\u3064\u3068 \u3072\u3068 (saludos y personas)",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "\u3053\u3093\u306b\u3061\u306f / \u3055\u3088\u3046\u306a\u3089 (konnichiwa / say\u014dnara)", translation: "hola / adios" },
        { term: "\u304a\u306f\u3088\u3046\u3054\u3056\u3044\u307e\u3059 / \u3053\u3093\u3070\u3093\u306f (ohay\u014d gozaimasu / konbanwa)", translation: "buenos dias / buenas tardes" },
        { term: "\u306f\u3058\u3081\u307e\u3057\u3066 (hajimemashite)", translation: "mucho gusto" },
        { term: "\u304a\u306d\u304c\u3044\u3057\u307e\u3059 / \u3042\u308a\u304c\u3068\u3046\u3054\u3056\u3044\u307e\u3059 (onegaishimasu / arigat\u014d gozaimasu)", translation: "por favor / gracias" },
        { term: "\u3068\u3082\u3060\u3061 (tomodachi)", translation: "amigo/a" },
        { term: "\u305b\u3093\u305b\u3044 / \u304c\u304f\u305b\u3044 (sensei / gakusei)", translation: "profesor / estudiante" },
        { term: "\u306a\u307e\u3048 (namae)", translation: "nombre" },
        { term: "\u304a\u3052\u3093\u304d\u3067\u3059\u304b (o-genki desu ka)", translation: "como estas?" },
      ],
      activities: [
        {
          id: "ja1k-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "\u3053\u3093\u306b\u3061\u306f (Konnichiwa)", right: "Hola" },
            { left: "\u3055\u3088\u3046\u306a\u3089 (Say\u014dnara)", right: "Adios" },
            { left: "\u3042\u308a\u304c\u3068\u3046\u3054\u3056\u3044\u307e\u3059 (Arigat\u014d gozaimasu)", right: "Gracias" },
            { left: "\u304a\u306d\u304c\u3044\u3057\u307e\u3059 (Onegaishimasu)", right: "Por favor" },
          ] },
        },
        {
          id: "ja1k-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "\u3068\u3082\u3060\u3061 (tomodachi)", right: "Amigo/a" },
            { left: "\u305b\u3093\u305b\u3044 (sensei)", right: "Profesor/a" },
            { left: "\u304c\u304f\u305b\u3044 (gakusei)", right: "Estudiante" },
            { left: "\u306a\u307e\u3048 (namae)", right: "Nombre" },
          ] },
        },
        {
          id: "ja1k-vocab-a3", type: "multiple_choice",
          prompt: "Cual saludo usas en la MANANA (formal)?",
          payload: { choices: ["\u3053\u3093\u3070\u3093\u306f (Konbanwa)", "\u304a\u306f\u3088\u3046\u3054\u3056\u3044\u307e\u3059 (Ohay\u014d gozaimasu)", "\u304a\u3084\u3059\u307f\u306a\u3055\u3044 (Oyasuminasai)"], answer: 1 },
          explain: "'\u304a\u306f\u3088\u3046\u3054\u3056\u3044\u307e\u3059' (Ohay\u014d gozaimasu) = buenos dias (formal, manana).",
        },
        {
          id: "ja1k-vocab-a4", type: "multiple_choice",
          prompt: "Que dices para despedirte ANTES de dormir?",
          payload: { choices: ["\u3055\u3088\u3046\u306a\u3089 (Say\u014dnara)", "\u304a\u3084\u3059\u307f\u306a\u3055\u3044 (Oyasuminasai)", "\u3053\u3093\u306b\u3061\u306f (Konnichiwa)"], answer: 1 },
          explain: "'\u304a\u3084\u3059\u307f\u306a\u3055\u3044' (Oyasuminasai) = buenas noches, SOLO al ir a dormir.",
        },
        {
          id: "ja1k-vocab-a5", type: "multiple_choice",
          prompt: "Cual palabra significa 'mucho gusto' (al conocer a alguien)?",
          payload: { choices: ["\u3055\u3088\u3046\u306a\u3089 (Say\u014dnara)", "\u3042\u308a\u304c\u3068\u3046 (Arigat\u014d)", "\u306f\u3058\u3081\u307e\u3057\u3066 (Hajimemashite)"], answer: 2 },
          explain: "'\u306f\u3058\u3081\u307e\u3057\u3066' (Hajimemashite) = mucho gusto.",
        },
        {
          id: "ja1k-vocab-a6", type: "multiple_choice",
          prompt: "Cual palabra significa 'profesor/a'?",
          payload: { choices: ["\u304c\u304f\u305b\u3044 (gakusei)", "\u305b\u3093\u305b\u3044 (sensei)", "\u3068\u3082\u3060\u3061 (tomodachi)"], answer: 1 },
          explain: "'\u305b\u3093\u305b\u3044' (sensei) = profesor/a o maestro/a.",
        },
        {
          id: "ja1k-vocab-a7", type: "multiple_choice",
          prompt: "Como preguntas 'como estas?'",
          payload: { choices: ["\u304a\u306a\u307e\u3048\u306f\uff1f (O-namae wa?)", "\u304a\u3052\u3093\u304d\u3067\u3059\u304b\uff1f (O-genki desu ka?)", "\u3069\u3046\u305e\u3088\u308d\u3057\u304f (D\u014dzo yoroshiku)"], answer: 1 },
          explain: "'\u304a\u3052\u3093\u304d\u3067\u3059\u304b' (O-genki desu ka?) = como estas?",
        },
        {
          id: "ja1k-vocab-a8", type: "multiple_choice",
          prompt: "Cual palabra significa 'estudiante'?",
          payload: { choices: ["\u304c\u304f\u305b\u3044 (gakusei)", "\u305b\u3093\u305b\u3044 (sensei)", "\u306a\u307e\u3048 (namae)"], answer: 0 },
          explain: "'\u304c\u304f\u305b\u3044' (gakusei) = estudiante.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "ja1k-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: \u3067\u3059 (desu) + \u306f (wa) para decir quien eres",
      intro: "Competencia de GRAMATICA. Aprende el patron [tema] + \u306f + [identidad] + \u3067\u3059 y practicalo.",
      grammar: {
        title: "\u3067\u3059 (desu) con la particula \u306f (wa)",
        form: "[tema] + \u306f (wa) + [nombre / nacionalidad / ocupacion] + *\u3067\u3059* (desu)",
        desc: "Sirve para presentarte, decir tu nacionalidad, tu ocupacion o quien es otra persona.",
        rule: "A diferencia del espanol (soy/eres/es), \u3067\u3059 NUNCA cambia segun quien habla -- es igual para 'yo', 'tu', 'el' o 'ellos'. Lo que SI cambia es el TEMA antes de la particula \u306f (wa): 'わたしは' (watashi wa = yo), 'かれは' (kare wa = el), 'かれらは' (karera wa = ellos). Para preguntar, se agrega か (ka) al final: '〜ですか？'.",
        table: {
          headers: ["Tema + \u306f", "Significado", "Ejemplo completo"],
          rows: [
            ["\u308f\u305f\u3057\u306f (watashi wa)", "yo", "\u308f\u305f\u3057\u306f \u304c\u304f\u305b\u3044 \u3067\u3059\u3002(gakusei desu = soy estudiante)"],
            ["\u304b\u308c\u306f (kare wa)", "el", "\u304b\u308c\u306f \u30ab\u30ca\u30c0\u3058\u3093 \u3067\u3059\u3002(Kanada-jin desu = es canadiense)"],
            ["\u308f\u305f\u3057\u305f\u3061\u306f (watashitachi wa)", "nosotros", "\u308f\u305f\u3057\u305f\u3061\u306f \u3068\u3082\u3060\u3061 \u3067\u3059\u3002(tomodachi desu = somos amigos)"],
          ],
        },
        examples: [
          "\u308f\u305f\u3057\u306f *\u304c\u304f\u305b\u3044* \u3067\u3059\u3002 (Watashi wa gakusei desu.)",
          "\u304b\u308c\u306f *\u30ab\u30ca\u30c0\u3058\u3093* \u3067\u3059\u3002 (Kare wa Kanada-jin desu.)",
          "\u308f\u305f\u3057\u305f\u3061\u306f *\u3068\u3082\u3060\u3061* \u3067\u3059\u3002 (Watashitachi wa tomodachi desu.)",
          "\u304b\u308c\u3089\u306f *\u305b\u3093\u305b\u3044* \u3067\u3059\u3002 (Karera wa sensei desu.)",
        ],
        explain: { tr: ["Yo soy estudiante.", "El es canadiense.", "Nosotros somos amigos.", "Ellos son profesores."] },
        mistakes: [
          { wrong: "\u308f\u305f\u3057 \u304c\u304f\u305b\u3044 \u3067\u3059\u3002 (sin \u306f)", right: "\u308f\u305f\u3057\u306f \u304c\u304f\u305b\u3044 \u3067\u3059\u3002" },
          { wrong: "\u308f\u305f\u3057\u306f \u3067\u3059 \u304c\u304f\u305b\u3044\u3002 (orden invertido)", right: "\u308f\u305f\u3057\u306f \u304c\u304f\u305b\u3044 \u3067\u3059\u3002" },
          { wrong: "\u308f\u305f\u3057\u306f \u304c\u304f\u305b\u3044 \u3060\u3059\u3002 (\u3067\u3059 mal escrito)", right: "\u308f\u305f\u3057\u306f \u304c\u304f\u305b\u3044 \u3067\u3059\u3002" },
        ],
      },
      activities: [
        {
          id: "ja1k-gram-a1", type: "cloze",
          prompt: "Completa: '\u308f\u305f\u3057___ \u304c\u304f\u305b\u3044\u3067\u3059\u3002' (particula de tema, romaji: wa)",
          payload: { answer: "\u306f", alt: ["wa"] },
          explain: "La particula de tema es \u306f (se escribe \u306f pero suena 'wa').",
        },
        {
          id: "ja1k-gram-a2", type: "multiple_choice",
          prompt: "Elige la frase CORRECTA:",
          payload: { choices: ["\u308f\u305f\u3057 \u304c\u304f\u305b\u3044 \u3067\u3059\u3002", "\u308f\u305f\u3057\u306f \u304c\u304f\u305b\u3044 \u3067\u3059\u3002", "\u304c\u304f\u305b\u3044 \u308f\u305f\u3057\u306f \u3067\u3059\u3002"], answer: 1 },
          explain: "Orden correcto: [tema] + \u306f + [identidad] + \u3067\u3059.",
        },
        {
          id: "ja1k-gram-a3", type: "multiple_choice",
          prompt: "Como preguntas '\u00bferes estudiante?'",
          payload: { choices: ["\u304c\u304f\u305b\u3044\u3067\u3059\u304b\uff1f", "\u304c\u304f\u305b\u3044\u3067\u3059\u3002", "\u304c\u304f\u305b\u3044\u306f\u3067\u3059\u3002"], answer: 0 },
          explain: "Para preguntar se agrega \u304b (ka) al final: '\u3067\u3059\u304b\uff1f'",
        },
        {
          id: "ja1k-gram-a4", type: "multiple_choice",
          prompt: "'\u304b\u308c\u306f \u305b\u3093\u305b\u3044 \u3067\u3059\u3002' significa:",
          payload: { choices: ["El es profesor.", "Ella es estudiante.", "Ellos son amigos."], answer: 0 },
          explain: "\u304b\u308c (kare) = el; \u305b\u3093\u305b\u3044 (sensei) = profesor.",
        },
        {
          id: "ja1k-gram-a5", type: "word_bank",
          prompt: "Ordena: 'Soy estudiante' (watashi / wa / gakusei / desu):",
          payload: { words: ["\u3067\u3059", "\u308f\u305f\u3057", "\u304c\u304f\u305b\u3044", "\u306f"], answer: ["\u308f\u305f\u3057", "\u306f", "\u304c\u304f\u305b\u3044", "\u3067\u3059"] },
          explain: "Orden: \u308f\u305f\u3057 (watashi) + \u306f (wa) + \u304c\u304f\u305b\u3044 (gakusei) + \u3067\u3059 (desu).",
        },
        {
          id: "ja1k-gram-a6", type: "word_bank",
          prompt: "Ordena: 'El es canadiense' (kare / wa / Kanada-jin / desu):",
          payload: { words: ["\u3067\u3059", "\u304b\u308c", "\u30ab\u30ca\u30c0\u3058\u3093", "\u306f"], answer: ["\u304b\u308c", "\u306f", "\u30ab\u30ca\u30c0\u3058\u3093", "\u3067\u3059"] },
          explain: "Orden: \u304b\u308c (kare) + \u306f (wa) + \u30ab\u30ca\u30c0\u3058\u3093 (Kanada-jin) + \u3067\u3059 (desu).",
        },
        {
          id: "ja1k-gram-a7", type: "multiple_choice",
          prompt: "Que forma usa 'ellos' (karera) de \u3067\u3059?",
          payload: { choices: ["\u3067\u3059 (igual, sin cambio)", "\u3067\u3042\u308b (cambia)", "\u3060 (cambia)"], answer: 0 },
          explain: "\u3067\u3059 NUNCA cambia por persona -- esa es la gran diferencia con 'ser' en espanol.",
        },
        {
          id: "ja1k-gram-a8", type: "cloze",
          prompt: "Completa: '\u304b\u308c\u3089\u306f \u305b\u3093\u305b\u3044 ___\u3002' (desu)",
          payload: { answer: "\u3067\u3059" },
          explain: "\u3067\u3059 cierra la frase de identidad, sin importar el sujeto.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "ja1k-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: \u3058\u3053\u3057\u3087\u3046\u304b\u3044 (tu presentacion completa)",
      intro: "Competencia de ESCRITURA. Construye una presentacion completa, frase por frase.",
      activities: [
        {
          id: "ja1k-write-a1", type: "word_bank",
          prompt: "1. Saluda al conocer a alguien:",
          payload: { words: ["\u3066", "\u306f\u3058\u3081\u307e\u3057"], answer: ["\u306f\u3058\u3081\u307e\u3057", "\u3066"] },
        },
        {
          id: "ja1k-write-a2", type: "word_bank",
          prompt: "2. Di tu nombre (watashi wa [nombre] desu):",
          payload: { words: ["\u3067\u3059", "\u30ec\u30aa", "\u308f\u305f\u3057", "\u306f"], answer: ["\u308f\u305f\u3057", "\u306f", "\u30ec\u30aa", "\u3067\u3059"] },
        },
        {
          id: "ja1k-write-a3", type: "word_bank",
          prompt: "3. Di tu nacionalidad (soy de Brasil: Burajiru-jin):",
          payload: { words: ["\u3067\u3059", "\u30d6\u30e9\u30b8\u30eb\u3058\u3093", "\u308f\u305f\u3057", "\u306f"], answer: ["\u308f\u305f\u3057", "\u306f", "\u30d6\u30e9\u30b8\u30eb\u3058\u3093", "\u3067\u3059"] },
        },
        {
          id: "ja1k-write-a4", type: "word_bank",
          prompt: "4. Di tu ocupacion (soy estudiante):",
          payload: { words: ["\u3067\u3059", "\u304c\u304f\u305b\u3044", "\u308f\u305f\u3057", "\u306f"], answer: ["\u308f\u305f\u3057", "\u306f", "\u304c\u304f\u305b\u3044", "\u3067\u3059"] },
        },
        {
          id: "ja1k-write-a5", type: "word_bank",
          prompt: "5. Pregunta el nombre de la otra persona:",
          payload: { words: ["\u306f\uff1f", "\u304a\u306a\u307e\u3048"], answer: ["\u304a\u306a\u307e\u3048", "\u306f\uff1f"] },
        },
        {
          id: "ja1k-write-a6", type: "multiple_choice",
          prompt: "6. Mejor forma de despedirte (de dia, con alguien que no veras pronto):",
          payload: { choices: ["\u3055\u3088\u3046\u306a\u3089\u3002", "\u304a\u3084\u3059\u307f\u306a\u3055\u3044\u3002", "\u306f\u3058\u3081\u307e\u3057\u3066\u3002"], answer: 0 },
        },
        {
          id: "ja1k-write-a7", type: "multiple_choice",
          prompt: "7. Alguien te dice '\u306f\u3058\u3081\u307e\u3057\u3066'. Respondes:",
          payload: { choices: ["\u3055\u3088\u3046\u306a\u3089\u3002", "\u306f\u3058\u3081\u307e\u3057\u3066\u3002", "\u3044\u3044\u3048\u3002"], answer: 1 },
        },
        {
          id: "ja1k-write-a8", type: "multiple_choice",
          prompt: "8. Cual presentacion esta BIEN formada?",
          payload: { choices: ["\u308f\u305f\u3057\u306f \u30de\u30ea\u30a2 \u3067\u3059\u3002", "\u30de\u30ea\u30a2 \u308f\u305f\u3057\u306f \u3067\u3059\u3002", "\u308f\u305f\u3057 \u3067\u3059 \u30de\u30ea\u30a2\u306f\u3002"], answer: 0 },
        },
      ],
    },
  ],
};
