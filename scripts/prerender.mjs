// Post-build SSG: render the real React tree to HTML for every public route,
// then write each route as its own dist/<route>/index.html. The bundled client
// JS rehydrates on top via hydrateRoot, so server-rendered HTML and the first
// client render produce the same tree. Replaces the Phase 3–5 hidden-shell
// approach: no `.prerender-shell { display: none }` cloak any more — what tier-
// two AI/recruiter extractors see is the same DOM real browsers paint.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = resolve(ROOT, 'dist');
const SSR_DIST = resolve(ROOT, '.ssr-build');

const dataUrl = pathToFileURL(resolve(ROOT, 'src/data.js')).href;
const {
  COLLECTIONS,
  BIO_SUMMARY,
  EXPERIENCE,
  EDUCATION,
  SITE,
  SKILLS,
} = await import(dataUrl);

// SSR bundle produced by `vite build --ssr src/entry-server.jsx`.
const ssrEntryUrl = pathToFileURL(resolve(SSR_DIST, 'entry-server.js')).href;
const { render } = await import(ssrEntryUrl);

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

const builtIndex = await readFile(resolve(DIST, 'index.html'), 'utf8');
const jsHref = builtIndex.match(/<script type="module" crossorigin src="([^"]+)"><\/script>/)?.[1];
const cssHref = builtIndex.match(/<link rel="stylesheet" crossorigin href="([^"]+)">/)?.[1];
if (!jsHref || !cssHref) {
  console.error('prerender: could not find hashed JS/CSS in dist/index.html');
  process.exit(1);
}

// ---------- image-count audit (regression guard) ----------
// Phase 5 emitted the full <img> inventory for each case study as part of the
// hidden shell. With SSG the visible React tree itself is the inventory, so we
// no longer need to re-extract — but we still want the build to fail loudly if
// any project's count drops below the Phase-5 baseline.
const PHASE5_BASELINE = {
  fifa1904: 37,
  'revolve-otis': 28,
  'frame-salvation': 25,
  'gothic-winter': 12,
  'la-rose': 10,
  'fold-ease': 8,
  'music-fest': 8,
  'blood-moon': 6,
  trompe: 6,
  'tech-pack': 6,
};

function countImgs(html) {
  return (html.match(/<img\b/g) || []).length;
}

// ---------- shared head ----------
function commonHead({ title, description, url, image, imageAlt, jsonLd, injectScript }) {
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
  ${injectScript || ''}
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

// CreativeWork.image[] mirrors the rendered <img> inventory for each project,
// extracted once via a regex over the case-study source (cheap; reuses the
// Phase 5 extraction logic). Schema-aware crawlers can enumerate per-project
// imagery without parsing body HTML.
const PROJECT_SOURCE = {
  fifa1904: { file: 'src/Components.jsx', sliceFrom: 'function FifaCaseStudy', sliceTo: 'function SectionMark' },
  'blood-moon': { file: 'src/case-studies/Bloodmoon.jsx' },
  'fold-ease': { file: 'src/case-studies/Foldease.jsx' },
  'frame-salvation': { file: 'src/case-studies/Frame.jsx' },
  'gothic-winter': { file: 'src/case-studies/Gothic.jsx' },
  'la-rose': { file: 'src/case-studies/Larose.jsx' },
  'music-fest': { file: 'src/case-studies/Musicfest.jsx' },
  'revolve-otis': { file: 'src/case-studies/Revolve.jsx' },
  'tech-pack': { file: 'src/case-studies/Techpack.jsx' },
  trompe: { file: 'src/case-studies/Trompe.jsx' },
};

const encodePath = (s) => s.split('/').map(encodeURIComponent).join('/');

async function extractProjectImages(slug) {
  const meta = PROJECT_SOURCE[slug];
  if (!meta) return [];
  let source = await readFile(resolve(ROOT, meta.file), 'utf8');
  if (meta.sliceFrom && meta.sliceTo) {
    const start = source.indexOf(meta.sliceFrom);
    const end = source.indexOf(meta.sliceTo, start);
    if (start !== -1 && end !== -1) source = source.slice(start, end);
  }
  const prefixMatch = source.match(/const img = \(n\) => `(\/assets\/[^/]+\/)\$\{n\}`/);
  if (!prefixMatch) return [];
  const prefix = prefixMatch[1];
  const pageHelperExt = source.match(
    /const Page = \(\{ n, alt \}\) =>[\s\S]{0,200}?img\("page-" \+ n \+ "(\.[a-z]+)"\)/,
  )?.[1];
  const matches = [];
  const litRe = /<img\s+src=\{img\("([^"]+)"\)\}\s+alt="([^"]+)"/g;
  for (let m; (m = litRe.exec(source)) !== null; ) {
    matches.push({ pos: m.index, file: m[1], alt: m[2] });
  }
  if (pageHelperExt) {
    const pageRe = /<Page\s+n="(\d+)"\s+alt="([^"]+)"/g;
    for (let m; (m = pageRe.exec(source)) !== null; ) {
      matches.push({ pos: m.index, file: `page-${m[1]}${pageHelperExt}`, alt: m[2] });
    }
  }
  const mapRe =
    /\[([0-9, \n]+)\]\.map\(\(n\) =>[\s\S]*?img\(`([^`]*)\$\{n\}([^`]*)`\)[\s\S]*?alt=\{`([^`]*)\$\{n\}([^`]*)`\}/g;
  for (let m; (m = mapRe.exec(source)) !== null; ) {
    const nums = m[1].split(',').map((s) => s.trim()).filter(Boolean);
    const [srcPre, srcPost, altPre, altPost] = [m[2], m[3], m[4], m[5]];
    nums.forEach((n, i) => {
      matches.push({
        pos: m.index + i,
        file: `${srcPre}${n}${srcPost}`,
        alt: `${altPre}${n}${altPost}`,
      });
    });
  }
  matches.sort((a, b) => a.pos - b.pos);
  return matches.map(({ file }) => `https://fx3studio.com${prefix}${encodePath(file)}`);
}

const PROJECT_IMAGE_URLS = Object.fromEntries(
  await Promise.all(
    COLLECTIONS.map(async (c) => [c.id, await extractProjectImages(c.id)]),
  ),
);

const creativeWorkNode = (c) => {
  const imgs = PROJECT_IMAGE_URLS[c.id] || [];
  return {
    '@type': 'CreativeWork',
    name: c.title,
    url: `https://fx3studio.com/work/${c.id}`,
    creator: { '@id': 'https://fx3studio.com/#spencer' },
    ...(c.year ? { dateCreated: String(c.year) } : {}),
    keywords: c.tags.join(', '),
    about: c.blurb,
    ...(imgs.length ? { image: imgs } : {}),
  };
};

// ---------- page template ----------
function pageTemplate({ title, description, url, image, imageAlt, jsonLd, body, initialRoute }) {
  const initScript = `<script>window.__INITIAL_ROUTE__=${JSON.stringify(initialRoute)};</script>`;
  return `<!doctype html>
<html lang="en" data-theme="cinema">
<head>
${commonHead({ title, description, url, image, imageAlt, jsonLd, injectScript: initScript })}
</head>
<body>
  <div id="root">${body}</div>
</body>
</html>
`;
}

// ---------- per-project page ----------
function projectPage(c, body) {
  const cover = PROJECT_COVER[c.id] || PROJECT_COVER.fifa1904;
  return pageTemplate({
    title: `${c.title} · Fx3 Studio · Spencer Harrison`,
    description: c.blurb,
    url: `https://fx3studio.com/work/${c.id}`,
    image: `https://fx3studio.com/${cover}`,
    imageAlt: `${c.title}: hero image from Spencer Harrison's Fx3 Studio portfolio`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [personNode, orgNode, websiteNode, creativeWorkNode(c)],
    },
    body,
    initialRoute: c.id,
  });
}

// ---------- home page ----------
function homePage(body) {
  return pageTemplate({
    title: 'Fx3 Studio · Spencer Harrison — Fashion Designer · Los Angeles',
    description:
      'Fx3 Studio is the portfolio of Spencer Harrison, a Los Angeles fashion designer and BFA graduate of Otis College of Art and Design. Senior thesis with FIFA 1904. Mentorships with FRAME, Revolve, and Salvation Army. Womenswear, menswear, knitwear, tech packs.',
    url: 'https://fx3studio.com/',
    image: 'https://fx3studio.com/assets/fifa1904/1%20Large.jpeg',
    imageAlt: 'Fx3 Studio — Spencer Harrison, FIFA 1904 × Otis senior thesis editorial hero',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        personNode,
        orgNode,
        websiteNode,
        ...COLLECTIONS.map(creativeWorkNode),
      ],
    },
    body,
    initialRoute: null,
  });
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

function assertImgCount(slug, html, baseline) {
  const got = countImgs(html);
  if (got < baseline) {
    throw new Error(
      `prerender: ${slug} rendered ${got} <img> tags, below Phase-5 baseline ${baseline}`,
    );
  }
  return got;
}

// Home
const homeRender = render('/');
const homeHtml = homePage(homeRender.html);
await writeFile(resolve(DIST, 'index.html'), homeHtml, 'utf8');
console.log(`prerender: wrote dist/index.html (home · ${countImgs(homeHtml)} <img> in body)`);

// Per-project
for (const c of COLLECTIONS) {
  const url = `/work/${c.id}`;
  const { html } = render(url);
  const page = projectPage(c, html);
  const baseline = PHASE5_BASELINE[c.id];
  const count = baseline ? assertImgCount(c.id, page, baseline) : countImgs(page);
  await writeFileWithDirs(resolve(DIST, 'work', c.id, 'index.html'), page);
  console.log(`prerender: wrote dist/work/${c.id}/index.html (${count} <img> in body)`);
}

// CV (standalone non-React page)
await writeFileWithDirs(resolve(DIST, 'cv', 'index.html'), cvPage());
console.log('prerender: wrote dist/cv/index.html');

console.log(`prerender: done (${COLLECTIONS.length + 2} pages)`);
