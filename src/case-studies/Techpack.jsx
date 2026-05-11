// ---------- TECH PACK · AVENUE COLLECTION ----------
// 6-page production tech pack for the Avenue Collection green rain coat.
// Style: hood wraps · drawstring waist · size 26-28 (XXL) · fall.

export function TechPackCaseStudy({ collection, onClose }) {
  const c = collection;
  const img = (n) => `assets/techpack/${n}`;

  const Page = ({ n, alt }) =>
  <div className="fifa-fullbleed bm-page">
      <img src={img("page-" + n + ".jpeg")} alt={alt} />
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

        <Page n="1" alt="Page 1 · Rear view" />

        <Page n="2" alt="Page 2 · Interior view" />

        <Page n="3" alt="Page 3 · Spec Sheet and Bill of Materials" />

        <Page n="4" alt="Page 4 · Pattern Card" />

        <Page n="5" alt="Page 5 · Exterior view" />

        <Page n="6" alt="Page 6 · Branding Page" />
      </section>

      <div className="fifa-end">
        <span>End · 10 · Avenue Collection · Tech Pack · Fall</span>
        <button className="fifa-end-close" onClick={onClose}>Back to all work</button>
      </div>
    </div>);

}

