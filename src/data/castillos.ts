import aulencia from "@/assets/castillos/aulencia.jpg";
import berlanga from "@/assets/castillos/berlanga.jpg";
import castrojeriz from "@/assets/castillos/castrojeriz.jpg";
import consuegra from "@/assets/castillos/consuegra.jpg";
import cullera from "@/assets/castillos/cullera.jpg";
import forna from "@/assets/castillos/forna.jpg";
import gormaz from "@/assets/castillos/gormaz.jpg";
import guadamur from "@/assets/castillos/guadamur.jpg";
import jadraque from "@/assets/castillos/jadraque.jpg";
import manzanares from "@/assets/castillos/manzanares.jpg";
import sanServando from "@/assets/castillos/san-servando.jpg";
import torija from "@/assets/castillos/torija.jpg";
import cuellar from "@/assets/castillos/cuellar.jpg";
import malpica from "@/assets/castillos/malpica.jpg";
import maqueda from "@/assets/castillos/maqueda.jpg";
import escalona from "@/assets/castillos/escalona.jpg";
import penasNegras from "@/assets/castillos/penas-negras.jpg";
import laMota from "@/assets/castillos/la-mota.jpg";
import laCoracera from "@/assets/castillos/la-coracera.jpg";
import alcazarSegovia from "@/assets/castillos/alcazar-segovia.jpg";
import villaviciosaOdon from "@/assets/castillos/villaviciosa-odon.jpg";
import magalia from "@/assets/castillos/magalia.jpg";
import monreal from "@/assets/castillos/monreal.jpg";
import pueblaAlmenara from "@/assets/castillos/puebla-de-almenara.jpg";
import oreja from "@/assets/castillos/oreja.jpg";
import lujan from "@/assets/castillos/lujan.jpg";
import arevalo from "@/assets/castillos/arevalo.jpg";
import sanSilvestre from "@/assets/castillos/san-silvestre.jpg";
import villalba from "@/assets/castillos/villalba.jpg";
import penafiel from "@/assets/castillos/penafiel.jpg";
import galveDeSorbe from "@/assets/castillos/galve-de-sorbe.jpg";
import almonacidDeToledo from "@/assets/castillos/almonacid-de-toledo.jpg";
import punoenrostro from "@/assets/castillos/punoenrostro.jpg";
import fuentiduenaDeTajo from "@/assets/castillos/fuentiduena-de-tajo.jpg";
import bairen from "@/assets/castillos/bairen.jpg";
import pioz from "@/assets/castillos/pioz.jpg";
import chinchon from "@/assets/castillos/chinchon.jpg";
import busot from "@/assets/castillos/busot.jpg";
import heroImg from "@/assets/hero-kdronazo.jpg";

export type EstadoCastillo = "conservado" | "ruinas";

export type CategoriaCastillo =
  | "conservado"
  | "consolidado"
  | "semirruina"
  | "ruina-avanzada"
  | "ruina-arqueologica";

export interface CategoriaInfo {
  slug: CategoriaCastillo;
  emoji: string;
  label: string;
  descripcion: string;
  /** Color hex usado en mapa y badges */
  color: string;
  /** Mapa al estado heredado (compatibilidad) */
  estado: EstadoCastillo;
}

export const CATEGORIAS: CategoriaInfo[] = [
  {
    slug: "conservado",
    emoji: "🟢",
    label: "Conservado",
    descripcion: "Mantiene cubiertas e interiores utilizables.",
    color: "#22c55e",
    estado: "conservado",
  },
  {
    slug: "consolidado",
    emoji: "🔵",
    label: "Consolidado",
    descripcion: "Sin uso original, pero estructuralmente estable.",
    color: "#3b82f6",
    estado: "conservado",
  },
  {
    slug: "semirruina",
    emoji: "🟡",
    label: "Semirruina",
    descripcion: "Ha perdido techos e interiores, pero conserva gran parte de sus muros.",
    color: "#eab308",
    estado: "ruinas",
  },
  {
    slug: "ruina-avanzada",
    emoji: "🟠",
    label: "Ruina Avanzada",
    descripcion: "Presenta grandes derrumbes y pérdida de elementos esenciales.",
    color: "#f97316",
    estado: "ruinas",
  },
  {
    slug: "ruina-arqueologica",
    emoji: "🔴",
    label: "Ruina Arqueológica",
    descripcion: "Solo quedan restos parciales, estructuras mínimas o cimientos.",
    color: "#ef4444",
    estado: "ruinas",
  },
];

export const getCategoriaInfo = (slug: CategoriaCastillo): CategoriaInfo =>
  CATEGORIAS.find((c) => c.slug === slug) ?? CATEGORIAS[0];

// =====================================================================
// Información práctica para la visita (campos opcionales, ampliables)
// =====================================================================

export type TipoAcceso = "interior" | "exterior" | "restringido";
export type TipoPrecio = "gratuito" | "de-pago" | "no-visitable";
export type TipoAparcamiento = "disponible" | "limitado" | "no-disponible";

export interface OpcionInfo<T extends string> {
  slug: T;
  emoji: string;
  label: string;
  descripcion: string;
  /** Color hex para el distintivo visual */
  color: string;
}

export const ACCESOS: OpcionInfo<TipoAcceso>[] = [
  {
    slug: "interior",
    emoji: "🟢",
    label: "Entrada interior",
    descripcion: "Es posible acceder al interior del recinto.",
    color: "#22c55e",
  },
  {
    slug: "exterior",
    emoji: "🟡",
    label: "Solo exterior / periferia",
    descripcion: "Únicamente puede visitarse el exterior o la periferia.",
    color: "#eab308",
  },
  {
    slug: "restringido",
    emoji: "🔴",
    label: "Acceso restringido",
    descripcion: "Acceso limitado, prohibido o sujeto a permisos especiales.",
    color: "#ef4444",
  },
];

export const PRECIOS: OpcionInfo<TipoPrecio>[] = [
  {
    slug: "gratuito",
    emoji: "🆓",
    label: "Gratuito",
    descripcion: "Visita gratuita.",
    color: "#22c55e",
  },
  {
    slug: "de-pago",
    emoji: "💶",
    label: "De pago",
    descripcion: "Requiere entrada de pago.",
    color: "#3b82f6",
  },
  {
    slug: "no-visitable",
    emoji: "🚫",
    label: "No visitable",
    descripcion: "Actualmente no es visitable.",
    color: "#6b7280",
  },
];

export const APARCAMIENTOS: OpcionInfo<TipoAparcamiento>[] = [
  {
    slug: "disponible",
    emoji: "🅿️",
    label: "Disponible",
    descripcion: "Hay aparcamiento disponible cerca del castillo.",
    color: "#22c55e",
  },
  {
    slug: "limitado",
    emoji: "🅿️",
    label: "Limitado",
    descripcion: "Aparcamiento limitado o reducido.",
    color: "#eab308",
  },
  {
    slug: "no-disponible",
    emoji: "🚳",
    label: "No disponible",
    descripcion: "Sin aparcamiento próximo.",
    color: "#ef4444",
  },
];

export const getAccesoInfo = (slug?: TipoAcceso) =>
  slug ? ACCESOS.find((a) => a.slug === slug) : undefined;
export const getPrecioInfo = (slug?: TipoPrecio) =>
  slug ? PRECIOS.find((p) => p.slug === slug) : undefined;
export const getAparcamientoInfo = (slug?: TipoAparcamiento) =>
  slug ? APARCAMIENTOS.find((p) => p.slug === slug) : undefined;

/** Nota informativa estándar sobre el uso de drones. */
export const NOTA_DRONES =
  "Las condiciones para el vuelo de drones pueden cambiar con el tiempo. Consulte siempre la normativa vigente y las restricciones aplicables antes de realizar cualquier operación aérea.";

export interface CronologiaEvento {
  anio: string;
  evento: string;
}

export interface Castillo {
  slug: string;
  nombre: string;
  provincia: string;
  comunidad: string;
  categoria: CategoriaCastillo;
  estado: EstadoCastillo;
  estadoDescripcion: string;
  descripcionBreve: string;
  imagen: string;
  galeria?: string[];
  coordenadas: [number, number];
  historia: string;
  cronologia: CronologiaEvento[];
  curiosidades: string[];
  youtubeUrl?: string;
  ordenRuinas?: number;
  /** Fecha de incorporación (YYYY-MM-DD). Si está presente y han pasado <20 días, se muestra la etiqueta NUEVO. */
  fechaPublicacion?: string;
  // === Información práctica para la visita (todos los campos opcionales) ===
  /** Tipo de acceso al castillo. */
  acceso?: TipoAcceso;
  /** Coste de la visita. */
  precio?: TipoPrecio;
  /** Disponibilidad de aparcamiento. */
  aparcamiento?: TipoAparcamiento;
  /** Texto libre con indicaciones de cómo llegar. */
  comoLlegar?: string;
  /** Notas prácticas adicionales (horarios, recomendaciones, etc.). */
  infoPractica?: string;
  /** Nota específica del castillo sobre el vuelo de drones (opcional). */
  notaDrones?: string;
}

export const CASTILLOS: Castillo[] = [
  // RUINAS — orden definido por el usuario
  {
    slug: "castillo-de-aulencia",
    nombre: "Castillo de Aulencia",
    provincia: "Madrid",
    comunidad: "Comunidad de Madrid",
    categoria: "ruina-avanzada",
    estado: "ruinas",
    ordenRuinas: 1,
    estadoDescripcion: "En ruinas — torre del homenaje parcialmente en pie",
    descripcionBreve:
      "Fortaleza medieval sobre el valle del río Aulencia, testigo solitario de las tierras altas de Villanueva de la Cañada.",
    imagen: aulencia,
    coordenadas: [40.443894, -3.9553],
    acceso: "exterior",
    precio: "gratuito",
    infoPractica: "Castillo en ruinas.",
    historia:
      "El castillo de Aulencia, también conocido como castillo de la Mora, se alza sobre un cerro dominando el valle del río que le da nombre. Sus orígenes se remontan a la repoblación medieval, sirviendo como punto de vigilancia en la frontera del reino.",
    cronologia: [
      { anio: "Siglo XIII", evento: "Primeras referencias documentales a la fortaleza." },
      { anio: "Siglo XV", evento: "Reformas y ampliación de la torre del homenaje." },
      { anio: "Siglo XVII", evento: "Abandono progresivo de la fortaleza." },
      { anio: "Actualidad", evento: "Conservado en estado de ruina consolidada." },
    ],
    curiosidades: [
      "Su perfil al atardecer es uno de los más fotografiados de la sierra oeste madrileña.",
      "La leyenda popular lo asocia con una mora encantada que aún custodia su tesoro.",
    ],
    youtubeUrl: "https://youtu.be/gLzEM43MoDs",
  },
  {
    slug: "castillo-de-gormaz",
    nombre: "Castillo de Gormaz",
    provincia: "Soria",
    comunidad: "Castilla y León",
    categoria: "semirruina",
    estado: "ruinas",
    ordenRuinas: 2,
    estadoDescripcion: "En ruinas — recinto amurallado conservado en gran extensión",
    descripcionBreve:
      "La mayor fortaleza califal de Europa, una muralla interminable suspendida sobre el Duero.",
    imagen: gormaz,
    coordenadas: [41.493436, -3.0081],
    acceso: "interior",
    precio: "gratuito",
    infoPractica: "Castillo en ruinas.",
    historia:
      "Erigido en el siglo X por el califato de Córdoba, el castillo de Gormaz fue la mayor fortaleza de su tiempo en Europa. Con más de 1.200 metros de perímetro amurallado, controlaba el paso del Duero y la frontera entre al-Ándalus y los reinos cristianos.",
    cronologia: [
      { anio: "965", evento: "Construcción califal bajo el mando de al-Hakam II." },
      { anio: "975", evento: "Conquistado brevemente por Castilla." },
      { anio: "1087", evento: "Entregado a El Cid Campeador por Alfonso VI." },
      { anio: "Siglo XV", evento: "Pierde valor estratégico y se abandona." },
    ],
    curiosidades: [
      "Es la fortaleza califal más grande de Europa conservada.",
      "Su muralla supera los 1.200 metros de perímetro.",
      "El Cid Campeador fue su alcaide.",
    ],
    youtubeUrl: "https://youtu.be/H-NqnJ-A3j4",
  },
  {
    slug: "castillo-de-jadraque",
    nombre: "Castillo de Jadraque",
    provincia: "Guadalajara",
    comunidad: "Castilla-La Mancha",
    categoria: "semirruina",
    estado: "ruinas",
    ordenRuinas: 3,
    estadoDescripcion: "En ruinas consolidadas — restaurado parcialmente",
    descripcionBreve:
      "El llamado «Castillo del Cid» se alza sobre un cerro perfecto, dominando la vega del Henares.",
    imagen: jadraque,
    coordenadas: [40.918142, -2.934553],
    acceso: "exterior",
    precio: "gratuito",
    infoPractica: "Acceso limitado al exterior.",
    historia:
      "Conocido popularmente como el Castillo del Cid, esta fortaleza se levanta sobre una colina de forma cónica casi perfecta. Pasó por manos musulmanas, cristianas y nobiliarias, llegando a pertenecer al Cardenal Mendoza.",
    cronologia: [
      { anio: "Siglo IX", evento: "Origen como fortaleza andalusí." },
      { anio: "1085", evento: "Reconquista por Alfonso VI." },
      { anio: "Siglo XV", evento: "Propiedad del Cardenal Mendoza." },
      { anio: "Siglo XX", evento: "Declarado Monumento Nacional." },
    ],
    curiosidades: [
      "El cerro sobre el que se asienta es considerado uno de los más perfectos del mundo.",
      "Ortega y Gasset escribió sobre la belleza geométrica del emplazamiento.",
    ],
    youtubeUrl: "https://youtu.be/41pA4KYrEvo",
  },
  {
    slug: "castillo-de-berlanga-de-duero",
    nombre: "Castillo de Berlanga de Duero",
    provincia: "Soria",
    comunidad: "Castilla y León",
    categoria: "semirruina",
    estado: "ruinas",
    ordenRuinas: 4,
    estadoDescripcion: "En ruinas — murallas y torreones bien conservados",
    descripcionBreve:
      "Imponente fortaleza renacentista con doble recinto amurallado abrazando la villa medieval.",
    imagen: berlanga,
    coordenadas: [41.464969, -2.856825],
    acceso: "interior",
    precio: "de-pago",
    historia:
      "El castillo de Berlanga de Duero combina una fortaleza medieval con un recinto artillero renacentista, uno de los primeros de España adaptados al uso de la pólvora. Perteneció a los Tovar y posteriormente a los condes de Berlanga.",
    cronologia: [
      { anio: "Siglo X", evento: "Primera fortificación califal." },
      { anio: "Siglo XV", evento: "Reconstrucción nobiliaria gótica." },
      { anio: "Siglo XVI", evento: "Adaptación renacentista para artillería." },
      { anio: "Siglo XIX", evento: "Abandono tras la Guerra de la Independencia." },
    ],
    curiosidades: [
      "Uno de los primeros castillos artilleros de la Península.",
      "Sus murallas exteriores rodean toda la villa medieval.",
    ],
    youtubeUrl: "https://youtu.be/ZAI_rgcgEpg",
  },
  {
    slug: "castillo-de-castrojeriz",
    nombre: "Castillo de Castrojeriz",
    provincia: "Burgos",
    comunidad: "Castilla y León",
    categoria: "semirruina",
    estado: "ruinas",
    ordenRuinas: 5,
    estadoDescripcion: "En ruinas — torres y lienzos parcialmente restaurados",
    descripcionBreve:
      "Atalaya del Camino de Santiago, vigía de la Tierra de Campos sobre un cerro testigo.",
    imagen: castrojeriz,
    coordenadas: [42.291644, -4.136056],
    acceso: "exterior",
    precio: "gratuito",
    infoPractica: "Castillo en ruinas.",
    historia:
      "Levantado sobre un antiguo castro celtíbero y posterior fortaleza romana, el castillo de Castrojeriz domina el Camino de Santiago francés. Fue refugio de reyes y nobles castellanos durante la Edad Media.",
    cronologia: [
      { anio: "Siglo IX", evento: "Repoblación cristiana y construcción del castillo." },
      { anio: "Siglo XIV", evento: "Reformas bajo los Castro." },
      { anio: "1755", evento: "Daños severos por el terremoto de Lisboa." },
      { anio: "Siglo XXI", evento: "Trabajos de consolidación y accesibilidad." },
    ],
    curiosidades: [
      "Punto destacado en la etapa burgalesa del Camino de Santiago.",
      "El terremoto de Lisboa de 1755 derribó parte de sus muros.",
    ],
    youtubeUrl: "https://youtu.be/8dw4ZnMqFWg",
  },
  {
    slug: "castillo-de-forna",
    nombre: "Castillo de Forna",
    provincia: "Alicante",
    comunidad: "Comunidad Valenciana",
    categoria: "ruina-avanzada",
    estado: "ruinas",
    ordenRuinas: 6,
    estadoDescripcion: "Conservado en parte — almenas y torres restauradas",
    descripcionBreve:
      "Fortaleza palacio de origen árabe en el corazón de la Marina Alta valenciana.",
    imagen: forna,
    coordenadas: [38.87225, -0.170867],
    acceso: "exterior",
    precio: "gratuito",
    infoPractica: "Acceso limitado al exterior.",
    historia:
      "El castillo de Forna es una rara muestra de fortaleza-palacio de planta cuadrada con torres en sus esquinas. Construido sobre origen andalusí, fue reformado tras la conquista cristiana en el siglo XIII.",
    cronologia: [
      { anio: "Siglo XII", evento: "Construcción andalusí original." },
      { anio: "Siglo XIII", evento: "Conquista cristiana y reformas." },
      { anio: "Siglo XV", evento: "Transformación en residencia señorial." },
      { anio: "Siglo XX", evento: "Trabajos de restauración progresiva." },
    ],
    curiosidades: [
      "Su planta cuadrada con cuatro torres esquineras es única en la zona.",
      "Combina función defensiva y residencial.",
    ],
    youtubeUrl: "https://youtu.be/4E27yWWQtNI",
  },

  // CONSERVADOS
  {
    slug: "castillo-de-manzanares-el-real",
    nombre: "Castillo de Manzanares el Real",
    provincia: "Madrid",
    comunidad: "Comunidad de Madrid",
    categoria: "conservado",
    estado: "conservado",
    estadoDescripcion: "Excelente estado — visitable",
    descripcionBreve:
      "Joya del gótico militar castellano, palacio-fortaleza de los Mendoza al pie de La Pedriza.",
    imagen: manzanares,
    coordenadas: [40.727172, -3.862008],
    acceso: "restringido",
    precio: "no-visitable",
    infoPractica: "Cerrado temporalmente al público.",
    historia:
      "Construido en 1475 por orden de Diego Hurtado de Mendoza, este castillo-palacio combina la solidez defensiva con la elegancia residencial. Es uno de los castillos mejor conservados de la Comunidad de Madrid.",
    cronologia: [
      { anio: "1475", evento: "Inicio de la construcción por los Mendoza." },
      { anio: "Siglo XVI", evento: "Reformas renacentistas en el patio." },
      { anio: "1931", evento: "Declarado Monumento Histórico-Artístico." },
      { anio: "Actualidad", evento: "Abierto al público como museo." },
    ],
    curiosidades: [
      "Diseñado por Juan Guas, arquitecto de los Reyes Católicos.",
      "Sus garitones colgantes son característicos del gótico isabelino.",
    ],
    youtubeUrl: "https://youtu.be/zNy1cBsX1e0",
  },
  {
    slug: "castillo-de-guadamur",
    nombre: "Castillo de Guadamur",
    provincia: "Toledo",
    comunidad: "Castilla-La Mancha",
    categoria: "conservado",
    estado: "conservado",
    estadoDescripcion: "Excelente estado — propiedad privada visitable",
    descripcionBreve:
      "Fortaleza señorial del siglo XV, una de las más bellas y completas de Castilla.",
    imagen: guadamur,
    coordenadas: [39.810278, -4.146364],
    acceso: "interior",
    precio: "de-pago",
    historia:
      "Construido en el siglo XV por Pedro López de Ayala, primer conde de Fuensalida, el castillo de Guadamur es un magnífico ejemplo de fortaleza-palacio señorial. Hospedó a reyes como Isabel la Católica y Juana la Loca.",
    cronologia: [
      { anio: "Siglo XV", evento: "Construcción por los condes de Fuensalida." },
      { anio: "1502", evento: "Estancia de Felipe el Hermoso y Juana la Loca." },
      { anio: "Siglo XIX", evento: "Restauración por el conde de Asalto." },
      { anio: "Actualidad", evento: "Propiedad privada, visitable." },
    ],
    curiosidades: [
      "Sus garitones cilíndricos coronados son únicos en España.",
      "Hospedó a Juana la Loca tras la muerte de Felipe el Hermoso.",
    ],
    youtubeUrl: "https://youtu.be/6aH_eW3E0Vw",
  },
  {
    slug: "castillo-de-consuegra",
    nombre: "Castillo de Consuegra",
    provincia: "Toledo",
    comunidad: "Castilla-La Mancha",
    categoria: "consolidado",
    estado: "conservado",
    estadoDescripcion: "Restaurado — visitable",
    descripcionBreve:
      "Fortaleza de la Orden de San Juan, dominando la llanura manchega junto a los míticos molinos.",
    imagen: consuegra,
    coordenadas: [39.453142, -3.608194],
    acceso: "interior",
    precio: "de-pago",
    historia:
      "Conocido como Castillo de la Muela, esta fortaleza fue entregada a la Orden de San Juan en el siglo XII. Domina la llanura manchega y forma uno de los conjuntos paisajísticos más reconocibles de España junto a los molinos de viento de Consuegra.",
    cronologia: [
      { anio: "Siglo X", evento: "Origen como fortaleza califal." },
      { anio: "1183", evento: "Entrega a la Orden de San Juan." },
      { anio: "Siglo XIV", evento: "Reformas como sede del Priorato." },
      { anio: "Siglo XXI", evento: "Restauración integral y apertura turística." },
    ],
    curiosidades: [
      "Sede histórica del Gran Priorato de San Juan en Castilla.",
      "El conjunto con los molinos es uno de los iconos de La Mancha.",
    ],
    youtubeUrl: "https://youtu.be/7nbJBSzW4jA",
  },
  {
    slug: "castillo-de-cullera",
    nombre: "Castillo de Cullera",
    provincia: "Valencia",
    comunidad: "Comunidad Valenciana",
    categoria: "consolidado",
    estado: "conservado",
    estadoDescripcion: "Restaurado — visitable",
    descripcionBreve:
      "Fortaleza andalusí sobre el monte de las Raboses, vigilando la desembocadura del Júcar.",
    imagen: cullera,
    coordenadas: [39.166017, -0.24995],
    acceso: "interior",
    precio: "de-pago",
    historia:
      "De origen califal, el castillo de Cullera domina la desembocadura del río Júcar y el Mediterráneo. Su recinto amurallado integra el santuario de la Virgen del Castillo, fusionando fortaleza medieval y patrimonio religioso.",
    cronologia: [
      { anio: "Siglo XI", evento: "Construcción andalusí." },
      { anio: "1239", evento: "Conquista por Jaime I de Aragón." },
      { anio: "Siglo XIX", evento: "Construcción del santuario actual." },
      { anio: "Siglo XXI", evento: "Restauración y musealización." },
    ],
    curiosidades: [
      "Fue refugio frente a los ataques berberiscos en el siglo XVI.",
      "Integra fortaleza medieval y santuario mariano del XIX.",
    ],
    youtubeUrl: "https://youtu.be/usZiTAvZjjw",
  },
  {
    slug: "castillo-de-san-servando",
    nombre: "Castillo de San Servando",
    provincia: "Toledo",
    comunidad: "Castilla-La Mancha",
    categoria: "consolidado",
    estado: "conservado",
    estadoDescripcion: "Restaurado — alberga albergue juvenil",
    descripcionBreve:
      "Fortaleza mudéjar a las puertas de Toledo, vigía perpetuo del Tajo frente al Alcázar.",
    imagen: sanServando,
    coordenadas: [39.860417, -4.0156],
    acceso: "exterior",
    precio: "gratuito",
    infoPractica: "No es posible acceder al interior.",
    historia:
      "El castillo de San Servando, de origen visigodo y reconstruido en estilo mudéjar en el siglo XIV, se alza sobre un cerro junto al Tajo, ofreciendo la silueta más reconocible al cruzar el puente de Alcántara. Sirvió como monasterio benedictino, fortaleza templaria y residencia real antes de su uso actual como albergue.",
    cronologia: [
      { anio: "Siglo XI", evento: "Primera fortificación cristiana sobre restos visigodos." },
      { anio: "Siglo XII", evento: "Cedido a la Orden del Temple." },
      { anio: "Siglo XIV", evento: "Reconstrucción mudéjar bajo Pedro Tenorio." },
      { anio: "Siglo XX", evento: "Restaurado como albergue juvenil." },
    ],
    curiosidades: [
      "Ofrece una de las mejores panorámicas del casco histórico de Toledo.",
      "Su silueta es una de las más fotografiadas de la ciudad imperial.",
    ],
    youtubeUrl: "https://youtu.be/YwB3wFEl1X8",
  },
  {
    slug: "castillo-de-torija",
    nombre: "Castillo de Torija",
    provincia: "Guadalajara",
    comunidad: "Castilla-La Mancha",
    categoria: "consolidado",
    estado: "conservado",
    estadoDescripcion: "Restaurado — alberga el Museo del Viaje a la Alcarria",
    descripcionBreve:
      "Fortaleza templaria de planta cuadrada, hoy sede del museo dedicado al viaje cervantino de Cela.",
    imagen: torija,
    coordenadas: [40.743181, -3.03155],
    acceso: "interior",
    precio: "de-pago",
    historia:
      "Levantado en el siglo XI por los templarios, el castillo de Torija fue arrasado y reedificado varias veces a lo largo de su historia. Su torre del homenaje, de gran altura, domina el caserío y el paso natural hacia la Alcarria. Hoy alberga el Museo del Viaje a la Alcarria, dedicado a la obra de Camilo José Cela.",
    cronologia: [
      { anio: "Siglo XI", evento: "Construcción templaria original." },
      { anio: "1480", evento: "Reedificación por los Mendoza." },
      { anio: "1809", evento: "Voladura parcial durante la Guerra de la Independencia." },
      { anio: "Siglo XX", evento: "Restauración y apertura como museo." },
    ],
    curiosidades: [
      "Alberga el Museo del Viaje a la Alcarria, único en España.",
      "Su torre del homenaje alcanza casi 20 metros de altura.",
    ],
    youtubeUrl: "https://youtu.be/VbGrbsamAgo",
  },
  {
    slug: "castillo-de-cuellar",
    nombre: "Castillo de Cuéllar",
    provincia: "Segovia",
    comunidad: "Castilla y León",
    categoria: "conservado",
    estado: "conservado",
    estadoDescripcion: "Excelente estado — visitable",
    descripcionBreve:
      "Palacio-fortaleza de los duques de Alburquerque, mezcla de gótico, mudéjar y renacimiento.",
    imagen: cuellar,
    coordenadas: [41.400958, -4.320008],
    acceso: "interior",
    precio: "de-pago",
    historia:
      "El castillo de Cuéllar es un conjunto monumental que combina elementos góticos, mudéjares y renacentistas. Fue residencia de los duques de Alburquerque y testigo de episodios clave de la historia castellana, incluyendo la estancia de Beltrán de la Cueva, favorito de Enrique IV.",
    cronologia: [
      { anio: "Siglo XI", evento: "Primera fortificación tras la repoblación." },
      { anio: "Siglo XV", evento: "Reforma palaciega por los Alburquerque." },
      { anio: "Siglo XVI", evento: "Patio renacentista añadido." },
      { anio: "Actualidad", evento: "Sede del IES Marqués de Lozoya y museo visitable." },
    ],
    curiosidades: [
      "Conserva uno de los patios renacentistas más bellos de Castilla.",
      "Integra una muralla medieval que rodea la villa entera.",
    ],
    youtubeUrl: "https://youtu.be/wfDdpZVHyKw",
  },
  {
    slug: "castillo-de-malpica-de-tajo",
    nombre: "Castillo de Malpica de Tajo",
    provincia: "Toledo",
    comunidad: "Castilla-La Mancha",
    categoria: "conservado",
    estado: "conservado",
    estadoDescripcion: "Excelente estado — propiedad privada",
    descripcionBreve:
      "Singular fortaleza-palacio de origen árabe sobre el Tajo, con perfil neogótico restaurado.",
    imagen: malpica,
    coordenadas: [39.896044, -4.545083],
    acceso: "restringido",
    precio: "no-visitable",
    infoPractica: "Propiedad privada.",
    historia:
      "De origen andalusí, el castillo de Malpica fue conquistado por Alfonso VI y posteriormente reformado como residencia señorial. Su perfil actual, con almenas y ventanales mudéjares, responde a la restauración neogótica del siglo XIX, integrándose espectacularmente con el cauce del río Tajo.",
    cronologia: [
      { anio: "Siglo X", evento: "Origen como fortaleza andalusí." },
      { anio: "Siglo XV", evento: "Propiedad de los Ribera, señores de Malpica." },
      { anio: "Siglo XIX", evento: "Restauración neogótica." },
      { anio: "Actualidad", evento: "Propiedad privada de los duques de Arión." },
    ],
    curiosidades: [
      "Es uno de los pocos castillos españoles literalmente abrazados por un río.",
      "Su restauración decimonónica le dio el aire de palacio centroeuropeo.",
    ],
    youtubeUrl: "https://youtu.be/8TvRRV3Gh4A",
  },
  {
    slug: "castillo-de-maqueda",
    nombre: "Castillo de Maqueda",
    provincia: "Toledo",
    comunidad: "Castilla-La Mancha",
    categoria: "consolidado",
    estado: "conservado",
    estadoDescripcion: "Buen estado — restaurado",
    descripcionBreve:
      "Fortaleza califal de muralla almenada, una de las más imponentes del valle del Tajo.",
    imagen: maqueda,
    coordenadas: [40.064728, -4.369233],
    acceso: "exterior",
    precio: "gratuito",
    infoPractica: "Acceso limitado al exterior.",
    historia:
      "El castillo de Maqueda, de origen califal, fue conquistado por Alfonso VI en el siglo XI y pasó por las manos de la Orden de Calatrava antes de convertirse en señorío de los Cárdenas. Su recinto exterior conserva un imponente lienzo amurallado con torres cilíndricas en las esquinas.",
    cronologia: [
      { anio: "Siglo X", evento: "Construcción de la fortaleza califal." },
      { anio: "1085", evento: "Conquistado por Alfonso VI." },
      { anio: "Siglo XV", evento: "Reformas bajo los Cárdenas." },
      { anio: "Siglo XX", evento: "Cuartel de la Guardia Civil hasta su restauración." },
    ],
    curiosidades: [
      "Su muralla almenada es una de las mejor conservadas de la Península.",
      "Sirvió como cuartel de la Guardia Civil durante décadas.",
    ],
    youtubeUrl: "https://youtu.be/XZMaYGGpWN8",
  },
  {
    slug: "castillo-de-escalona",
    nombre: "Castillo de Escalona",
    provincia: "Toledo",
    comunidad: "Castilla-La Mancha",
    categoria: "consolidado",
    estado: "ruinas",
    estadoDescripcion: "En ruinas — recinto exterior y torre conservados",
    descripcionBreve:
      "Antiguo bastión de Don Álvaro de Luna sobre el río Alberche, escenario de su caída política.",
    imagen: escalona,
    coordenadas: [40.166303, -4.401725],
    acceso: "exterior",
    precio: "gratuito",
    infoPractica: "Acceso limitado al exterior.",
    historia:
      "Fortaleza de origen andalusí reconstruida en el siglo XV por Don Álvaro de Luna, condestable de Castilla. Aquí celebró su corte privada antes de su caída en desgracia. El castillo sufrió graves daños durante la Guerra de la Independencia, conservando hoy parte de sus murallas y la torre del homenaje.",
    cronologia: [
      { anio: "Siglo X", evento: "Fortaleza andalusí original." },
      { anio: "Siglo XV", evento: "Reconstrucción palaciega por Don Álvaro de Luna." },
      { anio: "1809", evento: "Voladura por las tropas francesas." },
      { anio: "Siglo XXI", evento: "Consolidación parcial de sus restos." },
    ],
    curiosidades: [
      "Don Álvaro de Luna celebró aquí fiestas legendarias antes de su ejecución.",
      "Su recinto albergaba uno de los patios palaciegos más lujosos de la Castilla del XV.",
    ],
    youtubeUrl: "https://youtu.be/7Q-GSTVJ7Cg",
  },
  {
    slug: "castillo-de-penas-negras",
    nombre: "Castillo de Peñas Negras",
    provincia: "Toledo",
    comunidad: "Castilla-La Mancha",
    categoria: "ruina-avanzada",
    estado: "ruinas",
    estadoDescripcion: "En ruinas — torre del homenaje en restauración",
    descripcionBreve:
      "Atalaya rocosa en los Montes de Toledo, suspendida entre la niebla y la Mancha.",
    imagen: penasNegras,
    coordenadas: [39.682183, -3.730817],
    acceso: "interior",
    precio: "gratuito",
    infoPractica: "Castillo en ruinas.",
    historia:
      "Levantado en el siglo XII por los almohades sobre un risco de los Montes de Toledo, el castillo de Peñas Negras controlaba el paso entre la Mancha y la meseta. Pasó a manos cristianas tras la batalla de las Navas de Tolosa y fue posesión de la Orden de San Juan junto al cercano castillo de Consuegra.",
    cronologia: [
      { anio: "Siglo XII", evento: "Construcción almohade." },
      { anio: "1212", evento: "Conquista cristiana tras las Navas de Tolosa." },
      { anio: "Siglo XV", evento: "Abandono progresivo." },
      { anio: "Siglo XXI", evento: "Trabajos de consolidación arqueológica." },
    ],
    curiosidades: [
      "Su nombre proviene del color oscuro de las rocas sobre las que se asienta.",
      "Forma parte del Centro de Interpretación de los Montes de Toledo.",
    ],
    youtubeUrl: "https://youtu.be/zwYEQzqEthY",
  },
  {
    slug: "castillo-de-la-mota",
    nombre: "Castillo de la Mota",
    provincia: "Valladolid",
    comunidad: "Castilla y León",
    categoria: "conservado",
    estado: "conservado",
    estadoDescripcion: "Excelente estado — visitable",
    descripcionBreve:
      "Imponente fortaleza de ladrillo mudéjar en Medina del Campo, prisión de César Borgia.",
    imagen: laMota,
    coordenadas: [41.309069, -4.908319],
    acceso: "interior",
    precio: "gratuito",
    historia:
      "El castillo de la Mota, construido principalmente en ladrillo mudéjar entre los siglos XIV y XV, es uno de los conjuntos militares más impresionantes de Castilla. Perteneció a los Reyes Católicos y sirvió como prisión de Estado, donde estuvo recluido César Borgia, del que se fugó saltando desde la torre del homenaje.",
    cronologia: [
      { anio: "Siglo XII", evento: "Primera fortificación de tierra." },
      { anio: "Siglo XV", evento: "Reconstrucción en ladrillo bajo los Reyes Católicos." },
      { anio: "1506", evento: "Famosa fuga de César Borgia." },
      { anio: "Siglo XX", evento: "Restaurado y abierto al público." },
    ],
    curiosidades: [
      "César Borgia escapó descolgándose desde su torre del homenaje.",
      "Es uno de los castillos de ladrillo más grandes de Europa.",
      "Su barrera artillera es una de las primeras del continente.",
    ],
    youtubeUrl: "https://youtu.be/hP8uMGlfX68",
  },
  {
    slug: "castillo-de-la-coracera",
    nombre: "Castillo de La Coracera",
    provincia: "Madrid",
    comunidad: "Comunidad de Madrid",
    categoria: "consolidado",
    estado: "conservado",
    estadoDescripcion: "Restaurado — visitable",
    descripcionBreve:
      "Fortaleza granítica de Don Álvaro de Luna en San Martín de Valdeiglesias, al pie de Gredos.",
    imagen: laCoracera,
    coordenadas: [40.36275, -4.401475],
    acceso: "exterior",
    precio: "gratuito",
    infoPractica: "Acceso limitado al exterior.",
    historia:
      "Construido a mediados del siglo XV por Don Álvaro de Luna, condestable de Castilla, el castillo de La Coracera es una de las fortalezas mejor conservadas del sur abulense. Levantado en granito local, fue residencia señorial y centro administrativo de las extensas posesiones del valiido en la zona.",
    cronologia: [
      { anio: "Siglo XV", evento: "Construcción por Don Álvaro de Luna." },
      { anio: "1453", evento: "Pasa a la Corona tras la ejecución de su promotor." },
      { anio: "Siglo XIX", evento: "Abandono progresivo." },
      { anio: "Siglo XXI", evento: "Restauración integral y apertura turística." },
    ],
    curiosidades: [
      "Levantado en granito de la sierra de Gredos.",
      "Conserva intacta su torre del homenaje rectangular con torreón cilíndrico adosado.",
    ],
    youtubeUrl: "https://youtu.be/KypAtTR1pTk",
  },
  {
    slug: "castillo-de-villaviciosa-de-odon",
    nombre: "Castillo de Villaviciosa de Odón",
    provincia: "Madrid",
    comunidad: "Comunidad de Madrid",
    categoria: "consolidado",
    estado: "conservado",
    estadoDescripcion: "Restaurado — sede del Archivo Histórico del Ejército del Aire",
    descripcionBreve:
      "Fortaleza palaciega del siglo XV reconstruida tras un incendio, hoy archivo militar en plena sierra oeste madrileña.",
    imagen: villaviciosaOdon,
    coordenadas: [40.357392, -3.896422],
    acceso: "interior",
    precio: "de-pago",
    historia:
      "El castillo de Villaviciosa de Odón se levantó en el siglo XV sobre una fortificación anterior y perteneció a los condes de Chinchón. Tras varios incendios y reformas, fue restaurado en el siglo XX para albergar el Archivo Histórico del Ejército del Aire, función que conserva en la actualidad.",
    cronologia: [
      { anio: "Siglo XV", evento: "Construcción original como fortaleza señorial." },
      { anio: "Siglo XVII", evento: "Reforma palaciega bajo los condes de Chinchón." },
      { anio: "1736", evento: "Incendio que destruye gran parte del edificio." },
      { anio: "Siglo XX", evento: "Restauración y conversión en archivo militar." },
    ],
    curiosidades: [
      "Conserva uno de los archivos aeronáuticos más importantes de España.",
      "Su silueta domina el casco urbano de Villaviciosa de Odón.",
    ],
    youtubeUrl: "https://youtu.be/m_lmeu6ZvMg",
  },
  {
    slug: "castillo-de-magalia",
    nombre: "Castillo de Magalia",
    provincia: "Ávila",
    comunidad: "Castilla y León",
    categoria: "consolidado",
    estado: "conservado",
    estadoDescripcion: "Restaurado — visitable como centro cultural",
    descripcionBreve:
      "Pequeña fortaleza señorial en Las Navas del Marqués, hoy reconvertida en residencia y centro de actividades.",
    imagen: magalia,
    coordenadas: [40.603589, -4.325614],
    acceso: "interior",
    precio: "de-pago",
    historia:
      "El castillo-palacio de Magalia, situado en Las Navas del Marqués, fue residencia señorial vinculada a los marqueses de Las Navas. Combinando elementos defensivos con una clara vocación palaciega, ha sido restaurado en distintas fases hasta convertirse en sede cultural y residencia de actividades.",
    cronologia: [
      { anio: "Siglo XVI", evento: "Construcción como residencia señorial fortificada." },
      { anio: "Siglo XIX", evento: "Periodo de abandono y deterioro." },
      { anio: "Siglo XX", evento: "Restauración integral del conjunto." },
      { anio: "Actualidad", evento: "Centro cultural y residencia de actividades." },
    ],
    curiosidades: [
      "Su nombre proviene de la antigua denominación romana de la zona.",
      "Combina arquitectura militar y residencial en un solo conjunto.",
    ],
    youtubeUrl: "https://youtu.be/sA92aGowI3E",
  },
  {
    slug: "alcazar-de-segovia",
    nombre: "Alcázar de Segovia",
    provincia: "Segovia",
    comunidad: "Castilla y León",
    categoria: "conservado",
    estado: "conservado",
    estadoDescripcion: "Excelente estado — visitable",
    descripcionBreve:
      "El alcázar de los reyes de Castilla, proa de piedra sobre la confluencia del Eresma y el Clamores.",
    imagen: alcazarSegovia,
    coordenadas: [40.952419, -4.132347],
    acceso: "interior",
    precio: "de-pago",
    historia:
      "El Alcázar de Segovia, mencionado por primera vez en el siglo XII, fue residencia favorita de los reyes de Castilla. Aquí fue proclamada reina Isabel la Católica en 1474. Tras un grave incendio en 1862, fue reconstruido en el siglo XIX manteniendo su silueta de proa que lo ha convertido en icono universal.",
    cronologia: [
      { anio: "Siglo XII", evento: "Primeras referencias documentales." },
      { anio: "1474", evento: "Proclamación de Isabel la Católica como reina." },
      { anio: "1862", evento: "Incendio que destruye gran parte del interior." },
      { anio: "Siglo XIX-XX", evento: "Reconstrucción y conversión en museo." },
    ],
    curiosidades: [
      "Su silueta inspiró el castillo de Cenicienta de Walt Disney, según la leyenda popular.",
      "Fue prisión real durante el siglo XVIII.",
    ],
    youtubeUrl: "https://youtu.be/NXRMpYMpTGU",
  },
  // === Nuevas incorporaciones ===
  {
    slug: "castillo-de-monreal",
    nombre: "Castillo de Monreal",
    provincia: "Toledo",
    comunidad: "Castilla-La Mancha",
    categoria: "ruina-arqueologica",
    estado: "ruinas",
    ordenRuinas: 20,
    estadoDescripcion: "En ruinas — torre cilíndrica y lienzos de muralla en pie sobre cerro testigo",
    descripcionBreve:
      "Fortaleza solitaria encaramada en un cerro testigo en término de Dosbarrios (Toledo), vigía silencioso sobre la llanura manchega.",
    imagen: monreal,
    coordenadas: [39.828047, -3.545575],
    acceso: "exterior",
    precio: "gratuito",
    infoPractica: "Acceso limitado al exterior.",
    historia:
      "El castillo de Monreal se alza sobre un espectacular cerro testigo desde el que se domina un amplio territorio manchego. Sus restos conservan parte de la torre cilíndrica y lienzos de muralla de mampostería, testimonio de una fortaleza medieval de origen islámico reaprovechada tras la Reconquista.",
    cronologia: [
      { anio: "Siglos X-XI", evento: "Origen andalusí como atalaya defensiva." },
      { anio: "Siglos XII-XIII", evento: "Reocupación cristiana tras la Reconquista." },
      { anio: "Siglos XV-XVI", evento: "Abandono progresivo del recinto." },
      { anio: "Actualidad", evento: "Ruina consolidada visible desde gran distancia." },
    ],
    curiosidades: [
      "Su emplazamiento elevado lo convierte en uno de los miradores naturales más impresionantes de la zona.",
      "La erosión del cerro ha dejado el castillo casi al borde del acantilado.",
    ],
    youtubeUrl: "https://youtu.be/7P04c4Azl6E",
  },
  {
    slug: "castillo-de-puebla-de-almenara",
    nombre: "Castillo de Puebla de Almenara",
    provincia: "Cuenca",
    comunidad: "Castilla-La Mancha",
    categoria: "ruina-avanzada",
    estado: "ruinas",
    ordenRuinas: 21,
    estadoDescripcion: "En ruinas — torre del homenaje, barbacana y cubos de muralla conservados",
    descripcionBreve:
      "Imponente fortaleza señorial de la Orden de Santiago, dominando la llanura conquense con su poderosa torre del homenaje y su recinto amurallado.",
    imagen: pueblaAlmenara,
    coordenadas: [39.791114, -2.842111],
    acceso: "exterior",
    precio: "gratuito",
    infoPractica: "Acceso limitado al exterior.",
    historia:
      "El castillo de Puebla de Almenara perteneció a la Orden de Santiago y posteriormente a la familia Pacheco. Su torre del homenaje, de planta cuadrada con cubos circulares en las esquinas, es uno de los mejores ejemplos de arquitectura militar bajomedieval de la provincia de Cuenca.",
    cronologia: [
      { anio: "Siglo XIII", evento: "Construcción inicial bajo dominio de la Orden de Santiago." },
      { anio: "Siglo XV", evento: "Reformas y ampliación bajo los Pacheco, marqueses de Villena." },
      { anio: "Siglos XVII-XVIII", evento: "Pérdida de función defensiva y abandono." },
      { anio: "Actualidad", evento: "Bien de Interés Cultural; conserva el alzado completo de su torre." },
    ],
    curiosidades: [
      "Su torre del homenaje conserva la altura original y es visible a kilómetros de distancia.",
      "La barbacana exterior protege todavía el acceso original a la fortaleza.",
    ],
    youtubeUrl: "https://youtu.be/hZjcS5mdM_c",
  },
  {
    slug: "castillo-de-oreja",
    nombre: "Castillo de Oreja",
    provincia: "Toledo",
    comunidad: "Castilla-La Mancha",
    categoria: "ruina-avanzada",
    estado: "ruinas",
    ordenRuinas: 22,
    estadoDescripcion: "En ruinas — torre del homenaje en pie sobre los cortados del Tajo",
    descripcionBreve:
      "Fortaleza medieval colgada sobre los cortados del río Tajo, llave estratégica entre Toledo y la meseta sur durante la Reconquista.",
    imagen: oreja,
    coordenadas: [40.039083, -3.498369],
    acceso: "exterior",
    precio: "gratuito",
    infoPractica: "Castillo en ruinas.",
    historia:
      "El castillo de Oreja se asienta sobre un escarpe vertical del río Tajo, en término de Ontígola. De origen musulmán, fue reconquistado en 1139 por Alfonso VII y entregado a la Orden de Santiago, convirtiéndose en una de sus encomiendas más importantes. Su torre del homenaje, de planta cuadrada y mampostería caliza, domina aún el paisaje.",
    cronologia: [
      { anio: "Siglos IX-X", evento: "Fortaleza andalusí sobre el Tajo." },
      { anio: "1139", evento: "Conquista por Alfonso VII." },
      { anio: "Siglo XII", evento: "Encomienda de la Orden de Santiago." },
      { anio: "Siglos XVI-XVII", evento: "Abandono tras la despoblación de la villa." },
    ],
    curiosidades: [
      "Junto al castillo existió una villa medieval hoy completamente despoblada.",
      "Su posición sobre el cortado del Tajo lo hacía prácticamente inexpugnable.",
    ],
    youtubeUrl: "https://youtu.be/marFjxVBPAI",
  },
  {
    slug: "castillo-de-lujan",
    nombre: "Castillo de Luján",
    provincia: "Guadalajara",
    comunidad: "Castilla-La Mancha",
    categoria: "ruina-avanzada",
    estado: "ruinas",
    ordenRuinas: 23,
    estadoDescripcion: "En ruinas parcialmente restauradas — recinto amurallado con torres y almenas reconstruidas",
    descripcionBreve:
      "Fortaleza señorial de la familia Luján en el despoblado de Luján (Cifuentes, Guadalajara), con su característica torre albarrana en plena Alcarria.",
    imagen: lujan,
    coordenadas: [39.889328, -2.776794],
    acceso: "interior",
    precio: "gratuito",
    infoPractica: "Castillo en ruinas.",
    historia:
      "El castillo de Luján fue construido como residencia fortificada del linaje de los Luján, una de las grandes familias nobiliarias de la Alcarria castellana. Su recinto, de planta rectangular con torres circulares en las esquinas y una torre albarrana adelantada, ha sido parcialmente consolidado en intervenciones recientes.",
    cronologia: [
      { anio: "Siglo XIV", evento: "Construcción por el linaje de los Luján." },
      { anio: "Siglo XV", evento: "Ampliación con torre albarrana y barbacana." },
      { anio: "Siglo XIX", evento: "Abandono tras la desamortización." },
      { anio: "Siglo XXI", evento: "Trabajos de consolidación y restauración parcial." },
    ],
    curiosidades: [
      "Su torre albarrana adelantada con almenas decorativas es uno de los rasgos más distintivos.",
      "Conserva detalles de ladrillo rojizo sobre la mampostería caliza dorada.",
    ],
    youtubeUrl: "https://youtu.be/GBiICgN7Nmo",
  },
  {
    slug: "castillo-de-arevalo",
    nombre: "Castillo de Arévalo",
    provincia: "Ávila",
    comunidad: "Castilla y León",
    categoria: "consolidado",
    estado: "conservado",
    estadoDescripcion: "Conservado y restaurado — sede del Museo del Cereal",
    descripcionBreve:
      "Imponente fortaleza mudéjar de planta poligonal en la confluencia de los ríos Adaja y Arevalillo, símbolo histórico de la villa de Arévalo.",
    imagen: arevalo,
    coordenadas: [41.069672, -4.720714],
    acceso: "interior",
    precio: "de-pago",
    historia:
      "El castillo de Arévalo es una de las grandes fortalezas castellanas, residencia ocasional de monarcas como Isabel la Católica, que pasó parte de su infancia en esta villa. De origen medieval y profundamente reformado en el siglo XV, destaca por su gran torre del homenaje cilíndrica y su recinto poligonal de sillería. Hoy alberga el Museo del Cereal.",
    cronologia: [
      { anio: "Siglo XIV", evento: "Construcción de la fortaleza primitiva." },
      { anio: "Siglo XV", evento: "Reformas mayores; residencia de Isabel la Católica en su infancia." },
      { anio: "1480", evento: "Aposento real durante los Reyes Católicos." },
      { anio: "Actualidad", evento: "Restaurado, alberga el Museo del Cereal." },
    ],
    curiosidades: [
      "La reina Isabel la Católica pasó parte de su niñez en este castillo.",
      "Su torre del homenaje cilíndrica es una de las más grandes y características de Castilla.",
    ],
    youtubeUrl: "https://youtu.be/-xMPweDBtmA",
  },
  {
    slug: "castillo-de-villalba",
    nombre: "Castillo de Villalba (Cebolla)",
    provincia: "Toledo",
    comunidad: "Castilla-La Mancha",
    categoria: "ruina-arqueologica",
    estado: "ruinas",
    ordenRuinas: 25,
    estadoDescripcion: "En ruinas — lienzos de muralla y restos de torres entre olivares",
    descripcionBreve:
      "Restos de una fortaleza extremeña inmersa en un mar de olivos, con poderosos lienzos de tapial que aún desafían el paso del tiempo.",
    imagen: villalba,
    coordenadas: [39.912106, -4.537592],
    acceso: "interior",
    precio: "gratuito",
    infoPractica: "Castillo en ruinas.",
    historia:
      "El castillo de Villalba se levantó como fortaleza señorial en la dehesa extremeña. De su conjunto se conservan grandes lienzos de muralla construidos en tapial y mampostería, así como los arranques de varias torres, testimonio de una arquitectura defensiva de gran porte hoy abrazada por el paisaje agrícola.",
    cronologia: [
      { anio: "Siglos XIII-XIV", evento: "Construcción como fortaleza señorial." },
      { anio: "Siglo XV", evento: "Ampliación de murallas y torres." },
      { anio: "Siglos XVII-XVIII", evento: "Abandono progresivo del recinto." },
      { anio: "Actualidad", evento: "Ruinas integradas en el paisaje de olivar." },
    ],
    curiosidades: [
      "Sus muros de tapial superan los seis metros de altura en algunos puntos.",
      "El castillo está rodeado por completo por un olivar centenario.",
    ],
    youtubeUrl: "https://youtu.be/GgsJAnvY3Vg",
  },
  {
    slug: "castillo-de-san-silvestre",
    nombre: "Castillo de San Silvestre",
    provincia: "Toledo",
    comunidad: "Castilla-La Mancha",
    categoria: "ruina-arqueologica",
    estado: "ruinas",
    ordenRuinas: 26,
    estadoDescripcion: "En ruinas parcialmente restauradas — recinto exterior y torres conservadas",
    descripcionBreve:
      "Fortaleza castellana en el despoblado de San Silvestre (término municipal de Toledo), con cubos circulares almenados sobre la llanura.",
    imagen: sanSilvestre,
    coordenadas: [40.068083, -4.305439],
    acceso: "exterior",
    precio: "gratuito",
    infoPractica: "Castillo en ruinas.",
    historia:
      "El castillo de San Silvestre destaca por su recinto poligonal reforzado con torres cilíndricas almenadas y una segunda línea defensiva. De origen bajomedieval, fue residencia señorial y plaza fuerte en la frontera interior castellana, conservando hoy gran parte de su perímetro amurallado.",
    cronologia: [
      { anio: "Siglo XV", evento: "Construcción del recinto poligonal con cubos." },
      { anio: "Siglo XVI", evento: "Reformas como residencia señorial." },
      { anio: "Siglos XVIII-XIX", evento: "Abandono y pérdida de cubiertas." },
      { anio: "Actualidad", evento: "Consolidación de torres y lienzos exteriores." },
    ],
    curiosidades: [
      "Sus cubos circulares almenados se cuentan entre los más fotogénicos de Castilla al atardecer.",
      "Conserva una doble línea de muralla, rara en castillos de su tamaño.",
    ],
    youtubeUrl: "https://youtu.be/IfAGbWYWf1E",
  },
  {
    slug: "castillo-de-almonacid-de-toledo",
    nombre: "Castillo de Almonacid de Toledo",
    provincia: "Toledo",
    comunidad: "Castilla-La Mancha",
    categoria: "semirruina",
    estado: "ruinas",
    ordenRuinas: 27,
    estadoDescripcion: "En ruinas — torre del homenaje y recinto amurallado conservados",
    descripcionBreve:
      "Fortaleza medieval encaramada sobre un cerro que domina la llanura toledana, escenario de la batalla de Almonacid de 1809.",
    imagen: almonacidDeToledo,
    coordenadas: [39.748736, -3.851814],
    acceso: "exterior",
    precio: "gratuito",
    infoPractica: "Castillo en ruinas.",
    historia:
      "De origen andalusí, el castillo de Almonacid de Toledo fue reconquistado por Alfonso VI y entregado a la mitra toledana. Su recinto se organiza en torno a una gran torre del homenaje central rodeada de un anillo amurallado con cubos. Fue parcialmente destruido durante la Guerra de la Independencia, tras la batalla de Almonacid de 1809.",
    cronologia: [
      { anio: "Siglos IX-X", evento: "Construcción andalusí original." },
      { anio: "1085", evento: "Reconquista por Alfonso VI." },
      { anio: "Siglos XIV-XV", evento: "Reformas bajo el señorío arzobispal de Toledo." },
      { anio: "1809", evento: "Daños graves durante la batalla de Almonacid." },
    ],
    curiosidades: [
      "Escenario de la batalla de Almonacid (1809), entre tropas francesas y españolas.",
      "Desde su torre central se domina toda la llanura agrícola del sur de Toledo.",
    ],
    youtubeUrl: "https://youtu.be/b1BqbMoEd0c",
  },
  {
    slug: "castillo-de-punoenrostro",
    nombre: "Castillo de Puñoenrostro",
    provincia: "Madrid",
    comunidad: "Comunidad de Madrid",
    categoria: "ruina-avanzada",
    estado: "ruinas",
    ordenRuinas: 28,
    estadoDescripcion: "En ruinas — torre del homenaje en pie y recinto amurallado conservado",
    descripcionBreve:
      "Imponente torre del homenaje con torreones cilíndricos adosados, vigía castellana sobre la campiña al sur de Madrid.",
    imagen: punoenrostro,
    coordenadas: [40.105872, -3.707317],
    acceso: "restringido",
    precio: "no-visitable",
    infoPractica: "Propiedad privada.",
    historia:
      "El castillo de Puñoenrostro, en término de Seseña, fue residencia de los condes de Puñoenrostro, linaje de los Arias Dávila. Su elemento más destacado es la torre del homenaje, de planta cuadrada con torreoncillos cilíndricos en las esquinas, rodeada por un recinto amurallado con cubos.",
    cronologia: [
      { anio: "Siglo XV", evento: "Construcción por los Arias Dávila, condes de Puñoenrostro." },
      { anio: "Siglo XVI", evento: "Reformas como residencia condal." },
      { anio: "Siglo XIX", evento: "Abandono tras la desamortización." },
      { anio: "Actualidad", evento: "Ruina consolidada visible desde la autovía A-4." },
    ],
    curiosidades: [
      "Sus torreoncillos cilíndricos en las esquinas de la torre del homenaje son únicos en la zona.",
      "Es visible a gran distancia desde la autovía de Andalucía.",
    ],
    youtubeUrl: "https://youtu.be/VTszsTetkuQ",
  },
  {
    slug: "castillo-de-pioz",
    nombre: "Castillo de Pioz",
    provincia: "Guadalajara",
    comunidad: "Castilla-La Mancha",
    categoria: "semirruina",
    estado: "ruinas",
    ordenRuinas: 29,
    estadoDescripcion: "En ruinas — recinto amurallado con cuatro torreones cilíndricos en pie",
    descripcionBreve:
      "Fortaleza atribuida a Juan Guas, con cuatro grandes torreones cilíndricos en las esquinas y muros de sillería caliza dorada.",
    imagen: pioz,
    coordenadas: [40.463567, -3.172744],
    acceso: "restringido",
    precio: "no-visitable",
    infoPractica: "Acceso restringido.",
    historia:
      "El castillo de Pioz, en la Alcarria, se atribuye a Juan Guas, arquitecto del gótico isabelino. De planta cuadrada con cuatro grandes torres cilíndricas en las esquinas, fue propiedad del Cardenal Mendoza. Su sillería caliza dorada lo convierte en uno de los castillos más fotografiados de Guadalajara pese a su estado de ruina.",
    cronologia: [
      { anio: "Siglo XV", evento: "Construcción atribuida a Juan Guas para el Cardenal Mendoza." },
      { anio: "Siglo XVI", evento: "Residencia señorial de los Mendoza." },
      { anio: "Siglos XIX-XX", evento: "Abandono y pérdida de cubiertas." },
      { anio: "Siglo XXI", evento: "Trabajos puntuales de consolidación." },
    ],
    curiosidades: [
      "Su arquitecto, Juan Guas, también diseñó el castillo de Manzanares el Real.",
      "Su sillería caliza dorada brilla espectacularmente al sol del atardecer.",
    ],
    youtubeUrl: "https://youtu.be/kFPQuG1_D9Y",
  },
  {
    slug: "castillo-de-fuentiduena-de-tajo",
    nombre: "Castillo de Fuentidueña de Tajo",
    provincia: "Madrid",
    comunidad: "Comunidad de Madrid",
    categoria: "ruina-arqueologica",
    estado: "ruinas",
    ordenRuinas: 30,
    estadoDescripcion: "En ruinas avanzadas — torre del homenaje y restos de tapial conservados",
    descripcionBreve:
      "Restos de una fortaleza musulmana sobre un cerro junto al Tajo, llave del paso entre Castilla y la Meseta sur.",
    imagen: fuentiduenaDeTajo,
    coordenadas: [40.121831, -3.163164],
    acceso: "exterior",
    precio: "gratuito",
    infoPractica: "Castillo en ruinas.",
    historia:
      "El castillo de Fuentidueña de Tajo, de origen andalusí, se erige sobre un cerro estratégico junto al río Tajo. Conserva grandes paños de tapial agujereados por mechinales y los restos de su torre del homenaje. Controló durante siglos el vado y la frontera oriental del antiguo reino de Toledo.",
    cronologia: [
      { anio: "Siglos IX-X", evento: "Construcción andalusí." },
      { anio: "Siglo XII", evento: "Reconquista cristiana y reformas." },
      { anio: "Siglo XIV", evento: "Encomienda de la Orden de Santiago." },
      { anio: "Siglos XVII-XVIII", evento: "Abandono progresivo." },
    ],
    curiosidades: [
      "Los mechinales de su tapial atestiguan la técnica constructiva musulmana original.",
      "Su silueta recortada es uno de los hitos visuales del valle del Tajo madrileño.",
    ],
    youtubeUrl: "https://youtu.be/lcyTJLA0KEQ",
  },
  {
    slug: "castillo-de-galve-de-sorbe",
    nombre: "Castillo de Galve de Sorbe",
    provincia: "Guadalajara",
    comunidad: "Castilla-La Mancha",
    categoria: "consolidado",
    estado: "ruinas",
    ordenRuinas: 31,
    estadoDescripcion: "Conservado parcialmente — torre del homenaje y recinto en pie",
    descripcionBreve:
      "Fortaleza señorial en plena Sierra Norte de Guadalajara, con poderosa torre del homenaje sobre praderas de alta montaña.",
    imagen: galveDeSorbe,
    coordenadas: [41.226983, -3.186208],
    acceso: "exterior",
    precio: "gratuito",
    infoPractica: "Acceso limitado al exterior.",
    historia:
      "El castillo de Galve de Sorbe, situado a más de 1.200 m de altitud en la Sierra de Ayllón, perteneció a los Estúñiga y posteriormente a los duques del Infantado. Su gran torre del homenaje almenada domina un pequeño recinto amurallado, en uno de los entornos paisajísticos más singulares de Castilla.",
    cronologia: [
      { anio: "Siglo XIV", evento: "Construcción por el linaje de los Estúñiga." },
      { anio: "Siglo XV", evento: "Reformas bajo los duques del Infantado." },
      { anio: "Siglos XVIII-XIX", evento: "Abandono progresivo." },
      { anio: "Siglo XXI", evento: "Restauración parcial del recinto." },
    ],
    curiosidades: [
      "Es uno de los castillos a mayor altitud de la Comunidad de Castilla-La Mancha.",
      "Su entorno se cubre de nieve cada invierno, ofreciendo estampas únicas.",
    ],
    youtubeUrl: "https://youtu.be/2jQDxxrJc6U",
  },
  {
    slug: "castillo-de-bairen",
    nombre: "Castillo de Bairén",
    provincia: "Valencia",
    comunidad: "Comunidad Valenciana",
    categoria: "semirruina",
    estado: "ruinas",
    ordenRuinas: 32,
    estadoDescripcion: "En ruinas consolidadas — recinto musealizado y visitable",
    descripcionBreve:
      "Fortaleza andalusí sobre el monte Montdúver, escenario de la legendaria batalla en la que combatió El Cid en 1097.",
    imagen: bairen,
    coordenadas: [38.995506, -0.185931],
    acceso: "interior",
    precio: "gratuito",
    infoPractica: "Castillo en ruinas.",
    historia:
      "El castillo de Bairén, en Gandía, fue una de las fortalezas andalusíes más importantes de la costa valenciana. En 1097 fue escenario de una célebre batalla en la que El Cid Campeador derrotó a las tropas almorávides. Tras la conquista de Jaime I, perdió importancia y fue abandonado, conservándose hoy un amplio recinto musealizado.",
    cronologia: [
      { anio: "Siglos X-XI", evento: "Construcción de la fortaleza andalusí." },
      { anio: "1097", evento: "Batalla de Bairén; victoria de El Cid sobre los almorávides." },
      { anio: "1240", evento: "Conquista por Jaime I de Aragón." },
      { anio: "Siglo XXI", evento: "Excavación arqueológica y musealización del conjunto." },
    ],
    curiosidades: [
      "Fue escenario de una victoria de El Cid Campeador en 1097.",
      "Sus excavaciones han revelado aljibes, hornos y una mezquita interior.",
    ],
    youtubeUrl: "https://youtu.be/u4GPaiII7Ec",
  },
  {
    slug: "castillo-de-chinchon",
    nombre: "Castillo de los Condes (Chinchón)",
    provincia: "Madrid",
    comunidad: "Comunidad de Madrid",
    categoria: "consolidado",
    estado: "conservado",
    estadoDescripcion: "Conservado — propiedad privada, exteriores visitables",
    descripcionBreve:
      "Fortaleza renacentista de los condes de Chinchón, con planta cuadrada, bastiones angulares y foso, junto a los restos del castillo medieval.",
    imagen: chinchon,
    coordenadas: [40.136353, -3.424247],
    acceso: "exterior",
    precio: "gratuito",
    infoPractica: "No es posible acceder al interior.",
    historia:
      "El llamado Castillo Nuevo de Chinchón, o Castillo de los Condes, fue construido en el siglo XVI por los condes de Chinchón como nueva sede señorial tras la destrucción del castillo medieval anterior en la guerra de las Comunidades. De planta cuadrada con bastiones en las esquinas y rodeado por un foso, es un excelente ejemplo de arquitectura militar de transición.",
    cronologia: [
      { anio: "1520", evento: "Destrucción del castillo medieval durante las Comunidades." },
      { anio: "Siglo XVI", evento: "Construcción del nuevo castillo por los condes de Chinchón." },
      { anio: "1808", evento: "Incendio durante la Guerra de la Independencia." },
      { anio: "Actualidad", evento: "Propiedad privada; exteriores accesibles." },
    ],
    curiosidades: [
      "Sus bastiones angulares lo convierten en un raro ejemplo de fortificación abaluartada temprana.",
      "Junto al castillo nuevo perviven aún restos de la torre del antiguo castillo medieval.",
    ],
    youtubeUrl: "https://youtu.be/SMaBqz4T-C8",
  },
  {
    slug: "castillo-de-penafiel",
    nombre: "Castillo de Peñafiel",
    provincia: "Valladolid",
    comunidad: "Castilla y León",
    categoria: "conservado",
    estado: "conservado",
    estadoDescripcion: "Excelente estado — sede del Museo Provincial del Vino",
    descripcionBreve:
      "Fortaleza alargada en forma de barco sobre un cerro, símbolo de la Ribera del Duero y hoy Museo Provincial del Vino.",
    imagen: penafiel,
    coordenadas: [41.596783, -4.114247],
    acceso: "interior",
    precio: "de-pago",
    historia:
      "El castillo de Peñafiel, con su característica planta alargada en forma de barco, se extiende a lo largo de más de 200 metros sobre un cerro que domina la villa y la Ribera del Duero. Levantado entre los siglos X y XV, fue residencia de don Juan Manuel, autor de El Conde Lucanor, y hoy alberga el Museo Provincial del Vino.",
    cronologia: [
      { anio: "Siglo X", evento: "Primera fortificación condal." },
      { anio: "Siglo XIV", evento: "Residencia de don Juan Manuel, autor de El Conde Lucanor." },
      { anio: "Siglo XV", evento: "Reconstrucción definitiva bajo los Téllez-Girón." },
      { anio: "Actualidad", evento: "Alberga el Museo Provincial del Vino de Valladolid." },
    ],
    curiosidades: [
      "Su planta en forma de barco se extiende más de 200 metros de longitud.",
      "Don Juan Manuel escribió aquí buena parte de El Conde Lucanor.",
      "Es el corazón simbólico de la Denominación de Origen Ribera del Duero.",
    ],
    youtubeUrl: "https://youtu.be/CJH_bKvXR0g",
  },
];

export const getCastilloBySlug = (slug: string) =>
  CASTILLOS.find((c) => c.slug === slug);

export const getCastillosConservados = () =>
  CASTILLOS.filter((c) => c.estado === "conservado");

export const getCastillosEnRuinas = () =>
  CASTILLOS.filter((c) => c.estado === "ruinas").sort(
    (a, b) => (a.ordenRuinas ?? 99) - (b.ordenRuinas ?? 99),
  );

export const getCastillosByCategoria = (cat: CategoriaCastillo) =>
  CASTILLOS.filter((c) => c.categoria === cat).sort((a, b) =>
    a.nombre.localeCompare(b.nombre, "es"),
  );

export const countByCategoria = (cat: CategoriaCastillo) =>
  CASTILLOS.filter((c) => c.categoria === cat).length;

/**
 * Normaliza enlaces youtu.be → youtube.com/watch?v=ID para evitar
 * problemas de ERR_BLOCKED_BY_RESPONSE y forzar apertura limpia en nueva pestaña.
 */
export const toYoutubeWatchUrl = (url?: string): string | undefined => {
  if (!url) return undefined;
  const m = url.match(/youtu\.be\/([\w-]+)/);
  if (m) return `https://www.youtube.com/watch?v=${m[1]}`;
  return url;
};

/**
 * Devuelve true si el castillo se publicó hace menos de 20 días.
 * Sólo los castillos con fechaPublicacion definida pueden considerarse "nuevos".
 */
export const NUEVO_DIAS = 20;
export const esCastilloNuevo = (c: Castillo): boolean => {
  if (!c.fechaPublicacion) return false;
  const d = new Date(c.fechaPublicacion);
  if (Number.isNaN(d.getTime())) return false;
  const ahora = Date.now();
  const diff = (ahora - d.getTime()) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= NUEVO_DIAS;
};

/** Lista única y ordenada de provincias presentes en el catálogo. */
export const getProvincias = (): string[] =>
  Array.from(new Set(CASTILLOS.map((c) => c.provincia))).sort((a, b) =>
    a.localeCompare(b, "es"),
  );

/**
 * URL de Google Maps para indicaciones desde la ubicación actual del usuario
 * hasta las coordenadas exactas del castillo. Funciona en móvil, tablet y
 * ordenador y se abre en una nueva pestaña.
 */
export const getDireccionesUrl = (c: Castillo): string => {
  const [lat, lng] = c.coordenadas;
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
};