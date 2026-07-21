/**
 * data/anti-errors.js — "Trampas del hispanohablante": errores TIPICOS es->en.
 *
 * Nuestro DIFERENCIAL (moat): una app global ensena igual a todos. Nosotros
 * atacamos los errores que SOLO comete quien piensa en espanol: falsos amigos,
 * genero (he/she), "people is/are", orden del adjetivo, doble negacion, etc.
 *
 * Cada item lleva NIVEL MCER (level). Se muestran las trampas <= al nivel del
 * alumno, asi en niveles altos aparecen MAS (y mas dificiles). Datos puros.
 */

/** Orden MCER para comparar niveles. */
const CEFR_ORDER = ["A1", "A2", "B1", "B2", "C1", "C2"];
const rank = (lvl) => { const i = CEFR_ORDER.indexOf(lvl); return i < 0 ? 2 : i; };

export const ANTI_ERROR_ITEMS = [
  // ---------------- A1 ----------------
  {
    level: "A1", cat: "G\u00e9nero (he/she)",
    prompt: "Hablas de tu hermana. Completa: 'My sister is a doctor. ___ works at a hospital.'",
    options: ["He", "She", "It"], answer: 1,
    explain: "En espa\u00f1ol el g\u00e9nero se sobreentiende, pero en ingl\u00e9s SIEMPRE se marca: hermana = 'she'.",
  },
  {
    level: "A1", cat: "G\u00e9nero (he/she)",
    prompt: "Tu pap\u00e1 cocina. Completa: 'My dad is here. ___ is cooking.'",
    options: ["She", "He", "They"], answer: 1,
    explain: "Pap\u00e1 = 'he'. Ojo: es el error #1 del hispanohablante confundir he/she al hablar r\u00e1pido.",
  },
  {
    level: "A1", cat: "Verbo faltante (to be)",
    prompt: "'Tengo 20 a\u00f1os' en ingl\u00e9s es:",
    options: ["I have 20 years", "I'm 20 years old", "I have 20 years old"], answer: 1,
    explain: "La edad usa 'to be': 'I am 20'. En espa\u00f1ol usamos 'tener', en ingl\u00e9s 'ser/estar'.",
  },
  {
    level: "A1", cat: "Verbo faltante (to be)",
    prompt: "'Tengo calor':",
    options: ["I have hot", "I'm hot", "I have heat"], answer: 1,
    explain: "Sensaciones con 'to be': 'I'm hot/cold/hungry'. No se traduce 'tener' literal.",
  },
  {
    level: "A1", cat: "Orden del adjetivo",
    prompt: "'Un carro rojo' en ingl\u00e9s es...",
    options: ["a car red", "a red car", "a red's car"], answer: 1,
    explain: "En ingl\u00e9s el adjetivo va ANTES del sustantivo: 'red car'. En espa\u00f1ol va despu\u00e9s.",
  },

  // ---------------- A2 ----------------
  {
    level: "A2", cat: "People is/are",
    prompt: "\u00bfCu\u00e1l es correcta?",
    options: ["The people is happy", "The people are happy", "The peoples are happy"], answer: 1,
    explain: "'People' es PLURAL (personas) -> 'are'. Y casi nunca lleva 's'.",
  },
  {
    level: "A2", cat: "Presente simple (3a persona)",
    prompt: "\u00bfCu\u00e1l es correcta?",
    options: ["She work every day", "She works every day", "She working every day"], answer: 1,
    explain: "3a persona (he/she/it) en presente lleva '-s': 'works'. Error muy com\u00fan al hablar.",
  },
  {
    level: "A2", cat: "Orden del adjetivo",
    prompt: "'Una casa grande y bonita':",
    options: ["a house big and nice", "a big nice house", "a nice big house"], answer: 2,
    explain: "Orden natural: opini\u00f3n + tama\u00f1o + sustantivo -> 'a nice big house'.",
  },
  {
    level: "A2", cat: "Plurales",
    prompt: "'Tengo mucha tarea' (uncountable):",
    options: ["I have many homeworks", "I have a lot of homework", "I have much homeworks"], answer: 1,
    explain: "'Homework' es incontable: sin 's' y con 'a lot of'. Igual: information, advice, furniture.",
  },
  {
    level: "A2", cat: "Verbo faltante (to be)",
    prompt: "'Estoy de acuerdo':",
    options: ["I'm agree", "I agree", "I am agree with"], answer: 1,
    explain: "'Agree' YA es verbo: 'I agree' (sin 'am'). Meter 'to be' es un calco del espa\u00f1ol.",
  },

  // ---------------- B1 ----------------
  {
    level: "B1", cat: "Falsos amigos",
    prompt: "Quieres decir 'Estoy avergonzado'. \u00bfCu\u00e1l es correcta?",
    options: ["I'm embarrassed", "I'm embarazed", "I'm pregnant"], answer: 0,
    explain: "'Embarrassed' = avergonzado. \u00a1'Embarazada' se dice 'pregnant'! Cl\u00e1sico falso amigo.",
  },
  {
    level: "B1", cat: "Falsos amigos",
    prompt: "'Actually' significa...",
    options: ["en realidad / de hecho", "actualmente", "por ahora"], answer: 0,
    explain: "'Actually' = en realidad. 'Actualmente' se dice 'currently' o 'nowadays'.",
  },
  {
    level: "B1", cat: "Doble negaci\u00f3n",
    prompt: "'No tengo nada' se dice:",
    options: ["I don't have nothing", "I don't have anything", "I no have nothing"], answer: 1,
    explain: "El ingl\u00e9s NO usa doble negaci\u00f3n: 'don't + anything'. En espa\u00f1ol s\u00ed ('no...nada').",
  },
  {
    level: "B1", cat: "Preposiciones",
    prompt: "'Depende de ti':",
    options: ["It depends of you", "It depends on you", "It depends you"], answer: 1,
    explain: "'Depend ON' (no 'of'). Preposici\u00f3n distinta al espa\u00f1ol ('depender de').",
  },
  {
    level: "B1", cat: "Preposiciones",
    prompt: "'Estoy pensando en ti':",
    options: ["I'm thinking in you", "I'm thinking about you", "I'm thinking on you"], answer: 1,
    explain: "'Think ABOUT' (no 'in'). El espa\u00f1ol 'pensar en' enga\u00f1a.",
  },
  {
    level: "B1", cat: "make vs do",
    prompt: "'Tengo que tomar una decisi\u00f3n':",
    options: ["I have to do a decision", "I have to make a decision", "I have to take a decision"], answer: 1,
    explain: "'Make a decision' (no 'do'/'take'). 'Make' = crear/producir; 'do' = realizar tareas.",
  },

  // ---------------- B2 ----------------
  {
    level: "B2", cat: "Falsos amigos",
    prompt: "Vas a la escuela a estudiar tu 'carrera'. En ingl\u00e9s:",
    options: ["my career", "my major / my degree", "my race"], answer: 1,
    explain: "La 'carrera' universitaria es 'major/degree'. 'Career' = trayectoria profesional.",
  },
  {
    level: "B2", cat: "Falsos amigos",
    prompt: "'I'm constipated' en realidad significa...",
    options: ["estoy resfriado", "estoy estre\u00f1ido", "estoy cansado"], answer: 1,
    explain: "'Constipated' = estre\u00f1ido (no resfriado). Resfriado = 'I have a cold'.",
  },
  {
    level: "B2", cat: "for vs since",
    prompt: "'He vivido aqu\u00ed durante 5 a\u00f1os':",
    options: ["I've lived here since 5 years", "I've lived here for 5 years", "I live here for 5 years"], answer: 1,
    explain: "'For' + periodo (5 a\u00f1os); 'since' + punto de inicio (2019). Y present perfect, no presente.",
  },
  {
    level: "B2", cat: "say vs tell",
    prompt: "'Me dijo la verdad':",
    options: ["He said me the truth", "He told me the truth", "He said to me the truth"], answer: 1,
    explain: "'Tell' lleva persona directa (tell me); 'say' no (say something / say TO someone).",
  },
  {
    level: "B2", cat: "Gerundio tras preposici\u00f3n",
    prompt: "'Soy bueno nadando':",
    options: ["I'm good at swim", "I'm good at swimming", "I'm good in swimming"], answer: 1,
    explain: "Tras preposici\u00f3n va gerundio (-ing): 'good AT swimming'. Y es 'at', no 'in'.",
  },
  {
    level: "B2", cat: "Falsos amigos",
    prompt: "'Sensible' (que se ofende f\u00e1cil) en ingl\u00e9s es:",
    options: ["sensible", "sensitive", "reasonable"], answer: 1,
    explain: "'Sensitive' = sensible (emocional). 'Sensible' en ingl\u00e9s = sensato/con sentido com\u00fan.",
  },

  // ---------------- C1 ----------------
  {
    level: "C1", cat: "Estilo indirecto",
    prompt: "Reporta: She said: 'I am tired.' ->",
    options: ["She said she is tired", "She said she was tired", "She said I was tired"], answer: 1,
    explain: "En reported speech el presente retrocede a pasado: 'is' -> 'was'.",
  },
  {
    level: "C1", cat: "Falsos amigos",
    prompt: "'Eventually' significa...",
    options: ["eventualmente / tal vez", "finalmente / con el tiempo", "de vez en cuando"], answer: 1,
    explain: "'Eventually' = al final, con el tiempo. 'Eventualmente' (quiz\u00e1) = 'possibly/maybe'.",
  },
  {
    level: "C1", cat: "Falsos amigos",
    prompt: "'Assist a meeting' es un error. Lo correcto para 'asistir a una reuni\u00f3n':",
    options: ["assist a meeting", "attend a meeting", "assist to a meeting"], answer: 1,
    explain: "'Attend' = asistir. 'Assist' = ayudar. Otro falso amigo cl\u00e1sico.",
  },
  {
    level: "C1", cat: "Colocaciones",
    prompt: "'Hacer una foto':",
    options: ["make a photo", "take a photo", "do a photo"], answer: 1,
    explain: "'Take a photo' (colocaci\u00f3n fija). El ingl\u00e9s empareja verbos y sustantivos de forma fija.",
  },

  // ---------------- C2 ----------------
  {
    level: "C2", cat: "Subjuntivo (mandative)",
    prompt: "'Sugiero que \u00e9l vaya':",
    options: ["I suggest that he goes", "I suggest that he go", "I suggest him to go"], answer: 1,
    explain: "Tras suggest/insist/demand va subjuntivo con base: 'that he GO' (sin -s).",
  },
  {
    level: "C2", cat: "Inversi\u00f3n enf\u00e1tica",
    prompt: "'Nunca hab\u00eda visto algo as\u00ed' (enf\u00e1tico):",
    options: ["Never I had seen such a thing", "Never had I seen such a thing", "Never I saw such a thing"], answer: 1,
    explain: "Con negativo al inicio (Never/Rarely/Little) se invierte: 'Never HAD I seen...'.",
  },
];

/**
 * Devuelve N trampas <= al nivel dado, barajadas. Si no se da nivel, usa todas.
 * @param {number} n - cuantas devolver
 * @param {string} [level] - nivel MCER del alumno (A1..C2)
 */
export function pickAntiErrors(n = 8, level) {
  let pool = ANTI_ERROR_ITEMS;
  if (level) {
    const max = rank(level);
    pool = ANTI_ERROR_ITEMS.filter((it) => rank(it.level) <= max);
    if (pool.length < 4) pool = ANTI_ERROR_ITEMS; // salvaguarda: nunca muy pocas
  }
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return n ? shuffled.slice(0, n) : shuffled;
}
