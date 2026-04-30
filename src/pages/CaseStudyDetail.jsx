import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import SEO from '../components/SEO';
import { caseStudies } from '../data/caseStudies';

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const c = caseStudies.find(x => x.slug === slug);
  if (!c) return <Navigate to="/portfolio" replace />;

  const idx = caseStudies.findIndex(x => x.slug === slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <>
      <SEO title={`${c.industry} · ${c.headline}`} description={c.problem.slice(0, 160)} path={`/case-study/${slug}`} />

      <section style={{ padding: '40px 0 60px', position: 'relative' }}>
        <div className="container">
          <Link to="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-soft)', fontSize: 14, marginBottom: 36, fontWeight: 500 }}>
            <ArrowLeft size={14} /> All work
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '6px 14px', borderRadius: 'var(--r-pill)',
              background: `${c.color}28`, color: c.color,
              fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600,
              letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 24
            }}>{c.industry}</span>
            <h1 className="h-display" style={{ fontSize: 'clamp(2.4rem, 6.5vw, 5.6rem)', lineHeight: 0.96, marginBottom: 24, maxWidth: 18 + 'ch' }}>
              {c.headline}
            </h1>
            <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', fontSize: 14, color: 'var(--text-soft)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
              <span><span style={{ color: 'var(--text-muted)' }}>Timeline:</span> {c.timeline}</span>
              <span style={{ color: 'var(--text-muted)' }}>·</span>
              <span><span style={{ color: 'var(--text-muted)' }}>Stack:</span> {c.stack.join(' · ')}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero metrics */}
      <section style={{ paddingBottom: 'var(--section-y)' }}>
        <div className="container">
          <div className="grid grid-3">
            {c.metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                style={{
                  background: i === 0 ? 'var(--ink)' : 'var(--bg-pure)',
                  color: i === 0 ? 'var(--text-on-ink)' : 'var(--text)',
                  borderRadius: 'var(--r-xl)',
                  padding: 'clamp(28px, 4vw, 48px)',
                  border: i === 0 ? 'none' : '1px solid var(--line)'
                }}
              >
                <div className="h-display" style={{
                  fontSize: 'clamp(2.8rem, 6vw, 4.6rem)',
                  color: m.positive ? (i === 0 ? '#0FA958' : '#0FA958') : '#dc2626',
                  lineHeight: 1, marginBottom: 14
                }}>{m.value}</div>
                <div style={{ fontSize: 14, fontFamily: 'var(--font-mono)', color: i === 0 ? 'var(--text-on-ink-soft)' : 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {m.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section style={{ paddingBottom: 'var(--section-y)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="ps">
            <div className="card" style={{ padding: 'clamp(28px, 4vw, 44px)' }}>
              <div className="t-eyebrow" style={{ '--accent': '#dc2626' }}>The problem</div>
              <h3 className="h-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginTop: 16, marginBottom: 18 }}>What was broken</h3>
              <p style={{ color: 'var(--text-soft)', lineHeight: 1.7, fontSize: 16 }}>{c.problem}</p>
            </div>
            <div style={{
              background: 'var(--ink)', color: 'var(--text-on-ink)',
              borderRadius: 'var(--r-xl)', padding: 'clamp(28px, 4vw, 44px)'
            }}>
              <span className="t-eyebrow" style={{ color: 'var(--accent)' }}>The solution</span>
              <h3 className="h-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginTop: 16, marginBottom: 18, color: 'var(--text-on-ink)' }}>What we built</h3>
              <p style={{ color: 'var(--text-on-ink-soft)', lineHeight: 1.7, fontSize: 16, marginBottom: 24 }}>{c.solution}</p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {c.deliverables.map((d, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--text-on-ink-soft)' }}>
                    <Check size={14} color="var(--accent)" strokeWidth={3} /> {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <style>{`@media (max-width: 860px) { .ps { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>

      {/* Chart */}
      <section className="section" style={{ background: 'var(--bg-soft)' }}>
        <div className="container">
          <span className="t-eyebrow">Impact timeline</span>
          <h2 className="h-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginTop: 16, marginBottom: 32, lineHeight: 1 }}>
            Before vs. <span className="serif-italic" style={{ color: 'var(--accent)' }}>after.</span>
          </h2>
          <div className="card" style={{ padding: 'clamp(20px, 3vw, 36px)' }}>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={c.chartData}>
                <CartesianGrid stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="month" stroke="#8A8A95" style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }} />
                <YAxis stroke="#8A8A95" style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }} />
                <Tooltip contentStyle={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 8 }} />
                <Line type="monotone" dataKey="before" stroke="#BDBDC6" strokeWidth={2} name="Before" dot={false} />
                <Line type="monotone" dataKey="after" stroke="#FF5A1F" strokeWidth={3} name="After Urban Cairn" dot={{ fill: '#FF5A1F', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 24, fontSize: 13 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-soft)' }}>
                <span style={{ width: 16, height: 3, background: '#BDBDC6' }} /> Before
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--accent)', fontWeight: 600 }}>
                <span style={{ width: 16, height: 3, background: 'var(--accent)' }} /> After Urban Cairn
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container-narrow">
          <h2 className="h-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', marginBottom: 24, lineHeight: 0.98 }}>
            Want similar results <br /><span className="serif-italic" style={{ color: 'var(--accent)' }}>for your business?</span>
          </h2>
          <p style={{ color: 'var(--text-soft)', maxWidth: 540, margin: '0 auto 32px', fontSize: 17 }}>
            Book the free 45-min call. We'll show you what this looks like for your industry, customized.
          </p>
          <Link to="/free-audit" className="btn btn-accent btn-lg">Get my free demo <ArrowUpRight size={18} /></Link>

          <div style={{ marginTop: 80, paddingTop: 48, borderTop: '1px solid var(--line)' }}>
            <span className="t-eyebrow" style={{ justifyContent: 'center' }}>Next case →</span>
            <Link to={`/case-study/${next.slug}`} className="h-display serif-italic" style={{ display: 'inline-block', marginTop: 16, fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', color: 'var(--accent)' }}>
              {next.headline} <ArrowUpRight size={20} style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: 6 }} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudyDetail;
