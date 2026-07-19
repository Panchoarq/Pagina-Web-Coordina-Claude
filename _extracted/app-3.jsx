// Header + language/tweak context
const { useState: useStateH, useEffect: useEffectH } = React;

function Header({ lang, setLang, t, onNav, onOpenTweaks, dark = false }) {
  return (
    <header className={`hdr ${dark ? "heroB-hdr" : ""}`} style={dark ? { background: "var(--ink)", color: "var(--bg)", borderColor: "rgba(255,255,255,0.2)" } : {}}>
      <div className="hdr-inner">
        <a className="hdr-logo" href="#home" onClick={(e) => { e.preventDefault(); onNav && onNav("home"); }}>
          <img src="logo-coordina-clean.png" alt="coordina BIM Consulting" className="hdr-logo-img" style={{ height: 60, width: "auto" }} />
        </a>
        <nav className="hdr-nav">
          <a href="#work" onClick={(e) => { e.preventDefault(); onNav && onNav("portfolio"); }}>{t.nav.work}</a>
          <a href="#services" onClick={(e) => { e.preventDefault(); onNav && onNav("services"); }}>{t.nav.services}</a>
          <a href="#about" onClick={(e) => e.preventDefault()}>{t.nav.about}</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); onNav && onNav("contact"); }}>{t.nav.contact}</a>
        </nav>
        <div className="hdr-right">
          <div className="lang-toggle" style={dark ? { borderColor: "var(--bg)" } : {}}>
            <button className={lang === "es" ? "is-active" : ""} onClick={() => setLang("es")} style={dark && lang !== "es" ? { color: "var(--bg)" } : {}}>ES</button>
            <button className={lang === "en" ? "is-active" : ""} onClick={() => setLang("en")} style={dark && lang !== "en" ? { color: "var(--bg)" } : {}}>EN</button>
          </div>
        </div>
      </div>
    </header>
  );
}

// --- HERO A: Paper Bauhaus poster ---
function HeroA({ t, lang }) {
  return (
    <section className="hero heroA">
      <div className="inner">
        <div className="hero-status">
          <span><span className="live-dot" />Santiago · {new Date().getFullYear()}</span>
          <span>N° 01 / Variant · Paper</span>
        </div>
        <div className="heroA-grid">
          <div className="heroA-circle" />
          <div className="heroA-geo g1"><Glyph kind="disc" size={44} /></div>
          <div className="heroA-geo g2"><Glyph kind="triangle" size={52} /></div>

          <div className="heroA-left">
            <span className="kicker">{t.heroKicker}</span>
            <h1 className="hero-title display" style={{ marginTop: 24 }}>
              {t.heroTitle1.split(" ").map((w, i) => (
                <span key={i} style={{ display: "inline-block", marginRight: "0.25em" }}>
                  {i === (lang === "es" ? 3 : 1) ? <em>{w}</em> : w}
                </span>
              ))}
            </h1>
          </div>
          <div className="heroA-right">
            <p className="hero-body">{t.heroBody}</p>
            <div className="heroA-ctas">
              <a className="btn btn-primary" href="#work">
                {t.ctaWork}
                <span>→</span>
              </a>
              <a className="btn btn-ghost" href="#services">{t.nav.services}</a>
            </div>
          </div>
        </div>
        <div className="heroA-stats">
          {t.stats.map((s, i) => (
            <div key={i} className="heroA-stat">
              <span className="heroA-stat-n num">{s.n}</span>
              <span className="heroA-stat-l">{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- HERO B: Dark isometric poster ---
function HeroB({ t, lang }) {
  const bgUrl = (window.__resources && window.__resources.hospitalMep) || "fotos/hospital-mep-inv.jpg";
  return (
    <section className="hero heroB">
      <div className="heroB-bg" style={{ backgroundImage: `url(${bgUrl})` }} />
      <HeroSignals />
      <div className="heroB-bg-fade" />
      <div className="inner">
        <div className="hero-status">
          <span><span className="live-dot" />Coordinando {PROJECTS.filter(p => p.status.includes("curso")).length} proyectos en vivo</span>
          <span>Modelo MEP · Hospital</span>
        </div>
        <div className="heroB-grid">
          <div>
            <span className="kicker" style={{ color: "rgba(255,255,255,0.75)" }}>{t.heroKicker}</span>
            <h1 className="heroB-title" style={{ marginTop: 28 }}>
              {t.heroTitle2.split(".").filter(Boolean).map((ln, i) => (
                <div key={i} style={{ marginBottom: 4 }}>
                  {i === 1 ? <span className="stroke">{ln.trim()}.</span> : <span>{ln.trim()}.</span>}
                </div>
              ))}
            </h1>
            <p className="hero-body heroB-body" style={{ marginTop: 28 }}>{t.heroBody}</p>
            <div className="heroA-ctas" style={{ marginTop: 28 }}>
              <a className="btn btn-primary" href="#work">{t.ctaWork} →</a>
              <a className="btn btn-ghost" href="#services">{t.nav.services}</a>
            </div>
          </div>
          <div className="heroB-clash">
            <span className="heroB-clash-dot" />
            <span className="heroB-clash-label">Clash detection — coordinación en vivo</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Animated data signals tracing isometric duct runs over the hero background
function HeroSignals() {
  // Isometric duct paths (2:1 slope), bleeding off both edges
  const paths = [
    { d: "M -80 250 L 470 525 L 960 280 L 1520 560", beat: true },
    { d: "M -80 610 L 360 390 L 800 610 L 1200 390 L 1520 610", beat: false },
    { d: "M 220 -60 L 640 150 L 640 440 L 1080 660", beat: true },
    { d: "M -80 470 L 420 470 L 660 590 L 1520 590", beat: false },
  ];
  // Each signal: which path, duration, delay
  const signals = [
    { p: 0, dur: 7,   delay: 0 },
    { p: 0, dur: 7,   delay: 3.5 },
    { p: 1, dur: 9,   delay: 1.2 },
    { p: 2, dur: 6.5, delay: 0.6 },
    { p: 2, dur: 6.5, delay: 3.8 },
    { p: 3, dur: 8,   delay: 2.2 },
  ];
  return (
    <svg className="heroB-signals" viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {paths.map((pth, i) => (
        <path
          key={`l${i}`}
          d={pth.d}
          className={`signal-line${pth.beat ? " beat" : ""}`}
          style={pth.beat ? { animationDelay: `${i * 0.5}s` } : undefined}
        />
      ))}
      {signals.map((s, i) => (
        <circle key={`s${i}`} r="4" className="signal-dot">
          <animateMotion dur={`${s.dur}s`} begin={`${s.delay}s`} repeatCount="indefinite" path={paths[s.p].d} rotate="auto" />
        </circle>
      ))}
      {signals.map((s, i) => (
        <circle key={`g${i}`} r="10" className="signal-glow">
          <animateMotion dur={`${s.dur}s`} begin={`${s.delay}s`} repeatCount="indefinite" path={paths[s.p].d} />
        </circle>
      ))}
    </svg>
  );
}

function IsoDiagram() {
  return (
    <svg viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ color: "rgba(255,255,255,0.9)" }}>
      <circle cx="200" cy="200" r="180" stroke="rgba(255,255,255,0.25)" />
      {/* Isometric stack of 3 building blocks */}
      <g transform="translate(200 80)">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${-60 * (2 - i)}, ${60 * i})`}>
            <path d="M0 0 L70 -35 L140 0 L70 35 Z" />
            <path d="M0 0 L0 50 L70 85 L70 35" />
            <path d="M140 0 L140 50 L70 85" />
            {/* Verticals */}
            <line x1="28" y1="14" x2="28" y2="64" />
            <line x1="56" y1="28" x2="56" y2="78" />
            <line x1="98" y1="24" x2="98" y2="74" />
            <line x1="112" y1="16" x2="112" y2="66" />
          </g>
        ))}
      </g>
      {/* accent clash */}
      <g transform="translate(210 220)">
        <circle r="20" fill="#0A4D8C" stroke="none" />
        <circle r="10" fill="#fff" />
      </g>
    </svg>
  );
}

// --- HERO C: Editorial index ---
function HeroC({ t, lang }) {
  return (
    <section className="hero heroC">
      <div className="inner">
        <div className="hero-status">
          <span><span className="live-dot" />Est. 2011 · Santiago</span>
          <span>N° 03 / Variant · Editorial index</span>
        </div>
        <div className="heroC-grid">
          <div className="heroC-left">
            <span className="kicker">{t.heroKicker}</span>
            <h1 className="heroC-title">
              <div>{t.heroTitle3.split(". ")[0]}.</div>
              <div className="line2" style={{ color: "var(--accent)" }}>{t.heroTitle3.split(". ")[1] || ""}</div>
            </h1>
            <p className="hero-body" style={{ marginTop: 16 }}>{t.heroBody}</p>
            <div className="heroA-ctas" style={{ marginTop: 24 }}>
              <a className="btn btn-primary" href="#work">{t.ctaWork} →</a>
            </div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, fontFamily: "var(--font-mono)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--ink-soft)" }}>
              <span>Tipologías</span>
              <span>2011 — {new Date().getFullYear()}</span>
            </div>
            <div className="heroC-idx">
              {TYPOLOGIES.map((ty, i) => {
                const count = PROJECTS.filter(p => p.typology === ty.id).length;
                return (
                  <div key={ty.id} className="heroC-idx-row">
                    <span className="heroC-idx-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="heroC-idx-name">{ty[lang]}</span>
                    <span className="heroC-idx-desc">{count} proyecto{count === 1 ? "" : "s"}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Experience / Trayectoria ---
function Experience({ t, lang }) {
  const [activeTy, setActiveTy] = React.useState(null);
  const tyRow = activeTy ? M2_BY_TYPE.find((r) => r.id === activeTy) : null;
  const fmtM2 = (n) => n >= 1000000
    ? (n / 1000000).toFixed(1) + "M"
    : n >= 1000
    ? Math.round(n / 1000) + "K"
    : String(n);

  const stats = t.expHighlights.map((h, i) => {
    if (i === 1) return { n: tyRow ? "+" + tyRow.count : h.n, l: h.l };
    if (i === 2) return { n: tyRow ? fmtM2(tyRow.m2) : h.n, l: h.l };
    return h;
  });

  return (
    <section className="section exp" id="about">
      <div className="inner">
        <div className="exp-grid">
          <div className="exp-left">
            <span className="kicker">{t.expKicker}</span>
            <h2 className="exp-title">{t.expTitle}</h2>
            <p className="exp-body">{t.expBody}</p>
            <div className="exp-complex">
              <span className="exp-complex-label">
                <Glyph kind="disc" size={14} color="var(--accent)" />
                {t.expComplex}
              </span>
              <div className="exp-complex-list">
                {t.expComplexList.map((c, i) => {
                  const id = TYPOLOGIES[i] ? TYPOLOGIES[i].id : null;
                  const isActive = id && id === activeTy;
                  return (
                    <button
                      key={i}
                      type="button"
                      className={"exp-tag" + (isActive ? " is-active" : "")}
                      onClick={() => setActiveTy(isActive ? null : id)}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="exp-right">
            {stats.map((h, i) => (
              <div key={i} className="exp-stat">
                <span className="exp-stat-n num">{h.n}</span>
                <span className="exp-stat-l">{h.l}{i > 0 && tyRow ? ` — ${lang === "es" ? tyRow.es : tyRow.en}` : ""}</span>
              </div>
            ))}
            <div className="exp-geo">
              <Glyph kind="ring" size={64} color="var(--accent)" stroke={1.2} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Metrics m2 Panel ---
function MetricsPanel({ t, lang }) {
  const total = M2_BY_TYPE.reduce((s, r) => s + r.m2, 0);
  const max = Math.max(...M2_BY_TYPE.map(r => r.m2));
  const fmt = (n) => n >= 1000000
    ? (n / 1000000).toFixed(1) + "M"
    : n >= 1000
    ? Math.round(n / 1000) + "K"
    : n;

  return (
    <section className="section" id="metrics" style={{ background: "var(--bg)", borderTop: "1px solid var(--rule-soft)" }}>
      <div className="inner">
        <div className="section-hdr">
          <h2 className="section-title">
            {lang === "es" ? "Superficie coordinada" : "Coordinated area"}
            <span style={{ color: "var(--accent)" }}>.</span>
          </h2>
          <p className="section-sub">
            {lang === "es"
              ? `${fmt(total)} m² modelados en ${M2_BY_TYPE.reduce((s,r)=>s+r.count,0)} proyectos, distribuidos en ${M2_BY_TYPE.length} tipologías.`
              : `${fmt(total)} m² modeled across ${M2_BY_TYPE.reduce((s,r)=>s+r.count,0)} projects in ${M2_BY_TYPE.length} typologies.`}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 48 }}>
          {M2_BY_TYPE.map((row) => {
            const pct = (row.m2 / max) * 100;
            return (
              <div key={row.id} style={{ display: "grid", gridTemplateColumns: "200px 1fr 80px 60px", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: "var(--fg)", fontFamily: "var(--f-sans)", letterSpacing: "0.02em", textAlign: "right" }}>
                  {lang === "es" ? row.es : row.en}
                </span>
                <div style={{ height: 8, background: "var(--rule-soft)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{
                    height: "100%",
                    width: `${pct}%`,
                    background: "var(--accent)",
                    borderRadius: 4,
                    transition: "width 1s ease"
                  }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fg)", fontFamily: "var(--f-mono, monospace)", textAlign: "right" }}>
                  {fmt(row.m2)} m²
                </span>
                <span style={{ fontSize: 11, color: "var(--fg-soft)", fontFamily: "var(--f-sans)", textAlign: "right" }}>
                  {row.count} proy.
                </span>
              </div>
            );
          })}
        </div>

        <div style={{
          marginTop: 32,
          paddingTop: 24,
          borderTop: "1px solid var(--rule-soft)",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "baseline",
          gap: 12
        }}>
          <span style={{ fontSize: 13, color: "var(--fg-soft)", fontFamily: "var(--f-sans)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            {lang === "es" ? "Total coordinado" : "Total coordinated"}
          </span>
          <span style={{ fontSize: 40, fontWeight: 700, color: "var(--accent)", fontFamily: "var(--f-sans)", lineHeight: 1 }}>
            {fmt(total)}
          </span>
          <span style={{ fontSize: 18, color: "var(--fg)", fontFamily: "var(--f-sans)" }}>m²</span>
        </div>
      </div>
    </section>
  );
}

// --- Services ---
function Services({ t, lang, onNav }) {
  const glyphs = ["circle", "square", "triangle", "halfCircle", "plus", "ring", "diamond", "quarter"];
  const [hovered, setHovered] = React.useState(null);
  return (
    <section className="section" id="services">
      <div className="inner">
        <div className="section-hdr">
          <h2 className="section-title">
            {t.servicesTitle}
            <span style={{ color: "var(--accent)" }}>.</span>
          </h2>
          <p className="section-sub">{t.servicesSubtitle}</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => {
            const clickable = !!s.tag;
            const count = clickable ? PROJECTS.filter(p => p.services && p.services.includes(s.tag)).length : 0;
            return (
              <div
                key={s.num}
                className="service-cell"
                onMouseEnter={() => setHovered(s.num)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => clickable && onNav && onNav("portfolio:service:" + s.tag)}
                style={{
                  cursor: clickable ? "pointer" : "default",
                  transition: "border-color 0.2s, background 0.2s",
                  borderColor: hovered === s.num && clickable ? "var(--accent)" : undefined,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span className="service-num">{s.num}</span>
                  <span className="service-glyph"><Glyph kind={glyphs[i]} size={22} /></span>
                </div>
                <h3 className="service-name">{lang === "es" ? s.es : s.en}</h3>
                <p className="service-desc">{lang === "es" ? s.desc_es : s.desc_en}</p>
                {clickable && (
                  <div style={{ marginTop: 12, fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: "0.08em", color: "var(--accent)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>{count} {lang === "es" ? "proyectos" : "projects"}</span>
                    <span style={{ opacity: hovered === s.num ? 1 : 0, transition: "opacity 0.2s" }}>Ver portafolio →</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// --- Filter bar for portfolio ---
function FilterBar({ filter, onChange, lang, t }) {
  return (
    <div className="filter-bar">
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <button
          onClick={() => onChange({ kind: "typology", value: "all" })}
          className={`filter-pill ${filter.kind === "typology" && filter.value === "all" ? "is-active" : ""}`}
          style={{
            padding: "8px 16px",
            borderRadius: 24,
            border: `1px solid ${filter.kind === "typology" && filter.value === "all" ? "var(--accent)" : "var(--rule-soft)"}`,
            background: filter.kind === "typology" && filter.value === "all" ? "var(--accent)" : "transparent",
            color: filter.kind === "typology" && filter.value === "all" ? "var(--accent-ink)" : "var(--ink)",
            cursor: "pointer",
            font: "inherit",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            transition: "all 0.2s",
          }}
        >
          {t.filterAll}
        </button>
        {TYPOLOGIES.map((ty) => (
          <button
            key={ty.id}
            onClick={() => onChange({ kind: "typology", value: ty.id })}
            className={`filter-pill ${filter.kind === "typology" && filter.value === ty.id ? "is-active" : ""}`}
            style={{
              padding: "8px 16px",
              borderRadius: 24,
              border: `1px solid ${filter.kind === "typology" && filter.value === ty.id ? "var(--accent)" : "var(--rule-soft)"}`,
              background: filter.kind === "typology" && filter.value === ty.id ? "var(--accent)" : "transparent",
              color: filter.kind === "typology" && filter.value === ty.id ? "var(--accent-ink)" : "var(--ink)",
              cursor: "pointer",
              font: "inherit",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              transition: "all 0.2s",
            }}
          >
            {lang === "es" ? ty.es : ty.en}
          </button>
        ))}
      </div>
    </div>
  );
}

// --- Portfolio section (for home & standalone) ---
function PortfolioSection({ t, lang, onOpen, showIntro = true, sortBy = "default" }) {
  const [filter, setFilter] = React.useState({ kind: "typology", value: "all" });
  const filtered = (() => {
    let base = filterProjects(PROJECTS, filter.kind, filter.value);
    return sortProjects(base, sortBy);
  })();

  return (
    <section className="section" id="work">
      <div className="inner">
        {showIntro && (
          <div className="works-intro">
            <h2 className="section-title">
              {t.worksTitle}<span style={{ color: "var(--accent)" }}>.</span>
            </h2>
            <p className="section-sub">{t.worksSubtitle}</p>
          </div>
        )}
        <FilterBar filter={filter} onChange={setFilter} lang={lang} t={t} />
        <PortfolioMetrics filtered={filtered} lang={lang} filter={filter} />
        <div className="mosaic">
          {filtered.map((p, i) => (
            <ProjectCard key={p.code} project={p} lang={lang} onOpen={onOpen} onFilterChange={setFilter} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Contact + Footer ---
function Contact({ t }) {
  const [sent, setSent] = React.useState(false);
  return (
    <section className="contact" id="contact">
      <div className="inner">
        <div className="contact-grid">
          <div>
            <h2 className="contact-title">{t.contactTitle}<span style={{ color: "var(--accent)" }}>.</span></h2>
            <p className="contact-body" style={{ marginTop: 24 }}>{t.contactBody}</p>
            <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              <div style={{ display: "flex", gap: 16 }}><span style={{ color: "var(--ink-mute)", minWidth: 80 }}>Email</span><span>hola@bimconsulting.cl</span></div>
              <div style={{ display: "flex", gap: 16 }}><span style={{ color: "var(--ink-mute)", minWidth: 80 }}>Tel</span><span>+56 2 2977 0000</span></div>
              <div style={{ display: "flex", gap: 16 }}><span style={{ color: "var(--ink-mute)", minWidth: 80 }}>Oficina</span><span>Av. Apoquindo 4700, Las Condes</span></div>
            </div>
          </div>
          <form className="contact-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <input type="text" placeholder="Nombre / Name" required />
            <input type="email" placeholder="Email" required />
            <input type="text" placeholder="Empresa / Company" />
            <textarea placeholder="Cuéntanos del proyecto / Tell us about your project" required />
            <button type="submit" className="btn btn-primary" style={{ alignSelf: "flex-start", marginTop: 4 }}>
              {sent ? "✓ Enviado" : "Enviar →"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer({ t }) {
  return (
    <footer className="ftr">
      <div className="ftr-inner">
        <div>© 2026 coordina Bim Consulting</div>
        <div className="ftr-center">
          <a href="#">LinkedIn</a>
          <a href="#">Instagram</a>
          <a href="#">Vimeo</a>
        </div>
        <div className="ftr-right">{t.footer}</div>
      </div>
    </footer>
  );
}

// --- Portfolio live metrics ---
function PortfolioMetrics({ filtered, lang, filter }) {
  const totalM2 = filtered.reduce((sum, p) => {
    const n = parseInt(String(p.area || '').replace(/[^\d]/g, '')) || 0;
    return sum + n;
  }, 0);
  const fmt = (n) => n >= 1000000 ? (n/1000000).toFixed(1) + 'M' : n >= 1000 ? Math.round(n/1000) + 'K' : n;
  if (!filtered.length) return null;
  return (
    <div style={{ display: "flex", gap: 24, margin: "16px 0 28px", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--ink-soft)", textTransform: "uppercase", borderBottom: "1px solid var(--rule-soft)", paddingBottom: 16 }}>
      <span><b style={{ color: "var(--ink)", fontSize: 20, fontFamily: "var(--font-sans)" }}>{filtered.length}</b> {lang === "es" ? "proyectos" : "projects"}</span>
      <span><b style={{ color: "var(--ink)", fontSize: 20, fontFamily: "var(--font-sans)" }}>{fmt(totalM2)}</b> m²</span>
    </div>
  );
}

Object.assign(window, { Header, HeroA, HeroB, HeroC, Experience, Services, PortfolioSection, Contact, Footer, FilterBar, PortfolioMetrics });
