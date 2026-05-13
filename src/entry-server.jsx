// SSR entry: rendered by scripts/prerender.mjs after `vite build --ssr`.
// One render(url) call per static route. We deliberately do NOT import
// styles.css or lib/image-slot.js here — those are client-only side effects.

import { renderToString } from 'react-dom/server';
import { App } from './App.jsx';
import { COLLECTIONS } from './data.js';

function slugFromPath(pathname) {
  const m = pathname.match(/^\/work\/([^/]+)\/?$/);
  return m ? m[1] : null;
}

export function resolveInitialRoute(url) {
  const pathname = new URL(url, 'http://x').pathname;
  const slug = slugFromPath(pathname);
  if (!slug) return null;
  return COLLECTIONS.some((c) => c.id === slug) ? slug : null;
}

export function render(url) {
  const initialRoute = resolveInitialRoute(url);
  const html = renderToString(<App initialRoute={initialRoute} />);
  return { html, initialRoute };
}
