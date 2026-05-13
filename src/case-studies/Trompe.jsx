// ---------- TROMPE L'OEIL · PORTFOLIO BOOK ----------
// "A Knite at the Gallery": six-page knit + denim trompe-l'oeil concept book.
// Layout matches Blood Moon / Fold Ease / Music Fest: cover first, then intro
// inline under the cover, then remaining pages full-bleed.

export function TrompeCaseStudy({ collection, onClose }) {
  const c = collection;
  const img = (n) => `/assets/trompe/${n}`;

  const Page = ({ n, alt }) =>
  <div className="fifa-fullbleed bm-page">
      <img src={img("page-" + n + ".jpeg")} alt={alt} />
    </div>;

  return (
    <div className="detail fifa revolve bloodmoon trompe" role="dialog" aria-label={c.title}>
      <button className="detail-close" onClick={onClose}>
        <span>Close</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M1 1l8 8M9 1l-8 8" />
        </svg>
      </button>

      {/* PAGES */}
      <section className="fifa-section">
        <div className="bm-section-mark">
          <div className="fifa-section-no">Pages</div>
          <h2 className="fifa-section-title">Season: Spring</h2>
        </div>

        <Page n="1" alt="Page 1 · cover · A Knite at the Gallery"
        />

        <div className="fifa-intro-grid fe-intro-after-cover">
          <div className="fifa-intro-meta">
            <div className="fifa-meta-row"><span>Project</span><span>Trompe L'Oeil · Portfolio Book</span></div>
            <div className="fifa-meta-row"><span>Format</span><span>6-page concept book · setting · flats</span></div>
            <div className="fifa-meta-row"><span>Setting</span><span>A Knite at the Gallery · Lower East Side gallery</span></div>
            <div className="fifa-meta-row"><span>Premise</span><span>Rework FRAME x Salvation Army collection incorporating Trompe L'Oeil denim and laser cut denim</span></div>
            <div className="fifa-meta-row"><span>Treatments</span><span>Direct-to-film denim heat transfer · laser-cut knit · I-cord stitches · upcycled knit patchwork</span></div>
            <div className="fifa-meta-row"><span>Materials</span><span>Ponte knit · eyelet knit · waffle knit · Y-knit · cotton denim</span></div>
            <div className="fifa-meta-row"><span>Looks</span><span>6 looks reworked to only using the treatments and upcycled knits</span></div>
          </div>
          <div className="fifa-intro-text">
            <p className="fifa-blurb">{c.blurb}</p>
            <p className="fifa-blurb dim">{c.concept}</p>
          </div>
        </div>

        <Page n="2" alt="Page 2 · materials + treatments"
        />

        <Page n="3" alt="Page 3 · five-look lineup"
        />

        <Page n="4" alt="Page 4 · construction flats group A"
        />

        <Page n="5" alt="Page 5 · construction flats group B"
        />

        <Page n="6" alt="Page 6 · construction flats group C"
        />
      </section>

      {/* CLOSE */}
      <div className="fifa-end">
        <span>End · 07 · Trompe L'Oeil · Portfolio Book · Knit + Denim</span>
        <button className="fifa-end-close" onClick={onClose}>Back to all work</button>
      </div>
    </div>);

}

