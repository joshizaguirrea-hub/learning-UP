/**
 * data/units/a2-last-weekend.js — Unidad tematica "Last weekend" (A2).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Listening/Speaking con audio/IA.
 */

export const A2_LAST_WEEKEND = {
  id: "a2-last-weekend",
  language: "en",
  level: "A2",
  title: "Last weekend",
  subtitle: "Narrar lo que hiciste en pasado (regular e irregular)",

  cando: [
    "Puedo narrar acciones pasadas con el pasado simple.",
    "Puedo usar verbos irregulares comunes (go/went, have/had).",
    "Puedo hacer preguntas y negaciones con 'did/didn't'.",
    "Puedo contar una anecdota corta de mi fin de semana.",
  ],

  vocab: [
    { id: "a2lw-1", term: "to go (went)", translation: "ir (fue)", example: "I went to the beach." },
    { id: "a2lw-2", term: "to have (had)", translation: "tener (tuvo)", example: "We had a great time." },
    { id: "a2lw-3", term: "to meet (met)", translation: "conocer/encontrar (conocio)", example: "I met my friends." },
    { id: "a2lw-4", term: "to buy (bought)", translation: "comprar (compro)", example: "She bought a new phone." },
    { id: "a2lw-5", term: "to eat (ate)", translation: "comer (comio)", example: "We ate pizza." },
    { id: "a2lw-6", term: "to see (saw)", translation: "ver (vio)", example: "I saw a good film." },
    { id: "a2lw-7", term: "to take (took)", translation: "tomar (tomo)", example: "He took many photos." },
    { id: "a2lw-8", term: "to come (came)", translation: "venir (vino)", example: "My cousin came home." },
    { id: "a2lw-9", term: "beach", translation: "playa", example: "The beach was beautiful." },
    { id: "a2lw-10", term: "party", translation: "fiesta", example: "There was a party on Saturday." },
    { id: "a2lw-11", term: "to drink (drank)", translation: "beber (bebio)", example: "We drank lemonade." },
    { id: "a2lw-12", term: "to give (gave)", translation: "dar (dio)", example: "She gave me a gift." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "a2lw-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: un fin de semana ocupado",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - A busy weekend\n" +
          "Last weekend was very busy. On Saturday morning, I went to the beach with my friends. We took " +
          "a lot of photos and ate ice cream. In the evening, we had a party at Ana's house. I met her " +
          "cousin, who came from Spain. On Sunday, I bought a new book and saw a great film at the cinema. " +
          "I didn't study, but I relaxed a lot. It was a perfect weekend!\n\n" +
          "TEXT 2 - Monday chat\n" +
          "A: How was your weekend? B: Great! I went to a concert. A: Really? Did you like it? B: Yes, I " +
          "loved it. We drank lemonade and danced all night. A: Did you go alone? B: No, my sister came " +
          "too. She gave me a ticket for my birthday. A: How nice!",
        glossary: [
          { term: "went / took / ate", translation: "fui / tome / comi" },
          { term: "had / met / came", translation: "tuve / conoci / vino" },
          { term: "bought / saw", translation: "compre / vi" },
          { term: "drank / gave", translation: "bebi / dio" },
          { term: "didn't study", translation: "no estudie" },
          { term: "How was...?", translation: "que tal estuvo...?" },
          { term: "Did you...?", translation: "acaso...?" },
          { term: "a perfect weekend", translation: "un fin de semana perfecto" },
        ],
        keyPhrases: [
          "Ordena los eventos: sabado manana, sabado noche, domingo.",
          "Fijate en los verbos irregulares en pasado (went, ate, bought...).",
        ],
        check: [
          { prompt: "T1: Where did the person go on Saturday?", choices: ["The office", "The beach", "The gym"], answer: 1 },
          { prompt: "T1: Did the person study on Sunday?", choices: ["Yes", "No", "Only math"], answer: 1 },
          { prompt: "T1: Where did the cousin come from?", choices: ["Italy", "Spain", "France"], answer: 1 },
          { prompt: "T2: Where did B go?", choices: ["A concert", "The beach", "A museum"], answer: 0 },
          { prompt: "T2: Who came with B?", choices: ["A friend", "The sister", "Nobody"], answer: 1 },
          { prompt: "T2: What did the sister give B?", choices: ["A book", "A ticket", "A photo"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "a2lw-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: verbos irregulares",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "go / went", translation: "ir / fue" },
        { term: "have / had", translation: "tener / tuvo" },
        { term: "eat / ate", translation: "comer / comio" },
        { term: "see / saw", translation: "ver / vio" },
        { term: "buy / bought", translation: "comprar / compro" },
        { term: "drink / drank", translation: "beber / bebio" },
      ],
      activities: [
        {
          id: "a2lw-vocab-a1", type: "matching",
          prompt: "Empareja verbo y pasado (1/2):",
          payload: { pairs: [
            { left: "go", right: "went" },
            { left: "have", right: "had" },
            { left: "see", right: "saw" },
            { left: "eat", right: "ate" },
          ] },
        },
        {
          id: "a2lw-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "buy", right: "bought" },
            { left: "take", right: "took" },
            { left: "drink", right: "drank" },
            { left: "give", right: "gave" },
          ] },
        },
        {
          id: "a2lw-vocab-a3", type: "cloze",
          prompt: "Completa: 'We ___ pizza last night.' (comer -> pasado)",
          payload: { answer: "ate" },
          explain: "'eat' -> 'ate'.",
        },
        {
          id: "a2lw-vocab-a4", type: "cloze",
          prompt: "Completa: 'He ___ many photos.' (tomar -> pasado)",
          payload: { answer: "took" },
          explain: "'take' -> 'took'.",
        },
        {
          id: "a2lw-vocab-a5", type: "cloze",
          prompt: "Completa: 'She ___ me a gift.' (dar -> pasado)",
          payload: { answer: "gave" },
          explain: "'give' -> 'gave'.",
        },
        {
          id: "a2lw-vocab-a6", type: "multiple_choice",
          prompt: "Which is the past of 'buy'?",
          payload: { choices: ["buyed", "bought", "buys"], answer: 1 },
          explain: "'buy' -> 'bought' (irregular).",
        },
        {
          id: "a2lw-vocab-a7", type: "multiple_choice",
          prompt: "Which is the past of 'drink'?",
          payload: { choices: ["drinked", "drank", "drunk"], answer: 1 },
          explain: "'drink' -> 'drank' (pasado simple).",
        },
        {
          id: "a2lw-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["a", "We", "time", "had", "great"], answer: ["We", "had", "a", "great", "time"] },
          explain: "'had a great time' = la pasamos genial.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "a2lw-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: pasado simple",
      intro: "Competencia de GRAMATICA. Aprende afirmativo, negativo y pregunta en pasado.",
      grammar: {
        title: "Pasado simple (afirmativo, negativo, pregunta)",
        form: "afirm: verbo pasado · neg: didn't + base · preg: Did + sujeto + base?",
        examples: ["I went to the beach.", "I didn't go to work.", "Did you see the film?"],
        mistakes: [
          { wrong: "I didn't went home.", right: "I didn't go home." },
          { wrong: "Did you saw it?", right: "Did you see it?" },
          { wrong: "She no ate.", right: "She didn't eat." },
        ],
      },
      activities: [
        {
          id: "a2lw-gram-a1", type: "cloze",
          prompt: "Completa: 'I ___ to the beach.' (ir -> pasado)",
          payload: { answer: "went" },
          explain: "'go' -> 'went'.",
        },
        {
          id: "a2lw-gram-a2", type: "cloze",
          prompt: "Completa (negativo): 'She ___ buy a phone.' (didn't?)",
          payload: { answer: "didn't", alt: ["did not"] },
          explain: "Negativo: didn't + verbo base.",
        },
        {
          id: "a2lw-gram-a3", type: "cloze",
          prompt: "Completa (pregunta): '___ you go home?' (Did?)",
          payload: { answer: "Did" },
          explain: "Pregunta: Did + sujeto + base.",
        },
        {
          id: "a2lw-gram-a4", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["She didn't bought a phone.", "She didn't buy a phone.", "She don't buy a phone."], answer: 1 },
          explain: "Con 'didn't' el verbo va en base: 'didn't buy'.",
        },
        {
          id: "a2lw-gram-a5", type: "multiple_choice",
          prompt: "Choose the correct question:",
          payload: { choices: ["Did you went home?", "Did you go home?", "Do you went home?"], answer: 1 },
          explain: "Con 'Did', el verbo va en base.",
        },
        {
          id: "a2lw-gram-a6", type: "word_bank",
          prompt: "Ordena la pregunta:",
          payload: { words: ["did", "What", "do?", "you"], answer: ["What", "did", "you", "do?"] },
          explain: "Orden: What + did + you + do?",
        },
        {
          id: "a2lw-gram-a7", type: "word_bank",
          prompt: "Ordena la negacion:",
          payload: { words: ["study", "I", "didn't"], answer: ["I", "didn't", "study"] },
          explain: "Orden: I + didn't + study.",
        },
        {
          id: "a2lw-gram-a8", type: "cloze",
          prompt: "Completa: 'They ___ to a concert.' (ir -> pasado)",
          payload: { answer: "went" },
          explain: "'go' -> 'went' (irregular).",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "a2lw-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: cuenta tu finde",
      intro: "Competencia de ESCRITURA. Construye la historia de tu fin de semana, frase por frase.",
      activities: [
        {
          id: "a2lw-write-a1", type: "word_bank",
          prompt: "1. Di que fuiste a la playa:",
          payload: { words: ["the", "I", "to", "went", "beach"], answer: ["I", "went", "to", "the", "beach"] },
        },
        {
          id: "a2lw-write-a2", type: "word_bank",
          prompt: "2. Di que la pasaste bien:",
          payload: { words: ["a", "I", "time", "had", "great"], answer: ["I", "had", "a", "great", "time"] },
        },
        {
          id: "a2lw-write-a3", type: "word_bank",
          prompt: "3. Di que viste una buena pelicula:",
          payload: { words: ["a", "I", "film", "saw", "good"], answer: ["I", "saw", "a", "good", "film"] },
        },
        {
          id: "a2lw-write-a4", type: "word_bank",
          prompt: "4. Di que no estudiaste:",
          payload: { words: ["study", "I", "didn't"], answer: ["I", "didn't", "study"] },
        },
        {
          id: "a2lw-write-a5", type: "word_bank",
          prompt: "5. Pregunta que hizo tu amigo:",
          payload: { words: ["did", "What", "do?", "you"], answer: ["What", "did", "you", "do?"] },
        },
        {
          id: "a2lw-write-a6", type: "multiple_choice",
          prompt: "6. Which is the past of 'meet'?",
          payload: { choices: ["meeted", "met", "meets"], answer: 1 },
        },
        {
          id: "a2lw-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct one:",
          payload: { choices: ["Did you had fun?", "Did you have fun?", "Do you had fun?"], answer: 1 },
        },
        {
          id: "a2lw-write-a8", type: "multiple_choice",
          prompt: "8. 'It was a perfect weekend' is in the...",
          payload: { choices: ["present", "past", "future"], answer: 1 },
        },
      ],
    },
  ],
};
