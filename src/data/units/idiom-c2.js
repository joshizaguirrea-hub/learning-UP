/**
 * data/units/idiom-c2.js — Unidad tematica "Idiom & nuance" (C2).
 * Datos PUROS. Modelo desacoplado por competencia. Gramatica: phrasal verbs e idioms.
 */

export const IDIOM_C2 = {
  id: "idiom-c2",
  language: "en",
  level: "C2",
  title: "Idiom & nuance",
  subtitle: "Sonar nativo con modismos y phrasal verbs",

  cando: [
    "Puedo entender y usar expresiones idiomaticas.",
    "Puedo manejar phrasal verbs avanzados con matiz.",
    "Puedo captar el sentido figurado.",
    "Puedo escribir con naturalidad idiomatica.",
  ],

  vocab: [
    { id: "c2id-1", term: "to put up with", translation: "aguantar / tolerar", example: "I can't put up with the noise." },
    { id: "c2id-2", term: "to come across", translation: "encontrarse con / parecer", example: "She comes across as shy." },
    { id: "c2id-3", term: "to get away with", translation: "salirse con la suya", example: "He got away with it." },
    { id: "c2id-4", term: "to look forward to", translation: "esperar con ansias", example: "I look forward to it." },
    { id: "c2id-5", term: "a piece of cake", translation: "pan comido", example: "The test was a piece of cake." },
    { id: "c2id-6", term: "to hit the nail on the head", translation: "dar en el clavo", example: "You hit the nail on the head." },
    { id: "c2id-7", term: "once in a blue moon", translation: "muy de vez en cuando", example: "I go there once in a blue moon." },
    { id: "c2id-8", term: "to break the ice", translation: "romper el hielo", example: "A joke broke the ice." },
    { id: "c2id-9", term: "under the weather", translation: "indispuesto / mal", example: "I'm feeling under the weather." },
    { id: "c2id-10", term: "to cost an arm and a leg", translation: "costar un ojo de la cara", example: "It cost an arm and a leg." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "c2id-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: hablar como nativo",
      intro: "Competencia de LECTURA. Lee el texto y comprueba que entendiste.",
      content: {
        reading:
          "When Ben moved abroad, learning idioms was not a piece of cake. At first, he couldn't put up " +
          "with how fast people spoke. He would come across as quiet, though once in a blue moon he would " +
          "crack a joke to break the ice. One day, a colleague hit the nail on the head: 'Stop " +
          "translating word for word.' From then on, Ben looked forward to every conversation, even when " +
          "he felt under the weather. Rent cost an arm and a leg, but the experience was priceless.",
        keyPhrases: [
          "Fijate en los modismos: a piece of cake, break the ice, hit the nail on the head, under the weather.",
          "Y en phrasal verbs: put up with, come across, look forward to.",
        ],
        check: [
          { prompt: "Was learning idioms easy for Ben?", choices: ["Yes, a piece of cake", "No, it wasn't easy", "He didn't try"], answer: 1 },
          { prompt: "How did he sometimes break the ice?", choices: ["With a joke", "By leaving", "By shouting"], answer: 0 },
          { prompt: "What did the colleague do?", choices: ["Hit the nail on the head", "Ignored him", "Laughed"], answer: 0 },
          { prompt: "What cost an arm and a leg?", choices: ["Rent", "Food", "The bus"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "c2id-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: modismos y phrasal verbs",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "to put up with", translation: "aguantar" },
        { term: "to come across", translation: "parecer / encontrarse con" },
        { term: "to look forward to", translation: "esperar con ansias" },
        { term: "a piece of cake", translation: "pan comido" },
        { term: "to break the ice", translation: "romper el hielo" },
        { term: "under the weather", translation: "indispuesto" },
      ],
      activities: [
        {
          id: "c2id-vocab-a1", type: "matching",
          prompt: "Empareja el modismo con su significado:",
          payload: { pairs: [
            { left: "a piece of cake", right: "pan comido" },
            { left: "break the ice", right: "romper el hielo" },
            { left: "under the weather", right: "indispuesto" },
          ] },
        },
        {
          id: "c2id-vocab-a2", type: "cloze",
          prompt: "Completa: 'I can't put up ___ the noise.' (particula)",
          payload: { answer: "with" },
          explain: "'put up with' = aguantar (tres partes fijas).",
        },
        {
          id: "c2id-vocab-a3", type: "multiple_choice",
          prompt: "'You hit the nail on the head' means:",
          payload: { choices: ["You were exactly right", "You were wrong", "You hurt yourself"], answer: 0 },
          explain: "'Hit the nail on the head' = dar en el clavo (acertar).",
        },
        {
          id: "c2id-vocab-a4", type: "multiple_choice",
          prompt: "'Once in a blue moon' means:",
          payload: { choices: ["Very often", "Very rarely", "At night"], answer: 1 },
          explain: "'Once in a blue moon' = muy de vez en cuando.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "c2id-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: phrasal verbs",
      intro: "Competencia de GRAMATICA. Aprende separables e inseparables y su orden.",
      grammar: {
        title: "Phrasal verbs (separables / inseparables)",
        form: "separable: turn it off · inseparable: look after him · con pronombre va en medio (separables)",
        examples: ["Turn the light off. / Turn it off.", "I look after my sister. / I look after her."],
        mistakes: [
          { wrong: "Turn off it.", right: "Turn it off." },
          { wrong: "I look my sister after.", right: "I look after my sister." },
        ],
      },
      activities: [
        {
          id: "c2id-gram-a1", type: "multiple_choice",
          prompt: "Choose the correct order (separable):",
          payload: { choices: ["Turn off it.", "Turn it off.", "Off turn it."], answer: 1 },
          explain: "Con pronombre, el separable va en medio: 'turn it off'.",
        },
        {
          id: "c2id-gram-a2", type: "cloze",
          prompt: "Completa: 'I look ___ my little sister.' (particula, inseparable)",
          payload: { answer: "after" },
          explain: "'look after' = cuidar (inseparable).",
        },
        {
          id: "c2id-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["I look forward to hear from you.", "I look forward to hearing from you.", "I look forward hear from you."], answer: 1 },
          explain: "'look forward to' + verbo-ing (to es preposicion).",
        },
        {
          id: "c2id-gram-a4", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["it", "Turn", "off"], answer: ["Turn", "it", "off"] },
          explain: "Orden con pronombre: Turn + it + off.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "c2id-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: usa modismos con naturalidad",
      intro: "Competencia de ESCRITURA. Construye frases idiomaticas. Ordena cada frase.",
      activities: [
        {
          id: "c2id-write-a1", type: "word_bank",
          prompt: "Di que esperas con ansias tener noticias:",
          payload: { words: ["hearing", "I", "to", "look", "forward", "from", "you"], answer: ["I", "look", "forward", "to", "hearing", "from", "you"] },
        },
        {
          id: "c2id-write-a2", type: "word_bank",
          prompt: "Di que una broma rompio el hielo:",
          payload: { words: ["ice", "A", "the", "joke", "broke"], answer: ["A", "joke", "broke", "the", "ice"] },
        },
        {
          id: "c2id-write-a3", type: "word_bank",
          prompt: "Di que no aguantas el ruido:",
          payload: { words: ["with", "I", "up", "the", "can't", "put", "noise"], answer: ["I", "can't", "put", "up", "with", "the", "noise"] },
        },
        {
          id: "c2id-write-a4", type: "multiple_choice",
          prompt: "Which idiom means 'very expensive'?",
          payload: { choices: ["a piece of cake", "cost an arm and a leg", "break the ice"], answer: 1 },
        },
      ],
    },
  ],
};
