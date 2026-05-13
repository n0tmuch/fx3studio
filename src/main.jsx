import { createRoot, hydrateRoot } from 'react-dom/client';
import './styles.css';
import './lib/image-slot.js';
import { App } from './App.jsx';

// __INITIAL_ROUTE__ is written into the prerendered HTML by scripts/prerender.mjs
// so the client's first render matches the server-rendered tree exactly. The
// runtime fallback (read the pathname) only triggers if someone serves this
// bundle without the SSG step (dev server, or a stale Vercel cache miss).
function readInitialRoute() {
  if (typeof window === 'undefined') return null;
  if (typeof window.__INITIAL_ROUTE__ !== 'undefined') return window.__INITIAL_ROUTE__;
  const m = window.location.pathname.match(/^\/work\/([^/]+)\/?$/);
  return m ? m[1] : null;
}

const container = document.getElementById('root');
const tree = <App initialRoute={readInitialRoute()} />;
// hydrate when SSG'd HTML is present (prod), fall back to createRoot for the
// dev server and any cache miss that serves the un-prerendered shell.
if (container.firstElementChild) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
