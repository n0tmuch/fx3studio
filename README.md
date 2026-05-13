# Fx3 Studio

Portfolio site for Spencer Harrison: fashion designer, BFA Otis College of Art and Design.

Live: https://fx3studio.com (also reachable at https://fx3studio.vercel.app)

## Stack

- Vite 6 + React 18 (no router: single page with a modal-style "project detail" overlay)
- Vanilla CSS (no framework)
- `<image-slot>` web component for fillable image placeholders
- Hosted on Vercel; auto-deploys from `main` (GitHub: [n0tmuch/fx3studio](https://github.com/n0tmuch/fx3studio))

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve dist/ locally
```

Pushing to `main` triggers a Vercel production deploy. Pushing any other branch creates a preview deployment (gated by Vercel SSO).

## Project layout

```
index.html              Vite entry, loads /src/main.jsx
vercel.json             explicit framework: vite (so Vercel doesn't fall back to static)
src/
  main.jsx              React root + side-effect imports (styles, image-slot)
  App.jsx               top-level page (Nav, Hero, About, WorkGrid, CV, Contact + modal)
  Components.jsx        Nav, Hero, About, WorkGrid, CV, Contact, ProjectDetail, FifaCaseStudy, Slot, etc.
  data.js               site copy + collection metadata: edit for content changes
  styles.css            all styles (cinema theme via [data-theme])
  case-studies/         one file per non-FIFA collection (Bloodmoon, Frame, Gothic, ...)
  lib/
    image-slot.js       <image-slot> custom element (work tiles, process strip, detail hero)
    tweaks.jsx          stub for the design-tool tweaks panel (renders nothing)
scripts/
  prerender.mjs         post-build: writes static HTML shells for /, /work/<slug>, /cv so non-JS crawlers get real content
public/
  assets/               runway.mp4 + per-collection imagery
  robots.txt            allow all + sitemap pointer
  sitemap.xml           home + all 10 /work/<slug> URLs + /cv
  favicon.svg           placeholder serif "fx3" mark
```

The build pipeline is `npm run build` → `vite build` (emits `dist/` with hashed bundles) → `node scripts/prerender.mjs` (overwrites `dist/index.html` and adds `dist/work/<slug>/index.html` × 10 and `dist/cv/index.html`). React's `createRoot().render()` in `main.jsx` wipes the prerendered `#root` on mount, so humans loading any URL in a browser see the SPA; non-JS clients (LinkedIn unfurl, AI WebFetch, ATS scrapers, Googlebot first pass) read the static HTML directly.

Content edits almost always live in `src/data.js`. The `COLLECTIONS` array drives the work grid and case-study dispatch in `Components.jsx::ProjectDetail`.

## History

### 2026-05-09: Initial deploy

Site was exported from Claude Design as an HTML/CSS/JS prototype using React 18 + Babel standalone via UMD CDN. Deployed to Vercel as a static site so Spencer's family could review the design.

Repo + project created:
- GitHub: `n0tmuch/fx3studio` (public)
- Vercel: `n0tmuchs-projects/fx3studio` (auto-connected to GitHub)
- Live URL: https://fx3studio.vercel.app

One content edit during this phase: removed an em-dash in the long bio after "art culture".

### 2026-05-10: Vite/React rebuild

Rebuilt as a proper Vite + React project. Visual design is **unchanged**: same layout, same colors, same fonts, same animations. What changed is the loading mechanism:

- Before: ~5 MB of unminified React UMD + Babel standalone, with all JSX compiled in the browser on every page load. 3–5 second blank screen on mobile.
- After: ~73 KB gzipped pre-built bundle. Instant first paint.

Conversion mechanics:
- All `.jsx` files moved from script-tag globals (`window.COLLECTIONS`, `window.RevolveCaseStudy`, etc.) to ES module imports/exports.
- `data.jsx` → `src/data.js` with named exports.
- `components.jsx` → `src/Components.jsx`; ProjectDetail dispatcher imports each case-study component instead of looking it up on `window`.
- 9 case-study files moved to `src/case-studies/` and re-exported.
- `tweaks-panel.jsx` (a design-tool host harness, never user-facing) replaced with `src/lib/tweaks.jsx`: a thin stub that preserves `useTweaks` but renders no panel.
- `image-slot.js` preserved as-is in `src/lib/` and imported for its side effect (registers the `<image-slot>` custom element).
- `assets/` moved to `public/assets/` so Vite serves it at the same root path; no asset reference in the source code needed to change.
- `vercel.json` added with `framework: vite` so the Vercel project (originally configured as static) builds with the right preset.

The original static prototype is preserved in git history at commit `aaf6cbe`. Vercel rollback to a prior deployment is one CLI command (`vercel rollback`) if anything ever needs to revert.

### 2026-05-10 (PM): fx3studio.com live + Workspace email

Migrated `fx3studio.com` off Squarespace (where Spencer had built a placeholder site) and pointed it at the Vercel project. Set up Google Workspace for `spencer@fx3studio.com`.

DNS (managed at Squarespace, registrar of record):
- `A @ 76.76.21.21` and `CNAME www cname.vercel-dns.com` — point web traffic at Vercel
- `MX @ 1 smtp.google.com` — email routes to Google Workspace
- `TXT @ v=spf1 include:_spf.google.com ~all` — authorizes Google to send mail for the domain
- `TXT _dmarc v=DMARC1; p=none; rua=mailto:spencer@fx3studio.com` — DMARC monitoring (graduate to `p=quarantine` then `p=reject` once DKIM is proven over ~30 days)
- `TXT google._domainkey v=DKIM1; k=rsa; p=...` — Google's DKIM signing key (TTL 30 min for easy rotation)

Vercel SSL cert (Let's Encrypt) covers apex + www, auto-renews.

The old Squarespace site still exists at its `.squarespace.com` URL but is disconnected from the domain — Spencer's Squarespace site subscription is a separate billing line that should be canceled once we're sure the new site is stable.

### 2026-05-10 (evening): Case-study copy + imagery pass

Spencer-led rewrite of every portfolio book and the FIFA 1904 case study. Reframed all "portfolio books" as collections, swapped in Spencer's own copy for blurbs/concepts, removed AI-flavored image captions site-wide, and normalized terms (I-cord always capital I, après-ski with accent, no em dashes).

FIFA 1904 structure now: intro · concept · color & fabric · swipes · seed groups · Group A + Group B sketches · Group A/B flats · Group C sketches and fabric · Group C flats · Mentor Pick flats · In the studio (Mentor Fitting) · close.

Image conventions:
- Each portfolio book's cover thumbnail is `assets/<slug>/page-1.jpeg` (tech-pack and musicfest both use `page-1.jpg`).
- FIFA 1904 flats use semantic filenames (`A1 Large.jpeg`, `B Lineup Large.jpeg`, `Top Right.jpeg`, etc.) rather than the numeric `<n> Large.jpeg` convention from the export.

### 2026-05-10 (later): FRAME plate regroup

Moved the bottom three plates of FRAME section 02 (`A3.jpeg` lineup, `A4.jpeg` A1 plate, `A5.jpeg` A2 plate) to the top of section 03 so the A3-plate now sits on the second pair-row with the A2-plate to its left, and the rest of B/C cascades down.

### 2026-05-12: Music Festival image refresh + Revolve restructure

Music Festival Performers: replaced pages 2-8 with new artwork and migrated all musicfest page assets from `.jpeg` to `.jpg`. Updated `src/case-studies/Musicfest.jsx` and the home thumbnail in `src/Components.jsx::thumbFor`.

Revolve × Otis copy:
- Site-wide swap: "deconstructed denim" → "distressed denim" (4 instances across `data.js` + `Revolve.jsx`).
- Role line: "dye yardage" → "dyed yardage". Blurb: trimmed "by Spencer himself" → "by Spencer".
- Concept rewritten to describe the mentor selecting three looks and combining them into one.

Revolve × Otis section restructure (top-to-bottom):
- **01** Concept → **Fabric story** ("Every treatment, on one board.") with `21 Large` + `22 Large` paired.
- **02** Color & Fabric → **Group A, B, C, D · Lineup pages.** with images 1-4 in two paired rows and image 5 centered below at half-width; color bar preserved.
- **03** Group A · Ensemble → **A, B, C, D · Flat layout page.** with images 6-17 paired and image 18 centered below.
- **04** Group B → **Final outcome · Mentor pick.** with images 19 + 20.
- Deleted old sections 05 (Group C), 06 (Group D), and 07 (Featured Look).
- **05** (was 08) In the studio → **From dress form to live model · Fittings.** Removed the trailing show-floor image (`IMG_9777`).
- **06** (was 09) Runway · "Revolve × Otis · show floor." → "Revolve × Otis."

Tech Pack home card: `c.title` "Avenue Collection" → "Tech Pack"; `c.role` → "Army Green Raincoat". Case study `subtitle`, `tags`, and End footer ("End · 10 · Avenue Collection · Tech Pack · Fall") were left untouched.

FIFA 1904: split the bottom row of section 09 (`Bottom Left.jpeg` + `Bottom Right.jpeg`, byte-identical copies of `26 Large.jpeg` + `27 Large.jpeg`) into a new section 10 **Flats · Mentor Pick** using the canonical `26`/`27` filenames; existing **In the studio** section bumped from 10 to 11.

The half-width centered figure pattern used in Revolve sections 02 and 03 is inlined (`flex` wrapper + `width: calc(50% - clamp(8px, 1vw, 14px))` figure) rather than a CSS class — extract to `.fifa-pair-single` if it shows up a third time.

### 2026-05-12 (later): SEO + social-share metadata + deep-link URLs

External crawlers (LinkedIn unfurler, AI WebFetch, Google, recruiter ATS scrapers) were seeing an empty `<div id="root"></div>` shell because the site is a JS-rendered SPA with no static fallback. None of the case studies had a shareable URL — `pushState({ project: id }, '')` was passing an empty URL string. This pair of commits closes both gaps without touching any visual or copy.

**Phase 1 — metadata layer:**
- `index.html`: full meta description, keywords, author, robots `max-image-preview:large`, canonical link, OG and Twitter card tags, JSON-LD `@graph` with `Person` (Spencer), `Organization` (Fx3 Studio), `WebSite`, and a `CreativeWork` node per collection
- `public/robots.txt` + `public/sitemap.xml` listing the home and all ten `/work/<slug>` URLs
- `public/favicon.svg`: minimal placeholder mark using the site's serif italic — flagged as placeholder until Spencer has a real mark
- `App.jsx::applyRouteMeta`: per-route update of `document.title`, meta description, OG/Twitter title/description/URL/image, and canonical link on open and close
- `vercel.json`: SPA fallback rewrites for `/work/:slug` plus correct MIME and cache headers for `sitemap.xml` and `robots.txt`

**Phase 2 — real URLs for case studies:**
- `App.jsx::openProject`: `pushState({ project: id, fromHome: true }, '', /work/<id>)` so each open changes the address bar
- `App.jsx::closeProject`: `history.back()` when opened from within the app; `replaceState` to `/` when the user deep-linked directly (so close never leaves the site)
- `App.jsx` initial mount: if `window.location.pathname` matches `/work/<known-slug>`, open that project; unknown slugs `replaceState` to `/`

**What this fixes today:**
- LinkedIn / Slack / iMessage unfurls of `fx3studio.com` show a proper card with title, description, and the FIFA 1904 hero image
- AI WebFetch (Claude, ChatGPT, Perplexity) reads the JSON-LD and surfaces Spencer's bio, school, projects, and contact directly
- Google can index the home page with structured data
- Every case study has a shareable URL: `fx3studio.com/work/fifa1904`, `/work/revolve-otis`, etc.

**What is still gated on Phase 3 (static prerender):**
- `curl https://fx3studio.com/work/fifa1904` still returns the same SPA shell as the home; the per-route meta is only set after JS executes. LinkedIn unfurls of deep links will therefore show the home OG card, not a project-specific one. AI crawlers that do not run JS get only the base-site meta when given a `/work/<slug>` URL.
- The CV is still injected via `document.write` into a popup ([Components.jsx:263](src/Components.jsx#L263)), so Spencer's experience/education are not in the crawlable DOM.

**Rollback paths in place:**
- Safety tag `pre-seo-discoverability` at `e44428a` — `git reset --hard pre-seo-discoverability` reverts everything in this section
- Per-phase commits: Phase 1 is `fa3c806`, Phase 2 is `78468f0`; `git revert <sha>` undoes either independently
- Pre-Phase-1 Vercel production deployment: `fx3studio-8vixiouis-n0tmuchs-projects.vercel.app` — promotable from the Vercel dashboard if a deploy ever breaks the live URL faster than git can

### 2026-05-12 (later still): static-shell prerender + crawlable CV (Phases 3 & 4)

Closed the remaining gap from the Phase 1–2 section above: deep-link URLs were returning the same SPA shell as the home, so LinkedIn unfurls of `/work/<slug>` showed the home OG card and AI crawlers / ATS scrapers saw only the base-site meta on case-study pages.

**Phase 3 — post-build prerender (commit `db092eb`):**
- New `scripts/prerender.mjs`: a zero-dependency Node ESM script that runs after `vite build`. Imports `COLLECTIONS`, `BIO_LONG`, `BIO_SUMMARY`, `EXPERIENCE`, `EDUCATION`, `SITE`, `SKILLS` directly from `src/data.js` (pure-ESM, no JSX, so a plain dynamic `import()` works in Node). Reads the freshly built `dist/index.html` to extract the hashed `<script>` / `<link>` asset filenames, then writes:
  - `dist/index.html` (home) — rewritten so `<div id="root">` contains BIO_SUMMARY + BIO_LONG, a `<ul>` of all 10 projects linking to `/work/<slug>`, EXPERIENCE / EDUCATION / SKILLS, and contact info
  - `dist/work/<slug>/index.html` × 10 — each with route-specific `<title>`, `meta description`, OG/Twitter tags, canonical, a JSON-LD `@graph` (Person + Organization + WebSite + just that single CreativeWork), and the project's `title`, `subtitle`, `blurb`, `concept`, `tags`, `role`, `looks` inside the `#root`
  - `dist/cv/index.html` — standalone print-friendly CV (no React; pure HTML + inline print CSS + JSON-LD `ProfilePage`)
- All static-shell content is wrapped in a visually-offscreen `<div style="position:absolute;clip:rect(0 0 0 0);…">` so crawlers read it but humans never see a FOUC of plain text. React's `createRoot().render()` in `main.jsx` then wipes `#root`'s children on mount with no hydration — `hydrateRoot` is deliberately not used.
- `package.json::build` chained: `"vite build && node scripts/prerender.mjs"`. Vercel runs both in its build step.
- `public/sitemap.xml`: added `/cv`. Existing `vercel.json` rewrites for `/work/:slug` are left in place — Vercel serves static files before applying rewrites, so the prerendered file wins; unknown slugs still fall through to the home shell.

**Phase 4 — crawlable CV (commit `7b5b451`):**
- `src/Components.jsx::CV` "Download CV" was a `<button>` whose `onClick` opened a new tab and `document.write`-d a printable CV from scratch. That CV was never in the crawlable DOM. Replaced with a plain `<a href="/cv" target="_blank">` so it navigates to the prerendered `/cv` route Phase 3 generates. Users hit Cmd-P (or the "Print / Save PDF" button on `/cv`) for the same printable flow.
- `src/styles.css::.cv-download`: added `text-decoration: none; color: inherit; background: transparent; cursor: pointer` so swapping from `<button>` to `<a>` is visually identical.

**What this fixes:**
- `curl https://fx3studio.com/work/fifa1904 | grep "Buenos Aires"` now returns the project's concept text instead of the home shell
- LinkedIn / Slack / iMessage unfurls of any `/work/<slug>` show a project-specific card (title, blurb, and that project's hero image), not the FIFA hero card
- AI WebFetch (Claude, ChatGPT, Perplexity) reads the right CreativeWork JSON-LD when given a deep link
- `/cv` is a real shareable URL, crawlable by ATS scrapers and Google, with the full experience / education / skills as semantic HTML

**Rollback paths in place:**
- Safety tag `pre-phase-3` at `ae6d9cb` — `git reset --hard pre-phase-3` reverts Phases 3 + 4 together
- Per-phase commits: Phase 3 is `db092eb`, Phase 4 is `7b5b451`. Phase 4 depends on Phase 3, so revert in reverse order
- Vercel can roll back to any previous production deployment from the dashboard
