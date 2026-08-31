// Portfolio summary — real portfolio numbers (m² + project counts by category)
function PortfolioSummary({ t, lang }) {
  const s = PORTFOLIO_SUMMARY;
  return (
    <section className="section psum" id="resumen">
      <div className="inner">
        <div className="section-hdr">
          <h2 className="section-title">
            {t.summaryKicker}<span style={{ color: "var(--accent)" }}>.</span>
          </h2>
          <p className="section-sub">{t.summaryTitle}</p>
        </div>

        <div className="psum-grid">
          {/* Total general — hero cell */}
          <div className="psum-total">
            <span className="psum-total-label">{t.summaryTotalLabel}</span>
            <span className="psum-total-n num">{s.totalM2}</span>
            <div className="psum-total-foot">
              <span className="psum-total-unit">m²</span>
              <span className="psum-total-proj">{s.totalProjects} {t.summaryProjLabel}</span>
            </div>
          </div>

          {/* Category cells */}
          {s.categories.map((c, i) => (
            <div key={i} className="psum-cell">
              <div className="psum-cell-top">
                <span className="psum-glyph" style={{ color: c.color }}>
                  <Glyph kind={c.glyph} size={22} color={c.color} />
                </span>
                <span className="psum-cell-proj num">{c.projects}</span>
              </div>
              <span className="psum-cell-n num" style={{ color: c.color }}>{c.m2}</span>
              <span className="psum-cell-label">{lang === "es" ? c.es : c.en}</span>
              <span className="psum-cell-unit">m² {lang === "es" ? "coordinados" : "coordinated"}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { PortfolioSummary });
