/**
 * data/units/fr15-travail.js — Unite A2 francais "Le travail" ('depuis' +
 * present pour la duree + vocabulaire des metiers).
 *
 * Datos PUROS. term = frances (meta), translation = espanol (L1 del alumno).
 */

export const FR15_TRAVAIL = {
  id: "fr15-travail",
  language: "fr",
  level: "A2",
  title: "Le travail",
  subtitle: "'Depuis' + presente para decir desde cuando haces algo + vocabulario de profesiones",

  cando: [
    "Puedo hablar de mi profesion y mi lugar de trabajo.",
    "Puedo usar 'depuis' + tiempo con el PRESENTE para decir desde cuando hago algo.",
    "Puedo usar vocabulario de profesiones comunes.",
    "Puedo participar en una entrevista de trabajo basica.",
  ],

  vocab: [
    { id: "fr15t-1", term: "le travail", translation: "el trabajo", example: "Mon travail est interessant." },
    { id: "fr15t-2", term: "l'employe(e)", translation: "el empleado/a", example: "Je suis employee dans une banque." },
    { id: "fr15t-3", term: "le professeur", translation: "el profesor/a", example: "Je travaille comme professeur." },
    { id: "fr15t-4", term: "le cuisinier/la cuisiniere", translation: "el/la cocinero/a", example: "Mon frere est cuisinier." },
    { id: "fr15t-5", term: "l'infirmier/l'infirmiere", translation: "el/la enfermero/a", example: "Elle est infirmiere a l'hopital." },
    { id: "fr15t-6", term: "le bureau", translation: "la oficina", example: "Je vais au bureau tous les jours." },
    { id: "fr15t-7", term: "le salaire", translation: "el salario", example: "Le salaire n'est pas eleve, mais j'aime mon travail." },
    { id: "fr15t-8", term: "je travaille ici depuis...", translation: "trabajo aqui desde hace...", example: "Je travaille ici depuis trois ans." },
    { id: "fr15t-9", term: "postuler", translation: "postularse (a un puesto)", example: "J'ai postule pour ce poste." },
    { id: "fr15t-10", term: "l'entretien", translation: "la entrevista", example: "Demain j'ai un entretien d'embauche." },
    { id: "fr15t-11", term: "l'experience", translation: "la experiencia", example: "J'ai de l'experience dans ce domaine." },
    { id: "fr15t-12", term: "embaucher", translation: "contratar", example: "L'entreprise veut embaucher du nouveau personnel." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "fr15t-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Lecture : mon travail",
      intro: "Competencia de LECTURA. Lee DOS textos en frances y responde las preguntas.",
      content: {
        reading:
          "TEXTE 1 - Le travail de Sophie\n" +
          "Je suis employee dans une entreprise de mode depuis deux ans. Je travaille au bureau du lundi au " +
          "vendredi. Mon salaire n'est pas tres eleve, mais j'aime beaucoup mon travail parce que j'ai de " +
          "bons collegues. L'annee prochaine, j'espere avoir une promotion. J'ai beaucoup d'experience dans " +
          "ce domaine, depuis que j'ai commence il y a cinq ans.\n\n" +
          "TEXTE 2 - Un entretien d'embauche\n" +
          "A : Depuis combien de temps travaillez-vous dans le domaine ? B : Je travaille comme infirmiere " +
          "depuis six ans. A : Quelle experience avez-vous ? B : J'ai travaille dans deux hopitaux " +
          "differents. A : Pourquoi voulez-vous travailler ici ? B : Parce que je veux de nouveaux defis et " +
          "votre hopital a une excellente reputation. A : Merci, nous vous contacterons bientot.",
        glossary: [
          { term: "employe(e)", translation: "empleado/a" },
          { term: "depuis deux ans", translation: "desde hace dos anos" },
          { term: "le salaire", translation: "el salario" },
          { term: "l'entretien", translation: "la entrevista" },
          { term: "depuis combien de temps...?", translation: "desde hace cuanto tiempo...?" },
          { term: "l'experience", translation: "la experiencia" },
          { term: "embaucher", translation: "contratar" },
          { term: "nous vous contacterons", translation: "los contactaremos" },
        ],
        keyPhrases: [
          "'Depuis' + periodo + PRESENTE (no pasado) indica desde cuando algo pasa y SIGUE pasando: 'Je travaille ici depuis trois ans'.",
          "'Depuis combien de temps...?' = desde hace cuanto tiempo...? (para preguntar).",
        ],
        check: [
          { prompt: "T1 : Depuis combien de temps Sophie travaille dans l'entreprise ?", choices: ["Depuis deux ans", "Depuis cinq ans", "Depuis un an"], answer: 0 },
          { prompt: "T1 : Comment sont les collegues de Sophie ?", choices: ["Bons", "Difficiles", "Peu nombreux"], answer: 0 },
          { prompt: "T1 : Depuis quand a-t-elle de l'experience dans ce domaine ?", choices: ["Depuis cinq ans", "Depuis deux ans", "Depuis un mois"], answer: 0 },
          { prompt: "T2 : Depuis combien de temps B travaille comme infirmiere ?", choices: ["Depuis six ans", "Depuis deux ans", "Depuis un an"], answer: 0 },
          { prompt: "T2 : Dans combien d'hopitaux a-t-elle travaille ?", choices: ["Dans deux", "Dans trois", "Dans un"], answer: 0 },
          { prompt: "T2 : Pourquoi veut-elle travailler la-bas ?", choices: ["Elle veut de nouveaux defis", "Elle veut plus d'argent", "Elle veut moins d'heures"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "fr15t-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Lexique : les metiers",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "le travail / l'employe", translation: "el trabajo / el empleado" },
        { term: "le professeur / le cuisinier", translation: "el profesor / el cocinero" },
        { term: "l'infirmier", translation: "el enfermero" },
        { term: "le bureau / le salaire", translation: "la oficina / el salario" },
        { term: "je travaille ici depuis...", translation: "trabajo aqui desde hace..." },
        { term: "l'entretien", translation: "la entrevista" },
        { term: "l'experience", translation: "la experiencia" },
        { term: "embaucher", translation: "contratar" },
      ],
      activities: [
        {
          id: "fr15t-vocab-a1", type: "matching",
          prompt: "Empareja (1/2) :",
          payload: { pairs: [
            { left: "le travail", right: "el trabajo" },
            { left: "l'employe", right: "el empleado" },
            { left: "le professeur", right: "el profesor" },
            { left: "le cuisinier", right: "el cocinero" },
          ] },
        },
        {
          id: "fr15t-vocab-a2", type: "matching",
          prompt: "Empareja (2/2) :",
          payload: { pairs: [
            { left: "l'infirmier", right: "el enfermero" },
            { left: "le bureau", right: "la oficina" },
            { left: "le salaire", right: "el salario" },
            { left: "l'entretien", right: "la entrevista" },
          ] },
        },
        {
          id: "fr15t-vocab-a3", type: "cloze",
          prompt: "Completa: 'Je travaille ici ___ trois ans.' (desde hace)",
          payload: { answer: "depuis" },
          explain: "'depuis' + periodo = desde hace.",
        },
        {
          id: "fr15t-vocab-a4", type: "cloze",
          prompt: "Completa: 'J'ai ___ pour ce poste.' (postularse)",
          payload: { answer: "postule" },
          explain: "'postuler' = postularse.",
        },
        {
          id: "fr15t-vocab-a5", type: "cloze",
          prompt: "Completa: 'Demain j'ai un ___ d'embauche.' (entrevista)",
          payload: { answer: "entretien" },
          explain: "'l'entretien' = la entrevista.",
        },
        {
          id: "fr15t-vocab-a6", type: "multiple_choice",
          prompt: "Que significa 'depuis combien de temps'?",
          payload: { choices: ["a que hora", "desde hace cuanto tiempo", "cuanto cuesta"], answer: 1 },
          explain: "'depuis combien de temps' = desde hace cuanto tiempo.",
        },
        {
          id: "fr15t-vocab-a7", type: "multiple_choice",
          prompt: "Como se dice 'tengo experiencia'?",
          payload: { choices: ["J'ai de l'experience.", "Je suis experience.", "Je fais experience."], answer: 0 },
          explain: "'avoir de l'experience' = tener experiencia.",
        },
        {
          id: "fr15t-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["trois", "Je", "ans", "ici", "depuis", "travaille"], answer: ["Je", "travaille", "ici", "depuis", "trois", "ans"] },
          explain: "'Je travaille ici depuis trois ans'.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "fr15t-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammaire : depuis + present",
      intro: "Competencia de GRAMATICA. Aprende a decir desde cuando haces algo (presente, no pasado).",
      grammar: {
        title: "'Depuis' + presente (duracion que continua)",
        chart: {
          title: "DEPUIS + PRESENTE",
          maps: "presente + DEPUIS + periodo o fecha",
          groups: [
            {
              label: "ESTRUCTURA", color: "rose",
              forms: [
                { form: "JE TRAVAILLE + DEPUIS + TROIS ANS", subjects: "trabajo desde hace 3 anos" },
                { form: "J'HABITE + DEPUIS + 2015", subjects: "vivo desde 2015" },
              ],
            },
            {
              label: "PREGUNTA", color: "green",
              forms: [
                { form: "DEPUIS COMBIEN DE TEMPS + presente...?", subjects: "desde hace cuanto tiempo...?" },
              ],
            },
          ],
        },
        form: "[presente] + DEPUIS + [periodo o fecha] (NO pasado)",
        desc: "Cuando algo empezo en el pasado pero SIGUE pasando ahora, el frances usa el PRESENTE + 'depuis' + el periodo de tiempo O una fecha exacta. Es un error comun del hispanohablante usar el pasado aqui; en frances debe ir en PRESENTE: 'je travaille depuis trois ans' (no 'j'ai travaille depuis trois ans').",
        rule: "Formula: [presente] + DEPUIS + [periodo o fecha]. 'Je travaille ici depuis trois ans' (trabajo aqui desde hace tres anos, y sigo). 'J'habite a Paris depuis 2015' -- 'depuis' sirve para AMBOS casos (duracion y fecha exacta), a diferencia del italiano/portugues que usan palabras distintas. Pregunta: 'Depuis combien de temps + presente + ...?'.",
        examples: ["Je travaille ici depuis trois ans.", "J'etudie le francais depuis six mois.", "J'habite a Paris depuis 2015.", "Depuis combien de temps connais-tu Marc ?"],
        explain: { tr: ["Trabajo aqui desde hace tres anos.", "Estudio frances desde hace seis meses.", "Vivo en Paris desde 2015.", "Desde hace cuanto tiempo conoces a Marc?"] },
        mistakes: [
          { wrong: "J'ai travaille ici depuis trois ans.", right: "Je travaille ici depuis trois ans." },
          { wrong: "Je travaille ici pour trois ans.", right: "Je travaille ici depuis trois ans." },
          { wrong: "Depuis combien de temps as-tu travaille ici ?", right: "Depuis combien de temps travailles-tu ici ?" },
        ],
      },
      activities: [
        {
          id: "fr15t-gram-a1", type: "cloze",
          prompt: "Completa (yo, presente): '___ le francais depuis six mois.' (etudier)",
          payload: { answer: "J'etudie" },
          explain: "Presente, no pasado: 'j'etudie'.",
        },
        {
          id: "fr15t-gram-a2", type: "cloze",
          prompt: "Completa: 'J'habite a Paris ___ 2015.' (depuis)",
          payload: { answer: "depuis" },
          explain: "'depuis' + fecha exacta.",
        },
        {
          id: "fr15t-gram-a3", type: "cloze",
          prompt: "Completa: 'Depuis combien de temps ___-tu Marc ?' (connaitre, presente)",
          payload: { answer: "connais" },
          explain: "Presente: 'connais'.",
        },
        {
          id: "fr15t-gram-a4", type: "multiple_choice",
          prompt: "Cual es correcto para 'trabajo aqui desde hace 3 anos'?",
          payload: { choices: ["J'ai travaille ici depuis trois ans.", "Je travaille ici depuis trois ans.", "Je travaillais ici depuis trois ans."], answer: 1 },
          explain: "Accion que continua -> presente.",
        },
        {
          id: "fr15t-gram-a5", type: "multiple_choice",
          prompt: "Que tiempo verbal se usa con 'depuis + periodo' si la accion continua?",
          payload: { choices: ["pasado", "presente", "futuro"], answer: 1 },
          explain: "Siempre presente si la accion continua.",
        },
        {
          id: "fr15t-gram-a6", type: "multiple_choice",
          prompt: "Elige la frase correcta:",
          payload: { choices: ["J'etudie ici pour trois ans.", "J'etudie ici depuis trois ans.", "J'ai etudie ici depuis trois ans."], answer: 1 },
          explain: "'depuis', no 'pour', con presente.",
        },
        {
          id: "fr15t-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["six", "J'etudie", "mois", "depuis", "le", "francais"], answer: ["J'etudie", "le", "francais", "depuis", "six", "mois"] },
          explain: "'J'etudie le francais depuis six mois'.",
        },
        {
          id: "fr15t-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["temps", "Depuis", "ici", "travailles-tu", "combien", "de"], answer: ["Depuis", "combien", "de", "temps", "travailles-tu", "ici"] },
          explain: "'Depuis combien de temps travailles-tu ici ?'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "fr15t-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Ecriture : l'entretien",
      intro: "Competencia de ESCRITURA. Responde en una entrevista de trabajo, frase por frase.",
      activities: [
        {
          id: "fr15t-write-a1", type: "word_bank",
          prompt: "1. Di que trabajas aqui desde hace 2 anos:",
          payload: { words: ["deux", "Je", "ans", "ici", "depuis", "travaille"], answer: ["Je", "travaille", "ici", "depuis", "deux", "ans"] },
        },
        {
          id: "fr15t-write-a2", type: "word_bank",
          prompt: "2. Di que tienes experiencia:",
          payload: { words: ["l'experience", "J'ai", "de"], answer: ["J'ai", "de", "l'experience"] },
        },
        {
          id: "fr15t-write-a3", type: "word_bank",
          prompt: "3. Di que manana tienes una entrevista:",
          payload: { words: ["un", "Demain", "entretien", "j'ai"], answer: ["Demain", "j'ai", "un", "entretien"] },
        },
        {
          id: "fr15t-write-a4", type: "word_bank",
          prompt: "4. Pregunta desde hace cuanto tiempo trabaja (vous):",
          payload: { words: ["temps", "Depuis", "travaillez-vous", "combien", "de"], answer: ["Depuis", "combien", "de", "temps", "travaillez-vous"] },
        },
        {
          id: "fr15t-write-a5", type: "word_bank",
          prompt: "5. Di que vives en Paris desde 2015:",
          payload: { words: ["depuis", "J'habite", "2015", "a", "Paris"], answer: ["J'habite", "a", "Paris", "depuis", "2015"] },
        },
        {
          id: "fr15t-write-a6", type: "multiple_choice",
          prompt: "6. 'Depuis deux ans' (con accion que continua) significa:",
          payload: { choices: ["hace dos anos (ya termino)", "desde hace dos anos (continua)", "en dos anos"], answer: 1 },
        },
        {
          id: "fr15t-write-a7", type: "multiple_choice",
          prompt: "7. Cual es correcto?",
          payload: { choices: ["J'ai travaille ici depuis deux ans.", "Je travaille ici depuis deux ans.", "Je travaillais ici depuis deux ans."], answer: 1 },
        },
        {
          id: "fr15t-write-a8", type: "multiple_choice",
          prompt: "8. 'L'entretien' significa:",
          payload: { choices: ["el salario", "la entrevista", "la oficina"], answer: 1 },
        },
      ],
    },
  ],
};
