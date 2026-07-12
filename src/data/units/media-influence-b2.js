/**
 * data/units/media-influence-b2.js — Unidad tematica "Media & influence" (B2).
 * Datos PUROS. Modelo desacoplado por competencia. Gramatica: modales perfectos (should have, must have, could have).
 */

export const MEDIA_INFLUENCE_B2 = {
  id: "media-influence-b2",
  language: "en",
  level: "B2",
  title: "Media & influence",
  subtitle: "Hablar de redes, influencia y deducir sobre el pasado",

  cando: [
    "Puedo hablar de redes sociales e influencia.",
    "Puedo usar modales perfectos (should have, must have, could have).",
    "Puedo hacer deducciones y criticas sobre el pasado.",
    "Puedo escribir sobre el impacto de los medios.",
  ],

  vocab: [
    { id: "b2mi-1", term: "influencer", translation: "influencer", example: "She is a famous influencer." },
    { id: "b2mi-2", term: "follower", translation: "seguidor", example: "He has many followers." },
    { id: "b2mi-3", term: "to post", translation: "publicar", example: "She posts every day." },
    { id: "b2mi-4", term: "trend", translation: "tendencia", example: "It became a trend." },
    { id: "b2mi-5", term: "audience", translation: "audiencia", example: "The audience is huge." },
    { id: "b2mi-6", term: "misleading", translation: "enganoso", example: "The ad was misleading." },
    { id: "b2mi-7", term: "to influence", translation: "influir", example: "Media influences opinions." },
    { id: "b2mi-8", term: "content", translation: "contenido", example: "The content is high quality." },
    { id: "b2mi-9", term: "reliable", translation: "confiable", example: "Use reliable sources." },
    { id: "b2mi-10", term: "impact", translation: "impacto", example: "It had a big impact." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "b2mi-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: la influencia digital",
      intro: "Competencia de LECTURA. Lee el texto y comprueba que entendiste.",
      content: {
        reading:
          "An influencer posted a misleading advert last week. She should have checked the facts, but " +
          "she didn't. Her followers must have believed it, because the trend spread quickly. The " +
          "company could have avoided the problem if it had been more careful. Experts say the post " +
          "shouldn't have been published without evidence. Media has a huge impact on opinions, so " +
          "content creators must use reliable sources to protect their audience.",
        keyPhrases: [
          "Fijate en modales perfectos: should have checked, must have believed, could have avoided.",
          "Sirven para criticar (should have) o deducir (must have) sobre el pasado.",
        ],
        check: [
          { prompt: "What did the influencer post?", choices: ["A misleading advert", "A recipe", "A song"], answer: 0 },
          { prompt: "What should she have done?", choices: ["Checked the facts", "Posted more", "Nothing"], answer: 0 },
          { prompt: "Why did the trend spread?", choices: ["Followers must have believed it", "It was true", "It was funny"], answer: 0 },
          { prompt: "What must content creators use?", choices: ["Reliable sources", "More ads", "Old data"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "b2mi-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: medios e influencia",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "influencer / follower", translation: "influencer / seguidor" },
        { term: "to post / content", translation: "publicar / contenido" },
        { term: "trend / audience", translation: "tendencia / audiencia" },
        { term: "misleading / reliable", translation: "enganoso / confiable" },
        { term: "to influence", translation: "influir" },
        { term: "impact", translation: "impacto" },
      ],
      activities: [
        {
          id: "b2mi-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "follower", right: "seguidor" },
            { left: "trend", right: "tendencia" },
            { left: "reliable", right: "confiable" },
          ] },
        },
        {
          id: "b2mi-vocab-a2", type: "cloze",
          prompt: "Completa: 'The ad was ___.' (enganoso)",
          payload: { answer: "misleading" },
          explain: "'Misleading' = enganoso.",
        },
        {
          id: "b2mi-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'influir'?",
          payload: { choices: ["to post", "to influence", "to follow"], answer: 1 },
          explain: "'To influence' = influir.",
        },
        {
          id: "b2mi-vocab-a4", type: "cloze",
          prompt: "Completa: 'It had a big ___.' (impacto)",
          payload: { answer: "impact" },
          explain: "'Impact' = impacto.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "b2mi-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: modales perfectos",
      intro: "Competencia de GRAMATICA. Aprende should/must/could have + participio.",
      grammar: {
        title: "Modal perfects (past)",
        form: "should have + part (critica) · must have + part (deduccion) · could have + part (posibilidad)",
        examples: ["You should have checked.", "She must have known.", "It could have been worse."],
        mistakes: [
          { wrong: "You should checked it.", right: "You should have checked it." },
          { wrong: "She must knew.", right: "She must have known." },
        ],
      },
      activities: [
        {
          id: "b2mi-gram-a1", type: "cloze",
          prompt: "Completa: 'You ___ have checked the facts.' (critica -> should)",
          payload: { answer: "should" },
          explain: "'should have + participio' = critica de algo que no se hizo.",
        },
        {
          id: "b2mi-gram-a2", type: "cloze",
          prompt: "Completa: 'She must ___ known the truth.' (auxiliar)",
          payload: { answer: "have" },
          explain: "'must have + participio' = deduccion casi segura del pasado.",
        },
        {
          id: "b2mi-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["It could have been worse.", "It could been worse.", "It could have be worse."], answer: 0 },
          explain: "could have + participio (been).",
        },
        {
          id: "b2mi-gram-a4", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["have", "You", "asked", "should"], answer: ["You", "should", "have", "asked"] },
          explain: "Orden: You + should + have + asked.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "b2mi-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: critica y deduccion",
      intro: "Competencia de ESCRITURA. Construye frases con modales perfectos. Ordena cada frase.",
      activities: [
        {
          id: "b2mi-write-a1", type: "word_bank",
          prompt: "Di que deberian haber revisado los hechos:",
          payload: { words: ["have", "They", "the", "checked", "should", "facts"], answer: ["They", "should", "have", "checked", "the", "facts"] },
        },
        {
          id: "b2mi-write-a2", type: "word_bank",
          prompt: "Deduce que ella debio saberlo:",
          payload: { words: ["known", "She", "have", "must", "it"], answer: ["She", "must", "have", "known", "it"] },
        },
        {
          id: "b2mi-write-a3", type: "word_bank",
          prompt: "Di que los medios influyen en las opiniones:",
          payload: { words: ["opinions", "Media", "influences"], answer: ["Media", "influences", "opinions"] },
        },
        {
          id: "b2mi-write-a4", type: "multiple_choice",
          prompt: "Which expresses criticism of a past action?",
          payload: { choices: ["must have known", "should have checked", "could have been"], answer: 1 },
        },
      ],
    },
  ],
};
