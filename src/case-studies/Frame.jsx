// ---------- FRAME × SALVATION ARMY × OTIS CASE STUDY ----------
// Senior mentorship · upcycled knitwear collection. Mirrors RevolveCaseStudy structure.
export function FrameCaseStudy({ collection, onClose }) {
  const c = collection;
  const img = (n) => `assets/frame/${n}`;

  const Mark = ({ no, label, title }) =>
  <div className="fifa-section-mark">
      <div className="fifa-section-no">{no} · {label}</div>
      <h2 className="fifa-section-title">{title}</h2>
    </div>;

  return (
    <div className="detail fifa revolve frame" role="dialog" aria-label={c.title}>
      <button className="detail-close" onClick={onClose}>
        <span>Close</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M1 1l8 8M9 1l-8 8" />
        </svg>
      </button>

      {/* HERO: final fitting in long navy coat */}
      <div className="fifa-hero">
        <img src={img("runway-8123.jpeg")} alt="FRAME × Salvation Army × Otis: final fitting hero" />
        <div className="fifa-hero-overlay" />
        <div className="fifa-hero-text">
          <div className="fifa-eyebrow">{c.no} · FRAME × Salvation Army × Otis · {c.year}</div>
          <h1 className="fifa-title">FRAME ×<br /><em>Salvation Army</em></h1>
          <div className="fifa-subtitle">A mentorship in upcycled knit.  Donated garments rebuilt into gallery-ready knitwear.</div>
        </div>
      </div>

      {/* INTRO */}
      <section className="fifa-section fifa-intro">
        <div className="fifa-intro-grid">
          <div className="fifa-intro-meta">
            <div className="fifa-meta-row"><span>Project</span><span>FRAME × Salvation Army × Otis</span></div>
            <div className="fifa-meta-row"><span>Period</span><span>Aug 2025 – Jan 2026</span></div>
            <div className="fifa-meta-row"><span>Show</span><span>Mentor-selected look, fitted by hand</span></div>
            <div className="fifa-meta-row"><span>Looks</span><span>Three groups: A · B · C</span></div>
            <div className="fifa-meta-row"><span>Treatments</span><span>Cable-felt fusion · deconstructed transparency · cord lacing</span></div>
            <div className="fifa-meta-row"><span>Role</span><span>Concept · sourcing · drape · pattern · hand construction</span></div>
          </div>
          <div className="fifa-intro-text">
            <p className="fifa-blurb">{c.blurb}</p>
            <p className="fifa-blurb dim">{c.concept}</p>
          </div>
        </div>
      </section>

      {/* COVER: typewriter title plate */}
      <section className="fifa-section">
        <div className="fifa-fullbleed">
          <img src={img("A1.jpeg")} alt="FRAME × Salvation Army × Otis title plate" style={{ background: "#f5f1ea" }} />
        </div>
      </section>

      {/* CONCEPT: two treatments */}
      <section className="fifa-section">
        <Mark no="01" label="Concept" title="Two treatments, one collection." />
        <p className="fifa-lede">
          Every fabric in the collection started as a donated Salvation Army garment, sweaters, table linens, knit curtains, second-hand cardigans. Two material languages emerged at the pattern table: a cream <em>cable-felt fusion</em> built up by hand, and a navy <em>deconstructed transparency</em> where knit is sliced, opened, and connected by I-cord ropes.
        </p>
        <div className="fifa-pair">
          <figure>
            <img src={img("deconstructed-transparency.jpeg")} alt="Deconstructed Transparency concept board" style={{ background: "#fff" }} />
          </figure>
          <figure>
            <img src={img("cable-felt-fusion.jpeg")} alt="Cable Felt Fusion concept board" style={{ background: "#fff" }} />
          </figure>
        </div>
      </section>

      {/* GROUP A: Cable Felt Fusion lineup */}
      <section className="fifa-section">
        <Mark no="02" label="Group A · Cable Felt Fusion" title="Cream, fringe, fused cable." />
        <div className="fifa-fullbleed">
          <img src={img("A-group-lineup.jpeg")} alt="Group A lineup: A1 through A5" style={{ background: "#fff" }} />
        </div>
        <div className="fifa-pair">
          <figure>
            <img src={img("Cable Felt Large.jpeg")} alt="Cable Felt fusion: cream sweater forms in studio" style={{ background: "#fff" }} />
          </figure>
          <figure>
            <img src={img("A2.jpeg")} alt="A2 plate: wrap capelet + rib trouser" style={{ background: "#fff" }} />
          </figure>
        </div>
      </section>

      {/* GROUP B: Cream cable two-look pair */}
      <section className="fifa-section">
        <Mark no="03" label="Plates · B + C" title="Six looks, two material languages." />
        <div className="fifa-pair">
          <figure>
            <img src={img("A3.jpeg")} alt="A3 plate: hooded fringe duster + jumpsuit" style={{ background: "#fff" }} />
          </figure>
          <figure>
            <img src={img("A4.jpeg")} alt="A4 plate: fur-trim hooded sweater + culotte" style={{ background: "#fff" }} />
          </figure>
          <figure>
            <img src={img("A5.jpeg")} alt="A5 plate: fringe hooded jacket + maxi skirt" style={{ background: "#fff" }} />
          </figure>
          <figure>
            <img src={img("B1.jpeg")} alt="B1 plate: hooded cable cape + shorts" style={{ background: "#fff" }} />
          </figure>
          <figure>
            <img src={img("B2.jpeg")} alt="B2 plate: fringe cape topper + pencil skirt" style={{ background: "#fff" }} />
          </figure>
          <figure>
            <img src={img("C1.jpeg")} alt="C1 plate: hooded asymmetric pullover + flare" style={{ background: "#fff" }} />
          </figure>
          <figure>
            <img src={img("C2.jpeg")} alt="C2 plate: long open coat + culotte" style={{ background: "#fff" }} />
          </figure>
          <figure>
            <img src={img("C3.jpeg")} alt="C3 plate: buttoned funnel-neck duster + trouser" style={{ background: "#fff" }} />
          </figure>
          <figure>
            <img src={img("C4.jpeg")} alt="C4 plate: hooded T-dress + over-the-knee socks" style={{ background: "#fff" }} />
          </figure>
        </div>
      </section>

      {/* GROUP C: Deconstructed transparency lineup */}
      <section className="fifa-section">
        <Mark no="04" label="Group C · Deconstructed Transparency" title="Navy, sliced, re-laced." />
        <div className="fifa-pair">
          <figure>
            <img src={img("C-group-lineup.jpeg")} alt="Group C lineup: front view" style={{ background: "#fff" }} />
          </figure>
          <figure>
            <img src={img("B-group-lineup.jpeg")} alt="Group C lineup: back view" style={{ background: "#fff" }} />
          </figure>
        </div>
      </section>

      {/* PROCESS: sourcing, knit reconstruction */}
      <section className="fifa-section">
        <Mark no="05" label="In the studio" title="Donated, dismantled, re-laced." />
        <p className="fifa-lede">Every panel started life as something else, a thrifted cardigan, a knit valance, a crochet table runner. Pieces were sorted by tone, then sliced into bands, opened on the loom, and connected by I-cord ropes.



        </p>
        <div className="fifa-pair">
          <figure>
            <img src={img("process-overview.jpeg")} alt="Process overview: sliced navy knit panel laid flat" />
          </figure>
          <figure>
            <img src={img("process-board.jpeg")} alt="Process board: I-cord ropes and knit components" />
          </figure>
        </div>
        <div className="fifa-pair">
          <figure>
            <img src={img("process-13.jpeg")} alt="Hand-lacing cord through eyelet knit" />
          </figure>
          <figure>
            <img src={img("process-12.jpeg")} alt="Knit panel laid out on the table" />
          </figure>
        </div>
        <div className="fifa-pair">
          <figure>
            <img src={img("process-15.jpeg")} alt="Cord stitch detail mid-build" />
          </figure>
          <figure>
            <img src={img("process-17.jpeg")} alt="Cuff detail with eyelet patch" />
          </figure>
        </div>
        <div className="fifa-pair">
          <figure>
            <img src={img("process-14.jpeg")} alt="Hem detail on dressform" />
          </figure>
          <figure>
            <img src={img("process-16.jpeg")} alt="Hand finishing a knit corner" />
          </figure>
        </div>
      </section>

      {/* DRESSFORM BUILD: selected look on the form */}
      <section className="fifa-section">
        <Mark no="06" label="Build" title="Mentor-selected look · on the form." />
        <p className="fifa-lede">The mentor-selected look (C3) was draped, patterned, cut, and sewn entirely by hand, front placket, funnel collar, vertical cord pleat down center back, lace panel running hem.


        </p>
        <div className="fifa-pair">
          <figure>
            <img src={img("fitting-7408.jpeg")} alt="C3 long coat on dressform: front" />
          </figure>
          <figure>
            <img src={img("fitting-7411.jpeg")} alt="C3 long coat on dressform: back detail" />
          </figure>
        </div>
        <div className="fifa-pair">
          <figure>
            <img src={img("fitting-7409.jpeg")} alt="C3 long coat on dressform: side" />
          </figure>
          <figure>
            <img src={img("fitting-7410.jpeg")} alt="C3 long coat on dressform: hem detail" />
          </figure>
        </div>
      </section>

      {/* FITTING: on the model */}
      <section className="fifa-section">
        <Mark no="07" label="Fitting" title="In the studio" />
        <div className="fifa-fullbleed">
          <img src={img("runway-8161.jpeg")} alt="Final fitting: front view" />
        </div>
        <div className="fifa-pair">
          <figure>
            <img src={img("runway-8123.jpeg")} alt="Final fitting: side view" />
          </figure>
          <figure>
            <img src={img("runway-8177.jpeg")} alt="Final fitting: back" />
          </figure>
        </div>
      </section>

      {/* CLOSE */}
      <div className="fifa-end">
        <span>End · 03 · FRAME × Salvation Army × Otis · mentorship · 2025–2026</span>
        <button className="fifa-end-close" onClick={onClose}>Back to all work</button>
      </div>
    </div>);

}

