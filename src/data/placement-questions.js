/**
 * data/placement-questions.js — Banco de preguntas del examen de ubicacion.
 *
 * Datos PUROS. Cada pregunta esta etiquetada con:
 *   - level: nivel MCER que evalua (A1, A2, B1, B2, C1)
 *   - skill: competencia -> grammar | vocabulary | reading | literature |
 *            writing | speaking
 *   - prompt: enunciado (para reading/literature incluye el texto)
 *   - choices + answer: opcion multiple auto-corregible (answer = indice correcto)
 *
 * Examen mas retador: cubre las 6 competencias y llega hasta C1. El motor
 * (core/placement.js) es adaptativo y balancea competencias; se amplia agregando
 * mas objetos aqui (no toca la logica).
 */

/** Nombre visible de cada competencia (badge en la UI). */
export const SKILL_LABELS = {
  grammar: "Gramatica",
  vocabulary: "Vocabulary",
  reading: "Reading",
  literature: "Literatura",
  writing: "Writing",
  speaking: "Speaking",
};

export const PLACEMENT_QUESTIONS = [
  // ============================ A1 ============================
  { id: "a1-gr1", level: "A1", skill: "grammar",
    prompt: "___ name is Ana.", choices: ["My", "Me", "I", "Mine"], answer: 0 },
  { id: "a1-vo1", level: "A1", skill: "vocabulary",
    prompt: "The sky is ___.", choices: ["blue", "table", "run", "happy"], answer: 0 },
  { id: "a1-rd1", level: "A1", skill: "reading",
    prompt: "Read: 'Tom is eight. He has a small red bike.' What color is the bike?",
    choices: ["Red", "Blue", "Green", "Black"], answer: 0 },
  { id: "a1-sp1", level: "A1", skill: "speaking",
    prompt: "Someone says: 'Hi! How are you?' The most natural reply is:",
    choices: ["I'm fine, thanks. And you?", "Yes, I am a book.", "Goodbye, see you.", "It is raining."], answer: 0 },
  { id: "a1-wr1", level: "A1", skill: "writing",
    prompt: "Which sentence is written correctly?",
    choices: ["i live in london", "I live in London.", "I Live In London", "i Live in london."], answer: 1 },

  // ============================ A2 ============================
  { id: "a2-gr1", level: "A2", skill: "grammar",
    prompt: "Yesterday I ___ to the park.", choices: ["go", "went", "gone", "going"], answer: 1 },
  { id: "a2-vo1", level: "A2", skill: "vocabulary",
    prompt: "Opposite of 'expensive':", choices: ["cheap", "big", "fast", "old"], answer: 0 },
  { id: "a2-rd1", level: "A2", skill: "reading",
    prompt: "Read: 'The shop opens at 9 and closes at 5.' When can you go?",
    choices: ["at 8", "at 3", "at 6", "at 7"], answer: 1 },
  { id: "a2-sp1", level: "A2", skill: "speaking",
    prompt: "At a cafe: 'Would you like some coffee?' A polite reply is:",
    choices: ["Yes, please.", "No thank you very good.", "I am coffee.", "Coffee is a drink."], answer: 0 },
  { id: "a2-wr1", level: "A2", skill: "writing",
    prompt: "Which sentence has the correct punctuation?",
    choices: ["I bought apples oranges and milk.", "I bought apples, oranges, and milk.", "I bought, apples oranges milk.", "I bought apples oranges, and milk"], answer: 1 },
  { id: "a2-li1", level: "A2", skill: "literature",
    prompt: "In the rhyme 'The cat sat on the mat', which word rhymes with 'cat'?",
    choices: ["mat", "dog", "chair", "sit"], answer: 0 },

  // ============================ B1 ============================
  { id: "b1-gr1", level: "B1", skill: "grammar",
    prompt: "I have lived here ___ 2010.", choices: ["for", "since", "from", "during"], answer: 1 },
  { id: "b1-vo1", level: "B1", skill: "vocabulary",
    prompt: "She was ___ tired that she fell asleep at once.", choices: ["so", "such", "too", "very much"], answer: 0 },
  { id: "b1-rd1", level: "B1", skill: "reading",
    prompt: "Read: 'Despite the heavy rain, they still enjoyed the trip.' The trip was:",
    choices: ["cancelled", "terrible", "still good", "delayed"], answer: 2 },
  { id: "b1-sp1", level: "B1", skill: "speaking",
    prompt: "A friend suggests a plan you dislike. The most natural, polite reply is:",
    choices: ["No. Bad idea.", "I see what you mean, but I'd prefer something else.", "You are wrong always.", "Yes I hate it."], answer: 1 },
  { id: "b1-wr1", level: "B1", skill: "writing",
    prompt: "You email your boss. Which greeting is most appropriate (formal)?",
    choices: ["Hey!", "Yo, boss", "Dear Mr. Lee,", "Sup"], answer: 2 },
  { id: "b1-li1", level: "B1", skill: "literature",
    prompt: "'She was as busy as a bee.' This simile means she was:",
    choices: ["lazy", "very busy", "angry", "small"], answer: 1 },

  // ============================ B2 ============================
  { id: "b2-gr1", level: "B2", skill: "grammar",
    prompt: "I wish I ___ more time to study for the exam.", choices: ["have", "had", "will have", "would have"], answer: 1 },
  { id: "b2-gr2", level: "B2", skill: "grammar",
    prompt: "Hardly ___ arrived when the phone rang.", choices: ["I had", "had I", "I have", "have I"], answer: 1 },
  { id: "b2-vo1", level: "B2", skill: "vocabulary",
    prompt: "The word 'meticulous' most nearly means:", choices: ["careless", "very careful", "quick", "friendly"], answer: 1 },
  { id: "b2-rd1", level: "B2", skill: "reading",
    prompt: "Read: 'The proposal was met with skepticism by the board.' The board members were:",
    choices: ["excited", "doubtful", "furious", "confused"], answer: 1 },
  { id: "b2-sp1", level: "B2", skill: "speaking",
    prompt: "A colleague shares bad news. The most natural, empathetic response is:",
    choices: ["That's your problem.", "I'm so sorry to hear that. Is there anything I can do?", "OK, next topic.", "Good for you."], answer: 1 },
  { id: "b2-wr1", level: "B2", skill: "writing",
    prompt: "Choose the clearest, most concise version:",
    choices: [
      "Due to the fact that it was raining, we stayed inside.",
      "Because it was raining, we stayed inside.",
      "On account of the rain that was falling, we remained inside.",
      "It was raining and because of that reason we stayed inside."], answer: 1 },
  { id: "b2-li1", level: "B2", skill: "literature",
    prompt: "'Time is a thief.' This metaphor suggests that time:",
    choices: ["can be stopped", "steals moments from us", "is money", "is slow"], answer: 1 },

  // ============================ C1 ============================
  { id: "c1-gr1", level: "C1", skill: "grammar",
    prompt: "___ for your help, we would have failed.", choices: ["If not", "Were it not", "Had not it", "Unless"], answer: 1 },
  { id: "c1-gr2", level: "C1", skill: "grammar",
    prompt: "No sooner ___ the door than the lights went out.",
    choices: ["he closed", "had he closed", "he had closed", "did he close"], answer: 1 },
  { id: "c1-vo1", level: "C1", skill: "vocabulary",
    prompt: "'Ubiquitous' most nearly means:", choices: ["rare", "found everywhere", "ancient", "hidden"], answer: 1 },
  { id: "c1-vo2", level: "C1", skill: "vocabulary",
    prompt: "'Ephemeral' most nearly means:", choices: ["lasting forever", "short-lived", "enormous", "colorful"], answer: 1 },
  { id: "c1-rd1", level: "C1", skill: "reading",
    prompt: "Read: 'While the policy was ostensibly designed to help small firms, its real beneficiaries were large corporations.' The word 'ostensibly' implies the stated aim was:",
    choices: ["genuine and proven", "apparent but perhaps not the true one", "illegal", "widely praised"], answer: 1 },
  { id: "c1-sp1", level: "C1", skill: "speaking",
    prompt: "In a debate you want to concede a point before disagreeing. The most natural phrase is:",
    choices: ["Whatever you say.", "Granted, that's a fair point; however, the data suggests otherwise.", "You're totally wrong.", "I don't care about that."], answer: 1 },
  { id: "c1-wr1", level: "C1", skill: "writing",
    prompt: "Choose the sentence with the best cohesion and no redundancy:",
    choices: [
      "The results were good. The results showed improvement. This was good.",
      "The results were positive, showing a clear improvement over last year.",
      "The results, which were good results, improved and got better.",
      "Good results happened and improvement also happened too."], answer: 1 },
  { id: "c1-li1", level: "C1", skill: "literature",
    prompt: "'The wind whispered through the trees.' This is an example of:",
    choices: ["hyperbole", "personification", "irony", "alliteration"], answer: 1 },
  { id: "c1-li2", level: "C1", skill: "literature",
    prompt: "A character says 'Oh, wonderful' after his car breaks down in the rain. The tone is:",
    choices: ["sincere joy", "verbal irony (sarcasm)", "formal", "fearful"], answer: 1 },
];
