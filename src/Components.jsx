// components.jsx: small reusable building blocks for the Fx3 Studio site.

import { useState, useEffect, useRef } from "react";
import { SITE, BIO_LONG, BIO_SUMMARY, COLLECTIONS, EXPERIENCE, EDUCATION, SKILLS } from "./data.js";
import { RevolveCaseStudy } from "./case-studies/Revolve.jsx";
import { FrameCaseStudy } from "./case-studies/Frame.jsx";
import { BloodMoonCaseStudy } from "./case-studies/Bloodmoon.jsx";
import { MusicFestCaseStudy } from "./case-studies/Musicfest.jsx";
import { TrompeCaseStudy } from "./case-studies/Trompe.jsx";
import { GothicCaseStudy } from "./case-studies/Gothic.jsx";
import { LaRoseCaseStudy } from "./case-studies/Larose.jsx";
import { TechPackCaseStudy } from "./case-studies/Techpack.jsx";
import { FoldEaseCaseStudy } from "./case-studies/Foldease.jsx";

// Image slot placeholder: labeled, dashed, monospace.
// `label` describes what the image SHOULD be ("Hero · Look 01").
// `id` makes it a real <image-slot> the user can drop a file onto and it persists.
function Slot({ id, label, hint, className = "" }) {
  return (
    <div className={"slot " + className} style={{ position: "relative", width: "100%", height: "100%" }}>
      <image-slot
        id={id}
        placeholder={label + (hint ? ": " + hint : "")}
        shape="rect"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      </image-slot>
    </div>);

}

// Stripe-pattern placeholder for grid items where we don't need image-slot interactivity.
function StripePlaceholder({ label, no }) {
  return (
    <>
      <div className="placeholder-stripes" />
      <div className="placeholder-label">
        {no ? <span style={{ opacity: 0.6, marginRight: 8 }}>{no}</span> : null}
        {label}
      </div>
    </>);

}

// ---------- NAV ----------
function Nav({ route, setRoute, openProject }) {
  const [scrolled, setScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "process", label: "Process" },
  { id: "cv", label: "CV" },
  { id: "contact", label: "Contact" }];


  const go = (id) => {
    setSheetOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header className={"nav " + (scrolled ? "scrolled" : "")}>
        <div className="nav-inner">
          <a className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ cursor: "pointer" }}>
            Fx3 Studio
          </a>
          <nav className="nav-links" style={{ fontFamily: "\"JetBrains Mono\"" }}>
            {links.map((l) =>
            <a key={l.id} onClick={() => go(l.id)} style={{ cursor: "pointer" }}>{l.label}</a>
            )}
          </nav>
          <button className="nav-mobile-toggle" aria-label="Menu" onClick={() => setSheetOpen(true)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>
      <div className={"nav-sheet " + (sheetOpen ? "open" : "")}>
        <button className="nav-sheet-close" onClick={() => setSheetOpen(false)}>Close</button>
        <a onClick={() => go("top")} style={{ cursor: "pointer" }}>Home</a>
        {links.map((l) =>
        <a key={l.id} onClick={() => go(l.id)} style={{ cursor: "pointer" }}>{l.label}</a>
        )}
      </div>
    </>);

}

// ---------- HERO ----------
function Hero({ videoMode }) {
  const videoRef = useRef(null);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Belt and braces: ensure no audio under any condition
    v.muted = true;
    v.volume = 0;
    v.defaultMuted = true;
    if (videoMode === "off") {v.pause();return;}
    v.play().catch(() => {});
  }, [videoMode]);

  return (
    <section className="hero" id="top">
      {videoMode !== "off" ?
      <video
        ref={videoRef}
        className="hero-video"
        src="assets/runway.mp4"
        autoPlay muted loop playsInline
        poster="" /> :


      <div className="hero-poster" style={{ background: "var(--bg-2)" }} />
      }
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-name">
          Spencer Harrison<em></em>
        </h1>
      </div>
      <div className="hero-bottom">
        <div className="hero-meta hero-meta-left" style={{ fontFamily: "\"JetBrains Mono\"", fontSize: "16px" }}>
          <div className="hero-meta-line">Founder · Designer</div>
          <div className="hero-meta-line">Los Angeles · CA</div>
        </div>
        <div className="hero-studio">
          <div className="hero-studio-name">Fx3 Studio</div>
          <p className="hero-tagline" style={{ position: "relative", zIndex: 2, color: "inherit", margin: 0 }}>
            A fashion atelier built on individuality, handmade detail, and authentic expression.
          </p>
        </div>
      </div>
      <div className="hero-scrollcue">Scroll</div>
    </section>);

}

// ---------- WORK GRID ----------
function WorkGrid({ openProject }) {
  const CATEGORY_ORDER = ["Mentor Projects", "Portfolio Book", "Collections", "Tech Pack"];
  const sorted = [...COLLECTIONS].sort((a, b) => a.no.localeCompare(b.no));
  const grouped = CATEGORY_ORDER.map((cat) => ({
    cat,
    items: sorted.filter((c) => c.category === cat)
  })).filter((g) => g.items.length > 0);

  const thumbFor = (c) => {
    if (c.id === "fifa1904") return { src: "assets/fifa1904/1 Large.jpeg", fit: "cover" };
    if (c.id === "revolve-otis") return { src: "assets/revolve/IMG_8644.jpeg", fit: "cover" };
    if (c.id === "frame-salvation") return { src: "assets/frame/runway-8123.jpeg", fit: "cover" };
    if (c.id === "blood-moon") return { src: "assets/bloodmoon/page-1.jpeg", fit: "contain" };
    if (c.id === "music-fest") return { src: "assets/musicfest/page-1.jpeg", fit: "contain" };
    if (c.id === "trompe") return { src: "assets/trompe/page-1.jpeg", fit: "contain" };
    if (c.id === "gothic-winter") return { src: "assets/gothic/page-3.jpeg", fit: "contain" };
    if (c.id === "la-rose") return { src: "assets/larose/page-1.jpeg", fit: "contain" };
    if (c.id === "tech-pack") return { src: "assets/techpack/page-1.jpeg", fit: "contain" };
    if (c.id === "fold-ease") return { src: "assets/foldease/page-1.jpeg", fit: "contain" };
    return null;
  };

  return (
    <section id="work">
      <div className="container">
        <div className="eyebrow">Selected work · 2021–2026</div>
        <h2 className="section-title">Selected work.</h2>
        <p className="section-lede">Ten projects spanning mentor projects, portfolio books, full collections, and production tech packs. Each is rooted in a specific narrative built look-by-look, hand-finished where it matters.</p>
      </div>

      {grouped.map((g) =>
      <div key={g.cat} className="work-group">
          <div className="container">
            <div className="work-group-head">
              <span className="work-group-label">{g.cat}</span>
              <span className="work-group-rule" aria-hidden="true"></span>
              <span className="work-group-count">{String(g.items.length).padStart(2, "0")}</span>
            </div>
          </div>
          <div className="work-stack">
            {g.items.map((c) => {
            const t = thumbFor(c);
            return (
              <article key={c.id} className="work-row" onClick={() => openProject(c.id)}>
                  <div className="work-row-img">
                    {t ?
                  <img src={t.src} alt={c.title + ": thumbnail"} style={{ ...{ objectFit: t.fit }, objectFit: "cover" }} /> :
                  <Slot id={"work-thumb-" + c.id} label={c.title + " · hero"} hint="4:5 lookbook image" />}
                  </div>
                  <div className="work-row-meta">
                    <div className="work-no">{c.no} · {c.year || "–"}</div>
                    <div className="work-meta-title">{c.title}</div>
                    <div className="work-row-role">{c.role}</div>
                  </div>
                </article>);

          })}
          </div>
        </div>
      )}
    </section>);

}

// ---------- ABOUT ----------
function About() {
  return (
    <section id="about" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <div className="eyebrow">About</div>
        <h2 className="section-title">Made by hand,<br />for everyone.</h2>
        <div className="about-grid" style={{ marginTop: 48 }}>
          <div className="about-text">
            {BIO_LONG.map((p, i) => <p key={i}>{p}</p>)}
            <p style={{ marginTop: 16 }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--fg-dim)" }}>
                Inspirations ·
              </span>
              {" "}Music, skateboarding, underground art culture, layering, the handmade.
            </p>
          </div>
        </div>
      </div>
    </section>);

}

// ---------- PROCESS ----------
function Process() {
  return (
    <section id="process">
      <div className="container">
        <div className="eyebrow">Process</div>
        <h2 className="section-title">Sketchbook.</h2>
        <p className="section-lede">
          Five years of drawings, fabric studies, and mood research: the source material behind every collection.
        </p>
      </div>
      <div className="process-strip">
        {Array.from({ length: 6 }).map((_, i) =>
        <div key={i}>
            <Slot id={"process-" + (i + 1)} label={`Sketch ${String(i + 1).padStart(2, "0")}`} hint="3:4" />
          </div>
        )}
      </div>
    </section>);

}

// ---------- CV ----------
function CV() {
  const downloadResume = () => {
    // generates a simple printable CV in a new tab: Spencer can replace with a hosted PDF
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`<!doctype html><html><head><title>Spencer Harrison · CV</title>
      <style>body{font-family:Georgia,serif;max-width:720px;margin:48px auto;padding:0 24px;color:#111;line-height:1.5}
      h1{font-size:32px;margin-bottom:4px}h2{font-size:14px;letter-spacing:.16em;text-transform:uppercase;margin-top:32px;margin-bottom:12px;border-bottom:1px solid #000;padding-bottom:6px}
      h3{font-size:16px;margin-top:18px}p{margin:4px 0}ul{margin:6px 0 0 20px}li{margin-bottom:4px;font-size:14px}
      .meta{color:#555;font-size:13px}@media print{body{margin:0}}</style></head><body>
      <h1>Spencer Harrison</h1><p class="meta">Fx3 Studio · Founder & Designer · Los Angeles, CA</p>
      <p class="meta">${SITE.email} · ${SITE.domain}</p>
      <h2>Summary</h2><p>${BIO_SUMMARY}</p>
      <h2>Experience</h2>
      ${EXPERIENCE.map((e) => `<h3>${e.role}: ${e.company}</h3><p class="meta">${e.period}</p><ul>${e.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>`).join("")}
      <h2>Education</h2>${EDUCATION.map((e) => `<h3>${e.school}</h3><p>${e.degree}</p><p class="meta">${e.period} · ${e.location}</p>`).join("")}
      <h2>Skills</h2><p>${SKILLS.join(" · ")}</p>
      <script>window.print()<\/script></body></html>`);
    win.document.close();
  };

  return (
    <section id="cv" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <div className="eyebrow">Curriculum Vitae</div>
        <h2 className="section-title">Experience.</h2>
        <p className="section-lede">
          Internships, runway production, and senior mentor projects. {BIO_SUMMARY}
        </p>

        {EXPERIENCE.map((e, i) =>
        <div className="cv-grid" key={i}>
            <div className="cv-label">Experience<br />{String(i + 1).padStart(2, "0")}</div>
            <div className="cv-entry">
              <div className="cv-entry-head">
                <div className="cv-role">{e.role}</div>
                <div className="cv-period">{e.period}</div>
              </div>
              <div className="cv-company">{e.company}</div>
              <ul className="cv-bullets">
                {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          </div>
        )}

        <div className="cv-grid">
          <div className="cv-label">Education</div>
          <div>
            {EDUCATION.map((e, i) =>
            <div key={i} className="cv-entry">
                <div className="cv-entry-head">
                  <div className="cv-role">{e.school}</div>
                  <div className="cv-period">{e.period}</div>
                </div>
                <div className="cv-company">{e.degree} · {e.location}</div>
              </div>
            )}
          </div>
        </div>

        <div className="cv-grid">
          <div className="cv-label">Skills</div>
          <div className="skills-cloud">
            {SKILLS.map((s) => <span key={s} className="skill">{s}</span>)}
          </div>
        </div>

        <button className="cv-download" onClick={downloadResume}>
          <span>Download CV</span>
          <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M7 1v9M3 7l4 4 4-4M2 13h10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>);

}

// ---------- CONTACT ----------
function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="eyebrow">Get in touch</div>
        <div className="contact-grid">
          <h2 className="contact-mega">
            Say<em> hi.</em>
          </h2>
          <dl className="contact-info">
            <div>
              <dt>Email</dt>
              <dd><a href={`mailto:${SITE.email}`}>{SITE.email}</a></dd>
            </div>
            <div>
              <dt>Studio</dt>
              <dd>Los Angeles, CA</dd>
            </div>
            <div>
              <dt>Instagram</dt>
              <dd><a href="https://instagram.com/fx3studiodesigns" target="_blank" rel="noreferrer">{SITE.instagram}</a></dd>
            </div>
            <div>
              <dt>Open to</dt>
              <dd>Full-time roles · Internships · Custom commissions · Collaborations</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>);

}

// ---------- FIFA 1904 CASE STUDY ----------
// Built from real assets in assets/fifa1904/. Long-form deep dive.
function FifaCaseStudy({ collection, onClose, fifaHeroMode }) {
  const c = collection;
  const img = (n) => `assets/fifa1904/${n}`;

  return (
    <div className="detail fifa" role="dialog" aria-label={c.title}>
      <button className="detail-close" onClick={onClose}>
        <span>Close</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M1 1l8 8M9 1l-8 8" />
        </svg>
      </button>

      {/* HERO */}
      <div className={"fifa-hero" + (fifaHeroMode === "full" ? " full" : "")}>
        <img src={img("1 Large.jpeg")} alt="FIFA 1904: editorial hero" />
        <div className="fifa-hero-overlay" style={{ backgroundSize: "contain" }} />
        <div className="fifa-hero-text">
          <div className="fifa-eyebrow">{c.no} · FIFA 1904 · {c.year}</div>
          <h1 className="fifa-title">FIFA<br /><em>1904</em></h1>
          <div className="fifa-subtitle">Conceptualized and pitched an original luxury streetwear collection to Creative Director Marcus Clayton and the team at FIFA 1904.</div>
        </div>
      </div>

      {/* INTRO */}
      <section className="fifa-section fifa-intro">
        <div className="fifa-intro-grid">
          <div className="fifa-intro-meta">
            <div className="fifa-meta-row"><span>Project</span><span>FIFA 1904 × Otis</span></div>
            <div className="fifa-meta-row"><span>Year</span><span>{c.year}</span></div>
            <div className="fifa-meta-row"><span>Looks</span><span>Four: Group A · Group B · Group C · Group D</span></div>
            <div className="fifa-meta-row"><span>Setting</span><span>Buenos Aires, Argentina</span></div>
            <div className="fifa-meta-row"><span>Customer</span><span>Fan · 31 · Painter · Palermo</span></div>
            <div className="fifa-meta-row"><span>Role</span><span>Concept · Pattern · Construction · Show production</span></div>
          </div>
          <div className="fifa-intro-text">
            <p className="fifa-blurb">{c.blurb}</p>
            <p className="fifa-blurb dim">{c.concept}</p>
          </div>
        </div>
      </section>

      {/* CONCEPT */}
      <section className="fifa-section">
        <SectionMark no="01" label="Concept" title="Buenos Aires at the game and after the match." />
        <p className="fifa-lede">
          The collection is built around the look of a city: the obelisk at sundown, La Boca's painted board-and-batten facades,
          the brick-and-bedsheet warmth of a Palermo loft, and the dust-scattered light of a stadium when the floodlights lift.
          Each visual got pinned, cropped, and translated into a fabric, a silhouette, or a graphic.
        </p>
        <div className="fifa-fullbleed">
          <img src={img("3 Large.jpeg")} alt="Concept board: Buenos Aires references" />
        </div>
      </section>

      {/* CUSTOMER */}
      <section className="fifa-section">
        <SectionMark no="02" label="Customer" title="Meet Fan." />
        <div className="fifa-customer">
          <div className="fifa-customer-card">
            <div className="fifa-customer-name">FAN</div>
            <dl>
              <div><dt>Age</dt><dd>31</dd></div>
              <div><dt>City</dt><dd>Palermo, Buenos Aires</dd></div>
              <div><dt>Career</dt><dd>Fine artist · painter & sculptor</dd></div>
              <div><dt>Income</dt><dd>$82,750 / yr</dd></div>
              <div><dt>Energy</dt><dd>Tomboy · community-oriented · goal-focused</dd></div>
              <div><dt>Style</dt><dd>Athleisure · new money · die-hard fan</dd></div>
            </dl>
            <p className="fifa-customer-day">Wakes at 9:30, espresso and a pastry at the corner café, into the studio by mid-morning. Setting up an art show one weekend, after-parties the next. Plays rec-league soccer with friends, attends matches at home and away on holidays.



            </p>
          </div>
          <div className="fifa-customer-img">
            <img src={img("5 Large.jpeg")} alt="Customer persona: Fan" />
          </div>
        </div>
      </section>

      {/* COLOR + FABRIC */}
      <section className="fifa-section">
        <SectionMark no="03" label="Color & Fabric" title="Stadium dusk. Loft brick. La Bocas." />
        <div className="fifa-fullbleed">
          <img src={img("4 Large.jpeg")} alt="Color story: Buenos Aires palette" />
        </div>
        <div className="fifa-pair">
          <figure>
            <img src={img("12 Large.jpeg")} alt="Fabric story 1" />
          </figure>
          <figure>
            <img src={img("22(1) Large.jpeg")} alt="Fabric story 2" />
          </figure>
        </div>
      </section>

      {/* SWIPES */}
      <section className="fifa-section">
        <SectionMark no="04" label="Design Swipes" title="Six details." />
        <p className="fifa-lede">Detail research from existing garments, the language of pockets, plackets, and stripes that the collection would inherit and reinterpret. Snap closures, bib panels, FIFA stripe, bellows pockets, zipper plackets, quilted seams.


        </p>
        <div className="fifa-pair">
          <figure>
            <img src={img("7 Large.jpeg")} alt="Detail swipes: pocket fold, snap, FIFA stripe" />
          </figure>
          <figure>
            <img src={img("8 Large.jpeg")} alt="Six key swipes overlaid" />
          </figure>
        </div>
      </section>

      {/* SEED GROUPS */}
      <section className="fifa-section">
        <SectionMark no="05" label="Seed Groups" title="From swipe to silhouette." />
        <p className="fifa-lede">Four seed groups translate the swipes into early figure work, outerwear-forward silhouettes, a track stripe migrated to a skirt, a snap pocket scaled to coat-front.


        </p>
        <div className="fifa-pair">
          <figure>
            <img src={img("9 Large.jpeg")} alt="Seed group 1 and 2" />
          </figure>
          <figure>
            <img src={img("10 Large.jpeg")} alt="Seed group 3 and 4" />
          </figure>
        </div>
      </section>

      {/* GROUP A LINEUP */}
      <section className="fifa-section">
        <SectionMark no="06" label="Group A · Group B sketches" title="Two groups, one fabric story." />
        <div className="fifa-fullbleed">
          <img src={img("11 Large.jpeg")} alt="Group A: three looks" />
        </div>
        <div className="fifa-fullbleed">
          <img src={img("12 Fabric Large.jpeg")} alt="Fabric story shared between Group A and Group B" />
        </div>
        <div className="fifa-fullbleed">
          <img src={img("11 Group2 Large.jpeg")} alt="Group B: four looks" />
        </div>
      </section>

      {/* FLATS */}
      <section className="fifa-section">
        <SectionMark no="07" label="Flats" title="Group A, Group B" />
        <div className="fifa-flats">
          <figure>
            <img src={img("A1 Large.jpeg")} alt="Look A1 flat" />
          </figure>
          <figure>
            <img src={img("A2 Large.jpeg")} alt="Look A2 flat" />
          </figure>
          <figure>
            <img src={img("A3 Large.jpeg")} alt="Look A3 flat" />
          </figure>
          <figure>
            <img src={img("B Lineup Large.jpeg")} alt="Group B: four looks lineup" />
          </figure>
          <figure>
            <img src={img("B1 Large.jpeg")} alt="Look B1 flat" />
          </figure>
          <figure>
            <img src={img("B2 Large.jpeg")} alt="Look B2 flat" />
          </figure>
          <figure>
            <img src={img("B3 Large.jpeg")} alt="Look B3 flat" />
          </figure>
          <figure>
            <img src={img("B4 Large.jpeg")} alt="Look B4 flat" />
          </figure>
        </div>
      </section>

      {/* GROUP C LINEUP */}
      <section className="fifa-section">
        <SectionMark no="08" label="Group C · Lineup" title="Sketches and fabric story" />
        <div className="fifa-fullbleed">
          <img src={img("21 Group3 Large.jpeg")} alt="Group C: three looks sketch" />
        </div>
        <div className="fifa-fullbleed">
          <img src={img("22 Fabric Large.jpeg")} alt="Group C fabric story" />
        </div>
      </section>

      {/* MAKING */}
      <section className="fifa-section">
        <SectionMark no="09" label="In the studio" title="Spray, stitch, finish." />
        <div className="fifa-pair">
          <figure>
            <img src={img("File_000 (79) Large.jpeg")} alt="FIFA 1904 stencil: spray-painted graphic" />
          </figure>
          <figure>
            <img src={img("IMG_5399 Large.jpeg")} alt="Studio fitting: back view" />
          </figure>
        </div>
        <div className="fifa-six">
          <figure>
            <img src={img("IMG_5401 Large.jpeg")} alt="Studio fitting: front view, cotton-twill topper over crepe maxi" />
          </figure>
          <figure>
            <img src={img("IMG_5400 Large.jpeg")} alt="Studio fitting: side view, cotton-twill topper over crepe maxi" />
          </figure>
          <figure>
            <img src={img("IMG_5403 Large.jpeg")} alt="Studio fitting: halter maxi gown, side view" />
          </figure>
          <figure>
            <img src={img("IMG_5404 Large.jpeg")} alt="Studio fitting: halter maxi gown, back view" />
          </figure>
          <figure>
            <img src={img("IMG_4512 Large.jpeg")} alt="On-platform staging · models and faculty in conversation" />
          </figure>
          <figure>
            <img src={img("IMG_4518 Large.jpeg")} alt="Faculty fitting on the platform · maxi skirt and cotton-twill topper" />
          </figure>
        </div>
      </section>

      {/* CLOSE */}
      <div className="fifa-end">
        <span>End · 01 · FIFA 1904 · Senior Thesis · 2026</span>
        <button className="fifa-end-close" onClick={onClose}>Back to all work</button>
      </div>
    </div>);

}

function SectionMark({ no, label, title }) {
  return (
    <div className="fifa-section-mark">
      <div className="fifa-section-no">{no} · {label}</div>
      <h2 className="fifa-section-title">{title}</h2>
    </div>);

}

// ---------- PROJECT DETAIL (router) ----------
function ProjectDetail({ collection, onClose, fifaHeroMode }) {
  useEffect(() => {
    const onKey = (e) => {if (e.key === "Escape") onClose();};
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const root = document.querySelector(".detail");
    if (root) root.scrollTop = 0;
    return () => {window.removeEventListener("keydown", onKey);document.body.style.overflow = "";};
  }, [onClose]);

  if (!collection) return null;
  const c = collection;
  if (c.id === "fifa1904") return <FifaCaseStudy collection={c} onClose={onClose} fifaHeroMode={fifaHeroMode} />;
  if (c.id === "revolve-otis" && RevolveCaseStudy) return <RevolveCaseStudy collection={c} onClose={onClose} />;
  if (c.id === "frame-salvation" && FrameCaseStudy) return <FrameCaseStudy collection={c} onClose={onClose} />;
  if (c.id === "blood-moon" && BloodMoonCaseStudy) return <BloodMoonCaseStudy collection={c} onClose={onClose} />;
  if (c.id === "music-fest" && MusicFestCaseStudy) return <MusicFestCaseStudy collection={c} onClose={onClose} />;
  if (c.id === "trompe" && TrompeCaseStudy) return <TrompeCaseStudy collection={c} onClose={onClose} />;
  if (c.id === "gothic-winter" && GothicCaseStudy) return <GothicCaseStudy collection={c} onClose={onClose} />;
  if (c.id === "la-rose" && LaRoseCaseStudy) return <LaRoseCaseStudy collection={c} onClose={onClose} />;
  if (c.id === "tech-pack" && TechPackCaseStudy) return <TechPackCaseStudy collection={c} onClose={onClose} />;
  if (c.id === "fold-ease" && FoldEaseCaseStudy) return <FoldEaseCaseStudy collection={c} onClose={onClose} />;

  // gallery layout: varied to feel like a lookbook, repeats per project
  const galleryRows = [
  ["span-12"],
  ["span-7", "span-5"],
  ["span-4", "span-4", "span-4"],
  ["span-8", "span-4"],
  ["span-12"],
  ["span-6", "span-6"]];


  return (
    <div className="detail" role="dialog" aria-label={c.title}>
      <button className="detail-close" onClick={onClose}>
        <span>Close</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M1 1l8 8M9 1l-8 8" />
        </svg>
      </button>
      <div className="detail-hero">
        <Slot id={`detail-hero-${c.id}`} label={`${c.title}: Hero image`} hint="21:9 full-bleed lookbook or runway shot" />
      </div>
      <div className="detail-head">
        <div>
          <div className="detail-no">{c.no} · {c.year}</div>
          <h1 className="detail-title">{c.title}</h1>
          <p className="detail-blurb">{c.blurb}</p>
          <div className="detail-tags">
            {c.tags.map((t) => <span key={t} className="skill">{t}</span>)}
          </div>
        </div>
        <dl className="detail-meta-row">
          <div><dt>Year</dt><dd>{c.year}</dd></div>
          <div><dt>Role</dt><dd>{c.role}</dd></div>
          <div><dt>Looks</dt><dd>{c.looks}</dd></div>
          <div><dt>Studio</dt><dd>Fx3 Studio · Los Angeles</dd></div>
        </dl>
      </div>
      <div className="detail-gallery">
        {galleryRows.map((row, i) =>
        <div className="detail-gallery-row" key={i}>
            {row.map((cls, j) => {
            const idx = i * 4 + j + 1;
            const labels = ["Look", "Detail", "Process", "Flat sketch", "Editorial", "Backstage"];
            return (
              <div key={j} className={cls}>
                  <Slot id={`detail-${c.id}-${i}-${j}`} label={`${labels[idx % labels.length]} ${String(idx).padStart(2, "0")}`} />
                </div>);

          })}
          </div>
        )}
        <div style={{ padding: "40px 0", borderTop: "1px solid var(--line)", marginTop: 24, fontFamily: "var(--mono)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--fg-dim)", textAlign: "center" }}>
          End · {c.no} {c.title}
        </div>
      </div>
    </div>);

}

export { Nav, Hero, WorkGrid, About, Process, CV, Contact, ProjectDetail, Slot, StripePlaceholder };