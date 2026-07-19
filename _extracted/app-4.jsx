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
    return sortProjects(base, sortBy);
  })();
  const activeTy = filter.kind === "typology" ? TYPOLOGIES.find((ty) => ty.id === filter.value) : null;
  const activeSrv = filter.kind === "service" ? SERVICES.find((s) => s.tag === filter.value) : null;
  const title = activeTy ? (lang === "es" ? activeTy.es : activeTy.en)
    : activeSrv ? (lang === "es" ? activeSrv.es : activeSrv.en)
    : t.worksTitle;

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
              <p className="hero-body" style={{ margin: 0 }}>
                {lang === "es"
                  ? "Cada proyecto se coordina bajo la misma metodología: plan BIM, modelado multidisciplinar, detección sistemática de conflictos y seguimiento en obra."
                  : "Every project runs under the same methodology: BIM plan, multi-discipline modeling, systematic clash detection and on-site tracking."}
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="portfolio-body">
        <div className="inner">
          <FilterBar filter={filter} onChange={setFilter} lang={lang} t={t} />
          <PortfolioMetrics filtered={filtered} lang={lang} filter={filter} />
          <div className="mosaic">
            {filtered.map((p, i) => (
              <ProjectCard key={p.code} project={p} lang={lang} onOpen={onOpen} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PortfolioPage });
