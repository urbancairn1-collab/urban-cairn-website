import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight, HeartPulse, Landmark, CandlestickChart, GraduationCap,
  Factory, ShoppingBag, Building2, Truck, Rocket, Briefcase,
} from 'lucide-react';
import SEO from '../components/SEO';
import Reveal from '../components/Reveal';
import MagneticButton from '../components/MagneticButton';
import { industries } from '../data/industries';

const ICONS = {
  HeartPulse, Landmark, CandlestickChart, GraduationCap, Factory,
  ShoppingBag, Building2, Truck, Rocket, Briefcase,
};

const BASE = import.meta.env.BASE_URL;

const Industries = () => (
  <>
    <SEO
      title="Industries we build for"
      description="Software, apps, and automation for healthcare, finance, trading, education, manufacturing, retail, real estate, logistics, startups, and professional services."
      path="/industries"
    />

    {/* Header */}
    <section style={{ padding: 'clamp(80px, 10vw, 160px) 0 60px', position: 'relative', overflow: 'hidden' }}>
      <div className="gradient-mesh" style={{ opacity: 0.4 }} />
      <div className="container" style={{ position: 'relative', maxWidth: 980 }}>
        <span className="t-eyebrow">Industries</span>
        <h1 className="h-display" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', marginTop: 24, lineHeight: 0.92 }}>
          Built for <span className="serif-italic" style={{ color: 'var(--accent)' }}>your world.</span>
        </h1>
        <p style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)', color: 'var(--text-soft)', maxWidth: 640, lineHeight: 1.55, marginTop: 28 }}>
          We don't do generic. Every system is shaped around how your industry actually runs — its workflows, compliance, and the metrics that move your business.
        </p>
      </div>
    </section>

    {/* Grid */}
    <section style={{ paddingBottom: 'var(--section-y)' }}>
      <div className="container">
        <div className="ind-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(16px, 1.5vw, 24px)' }}>
          {industries.map((ind, i) => {
            const Icon = ICONS[ind.icon] || Briefcase;
            return (
              <motion.div
                key={ind.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
              >
                <Link
                  to={`/for/${ind.slug}`}
                  className="card card-hover ind-card"
                  style={{ display: 'block', overflow: 'hidden', height: '100%' }}
                >
                  {/* Photo */}
                  <div style={{ position: 'relative', aspectRatio: '16 / 10', overflow: 'hidden' }}>
                    <img
                      src={`${BASE}${ind.image}`}
                      alt={ind.name}
                      loading="lazy"
                      width="640" height="400"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 40%, rgba(10,10,15,0.55))` }} />
                    <span style={{
                      position: 'absolute', top: 14, left: 14,
                      width: 38, height: 38, borderRadius: 'var(--r-sm)',
                      background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)',
                    }}>
                      <Icon size={19} strokeWidth={1.9} />
                    </span>
                    <span style={{
                      position: 'absolute', bottom: 12, left: 16, right: 16,
                      color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 700,
                      fontSize: 'clamp(1.15rem, 1.6vw, 1.4rem)', letterSpacing: '-0.02em',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}>
                      {ind.name}
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                  {/* Body */}
                  <div style={{ padding: '18px 20px 22px' }}>
                    <p style={{ fontSize: 14.5, lineHeight: 1.55, color: 'var(--text-soft)' }}>{ind.desc}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 920px) { .ind-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { .ind-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>

    {/* CTA */}
    <section className="section" style={{ background: 'var(--bg-soft)', textAlign: 'center' }}>
      <div className="container-narrow">
        <Reveal>
          <h2 className="h-display" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', lineHeight: 0.96, marginBottom: 24 }}>
            Don't see your industry? <span className="serif-italic" style={{ color: 'var(--accent)' }}>We've probably built it.</span>
          </h2>
          <p style={{ color: 'var(--text-soft)', maxWidth: 540, margin: '0 auto 32px', fontSize: 17 }}>
            If your business runs on workflows, we can systemise them. Tell us what you do — we'll show you what's possible.
          </p>
          <MagneticButton>
            <Link to="/free-audit" className="btn btn-accent btn-lg">Book a free strategy call <ArrowUpRight size={18} /></Link>
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  </>
);

export default Industries;
