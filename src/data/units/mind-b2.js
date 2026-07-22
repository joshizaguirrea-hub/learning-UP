/**
 * data/units/mind-b2.js — Unidad tematica "Mind & emotions" (B2).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: wish / if only.
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
    { id: "b2mind-11", term: "to worry", translation: "preocuparse", example: "Try not to worry so much." },
    { id: "b2mind-12", term: "mood swing", translation: "cambio de humor", example: "He has mood swings." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "b2mind-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: ojala fuera diferente",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Leo's feelings\n" +
          "Sometimes Leo feels overwhelmed and anxious. 'I wish I were more confident,' he thinks. 'If " +
          "only I had more free time to relax.' He often wishes he didn't worry so much. Last year he " +
          "regretted not asking for help sooner. Now he talks to a friend, who reminds him to stay calm. " +
          "'I wish I had started this earlier,' he says, but he is grateful for the change.\n\n" +
          "TEXT 2 - A supportive chat\n" +
          "A: How are you feeling? B: A bit overwhelmed. I wish I had more time. A: I understand. Do you " +
          "cope well? B: Not always. I wish I were calmer. A: You're doing great. B: Thanks. I'm grateful " +
          "for your support. If only I had asked for help earlier!",
        glossary: [
          { term: "I wish I were", translation: "ojala fuera" },
          { term: "if only I had", translation: "si tan solo tuviera/hubiera" },
          { term: "I wish I had started", translation: "ojala hubiera empezado" },
          { term: "anxious / calm", translation: "ansioso / tranquilo" },
          { term: "overwhelmed / to worry", translation: "abrumado / preocuparse" },
          { term: "to cope / to regret", translation: "sobrellevar / arrepentirse" },
          { term: "grateful / confident", translation: "agradecido / seguro" },
          { term: "self-esteem", translation: "autoestima" },
        ],
        keyPhrases: [
          "Fijate en wish + past (deseo presente) y wish + had + participio (arrepentimiento pasado).",
          "'If only' es como 'wish' pero mas enfatico.",
        ],
        check: [
          { prompt: "T1: How does Leo sometimes feel?", choices: ["Overwhelmed and anxious", "Calm and happy", "Bored"], answer: 0 },
          { prompt: "T1: What does he wish about himself?", choices: ["To be more confident", "To be taller", "To be richer"], answer: 0 },
          { prompt: "T1: What did he regret?", choices: ["Not asking for help sooner", "Studying", "Nothing"], answer: 0 },
          { prompt: "T2: How does B feel?", choices: ["A bit overwhelmed", "Very calm", "Angry"], answer: 0 },
          { prompt: "T2: What does B wish about time?", choices: ["To have more time", "To have less time", "Nothing"], answer: 0 },
          { prompt: "T2: What is B grateful for?", choices: ["The support", "The money", "The weather"], answer: 0 },
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
        { term: "grateful / overwhelmed", translation: "agradecido / abrumado" },
        { term: "to cope / to regret", translation: "sobrellevar / arrepentirse" },
        { term: "to worry / mood swing", translation: "preocuparse / cambio de humor" },
      ],
      activities: [
        {
          id: "b2mind-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "anxious", right: "ansioso" },
            { left: "grateful", right: "agradecido" },
            { left: "calm", right: "tranquilo" },
            { left: "confident", right: "seguro" },
          ] },
        },
        {
          id: "b2mind-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "feeling", right: "sentimiento" },
            { left: "mood", right: "estado de animo" },
            { left: "to worry", right: "preocuparse" },
            { left: "self-esteem", right: "autoestima" },
          ] },
        },
        {
          id: "b2mind-vocab-a3", type: "cloze",
          prompt: "Completa: 'I feel ___ at work.' (abrumado)",
          payload: { answer: "overwhelmed" },
          explain: "'Overwhelmed' = abrumado.",
        },
        {
          id: "b2mind-vocab-a4", type: "cloze",
          prompt: "Completa: 'She is in a good ___.' (estado de animo)",
          payload: { answer: "mood" },
          explain: "'Mood' = estado de animo.",
        },
        {
          id: "b2mind-vocab-a5", type: "cloze",
          prompt: "Completa: 'Try not to ___ so much.' (preocuparse)",
          payload: { answer: "worry" },
          explain: "'To worry' = preocuparse.",
        },
        {
          id: "b2mind-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'sobrellevar/lidiar'?",
          payload: { choices: ["to regret", "to cope", "to boost"], answer: 1 },
          explain: "'To cope (with)' = sobrellevar / lidiar.",
        },
        {
          id: "b2mind-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'autoestima'?",
          payload: { choices: ["self-esteem", "mood", "feeling"], answer: 0 },
          explain: "'Self-esteem' = autoestima.",
        },
        {
          id: "b2mind-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["calm", "Stay", "breathe", "and"], answer: ["Stay", "calm", "and", "breathe"] },
          explain: "'Stay calm and breathe' = mantente en calma y respira.",
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
        form: "present wish: wish + past · past regret: wish + had + past participle",
        desc: "Sirve para expresar deseos sobre el presente y arrepentimientos sobre el pasado.",
        rule: "Deseo del presente: 'wish + pasado simple' (I wish I had more time). Arrepentimiento del pasado: 'wish + had + participio' (I wish I had studied).",
        examples: ["I wish I were taller.", "I wish I had studied.", "If only I knew the answer."],
        explain: { tr: ["Ojal\u00e1 fuera m\u00e1s alto.", "Ojal\u00e1 hubiera estudiado.", "Si tan solo supiera la respuesta."] },
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
          id: "b2mind-gram-a4", type: "multiple_choice",
          prompt: "'I wish I had studied' talks about...",
          payload: { choices: ["A present wish", "A past regret", "A future plan"], answer: 1 },
          explain: "wish + had + participio = arrepentimiento pasado.",
        },
        {
          id: "b2mind-gram-a5", type: "cloze",
          prompt: "Completa: 'If only I ___ the answer!' (know -> pasado)",
          payload: { answer: "knew" },
          explain: "'If only + past' para un deseo presente.",
        },
        {
          id: "b2mind-gram-a6", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["knew", "I", "the", "wish", "answer", "I"], answer: ["I", "wish", "I", "knew", "the", "answer"] },
          explain: "I + wish + I + knew + the + answer.",
        },
        {
          id: "b2mind-gram-a7", type: "word_bank",
          prompt: "Ordena el arrepentimiento:",
          payload: { words: ["started", "I", "had", "wish", "earlier", "I"], answer: ["I", "wish", "I", "had", "started", "earlier"] },
          explain: "I + wish + I + had + started + earlier.",
        },
        {
          id: "b2mind-gram-a8", type: "cloze",
          prompt: "Completa: 'I wish I ___ calmer.' (deseo presente: were/was)",
          payload: { answer: "were", alt: ["was"] },
          explain: "wish + past; 'were' es la forma preferida.",
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
      intro: "Competencia de ESCRITURA. Construye frases con wish/if only.",
      activities: [
        {
          id: "b2mind-write-a1", type: "word_bank",
          prompt: "1. Di que ojala tuvieras mas tiempo:",
          payload: { words: ["time", "I", "had", "wish", "more", "I"], answer: ["I", "wish", "I", "had", "more", "time"] },
        },
        {
          id: "b2mind-write-a2", type: "word_bank",
          prompt: "2. Di que ojala hubieras empezado antes:",
          payload: { words: ["started", "I", "had", "wish", "earlier", "I"], answer: ["I", "wish", "I", "had", "started", "earlier"] },
        },
        {
          id: "b2mind-write-a3", type: "word_bank",
          prompt: "3. Di que estas agradecido por su ayuda:",
          payload: { words: ["your", "I'm", "for", "grateful", "help"], answer: ["I'm", "grateful", "for", "your", "help"] },
        },
        {
          id: "b2mind-write-a4", type: "word_bank",
          prompt: "4. Di que ojala fueras mas seguro:",
          payload: { words: ["confident", "I", "more", "wish", "were", "I"], answer: ["I", "wish", "I", "were", "more", "confident"] },
        },
        {
          id: "b2mind-write-a5", type: "word_bank",
          prompt: "5. Aconseja mantenerse en calma:",
          payload: { words: ["calm", "Stay", "breathe", "and"], answer: ["Stay", "calm", "and", "breathe"] },
        },
        {
          id: "b2mind-write-a6", type: "multiple_choice",
          prompt: "6. 'I wish I had studied' talks about...",
          payload: { choices: ["A present wish", "A past regret", "A future plan"], answer: 1 },
        },
        {
          id: "b2mind-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct one:",
          payload: { choices: ["I wish I am rich.", "I wish I were rich.", "I wish I will be rich."], answer: 1 },
        },
        {
          id: "b2mind-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'abrumado'?",
          payload: { choices: ["calm", "overwhelmed", "grateful"], answer: 1 },
        },
      ],
    },
  ],
};
