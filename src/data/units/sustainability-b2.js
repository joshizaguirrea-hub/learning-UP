/**
 * data/units/sustainability-b2.js — Unidad tematica "Environment & sustainability" (B2).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: future perfect / continuous.
 */

export const SUSTAINABILITY_B2 = {
  id: "sustainability-b2",
  language: "en",
  level: "B2",
  title: "Environment & sustainability",
  subtitle: "Hablar de sostenibilidad y del futuro del planeta",

  cando: [
    "Puedo hablar de sostenibilidad y soluciones a largo plazo.",
    "Puedo usar el future perfect (will have done).",
    "Puedo usar el future continuous (will be doing).",
    "Puedo escribir sobre como sera el futuro.",
  ],

  vocab: [
    { id: "b2sus-1", term: "sustainable", translation: "sostenible", example: "We need sustainable energy." },
    { id: "b2sus-2", term: "renewable", translation: "renovable", example: "Solar power is renewable." },
    { id: "b2sus-3", term: "carbon footprint", translation: "huella de carbono", example: "Reduce your carbon footprint." },
    { id: "b2sus-4", term: "emissions", translation: "emisiones", example: "Emissions must fall." },
    { id: "b2sus-5", term: "to reduce", translation: "reducir", example: "We must reduce waste." },
    { id: "b2sus-6", term: "resource", translation: "recurso", example: "Water is a precious resource." },
    { id: "b2sus-7", term: "greenhouse gas", translation: "gas de efecto invernadero", example: "Greenhouse gases trap heat." },
    { id: "b2sus-8", term: "to preserve", translation: "preservar", example: "We must preserve nature." },
    { id: "b2sus-9", term: "consumption", translation: "consumo", example: "Energy consumption is rising." },
    { id: "b2sus-10", term: "awareness", translation: "conciencia", example: "Public awareness is growing." },
    { id: "b2sus-11", term: "solar power", translation: "energia solar", example: "Solar power is clean." },
    { id: "b2sus-12", term: "to switch to", translation: "cambiar a", example: "They switched to electric cars." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "b2sus-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: el planeta en 2050",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - The world in 2050\n" +
          "By 2050, the world will have changed dramatically. Experts believe that most countries will " +
          "have switched to renewable energy. People will be driving electric cars and using less " +
          "plastic. Governments will have reduced emissions, and cities will be running on solar power. " +
          "However, if we don't act now, we will have lost many natural resources.\n\n" +
          "TEXT 2 - A green future\n" +
          "A: Where do you think we'll be in ten years? B: By then, I'll have finished my studies in " +
          "sustainability. A: Nice! Do you think we'll have solved the climate crisis? B: Not fully, but " +
          "people will be using much less energy. A: I hope companies will have reduced their carbon " +
          "footprint. B: Awareness is growing, so I'm hopeful.",
        glossary: [
          { term: "will have changed", translation: "habra cambiado" },
          { term: "will be driving", translation: "estara conduciendo" },
          { term: "will have reduced", translation: "habra reducido" },
          { term: "sustainable / renewable", translation: "sostenible / renovable" },
          { term: "emissions / resource", translation: "emisiones / recurso" },
          { term: "carbon footprint", translation: "huella de carbono" },
          { term: "to switch to / solar power", translation: "cambiar a / energia solar" },
          { term: "awareness", translation: "conciencia" },
        ],
        keyPhrases: [
          "Future perfect: will have changed/switched/reduced (accion terminada antes de 2050).",
          "Future continuous: will be driving/running/using (en progreso en el futuro).",
        ],
        check: [
          { prompt: "T1: By 2050, what will most countries have done?", choices: ["Switched to renewable energy", "Banned cars", "Closed cities"], answer: 0 },
          { prompt: "T1: What will people be driving?", choices: ["Electric cars", "Old buses", "Nothing"], answer: 0 },
          { prompt: "T1: What happens if we don't act now?", choices: ["We will have lost resources", "Nothing changes", "More resources"], answer: 0 },
          { prompt: "T2: What will B have finished?", choices: ["Studies in sustainability", "A house", "A trip"], answer: 0 },
          { prompt: "T2: Will they have fully solved the climate crisis?", choices: ["Yes", "Not fully", "Never"], answer: 1 },
          { prompt: "T2: What is growing?", choices: ["Awareness", "Pollution only", "Waste"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "b2sus-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: sostenibilidad",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "sustainable / renewable", translation: "sostenible / renovable" },
        { term: "carbon footprint / emissions", translation: "huella de carbono / emisiones" },
        { term: "to reduce / to preserve", translation: "reducir / preservar" },
        { term: "resource / consumption", translation: "recurso / consumo" },
        { term: "solar power / to switch to", translation: "energia solar / cambiar a" },
        { term: "greenhouse gas / awareness", translation: "gas invernadero / conciencia" },
      ],
      activities: [
        {
          id: "b2sus-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "sustainable", right: "sostenible" },
            { left: "emissions", right: "emisiones" },
            { left: "resource", right: "recurso" },
            { left: "renewable", right: "renovable" },
          ] },
        },
        {
          id: "b2sus-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "to reduce", right: "reducir" },
            { left: "to preserve", right: "preservar" },
            { left: "awareness", right: "conciencia" },
            { left: "consumption", right: "consumo" },
          ] },
        },
        {
          id: "b2sus-vocab-a3", type: "cloze",
          prompt: "Completa: 'Solar power is ___.' (renovable)",
          payload: { answer: "renewable" },
          explain: "'Renewable' = renovable.",
        },
        {
          id: "b2sus-vocab-a4", type: "cloze",
          prompt: "Completa: 'Public ___ is growing.' (conciencia)",
          payload: { answer: "awareness" },
          explain: "'Awareness' = conciencia.",
        },
        {
          id: "b2sus-vocab-a5", type: "cloze",
          prompt: "Completa: 'They ___ to electric cars.' (cambiar -> pasado)",
          payload: { answer: "switched" },
          explain: "'To switch to' = cambiar a; pasado: switched.",
        },
        {
          id: "b2sus-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'preservar'?",
          payload: { choices: ["to reduce", "to preserve", "to consume"], answer: 1 },
          explain: "'To preserve' = preservar.",
        },
        {
          id: "b2sus-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'huella de carbono'?",
          payload: { choices: ["carbon footprint", "solar power", "greenhouse gas"], answer: 0 },
          explain: "'Carbon footprint' = huella de carbono.",
        },
        {
          id: "b2sus-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["waste", "We", "reduce", "must"], answer: ["We", "must", "reduce", "waste"] },
          explain: "'We must reduce waste' = debemos reducir residuos.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "b2sus-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: future perfect / continuous",
      intro: "Competencia de GRAMATICA. Aprende will have done y will be doing.",
      grammar: {
        title: "Future perfect & future continuous",
        form: "perfect: will have + participio (terminado antes de X) · continuous: will be + -ing (en progreso)",
        examples: ["By 2050, we will have changed.", "Next year I will be living abroad."],
        explain: { tr: ["Para 2050, habremos cambiado.", "El pr\u00f3ximo a\u00f1o estar\u00e9 viviendo en el extranjero."] },
        mistakes: [
          { wrong: "By 2050 we will changed.", right: "By 2050 we will have changed." },
          { wrong: "Tomorrow I will be work.", right: "Tomorrow I will be working." },
        ],
      },
      activities: [
        {
          id: "b2sus-gram-a1", type: "cloze",
          prompt: "Completa: 'By 2050, we will ___ changed.' (auxiliar del future perfect)",
          payload: { answer: "have" },
          explain: "Future perfect: will + have + participio.",
        },
        {
          id: "b2sus-gram-a2", type: "cloze",
          prompt: "Completa: 'Next year I will be ___ abroad.' (live -> -ing)",
          payload: { answer: "living" },
          explain: "Future continuous: will be + verbo-ing.",
        },
        {
          id: "b2sus-gram-a3", type: "multiple_choice",
          prompt: "Choose the future perfect:",
          payload: { choices: ["They will reduce emissions.", "They will have reduced emissions by 2040.", "They are reducing emissions."], answer: 1 },
          explain: "Future perfect = accion terminada antes de un momento futuro.",
        },
        {
          id: "b2sus-gram-a4", type: "multiple_choice",
          prompt: "Which is future continuous?",
          payload: { choices: ["I will have finished.", "I will be working.", "I finished."], answer: 1 },
          explain: "will be + verbo-ing = en progreso en el futuro.",
        },
        {
          id: "b2sus-gram-a5", type: "cloze",
          prompt: "Completa: 'Cities will be ___ on solar power.' (run -> -ing)",
          payload: { answer: "running" },
          explain: "Future continuous: will be + running.",
        },
        {
          id: "b2sus-gram-a6", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["be", "will", "cars", "driving", "electric", "People"], answer: ["People", "will", "be", "driving", "electric", "cars"] },
          explain: "People + will + be + driving + electric + cars.",
        },
        {
          id: "b2sus-gram-a7", type: "word_bank",
          prompt: "Ordena el future perfect:",
          payload: { words: ["have", "By", "we'll", "changed", "2050,"], answer: ["By", "2050,", "we'll", "have", "changed"] },
          explain: "By + 2050, + we'll + have + changed.",
        },
        {
          id: "b2sus-gram-a8", type: "cloze",
          prompt: "Completa: 'They will ___ reduced emissions by 2040.' (auxiliar)",
          payload: { answer: "have" },
          explain: "Future perfect: will have + participio.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "b2sus-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: el futuro del planeta",
      intro: "Competencia de ESCRITURA. Construye frases sobre el futuro.",
      activities: [
        {
          id: "b2sus-write-a1", type: "word_bank",
          prompt: "1. Di que para 2050 habremos cambiado:",
          payload: { words: ["have", "By", "we'll", "changed", "2050,"], answer: ["By", "2050,", "we'll", "have", "changed"] },
        },
        {
          id: "b2sus-write-a2", type: "word_bank",
          prompt: "2. Di que estaran conduciendo autos electricos:",
          payload: { words: ["driving", "They'll", "cars", "be", "electric"], answer: ["They'll", "be", "driving", "electric", "cars"] },
        },
        {
          id: "b2sus-write-a3", type: "word_bank",
          prompt: "3. Di que debemos reducir las emisiones:",
          payload: { words: ["reduce", "We", "emissions", "must"], answer: ["We", "must", "reduce", "emissions"] },
        },
        {
          id: "b2sus-write-a4", type: "word_bank",
          prompt: "4. Di que las ciudades funcionaran con energia solar:",
          payload: { words: ["power", "Cities", "run", "solar", "will", "on"], answer: ["Cities", "will", "run", "on", "solar", "power"] },
        },
        {
          id: "b2sus-write-a5", type: "word_bank",
          prompt: "5. Di que debemos preservar la naturaleza:",
          payload: { words: ["nature", "We", "preserve", "must"], answer: ["We", "must", "preserve", "nature"] },
        },
        {
          id: "b2sus-write-a6", type: "multiple_choice",
          prompt: "6. Which is future continuous?",
          payload: { choices: ["I will have finished.", "I will be working.", "I finished."], answer: 1 },
        },
        {
          id: "b2sus-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct future perfect:",
          payload: { choices: ["By June, I will finish.", "By June, I will have finished.", "By June, I finishing."], answer: 1 },
        },
        {
          id: "b2sus-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'sostenible'?",
          payload: { choices: ["renewable", "sustainable", "reliable"], answer: 1 },
        },
      ],
    },
  ],
};
