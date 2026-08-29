// Proyecto de muestra para aprobar direccion visual antes de migrar Airtable
// completo. Datos reales tomados de coordina-proyectos.json (SAL-01).
export const sampleProject = {
  slug: "hospital-cordillera",
  code: "SAL-01",
  name: "Hospital Cordillera",
  subtitle: "Coordinacion Pasillos, Auditorio y Jardin Infantil",
  location: "Santiago, Chile",
  client: "Concesionaria Sacyr",
  year: "2024-2026",
  area: "98,305",
  areaUnit: "m²",
  services: ["Coordinacion BIM"],
  software: ["Revit", "Navisworks"],
  description:
    "Coordinacion de pasillos de todo el hospital, auditorio y jardin infantil. Generacion de entrega de planos de clima desde el modelo federado.",
  heroImage: "/fotos/hospital-mep-inv.jpg",
  plans: [
    { src: "/fotos/hospital-mep-inv.jpg", label: "Modelo federado — vista general" },
    { src: "https://picsum.photos/seed/hospital-cordillera-mep/1600/1000", label: "Coordinacion MEP — detalle" },
    { src: "https://picsum.photos/seed/hospital-cordillera-corte/1600/1000", label: "Corte transversal instalaciones" },
  ],
  gallery: [
    { src: "/fotos/hospital-mep-inv.jpg", label: "Vista general instalaciones" },
    { src: "https://picsum.photos/seed/hospital-cordillera-pasillo/1200/900", label: "Pasillo coordinado" },
    { src: "https://picsum.photos/seed/hospital-cordillera-auditorio/900/1200", label: "Auditorio" },
    { src: "https://picsum.photos/seed/hospital-cordillera-jardin/1200/900", label: "Jardin infantil" },
    { src: "https://picsum.photos/seed/hospital-cordillera-clima/1200/900", label: "Planos de clima" },
    { src: "https://picsum.photos/seed/hospital-cordillera-torres/900/1200", label: "Torres — vista aerea" },
  ],
};
