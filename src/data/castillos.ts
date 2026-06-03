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
import heroImg from "@/assets/hero-kdronazo.jpg";

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
  youtubeUrl?: string;
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
    youtubeUrl: "https://youtu.be/gLzEM43MoDs",
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
    youtubeUrl: "https://youtu.be/41pA4KYrEvo",
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
    youtubeUrl: "https://youtu.be/ZAI_rgcgEpg",
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
    youtubeUrl: "https://youtu.be/8dw4ZnMqFWg",
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
    youtubeUrl: "https://youtu.be/4E27yWWQtNI",
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
    youtubeUrl: "https://youtu.be/zNy1cBsX1e0",
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
    youtubeUrl: "https://youtu.be/6aH_eW3E0Vw",
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
    youtubeUrl: "https://youtu.be/7nbJBSzW4jA",
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
    youtubeUrl: "https://youtu.be/usZiTAvZjjw",
  },
  {
    slug: "castillo-de-san-servando",
    nombre: "Castillo de San Servando",
    provincia: "Toledo",
    comunidad: "Castilla-La Mancha",
    estado: "conservado",
    estadoDescripcion: "Restaurado — alberga albergue juvenil",
    descripcionBreve:
      "Fortaleza mudéjar a las puertas de Toledo, vigía perpetuo del Tajo frente al Alcázar.",
    imagen: sanServando,
    coordenadas: [39.8580, -4.0167],
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
    estado: "conservado",
    estadoDescripcion: "Restaurado — alberga el Museo del Viaje a la Alcarria",
    descripcionBreve:
      "Fortaleza templaria de planta cuadrada, hoy sede del museo dedicado al viaje cervantino de Cela.",
    imagen: torija,
    coordenadas: [40.7458, -3.0392],
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
    estado: "conservado",
    estadoDescripcion: "Excelente estado — visitable",
    descripcionBreve:
      "Palacio-fortaleza de los duques de Alburquerque, mezcla de gótico, mudéjar y renacimiento.",
    imagen: cuellar,
    coordenadas: [41.4011, -4.3144],
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
    estado: "conservado",
    estadoDescripcion: "Excelente estado — propiedad privada",
    descripcionBreve:
      "Singular fortaleza-palacio de origen árabe sobre el Tajo, con perfil neogótico restaurado.",
    imagen: malpica,
    coordenadas: [39.8911, -4.5267],
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
    estado: "conservado",
    estadoDescripcion: "Buen estado — restaurado",
    descripcionBreve:
      "Fortaleza califal de muralla almenada, una de las más imponentes del valle del Tajo.",
    imagen: maqueda,
    coordenadas: [40.0697, -4.3736],
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
    estado: "ruinas",
    estadoDescripcion: "En ruinas — recinto exterior y torre conservados",
    descripcionBreve:
      "Antiguo bastión de Don Álvaro de Luna sobre el río Alberche, escenario de su caída política.",
    imagen: escalona,
    coordenadas: [40.1700, -4.4036],
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
    estado: "ruinas",
    estadoDescripcion: "En ruinas — torre del homenaje en restauración",
    descripcionBreve:
      "Atalaya rocosa en los Montes de Toledo, suspendida entre la niebla y la Mancha.",
    imagen: penasNegras,
    coordenadas: [39.6750, -3.7700],
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
    estado: "conservado",
    estadoDescripcion: "Excelente estado — visitable",
    descripcionBreve:
      "Imponente fortaleza de ladrillo mudéjar en Medina del Campo, prisión de César Borgia.",
    imagen: laMota,
    coordenadas: [41.3142, -4.9067],
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
    provincia: "Ávila",
    comunidad: "Castilla y León",
    estado: "conservado",
    estadoDescripcion: "Restaurado — visitable",
    descripcionBreve:
      "Fortaleza granítica de Don Álvaro de Luna en San Martín de Valdeiglesias, al pie de Gredos.",
    imagen: laCoracera,
    coordenadas: [40.3536, -4.4039],
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
    estado: "conservado",
    estadoDescripcion: "Restaurado — sede del Archivo Histórico del Ejército del Aire",
    descripcionBreve:
      "Fortaleza palaciega del siglo XV reconstruida tras un incendio, hoy archivo militar en plena sierra oeste madrileña.",
    imagen: villaviciosaOdon,
    coordenadas: [40.3572, -3.9028],
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
    provincia: "Toledo",
    comunidad: "Castilla-La Mancha",
    estado: "conservado",
    estadoDescripcion: "Restaurado — visitable como centro cultural",
    descripcionBreve:
      "Pequeña fortaleza señorial en Las Navas del Marqués, hoy reconvertida en residencia y centro de actividades.",
    imagen: magalia,
    coordenadas: [40.6053, -4.3439],
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
    estado: "conservado",
    estadoDescripcion: "Excelente estado — visitable",
    descripcionBreve:
      "El alcázar de los reyes de Castilla, proa de piedra sobre la confluencia del Eresma y el Clamores.",
    imagen: alcazarSegovia,
    coordenadas: [40.9527, -4.1325],
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
    provincia: "Cuenca",
    comunidad: "Castilla-La Mancha",
    estado: "ruinas",
    ordenRuinas: 20,
    estadoDescripcion: "En ruinas — torre cilíndrica y lienzos de muralla en pie sobre cerro testigo",
    descripcionBreve:
      "Fortaleza solitaria encaramada en un cerro testigo de la Manchuela, vigía silencioso sobre un paisaje infinito de campos y barrancos.",
    imagen: monreal,
    coordenadas: [39.9333, -2.2667],
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
  },
  {
    slug: "castillo-de-puebla-de-almenara",
    nombre: "Castillo de Puebla de Almenara",
    provincia: "Cuenca",
    comunidad: "Castilla-La Mancha",
    estado: "ruinas",
    ordenRuinas: 21,
    estadoDescripcion: "En ruinas — torre del homenaje, barbacana y cubos de muralla conservados",
    descripcionBreve:
      "Imponente fortaleza señorial de la Orden de Santiago, dominando la llanura conquense con su poderosa torre del homenaje y su recinto amurallado.",
    imagen: pueblaAlmenara,
    coordenadas: [39.7833, -2.7167],
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
  },
  {
    slug: "castillo-de-oreja",
    nombre: "Castillo de Oreja",
    provincia: "Toledo",
    comunidad: "Castilla-La Mancha",
    estado: "ruinas",
    ordenRuinas: 22,
    estadoDescripcion: "En ruinas — torre del homenaje en pie sobre los cortados del Tajo",
    descripcionBreve:
      "Fortaleza medieval colgada sobre los cortados del río Tajo, llave estratégica entre Toledo y la meseta sur durante la Reconquista.",
    imagen: oreja,
    coordenadas: [39.9667, -3.5167],
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
  },
  {
    slug: "castillo-de-lujan",
    nombre: "Castillo de Luján",
    provincia: "Guadalajara",
    comunidad: "Castilla-La Mancha",
    estado: "ruinas",
    ordenRuinas: 23,
    estadoDescripcion: "En ruinas parcialmente restauradas — recinto amurallado con torres y almenas reconstruidas",
    descripcionBreve:
      "Fortaleza señorial de la familia Luján, con su característica torre albarrana y un recinto amurallado parcialmente recuperado en el corazón de la Alcarria.",
    imagen: lujan,
    coordenadas: [40.7167, -2.9000],
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
  },
  {
    slug: "castillo-de-arevalo",
    nombre: "Castillo de Arévalo",
    provincia: "Ávila",
    comunidad: "Castilla y León",
    estado: "conservado",
    estadoDescripcion: "Conservado y restaurado — sede del Museo del Cereal",
    descripcionBreve:
      "Imponente fortaleza mudéjar de planta poligonal en la confluencia de los ríos Adaja y Arevalillo, símbolo histórico de la villa de Arévalo.",
    imagen: arevalo,
    coordenadas: [41.0667, -4.7167],
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