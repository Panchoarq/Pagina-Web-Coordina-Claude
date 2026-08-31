"use client";

import { useMemo, useState } from "react";
import { getDict, typologyLabel } from "@/lib/i18n";
import { TYPOLOGIES } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import styles from "./ProjectGrid.module.css";

export default function ProjectGrid({ locale, projects, limit, showFilters = true, heading = true }) {
  const dict = getDict(locale);
  const p = dict.projects;
  const [typology, setTypology] = useState("all");
  const [service, setService] = useState("all");

  const usedTypologies = useMemo(() => {
    const set = new Set(projects.map((x) => x.typology).filter(Boolean));
    return TYPOLOGIES.filter((t) => set.has(t.id));
  }, [projects]);

  const services = useMemo(() => {
    const set = new Set();
    projects.forEach((x) => (x.services || []).forEach((s) => set.add(s)));
    return [...set].sort();
  }, [projects]);

  const filtered = useMemo(() => {
    let list = projects;
    if (typology !== "all") list = list.filter((x) => x.typology === typology);
    if (service !== "all") list = list.filter((x) => (x.services || []).includes(service));
    if (limit) list = list.slice(0, limit);
    return list;
  }, [projects, typology, service, limit]);

  return (
    <section id="proyectos" className="section">
      <div className="shell">
        {heading && (
          <div className="index-head" data-reveal>
            <p className="index-tag">{p.index}</p>
            <div>
              <h2 className="index-title">{p.title}</h2>
              <p className={styles.subtitle}>{p.subtitle}</p>
            </div>
          </div>
        )}

        {showFilters && (
          <div className={styles.filters} role="group" aria-label={p.filterTypology}>
            <div className={styles.filterRow}>
              <span className="mono-label">{p.filterTypology}</span>
              <div className={styles.chips}>
                <button
                  className={styles.chip}
                  aria-pressed={typology === "all"}
                  onClick={() => setTypology("all")}
                >
                  {p.all}
                </button>
                {usedTypologies.map((t) => (
                  <button
                    key={t.id}
                    className={styles.chip}
                    aria-pressed={typology === t.id}
                    onClick={() => setTypology(t.id)}
                  >
                    {typologyLabel(TYPOLOGIES, t.id, locale)}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterRow}>
              <span className="mono-label">{p.filterService}</span>
              <div className={styles.chips}>
                <button
                  className={styles.chip}
                  aria-pressed={service === "all"}
                  onClick={() => setService("all")}
                >
                  {p.allServices}
                </button>
                {services.map((s) => (
                  <button
                    key={s}
                    className={styles.chip}
                    aria-pressed={service === s}
                    onClick={() => setService(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <p className={styles.count}>{p.count(filtered.length)}</p>
          </div>
        )}

        {filtered.length ? (
          <div className={styles.grid}>
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.code || i}
                project={project}
                locale={locale}
                priority={i < 3}
              />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>{p.empty}</p>
        )}
      </div>
    </section>
  );
}
