/**
 * data/units/a1-food.js — Unidad tematica "Food & drink" (A1).
 *
 * Datos PUROS. MODELO DESACOPLADO POR COMPETENCIA. Listening/Speaking con audio/IA.
 */

export const A1_FOOD = {
  id: "a1-food",
  language: "en",
  level: "A1",
  title: "Food & drink",
  subtitle: "Hablar de comida, gustos y pedir en un cafe",

  cando: [
    "Puedo nombrar comidas y bebidas comunes.",
    "Puedo decir lo que me gusta y no me gusta.",
    "Puedo usar 'some' y 'any' con la comida.",
    "Puedo pedir algo en un cafe de forma simple.",
  ],

  vocab: [
    { id: "a1fd-1", term: "water", translation: "agua", example: "I drink water every day." },
    { id: "a1fd-2", term: "coffee", translation: "cafe", example: "She likes coffee with milk." },
    { id: "a1fd-3", term: "bread", translation: "pan", example: "We have bread for breakfast." },
    { id: "a1fd-4", term: "apple", translation: "manzana", example: "I eat an apple every morning." },
    { id: "a1fd-5", term: "egg", translation: "huevo", example: "He wants two eggs, please." },
    { id: "a1fd-6", term: "rice", translation: "arroz", example: "There is some rice on the table." },
    { id: "a1fd-7", term: "milk", translation: "leche", example: "Is there any milk?" },
    { id: "a1fd-8", term: "chicken", translation: "pollo", example: "I like chicken with vegetables." },
    { id: "a1fd-9", term: "tea", translation: "te", example: "A cup of tea, please." },
    { id: "a1fd-10", term: "sugar", translation: "azucar", example: "No sugar in my coffee, thanks." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "a1fd-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: comida y gustos",
      intro: "Competencia de LECTURA. Lee sobre Sofia y comprueba que entendiste.",
      content: {
        reading:
          "Sofia likes healthy food. For breakfast, she has some bread, an apple and a cup " +
          "of tea. She doesn't like coffee. For lunch, she usually eats chicken with rice " +
          "and vegetables. She drinks a lot of water. She doesn't put any sugar in her tea. " +
          "In the evening, she sometimes has an egg. Sofia loves fruit but she doesn't like fish.",
        keyPhrases: [
          "Busca lo que le gusta y lo que no le gusta.",
          "Fijate en 'some' y 'any' en el texto.",
        ],
        check: [
          { prompt: "What does Sofia drink a lot?", choices: ["Coffee", "Water", "Milk"], answer: 1 },
          { prompt: "What does Sofia NOT like?", choices: ["Fruit", "Chicken", "Fish"], answer: 2 },
          { prompt: "What does she have for breakfast?", choices: ["Rice", "Bread and an apple", "Fish"], answer: 1 },
          { prompt: "Does she put sugar in her tea?", choices: ["Yes", "No", "Only a lot"], answer: 1 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "a1fd-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Vocabulary: comida y bebida",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "water / milk", translation: "agua / leche" },
        { term: "coffee / tea", translation: "cafe / te" },
        { term: "bread", translation: "pan" },
        { term: "apple", translation: "manzana" },
        { term: "egg / rice", translation: "huevo / arroz" },
        { term: "chicken", translation: "pollo" },
      ],
      activities: [
        {
          id: "a1fd-vocab-a1", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "water", right: "agua" },
            { left: "bread", right: "pan" },
            { left: "milk", right: "leche" },
          ] },
        },
        {
          id: "a1fd-vocab-a2", type: "cloze",
          prompt: "Completa: 'A cup of ___, please.' (te)",
          payload: { answer: "tea" },
          explain: "'Tea' = te.",
        },
        {
          id: "a1fd-vocab-a3", type: "multiple_choice",
          prompt: "Which is a drink?",
          payload: { choices: ["bread", "water", "apple"], answer: 1 },
          explain: "'Water' (agua) es una bebida.",
        },
        {
          id: "a1fd-vocab-a4", type: "multiple_choice",
          prompt: "Which word means 'pollo'?",
          payload: { choices: ["chicken", "egg", "rice"], answer: 0 },
          explain: "'Chicken' = pollo.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "a1fd-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammar: some/any y gustos",
      intro: "Competencia de GRAMATICA. Aprende some/any y like/don't like y practicalos.",
      grammar: {
        title: "some / any y like / don't like",
        form: "some (afirmativo) · any (negativo/pregunta) · don't/doesn't like",
        examples: ["There is some bread.", "Is there any milk?", "He doesn't like coffee."],
        mistakes: [
          { wrong: "She like coffee.", right: "She likes coffee." },
          { wrong: "I no like fish.", right: "I don't like fish." },
        ],
      },
      activities: [
        {
          id: "a1fd-gram-a1", type: "cloze",
          prompt: "Completa: 'There is ___ bread on the table.' (afirmativo)",
          payload: { answer: "some" },
          explain: "'Some' en frases afirmativas.",
        },
        {
          id: "a1fd-gram-a2", type: "cloze",
          prompt: "Completa: 'Is there ___ milk?' (pregunta)",
          payload: { answer: "any" },
          explain: "'Any' en preguntas y negaciones.",
        },
        {
          id: "a1fd-gram-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["He don't like coffee.", "He doesn't like coffee.", "He doesn't likes coffee."], answer: 1 },
          explain: "Con he/she/it: 'doesn't like' (verbo base).",
        },
        {
          id: "a1fd-gram-a4", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["like", "I", "apples"], answer: ["I", "like", "apples"] },
          explain: "Orden: I + like + (comida).",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "a1fd-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Writing: pide en un cafe",
      intro: "Competencia de ESCRITURA. Construye frases para pedir y hablar de gustos. Ordena cada frase.",
      activities: [
        {
          id: "a1fd-write-a1", type: "word_bank",
          prompt: "Pide un cafe con educacion:",
          payload: { words: ["a", "Can", "have", "coffee,", "I", "please?"], answer: ["Can", "I", "have", "a", "coffee,", "please?"] },
        },
        {
          id: "a1fd-write-a2", type: "word_bank",
          prompt: "Di lo que te gusta:",
          payload: { words: ["chicken", "I", "like"], answer: ["I", "like", "chicken"] },
        },
        {
          id: "a1fd-write-a3", type: "word_bank",
          prompt: "Di lo que no te gusta:",
          payload: { words: ["like", "I", "don't", "fish"], answer: ["I", "don't", "like", "fish"] },
        },
        {
          id: "a1fd-write-a4", type: "multiple_choice",
          prompt: "Best polite way to order:",
          payload: { choices: ["Give me coffee.", "Can I have a coffee, please?", "Coffee now."], answer: 1 },
        },
      ],
    },
  ],
};
