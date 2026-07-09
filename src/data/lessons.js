/**
 * data/lessons.js — Catalogo de contenido de estudio (datos puros).
 *
 * Cada leccion se identifica por la clave "NIVEL:competencia" (ej. "B1:grammar").
 * Estructura:
 *   { title, intro, examples[], practice[ {prompt, choices[], answer} ] }
 *
 * MVP: ingles. Las competencias que requieren audio (listening) o IA (speaking)
 * quedan como "proximamente" via el fallback en core/lesson.js.
 * Ampliar = agregar mas entradas aqui (no toca la logica).
 */

export const LESSONS = {
  // ============================ A1 ============================
  "A1:grammar": {
    title: "El verbo 'to be' (ser/estar)",
    intro: "El verbo 'to be' cambia segun el sujeto: I am, you are, he/she/it is, we/you/they are.",
    examples: ["I am a student.", "She is happy.", "They are from Mexico."],
    practice: [
      { prompt: "He ___ my friend.", choices: ["am", "is", "are"], answer: 1 },
      { prompt: "We ___ ready.", choices: ["is", "am", "are"], answer: 2 },
      { prompt: "I ___ tired.", choices: ["am", "is", "are"], answer: 0 },
    ],
  },
  "A1:vocabulary": {
    title: "Colores y numeros basicos",
    intro: "Vocabulario esencial: colores (red, blue, green) y numeros (one, two, three).",
    examples: ["The apple is red.", "I have two cats.", "The grass is green."],
    practice: [
      { prompt: "The banana is ___.", choices: ["yellow", "blue", "purple"], answer: 0 },
      { prompt: "'Three' means:", choices: ["2", "3", "4"], answer: 1 },
      { prompt: "Snow is ___.", choices: ["black", "white", "red"], answer: 1 },
    ],
  },

  // ============================ A2 ============================
  "A2:grammar": {
    title: "Pasado simple (Past Simple)",
    intro: "Para acciones terminadas en el pasado. Verbos regulares agregan '-ed'; los irregulares cambian (go->went, have->had).",
    examples: ["I worked yesterday.", "She went to the beach.", "They didn't come."],
    practice: [
      { prompt: "Last night I ___ a movie.", choices: ["watch", "watched", "watching"], answer: 1 },
      { prompt: "He ___ to school by bus.", choices: ["goed", "went", "gone"], answer: 1 },
      { prompt: "We ___ not see them.", choices: ["did", "does", "do"], answer: 0 },
    ],
  },
  "A2:vocabulary": {
    title: "Adjetivos y opuestos",
    intro: "Describir cosas con adjetivos y sus opuestos: big/small, cheap/expensive, fast/slow.",
    examples: ["This car is fast.", "That house is expensive.", "The box is small."],
    practice: [
      { prompt: "Opposite of 'hot':", choices: ["cold", "warm", "big"], answer: 0 },
      { prompt: "Opposite of 'happy':", choices: ["sad", "tall", "new"], answer: 0 },
      { prompt: "Opposite of 'old' (thing):", choices: ["young", "new", "big"], answer: 1 },
    ],
  },
  "A2:reading": {
    title: "Leer horarios y avisos",
    intro: "Practica extraer informacion concreta de textos cortos (horarios, letreros, notas).",
    examples: ["'Open 9-5, Mon-Fri.'", "'No parking on Sundays.'", "'Sale: 20% off today.'"],
    practice: [
      { prompt: "'Open 9-5.' Can you go at 6pm?", choices: ["Yes", "No"], answer: 1 },
      { prompt: "'20% off today.' The price is:", choices: ["higher", "lower", "same"], answer: 1 },
      { prompt: "'No parking on Sundays.' Park on Sunday?", choices: ["Yes", "No"], answer: 1 },
    ],
  },

  // ============================ B1 ============================
  "B1:grammar": {
    title: "Primer condicional (First Conditional)",
    intro: "Para situaciones reales o probables en el futuro: If + presente, ... will + verbo.",
    examples: ["If it rains, we will stay home.", "If you study, you will pass.", "She will call if she has time."],
    practice: [
      { prompt: "If I have money, I ___ travel.", choices: ["will", "would", "am"], answer: 0 },
      { prompt: "If she ___ early, she will help.", choices: ["arrives", "will arrive", "arrived"], answer: 0 },
      { prompt: "We will win if we ___ hard.", choices: ["try", "will try", "tried"], answer: 0 },
    ],
  },
  "B1:vocabulary": {
    title: "Conectores y expresiones",
    intro: "Palabras que unen ideas: however, although, because, so. Dan fluidez a tu ingles.",
    examples: ["I was tired, so I slept.", "Although it was cold, we walked.", "He stayed because he was busy."],
    practice: [
      { prompt: "It was raining, ___ we took a taxi.", choices: ["so", "although", "because"], answer: 0 },
      { prompt: "___ he is rich, he is not happy.", choices: ["Although", "So", "Because"], answer: 0 },
      { prompt: "She left ___ she was sick.", choices: ["so", "although", "because"], answer: 2 },
    ],
  },
  "B1:reading": {
    title: "Inferir significado por contexto",
    intro: "No siempre conoces cada palabra. Usa el contexto para deducir la idea general.",
    examples: ["'Despite the delay, they arrived on time.'", "'The plan backfired badly.'", "'She was reluctant to agree.'"],
    practice: [
      { prompt: "'Despite the rain, they enjoyed it.' The trip was:", choices: ["bad", "still good", "cancelled"], answer: 1 },
      { prompt: "'He was reluctant to go.' He was:", choices: ["eager", "unwilling", "late"], answer: 1 },
      { prompt: "'The plan backfired.' It:", choices: ["worked", "failed", "started"], answer: 1 },
    ],
  },
  "B1:writing": {
    title: "Escribir un email informal",
    intro: "Estructura: saludo (Hi X), motivo, detalles, despedida (Best, / See you). Sé claro y breve.",
    examples: ["Hi Sam, Thanks for your message...", "I'd love to join you on Friday.", "Best, Alex"],
    practice: [
      { prompt: "Best opening for a friend:", choices: ["Dear Sir,", "Hi Sam,", "To whom it may concern,"], answer: 1 },
      { prompt: "Best closing for a friend:", choices: ["Yours faithfully,", "See you soon,", "Regards, Mr. X"], answer: 1 },
      { prompt: "An informal email should be:", choices: ["very formal", "clear and friendly", "very long"], answer: 1 },
    ],
  },

  // ============================ B2 ============================
  "B2:grammar": {
    title: "Segundo condicional (Second Conditional)",
    intro: "Para situaciones hipoteticas o improbables: If + pasado, ... would + verbo.",
    examples: ["If I were rich, I would travel.", "If she had time, she would help.", "What would you do if you won?"],
    practice: [
      { prompt: "If I ___ you, I would rest.", choices: ["am", "were", "will be"], answer: 1 },
      { prompt: "She ___ come if she could.", choices: ["will", "would", "did"], answer: 1 },
      { prompt: "If we had a car, we ___ drive.", choices: ["will", "would", "are"], answer: 1 },
    ],
  },
  "B2:vocabulary": {
    title: "Vocabulario preciso y matices",
    intro: "En B2 eliges la palabra exacta: 'meticulous' (muy cuidadoso), 'sufficient' (suficiente/formal).",
    examples: ["The evidence was sufficient.", "She is meticulous with details.", "His reply was ambiguous."],
    practice: [
      { prompt: "'Meticulous' means:", choices: ["careless", "very careful", "quick"], answer: 1 },
      { prompt: "'Ambiguous' means:", choices: ["clear", "unclear", "loud"], answer: 1 },
      { prompt: "Formal word for 'enough':", choices: ["sufficient", "plenty", "lots"], answer: 0 },
    ],
  },
  "B2:reading": {
    title: "Tono y actitud del autor",
    intro: "Identifica la actitud del autor (critico, neutral, entusiasta) por las palabras que elige.",
    examples: ["'The proposal was met with skepticism.'", "'A groundbreaking achievement.'", "'A rather disappointing result.'"],
    practice: [
      { prompt: "'Met with skepticism.' People were:", choices: ["excited", "doubtful", "angry"], answer: 1 },
      { prompt: "'A groundbreaking achievement.' Tone:", choices: ["negative", "positive", "neutral"], answer: 1 },
      { prompt: "'Rather disappointing.' Tone:", choices: ["positive", "negative", "neutral"], answer: 1 },
    ],
  },
  "B2:writing": {
    title: "Ensayo de opinion (estructura)",
    intro: "Introduccion (tu postura) -> argumentos con ejemplos -> conclusion. Usa conectores formales.",
    examples: ["In my opinion, ...", "Furthermore, ... / On the other hand, ...", "To conclude, ..."],
    practice: [
      { prompt: "Best formal connector to add an idea:", choices: ["Furthermore", "So", "And also"], answer: 0 },
      { prompt: "Best phrase to contrast:", choices: ["On the other hand", "Because", "Then"], answer: 0 },
      { prompt: "An opinion essay ends with a:", choices: ["question", "conclusion", "greeting"], answer: 1 },
    ],
  },
};
