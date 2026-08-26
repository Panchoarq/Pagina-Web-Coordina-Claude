const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "portfolio": "mosaic",
  "sort": "typology",
  "intensity": "medium",
  "type": "grotesk",
  "accent": "#FF5B1F"
}/*EDITMODE-END*/;

function useTweaks() {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem("bim-tweaks");
      return saved ? { ...TWEAK_DEFAULTS, ...JSON.parse(saved) } : TWEAK_DEFAULTS;
    } catch { return TWEAK_DEFAULTS; }
  });
  const set = (patch) => setState((s) => {
    const next = { ...s, ...patch };
    try { localStorage.setItem("bim-tweaks", JSON.stringify(next)); } catch {}
    try { window.parent.postMessage({ type: "__edit_mode_set_keys", edits: patch }, "*"); } catch {}
    return next;
  });
  return [state, set];
}

function useEditMode() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const onMsg = (e) => {
      const d = e && e.data;
      if (!d || typeof d !== "object") return;
      if (d.type === "__activate_edit_mode") setOn(true);
      if (d.type === "__deactivate_edit_mode") setOn(false);
    };
    window.addEventListener("message", onMsg);
    try { window.parent.postMessage({ type: "__edit_mode_available" }, "*"); } catch {}
    return () => window.removeEventListener("message", onMsg);
  }, []);
  return [on, setOn];
}

function ApplyTheme({ tweaks }) {
  useEffect(() => {
    const r = document.documentElement;
    r.setAttribute("data-intensity", tweaks.intensity);
    r.setAttribute("data-portfolio", tweaks.portfolio);
    r.setAttribute("data-type", tweaks.type);
    r.style.setProperty("--accent", tweaks.accent);
  }, [tweaks]);
  return null;
}

function Site({ tweaks }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("bim-lang") || "es"; } catch { return "es"; }
  });
  useEffect(() => { try { localStorage.setItem("bim-lang", lang); } catch {} }, [lang]);
  const t = I18N[lang];

  const [view, setView] = useState("home");
  const [openProject, setOpenProject] = useState(null);

  // El sitio es un SPA sin rutas reales: cambiar de "view" (home <-> portfolio)
  // nunca tocaba el historial del navegador. Resultado: el boton Atras (o el
  // boton "atras" del mouse) no tenia nada dentro del sitio a donde volver y
  // sacaba directo al usuario de la pagina. Se agrega un entry de historial
  // por cada cambio de view, y un listener de popstate que sincroniza el
  // estado de React con lo que el navegador diga que toca mostrar.
  useEffect(() => {
    window.history.replaceState({ view: "home" }, "", "#home");
    const onPopState = (e) => {
      const v = (e.state && e.state.view) || "home";
      setView(v);
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const goToView = (target) => {
    if (target !== view) {
      window.history.pushState({ view: target }, "", "#" + target);
    }
    setView(target);
  };

  const nav = (target) => {
    if (target === "home") {
      goToView("home");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
    } else if (target.startsWith("portfolio")) {
      // Cubre "portfolio" a secas y deep-links tipo "portfolio:service:X"
      // o "portfolio:<typologyId>" (ver Services y el filtro de tipologia).
      goToView(target);
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
    } else {
      // Secciones como "services"/"contact" solo existen en el DOM cuando
      // view === "home" (ver el render de <Site> mas abajo). Si estamos en
      // otra vista (ej. portfolio) hay que volver a home primero y recien
      // ahi buscar el elemento -- si no, getElementById no encuentra nada
      // y el link del menu queda sin hacer nada (bug reportado).
      if (view !== "home") {
        goToView("home");
        requestAnimationFrame(() => requestAnimationFrame(() => {
          const el = document.getElementById(target);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }));
      } else {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="shell">
      <Header lang={lang} setLang={setLang} t={t} onNav={nav} dark={view === "home"} />
      {view === "home" && (
        <>
          <HeroB t={t} lang={lang} />
          <Experience t={t} lang={lang} />
          <PortfolioSummary t={t} lang={lang} />
          <Services t={t} lang={lang} onNav={nav} />
          <PortfolioSection t={t} lang={lang} onOpen={setOpenProject} sortBy={tweaks.sort} />
          <Contact t={t} />
        </>
      )}
      {view.startsWith("portfolio") && (
        <PortfolioPage
          t={t}
          lang={lang}
          initialFilter={view.includes(":") ? view.slice(view.indexOf(":") + 1) : "all"}
          onOpen={setOpenProject}
          onBack={() => nav("home")}
          sortBy={tweaks.sort}
        />
      )}
      <Footer t={t} />
      <FichaModal
        project={openProject}
        lang={lang}
        t={t}
        onClose={() => setOpenProject(null)}
      />
    </div>
  );
}

// Apply B theme defaults (overridden by tweaks)
document.documentElement.setAttribute("data-intensity", "subtle");
document.documentElement.setAttribute("data-portfolio", "mosaic");
document.documentElement.setAttribute("data-type", "grotesk");
document.documentElement.style.setProperty("--accent", "#0A4D8C");

function useLiveProjects() {
  // PROJECTS arranca en PROJECTS_FALLBACK (app-1.jsx). Si Airtable responde
  // bien, se reemplaza y se fuerza un remount de <Site> vía dataVersion.
  const [dataVersion, setDataVersion] = useState(0);
  useEffect(() => {
    let cancelled = false;
    fetch("/api/projects")
      .then((r) => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then((data) => {
        if (cancelled || !Array.isArray(data) || !data.length) return;
        PROJECTS = data;
        setDataVersion((v) => v + 1);
      })
      .catch((err) => {
        console.warn("[coordina] No se pudo cargar Airtable, se mantienen los datos locales:", err);
      });
    return () => { cancelled = true; };
  }, []);
  return dataVersion;
}

function App() {
  const [tweaks, setTweaks] = useTweaks();
  const [editOn, setEditOn] = useEditMode();
  const dataVersion = useLiveProjects();
  return (
    <>
      <ApplyTheme tweaks={tweaks} />
      <Site key={dataVersion} tweaks={tweaks} />
      {editOn && <TweaksPanel state={tweaks} set={setTweaks} onClose={() => setEditOn(false)} />}
    </>
  );
}

function mount() {
  if (!window.HeroB || !window.Header || !window.FichaModal || !window.PortfolioSummary || !window.TweaksPanel) return setTimeout(mount, 40);
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
}
mount();
