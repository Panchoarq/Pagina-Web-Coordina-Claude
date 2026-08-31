import { getDict } from "@/lib/i18n";
import Counter from "./Counter";
import styles from "./Stats.module.css";

export default function Stats({ locale, liveCount, liveArea }) {
  const dict = getDict(locale);
  const s = dict.stats;

  const cells = [
    ...s.items,
    { key: "live-projects", value: liveCount, suffix: "", label: s.liveProjects, live: true },
    { key: "live-area", value: liveArea, suffix: "", label: s.liveArea, live: true },
  ];

  return (
    <section id="cifras" className="section">
      <div className="shell">
        <div className="index-head" data-reveal>
          <p className="index-tag">{s.index}</p>
          <div>
            <h2 className="index-title">{s.title}</h2>
            <p className={styles.note}>{s.note}</p>
          </div>
        </div>

        <dl className={styles.grid}>
          {cells.map((c) => (
            <div key={c.key} className={styles.cell} data-reveal>
              <dt className={styles.value}>
                <Counter value={c.value} suffix={c.suffix} />
              </dt>
              <dd className={styles.label}>
                {c.label}
                {c.live && <span className={styles.dot} aria-hidden="true" />}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
