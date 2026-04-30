import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, Shield, ArrowUpRight, Calendar, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';
import LeadForm from '../components/LeadForm';
import CalendlyEmbed from '../components/CalendlyEmbed';
import { testimonials } from '../data/testimonials';

const FreeAudit = () => {
  const [tab, setTab] = useState('form');
  return (
    <>
      <SEO title="Free strategy audit" description="Free 45-min call + 12-point website audit + live demo. Worth ₹10,000. 8 slots open this quarter." path="/free-audit" />

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 0 clamp(60px, 8vw, 100px)', position: 'relative', overflow: 'hidden' }}>
        <div className="gradient-mesh" style={{ opacity: 0.7 }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 60, alignItems: 'flex-start' }} className="audit">
            <div>
              <span className="t-eyebrow">Q2 2026 · 8 slots open</span>
              <h1 className="h-display" style={{ fontSize: 'clamp(2.8rem, 7.5vw, 6.4rem)', marginTop: 22, lineHeight: 0.94 }}>
                Three things, <br />
                <span className="serif-italic" style={{ color: 'var(--accent)' }}>absolutely free.</span>
              </h1>
              <p style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)', color: 'var(--text-soft)', maxWidth: 540, lineHeight: 1.55, marginTop: 28 }}>
                Before you commit a single rupee, we'll show you exactly what working with us looks like. Real value, on the house.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 36 }}>
                {[
                  { num: '01', title: 'Strategy consultation', body: '45-min call. We map your funnel, find leverage points, give you a written action plan.' },
                  { num: '02', title: 'Website audit report', body: '12-point teardown — speed, SEO, mobile UX, conversion blockers. In 48 hours.' },
                  { num: '03', title: 'Live demo walkthrough', body: 'Pick any sample build. We customize and walk you through it, live.' }
                ].map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 + 0.2 }}
                    className="card"
                    style={{ padding: 22, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 16, alignItems: 'flex-start' }}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: 'var(--r-pill)',
                      background: 'var(--ink)', color: 'var(--bg-pure)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: 13, fontFamily: 'var(--font-mono)'
                    }}>{c.num}</div>
                    <div>
                      <h3 className="h-display" style={{ fontSize: 17, marginBottom: 4 }}>{c.title}</h3>
                      <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.55 }}>{c.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Value bar */}
              <div style={{
                marginTop: 28,
                background: 'var(--ink)', color: 'var(--text-on-ink)',
                borderRadius: 'var(--r-lg)', padding: 24,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap'
              }}>
                <div>
                  <div className="t-eyebrow" style={{ color: 'var(--text-on-ink-soft)' }}>Total value</div>
                  <div className="h-display" style={{ fontSize: '1.8rem', color: 'var(--bg-pure)', marginTop: 4 }}>₹10,000</div>
                </div>
                <div style={{ width: 1, height: 36, background: 'var(--line-on-ink)' }} />
                <div>
                  <div className="t-eyebrow" style={{ color: 'var(--text-on-ink-soft)' }}>Your price</div>
                  <div className="h-display" style={{ fontSize: '1.8rem', color: 'var(--accent)', marginTop: 4 }}>FREE</div>
                </div>
              </div>

              <div style={{ marginTop: 28, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['No credit card', 'No obligation', 'No upsell'].map(t => (
                  <span key={t} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '6px 12px', borderRadius: 'var(--r-pill)',
                    background: 'var(--success-soft)', color: 'var(--success)',
                    fontSize: 12, fontWeight: 600
                  }}>
                    <Check size={12} strokeWidth={3} /> {t}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ position: 'sticky', top: 'calc(var(--header-h) + 24px)' }}>
              <motion.div
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                style={{
                  background: 'var(--bg-pure)', borderRadius: 'var(--r-xl)',
                  padding: 'clamp(28px, 4vw, 44px)', boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--line)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                  <Clock size={14} color="var(--accent)" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.08em', fontWeight: 600 }}>
                    8 SLOTS · NEXT INTAKE JULY 2026
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 4, padding: 4, background: 'var(--bg-soft)', borderRadius: 'var(--r-pill)', marginBottom: 22 }}>
                  {[
                    { id: 'form', label: 'Quick form', icon: MessageSquare },
                    { id: 'calendar', label: 'Pick a slot', icon: Calendar }
                  ].map(t => {
                    const Icon = t.icon;
                    const active = tab === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTab(t.id)}
                        style={{
                          flex: 1, height: 36, borderRadius: 'var(--r-pill)',
                          background: active ? 'var(--bg-pure)' : 'transparent',
                          color: active ? 'var(--ink)' : 'var(--text-soft)',
                          fontSize: 13, fontWeight: 600,
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                          boxShadow: active ? 'var(--shadow-sm)' : 'none',
                          transition: 'all 200ms var(--ease)'
                        }}
                      >
                        <Icon size={13} /> {t.label}
                      </button>
                    );
                  })}
                </div>

                {tab === 'form' ? <LeadForm /> : <CalendlyEmbed />}
                <div style={{ marginTop: 22, paddingTop: 18, borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-muted)' }}>
                  <Shield size={12} /> Your details stay between you and us.
                </div>
              </motion.div>
            </div>
          </div>
          <style>{`@media (max-width: 920px) { .audit { grid-template-columns: 1fr !important; gap: 32px !important; } }`}</style>
        </div>
      </section>

      {/* Why free */}
      <section className="section" style={{ background: 'var(--bg-soft)' }}>
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <span className="t-eyebrow" style={{ justifyContent: 'center' }}>Why free?</span>
          <h2 className="h-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', marginTop: 16, marginBottom: 22, lineHeight: 1 }}>
            Because most businesses already <span className="serif-italic" style={{ color: 'var(--accent)' }}>have what they need to grow.</span>
          </h2>
          <p style={{ color: 'var(--text-soft)', fontSize: 17, lineHeight: 1.7, maxWidth: 720, margin: '0 auto' }}>
            They just need the right systems and the right partner. This free session is our way of showing what's possible — with zero risk, zero pressure. <strong style={{ color: 'var(--ink)' }}>If we're a fit, great. If not, you walk away with valuable insights either way.</strong>
          </p>
        </div>
      </section>

      {/* Social proof */}
      <section className="section">
        <div className="container">
          <h2 className="h-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: 40, lineHeight: 1, maxWidth: 720 }}>
            What past clients say <br /><span className="serif-italic" style={{ color: 'var(--accent)' }}>after the free call.</span>
          </h2>
          <div className="grid grid-3">
            {testimonials.slice(0, 3).map((t, i) => (
              <div key={i} className="card" style={{ padding: 28 }}>
                <p className="h-display" style={{ fontSize: 17, fontWeight: 500, color: 'var(--text)', lineHeight: 1.45, marginBottom: 22, letterSpacing: '-0.015em' }}>
                  "{t.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 18, borderTop: '1px solid var(--line)' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--ink)', color: 'var(--bg-pure)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>
                    {t.initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.role}</div>
                  </div>
                  <span style={{
                    padding: '4px 10px', borderRadius: 'var(--r-pill)',
                    background: 'var(--accent-tint)', color: 'var(--accent)',
                    fontSize: 11, fontWeight: 700
                  }}>{t.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FreeAudit;
