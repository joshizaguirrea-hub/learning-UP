/**
 * data/units/a2-health.js — Unidad tematica "Health & body" (A2).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Listening/Speaking con audio/IA.
 */

export const A2_HEALTH = {
  id: "a2-health",
  language: "en",
  level: "A2",
  title: "Health & body",
  subtitle: "Hablar de sintomas y dar consejos con should y must",

  cando: [
    "Puedo nombrar partes del cuerpo y sintomas comunes.",
    "Puedo dar consejos con 'should' / 'shouldn't'.",
    "Puedo expresar obligacion con 'must' y 'have to'.",
    "Puedo describir como me siento en el doctor.",
  ],

  vocab: [
    { id: "a2hb-1", term: "headache", translation: "dolor de cabeza", example: "I have a headache." },
    { id: "a2hb-2", term: "fever", translation: "fiebre", example: "She has a fever." },
    { id: "a2hb-3", term: "medicine", translation: "medicina", example: "Take this medicine." },
    { id: "a2hb-4", term: "doctor", translation: "doctor", example: "You should see a doctor." },
    { id: "a2hb-5", term: "to rest", translation: "descansar", example: "You should rest at home." },
    { id: "a2hb-6", term: "sick / ill", translation: "enfermo", example: "He is sick today." },
    { id: "a2hb-7", term: "stomach", translation: "estomago", example: "My stomach hurts." },
    { id: "a2hb-8", term: "to hurt", translation: "doler", example: "My leg hurts." },
    { id: "a2hb-9", term: "healthy", translation: "sano / saludable", example: "Eat healthy food." },
    { id: "a2hb-10", term: "exercise", translation: "ejercicio", example: "You must do exercise." },
    { id: "a2hb-11", term: "cough", translation: "tos", example: "I have a bad cough." },
    { id: "a2hb-12", term: "appointment", translation: "cita", example: "I have a doctor's appointment." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "a2hb-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: en el doctor",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Tom is sick\n" +
          "Tom feels sick. He has a headache and a fever. He goes to the doctor. 'You should rest and " +
          "drink a lot of water,' says the doctor. 'You shouldn't go to work today. You must take this " +
          "medicine twice a day. And you have to sleep well.' Tom listens carefully. To be healthy, he " +
          "also has to eat well and do exercise.\n\n" +
          "TEXT 2 - A phone call\n" +
          "A: Hi, I don't feel well. I have a bad cough and my stomach hurts. B: You should make an " +
          "appointment with the doctor. A: Do you think it's serious? B: Maybe not, but you must rest. " +
          "A: OK. I shouldn't have eaten that old food! B: Drink some tea and take care.",
        glossary: [
          { term: "feels sick", translation: "se siente enfermo" },
          { term: "should / shouldn't", translation: "deberia / no deberia" },
          { term: "must / have to", translation: "debe / tiene que" },
          { term: "twice a day", translation: "dos veces al dia" },
          { term: "cough / stomach", translation: "tos / estomago" },
          { term: "appointment", translation: "cita" },
          { term: "to hurt", translation: "doler" },
          { term: "take care", translation: "cuidate" },
        ],
        keyPhrases: [
          "Separa los consejos (should) de las obligaciones (must/have to).",
          "Busca que NO debe hacer cada persona.",
        ],
        check: [
          { prompt: "T1: What does Tom have?", choices: ["A cold only", "A headache and fever", "A broken leg"], answer: 1 },
          { prompt: "T1: What should Tom NOT do?", choices: ["Rest", "Drink water", "Go to work"], answer: 2 },
          { prompt: "T1: How often must he take the medicine?", choices: ["Once a day", "Twice a day", "Never"], answer: 1 },
          { prompt: "T2: What are A's symptoms?", choices: ["A cough and stomach ache", "A headache", "A fever"], answer: 0 },
          { prompt: "T2: What should A do?", choices: ["Make an appointment", "Go to work", "Eat old food"], answer: 0 },
          { prompt: "T2: What does B suggest to drink?", choices: ["Coffee", "Tea", "Juice"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "a2hb-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: salud y sintomas",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "headache / fever", translation: "dolor de cabeza / fiebre" },
        { term: "cough / stomach", translation: "tos / estomago" },
        { term: "medicine / doctor", translation: "medicina / doctor" },
        { term: "to rest / to hurt", translation: "descansar / doler" },
        { term: "sick / healthy", translation: "enfermo / saludable" },
        { term: "exercise / appointment", translation: "ejercicio / cita" },
      ],
      activities: [
        {
          id: "a2hb-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "headache", right: "dolor de cabeza" },
            { left: "fever", right: "fiebre" },
            { left: "cough", right: "tos" },
            { left: "stomach", right: "estomago" },
          ] },
        },
        {
          id: "a2hb-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "medicine", right: "medicina" },
            { left: "to rest", right: "descansar" },
            { left: "healthy", right: "saludable" },
            { left: "appointment", right: "cita" },
          ] },
        },
        {
          id: "a2hb-vocab-a3", type: "cloze",
          prompt: "Completa: 'I have a ___.' (dolor de cabeza)",
          payload: { answer: "headache" },
          explain: "'Headache' = dolor de cabeza.",
        },
        {
          id: "a2hb-vocab-a4", type: "cloze",
          prompt: "Completa: 'I have a bad ___.' (tos)",
          payload: { answer: "cough" },
          explain: "'Cough' = tos.",
        },
        {
          id: "a2hb-vocab-a5", type: "cloze",
          prompt: "Completa: 'I have a doctor's ___.' (cita)",
          payload: { answer: "appointment" },
          explain: "'Appointment' = cita.",
        },
        {
          id: "a2hb-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'doler'?",
          payload: { choices: ["to rest", "to hurt", "to buy"], answer: 1 },
          explain: "'To hurt' = doler.",
        },
        {
          id: "a2hb-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'descansar'?",
          payload: { choices: ["to rest", "to hurt", "to exercise"], answer: 0 },
          explain: "'To rest' = descansar.",
        },
        {
          id: "a2hb-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["hurts", "My", "stomach"], answer: ["My", "stomach", "hurts"] },
          explain: "'My stomach hurts' = me duele el estomago.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "a2hb-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: should / must / have to",
      intro: "Competencia de GRAMATICA. Aprende a aconsejar y obligar y practicalo.",
      grammar: {
        title: "should / must / have to",
        form: "sujeto + should/must + base · sujeto + have/has to + base · negativo: shouldn't",
        desc: "Sirve para dar consejos y hablar de obligaciones (lo que debes o tienes que hacer).",
        rule: "'should' es consejo, 'must' es obligaci\u00f3n fuerte, 'have to/has to' es obligaci\u00f3n (con he/she/it: 'has to'). Todos van con el verbo en base. El negativo de consejo es 'shouldn't'.",
        examples: ["You should rest.", "You must take the medicine.", "She has to sleep well.", "You shouldn't work."],
        explain: { tr: ["Deber\u00edas descansar.", "Debes tomar la medicina.", "Ella tiene que dormir bien.", "No deber\u00edas trabajar."] },
        mistakes: [
          { wrong: "You should to rest.", right: "You should rest." },
          { wrong: "He have to sleep.", right: "He has to sleep." },
          { wrong: "You must to go.", right: "You must go." },
        ],
      },
      activities: [
        {
          id: "a2hb-gram-a1", type: "cloze",
          prompt: "Completa: 'You ___ rest and drink water.' (consejo)",
          payload: { answer: "should" },
          explain: "'should' da un consejo.",
        },
        {
          id: "a2hb-gram-a2", type: "cloze",
          prompt: "Completa: 'She ___ to sleep well.' (has/have)",
          payload: { answer: "has" },
          explain: "Con she/he/it: 'has to'.",
        },
        {
          id: "a2hb-gram-a3", type: "cloze",
          prompt: "Completa: 'You ___ take this medicine.' (obligacion fuerte)",
          payload: { answer: "must" },
          explain: "'must' = obligacion fuerte.",
        },
        {
          id: "a2hb-gram-a4", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["You shouldn't works when sick.", "You shouldn't work when sick.", "You shouldn't to work when sick."], answer: 1 },
          explain: "'shouldn't' + verbo base.",
        },
        {
          id: "a2hb-gram-a5", type: "multiple_choice",
          prompt: "Which gives advice (not obligation)?",
          payload: { choices: ["You must rest.", "You should rest.", "You have to rest."], answer: 1 },
          explain: "'should' = consejo; 'must/have to' = obligacion.",
        },
        {
          id: "a2hb-gram-a6", type: "word_bank",
          prompt: "Ordena el consejo:",
          payload: { words: ["should", "You", "a", "see", "doctor"], answer: ["You", "should", "see", "a", "doctor"] },
          explain: "Orden: You + should + see + a + doctor.",
        },
        {
          id: "a2hb-gram-a7", type: "word_bank",
          prompt: "Ordena la obligacion:",
          payload: { words: ["the", "You", "take", "must", "medicine"], answer: ["You", "must", "take", "the", "medicine"] },
          explain: "Orden: You + must + take + the + medicine.",
        },
        {
          id: "a2hb-gram-a8", type: "cloze",
          prompt: "Completa: 'You ___ go to work today.' (no deberias)",
          payload: { answer: "shouldn't", alt: ["should not"] },
          explain: "'shouldn't' = no deberias.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "a2hb-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: aconseja a un amigo",
      intro: "Competencia de ESCRITURA. Construye consejos de salud, frase por frase.",
      activities: [
        {
          id: "a2hb-write-a1", type: "word_bank",
          prompt: "1. Aconseja descansar:",
          payload: { words: ["rest", "You", "should"], answer: ["You", "should", "rest"] },
        },
        {
          id: "a2hb-write-a2", type: "word_bank",
          prompt: "2. Di que debe tomar la medicina:",
          payload: { words: ["the", "You", "take", "must", "medicine"], answer: ["You", "must", "take", "the", "medicine"] },
        },
        {
          id: "a2hb-write-a3", type: "word_bank",
          prompt: "3. Aconseja no ir a trabajar:",
          payload: { words: ["work", "You", "go", "to", "shouldn't"], answer: ["You", "shouldn't", "go", "to", "work"] },
        },
        {
          id: "a2hb-write-a4", type: "word_bank",
          prompt: "4. Aconseja ver a un doctor:",
          payload: { words: ["a", "You", "see", "should", "doctor"], answer: ["You", "should", "see", "a", "doctor"] },
        },
        {
          id: "a2hb-write-a5", type: "word_bank",
          prompt: "5. Di que tiene que dormir bien:",
          payload: { words: ["well", "You", "sleep", "to", "have"], answer: ["You", "have", "to", "sleep", "well"] },
        },
        {
          id: "a2hb-write-a6", type: "multiple_choice",
          prompt: "6. Which gives advice?",
          payload: { choices: ["You must rest.", "You should rest.", "You have to rest."], answer: 1 },
        },
        {
          id: "a2hb-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct one:",
          payload: { choices: ["She have to rest.", "She has to rest.", "She has rest."], answer: 1 },
        },
        {
          id: "a2hb-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'saludable'?",
          payload: { choices: ["sick", "healthy", "tired"], answer: 1 },
        },
      ],
    },
  ],
};
