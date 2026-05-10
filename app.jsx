// app.jsx — Fx3 Studio main app

const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "cinema",
  "videoMode": "hero",
  "accentBoost": false,
  "fifaHeroMode": "full"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [openId, setOpenId] = useState(null);

  // Apply theme to <html> so CSS variables flip
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", t.theme);
  }, [t.theme]);

  const openProject = (id) => setOpenId(id);
  const closeProject = () => setOpenId(null);
  const collection = openId ? window.COLLECTIONS.find((c) => c.id === openId) : null;

  return (
    <>
      <Nav />
      <main>
        <Hero videoMode={t.videoMode} />
        <About />
        <WorkGrid openProject={openProject} />
        <CV />
        <Contact />
      </main>
      <footer className="footer-row">
        <div>© {new Date().getFullYear()} Fx3 Studio · Spencer Harrison</div>
        <div>Los Angeles, CA</div>
      </footer>

      {collection ? <ProjectDetail collection={collection} onClose={closeProject} fifaHeroMode={t.fifaHeroMode} /> : null}

      <TweaksPanel title="Tweaks">
        <TweakSection label="Aesthetic" />
        <TweakRadio
          label="Theme"
          value={t.theme}
          options={[
            { value: "cinema", label: "Cinema" },
            { value: "atelier", label: "Atelier" },
            { value: "zine", label: "Zine" },
          ]}
          onChange={(v) => setTweak("theme", v)}
        />
        <div style={{ fontFamily: "var(--mono, monospace)", fontSize: 11, color: "#888", marginTop: 4, lineHeight: 1.45 }}>
          {t.theme === "cinema" && "Dark, runway-foregrounded, dramatic. Best for first impression."}
          {t.theme === "atelier" && "Refined editorial. Italic display serif, generous whitespace. Reads as polished/RTW."}
          {t.theme === "zine" && "Handmade, layered, skate-graphic. Closest to the Fx3 brand voice."}
        </div>

        <TweakSection label="Hero video" />
        <TweakRadio
          label="Mode"
          value={t.videoMode}
          options={[
            { value: "hero", label: "Hero loop" },
            { value: "off", label: "Off" },
          ]}
          onChange={(v) => setTweak("videoMode", v)}
        />

        <TweakSection label="FIFA case study hero" />
        <TweakRadio
          label="Image"
          value={t.fifaHeroMode}
          options={[
            { value: "cropped", label: "Cropped" },
            { value: "full", label: "Full frame" },
          ]}
          onChange={(v) => setTweak("fifaHeroMode", v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
