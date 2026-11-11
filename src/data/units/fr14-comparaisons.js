/**
 * data/units/fr14-comparaisons.js — Unite A2 francais "Comparaisons"
 * (comparatif et superlatif).
 *
 * Datos PUROS. term = frances (meta), translation = espanol (L1 del alumno).
 */

export const FR14_COMPARAISONS = {
  id: "fr14-comparaisons",
  language: "fr",
  level: "A2",
  title: "Comparaisons",
  subtitle: "Comparativo (plus...que, moins...que, aussi...que) y superlativo (le/la plus...)",

  cando: [
    "Puedo comparar dos cosas o personas con 'plus...que' y 'moins...que'.",
    "Puedo usar 'aussi...que' para decir que algo es igual.",
    "Puedo usar el superlativo relativo (le/la plus...).",
    "Puedo expresar mi opinion comparando opciones (a mon avis).",
  ],

  vocab: [
    { id: "fr14c-1", term: "plus... que", translation: "mas... que", example: "Paris est plus grand que Lyon." },
    { id: "fr14c-2", term: "moins... que", translation: "menos... que", example: "Le train est moins cher que l'avion." },
    { id: "fr14c-3", term: "aussi... que", translation: "tan... como", example: "Elle est aussi grande que sa soeur." },
    { id: "fr14c-4", term: "meilleur(e)", translation: "mejor", example: "Ce restaurant est le meilleur de la ville." },
    { id: "fr14c-5", term: "pire", translation: "peor", example: "C'est le pire film que j'ai vu." },
    { id: "fr14c-6", term: "plus grand", translation: "mas grande", example: "Ma maison est plus grande." },
    { id: "fr14c-7", term: "plus cher", translation: "mas caro", example: "Cet hotel est plus cher." },
    { id: "fr14c-8", term: "moins cher", translation: "mas barato", example: "Le bus est moins cher." },
    { id: "fr14c-9", term: "plus rapide", translation: "mas rapido", example: "Le train est plus rapide que la voiture." },
    { id: "fr14c-10", term: "a mon avis", translation: "en mi opinion", example: "A mon avis, c'est mieux." },
    { id: "fr14c-11", term: "preferer", translation: "preferir", example: "Je prefere la plage a la montagne." },
    { id: "fr14c-12", term: "quand meme", translation: "aun asi", example: "C'est cher, mais quand meme ca vaut le coup." },
  ],

  lessons: [
    // ================= READING =================
    {
      id: "fr14c-read",
      order: 1,
      phase: "learn",
      skills: ["reading"],
      title: "Lecture : deux villes",
      intro: "Competencia de LECTURA. Lee DOS textos en frances y responde las preguntas.",
      content: {
        reading:
          "TEXTE 1 - Deux villes\n" +
          "A mon avis, Paris est plus interessant que Lyon, mais Lyon est plus tranquille que Paris. Paris a " +
          "plus de culture, mais Lyon est moins chaotique. La nourriture a Paris est aussi bonne qu'a Lyon, " +
          "mais les prix sont plus eleves a Paris. Pour moi, la meilleure ville pour vivre est Lyon, mais la " +
          "meilleure pour visiter est Paris.\n\n" +
          "TEXTE 2 - Choisir un transport\n" +
          "A : On prend le train ou l'avion ? B : Le train est moins cher, mais l'avion est plus rapide. " +
          "A : Tu as raison, mais je prefere le train parce que c'est moins stressant. B : Moi aussi ! Et " +
          "en plus, le train est aussi confortable que l'avion pour les voyages courts.",
        glossary: [
          { term: "plus... que / moins... que", translation: "mas... que / menos... que" },
          { term: "le meilleur / le pire", translation: "el mejor / el peor" },
          { term: "aussi... que", translation: "tan... como" },
          { term: "a mon avis", translation: "en mi opinion" },
          { term: "je prefere", translation: "prefiero" },
          { term: "confortable", translation: "comodo" },
          { term: "stressant", translation: "estresante" },
          { term: "chaotique", translation: "caotico" },
        ],
        keyPhrases: [
          "'Plus + adjetivo + que' para comparar superioridad; 'moins + adjetivo + que' para inferioridad.",
          "'Aussi...que' para igualdad entre dos cosas.",
        ],
        check: [
          { prompt: "T1 : Selon le texte, quelle ville a plus de culture ?", choices: ["Paris", "Lyon", "Aucune des deux"], answer: 0 },
          { prompt: "T1 : Quelle ville est moins chaotique ?", choices: ["Lyon", "Paris", "Les deux pareilles"], answer: 0 },
          { prompt: "T1 : Quelle est la meilleure ville pour visiter selon l'auteur ?", choices: ["Paris", "Lyon", "Marseille"], answer: 0 },
          { prompt: "T2 : Quel moyen de transport est moins cher ?", choices: ["Le train", "L'avion", "Le bus"], answer: 0 },
          { prompt: "T2 : Quel moyen de transport est plus rapide ?", choices: ["L'avion", "Le train", "La voiture"], answer: 0 },
          { prompt: "T2 : Pourquoi B prefere le train ?", choices: ["C'est moins stressant", "C'est plus rapide", "C'est moins cher"], answer: 0 },
        ],
      },
      activities: [],
    },

    // ================= VOCABULARY =================
    {
      id: "fr14c-vocab",
      order: 2,
      phase: "practice",
      skills: ["vocabulary"],
      title: "Lexique : les comparaisons",
      intro: "Competencia de VOCABULARIO. Estudia el glosario y practica. Entra a tu SRS.",
      teachesVocab: true,
      glossary: [
        { term: "plus... que / moins... que", translation: "mas... que / menos... que" },
        { term: "aussi... que", translation: "tan... como" },
        { term: "le meilleur / le pire", translation: "el mejor / el peor" },
        { term: "plus grand", translation: "mas grande" },
        { term: "plus cher / moins cher", translation: "mas caro / mas barato" },
        { term: "plus rapide", translation: "mas rapido" },
        { term: "a mon avis", translation: "en mi opinion" },
        { term: "preferer", translation: "preferir" },
      ],
      activities: [
        {
          id: "fr14c-vocab-a1", type: "matching",
          prompt: "Empareja (1/2) :",
          payload: { pairs: [
            { left: "plus... que", right: "mas que" },
            { left: "moins... que", right: "menos que" },
            { left: "le meilleur", right: "el mejor" },
            { left: "le pire", right: "el peor" },
          ] },
        },
        {
          id: "fr14c-vocab-a2", type: "matching",
          prompt: "Empareja (2/2) :",
          payload: { pairs: [
            { left: "plus rapide", right: "mas rapido" },
            { left: "plus cher", right: "mas caro" },
            { left: "a mon avis", right: "en mi opinion" },
            { left: "preferer", right: "preferir" },
          ] },
        },
        {
          id: "fr14c-vocab-a3", type: "cloze",
          prompt: "Completa: 'Paris est ___ grand que Lyon.' (mas)",
          payload: { answer: "plus" },
          explain: "'plus...que' = mas que.",
        },
        {
          id: "fr14c-vocab-a4", type: "cloze",
          prompt: "Completa: 'Le train est ___ cher que l'avion.' (menos)",
          payload: { answer: "moins" },
          explain: "'moins...que' = menos que.",
        },
        {
          id: "fr14c-vocab-a5", type: "cloze",
          prompt: "Completa: 'Elle est aussi grande ___ sa soeur.' (como)",
          payload: { answer: "que" },
          explain: "'aussi...que' = tan como.",
        },
        {
          id: "fr14c-vocab-a6", type: "multiple_choice",
          prompt: "Como se dice 'el mejor restaurante'?",
          payload: { choices: ["le plus bon restaurant", "le meilleur restaurant", "le plus meilleur restaurant"], answer: 1 },
          explain: "'bon' -> superlativo irregolare 'meilleur'.",
        },
        {
          id: "fr14c-vocab-a7", type: "multiple_choice",
          prompt: "Que significa 'a mon avis'?",
          payload: { choices: ["segun el", "en mi opinion", "segun ellos"], answer: 1 },
          explain: "'a mon avis' = en mi opinion.",
        },
        {
          id: "fr14c-vocab-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["moins", "Le", "cher", "train", "est"], answer: ["Le", "train", "est", "moins", "cher"] },
          explain: "'Le train est moins cher'.",
        },
      ],
    },

    // ================= GRAMMAR =================
    {
      id: "fr14c-gram",
      order: 3,
      phase: "practice",
      skills: ["grammar"],
      title: "Grammaire : le comparatif et le superlatif",
      intro: "Competencia de GRAMATICA. Aprende a comparar y a usar el superlativo.",
      grammar: {
        title: "Le comparatif et le superlatif",
        chart: {
          title: "COMPARATIF",
          maps: "plus/moins + adjetivo + QUE",
          groups: [
            {
              label: "COMPARATIF", color: "rose",
              forms: [
                { form: "PLUS... QUE", subjects: "superioridad (mas que)" },
                { form: "MOINS... QUE", subjects: "inferioridad (menos que)" },
                { form: "AUSSI... QUE", subjects: "igualdad (tan como)" },
              ],
            },
            {
              label: "SUPERLATIF", color: "green",
              forms: [
                { form: "LE/LA PLUS... (DE)", subjects: "el/la mas (de)" },
                { form: "BON -> MEILLEUR", subjects: "irregular: mejor" },
                { form: "MAUVAIS -> PIRE", subjects: "irregular: peor" },
              ],
            },
          ],
        },
        form: "plus/moins + adjetivo + que (comparacion); le/la plus + adjetivo (superlativo)",
        desc: "Para comparar dos cosas se usa 'plus...que' (mas que) o 'moins...que' (menos que). Para decir que son IGUALES se usa 'aussi...que'. Para el superlativo (el mas/la mas de un grupo) se usa 'le/la plus + adjetivo'. Ojo con los irregulares: 'bon' -> 'meilleur' (mejor), 'mauvais' -> 'pire' (peor), NO se dice 'plus bon'.",
        rule: "Comparatif de superiorite: PLUS + adjetivo + QUE (Paris est plus grand que Lyon). D'inferiorite: MOINS + adjetivo + QUE. D'egalite: AUSSI + adjetivo + QUE. Superlatif relatif: LE/LA PLUS + adjetivo (+ DE + grupo). Irregulares: bon->meilleur, mauvais->pire.",
        examples: ["Paris est plus grand que Lyon.", "Le train est moins cher que l'avion.", "Elle est aussi grande que sa soeur.", "C'est le meilleur restaurant de la ville."],
        explain: { tr: ["Paris es mas grande que Lyon.", "El tren es menos caro que el avion.", "Ella es tan alta como su hermana.", "Es el mejor restaurante de la ciudad."] },
        mistakes: [
          { wrong: "Ce restaurant est plus bon.", right: "Ce restaurant est meilleur." },
          { wrong: "Elle est la plus meilleure etudiante.", right: "Elle est la meilleure etudiante." },
          { wrong: "Paris est plus grand de Lyon.", right: "Paris est plus grand que Lyon." },
        ],
      },
      activities: [
        {
          id: "fr14c-gram-a1", type: "cloze",
          prompt: "Completa: 'Paris est ___ grand que Lyon.' (mas)",
          payload: { answer: "plus" },
          explain: "'plus...que' = mas que.",
        },
        {
          id: "fr14c-gram-a2", type: "cloze",
          prompt: "Completa: 'Cet hotel est ___ cher que celui-la.' (menos)",
          payload: { answer: "moins" },
          explain: "'moins...que' = menos que.",
        },
        {
          id: "fr14c-gram-a3", type: "cloze",
          prompt: "Completa: 'Elle est grande aussi ___ sa soeur.' (como)",
          payload: { answer: "que" },
          explain: "'aussi...que' para igualdad.",
        },
        {
          id: "fr14c-gram-a4", type: "multiple_choice",
          prompt: "Como se dice 'mejor' (irregular)?",
          payload: { choices: ["plus bon", "meilleur", "plus bien"], answer: 1 },
          explain: "'bon' -> irregolare 'meilleur'.",
        },
        {
          id: "fr14c-gram-a5", type: "multiple_choice",
          prompt: "Como se dice 'peor' (irregular)?",
          payload: { choices: ["plus mauvais", "pire", "moins bon"], answer: 1 },
          explain: "'mauvais' -> irregolare 'pire'.",
        },
        {
          id: "fr14c-gram-a6", type: "multiple_choice",
          prompt: "Elige la frase correcta:",
          payload: { choices: ["Paris est plus grand de Lyon.", "Paris est plus grand que Lyon.", "Paris est plus grand comme Lyon."], answer: 1 },
          explain: "Se usa 'que', no 'de' ni 'comme'.",
        },
        {
          id: "fr14c-gram-a7", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["que", "Elle", "soeur", "est", "aussi", "sa", "grande"], answer: ["Elle", "est", "aussi", "grande", "que", "sa", "soeur"] },
          explain: "'Elle est aussi grande que sa soeur'.",
        },
        {
          id: "fr14c-gram-a8", type: "word_bank",
          prompt: "Ordena la frase:",
          payload: { words: ["le", "C'est", "restaurant", "meilleur"], answer: ["C'est", "le", "meilleur", "restaurant"] },
          explain: "'C'est le meilleur restaurant'.",
        },
      ],
    },

    // ================= WRITING =================
    {
      id: "fr14c-write",
      order: 4,
      phase: "produce",
      skills: ["writing"],
      title: "Ecriture : fais des comparaisons",
      intro: "Competencia de ESCRITURA. Compara dos cosas, frase por frase.",
      activities: [
        {
          id: "fr14c-write-a1", type: "word_bank",
          prompt: "1. Di que Paris es mas grande que Lyon:",
          payload: { words: ["que", "Paris", "est", "Lyon", "plus", "grand"], answer: ["Paris", "est", "plus", "grand", "que", "Lyon"] },
        },
        {
          id: "fr14c-write-a2", type: "word_bank",
          prompt: "2. Di que el tren es menos caro que el avion:",
          payload: { words: ["que", "Le", "cher", "train", "est", "moins", "l'avion"], answer: ["Le", "train", "est", "moins", "cher", "que", "l'avion"] },
        },
        {
          id: "fr14c-write-a3", type: "word_bank",
          prompt: "3. Di que ella es tan alta como tu:",
          payload: { words: ["que", "Elle", "toi", "est", "aussi", "grande"], answer: ["Elle", "est", "aussi", "grande", "que", "toi"] },
        },
        {
          id: "fr14c-write-a4", type: "word_bank",
          prompt: "4. Di que este es el mejor restaurante:",
          payload: { words: ["le", "C'est", "restaurant", "meilleur"], answer: ["C'est", "le", "meilleur", "restaurant"] },
        },
        {
          id: "fr14c-write-a5", type: "word_bank",
          prompt: "5. Pregunta que prefiere (tu):",
          payload: { words: ["preferes", "Qu'est-ce", "tu", "que"], answer: ["Qu'est-ce", "que", "tu", "preferes"] },
        },
        {
          id: "fr14c-write-a6", type: "multiple_choice",
          prompt: "6. El comparativo irregular de 'mauvais' es:",
          payload: { choices: ["plus mauvais", "pire", "moins mauvais"], answer: 1 },
        },
        {
          id: "fr14c-write-a7", type: "multiple_choice",
          prompt: "7. Cual es correcto?",
          payload: { choices: ["plus grand que moi", "plus grand de moi", "plus grand comme moi"], answer: 0 },
        },
        {
          id: "fr14c-write-a8", type: "multiple_choice",
          prompt: "8. 'A mon avis' significa:",
          payload: { choices: ["segun el", "en mi opinion", "segun ellos"], answer: 1 },
        },
      ],
    },
  ],
};
