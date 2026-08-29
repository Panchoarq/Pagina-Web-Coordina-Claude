# Brief de contexto — Rediseño desde cero, coordina BIM Consulting

> Este documento existe para que un skill/agente de diseño (ej. `ui-ux-pro-max`)
> pueda arrancar un rediseño completo sin que el dueño del proyecto tenga que
> re-explicar el negocio, el contenido o la infraestructura desde cero en el
> chat. Pégalo completo como contexto inicial de la sesión de diseño.
>
> **Este documento describe el negocio y los datos reales — no la dirección
> visual.** No hay ninguna restricción estética aquí a propósito: la idea es
> que el diseño nazca sin arrastrar nada del sitio actual ni de intentos
> anteriores (ver sección 8). Todo lo que sí es innegociable (funcional,
> técnico, de datos) está marcado explícitamente como tal.

---

## 1. Qué es esta empresa, en una frase

**coordina BIM Consulting** es un estudio chileno de **coordinación BIM**
para proyectos de arquitectura, ingeniería y construcción (AEC): asesora,
modela y coordina digitalmente edificios y obras de infraestructura antes y
durante la construcción, para detectar y resolver conflictos entre
especialidades (arquitectura, estructura, climatización, eléctrico,
sanitario, etc.) **en el modelo 3D, antes de que el problema llegue a la
obra real**.

No diseñan arquitectura ni construyen — son la capa de **coordinación
digital** entre las oficinas de arquitectura/ingeniería y la constructora.

## 2. El negocio, en más detalle

- **Trayectoria:** equipo con 33 años de experiencia profesional en total,
  ~22 años vinculados al mundo BIM, ~18 años dedicados específicamente a
  coordinación de proyectos. El equipo diseñó y construyó proyectos antes
  de especializarse en BIM — eso les da criterio para anticipar problemas
  constructivos reales, no solo software.
- **Escala:** ~75 proyectos coordinados a la fecha (cifra histórica en
  contenido estático; la fuente de verdad real y actualizada es Airtable,
  ver sección 4 — al día de este documento hay ~37 proyectos marcados como
  "Publicado" ahí, la cifra sube con el tiempo).
- **Volumen:** del orden de 1.9 millones de m² modelados/coordinados en
  total.
- **Proyectos emblemáticos reales** (mencionar si se necesita un caso
  destacado): modelos iniciales del Aeropuerto Internacional de Santiago,
  As-Built del Centro Cultural GAM (etapa 2, vía escaneo láser), asesoría y
  definición de política BIM para el Banco Central de Chile (proyecto
  Central de Efectivo), y coordinación de hospitales de alta complejidad a
  lo largo de Chile (ej. Hospital Cordillera, 98.305 m², Hospital Buin
  Paine, 56.000 m²).
- **Tipologías de proyecto que cubren** (10): Salud, Edificio Vivienda,
  Oficinas, Retail, Infraestructura, Educacional, Cultural, Hotelería,
  Industrial, Deportivo.
- **Mandantes reales** (oficinas de arquitectura, constructoras,
  concesionarias — algunos ejemplos): Concesionaria Sacyr, Icafal, Banco
  Central de Chile, Bbats Consulting & Projects, Rentas Falabella, BAU
  Ingenieros Consultores, Cecilia Puga - Paula Velasco, Alberto Moletto
  Arquitectos, TORUM, Real Assets.
- **Ubicación:** Santiago, Chile — proyectos a lo largo de todo Chile.

## 3. Servicios reales (8 líneas de trabajo)

1. **Planificación BIM** — BEP (BIM Execution Plan), roles y flujos de
   información desde el kickoff del proyecto.
2. **Modelado BIM** (Arquitectura / MEP / Civil) — modelos LOD 200-400,
   multidisciplina, federados y auditados.
3. **Detección de conflictos** (clash detection) — sistemático, con
   reportes y seguimiento semanal.
4. **Coordinación BIM** — reuniones, matriz de responsabilidades,
   resolución de conflictos directamente en el modelo.
5. **Cubicaciones y cantidades** — extracción paramétrica, control de
   partidas y presupuestos desde el modelo.
6. **Escaneo láser 3D** — nubes de puntos de alta precisión para obra y
   patrimonio.
7. **Modelos As-Built** — modelos post-construcción verificables contra la
   realidad construida.
8. **Soporte en terreno** — acompañamiento continuo en obra, resolución de
   problemas en tiempo real.

**Software que usan:** principalmente Revit y Navisworks (Autodesk).

## 4. De dónde sale la información y las imágenes (esto SÍ es dato duro)

- **Fuente de verdad de los proyectos: Airtable**, no un CMS ni archivos
  estáticos. Base `appcfnhyOaMOMJjsc`, tabla `Proyectos`.
- Cada fila de Airtable = un proyecto, con campos: Código, Proyecto
  (nombre), Tipología, Ubicación, Año, Cliente, Superficie (m²),
  Descripción, Servicios (multi-select), Estado, Software, **Archivos
  adjuntos** (las fotos/planos — attachment field de Airtable), y un
  checkbox **Publicado** que decide si el proyecto se muestra en el sitio.
- **Las fotos NO son archivos del repo ni de un CDN propio** — son
  attachments de Airtable. Sus URLs son temporales/expiran y se regeneran
  — el sitio actual las trae con **fetch server-side en cada carga de
  página** (nunca las cachea como si fueran estáticas). Cualquier
  rediseño tiene que mantener este patrón: pedir los datos/imágenes al
  servidor en cada visita (o con revalidación corta tipo ISR), nunca
  "hornearlas" en un build una sola vez.
- El token de acceso a Airtable vive solo en variable de entorno del
  servidor (`AIRTABLE_TOKEN`) — nunca debe llegar al navegador del
  cliente.
- Convención real de nombre de archivo para fotos: sufijo `-NP`/`-ES`
  (nube de puntos / escaneo) o `-AB` (as-built) justo antes de la
  extensión — permite filtrar fotos por tipo de servicio dentro de un
  mismo proyecto. Sin sufijo = foto genérica.

## 5. Cómo está alojado el sitio hoy (infraestructura, no diseño)

- **Dominio:** `coordinabimconsulting.com` (DNS en Cloudflare, apuntando a
  Vercel).
- **Hosting/deploy:** Vercel, proyecto `panchoarqs-projects/pagina-web-coordina`.
  Deploy manual (`git push` + `vercel --prod`), no hay CI/CD automático
  conectado a GitHub todavía.
- **Repo:** https://github.com/Panchoarq/Pagina-Web-Coordina-Claude
- El sitio actual (`main`) es una SPA en React servida **sin build step**
  (Babel Standalone compilando `.jsx` en vivo en el navegador) + funciones
  serverless de Vercel (`api/`) que hacen de puente hacia Airtable. Esto es
  una decisión técnica del sitio actual, **no una restricción para el
  rediseño** — un rediseño nuevo puede (y probablemente debería) usar un
  framework real con build (Next.js, Astro, etc.), mientras mantenga el
  patrón de la sección 4 (fetch server-side, sin token expuesto,
  revalidación corta).
- Ya existe una función de SEO que renderiza HTML real server-side para que
  Google pueda indexar el contenido (antes el sitio era 100% client-side y
  Google no lo indexaba — ver `main`, commit `edc378e`, para el diagnóstico
  completo si hace falta el detalle técnico). **Cualquier rediseño nuevo
  tiene que seguir siendo crawleable por buscadores** — esto es un
  requisito funcional, no estético.

## 6. Cómo se presenta la información HOY (contexto, no plantilla a copiar)

Esto describe el sitio actual en producción, para que quien diseñe de cero
entienda qué información existe y en qué orden se cuenta la historia hoy —
**no es una instrucción de mantener esta estructura**. El objetivo explícito
de este branch es una propuesta visual y estructural distinta.

1. Header con navegación (Portafolio / Servicios / Estudio / Contacto) +
   selector de idioma ES/EN.
2. Hero con mensaje central + CTA a portafolio y a servicios + indicador de
   "proyectos en curso ahora mismo".
3. Bloque de trayectoria/experiencia (años, cifras, tipologías).
4. Resumen agregado de portafolio (m² totales, desglose por tipología).
5. Grid de 8 servicios.
6. Portafolio en mosaico (tarjetas por proyecto) con filtro por tipología y
   por servicio.
7. Ficha de proyecto individual (modal o página propia): código, nombre,
   mandante, ubicación, año, superficie, tipología, servicios, estado,
   software, galería de fotos.
8. Contacto + footer.

El sitio es **bilingüe (ES/EN)** hoy — evaluar si el rediseño mantiene esto
o lo simplifica.

## 7. Audiencia y tono

- **Quién contrata este servicio:** oficinas de arquitectura, constructoras,
  concesionarias de obras públicas, mandantes institucionales (ej. Banco
  Central) — perfiles técnicos, B2B, que evalúan competencia técnica real
  y track record, no "onda" de marca de consumo.
- **Qué necesitan ver para confiar:** proyectos reales con cifras
  concretas (m², año, mandante), evidencia de manejo de proyectos
  complejos (hospitales, infraestructura pública, obras de gran escala),
  claridad de qué servicio específico se prestó en cada caso.
- El tono actual del copy es directo, técnico, sin lenguaje de marketing
  inflado — eso es una característica real del negocio (aunque la solución
  *visual* puede reinterpretarse libremente).

## 8. Qué NO llevarse del intento anterior

Ya hubo un rediseño explorado en paralelo (branch `diseno-monocromo`,
dirección editorial en blanco y negro inspirada en un estudio de
arquitectura) y la estética original en producción (branch `main`, "grilla
técnica": papel + tinta + acento azul, motivos de plano/clash-detection).
**Este branch (`diseno-desde-cero`) parte sin heredar ninguna de las dos**
— ni paleta, ni tipografía, ni layout, ni metáforas visuales de ninguna de
las dos. Se puede revisar `design-archive/` en el repo si en algún momento
se quiere comparar, pero no como punto de partida.

## 9. Lo único no-negociable (resumen)

- Los datos y fotos de proyectos vienen de Airtable, server-side, nunca
  hardcodeados ni cacheados de forma permanente (las URLs de fotos
  expiran).
- El token de Airtable nunca se expone al cliente.
- El sitio debe ser indexable por buscadores (no puede depender 100% de
  JS del lado del cliente para mostrar contenido).
- Todo lo demás — estructura de páginas, navegación, paleta, tipografía,
  layout, animación, cómo se cuenta la historia — está abierto a
  proponerse de cero.
