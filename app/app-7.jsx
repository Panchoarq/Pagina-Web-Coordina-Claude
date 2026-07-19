// Tweaks panel (controles en vivo del portafolio)
function TweaksPanel({ state, set, onClose }) {
  const seg = (key, options) => (
    <div className="tweaks-segment">
      {options.map(([v, l]) => (
        <button key={v} className={state[key] === v ? "is-active" : ""} onClick={() => set({ [key]: v })}>{l}</button>
      ))}
    </div>
  );
  const list = (key, options) => (
    <div className="tweaks-list">
      {options.map(([v, l]) => (
        <button key={v} className={`tweaks-list-btn ${state[key] === v ? "is-active" : ""}`} onClick={() => set({ [key]: v })}>
          <span className="tweaks-list-dot" />
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <div className="tweaks-panel">
      <div className="tweaks-hdr">
        <span>Tweaks</span>
        <button className="tweaks-close" onClick={onClose} aria-label="Cerrar">✕</button>
      </div>

      <div className="tweaks-group">
        <span className="tweaks-label">Grilla del portafolio</span>
        {seg("portfolio", [["mosaic", "Mosaico"], ["grid", "Grilla"], ["index", "Índice"]])}
      </div>

      <div className="tweaks-group">
        <span className="tweaks-label">Organizar proyectos por</span>
        {list("sort", [
          ["default", "Orden curado"],
          ["year", "Año — recientes primero"],
          ["area", "Superficie — mayor primero"],
          ["typology", "Tipología — agrupados"],
          ["status", "Estado — en curso primero"],
        ])}
      </div>

      <div className="tweaks-group">
        <span className="tweaks-label">Intensidad Bauhaus</span>
        {seg("intensity", [["subtle", "Sutil"], ["medium", "Media"], ["strong", "Marcada"]])}
      </div>

      <div className="tweaks-group">
        <span className="tweaks-label">Tipografía</span>
        {seg("type", [["grotesk", "Grotesk"], ["editorial", "Editorial"], ["condensed", "Condensada"]])}
      </div>

      <div className="tweaks-group">
        <span className="tweaks-label">Color de acento</span>
        <div className="tweaks-colors">
          {[
            ["#0A4D8C", "Azul"],
            ["#E63946", "Rojo"],
            ["#F4B400", "Amarillo"],
            ["#FF5B1F", "Naranja"],
            ["#111111", "Negro"],
          ].map(([c, l]) => (
            <button
              key={c}
              title={l}
              className={`tweaks-swatch ${state.accent === c ? "is-active" : ""}`}
              style={{ background: c }}
              onClick={() => set({ accent: c })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TweaksPanel });
