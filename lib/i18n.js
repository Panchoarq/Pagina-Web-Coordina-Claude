export const LOCALES = ["es", "en"];
export const DEFAULT_LOCALE = "es";

export function isLocale(x) {
  return LOCALES.includes(x);
}

const DICT = {
  es: {
    htmlLang: "es",
    meta: {
      title: "coordina BIM Consulting — Coordinación BIM",
      description:
        "Asesores BIM para arquitectura, MEP y estructura: estándares, modelado, coordinación, detección de conflictos y as-built a lo largo de todo el ciclo de diseño y obra. Santiago, Chile.",
    },
    nav: {
      projects: "Proyectos",
      services: "Servicios",
      studio: "Estudio",
      contact: "Contacto",
    },
    hero: {
      index: "Índice 01",
      title: "Coordinación BIM.",
      lead:
        "Modelamos y coordinamos digitalmente edificios e infraestructura antes de construir — detectando y resolviendo los conflictos entre especialidades en el modelo, no en la obra.",
      cta: "Ver proyectos",
      ctaServices: "Servicios",
      featuring: "En pantalla",
      reloadHint: "Recarga para otro proyecto",
    },
    about: {
      index: "Índice 02",
      title: "Qué hacemos",
      body:
        "coordina BIM Consulting nace como oficina de diseño y, a lo largo de más de 33 años de trayectoria, evoluciona hacia una consultora especializada en asesorías BIM para proyectos de arquitectura e ingeniería en todas sus etapas. No diseñamos arquitectura ni construimos: somos la capa de coordinación digital entre las oficinas de proyecto y la constructora.",
      landmark:
        "Modelos iniciales del Aeropuerto Internacional de Santiago · As-Built del Centro Cultural GAM (Etapa 2) · política BIM del Banco Central para el proyecto Central de Efectivo · hospitales de alta complejidad a lo largo de Chile.",
    },
    stats: {
      index: "Índice 03",
      title: "Cifras",
      note: "Proyectos y m² se leen en vivo desde el portafolio publicado.",
      items: [
        { key: "years", value: 33, suffix: "", label: "Años de trayectoria" },
        { key: "bim", value: 22, suffix: "", label: "Años dedicados a BIM" },
        { key: "coord", value: 18, suffix: "", label: "Años en coordinación" },
        { key: "sqm", value: 1900000, suffix: "", label: "m² modelados (histórico)" },
      ],
      liveProjects: "Proyectos publicados",
      liveArea: "m² en portafolio",
    },
    services: {
      index: "Índice 04",
      title: "Servicios",
      subtitle: "Ocho líneas de trabajo integradas bajo una sola metodología.",
      software: "Software",
      softwareValue: "Revit · Navisworks (Autodesk)",
    },
    projects: {
      index: "Índice 05",
      title: "Proyectos",
      subtitle:
        "Diez tipologías. Cada una con sus propios desafíos de coordinación.",
      all: "Todas",
      allServices: "Todos los servicios",
      filterTypology: "Tipología",
      filterService: "Servicio",
      empty: "No hay proyectos con estos filtros.",
      view: "Ver ficha",
      viewAll: "Ver todos los proyectos",
      count: (n) => `${n} ${n === 1 ? "proyecto" : "proyectos"}`,
    },
    studio: {
      index: "Índice 06",
      title: "Estudio",
      body:
        "Equipo con 33 años de experiencia profesional acumulada, ~22 vinculados al mundo BIM y ~18 dedicados específicamente a coordinación. Diseñamos y construimos proyectos antes de especializarnos: ese criterio constructivo es lo que nos permite anticipar problemas reales de obra, no sólo de software.",
      clientsTitle: "Mandantes",
      clients: [
        "Concesionaria Sacyr",
        "Icafal",
        "Banco Central de Chile",
        "Bbats Consulting & Projects",
        "Rentas Falabella",
        "BAU Ingenieros Consultores",
        "Cecilia Puga · Paula Velasco",
        "Alberto Moletto Arquitectos",
        "TORUM",
        "Real Assets",
      ],
      location: "Santiago, Chile — proyectos a lo largo de todo el país.",
    },
    contact: {
      index: "Índice 07",
      title: "Partamos el proyecto",
      body:
        "Cuéntanos qué estás coordinando. Respondemos en 24 horas hábiles.",
      email: "contacto@coordinabimconsulting.com",
      cta: "Escribir un correo",
    },
    footer: {
      rights: "Santiago de Chile — Coordinación BIM",
      source: "Portafolio servido en vivo desde Airtable.",
    },
    sheet: {
      code: "Código",
      name: "Proyecto",
      client: "Mandante",
      location: "Ubicación",
      year: "Año",
      area: "Superficie",
      typology: "Tipología",
      services: "Servicios",
      status: "Estado",
      software: "Software",
      photos: "Fotografías",
      back: "Volver a proyectos",
      noImages: "Sin fotografías disponibles para este proyecto.",
      esOnly: "Contenido en español",
    },
  },

  en: {
    htmlLang: "en",
    meta: {
      title: "coordina BIM Consulting — BIM Coordination",
      description:
        "BIM advisors for architecture, MEP and structure: standards, modeling, coordination, clash detection and as-built across the full design-to-construction cycle. Santiago, Chile.",
    },
    nav: {
      projects: "Projects",
      services: "Services",
      studio: "Studio",
      contact: "Contact",
    },
    hero: {
      index: "Index 01",
      title: "BIM Coordination.",
      lead:
        "We digitally model and coordinate buildings and infrastructure before construction — detecting and resolving clashes between disciplines in the model, not on site.",
      cta: "See projects",
      ctaServices: "Services",
      featuring: "On screen",
      reloadHint: "Reload for another project",
    },
    about: {
      index: "Index 02",
      title: "What we do",
      body:
        "coordina BIM Consulting began as a design office and, over more than 33 years, evolved into a firm specialized in BIM advisory for architecture and engineering projects at every stage. We don't design architecture or build: we are the digital coordination layer between the design offices and the contractor.",
      landmark:
        "Initial models for Santiago International Airport · As-Built of the GAM Cultural Center (Stage 2) · Central Bank of Chile BIM policy for the Central de Efectivo project · high-complexity hospitals across Chile.",
    },
    stats: {
      index: "Index 03",
      title: "Numbers",
      note: "Projects and m² are read live from the published portfolio.",
      items: [
        { key: "years", value: 33, suffix: "", label: "Years of practice" },
        { key: "bim", value: 22, suffix: "", label: "Years focused on BIM" },
        { key: "coord", value: 18, suffix: "", label: "Years in coordination" },
        { key: "sqm", value: 1900000, suffix: "", label: "m² modeled (all-time)" },
      ],
      liveProjects: "Published projects",
      liveArea: "m² in portfolio",
    },
    services: {
      index: "Index 04",
      title: "Services",
      subtitle: "Eight service lines integrated under a single methodology.",
      software: "Software",
      softwareValue: "Revit · Navisworks (Autodesk)",
    },
    projects: {
      index: "Index 05",
      title: "Projects",
      subtitle: "Ten typologies. Each with its own coordination challenges.",
      all: "All",
      allServices: "All services",
      filterTypology: "Typology",
      filterService: "Service",
      empty: "No projects match these filters.",
      view: "Open sheet",
      viewAll: "See all projects",
      count: (n) => `${n} ${n === 1 ? "project" : "projects"}`,
    },
    studio: {
      index: "Index 06",
      title: "Studio",
      body:
        "A team with 33 years of accumulated professional experience, ~22 tied to BIM and ~18 dedicated specifically to coordination. We designed and built projects before specializing: that constructive judgment is what lets us anticipate real site problems, not just software ones.",
      clientsTitle: "Clients",
      clients: [
        "Concesionaria Sacyr",
        "Icafal",
        "Central Bank of Chile",
        "Bbats Consulting & Projects",
        "Rentas Falabella",
        "BAU Ingenieros Consultores",
        "Cecilia Puga · Paula Velasco",
        "Alberto Moletto Arquitectos",
        "TORUM",
        "Real Assets",
      ],
      location: "Santiago, Chile — projects across the whole country.",
    },
    contact: {
      index: "Index 07",
      title: "Let's start the project",
      body: "Tell us what you're coordinating. We reply within 24 business hours.",
      email: "contacto@coordinabimconsulting.com",
      cta: "Send an email",
    },
    footer: {
      rights: "Santiago, Chile — BIM Coordination",
      source: "Portfolio served live from Airtable.",
    },
    sheet: {
      code: "Code",
      name: "Project",
      client: "Client",
      location: "Location",
      year: "Year",
      area: "Area",
      typology: "Typology",
      services: "Services",
      status: "Status",
      software: "Software",
      photos: "Photos",
      back: "Back to projects",
      noImages: "No photos available for this project.",
      esOnly: "Content in Spanish",
    },
  },
};

export const SERVICES = [
  {
    num: "01",
    es: "Asesoría BIM",
    en: "BIM Advisory",
    body_es:
      "Acompañamiento a empresas en sus procesos BIM: desde la definición de objetivos y estándares hasta los roles de Gestión BIM y BIM Manager dentro de la organización. Incluye revisión de modelos y entregables, validando cumplimiento y calidad antes de avanzar.",
    body_en:
      "Support for companies across their BIM processes: from defining goals and standards to BIM Management and BIM Manager roles inside the organization. Includes review of models and deliverables, validating compliance and quality before moving forward.",
  },
  {
    num: "02",
    es: "Modelado BIM — Arquitectura / MEP / Civil",
    en: "BIM Modeling — Architecture / MEP / Civil",
    body_es:
      "Modelos LOD 200 a 400, multidisciplina, federados y auditados. Se ejecuta como parte de un encargo de coordinación —asumiendo todas las especialidades— o como encargo puntual de una sola.",
    body_en:
      "LOD 200 to 400 models, multi-discipline, federated and audited. Delivered as part of a coordination engagement —covering every discipline— or as a single-discipline commission.",
  },
  {
    num: "03",
    es: "Detección de conflictos",
    en: "Clash detection",
    body_es:
      "Metodología propia para registrar y documentar sistemáticamente los puntos de conflicto entre especialidades, con documentación planimétrica del resultado final coordinado.",
    body_en:
      "In-house methodology to systematically log and document clash points between disciplines, with drawing-level documentation of the final coordinated result.",
  },
  {
    num: "04",
    es: "Coordinación BIM",
    en: "BIM Coordination",
    body_es:
      "Actuamos como asesores y coordinadores generales del proyecto, integrando en un entorno común de datos los modelos de las distintas especialidades y resolviendo los conflictos directamente en el modelo.",
    body_en:
      "We act as the project's general advisors and coordinators, integrating every discipline's models in a common data environment and resolving clashes directly in the model.",
  },
  {
    num: "05",
    es: "Cubicaciones y cantidades",
    en: "Quantities & takeoffs",
    body_es:
      "Modelos orientados a cubicación, con un nivel de detalle constructivo muy preciso que refleja fielmente cada elemento a cuantificar. Control de partidas y presupuestos desde el modelo.",
    body_en:
      "Models built for quantity takeoff, with high constructive detail that faithfully reflects every element to be measured. Cost-line and budget control straight from the model.",
  },
  {
    num: "06",
    es: "Escaneo láser 3D",
    en: "3D Laser Scanning",
    body_es:
      "Escáner láser móvil y estático, de largo alcance y alta precisión, con experiencia en levantamientos de aeropuertos, hospitales y edificios de distinta categoría. Cada levantamiento se planifica pensando en el modelado posterior.",
    body_en:
      "Mobile and static laser scanning, long-range and high-precision, with experience surveying airports, hospitals and buildings of every category. Each survey is planned around the modeling that follows.",
  },
  {
    num: "07",
    es: "Modelos As-Built",
    en: "As-Built Models",
    body_es:
      "Generación de información As-Built —modelos y planos— a partir de levantamientos con escáner láser. Casos emblemáticos: Aeropuerto Internacional de Santiago y Teatro GAM Etapa 2.",
    body_en:
      "As-Built information —models and drawings— generated from laser-scan surveys. Landmark cases: Santiago International Airport and GAM Theatre Stage 2.",
  },
  {
    num: "08",
    es: "Soporte en terreno",
    en: "On-site Support",
    body_es:
      "Asesoría remota o con personal instalado en obra, para el seguimiento de los modelos de coordinación y la resolución de los problemas que surgen día a día.",
    body_en:
      "Remote support or staff embedded on site, tracking the coordination models and resolving the issues that come up day to day.",
  },
];

export function getDict(locale) {
  return DICT[isLocale(locale) ? locale : DEFAULT_LOCALE];
}

export function typologyLabel(typologies, id, locale) {
  const t = typologies.find((x) => x.id === id);
  return t ? t[isLocale(locale) ? locale : "es"] : id;
}
