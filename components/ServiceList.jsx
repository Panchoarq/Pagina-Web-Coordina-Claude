"use client";

import { useState } from "react";
import { getDict, SERVICES } from "@/lib/i18n";
import styles from "./ServiceList.module.css";

export default function ServiceList({ locale }) {
  const dict = getDict(locale);
  const s = dict.services;
  const [open, setOpen] = useState(0);

  return (
    <section id="servicios" className="section">
      <div className="shell">
        <div className="index-head" data-reveal>
          <p className="index-tag">{s.index}</p>
          <div>
            <h2 className="index-title">{s.title}</h2>
            <p className={styles.subtitle}>{s.subtitle}</p>
          </div>
        </div>

        <ul className={styles.list}>
          {SERVICES.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.num} className={styles.row} data-reveal>
                <button
                  className={styles.head}
                  aria-expanded={isOpen}
                  aria-controls={`svc-${item.num}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className={styles.num}>{item.num}</span>
                  <span className={styles.name}>{locale === "en" ? item.en : item.es}</span>
                  <span className={styles.toggle} aria-hidden="true">
                    {isOpen ? "–" : "+"}
                  </span>
                </button>
                <div
                  id={`svc-${item.num}`}
                  className={styles.body}
                  data-open={isOpen}
                  role="region"
                >
                  <p>{locale === "en" ? item.body_en : item.body_es}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <p className={styles.software}>
          <span className="mono-label">{s.software}</span> {s.softwareValue}
        </p>
      </div>
    </section>
  );
}
