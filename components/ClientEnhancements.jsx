"use client";

import { useEffect } from "react";

/**
 * Mejora progresiva global del scroll-reveal.
 *
 * Regla de oro: el contenido JAMÁS puede quedarse invisible. Si el
 * IntersectionObserver no dispara (pestaña en segundo plano, navegador
 * throttleado, motor raro), un fallback por tiempo y otro por primer
 * scroll revelan todo igual. Sin JS, el CSS ya deja todo visible.
 */
export default function ClientEnhancements() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");

    const all = () => Array.from(document.querySelectorAll("[data-reveal]"));
    const revealAll = () => all().forEach((el) => el.classList.add("is-in"));

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      revealAll();
      return;
    }

    let io;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              io.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
      );
      const observe = () =>
        document
          .querySelectorAll("[data-reveal]:not(.is-in)")
          .forEach((el) => io.observe(el));
      observe();

      // El grid de proyectos cambia con los filtros: re-observa.
      const mo = new MutationObserver(observe);
      mo.observe(document.body, { childList: true, subtree: true });

      // Fallbacks anti "pantalla en blanco".
      const onFirstScroll = () => revealAllInView();
      const revealAllInView = () => {
        const vh = window.innerHeight || 800;
        all().forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < vh * 1.1) el.classList.add("is-in");
        });
      };
      window.addEventListener("scroll", onFirstScroll, { passive: true });
      const t1 = setTimeout(revealAllInView, 400);
      const t2 = setTimeout(revealAll, 2500);
      document.addEventListener(
        "visibilitychange",
        () => {
          if (!document.hidden) revealAllInView();
        },
        { once: false }
      );

      return () => {
        io.disconnect();
        mo.disconnect();
        window.removeEventListener("scroll", onFirstScroll);
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }

    // Sin IntersectionObserver: revela todo.
    revealAll();
  }, []);

  return null;
}
