// ---------- LA ROSE ET LE CHIEN · ARTIST PROJECT ----------
// 10-page menswear A/W 2025 concept book inspired by Dorothea Tanning's
// painting "La Rose et le Chien" (1952). Cover-to-flats with installation shot.

function LaRoseCaseStudy({ collection, onClose }) {
  const c = collection;
  const img = (n) => `assets/larose/${n}`;

  const Page = ({ n, alt, cap }) =>
  <div className="fifa-fullbleed bm-page">
      <img src={img("page-" + n + ".jpeg")} alt={alt} />
      <div className="fifa-cap">{cap}</div>
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
          <h2 className="fifa-section-title">The book, cover to flats.</h2>
        </div>

        <Page n="1" alt="Page 1 · Lineup of six menswear looks"
        cap="Page 1 · lineup · six men's looks · L1 olive shawl-cape jacket and indigo wavy-seam pant · L2 navy hooded shawl jacket · L3 indigo and rust contrast wrap shirt · L4 olive shawl pant ensemble · L5 olive felt long shawl coat · L6 rust felt swing coat with draped lapel." />

        <div className="fifa-intro-grid fe-intro-after-cover">
          <div className="fifa-intro-meta">
            <div className="fifa-meta-row"><span>Project</span><span>La Rose et le Chien · Artist Project</span></div>
            <div className="fifa-meta-row"><span>Format</span><span>10-page concept book · men's wear A/W 2025</span></div>
            <div className="fifa-meta-row"><span>Source</span><span>Dorothea Tanning · La Rose et le Chien · 1952 · oil on canvas · 26 × 21 in</span></div>
            <div className="fifa-meta-row"><span>Aesthetic</span><span>Painterly drape · romantic monastic men's wear · oxidized palette</span></div>
            <div className="fifa-meta-row"><span>Materials</span><span>Leather · wool felt · jersey-knit dye treatment · double-face cotton shirting · cotton suiting · wool coating</span></div>
            <div className="fifa-meta-row"><span>Trims</span><span>Single-weight buttons · double-sided exposed zippers</span></div>
            <div className="fifa-meta-row"><span>Looks</span><span>6 · oxblood, rust, oxidized olive, ink, jersey indigo</span></div>
          </div>
          <div className="fifa-intro-text">
            <p className="fifa-blurb">{c.blurb}</p>
            <p className="fifa-blurb dim">{c.concept}</p>
          </div>
        </div>

        <Page n="2" alt="Page 2 · Fabric story and outfit plan grid"
        cap="Page 2 · fabric story and outfit plan · construction details, fabric manipulation, and the source painting · outfit grid mapping six fabric categories across the five base looks: solid basic-weight, patterned basic-weight, novelty texture for jacket, novelty texture for coat, top knit or woven, and second top." />

        <Page n="3" alt="Page 3 · Fabric story · close swatches"
        cap="Page 3 · fabric story · novelty leather, novelty wool felt in oxidized red, jersey-knit dye treatment, double-face cotton shirting in indigo and rust, base cotton suiting, base wool coating · trims, single button and double-sided exposed zipper." />

        <Page n="4" alt="Page 4 · Sewing samples"
        cap="Page 4 · sewing samples · sample 1, double-sided exposed zipper on indigo cotton shirting · sample 2, charcoal wool coating panel for the swing coat · sample 3, indigo and rust double-face shirting · annotated against the wavy-seam pant, oxidized swing coat, and double-face wrap shirt." />

        <Page n="5" alt="Page 5 · Look 1 flat · cape jacket and panel pants"
        cap="Page 5 · construction flats · Look 1 · cropped cape jacket with shoulder yoke, drape cowl turtleneck, and wavy-seam panel pants in jersey indigo with topstitched curve seams." />

        <Page n="6" alt="Page 6 · Look 2 flat · long zip coat and asymmetric wrap top"
        cap="Page 6 · construction flats · Look 2 · long zip-front coat with shawl collar and side cape · asymmetric wrap top with lace-trim red contrast · wavy-seam panel pant · construction details for the cape draping and the topstitched-cowl wrap top." />

        <Page n="7" alt="Page 7 · Look 3 flat · hooded zip jacket and contrast wrap shirt"
        cap="Page 7 · construction flats · Look 3 · hooded zip-front cocoon jacket with curved seam panels · double-face cotton wrap shirt with rust contrast collar and topstitched draped front · side-trim trouser." />

        <Page n="8" alt="Page 8 · Look 4 flat · long shawl coat and tapered trouser"
        cap="Page 8 · construction flats · Look 4 · long shawl-collar swing coat in oxidized olive with shaped armhole and curved hem · tapered trouser with wavy side seams · funnel-neck mock-neck base layer with shawl placket." />

        <Page n="9" alt="Page 9 · Look 5 flat · rust felt swing coat"
        cap="Page 9 · construction flats · Look 5 · oxidized rust felt swing coat with draped shawl lapel and waist-band detail · mandarin-collar shirt · five-pocket tapered trouser · construction details for the felt draping and pant seam." />

        <Page n="10" alt="Page 10 · Installation · Spencer at Artist Project review"
        cap="Page 10 · installation · the project pinned for review · fabric story, sewing samples, lineup, and look pages mounted on the critique wall under the heading Artist Project · Men's Wear · A/W 2025." />
      </section>

      <div className="fifa-end">
        <span>End · 09 — La Rose et le Chien · Artist Project · Men's Wear A/W 2025</span>
        <button className="fifa-end-close" onClick={onClose}>Back to all work</button>
      </div>
    </div>);

}

window.LaRoseCaseStudy = LaRoseCaseStudy;
