/**
 * data/placement-questions.js — Banco de preguntas del examen de ubicacion.
 *
 * Datos PUROS. Cada pregunta esta etiquetada con:
 *   - level: nivel MCER que evalua (A1, A2, B1, B2)
 *   - skill: competencia (grammar | vocabulary | reading)
 *   - choices + answer: opcion multiple auto-corregible (answer = indice correcto)
 *
 * MVP: ingles A1-B2. Se amplia agregando mas objetos aqui (no toca la logica).
 */

export const PLACEMENT_QUESTIONS = [
  // ---------------- A1 ----------------
  { id: "a1-1", level: "A1", skill: "grammar",
    prompt: "___ name is Ana.", choices: ["My", "Me", "I", "Mine"], answer: 0 },
  { id: "a1-2", level: "A1", skill: "vocabulary",
    prompt: "Choose the color: The sky is ___.", choices: ["blue", "table", "run", "happy"], answer: 0 },
  { id: "a1-3", level: "A1", skill: "grammar",
    prompt: "She ___ a student.", choices: ["am", "is", "are", "be"], answer: 1 },
  { id: "a1-4", level: "A1", skill: "vocabulary",
    prompt: "How ___ are you? - I'm 20.", choices: ["old", "much", "many", "long"], answer: 0 },
  { id: "a1-5", level: "A1", skill: "grammar",
    prompt: "They ___ from Spain.", choices: ["is", "am", "are", "be"], answer: 2 },

  // ---------------- A2 ----------------
  { id: "a2-1", level: "A2", skill: "grammar",
    prompt: "Yesterday I ___ to the park.", choices: ["go", "went", "gone", "going"], answer: 1 },
  { id: "a2-2", level: "A2", skill: "vocabulary",
    prompt: "Opposite of 'expensive':", choices: ["cheap", "big", "fast", "old"], answer: 0 },
  { id: "a2-3", level: "A2", skill: "grammar",
    prompt: "There aren't ___ apples in the fridge.", choices: ["some", "any", "much", "a"], answer: 1 },
  { id: "a2-4", level: "A2", skill: "grammar",
    prompt: "She is ___ than her brother.", choices: ["tall", "taller", "tallest", "more tall"], answer: 1 },
  { id: "a2-5", level: "A2", skill: "reading",
    prompt: "'The shop opens at 9 and closes at 5.' When can you go?", choices: ["at 8", "at 3", "at 6", "at 7"], answer: 1 },

  // ---------------- B1 ----------------
  { id: "b1-1", level: "B1", skill: "grammar",
    prompt: "If it rains, we ___ stay home.", choices: ["will", "would", "are", "did"], answer: 0 },
  { id: "b1-2", level: "B1", skill: "grammar",
    prompt: "I have lived here ___ 2010.", choices: ["for", "since", "from", "during"], answer: 1 },
  { id: "b1-3", level: "B1", skill: "vocabulary",
    prompt: "She was ___ tired that she fell asleep.", choices: ["so", "such", "too", "very much"], answer: 0 },
  { id: "b1-4", level: "B1", skill: "grammar",
    prompt: "The report ___ by Monday.", choices: ["must finish", "must be finished", "must finishing", "finish"], answer: 1 },
  { id: "b1-5", level: "B1", skill: "reading",
    prompt: "'Despite the rain, they enjoyed the trip.' The trip was:", choices: ["cancelled", "bad", "still good", "delayed"], answer: 2 },

  // ---------------- B2 ----------------
  { id: "b2-1", level: "B2", skill: "grammar",
    prompt: "I wish I ___ more time to study.", choices: ["have", "had", "will have", "would have"], answer: 1 },
  { id: "b2-2", level: "B2", skill: "vocabulary",
    prompt: "The word 'meticulous' most nearly means:", choices: ["careless", "very careful", "quick", "friendly"], answer: 1 },
  { id: "b2-3", level: "B2", skill: "grammar",
    prompt: "Hardly ___ arrived when the phone rang.", choices: ["I had", "had I", "I have", "have I"], answer: 1 },
  { id: "b2-4", level: "B2", skill: "reading",
    prompt: "'The proposal was met with skepticism.' People were:", choices: ["excited", "doubtful", "angry", "confused"], answer: 1 },
  { id: "b2-5", level: "B2", skill: "vocabulary",
    prompt: "Choose the best word: The evidence was ___ to convict him.", choices: ["enough", "sufficient", "plenty", "full"], answer: 1 },
];
