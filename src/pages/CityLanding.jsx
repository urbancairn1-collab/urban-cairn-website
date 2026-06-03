import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import LeadForm from '../components/LeadForm';
import TrustStrip from '../components/TrustStrip';
import { getCity } from '../data/locations';
import { services } from '../data/services';

const CityLanding = () => {
  const { city: slug } = useParams();
  const city = getCity(slug);
  if (!city) return <Navigate to="/services" replace />;

  // "Deep" cities carry unique local content (areas, industry focus, FAQs).
  // Others fall back to the lightweight templated layout.
  const isDeep = Boolean(city.intro);

  return (
    <>
      <SEO
        title={city.metaTitle || `Web development & software studio in ${city.name}`}
        description={city.metaDesc || `Custom websites, WhatsApp automation, trading dashboards, and lead engines for ambitious operators in ${city.name}. Shipped in 14 days. India-based Udyam + GST registered MSME.`}
        path={`/in/${slug}`}
        keywords={`web development ${city.name.toLowerCase()}, website design ${city.name.toLowerCase()}, software developer ${city.name.toLowerCase()}, whatsapp automation ${city.name.toLowerCase()}, lead generation ${city.name.toLowerCase()}, custom software ${city.state.toLowerCase()}`}
        localityServed={city.name}
        geo={city.geo}
        faqItems={city.faqs}
      />

      <section style={{ padding: 'clamp(60px, 8vw, 120px) 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div className="gradient-mesh" style={{ opacity: 0.5 }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 56, alignItems: 'flex-start' }} className="cl">
            <div>
              <span className="t-eyebrow">
                <MapPin size={11} style={{ marginLeft: -3 }} /> {city.name} · {city.state}
              </span>
              <h1 className="h-display" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', marginTop: 22, lineHeight: 0.98 }}>
                Web development in <br /><span className="serif-italic" style={{ color: 'var(--accent)' }}>{city.name}.</span>
              </h1>
              <p style={{ fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)', color: 'var(--text-soft)', maxWidth: 560, lineHeight: 1.6, marginTop: 28, marginBottom: 24 }}>
                {isDeep
                  ? city.intro
                  : <>{city.name} is {city.context} We ship custom websites, automation, and dashboards in 14 days — at MSME pricing, with full code ownership transferred.</>}
              </p>

              <div style={{ marginBottom: 32 }}>
                <TrustStrip />
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 36 }}>
                <Link to="/free-audit" className="btn btn-accent btn-lg">Book free audit <ArrowUpRight size={18} /></Link>
                <Link to="/portfolio" className="btn btn-secondary btn-lg">See work</Link>
              </div>

              <div style={{
                padding: 24, borderRadius: 'var(--r-lg)',
                background: 'var(--bg-pure)', border: '1px solid var(--line)'
              }}>
                <div className="t-eyebrow" style={{ marginBottom: 12 }}>How we work with {city.name} clients</div>
                <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }} className="cl-bens">
                  {[
                    'Free 45-min strategy call (Zoom or in-person if local)',
                    'Fixed-price written quote in 48 hours',
                    'WhatsApp visibility every 48 hours during build',
                    '14-day delivery for most projects',
                    'GST invoice through Udyam-registered HDFC account',
                    '30 days free post-launch support'
                  ].map((b, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--text-soft)', lineHeight: 1.5 }}>
                      <Check size={13} color="var(--accent)" strokeWidth={3} style={{ flexShrink: 0, marginTop: 3 }} /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div style={{ position: 'sticky', top: 'calc(var(--header-h) + 24px)' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="card" style={{ padding: 'clamp(24px, 4vw, 36px)' }}
              >
                <div className="t-eyebrow" style={{ marginBottom: 16 }}>Get a quote · {city.name}</div>
                <LeadForm compact />
              </motion.div>
            </div>
          </div>
          <style>{`
            @media (max-width: 920px) { .cl { grid-template-columns: 1fr !important; } }
            @media (max-width: 540px) { .cl-bens { grid-template-columns: 1fr !important; } }
          `}</style>
        </div>
      </section>

      {/* Areas served — local relevance signal (deep cities only) */}
      {isDeep && Array.isArray(city.areas) && city.areas.length > 0 && (
        <section style={{ padding: '8px 0 0' }}>
          <div className="container">
            <div style={{ padding: '28px 0', borderTop: '1px solid var(--line)' }}>
              <div className="t-eyebrow" style={{ marginBottom: 14 }}>Areas we serve across {city.name}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {city.areas.map((a) => (
                  <span key={a} style={{
                    fontSize: 13, color: 'var(--text-soft)', padding: '6px 14px',
                    borderRadius: 'var(--r-pill)', border: '1px solid var(--line)', background: 'var(--bg-pure)'
                  }}>{a}</span>
                ))}
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 14, maxWidth: 620, lineHeight: 1.55 }}>
                We work with operators across {city.name} — delivery is remote with WhatsApp visibility, and in-person kickoffs are available for local projects.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Local industry focus (deep cities) — replaces the generic grid with city-specific depth */}
      {isDeep && Array.isArray(city.localFocus) && city.localFocus.length > 0 ? (
        <section className="section" style={{ background: 'var(--bg-soft)' }}>
          <div className="container">
            <div style={{ marginBottom: 40 }}>
              <span className="t-eyebrow">Built for {city.name}</span>
              <h2 className="h-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginTop: 14, lineHeight: 1 }}>
                What we build for <span className="serif-italic" style={{ color: 'var(--accent)' }}>{city.name}'s industries.</span>
              </h2>
            </div>
            <div className="grid grid-2">
              {city.localFocus.map((f) => (
                <div key={f.name} className="card" style={{ padding: 28 }}>
                  <h3 className="h-display" style={{ fontSize: '1.2rem', marginBottom: 8 }}>{f.name}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.55 }}>{f.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="section" style={{ background: 'var(--bg-soft)' }}>
          <div className="container">
            <div style={{ marginBottom: 40 }}>
              <span className="t-eyebrow">Capabilities</span>
              <h2 className="h-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginTop: 14, lineHeight: 1 }}>
                What we ship for <span className="serif-italic" style={{ color: 'var(--accent)' }}>{city.name} clients.</span>
              </h2>
            </div>
            <div className="grid grid-3">
              {services.slice(0, 6).map((s) => (
                <Link key={s.id} to={`/services#${s.id}`} className="card card-hover" style={{ padding: 28, display: 'block' }}>
                  <div className="t-eyebrow">{s.num}</div>
                  <h3 className="h-display" style={{ fontSize: '1.2rem', marginTop: 12, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.55 }}>{s.short}.</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Visible FAQs — must mirror the FAQPage JSON-LD emitted by <SEO> */}
      {isDeep && Array.isArray(city.faqs) && city.faqs.length > 0 && (
        <section className="section">
          <div className="container" style={{ maxWidth: 820 }}>
            <span className="t-eyebrow">FAQ · {city.name}</span>
            <h2 className="h-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', marginTop: 14, marginBottom: 32, lineHeight: 1.04 }}>
              Web development in {city.name}, <span className="serif-italic" style={{ color: 'var(--accent)' }}>answered.</span>
            </h2>
            <div style={{ display: 'grid', gap: 14 }}>
              {city.faqs.map((f) => (
                <div key={f.q} className="card" style={{ padding: '22px 26px' }}>
                  <h3 className="h-display" style={{ fontSize: '1.1rem', marginBottom: 8 }}>{f.q}</h3>
                  <p style={{ fontSize: 14.5, color: 'var(--text-soft)', lineHeight: 1.6 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section" style={{ background: 'var(--ink)', color: 'var(--text-on-ink)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="gradient-mesh-dark" style={{ opacity: 0.5 }} />
        <div className="container" style={{ position: 'relative' }}>
          <h2 className="h-display" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: 'var(--text-on-ink)', maxWidth: 720, marginInline: 'auto', marginBottom: 24, lineHeight: 0.98 }}>
            Building something in <span className="serif-italic" style={{ color: 'var(--accent)' }}>{city.name}?</span>
          </h2>
          <Link to="/free-audit" className="btn btn-accent btn-lg">Book the call <ArrowUpRight size={18} /></Link>
        </div>
      </section>
    </>
  );
};

export default CityLanding;
