/**
 * data/units/arts-b2.js — Unidad tematica "Arts & culture" (B2).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: non-defining relative clauses.
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
    { id: "b2art-11", term: "sculpture", translation: "escultura", example: "The sculpture is made of marble." },
    { id: "b2art-12", term: "talented", translation: "talentoso", example: "She is a talented singer." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "b2art-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: una obra maestra",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Frida Kahlo\n" +
          "Frida Kahlo, who was a Mexican painter, created many powerful works. Her paintings, which often " +
          "show pain and identity, are famous around the world. The exhibition, which opened last month, " +
          "attracted a huge audience. The director of the museum, whose passion for art is well known, " +
          "said it was a dream come true. One painting, which took her a whole year, is now considered a " +
          "masterpiece.\n\n" +
          "TEXT 2 - A film night\n" +
          "A: I watched a film last night. The director, who also wrote it, is amazing. B: What's the " +
          "plot? A: It's about an artist whose paintings change the world. B: Sounds great! A: The " +
          "reviews, which were excellent, praised the acting. It was released last week.",
        glossary: [
          { term: "who was a painter", translation: "que era pintora (info extra)" },
          { term: "which opened last month", translation: "que abrio el mes pasado" },
          { term: "whose passion", translation: "cuya pasion" },
          { term: "exhibition / audience", translation: "exposicion / publico" },
          { term: "masterpiece / plot", translation: "obra maestra / trama" },
          { term: "director / review", translation: "director / resena" },
          { term: "to release / talented", translation: "estrenar / talentoso" },
          { term: "sculpture / painting", translation: "escultura / cuadro" },
        ],
        keyPhrases: [
          "Fijate en relativas explicativas entre comas: who was..., which opened...",
          "Estas relativas dan informacion EXTRA (no esencial).",
        ],
        check: [
          { prompt: "T1: Who was Frida Kahlo?", choices: ["A Mexican painter", "A director", "A singer"], answer: 0 },
          { prompt: "T1: What do her paintings often show?", choices: ["Landscapes", "Pain and identity", "Animals"], answer: 1 },
          { prompt: "T1: When did the exhibition open?", choices: ["Last month", "Last year", "Today"], answer: 0 },
          { prompt: "T2: What did the director also do?", choices: ["Wrote the film", "Acted in it", "Nothing"], answer: 0 },
          { prompt: "T2: What is the plot about?", choices: ["An artist", "A soldier", "A doctor"], answer: 0 },
          { prompt: "T2: How were the reviews?", choices: ["Excellent", "Terrible", "Mixed"], answer: 0 },
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
        { term: "artist / talented", translation: "artista / talentoso" },
        { term: "painting / sculpture", translation: "cuadro / escultura" },
        { term: "exhibition / audience", translation: "exposicion / publico" },
        { term: "performance / masterpiece", translation: "actuacion / obra maestra" },
        { term: "director / plot", translation: "director / trama" },
        { term: "to release / review", translation: "estrenar / resena" },
      ],
      activities: [
        {
          id: "b2art-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "painting", right: "cuadro" },
            { left: "audience", right: "publico" },
            { left: "plot", right: "trama" },
            { left: "sculpture", right: "escultura" },
          ] },
        },
        {
          id: "b2art-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "masterpiece", right: "obra maestra" },
            { left: "director", right: "director" },
            { left: "review", right: "resena" },
            { left: "talented", right: "talentoso" },
          ] },
        },
        {
          id: "b2art-vocab-a3", type: "cloze",
          prompt: "Completa: 'It's a true ___.' (obra maestra)",
          payload: { answer: "masterpiece" },
          explain: "'Masterpiece' = obra maestra.",
        },
        {
          id: "b2art-vocab-a4", type: "cloze",
          prompt: "Completa: 'The ___ was positive.' (resena)",
          payload: { answer: "review" },
          explain: "'Review' = resena / critica.",
        },
        {
          id: "b2art-vocab-a5", type: "cloze",
          prompt: "Completa: 'She is a ___ singer.' (talentosa)",
          payload: { answer: "talented" },
          explain: "'Talented' = talentoso.",
        },
        {
          id: "b2art-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'estrenar/lanzar'?",
          payload: { choices: ["to release", "to review", "to paint"], answer: 0 },
          explain: "'To release' = estrenar / lanzar.",
        },
        {
          id: "b2art-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'publico/audiencia'?",
          payload: { choices: ["audience", "director", "plot"], answer: 0 },
          explain: "'Audience' = publico.",
        },
        {
          id: "b2art-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["loved", "audience", "The", "it"], answer: ["The", "audience", "loved", "it"] },
          explain: "The + audience + loved + it.",
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
        desc: "Sirve para a\u00f1adir informaci\u00f3n extra sobre algo, sin que sea esencial para entender la frase.",
        rule: "La info extra va ENTRE COMAS con who (personas), which (cosas) o whose (posesi\u00f3n): 'My brother, who lives in Rome, is a chef'. Si quitas la parte entre comas, la frase sigue teniendo sentido.",
        examples: ["Frida Kahlo, who was a painter, ...", "The film, which won an award, ...", "The director, whose work is famous, ..."],
        explain: { tr: ["Frida Kahlo, quien fue pintora, ...", "La pel\u00edcula, que gan\u00f3 un premio, ...", "El director, cuya obra es famosa, ..."] },
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
          id: "b2art-gram-a3", type: "cloze",
          prompt: "Completa: 'The director, ___ work is famous, spoke.' (posesivo)",
          payload: { answer: "whose" },
          explain: "'whose' = cuyo/a (posesion).",
        },
        {
          id: "b2art-gram-a4", type: "multiple_choice",
          prompt: "Choose the correct non-defining clause:",
          payload: { choices: ["My sister that lives in Rome called.", "My sister, who lives in Rome, called.", "My sister which lives in Rome called."], answer: 1 },
          explain: "Info extra entre comas + 'who' (persona).",
        },
        {
          id: "b2art-gram-a5", type: "multiple_choice",
          prompt: "In non-defining clauses, which pronoun is NOT used?",
          payload: { choices: ["who", "which", "that"], answer: 2 },
          explain: "'that' no se usa en relativas explicativas.",
        },
        {
          id: "b2art-gram-a6", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["who", "Tom,", "here,", "lives", "is", "kind"], answer: ["Tom,", "who", "lives", "here,", "is", "kind"] },
          explain: "Tom, + who + lives + here, + is + kind.",
        },
        {
          id: "b2art-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["which", "The", "opened,", "museum,", "big", "is"], answer: ["The", "museum,", "which", "opened,", "is", "big"] },
          explain: "The + museum, + which + opened, + is + big.",
        },
        {
          id: "b2art-gram-a8", type: "cloze",
          prompt: "Completa: 'The painting, ___ took a year, is a masterpiece.' (cosa)",
          payload: { answer: "which" },
          explain: "'which' para cosas en relativa explicativa.",
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
      intro: "Competencia de ESCRITURA. Construye frases con info extra, frase por frase.",
      activities: [
        {
          id: "b2art-write-a1", type: "word_bank",
          prompt: "1. Describe la exposicion (que abrio el mes pasado):",
          payload: { words: ["which", "The", "opened", "exhibition,", "last", "month,", "was", "great"], answer: ["The", "exhibition,", "which", "opened", "last", "month,", "was", "great"] },
        },
        {
          id: "b2art-write-a2", type: "word_bank",
          prompt: "2. Di que las criticas fueron excelentes:",
          payload: { words: ["were", "The", "excellent", "reviews"], answer: ["The", "reviews", "were", "excellent"] },
        },
        {
          id: "b2art-write-a3", type: "word_bank",
          prompt: "3. Di que estrenaron la pelicula:",
          payload: { words: ["the", "They", "film", "released"], answer: ["They", "released", "the", "film"] },
        },
        {
          id: "b2art-write-a4", type: "word_bank",
          prompt: "4. Describe al director (cuyo trabajo es famoso):",
          payload: { words: ["whose", "The", "famous,", "work", "director,", "is", "spoke"], answer: ["The", "director,", "whose", "work", "is", "famous,", "spoke"] },
        },
        {
          id: "b2art-write-a5", type: "word_bank",
          prompt: "5. Di que es una verdadera obra maestra:",
          payload: { words: ["masterpiece", "It's", "true", "a"], answer: ["It's", "a", "true", "masterpiece"] },
        },
        {
          id: "b2art-write-a6", type: "multiple_choice",
          prompt: "6. In non-defining clauses, which pronoun is NOT used?",
          payload: { choices: ["who", "which", "that"], answer: 2 },
        },
        {
          id: "b2art-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct one:",
          payload: { choices: ["My car, who is red, is fast.", "My car, which is red, is fast.", "My car who is red is fast."], answer: 1 },
        },
        {
          id: "b2art-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'obra maestra'?",
          payload: { choices: ["review", "masterpiece", "plot"], answer: 1 },
        },
      ],
    },
  ],
};
