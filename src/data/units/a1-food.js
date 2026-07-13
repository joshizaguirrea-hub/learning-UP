/**
 * data/units/a1-food.js — Unidad tematica "Food & drink" (A1).
 * Datos PUROS. MODELO DESACOPLADO + CONTENIDO ENRIQUECIDO. Listening/Speaking con audio/IA.
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
    { id: "a1fd-11", term: "vegetables", translation: "verduras", example: "Vegetables are healthy." },
    { id: "a1fd-12", term: "fruit", translation: "fruta", example: "I love fresh fruit." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "a1fd-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Reading: comida y gustos",
      intro: "Competencia de LECTURA. Lee DOS textos y responde las preguntas de comprension.",
      content: {
        reading:
          "TEXT 1 - Sofia's food\n" +
          "Sofia likes healthy food. For breakfast, she has some bread, an apple and a cup of tea. She " +
          "doesn't like coffee. For lunch, she usually eats chicken with rice and vegetables. She drinks " +
          "a lot of water. She doesn't put any sugar in her tea. In the evening, she sometimes has an egg. " +
          "Sofia loves fruit but she doesn't like fish.\n\n" +
          "TEXT 2 - At the cafe\n" +
          "A: Hi! Can I have a coffee, please? B: Sure. With milk and sugar? A: With milk, but no sugar, " +
          "thanks. And some bread, please. B: Anything else? A: No, that's all. B: Here you are. Enjoy! " +
          "A: Thank you!",
        glossary: [
          { term: "likes / doesn't like", translation: "le gusta / no le gusta" },
          { term: "some / any", translation: "algo de (afirm / neg-pregunta)" },
          { term: "a lot of", translation: "mucho/a" },
          { term: "healthy", translation: "saludable" },
          { term: "for breakfast / lunch", translation: "para el desayuno / almuerzo" },
          { term: "Anything else?", translation: "algo mas?" },
          { term: "That's all", translation: "eso es todo" },
          { term: "Here you are", translation: "aqui tiene" },
        ],
        keyPhrases: [
          "Busca lo que le gusta y lo que no le gusta a Sofia.",
          "Fijate como se pide en el Texto 2 (Can I have..., please?).",
        ],
        check: [
          { prompt: "T1: What does Sofia drink a lot?", choices: ["Coffee", "Water", "Milk"], answer: 1 },
          { prompt: "T1: What does Sofia NOT like?", choices: ["Fruit", "Chicken", "Fish"], answer: 2 },
          { prompt: "T1: What does she have for breakfast?", choices: ["Rice", "Bread and an apple", "Fish"], answer: 1 },
          { prompt: "T2: How does A want the coffee?", choices: ["With sugar", "With milk, no sugar", "Black"], answer: 1 },
          { prompt: "T2: What else does A order?", choices: ["Some bread", "An egg", "Rice"], answer: 0 },
          { prompt: "T2: What does 'That's all' mean?", choices: ["I want more", "Nothing else", "Thank you"], answer: 1 },
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
        { term: "bread / rice", translation: "pan / arroz" },
        { term: "apple / fruit", translation: "manzana / fruta" },
        { term: "egg / chicken", translation: "huevo / pollo" },
        { term: "vegetables / sugar", translation: "verduras / azucar" },
      ],
      activities: [
        {
          id: "a1fd-vocab-a1", type: "matching",
          prompt: "Empareja (1/2):",
          payload: { pairs: [
            { left: "water", right: "agua" },
            { left: "bread", right: "pan" },
            { left: "milk", right: "leche" },
            { left: "tea", right: "te" },
          ] },
        },
        {
          id: "a1fd-vocab-a2", type: "matching",
          prompt: "Empareja (2/2):",
          payload: { pairs: [
            { left: "chicken", right: "pollo" },
            { left: "egg", right: "huevo" },
            { left: "fruit", right: "fruta" },
            { left: "vegetables", right: "verduras" },
          ] },
        },
        {
          id: "a1fd-vocab-a3", type: "cloze",
          prompt: "Completa: 'A cup of ___, please.' (te)",
          payload: { answer: "tea" },
          explain: "'Tea' = te.",
        },
        {
          id: "a1fd-vocab-a4", type: "cloze",
          prompt: "Completa: 'No ___ in my coffee.' (azucar)",
          payload: { answer: "sugar" },
          explain: "'Sugar' = azucar.",
        },
        {
          id: "a1fd-vocab-a5", type: "cloze",
          prompt: "Completa: '___ are healthy.' (verduras)",
          payload: { answer: "Vegetables" },
          explain: "'Vegetables' = verduras.",
        },
        {
          id: "a1fd-vocab-a6", type: "multiple_choice",
          prompt: "Which is a drink?",
          payload: { choices: ["bread", "water", "apple"], answer: 1 },
          explain: "'Water' (agua) es una bebida.",
        },
        {
          id: "a1fd-vocab-a7", type: "multiple_choice",
          prompt: "Which word means 'pollo'?",
          payload: { choices: ["chicken", "egg", "rice"], answer: 0 },
          explain: "'Chicken' = pollo.",
        },
        {
          id: "a1fd-vocab-a8", type: "word_bank",
          prompt: "Ordena el pedido:",
          payload: { words: ["tea", "a", "of", "cup"], answer: ["a", "cup", "of", "tea"] },
          explain: "'a cup of tea' = una taza de te.",
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
        form: "some (afirmativo) · any (negativo/pregunta) · don't/doesn't like + sustantivo",
        examples: ["There is some bread.", "Is there any milk?", "I don't like fish.", "He doesn't like coffee."],
        mistakes: [
          { wrong: "She like coffee.", right: "She likes coffee." },
          { wrong: "I no like fish.", right: "I don't like fish." },
          { wrong: "Is there some milk?", right: "Is there any milk?" },
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
          id: "a1fd-gram-a3", type: "cloze",
          prompt: "Completa: 'I don't like ___ sugar.' (negativo)",
          payload: { answer: "any" },
          explain: "'Any' tambien en frases negativas.",
        },
        {
          id: "a1fd-gram-a4", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["He don't like coffee.", "He doesn't like coffee.", "He doesn't likes coffee."], answer: 1 },
          explain: "Con he/she/it: 'doesn't like' (verbo base).",
        },
        {
          id: "a1fd-gram-a5", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: ["She like fruit.", "She likes fruit.", "She liking fruit."], answer: 1 },
          explain: "Con 'she' el verbo lleva -s: likes.",
        },
        {
          id: "a1fd-gram-a6", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["like", "I", "apples"], answer: ["I", "like", "apples"] },
          explain: "Orden: I + like + (comida).",
        },
        {
          id: "a1fd-gram-a7", type: "word_bank",
          prompt: "Ordena la negacion:",
          payload: { words: ["like", "I", "don't", "fish"], answer: ["I", "don't", "like", "fish"] },
          explain: "Orden: I + don't + like + fish.",
        },
        {
          id: "a1fd-gram-a8", type: "cloze",
          prompt: "Completa: 'Do you ___ tea?' (gustar, base)",
          payload: { answer: "like" },
          explain: "En preguntas con 'do' el verbo va en base: like.",
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
      intro: "Competencia de ESCRITURA. Construye un pedido y habla de tus gustos, frase por frase.",
      activities: [
        {
          id: "a1fd-write-a1", type: "word_bank",
          prompt: "1. Pide un cafe con educacion:",
          payload: { words: ["a", "Can", "have", "coffee,", "I", "please?"], answer: ["Can", "I", "have", "a", "coffee,", "please?"] },
        },
        {
          id: "a1fd-write-a2", type: "word_bank",
          prompt: "2. Pide tambien pan:",
          payload: { words: ["bread,", "some", "please"], answer: ["some", "bread,", "please"] },
        },
        {
          id: "a1fd-write-a3", type: "word_bank",
          prompt: "3. Di lo que te gusta:",
          payload: { words: ["chicken", "I", "like"], answer: ["I", "like", "chicken"] },
        },
        {
          id: "a1fd-write-a4", type: "word_bank",
          prompt: "4. Di lo que no te gusta:",
          payload: { words: ["like", "I", "don't", "fish"], answer: ["I", "don't", "like", "fish"] },
        },
        {
          id: "a1fd-write-a5", type: "word_bank",
          prompt: "5. Di que bebes mucha agua:",
          payload: { words: ["water", "I", "of", "drink", "a", "lot"], answer: ["I", "drink", "a", "lot", "of", "water"] },
        },
        {
          id: "a1fd-write-a6", type: "multiple_choice",
          prompt: "6. Best polite way to order:",
          payload: { choices: ["Give me coffee.", "Can I have a coffee, please?", "Coffee now."], answer: 1 },
        },
        {
          id: "a1fd-write-a7", type: "multiple_choice",
          prompt: "7. The waiter asks 'Anything else?'. You are done. You say:",
          payload: { choices: ["That's all, thanks.", "Give me more.", "Hello."], answer: 0 },
        },
        {
          id: "a1fd-write-a8", type: "multiple_choice",
          prompt: "8. Which sentence is correct?",
          payload: { choices: ["I doesn't like tea.", "I don't like tea.", "I not like tea."], answer: 1 },
        },
      ],
    },
  ],
};
