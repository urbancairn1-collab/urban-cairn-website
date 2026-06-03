// Reusable FAQ block. The questions/answers passed here MUST also be passed to
// <SEO faqItems={...} /> on the same page so the visible content mirrors the
// FAQPage JSON-LD — Google requires the markup to match what users actually see.

const FaqSection = ({ eyebrow = 'FAQ', heading, accent, items }) => {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 820 }}>
        <span className="t-eyebrow">{eyebrow}</span>
        <h2 className="h-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', marginTop: 14, marginBottom: 32, lineHeight: 1.04 }}>
          {heading} {accent && <span className="serif-italic" style={{ color: 'var(--accent)' }}>{accent}</span>}
        </h2>
        <div style={{ display: 'grid', gap: 14 }}>
          {items.map((f) => (
            <div key={f.q} className="card" style={{ padding: '22px 26px' }}>
              <h3 className="h-display" style={{ fontSize: '1.1rem', marginBottom: 8 }}>{f.q}</h3>
              <p style={{ fontSize: 14.5, color: 'var(--text-soft)', lineHeight: 1.6 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
