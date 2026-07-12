/**
 * data/units/arts-b2.js — Unidad tematica "Arts & culture" (B2).
 * Datos PUROS. Modelo desacoplado por competencia. Gramatica: non-defining relative clauses.
 */

export const ARTS_B2 = {
  id: "arts-b2",
  language: "en",
  level: "B2",
  title: "Arts & culture",
  subtitle: "Hablar de arte, cine y cultura con detalle",

  cando: [
    "Puedo hablar de arte, musica y cine con vocabulario rico.",
    "Puedo usar oraciones de relativo explicativas (non-defining).",
    "Puedo dar informacion extra sobre personas y cosas.",
    "Puedo escribir una resena breve.",
  ],

  vocab: [
    { id: "b2art-1", term: "artist", translation: "artista", example: "The artist is very talented." },
    { id: "b2art-2", term: "painting", translation: "cuadro / pintura", example: "The painting is famous." },
    { id: "b2art-3", term: "exhibition", translation: "exposicion", example: "We visited the exhibition." },
    { id: "b2art-4", term: "audience", translation: "publico / audiencia", example: "The audience loved it." },
    { id: "b2art-5", term: "performance", translation: "actuacion / funcion", example: "The performance was moving." },
    { id: "b2art-6", term: "masterpiece", translation: "obra maestra", example: "It's a true masterpiece." },
    { id: "b2art-7", term: "director", translation: "director", example: "The director won an award." },
    { id: "b2art-8", term: "plot", translation: "trama / argumento", example: "The plot was complex." },
    { id: "b2art-9", term: "to release", translation: "estrenar / lanzar", example: "They released the film." },
    { id: "b2art-10", term: "review", translation: "resena / critica", example: "The review was positive." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "b2art-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: una obra maestra",
      intro: "Competencia de LECTURA. Lee el texto y comprueba que entendiste.",
      content: {
        reading:
          "Frida Kahlo, who was a Mexican painter, created many powerful works. Her paintings, which " +
          "often show pain and identity, are famous around the world. The exhibition, which opened last " +
          "month, attracted a huge audience. The director of the museum, whose passion for art is well " +
          "known, said it was a dream come true. One painting, which took her a whole year, is now " +
          "considered a masterpiece. The reviews, which were excellent, praised her honesty.",
        keyPhrases: [
          "Fijate en relativas explicativas entre comas: who was..., which opened...",
          "Estas relativas dan informacion EXTRA (no esencial).",
        ],
        check: [
          { prompt: "Who was Frida Kahlo?", choices: ["A Mexican painter", "A director", "A singer"], answer: 0 },
          { prompt: "What do her paintings often show?", choices: ["Landscapes", "Pain and identity", "Animals"], answer: 1 },
          { prompt: "When did the exhibition open?", choices: ["Last month", "Last year", "Today"], answer: 0 },
          { prompt: "How were the reviews?", choices: ["Excellent", "Terrible", "Mixed"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "b2art-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: arte y cultura",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "artist / painting", translation: "artista / cuadro" },
        { term: "exhibition / audience", translation: "exposicion / publico" },
        { term: "performance / masterpiece", translation: "actuacion / obra maestra" },
        { term: "director / plot", translation: "director / trama" },
        { term: "to release", translation: "estrenar / lanzar" },
        { term: "review", translation: "resena" },
      ],
      activities: [
        {
          id: "b2art-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "painting", right: "cuadro" },
            { left: "audience", right: "publico" },
            { left: "plot", right: "trama" },
          ] },
        },
        {
          id: "b2art-vocab-a2", type: "cloze",
          prompt: "Completa: 'It's a true ___.' (obra maestra)",
          payload: { answer: "masterpiece" },
          explain: "'Masterpiece' = obra maestra.",
        },
        {
          id: "b2art-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'estrenar/lanzar'?",
          payload: { choices: ["to release", "to review", "to paint"], answer: 0 },
          explain: "'To release' = estrenar / lanzar.",
        },
        {
          id: "b2art-vocab-a4", type: "cloze",
          prompt: "Completa: 'The ___ was positive.' (resena)",
          payload: { answer: "review" },
          explain: "'Review' = resena / critica.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "b2art-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: relativas explicativas",
      intro: "Competencia de GRAMATICA. Aprende las relativas non-defining (con comas).",
      grammar: {
        title: "Non-defining relative clauses",
        form: "informacion EXTRA entre comas: ..., who/which/whose ..., ...",
        examples: ["Frida Kahlo, who was a painter, ...", "The film, which won an award, ...", "The director, whose work is famous, ..."],
        mistakes: [
          { wrong: "Frida Kahlo, that was a painter, ...", right: "Frida Kahlo, who was a painter, ..." },
          { wrong: "The film which won an award was great (no commas for extra info).", right: "The film, which won an award, was great." },
        ],
      },
      activities: [
        {
          id: "b2art-gram-a1", type: "cloze",
          prompt: "Completa: 'Frida Kahlo, ___ was a painter, is famous.' (persona)",
          payload: { answer: "who" },
          explain: "'who' para personas (y en non-defining NO se usa 'that').",
        },
        {
          id: "b2art-gram-a2", type: "cloze",
          prompt: "Completa: 'The film, ___ won an award, is great.' (cosa)",
          payload: { answer: "which" },
          explain: "'which' para cosas (en non-defining NO se usa 'that').",
        },
        {
          id: "b2art-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct non-defining clause:",
          payload: { choices: ["My sister that lives in Rome called.", "My sister, who lives in Rome, called.", "My sister which lives in Rome called."], answer: 1 },
          explain: "Info extra entre comas + 'who' (persona).",
        },
        {
          id: "b2art-gram-a4", type: "cloze",
          prompt: "Completa: 'The director, ___ work is famous, spoke.' (posesivo)",
          payload: { answer: "whose" },
          explain: "'whose' = cuyo/a (posesion).",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "b2art-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: una resena breve",
      intro: "Competencia de ESCRITURA. Construye frases con info extra. Ordena cada frase.",
      activities: [
        {
          id: "b2art-write-a1", type: "word_bank",
          prompt: "Describe la exposicion (que abrio el mes pasado):",
          payload: { words: ["which", "The", "opened", "exhibition,", "last", "month,", "was", "great"], answer: ["The", "exhibition,", "which", "opened", "last", "month,", "was", "great"] },
        },
        {
          id: "b2art-write-a2", type: "word_bank",
          prompt: "Di que las criticas fueron excelentes:",
          payload: { words: ["were", "The", "excellent", "reviews"], answer: ["The", "reviews", "were", "excellent"] },
        },
        {
          id: "b2art-write-a3", type: "word_bank",
          prompt: "Di que estrenaron la pelicula:",
          payload: { words: ["the", "They", "film", "released"], answer: ["They", "released", "the", "film"] },
        },
        {
          id: "b2art-write-a4", type: "multiple_choice",
          prompt: "In non-defining clauses, which pronoun is NOT used?",
          payload: { choices: ["who", "which", "that"], answer: 2 },
        },
      ],
    },
  ],
};
