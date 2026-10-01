// Standalone portfolio page view (uses PortfolioSection with typology hero)
const { useState: usePortState } = React;

function PortfolioPage({ t, lang, initialFilter = "all", onOpen, onBack, sortBy = "default" }) {
  const initFilter = (() => {
    if (typeof initialFilter !== "string") return initialFilter;
    if (initialFilter.startsWith("service:")) {
      return { kind: "service", value: initialFilter.replace("service:", "") };
    }
    return { kind: "typology", value: initialFilter === "all" ? "all" : initialFilter };
  })();
  const [filter, setFilter] = React.useState(initFilter);
  const filtered = (() => {
    let base = filterProjects(PROJECTS, filter.kind, filter.value);
    base = sortProjects(base, sortBy);
    if (filter.kind === "service") {
      base = base.map((p) => ({ ...p, images: imagesForServiceFilter(p, filter) }));
    }
    return base;
  })();
  const activeTy = filter.kind === "typology" ? TYPOLOGIES.find((ty) => ty.id === filter.value) : null;
  const activeSrv = filter.kind === "service"
    ? SERVICES.find((s) => normalizeServiceKey(s.tag) === normalizeServiceKey(filter.value))
    : null;
  const title = activeTy ? (lang === "es" ? activeTy.es : activeTy.en)
    : activeSrv ? (lang === "es" ? activeSrv.es : activeSrv.en)
    : t.worksTitle;
  const introText = activeSrv
    ? (lang === "es" ? (activeSrv.long_es || activeSrv.desc_es) : (activeSrv.long_en || activeSrv.desc_en))
    : (lang === "es"
        ? "Cada proyecto se coordina bajo la misma metodología: plan BIM, modelado multidisciplinar, detección sistemática de conflictos y seguimiento en obra."
        : "Every project runs under the same methodology: BIM plan, multi-discipline modeling, systematic clash detection and on-site tracking.");

  return (
    <div>
      <section className="portfolio-hero">
        <div className="inner">
          <div style={{ paddingTop: 16, paddingBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink-soft)" }}>
            <button onClick={onBack} style={{ background: "transparent", border: 0, font: "inherit", cursor: "pointer", color: "inherit", padding: 0 }}>← {lang === "es" ? "Volver al home" : "Back home"}</button>
            <span>{t.worksTitle} / {title}</span>
          </div>
          <div className="portfolio-hero-inner">
            <h1>{title}<span style={{ color: "var(--accent)" }}>.</span></h1>
            <div className="portfolio-hero-meta">
              <p className="hero-body" style={{ margin: 0 }}>{introText}</p>
            </div>
          </div>
        </div>
      </section>
      <div className="portfolio-body">
        <div className="inner">
          <FilterBar filter={filter} onChange={setFilter} lang={lang} t={t} />
          <PortfolioMetrics filtered={filtered} lang={lang} filter={filter} />
          <PortfolioGrid filtered={filtered} lang={lang} onOpen={onOpen} />
        </div>
      </div>
    </div>
  );
}

// Portafolio como grilla de coordenadas: columnas A-D, filas numeradas,
// casillas vacias tramadas cuando sobran (mismo lenguaje de una lamina
// de planos real).
function PortfolioGrid({ filtered, lang, onOpen }) {
  const cols = 4;
  const colLetters = ["A", "B", "C", "D"];
  const rows = Math.max(1, Math.ceil(filtered.length / cols));
  const cells = [];
  for (let r = 0; r < rows; r++) {
    cells.push(<div key={`r${r}`} className="port-row-label">{r + 1}</div>);
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      const p = filtered[i];
      if (p) {
        cells.push(<ProjectCard key={p.code} project={p} lang={lang} onOpen={onOpen} index={i} />);
      } else {
        cells.push(<div key={`e${r}-${c}`} className="port-cell" style={{ background: "repeating-linear-gradient(135deg, transparent, transparent 7px, var(--rule-soft) 7px, var(--rule-soft) 8px)", cursor: "default" }} />);
      }
    }
  }
  return (
    <div className="port-grid-frame">
      <div className="port-col-labels"><span></span>{colLetters.map((l) => <span key={l}>{l}</span>)}</div>
      <div className="port-grid-body">{cells}</div>
    </div>
  );
}

Object.assign(window, { PortfolioPage });
