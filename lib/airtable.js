// Fetch server-side a Airtable (misma base/tabla que el sitio anterior).
// Se usa desde Server Components -- el token nunca llega al navegador.
const BASE_ID = "appcfnhyOaMOMJjsc";
const TABLE = "Proyectos";

function slugify(code, name) {
  const base = code || name || "proyecto";
  return base
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function formatArea(n) {
  if (n === undefined || n === null || n === "") return "";
  const num = typeof n === "number" ? n : parseFloat(n);
  if (Number.isNaN(num)) return String(n);
  return num.toLocaleString("es-CL");
}

async function fetchAllRecords(token) {
  let all = [];
  let offset = null;
  const filter = encodeURIComponent("{Publicado}=1");
  do {
    const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE)}?filterByFormula=${filter}${offset ? "&offset=" + offset : ""}`;
    const res = await fetch(url, {
      headers: { Authorization: "Bearer " + token },
      next: { revalidate: 60 }, // ISR corto -- misma cadencia que el sitio anterior
    });
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
  const images = attachments.map((att) => ({
    src: (att.thumbnails && att.thumbnails.large && att.thumbnails.large.url) || att.url,
    label: att.filename || "",
  }));
  const code = f["Código"] || "";
  const name = f["Proyecto"] || "";

  return {
    slug: slugify(code, name),
    code,
    name,
    typology: f["Tipología"] || "",
    location: f["Ubicación"] || "Chile",
    year: f["Año"] != null ? String(f["Año"]) : "",
    client: f["Cliente"] || "",
    area: formatArea(f["Superficie (m2)"]),
    description: f["Descripción"] || "",
    services: f["Servicios"] || [],
    image: images[0]?.src || null,
    heroImage: images[0]?.src || null,
    plans: images.slice(0, 4),
    gallery: images,
  };
}

export async function getAirtableProjects() {
  const token = process.env.AIRTABLE_TOKEN;
  if (!token) return null;
  const records = await fetchAllRecords(token);
  return records.map(mapRecord).filter((p) => p.image);
}
