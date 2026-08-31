"use client";

import { useEffect, useRef, useState } from "react";

const fmt = new Intl.NumberFormat("es-CL");

/**
 * Contador que crece desde 0 hasta `value` al entrar en viewport.
 * Sin JS / reduced-motion / si el observer no dispara => valor final.
 */
export default function Counter({ value, suffix = "", duration = 1800, className = "" }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setDisplay(value);
      return;
    }

    setDisplay(0);

    const run = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        setDisplay(Math.round(eased * value));
        if (t < 1) requestAnimationFrame(tick);
        else setDisplay(value);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);

    // Fallback: si en 2.5s no disparó (pestaña oculta, etc.), muestra el valor.
    const t = setTimeout(() => {
      io.disconnect();
      if (!started.current) setDisplay(value);
    }, 2500);

    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {fmt.format(display)}
      {suffix}
    </span>
  );
}
