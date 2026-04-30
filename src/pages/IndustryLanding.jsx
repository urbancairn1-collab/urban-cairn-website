import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, X } from 'lucide-react';
import SEO from '../components/SEO';
import LeadForm from '../components/LeadForm';
import { getIndustry } from '../data/locations';
import { caseStudies } from '../data/caseStudies';

const IndustryLanding = () => {
  const { industry: slug } = useParams();
  const ind = getIndustry(slug);
  if (!ind) return <Navigate to="/services" replace />;

  const caseStudy = caseStudies.find(c => c.slug === ind.sample);

  return (
    <>
      <SEO
        title={`Software & automation for ${ind.name.toLowerCase()}`}
        description={`Custom websites, lead engines, and automation built for ${ind.name.toLowerCase()} businesses in India. Average lift: ${ind.metric}. Shipped in 14 days.`}
        path={`/for/${slug}`}
        keywords={`${ind.name.toLowerCase()} website india, ${ind.name.toLowerCase()} automation, ${ind.name.toLowerCase()} lead generation, custom software ${ind.name.toLowerCase()}, ${ind.name.toLowerCase()} crm india`}
      />

      <section style={{ padding: 'clamp(60px, 8vw, 120px) 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div className="gradient-mesh" style={{ opacity: 0.5 }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 56, alignItems: 'flex-start' }} className="il">
            <div>
              <span className="t-eyebrow">Built for {ind.name.toLowerCase()}</span>
              <h1 className="h-display" style={{ fontSize: 'clamp(2.6rem, 7vw, 5.6rem)', marginTop: 22, lineHeight: 0.96 }}>
                Software for <br /><span className="serif-italic" style={{ color: 'var(--accent)' }}>{ind.name.toLowerCase()}</span> that earns.
              </h1>
              <p style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)', color: 'var(--text-soft)', maxWidth: 540, lineHeight: 1.6, marginTop: 28, marginBottom: 36 }}>
                {ind.solution}
              </p>

              <div style={{
                marginBottom: 36, padding: 24, borderRadius: 'var(--r-lg)',
                background: 'var(--bg-pure)', border: '1px solid var(--line)'
              }}>
                <div className="t-eyebrow" style={{ marginBottom: 16 }}>Common pains we fix</div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {ind.pains.map((p, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--text)', lineHeight: 1.55 }}>
                      <X size={14} color="#dc2626" strokeWidth={3} style={{ flexShrink: 0, marginTop: 3 }} /> {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{
                padding: 24, borderRadius: 'var(--r-lg)',
                background: 'var(--ink)', color: 'var(--text-on-ink)',
                marginBottom: 36
              }}>
                <div className="t-eyebrow" style={{ color: 'var(--accent)', marginBottom: 12 }}>Average impact</div>
                <div className="h-display" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', color: 'var(--accent)', lineHeight: 1, marginBottom: 8 }}>
                  {ind.metric}
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-on-ink-soft)' }}>
                  Across {ind.name.toLowerCase()} businesses we've shipped systems for.
                </p>
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link to="/free-audit" className="btn btn-accent btn-lg">Book free audit <ArrowUpRight size={18} /></Link>
                {caseStudy && <Link to={`/case-study/${caseStudy.slug}`} className="btn btn-secondary btn-lg">See live case</Link>}
              </div>
            </div>

            <div style={{ position: 'sticky', top: 'calc(var(--header-h) + 24px)' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="card" style={{ padding: 'clamp(24px, 4vw, 36px)' }}
              >
                <div className="t-eyebrow" style={{ marginBottom: 16 }}>Get a quote · {ind.name}</div>
                <LeadForm compact />
              </motion.div>
            </div>
          </div>
          <style>{`@media (max-width: 920px) { .il { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>

      {caseStudy && (
        <section className="section" style={{ background: 'var(--bg-soft)' }}>
          <div className="container">
            <span className="t-eyebrow">Live case</span>
            <Link to={`/case-study/${caseStudy.slug}`} className="card-hover" style={{ display: 'block', marginTop: 16 }}>
              <article style={{
                background: 'var(--bg-pure)', borderRadius: 'var(--r-xl)',
                padding: 'clamp(28px, 4vw, 56px)',
                border: '1px solid var(--line)',
                display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 40, alignItems: 'center'
              }} className="case-row">
                <div>
                  <h2 className="h-display" style={{ fontSize: 'clamp(2rem, 4.4vw, 3rem)', marginBottom: 18, lineHeight: 1.05 }}>
                    {caseStudy.headline}
                  </h2>
                  <p style={{ fontSize: 16, color: 'var(--text-soft)', lineHeight: 1.6, marginBottom: 24, maxWidth: 540 }}>{caseStudy.problem}</p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--accent)', fontWeight: 600, fontSize: 14 }}>
                    Read full case <ArrowUpRight size={14} />
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {caseStudy.metrics.map((m, i) => (
                    <div key={i} style={{
                      padding: 18, borderRadius: 'var(--r-md)', background: 'var(--bg-soft)',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12
                    }}>
                      <div className="h-display" style={{ fontSize: 'clamp(1.4rem, 2.4vw, 2rem)', color: m.positive ? '#0FA958' : '#dc2626' }}>{m.value}</div>
                      <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textAlign: 'right' }}>{m.label}</div>
                    </div>
                  ))}
                </div>
              </article>
            </Link>
            <style>{`@media (max-width: 760px) { .case-row { grid-template-columns: 1fr !important; } }`}</style>
          </div>
        </section>
      )}

      <section className="section" style={{ background: 'var(--ink)', color: 'var(--text-on-ink)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="gradient-mesh-dark" style={{ opacity: 0.5 }} />
        <div className="container" style={{ position: 'relative' }}>
          <h2 className="h-display" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: 'var(--text-on-ink)', maxWidth: 760, marginInline: 'auto', marginBottom: 24, lineHeight: 0.98 }}>
            Stop losing pipeline in <span className="serif-italic" style={{ color: 'var(--accent)' }}>{ind.name.toLowerCase()}.</span>
          </h2>
          <Link to="/free-audit" className="btn btn-accent btn-lg">Get my free audit <ArrowUpRight size={18} /></Link>
        </div>
      </section>
    </>
  );
};

export default IndustryLanding;
