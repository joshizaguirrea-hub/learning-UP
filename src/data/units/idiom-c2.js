/**
 * data/units/idiom-c2.js — Unidad tematica "Idiom & nuance" (C2).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Gramatica: phrasal verbs e idioms.
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
    { id: "c2id-11", term: "to give up", translation: "rendirse", example: "Never give up." },
    { id: "c2id-12", term: "the last straw", translation: "el colmo / la gota que colma", example: "That was the last straw." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "c2id-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: hablar como nativo",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Ben abroad\n" +
          "When Ben moved abroad, learning idioms was not a piece of cake. At first, he couldn't put up " +
          "with how fast people spoke. He would come across as quiet, though once in a blue moon he would " +
          "crack a joke to break the ice. One day, a colleague hit the nail on the head: 'Stop translating " +
          "word for word.' From then on, Ben looked forward to every conversation, even when he felt under " +
          "the weather.\n\n" +
          "TEXT 2 - A tough day\n" +
          "A: How was your day? B: Awful. My laptop broke, and it will cost an arm and a leg to fix. A: Oh " +
          "no! B: And then I lost my keys. That was the last straw. A: Don't give up! B: You're right. " +
          "Tomorrow will be better.",
        glossary: [
          { term: "a piece of cake", translation: "pan comido" },
          { term: "to put up with", translation: "aguantar" },
          { term: "to come across (as)", translation: "parecer" },
          { term: "to break the ice", translation: "romper el hielo" },
          { term: "hit the nail on the head", translation: "dar en el clavo" },
          { term: "cost an arm and a leg", translation: "costar un ojo de la cara" },
          { term: "the last straw", translation: "el colmo" },
          { term: "to give up / under the weather", translation: "rendirse / indispuesto" },
        ],
        keyPhrases: [
          "Fijate en los modismos: a piece of cake, break the ice, hit the nail on the head, the last straw.",
          "Y en phrasal verbs: put up with, come across, look forward to, give up.",
        ],
        check: [
          { prompt: "T1: Was learning idioms easy for Ben?", choices: ["Yes, a piece of cake", "No, it wasn't easy", "He didn't try"], answer: 1 },
          { prompt: "T1: How did he sometimes break the ice?", choices: ["With a joke", "By leaving", "By shouting"], answer: 0 },
          { prompt: "T1: What did the colleague do?", choices: ["Hit the nail on the head", "Ignored him", "Laughed"], answer: 0 },
          { prompt: "T2: What will cost an arm and a leg?", choices: ["Fixing the laptop", "The keys", "The day"], answer: 0 },
          { prompt: "T2: What was the last straw?", choices: ["Losing the keys", "The laptop", "The weather"], answer: 0 },
          { prompt: "T2: What does A tell B?", choices: ["Don't give up", "Give up", "Go home"], answer: 0 },
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
        { term: "to come across / to give up", translation: "parecer / rendirse" },
        { term: "to look forward to", translation: "esperar con ansias" },
        { term: "a piece of cake", translation: "pan comido" },
        { term: "to break the ice / the last straw", translation: "romper el hielo / el colmo" },
        { term: "under the weather", translation: "indispuesto" },
      ],
      activities: [
        {
          id: "c2id-vocab-a1", type: "matching",
          prompt: "Empareja el modismo (1/2):",
          payload: { pairs: [
            { left: "a piece of cake", right: "pan comido" },
            { left: "break the ice", right: "romper el hielo" },
            { left: "under the weather", right: "indispuesto" },
            { left: "the last straw", right: "el colmo" },
          ] },
        },
        {
          id: "c2id-vocab-a2", type: "matching",
          prompt: "Empareja el phrasal verb (2/2):",
          payload: { pairs: [
            { left: "to put up with", right: "aguantar" },
            { left: "to come across", right: "parecer" },
            { left: "to give up", right: "rendirse" },
            { left: "to look forward to", right: "esperar con ansias" },
          ] },
        },
        {
          id: "c2id-vocab-a3", type: "cloze",
          prompt: "Completa: 'I can't put up ___ the noise.' (particula)",
          payload: { answer: "with" },
          explain: "'put up with' = aguantar (tres partes fijas).",
        },
        {
          id: "c2id-vocab-a4", type: "cloze",
          prompt: "Completa: 'Never give ___.' (rendirse -> particula)",
          payload: { answer: "up" },
          explain: "'give up' = rendirse.",
        },
        {
          id: "c2id-vocab-a5", type: "cloze",
          prompt: "Completa: 'That was the last ___.' (colmo)",
          payload: { answer: "straw" },
          explain: "'the last straw' = el colmo / la gota que colma.",
        },
        {
          id: "c2id-vocab-a6", type: "multiple_choice",
          prompt: "'You hit the nail on the head' means:",
          payload: { choices: ["You were exactly right", "You were wrong", "You hurt yourself"], answer: 0 },
          explain: "'Hit the nail on the head' = dar en el clavo (acertar).",
        },
        {
          id: "c2id-vocab-a7", type: "multiple_choice",
          prompt: "'Once in a blue moon' means:",
          payload: { choices: ["Very often", "Very rarely", "At night"], answer: 1 },
          explain: "'Once in a blue moon' = muy de vez en cuando.",
        },
        {
          id: "c2id-vocab-a8", type: "word_bank",
          prompt: "Ordena el modismo:",
          payload: { words: ["the", "broke", "A", "ice", "joke"], answer: ["A", "joke", "broke", "the", "ice"] },
          explain: "'A joke broke the ice' = una broma rompio el hielo.",
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
        explain: { tr: ["Apaga la luz. / Ap\u00e1gala.", "Cuido a mi hermana. / La cuido."] },
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
          id: "c2id-gram-a4", type: "multiple_choice",
          prompt: "Which phrasal verb means 'to tolerate'?",
          payload: { choices: ["to put up with", "to come across", "to give up"], answer: 0 },
          explain: "'put up with' = aguantar / tolerar.",
        },
        {
          id: "c2id-gram-a5", type: "cloze",
          prompt: "Completa: 'She comes ___ as shy.' (particula)",
          payload: { answer: "across" },
          explain: "'come across as' = parecer / dar la impresion.",
        },
        {
          id: "c2id-gram-a6", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["it", "Turn", "off"], answer: ["Turn", "it", "off"] },
          explain: "Turn + it + off (pronombre en medio).",
        },
        {
          id: "c2id-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["hearing", "I", "to", "look", "forward", "from", "you"], answer: ["I", "look", "forward", "to", "hearing", "from", "you"] },
          explain: "I + look forward to + hearing + from + you.",
        },
        {
          id: "c2id-gram-a8", type: "cloze",
          prompt: "Completa: 'Don't give ___.' (rendirse -> particula)",
          payload: { answer: "up" },
          explain: "'give up' = rendirse.",
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
      intro: "Competencia de ESCRITURA. Construye frases idiomaticas.",
      activities: [
        {
          id: "c2id-write-a1", type: "word_bank",
          prompt: "1. Di que esperas con ansias tener noticias:",
          payload: { words: ["hearing", "I", "to", "look", "forward", "from", "you"], answer: ["I", "look", "forward", "to", "hearing", "from", "you"] },
        },
        {
          id: "c2id-write-a2", type: "word_bank",
          prompt: "2. Di que una broma rompio el hielo:",
          payload: { words: ["ice", "A", "the", "joke", "broke"], answer: ["A", "joke", "broke", "the", "ice"] },
        },
        {
          id: "c2id-write-a3", type: "word_bank",
          prompt: "3. Di que no aguantas el ruido:",
          payload: { words: ["with", "I", "up", "the", "can't", "put", "noise"], answer: ["I", "can't", "put", "up", "with", "the", "noise"] },
        },
        {
          id: "c2id-write-a4", type: "word_bank",
          prompt: "4. Anima a alguien a no rendirse:",
          payload: { words: ["up", "Don't", "give"], answer: ["Don't", "give", "up"] },
        },
        {
          id: "c2id-write-a5", type: "word_bank",
          prompt: "5. Di que eso fue el colmo:",
          payload: { words: ["straw", "That", "the", "last", "was"], answer: ["That", "was", "the", "last", "straw"] },
        },
        {
          id: "c2id-write-a6", type: "multiple_choice",
          prompt: "6. Which idiom means 'very expensive'?",
          payload: { choices: ["a piece of cake", "cost an arm and a leg", "break the ice"], answer: 1 },
        },
        {
          id: "c2id-write-a7", type: "multiple_choice",
          prompt: "7. Choose the correct one:",
          payload: { choices: ["Turn off it.", "Turn it off.", "It turn off."], answer: 1 },
        },
        {
          id: "c2id-write-a8", type: "multiple_choice",
          prompt: "8. 'She comes across as shy' means she...",
          payload: { choices: ["seems shy", "is loud", "is famous"], answer: 0 },
        },
      ],
    },
  ],
};
