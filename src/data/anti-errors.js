/**
 * data/anti-errors.js — "Trampas del hispanohablante": errores TIPICOS es->en.
 *
 * Nuestro DIFERENCIAL (moat): una app global ensena igual a todos. Nosotros
 * atacamos los errores que SOLO comete quien piensa en espanol: falsos amigos,
 * genero (he/she), "people is/are", orden del adjetivo, doble negacion, etc.
 *
 * Datos puros. Cada item: categoria, la frase/pregunta, opciones, indice correcto
 * y la explicacion (el "por que" en espanol). Sin I/O ni DOM.
 */
export const ANTI_ERROR_ITEMS = [
  {
    cat: "Falsos amigos",
    prompt: "Quieres decir 'Estoy avergonzado'. \u00bfCu\u00e1l es correcta?",
    options: ["I'm embarrassed", "I'm embarazed", "I'm pregnant"],
    answer: 0,
    explain: "'Embarrassed' = avergonzado. \u00a1'Embarazada' se dice 'pregnant'! Cl\u00e1sico falso amigo.",
  },
  {
    cat: "Falsos amigos",
    prompt: "'Actually' significa...",
    options: ["en realidad / de hecho", "actualmente", "por ahora"],
    answer: 0,
    explain: "'Actually' = en realidad. 'Actualmente' se dice 'currently' o 'nowadays'.",
  },
  {
    cat: "Falsos amigos",
    prompt: "Vas a la escuela a estudiar tu 'carrera'. En ingl\u00e9s:",
    options: ["my career", "my major / my degree", "my race"],
    answer: 1,
    explain: "La 'carrera' universitaria es 'major/degree'. 'Career' = trayectoria profesional; 'race' = carrera de correr.",
  },
  {
    cat: "Falsos amigos",
    prompt: "'I'm constipated' en realidad significa...",
    options: ["estoy resfriado", "estoy estre\u00f1ido", "estoy cansado"],
    answer: 1,
    explain: "'Constipated' = estre\u00f1ido (no resfriado). Resfriado = 'I have a cold'.",
  },
  {
    cat: "G\u00e9nero (he/she)",
    prompt: "Hablas de tu hermana. Completa: 'My sister is a doctor. ___ works at a hospital.'",
    options: ["He", "She", "It"],
    answer: 1,
    explain: "En espa\u00f1ol el g\u00e9nero se sobreentiende, pero en ingl\u00e9s SIEMPRE se marca: hermana = 'she'.",
  },
  {
    cat: "G\u00e9nero (he/she)",
    prompt: "Tu pap\u00e1 cocina. Completa: 'My dad is here. ___ is cooking.'",
    options: ["She", "He", "They"],
    answer: 1,
    explain: "Pap\u00e1 = 'he'. Ojo: es el error #1 del hispanohablante confundir he/she al hablar r\u00e1pido.",
  },
  {
    cat: "People is/are",
    prompt: "\u00bfCu\u00e1l es correcta?",
    options: ["The people is happy", "The people are happy", "The peoples are happy"],
    answer: 1,
    explain: "'People' es PLURAL (personas) -> 'are'. Y casi nunca lleva 's': 'peoples' solo para pueblos/naciones.",
  },
  {
    cat: "Orden del adjetivo",
    prompt: "'Un carro rojo' en ingl\u00e9s es...",
    options: ["a car red", "a red car", "a red's car"],
    answer: 1,
    explain: "En ingl\u00e9s el adjetivo va ANTES del sustantivo: 'red car'. En espa\u00f1ol va despu\u00e9s ('carro rojo').",
  },
  {
    cat: "Orden del adjetivo",
    prompt: "'Una casa grande y bonita':",
    options: ["a house big and nice", "a big nice house", "a nice big house"],
    answer: 2,
    explain: "Orden natural: opini\u00f3n + tama\u00f1o + sustantivo -> 'a nice big house'. Y siempre antes del sustantivo.",
  },
  {
    cat: "Doble negaci\u00f3n",
    prompt: "'No tengo nada' se dice:",
    options: ["I don't have nothing", "I don't have anything", "I no have nothing"],
    answer: 1,
    explain: "El ingl\u00e9s NO usa doble negaci\u00f3n: 'don't + anything'. En espa\u00f1ol s\u00ed ('no...nada').",
  },
  {
    cat: "Doble negaci\u00f3n",
    prompt: "'No vi a nadie':",
    options: ["I didn't see anybody", "I didn't see nobody", "I no saw nobody"],
    answer: 0,
    explain: "'didn't + anybody'. Una sola negaci\u00f3n en ingl\u00e9s.",
  },
  {
    cat: "Verbo faltante (to be)",
    prompt: "'Tengo 20 a\u00f1os' en ingl\u00e9s es:",
    options: ["I have 20 years", "I'm 20 years old", "I have 20 years old"],
    answer: 1,
    explain: "La edad usa 'to be': 'I am 20'. En espa\u00f1ol usamos 'tener' (tengo 20), en ingl\u00e9s 'ser/estar'.",
  },
  {
    cat: "Verbo faltante (to be)",
    prompt: "'Tengo calor':",
    options: ["I have hot", "I'm hot", "I have heat"],
    answer: 1,
    explain: "Sensaciones con 'to be': 'I'm hot/cold/hungry'. No se traduce 'tener' literal.",
  },
  {
    cat: "Preposiciones",
    prompt: "'Depende de ti':",
    options: ["It depends of you", "It depends on you", "It depends you"],
    answer: 1,
    explain: "'Depend ON' (no 'of'). Preposici\u00f3n distinta al espa\u00f1ol ('depender de').",
  },
  {
    cat: "Preposiciones",
    prompt: "'Estoy pensando en ti':",
    options: ["I'm thinking in you", "I'm thinking about you", "I'm thinking on you"],
    answer: 1,
    explain: "'Think ABOUT' (no 'in'). El espa\u00f1ol 'pensar en' enga\u00f1a.",
  },
  {
    cat: "Presente simple (3a persona)",
    prompt: "\u00bfCu\u00e1l es correcta?",
    options: ["She work every day", "She works every day", "She working every day"],
    answer: 1,
    explain: "3a persona (he/she/it) en presente lleva '-s': 'works'. Error muy com\u00fan al hablar.",
  },
];

/** Devuelve N items barajados (o todos si N no se indica). */
export function pickAntiErrors(n = 8) {
  const shuffled = [...ANTI_ERROR_ITEMS].sort(() => Math.random() - 0.5);
  return n ? shuffled.slice(0, n) : shuffled;
}
