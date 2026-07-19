# Handoff a Code — Integración Airtable para Portafolio "coordina BIM Consulting"

## Objetivo
Conectar la sección de portafolio del sitio a Airtable como fuente de datos, reemplazando (o sincronizando con) `data.jsx`.

## Credenciales / configuración
- **Base ID:** `appcfnhyOaMOMJjsc`
- **Tabla:** `Proyectos`
- **Token:** debe vivir en variable de entorno `AIRTABLE_TOKEN` (NUNCA hardcodeado en frontend ni commiteado)
- **Filtro:** solo traer registros publicados → `https://api.airtable.com/v0/appcfnhyOaMOMJjsc/Proyectos?filterByFormula={Publicado}=1`

## Campos de la tabla a mapear
| Campo Airtable | Tipo | Uso en el sitio |
|---|---|---|
| ID | texto | identificador interno |
| Código | texto | código de proyecto (ej. EDU-01), se muestra en ficha y portada |
| Proyecto | texto | nombre del proyecto |
| Tipología | selección simple | filtro de tipología en portafolio |
| Servicios | selección múltiple | tags de servicio en tarjeta + filtro de servicio |
| Descripción | texto largo | cuerpo de la ficha técnica |
| Cliente | texto | mandante, se muestra en ficha |
| Año | texto/número | se muestra en tarjeta y ficha |
| Superficie (m2) | número | se muestra en ficha, se usa en agregados de "Resumen de portafolio" |
| Destacado | checkbox | badge "Destacado" en tarjeta |
| Archivos adjuntos | attachment | imágenes de portada + galería |

## Requisitos técnicos clave
1. **Fetch server-side**, no desde el navegador — el token nunca debe ser visible en el HTML/JS entregado al cliente.
2. **Las URLs de attachments de Airtable expiran y se regeneran** — no cachear ni guardar la URL en build/estático. Consultar la API en cada carga de página (o con revalidación corta si se usa ISR/caché).
3. Manejar **paginación** de Airtable (respuesta trae `offset` si hay más de 100 registros).
4. Mantener soporte de imagen de portada = primer archivo adjunto del campo "Archivos adjuntos" (mismo criterio que hoy en `data.jsx`, donde el primer elemento del array `images` es la portada).

## Estado actual del sitio (contexto)
- El sitio real (`src-B-v2.html` + `data.jsx`) hoy usa datos **locales/estáticos** — 75 proyectos cargados manualmente, no conectados a Airtable todavía.
- Se armó una página de prueba aislada (`portafolio-test.html`) que hace fetch **directo desde el navegador** (token pegado a mano por el usuario, guardado solo en localStorage) — sirve únicamente como maqueta visual de referencia para layout: grid de tarjetas, tags de servicios, modal de ficha con galería. **No es la implementación de producción** — se comparte para que Code tenga una referencia de la UI esperada.
- Adjunto también `coordina-proyectos.json`: export de los 75 proyectos actuales en `data.jsx` (código, tipología, nombre, ubicación, año, cliente, área, descripción, servicios, estado, software, imágenes) — útil para poblar/verificar contra los registros de Airtable.

## Entregables de este handoff
- Este documento
- `portafolio-test.html` (referencia visual de layout, no producción)
- `coordina-proyectos.json` (datos actuales para contraste/migración)
