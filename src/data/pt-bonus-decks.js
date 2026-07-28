/**
 * data/pt-bonus-decks.js — Mazos BONUS de portugues (pt-BR) para hispanohablantes.
 *
 * Foco pedagogico (Lewis/contrastivo): como el espanol y el portugues se parecen
 * TANTO, el mayor riesgo del hispanohablante NO es el vocabulario nuevo, sino la
 * INTERFERENCIA ("portunhol"): falsos amigos y verbos irregulares. Estos mazos
 * atacan justo eso.
 *
 * Esquema identico a bonus-decks.js (flashcards): { id, language, level, title,
 * subtitle, recall, gradient, medalTitle, medalDesc, items:[{id, front, back,
 * examples:[{en,es}]}] }. El campo `en` guarda la frase en PORTUGUES (idioma
 * meta) y `es` su traduccion. `language: "pt"` permite filtrar por idioma.
 */

export const PT_BONUS_DECKS = [
  {
    id: "falsos-amigos-pt",
    language: "pt",
    level: "A1",
    title: "Falsos amigos",
    subtitle: "Palabras que te enganan (portunhol)",
    recall: "Di el SIGNIFICADO real en espanol",
    gradient: "from-rose-500 to-red-700",
    medalTitle: "Cazador de falsos amigos",
    medalDesc: "Dominaste las trampas mas comunes del portugues",
    items: [
      { id: "fa-oficina", front: "oficina", back: "TALLER (mecanico). 'Oficina' (de trabajo) se dice 'escritorio'.", examples: [
        { en: "O carro esta na oficina.", es: "El carro esta en el taller." }] },
      { id: "fa-escritorio", front: "escritorio", back: "OFICINA / despacho. (No es 'escritorio' mueble, que es 'secretaria/mesa').", examples: [
        { en: "Eu trabalho num escritorio.", es: "Yo trabajo en una oficina." }] },
      { id: "fa-esquisito", front: "esquisito", back: "RARO / extrano. (No es 'exquisito', que se dice 'requintado').", examples: [
        { en: "Que cheiro esquisito!", es: "Que olor tan raro!" }] },
      { id: "fa-todavia", front: "todavia", back: "SIN EMBARGO. 'Todavia' (aun) en portugues es 'ainda'.", examples: [
        { en: "Gosto dele; todavia, nao concordo.", es: "Me cae bien; sin embargo, no estoy de acuerdo." }] },
      { id: "fa-ainda", front: "ainda", back: "TODAVIA / aun.", examples: [
        { en: "Voce ainda esta aqui?", es: "Todavia estas aqui?" }] },
      { id: "fa-brincar", front: "brincar", back: "JUGAR / bromear. (Saltar se dice 'pular').", examples: [
        { en: "As criancas gostam de brincar.", es: "A los ninos les gusta jugar." }] },
      { id: "fa-pular", front: "pular", back: "SALTAR / brincar (dar saltos).", examples: [
        { en: "O gato pulou o muro.", es: "El gato salto el muro." }] },
      { id: "fa-copo", front: "copo", back: "VASO (para beber). El 'vaso' (florero) es 'vaso' y la maceta 'vaso de planta'.", examples: [
        { en: "Um copo de agua, por favor.", es: "Un vaso de agua, por favor." }] },
      { id: "fa-ligar", front: "ligar", back: "LLAMAR (por telefono) / encender. (No 'ligar' romantico, que es 'paquerar').", examples: [
        { en: "Eu vou te ligar amanha.", es: "Te voy a llamar manana." }] },
      { id: "fa-puxar", front: "puxar", back: "TIRAR / JALAR (hacia ti). En las puertas: 'puxe' = jale.", examples: [
        { en: "Puxe a porta, por favor.", es: "Jale la puerta, por favor." }] },
      { id: "fa-empurrar", front: "empurrar", back: "EMPUJAR. En las puertas: 'empurre' = empuje.", examples: [
        { en: "Empurre o carrinho.", es: "Empuje el carrito." }] },
      { id: "fa-borracha", front: "borracha", back: "GOMA de borrar / caucho. (No 'borracha' ebria, que es 'bebada').", examples: [
        { en: "Emprestame a borracha.", es: "Prestame la goma de borrar." }] },
      { id: "fa-presunto", front: "presunto", back: "JAMON. (No 'presunto' sospechoso, que es 'suspeito').", examples: [
        { en: "Um sanduiche de presunto.", es: "Un sandwich de jamon." }] },
      { id: "fa-cena", front: "cena", back: "ESCENA. La 'cena' (comida) se dice 'jantar'.", examples: [
        { en: "A cena do filme e linda.", es: "La escena de la pelicula es hermosa." }] },
      { id: "fa-apelido", front: "apelido", back: "APODO / sobrenombre. El 'apellido' se dice 'sobrenome'.", examples: [
        { en: "O apelido dele e 'Ze'.", es: "Su apodo es 'Ze'." }] },
      { id: "fa-acordar", front: "acordar", back: "DESPERTAR(SE). 'Acordarse' (recordar) es 'lembrar'.", examples: [
        { en: "Eu acordo as sete.", es: "Me despierto a las siete." }] },
      { id: "fa-largo", front: "largo", back: "ANCHO. 'Largo' (longitud) se dice 'comprido' o 'longo'.", examples: [
        { en: "O corredor e muito largo.", es: "El pasillo es muy ancho." }] },
      { id: "fa-taca", front: "taca", back: "COPA (de vino) / trofeo. La 'taza' se dice 'xicara'.", examples: [
        { en: "Uma taca de vinho.", es: "Una copa de vino." }] },
      { id: "fa-vassoura", front: "vassoura", back: "ESCOBA. (La 'basura' se dice 'lixo').", examples: [
        { en: "Passe a vassoura na sala.", es: "Pasa la escoba en la sala." }] },
      { id: "fa-cadeira", front: "cadeira", back: "SILLA. La 'cadera' se dice 'quadril'.", examples: [
        { en: "Sente-se na cadeira.", es: "Sientate en la silla." }] },
    ],
  },
  {
    id: "verbos-irregulares-pt",
    language: "pt",
    level: "A1",
    title: "Verbos irregulares",
    subtitle: "Los imprescindibles del portugues",
    recall: "Di el PRESENTE (eu/voce) y el PRETERITO (eu)",
    gradient: "from-indigo-500 to-blue-700",
    medalTitle: "Maestro de irregulares (PT)",
    medalDesc: "Dominaste los verbos irregulares clave del portugues",
    items: [
      { id: "vi-ser", front: "ser", back: "presente: eu sou / voce e / nos somos / eles sao  ·  preterito: eu fui / voce foi", examples: [
        { en: "Eu sou do Brasil.", es: "Yo soy de Brasil." },
        { en: "Ontem foi domingo.", es: "Ayer fue domingo." }] },
      { id: "vi-estar", front: "estar", back: "presente: eu estou / voce esta / nos estamos / eles estao  ·  preterito: eu estive / voce esteve", examples: [
        { en: "Eu estou cansado.", es: "Estoy cansado." },
        { en: "Eu estive doente.", es: "Estuve enfermo." }] },
      { id: "vi-ter", front: "ter", back: "presente: eu tenho / voce tem / nos temos / eles tem  ·  preterito: eu tive / voce teve", examples: [
        { en: "Eu tenho dois irmaos.", es: "Tengo dos hermanos." },
        { en: "Eu tive uma ideia.", es: "Tuve una idea." }] },
      { id: "vi-ir", front: "ir", back: "presente: eu vou / voce vai / nos vamos / eles vao  ·  preterito: eu fui / voce foi", examples: [
        { en: "Eu vou ao mercado.", es: "Voy al mercado." },
        { en: "Eu fui a praia.", es: "Fui a la playa." }] },
      { id: "vi-fazer", front: "fazer", back: "presente: eu faco / voce faz / nos fazemos / eles fazem  ·  preterito: eu fiz / voce fez", examples: [
        { en: "Eu faco o jantar.", es: "Hago la cena." },
        { en: "O que voce fez?", es: "Que hiciste?" }] },
      { id: "vi-poder", front: "poder", back: "presente: eu posso / voce pode / nos podemos / eles podem  ·  preterito: eu pude / voce pode", examples: [
        { en: "Eu posso ajudar.", es: "Puedo ayudar." },
        { en: "Nao pude ir.", es: "No pude ir." }] },
      { id: "vi-querer", front: "querer", back: "presente: eu quero / voce quer / nos queremos / eles querem  ·  preterito: eu quis / voce quis", examples: [
        { en: "Eu quero um cafe.", es: "Quiero un cafe." },
        { en: "Eu quis falar com voce.", es: "Quise hablar contigo." }] },
      { id: "vi-vir", front: "vir", back: "presente: eu venho / voce vem / nos vimos / eles vem  ·  preterito: eu vim / voce veio", examples: [
        { en: "Eu venho de onibus.", es: "Vengo en autobus." },
        { en: "Eu vim cedo.", es: "Vine temprano." }] },
      { id: "vi-dar", front: "dar", back: "presente: eu dou / voce da / nos damos / eles dao  ·  preterito: eu dei / voce deu", examples: [
        { en: "Eu dou aulas.", es: "Doy clases." },
        { en: "Eu dei um presente.", es: "Di un regalo." }] },
      { id: "vi-ver", front: "ver", back: "presente: eu vejo / voce ve / nos vemos / eles veem  ·  preterito: eu vi / voce viu", examples: [
        { en: "Eu vejo televisao.", es: "Veo television." },
        { en: "Eu vi o filme.", es: "Vi la pelicula." }] },
      { id: "vi-dizer", front: "dizer", back: "presente: eu digo / voce diz / nos dizemos / eles dizem  ·  preterito: eu disse / voce disse", examples: [
        { en: "Eu digo a verdade.", es: "Digo la verdad." },
        { en: "Ela disse 'sim'.", es: "Ella dijo 'si'." }] },
      { id: "vi-saber", front: "saber", back: "presente: eu sei / voce sabe / nos sabemos / eles sabem  ·  preterito: eu soube / voce soube", examples: [
        { en: "Eu sei a resposta.", es: "Se la respuesta." },
        { en: "Eu soube da noticia.", es: "Supe la noticia." }] },
    ],
  },
];
