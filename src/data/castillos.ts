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

export type EstadoCastillo = "conservado" | "ruinas";

export interface CronologiaEvento {
  anio: string;
  evento: string;
}

export interface Castillo {
  slug: string;
  nombre: string;
  provincia: string;
  comunidad: string;
  estado: EstadoCastillo;
  estadoDescripcion: string;
  descripcionBreve: string;
  imagen: string;
  galeria?: string[];
  coordenadas: [number, number];
  historia: string;
  cronologia: CronologiaEvento[];
  curiosidades: string[];
  youtubeId?: string;
  ordenRuinas?: number;
}

export const CASTILLOS: Castillo[] = [
  // RUINAS — orden definido por el usuario
  {
    slug: "castillo-de-aulencia",
    nombre: "Castillo de Aulencia",
    provincia: "Madrid",
    comunidad: "Comunidad de Madrid",
    estado: "ruinas",
    ordenRuinas: 1,
    estadoDescripcion: "En ruinas — torre del homenaje parcialmente en pie",
    descripcionBreve:
      "Fortaleza medieval sobre el valle del río Aulencia, testigo solitario de las tierras altas de Villanueva de la Cañada.",
    imagen: aulencia,
    coordenadas: [40.4515, -3.9920],
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
  },
  {
    slug: "castillo-de-gormaz",
    nombre: "Castillo de Gormaz",
    provincia: "Soria",
    comunidad: "Castilla y León",
    estado: "ruinas",
    ordenRuinas: 2,
    estadoDescripcion: "En ruinas — recinto amurallado conservado en gran extensión",
    descripcionBreve:
      "La mayor fortaleza califal de Europa, una muralla interminable suspendida sobre el Duero.",
    imagen: gormaz,
    coordenadas: [41.5083, -3.0042],
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
  },
  {
    slug: "castillo-de-jadraque",
    nombre: "Castillo de Jadraque",
    provincia: "Guadalajara",
    comunidad: "Castilla-La Mancha",
    estado: "ruinas",
    ordenRuinas: 3,
    estadoDescripcion: "En ruinas consolidadas — restaurado parcialmente",
    descripcionBreve:
      "El llamado «Castillo del Cid» se alza sobre un cerro perfecto, dominando la vega del Henares.",
    imagen: jadraque,
    coordenadas: [40.9239, -2.9242],
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
  },
  {
    slug: "castillo-de-berlanga-de-duero",
    nombre: "Castillo de Berlanga de Duero",
    provincia: "Soria",
    comunidad: "Castilla y León",
    estado: "ruinas",
    ordenRuinas: 4,
    estadoDescripcion: "En ruinas — murallas y torreones bien conservados",
    descripcionBreve:
      "Imponente fortaleza renacentista con doble recinto amurallado abrazando la villa medieval.",
    imagen: berlanga,
    coordenadas: [41.4708, -2.8569],
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
  },
  {
    slug: "castillo-de-castrojeriz",
    nombre: "Castillo de Castrojeriz",
    provincia: "Burgos",
    comunidad: "Castilla y León",
    estado: "ruinas",
    ordenRuinas: 5,
    estadoDescripcion: "En ruinas — torres y lienzos parcialmente restaurados",
    descripcionBreve:
      "Atalaya del Camino de Santiago, vigía de la Tierra de Campos sobre un cerro testigo.",
    imagen: castrojeriz,
    coordenadas: [42.2900, -4.1369],
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
  },
  {
    slug: "castillo-de-forna",
    nombre: "Castillo de Forna",
    provincia: "Alicante",
    comunidad: "Comunidad Valenciana",
    estado: "ruinas",
    ordenRuinas: 6,
    estadoDescripcion: "Conservado en parte — almenas y torres restauradas",
    descripcionBreve:
      "Fortaleza palacio de origen árabe en el corazón de la Marina Alta valenciana.",
    imagen: forna,
    coordenadas: [38.8086, -0.0758],
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
  },

  // CONSERVADOS
  {
    slug: "castillo-de-manzanares-el-real",
    nombre: "Castillo de Manzanares el Real",
    provincia: "Madrid",
    comunidad: "Comunidad de Madrid",
    estado: "conservado",
    estadoDescripcion: "Excelente estado — visitable",
    descripcionBreve:
      "Joya del gótico militar castellano, palacio-fortaleza de los Mendoza al pie de La Pedriza.",
    imagen: manzanares,
    coordenadas: [40.7269, -3.8628],
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
  },
  {
    slug: "castillo-de-guadamur",
    nombre: "Castillo de Guadamur",
    provincia: "Toledo",
    comunidad: "Castilla-La Mancha",
    estado: "conservado",
    estadoDescripcion: "Excelente estado — propiedad privada visitable",
    descripcionBreve:
      "Fortaleza señorial del siglo XV, una de las más bellas y completas de Castilla.",
    imagen: guadamur,
    coordenadas: [39.8047, -4.1486],
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
  },
  {
    slug: "castillo-de-consuegra",
    nombre: "Castillo de Consuegra",
    provincia: "Toledo",
    comunidad: "Castilla-La Mancha",
    estado: "conservado",
    estadoDescripcion: "Restaurado — visitable",
    descripcionBreve:
      "Fortaleza de la Orden de San Juan, dominando la llanura manchega junto a los míticos molinos.",
    imagen: consuegra,
    coordenadas: [39.4581, -3.6086],
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
  },
  {
    slug: "castillo-de-cullera",
    nombre: "Castillo de Cullera",
    provincia: "Valencia",
    comunidad: "Comunidad Valenciana",
    estado: "conservado",
    estadoDescripcion: "Restaurado — visitable",
    descripcionBreve:
      "Fortaleza andalusí sobre el monte de las Raboses, vigilando la desembocadura del Júcar.",
    imagen: cullera,
    coordenadas: [39.1647, -0.2519],
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

export const YOUTUBE_URL = "https://www.youtube.com/@Kdronazo";