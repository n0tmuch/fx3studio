// ---------- BLOOD MOON · PORTFOLIO BOOK ----------
// Hybrid format: short hero + intro, then book pages 1–6 as full-bleed plates.
// Pages updated Nov 2026: corrected spelling/numbering, six-page final book.

export function BloodMoonCaseStudy({ collection, onClose }) {
  const c = collection;
  const img = (n) => `assets/bloodmoon/${n}`;

  return (
    <div className="detail fifa revolve bloodmoon" role="dialog" aria-label={c.title}>
      <button className="detail-close" onClick={onClose}>
        <span>Close</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M1 1l8 8M9 1l-8 8" />
        </svg>
      </button>

      {/* PAGES: full-bleed plates in book order */}
      <section className="fifa-section">
        <div className="bm-section-mark">
          <div className="fifa-section-no">Pages</div>
          <h2 className="fifa-section-title">Season: Winter</h2>
        </div>

        {/* Page 1: cover */}
        <div className="fifa-fullbleed bm-page">
          <img src={img("page-1.jpeg")} alt="Page 1 · cover" />
        </div>

        {/* Intro under cover */}
        <div className="fifa-intro-grid fe-intro-after-cover">
          <div className="fifa-intro-meta">
            <div className="fifa-meta-row"><span>Project</span><span>Blood Moon · Portfolio Book</span></div>
            <div className="fifa-meta-row"><span>Format</span><span>6-page menswear collection</span></div>
            <div className="fifa-meta-row"><span>Setting</span><span>Blood Moon Music Festival · Joshua Tree</span></div>
            <div className="fifa-meta-row"><span>Audience</span><span>Festival-goers age 20–30 · PLUR community</span></div>
            <div className="fifa-meta-row"><span>Treatments</span><span>I-cord through laser-cut holes · reverse embroidery · ice-dyed jersey couching</span></div>
            <div className="fifa-meta-row"><span>Materials</span><span>Cotton wool · cotton denim · rib knit · faux fur · cotton suiting</span></div>
            <div className="fifa-meta-row"><span>Looks</span><span>4 · outerwear-led menswear</span></div>
          </div>
          <div className="fifa-intro-text">
            <p className="fifa-blurb">{c.blurb}</p>
            <p className="fifa-blurb dim">{c.concept}</p>
          </div>
        </div>

        {/* Page 2: sample process */}
        <div className="fifa-fullbleed bm-page">
          <img src={img("page-2.jpeg")} alt="Page 2 · sample process" />
        </div>

        {/* Page 3: three-look lineup */}
        <div className="fifa-fullbleed bm-page">
          <img src={img("page-3.jpeg")} alt="Page 3 · three-look lineup" />
        </div>

        {/* Page 4: hero look + materials */}
        <div className="fifa-fullbleed bm-page">
          <img src={img("page-4.jpeg")} alt="Page 4 · hero look + materials" />
        </div>

        {/* Page 5: construction flats, group A */}
        <div className="fifa-fullbleed bm-page">
          <img src={img("page-5.jpeg")} alt="Page 5 · construction flats group A" />
        </div>

        {/* Page 6: construction flats, group B */}
        <div className="fifa-fullbleed bm-page">
          <img src={img("page-6.jpeg")} alt="Page 6 · construction flats group B" />
        </div>
      </section>

      {/* CLOSE */}
      <div className="fifa-end">
        <span>End · 04 · Blood Moon · Portfolio Book · Menswear</span>
        <button className="fifa-end-close" onClick={onClose}>Back to all work</button>
      </div>
    </div>);

}

