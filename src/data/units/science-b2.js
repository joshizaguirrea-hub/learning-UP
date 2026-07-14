/**
 * data/units/science-b2.js — Unidad tematica "Science & innovation" (B2).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: passive (all tenses) + causative.
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
    { id: "b2sci-11", term: "laboratory", translation: "laboratorio", example: "The tests were done in a laboratory." },
    { id: "b2sci-12", term: "to fund", translation: "financiar", example: "The project was funded by the state." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "b2sci-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: un gran avance",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - A medical breakthrough\n" +
          "A new vaccine has been developed by a team of scientists. The research was funded by several " +
          "universities, and the experiments have been repeated many times. Strong evidence was found, " +
          "and the results will be published next month. The theory was proved after years of work. The " +
          "laboratory had its equipment checked before the tests, and samples were analysed carefully.\n\n" +
          "TEXT 2 - In the lab\n" +
          "A: Is the report ready? B: Almost. The data is being analysed right now. A: Good. And the old " +
          "machine? B: We had it repaired last week. A: Perfect. When will the results be shared? B: They " +
          "will be sent to the team tomorrow. A: This device could change everything.",
        glossary: [
          { term: "has been developed", translation: "ha sido desarrollada" },
          { term: "was funded / was proved", translation: "fue financiada / demostrada" },
          { term: "will be published / sent", translation: "sera publicada / enviada" },
          { term: "is being analysed", translation: "esta siendo analizado" },
          { term: "had it repaired", translation: "lo mandamos reparar (causative)" },
          { term: "research / evidence", translation: "investigacion / evidencia" },
          { term: "breakthrough / device", translation: "gran avance / dispositivo" },
          { term: "laboratory / data", translation: "laboratorio / datos" },
        ],
        keyPhrases: [
          "Fijate en pasivas en varios tiempos: has been developed, was funded, will be published, is being analysed.",
          "Fijate en el causative: had its equipment checked, had it repaired.",
        ],
        check: [
          { prompt: "T1: What has been developed?", choices: ["A new vaccine", "A new phone", "A car"], answer: 0 },
          { prompt: "T1: Who funded the research?", choices: ["A company", "Several universities", "The army"], answer: 1 },
          { prompt: "T1: What did the lab have done before tests?", choices: ["Its equipment checked", "Nothing", "A party"], answer: 0 },
          { prompt: "T2: What is happening to the data now?", choices: ["It's being analysed", "It's lost", "It's deleted"], answer: 0 },
          { prompt: "T2: What did they do with the old machine?", choices: ["Had it repaired", "Threw it away", "Sold it"], answer: 0 },
          { prompt: "T2: When will the results be sent?", choices: ["Tomorrow", "Next year", "Never"], answer: 0 },
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
        { term: "to prove / to fund", translation: "demostrar / financiar" },
        { term: "device / laboratory", translation: "dispositivo / laboratorio" },
      ],
      activities: [
        {
          id: "b2sci-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "research", right: "investigacion" },
            { left: "evidence", right: "evidencia" },
            { left: "breakthrough", right: "gran avance" },
            { left: "data", right: "datos" },
          ] },
        },
        {
          id: "b2sci-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "to discover", right: "descubrir" },
            { left: "to develop", right: "desarrollar" },
            { left: "to prove", right: "demostrar" },
            { left: "device", right: "dispositivo" },
          ] },
        },
        {
          id: "b2sci-vocab-a3", type: "cloze",
          prompt: "Completa: 'They ___ a vaccine.' (desarrollar -> pasado)",
          payload: { answer: "developed" },
          explain: "'To develop' = desarrollar; pasado: developed.",
        },
        {
          id: "b2sci-vocab-a4", type: "cloze",
          prompt: "Completa: 'The ___ is clear.' (datos)",
          payload: { answer: "data" },
          explain: "'Data' = datos.",
        },
        {
          id: "b2sci-vocab-a5", type: "cloze",
          prompt: "Completa: 'The project was ___ by the state.' (financiar -> participio)",
          payload: { answer: "funded" },
          explain: "'To fund' = financiar; participio: funded.",
        },
        {
          id: "b2sci-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'demostrar/probar'?",
          payload: { choices: ["to discover", "to prove", "to fund"], answer: 1 },
          explain: "'To prove' = probar / demostrar.",
        },
        {
          id: "b2sci-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'gran avance'?",
          payload: { choices: ["breakthrough", "device", "evidence"], answer: 0 },
          explain: "'Breakthrough' = gran avance.",
        },
        {
          id: "b2sci-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["strong", "There", "evidence", "is"], answer: ["There", "is", "strong", "evidence"] },
          explain: "'There is strong evidence' = hay evidencia solida.",
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
        desc: "Sirve para enfocar la acci\u00f3n en cualquier tiempo y para decir que mandas hacer algo.",
        rule: "Pasiva: 'be' (en el tiempo que toque) + participio (has been developed, will be published). Causativo: 'have/get + objeto + participio' cuando otro lo hace por ti (I had my car repaired).",
        examples: ["It has been developed.", "It will be published.", "I had my car repaired."],
        explain: { tr: ["Ha sido desarrollado.", "Ser\u00e1 publicado.", "Mand\u00e9 a reparar mi coche."] },
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
          prompt: "Completa: 'A vaccine has ___ developed.' (auxiliar)",
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
          id: "b2sci-gram-a4", type: "multiple_choice",
          prompt: "Which is present perfect passive?",
          payload: { choices: ["It develops.", "It has been developed.", "It will develop."], answer: 1 },
          explain: "has been + participio.",
        },
        {
          id: "b2sci-gram-a5", type: "cloze",
          prompt: "Completa: 'The data is ___ analysed now.' (being?)",
          payload: { answer: "being" },
          explain: "Presente continuo pasivo: is being + participio.",
        },
        {
          id: "b2sci-gram-a6", type: "word_bank",
          prompt: "Ordena la frase pasiva:",
          payload: { words: ["was", "The", "funded", "research"], answer: ["The", "research", "was", "funded"] },
          explain: "The + research + was + funded.",
        },
        {
          id: "b2sci-gram-a7", type: "word_bank",
          prompt: "Ordena el causative:",
          payload: { words: ["checked", "We", "our", "had", "equipment"], answer: ["We", "had", "our", "equipment", "checked"] },
          explain: "We + had + our + equipment + checked.",
        },
        {
          id: "b2sci-gram-a8", type: "cloze",
          prompt: "Completa: 'The theory was ___ after years of work.' (prove -> participio)",
          payload: { answer: "proved", alt: ["proven"] },
          explain: "Pasiva pasado: was + participio (proved).",
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
      intro: "Competencia de ESCRITURA. Construye frases sobre ciencia, frase por frase.",
      activities: [
        {
          id: "b2sci-write-a1", type: "word_bank",
          prompt: "1. Di que una vacuna ha sido desarrollada:",
          payload: { words: ["been", "A", "has", "developed", "vaccine"], answer: ["A", "vaccine", "has", "been", "developed"] },
        },
        {
          id: "b2sci-write-a2", type: "word_bank",
          prompt: "2. Di que los resultados seran publicados:",
          payload: { words: ["be", "The", "will", "published", "results"], answer: ["The", "results", "will", "be", "published"] },
        },
        {
          id: "b2sci-write-a3", type: "word_bank",
          prompt: "3. Usa el causative (revisaron tu equipo):",
          payload: { words: ["checked", "We", "our", "had", "equipment"], answer: ["We", "had", "our", "equipment", "checked"] },
        },
        {
          id: "b2sci-write-a4", type: "word_bank",
          prompt: "4. Di que la investigacion fue financiada:",
          payload: { words: ["funded", "The", "was", "research"], answer: ["The", "research", "was", "funded"] },
        },
        {
          id: "b2sci-write-a5", type: "word_bank",
          prompt: "5. Di que los datos estan siendo analizados:",
          payload: { words: ["analysed", "The", "being", "data", "is"], answer: ["The", "data", "is", "being", "analysed"] },
        },
        {
          id: "b2sci-write-a6", type: "multiple_choice",
          prompt: "6. Which is present perfect passive?",
          payload: { choices: ["It develops.", "It has been developed.", "It will develop."], answer: 1 },
        },
        {
          id: "b2sci-write-a7", type: "multiple_choice",
          prompt: "7. Choose the causative:",
          payload: { choices: ["I cut my hair myself.", "I had my hair cut.", "My hair cut me."], answer: 1 },
        },
        {
          id: "b2sci-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'financiar'?",
          payload: { choices: ["to prove", "to fund", "to discover"], answer: 1 },
        },
      ],
    },
  ],
};
