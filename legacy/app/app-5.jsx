// Lightbox component for fullscreen gallery
const { useState, useEffect } = React;

function GalleryLightbox({ imgs, activeIdx, onClose, project }) {
  const [activeImg, setActiveImg] = useState(activeIdx);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowLeft")  setActiveImg(i => (i - 1 + imgs.length) % imgs.length);
      if (e.key === "ArrowRight") setActiveImg(i => (i + 1) % imgs.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [imgs.length, onClose]);

  const goTo = (idx) => {
    if (idx === activeImg || fading) return;
    setFading(true);
    setTimeout(() => { setActiveImg(idx); setFading(false); }, 180);
  };

  const prev = () => goTo((activeImg - 1 + imgs.length) % imgs.length);
  const next = () => goTo((activeImg + 1) % imgs.length);

  const current = imgs[activeImg] || {};

  return (
    <div className="lightbox-root" onClick={onClose}>
      <div className="lightbox" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Cerrar">
          <Glyph kind="cross" size={24} />
        </button>
        <img
          src={current.url}
          alt={current.cap || project.name}
          className={`lightbox-img${fading ? " is-fading" : ""}`}
        />
        {imgs.length > 1 && (
          <>\n            <button className="lightbox-arr lightbox-arr-l" onClick={(e) => { e.stopPropagation(); prev(); }}>←</button>
            <button className="lightbox-arr lightbox-arr-r" onClick={(e) => { e.stopPropagation(); next(); }}>→</button>
          </>
        )}
        <div className="lightbox-ctr">
          <span>{String(activeImg + 1).padStart(2, "0")} / {String(imgs.length).padStart(2, "0")}</span>
        </div>
        {current.cap && <div className="lightbox-cap">{current.cap}</div>}
      </div>
    </div>
  );
}

Object.assign(window, { GalleryLightbox });
