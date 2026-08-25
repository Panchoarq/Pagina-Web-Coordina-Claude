// Modulo compartido: logica de fetch + mapeo de Airtable, usado tanto por
// api/projects.js (datos para el cliente) como por api/render.js (HTML
// pre-renderizado para SEO/crawlers).

const BASE_ID = "appcfnhyOaMOMJjsc";
const TABLE = "Proyectos";

// Tipología en Airtable (texto libre tipo "Edificio Vivienda") -> id usado
// por el sitio para filtros ("vivienda"). Debe calzar con TYPOLOGIES en app-1.jsx.
const TYPOLOGY_MAP = {
  "salud": "salud",
  "edificio vivienda": "vivienda",
  "vivienda": "vivienda",
  "oficinas": "oficinas",
  "retail": "retail",
  "infraestructura": "infraestructura",
  "educacional": "educacional",
  "cultural": "cultural",
  "hoteleria": "hoteleria",
  "hotelería": "hoteleria",
  "hotel": "hoteleria",
  "industrial": "industrial",
  "deportivo": "deportivo",
};

function normalizeTypology(raw) {
  if (!raw) return "";
  const key = String(raw).trim().toLowerCase();
  if (TYPOLOGY_MAP[key]) return TYPOLOGY_MAP[key];
  return key.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "");
}

function formatArea(n) {
  if (n === undefined || n === null || n === "") return "";
  const num = typeof n === "number" ? n : parseFloat(n);
  if (Number.isNaN(num)) return String(n);
  return num.toLocaleString("es-CL") + " m²";
}

// Convención de nombre de archivo: sufijo -NP/-ES (nube de puntos /
// escaneo) o -AB (as-built) justo antes de la extensión, ej.
// "CULT-03-11-NP.jpg" o "CULT-03-5-ES.jpg". Sin sufijo = foto genérica
// (sirve para el resto de los servicios).
function parseImageTag(filename) {
  if (!filename) return { tag: null, cap: "" };
  const noExt = filename.replace(/\.[^.]+$/, "");
  const m = noExt.match(/-(np|es|ab)$/i);
  if (m) {
    const raw = m[1].toLowerCase();
    const tag = raw === "ab" ? "AB" : "NP"; // np y es son alias del mismo tag
    return { tag, cap: noExt.slice(0, -(m[1].length + 1)) };
  }
  return { tag: null, cap: noExt };
}

async function fetchAllRecords(token) {
  let all = [];
  let offset = null;
  const filter = encodeURIComponent("{Publicado}=1");
  do {
    const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE)}?filterByFormula=${filter}${offset ? "&offset=" + offset : ""}`;
    const res = await fetch(url, { headers: { Authorization: "Bearer " + token } });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Airtable ${res.status}: ${text.slice(0, 300)}`);
    }
    const data = await res.json();
    all = all.concat(data.records || []);
    offset = data.offset || null;
  } while (offset);
  return all;
}

function mapRecord(rec) {
  const f = rec.fields || {};
  const attachments = f["Archivos adjuntos"] || [];
  const images = attachments.map((att) => {
    const { tag, cap } = parseImageTag(att.filename);
    return {
      url: (att.thumbnails && att.thumbnails.large && att.thumbnails.large.url) || att.url,
      cap,
      tag,
    };
  });
  const destacado = !!f["Destacado"];
  // El comentario solo sale del servidor si su propio checkbox esta
  // activado -- independiente de si el proyecto esta Publicado.
  const comment = f["Comentario publicado"] ? (f["Comentario"] || "") : "";

  return {
    code: f["Código"] || "",
    typology: normalizeTypology(f["Tipología"]),
    name: f["Proyecto"] || "",
    location: f["Ubicación"] || "Chile",
    year: f["Año"] != null ? String(f["Año"]) : "",
    client: f["Cliente"] || "",
    area: formatArea(f["Superficie (m2)"]),
    desc: f["Descripción"] || "",
    comment,
    services: f["Servicios"] || [],
    status: f["Estado"] || "Finalizado",
    software: f["Software"] || [],
    span: destacado ? "lg" : (images.length >= 4 ? "md" : "sm"),
    images,
  };
}

async function getPublishedProjects(token) {
  const records = await fetchAllRecords(token);
  return records.map(mapRecord);
}

module.exports = { getPublishedProjects, mapRecord, fetchAllRecords, normalizeTypology, formatArea, parseImageTag };
