import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Globe, Smartphone, Zap, Code, TrendingUp, Users,
  Database, Shield, Wrench, Target, Check, ArrowUpRight
} from 'lucide-react';
import SEO from '../components/SEO';
import { services, additionalCapabilities } from '../data/services';

const iconMap = { Globe, Smartphone, Zap, Code, TrendingUp, Users, Database, Shield, Wrench, Target };

const tints = ['var(--tint-coral)', 'var(--tint-blue)', 'var(--tint-mint)', 'var(--tint-lavender)', 'var(--tint-sand)', 'var(--tint-yellow)'];

const Services = () => {
  return (
    <>
      <SEO title="Capabilities" description="What we ship: high-converting websites, mobile apps, automation, custom software, trading dashboards, lead engines." />

      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0 clamp(60px, 8vw, 100px)', position: 'relative', overflow: 'hidden' }}>
        <div className="gradient-mesh" style={{ opacity: 0.45 }} />
        <div className="container" style={{ position: 'relative', maxWidth: 980 }}>
          <span className="t-eyebrow">What we ship</span>
          <h1 className="h-display" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', marginTop: 24, lineHeight: 0.92 }}>
            Six engines, <br /><span className="serif-italic" style={{ color: 'var(--accent)' }}>built to earn.</span>
          </h1>
          <p style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.35rem)', color: 'var(--text-soft)', maxWidth: 640, lineHeight: 1.55, marginTop: 28 }}>
            Pick what your business needs today. Combine when ready to scale. Every capability benchmarked against one question — does it make you more money?
          </p>
        </div>
      </section>

      {/* Services list — magazine spreads */}
      <section style={{ paddingBottom: 'var(--section-y)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {services.map((s, i) => {
            const Icon = iconMap[s.icon] || Globe;
            return (
              <motion.div
                key={s.id}
                id={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
                style={{
                  background: tints[i % tints.length],
                  borderRadius: 'var(--r-xl)',
                  padding: 'clamp(32px, 5vw, 64px)',
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr',
                  gap: 48,
                  alignItems: 'center',
                  position: 'relative', overflow: 'hidden'
                }}
                className="svc"
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: 'var(--r-md)',
                      background: 'var(--ink)', color: 'var(--bg-pure)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <Icon size={22} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-soft)', letterSpacing: '0.06em' }}>
                      {s.num} / {s.short}
                    </span>
                  </div>

                  <h2 className="h-display" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', marginBottom: 18, lineHeight: 1.02 }}>
                    {s.title}
                  </h2>
                  <p style={{ color: 'var(--text-soft)', fontSize: 16, lineHeight: 1.6, marginBottom: 28, maxWidth: 540 }}>
                    {s.desc}
                  </p>

                  <div style={{ marginBottom: 28 }}>
                    <div className="t-eyebrow" style={{ marginBottom: 12 }}>What you get</div>
                    <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }} className="svc-bens">
                      {s.benefits.map((b, j) => (
                        <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text)' }}>
                          <Check size={14} color="var(--accent)" strokeWidth={3} /> {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {s.features && (
                    <div style={{ marginBottom: 28 }}>
                      <div className="t-eyebrow" style={{ marginBottom: 12 }}>Key features</div>
                      <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }} className="svc-bens">
                        {s.features.map((f, j) => (
                          <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.4 }}>
                            <Check size={14} color="var(--accent)" strokeWidth={3} style={{ flexShrink: 0, marginTop: 3 }} /> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {s.miniProcess && (
                    <div style={{ marginBottom: 28 }}>
                      <div className="t-eyebrow" style={{ marginBottom: 12 }}>How we deliver</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                        {s.miniProcess.map((p, j) => (
                          <span key={j} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                            <span style={{
                              display: 'inline-flex', alignItems: 'center', gap: 7,
                              padding: '6px 12px', borderRadius: 'var(--r-pill)',
                              background: 'var(--bg-pure)', border: '1px solid var(--line)',
                              fontSize: 12.5, fontWeight: 500
                            }}>
                              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)' }}>{String(j + 1).padStart(2, '0')}</span>
                              {p}
                            </span>
                            {j < s.miniProcess.length - 1 && <span style={{ color: 'var(--text-faint)', fontSize: 12 }}>→</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    padding: '10px 16px', borderRadius: 'var(--r-pill)',
                    background: 'var(--ink)', color: 'var(--bg-pure)',
                    fontSize: 13, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em',
                    marginBottom: 24
                  }}>
                    <span style={{ color: 'var(--success)', fontWeight: 700 }}>Result →</span>
                    {s.result}
                  </div>

                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <Link to="/free-audit" className="btn btn-primary">Get a quote <ArrowUpRight size={16} /></Link>
                    <Link to="/portfolio" className="btn btn-ghost">See examples</Link>
                  </div>
                </div>

                <div className="hide-mobile">
                  <div style={{
                    background: 'var(--bg-pure)', borderRadius: 'var(--r-lg)',
                    padding: 28, boxShadow: 'var(--shadow-md)'
                  }}>
                    <div className="t-eyebrow" style={{ marginBottom: 16 }}>Use cases</div>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {s.useCases.map((u, j) => (
                        <li key={j} style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          padding: '14px 16px',
                          background: 'var(--bg-soft)', borderRadius: 'var(--r-md)',
                          fontSize: 14, fontWeight: 500
                        }}>
                          <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)' }} />
                          {u}
                        </li>
                      ))}
                    </ul>
                    <div style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid var(--line)' }}>
                      <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 6 }}>TYPICAL DELIVERY</div>
                      <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>7 - 14 days</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <style>{`
          @media (max-width: 920px) {
            .svc { grid-template-columns: 1fr !important; }
            .svc-bens { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* Additional capabilities */}
      <section className="section" style={{ background: 'var(--bg-soft)' }}>
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <span className="t-eyebrow">Also available</span>
            <h2 className="h-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginTop: 14, lineHeight: 1 }}>
              Complementary <span className="serif-italic" style={{ color: 'var(--accent)' }}>capabilities.</span>
            </h2>
          </div>
          <div className="grid grid-4">
            {additionalCapabilities.map((c, i) => {
              const Icon = iconMap[c.icon] || Database;
              return (
                <div key={i} className="card" style={{ padding: 28 }}>
                  <Icon size={24} color="var(--accent)" />
                  <h3 className="h-display" style={{ fontSize: '1.2rem', marginTop: 20, marginBottom: 8 }}>{c.title}</h3>
                  <p style={{ color: 'var(--text-soft)', fontSize: 14, lineHeight: 1.55 }}>{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section surface-ink" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="gradient-mesh-dark" style={{ opacity: 0.5 }} />
        <div className="container" style={{ position: 'relative' }}>
          <h2 className="h-display" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)', color: 'var(--text-on-ink)', maxWidth: 760, margin: '0 auto 24px', lineHeight: 0.98 }}>
            Not sure which engine? <br /><span className="serif-italic" style={{ color: 'var(--accent)' }}>That's what the call is for.</span>
          </h2>
          <Link to="/free-audit" className="btn btn-accent btn-lg">Book free strategy call <ArrowUpRight size={18} /></Link>
        </div>
      </section>
    </>
  );
};

export default Services;
