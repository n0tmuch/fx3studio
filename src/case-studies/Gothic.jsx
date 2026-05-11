// ---------- GOTHIC WINTER · PORTFOLIO BOOK ----------
// 12-page womenswear concept book. Innsbruck ski resort, gothic palette,
// felt + lace-quilted treatments. Layout matches Trompe / Blood Moon / Fold Ease /
// Music Fest: cover first, intro inline under the cover, then remaining pages full-bleed.

export function GothicCaseStudy({ collection, onClose }) {
  const c = collection;
  const img = (n) => `assets/gothic/${n}`;

  const Page = ({ n, alt }) =>
  <div className="fifa-fullbleed bm-page">
      <img src={img("page-" + n + ".jpeg")} alt={alt} />
    </div>;

  return (
    <div className="detail fifa revolve bloodmoon trompe gothic" role="dialog" aria-label={c.title}>
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
          <h2 className="fifa-section-title">Gothic Winter collection</h2>
        </div>

        <Page n="1" alt="Page 1 · Mood board · Innsbruck, Austria"
        />

        <div className="fifa-intro-grid fe-intro-after-cover">
          <div className="fifa-intro-meta">
            <div className="fifa-meta-row"><span>Project</span><span>Gothic Winter · Collection</span></div>
            <div className="fifa-meta-row"><span>Format</span><span>12-page collection</span></div>
            <div className="fifa-meta-row"><span>Setting</span><span>Innsbruck, Austria · alpine ski resort</span></div>
            <div className="fifa-meta-row"><span>Aesthetic</span><span>Gothic après-ski</span></div>
            <div className="fifa-meta-row"><span>Treatments</span><span>Treatment 1 · striped wet-felted wool · Treatment 2 · lace-quilted puffer</span></div>
            <div className="fifa-meta-row"><span>Materials</span><span>Wool · lace · nylon · leather · chunky knit · cable knit · jersey · double knit · silk · denim</span></div>
            <div className="fifa-meta-row"><span>Looks</span><span>8 · cream + black + indigo · pops of icy blue and forest moss</span></div>
          </div>
          <div className="fifa-intro-text">
            <p className="fifa-blurb">{c.blurb}</p>
            <p className="fifa-blurb dim">{c.concept}</p>
          </div>
        </div>

        <Page n="2" alt="Page 2 · Fabric story · ten materials and two treatments"
        />

        <Page n="3" alt="Page 3 · Lineup A · four looks"
        />

        <Page n="4" alt="Page 4 · Lineup B · second iteration"
        />

        <Page n="5" alt="Page 5 · Felt coat flat · Treatment 1"
        />

        <Page n="6" alt="Page 6 · Drape cape coat flat"
        />

        <Page n="7" alt="Page 7 · Long felt coat flat"
        />

        <Page n="8" alt="Page 8 · Herringbone hooded longcoat flat"
        />

        <Page n="9" alt="Page 9 · Lace-quilt cropped blazer flat"
        />

        <Page n="10" alt="Page 10 · Lace-quilt blazer + bubble skirt flat"
        />

        <Page n="11" alt="Page 11 · Hooded woven cape flat"
        />

        <Page n="12" alt="Page 12 · Hooded long pullover flat"
        />
      </section>

      {/* CLOSE */}
      <div className="fifa-end">
        <span>End · 08 · Gothic Winter · Collection · Womenswear</span>
        <button className="fifa-end-close" onClick={onClose}>Back to all work</button>
      </div>
    </div>);

}

