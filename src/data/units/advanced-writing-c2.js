/**
 * data/units/advanced-writing-c2.js — Unidad tematica "Advanced writing (genres)" (C2).
 * Datos PUROS. Modelo desacoplado por competencia. Gramatica: concessive clauses (however/whatever/no matter).
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
  ],

  lessons: [
    // ================= READING =================
    {
      id: "c2aw-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: el oficio de escribir",
      intro: "Competencia de LECTURA. Lee el texto y comprueba que entendiste.",
      content: {
        reading:
          "However hard writing seems, it is a craft you can master. Whatever the genre, a first draft " +
          "is never perfect. No matter how talented you are, you must revise and edit. However much time " +
          "it takes, coherence and cohesion matter most. Whatever you write, adjust the tone to your " +
          "audience and keep it concise. However you feel about your draft, a polished text always comes " +
          "from careful revision.",
        keyPhrases: [
          "Fijate en las concesivas: However hard..., Whatever the genre..., No matter how..., However much...",
          "Conceden un punto sin cambiar la idea principal.",
        ],
        check: [
          { prompt: "Is a first draft ever perfect?", choices: ["Yes", "No, never", "Always"], answer: 1 },
          { prompt: "What must you do no matter how talented you are?", choices: ["Revise and edit", "Publish at once", "Give up"], answer: 0 },
          { prompt: "What matters most?", choices: ["Coherence and cohesion", "Length", "Speed"], answer: 0 },
          { prompt: "Where does a polished text come from?", choices: ["Careful revision", "Luck", "First try"], answer: 0 },
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
        { term: "draft", translation: "borrador" },
      ],
      activities: [
        {
          id: "c2aw-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "genre", right: "genero" },
            { left: "draft", right: "borrador" },
            { left: "cohesion", right: "cohesion" },
          ] },
        },
        {
          id: "c2aw-vocab-a2", type: "cloze",
          prompt: "Completa: 'Keep it ___.' (conciso)",
          payload: { answer: "concise" },
          explain: "'Concise' = conciso.",
        },
        {
          id: "c2aw-vocab-a3", type: "multiple_choice",
          prompt: "Which word means 'revisar/corregir'?",
          payload: { choices: ["to revise", "to publish", "to read"], answer: 0 },
          explain: "'To revise' = revisar / corregir.",
        },
        {
          id: "c2aw-vocab-a4", type: "cloze",
          prompt: "Completa: 'The final text was ___.' (pulido)",
          payload: { answer: "polished" },
          explain: "'Polished' = pulido.",
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
        examples: ["However hard it is, keep going.", "Whatever you do, be honest.", "No matter what happens, I'll help."],
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
          id: "c2aw-gram-a4", type: "word_bank",
          prompt: "Ordena la concesiva:",
          payload: { words: ["what", "No", "happens,", "matter", "stay", "calm"], answer: ["No", "matter", "what", "happens,", "stay", "calm"] },
          explain: "Orden: No + matter + what + happens, + stay + calm.",
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
      intro: "Competencia de ESCRITURA. Construye frases con concesivas. Ordena cada frase.",
      activities: [
        {
          id: "c2aw-write-a1", type: "word_bank",
          prompt: "Di: pase lo que pase, mantente en calma:",
          payload: { words: ["what", "No", "happens,", "matter", "stay", "calm"], answer: ["No", "matter", "what", "happens,", "stay", "calm"] },
        },
        {
          id: "c2aw-write-a2", type: "word_bank",
          prompt: "Aconseja revisar tu trabajo dos veces:",
          payload: { words: ["work", "Revise", "twice", "your"], answer: ["Revise", "your", "work", "twice"] },
        },
        {
          id: "c2aw-write-a3", type: "word_bank",
          prompt: "Di: por muy dificil que sea, sigue:",
          payload: { words: ["hard", "However", "is,", "on", "it", "go"], answer: ["However", "hard", "it", "is,", "go", "on"] },
        },
        {
          id: "c2aw-write-a4", type: "multiple_choice",
          prompt: "Concessive clauses are used to...",
          payload: { choices: ["ask questions", "concede a point without changing the main idea", "report speech"], answer: 1 },
        },
      ],
    },
  ],
};
