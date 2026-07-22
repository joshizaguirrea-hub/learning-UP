/**
 * data/units/a2-free-time-sport.js — Unidad tematica "Free time & sport" (A2).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Listening/Speaking con audio/IA.
 */

export const A2_FREE_TIME_SPORT = {
  id: "a2-free-time-sport",
  language: "en",
  level: "A2",
  title: "Free time & sport",
  subtitle: "Hablar de deporte, con el primer condicional y adverbios",

  cando: [
    "Puedo hablar de deportes y actividades.",
    "Puedo usar el primer condicional (If + presente, will).",
    "Puedo usar adverbios de modo (well, badly, quickly).",
    "Puedo hablar de habilidades y resultados.",
  ],

  vocab: [
    { id: "a2fs-1", term: "team", translation: "equipo", example: "My team plays on Sundays." },
    { id: "a2fs-2", term: "to win", translation: "ganar", example: "If we train, we'll win." },
    { id: "a2fs-3", term: "to lose", translation: "perder", example: "We'll lose if we don't try." },
    { id: "a2fs-4", term: "to train", translation: "entrenar", example: "They train every day." },
    { id: "a2fs-5", term: "match", translation: "partido", example: "The match starts at five." },
    { id: "a2fs-6", term: "well", translation: "bien (adverbio)", example: "She plays very well." },
    { id: "a2fs-7", term: "badly", translation: "mal (adverbio)", example: "He played badly today." },
    { id: "a2fs-8", term: "quickly", translation: "rapidamente", example: "He runs quickly." },
    { id: "a2fs-9", term: "to score", translation: "anotar / marcar", example: "She scored two goals." },
    { id: "a2fs-10", term: "fit", translation: "en forma", example: "Exercise keeps you fit." },
    { id: "a2fs-11", term: "coach", translation: "entrenador", example: "The coach is very strict." },
    { id: "a2fs-12", term: "to practise", translation: "practicar", example: "She practises every day." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "a2fs-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: el gran partido",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - The big match\n" +
          "Our team has an important match on Saturday. The coach says: 'If we train hard, we will win. If " +
          "we play badly, we will lose.' Our best player runs very quickly and scores well. She practises " +
          "every day to stay fit. 'If you believe in yourselves, you will play better,' says the coach. " +
          "Everyone is excited. If it doesn't rain, the match will be perfect!\n\n" +
          "TEXT 2 - Two fans\n" +
          "A: Do you think we'll win on Saturday? B: If we train hard, we will win for sure. A: And if it " +
          "rains? B: If it rains, the match will be difficult. A: Our new player runs really quickly! " +
          "B: Yes, and she scores well too. If she plays, we'll definitely score.",
        glossary: [
          { term: "If we train, we will win", translation: "Si entrenamos, ganaremos" },
          { term: "quickly / well / badly", translation: "rapidamente / bien / mal" },
          { term: "to score / to practise", translation: "anotar / practicar" },
          { term: "fit / coach", translation: "en forma / entrenador" },
          { term: "to believe in yourselves", translation: "creer en ustedes mismos" },
          { term: "for sure", translation: "con seguridad" },
          { term: "difficult", translation: "dificil" },
          { term: "definitely", translation: "definitivamente" },
        ],
        keyPhrases: [
          "Busca las condiciones (If...) y sus resultados (will...).",
          "Fijate en los adverbios: quickly, well, badly.",
        ],
        check: [
          { prompt: "T1: What happens if they train hard?", choices: ["They will lose", "They will win", "Nothing"], answer: 1 },
          { prompt: "T1: How does the best player run?", choices: ["Slowly", "Quickly", "Badly"], answer: 1 },
          { prompt: "T1: When will the match be perfect?", choices: ["If it rains", "If it doesn't rain", "If they lose"], answer: 1 },
          { prompt: "T2: What does B think will happen if they train hard?", choices: ["They'll win", "They'll lose", "Nothing"], answer: 0 },
          { prompt: "T2: What happens if it rains?", choices: ["The match will be easy", "The match will be difficult", "No match"], answer: 1 },
          { prompt: "T2: What does the new player do well?", choices: ["Score", "Cook", "Sing"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "a2fs-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: deporte y resultados",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "team / match", translation: "equipo / partido" },
        { term: "to win / to lose", translation: "ganar / perder" },
        { term: "to train / to practise", translation: "entrenar / practicar" },
        { term: "to score / coach", translation: "anotar / entrenador" },
        { term: "well / badly / quickly", translation: "bien / mal / rapidamente" },
        { term: "fit", translation: "en forma" },
      ],
      activities: [
        {
          id: "a2fs-vocab-a1", type: "matching",
          prompt: "Empareja adjetivo/adverbio (1/2):",
          payload: { pairs: [
            { left: "good", right: "well" },
            { left: "quick", right: "quickly" },
            { left: "bad", right: "badly" },
            { left: "slow", right: "slowly" },
          ] },
        },
        {
          id: "a2fs-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "team", right: "equipo" },
            { left: "match", right: "partido" },
            { left: "coach", right: "entrenador" },
            { left: "fit", right: "en forma" },
          ] },
        },
        {
          id: "a2fs-vocab-a3", type: "cloze",
          prompt: "Completa: 'She ___ two goals.' (score -> pasado)",
          payload: { answer: "scored" },
          explain: "Pasado regular: score -> scored.",
        },
        {
          id: "a2fs-vocab-a4", type: "cloze",
          prompt: "Completa: 'She ___ every day.' (practicar)",
          payload: { answer: "practises", alt: ["practices"] },
          explain: "'practise' con -s en 3a persona.",
        },
        {
          id: "a2fs-vocab-a5", type: "cloze",
          prompt: "Completa: 'The ___ is very strict.' (entrenador)",
          payload: { answer: "coach" },
          explain: "'Coach' = entrenador.",
        },
        {
          id: "a2fs-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'ganar'?",
          payload: { choices: ["to lose", "to win", "to train"], answer: 1 },
          explain: "'To win' = ganar.",
        },
        {
          id: "a2fs-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'en forma'?",
          payload: { choices: ["fit", "match", "team"], answer: 0 },
          explain: "'Fit' = en forma.",
        },
        {
          id: "a2fs-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["day", "They", "every", "train"], answer: ["They", "train", "every", "day"] },
          explain: "'They train every day' = entrenan todos los dias.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "a2fs-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: primer condicional",
      intro: "Competencia de GRAMATICA. Aprende el primer condicional y los adverbios de modo.",
      grammar: {
        title: "Primer condicional / adverbios de modo",
        form: "If + present simple, subject + will + base · adjective + ly = adverb (good -> well)",
        desc: "Sirve para hablar de resultados probables ('si pasa esto, pasar\u00e1 aquello') y para describir C\u00d3MO se hace algo.",
        rule: "Primer condicional: 'If + presente simple, sujeto + will + base' (If it rains, I will stay). Para el adverbio de modo a\u00f1ade -ly al adjetivo (quick -> quickly); ojo con el irregular good -> well.",
        examples: ["If we train, we will win.", "She sings beautifully.", "He runs quickly."],
        explain: { tr: ["Si entrenamos, ganaremos.", "Ella canta hermosamente.", "\u00c9l corre r\u00e1pidamente."] },
        mistakes: [
          { wrong: "If we will train, we win.", right: "If we train, we will win." },
          { wrong: "He plays good.", right: "He plays well." },
          { wrong: "She runs quick.", right: "She runs quickly." },
        ],
      },
      activities: [
        {
          id: "a2fs-gram-a1", type: "cloze",
          prompt: "Completa: 'If we train, we ___ win.' (futuro)",
          payload: { answer: "will" },
          explain: "La consecuencia lleva 'will'.",
        },
        {
          id: "a2fs-gram-a2", type: "cloze",
          prompt: "Completa: 'He runs very ___.' (quick -> adverbio)",
          payload: { answer: "quickly" },
          explain: "Adverbio de modo: quick -> quickly.",
        },
        {
          id: "a2fs-gram-a3", type: "cloze",
          prompt: "Completa: 'She plays very ___.' (adverbio de good)",
          payload: { answer: "well" },
          explain: "El adverbio de 'good' es 'well'.",
        },
        {
          id: "a2fs-gram-a4", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["She plays very good.", "She plays very well.", "She plays very goodly."], answer: 1 },
          explain: "El adverbio de 'good' es 'well'.",
        },
        {
          id: "a2fs-gram-a5", type: "multiple_choice",
          prompt: "Choose the correct first conditional:",
          payload: { choices: ["If we will study, we pass.", "If we study, we will pass.", "If we studying, we will pass."], answer: 1 },
          explain: "If + presente, ... will + base.",
        },
        {
          id: "a2fs-gram-a6", type: "word_bank",
          prompt: "Ordena el condicional:",
          payload: { words: ["rains,", "If", "stay", "it", "we'll", "home"], answer: ["If", "it", "rains,", "we'll", "stay", "home"] },
          explain: "If + it + rains, + we'll + stay + home.",
        },
        {
          id: "a2fs-gram-a7", type: "word_bank",
          prompt: "Ordena la frase con adverbio:",
          payload: { words: ["well", "She", "very", "plays"], answer: ["She", "plays", "very", "well"] },
          explain: "She + plays + very + well.",
        },
        {
          id: "a2fs-gram-a8", type: "cloze",
          prompt: "Completa: 'If they play badly, they ___ lose.' (futuro)",
          payload: { answer: "will" },
          explain: "Primer condicional: consecuencia con 'will'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "a2fs-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: predice resultados",
      intro: "Competencia de ESCRITURA. Construye frases con el primer condicional, frase por frase.",
      activities: [
        {
          id: "a2fs-write-a1", type: "word_bank",
          prompt: "1. Di que si entrenan, ganaran:",
          payload: { words: ["train,", "If", "we'll", "we", "win"], answer: ["If", "we", "train,", "we'll", "win"] },
        },
        {
          id: "a2fs-write-a2", type: "word_bank",
          prompt: "2. Di que ella juega muy bien:",
          payload: { words: ["well", "She", "very", "plays"], answer: ["She", "plays", "very", "well"] },
        },
        {
          id: "a2fs-write-a3", type: "word_bank",
          prompt: "3. Di que si llueve, se quedaran en casa:",
          payload: { words: ["rains,", "If", "stay", "it", "we'll", "home"], answer: ["If", "it", "rains,", "we'll", "stay", "home"] },
        },
        {
          id: "a2fs-write-a4", type: "word_bank",
          prompt: "4. Di que el corre rapidamente:",
          payload: { words: ["quickly", "He", "runs"], answer: ["He", "runs", "quickly"] },
        },
        {
          id: "a2fs-write-a5", type: "word_bank",
          prompt: "5. Di que practican todos los dias:",
          payload: { words: ["day", "They", "every", "practise"], answer: ["They", "practise", "every", "day"] },
        },
        {
          id: "a2fs-write-a6", type: "multiple_choice",
          prompt: "6. Which word means 'ganar'?",
          payload: { choices: ["to lose", "to win", "to train"], answer: 1 },
        },
        {
          id: "a2fs-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct one:",
          payload: { choices: ["He plays good.", "He plays well.", "He plays goodly."], answer: 1 },
        },
        {
          id: "a2fs-write-a8", type: "multiple_choice",
          prompt: "8. In the first conditional, the 'if' part uses...",
          payload: { choices: ["will + verb", "present simple", "past simple"], answer: 1 },
        },
      ],
    },
  ],
};
