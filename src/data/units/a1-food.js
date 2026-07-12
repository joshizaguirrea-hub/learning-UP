/**
 * data/units/a1-food.js — Unidad tematica "Food & drink" (A1).
 *
 * Datos PUROS. Comida y bebida con countable/uncountable, some/any y like/don't
 * like. Sigue el ciclo PPP del estandar de calidad (ver PLAN-DE-ESTUDIO.md).
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
    // ---------------- APRENDE ----------------
    {
      id: "a1fd-l0",
      order: 1,
      phase: "learn",
      skills: ["reading", "vocabulary"],
      title: "Aprende: comida y gustos",
      intro:
        "Lee sobre lo que come una persona y estudia 'some/any' y 'like/don't like'. " +
        "Aqui solo se lee y se aprende.",
      teachesVocab: true,
      content: {
        reading:
          "Sofia likes healthy food. For breakfast, she has some bread, an apple and a cup " +
          "of tea. She doesn't like coffee. For lunch, she usually eats chicken with rice " +
          "and vegetables. She drinks a lot of water. She doesn't put any sugar in her tea. " +
          "In the evening, she sometimes has an egg. Sofia loves fruit but she doesn't like fish.",
        glossary: [
          { term: "likes", translation: "le gusta" },
          { term: "doesn't like", translation: "no le gusta" },
          { term: "some", translation: "algo de (afirmativo)" },
          { term: "any", translation: "algo de (negativo/pregunta)" },
          { term: "a lot of", translation: "mucho/a" },
          { term: "healthy", translation: "saludable" },
        ],
        keyPhrases: [
          "I like... / I don't like... (Me gusta... / No me gusta...)",
          "There is some... (Hay algo de...)",
          "Is there any...? (Hay algo de...?)",
          "A cup of tea, please. (Un te, por favor.)",
        ],
        note:
          "Usamos 'some' en frases afirmativas ('some bread') y 'any' en negativas y " +
          "preguntas ('any milk?'). 'a/an' va solo con contables en singular (an apple, a cup).",
        grammar: {
          title: "like / don't like",
          form: "I/you/we/they + like · he/she/it + likes · negativo: don't/doesn't like",
          examples: [
            "I like apples.",
            "She likes tea.",
            "He doesn't like coffee.",
          ],
          mistakes: [
            { wrong: "She like coffee.", right: "She likes coffee." },
            { wrong: "I no like fish.", right: "I don't like fish." },
          ],
        },
        check: [
          { prompt: "What does Sofia drink a lot?", choices: ["Coffee", "Water", "Milk"], answer: 1 },
          { prompt: "What does Sofia NOT like?", choices: ["Fruit", "Chicken", "Fish"], answer: 2 },
        ],
      },
      activities: [],
    },

    // ---------------- PRESENTACION ----------------
    {
      id: "a1fd-l1",
      order: 2,
      phase: "present",
      skills: ["grammar", "vocabulary"],
      title: "Presentacion: en el cafe",
      intro:
        "Para pedir usamos 'I'd like...' o 'Can I have...?'. Lee el dialogo.",
      dialogue: [
        "A: Hi! Can I have a coffee, please?",
        "B: Sure. With milk and sugar?",
        "A: With milk, but no sugar, thanks. And some bread, please.",
        "B: Here you are. Enjoy!",
      ],
      activities: [
        {
          id: "a1fd-l1-a1", type: "multiple_choice",
          prompt: "How do you order politely?",
          payload: { choices: ["Give me coffee.", "Can I have a coffee, please?", "Coffee now."], answer: 1 },
          explain: "'Can I have..., please?' es una forma educada de pedir.",
        },
        {
          id: "a1fd-l1-a2", type: "matching",
          prompt: "Empareja la palabra con su significado:",
          payload: { pairs: [
            { left: "water", right: "agua" },
            { left: "bread", right: "pan" },
            { left: "milk", right: "leche" },
          ] },
        },
      ],
    },

    // ---------------- PRACTICA ----------------
    {
      id: "a1fd-l2",
      order: 3,
      phase: "practice",
      skills: ["grammar", "vocabulary"],
      title: "Practica: some/any y gustos",
      intro: "Completa, elige y ordena para practicar.",
      activities: [
        {
          id: "a1fd-l2-a1", type: "cloze",
          prompt: "Completa: 'There is ___ bread on the table.' (afirmativo)",
          payload: { answer: "some" },
          explain: "'Some' se usa en frases afirmativas.",
        },
        {
          id: "a1fd-l2-a2", type: "cloze",
          prompt: "Completa: 'Is there ___ milk?' (pregunta)",
          payload: { answer: "any" },
          explain: "'Any' se usa en preguntas y negaciones.",
        },
        {
          id: "a1fd-l2-a3", type: "multiple_choice",
          prompt: "Choose the correct sentence:",
          payload: { choices: [
            "He don't like coffee.",
            "He doesn't like coffee.",
            "He doesn't likes coffee.",
          ], answer: 1 },
          explain: "Con he/she/it la negacion es 'doesn't like' (verbo en base).",
        },
        {
          id: "a1fd-l2-a4", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["like", "I", "apples"], answer: ["I", "like", "apples"] },
          explain: "Orden: I + like + (comida).",
        },
        {
          id: "a1fd-l2-a5", type: "cloze",
          prompt: "Completa: 'A cup of ___, please.' (te)",
          payload: { answer: "tea" },
          explain: "'Tea' = te. 'A cup of tea' = una taza de te.",
        },
      ],
    },

    // ---------------- PRODUCCION ----------------
    {
      id: "a1fd-l3",
      order: 4,
      phase: "produce",
      skills: ["writing", "grammar"],
      title: "Produccion: pide en un cafe",
      intro:
        "Tarea real: construye frases para pedir comida y hablar de gustos. Ordena cada frase.",
      activities: [
        {
          id: "a1fd-l3-a1", type: "word_bank",
          prompt: "Pide un cafe con educacion:",
          payload: { words: ["a", "Can", "have", "coffee,", "I", "please?"],
                     answer: ["Can", "I", "have", "a", "coffee,", "please?"] },
        },
        {
          id: "a1fd-l3-a2", type: "word_bank",
          prompt: "Di lo que te gusta:",
          payload: { words: ["chicken", "I", "like"], answer: ["I", "like", "chicken"] },
        },
        {
          id: "a1fd-l3-a3", type: "word_bank",
          prompt: "Di lo que no te gusta:",
          payload: { words: ["like", "I", "don't", "fish"], answer: ["I", "don't", "like", "fish"] },
        },
        {
          id: "a1fd-l3-a4", type: "multiple_choice",
          prompt: "Which is a drink?",
          payload: { choices: ["bread", "water", "apple"], answer: 1 },
        },
      ],
    },
  ],
};
