// ---------- REVOLVE × OTIS CASE STUDY ----------
// Junior-year mentorship collection. Mirrors FifaCaseStudy structure.
export function RevolveCaseStudy({ collection, onClose }) {
  const c = collection;
  const img = (n) => `assets/revolve/${n}`;

  const Mark = ({ no, label, title }) =>
  <div className="fifa-section-mark">
      <div className="fifa-section-no">{no} · {label}</div>
      <h2 className="fifa-section-title">{title}</h2>
    </div>;

  return (
    <div className="detail fifa revolve" role="dialog" aria-label={c.title}>
      <button className="detail-close" onClick={onClose}>
        <span>Close</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M1 1l8 8M9 1l-8 8" />
        </svg>
      </button>

      {/* HERO: runway */}
      <div className="fifa-hero contain">
        <img src={img("IMG_8644.jpeg")} alt="Revolve × Otis: runway hero" />
        <div className="fifa-hero-overlay" />
        <div className="fifa-hero-text">
          <div className="fifa-eyebrow">{c.no} · Revolve × Otis · {c.year}</div>
          <h1 className="fifa-title">Revolve<br /><em>× Otis</em></h1>
          <div className="fifa-subtitle">A junior-year mentorship in dye and distressed denim.</div>
        </div>
      </div>

      {/* INTRO */}
      <section className="fifa-section fifa-intro">
        <div className="fifa-intro-grid">
          <div className="fifa-intro-meta">
            <div className="fifa-meta-row"><span>Project</span><span>Revolve × Otis Junior mentorship</span></div>
            <div className="fifa-meta-row"><span>Year</span><span>{c.year}</span></div>
            <div className="fifa-meta-row"><span>Show</span><span>Otis Junior Fashion Show</span></div>
            <div className="fifa-meta-row"><span>Looks</span><span>Four groups: A · B · C · D</span></div>
            <div className="fifa-meta-row"><span>Treatments</span><span>Reverse embroidery · ombré dye · distressed denim</span></div>
            <div className="fifa-meta-row"><span>Role</span><span>Conceptualized and illustrated a full collection · dyed yardage · drape · pattern · construction · show production</span></div>
          </div>
          <div className="fifa-intro-text">
            <p className="fifa-blurb">{c.blurb}</p>
            <p className="fifa-blurb dim">{c.concept}</p>
          </div>
        </div>
      </section>

      {/* FABRIC STORY */}
      <section className="fifa-section">
        <Mark no="01" label="Fabric story" title="Every treatment, on one board." />
        <p className="fifa-lede">Every dye and reverse-embroidery experiment in the collection, laid out on one board. Ice-dyed ponte and sweater knits in pinks and blues. Denim dunked first in sky-blue, then ombré-dipped into red, finished with a hand-burned rib-cage screen print. Leftover purple denim bleached into a galaxy print and hand-painted. And a coffee-dyed panda skull, cut twice for reverse-embroidery depth.</p>
        <div className="fifa-pair">
          <figure>
            <img src={img("21 Large.jpeg")} alt="Swatch board, left half" />
          </figure>
          <figure>
            <img src={img("22 Large.jpeg")} alt="Swatch board, right half" />
          </figure>
        </div>
      </section>

      {/* COLOR / FABRIC */}
      <section className="fifa-section">
        <Mark no="02" label="Color & Fabric" title="Sky, bleed, sand, brick." />
        <div className="fifa-pair">
          <figure>
            <img src={img("10 Large.jpeg")} alt="Fabric and dye swatch board" />
          </figure>
          <figure>
            <img src={img("12 Large.jpeg")} alt="Bathtub dye process and dyed jersey" />
          </figure>
        </div>
        <div className="fifa-palette">
          {["#bcd4e6", "#e0a8b6", "#c44a5c", "#7a3340", "#5b2a3e", "#a08a6e", "#3a3128", "#0e0e0e"].map((sw, i) =>
          <div key={i} className="fifa-swatch" style={{ background: sw }} />
          )}
        </div>
      </section>

      {/* GROUP A */}
      <section className="fifa-section">
        <Mark no="03" label="Group A · Ensemble" title="Patchwork tops, drop-rise cargo." />
        <div className="fifa-fullbleed">
          <img src={img("5 Large.jpeg")} alt="Group A lineup" />
        </div>
        <div className="fifa-pair">
          <figure>
            <img src={img("1 Large.jpeg")} alt="A1: patchwork top + shorts + leggings flat" />
          </figure>
          <figure>
            <img src={img("8 Large.jpeg")} alt="A2: corset + cropped jacket + cargo flat" />
          </figure>
        </div>
      </section>

      {/* GROUP B */}
      <section className="fifa-section">
        <Mark no="04" label="Group B · Reverse Embroidery" title="The ribcage, set free of the body." />
        <div className="fifa-fullbleed">
          <img src={img("16 Large.jpeg")} alt="Group B: reverse embroidery looks" />
        </div>
        <div className="fifa-pair">
          <figure>
            <img src={img("3 Large.jpeg")} alt="B1: hooded ribcage maxi flat" />
          </figure>
          <figure>
            <img src={img("11 Large.jpeg")} alt="B2: ribcage overall dress flat" />
          </figure>
          <figure>
            <img src={img("19 Large.jpeg")} alt="B3: ribcage tunic + flared denim flat" />
          </figure>
        </div>
      </section>

      {/* GROUP C */}
      <section className="fifa-section">
        <Mark no="05" label="Group C · Dye Treatment" title="Shoulder-blue, hem-bleed." />
        <div className="fifa-fullbleed">
          <img src={img("13 Large.jpeg")} alt="Group C: dyed denim looks" />
        </div>
        <div className="fifa-pair">
          <figure>
            <img src={img("6 Large.jpeg")} alt="C1: cropped jacket + denim short flat" />
          </figure>
          <figure>
            <img src={img("15 Large.jpeg")} alt="C2: drape cardigan + dyed cargo flat" />
          </figure>
        </div>
      </section>

      {/* GROUP D */}
      <section className="fifa-section">
        <Mark no="06" label="Group D · Skull Motif" title="Reverse-cut skull, two-tone tunic." />
        <div className="fifa-fullbleed">
          <img src={img("18 Large.jpeg")} alt="Group D lineup" />
        </div>
        <div className="fifa-pair">
          <figure>
            <img src={img("9 Large.jpeg")} alt="D1: skull pullover + cropped jacket flat" />
          </figure>
          <figure>
            <img src={img("2 Large.jpeg")} alt="D2: skull tunic + arrow-seam pant flat" />
          </figure>
        </div>
      </section>

      {/* PRINCIPAL HOODED LOOK */}
      <section className="fifa-section">
        <Mark no="07" label="Featured Look" title="Hooded jumpsuit · sky-to-bleed." />
        <div className="fifa-pair">
          <figure>
            <img src={img("21 Large.jpeg")} alt="Featured hooded jumpsuit flats" />
          </figure>
        </div>
      </section>

      {/* PROCESS / FITTINGS */}
      <section className="fifa-section">
        <Mark no="08" label="In the studio" title="Dye, drape, fit." />
        <div className="fifa-pair">
          <figure>
            <img src={img("IMG_7237 Large.jpeg")} alt="Faculty fitting on platform" />
          </figure>
          <figure>
            <img src={img("IMG_6590 Large.jpeg")} alt="Mentor fitting on platform" />
          </figure>
        </div>
        <div className="fifa-pair">
          <figure>
            <img src={img("IMG_3816 Large.jpeg")} alt="Fitting: final styling pass" />
          </figure>
          <figure>
            <img src={img("IMG_7802 Large.jpeg")} alt="Backstage: model standing" />
          </figure>
        </div>
        <div className="fifa-pair">
          <figure>
            <img src={img("IMG_9777 Large.jpeg")} alt="Show floor with white wedding pieces" />
          </figure>
        </div>
      </section>

      {/* RUNWAY */}
      <section className="fifa-section">
        <Mark no="09" label="Runway" title="Revolve × Otis · show floor." />
        <div className="fifa-fullbleed">
          <img src={img("IMG_8644.jpeg")} alt="Runway: hooded dip-dye jumpsuit" />
        </div>
      </section>

      {/* CLOSE */}
      <div className="fifa-end">
        <span>End · 02 · Revolve × Otis · Junior mentorship · 2025</span>
        <button className="fifa-end-close" onClick={onClose}>Back to all work</button>
      </div>
    </div>);
}

