// ---------- TROMPE L'OEIL · PORTFOLIO BOOK ----------
// "A Knite at the Gallery": six-page knit + denim trompe-l'oeil concept book.
// Layout matches Blood Moon / Fold Ease / Music Fest: cover first, then intro
// inline under the cover, then remaining pages full-bleed.

export function TrompeCaseStudy({ collection, onClose }) {
  const c = collection;
  const img = (n) => `assets/trompe/${n}`;

  const Page = ({ n, alt, cap }) =>
  <div className="fifa-fullbleed bm-page">
      <img src={img("page-" + n + ".jpeg")} alt={alt} />
      <div className="fifa-cap">{cap}</div>
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
          <h2 className="fifa-section-title">The book, cover to flats.</h2>
        </div>

        <Page n="1" alt="Page 1 · cover · A Knite at the Gallery"
        cap="Page 1 · cover · A Knite at the Gallery · Lower East Side gallery doorway, gilt frame, Salvation Army graphic, intern community walking out in upcycled denim and knit patchwork." />

        <div className="fifa-intro-grid fe-intro-after-cover">
          <div className="fifa-intro-meta">
            <div className="fifa-meta-row"><span>Project</span><span>Trompe L'Oeil · Portfolio Book</span></div>
            <div className="fifa-meta-row"><span>Format</span><span>6-page concept book · setting · flats</span></div>
            <div className="fifa-meta-row"><span>Setting</span><span>A Knite at the Gallery · Lower East Side gallery doorway</span></div>
            <div className="fifa-meta-row"><span>Premise</span><span>Fool-the-eye knit + denim · upcycled, repaired, and seam-as-drawing</span></div>
            <div className="fifa-meta-row"><span>Treatments</span><span>Direct-to-film denim heat transfer · laser-cut knit · i-cord stitches · upcycled knit patchwork</span></div>
            <div className="fifa-meta-row"><span>Materials</span><span>Ponte knit · eyelet knit · waffle knit · Y-knit · cotton denim</span></div>
            <div className="fifa-meta-row"><span>Looks</span><span>5 · indigo, navy, sea-green, with one ice-pale outlier</span></div>
          </div>
          <div className="fifa-intro-text">
            <p className="fifa-blurb">{c.blurb}</p>
            <p className="fifa-blurb dim">{c.concept}</p>
          </div>
        </div>

        <Page n="2" alt="Page 2 · materials + treatments"
        cap="Page 2 · materials + treatments · ponte / eyelet / waffle / Y-knit · upcycled knit patchwork vest with i-cord stitches · laser-cut cable knit · direct-to-film heat-transfer denim prints rendered onto flat ponte." />

        <Page n="3" alt="Page 3 · five-look lineup"
        cap="Page 3 · five-look lineup · L1 · navy patchwork shawl-collar coat + heat-transfer denim short · L2 · printed-denim funnel hood + cable trouser · L3 · printed-denim crop jacket + cable trouser · L4 · upcycled-knit asymmetric pullover + heat-transfer flare · L5 · i-cord-stitched long coat + heat-transfer denim trouser." />

        <Page n="4" alt="Page 4 · construction flats group A"
        cap="Page 4 · construction flats · drawstring hooded pullover with patch pocket · vented inseam-pocket short · cowl-back vest with collar · gusset short with flat-felled inseam · i-cord-stitched mock-neck jacket." />

        <Page n="5" alt="Page 5 · construction flats group B"
        cap="Page 5 · construction flats · cowl-neck pullover with flat-felled seam · wide cropped denim pant · zip-front patch-pocket cropped jacket · cowl-shoulder tee · gusset-paneled tapered trouser with darts." />

        <Page n="6" alt="Page 6 · construction flats group C"
        cap="Page 6 · construction flats · i-cord-stitched hooded long pullover · darted flat-felled denim trouser · i-cord-stitched button-front long coat · five-pocket denim trouser." />
      </section>

      {/* CLOSE */}
      <div className="fifa-end">
        <span>End · 07 · Trompe L'Oeil · Portfolio Book · Knit + Denim</span>
        <button className="fifa-end-close" onClick={onClose}>Back to all work</button>
      </div>
    </div>);

}

