import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import SEO from '../components/SEO';

const steps = [
  { n: '01', day: 'Day 1', title: 'Strategy call', desc: '45-min call. We map your goal, audience, current funnel, and the exact business outcome to ship. No tech jargon. No upsell.', deliverables: ['Goal & KPI mapping', 'Funnel teardown', 'Action plan'] },
  { n: '02', day: 'Day 2-3', title: 'Blueprint', desc: 'You receive a one-page blueprint: scope, stack, timeline, milestones, fixed price. You approve. We start.', deliverables: ['One-page blueprint', 'Fixed quote', 'Milestone schedule'] },
  { n: '03', day: 'Day 4-10', title: 'Build', desc: 'We execute. Progress updates every 48 hours. Live staging link the moment there\'s something to show.', deliverables: ['48-hr updates', 'Live staging', 'WhatsApp visibility'] },
  { n: '04', day: 'Day 11-13', title: 'Refine', desc: 'Cross-device QA, performance audit (Lighthouse 95+), security checks, your feedback round. We ship ready.', deliverables: ['Cross-device QA', 'Perf benchmarks', 'Feedback round'] },
  { n: '05', day: 'Day 14+', title: 'Launch', desc: 'Deploy, hand over all credentials, 30 days free post-launch support. Need ongoing changes? Retainer rates, never gouge.', deliverables: ['Production deploy', 'Credentials handover', '30 days support'] }
];

const Process = () => {
  return (
    <>
      <SEO title="Process · 14-Day delivery" description="From first call to live system in 5 precise steps. 14 days. Fixed price. Full ownership transferred." path="/process" />

      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div className="gradient-mesh" style={{ opacity: 0.4 }} />
        <div className="container" style={{ position: 'relative', maxWidth: 980 }}>
          <span className="t-eyebrow">How we work</span>
          <h1 className="h-display" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', marginTop: 24, lineHeight: 0.92 }}>
            First call to <br /><span className="serif-italic" style={{ color: 'var(--accent)' }}>live system.</span> 14 days.
          </h1>
          <p style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)', color: 'var(--text-soft)', maxWidth: 640, lineHeight: 1.55, marginTop: 28 }}>
            Five precise steps with clarity at every stage, no surprises, measurable results. We treat your project as a partnership — not a transaction.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 28 }}>
            {['On time', 'On budget', 'High quality', 'Long-term support'].map(t => (
              <span key={t} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '8px 14px', borderRadius: 'var(--r-pill)',
                background: 'var(--success-soft)', color: 'var(--success)',
                fontSize: 12, fontWeight: 600
              }}>
                <Check size={12} strokeWidth={3} /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {steps.map((s, i) => (
              <motion.article
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.06 }}
                style={{
                  background: i === steps.length - 1 ? 'var(--ink)' : 'var(--bg-pure)',
                  color: i === steps.length - 1 ? 'var(--text-on-ink)' : 'var(--text)',
                  borderRadius: 'var(--r-xl)',
                  padding: 'clamp(28px, 4vw, 56px)',
                  border: '1px solid ' + (i === steps.length - 1 ? 'transparent' : 'var(--line)'),
                  display: 'grid', gridTemplateColumns: 'auto 100px 1fr auto', gap: 28,
                  alignItems: 'center'
                }}
                className="proc-step"
              >
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: i === steps.length - 1 ? 'var(--accent)' : 'var(--bg-soft)',
                  color: i === steps.length - 1 ? 'white' : 'var(--ink)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700
                }}>{s.n}</div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 13,
                  color: i === steps.length - 1 ? 'var(--accent)' : 'var(--text-muted)',
                  letterSpacing: '0.06em'
                }}>{s.day}</div>
                <div>
                  <h3 className="h-display" style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)', marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: i === steps.length - 1 ? 'var(--text-on-ink-soft)' : 'var(--text-soft)', marginBottom: 16, maxWidth: 640 }}>{s.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {s.deliverables.map((d, j) => (
                      <span key={j} style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        padding: '5px 10px', borderRadius: 'var(--r-pill)',
                        background: i === steps.length - 1 ? 'rgba(255,255,255,0.06)' : 'var(--bg-soft)',
                        fontSize: 12, fontWeight: 500,
                        color: i === steps.length - 1 ? 'var(--text-on-ink-soft)' : 'var(--text-soft)'
                      }}>
                        <Check size={11} color="var(--accent)" strokeWidth={3} /> {d}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="hide-mobile" style={{ fontSize: 64, fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: i === steps.length - 1 ? 'rgba(255,90,31,0.4)' : 'var(--bg-tint)', lineHeight: 1 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
              </motion.article>
            ))}
          </div>

          <style>{`
            @media (max-width: 860px) {
              .proc-step { grid-template-columns: auto 1fr !important; gap: 16px !important; }
              .proc-step > :nth-child(2) { grid-column: 2 !important; }
              .proc-step > :nth-child(3) { grid-column: 1 / -1 !important; }
            }
          `}</style>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-soft)', textAlign: 'center' }}>
        <div className="container-narrow">
          <h2 className="h-display" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', lineHeight: 0.96, marginBottom: 24 }}>
            Day 1 starts <span className="serif-italic" style={{ color: 'var(--accent)' }}>whenever you book.</span>
          </h2>
          <p style={{ color: 'var(--text-soft)', maxWidth: 540, margin: '0 auto 32px', fontSize: 17 }}>
            The free 45-minute strategy call IS Day 1. By next week, you'll have a written blueprint and a fixed price.
          </p>
          <Link to="/free-audit" className="btn btn-accent btn-lg">Start Day 1 — free <ArrowUpRight size={18} /></Link>
        </div>
      </section>
    </>
  );
};

export default Process;
