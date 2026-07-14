/**
 * data/units/advanced-writing-c2.js — Unidad tematica "Advanced writing (genres)" (C2).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: concessive clauses.
 */

export const ADVANCED_WRITING_C2 = {
  id: "advanced-writing-c2",
  language: "en",
  level: "C2",
  title: "Advanced writing (genres)",
  subtitle: "Dominar generos de escritura y clausulas concesivas",

  cando: [
    "Puedo escribir en distintos generos con soltura.",
    "Puedo usar clausulas concesivas (however, whatever, no matter).",
    "Puedo conceder puntos y matizar con elegancia.",
    "Puedo producir textos de calidad publicable.",
  ],

  vocab: [
    { id: "c2aw-1", term: "genre", translation: "genero", example: "Each genre has its rules." },
    { id: "c2aw-2", term: "draft", translation: "borrador", example: "This is a first draft." },
    { id: "c2aw-3", term: "to edit", translation: "editar", example: "Edit before you publish." },
    { id: "c2aw-4", term: "coherence", translation: "coherencia", example: "Coherence is essential." },
    { id: "c2aw-5", term: "cohesion", translation: "cohesion", example: "Linkers create cohesion." },
    { id: "c2aw-6", term: "tone", translation: "tono", example: "Adjust the tone to the reader." },
    { id: "c2aw-7", term: "concise", translation: "conciso", example: "Keep it concise." },
    { id: "c2aw-8", term: "to revise", translation: "revisar / corregir", example: "Revise your work twice." },
    { id: "c2aw-9", term: "audience", translation: "lector / audiencia", example: "Know your audience." },
    { id: "c2aw-10", term: "polished", translation: "pulido", example: "The final text was polished." },
    { id: "c2aw-11", term: "structure", translation: "estructura", example: "A clear structure helps." },
    { id: "c2aw-12", term: "flow", translation: "fluidez", example: "The text has good flow." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "c2aw-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: el oficio de escribir",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - The craft of writing\n" +
          "However hard writing seems, it is a craft you can master. Whatever the genre, a first draft is " +
          "never perfect. No matter how talented you are, you must revise and edit. However much time it " +
          "takes, coherence and cohesion matter most. Whatever you write, adjust the tone to your audience " +
          "and keep it concise.\n\n" +
          "TEXT 2 - Editing tips\n" +
          "A: My essay feels messy. B: However good your ideas are, structure matters. A: How do I fix the " +
          "flow? B: Whatever you do, read it aloud. No matter what, cut unnecessary words. A: And the tone? " +
          "B: However formal it is, it must sound natural. A: Thanks! I'll revise it now.",
        glossary: [
          { term: "However hard...", translation: "Por muy dificil que..." },
          { term: "Whatever the genre...", translation: "Sea cual sea el genero..." },
          { term: "No matter how / what", translation: "No importa cuanto / que" },
          { term: "genre / draft", translation: "genero / borrador" },
          { term: "coherence / cohesion", translation: "coherencia / cohesion" },
          { term: "to revise / to edit", translation: "revisar / editar" },
          { term: "concise / polished", translation: "conciso / pulido" },
          { term: "structure / flow", translation: "estructura / fluidez" },
        ],
        keyPhrases: [
          "Fijate en las concesivas: However hard..., Whatever the genre..., No matter how..., However much...",
          "Conceden un punto sin cambiar la idea principal.",
        ],
        check: [
          { prompt: "T1: Is a first draft ever perfect?", choices: ["Yes", "No, never", "Always"], answer: 1 },
          { prompt: "T1: What must you do no matter how talented you are?", choices: ["Revise and edit", "Publish at once", "Give up"], answer: 0 },
          { prompt: "T1: What matters most?", choices: ["Coherence and cohesion", "Length", "Speed"], answer: 0 },
          { prompt: "T2: What matters however good your ideas are?", choices: ["Structure", "Length", "Font"], answer: 0 },
          { prompt: "T2: How do you fix the flow?", choices: ["Read it aloud", "Add words", "Ignore it"], answer: 0 },
          { prompt: "T2: How must the tone sound, however formal?", choices: ["Natural", "Robotic", "Rude"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "c2aw-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: escritura avanzada",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "genre / draft", translation: "genero / borrador" },
        { term: "to edit / to revise", translation: "editar / revisar" },
        { term: "coherence / cohesion", translation: "coherencia / cohesion" },
        { term: "tone / audience", translation: "tono / lector" },
        { term: "concise / polished", translation: "conciso / pulido" },
        { term: "structure / flow", translation: "estructura / fluidez" },
      ],
      activities: [
        {
          id: "c2aw-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "genre", right: "genero" },
            { left: "draft", right: "borrador" },
            { left: "cohesion", right: "cohesion" },
            { left: "structure", right: "estructura" },
          ] },
        },
        {
          id: "c2aw-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "to edit", right: "editar" },
            { left: "to revise", right: "revisar" },
            { left: "polished", right: "pulido" },
            { left: "flow", right: "fluidez" },
          ] },
        },
        {
          id: "c2aw-vocab-a3", type: "cloze",
          prompt: "Completa: 'Keep it ___.' (conciso)",
          payload: { answer: "concise" },
          explain: "'Concise' = conciso.",
        },
        {
          id: "c2aw-vocab-a4", type: "cloze",
          prompt: "Completa: 'The final text was ___.' (pulido)",
          payload: { answer: "polished" },
          explain: "'Polished' = pulido.",
        },
        {
          id: "c2aw-vocab-a5", type: "cloze",
          prompt: "Completa: 'The text has good ___.' (fluidez)",
          payload: { answer: "flow" },
          explain: "'Flow' = fluidez.",
        },
        {
          id: "c2aw-vocab-a6", type: "multiple_choice",
          prompt: "Which word means 'revisar/corregir'?",
          payload: { choices: ["to revise", "to publish", "to read"], answer: 0 },
          explain: "'To revise' = revisar / corregir.",
        },
        {
          id: "c2aw-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'coherencia'?",
          payload: { choices: ["coherence", "genre", "draft"], answer: 0 },
          explain: "'Coherence' = coherencia.",
        },
        {
          id: "c2aw-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["twice", "Revise", "work", "your"], answer: ["Revise", "your", "work", "twice"] },
          explain: "'Revise your work twice' = revisa tu trabajo dos veces.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "c2aw-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: clausulas concesivas",
      intro: "Competencia de GRAMATICA. Aprende however / whatever / no matter.",
      grammar: {
        title: "Concessive clauses",
        form: "However + adj/adv + sujeto + verbo · Whatever/Whoever/Wherever · No matter how/what...",
        desc: "Sirve para conceder algo y sonar flexible pero firme en escritura avanzada.",
        rule: "'However + adjetivo/adverbio + sujeto + verbo' (However hard he tries...). 'Whatever/Whoever/Wherever' y 'No matter how/what' significan 'sin importar...': 'No matter what happens, we continue'.",
        examples: ["However hard it is, keep going.", "Whatever you do, be honest.", "No matter what happens, I'll help."],
        explain: { tr: ["Por muy dif\u00edcil que sea, sigue adelante.", "Hagas lo que hagas, s\u00e9 honesto.", "Pase lo que pase, ayudar\u00e9."] },
        mistakes: [
          { wrong: "However it is hard, keep going.", right: "However hard it is, keep going." },
          { wrong: "No matter of what happens.", right: "No matter what happens." },
        ],
      },
      activities: [
        {
          id: "c2aw-gram-a1", type: "cloze",
          prompt: "Completa: '___ hard it is, keep going.' (por muy)",
          payload: { answer: "However" },
          explain: "'However + adjetivo + sujeto + verbo'.",
        },
        {
          id: "c2aw-gram-a2", type: "cloze",
          prompt: "Completa: '___ you do, be honest.' (hagas lo que hagas)",
          payload: { answer: "Whatever" },
          explain: "'Whatever you do' = hagas lo que hagas.",
        },
        {
          id: "c2aw-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct concessive clause:",
          payload: { choices: ["However hard it is, I'll finish.", "However it is hard, I'll finish.", "How ever hard is it, I'll finish."], answer: 0 },
          explain: "Orden: However + adjetivo + sujeto + verbo.",
        },
        {
          id: "c2aw-gram-a4", type: "multiple_choice",
          prompt: "Concessive clauses are used to...",
          payload: { choices: ["ask questions", "concede a point without changing the main idea", "report speech"], answer: 1 },
          explain: "Conceden un punto sin cambiar la idea principal.",
        },
        {
          id: "c2aw-gram-a5", type: "cloze",
          prompt: "Completa: 'No matter ___ happens, stay calm.' (que)",
          payload: { answer: "what" },
          explain: "'No matter what happens' = pase lo que pase.",
        },
        {
          id: "c2aw-gram-a6", type: "word_bank",
          prompt: "Ordena la concesiva:",
          payload: { words: ["what", "No", "happens,", "matter", "stay", "calm"], answer: ["No", "matter", "what", "happens,", "stay", "calm"] },
          explain: "No + matter + what + happens, + stay + calm.",
        },
        {
          id: "c2aw-gram-a7", type: "word_bank",
          prompt: "Ordena la concesiva:",
          payload: { words: ["hard", "However", "is,", "on", "it", "go"], answer: ["However", "hard", "it", "is,", "go", "on"] },
          explain: "However + hard + it + is, + go + on.",
        },
        {
          id: "c2aw-gram-a8", type: "cloze",
          prompt: "Completa: '___ good your ideas are, structure matters.' (por muy)",
          payload: { answer: "However" },
          explain: "'However + adjetivo + sujeto + verbo'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "c2aw-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: texto pulido",
      intro: "Competencia de ESCRITURA. Construye frases con concesivas.",
      activities: [
        {
          id: "c2aw-write-a1", type: "word_bank",
          prompt: "1. Di: pase lo que pase, mantente en calma:",
          payload: { words: ["what", "No", "happens,", "matter", "stay", "calm"], answer: ["No", "matter", "what", "happens,", "stay", "calm"] },
        },
        {
          id: "c2aw-write-a2", type: "word_bank",
          prompt: "2. Aconseja revisar tu trabajo dos veces:",
          payload: { words: ["work", "Revise", "twice", "your"], answer: ["Revise", "your", "work", "twice"] },
        },
        {
          id: "c2aw-write-a3", type: "word_bank",
          prompt: "3. Di: por muy dificil que sea, sigue:",
          payload: { words: ["hard", "However", "is,", "on", "it", "go"], answer: ["However", "hard", "it", "is,", "go", "on"] },
        },
        {
          id: "c2aw-write-a4", type: "word_bank",
          prompt: "4. Aconseja mantenerlo conciso:",
          payload: { words: ["it", "Keep", "concise"], answer: ["Keep", "it", "concise"] },
        },
        {
          id: "c2aw-write-a5", type: "word_bank",
          prompt: "5. Di que la estructura importa:",
          payload: { words: ["matters", "Structure"], answer: ["Structure", "matters"] },
        },
        {
          id: "c2aw-write-a6", type: "multiple_choice",
          prompt: "6. Concessive clauses are used to...",
          payload: { choices: ["ask questions", "concede a point without changing the main idea", "report speech"], answer: 1 },
        },
        {
          id: "c2aw-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct one:",
          payload: { choices: ["However it is hard, I'll try.", "However hard it is, I'll try.", "How hard ever it is, I'll try."], answer: 1 },
        },
        {
          id: "c2aw-write-a8", type: "multiple_choice",
          prompt: "8. Which word means 'pulido'?",
          payload: { choices: ["polished", "concise", "coherent"], answer: 0 },
        },
      ],
    },
  ],
};
