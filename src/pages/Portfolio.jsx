import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import { caseStudies } from '../data/caseStudies';
import { portfolio, portfolioCategories } from '../data/portfolio';
import Mock from '../components/mockups/Mock';

const BASE = import.meta.env.BASE_URL;

const categories = ['All', 'Trading Business', 'Real Estate Company', 'Multi-Speciality Clinic', 'E-Commerce Store', 'Education Institute'];

const Portfolio = () => {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? caseStudies : caseStudies.filter(c => c.industry === active);

  return (
    <>
      <SEO title="Work" description="Real demos. Real numbers. Trading dashboards, lead engines, automation systems — shipped end-to-end." path="/portfolio" />

      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div className="gradient-mesh" style={{ opacity: 0.4 }} />
        <div className="container" style={{ position: 'relative', maxWidth: 980 }}>
          <span className="t-eyebrow">Selected work</span>
          <h1 className="h-display" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', marginTop: 24, lineHeight: 0.92 }}>
            Receipts. <span className="serif-italic" style={{ color: 'var(--accent)' }}>Not slides.</span>
          </h1>
          <p style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)', color: 'var(--text-soft)', maxWidth: 640, lineHeight: 1.55, marginTop: 28 }}>
            Five live demonstrations we can walk you through on a 30-minute call — built end-to-end, ready to be customized.
          </p>
        </div>
      </section>

      <section style={{ paddingBottom: 32 }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                style={{
                  padding: '10px 18px', borderRadius: 'var(--r-pill)',
                  background: active === cat ? 'var(--ink)' : 'var(--bg-pure)',
                  color: active === cat ? 'var(--bg-pure)' : 'var(--text)',
                  border: '1px solid ' + (active === cat ? 'var(--ink)' : 'var(--line)'),
                  fontSize: 13, fontWeight: 500, transition: 'all 200ms var(--ease)'
                }}
              >{cat}</button>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: 'var(--section-y)' }}>
        <div className="container">
          <motion.div layout style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <AnimatePresence>
              {filtered.map((c, i) => {
                const big = i === 0;
                return (
                  <motion.div
                    key={c.slug}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                  >
                    <Link to={`/case-study/${c.slug}`} style={{ display: 'block' }}>
                      <article className="card-hover" style={{
                        background: big ? 'var(--ink)' : 'var(--bg-pure)',
                        color: big ? 'var(--text-on-ink)' : 'var(--text)',
                        borderRadius: 'var(--r-xl)',
                        padding: 'clamp(28px, 4vw, 56px)',
                        border: big ? 'none' : '1px solid var(--line)',
                        display: 'grid',
                        gridTemplateColumns: '1.4fr 1fr',
                        gap: 40,
                        alignItems: 'center',
                        transition: 'all 320ms var(--ease)'
                      }}
                      className="case-row"
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
                            <span style={{
                              padding: '5px 12px', borderRadius: 'var(--r-pill)',
                              background: `${c.color}28`, color: c.color,
                              fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
                              letterSpacing: '0.05em', textTransform: 'uppercase'
                            }}>{c.industry}</span>
                            <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: big ? 'var(--text-on-ink-soft)' : 'var(--text-muted)' }}>
                              SHIPPED IN {c.timeline.toUpperCase()}
                            </span>
                          </div>
                          <h2 className="h-display" style={{ fontSize: 'clamp(2rem, 4.4vw, 3.4rem)', marginBottom: 18, lineHeight: 1, color: big ? 'var(--text-on-ink)' : 'var(--text)' }}>
                            {c.headline}
                          </h2>
                          <p style={{ fontSize: 16, lineHeight: 1.6, color: big ? 'var(--text-on-ink-soft)' : 'var(--text-soft)', marginBottom: 24, maxWidth: 540 }}>
                            {c.problem}
                          </p>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--accent)', fontWeight: 600, fontSize: 14 }}>
                            Read full case <ArrowUpRight size={14} />
                          </span>
                        </div>

                        <div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {c.metrics.map((m, mi) => (
                              <div key={mi} style={{
                                padding: '18px 22px', borderRadius: 'var(--r-md)',
                                background: big ? 'rgba(255,255,255,0.06)' : 'var(--bg-soft)',
                                border: big ? '1px solid var(--line-on-ink)' : '1px solid var(--line)',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16
                              }}>
                                <div className="h-display" style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', color: m.positive ? '#0FA958' : '#dc2626' }}>
                                  {m.value}
                                </div>
                                <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: big ? 'var(--text-on-ink-soft)' : 'var(--text-muted)', letterSpacing: '0.04em', textAlign: 'right' }}>
                                  {m.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        <style>{`@media (max-width: 920px) { .case-row { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      <ProjectGallery />

      <section className="section" style={{ background: 'var(--bg-soft)', textAlign: 'center' }}>
        <div className="container">
          <p className="h-display serif-italic" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', color: 'var(--accent)', marginBottom: 14, fontWeight: 400 }}>
            ★ Demo projects that showcase capability.
          </p>
          <p style={{ color: 'var(--text-soft)', marginBottom: 32 }}>Imagine the lift for your business.</p>
          <Link to="/free-audit" className="btn btn-accent btn-lg">See one live for your industry <ArrowUpRight size={18} /></Link>
        </div>
      </section>
    </>
  );
};

/* ═══════════ PROJECT GALLERY — 12 buildable demos ═══════════ */
const ProjectGallery = () => {
  const [cat, setCat] = useState('All');
  const items = cat === 'All' ? portfolio : portfolio.filter(p => p.category === cat);

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div style={{ marginBottom: 36, maxWidth: 720 }}>
          <span className="t-eyebrow">Project gallery</span>
          <h2 className="h-display" style={{ fontSize: 'clamp(2rem, 4.4vw, 3.4rem)', marginTop: 14, lineHeight: 0.98 }}>
            Twelve systems, <span className="serif-italic" style={{ color: 'var(--accent)' }}>ready to build.</span>
          </h2>
          <p style={{ color: 'var(--text-soft)', fontSize: 16, lineHeight: 1.6, marginTop: 16 }}>
            Each is a real architecture we can tailor to your business — explore by category.
          </p>
        </div>

        {/* Filter */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 28 }}>
          {portfolioCategories.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              padding: '9px 16px', borderRadius: 'var(--r-pill)',
              background: cat === c ? 'var(--ink)' : 'var(--bg-pure)',
              color: cat === c ? 'var(--bg-pure)' : 'var(--text)',
              border: '1px solid ' + (cat === c ? 'var(--ink)' : 'var(--line)'),
              fontSize: 13, fontWeight: 500, transition: 'all 200ms var(--ease)'
            }}>{c}</button>
          ))}
        </div>

        <motion.div layout className="pf-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'clamp(16px, 1.6vw, 24px)' }}>
          <AnimatePresence mode="popLayout">
            {items.map((p, i) => (
              <motion.article
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.38, delay: (i % 2) * 0.05 }}
                className="card"
                style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                {/* Visual */}
                <div style={{ position: 'relative', padding: 22, background: 'var(--bg-soft)', borderBottom: '1px solid var(--line)' }}>
                  {p.image ? (
                    <img
                      src={`${BASE}${p.image}`}
                      alt={p.title}
                      loading="lazy"
                      width="640" height="360"
                      style={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', borderRadius: 'var(--r-md)', boxShadow: 'var(--shadow-md)' }}
                    />
                  ) : (
                    <Mock type={p.mock} />
                  )}
                  <span style={{
                    position: 'absolute', top: 14, right: 14,
                    padding: '5px 11px', borderRadius: 'var(--r-pill)',
                    background: 'var(--bg-pure)', border: '1px solid var(--line)',
                    fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600,
                    letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-soft)'
                  }}>{p.category}</span>
                </div>

                {/* Body */}
                <div style={{ padding: 'clamp(20px, 2.4vw, 28px)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
                    <h3 className="h-display" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.6rem)', lineHeight: 1.05 }}>{p.title}</h3>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--accent)', whiteSpace: 'nowrap' }}>{p.metric}</span>
                  </div>
                  <p style={{ color: 'var(--text-soft)', fontSize: 14.5, lineHeight: 1.55, marginBottom: 18 }}>{p.summary}</p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto' }}>
                    {p.stack.map((t, j) => (
                      <span key={j} style={{
                        padding: '4px 10px', borderRadius: 'var(--r-pill)',
                        background: 'var(--bg-soft)', border: '1px solid var(--line)',
                        fontSize: 11.5, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)'
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`@media (max-width: 760px) { .pf-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
};

export default Portfolio;
