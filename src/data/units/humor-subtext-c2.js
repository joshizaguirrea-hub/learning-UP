/**
 * data/units/humor-subtext-c2.js — Unidad tematica "Culture, humor & subtext" (C2).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: understatement / litotes / ironia.
 */

export const HUMOR_SUBTEXT_C2 = {
  id: "humor-subtext-c2",
  language: "en",
  level: "C2",
  title: "Culture, humor & subtext",
  subtitle: "Leer entre lineas: ironia, atenuacion y humor",

  cando: [
    "Puedo captar la ironia y el humor en ingles.",
    "Puedo usar el understatement y la litotes (not bad = good).",
    "Puedo leer el subtexto de un mensaje.",
    "Puedo escribir con un tono sutil y culto.",
  ],

  vocab: [
    { id: "c2hu-1", term: "irony", translation: "ironia", example: "There's a hint of irony." },
    { id: "c2hu-2", term: "understatement", translation: "atenuacion", example: "'Not bad' is an understatement." },
    { id: "c2hu-3", term: "sarcasm", translation: "sarcasmo", example: "His sarcasm is subtle." },
    { id: "c2hu-4", term: "subtext", translation: "subtexto", example: "The subtext is critical." },
    { id: "c2hu-5", term: "to imply", translation: "insinuar / dar a entender", example: "She implied she was tired." },
    { id: "c2hu-6", term: "wit", translation: "ingenio / agudeza", example: "British wit is famous." },
    { id: "c2hu-7", term: "tongue-in-cheek", translation: "en broma / no literal", example: "He said it tongue-in-cheek." },
    { id: "c2hu-8", term: "to read between the lines", translation: "leer entre lineas", example: "Read between the lines." },
    { id: "c2hu-9", term: "double meaning", translation: "doble sentido", example: "The joke has a double meaning." },
    { id: "c2hu-10", term: "dry humour", translation: "humor seco / sarcastico", example: "She has a dry humour." },
    { id: "c2hu-11", term: "to hint", translation: "insinuar", example: "He hinted at a problem." },
    { id: "c2hu-12", term: "literal", translation: "literal", example: "Don't take it literally." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "c2hu-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: entre lineas",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - British humour\n" +
          "British humour often relies on irony and understatement. If it's pouring with rain, someone " +
          "might say, 'Lovely weather, isn't it?' with a tongue-in-cheek smile. Saying a disaster is 'not " +
          "ideal' is a classic understatement. To understand the wit, you must read between the lines. The " +
          "subtext is usually the opposite of the literal words.\n\n" +
          "TEXT 2 - Getting the joke\n" +
          "A: He said the food was 'interesting'. B: That's not a compliment! A: Really? B: It's dry " +
          "humour. He implied it was strange. A: Ah, the subtext! B: Exactly. Never take his words " +
          "literally. A: I need to read between the lines more. B: You're getting the hang of it.",
        glossary: [
          { term: "irony / understatement", translation: "ironia / atenuacion" },
          { term: "tongue-in-cheek", translation: "en broma / no literal" },
          { term: "'not ideal' / 'not bad'", translation: "atenuaciones (litotes)" },
          { term: "wit / dry humour", translation: "ingenio / humor seco" },
          { term: "subtext / double meaning", translation: "subtexto / doble sentido" },
          { term: "to imply / to hint", translation: "insinuar / dar a entender" },
          { term: "to read between the lines", translation: "leer entre lineas" },
          { term: "literal", translation: "literal" },
        ],
        keyPhrases: [
          "El understatement dice menos de lo que se quiere (not ideal = terrible).",
          "El subtexto suele ser lo contrario de las palabras literales.",
        ],
        check: [
          { prompt: "T1: What does British humour rely on?", choices: ["Irony and understatement", "Shouting", "Long words"], answer: 0 },
          { prompt: "T1: What is 'not ideal' an example of?", choices: ["Understatement", "A question", "Praise"], answer: 0 },
          { prompt: "T1: What is the subtext usually?", choices: ["The opposite of literal words", "The same as literal", "Random"], answer: 0 },
          { prompt: "T2: Was 'interesting' a compliment?", choices: ["No", "Yes", "Maybe"], answer: 0 },
          { prompt: "T2: What did he imply about the food?", choices: ["It was strange", "It was great", "It was cheap"], answer: 0 },
          { prompt: "T2: What should A do more?", choices: ["Read between the lines", "Eat more", "Talk louder"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "c2hu-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: ironia y subtexto",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "irony / sarcasm", translation: "ironia / sarcasmo" },
        { term: "understatement / litotes", translation: "atenuacion" },
        { term: "subtext / double meaning", translation: "subtexto / doble sentido" },
        { term: "to imply / to hint", translation: "insinuar / dar a entender" },
        { term: "wit / dry humour", translation: "ingenio / humor seco" },
        { term: "tongue-in-cheek / literal", translation: "en broma / literal" },
      ],
      activities: [
        {
          id: "c2hu-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "irony", right: "ironia" },
            { left: "sarcasm", right: "sarcasmo" },
            { left: "subtext", right: "subtexto" },
            { left: "wit", right: "ingenio" },
          ] },
        },
        {
          id: "c2hu-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "to imply", right: "insinuar" },
            { left: "understatement", right: "atenuacion" },
            { left: "double meaning", right: "doble sentido" },
            { left: "literal", right: "literal" },
          ] },
        },
        {
          id: "c2hu-vocab-a3", type: "cloze",
          prompt: "Completa: 'She ___ she was tired.' (insinuar -> pasado)",
          payload: { answer: "implied" },
          explain: "'To imply' = insinuar; pasado: implied.",
        },
        {
          id: "c2hu-vocab-a4", type: "cloze",
          prompt: "Completa: 'Don't take it ___.' (literalmente)",
          payload: { answer: "literally" },
          explain: "'Literally' = literalmente.",
        },
        {
          id: "c2hu-vocab-a5", type: "cloze",
          prompt: "Completa: 'He said it ___.' (en broma / no literal)",
          payload: { answer: "tongue-in-cheek" },
          explain: "'Tongue-in-cheek' = en broma / no literal.",
        },
        {
          id: "c2hu-vocab-a6", type: "multiple_choice",
          prompt: "'Not bad' as praise is an example of...",
          payload: { choices: ["understatement", "sarcasm", "a question"], answer: 0 },
          explain: "Understatement: decir menos de lo que se quiere.",
        },
        {
          id: "c2hu-vocab-a7", type: "multiple_choice",
          prompt: "Which means 'humor seco/sarcastico'?",
          payload: { choices: ["dry humour", "double meaning", "subtext"], answer: 0 },
          explain: "'Dry humour' = humor seco.",
        },
        {
          id: "c2hu-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["the", "Read", "lines", "between"], answer: ["Read", "between", "the", "lines"] },
          explain: "'Read between the lines' = lee entre lineas.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "c2hu-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: understatement / litotes",
      intro: "Competencia de GRAMATICA. Aprende la atenuacion y la litotes (not + negativo = positivo).",
      grammar: {
        title: "Understatement & litotes",
        form: "litotes: not + adjetivo negativo = positivo suave (not bad = good) · understatement: minimizar (a bit tired)",
        examples: ["It's not bad = It's quite good.", "She's not unkind = She's kind.", "A slight problem = a big problem."],
        explain: { tr: ["No est\u00e1 mal = Est\u00e1 bastante bien.", "Ella no es descort\u00e9s = Es amable.", "Un peque\u00f1o problema = un gran problema."] },
        mistakes: [
          { wrong: "It's not bad meaning it's terrible.", right: "'Not bad' actually means 'quite good'." },
        ],
      },
      activities: [
        {
          id: "c2hu-gram-a1", type: "multiple_choice",
          prompt: "'The food was not bad' most likely means:",
          payload: { choices: ["It was quite good.", "It was terrible.", "There was no food."], answer: 0 },
          explain: "Litotes: 'not bad' = bastante bueno.",
        },
        {
          id: "c2hu-gram-a2", type: "multiple_choice",
          prompt: "'She's not unkind' means she is...",
          payload: { choices: ["kind", "cruel", "absent"], answer: 0 },
          explain: "Doble negacion suave (litotes) = positivo: kind.",
        },
        {
          id: "c2hu-gram-a3", type: "cloze",
          prompt: "Completa la litotes: 'It's ___ bad, actually it's good.' (negacion)",
          payload: { answer: "not" },
          explain: "'not bad' = bastante bueno (litotes).",
        },
        {
          id: "c2hu-gram-a4", type: "multiple_choice",
          prompt: "If a disaster is called 'not ideal', the speaker is using...",
          payload: { choices: ["understatement", "exaggeration", "a question"], answer: 0 },
          explain: "Understatement: minimiza algo grave.",
        },
        {
          id: "c2hu-gram-a5", type: "multiple_choice",
          prompt: "'That's a slight problem' (about a huge issue) is...",
          payload: { choices: ["understatement", "praise", "literal"], answer: 0 },
          explain: "Understatement irónico.",
        },
        {
          id: "c2hu-gram-a6", type: "cloze",
          prompt: "Completa: 'He's ___ unintelligent' (= es inteligente). (negacion)",
          payload: { answer: "not" },
          explain: "Litotes: not + unintelligent = inteligente.",
        },
        {
          id: "c2hu-gram-a7", type: "word_bank",
          prompt: "Ordena la litotes:",
          payload: { words: ["bad", "It's", "not"], answer: ["It's", "not", "bad"] },
          explain: "It's + not + bad (= bastante bueno).",
        },
        {
          id: "c2hu-gram-a8", type: "multiple_choice",
          prompt: "Understatement and litotes are common in...",
          payload: { choices: ["British humour", "shopping lists", "phone numbers"], answer: 0 },
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "c2hu-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: tono sutil",
      intro: "Competencia de ESCRITURA. Construye frases con atenuacion y subtexto.",
      activities: [
        {
          id: "c2hu-write-a1", type: "word_bank",
          prompt: "1. Usa una litotes (no esta mal):",
          payload: { words: ["bad", "It's", "not"], answer: ["It's", "not", "bad"] },
        },
        {
          id: "c2hu-write-a2", type: "word_bank",
          prompt: "2. Aconseja leer entre lineas:",
          payload: { words: ["the", "Read", "lines", "between"], answer: ["Read", "between", "the", "lines"] },
        },
        {
          id: "c2hu-write-a3", type: "word_bank",
          prompt: "3. Di que ella insinuo que estaba cansada:",
          payload: { words: ["tired", "She", "she", "implied", "was"], answer: ["She", "implied", "she", "was", "tired"] },
        },
        {
          id: "c2hu-write-a4", type: "word_bank",
          prompt: "4. Aconseja no tomarlo literalmente:",
          payload: { words: ["it", "Don't", "literally", "take"], answer: ["Don't", "take", "it", "literally"] },
        },
        {
          id: "c2hu-write-a5", type: "word_bank",
          prompt: "5. Di que la broma tiene doble sentido:",
          payload: { words: ["meaning", "The", "a", "joke", "double", "has"], answer: ["The", "joke", "has", "a", "double", "meaning"] },
        },
        {
          id: "c2hu-write-a6", type: "multiple_choice",
          prompt: "6. 'Not bad' most likely means...",
          payload: { choices: ["quite good", "terrible", "empty"], answer: 0 },
        },
        {
          id: "c2hu-write-a7", type: "multiple_choice",
          prompt: "7. Which means 'insinuar'?",
          payload: { choices: ["to imply", "to shout", "to read"], answer: 0 },
        },
        {
          id: "c2hu-write-a8", type: "multiple_choice",
          prompt: "8. The subtext is usually...",
          payload: { choices: ["the opposite of the literal words", "the same as the words", "a number"], answer: 0 },
        },
      ],
    },
  ],
};
