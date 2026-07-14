/**
 * data/units/environment-b1.js — Unidad tematica "Environment" (B1).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: passive voice.
 */

export const ENVIRONMENT_B1 = {
  id: "environment-b1",
  language: "en",
  level: "B1",
  title: "Environment",
  subtitle: "Hablar del medio ambiente y los problemas del planeta",

  cando: [
    "Puedo hablar de problemas ambientales y soluciones.",
    "Puedo usar la voz pasiva (presente y pasado).",
    "Puedo describir procesos y acciones sin decir quien.",
    "Puedo escribir sobre como cuidar el planeta.",
  ],

  vocab: [
    { id: "env-1", term: "pollution", translation: "contaminacion", example: "Air pollution is a big problem." },
    { id: "env-2", term: "to recycle", translation: "reciclar", example: "We recycle paper and glass." },
    { id: "env-3", term: "waste", translation: "residuos / basura", example: "We produce too much waste." },
    { id: "env-4", term: "energy", translation: "energia", example: "Solar energy is clean." },
    { id: "env-5", term: "to protect", translation: "proteger", example: "We must protect the forests." },
    { id: "env-6", term: "climate change", translation: "cambio climatico", example: "Climate change is real." },
    { id: "env-7", term: "to pollute", translation: "contaminar", example: "Factories pollute the river." },
    { id: "env-8", term: "planet", translation: "planeta", example: "We only have one planet." },
    { id: "env-9", term: "to save", translation: "ahorrar / salvar", example: "Save water every day." },
    { id: "env-10", term: "plastic", translation: "plastico", example: "Plastic harms the oceans." },
    { id: "env-11", term: "to plant", translation: "plantar / sembrar", example: "They plant trees in spring." },
    { id: "env-12", term: "rubbish", translation: "basura", example: "Pick up your rubbish." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "env-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: cuidar el planeta",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Our planet\n" +
          "Our planet is in danger. Every year, millions of tons of waste are produced, and many rivers " +
          "are polluted by factories. Last month, a beautiful beach was covered with plastic. But there " +
          "is hope. Paper and glass are recycled in many cities, and clean energy is used more than " +
          "before. Trees are planted every spring. The environment must be protected, and small actions " +
          "are made by ordinary people every day.\n\n" +
          "TEXT 2 - A green school\n" +
          "At our school, a lot is done for the environment. Rubbish is separated into three bins. Water " +
          "is saved with special taps. Last year, a garden was created by the students, and vegetables " +
          "are grown there now. Plastic bottles are not allowed, and everyone is encouraged to walk or " +
          "cycle to school.",
        glossary: [
          { term: "are produced / are polluted", translation: "son producidos / contaminados" },
          { term: "was covered / was created", translation: "fue cubierta / fue creado" },
          { term: "are recycled / are grown", translation: "son reciclados / cultivados" },
          { term: "must be protected", translation: "debe ser protegido" },
          { term: "rubbish / waste", translation: "basura / residuos" },
          { term: "to plant / to save", translation: "plantar / ahorrar" },
          { term: "bins / taps", translation: "botes / grifos" },
          { term: "are encouraged to", translation: "se les anima a" },
        ],
        keyPhrases: [
          "Fijate en las formas pasivas: are produced, was covered, are recycled.",
          "Busca los problemas y las soluciones en cada texto.",
        ],
        check: [
          { prompt: "T1: What is produced every year?", choices: ["Clean energy only", "Millions of tons of waste", "Trees"], answer: 1 },
          { prompt: "T1: What was the beach covered with?", choices: ["Sand", "Plastic", "Trees"], answer: 1 },
          { prompt: "T1: What happens every spring?", choices: ["Beaches close", "Trees are planted", "Rivers dry up"], answer: 1 },
          { prompt: "T2: How is rubbish handled at school?", choices: ["Separated into bins", "Burned", "Ignored"], answer: 0 },
          { prompt: "T2: What was created last year?", choices: ["A garden", "A pool", "A car park"], answer: 0 },
          { prompt: "T2: What are students encouraged to do?", choices: ["Drive", "Walk or cycle", "Stay home"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "env-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: medio ambiente",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "pollution / to pollute", translation: "contaminacion / contaminar" },
        { term: "to recycle / waste", translation: "reciclar / residuos" },
        { term: "energy / planet", translation: "energia / planeta" },
        { term: "to protect / to save", translation: "proteger / ahorrar" },
        { term: "climate change / plastic", translation: "cambio climatico / plastico" },
        { term: "to plant / rubbish", translation: "plantar / basura" },
      ],
      activities: [
        {
          id: "env-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "pollution", right: "contaminacion" },
            { left: "waste", right: "residuos" },
            { left: "energy", right: "energia" },
            { left: "planet", right: "planeta" },
          ] },
        },
        {
          id: "env-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "to recycle", right: "reciclar" },
            { left: "to protect", right: "proteger" },
            { left: "to plant", right: "plantar" },
            { left: "plastic", right: "plastico" },
          ] },
        },
        {
          id: "env-vocab-a3", type: "cloze",
          prompt: "Completa: 'We ___ paper and glass.' (reciclar)",
          payload: { answer: "recycle" },
          explain: "'To recycle' = reciclar.",
        },
        {
          id: "env-vocab-a4", type: "cloze",
          prompt: "Completa: '___ change is real.' (cambio climatico)",
          payload: { answer: "Climate" },
          explain: "'Climate change' = cambio climatico.",
        },
        {
          id: "env-vocab-a5", type: "cloze",
          prompt: "Completa: 'Pick up your ___.' (basura)",
          payload: { answer: "rubbish" },
          explain: "'Rubbish' = basura.",
        },
        {
          id: "env-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'proteger'?",
          payload: { choices: ["to pollute", "to protect", "to waste"], answer: 1 },
          explain: "'To protect' = proteger.",
        },
        {
          id: "env-vocab-a7", type: "multiple_choice",
          prompt: "Which harms the oceans?",
          payload: { choices: ["plastic", "energy", "trees"], answer: 0 },
          explain: "'Plastic' = plastico (dana los oceanos).",
        },
        {
          id: "env-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["water", "Save", "day", "every"], answer: ["Save", "water", "every", "day"] },
          explain: "'Save water every day' = ahorra agua todos los dias.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "env-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: voz pasiva",
      intro: "Competencia de GRAMATICA. Aprende la voz pasiva (presente y pasado).",
      grammar: {
        title: "Voz pasiva (present y past)",
        form: "presente: is/are + participio · pasado: was/were + participio · (by + agente, opcional)",
        desc: "Sirve para enfocar la acci\u00f3n o el resultado cuando no importa qui\u00e9n lo hace.",
        rule: "Voz pasiva: 'to be' + participio. Presente: 'is/are + participio' (is made). Pasado: 'was/were + participio' (was built). Si quieres decir qui\u00e9n lo hizo, a\u00f1ade 'by + agente' (opcional).",
        examples: ["Paper is recycled.", "The river was polluted.", "Trees are planted every year."],
        explain: { tr: ["El papel se recicla.", "El r\u00edo fue contaminado.", "Se plantan \u00e1rboles cada a\u00f1o."] },
        mistakes: [
          { wrong: "The river was pollute.", right: "The river was polluted." },
          { wrong: "Paper is recycle.", right: "Paper is recycled." },
          { wrong: "Trees is planted.", right: "Trees are planted." },
        ],
      },
      activities: [
        {
          id: "env-gram-a1", type: "cloze",
          prompt: "Completa: 'Paper ___ recycled here.' (is/are, singular)",
          payload: { answer: "is" },
          explain: "Pasiva presente singular: 'is' + participio.",
        },
        {
          id: "env-gram-a2", type: "cloze",
          prompt: "Completa: 'The river was ___.' (pollute -> participio)",
          payload: { answer: "polluted" },
          explain: "Pasiva pasado: was + participio (polluted).",
        },
        {
          id: "env-gram-a3", type: "cloze",
          prompt: "Completa: 'Trees ___ planted every spring.' (is/are, plural)",
          payload: { answer: "are" },
          explain: "Plural: 'are' + participio.",
        },
        {
          id: "env-gram-a4", type: "multiple_choice",
          prompt: "Choose the correct passive sentence:",
          payload: { choices: ["Trees are plant every year.", "Trees are planted every year.", "Trees is planted every year."], answer: 1 },
          explain: "Plural: 'are' + participio (planted).",
        },
        {
          id: "env-gram-a5", type: "multiple_choice",
          prompt: "Which is passive (past)?",
          payload: { choices: ["Factories pollute the river.", "The river was polluted.", "We recycle paper."], answer: 1 },
          explain: "Pasiva pasado: was + participio.",
        },
        {
          id: "env-gram-a6", type: "word_bank",
          prompt: "Ordena la frase pasiva:",
          payload: { words: ["is", "Glass", "recycled"], answer: ["Glass", "is", "recycled"] },
          explain: "Glass + is + recycled.",
        },
        {
          id: "env-gram-a7", type: "word_bank",
          prompt: "Ordena la pasiva pasada:",
          payload: { words: ["was", "A", "created", "garden"], answer: ["A", "garden", "was", "created"] },
          explain: "A + garden + was + created.",
        },
        {
          id: "env-gram-a8", type: "cloze",
          prompt: "Completa: 'The environment must be ___.' (protect -> participio)",
          payload: { answer: "protected" },
          explain: "must be + participio (protected).",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "env-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: cuida el planeta",
      intro: "Competencia de ESCRITURA. Construye frases sobre el medio ambiente, frase por frase.",
      activities: [
        {
          id: "env-write-a1", type: "word_bank",
          prompt: "1. Di que el papel se recicla:",
          payload: { words: ["recycled", "Paper", "is"], answer: ["Paper", "is", "recycled"] },
        },
        {
          id: "env-write-a2", type: "word_bank",
          prompt: "2. Di que debemos proteger los bosques:",
          payload: { words: ["protect", "We", "the", "must", "forests"], answer: ["We", "must", "protect", "the", "forests"] },
        },
        {
          id: "env-write-a3", type: "word_bank",
          prompt: "3. Di que se debe ahorrar agua:",
          payload: { words: ["day", "Save", "every", "water"], answer: ["Save", "water", "every", "day"] },
        },
        {
          id: "env-write-a4", type: "word_bank",
          prompt: "4. Di que se plantan arboles cada primavera:",
          payload: { words: ["planted", "Trees", "spring", "are", "every"], answer: ["Trees", "are", "planted", "every", "spring"] },
        },
        {
          id: "env-write-a5", type: "word_bank",
          prompt: "5. Di que el rio fue contaminado:",
          payload: { words: ["was", "The", "polluted", "river"], answer: ["The", "river", "was", "polluted"] },
        },
        {
          id: "env-write-a6", type: "multiple_choice",
          prompt: "6. Which is passive (past)?",
          payload: { choices: ["Factories pollute the river.", "The river was polluted.", "We recycle paper."], answer: 1 },
        },
        {
          id: "env-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct passive:",
          payload: { choices: ["Glass is recycle.", "Glass is recycled.", "Glass are recycled."], answer: 1 },
        },
        {
          id: "env-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'reciclar'?",
          payload: { choices: ["to pollute", "to recycle", "to waste"], answer: 1 },
        },
      ],
    },
  ],
};
