// Post-build prerender: write a real HTML shell for the home, /cv, and every
// /work/<slug> so non-JS crawlers (LinkedIn unfurl, AI WebFetch, ATS scrapers,
// Googlebot first pass) read route-specific title / meta / OG / JSON-LD plus
// the project's text content. React's createRoot.render() in main.jsx replaces
// #root on mount, so the static shell never visibly competes with the SPA.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = resolve(ROOT, 'dist');

const dataUrl = pathToFileURL(resolve(ROOT, 'src/data.js')).href;
const {
  COLLECTIONS,
  BIO_LONG,
  BIO_SUMMARY,
  EXPERIENCE,
  EDUCATION,
  SITE,
  SKILLS,
} = await import(dataUrl);

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

const esc = (s) => String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

// Hidden via a CSS class loaded by the bundled stylesheet, not an inline style.
// Inline `clip:rect(0 0 0 0); width:1px; height:1px` is the canonical "sr-only"
// pattern that cheap content extractors (AI fetchers, link-preview bots, ATS
// scrapers) treat as hidden and skip — exactly the consumers we're prerendering
// for. With class-based hiding, real browsers (which fetch + parse the bundled
// CSS) hide the shell before paint, but raw-HTML readers see the full content.
// React's createRoot.render() wipes #root's children on first mount.

const builtIndex = await readFile(resolve(DIST, 'index.html'), 'utf8');
const jsHref = builtIndex.match(/<script type="module" crossorigin src="([^"]+)"><\/script>/)?.[1];
const cssHref = builtIndex.match(/<link rel="stylesheet" crossorigin href="([^"]+)">/)?.[1];
if (!jsHref || !cssHref) {
  console.error('prerender: could not find hashed JS/CSS in dist/index.html');
  process.exit(1);
}

// ---------- shared head ----------
function commonHead({ title, description, url, image, imageAlt, jsonLd }) {
  return `  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <meta name="author" content="Spencer Harrison" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="${esc(url)}" />

  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="apple-touch-icon" href="/favicon.svg" />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Fx3 Studio" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${esc(url)}" />
  <meta property="og:image" content="${esc(image)}" />
  <meta property="og:image:alt" content="${esc(imageAlt)}" />
  <meta property="og:locale" content="en_US" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${esc(image)}" />

  <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
  </script>
  <script type="module" crossorigin src="${jsHref}"></script>
  <link rel="stylesheet" crossorigin href="${cssHref}">`;
}

// ---------- shared JSON-LD nodes ----------
const personNode = {
  '@type': 'Person',
  '@id': 'https://fx3studio.com/#spencer',
  name: 'Spencer Harrison',
  jobTitle: 'Fashion Designer',
  description:
    'Spencer Harrison is a Los Angeles-based fashion designer and BFA graduate of Otis College of Art and Design. Their work integrates compelling conceptualization and skillful visualization across womenswear, menswear, and knitwear.',
  url: 'https://fx3studio.com/',
  email: 'spencer@fx3studio.com',
  image: 'https://fx3studio.com/assets/fifa1904/1%20Large.jpeg',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Los Angeles',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Otis College of Art and Design',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Los Angeles',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
  },
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Fashion Designer',
    skills: SKILLS.join(', '),
  },
  sameAs: ['https://www.instagram.com/fx3studiodesigns'],
  worksFor: { '@id': 'https://fx3studio.com/#studio' },
};

const orgNode = {
  '@type': 'Organization',
  '@id': 'https://fx3studio.com/#studio',
  name: 'Fx3 Studio',
  url: 'https://fx3studio.com/',
  logo: 'https://fx3studio.com/favicon.svg',
  founder: { '@id': 'https://fx3studio.com/#spencer' },
  description:
    'Fx3 Studio is a Los Angeles fashion atelier founded by Spencer Harrison. We make pieces inspired by music, skateboarding, and underground art culture, with handmade detail and authentic expression at the core.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Los Angeles',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
  sameAs: ['https://www.instagram.com/fx3studiodesigns'],
};

const websiteNode = {
  '@type': 'WebSite',
  '@id': 'https://fx3studio.com/#website',
  url: 'https://fx3studio.com/',
  name: 'Fx3 Studio',
  description: 'Portfolio of fashion designer Spencer Harrison.',
  publisher: { '@id': 'https://fx3studio.com/#studio' },
  inLanguage: 'en-US',
};

const creativeWorkNode = (c) => ({
  '@type': 'CreativeWork',
  name: c.title,
  url: `https://fx3studio.com/work/${c.id}`,
  creator: { '@id': 'https://fx3studio.com/#spencer' },
  ...(c.year ? { dateCreated: String(c.year) } : {}),
  keywords: c.tags.join(', '),
  about: c.blurb,
});

// ---------- per-project page ----------
function projectShell(c) {
  return `<div class="prerender-shell">
      <header>
        <a href="/">Fx3 Studio · Spencer Harrison</a>
      </header>
      <article>
        <p>${esc(c.no)} · ${esc(c.category)}${c.year ? ' · ' + esc(c.year) : ''}</p>
        <h1>${esc(c.title)}</h1>
        <p>${esc(c.subtitle)}</p>
        <p><strong>Role:</strong> ${esc(c.role)}</p>
        <p><strong>Looks:</strong> ${esc(c.looks)}</p>
        <h2>About this project</h2>
        <p>${esc(c.blurb)}</p>
        <h2>Concept</h2>
        <p>${esc(c.concept)}</p>
        <h2>Tags</h2>
        <ul>
          ${c.tags.map((t) => `<li>${esc(t)}</li>`).join('\n          ')}
        </ul>
        <p><a href="/">Back to all work</a></p>
      </article>
    </div>`;
}

function projectPage(c) {
  const cover = PROJECT_COVER[c.id] || PROJECT_COVER.fifa1904;
  const title = `${c.title} · Fx3 Studio · Spencer Harrison`;
  const description = c.blurb;
  const url = `https://fx3studio.com/work/${c.id}`;
  const image = `https://fx3studio.com/${cover}`;
  const imageAlt = `${c.title}: hero image from Spencer Harrison's Fx3 Studio portfolio`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [personNode, orgNode, websiteNode, creativeWorkNode(c)],
  };

  return `<!doctype html>
<html lang="en" data-theme="cinema">
<head>
${commonHead({ title, description, url, image, imageAlt, jsonLd })}
</head>
<body>
  <div id="root">
    ${projectShell(c)}
  </div>
</body>
</html>
`;
}

// ---------- home page ----------
function homeShell() {
  const expBlock = EXPERIENCE.map(
    (e) => `
        <article>
          <h3>${esc(e.role)} · ${esc(e.company)}</h3>
          <p>${esc(e.period)}</p>
          <ul>
            ${e.bullets.map((b) => `<li>${esc(b)}</li>`).join('\n            ')}
          </ul>
        </article>`,
  ).join('');

  const eduBlock = EDUCATION.map(
    (e) => `
        <article>
          <h3>${esc(e.school)}</h3>
          <p>${esc(e.degree)}</p>
          <p>${esc(e.period)} · ${esc(e.location)}</p>
        </article>`,
  ).join('');

  const workList = [...COLLECTIONS]
    .sort((a, b) => a.no.localeCompare(b.no))
    .map(
      (c) => `<li><a href="/work/${esc(c.id)}">${esc(c.no)} · ${esc(c.title)}${c.year ? ' (' + esc(c.year) + ')' : ''} · ${esc(c.subtitle)}</a></li>`,
    )
    .join('\n          ');

  return `<div class="prerender-shell">
      <header>
        <h1>Fx3 Studio · Spencer Harrison</h1>
        <p>${esc(SITE.role)} · ${esc(SITE.location)}</p>
        <p>${esc(SITE.tagline)}</p>
      </header>
      <section>
        <h2>About</h2>
        <p>${esc(BIO_SUMMARY)}</p>
        ${BIO_LONG.map((p) => `<p>${esc(p)}</p>`).join('\n        ')}
      </section>
      <section>
        <h2>Selected work</h2>
        <ul>
          ${workList}
        </ul>
      </section>
      <section>
        <h2>Experience</h2>${expBlock}
      </section>
      <section>
        <h2>Education</h2>${eduBlock}
      </section>
      <section>
        <h2>Skills</h2>
        <p>${SKILLS.map(esc).join(' · ')}</p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>Email: <a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></p>
        <p>Instagram: <a href="https://instagram.com/fx3studiodesigns">${esc(SITE.instagram)}</a></p>
        <p>Studio: ${esc(SITE.location)}</p>
      </section>
    </div>`;
}

function homePage() {
  const title = 'Fx3 Studio · Spencer Harrison — Fashion Designer · Los Angeles';
  const description =
    'Fx3 Studio is the portfolio of Spencer Harrison, a Los Angeles fashion designer and BFA graduate of Otis College of Art and Design. Senior thesis with FIFA 1904. Mentorships with FRAME, Revolve, and Salvation Army. Womenswear, menswear, knitwear, tech packs.';
  const url = 'https://fx3studio.com/';
  const image = 'https://fx3studio.com/assets/fifa1904/1%20Large.jpeg';
  const imageAlt =
    'Fx3 Studio — Spencer Harrison, FIFA 1904 × Otis senior thesis editorial hero';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      personNode,
      orgNode,
      websiteNode,
      ...COLLECTIONS.map(creativeWorkNode),
    ],
  };

  return `<!doctype html>
<html lang="en" data-theme="cinema">
<head>
${commonHead({ title, description, url, image, imageAlt, jsonLd })}
</head>
<body>
  <div id="root">
    ${homeShell()}
  </div>
</body>
</html>
`;
}

// ---------- /cv page (standalone, no React) ----------
function cvPage() {
  const title = 'Curriculum Vitae · Spencer Harrison · Fx3 Studio';
  const description = `${BIO_SUMMARY} BFA Fashion Design, Otis College of Art and Design.`;
  const url = 'https://fx3studio.com/cv';
  const image = 'https://fx3studio.com/assets/fifa1904/1%20Large.jpeg';

  const expBlock = EXPERIENCE.map(
    (e) => `
      <article class="cv-entry">
        <h3>${esc(e.role)}</h3>
        <p class="meta">${esc(e.company)} · ${esc(e.period)}</p>
        <ul>
          ${e.bullets.map((b) => `<li>${esc(b)}</li>`).join('\n          ')}
        </ul>
      </article>`,
  ).join('');

  const eduBlock = EDUCATION.map(
    (e) => `
      <article class="cv-entry">
        <h3>${esc(e.school)}</h3>
        <p>${esc(e.degree)}</p>
        <p class="meta">${esc(e.period)} · ${esc(e.location)}</p>
      </article>`,
  ).join('');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: personNode,
    url,
  };

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <meta name="author" content="Spencer Harrison" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${esc(url)}" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

  <meta property="og:type" content="profile" />
  <meta property="og:site_name" content="Fx3 Studio" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${esc(url)}" />
  <meta property="og:image" content="${esc(image)}" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="${esc(image)}" />

  <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
  </script>

  <style>
    :root { color-scheme: light; }
    body { font-family: Georgia, serif; max-width: 760px; margin: 48px auto; padding: 0 24px; color: #111; line-height: 1.55; background: #fff; }
    h1 { font-size: 32px; margin-bottom: 4px; }
    h2 { font-size: 13px; letter-spacing: 0.18em; text-transform: uppercase; margin-top: 36px; margin-bottom: 16px; border-bottom: 1px solid #000; padding-bottom: 8px; }
    h3 { font-size: 16px; margin-top: 20px; margin-bottom: 2px; }
    p { margin: 4px 0; }
    p.meta { color: #555; font-size: 13px; }
    ul { margin: 8px 0 0 22px; padding: 0; }
    li { margin-bottom: 4px; font-size: 14px; }
    a { color: #111; }
    .toolbar { display: flex; gap: 16px; margin: 16px 0 8px; font-family: ui-monospace, "JetBrains Mono", Menlo, monospace; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; }
    .toolbar a, .toolbar button { color: #111; background: none; border: 1px solid #111; padding: 8px 14px; cursor: pointer; font: inherit; text-decoration: none; }
    .toolbar a:hover, .toolbar button:hover { background: #111; color: #fff; }
    @media print {
      body { margin: 0; max-width: none; padding: 24px; }
      .toolbar { display: none; }
    }
  </style>
</head>
<body>
  <h1>Spencer Harrison</h1>
  <p class="meta">Fx3 Studio · Founder &amp; Designer · Los Angeles, CA</p>
  <p class="meta"><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a> · <a href="https://fx3studio.com/">${esc(SITE.domain)}</a> · <a href="https://instagram.com/fx3studiodesigns">${esc(SITE.instagram)}</a></p>

  <div class="toolbar">
    <button onclick="window.print()">Print / Save PDF</button>
    <a href="/">Back to Fx3 Studio</a>
  </div>

  <h2>Summary</h2>
  <p>${esc(BIO_SUMMARY)}</p>

  <h2>Experience</h2>${expBlock}

  <h2>Education</h2>${eduBlock}

  <h2>Skills</h2>
  <p>${SKILLS.map(esc).join(' · ')}</p>
</body>
</html>
`;
}

// ---------- write everything ----------
async function writeFileWithDirs(path, content) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content, 'utf8');
}

await writeFile(resolve(DIST, 'index.html'), homePage(), 'utf8');
console.log('prerender: wrote dist/index.html (home shell)');

for (const c of COLLECTIONS) {
  const path = resolve(DIST, 'work', c.id, 'index.html');
  await writeFileWithDirs(path, projectPage(c));
  console.log(`prerender: wrote dist/work/${c.id}/index.html`);
}

await writeFileWithDirs(resolve(DIST, 'cv', 'index.html'), cvPage());
console.log('prerender: wrote dist/cv/index.html');

console.log(`prerender: done (${COLLECTIONS.length + 2} pages)`);
