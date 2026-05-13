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

const SITE_BASE_META = {
  title: 'Fx3 Studio · Spencer Harrison — Fashion Designer · Los Angeles',
  description:
    'Fx3 Studio is the portfolio of Spencer Harrison, a Los Angeles fashion designer and BFA graduate of Otis College of Art and Design. Senior thesis with FIFA 1904. Mentorships with FRAME, Revolve, and Salvation Army.',
  url: 'https://fx3studio.com/',
  image: 'https://fx3studio.com/assets/fifa1904/1%20Large.jpeg',
};

const PROJECT_COVER = {
  fifa1904: 'assets/fifa1904/1%20Large.jpeg',
  'revolve-otis': 'assets/revolve/1%20Large.jpeg',
  'frame-salvation': 'assets/frame/A-group-lineup.jpeg',
  'blood-moon': 'assets/bloodmoon/page-1.jpeg',
  'fold-ease': 'assets/foldease/page-1.jpeg',
  'music-fest': 'assets/musicfest/page-1.jpg',
  trompe: 'assets/trompe/page-1.jpeg',
  'gothic-winter': 'assets/gothic/page-1.jpeg',
  'la-rose': 'assets/larose/page-1.jpeg',
  'tech-pack': 'assets/techpack/page-1.jpeg',
};

function upsertMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function setCanonical(url) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
}

function applyRouteMeta(collection) {
  const m = collection
    ? {
        title: `${collection.title} · Fx3 Studio · Spencer Harrison`,
        description: collection.blurb,
        url: `https://fx3studio.com/work/${collection.id}`,
        image: `https://fx3studio.com/${PROJECT_COVER[collection.id] || PROJECT_COVER.fifa1904}`,
      }
    : SITE_BASE_META;
  document.title = m.title;
  upsertMeta('name', 'description', m.description);
  upsertMeta('property', 'og:title', m.title);
  upsertMeta('property', 'og:description', m.description);
  upsertMeta('property', 'og:url', m.url);
  upsertMeta('property', 'og:image', m.image);
  upsertMeta('name', 'twitter:title', m.title);
  upsertMeta('name', 'twitter:description', m.description);
  upsertMeta('name', 'twitter:image', m.image);
  setCanonical(m.url);
}

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

  const collection = openId ? COLLECTIONS.find((c) => c.id === openId) : null;

  useEffect(() => {
    applyRouteMeta(collection);
  }, [openId]);

  const openProject = (id) => {
    window.history.pushState({ project: id }, '');
    setOpenId(id);
  };
  const closeProject = () => {
    if (window.history.state?.project) window.history.back();
    else setOpenId(null);
  };

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
