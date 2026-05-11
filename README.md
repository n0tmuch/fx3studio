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
public/
  assets/               runway.mp4 + per-collection imagery
```

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

FIFA 1904 structure now: intro · concept · color & fabric · swipes · seed groups · Group A + Group B sketches · Group A/B flats · Group C sketches and fabric · Group C flats · In the studio (Mentor Fitting) · close.

Image conventions:
- Each portfolio book's cover thumbnail is `assets/<slug>/page-1.jpeg` (tech-pack is the lone exception that switched mid-session).
- FIFA 1904 flats use semantic filenames (`A1 Large.jpeg`, `B Lineup Large.jpeg`, `Top Right.jpeg`, etc.) rather than the numeric `<n> Large.jpeg` convention from the export.
