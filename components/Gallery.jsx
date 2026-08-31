"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import styles from "./Gallery.module.css";

const TAG_LABELS = {
  es: { all: "Todas", NP: "Nube de puntos / Escaneo", AB: "As-Built", generic: "Generales" },
  en: { all: "All", NP: "Point cloud / Scan", AB: "As-Built", generic: "General" },
};

export default function Gallery({ images = [], locale = "es", projectName = "" }) {
  const L = TAG_LABELS[locale] || TAG_LABELS.es;
  const [tag, setTag] = useState("all");

  const availableTags = useMemo(() => {
    const set = new Set(images.map((i) => i.tag || "generic"));
    return [...set];
  }, [images]);

  const showFilters = availableTags.length > 1;

  const filtered = useMemo(() => {
    if (tag === "all") return images;
    if (tag === "generic") return images.filter((i) => !i.tag);
    return images.filter((i) => i.tag === tag);
  }, [images, tag]);

  if (!images.length) return null;

  return (
    <div className={styles.wrap}>
      {showFilters && (
        <div className={styles.filters}>
          <button
            className={styles.chip}
            aria-pressed={tag === "all"}
            onClick={() => setTag("all")}
          >
            {L.all}
          </button>
          {availableTags.map((t) => (
            <button
              key={t}
              className={styles.chip}
              aria-pressed={tag === t}
              onClick={() => setTag(t)}
            >
              {L[t] || t}
            </button>
          ))}
        </div>
      )}

      <div className={styles.grid}>
        {filtered.map((img, i) => (
          <figure key={img.url + i} className={styles.figure}>
            <div className={styles.imgWrap}>
              <Image
                src={img.url}
                alt={img.cap || `${projectName} — ${i + 1}`}
                fill
                sizes="(max-width: 700px) 100vw, 50vw"
                className={styles.img}
                unoptimized
              />
            </div>
            {img.cap && <figcaption className={styles.cap}>{img.cap}</figcaption>}
          </figure>
        ))}
      </div>
    </div>
  );
}
