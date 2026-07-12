/**
 * data/units/science-b2.js — Unidad tematica "Science & innovation" (B2).
 * Datos PUROS. Modelo desacoplado por competencia. Gramatica: passive (all tenses) + causative.
 */

export const SCIENCE_B2 = {
  id: "science-b2",
  language: "en",
  level: "B2",
  title: "Science & innovation",
  subtitle: "Hablar de ciencia, tecnologia y descubrimientos",

  cando: [
    "Puedo hablar de ciencia e innovacion con precision.",
    "Puedo usar la voz pasiva en varios tiempos.",
    "Puedo usar el causative (have/get something done).",
    "Puedo describir procesos y avances cientificos.",
  ],

  vocab: [
    { id: "b2sci-1", term: "research", translation: "investigacion", example: "The research took years." },
    { id: "b2sci-2", term: "to discover", translation: "descubrir", example: "They discovered a new planet." },
    { id: "b2sci-3", term: "experiment", translation: "experimento", example: "The experiment was a success." },
    { id: "b2sci-4", term: "invention", translation: "invento", example: "The wheel was a great invention." },
    { id: "b2sci-5", term: "to develop", translation: "desarrollar", example: "They developed a vaccine." },
    { id: "b2sci-6", term: "evidence", translation: "evidencia", example: "There is strong evidence." },
    { id: "b2sci-7", term: "breakthrough", translation: "gran avance", example: "It was a medical breakthrough." },
    { id: "b2sci-8", term: "data", translation: "datos", example: "The data is clear." },
    { id: "b2sci-9", term: "to prove", translation: "probar / demostrar", example: "The study proved the theory." },
    { id: "b2sci-10", term: "device", translation: "dispositivo", example: "A new device was created." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "b2sci-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: un gran avance",
      intro: "Competencia de LECTURA. Lee el texto y comprueba que entendiste.",
      content: {
        reading:
          "A new vaccine has been developed by a team of scientists. The research was funded by " +
          "several universities, and the experiments have been repeated many times. Strong evidence " +
          "was found, and the results will be published next month. The theory was proved after years " +
          "of work. The laboratory had its equipment checked before the tests, and samples were " +
          "analysed carefully. This breakthrough could change medicine forever.",
        keyPhrases: [
          "Fijate en pasivas en varios tiempos: has been developed, was funded, will be published.",
          "Fijate en el causative: had its equipment checked.",
        ],
        check: [
          { prompt: "What has been developed?", choices: ["A new vaccine", "A new phone", "A car"], answer: 0 },
          { prompt: "Who funded the research?", choices: ["A company", "Several universities", "The government"], answer: 1 },
          { prompt: "When will the results be published?", choices: ["Next month", "Next year", "Today"], answer: 0 },
          { prompt: "What did the lab have done before tests?", choices: ["Its equipment checked", "Nothing", "A party"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "b2sci-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: ciencia e innovacion",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "research / evidence", translation: "investigacion / evidencia" },
        { term: "to discover / to develop", translation: "descubrir / desarrollar" },
        { term: "experiment / data", translation: "experimento / datos" },
        { term: "invention / breakthrough", translation: "invento / gran avance" },
        { term: "to prove", translation: "probar / demostrar" },
        { term: "device", translation: "dispositivo" },
      ],
      activities: [
        {
          id: "b2sci-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "research", right: "investigacion" },
            { left: "evidence", right: "evidencia" },
            { left: "breakthrough", right: "gran avance" },
          ] },
        },
        {
          id: "b2sci-vocab-a2", type: "cloze",
          prompt: "Completa: 'They ___ a vaccine.' (desarrollar -> pasado)",
          payload: { answer: "developed" },
          explain: "'To develop' = desarrollar; pasado: developed.",
        },
        {
          id: "b2sci-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'demostrar/probar'?",
          payload: { choices: ["to discover", "to prove", "to fund"], answer: 1 },
          explain: "'To prove' = probar / demostrar.",
        },
        {
          id: "b2sci-vocab-a4", type: "cloze",
          prompt: "Completa: 'The ___ is clear.' (datos)",
          payload: { answer: "data" },
          explain: "'Data' = datos.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "b2sci-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: pasiva y causative",
      intro: "Competencia de GRAMATICA. Aprende pasiva en varios tiempos y el causative.",
      grammar: {
        title: "Passive (all tenses) + causative",
        form: "pasiva: be (en su tiempo) + participio · causative: have/get + objeto + participio",
        examples: ["It has been developed.", "It will be published.", "I had my car repaired."],
        mistakes: [
          { wrong: "It has develop.", right: "It has been developed." },
          { wrong: "I had repaired my car (by someone).", right: "I had my car repaired." },
        ],
      },
      activities: [
        {
          id: "b2sci-gram-a1", type: "cloze",
          prompt: "Completa: 'The results ___ be published.' (futuro pasivo -> auxiliar)",
          payload: { answer: "will" },
          explain: "Futuro pasivo: will + be + participio.",
        },
        {
          id: "b2sci-gram-a2", type: "cloze",
          prompt: "Completa: 'A vaccine has ___ developed.' (been?)",
          payload: { answer: "been" },
          explain: "Present perfect pasivo: has + been + participio.",
        },
        {
          id: "b2sci-gram-a3", type: "multiple_choice",
          prompt: "Choose the causative sentence:",
          payload: { choices: ["I repaired my car.", "I had my car repaired.", "My car repaired me."], answer: 1 },
          explain: "Causative: have + objeto + participio (alguien lo hizo por ti).",
        },
        {
          id: "b2sci-gram-a4", type: "word_bank",
          prompt: "Ordena la frase pasiva:",
          payload: { words: ["was", "The", "funded", "research"], answer: ["The", "research", "was", "funded"] },
          explain: "Orden: The + research + was + funded.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "b2sci-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: describe un avance",
      intro: "Competencia de ESCRITURA. Construye frases sobre ciencia. Ordena cada frase.",
      activities: [
        {
          id: "b2sci-write-a1", type: "word_bank",
          prompt: "Di que una vacuna ha sido desarrollada:",
          payload: { words: ["been", "A", "has", "developed", "vaccine"], answer: ["A", "vaccine", "has", "been", "developed"] },
        },
        {
          id: "b2sci-write-a2", type: "word_bank",
          prompt: "Di que los resultados seran publicados:",
          payload: { words: ["be", "The", "will", "published", "results"], answer: ["The", "results", "will", "be", "published"] },
        },
        {
          id: "b2sci-write-a3", type: "word_bank",
          prompt: "Usa el causative (revisaron tu equipo):",
          payload: { words: ["checked", "We", "our", "had", "equipment"], answer: ["We", "had", "our", "equipment", "checked"] },
        },
        {
          id: "b2sci-write-a4", type: "multiple_choice",
          prompt: "Which is present perfect passive?",
          payload: { choices: ["It develops.", "It has been developed.", "It will develop."], answer: 1 },
        },
      ],
    },
  ],
};
