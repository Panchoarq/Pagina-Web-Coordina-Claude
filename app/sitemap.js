import { getPublishedProjects } from "@/lib/airtable";

const BASE = "https://coordinabimconsulting.com";

export default async function sitemap() {
  const now = new Date();
  const entries = [];

  for (const locale of ["es", "en"]) {
    entries.push({ url: `${BASE}/${locale}`, lastModified: now, priority: 1 });
    entries.push({ url: `${BASE}/${locale}/proyectos`, lastModified: now, priority: 0.8 });
  }

  try {
    const projects = await getPublishedProjects();
    for (const p of projects) {
      if (!p.code) continue;
      for (const locale of ["es", "en"]) {
        entries.push({
          url: `${BASE}/${locale}/proyectos/${encodeURIComponent(p.code)}`,
          lastModified: now,
          priority: 0.6,
        });
      }
    }
  } catch {
    // Si Airtable no responde, se entrega al menos el sitemap base.
  }

  return entries;
}
