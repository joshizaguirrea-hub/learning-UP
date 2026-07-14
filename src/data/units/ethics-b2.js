/**
 * data/units/ethics-b2.js — Unidad tematica "Ethics & decisions" (B2).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: mixed conditionals.
 */

export const ETHICS_B2 = {
  id: "ethics-b2",
  language: "en",
  level: "B2",
  title: "Ethics & decisions",
  subtitle: "Hablar de dilemas eticos y condicionales mixtos",

  cando: [
    "Puedo discutir dilemas eticos y decisiones dificiles.",
    "Puedo usar condicionales mixtos (pasado -> presente).",
    "Puedo conectar una accion pasada con un resultado actual.",
    "Puedo escribir sobre las consecuencias de una decision.",
  ],

  vocab: [
    { id: "b2eth-1", term: "honest", translation: "honesto", example: "Being honest is important." },
    { id: "b2eth-2", term: "fair", translation: "justo", example: "The decision was fair." },
    { id: "b2eth-3", term: "dilemma", translation: "dilema", example: "It's a moral dilemma." },
    { id: "b2eth-4", term: "responsibility", translation: "responsabilidad", example: "We share the responsibility." },
    { id: "b2eth-5", term: "to blame", translation: "culpar", example: "Don't blame others." },
    { id: "b2eth-6", term: "guilty", translation: "culpable", example: "He felt guilty." },
    { id: "b2eth-7", term: "to deserve", translation: "merecer", example: "She deserves a reward." },
    { id: "b2eth-8", term: "values", translation: "valores", example: "We share the same values." },
    { id: "b2eth-9", term: "to judge", translation: "juzgar", example: "Don't judge too quickly." },
    { id: "b2eth-10", term: "trust", translation: "confianza", example: "Trust must be earned." },
    { id: "b2eth-11", term: "conscience", translation: "conciencia (moral)", example: "Listen to your conscience." },
    { id: "b2eth-12", term: "to admit", translation: "admitir", example: "He admitted his mistake." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "b2eth-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: un dilema moral",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Sara's wallet\n" +
          "Sara found a wallet full of money. It was a real dilemma. If she weren't so honest, she would " +
          "have kept it. But she returned it. If she had kept the money, she would feel guilty now. Her " +
          "friend said, 'If I were you, I would have done the same.' Being fair is part of her values. If " +
          "she hadn't returned it, the owner wouldn't trust people today.\n\n" +
          "TEXT 2 - A hard choice\n" +
          "A: My friend copied my work. Should I tell the teacher? B: That's a dilemma. If you weren't " +
          "honest, you would stay quiet. A: But if I told, he would be angry. B: Listen to your " +
          "conscience. A: You're right. If I had said something earlier, this wouldn't be a problem now.",
        glossary: [
          { term: "If she had kept it, she would feel...", translation: "si la hubiera guardado, sentiria..." },
          { term: "If I were you, I would have...", translation: "si yo fuera tu, habria..." },
          { term: "honest / fair", translation: "honesto / justo" },
          { term: "dilemma / values", translation: "dilema / valores" },
          { term: "guilty / conscience", translation: "culpable / conciencia" },
          { term: "to blame / to admit", translation: "culpar / admitir" },
          { term: "to deserve / to judge", translation: "merecer / juzgar" },
          { term: "trust / responsibility", translation: "confianza / responsabilidad" },
        ],
        keyPhrases: [
          "Fijate en condicionales mixtos: If she had kept it (pasado), she would feel guilty now (presente).",
          "Conectan un pasado hipotetico con un resultado en el presente.",
        ],
        check: [
          { prompt: "T1: What did Sara find?", choices: ["A wallet full of money", "A phone", "A dog"], answer: 0 },
          { prompt: "T1: What did she do?", choices: ["Kept it", "Returned it", "Lost it"], answer: 1 },
          { prompt: "T1: How would she feel now if she had kept it?", choices: ["Happy", "Guilty", "Proud"], answer: 1 },
          { prompt: "T2: What is A's dilemma?", choices: ["Telling the teacher", "Losing money", "Being late"], answer: 0 },
          { prompt: "T2: What does B tell A to listen to?", choices: ["His conscience", "The radio", "His friend"], answer: 0 },
          { prompt: "T2: What does A realise?", choices: ["Speaking earlier would have helped", "Nothing", "To copy too"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "b2eth-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: etica y valores",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "honest / fair", translation: "honesto / justo" },
        { term: "dilemma / values", translation: "dilema / valores" },
        { term: "responsibility / conscience", translation: "responsabilidad / conciencia" },
        { term: "to blame / guilty", translation: "culpar / culpable" },
        { term: "to deserve / to judge", translation: "merecer / juzgar" },
        { term: "trust / to admit", translation: "confianza / admitir" },
      ],
      activities: [
        {
          id: "b2eth-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "honest", right: "honesto" },
            { left: "guilty", right: "culpable" },
            { left: "trust", right: "confianza" },
            { left: "fair", right: "justo" },
          ] },
        },
        {
          id: "b2eth-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "dilemma", right: "dilema" },
            { left: "values", right: "valores" },
            { left: "to deserve", right: "merecer" },
            { left: "conscience", right: "conciencia" },
          ] },
        },
        {
          id: "b2eth-vocab-a3", type: "cloze",
          prompt: "Completa: 'It's a moral ___.' (dilema)",
          payload: { answer: "dilemma" },
          explain: "'Dilemma' = dilema.",
        },
        {
          id: "b2eth-vocab-a4", type: "cloze",
          prompt: "Completa: 'The decision was ___.' (justo)",
          payload: { answer: "fair" },
          explain: "'Fair' = justo.",
        },
        {
          id: "b2eth-vocab-a5", type: "cloze",
          prompt: "Completa: 'He ___ his mistake.' (admitir -> pasado)",
          payload: { answer: "admitted" },
          explain: "'To admit' = admitir; pasado: admitted.",
        },
        {
          id: "b2eth-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'merecer'?",
          payload: { choices: ["to blame", "to deserve", "to judge"], answer: 1 },
          explain: "'To deserve' = merecer.",
        },
        {
          id: "b2eth-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'conciencia (moral)'?",
          payload: { choices: ["conscience", "dilemma", "trust"], answer: 0 },
          explain: "'Conscience' = conciencia moral.",
        },
        {
          id: "b2eth-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["others", "Don't", "blame"], answer: ["Don't", "blame", "others"] },
          explain: "'Don't blame others' = no culpes a otros.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "b2eth-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: condicionales mixtos",
      intro: "Competencia de GRAMATICA. Aprende a conectar pasado y presente hipoteticos.",
      grammar: {
        title: "Mixed conditionals",
        form: "pasado -> presente: If + had + participio, ... would + base (ahora)",
        desc: "Sirve para imaginar c\u00f3mo ser\u00eda AHORA algo que en el pasado fue diferente (arrepentimientos).",
        rule: "Condicional mixto: 'If + had + participio, ... would + base'. La condici\u00f3n es del pasado y el resultado es del presente: 'If I had studied, I would have a better job now'.",
        examples: ["If I had studied medicine, I would be a doctor now.", "If she hadn't left, she would be here today."],
        explain: { tr: ["Si hubiera estudiado medicina, ahora ser\u00eda doctor.", "Si ella no se hubiera ido, hoy estar\u00eda aqu\u00ed."] },
        mistakes: [
          { wrong: "If I had studied, I would have be a doctor now.", right: "If I had studied, I would be a doctor now." },
          { wrong: "If I studied, I would be a doctor now (past cause).", right: "If I had studied, I would be a doctor now." },
        ],
      },
      activities: [
        {
          id: "b2eth-gram-a1", type: "cloze",
          prompt: "Completa: 'If I ___ studied medicine, I would be a doctor now.' (had?)",
          payload: { answer: "had" },
          explain: "La causa pasada lleva 'had + participio'.",
        },
        {
          id: "b2eth-gram-a2", type: "cloze",
          prompt: "Completa: 'If she hadn't left, she ___ be here now.' (would/will)",
          payload: { answer: "would" },
          explain: "El resultado presente lleva 'would + base'.",
        },
        {
          id: "b2eth-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct mixed conditional:",
          payload: { choices: [
            "If I had saved money, I would be rich now.",
            "If I saved money, I would have been rich now.",
            "If I save money, I would be rich now.",
          ], answer: 0 },
          explain: "Causa pasada (had saved) -> resultado presente (would be).",
        },
        {
          id: "b2eth-gram-a4", type: "multiple_choice",
          prompt: "A mixed conditional connects...",
          payload: { choices: ["A past cause and a present result", "Two futures", "Two presents"], answer: 0 },
          explain: "Pasado hipotetico -> resultado en el presente.",
        },
        {
          id: "b2eth-gram-a5", type: "cloze",
          prompt: "Completa: 'If I had said something, this wouldn't ___ a problem now.' (be)",
          payload: { answer: "be" },
          explain: "would + base (be) para el resultado presente.",
        },
        {
          id: "b2eth-gram-a6", type: "word_bank",
          prompt: "Ordena el condicional mixto:",
          payload: { words: ["had", "If", "I", "tired", "slept,", "be", "wouldn't", "I"], answer: ["If", "I", "had", "slept,", "I", "wouldn't", "be", "tired"] },
          explain: "If + I + had + slept, + I + wouldn't + be + tired.",
        },
        {
          id: "b2eth-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["the", "She", "wallet", "returned"], answer: ["She", "returned", "the", "wallet"] },
          explain: "She + returned + the + wallet.",
        },
        {
          id: "b2eth-gram-a8", type: "cloze",
          prompt: "Completa: 'If I had studied, I ___ be a doctor now.' (would)",
          payload: { answer: "would", alt: ["'d"] },
          explain: "Condicional mixto: would + base (resultado presente).",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "b2eth-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: consecuencias de una decision",
      intro: "Competencia de ESCRITURA. Construye condicionales mixtos.",
      activities: [
        {
          id: "b2eth-write-a1", type: "word_bank",
          prompt: "1. Di que si hubieras dormido, no estarias cansado:",
          payload: { words: ["had", "If", "I", "tired", "slept,", "be", "wouldn't", "I"], answer: ["If", "I", "had", "slept,", "I", "wouldn't", "be", "tired"] },
        },
        {
          id: "b2eth-write-a2", type: "word_bank",
          prompt: "2. Di que ella devolvio la billetera:",
          payload: { words: ["the", "She", "wallet", "returned"], answer: ["She", "returned", "the", "wallet"] },
        },
        {
          id: "b2eth-write-a3", type: "word_bank",
          prompt: "3. Di que todos compartimos la responsabilidad:",
          payload: { words: ["the", "We", "share", "responsibility", "all"], answer: ["We", "all", "share", "the", "responsibility"] },
        },
        {
          id: "b2eth-write-a4", type: "word_bank",
          prompt: "4. Aconseja escuchar tu conciencia:",
          payload: { words: ["conscience", "Listen", "your", "to"], answer: ["Listen", "to", "your", "conscience"] },
        },
        {
          id: "b2eth-write-a5", type: "word_bank",
          prompt: "5. Di que ser justo es parte de sus valores:",
          payload: { words: ["values", "Being", "fair", "her", "part", "is", "of"], answer: ["Being", "fair", "is", "part", "of", "her", "values"] },
        },
        {
          id: "b2eth-write-a6", type: "multiple_choice",
          prompt: "6. A mixed conditional connects...",
          payload: { choices: ["A past cause and a present result", "Two futures", "Two presents"], answer: 0 },
        },
        {
          id: "b2eth-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct one:",
          payload: { choices: ["If I had trained, I would be fit now.", "If I trained, I would have been fit now.", "If I train, I would be fit now."], answer: 0 },
        },
        {
          id: "b2eth-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'culpable'?",
          payload: { choices: ["fair", "guilty", "honest"], answer: 1 },
        },
      ],
    },
  ],
};
