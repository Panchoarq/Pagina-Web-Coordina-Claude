"use client";
import { useState } from "react";

const MODES = ["Detail", "Masonry", "Slider"];

export default function ProjectGallery({ images }) {
  const [mode, setMode] = useState("Masonry");

  return (
    <div>
      <div className="gallery-toggle mono">
        {MODES.map((m) => (
          <button
            key={m}
            className={m === mode ? "is-active" : ""}
            onClick={() => setMode(m)}
          >
            {m}
          </button>
        ))}
      </div>

      {mode === "Detail" && (
        <div className="gallery-detail">
          {images.map((img) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={img.src} src={img.src} alt={img.label} />
          ))}
        </div>
      )}

      {mode === "Masonry" && (
        <div className="gallery-masonry">
          {images.map((img, i) => (
            <div key={img.src} className={`gallery-masonry-item span-${(i % 3) + 1}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.label} />
            </div>
          ))}
        </div>
      )}

      {mode === "Slider" && (
        <div className="gallery-slider">
          {images.map((img) => (
            <div key={img.src} className="gallery-slider-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.label} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
