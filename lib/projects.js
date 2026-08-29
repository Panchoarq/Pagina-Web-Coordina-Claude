// Set de muestra (8 proyectos, uno por tipologia) para poblar el sitio
// mientras se conecta Airtable real. Datos tomados de coordina-proyectos.json.
// Fotos: picsum con seed descriptivo hasta tener las imagenes reales de
// cada proyecto.
function withMedia(p) {
  const seed = p.slug;
  return {
    ...p,
    image: p.image || `https://picsum.photos/seed/${seed}/1200/900`,
    heroImage: p.heroImage || p.image || `https://picsum.photos/seed/${seed}-hero/1600/1000`,
    plans: p.plans || [
      { src: p.image || `https://picsum.photos/seed/${seed}-plan1/1600/1000`, label: "Modelo federado — vista general" },
      { src: `https://picsum.photos/seed/${seed}-plan2/1600/1000`, label: "Coordinacion de especialidades" },
      { src: `https://picsum.photos/seed/${seed}-plan3/1600/1000`, label: "Detalle constructivo" },
    ],
    gallery: p.gallery || Array.from({ length: 6 }, (_, i) => ({
      src: `https://picsum.photos/seed/${seed}-g${i}/${i % 2 ? 900 : 1200}/${i % 2 ? 1200 : 900}`,
      label: `${p.name} — vista ${i + 1}`,
    })),
  };
}

const RAW = [
  {
    slug: "hospital-cordillera",
    code: "SAL-01",
    typology: "Salud",
    name: "Hospital Cordillera",
    area: "98,305",
    year: "2024-2026",
    client: "Concesionaria Sacyr",
    location: "Santiago, Chile",
    services: ["Coordinacion BIM"],
    description:
      "Coordinacion de pasillos de todo el hospital, auditorio y jardin infantil. Generacion de entrega de planos de clima desde el modelo federado.",
    image: "/fotos/hospital-mep-inv.jpg",
  },
  {
    slug: "sede-duoc-lastarria",
    code: "EDU-01",
    typology: "Educacional",
    name: "Sede Duoc Lastarria",
    area: "2,000",
    year: "2025-2026",
    client: "Cecilia Puga - Paula Velasco",
    location: "Santiago, Chile",
    services: ["Coordinacion BIM", "Modelado MEP"],
    description: "Modelacion y coordinacion de especialidades.",
  },
  {
    slug: "archivo-regional-valparaiso",
    code: "CUL-01",
    typology: "Cultural",
    name: "Archivo Regional de Valparaiso",
    area: "5,300",
    year: "2025-2026",
    client: "Cecilia Puga - Paula Velasco",
    location: "Valparaiso, Chile",
    services: ["Coordinacion BIM", "Modelado MEP"],
    description: "Modelacion y coordinacion de especialidades.",
  },
  {
    slug: "edificio-corporativo-efe",
    code: "OFI-01",
    typology: "Oficinas",
    name: "Edificio Corporativo EFE",
    area: "12,600",
    year: "2024",
    client: "TORUM",
    location: "Santiago, Chile",
    services: ["Coordinacion BIM", "Modelado MEP", "Modelado As-Built", "Escaneo laser 3D"],
    description: "Escaneo laser, modelado As-Built, modelacion y coordinacion de especialidades.",
  },
  {
    slug: "teleferico-bicentenario",
    code: "INF-01",
    typology: "Infraestructura",
    name: "Teleferico Bicentenario Metropolitano",
    area: "15,263",
    year: "2022-2024",
    client: "Icafal",
    location: "Santiago, Chile",
    services: ["Coordinacion BIM", "Modelado MEP", "BIM Management"],
    description:
      "BIM Manager y coordinacion BIM. Creacion de plataforma ACC, definicion de estructura de administracion, grupos de trabajo colaborativo y coordinacion de especialidades.",
  },
  {
    slug: "starbucks-nuevo-pudahuel",
    code: "RET-01",
    typology: "Retail",
    name: "Locales Starbucks Aeropuerto Nuevo Pudahuel",
    area: "976",
    year: "2022",
    client: "Constructora CNC",
    location: "Santiago, Chile",
    services: ["Modelado MEP", "Modelado As-Built"],
    description: "Modelacion As-Built de arquitectura, estructura y especialidades.",
  },
  {
    slug: "edificio-puerto-chico",
    code: "VIV-01",
    typology: "Vivienda",
    name: "Edificio Puerto Chico — Puerto Varas",
    area: "16,386",
    year: "2021",
    client: "Real Assets",
    location: "Puerto Varas, Chile",
    services: ["Coordinacion BIM", "Modelado MEP"],
    description: "Modelacion y coordinacion BIM de especialidades.",
  },
  {
    slug: "centro-importaciones-carga",
    code: "IND-01",
    typology: "Industrial",
    name: "Centro Importaciones Carga Aeropuerto Santiago",
    area: "27,562",
    year: "2018-2020",
    client: "Optimiza Gerenciamiento",
    location: "Santiago, Chile",
    services: ["Coordinacion BIM", "Modelado MEP", "Asesoria en Obra"],
    description: "Coordinacion BIM de obra. Modelacion y coordinacion de especialidades.",
  },
];

export const projects = RAW.map(withMedia);

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
