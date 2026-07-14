/**
 * data/units/a1-family.js — Unidad tematica "My family" (A1).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Listening/Speaking con audio/IA.
 */

export const A1_FAMILY = {
  id: "a1-family",
  language: "en",
  level: "A1",
  title: "My family",
  subtitle: "Hablar de tu familia y describir a las personas",

  cando: [
    "Puedo nombrar a los miembros de mi familia.",
    "Puedo usar adjetivos posesivos (my, your, his, her).",
    "Puedo usar 'have got' para hablar de lo que tengo.",
    "Puedo describir a una persona de forma simple.",
  ],

  vocab: [
    { id: "a1f-1", term: "mother", translation: "madre", example: "My mother is a doctor." },
    { id: "a1f-2", term: "father", translation: "padre", example: "His father works in a bank." },
    { id: "a1f-3", term: "brother", translation: "hermano", example: "I have got one brother." },
    { id: "a1f-4", term: "sister", translation: "hermana", example: "Her sister is ten years old." },
    { id: "a1f-5", term: "son", translation: "hijo", example: "They have got a son." },
    { id: "a1f-6", term: "daughter", translation: "hija", example: "My daughter loves music." },
    { id: "a1f-7", term: "grandmother", translation: "abuela", example: "My grandmother is very kind." },
    { id: "a1f-8", term: "grandfather", translation: "abuelo", example: "My grandfather tells stories." },
    { id: "a1f-9", term: "husband", translation: "esposo", example: "Her husband is tall." },
    { id: "a1f-10", term: "wife", translation: "esposa", example: "His wife is a teacher." },
    { id: "a1f-11", term: "children", translation: "hijos / ninos", example: "They have got two children." },
    { id: "a1f-12", term: "parents", translation: "padres", example: "My parents live in Peru." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "a1f-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: la familia de Maria",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Maria's family\n" +
          "This is Maria and her family. Her father is Carlos and her mother is Elena. Maria has got one " +
          "brother, Diego, and one sister, Lucia. Her grandmother lives with them. Carlos is a teacher and " +
          "Elena is a doctor. They are a happy family. Maria loves her family very much.\n\n" +
          "TEXT 2 - A photo\n" +
          "A: Who is this in the photo? B: That's my grandfather. He is eighty years old. A: And this woman? " +
          "B: That's my wife and our two children, a son and a daughter. A: What a lovely family! " +
          "B: Thank you. My parents are in the photo too.",
        glossary: [
          { term: "her father / her mother", translation: "su padre / su madre" },
          { term: "has got", translation: "tiene" },
          { term: "lives with", translation: "vive con" },
          { term: "grandfather / grandmother", translation: "abuelo / abuela" },
          { term: "wife / husband", translation: "esposa / esposo" },
          { term: "children", translation: "hijos" },
          { term: "parents", translation: "padres" },
          { term: "happy / lovely", translation: "feliz / encantador" },
        ],
        keyPhrases: [
          "Identifica los nombres y roles de cada miembro.",
          "Fijate en 'has got' y los posesivos (her, my, our).",
        ],
        check: [
          { prompt: "T1: Who is Maria's brother?", choices: ["Carlos", "Diego", "Lucia"], answer: 1 },
          { prompt: "T1: What is Elena's job?", choices: ["Teacher", "Doctor", "Student"], answer: 1 },
          { prompt: "T1: Who lives with them?", choices: ["An uncle", "Her grandmother", "A friend"], answer: 1 },
          { prompt: "T2: Who is in the photo first?", choices: ["A grandfather", "A brother", "A teacher"], answer: 0 },
          { prompt: "T2: How old is the grandfather?", choices: ["Eighty", "Eighteen", "Forty"], answer: 0 },
          { prompt: "T2: How many children are there?", choices: ["One", "Two", "Three"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "a1f-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: la familia",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "mother / father", translation: "madre / padre" },
        { term: "brother / sister", translation: "hermano / hermana" },
        { term: "son / daughter", translation: "hijo / hija" },
        { term: "grandmother / grandfather", translation: "abuela / abuelo" },
        { term: "husband / wife", translation: "esposo / esposa" },
        { term: "children / parents", translation: "hijos / padres" },
      ],
      activities: [
        {
          id: "a1f-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "mother", right: "madre" },
            { left: "father", right: "padre" },
            { left: "brother", right: "hermano" },
            { left: "sister", right: "hermana" },
          ] },
        },
        {
          id: "a1f-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "son", right: "hijo" },
            { left: "daughter", right: "hija" },
            { left: "grandmother", right: "abuela" },
            { left: "parents", right: "padres" },
          ] },
        },
        {
          id: "a1f-vocab-a3", type: "cloze",
          prompt: "Completa: 'Her ___ is very kind.' (abuela)",
          payload: { answer: "grandmother" },
          explain: "'Grandmother' = abuela.",
        },
        {
          id: "a1f-vocab-a4", type: "cloze",
          prompt: "Completa: 'My ___ live in Peru.' (padres)",
          payload: { answer: "parents" },
          explain: "'Parents' = padres.",
        },
        {
          id: "a1f-vocab-a5", type: "cloze",
          prompt: "Completa: 'They have got two ___.' (hijos/ninos)",
          payload: { answer: "children" },
          explain: "'Children' = hijos / ninos (plural de child).",
        },
        {
          id: "a1f-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'esposa'?",
          payload: { choices: ["husband", "wife", "sister"], answer: 1 },
          explain: "'Wife' = esposa. 'Husband' = esposo.",
        },
        {
          id: "a1f-vocab-a7", type: "multiple_choice",
          prompt: "Your father's father is your...",
          payload: { choices: ["grandfather", "brother", "son"], answer: 0 },
          explain: "'Grandfather' = abuelo.",
        },
        {
          id: "a1f-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["sister", "This", "my", "is"], answer: ["This", "is", "my", "sister"] },
          explain: "Orden: This + is + my + (persona).",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "a1f-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: posesivos y have got",
      intro: "Competencia de GRAMATICA. Aprende posesivos y 'have got' y practicalos.",
      grammar: {
        title: "have got y adjetivos posesivos",
        form: "I/you/we/they + have got · he/she/it + has got · my/your/his/her/our/their + sustantivo",
        desc: "Sirve para decir lo que TIENES (hermanos, casa) y de qui\u00e9n es algo (mi, tu, su).",
        rule: "Con I, you, we, they usas 'have got'. Con he, she, it cambia a 'has got'. Los posesivos (my, your, his, her, our, their) van SIEMPRE antes del sustantivo: 'my mother', 'their house'.",
        examples: ["I have got two brothers.", "She has got one sister.", "This is my mother.", "That is their house."],
        explain: { tr: ["Tengo dos hermanos.", "Ella tiene una hermana.", "Esta es mi madre.", "Esa es su casa."] },
        mistakes: [
          { wrong: "She have got a son.", right: "She has got a son." },
          { wrong: "I has got a sister.", right: "I have got a sister." },
          { wrong: "This is me mother.", right: "This is my mother." },
        ],
      },
      activities: [
        {
          id: "a1f-gram-a1", type: "cloze",
          prompt: "Completa: 'He ___ got two children.' (tiene)",
          payload: { answer: "has" },
          explain: "Con he/she/it: 'has got'.",
        },
        {
          id: "a1f-gram-a2", type: "cloze",
          prompt: "Completa: 'I ___ got one brother.' (tengo)",
          payload: { answer: "have" },
          explain: "Con I/you/we/they: 'have got'.",
        },
        {
          id: "a1f-gram-a3", type: "cloze",
          prompt: "Completa: 'This is ___ sister.' (mi)",
          payload: { answer: "my" },
          explain: "'My' = mi. Va antes del sustantivo.",
        },
        {
          id: "a1f-gram-a4", type: "cloze",
          prompt: "Completa: 'That is ___ house.' (de ellos)",
          payload: { answer: "their" },
          explain: "'Their' = de ellos/ellas.",
        },
        {
          id: "a1f-gram-a5", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["I have got a brother.", "I has got a brother.", "I have get a brother."], answer: 0 },
          explain: "Con 'I': 'have got'.",
        },
        {
          id: "a1f-gram-a6", type: "multiple_choice",
          prompt: "Choose the correct possessive: 'This is ___ car.' (de ella)",
          payload: { choices: ["his", "her", "their"], answer: 1 },
          explain: "'Her' = de ella.",
        },
        {
          id: "a1f-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["mother", "is", "My", "a", "doctor"], answer: ["My", "mother", "is", "a", "doctor"] },
          explain: "Orden: My + mother + is + a + doctor.",
        },
        {
          id: "a1f-gram-a8", type: "word_bank",
          prompt: "Ordena la frase con 'have got':",
          payload: { words: ["got", "one", "I", "have", "sister"], answer: ["I", "have", "got", "one", "sister"] },
          explain: "Orden: I + have + got + one + sister.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "a1f-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: describe tu familia",
      intro: "Competencia de ESCRITURA. Construye una descripcion de tu familia, frase por frase.",
      activities: [
        {
          id: "a1f-write-a1", type: "word_bank",
          prompt: "1. Di cuantos hermanos tienes:",
          payload: { words: ["got", "one", "I", "have", "brother"], answer: ["I", "have", "got", "one", "brother"] },
        },
        {
          id: "a1f-write-a2", type: "word_bank",
          prompt: "2. Presenta a tu madre:",
          payload: { words: ["mother", "This", "my", "is"], answer: ["This", "is", "my", "mother"] },
        },
        {
          id: "a1f-write-a3", type: "word_bank",
          prompt: "3. Di el trabajo de tu padre:",
          payload: { words: ["father", "a", "My", "teacher", "is"], answer: ["My", "father", "is", "a", "teacher"] },
        },
        {
          id: "a1f-write-a4", type: "word_bank",
          prompt: "4. Di donde viven tus padres:",
          payload: { words: ["in", "My", "live", "parents", "Peru"], answer: ["My", "parents", "live", "in", "Peru"] },
        },
        {
          id: "a1f-write-a5", type: "word_bank",
          prompt: "5. Describe a tu abuela:",
          payload: { words: ["kind", "My", "is", "grandmother", "very"], answer: ["My", "grandmother", "is", "very", "kind"] },
        },
        {
          id: "a1f-write-a6", type: "multiple_choice",
          prompt: "6. Which word means 'hijos/ninos'?",
          payload: { choices: ["children", "friends", "teachers"], answer: 0 },
        },
        {
          id: "a1f-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct sentence:",
          payload: { choices: ["We are a happy family.", "We is a happy family.", "We am a happy family."], answer: 0 },
        },
        {
          id: "a1f-write-a8", type: "multiple_choice",
          prompt: "8. 'My mother's mother' is my...",
          payload: { choices: ["grandmother", "sister", "daughter"], answer: 0 },
        },
      ],
    },
  ],
};
