import { useState, useEffect } from 'react';
import { COLLECTIONS } from './data.js';
import { Nav, Hero, About, WorkGrid, CV, Contact, ProjectDetail } from './Components.jsx';
import { useTweaks, TweaksPanel, TweakSection, TweakRadio } from './lib/tweaks.jsx';

const TWEAK_DEFAULTS = {
  theme: 'cinema',
  videoMode: 'hero',
  accentBoost: false,
  fifaHeroMode: 'full',
};

export function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', t.theme);
  }, [t.theme]);

  useEffect(() => {
    const onPop = (e) => setOpenId(e.state?.project ?? null);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const openProject = (id) => {
    window.history.pushState({ project: id }, '');
    setOpenId(id);
  };
  const closeProject = () => {
    if (window.history.state?.project) window.history.back();
    else setOpenId(null);
  };
  const collection = openId ? COLLECTIONS.find((c) => c.id === openId) : null;

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

      {collection ? (
        <ProjectDetail collection={collection} onClose={closeProject} fifaHeroMode={t.fifaHeroMode} />
      ) : null}

      <TweaksPanel />
      <TweakSection />
      <TweakRadio />
    </>
  );
}
