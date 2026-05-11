import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import SEO from '../components/SEO';
import MagneticButton from '../components/MagneticButton';

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

      <ProcessTimeline />
      <section className="section">
        <div className="container">
          <p style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.08em', textAlign: 'center' }}>
            ↑ five steps · 14 days · fixed price · zero scope creep ↑
          </p>
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
          <MagneticButton>
            <Link to="/free-audit" className="btn btn-accent btn-lg">Start Day 1 — free <ArrowUpRight size={18} /></Link>
          </MagneticButton>
        </div>
      </section>
    </>
  );
};

/* Scroll-driven animated timeline — vertical line fills as user scrolls past */
const ProcessTimeline = () => {
  const wrapRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start 70%', 'end 90%']
  });
  const lineFill = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.3 });
  const lineHeight = useTransform(lineFill, [0, 1], ['0%', '100%']);

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container" ref={wrapRef} style={{ position: 'relative', maxWidth: 1080 }}>
        {/* Spine */}
        <div className="timeline-spine">
          <div className="timeline-spine-track" />
          <motion.div className="timeline-spine-fill" style={{ height: lineHeight }} />
        </div>

        {steps.map((s, i) => (
          <TimelineStep key={s.n} step={s} index={i} last={i === steps.length - 1} progress={scrollYProgress} count={steps.length} />
        ))}

        <style>{`
          .timeline-spine {
            position: absolute;
            top: 0; bottom: 0;
            left: 36px;
            width: 2px;
          }
          .timeline-spine-track {
            position: absolute; inset: 0;
            background: var(--line);
            border-radius: 2px;
          }
          .timeline-spine-fill {
            position: absolute; top: 0; left: 0; right: 0;
            background: linear-gradient(180deg, #FF5A1F 0%, #FF8A4C 60%, #FFD27D 100%);
            border-radius: 2px;
            box-shadow: 0 0 14px rgba(255,90,31,0.45);
          }
          .timeline-step-row {
            display: grid;
            grid-template-columns: 76px 1fr;
            gap: 24px;
            padding: 36px 0;
            position: relative;
          }
          .timeline-step-row:first-child { padding-top: 12px; }
          .timeline-step-row:last-child { padding-bottom: 12px; }
          @media (max-width: 720px) {
            .timeline-step-row { grid-template-columns: 56px 1fr; gap: 16px; }
            .timeline-spine { left: 27px; }
          }
        `}</style>
      </div>
    </section>
  );
};

const TimelineStep = ({ step: s, index: i, last, progress, count }) => {
  // Dot becomes "active" when scroll passes its position
  const myStart = i / count;
  const dotScale = useTransform(progress, [myStart - 0.05, myStart + 0.05], [0.9, 1.05]);
  const dotGlow = useTransform(progress, [myStart - 0.05, myStart + 0.05], [0, 1]);

  return (
    <motion.div
      className="timeline-step-row"
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
      transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
    >
      {/* Step dot — sits on the spine */}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-start' }}>
        <motion.div
          style={{
            scale: dotScale,
            width: 72, height: 72, borderRadius: '50%',
            background: last ? 'var(--accent)' : 'var(--bg-pure)',
            color: last ? 'white' : 'var(--ink)',
            border: '2px solid ' + (last ? 'var(--accent)' : 'var(--line)'),
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700,
            position: 'relative', zIndex: 2
          }}
        >
          {s.n}
          {/* Active-state glow */}
          <motion.div
            aria-hidden="true"
            style={{
              opacity: dotGlow,
              position: 'absolute', inset: -8,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,90,31,0.35), transparent 70%)',
              pointerEvents: 'none'
            }}
          />
        </motion.div>
      </div>

      {/* Card */}
      <div style={{
        background: last ? 'var(--ink)' : 'var(--bg-pure)',
        color: last ? 'var(--text-on-ink)' : 'var(--text)',
        borderRadius: 'var(--r-xl)',
        padding: 'clamp(24px, 3vw, 40px)',
        border: '1px solid ' + (last ? 'transparent' : 'var(--line)'),
        boxShadow: last ? '0 24px 60px rgba(10,10,15,0.20)' : 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 11,
            color: last ? 'var(--accent)' : 'var(--text-muted)',
            letterSpacing: '0.08em', fontWeight: 600, textTransform: 'uppercase'
          }}>{s.day}</span>
          <span style={{ flex: 1, height: 1, background: last ? 'rgba(255,255,255,0.08)' : 'var(--line)' }} />
        </div>
        <h3 className="h-display" style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', marginBottom: 10, lineHeight: 1.05 }}>
          {s.title}
        </h3>
        <p style={{ fontSize: 15.5, lineHeight: 1.65, color: last ? 'var(--text-on-ink-soft)' : 'var(--text-soft)', marginBottom: 18, maxWidth: 680 }}>
          {s.desc}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {s.deliverables.map((d, j) => (
            <span key={j} style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '5px 11px', borderRadius: 'var(--r-pill)',
              background: last ? 'rgba(255,255,255,0.06)' : 'var(--bg-soft)',
              fontSize: 12, fontWeight: 500,
              color: last ? 'var(--text-on-ink-soft)' : 'var(--text-soft)'
            }}>
              <Check size={11} color="var(--accent)" strokeWidth={3} /> {d}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Process;
