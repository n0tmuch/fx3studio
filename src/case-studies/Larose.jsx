// ---------- LA ROSE ET LE CHIEN · ARTIST PROJECT ----------
// 10-page menswear A/W 2025 concept book inspired by Dorothea Tanning's
// painting "La Rose et le Chien" (1952). Cover-to-flats with installation shot.

export function LaRoseCaseStudy({ collection, onClose }) {
  const c = collection;
  const img = (n) => `/assets/larose/${n}`;

  const Page = ({ n, alt }) =>
  <div className="fifa-fullbleed bm-page">
      <img src={img("page-" + n + ".jpeg")} alt={alt} />
    </div>;

  return (
    <div className="detail fifa revolve bloodmoon trompe gothic larose" role="dialog" aria-label={c.title}>
      <button className="detail-close" onClick={onClose}>
        <span>Close</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M1 1l8 8M9 1l-8 8" />
        </svg>
      </button>

      <section className="fifa-section">
        <div className="bm-section-mark">
          <div className="fifa-section-no">Pages</div>
          <h2 className="fifa-section-title">Menswear collection</h2>
        </div>

        <Page n="1" alt="Page 1 · Lineup of six menswear looks"
        />

        <div className="fifa-intro-grid fe-intro-after-cover">
          <div className="fifa-intro-meta">
            <div className="fifa-meta-row"><span>Project</span><span>La Rose et le Chien · Artist Project</span></div>
            <div className="fifa-meta-row"><span>Format</span><span>10-page collection · men's wear A/W 2025</span></div>
            <div className="fifa-meta-row"><span>Source</span><span>Dorothea Tanning · La Rose et le Chien · 1952 · oil on canvas · 26 × 21 in</span></div>
            <div className="fifa-meta-row"><span>Aesthetic</span><span>Painterly drape · romantic tailored rustic tones</span></div>
            <div className="fifa-meta-row"><span>Materials</span><span>Leather · wool felt · jersey-knit dye treatment · double-face cotton shirting · cotton suiting · wool coating</span></div>
            <div className="fifa-meta-row"><span>Trims</span><span>Single-weight buttons · double-sided exposed zippers</span></div>
            <div className="fifa-meta-row"><span>Looks</span><span>6 · tailored menswear looks</span></div>
          </div>
          <div className="fifa-intro-text">
            <p className="fifa-blurb">{c.blurb}</p>
            <p className="fifa-blurb dim">{c.concept}</p>
          </div>
        </div>

        <Page n="2" alt="Page 2 · Fabric story and outfit plan grid"
        />

        <Page n="3" alt="Page 3 · Fabric story · close swatches"
        />

        <Page n="4" alt="Page 4 · Sewing samples"
        />

        <Page n="5" alt="Page 5 · Look 1 flat · cape jacket and panel pants"
        />

        <Page n="6" alt="Page 6 · Look 2 flat · long zip coat and asymmetric wrap top"
        />

        <Page n="7" alt="Page 7 · Look 3 flat · hooded zip jacket and contrast wrap shirt"
        />

        <Page n="8" alt="Page 8 · Look 4 flat · long shawl coat and tapered trouser"
        />

        <Page n="9" alt="Page 9 · Look 5 flat · rust felt swing coat"
        />

        <Page n="10" alt="Page 10 · Installation · Spencer at Artist Project review"
        />
      </section>

      <div className="fifa-end">
        <span>End · 09 · La Rose et le Chien · Artist Project · Men's Wear A/W 2025</span>
        <button className="fifa-end-close" onClick={onClose}>Back to all work</button>
      </div>
    </div>);

}

