// Helpers puros sobre proyectos — SIN dependencias de Node.
// Se pueden importar desde componentes de cliente y de servidor por igual.
// El fetch real a Airtable (que sí usa node:fs) vive en lib/airtable.js.

const TYPOLOGY_MAP = {
  salud: "salud",
  "edificio vivienda": "vivienda",
  vivienda: "vivienda",
  oficinas: "oficinas",
  retail: "retail",
  infraestructura: "infraestructura",
  educacional: "educacional",
  cultural: "cultural",
  hoteleria: "hoteleria",
  "hotelería": "hoteleria",
  hotel: "hoteleria",
  industrial: "industrial",
  deportivo: "deportivo",
};

export const TYPOLOGIES = [
  { id: "salud", es: "Salud", en: "Healthcare" },
  { id: "vivienda", es: "Edificio Vivienda", en: "Residential" },
  { id: "oficinas", es: "Oficinas", en: "Offices" },
  { id: "retail", es: "Retail", en: "Retail" },
  { id: "infraestructura", es: "Infraestructura", en: "Infrastructure" },
  { id: "educacional", es: "Educacional", en: "Education" },
  { id: "cultural", es: "Cultural", en: "Cultural" },
  { id: "hoteleria", es: "Hotelería", en: "Hospitality" },
  { id: "industrial", es: "Industrial", en: "Industrial" },
  { id: "deportivo", es: "Deportivo", en: "Sports" },
];

export function normalizeTypology(raw) {
  if (!raw) return "";
  const key = String(raw).trim().toLowerCase();
  if (TYPOLOGY_MAP[key]) return TYPOLOGY_MAP[key];
  return key
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, "");
}

export function formatArea(n) {
  if (n === undefined || n === null || n === "") return "";
  const num =
    typeof n === "number" ? n : parseFloat(String(n).replace(/[^\d.]/g, ""));
  if (Number.isNaN(num)) return String(n);
  return num.toLocaleString("es-CL") + " m²";
}

export function areaToNumber(area) {
  if (area === undefined || area === null || area === "") return 0;
  const num = parseFloat(String(area).replace(/[^\d.]/g, ""));
  return Number.isNaN(num) ? 0 : num;
}

// Sufijo -NP/-ES (nube de puntos / escaneo) o -AB (as-built) antes de la
// extensión. Sin sufijo = foto genérica.
export function parseImageTag(filename) {
  if (!filename) return { tag: null, cap: "" };
  const noExt = filename.replace(/\.[^.]+$/, "");
  const m = noExt.match(/-(np|es|ab)$/i);
  if (m) {
    const raw = m[1].toLowerCase();
    const tag = raw === "ab" ? "AB" : "NP";
    return { tag, cap: noExt.slice(0, -(m[1].length + 1)) };
  }
  return { tag: null, cap: noExt };
}

export function mapRecord(rec) {
  const f = rec.fields || {};
  const attachments = f["Archivos adjuntos"] || [];
  const images = attachments
    .map((att) => {
      const { tag, cap } = parseImageTag(att.filename);
      const large = att.thumbnails && att.thumbnails.large;
      return {
        url: (large && large.url) || att.url,
        full: att.url,
        w: (large && large.width) || att.width || null,
        h: (large && large.height) || att.height || null,
        cap,
        tag,
      };
    })
    .filter((img) => !!img.url);

  return {
    code: f["Código"] || "",
    typology: normalizeTypology(f["Tipología"]),
    typologyRaw: f["Tipología"] || "",
    name: f["Proyecto"] || "",
    location: f["Ubicación"] || "Chile",
    year: f["Año"] != null ? String(f["Año"]) : "",
    client: f["Cliente"] || "",
    area: formatArea(f["Superficie (m2)"]),
    areaNum: areaToNumber(f["Superficie (m2)"]),
    desc: f["Descripción"] || "",
    comment: f["Comentario publicado"] ? f["Comentario"] || "" : "",
    services: f["Servicios"] || [],
    status: f["Estado"] || "Finalizado",
    software: f["Software"] || [],
    featured: !!f["Destacado"],
    images,
  };
}

export function firstImage(project) {
  if (!project || !Array.isArray(project.images)) return null;
  return project.images.find((i) => i && i.url) || null;
}

export function pickRandomWithImage(projects) {
  const withImg = projects.filter((p) => firstImage(p));
  const pool = withImg.length ? withImg : projects;
  if (!pool.length) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function aggregate(projects) {
  const totalArea = projects.reduce((sum, p) => sum + (p.areaNum || 0), 0);
  const typologies = new Set(projects.map((p) => p.typology).filter(Boolean));
  return { count: projects.length, totalArea, typologies: typologies.size };
}
