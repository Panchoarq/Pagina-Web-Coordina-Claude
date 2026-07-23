// Shared UI primitives: glyphs, placeholder images, ficha modal, filter bar, header
const { useState, useEffect, useRef, useMemo } = React;

// ---------- Bauhaus geometric glyphs ----------
function Glyph({ kind = "circle", size = 28, color = "currentColor", stroke = 1.5 }) {
  const s = size;
  const common = { width: s, height: s, viewBox: "0 0 32 32", fill: "none", stroke: color, strokeWidth: stroke };
  switch (kind) {
    case "circle":    return <svg {...common}><circle cx="16" cy="16" r="13" /></svg>;
    case "disc":      return <svg {...common} fill={color}><circle cx="16" cy="16" r="13" /></svg>;
    case "square":    return <svg {...common}><rect x="3" y="3" width="26" height="26" /></svg>;
    case "squareFill":return <svg {...common} fill={color}><rect x="3" y="3" width="26" height="26" /></svg>;
    case "triangle":  return <svg {...common} fill={color}><polygon points="16,3 29,29 3,29" /></svg>;
    case "halfCircle":return <svg {...common} fill={color}><path d="M3 16 A13 13 0 0 1 29 16 Z" /></svg>;
    case "quarter":   return <svg {...common} fill={color}><path d="M3 29 L3 3 A26 26 0 0 1 29 29 Z" /></svg>;
    case "diamond":   return <svg {...common}><polygon points="16,2 30,16 16,30 2,16" /></svg>;
    case "cross":     return <svg {...common}><line x1="5" y1="5" x2="27" y2="27" /><line x1="27" y1="5" x2="5" y2="27" /></svg>;
    case "plus":      return <svg {...common}><line x1="16" y1="4" x2="16" y2="28" /><line x1="4" y1="16" x2="28" y2="16" /></svg>;
    case "arrow":     return <svg {...common}><line x1="4" y1="16" x2="28" y2="16" /><polyline points="20,8 28,16 20,24" /></svg>;
    case "diagL":     return <svg {...common}><line x1="4" y1="4" x2="28" y2="28" /></svg>;
    case "ring":      return <svg {...common}><circle cx="16" cy="16" r="13" /><circle cx="16" cy="16" r="6" /></svg>;
    default:          return <svg {...common}><circle cx="16" cy="16" r="13" /></svg>;
  }
}

// ---------- Placeholder SVG drawing ----------
function ProjectPlaceholder({ label, code, variant = 0, real = null }) {
  if (real) {
    return (
      <div className="ph">
        <img src={real} alt={label} loading="lazy" />
        <span className="ph-code">{code}</span>
      </div>
    );
  }
  const variants = [
    <g key="a" stroke="currentColor" strokeWidth="0.8" fill="none">
      {[...Array(6)].map((_, i) => (
        <g key={i} transform={`translate(${i * 16 - 10}, ${60 - i * 8})`}>
          <path d="M0 0 L20 -10 L40 0 L20 10 Z" />
          <path d="M0 0 L0 20 L20 30 L20 10" />
          <path d="M40 0 L40 20 L20 30" />
        </g>
      ))}
    </g>,
    <g key="b" stroke="currentColor" strokeWidth="0.8" fill="none">
      <rect x="20" y="20" width="160" height="90" />
      <line x1="20" y1="60" x2="110" y2="60" />
      <line x1="110" y1="20" x2="110" y2="110" />
      <line x1="60" y1="60" x2="60" y2="110" />
      <line x1="110" y1="80" x2="180" y2="80" />
      <line x1="150" y1="20" x2="150" y2="80" />
      <circle cx="140" cy="95" r="8" />
    </g>,
    <g key="c" stroke="currentColor" strokeWidth="0.8" fill="none">
      <line x1="10" y1="110" x2="190" y2="110" />
      {[...Array(5)].map((_, i) => (
        <g key={i}>
          <line x1={20 + i * 35} y1="110" x2={20 + i * 35} y2={40 + (i % 2) * 20} />
          <line x1={20 + i * 35} y1={40 + (i % 2) * 20} x2={55 + i * 35} y2={40 + (i % 2) * 20} />
        </g>
      ))}
      <line x1="195" y1="110" x2="195" y2="40" />
    </g>,
    <g key="d" stroke="currentColor" strokeWidth="0.8" fill="none">
      {[...Array(16)].map((_, i) => (
        <g key={i} transform={`translate(${(i % 6) * 30 + 15}, ${Math.floor(i / 6) * 28 + 22})`}>
          <circle cx="10" cy="10" r="6" />
          <line x1="4" y1="4" x2="16" y2="16" />
          <line x1="16" y1="4" x2="4" y2="16" />
        </g>
      ))}
    </g>,
  ];
  return (
    <div className="ph ph-draw">
      <svg viewBox="0 0 200 130" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
        {variants[variant % variants.length]}
      </svg>
      <span className="ph-code">{code}</span>
      <span className="ph-label">{label}</span>
    </div>
  );
}

// ---------- Filter bar ----------
function FilterBar({ active, onChange, lang, t }) {
  return (
    <div className="filter-bar">
      <button className={`filter-chip ${active === "all" ? "is-active" : ""}`} onClick={() => onChange("all")}>
        <span className="filter-dot" />
        {t.filterAll}
        <span className="filter-count">{PROJECTS.length}</span>
      </button>
      {TYPOLOGIES.map((ty) => {
        const count = PROJECTS.filter((p) => p.typology === ty.id).length;
        return (
          <button
            key={ty.id}
            className={`filter-chip ${active === ty.id ? "is-active" : ""}`}
            onClick={() => onChange(ty.id)}
          >
            {ty[lang]}
            <span className="filter-count">{count}</span>
          </button>
        );
      })}
    </div>
  );
}

// ---------- Project card ----------
// ---------- Service icons (usa los mismos glyphs Bauhaus de la sección servicios) ----------
const SERVICE_ICONS = {
  "Planificacion BIM":    { es: "Planificación BIM",     en: "BIM Planning",       glyph: "circle"     },
  "Modelado BIM":         { es: "Modelado BIM",           en: "BIM Modeling",       glyph: "square"     },
  "Modelado MEP":         { es: "Modelado MEP",           en: "MEP Modeling",       glyph: "square"     },
  "Modelado Arq":         { es: "Modelado Arquitectura",  en: "Arch Modeling",      glyph: "square"     },
  "Modelado Civil":       { es: "Modelado Civil",         en: "Civil Modeling",     glyph: "square"     },
  "Modelado Estructura":  { es: "Modelado Estructura",    en: "Structural Modeling",glyph: "square"     },
  "Clash detection":      { es: "Clash Detection",        en: "Clash Detection",    glyph: "triangle"   },
  "Deteccion de conflictos":{ es:"Detección Conflictos",  en: "Clash Detection",    glyph: "triangle"   },
  "Coordinacion BIM":     { es: "Coordinación BIM",       en: "BIM Coordination",   glyph: "halfCircle" },
  "Coordinacion":         { es: "Coordinación BIM",       en: "BIM Coordination",   glyph: "halfCircle" },
  "Cubicaciones":         { es: "Cubicaciones",           en: "Quantities",         glyph: "plus"       },
  "Escaneo laser 3D":     { es: "Escaneo Láser 3D",       en: "3D Laser Scanning",  glyph: "ring"       },
  "Nube de puntos":       { es: "Nube de Puntos",         en: "Point Cloud",        glyph: "ring"       },
  "Documentacion":        { es: "Documentación",          en: "Documentation",      glyph: "ring"       },
  "BIM Management":       { es: "BIM Management",         en: "BIM Management",     glyph: "disc"       },
  "Asesoria BIM":         { es: "Asesoría BIM",           en: "BIM Advisory",       glyph: "circle"     },
  "Asesoria en Obra":     { es: "Asesoría en Obra",       en: "On-site Advisory",   glyph: "quarter"    },
  "Modelado As-Built":    { es: "Modelado As-Built",      en: "As-Built Modeling",  glyph: "diamond"    },
  "As-Built":             { es: "As-Built",               en: "As-Built",           glyph: "diamond"    },
  "Soporte en terreno":   { es: "Soporte en Terreno",     en: "On-site Support",    glyph: "quarter"    },
  "Detallismo":           { es: "Detallismo",             en: "Detailing",          glyph: "quarter"    },
};

// Índice normalizado (sin tildes/guiones/mayúsculas) para no depender de
// que el texto de Airtable coincida letra por letra con estas llaves.
const SERVICE_ICONS_NORM = Object.fromEntries(
  Object.entries(SERVICE_ICONS).map(([k, v]) => [normalizeServiceKey(k), v])
);
function findServiceDef(name) {
  return SERVICE_ICONS_NORM[normalizeServiceKey(name)] || null;
}

function ServiceIcon({ name, lang }) {
  const [show, setShow] = useState(false);
  const def = findServiceDef(name);
  const label = def ? (lang === "es" ? def.es : def.en) : name;
  const glyphKind = def ? def.glyph : "circle";
  return (
    <span
      style={{ position: "relative", display: "inline-flex", alignItems: "center", color: "var(--fg-soft)", cursor: "default" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Glyph kind={glyphKind} size={16} stroke={1.5} />
      {show && (
        <span style={{
          position: "absolute", bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)",
          background: "var(--fg)", color: "var(--bg)", fontSize: 11, fontFamily: "var(--f-sans)",
          whiteSpace: "nowrap", padding: "4px 8px", borderRadius: 4, pointerEvents: "none",
          zIndex: 100, letterSpacing: "0.03em",
        }}>
          {label}
        </span>
      )}
    </span>
  );
}

function ProjectCard({ project, lang, onOpen, index }) {
  const ty = TYPOLOGIES.find((t) => t.id === project.typology);
  const firstImg = project.images && project.images[0];
  const imgUrl = firstImg ? firstImg.url : null;
  const services = project.services || [];
  return (
    <article
      className={`pcard pcard-${project.span}`}
      onClick={() => onOpen(project)}
      style={{ "--stagger": `${(index % 8) * 40}ms` }}
    >
      <div className="pcard-media">
        <ProjectPlaceholder label={project.name} code={project.code} variant={index} real={imgUrl} />
        {project.images && project.images.length > 1 && (
          <span className="pcard-imgcount">{project.images.length}</span>
        )}
      </div>
      <div className="pcard-meta">
        <span className="pcard-ty">{ty ? ty[lang] : ""}</span>
        <h3 className="pcard-name">{project.name}</h3>
        <span className="pcard-year">{project.year} · {project.location}</span>
        {services.length > 1 && (
          <div style={{ display: "flex", gap: 8, marginTop: 6 }} onClick={e => e.stopPropagation()}>
            {services.map(s => <ServiceIcon key={s} name={s} lang={lang} />)}
          </div>
        )}
      </div>
    </article>
  );
}

// ---------- Ficha técnica modal with gallery + fullscreen lightbox ----------
function FichaModal({ project, lang, t, onClose }) {
  const [activeImg, setActiveImg] = useState(0);
  const [fading, setFading] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  // Build image list from project
  const imgs = useMemo(() => {
    if (!project) return [];
    if (project.images && project.images.length > 0) return project.images;
    const key = project.image;
    if (key && SAMPLE_IMAGES[key]) return [{ url: SAMPLE_IMAGES[key], cap: project.name }];
    return [];
  }, [project]);

  const hasGallery = imgs.length > 1;

  // Reset when project changes
  useEffect(() => { setActiveImg(0); setFading(false); setFullscreen(false); }, [project]);

  // Keyboard nav
  useEffect(() => {
    if (!project) return;
    const handleKey = (e) => {
      if (e.key === "Escape") { fullscreen ? setFullscreen(false) : onClose(); return; }
      if (e.key === "ArrowLeft")  setActiveImg(i => (i - 1 + Math.max(imgs.length, 1)) % Math.max(imgs.length, 1));
      if (e.key === "ArrowRight") setActiveImg(i => (i + 1) % Math.max(imgs.length, 1));
    };
    if (!fullscreen) document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      if (!fullscreen) document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [project, imgs.length, onClose, fullscreen]);

  if (!project) return null;

  const ty = TYPOLOGIES.find((tp) => tp.id === project.typology);
  const currentImg = imgs[activeImg] || null;

  const goTo = (idx) => {
    if (idx === activeImg || fading) return;
    setFading(true);
    setTimeout(() => { setActiveImg(idx); setFading(false); }, 180);
  };

  const prev = () => goTo((activeImg - 1 + imgs.length) % imgs.length);
  const next = () => goTo((activeImg + 1) % imgs.length);

  const rows = [
    [t.client,   project.client],
    [t.location, project.location],
    [t.year,     project.year],
    [t.area,     project.area],
    [t.typology, ty ? ty[lang] : project.typology],
    [t.status,   project.status],
    [t.services, project.services.join(" · ")],
    [t.software, project.software.join(" · ")],
  ];

  // Fullscreen lightbox
  if (fullscreen && window.GalleryLightbox) {
    return <GalleryLightbox imgs={imgs} activeIdx={activeImg} onClose={() => setFullscreen(false)} project={project} />;
  }

  return (
    <div className="modal-root" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label={t.closeLabel}>
          <Glyph kind="cross" size={20} />
        </button>

        <div className="modal-grid">
          {/* Gallery side */}
          <div className="modal-gallery-wrap">
            <div className="gallery-stage" onClick={() => hasGallery && setFullscreen(true)} style={{ cursor: hasGallery ? "zoom-in" : "default" }}>
              {currentImg ? (
                <img
                  src={currentImg.url}
                  alt={currentImg.cap || project.name}
                  className={`gallery-img${fading ? " is-fading" : ""}`}
                />
              ) : (
                <ProjectPlaceholder label={project.name} code={project.code} variant={1} />
              )}

              {hasGallery && (
                <>
                  <button className="gallery-arr gallery-arr-l" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Anterior">←</button>
                  <button className="gallery-arr gallery-arr-r" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Siguiente">→</button>
                </>
              )}

              {imgs.length > 0 && (
                <div className="gallery-ctr">
                  <span className="gallery-ctr-n">{String(activeImg + 1).padStart(2, "0")}</span>
                  <span className="gallery-ctr-sep">/</span>
                  <span>{String(imgs.length).padStart(2, "0")}</span>
                </div>
              )}

              {currentImg && currentImg.cap && (
                <div className="gallery-cap">{currentImg.cap}</div>
              )}

              {hasGallery && (
                <div className="gallery-fullscreen-hint">Click para pantalla completa</div>
              )}
            </div>

            {hasGallery && (
              <div className="gallery-thumbs">
                {imgs.map((img, i) => (
                  <button
                    key={i}
                    className={`gallery-thumb${i === activeImg ? " is-active" : ""}`}
                    onClick={(e) => { e.stopPropagation(); goTo(i); }}
                    aria-label={`Imagen ${i + 1}`}
                  >
                    <img src={img.url} alt={img.cap || ""} loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Ficha side */}
          <div className="modal-info">
            <div className="modal-kicker">
              <span>{t.sheet}</span>
              <span className="modal-code">{project.code}</span>
            </div>
            <h2 className="modal-title">{project.name}</h2>
            <div className="modal-sub">{ty ? ty[lang] : ""} — {project.year}</div>

            <dl className="ficha">
              {rows.map(([k, v]) => (
                <div key={k} className="ficha-row">
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>

            {imgs.length > 0 && (
              <div className="modal-photo-label">
                <span className="gallery-ctr-n">{imgs.length}</span> {t.photos || "fotos"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Fullscreen gallery lightbox ----------
function GalleryLightbox({ imgs, activeIdx = 0, onClose, project }) {
  const [idx, setIdx] = React.useState(activeIdx);
  const img = imgs[idx];
  
  const next = () => setIdx((idx + 1) % imgs.length);
  const prev = () => setIdx((idx - 1 + imgs.length) % imgs.length);
  
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx]);
  
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(14, 14, 14, 0.98)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10000,
      padding: 20,
    }}>
      <button onClick={onClose} style={{
        position: "absolute",
        top: 20,
        right: 24,
        background: "transparent",
        border: 0,
        color: "var(--accent-ink)",
        fontSize: 28,
        cursor: "pointer",
        padding: 0,
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>✕</button>
      
      <img src={img.url} alt={img.cap} style={{
        maxWidth: "90vw",
        maxHeight: "80vh",
        objectFit: "contain",
        borderRadius: 4,
      }} />
      
      <button onClick={prev} style={{
        position: "absolute",
        left: 20,
        background: "transparent",
        border: 0,
        color: "var(--accent-ink)",
        fontSize: 32,
        cursor: "pointer",
        padding: 12,
        opacity: 0.7,
      }}>‹</button>
      
      <button onClick={next} style={{
        position: "absolute",
        right: 20,
        background: "transparent",
        border: 0,
        color: "var(--accent-ink)",
        fontSize: 32,
        cursor: "pointer",
        padding: 12,
        opacity: 0.7,
      }}>›</button>
      
      <div style={{
        position: "absolute",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        color: "var(--accent-ink)",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}>
        {idx + 1} / {imgs.length}
      </div>
    </div>
  );
}

Object.assign(window, { Glyph, ProjectPlaceholder, FilterBar, ProjectCard, FichaModal, GalleryLightbox });
