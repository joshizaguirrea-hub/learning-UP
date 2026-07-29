/**
 * data/units/it4-cibo.js — Unita A1 italiano "Il cibo" (piacere + articoli).
 *
 * Dati PURI. term = italiano (meta), translation = spagnolo (L1 dello studente).
 */

export const IT4_CIBO = {
  id: "it4-cibo",
  language: "it",
  level: "A1",
  title: "Il cibo",
  subtitle: "Hablar de comida y gustos con 'piacere' y los articulos",

  cando: [
    "Puedo nombrar comidas y bebidas comunes.",
    "Puedo decir lo que me gusta con 'mi piace / mi piacciono'.",
    "Puedo usar los articulos (il, la, l', i, le).",
    "Puedo pedir algo de forma educada.",
  ],

  vocab: [
    { id: "it4c-1", term: "il pane", translation: "el pan", example: "Mangio il pane a colazione." },
    { id: "it4c-2", term: "l'acqua", translation: "el agua", example: "Bevo l'acqua." },
    { id: "it4c-3", term: "il caffe", translation: "el cafe", example: "Mi piace il caffe." },
    { id: "it4c-4", term: "la frutta", translation: "la fruta", example: "La frutta e sana." },
    { id: "it4c-5", term: "la verdura", translation: "la verdura", example: "Mangio la verdura ogni giorno." },
    { id: "it4c-6", term: "la carne", translation: "la carne", example: "Non mangio la carne." },
    { id: "it4c-7", term: "il pesce", translation: "el pescado", example: "Il pesce e buono." },
    { id: "it4c-8", term: "la pizza", translation: "la pizza", example: "Mi piace la pizza." },
    { id: "it4c-9", term: "la pasta", translation: "la pasta", example: "La pasta e italiana." },
    { id: "it4c-10", term: "il formaggio", translation: "el queso", example: "Amo il formaggio." },
    { id: "it4c-11", term: "il dolce", translation: "el postre/dulce", example: "Mi piacciono i dolci." },
    { id: "it4c-12", term: "il vino", translation: "el vino", example: "Un bicchiere di vino, per favore." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "it4c-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: cibo e gusti",
      intro: "Competencia de LECTURA. Lee DOS textos en italiano y responde las preguntas.",
      content: {
        reading:
          "TESTO 1 - I gusti di Luca\n" +
          "Ciao! Mi chiamo Luca. Mi piace molto la pizza e mi piacciono i dolci. " +
          "A colazione mangio il pane e bevo il caffe. Non mi piace il pesce, ma mi piace la carne. " +
          "Mia sorella e vegetariana: le piace la verdura e la frutta. La sera beviamo un bicchiere di vino.\n\n" +
          "TESTO 2 - Al ristorante\n" +
          "A: Ti piace la pasta? B: Si, mi piace molto! E a te? A: Anche a me. Ma non mi piace il formaggio. " +
          "B: Davvero? A me piacciono tutti i formaggi! A: Prendo una pizza, per favore. B: Per me la pasta.",
        glossary: [
          { term: "mi piace / mi piacciono", translation: "me gusta / me gustan" },
          { term: "ti piace / le piace", translation: "te gusta / le gusta (a ella)" },
          { term: "non mi piace", translation: "no me gusta" },
          { term: "a me / a te", translation: "a mi / a ti" },
          { term: "anche a me", translation: "a mi tambien" },
          { term: "davvero?", translation: "de verdad?" },
          { term: "prendo", translation: "tomo / pido" },
          { term: "un bicchiere di", translation: "un vaso/copa de" },
        ],
        keyPhrases: [
          "Ojo: 'mi piace' + singular; 'mi piacciono' + plural (igual que 'me gusta/me gustan').",
          "Fijate en que come y que NO le gusta a cada persona.",
        ],
        check: [
          { prompt: "T1: Cosa piace molto a Luca?", choices: ["Il pesce", "La pizza", "La verdura"], answer: 1 },
          { prompt: "T1: Cosa NON piace a Luca?", choices: ["La carne", "Il pesce", "I dolci"], answer: 1 },
          { prompt: "T1: Cosa piace alla sorella?", choices: ["La carne", "La verdura e la frutta", "Il vino"], answer: 1 },
          { prompt: "T1: Cosa bevono la sera?", choices: ["Caffe", "Vino", "Acqua"], answer: 1 },
          { prompt: "T2: A B piace la pasta?", choices: ["Si, molto", "No", "Solo a volte"], answer: 0 },
          { prompt: "T2: Cosa NON piace ad A?", choices: ["La pasta", "Il formaggio", "La pizza"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "it4c-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: cibo e bevande",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "il pane / l'acqua", translation: "el pan / el agua" },
        { term: "il caffe / il vino", translation: "el cafe / el vino" },
        { term: "la frutta / la verdura", translation: "la fruta / la verdura" },
        { term: "la carne / il pesce", translation: "la carne / el pescado" },
        { term: "la pizza / la pasta", translation: "la pizza / la pasta" },
        { term: "il formaggio", translation: "el queso" },
        { term: "il dolce", translation: "el postre/dulce" },
        { term: "mi piace / mi piacciono", translation: "me gusta / me gustan" },
      ],
      activities: [
        {
          id: "it4c-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "pane", right: "pan" },
            { left: "acqua", right: "agua" },
            { left: "carne", right: "carne" },
            { left: "pesce", right: "pescado" },
          ] },
        },
        {
          id: "it4c-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "frutta", right: "fruta" },
            { left: "formaggio", right: "queso" },
            { left: "dolce", right: "postre" },
            { left: "vino", right: "vino" },
          ] },
        },
        {
          id: "it4c-vocab-a3", type: "cloze",
          prompt: "Completa: 'Bevo ___ acqua.' (el/la -> l')",
          payload: { answer: "l'", alt: ["l", "l\u2019"] },
          explain: "Antes de vocal: 'l'acqua'.",
        },
        {
          id: "it4c-vocab-a4", type: "cloze",
          prompt: "Completa: 'Mangio ___ pane.' (el -> il)",
          payload: { answer: "il" },
          explain: "Masculino ante consonante: 'il pane'.",
        },
        {
          id: "it4c-vocab-a5", type: "cloze",
          prompt: "Completa: 'Mi piace ___ pizza.' (la)",
          payload: { answer: "la" },
          explain: "Femenino: 'la pizza'.",
        },
        {
          id: "it4c-vocab-a6", type: "multiple_choice",
          prompt: "Cual significa 'el queso'?",
          payload: { choices: ["il pesce", "il formaggio", "il pane"], answer: 1 },
          explain: "'Il formaggio' = el queso.",
        },
        {
          id: "it4c-vocab-a7", type: "multiple_choice",
          prompt: "Como se dice 'me gustan los dulces'?",
          payload: { choices: ["Mi piace i dolci", "Mi piacciono i dolci", "Mi piaci i dolci"], answer: 1 },
          explain: "Plural -> 'mi piacciono i dolci'.",
        },
        {
          id: "it4c-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["caffe", "il", "Mi", "piace"], answer: ["Mi", "piace", "il", "caffe"] },
          explain: "'Mi piace il caffe' = me gusta el cafe.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "it4c-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: 'piacere' + articoli",
      intro: "Competencia de GRAMATICA. Aprende 'mi piace / mi piacciono' y los articulos.",
      grammar: {
        title: "'Piacere' e gli articoli",
        chart: {
          title: "PIACERE",
          maps: "gustar (me gusta / me gustan)",
          groups: [
            {
              label: "PIACERE", color: "amber",
              forms: [
                { form: "MI PIACE", subjects: "+ singular / infinitivo" },
                { form: "MI PIACCIONO", subjects: "+ plural" },
                { form: "TI PIACE / LE PIACE", subjects: "te gusta / le gusta" },
                { form: "NON MI PIACE", subjects: "no me gusta" },
              ],
            },
            {
              label: "ARTICOLI", color: "sky",
              forms: [
                { form: "IL / LA / L'", subjects: "el/la (l' ante vocal)" },
                { form: "I / LE / GLI", subjects: "los/las (plural)" },
              ],
            },
          ],
        },
        form: "mi *piace* la pizza / mi *piacciono* i dolci",
        desc: "Igual que en espanol: 'me gusta' + singular, 'me gustan' + plural. Con infinitivo siempre 'mi piace' (mi piace mangiare).",
        rule: "'Piacere' funciona como 'gustar': mi piace + cosa SINGULAR o infinitivo; mi piacciono + cosa PLURAL. Para otros: ti piace (a ti), le piace (a ella), gli piace (a el). Negativo: non mi piace. Articulos: il (masc.), la (fem.), l' (ante vocal), i (masc. pl.), le (fem. pl.), gli (masc. pl. ante vocal/s+cons).",
        examples: ["Mi piace la pizza.", "Mi piacciono i dolci.", "Non mi piace il pesce.", "Ti piace mangiare la pasta?"],
        explain: { tr: ["Me gusta la pizza.", "Me gustan los dulces.", "No me gusta el pescado.", "Te gusta comer la pasta?"] },
        mistakes: [
          { wrong: "Mi piace i dolci.", right: "Mi piacciono i dolci." },
          { wrong: "Mi piacciono la pizza.", right: "Mi piace la pizza." },
          { wrong: "Mi piace la acqua.", right: "Mi piace l'acqua." },
        ],
      },
      activities: [
        {
          id: "it4c-gram-a1", type: "cloze",
          prompt: "Completa: 'Mi ___ la pizza.' (gusta, singular)",
          payload: { answer: "piace" },
          explain: "Singular -> 'mi piace'.",
        },
        {
          id: "it4c-gram-a2", type: "cloze",
          prompt: "Completa: 'Mi ___ i dolci.' (gustan, plural)",
          payload: { answer: "piacciono" },
          explain: "Plural -> 'mi piacciono'.",
        },
        {
          id: "it4c-gram-a3", type: "cloze",
          prompt: "Completa: 'Bevo ___ acqua.' (el/la ante vocal)",
          payload: { answer: "l'", alt: ["l", "l\u2019"] },
          explain: "Ante vocal: 'l'acqua'.",
        },
        {
          id: "it4c-gram-a4", type: "cloze",
          prompt: "Completa: 'Mangio ___ pane.' (el masc.)",
          payload: { answer: "il" },
          explain: "Masc. ante consonante: 'il pane'.",
        },
        {
          id: "it4c-gram-a5", type: "multiple_choice",
          prompt: "Scegli la frase corretta:",
          payload: { choices: ["Mi piace i formaggi.", "Mi piacciono i formaggi.", "Mi piaci i formaggi."], answer: 1 },
          explain: "'i formaggi' es plural -> 'mi piacciono'.",
        },
        {
          id: "it4c-gram-a6", type: "multiple_choice",
          prompt: "Como dices 'no me gusta el pescado'?",
          payload: { choices: ["Non mi piace il pesce.", "Mi piace no il pesce.", "Non mi piacciono il pesce."], answer: 0 },
          explain: "Negativo singular: 'non mi piace il pesce'.",
        },
        {
          id: "it4c-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["piacciono", "Mi", "dolci", "i"], answer: ["Mi", "piacciono", "i", "dolci"] },
          explain: "Orden: Mi + piacciono + i + dolci.",
        },
        {
          id: "it4c-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["piace", "mangiare", "Mi", "la", "pasta"], answer: ["Mi", "piace", "mangiare", "la", "pasta"] },
          explain: "Con infinitivo: 'mi piace mangiare...'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "it4c-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: i tuoi gusti",
      intro: "Competencia de ESCRITURA. Habla de lo que te gusta comer, frase por frase.",
      activities: [
        {
          id: "it4c-write-a1", type: "word_bank",
          prompt: "1. Di una comida que te gusta:",
          payload: { words: ["piace", "Mi", "pizza", "la"], answer: ["Mi", "piace", "la", "pizza"] },
        },
        {
          id: "it4c-write-a2", type: "word_bank",
          prompt: "2. Di algo (plural) que te gusta:",
          payload: { words: ["piacciono", "Mi", "dolci", "i"], answer: ["Mi", "piacciono", "i", "dolci"] },
        },
        {
          id: "it4c-write-a3", type: "word_bank",
          prompt: "3. Di algo que NO te gusta:",
          payload: { words: ["piace", "Non", "il", "mi", "pesce"], answer: ["Non", "mi", "piace", "il", "pesce"] },
        },
        {
          id: "it4c-write-a4", type: "word_bank",
          prompt: "4. Di que bebes:",
          payload: { words: ["acqua", "Bevo", "l'"], answer: ["Bevo", "l'", "acqua"] },
        },
        {
          id: "it4c-write-a5", type: "word_bank",
          prompt: "5. Di que te gusta comer (infinitivo):",
          payload: { words: ["mangiare", "Mi", "pasta", "piace", "la"], answer: ["Mi", "piace", "mangiare", "la", "pasta"] },
        },
        {
          id: "it4c-write-a6", type: "multiple_choice",
          prompt: "6. Cual frase es correcta?",
          payload: { choices: ["Mi piace i dolci.", "Mi piacciono i dolci.", "Mi piaci i dolci."], answer: 1 },
        },
        {
          id: "it4c-write-a7", type: "multiple_choice",
          prompt: "7. Como preguntas 'te gusta la pasta?'",
          payload: { choices: ["Ti piace la pasta?", "Mi piace la pasta?", "Le piaci la pasta?"], answer: 0 },
        },
        {
          id: "it4c-write-a8", type: "multiple_choice",
          prompt: "8. Cual articulo va con 'acqua'?",
          payload: { choices: ["il acqua", "la acqua", "l'acqua"], answer: 2 },
        },
      ],
    },
  ],
};
