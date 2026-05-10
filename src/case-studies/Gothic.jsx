// ---------- GOTHIC WINTER · PORTFOLIO BOOK ----------
// 12-page womenswear concept book. Innsbruck ski resort, gothic palette,
// felt + lace-quilted treatments. Layout matches Trompe / Blood Moon / Fold Ease /
// Music Fest: cover first, intro inline under the cover, then remaining pages full-bleed.

export function GothicCaseStudy({ collection, onClose }) {
  const c = collection;
  const img = (n) => `assets/gothic/${n}`;

  const Page = ({ n, alt, cap }) =>
  <div className="fifa-fullbleed bm-page">
      <img src={img("page-" + n + ".jpeg")} alt={alt} />
      <div className="fifa-cap">{cap}</div>
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
          <h2 className="fifa-section-title">The book, cover to flats.</h2>
        </div>

        <Page n="1" alt="Page 1 · Mood board · Innsbruck, Austria"
        cap="Page 1 · mood board · Innsbruck, Austria · ski resort, gothic aesthetic, blacks and whites with pops of pastels and icy blue, velvets, lace, fur, weft jersey knit, interlock knit, flannel, Gore-Tex, silk, cotton, wool." />

        <div className="fifa-intro-grid fe-intro-after-cover">
          <div className="fifa-intro-meta">
            <div className="fifa-meta-row"><span>Project</span><span>Gothic Winter · Portfolio Book</span></div>
            <div className="fifa-meta-row"><span>Format</span><span>12-page concept book · mood · lineup · flats</span></div>
            <div className="fifa-meta-row"><span>Setting</span><span>Innsbruck, Austria · alpine ski resort</span></div>
            <div className="fifa-meta-row"><span>Aesthetic</span><span>Gothic · monastic silhouettes · ski-resort utility</span></div>
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
        cap="Page 2 · fabric story · wool, lace, nylon, leather, chunky knit, cable knit, jersey, double knit, silk, denim · Treatment 1 · striped wet-felted wool in cream and black · Treatment 2 · lace-quilted puffer in indigo." />

        <Page n="3" alt="Page 3 · Lineup A · four looks"
        cap="Page 3 · lineup A · L1 · felt-coat with stripe cuff over blue button-down · L2 · double-faced black drape coat over indigo carpenter shorts and felt boot covers · L3 · long felt swing-coat over indigo button shirt and skirt with felt boot covers · L4 · herringbone hooded longcoat with corset waist over black silk dome dress." />

        <Page n="4" alt="Page 4 · Lineup B · second iteration"
        cap="Page 4 · lineup B · second iteration · L5 · lace-quilt cape with corset bodice over denim biker short and cable thigh-highs · L6 · lace-quilt cropped blazer with scarf over denim bubble skirt · L7 · woven cardigan with chevron quilt over olive trouser · L8 · lace-quilt blanket scarf with side-zip vest over olive hood-pullover and snow boots." />

        <Page n="5" alt="Page 5 · Felt coat flat · Treatment 1"
        cap="Page 5 · construction flats · Treatment 1 felt coat with stripe cuff and zip-front placket · A-line skirt · short-sleeve polo · button-tab waist." />

        <Page n="6" alt="Page 6 · Drape cape coat flat"
        cap="Page 6 · construction flats · cocoon-cut wool drape cape coat with hidden side opening · five-pocket wide denim trouser · long V-neck pullover with felt-stripe sleeves." />

        <Page n="7" alt="Page 7 · Long felt coat flat"
        cap="Page 7 · construction flats · Treatment 1 long felt coat with shawl collar and stripe hem · button-front shirtdress · cap-sleeve tee with welt pocket." />

        <Page n="8" alt="Page 8 · Herringbone hooded longcoat flat"
        cap="Page 8 · construction flats · herringbone hooded longcoat with lace-up corset waist · raglan turtleneck · zip-front silk dome dress · five-pocket trouser." />

        <Page n="9" alt="Page 9 · Lace-quilt cropped blazer flat"
        cap="Page 9 · construction flats · Treatment 2 lace-quilt cropped blazer with double tab · lace-up panel vest · long-sleeve crew · denim biker short." />

        <Page n="10" alt="Page 10 · Lace-quilt blazer + bubble skirt flat"
        cap="Page 10 · construction flats · lace-quilt blazer with welt pockets · lace-up bodice vest · short-sleeve tee · denim bubble skirt with twin lace-up cuffs." />

        <Page n="11" alt="Page 11 · Hooded woven cape flat"
        cap="Page 11 · construction flats · woven chevron cape-pullover with shoulder dart and hood placket · five-pocket trouser · V-neck cardigan with welt pockets · raglan crewneck pullover." />

        <Page n="12" alt="Page 12 · Hooded long pullover flat"
        cap="Page 12 · construction flats · hooded long pullover with raglan sleeve · sweetheart corset bustier · zip-front mock-neck longcoat with princess seams." />
      </section>

      {/* CLOSE */}
      <div className="fifa-end">
        <span>End · 08 · Gothic Winter · Portfolio Book · Womenswear</span>
        <button className="fifa-end-close" onClick={onClose}>Back to all work</button>
      </div>
    </div>);

}

