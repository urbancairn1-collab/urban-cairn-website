import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Layers, ShieldCheck, UserRound, Gauge } from 'lucide-react';
import Reveal from './Reveal';

// Honest, verifiable enterprise framing — a focused studio reframed as a strength.
// No fabricated client counts; every claim is about HOW we work, not invented scale.
const pillars = [
  {
    icon: Layers,
    title: 'Architecture that scales',
    desc: 'Built on modern, proven stacks — React, Node, Postgres — structured to grow from MVP to high-traffic load without a costly rewrite later.',
  },
  {
    icon: ShieldCheck,
    title: 'Security & full ownership',
    desc: 'Validated inputs, secure auth, no vendor lock-in. Your code, repos, and data are 100% yours from day one — handed over in full at launch.',
  },
  {
    icon: UserRound,
    title: 'Direct founder access',
    desc: 'No account managers, no handoffs. You talk to the engineer building your system — so decisions take minutes, not weeks of back-and-forth.',
  },
  {
    icon: Gauge,
    title: 'Accountable delivery',
    desc: 'Fixed scope, fixed price, updates every 48 hours, live staging from day one. A focused studio means nothing slips through the cracks.',
  },
];

const EnterpriseCredibility = () => (
  <section className="section" style={{ background: 'var(--bg-pure)', position: 'relative', overflow: 'hidden' }}>
    <div className="orb orb-b" style={{ width: 480, height: 480, bottom: '-18%', right: '-12%', background: 'radial-gradient(circle, rgba(255,90,31,0.14), transparent 70%)', opacity: 0.5 }} />
    <div className="container" style={{ position: 'relative' }}>
      <div className="ent-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 'clamp(40px, 5vw, 72px)', alignItems: 'start' }}>
        {/* Left: narrative */}
        <Reveal>
          <div>
            <span className="t-eyebrow">Built to scale with you</span>
            <h2 className="h-display" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', marginTop: 16, lineHeight: 0.96, marginBottom: 24 }}>
              Small studio. <br /><span className="serif-italic" style={{ color: 'var(--accent)' }}>Serious engineering.</span>
            </h2>
            <p style={{ color: 'var(--text-soft)', fontSize: 17, lineHeight: 1.6, marginBottom: 20, maxWidth: 420 }}>
              Bigger build? Good. We architect for scale from the first commit — not template hacks that buckle once real traffic and data show up.
            </p>
            <p style={{ color: 'var(--text-soft)', fontSize: 15, lineHeight: 1.6, marginBottom: 32, maxWidth: 420 }}>
              Being a focused studio is the advantage: you get senior, direct, accountable engineering — without the agency overhead, middlemen, or junior hand-me-downs.
            </p>
            <Link to="/process" className="btn btn-primary">How we deliver <ArrowUpRight size={16} /></Link>
          </div>
        </Reveal>

        {/* Right: pillar cards */}
        <div className="ent-cards" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(14px, 1.4vw, 18px)' }}>
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
                className="ent-card"
              >
                <span className="ent-icon"><Icon size={20} strokeWidth={1.9} /></span>
                <h3 className="h-display" style={{ fontSize: 'clamp(1.15rem, 1.5vw, 1.35rem)', margin: '16px 0 8px', color: 'var(--ink)' }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.55 }}>{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>

    <style>{`
      .ent-card {
        background: var(--bg-soft);
        border: 1px solid var(--line);
        border-radius: var(--r-lg);
        padding: clamp(20px, 2vw, 28px);
        transition: transform 240ms var(--ease), border-color 240ms ease, box-shadow 240ms ease;
      }
      .ent-card:hover {
        transform: translateY(-3px);
        border-color: var(--line-strong);
        box-shadow: 0 16px 36px rgba(10,10,15,0.07);
      }
      .ent-icon {
        width: 44px; height: 44px;
        border-radius: var(--r-sm, 12px);
        background: var(--accent-tint); color: var(--accent);
        display: inline-flex; align-items: center; justify-content: center;
      }
      @media (max-width: 920px) {
        .ent-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
      }
      @media (max-width: 480px) {
        .ent-cards { grid-template-columns: 1fr !important; }
      }
    `}</style>
  </section>
);

export default EnterpriseCredibility;
