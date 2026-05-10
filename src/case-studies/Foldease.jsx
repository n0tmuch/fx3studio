// ---------- FOLD INTO THE EASE · PORTFOLIO BOOK ----------
// Hybrid format: short hero + intro, then book pages 1–8 as full-bleed plates.
export function FoldEaseCaseStudy({ collection, onClose }) {
  const c = collection;
  const img = (n) => `assets/foldease/${n}`;

  return (
    <div className="detail fifa revolve foldease" role="dialog" aria-label={c.title}>
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
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) =>
        <React.Fragment key={n}>
            <div className="fifa-fullbleed bm-page">
              <img src={img(`page-${n}.jpeg`)} alt={`Page ${n} · book spread`} />
              <div className="fifa-cap">Page {n}.</div>
            </div>
            {n === 1 &&
          <div className="fifa-intro-grid fe-intro-after-cover">
                <div className="fifa-intro-meta">
                  <div className="fifa-meta-row"><span>Project</span><span>Fold into the Ease · Portfolio Book</span></div>
                  <div className="fifa-meta-row"><span>Format</span><span>8-page menswear book · setting · flats</span></div>
                  <div className="fifa-meta-row"><span>Looks</span><span>5 · outerwear-led menswear + accessories</span></div>
                  <div className="fifa-meta-row"><span>Treatments</span><span>Cotton-eyelet perforation · hand-painted tiger graphic</span></div>
                  <div className="fifa-meta-row"><span>Materials</span><span>Linen · cotton · jersey mesh · cotton eyelet · jersey knit</span></div>
                  <div className="fifa-meta-row"><span>Accessories</span><span>Sling pack · duffle · fanny · bucket + military caps</span></div>
                </div>
                <div className="fifa-intro-text">
                  <p className="fifa-blurb">{c.blurb}</p>
                  <p className="fifa-blurb dim">{c.concept}</p>
                </div>
              </div>
          }
          </React.Fragment>
        )}
      </section>

      <div className="fifa-end">
        <span>End · 05 · Fold into the Ease · Portfolio Book · Menswear</span>
        <button className="fifa-end-close" onClick={onClose}>Back to all work</button>
      </div>
    </div>);

}

