/**
 * ui/robot-lines.js — Frases del "Profe Robo" en ES/EN (para que voz == texto).
 *
 * Clave del bug de "Spanglish": si la voz es inglesa pero el texto esta en
 * espanol (o al reves), suena fatal. Aqui cada frase existe en ambos idiomas y
 * se elige segun el nivel: espanol nativo en A1-A2, ingles nativo de B1+.
 */
const LINES = {
  greeting: {
    es: "Hola, soy {name}! Vamos a aprender esto paso a paso. Primero la clase y luego practicamos. Tu puedes!",
    en: "Hi, I'm {name}! Let's learn this step by step. First the lesson, then we practice. You can do it!",
  },
  reading: {
    es: "Leamos juntos. Fijate en las frases clave del texto.",
    en: "Let's read together. Notice the key phrases in the text.",
  },
  grammar: {
    es: "Estas son las reglas de hoy: tu superpoder. Leelas con calma.",
    en: "These are today's rules: your superpower. Read them calmly.",
  },
  glossary: {
    es: "Estas palabras te van a servir mucho. Toca el altavoz para oirlas.",
    en: "These words will help you a lot. Tap the speaker to hear them.",
  },
  keyPhrases: {
    es: "Frases utiles para sonar mas natural.",
    en: "Useful phrases to sound more natural.",
  },
  note: {
    es: "Ojo con esta nota: es el detalle que marca la diferencia.",
    en: "Watch this note: it's the detail that makes the difference.",
  },
  dialogue: {
    es: "Escucha el dialogo e imita la entonacion.",
    en: "Listen to the dialogue and copy the intonation.",
  },
  hintIntro: {
    es: "Tranqui, esto se puede. Repasemos juntos y lo resuelves.",
    en: "No worries, you can do this. Let's review together and you'll solve it.",
  },
  whyWrongIntro: {
    es: "No pasa nada, equivocarse ayuda a aprender.",
    en: "No worries, making mistakes helps you learn.",
  },
  correctIs: {
    es: "La respuesta correcta es: {answer}.",
    en: "The correct answer is: {answer}.",
  },
  remember: {
    es: "Recuerda:",
    en: "Remember:",
  },
  tip_multiple_choice: {
    es: "Lee todas las opciones y descarta las que rompen la regla.",
    en: "Read all the options and rule out the ones that break the rule.",
  },
  tip_cloze: {
    es: "Piensa que palabra encaja: fijate en el sujeto y el tiempo verbal.",
    en: "Think about which word fits: look at the subject and the verb tense.",
  },
  tip_word_bank: {
    es: "Arma la frase en orden: normalmente sujeto + verbo + complemento.",
    en: "Build the sentence in order: usually subject + verb + object.",
  },
  tip_matching: {
    es: "Empareja lo que ya conoces primero; lo demas sale por descarte.",
    en: "Match what you already know first; the rest comes by elimination.",
  },
  tip_default: {
    es: "Vuelve a leer la pregunta con calma; la pista esta en la regla.",
    en: "Read the question again calmly; the clue is in the rule.",
  },
};

/** Devuelve la frase en el idioma del `lang` (es-* -> es, resto -> en). */
export function line(key, lang = "es-MX", vars = {}) {
  const l = String(lang).toLowerCase().startsWith("es") ? "es" : "en";
  let s = (LINES[key] && (LINES[key][l] || LINES[key].es)) || "";
  for (const [k, v] of Object.entries(vars)) s = s.split("{" + k + "}").join(v);
  return s;
}
