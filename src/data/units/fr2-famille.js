/**
 * data/units/fr2-famille.js — Unidad A1 fr-FR "La famille" (familia + posesivos).
 *
 * Datos PUROS. term = frances (meta), translation = espanol (L1 del alumno).
 */

export const FR2_FAMILLE = {
  id: "fr2-famille",
  language: "fr",
  level: "A1",
  title: "La famille",
  subtitle: "Hablar de tu familia y usar los posesivos",

  cando: [
    "Puedo nombrar a los miembros de mi familia.",
    "Puedo usar los posesivos 'mon', 'ma', 'mes'.",
    "Puedo usar el verbo 'avoir' para decir lo que tengo.",
    "Puedo describir a mi familia con frases simples.",
  ],

  vocab: [
    { id: "fr2f-1", term: "la famille", translation: "la familia", example: "Voici ma famille." },
    { id: "fr2f-2", term: "la mere", translation: "la madre", example: "Ma mere s'appelle Anne." },
    { id: "fr2f-3", term: "le pere", translation: "el padre", example: "Mon pere est medecin." },
    { id: "fr2f-4", term: "le frere", translation: "el hermano", example: "J'ai un frere." },
    { id: "fr2f-5", term: "la soeur", translation: "la hermana", example: "Ma soeur a douze ans." },
    { id: "fr2f-6", term: "les parents", translation: "los padres", example: "Mes parents habitent a Lyon." },
    { id: "fr2f-7", term: "le fils / la fille", translation: "el hijo / la hija", example: "C'est ma fille." },
    { id: "fr2f-8", term: "le grand-pere", translation: "el abuelo", example: "Mon grand-pere est gentil." },
    { id: "fr2f-9", term: "la grand-mere", translation: "la abuela", example: "Ma grand-mere cuisine bien." },
    { id: "fr2f-10", term: "avoir", translation: "tener", example: "J'ai deux freres." },
    { id: "fr2f-11", term: "habiter", translation: "vivir / habitar", example: "Nous habitons a Paris." },
    { id: "fr2f-12", term: "sympa", translation: "simpatico/a", example: "Ma famille est sympa." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "fr2f-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Lecture : ma famille",
      intro: "Competencia de LECTURA. Lee DOS textos sobre la familia y responde.",
      content: {
        reading:
          "TEXTE 1 - La famille de Marie\n" +
          "Voici ma famille. Mon pere s'appelle Luc, il est medecin. Ma mere s'appelle Sophie, " +
          "elle est professeure. J'ai un frere, il s'appelle Thomas et il a dix ans. " +
          "Nous habitons a Paris. Ma famille est tres sympa.\n\n" +
          "TEXTE 2 - Une conversation\n" +
          "A : Tu as des freres et soeurs ? B : Oui, j'ai une soeur. Elle s'appelle Lea. " +
          "A : Quel age a-t-elle ? B : Elle a quinze ans. Et toi ? " +
          "A : Moi, je n'ai pas de frere. J'habite avec mes parents et ma grand-mere.",
        glossary: [
          { term: "voici", translation: "aqui esta / este es" },
          { term: "mon / ma / mes", translation: "mi / mis" },
          { term: "j'ai", translation: "yo tengo" },
          { term: "il a dix ans", translation: "el tiene diez anos" },
          { term: "nous habitons", translation: "nosotros vivimos" },
          { term: "quel age ?", translation: "que edad?" },
          { term: "je n'ai pas de", translation: "no tengo" },
          { term: "avec", translation: "con" },
        ],
        keyPhrases: [
          "Fijate en quien es quien y a que se dedica.",
          "En el Texto 2, atiende a las edades.",
        ],
        check: [
          { prompt: "T1 : Comment s'appelle le pere de Marie ?", choices: ["Thomas", "Luc", "Sophie"], answer: 1 },
          { prompt: "T1 : Quelle est la profession de la mere ?", choices: ["Medecin", "Professeure", "Etudiante"], answer: 1 },
          { prompt: "T1 : Ou habite la famille ?", choices: ["A Lyon", "A Paris", "A Nice"], answer: 1 },
          { prompt: "T2 : Combien de soeurs a la personne B ?", choices: ["Une", "Deux", "Aucune"], answer: 0 },
          { prompt: "T2 : Quel age a Lea ?", choices: ["Dix ans", "Quinze ans", "Douze ans"], answer: 1 },
          { prompt: "T2 : Avec qui habite la personne A ?", choices: ["Avec ses parents et sa grand-mere", "Seule", "Avec son frere"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "fr2f-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Lexique : les membres de la famille",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "le pere / la mere", translation: "el padre / la madre" },
        { term: "le frere / la soeur", translation: "el hermano / la hermana" },
        { term: "les parents", translation: "los padres" },
        { term: "le fils / la fille", translation: "el hijo / la hija" },
        { term: "le grand-pere / la grand-mere", translation: "el abuelo / la abuela" },
        { term: "la famille", translation: "la familia" },
        { term: "avoir", translation: "tener" },
        { term: "habiter", translation: "vivir" },
      ],
      activities: [
        {
          id: "fr2f-vocab-a1", type: "matching",
          prompt: "Empareja (1/2) :",
          payload: { pairs: [
            { left: "le pere", right: "el padre" },
            { left: "la mere", right: "la madre" },
            { left: "le frere", right: "el hermano" },
            { left: "la soeur", right: "la hermana" },
          ] },
        },
        {
          id: "fr2f-vocab-a2", type: "matching",
          prompt: "Empareja (2/2) :",
          payload: { pairs: [
            { left: "les parents", right: "los padres" },
            { left: "la fille", right: "la hija" },
            { left: "le grand-pere", right: "el abuelo" },
            { left: "la famille", right: "la familia" },
          ] },
        },
        {
          id: "fr2f-vocab-a3", type: "cloze",
          prompt: "Completa: 'Ma ___ s'appelle Sophie.' (madre)",
          payload: { answer: "mere" },
          explain: "'La mere' = la madre.",
        },
        {
          id: "fr2f-vocab-a4", type: "cloze",
          prompt: "Completa: 'J'ai un ___ et une soeur.' (hermano)",
          payload: { answer: "frere" },
          explain: "'Le frere' = el hermano.",
        },
        {
          id: "fr2f-vocab-a5", type: "cloze",
          prompt: "Completa: 'Nous ___ a Paris.' (vivimos)",
          payload: { answer: "habitons" },
          explain: "'Habiter' con 'nous' -> 'habitons'.",
        },
        {
          id: "fr2f-vocab-a6", type: "multiple_choice",
          prompt: "Que palabra significa 'la abuela'?",
          payload: { choices: ["la grand-mere", "la mere", "la soeur"], answer: 0 },
          explain: "'La grand-mere' = la abuela.",
        },
        {
          id: "fr2f-vocab-a7", type: "multiple_choice",
          prompt: "Como preguntas la edad de alguien?",
          payload: { choices: ["Quel est ton nom ?", "Quel age as-tu ?", "D'ou es-tu ?"], answer: 1 },
          explain: "'Quel age as-tu ?' = cuantos anos tienes?",
        },
        {
          id: "fr2f-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["famille", "ma", "Voici"], answer: ["Voici", "ma", "famille"] },
          explain: "'Voici ma famille' = esta es mi familia.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "fr2f-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammaire : les possessifs et 'avoir'",
      intro: "Competencia de GRAMATICA. Los posesivos cambian segun el GENERO de lo poseido.",
      grammar: {
        title: "Mon / Ma / Mes + le verbe 'avoir'",
        chart: {
          title: "POSSESSIFS (1re personne)",
          maps: "MON / MA / MES (mi, mis)",
          groups: [
            {
              label: "POSSESSIFS", color: "purple",
              forms: [
                { form: "MON", subjects: "+ masculino (mon pere)" },
                { form: "MA", subjects: "+ femenino (ma mere)" },
                { form: "MES", subjects: "+ plural (mes parents)" },
              ],
            },
            {
              label: "AVOIR (present)", color: "amber",
              forms: [
                { form: "AI", subjects: "j'" },
                { form: "AS", subjects: "tu" },
                { form: "A", subjects: "il, elle" },
                { form: "AVONS", subjects: "nous" },
                { form: "ONT", subjects: "ils, elles" },
              ],
            },
          ],
        },
        form: "*mon* pere / *ma* mere / *mes* parents  ·  j'*ai* / tu *as* / il *a*",
        desc: "Para decir de quien es algo y para decir lo que tienes (incluida la edad).",
        rule: "El posesivo frances concuerda con lo POSEIDO, no con quien posee: 'mon pere' (masc.), 'ma mere' (fem.), 'mes parents' (plural). Ojo: la edad se dice con 'avoir', no con 'etre': 'j'ai dix ans'.",
        examples: ["Mon pere est medecin.", "Ma soeur a quinze ans.", "Mes parents habitent a Lyon.", "J'ai deux freres."],
        explain: { tr: ["Mi padre es medico.", "Mi hermana tiene quince anos.", "Mis padres viven en Lyon.", "Tengo dos hermanos."] },
        mistakes: [
          { wrong: "Ma pere est medecin.", right: "Mon pere est medecin." },
          { wrong: "Je suis dix ans.", right: "J'ai dix ans." },
          { wrong: "Mon parents habitent ici.", right: "Mes parents habitent ici." },
        ],
      },
      activities: [
        {
          id: "fr2f-gram-a1", type: "cloze",
          prompt: "Completa: '___ pere est medecin.' (mi, masculino)",
          payload: { answer: "mon" },
          explain: "'Pere' es masculino -> 'mon'.",
        },
        {
          id: "fr2f-gram-a2", type: "cloze",
          prompt: "Completa: '___ mere est professeure.' (mi, femenino)",
          payload: { answer: "ma" },
          explain: "'Mere' es femenino -> 'ma'.",
        },
        {
          id: "fr2f-gram-a3", type: "cloze",
          prompt: "Completa: '___ parents habitent a Lyon.' (mis, plural)",
          payload: { answer: "mes" },
          explain: "Plural -> 'mes'.",
        },
        {
          id: "fr2f-gram-a4", type: "cloze",
          prompt: "Completa: 'J'___ deux freres.' (tengo)",
          payload: { answer: "ai" },
          explain: "Con 'je' el verbo 'avoir' hace 'j'ai'.",
        },
        {
          id: "fr2f-gram-a5", type: "multiple_choice",
          prompt: "Elige la frase correcta:",
          payload: { choices: ["Je suis quinze ans.", "J'ai quinze ans.", "Je a quinze ans."], answer: 1 },
          explain: "La edad va con 'avoir': j'ai quinze ans.",
        },
        {
          id: "fr2f-gram-a6", type: "multiple_choice",
          prompt: "Elige la frase correcta:",
          payload: { choices: ["Ma frere est grand.", "Mon frere est grand.", "Mes frere est grand."], answer: 1 },
          explain: "'Frere' es masculino singular -> 'mon'.",
        },
        {
          id: "fr2f-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["soeur", "une", "J'ai"], answer: ["J'ai", "une", "soeur"] },
          explain: "Orden: J'ai + un/une + (familiar).",
        },
        {
          id: "fr2f-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["a", "parents", "Lyon", "habitent", "Mes"], answer: ["Mes", "parents", "habitent", "a", "Lyon"] },
          explain: "Orden: Mes + parents + habitent + a + (ciudad).",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "fr2f-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Ecriture : presente ta famille",
      intro: "Competencia de ESCRITURA. Describe a tu familia, frase por frase.",
      activities: [
        {
          id: "fr2f-write-a1", type: "word_bank",
          prompt: "1. Presenta a tu familia:",
          payload: { words: ["famille", "ma", "Voici"], answer: ["Voici", "ma", "famille"] },
        },
        {
          id: "fr2f-write-a2", type: "word_bank",
          prompt: "2. Di como se llama tu padre:",
          payload: { words: ["s'appelle", "pere", "Mon", "Luc"], answer: ["Mon", "pere", "s'appelle", "Luc"] },
        },
        {
          id: "fr2f-write-a3", type: "word_bank",
          prompt: "3. Di cuantos hermanos tienes:",
          payload: { words: ["freres", "deux", "J'ai"], answer: ["J'ai", "deux", "freres"] },
        },
        {
          id: "fr2f-write-a4", type: "word_bank",
          prompt: "4. Di donde viven tus padres:",
          payload: { words: ["a", "habitent", "Paris", "Mes", "parents"], answer: ["Mes", "parents", "habitent", "a", "Paris"] },
        },
        {
          id: "fr2f-write-a5", type: "word_bank",
          prompt: "5. Di la edad de tu hermana:",
          payload: { words: ["ans", "soeur", "Ma", "a", "quinze"], answer: ["Ma", "soeur", "a", "quinze", "ans"] },
        },
        {
          id: "fr2f-write-a6", type: "multiple_choice",
          prompt: "6. Como dices 'mi madre es simpatica'?",
          payload: { choices: ["Mon mere est sympa.", "Ma mere est sympa.", "Mes mere est sympa."], answer: 1 },
        },
        {
          id: "fr2f-write-a7", type: "multiple_choice",
          prompt: "7. Te preguntan 'Tu as des freres ?' Respondes:",
          payload: { choices: ["Oui, j'ai un frere.", "Oui, je suis un frere.", "Oui, mon frere."], answer: 0 },
        },
        {
          id: "fr2f-write-a8", type: "multiple_choice",
          prompt: "8. Cual frase dice correctamente una edad?",
          payload: { choices: ["Mon pere est quarante ans.", "Mon pere a quarante ans.", "Mon pere ai quarante ans."], answer: 1 },
        },
      ],
    },
  ],
};
