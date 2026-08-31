"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDict } from "@/lib/i18n";
import styles from "./Header.module.css";

export default function Header({ locale }) {
  const dict = getDict(locale);
  const pathname = usePathname() || `/${locale}`;
  const rest = pathname.replace(/^\/(es|en)/, "") || "";
  const other = locale === "es" ? "en" : "es";

  const links = [
    { href: `/${locale}#proyectos`, label: dict.nav.projects, primary: true },
    { href: `/${locale}#servicios`, label: dict.nav.services, primary: true },
    { href: `/${locale}#estudio`, label: dict.nav.studio },
    { href: `/${locale}#contacto`, label: dict.nav.contact },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href={`/${locale}`} className={styles.wordmark} aria-label="coordina BIM Consulting — inicio">
          coordina<span className={styles.mark}>BIM</span>
        </Link>

        <nav className={styles.nav} aria-label={dict.nav.projects}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={[
                styles.link,
                l.primary ? styles.linkPrimary : styles.linkGhost,
              ].join(" ")}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <Link
          href={`/${other}${rest}`}
          className={styles.lang}
          aria-label={other === "en" ? "Switch to English" : "Cambiar a español"}
        >
          <span aria-current={locale === "es"}>ES</span>
          <span className={styles.slash}>/</span>
          <span aria-current={locale === "en"}>EN</span>
        </Link>
      </div>
    </header>
  );
}
