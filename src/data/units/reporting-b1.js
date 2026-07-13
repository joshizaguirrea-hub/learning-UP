/**
 * data/units/reporting-b1.js — Unidad tematica "Reporting & opinions" (B1).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: question tags.
 */

export const REPORTING_B1 = {
  id: "reporting-b1",
  language: "en",
  level: "B1",
  title: "Reporting & opinions",
  subtitle: "Dar opiniones, estar de acuerdo y usar question tags",

  cando: [
    "Puedo dar mi opinion y estar de acuerdo o en desacuerdo.",
    "Puedo usar question tags (..., isn't it?).",
    "Puedo pedir confirmacion de forma natural.",
    "Puedo escribir una opinion breve y clara.",
  ],

  vocab: [
    { id: "rep-1", term: "opinion", translation: "opinion", example: "In my opinion, it's true." },
    { id: "rep-2", term: "to agree", translation: "estar de acuerdo", example: "I agree with you." },
    { id: "rep-3", term: "to disagree", translation: "estar en desacuerdo", example: "I disagree with that." },
    { id: "rep-4", term: "point of view", translation: "punto de vista", example: "I see your point of view." },
    { id: "rep-5", term: "to suggest", translation: "sugerir", example: "I suggest a new plan." },
    { id: "rep-6", term: "in my opinion", translation: "en mi opinion", example: "In my opinion, it's fair." },
    { id: "rep-7", term: "however", translation: "sin embargo", example: "It's good; however, it's expensive." },
    { id: "rep-8", term: "to admit", translation: "admitir", example: "I admit I was wrong." },
    { id: "rep-9", term: "true", translation: "cierto / verdad", example: "That's true." },
    { id: "rep-10", term: "right", translation: "correcto / tener razon", example: "You are right." },
    { id: "rep-11", term: "to convince", translation: "convencer", example: "You convinced me." },
    { id: "rep-12", term: "actually", translation: "en realidad", example: "Actually, I think you're right." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "rep-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: una conversacion de opiniones",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Remote work\n" +
          "Tom and Lisa are talking about remote work. 'Working from home is great, isn't it?' says Tom. " +
          "'In my opinion, yes,' Lisa agrees. 'You save time, don't you?' 'That's true. However, I " +
          "sometimes miss my colleagues.' Tom admits she has a point. 'We should meet once a week, " +
          "shouldn't we?' he suggests. Lisa agrees. They don't always share the same point of view, but " +
          "they respect each other's opinions.\n\n" +
          "TEXT 2 - A friendly debate\n" +
          "A: Cities are better than towns, aren't they? B: I disagree. Actually, towns are quieter. A: But " +
          "cities have more jobs, don't they? B: That's true. However, life is more stressful. A: You have " +
          "a point. B: So we both agree that it depends! A: Exactly. You convinced me.",
        glossary: [
          { term: "isn't it? / don't you?", translation: "verdad? / no?" },
          { term: "shouldn't we? / aren't they?", translation: "verdad que si? / no?" },
          { term: "to agree / to disagree", translation: "estar de acuerdo / en desacuerdo" },
          { term: "in my opinion / point of view", translation: "en mi opinion / punto de vista" },
          { term: "however / actually", translation: "sin embargo / en realidad" },
          { term: "to admit / to suggest", translation: "admitir / sugerir" },
          { term: "to convince", translation: "convencer" },
          { term: "You have a point", translation: "tienes razon en algo" },
        ],
        keyPhrases: [
          "Fijate en las question tags: isn't it?, don't you?, shouldn't we?, aren't they?",
          "Busca en que estan de acuerdo y en que no.",
        ],
        check: [
          { prompt: "T1: What are they talking about?", choices: ["Remote work", "Travel", "Food"], answer: 0 },
          { prompt: "T1: What does Lisa sometimes miss?", choices: ["Her office chair", "Her colleagues", "The bus"], answer: 1 },
          { prompt: "T1: What does Tom suggest?", choices: ["Never meet", "Meet once a week", "Quit the job"], answer: 1 },
          { prompt: "T2: What does B say about towns?", choices: ["They are quieter", "They are noisy", "They have more jobs"], answer: 0 },
          { prompt: "T2: What do they both agree on?", choices: ["Cities are best", "It depends", "Towns are worst"], answer: 1 },
          { prompt: "T2: How does the debate end?", choices: ["A is convinced", "They argue", "They stop talking"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "rep-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: opiniones",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "opinion / point of view", translation: "opinion / punto de vista" },
        { term: "to agree / to disagree", translation: "estar de acuerdo / en desacuerdo" },
        { term: "to suggest / to admit", translation: "sugerir / admitir" },
        { term: "however / actually", translation: "sin embargo / en realidad" },
        { term: "to convince", translation: "convencer" },
        { term: "true / right", translation: "cierto / correcto" },
      ],
      activities: [
        {
          id: "rep-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "to agree", right: "estar de acuerdo" },
            { left: "to disagree", right: "estar en desacuerdo" },
            { left: "to suggest", right: "sugerir" },
            { left: "however", right: "sin embargo" },
          ] },
        },
        {
          id: "rep-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "to admit", right: "admitir" },
            { left: "to convince", right: "convencer" },
            { left: "actually", right: "en realidad" },
            { left: "opinion", right: "opinion" },
          ] },
        },
        {
          id: "rep-vocab-a3", type: "cloze",
          prompt: "Completa: 'I ___ with that idea.' (estar en desacuerdo)",
          payload: { answer: "disagree" },
          explain: "'To disagree' = estar en desacuerdo.",
        },
        {
          id: "rep-vocab-a4", type: "cloze",
          prompt: "Completa: 'You are ___.' (tienes razon)",
          payload: { answer: "right" },
          explain: "'You are right' = tienes razon.",
        },
        {
          id: "rep-vocab-a5", type: "cloze",
          prompt: "Completa: '___, I think you're right.' (en realidad)",
          payload: { answer: "Actually" },
          explain: "'Actually' = en realidad.",
        },
        {
          id: "rep-vocab-a6", type: "multiple_choice",
          prompt: "Which phrase introduces your opinion?",
          payload: { choices: ["In my opinion", "By the way", "At last"], answer: 0 },
          explain: "'In my opinion' = en mi opinion.",
        },
        {
          id: "rep-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'convencer'?",
          payload: { choices: ["to admit", "to convince", "to suggest"], answer: 1 },
          explain: "'To convince' = convencer.",
        },
        {
          id: "rep-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["you", "I", "with", "agree"], answer: ["I", "agree", "with", "you"] },
          explain: "'I agree with you' = estoy de acuerdo contigo.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "rep-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: question tags",
      intro: "Competencia de GRAMATICA. Aprende las question tags para pedir confirmacion.",
      grammar: {
        title: "Question tags",
        form: "afirmativo -> tag negativa (is, isn't it?) · negativo -> tag afirmativa (don't, do you?)",
        examples: ["It's great, isn't it?", "You save time, don't you?", "We should meet, shouldn't we?"],
        mistakes: [
          { wrong: "It's great, is it?", right: "It's great, isn't it?" },
          { wrong: "You like it, don't it?", right: "You like it, don't you?" },
        ],
      },
      activities: [
        {
          id: "rep-gram-a1", type: "cloze",
          prompt: "Completa: 'It's a good idea, ___ it?' (tag de 'is')",
          payload: { answer: "isn't" },
          explain: "Afirmativo 'is' -> tag negativa 'isn't it?'.",
        },
        {
          id: "rep-gram-a2", type: "multiple_choice",
          prompt: "Choose the correct tag: 'You work here, ___?'",
          payload: { choices: ["don't you?", "do you?", "aren't you?"], answer: 0 },
          explain: "Present simple afirmativo -> 'don't you?'.",
        },
        {
          id: "rep-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct tag: 'We should meet, ___?'",
          payload: { choices: ["should we?", "shouldn't we?", "don't we?"], answer: 1 },
          explain: "'should' afirmativo -> 'shouldn't we?'.",
        },
        {
          id: "rep-gram-a4", type: "multiple_choice",
          prompt: "Choose the correct tag: 'They are ready, ___?'",
          payload: { choices: ["aren't they?", "are they?", "don't they?"], answer: 0 },
          explain: "'are' afirmativo -> 'aren't they?'.",
        },
        {
          id: "rep-gram-a5", type: "cloze",
          prompt: "Completa: 'She likes coffee, ___ she?' (tag)",
          payload: { answer: "doesn't" },
          explain: "Present simple 3a persona afirmativo -> 'doesn't she?'.",
        },
        {
          id: "rep-gram-a6", type: "word_bank",
          prompt: "Ordena la frase con tag:",
          payload: { words: ["nice,", "It's", "it?", "isn't"], answer: ["It's", "nice,", "isn't", "it?"] },
          explain: "It's + nice, + isn't + it?",
        },
        {
          id: "rep-gram-a7", type: "word_bank",
          prompt: "Ordena la frase con tag:",
          payload: { words: ["you,", "save", "time,", "You", "don't"], answer: ["You", "save", "time,", "don't", "you,"] },
          explain: "You + save + time, + don't + you?",
        },
        {
          id: "rep-gram-a8", type: "cloze",
          prompt: "Completa: 'Cities have more jobs, ___ they?' (tag)",
          payload: { answer: "don't" },
          explain: "Present simple plural afirmativo -> 'don't they?'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "rep-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: da tu opinion",
      intro: "Competencia de ESCRITURA. Construye frases para opinar, frase por frase.",
      activities: [
        {
          id: "rep-write-a1", type: "word_bank",
          prompt: "1. Da tu opinion:",
          payload: { words: ["opinion,", "In", "it's", "my", "true"], answer: ["In", "my", "opinion,", "it's", "true"] },
        },
        {
          id: "rep-write-a2", type: "word_bank",
          prompt: "2. Di que estas de acuerdo con ella:",
          payload: { words: ["her", "I", "with", "agree"], answer: ["I", "agree", "with", "her"] },
        },
        {
          id: "rep-write-a3", type: "word_bank",
          prompt: "3. Pide confirmacion con una tag:",
          payload: { words: ["good,", "It's", "it?", "isn't"], answer: ["It's", "good,", "isn't", "it?"] },
        },
        {
          id: "rep-write-a4", type: "word_bank",
          prompt: "4. Expresa desacuerdo educado:",
          payload: { words: ["disagree", "I", "afraid", "I'm"], answer: ["I'm", "afraid", "I", "disagree"] },
        },
        {
          id: "rep-write-a5", type: "word_bank",
          prompt: "5. Admite que tenia razon:",
          payload: { words: ["right", "I", "you", "admit", "were"], answer: ["I", "admit", "you", "were", "right"] },
        },
        {
          id: "rep-write-a6", type: "multiple_choice",
          prompt: "6. Which word means 'sin embargo'?",
          payload: { choices: ["however", "because", "so"], answer: 0 },
        },
        {
          id: "rep-write-a7", type: "multiple_choice",
          prompt: "7. Correct tag: 'It's cold, ___?'",
          payload: { choices: ["is it?", "isn't it?", "does it?"], answer: 1 },
        },
        {
          id: "rep-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'convencer'?",
          payload: { choices: ["to admit", "to convince", "to suggest"], answer: 1 },
        },
      ],
    },
  ],
};
