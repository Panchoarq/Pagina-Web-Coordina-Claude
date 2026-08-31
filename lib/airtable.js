// Fetch a Airtable — SÓLO servidor (usa node:fs para el snapshot de respaldo).
//
//   - El token vive sólo en process.env.AIRTABLE_TOKEN (nunca llega al cliente).
//   - Las URLs de imágenes de Airtable son temporales: se piden en cada carga
//     (cache: "no-store"). Nunca se "hornean" en el build.
//   - Sin token (p. ej. primer arranque local) se usa coordina-proyectos.json
//     sólo para ver el layout.

import fs from "node:fs";
import path from "node:path";
import {
  mapRecord,
  normalizeTypology,
  formatArea,
  areaToNumber,
} from "./projects.js";

export {
  TYPOLOGIES,
  firstImage,
  pickRandomWithImage,
  aggregate,
  formatArea,
  areaToNumber,
} from "./projects.js";

const BASE_ID = "appcfnhyOaMOMJjsc";
const TABLE = "Proyectos";

async function fetchAllRecords(token) {
  let all = [];
  let offset = null;
  const filter = encodeURIComponent("{Publicado}=1");
  do {
    const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(
      TABLE
    )}?filterByFormula=${filter}${offset ? "&offset=" + offset : ""}`;
    const res = await fetch(url, {
      headers: { Authorization: "Bearer " + token },
      cache: "no-store",
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

let warnedNoToken = false;

// Imágenes de muestra locales (public/samples) para poder ver el diseño
// cuando Airtable no responde. NO se usan nunca con datos reales de Airtable.
function sampleImages() {
  try {
    const dir = path.join(process.cwd(), "public", "samples");
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
      .map((f) => ({ url: `/samples/${f}`, full: `/samples/${f}`, cap: "", tag: null, w: null, h: null }));
  } catch {
    return [];
  }
}

function loadSnapshot() {
  const samples = sampleImages();
  try {
    const p = path.join(process.cwd(), "coordina-proyectos.json");
    const raw = JSON.parse(fs.readFileSync(p, "utf8"));
    const list = Array.isArray(raw) ? raw : raw.records || raw.projects || [];
    return list.map((item, i) => ({
      code: item.code || "",
      typology: normalizeTypology(item.typology || ""),
      typologyRaw: item.typology || "",
      name: item.name || "",
      location: item.location || "Chile",
      year: item.year || "",
      client: item.client || "",
      area: item.area || formatArea(item.areaNum),
      areaNum: areaToNumber(item.area),
      desc: item.description || item.desc || "",
      comment: item.comment || "",
      services: item.services || [],
      status: item.status || "Finalizado",
      software: item.software || [],
      featured: item.card_size === "lg",
      // El snapshot original apunta a rutas locales inexistentes; para poder
      // revisar el layout se reparten las imágenes de muestra. Con Airtable
      // real esto no se ejecuta.
      images:
        samples.length && (item.has_images ?? true)
          ? [samples[i % samples.length]]
          : [],
    }));
  } catch {
    return [];
  }
}

/** Todos los proyectos publicados, mapeados. Server-only, sin cache. */
export async function getPublishedProjects() {
  const token = process.env.AIRTABLE_TOKEN;
  if (!token) {
    if (!warnedNoToken) {
      warnedNoToken = true;
      console.warn(
        "[airtable] AIRTABLE_TOKEN no definido — usando snapshot local de respaldo."
      );
    }
    return loadSnapshot();
  }
  try {
    const records = await fetchAllRecords(token);
    return records.map(mapRecord);
  } catch (err) {
    // El portafolio vive en Airtable, pero si la API falla (token expirado,
    // caída, rate limit) preferimos servir el snapshot antes que romper la
    // página. Se registra fuerte para no dejarlo pasar en producción.
    console.error(
      "[airtable] Fallo al leer Airtable, usando snapshot local:",
      err && err.message ? err.message : err
    );
    return loadSnapshot();
  }
}

export async function getProjectByCode(code) {
  const all = await getPublishedProjects();
  return (
    all.find((p) => p.code.toLowerCase() === String(code).toLowerCase()) || null
  );
}
