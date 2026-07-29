/**
 * data/pt-pronunciation.js — Paquete de PRONUNCIACION del portugues (pt-BR).
 *
 * Datos PUROS. Enfocado en los sonidos que le cuestan al HISPANOHABLANTE
 * (es->pt), que es justo el hueco #1 para llegar a nivel A. Cada "sound" trae:
 *   - label: nombre corto (en espanol)
 *   - tip:   explicacion breve en espanol (L1 del alumno)
 *   - examples: [{ word, es }]  palabras para OIR (voz nativa por la nube)
 *   - pairs:    [{ a:{word,es}, b:{word,es}, tip }]  pares minimos para
 *               ENTRENAR EL OIDO (discriminacion): oyes una y eliges cual fue.
 *
 * Base cientifica: la PERCEPCION precede a la PRODUCCION (Speech Learning Model,
 * Flege). No puedes decir bien lo que no distingues de oido -> primero el oido.
 *
 * El registro (paquetes por idioma) vive abajo: pronunciationPackFor(lang).
 */

const PT_PACK = {
  language: "pt",
  title: "Sons do portugues",
  sounds: [
    {
      id: "nasais",
      label: "Vocales nasales (ao, a-tilde, oe)",
      tip: "El aire sale por la NARIZ. No existe en espanol y es el sonido mas " +
        "tipico del portugues. Practicalo mucho: es lo que mas 'delata' al hispanohablante.",
      examples: [
        { word: "nao", es: "no" },
        { word: "pao", es: "pan" },
        { word: "mae", es: "madre" },
        { word: "irmao", es: "hermano" },
        { word: "coracao", es: "corazon" },
      ],
      pairs: [
        { a: { word: "pao", es: "pan (nasal)" }, b: { word: "pau", es: "palo (oral)" },
          tip: "'pao' es NASAL (sale por la nariz); 'pau' es oral." },
        { a: { word: "la", es: "lana (nasal)" }, b: { word: "la", es: "alla (oral)" },
          tip: "'la' (lana) es nasal; 'la' (alla) es oral. Solo cambia la nariz." },
        { a: { word: "mao", es: "mano (nasal)" }, b: { word: "mau", es: "malo (oral)" },
          tip: "'mao' nasal; 'mau' oral." },
      ],
    },
    {
      id: "vogais",
      label: "Vocales abiertas vs cerradas",
      tip: "El portugues distingue vocales ABIERTAS (boca mas abierta) de CERRADAS. " +
        "El cambio puede cambiar el SIGNIFICADO. En espanol no lo hacemos.",
      examples: [
        { word: "avo", es: "abuela (o abierta)" },
        { word: "avo", es: "abuelo (o cerrada)" },
        { word: "cafe", es: "cafe (e abierta)" },
        { word: "voce", es: "usted/tu (e cerrada)" },
      ],
      pairs: [
        { a: { word: "avo", es: "abuela (o abierta)" }, b: { word: "avo", es: "abuelo (o cerrada)" },
          tip: "'avo' (abuela) con O ABIERTA; 'avo' (abuelo) con O CERRADA. Mismo escrito casi, distinto sonido." },
      ],
    },
    {
      id: "erre",
      label: "R fuerte (rr, r- inicial) = J aspirada",
      tip: "La R al INICIO de palabra y la RR NO suenan como la R espanola: suenan " +
        "como una J suave / H aspirada (como la 'h' del ingles 'hat'). La R entre " +
        "vocales si es suave (una vibracion, como en espanol).",
      examples: [
        { word: "rua", es: "calle" },
        { word: "rato", es: "raton" },
        { word: "carro", es: "coche" },
        { word: "cachorro", es: "perro" },
      ],
      pairs: [
        { a: { word: "caro", es: "caro (R suave)" }, b: { word: "carro", es: "coche (R fuerte)" },
          tip: "'caro' con R suave (una vibracion); 'carro' con R FUERTE (aspirada, como J)." },
      ],
    },
    {
      id: "ese",
      label: "S entre vocales = Z (zumbido)",
      tip: "La S entre dos vocales suena como una Z ZUMBADA (como el 'buzz' del " +
        "ingles), no como la S espanola. Al inicio o doble (ss) si suena S normal.",
      examples: [
        { word: "casa", es: "casa (suena 'caza')" },
        { word: "coisa", es: "cosa" },
        { word: "mesa", es: "mesa (suena 'meza')" },
        { word: "portuguesa", es: "portuguesa" },
      ],
      pairs: [],
    },
    {
      id: "finais",
      label: "Vocales finales: O suena U, E suena I",
      tip: "La O final atona suena como U y la E final atona como I. Es clave para " +
        "sonar natural: 'gato' se dice 'gatu', 'cidade' se dice 'cidadi'.",
      examples: [
        { word: "gato", es: "gato (suena 'gatu')" },
        { word: "livro", es: "libro (suena 'livru')" },
        { word: "verde", es: "verde (suena 'verdi')" },
        { word: "noite", es: "noche (suena 'noitchi')" },
      ],
      pairs: [],
    },
    {
      id: "tide",
      label: "TI / DI y -TE / -DE = 'chi' / 'dji' (Brasil)",
      tip: "En Brasil, la T antes de I (o E final) suena 'ch', y la D suena 'dj'. " +
        "'gente' se dice 'gentchi'; 'dia' se dice 'djia'. Marca muy brasilena.",
      examples: [
        { word: "gente", es: "gente (suena 'gentchi')" },
        { word: "dia", es: "dia (suena 'djia')" },
        { word: "tia", es: "tia (suena 'tchia')" },
        { word: "cidade", es: "ciudad (suena 'cidadji')" },
      ],
      pairs: [],
    },
    {
      id: "lhnh",
      label: "LH (=LL) y NH (=N-tilde): buenas noticias",
      tip: "'lh' suena como la LL/Y suave y 'nh' como la N-tilde espanola. Casi " +
        "iguales al espanol: aqui tienes ventaja, solo ubica la grafia.",
      examples: [
        { word: "filho", es: "hijo" },
        { word: "mulher", es: "mujer" },
        { word: "amanha", es: "manana" },
        { word: "dinheiro", es: "dinero" },
      ],
      pairs: [],
    },
  ],
};

// Registro de paquetes por idioma. Anadir it/fr/ja en el futuro aqui mismo.
const PACKS = { pt: PT_PACK };

/** Paquete de pronunciacion de un idioma (o null si aun no existe). */
export function pronunciationPackFor(lang) {
  return PACKS[lang] || null;
}
