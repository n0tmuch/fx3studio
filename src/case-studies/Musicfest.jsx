// ---------- MUSIC FESTIVAL PERFORMERS · PORTFOLIO BOOK ----------
// Mirrors the Blood Moon book layout: short intro, then full-bleed pages.

export function MusicFestCaseStudy({ collection, onClose }) {
  const c = collection;
  const img = (n) => `assets/musicfest/${n}`;

  const Page = ({ n, alt, cap }) =>
  <div className="fifa-fullbleed bm-page">
      <img src={img("page-" + n + ".jpeg")} alt={alt} />
      <div className="fifa-cap">{cap}</div>
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
          <h2 className="fifa-section-title">The book, cover to flats.</h2>
        </div>

        <Page n="1" alt="Page 1 · cover + customer story"
        cap="Page 1 · cover · the band on stage · customer brief: fall, avant-garde, age 25–35, work-hard / play-hard, magnetic, six-figure income · material story collage: denim &amp; knit paneling · shaved fur." />

        <div className="fifa-intro-grid fe-intro-after-cover">
          <div className="fifa-intro-meta">
            <div className="fifa-meta-row"><span>Project</span><span>Music Festival Performers · Portfolio Book</span></div>
            <div className="fifa-meta-row"><span>Format</span><span>8-page menswear book · cover · flats</span></div>
            <div className="fifa-meta-row"><span>Season</span><span>Fall · avant-garde menswear</span></div>
            <div className="fifa-meta-row"><span>Customer</span><span>Performers age 25–35 · work-hard / play-hard · magnetic · $100K–250K</span></div>
            <div className="fifa-meta-row"><span>Treatments</span><span>Shaved fur · denim &amp; knit paneling</span></div>
            <div className="fifa-meta-row"><span>Looks</span><span>18 across six lineup groups (A · B · D · E · F · Q)</span></div>
          </div>
          <div className="fifa-intro-text">
            <p className="fifa-blurb">{c.blurb}</p>
            <p className="fifa-blurb dim">{c.concept}</p>
          </div>
        </div>

        <Page n="2" alt="Page 2 · sample process"
        cap="Page 2 · sample process · shaved-fur surface treatment · denim-and-cable-knit paneled jacket on the form · pattern, cut, sewn." />

        <Page n="3" alt="Page 3 · lineup A + B"
        cap="Page 3 · lineup A · cowl tank + cable-paneled trouser · funnel pullover + cargo · shawl-collar coat with cable revere · lineup B · denim overall + chevron-quilt crop · jersey hoodie + carpenter pant · zip jacket + tapered cream pant." />

        <Page n="4" alt="Page 4 · lineup D + E"
        cap="Page 4 · lineup D · cowl-shoulder tunic + flare · cable hooded poncho + flare · shaved-fur wrap + flare · lineup E · navy long tunic + denim · navy long tunic + chevron short · two-piece jacket-on-tunic + chevron short." />

        <Page n="5" alt="Page 5 · lineup F + Q"
        cap="Page 5 · lineup F · draped pullover + cable midi · sleeveless shawl coat over rust cable + cable midi · raw shearling coat + cable midi · lineup Q · chevron-knit polo + cream cargo · cable hoodie + cream cargo · chevron-fur-hood jacket + cream cargo." />

        <Page n="6" alt="Page 6 · construction flats group A"
        cap="Page 6 · construction flats · lancer-zip long coat with button-tab hem · chevron bomber + zip-front pullover · flat-felled crop jacket · cowl tee · gusset-paneled tapered trouser · gourd-buckle overall." />

        <Page n="7" alt="Page 7 · construction flats group B"
        cap="Page 7 · construction flats · hooded shawl-fall pullover · asymmetric zip duster · vented-side T-coat · gusset cargo · jodhpur-cut riding trouser · lancer-zip denim jacket with button tabs · pleated wide short." />

        <Page n="8" alt="Page 8 · construction flats group C"
        cap="Page 8 · construction flats · zip-front coat-dress with vent button-tab · cowl-front pullover · lancer-zip raglan jacket · shoulder-tab vented polo · welt-pocket cargo · thumb-hole cuff hoodie · carpenter cargo skirt." />
      </section>

      {/* CLOSE */}
      <div className="fifa-end">
        <span>End · 06 · Music Festival Performers · Portfolio Book · Menswear</span>
        <button className="fifa-end-close" onClick={onClose}>Back to all work</button>
      </div>
    </div>);

}

