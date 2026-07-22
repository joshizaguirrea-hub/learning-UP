/**
 * data/units/language-style-c1.js — Unidad tematica "Language & style" (C1).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: participle clauses.
 */

export const LANGUAGE_STYLE_C1 = {
  id: "language-style-c1",
  language: "en",
  level: "C1",
  title: "Language & style",
  subtitle: "Escribir con estilo usando participle clauses",

  cando: [
    "Puedo hablar del lenguaje, el estilo y el registro.",
    "Puedo usar participle clauses para escribir con fluidez.",
    "Puedo unir ideas de forma elegante y concisa.",
    "Puedo escribir con un estilo mas sofisticado.",
  ],

  vocab: [
    { id: "c1ls-1", term: "style", translation: "estilo", example: "Her writing style is elegant." },
    { id: "c1ls-2", term: "register", translation: "registro", example: "Use a formal register." },
    { id: "c1ls-3", term: "concise", translation: "conciso", example: "Keep your writing concise." },
    { id: "c1ls-4", term: "fluent", translation: "fluido", example: "She is fluent in three languages." },
    { id: "c1ls-5", term: "tone", translation: "tono", example: "The tone was serious." },
    { id: "c1ls-6", term: "to convey", translation: "transmitir", example: "Words convey emotion." },
    { id: "c1ls-7", term: "nuance", translation: "matiz", example: "He understands every nuance." },
    { id: "c1ls-8", term: "vivid", translation: "vivido", example: "A vivid description." },
    { id: "c1ls-9", term: "clarity", translation: "claridad", example: "Write with clarity." },
    { id: "c1ls-10", term: "coherent", translation: "coherente", example: "A coherent argument." },
    { id: "c1ls-11", term: "elegant", translation: "elegante", example: "An elegant sentence." },
    { id: "c1ls-12", term: "to draft", translation: "redactar un borrador", example: "I drafted the essay first." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "c1ls-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: escribir con estilo",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Elena the writer\n" +
          "Written carefully, a good text conveys meaning with clarity. Having studied literature for " +
          "years, Elena writes with a vivid and concise style. Choosing every word with care, she captures " +
          "each nuance. Feeling confident, she adapts her tone to the register. Once finished, her essays " +
          "are always coherent and fluent.\n\n" +
          "TEXT 2 - A writing lesson\n" +
          "A: My paragraphs feel too long. B: Try participle clauses. 'Feeling tired, I stopped' is more " +
          "elegant than 'Because I was tired, I stopped.' A: I see! B: Written well, a sentence sounds " +
          "professional. A: So I should draft, then cut extra words? B: Exactly. Keep it concise and " +
          "coherent.",
        glossary: [
          { term: "Written carefully, ...", translation: "Escrito con cuidado, ..." },
          { term: "Having studied ...", translation: "Habiendo estudiado ..." },
          { term: "Choosing / Feeling ...", translation: "Eligiendo / Sintiendo ..." },
          { term: "style / register", translation: "estilo / registro" },
          { term: "concise / clarity", translation: "conciso / claridad" },
          { term: "nuance / vivid", translation: "matiz / vivido" },
          { term: "coherent / elegant", translation: "coherente / elegante" },
          { term: "to convey / to draft", translation: "transmitir / redactar borrador" },
        ],
        keyPhrases: [
          "Fijate en las participle clauses: Written carefully..., Having studied..., Choosing..., Once finished...",
          "Reemplazan clausulas completas para escribir con elegancia y concision.",
        ],
        check: [
          { prompt: "T1: What does a good text convey?", choices: ["Meaning with clarity", "Confusion", "Noise"], answer: 0 },
          { prompt: "T1: What had Elena studied?", choices: ["Literature", "Medicine", "Music"], answer: 0 },
          { prompt: "T1: How is her style?", choices: ["Vivid and concise", "Boring", "Unclear"], answer: 0 },
          { prompt: "T2: What does B suggest to shorten paragraphs?", choices: ["Participle clauses", "Longer words", "More commas"], answer: 0 },
          { prompt: "T2: Which sounds more elegant?", choices: ["Feeling tired, I stopped.", "Because I was tired, I stopped.", "I was tired so stop."], answer: 0 },
          { prompt: "T2: What should you do after drafting?", choices: ["Cut extra words", "Add more words", "Nothing"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "c1ls-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: lenguaje y estilo",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "style / register", translation: "estilo / registro" },
        { term: "concise / clarity", translation: "conciso / claridad" },
        { term: "fluent / coherent", translation: "fluido / coherente" },
        { term: "tone / nuance", translation: "tono / matiz" },
        { term: "vivid / elegant", translation: "vivido / elegante" },
        { term: "to convey / to draft", translation: "transmitir / redactar" },
      ],
      activities: [
        {
          id: "c1ls-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "style", right: "estilo" },
            { left: "nuance", right: "matiz" },
            { left: "clarity", right: "claridad" },
            { left: "tone", right: "tono" },
          ] },
        },
        {
          id: "c1ls-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "concise", right: "conciso" },
            { left: "coherent", right: "coherente" },
            { left: "vivid", right: "vivido" },
            { left: "elegant", right: "elegante" },
          ] },
        },
        {
          id: "c1ls-vocab-a3", type: "cloze",
          prompt: "Completa: 'Keep your writing ___.' (conciso)",
          payload: { answer: "concise" },
          explain: "'Concise' = conciso.",
        },
        {
          id: "c1ls-vocab-a4", type: "cloze",
          prompt: "Completa: 'Use a formal ___.' (registro)",
          payload: { answer: "register" },
          explain: "'Register' = registro.",
        },
        {
          id: "c1ls-vocab-a5", type: "cloze",
          prompt: "Completa: 'I ___ the essay first.' (redactar borrador -> pasado)",
          payload: { answer: "drafted" },
          explain: "'To draft' = redactar un borrador; pasado: drafted.",
        },
        {
          id: "c1ls-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'transmitir'?",
          payload: { choices: ["to convey", "to write", "to read"], answer: 0 },
          explain: "'To convey' = transmitir.",
        },
        {
          id: "c1ls-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'matiz'?",
          payload: { choices: ["nuance", "clarity", "tone"], answer: 0 },
          explain: "'Nuance' = matiz.",
        },
        {
          id: "c1ls-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["clarity", "Write", "with"], answer: ["Write", "with", "clarity"] },
          explain: "'Write with clarity' = escribe con claridad.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "c1ls-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: participle clauses",
      intro: "Competencia de GRAMATICA. Aprende a unir ideas con participle clauses.",
      grammar: {
        title: "Participle clauses",
        form: "-ing (active): Feeling tired, I left. · -ed (passive): Written well, it works. · Having + part: Having finished, she left.",
        desc: "Sirve para unir ideas de forma elegante y compacta en textos formales.",
        rule: "Cl\u00e1usulas de participio: '-ing' para sentido activo (Feeling tired, I left), '-ed' para pasivo (Written well, it works) y 'Having + participio' para algo anterior (Having finished, she left).",
        examples: ["Feeling tired, she went home.", "Written in 1990, the book is still popular.", "Having eaten, we left."],
        explain: { tr: ["Sinti\u00e9ndose cansada, se fue a casa.", "Escrito en 1990, el libro sigue siendo popular.", "Habiendo comido, nos fuimos."] },
        mistakes: [
          { wrong: "Because feeling tired, she left.", right: "Feeling tired, she left." },
          { wrong: "Having ate, we left.", right: "Having eaten, we left." },
        ],
      },
      activities: [
        {
          id: "c1ls-gram-a1", type: "cloze",
          prompt: "Completa: '___ tired, she went home.' (feel -> -ing)",
          payload: { answer: "Feeling" },
          explain: "Participle activo: Feeling (= Because she felt).",
        },
        {
          id: "c1ls-gram-a2", type: "cloze",
          prompt: "Completa: 'Having ___, we left.' (finish -> participio)",
          payload: { answer: "finished" },
          explain: "Having + participio para accion anterior.",
        },
        {
          id: "c1ls-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct participle clause:",
          payload: { choices: [
            "Written in 1990, the book is a classic.",
            "Write in 1990, the book is a classic.",
            "Writing in 1990, the book is a classic.",
          ], answer: 0 },
          explain: "Participle pasivo: Written (= It was written).",
        },
        {
          id: "c1ls-gram-a4", type: "multiple_choice",
          prompt: "Participle clauses help you write...",
          payload: { choices: ["longer and unclear", "concisely and elegantly", "with more errors"], answer: 1 },
          explain: "Sirven para escribir de forma concisa y elegante.",
        },
        {
          id: "c1ls-gram-a5", type: "cloze",
          prompt: "Completa: '___ studied for years, she writes well.' (have -> Having)",
          payload: { answer: "Having" },
          explain: "Having + participio (studied) para accion previa.",
        },
        {
          id: "c1ls-gram-a6", type: "word_bank",
          prompt: "Ordena la participle clause:",
          payload: { words: ["I", "tired,", "Feeling", "left"], answer: ["Feeling", "tired,", "I", "left"] },
          explain: "Feeling + tired, + I + left.",
        },
        {
          id: "c1ls-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["they", "Having", "left", "finished,"], answer: ["Having", "finished,", "they", "left"] },
          explain: "Having + finished, + they + left.",
        },
        {
          id: "c1ls-gram-a8", type: "cloze",
          prompt: "Completa: '___ well, a sentence sounds professional.' (write -> participio pasivo)",
          payload: { answer: "Written" },
          explain: "Participle pasivo: Written (= If it is written).",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "c1ls-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: escribe con estilo",
      intro: "Competencia de ESCRITURA. Construye participle clauses.",
      activities: [
        {
          id: "c1ls-write-a1", type: "word_bank",
          prompt: "1. Une con participle (sintiendote cansado, te fuiste):",
          payload: { words: ["I", "tired,", "Feeling", "left"], answer: ["Feeling", "tired,", "I", "left"] },
        },
        {
          id: "c1ls-write-a2", type: "word_bank",
          prompt: "2. Habiendo terminado, se fueron:",
          payload: { words: ["they", "Having", "left", "finished,"], answer: ["Having", "finished,", "they", "left"] },
        },
        {
          id: "c1ls-write-a3", type: "word_bank",
          prompt: "3. Di que escribe con claridad:",
          payload: { words: ["clarity", "She", "with", "writes"], answer: ["She", "writes", "with", "clarity"] },
        },
        {
          id: "c1ls-write-a4", type: "word_bank",
          prompt: "4. Une con participle pasivo (escrito bien, funciona):",
          payload: { words: ["it", "Written", "works", "well,"], answer: ["Written", "well,", "it", "works"] },
        },
        {
          id: "c1ls-write-a5", type: "word_bank",
          prompt: "5. Aconseja mantenerlo conciso:",
          payload: { words: ["it", "Keep", "concise"], answer: ["Keep", "it", "concise"] },
        },
        {
          id: "c1ls-write-a6", type: "multiple_choice",
          prompt: "6. Participle clauses help you write...",
          payload: { choices: ["longer and unclear", "concisely and elegantly", "with more errors"], answer: 1 },
        },
        {
          id: "c1ls-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct one:",
          payload: { choices: ["Having ate, we left.", "Having eaten, we left.", "Having eat, we left."], answer: 1 },
        },
        {
          id: "c1ls-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'coherente'?",
          payload: { choices: ["vivid", "coherent", "concise"], answer: 1 },
        },
      ],
    },
  ],
};
