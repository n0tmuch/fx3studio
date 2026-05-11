// ---------- MUSIC FESTIVAL PERFORMERS · PORTFOLIO BOOK ----------
// Mirrors the Blood Moon book layout: short intro, then full-bleed pages.

export function MusicFestCaseStudy({ collection, onClose }) {
  const c = collection;
  const img = (n) => `assets/musicfest/${n}`;

  const Page = ({ n, alt }) =>
  <div className="fifa-fullbleed bm-page">
      <img src={img("page-" + n + ".jpeg")} alt={alt} />
    </div>;

  return (
    <div className="detail fifa revolve bloodmoon musicfest" role="dialog" aria-label={c.title}>
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
          <h2 className="fifa-section-title">Season: Fall</h2>
        </div>

        <Page n="1" alt="Page 1 · cover + customer story"
        />

        <div className="fifa-intro-grid fe-intro-after-cover">
          <div className="fifa-intro-meta">
            <div className="fifa-meta-row"><span>Project</span><span>Music Festival Performers · Portfolio Book</span></div>
            <div className="fifa-meta-row"><span>Format</span><span>8-page menswear collection</span></div>
            <div className="fifa-meta-row"><span>Season</span><span>Fall · avant-garde menswear</span></div>
            <div className="fifa-meta-row"><span>Customer</span><span>Performers age 25–35 · work-hard / play-hard · magnetic · $100K–250K</span></div>
            <div className="fifa-meta-row"><span>Treatments</span><span>Shaved fur · denim &amp; knit paneling</span></div>
            <div className="fifa-meta-row"><span>Looks</span><span>6 looks (A · B · D · E · F · G)</span></div>
          </div>
          <div className="fifa-intro-text">
            <p className="fifa-blurb">{c.blurb}</p>
            <p className="fifa-blurb dim">{c.concept}</p>
          </div>
        </div>

        <Page n="2" alt="Page 2 · sample process"
        />

        <Page n="3" alt="Page 3 · lineup A + B"
        />

        <Page n="4" alt="Page 4 · lineup D + E"
        />

        <Page n="5" alt="Page 5 · lineup F + Q"
        />

        <Page n="6" alt="Page 6 · construction flats group A"
        />

        <Page n="7" alt="Page 7 · construction flats group B"
        />

        <Page n="8" alt="Page 8 · construction flats group C"
        />
      </section>

      {/* CLOSE */}
      <div className="fifa-end">
        <span>End · 06 · Music Festival Performers · Portfolio Book · Menswear</span>
        <button className="fifa-end-close" onClick={onClose}>Back to all work</button>
      </div>
    </div>);

}

