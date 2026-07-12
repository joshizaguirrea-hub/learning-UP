/**
 * data/units/mind-b2.js — Unidad tematica "Mind & emotions" (B2).
 * Datos PUROS. Modelo desacoplado por competencia. Gramatica: wish / if only.
 */

export const MIND_B2 = {
  id: "mind-b2",
  language: "en",
  level: "B2",
  title: "Mind & emotions",
  subtitle: "Hablar de sentimientos, deseos y arrepentimientos",

  cando: [
    "Puedo describir emociones y estados de animo.",
    "Puedo usar 'wish' e 'if only' para deseos y arrepentimientos.",
    "Puedo hablar de lo que me gustaria que fuera diferente.",
    "Puedo escribir sobre mis sentimientos con matiz.",
  ],

  vocab: [
    { id: "b2mind-1", term: "feeling", translation: "sentimiento", example: "It's a strange feeling." },
    { id: "b2mind-2", term: "mood", translation: "estado de animo", example: "She is in a good mood." },
    { id: "b2mind-3", term: "anxious", translation: "ansioso", example: "I feel anxious before exams." },
    { id: "b2mind-4", term: "confident", translation: "seguro de si mismo", example: "He is very confident." },
    { id: "b2mind-5", term: "to regret", translation: "arrepentirse", example: "I regret nothing." },
    { id: "b2mind-6", term: "grateful", translation: "agradecido", example: "I'm grateful for your help." },
    { id: "b2mind-7", term: "to cope", translation: "sobrellevar / lidiar", example: "She copes well with stress." },
    { id: "b2mind-8", term: "overwhelmed", translation: "abrumado", example: "I feel overwhelmed at work." },
    { id: "b2mind-9", term: "calm", translation: "tranquilo", example: "Stay calm and breathe." },
    { id: "b2mind-10", term: "self-esteem", translation: "autoestima", example: "Exercise boosts self-esteem." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "b2mind-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: ojala fuera diferente",
      intro: "Competencia de LECTURA. Lee el texto y comprueba que entendiste.",
      content: {
        reading:
          "Sometimes Leo feels overwhelmed and anxious. 'I wish I were more confident,' he thinks. " +
          "'If only I had more free time to relax.' He often wishes he didn't worry so much. Last year " +
          "he regretted not asking for help sooner. Now he talks to a friend, who reminds him to stay " +
          "calm. 'I wish I had started this earlier,' he says, but he is grateful for the change. His " +
          "self-esteem is growing, and he copes much better now.",
        keyPhrases: [
          "Fijate en wish + past (deseo presente) y wish + had + participio (arrepentimiento pasado).",
          "'If only' es como 'wish' pero mas enfatico.",
        ],
        check: [
          { prompt: "How does Leo sometimes feel?", choices: ["Overwhelmed and anxious", "Calm and happy", "Bored"], answer: 0 },
          { prompt: "What does he wish about himself?", choices: ["To be more confident", "To be taller", "To be richer"], answer: 0 },
          { prompt: "What did he regret?", choices: ["Not asking for help sooner", "Studying", "Nothing"], answer: 0 },
          { prompt: "How does he cope now?", choices: ["He talks to a friend", "He ignores it", "He works more"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "b2mind-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: mente y emociones",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "feeling / mood", translation: "sentimiento / estado de animo" },
        { term: "anxious / calm", translation: "ansioso / tranquilo" },
        { term: "confident / self-esteem", translation: "seguro / autoestima" },
        { term: "grateful", translation: "agradecido" },
        { term: "overwhelmed", translation: "abrumado" },
        { term: "to cope / to regret", translation: "sobrellevar / arrepentirse" },
      ],
      activities: [
        {
          id: "b2mind-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "anxious", right: "ansioso" },
            { left: "grateful", right: "agradecido" },
            { left: "calm", right: "tranquilo" },
          ] },
        },
        {
          id: "b2mind-vocab-a2", type: "cloze",
          prompt: "Completa: 'I feel ___ at work.' (abrumado)",
          payload: { answer: "overwhelmed" },
          explain: "'Overwhelmed' = abrumado.",
        },
        {
          id: "b2mind-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'sobrellevar/lidiar'?",
          payload: { choices: ["to regret", "to cope", "to boost"], answer: 1 },
          explain: "'To cope (with)' = sobrellevar / lidiar.",
        },
        {
          id: "b2mind-vocab-a4", type: "cloze",
          prompt: "Completa: 'She is in a good ___.' (estado de animo)",
          payload: { answer: "mood" },
          explain: "'Mood' = estado de animo.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "b2mind-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: wish / if only",
      intro: "Competencia de GRAMATICA. Aprende a expresar deseos y arrepentimientos.",
      grammar: {
        title: "wish / if only",
        form: "deseo presente: wish + past · arrepentimiento pasado: wish + had + participio",
        examples: ["I wish I were taller.", "I wish I had studied.", "If only I knew the answer."],
        mistakes: [
          { wrong: "I wish I am taller.", right: "I wish I were taller." },
          { wrong: "I wish I studied more (past regret).", right: "I wish I had studied more." },
        ],
      },
      activities: [
        {
          id: "b2mind-gram-a1", type: "cloze",
          prompt: "Completa (deseo presente): 'I wish I ___ more confident.' (were/am)",
          payload: { answer: "were" },
          explain: "wish + past (were) para deseos del presente.",
        },
        {
          id: "b2mind-gram-a2", type: "cloze",
          prompt: "Completa (arrepentimiento): 'I wish I ___ studied.' (had?)",
          payload: { answer: "had" },
          explain: "wish + had + participio para el pasado.",
        },
        {
          id: "b2mind-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["I wish I have more time.", "I wish I had more time.", "I wish I will have more time."], answer: 1 },
          explain: "wish + past (had) para un deseo presente.",
        },
        {
          id: "b2mind-gram-a4", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["knew", "I", "the", "wish", "answer", "I"], answer: ["I", "wish", "I", "knew", "the", "answer"] },
          explain: "Orden: I + wish + I + knew + the + answer.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "b2mind-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: deseos y sentimientos",
      intro: "Competencia de ESCRITURA. Construye frases con wish/if only. Ordena cada frase.",
      activities: [
        {
          id: "b2mind-write-a1", type: "word_bank",
          prompt: "Di que ojala tuvieras mas tiempo:",
          payload: { words: ["time", "I", "had", "wish", "more", "I"], answer: ["I", "wish", "I", "had", "more", "time"] },
        },
        {
          id: "b2mind-write-a2", type: "word_bank",
          prompt: "Di que ojala hubieras empezado antes:",
          payload: { words: ["started", "I", "had", "wish", "earlier", "I"], answer: ["I", "wish", "I", "had", "started", "earlier"] },
        },
        {
          id: "b2mind-write-a3", type: "word_bank",
          prompt: "Di que estas agradecido por su ayuda:",
          payload: { words: ["your", "I'm", "for", "grateful", "help"], answer: ["I'm", "grateful", "for", "your", "help"] },
        },
        {
          id: "b2mind-write-a4", type: "multiple_choice",
          prompt: "'I wish I had studied' talks about...",
          payload: { choices: ["A present wish", "A past regret", "A future plan"], answer: 1 },
        },
      ],
    },
  ],
};
