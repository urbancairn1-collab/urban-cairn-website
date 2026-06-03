import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight, ArrowRight, HeartPulse, Landmark, CandlestickChart,
  GraduationCap, Factory, ShoppingBag, Building2, Truck, Rocket, Briefcase,
} from 'lucide-react';
import Reveal from './Reveal';
import { industries } from '../data/industries';

const ICONS = {
  HeartPulse, Landmark, CandlestickChart, GraduationCap, Factory,
  ShoppingBag, Building2, Truck, Rocket, Briefcase,
};

// Short, scannable descriptors for the home teaser (full copy lives on /industries).
const SHORT = {
  healthcare: 'Clinics · patient apps',
  finance: 'Fintech · dashboards',
  trading: 'Indicators · scanners',
  education: 'ERPs · LMS',
  manufacturing: 'ERP · inventory',
  retail: 'E-commerce · POS',
  'real-estate': 'CRMs · portals',
  logistics: 'Fleet · routing',
  startups: 'MVPs · SaaS',
  'professional-services': 'Portals · billing',
};

const IndustriesStrip = () => (
  <section className="section" style={{ background: 'var(--bg-soft)', position: 'relative', overflow: 'hidden' }}>
    {/* Faint ambient orb for depth, consistent with other light sections */}
    <div className="orb orb-a" style={{ width: 420, height: 420, top: '-12%', left: '-10%', background: 'radial-gradient(circle, rgba(10,102,255,0.14), transparent 70%)', opacity: 0.55 }} />
    <div className="container" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 48 }}>
        <Reveal>
          <div style={{ maxWidth: 640 }}>
            <span className="t-eyebrow">Who we build for</span>
            <h2 className="h-display" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)', marginTop: 16, lineHeight: 0.96 }}>
              Shaped around <br /><span className="serif-italic" style={{ color: 'var(--accent)' }}>your industry.</span>
            </h2>
          </div>
        </Reveal>
        <Link to="/industries" className="btn btn-secondary">All industries <ArrowUpRight size={16} /></Link>
      </div>

      <div className="ind-strip-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'clamp(12px, 1.2vw, 16px)' }}>
        {industries.map((ind, i) => {
          const Icon = ICONS[ind.icon] || Briefcase;
          return (
            <motion.div
              key={ind.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: (i % 5) * 0.05 }}
              style={{ minWidth: 0 }}
            >
              <Link to={`/for/${ind.slug}`} className="ind-strip-card">
                <span className="ind-strip-icon" style={{
                  background: `linear-gradient(135deg, hsl(${ind.hue}, 70%, 58%), hsl(${ind.hue + 18}, 75%, 42%))`,
                  boxShadow: `0 6px 16px hsla(${ind.hue}, 70%, 50%, 0.25), inset 0 -2px 4px rgba(0,0,0,0.12)`,
                }}>
                  <Icon size={18} strokeWidth={2} color="#fff" />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="ind-strip-name">{ind.name}</div>
                  <div className="ind-strip-tag">{SHORT[ind.slug] || ''}</div>
                </div>
                <ArrowRight className="ind-strip-arrow" size={15} />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>

    <style>{`
      .ind-strip-card {
        display: flex; align-items: center; gap: 12px;
        padding: 16px 14px;
        background: var(--bg-pure);
        border: 1px solid var(--line);
        border-radius: var(--r-md, 16px);
        height: 100%;
        transition: transform 240ms var(--ease), border-color 240ms ease, box-shadow 240ms ease;
      }
      .ind-strip-card:hover {
        transform: translateY(-3px);
        border-color: var(--accent);
        box-shadow: 0 14px 30px rgba(10,10,15,0.08);
      }
      .ind-strip-icon {
        width: 38px; height: 38px; flex-shrink: 0;
        border-radius: var(--r-sm, 10px);
        display: inline-flex; align-items: center; justify-content: center;
      }
      .ind-strip-name {
        font-size: 14.5px; font-weight: 700; color: var(--ink);
        letter-spacing: -0.01em; line-height: 1.2;
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .ind-strip-tag {
        font-size: 10px; font-family: var(--font-mono); color: var(--text-muted);
        letter-spacing: 0.04em; margin-top: 3px;
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .ind-strip-arrow {
        flex-shrink: 0; color: var(--text-muted);
        opacity: 0; transform: translateX(-4px);
        transition: opacity 240ms ease, transform 240ms ease, color 240ms ease;
      }
      .ind-strip-card:hover .ind-strip-arrow {
        opacity: 1; transform: translateX(0); color: var(--accent);
      }
      @media (max-width: 1024px) { .ind-strip-grid { grid-template-columns: repeat(3, 1fr) !important; } }
      @media (max-width: 768px)  { .ind-strip-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      @media (max-width: 560px)  { .ind-strip-grid { grid-template-columns: 1fr !important; } }
    `}</style>
  </section>
);

export default IndustriesStrip;
