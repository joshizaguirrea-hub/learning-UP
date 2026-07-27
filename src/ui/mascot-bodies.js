/**
 * ui/mascot-bodies.js — Cuerpos COMPLETOS de robo-animales (como el perrito).
 *
 * ALMA ROBOT compartida (DRY): todos llevan la misma CARA (pantalla + ojos cian +
 * boca "bymax-mouth" animada), la misma antena, herrajes y panel de pecho con
 * medidor de LEDs. Lo que YA NO se comparte es la SILUETA: cada animal usa un
 * ARQUETIPO de cuerpo acorde a su forma real:
 *   - seated  (redondo sentado) -> gato, leon, hamster, capibara, oso
 *   - reptile (largo y bajo, con crestas y cola de puas) -> cocodrilo
 *   - biped   (patotas traseras + cola gruesa) -> canguro, dino
 *   - heavy   (corpulento de 4 patas columna + trompa) -> elefante
 *   - longneck(cuello largo + patas largas) -> jirafa
 * viewBox 6 0 140 150, igual que el perrito de bymax-mascot.js, para que
 * escale/anime identico. La cola lleva class "bymax-tail" (menea).
 */

const DEFS = `<defs>
  <radialGradient id="amEye" cx="0.35" cy="0.35" r="0.75">
    <stop offset="0" stop-color="#ecfeff"/><stop offset="0.5" stop-color="#67e8f9"/><stop offset="1" stop-color="#06b6d4"/>
  </radialGradient>
  <linearGradient id="amSheen" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#ffffff" stop-opacity="0.28"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
  </linearGradient>
</defs>`;

// ---- Piezas ROBOT compartidas ---------------------------------------------
const shadow = (rx = 42) => `<ellipse cx="70" cy="143" rx="${rx}" ry="6" fill="#0f172a" opacity="0.18"/>`;
const sheen = `<ellipse cx="60" cy="88" rx="18" ry="11" fill="url(#amSheen)"/>`;

// Panel del pecho: nucleo verde palpitante + barra de LEDs tipo bateria. cy = centro.
const chest = (cy) => `
  <circle cx="70" cy="${cy}" r="10" fill="#0f172a"/>
  <circle cx="70" cy="${cy}" r="5.5" fill="#34d399"><animate attributeName="opacity" values="1;0.5;1" dur="2.4s" repeatCount="indefinite"/></circle>
  <rect x="60" y="${cy + 14}" width="20" height="5" rx="2.5" fill="#0f172a"/>
  <circle cx="65" cy="${cy + 16.5}" r="1.5" fill="#22d3ee"/><circle cx="70" cy="${cy + 16.5}" r="1.5" fill="#34d399"/><circle cx="75" cy="${cy + 16.5}" r="1.5" fill="#fbbf24"/>`;

// Antena con lucecita rosa (va detras: la cabeza tapa la base, la bolita asoma).
const antenna = (c) => `<rect x="68.5" y="5" width="3" height="17" rx="1.5" fill="${c}"/>` +
  `<circle cx="70" cy="4" r="3.6" fill="#f472b6"><animate attributeName="opacity" values="1;0.35;1" dur="1.6s" repeatCount="indefinite"/></circle>`;

// Cabeza base (rectangulo redondeado) del color del animal.
const head = (c) => `<rect x="40" y="20" width="60" height="52" rx="22" fill="${c}"/>` +
  `<rect x="40" y="20" width="60" height="52" rx="22" fill="none" stroke="#0f172a" stroke-width="1.2" opacity="0.35"/>`;

// Herrajes de la cabeza: costura del panel + remaches.
const robotHead = () => `
  <path d="M44 34 h52" stroke="#0f172a" stroke-width="1" opacity="0.22"/>
  <circle cx="45" cy="30" r="1.6" fill="#0f172a" opacity="0.4"/><circle cx="95" cy="30" r="1.6" fill="#0f172a" opacity="0.4"/>
  <circle cx="45" cy="62" r="1.6" fill="#0f172a" opacity="0.4"/><circle cx="95" cy="62" r="1.6" fill="#0f172a" opacity="0.4"/>`;

// Collar atornillado en la union cabeza-cuerpo (da el toque robot en todos).
const collar = (c) => `<rect x="60" y="70" width="20" height="8" rx="4" fill="${c}"/>` +
  `<circle cx="64" cy="74" r="1.3" fill="#0f172a" opacity="0.5"/><circle cx="76" cy="74" r="1.3" fill="#0f172a" opacity="0.5"/>`;

// Cara compartida (pantalla + ojos cian + escaner + cachetes + naricita + boca animada).
const face = () => `
  <rect x="47" y="30" width="46" height="34" rx="14" fill="#0f172a"/>
  <rect x="49" y="32" width="42" height="30" rx="12" fill="none" stroke="#1e293b" stroke-width="1"/>
  <circle cx="60" cy="45" r="9" fill="#22d3ee" opacity="0.14"/><circle cx="80" cy="45" r="9" fill="#22d3ee" opacity="0.14"/>
  <circle cx="60" cy="45" r="6" fill="url(#amEye)"/><circle cx="80" cy="45" r="6" fill="url(#amEye)"/>
  <circle cx="58" cy="43" r="1.8" fill="#fff"/><circle cx="78" cy="43" r="1.8" fill="#fff"/>
  <rect x="49" y="38" width="42" height="1" fill="#67e8f9" opacity="0.16"><animate attributeName="y" values="36;58;36" dur="3.2s" repeatCount="indefinite"/></rect>
  <ellipse cx="51" cy="55" rx="4" ry="2.5" fill="#f472b6" opacity="0.55"/>
  <ellipse cx="89" cy="55" rx="4" ry="2.5" fill="#f472b6" opacity="0.55"/>
  <ellipse cx="70" cy="52" rx="3" ry="2.2" fill="#f472b6"/>
  <rect class="bymax-mouth" x="63" y="57" width="14" height="4" rx="2" fill="#67e8f9"/>`;

// ---- Colas (class bymax-tail = menea) -------------------------------------
const tailCurl = (c) => `<path class="bymax-tail" d="M100 104 Q126 98 122 74 Q112 88 96 92 Z" fill="${c}"/>`;
const tailStub = (c) => `<ellipse class="bymax-tail" cx="104" cy="112" rx="9" ry="7" fill="${c}"/>`;
const tailThick = (c) => `<path class="bymax-tail" d="M96 118 Q140 126 138 146 Q118 136 92 132 Z" fill="${c}"/>`;
const tailSpiky = (c) => `<path class="bymax-tail" d="M96 116 L142 128 L133 132 L143 138 L120 136 L96 128 Z" fill="${c}"/>`;
const tailCroc = (c) => `<path class="bymax-tail" d="M104 112 Q144 108 144 92 L137 97 L140 87 L130 95 L133 84 L122 94 Q112 100 104 100 Z" fill="${c}"/>`;

// ---- Rasgos por animal (orejas/cuernos/melena) ----------------------------
const ears = {
  pointy: (c) => `<path d="M46 26 L40 8 L59 22 Z" fill="${c}"/><path d="M94 26 L100 8 L81 22 Z" fill="${c}"/>`,
  tall: (c) => `<rect x="51" y="2" width="7" height="22" rx="3.5" fill="${c}"/><rect x="82" y="2" width="7" height="22" rx="3.5" fill="${c}"/>`,
  round: (c) => `<circle cx="47" cy="22" r="9" fill="${c}"/><circle cx="93" cy="22" r="9" fill="${c}"/>`,
  horns: (c) => `<rect x="54" y="4" width="4" height="13" fill="${c}"/><circle cx="56" cy="4" r="3.6" fill="${c}"/>` +
    `<rect x="82" y="4" width="4" height="13" fill="${c}"/><circle cx="84" cy="4" r="3.6" fill="${c}"/>`,
  ridges: (c) => `<ellipse cx="52" cy="20" rx="6" ry="5" fill="${c}"/><ellipse cx="88" cy="20" rx="6" ry="5" fill="${c}"/>`,
  spikes: (c) => `<path d="M50 21 l4 -9 4 9 M62 19 l4 -10 4 10 M74 19 l4 -10 4 10" fill="${c}"/>`,
};
const whiskers = `<path d="M46 50 h-13 M46 55 h-13 M94 50 h13 M94 55 h13" stroke="#0f172a" stroke-width="1" opacity="0.5"/>`;
const mane = (c) => {
  const pts = [[70, 12], [50, 15], [92, 17], [40, 34], [102, 34], [48, 56], [94, 56], [70, 60]];
  return pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8" fill="${c}"/>`).join("");
};
const sideEars = (c) => `<ellipse cx="34" cy="44" rx="14" ry="18" fill="${c}"/><ellipse cx="106" cy="44" rx="14" ry="18" fill="${c}"/>`;
const trunk = (c) => `<path d="M70 62 q-3 14 -9 20 q-3 5 1 8 q5 2 6 -4 q3 -12 8 -20 z" fill="${c}"/>`;

// ---- ARQUETIPOS de cuerpo -------------------------------------------------
// Redondo sentado (mamiferos): ancas + cuerpo + patitas.
const seated = (c1, c2) => `${shadow()}
  <ellipse cx="41" cy="120" rx="16" ry="18" fill="${c2}"/>
  <ellipse cx="99" cy="120" rx="16" ry="18" fill="${c2}"/>
  <ellipse cx="70" cy="106" rx="33" ry="35" fill="${c1}"/>${sheen}
  <rect x="53" y="116" width="14" height="27" rx="7" fill="${c1}"/>
  <rect x="73" y="116" width="14" height="27" rx="7" fill="${c1}"/>
  <ellipse cx="60" cy="142" rx="9" ry="4.5" fill="${c2}"/>
  <ellipse cx="80" cy="142" rx="9" ry="4.5" fill="${c2}"/>${chest(100)}`;

// Reptil largo y bajo: cuello + cuerpo horizontal + vientre con placas + 4 patas.
const reptile = (c1, c2) => `${shadow(48)}
  ${tailCroc(c2)}
  <rect x="58" y="62" width="24" height="42" rx="11" fill="${c1}"/>
  <rect x="26" y="94" width="86" height="34" rx="17" fill="${c1}"/>${sheen}
  <rect x="40" y="116" width="56" height="11" rx="5.5" fill="${c2}" opacity="0.55"/>
  <path d="M50 116 v11 M62 116 v11 M74 116 v11 M86 116 v11" stroke="#0f172a" stroke-width="1" opacity="0.3"/>
  <rect x="32" y="124" width="13" height="16" rx="6.5" fill="${c2}"/>
  <rect x="50" y="124" width="13" height="16" rx="6.5" fill="${c2}"/>
  <rect x="77" y="124" width="13" height="16" rx="6.5" fill="${c2}"/>
  <rect x="95" y="124" width="13" height="16" rx="6.5" fill="${c2}"/>${chest(104)}`;

// Bipedo (canguro/dino): cola gruesa + patotas traseras + pies + torso erguido + bracitos.
const biped = (c1, c2, tl) => `${shadow(40)}
  ${tl}
  <ellipse cx="56" cy="122" rx="18" ry="20" fill="${c2}"/>
  <ellipse cx="84" cy="122" rx="18" ry="20" fill="${c2}"/>
  <path d="M38 138 h30 a5 5 0 0 1 0 8 h-30 z" fill="${c2}"/>
  <path d="M72 138 h30 a5 5 0 0 1 0 8 h-30 z" fill="${c2}"/>
  <ellipse cx="70" cy="100" rx="27" ry="34" fill="${c1}"/>${sheen}
  <ellipse cx="70" cy="106" rx="16" ry="22" fill="${c2}" opacity="0.30"/>
  <rect x="42" y="92" width="10" height="5" rx="2.5" fill="${c2}"/>
  <rect x="88" y="92" width="10" height="5" rx="2.5" fill="${c2}"/>${chest(96)}`;

// Corpulento (elefante): 4 patas columna + cuerpo ancho.
const heavy = (c1, c2) => `${shadow(46)}
  <rect x="36" y="116" width="16" height="26" rx="6" fill="${c2}"/>
  <rect x="56" y="118" width="16" height="24" rx="6" fill="${c2}"/>
  <rect x="72" y="118" width="16" height="24" rx="6" fill="${c2}"/>
  <rect x="90" y="116" width="16" height="26" rx="6" fill="${c2}"/>
  <ellipse cx="70" cy="104" rx="40" ry="33" fill="${c1}"/>${sheen}${chest(104)}`;

// Cuello largo (jirafa): patas largas + cuerpo compacto + cuello + cola + manchas.
const longneck = (c1, c2) => `${shadow(30)}
  <rect x="48" y="112" width="9" height="30" rx="4" fill="${c2}"/>
  <rect x="83" y="112" width="9" height="30" rx="4" fill="${c2}"/>
  <ellipse cx="70" cy="112" rx="26" ry="18" fill="${c1}"/>${sheen}
  <rect x="62" y="60" width="16" height="56" rx="8" fill="${c1}"/>
  <path class="bymax-tail" d="M95 106 Q108 110 106 124 Q100 116 92 114 Z" fill="${c2}"/>${chest(112)}
  <circle cx="60" cy="108" r="4" fill="#d97706"/><circle cx="80" cy="114" r="4" fill="#d97706"/><circle cx="68" cy="119" r="3.5" fill="#d97706"/>`;

const svg = (inner) =>
  `<svg viewBox="6 0 140 150" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" role="img" aria-hidden="true">${DEFS}${inner}</svg>`;

// Ensambla: cuerpo (arquetipo) detras -> antena -> [detras-cabeza] -> cabeza +
// herrajes + collar + rasgos + cara + [extra encima].
function assemble({ bodyStr, ac, hc, behind = "", top = "", extra = "" }) {
  return svg(bodyStr + antenna(ac) + behind +
    head(hc) + robotHead() + collar(ac) + top + face() + extra);
}

// Catalogo de robo-animales de cuerpo completo (cada uno con su SILUETA propia).
const BODIES = {
  cat: () => assemble({ bodyStr: tailCurl("#b45309") + seated("#f59e0b", "#b45309"), ac: "#b45309", hc: "#fbbf24", top: ears.pointy("#d97706") + whiskers }),
  croc: () => assemble({ bodyStr: reptile("#22c55e", "#15803d"), ac: "#15803d", hc: "#16a34a", top: ears.ridges("#166534") }),
  kangaroo: () => assemble({ bodyStr: biped("#f59e0b", "#b45309", tailThick("#92400e")), ac: "#b45309", hc: "#d97706", top: ears.tall("#b45309") }),
  dino: () => assemble({ bodyStr: biped("#10b981", "#047857", tailSpiky("#047857")), ac: "#047857", hc: "#059669", top: ears.spikes("#065f46") }),
  lion: () => assemble({ bodyStr: tailCurl("#b45309") + seated("#f59e0b", "#b45309"), ac: "#b45309", hc: "#fbbf24", behind: mane("#d97706"), top: ears.round("#d97706") }),
  elephant: () => assemble({ bodyStr: heavy("#cbd5e1", "#64748b"), ac: "#64748b", hc: "#94a3b8", behind: sideEars("#94a3b8"), extra: trunk("#94a3b8") }),
  giraffe: () => assemble({ bodyStr: longneck("#fbbf24", "#b45309"), ac: "#b45309", hc: "#fcd34d", top: ears.horns("#78350f") }),
  hamster: () => assemble({ bodyStr: tailStub("#d97706") + seated("#fcd34d", "#d97706"), ac: "#d97706", hc: "#fde68a", top: ears.round("#d97706") }),
  capybara: () => assemble({ bodyStr: tailStub("#713f12") + seated("#a16207", "#713f12"), ac: "#713f12", hc: "#b45309", top: ears.round("#78350f") }),
  bear: () => assemble({ bodyStr: tailStub("#5b3a1a") + seated("#8b5e34", "#5b3a1a"), ac: "#5b3a1a", hc: "#a16207", top: ears.round("#5b3a1a") }),
};

/** True si el id tiene cuerpo completo de robo-animal (fuera del perrito Bymax). */
export function hasAnimalBody(id) {
  return Object.prototype.hasOwnProperty.call(BODIES, id);
}

/** SVG (string) del cuerpo completo del robo-animal, o null si no existe. */
export function animalMascotSvg(id) {
  return BODIES[id] ? BODIES[id]() : null;
}
