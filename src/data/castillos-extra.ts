import type {
  AccesoCastilloInfo,
  VueloDronInfo,
} from "./castillos";

/**
 * Datos adicionales por castillo (vuelo con dron + acceso).
 *
 * Vuelo con dron: clasificación orientativa basada en el análisis del
 * artículo 40 del Real Decreto 517/2024, de 4 de junio, cruzando las
 * coordenadas GPS con cartografía y ortofotos públicas. Cuando el contorno
 * urbano queda muy próximo o el resultado no es concluyente se marca
 * "limitrofe" o "no-concluyente" para que el piloto verifique in situ y
 * mediante las herramientas oficiales (ENAIRE Drones, AESA).
 *
 * Acceso: información práctica sobre cómo se realiza la aproximación final
 * al monumento. Solo se incluyen datos verificables; los campos no conocidos
 * se dejan sin valor para que la UI los oculte.
 */

export const VUELO_DRON_POR_SLUG: Record<string, VueloDronInfo> = {
  // ===== RUINAS =====
  "castillo-de-aulencia": {
    entorno: "no-urbano",
    justificacion:
      "Ruina aislada sobre cerro en el entorno del embalse de Valmenor, sin agrupación de edificios residenciales, industriales o comerciales en su proximidad inmediata (criterio del art. 40 RD 517/2024).",
  },
  "castillo-de-gormaz": {
    entorno: "no-urbano",
    justificacion:
      "Fortaleza califal sobre una muela elevada, separada del núcleo de Gormaz. No concurren los criterios de aglomeración de edificios del art. 40 RD 517/2024 en el entorno inmediato del recinto.",
  },
  "castillo-de-jadraque": {
    entorno: "limitrofe",
    justificacion:
      "Cerro del Cid inmediatamente colindante con el casco urbano de Jadraque. Aunque el recinto no contiene edificaciones, el entorno urbano (art. 40 RD 517/2024) se encuentra a escasa distancia: recomendable comprobación in situ.",
  },
  "castillo-de-berlanga-de-duero": {
    entorno: "limitrofe",
    justificacion:
      "Castillo sobre cerro pegado al casco histórico de Berlanga de Duero. El recinto amurallado no es entorno urbano, pero la villa queda muy próxima al sur: verificar trayectorias antes del vuelo.",
  },
  "castillo-de-castrojeriz": {
    entorno: "limitrofe",
    justificacion:
      "Ruina sobre cerro que domina la villa de Castrojeriz. El propio castillo cumple el criterio de no-urbano, pero el casco urbano lineal queda a pocos cientos de metros.",
  },
  "castillo-de-forna": {
    entorno: "limitrofe",
    justificacion:
      "Conservado dentro del pequeño núcleo rural de Forna (l'Alcúdia de Crespins). Aunque la población es muy reducida, existe agrupación de edificios residenciales a su alrededor (art. 40 RD 517/2024).",
  },
  "castillo-de-penas-negras": {
    entorno: "no-urbano",
    justificacion:
      "Ruinas en alto de los Montes de Toledo, dentro de espacio natural protegido y sin edificación residencial en su proximidad inmediata.",
  },
  "castillo-de-monreal": {
    entorno: "no-urbano",
    justificacion:
      "Ruinas aisladas en término rural, sin concurrencia de los criterios del art. 40 RD 517/2024.",
  },
  "castillo-de-puebla-de-almenara": {
    entorno: "limitrofe",
    justificacion:
      "Cerro junto al núcleo de Puebla de Almenara. El recinto no es urbano, pero el pueblo queda colindante: verificar derivas hacia el casco.",
  },
  "castillo-de-oreja": {
    entorno: "no-urbano",
    justificacion:
      "Despoblado medieval sobre cortado del Tajo, sin núcleo urbano en su proximidad.",
  },
  "castillo-de-lujan": {
    entorno: "limitrofe",
    justificacion:
      "Resto fortificado integrado en suelo rústico con edificaciones agrícolas dispersas: el resultado no es concluyente solo con cartografía, marcado como limítrofe por prudencia.",
  },
  "castillo-de-villalba": {
    entorno: "no-urbano",
    justificacion:
      "Ruina en finca rústica, alejada de agrupaciones de edificios residenciales.",
  },
  "castillo-de-san-silvestre": {
    entorno: "no-urbano",
    justificacion:
      "Resto torreado en término rural sin agrupación urbana próxima.",
  },
  "castillo-de-almonacid-de-toledo": {
    entorno: "limitrofe",
    justificacion:
      "Cerro inmediato al casco urbano de Almonacid de Toledo. El recinto no es urbano, pero el pueblo queda a poca distancia.",
  },
  "castillo-de-punoenrostro": {
    entorno: "no-urbano",
    justificacion:
      "Castillo aislado en finca privada, sin agrupación urbana en su entorno inmediato.",
  },
  "castillo-de-pioz": {
    entorno: "limitrofe",
    justificacion:
      "Castillo señorial junto al núcleo de Pioz. El recinto no es entorno urbano, pero el casco residencial queda muy próximo.",
  },
  "castillo-de-fuentiduena-de-tajo": {
    entorno: "limitrofe",
    justificacion:
      "Ruinas en cerro sobre la vega del Tajo, próximas al casco urbano de Fuentidueña.",
  },
  "castillo-de-galve-de-sorbe": {
    entorno: "limitrofe",
    justificacion:
      "Castillo señorial pegado al pequeño núcleo de Galve de Sorbe. Aunque la villa es pequeña, existe agrupación de viviendas colindante.",
  },
  "castillo-de-bairen": {
    entorno: "no-urbano",
    justificacion:
      "Ruina en lo alto del Mondúver, dentro de espacio natural, sin núcleo urbano en su proximidad inmediata.",
  },
  "castillo-de-busot": {
    entorno: "limitrofe",
    justificacion:
      "Cerro próximo al casco de Busot. El recinto no es urbano, pero el pueblo queda a corta distancia.",
  },
  "castillo-de-caudilla": {
    entorno: "no-urbano",
    justificacion:
      "Ruinas en despoblado, sin agrupación residencial en el entorno.",
  },
  "castillo-de-casarrubios-del-monte": {
    entorno: "limitrofe",
    justificacion:
      "Restos junto al casco urbano de Casarrubios del Monte: verificar el perímetro residencial.",
  },
  "castillo-de-batres": {
    entorno: "no-urbano",
    justificacion:
      "Castillo-palacio en finca rústica, separado del núcleo urbano de Batres.",
  },

  // ===== CONSERVADOS / VISITABLES =====
  "castillo-de-manzanares-el-real": {
    entorno: "limitrofe",
    justificacion:
      "Castillo en el borde del casco urbano de Manzanares el Real, con el pueblo al sur y el embalse al norte: depende mucho de la trayectoria del vuelo.",
  },
  "castillo-de-guadamur": {
    entorno: "urbano",
    justificacion:
      "Castillo integrado en el casco urbano de Guadamur, con viviendas y calles a todo su alrededor: cumple el criterio de entorno urbano del art. 40 RD 517/2024.",
  },
  "castillo-de-consuegra": {
    entorno: "limitrofe",
    justificacion:
      "Cerro Calderico con los molinos y el castillo, separado del casco urbano de Consuegra que queda al pie del cerro: el recinto no es urbano, pero el pueblo queda muy próximo.",
  },
  "castillo-de-cullera": {
    entorno: "limitrofe",
    justificacion:
      "Castillo en lo alto del monte de los Zorros, con el casco urbano de Cullera extendido al pie: el recinto no es urbano, pero la ciudad queda colindante.",
  },
  "castillo-de-san-servando": {
    entorno: "urbano",
    justificacion:
      "Situado dentro del término urbano de Toledo, junto al puente de Alcántara y al barrio de Santa Bárbara: cumple los criterios de entorno urbano del art. 40 RD 517/2024.",
  },
  "castillo-de-torija": {
    entorno: "urbano",
    justificacion:
      "Castillo plenamente integrado en el casco urbano de Torija, rodeado de viviendas y la N-II adyacente.",
  },
  "castillo-de-cuellar": {
    entorno: "urbano",
    justificacion:
      "Castillo de los Duques de Alburquerque dentro del casco histórico de Cuéllar, rodeado de edificación residencial.",
  },
  "castillo-de-malpica-de-tajo": {
    entorno: "urbano",
    justificacion:
      "Castillo integrado en el casco urbano de Malpica de Tajo, junto al río y rodeado de viviendas.",
  },
  "castillo-de-maqueda": {
    entorno: "urbano",
    justificacion:
      "Castillo y torre de la Vela dentro del casco urbano de Maqueda, con edificación residencial colindante.",
  },
  "castillo-de-escalona": {
    entorno: "limitrofe",
    justificacion:
      "Castillo sobre cortado del Alberche, adosado al casco histórico de Escalona: el recinto principal no es urbano, pero la villa queda inmediatamente al sur.",
  },
  "castillo-de-la-mota": {
    entorno: "limitrofe",
    justificacion:
      "Castillo sobre cerro al borde del casco urbano de Medina del Campo: verificar trayectorias hacia el sur.",
  },
  "castillo-de-la-coracera": {
    entorno: "urbano",
    justificacion:
      "Castillo dentro del casco urbano de San Martín de Valdeiglesias, rodeado de viviendas.",
  },
  "castillo-de-villaviciosa-de-odon": {
    entorno: "urbano",
    justificacion:
      "Castillo integrado en el casco urbano de Villaviciosa de Odón, junto al ayuntamiento y rodeado de edificación residencial.",
  },
  "castillo-de-magalia": {
    entorno: "urbano",
    justificacion:
      "Castillo-palacio dentro del casco urbano de Las Navas del Marqués, rodeado de viviendas.",
  },
  "alcazar-de-segovia": {
    entorno: "urbano",
    justificacion:
      "Alcázar en el extremo del casco histórico de Segovia (BIC y Patrimonio de la Humanidad), con la ciudad inmediatamente al este: cumple plenamente los criterios del art. 40 RD 517/2024. Además existe zona geográfica UAS específica.",
    notas:
      "Zona geográfica UAS específica por el casco histórico de Segovia: comprobar siempre ENAIRE Drones antes del vuelo.",
  },
  "castillo-de-chinchon": {
    entorno: "limitrofe",
    justificacion:
      "Castillo de los Condes al borde del casco urbano de Chinchón: el recinto no es urbano, pero la villa queda muy próxima.",
  },
  "castillo-de-penafiel": {
    entorno: "limitrofe",
    justificacion:
      "Castillo sobre cresta caliza alargada, separado del casco urbano de Peñafiel que queda al pie del cerro: no cumple el criterio de aglomeración en el recinto, pero la villa es colindante.",
  },
  "castillo-de-arevalo": {
    entorno: "limitrofe",
    justificacion:
      "Castillo sobre confluencia de los ríos Adaja y Arevalillo, al borde del casco urbano de Arévalo: verificar perímetro.",
  },
  "castillo-de-atienza": {
    entorno: "limitrofe",
    justificacion:
      "Torre del homenaje sobre peñón calizo dominando la villa de Atienza: el recinto en sí no es urbano, pero el casco histórico queda muy próximo.",
  },
  "castillo-de-loarre": {
    entorno: "no-urbano",
    justificacion:
      "Castillo románico aislado sobre mole rocosa frente a la Hoya de Huesca, sin núcleo urbano en su proximidad inmediata.",
  },
};

export const ACCESO_POR_SLUG: Record<string, AccesoCastilloInfo> = {
  "castillo-de-aulencia": {
    facilidad: "moderado",
    cocheHastaEntrada: false,
    aparcamientoCercano: true,
    caminataMinutos: "10-15 min",
    distanciaAPie: "≈ 700 m",
    terreno: ["pista-tierra", "sendero"],
    aptoMayores: false,
    aptoFamilias: true,
    aptoMovilidadReducida: false,
    calzadoRecomendado: "Calzado deportivo o de senderismo.",
    mejorAparcamiento: "Aparcamiento junto al embalse de Valmenor.",
    advertencias: "Recinto en ruinas: no acceder al interior de los muros.",
  },
  "castillo-de-gormaz": {
    facilidad: "facil",
    cocheHastaEntrada: true,
    aparcamientoCercano: true,
    caminataMinutos: "< 5 min",
    terreno: ["asfalto", "pedregoso"],
    aptoMayores: true,
    aptoFamilias: true,
    aptoMovilidadReducida: false,
    mejorAparcamiento: "Explanada junto a la puerta califal.",
  },
  "castillo-de-jadraque": {
    facilidad: "moderado",
    cocheHastaEntrada: false,
    aparcamientoCercano: true,
    caminataMinutos: "15-20 min",
    distanciaAPie: "≈ 1 km en subida",
    terreno: ["asfalto", "pendiente-pronunciada"],
    aptoMayores: false,
    aptoFamilias: true,
    aptoMovilidadReducida: false,
    calzadoRecomendado: "Calzado cómodo con suela antideslizante.",
    mejorAparcamiento: "Parking municipal a los pies del cerro.",
  },
  "castillo-de-berlanga-de-duero": {
    facilidad: "moderado",
    cocheHastaEntrada: false,
    aparcamientoCercano: true,
    caminataMinutos: "10-15 min",
    terreno: ["asfalto", "pendiente-pronunciada"],
    aptoMayores: false,
    aptoFamilias: true,
  },
  "castillo-de-castrojeriz": {
    facilidad: "moderado",
    cocheHastaEntrada: false,
    aparcamientoCercano: true,
    caminataMinutos: "15-20 min",
    terreno: ["pista-tierra", "pendiente-pronunciada"],
    aptoMayores: false,
    aptoFamilias: true,
  },
  "castillo-de-forna": {
    facilidad: "facil",
    cocheHastaEntrada: true,
    aparcamientoCercano: true,
    caminataMinutos: "< 5 min",
    terreno: ["asfalto"],
    aptoMayores: true,
    aptoFamilias: true,
  },
  "castillo-de-manzanares-el-real": {
    facilidad: "facil",
    cocheHastaEntrada: true,
    aparcamientoCercano: true,
    caminataMinutos: "< 5 min",
    terreno: ["asfalto"],
    aptoMayores: true,
    aptoFamilias: true,
    aptoMovilidadReducida: true,
    mejorAparcamiento: "Aparcamiento gratuito junto al castillo.",
  },
  "castillo-de-guadamur": {
    facilidad: "facil",
    cocheHastaEntrada: true,
    aparcamientoCercano: true,
    caminataMinutos: "< 5 min",
    terreno: ["asfalto"],
    aptoMayores: true,
    aptoFamilias: true,
  },
  "castillo-de-consuegra": {
    facilidad: "facil",
    cocheHastaEntrada: true,
    aparcamientoCercano: true,
    caminataMinutos: "< 5 min",
    terreno: ["asfalto", "pedregoso"],
    aptoMayores: true,
    aptoFamilias: true,
    mejorAparcamiento: "Aparcamiento en la cima del cerro Calderico, junto a los molinos.",
  },
  "castillo-de-cullera": {
    facilidad: "facil",
    cocheHastaEntrada: true,
    aparcamientoCercano: true,
    caminataMinutos: "< 5 min",
    terreno: ["asfalto"],
    aptoMayores: true,
    aptoFamilias: true,
  },
  "castillo-de-san-servando": {
    facilidad: "facil",
    cocheHastaEntrada: true,
    aparcamientoCercano: true,
    caminataMinutos: "< 5 min",
    terreno: ["asfalto"],
    aptoMayores: true,
    aptoFamilias: true,
  },
  "castillo-de-torija": {
    facilidad: "facil",
    cocheHastaEntrada: true,
    aparcamientoCercano: true,
    caminataMinutos: "< 5 min",
    terreno: ["asfalto"],
    aptoMayores: true,
    aptoFamilias: true,
    aptoMovilidadReducida: true,
  },
  "castillo-de-cuellar": {
    facilidad: "facil",
    cocheHastaEntrada: true,
    aparcamientoCercano: true,
    caminataMinutos: "< 5 min",
    terreno: ["asfalto"],
    aptoMayores: true,
    aptoFamilias: true,
  },
  "castillo-de-malpica-de-tajo": {
    facilidad: "facil",
    cocheHastaEntrada: true,
    aparcamientoCercano: true,
    caminataMinutos: "< 5 min",
    terreno: ["asfalto"],
    aptoMayores: true,
    aptoFamilias: true,
  },
  "castillo-de-maqueda": {
    facilidad: "facil",
    cocheHastaEntrada: true,
    aparcamientoCercano: true,
    caminataMinutos: "< 5 min",
    terreno: ["asfalto"],
    aptoMayores: true,
    aptoFamilias: true,
  },
  "castillo-de-escalona": {
    facilidad: "facil",
    cocheHastaEntrada: true,
    aparcamientoCercano: true,
    caminataMinutos: "< 5 min",
    terreno: ["asfalto"],
    aptoMayores: true,
    aptoFamilias: true,
  },
  "castillo-de-penas-negras": {
    facilidad: "moderado",
    cocheHastaEntrada: false,
    aparcamientoCercano: true,
    caminataMinutos: "10-15 min",
    terreno: ["pista-tierra", "pedregoso"],
    aptoMayores: false,
    aptoFamilias: true,
    calzadoRecomendado: "Calzado de senderismo.",
  },
  "castillo-de-la-mota": {
    facilidad: "facil",
    cocheHastaEntrada: true,
    aparcamientoCercano: true,
    caminataMinutos: "< 5 min",
    terreno: ["asfalto"],
    aptoMayores: true,
    aptoFamilias: true,
    aptoMovilidadReducida: true,
  },
  "castillo-de-la-coracera": {
    facilidad: "facil",
    cocheHastaEntrada: true,
    aparcamientoCercano: true,
    caminataMinutos: "< 5 min",
    terreno: ["asfalto"],
    aptoMayores: true,
    aptoFamilias: true,
  },
  "castillo-de-villaviciosa-de-odon": {
    facilidad: "facil",
    cocheHastaEntrada: true,
    aparcamientoCercano: true,
    caminataMinutos: "< 5 min",
    terreno: ["asfalto"],
    aptoMayores: true,
    aptoFamilias: true,
  },
  "castillo-de-magalia": {
    facilidad: "facil",
    cocheHastaEntrada: true,
    aparcamientoCercano: true,
    caminataMinutos: "< 5 min",
    terreno: ["asfalto"],
    aptoMayores: true,
    aptoFamilias: true,
  },
  "alcazar-de-segovia": {
    facilidad: "facil",
    cocheHastaEntrada: false,
    aparcamientoCercano: true,
    caminataMinutos: "5-10 min",
    terreno: ["asfalto"],
    aptoMayores: true,
    aptoFamilias: true,
    aptoMovilidadReducida: true,
    mejorAparcamiento: "Aparcamientos de pago en el casco histórico de Segovia.",
  },
  "castillo-de-monreal": {
    facilidad: "moderado",
    cocheHastaEntrada: false,
    aparcamientoCercano: true,
    caminataMinutos: "10-15 min",
    terreno: ["pista-tierra", "sendero"],
    aptoMayores: false,
    aptoFamilias: true,
  },
  "castillo-de-puebla-de-almenara": {
    facilidad: "moderado",
    cocheHastaEntrada: false,
    aparcamientoCercano: true,
    caminataMinutos: "10-15 min",
    terreno: ["asfalto", "pendiente-pronunciada"],
    aptoMayores: false,
    aptoFamilias: true,
  },
  "castillo-de-oreja": {
    facilidad: "moderado",
    cocheHastaEntrada: false,
    aparcamientoCercano: true,
    caminataMinutos: "10-20 min",
    terreno: ["pista-tierra", "pedregoso"],
    aptoMayores: false,
    aptoFamilias: true,
    calzadoRecomendado: "Calzado de senderismo.",
    advertencias: "Recinto en ruinas con desniveles peligrosos junto al cortado del Tajo.",
  },
  "castillo-de-lujan": {
    facilidad: "moderado",
    cocheHastaEntrada: false,
    aparcamientoCercano: true,
    caminataMinutos: "10-15 min",
    terreno: ["pista-tierra"],
    aptoMayores: false,
    aptoFamilias: true,
  },
  "castillo-de-arevalo": {
    facilidad: "facil",
    cocheHastaEntrada: true,
    aparcamientoCercano: true,
    caminataMinutos: "< 5 min",
    terreno: ["asfalto"],
    aptoMayores: true,
    aptoFamilias: true,
  },
  "castillo-de-villalba": {
    facilidad: "moderado",
    cocheHastaEntrada: false,
    aparcamientoCercano: false,
    caminataMinutos: "10-15 min",
    terreno: ["pista-tierra", "sendero"],
    aptoMayores: false,
    aptoFamilias: true,
  },
  "castillo-de-san-silvestre": {
    facilidad: "moderado",
    cocheHastaEntrada: false,
    aparcamientoCercano: true,
    caminataMinutos: "10-15 min",
    terreno: ["pista-tierra"],
    aptoMayores: false,
    aptoFamilias: true,
  },
  "castillo-de-almonacid-de-toledo": {
    facilidad: "exigente",
    cocheHastaEntrada: false,
    aparcamientoCercano: true,
    caminataMinutos: "25-35 min",
    distanciaAPie: "≈ 1,2 km en subida continua",
    terreno: ["sendero", "pedregoso", "pendiente-pronunciada"],
    aptoMayores: false,
    aptoFamilias: false,
    aptoMovilidadReducida: false,
    calzadoRecomendado: "Calzado de senderismo imprescindible.",
    advertencias: "Subida exigente al cerro. Llevar agua, especialmente en verano.",
  },
  "castillo-de-punoenrostro": {
    facilidad: "moderado",
    cocheHastaEntrada: false,
    aparcamientoCercano: true,
    caminataMinutos: "10-15 min",
    terreno: ["pista-tierra"],
    aptoMayores: false,
    aptoFamilias: true,
    restricciones: "Acceso exterior, propiedad privada: respetar el perímetro.",
  },
  "castillo-de-pioz": {
    facilidad: "facil",
    cocheHastaEntrada: true,
    aparcamientoCercano: true,
    caminataMinutos: "< 5 min",
    terreno: ["asfalto"],
    aptoMayores: true,
    aptoFamilias: true,
  },
  "castillo-de-fuentiduena-de-tajo": {
    facilidad: "moderado",
    cocheHastaEntrada: false,
    aparcamientoCercano: true,
    caminataMinutos: "10-15 min",
    terreno: ["sendero", "pedregoso"],
    aptoMayores: false,
    aptoFamilias: true,
  },
  "castillo-de-galve-de-sorbe": {
    facilidad: "facil",
    cocheHastaEntrada: true,
    aparcamientoCercano: true,
    caminataMinutos: "< 5 min",
    terreno: ["asfalto"],
    aptoMayores: true,
    aptoFamilias: true,
  },
  "castillo-de-bairen": {
    facilidad: "exigente",
    cocheHastaEntrada: false,
    aparcamientoCercano: true,
    caminataMinutos: "25-40 min",
    distanciaAPie: "≈ 1,5 km en subida continua",
    terreno: ["sendero", "pedregoso", "pendiente-pronunciada"],
    aptoMayores: false,
    aptoFamilias: false,
    calzadoRecomendado: "Calzado de senderismo imprescindible.",
    advertencias: "Subida al Mondúver. Llevar agua suficiente.",
  },
  "castillo-de-chinchon": {
    facilidad: "facil",
    cocheHastaEntrada: true,
    aparcamientoCercano: true,
    caminataMinutos: "< 5 min",
    terreno: ["asfalto"],
    aptoMayores: true,
    aptoFamilias: true,
    restricciones: "Solo visita exterior: el recinto no es accesible al público.",
  },
  "castillo-de-penafiel": {
    facilidad: "moderado",
    cocheHastaEntrada: true,
    aparcamientoCercano: true,
    caminataMinutos: "5-10 min",
    terreno: ["asfalto", "pedregoso"],
    aptoMayores: true,
    aptoFamilias: true,
    mejorAparcamiento: "Aparcamiento en la cresta del cerro junto al castillo.",
  },
  "castillo-de-busot": {
    facilidad: "moderado",
    cocheHastaEntrada: false,
    aparcamientoCercano: true,
    caminataMinutos: "10-15 min",
    terreno: ["sendero", "pendiente-pronunciada"],
    aptoMayores: false,
    aptoFamilias: true,
  },
  "castillo-de-caudilla": {
    facilidad: "moderado",
    cocheHastaEntrada: false,
    aparcamientoCercano: true,
    caminataMinutos: "10-15 min",
    terreno: ["pista-tierra"],
    aptoMayores: false,
    aptoFamilias: true,
    restricciones: "Propiedad privada: visita exterior únicamente.",
  },
  "castillo-de-atienza": {
    facilidad: "moderado",
    cocheHastaEntrada: false,
    aparcamientoCercano: true,
    caminataMinutos: "10-15 min",
    terreno: ["pedregoso", "pendiente-pronunciada"],
    aptoMayores: false,
    aptoFamilias: true,
    calzadoRecomendado: "Calzado con buena suela.",
  },
  "castillo-de-loarre": {
    facilidad: "facil",
    cocheHastaEntrada: true,
    aparcamientoCercano: true,
    caminataMinutos: "< 5 min",
    terreno: ["asfalto"],
    aptoMayores: true,
    aptoFamilias: true,
    aptoMovilidadReducida: false,
    mejorAparcamiento: "Aparcamiento habilitado junto al recinto monumental.",
  },
  "castillo-de-casarrubios-del-monte": {
    facilidad: "facil",
    cocheHastaEntrada: true,
    aparcamientoCercano: true,
    caminataMinutos: "< 5 min",
    terreno: ["asfalto"],
    aptoMayores: true,
    aptoFamilias: true,
  },
  "castillo-de-batres": {
    facilidad: "facil",
    cocheHastaEntrada: true,
    aparcamientoCercano: true,
    caminataMinutos: "< 5 min",
    terreno: ["asfalto"],
    aptoMayores: true,
    aptoFamilias: true,
    restricciones: "Propiedad privada: visita exterior únicamente.",
  },
};

export const getVueloDronInfo = (slug: string): VueloDronInfo | undefined =>
  VUELO_DRON_POR_SLUG[slug];

export const getAccesoCastilloInfo = (slug: string): AccesoCastilloInfo | undefined =>
  ACCESO_POR_SLUG[slug];