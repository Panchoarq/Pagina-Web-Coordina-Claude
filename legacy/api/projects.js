// Vercel Serverless Function — proxy server-side hacia Airtable.
// El token NUNCA se expone al navegador: vive solo en la variable de
// entorno AIRTABLE_TOKEN (configurada en Vercel / .env.local).

const { getPublishedProjects } = require("./_airtable");

module.exports = async (req, res) => {
  const token = process.env.AIRTABLE_TOKEN;
  if (!token) {
    res.status(500).json({ error: "AIRTABLE_TOKEN no está configurado en el servidor." });
    return;
  }
  try {
    const projects = await getPublishedProjects(token);
    // Cache corto en el edge: reduce llamadas a Airtable sin dejar las
    // URLs de imágenes "congeladas" por mucho tiempo (pueden expirar).
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=120");
    res.status(200).json(projects);
  } catch (err) {
    res.status(502).json({ error: String((err && err.message) || err) });
  }
};
