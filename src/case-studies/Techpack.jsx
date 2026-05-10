// ---------- TECH PACK · AVENUE COLLECTION ----------
// 6-page production tech pack for the Avenue Collection green rain coat.
// Style: hood wraps · drawstring waist · size 26-28 (XXL) · fall.

export function TechPackCaseStudy({ collection, onClose }) {
  const c = collection;
  const img = (n) => `assets/techpack/${n}`;

  const Page = ({ n, alt, cap }) =>
  <div className="fifa-fullbleed bm-page">
      <img src={img("page-" + n + ".jpeg")} alt={alt} />
      <div className="fifa-cap">{cap}</div>
    </div>;

  return (
    <div className="detail fifa revolve bloodmoon trompe gothic larose techpack" role="dialog" aria-label={c.title}>
      <button className="detail-close" onClick={onClose}>
        <span>Close</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M1 1l8 8M9 1l-8 8" />
        </svg>
      </button>

      <section className="fifa-section">
        <div className="bm-section-mark">
          <div className="fifa-section-no">Pages</div>
          <h2 className="fifa-section-title">The pack, cover to cuts.</h2>
        </div>

        <Page n="5" alt="Page 1 · Rendered Flats and Exterior view"
        cap="Page 1 · rendered flats and exterior line drawings · army green polyester self with light-green polyurethane-coated nylon lining · centered hood, set-in two-piece sleeve with cuff, two welt pockets with drawstring pulls, drawstring waist with elastic casing." />

        <div className="fifa-intro-grid fe-intro-after-cover">
          <div className="fifa-intro-meta">
            <div className="fifa-meta-row"><span>Project</span><span>Avenue Collection · Tech Pack</span></div>
            <div className="fifa-meta-row"><span>Style</span><span>Green rain coat · hood wraps · drawstring waist</span></div>
            <div className="fifa-meta-row"><span>Season</span><span>Fall · Street</span></div>
            <div className="fifa-meta-row"><span>Size</span><span>26 – 28 · XXL · graded sample</span></div>
            <div className="fifa-meta-row"><span>Self</span><span>100% Polyester · Army Green</span></div>
            <div className="fifa-meta-row"><span>Lining</span><span>100% Nylon coated with polyurethane · Light Green</span></div>
            <div className="fifa-meta-row"><span>Trim</span><span>Drawstring waistband · eyelets · elastic cuff and hem · L36 wooden buttons</span></div>
            <div className="fifa-meta-row"><span>Pages</span><span>6 · rendered flats · arrows + spec · stitch detail · BOM · branding · pattern card</span></div>
          </div>
          <div className="fifa-intro-text">
            <p className="fifa-blurb">{c.blurb}</p>
            <p className="fifa-blurb dim">{c.concept}</p>
          </div>
        </div>

        <Page n="1" alt="Page 2 · Interior view and Arrows / Flats"
        cap="Page 2 · interior view and arrows · twenty-four numbered measurement callouts mapped front, back, hood, cuff, sleeve, and hem · drawstring length, cuff opening, armhole circumference, hood width and scarf length all called out for grading." />

        <Page n="3" alt="Page 3 · Spec Sheet and Bill of Materials"
        cap="Page 3 · spec sheet and bill of materials · twenty-four-row numeric spec from neck drop to draw-string length · BOM lists self body, sleeves, hood, hood scarf, cuff, yoke, pocket, pocket bag, lining, draw-string casing in army-green polyurethane and light-green polyurethane-coated nylon · trims include metal eyelet, aglet, toggle, woven elastic, cotton self and lining stitch, and four L36 wooden green buttons." />

        <Page n="2" alt="Page 4 · Exterior detail and Interior detail · stitch closeups"
        cap="Page 4 · exterior detail in red, six callouts · shoulder yoke single-needle double stitch, drawstring casing, pocket, drawstring and eyelet, hood with extension, button hole and button · interior detail in blue, seven callouts · straight stitch single needle, straight blind, single needle, single-needle double, overlocked + single-needle stitch-down, elastic waistband, blind stitch." />

        <Page n="6" alt="Page 5 · Pattern Card · numbered pieces and cuts table"
        cap="Page 5 · pattern card · twenty-four numbered pattern pieces mapped onto the flat · seventeen self-fabric pieces (left and right hood, left and right front body, back body, left and right yoke, left and right sleeve, back left and right sleeve, left and right pocket, cuff, drawstring, left and right inside lapel) and seven lining pieces with cut counts." />

        <Page n="4" alt="Page 6 · Branding Page and Designer info"
        cap="Page 6 · branding page · woven label placement, 1″ × 2.5″ exterior, 1.5″ × 1.5″ interior, 5⁄8″ × 9⁄16″ care label · sized to 3″ × 4″ branding zone at center back hood · alongside designer summary, fashion experience, core skills, and education." />
      </section>

      <div className="fifa-end">
        <span>End · 10 — Avenue Collection · Tech Pack · Fall</span>
        <button className="fifa-end-close" onClick={onClose}>Back to all work</button>
      </div>
    </div>);

}

