// Vercel Serverless Function que sirve "/" — genera el HTML de inicio con
// contenido real (texto de servicios, portafolio, etc.) ya incluido, para
// que cualquier rastreador (Google y otros) pueda leerlo sin necesitar
// ejecutar JavaScript. El sitio interactivo (React) sigue cargando encima
// y reemplaza este contenido apenas termina de montar — nadie nota la
// diferencia visualmente, pero ahora el HTML crudo trae texto real.

const fs = require("fs");
const path = require("path");
const { getPublishedProjects } = require("./_airtable");

const SITE_URL = "https://coordinabimconsulting.com";

const HERO_BODY = "Somos asesores BIM para proyectos de arquitectura, MEP y estructura: desde la definición de estándares y metodologías de trabajo y la revisión de modelos, hasta cubrir todo el espectro de aplicaciones BIM a lo largo del ciclo de diseño y obra — desde el primer modelo hasta el as-built.";

const EXP_TITLE = "33 años de trayectoria, 22 dedicados a las asesorías BIM";
const EXP_BODY = "coordina Bim Consulting nace como oficina de diseño y, a lo largo de más de 33 años de trayectoria, evoluciona hacia una consultora especializada en asesorías BIM aplicadas a proyectos de arquitectura e ingeniería en todas sus etapas. Ese recorrido nos ha permitido participar en proyectos emblemáticos como los modelos iniciales del Aeropuerto Internacional de Santiago, el Centro Cultural GAM, la asesoría y definición de la política BIM del Banco Central para su proyecto Central de Efectivo, y hospitales de alta complejidad a lo largo de Chile.";

const SERVICES = [
  { num: "01", name: "Asesoría BIM", body: "Acompañamiento a empresas en sus procesos BIM, desde definición de objetivos y estándares hasta el rol de Gestión BIM y BIM Manager dentro de la organización. Incluye revisión de modelos y entregables, validando cumplimiento de estándares y calidad antes de avanzar en el proyecto." },
  { num: "02", name: "Modelado BIM - Arquitectura / MEP / Civil", body: "Desarrollo de modelos en LOD 200 a 400, multidisciplina, federados y auditados. Se realiza tanto como parte de un encargo de coordinación, asumiendo el modelado de todas las especialidades, como en encargos puntuales de una sola especialidad." },
  { num: "03", name: "Detección de conflictos", body: "Metodología propia para registrar y documentar sistemáticamente los puntos de conflicto entre especialidades, con documentación planimétrica del resultado final coordinado del proyecto." },
  { num: "04", name: "Coordinación BIM", body: "Actuamos como asesores y coordinadores generales del proyecto, integrando en un entorno común de datos los modelos que desarrollan las distintas especialidades." },
  { num: "05", name: "Cubicaciones y cantidades", body: "Modelos orientados específicamente a cubicación, con nivel de detalle de modelado y soluciones constructivas muy preciso, reflejando fielmente cada elemento a cuantificar." },
  { num: "06", name: "Escaneo láser 3D", body: "Escáner láser móvil y estático, de largo alcance y alta precisión, con experiencia en levantamientos de infraestructura como aeropuertos, instalaciones hospitalarias y edificios de distinta categoría." },
  { num: "07", name: "Modelos As-Built", body: "Generación de información As-Built (modelos y planos) a partir de levantamientos con escáner láser. Casos emblemáticos: Aeropuerto Internacional de Santiago y Teatro GAM Etapa 2." },
  { num: "08", name: "Soporte en terreno", body: "Asesoría remota o con personal instalado en obra, para el seguimiento de los modelos de coordinación y la resolución de problemas que surgen día a día." },
];

function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderProjectItem(p) {
  const meta = [p.typology, p.year, p.location].filter(Boolean).join(" · ");
  return `<li>
    <h3>${escapeHtml(p.code)} — ${escapeHtml(p.name)}</h3>
    <p class="proj-meta">${escapeHtml(meta)}${p.area ? " · " + escapeHtml(p.area) : ""}</p>
    ${p.desc ? `<p>${escapeHtml(p.desc)}</p>` : ""}
    ${p.services && p.services.length ? `<p class="proj-services">${escapeHtml(p.services.join(" · "))}</p>` : ""}
  </li>`;
}

function buildSeoHtml(projects) {
  const projectItems = (projects || []).map(renderProjectItem).join("\n");
  const serviceItems = SERVICES.map(
    (s) => `<li><h3>${s.num} — ${escapeHtml(s.name)}</h3><p>${escapeHtml(s.body)}</p></li>`
  ).join("\n");

  return `
<header>
  <a href="/">coordina Bim Consulting</a>
  <nav>
    <a href="#portafolio">Portafolio</a>
    <a href="#servicios">Servicios</a>
    <a href="#contacto">Contacto</a>
  </nav>
</header>
<main>
  <h1>coordina Bim Consulting — Estudio de coordinación BIM</h1>
  <p>${escapeHtml(HERO_BODY)}</p>

  <section id="experiencia">
    <h2>${escapeHtml(EXP_TITLE)}</h2>
    <p>${escapeHtml(EXP_BODY)}</p>
  </section>

  <section id="servicios">
    <h2>Servicios</h2>
    <p>Ocho líneas de trabajo integradas bajo una sola metodología.</p>
    <ul>
      ${serviceItems}
    </ul>
  </section>

  <section id="portafolio">
    <h2>Portafolio</h2>
    <p>${projects.length} proyectos coordinados.</p>
    <ul>
      ${projectItems}
    </ul>
  </section>

  <section id="contacto">
    <h2>Partamos el proyecto</h2>
    <p>Cuéntanos qué estás coordinando. Respondemos en 24h hábiles.</p>
  </section>
</main>
<footer>
  <p>Santiago de Chile · Coordinación BIM desde 2011</p>
</footer>`;
}

module.exports = async (req, res) => {
  let projects = [];
  try {
    const token = process.env.AIRTABLE_TOKEN;
    if (token) projects = await getPublishedProjects(token);
  } catch (err) {
    // Si Airtable falla, igual servimos el resto del contenido estatico
    // (hero, servicios) -- nunca dejamos la pagina en blanco.
    console.warn("[render] No se pudo cargar Airtable para el HTML inicial:", err.message);
  }

  let template;
  try {
    template = fs.readFileSync(path.join(__dirname, "..", "template.html"), "utf-8");
  } catch (err) {
    res.status(500).send("No se pudo cargar la plantilla del sitio.");
    return;
  }

  const seoHtml = buildSeoHtml(projects);

  const headExtras = `
<link rel="canonical" href="${SITE_URL}/" />
<meta name="robots" content="index, follow" />
<meta property="og:type" content="website" />
<meta property="og:title" content="coordina Bim Consulting — Coordinación BIM" />
<meta property="og:description" content="Estudio de coordinación BIM. Asesoría, modelado y coordinación de proyectos de arquitectura, MEP y estructura desde el primer modelo hasta el as-built." />
<meta property="og:url" content="${SITE_URL}/" />
<meta property="og:locale" content="es_CL" />`;

  let html = template.replace("</head>", `${headExtras}\n</head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${seoHtml}</div>`);

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  // Cache corto en el edge: el contenido depende de Airtable (proyectos
  // publicados), asi que no se congela por mucho tiempo.
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
  res.status(200).send(html);
};
