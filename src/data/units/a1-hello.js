/**
 * data/units/a1-hello.js — Unidad tematica "Hello!" (A1).
 *
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO (ver work-career-b1.js):
 * 1 leccion = 1 competencia, contenido unico y abundante. Listening/Speaking con audio/IA.
 */

export const A1_HELLO = {
  id: "a1-hello",
  language: "en",
  level: "A1",
  title: "Hello!",
  subtitle: "Saludar, presentarte y dar tus datos personales",

  cando: [
    "Puedo saludar y despedirme.",
    "Puedo presentarme y decir mi nombre y nacionalidad.",
    "Puedo preguntar y responder datos personales basicos.",
    "Puedo usar el verbo 'to be' en frases simples.",
  ],

  vocab: [
    { id: "a1h-1", term: "hello", translation: "hola", example: "Hello! My name is Ana." },
    { id: "a1h-2", term: "goodbye", translation: "adios", example: "Goodbye! See you tomorrow." },
    { id: "a1h-3", term: "name", translation: "nombre", example: "What is your name?" },
    { id: "a1h-4", term: "nice to meet you", translation: "mucho gusto", example: "Nice to meet you, Tom." },
    { id: "a1h-5", term: "please", translation: "por favor", example: "A coffee, please." },
    { id: "a1h-6", term: "thank you", translation: "gracias", example: "Thank you very much!" },
    { id: "a1h-7", term: "country", translation: "pais", example: "What country are you from?" },
    { id: "a1h-8", term: "friend", translation: "amigo/a", example: "This is my friend, Sara." },
    { id: "a1h-9", term: "teacher", translation: "profesor/a", example: "She is my English teacher." },
    { id: "a1h-10", term: "student", translation: "estudiante", example: "I am a student." },
    { id: "a1h-11", term: "welcome", translation: "bienvenido/a", example: "Welcome to the class!" },
    { id: "a1h-12", term: "how are you?", translation: "como estas?", example: "Hi! How are you?" },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "a1h-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: saludos y presentaciones",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Meet Ana\n" +
          "Hi! My name is Ana. I am from Mexico. I am a student. This is my friend, Tom. He is from " +
          "Canada. He is a teacher. Nice to meet you! We are happy to learn English. Hello and welcome!\n\n" +
          "TEXT 2 - A short chat\n" +
          "A: Hello! How are you? B: I'm fine, thank you. And you? A: Very well! What's your name? " +
          "B: My name is Sara. I'm from Spain. A: Nice to meet you, Sara! B: Nice to meet you too. Goodbye! " +
          "A: Goodbye, see you tomorrow!",
        glossary: [
          { term: "my name is", translation: "me llamo" },
          { term: "I am from", translation: "soy de" },
          { term: "this is", translation: "este/esta es" },
          { term: "he is / she is", translation: "el es / ella es" },
          { term: "how are you?", translation: "como estas?" },
          { term: "I'm fine, thank you", translation: "estoy bien, gracias" },
          { term: "welcome", translation: "bienvenido/a" },
          { term: "see you tomorrow", translation: "nos vemos manana" },
        ],
        keyPhrases: [
          "Busca datos: de donde es cada persona y que hace.",
          "Fijate en el saludo y la despedida del Texto 2.",
        ],
        check: [
          { prompt: "T1: Where is Ana from?", choices: ["Canada", "Mexico", "Spain"], answer: 1 },
          { prompt: "T1: What is Tom's job?", choices: ["Student", "Teacher", "Doctor"], answer: 1 },
          { prompt: "T1: What is Ana's job?", choices: ["Teacher", "Student", "Doctor"], answer: 1 },
          { prompt: "T2: What is B's name?", choices: ["Ana", "Sara", "Tom"], answer: 1 },
          { prompt: "T2: Where is Sara from?", choices: ["Mexico", "Spain", "Canada"], answer: 1 },
          { prompt: "T2: How does the chat end?", choices: ["Goodbye", "Thank you", "Please"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "a1h-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: saludos y personas",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "hello / goodbye", translation: "hola / adios" },
        { term: "nice to meet you", translation: "mucho gusto" },
        { term: "please / thank you", translation: "por favor / gracias" },
        { term: "friend", translation: "amigo/a" },
        { term: "teacher / student", translation: "profesor / estudiante" },
        { term: "country", translation: "pais" },
        { term: "welcome", translation: "bienvenido/a" },
        { term: "how are you?", translation: "como estas?" },
      ],
      activities: [
        {
          id: "a1h-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "Hello", right: "Hola" },
            { left: "Goodbye", right: "Adios" },
            { left: "Thank you", right: "Gracias" },
            { left: "Please", right: "Por favor" },
          ] },
        },
        {
          id: "a1h-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "friend", right: "amigo/a" },
            { left: "teacher", right: "profesor/a" },
            { left: "student", right: "estudiante" },
            { left: "country", right: "pais" },
          ] },
        },
        {
          id: "a1h-vocab-a3", type: "cloze",
          prompt: "Completa el saludo: 'Nice to ___ you.' (conocer)",
          payload: { answer: "meet" },
          explain: "'Nice to meet you' = Mucho gusto.",
        },
        {
          id: "a1h-vocab-a4", type: "cloze",
          prompt: "Completa: 'A coffee, ___.' (por favor)",
          payload: { answer: "please" },
          explain: "'Please' = por favor.",
        },
        {
          id: "a1h-vocab-a5", type: "cloze",
          prompt: "Completa: '___ to the class!' (bienvenido)",
          payload: { answer: "Welcome" },
          explain: "'Welcome' = bienvenido/a.",
        },
        {
          id: "a1h-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'profesor/a'?",
          payload: { choices: ["student", "teacher", "friend"], answer: 1 },
          explain: "'Teacher' = profesor/a.",
        },
        {
          id: "a1h-vocab-a7", type: "multiple_choice",
          prompt: "How do you ask 'como estas?'",
          payload: { choices: ["What's your name?", "How are you?", "Where are you?"], answer: 1 },
          explain: "'How are you?' = como estas?",
        },
        {
          id: "a1h-vocab-a8", type: "word_bank",
          prompt: "Ordena la despedida:",
          payload: { words: ["you", "See", "tomorrow"], answer: ["See", "you", "tomorrow"] },
          explain: "'See you tomorrow' = nos vemos manana.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "a1h-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: el verbo 'to be'",
      intro: "Competencia de GRAMATICA. Aprende el verbo 'to be' y practicalo con varios ejercicios.",
      grammar: {
        title: "El verbo 'to be' (presente)",
        form: "I am / you are / he-she-it is / we-they are",
        examples: ["I am a student.", "She is from Canada.", "We are friends.", "They are teachers."],
        mistakes: [
          { wrong: "I is from Mexico.", right: "I am from Mexico." },
          { wrong: "He are a teacher.", right: "He is a teacher." },
          { wrong: "They is friends.", right: "They are friends." },
        ],
      },
      activities: [
        {
          id: "a1h-gram-a1", type: "cloze",
          prompt: "Completa: 'I ___ a student.' (soy)",
          payload: { answer: "am" },
          explain: "Con 'I' siempre 'am': I am / I'm.",
        },
        {
          id: "a1h-gram-a2", type: "cloze",
          prompt: "Completa: 'She ___ from Canada.' (es)",
          payload: { answer: "is" },
          explain: "Con he/she/it usamos 'is'.",
        },
        {
          id: "a1h-gram-a3", type: "cloze",
          prompt: "Completa: 'They ___ my friends.' (son)",
          payload: { answer: "are" },
          explain: "Con we/you/they usamos 'are'.",
        },
        {
          id: "a1h-gram-a4", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["We is friends.", "We are friends.", "We am friends."], answer: 1 },
          explain: "Con we/you/they usamos 'are'.",
        },
        {
          id: "a1h-gram-a5", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["He is a teacher.", "He are a teacher.", "He am a teacher."], answer: 0 },
          explain: "Con 'he' usamos 'is'.",
        },
        {
          id: "a1h-gram-a6", type: "word_bank",
          prompt: "Ordena para presentarte:",
          payload: { words: ["name", "My", "Ana", "is"], answer: ["My", "name", "is", "Ana"] },
          explain: "Orden: My + name + is + (nombre).",
        },
        {
          id: "a1h-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["from", "I", "Mexico", "am"], answer: ["I", "am", "from", "Mexico"] },
          explain: "Orden: I + am + from + (pais).",
        },
        {
          id: "a1h-gram-a8", type: "cloze",
          prompt: "Completa la pregunta: '___ you a student?' (eres)",
          payload: { answer: "Are" },
          explain: "Pregunta con 'you': Are you...?",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "a1h-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: preséntate por completo",
      intro: "Competencia de ESCRITURA. Construye una presentacion completa, frase por frase.",
      activities: [
        {
          id: "a1h-write-a1", type: "word_bank",
          prompt: "1. Saluda y di tu nombre:",
          payload: { words: ["I'm", "Hello,", "Leo"], answer: ["Hello,", "I'm", "Leo"] },
        },
        {
          id: "a1h-write-a2", type: "word_bank",
          prompt: "2. Di de donde eres:",
          payload: { words: ["from", "I'm", "Mexico"], answer: ["I'm", "from", "Mexico"] },
        },
        {
          id: "a1h-write-a3", type: "word_bank",
          prompt: "3. Di tu ocupacion:",
          payload: { words: ["a", "I'm", "student"], answer: ["I'm", "a", "student"] },
        },
        {
          id: "a1h-write-a4", type: "word_bank",
          prompt: "4. Presenta a un amigo:",
          payload: { words: ["is", "This", "friend", "my", "Tom"], answer: ["This", "is", "my", "friend", "Tom"] },
        },
        {
          id: "a1h-write-a5", type: "word_bank",
          prompt: "5. Pregunta el nombre de la otra persona:",
          payload: { words: ["your", "What's", "name?"], answer: ["What's", "your", "name?"] },
        },
        {
          id: "a1h-write-a6", type: "multiple_choice",
          prompt: "6. Best way to say goodbye:",
          payload: { choices: ["Hello!", "Goodbye, see you!", "My name is."], answer: 1 },
        },
        {
          id: "a1h-write-a7", type: "multiple_choice",
          prompt: "7. Someone says 'Nice to meet you.' You answer:",
          payload: { choices: ["Nice to meet you too.", "Goodbye.", "No, thanks."], answer: 0 },
        },
        {
          id: "a1h-write-a8", type: "multiple_choice",
          prompt: "8. Which is a polite greeting?",
          payload: { choices: ["Hello, how are you?", "Give me that.", "Go away."], answer: 0 },
        },
      ],
    },
  ],
};
