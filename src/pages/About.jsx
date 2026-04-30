import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import Mark from '../components/Mark';
import TrustStrip from '../components/TrustStrip';
import { company } from '../data/company';

const About = () => {
  return (
    <>
      <SEO title="Studio" description="Urban Cairn is a studio for ambitious operators. Founded by Rahulkumar Dhobi in Anand, Gujarat. Udyam-registered MSME." />

      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0 clamp(60px, 8vw, 100px)', position: 'relative', overflow: 'hidden' }}>
        <div className="gradient-mesh" style={{ opacity: 0.5 }} />
        <div className="container" style={{ position: 'relative' }}>
          <span className="t-eyebrow">Studio</span>
          <h1 className="h-display" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', marginTop: 24, lineHeight: 0.92, maxWidth: '15ch' }}>
            We'd rather build <br /><span className="serif-italic" style={{ color: 'var(--accent)' }}>than wait.</span>
          </h1>
          <p style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.35rem)', color: 'var(--text-soft)', maxWidth: 640, lineHeight: 1.55, marginTop: 32, marginBottom: 32 }}>
            Urban Cairn is a small, opinionated software studio in Anand, Gujarat. We work with ambitious operators who want their tech to compound revenue — not consume it.
          </p>
          <TrustStrip />
        </div>
      </section>

      {/* Editorial — three columns of conviction */}
      <section className="section" style={{ background: 'var(--bg-pure)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 40 }} className="conv">
            {[
              { num: '01', title: 'No agency overhead.', body: 'No bloated middle layers. The person planning your project is the one shipping it. That\'s how we deliver in 14 days while agencies take 6 weeks.' },
              { num: '02', title: 'Strategy before code.', body: 'We ask "how does this make you money?" before "what stack should we use?". The first artifact you receive is a one-page blueprint with a fixed price.' },
              { num: '03', title: 'You own everything.', body: 'Code, hosting, design files, credentials — all transferred at delivery. No lock-in, no "premium plan to access your own data" nonsense.' }
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{ borderTop: '2px solid var(--ink)', paddingTop: 28 }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>{c.num}</span>
                <h3 className="h-display" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', marginTop: 14, marginBottom: 16, lineHeight: 1.05 }}>{c.title}</h3>
                <p style={{ color: 'var(--text-soft)', lineHeight: 1.65, fontSize: 15 }}>{c.body}</p>
              </motion.div>
            ))}
          </div>
          <style>{`@media (max-width: 920px) { .conv { grid-template-columns: 1fr !important; gap: 32px !important; } }`}</style>
        </div>
      </section>

      {/* MSME credibility */}
      <section className="section" style={{ background: 'var(--bg-soft)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 60, alignItems: 'center' }} className="msme">
            <div>
              <span className="t-eyebrow">Officially recognized</span>
              <h2 className="h-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)', marginTop: 16, marginBottom: 16, lineHeight: 1 }}>
                Udyam-registered <span className="serif-italic" style={{ color: 'var(--accent)' }}>MSME.</span>
              </h2>
              <p style={{ color: 'var(--text-soft)', fontSize: 16, lineHeight: 1.65, marginBottom: 24 }}>
                Recognized by the Ministry of MSME (Government of India). Verified business credentials, GST-compliant invoicing, and full legal accountability for every engagement.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {[
                  ['UDYAM', company.udyam],
                  ['Type', 'Micro · Services'],
                  ['Registered', company.registrationDate]
                ].map(([k, v]) => (
                  <span key={k} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '8px 14px', borderRadius: 'var(--r-pill)',
                    background: 'var(--bg-pure)', border: '1px solid var(--line)',
                    fontFamily: 'var(--font-mono)', fontSize: 12
                  }}>
                    <span style={{ color: 'var(--text-muted)' }}>{k}:</span>
                    <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{v}</span>
                  </span>
                ))}
              </div>
            </div>
            <div style={{
              background: 'var(--ink)', color: 'var(--text-on-ink)',
              borderRadius: 'var(--r-xl)', padding: 'clamp(28px, 4vw, 56px)',
              position: 'relative', overflow: 'hidden'
            }}>
              <div className="gradient-mesh-dark" style={{ opacity: 0.4 }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <ShieldCheck size={36} color="var(--accent)" />
                <h3 className="h-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'var(--text-on-ink)', margin: '20px 0 14px', lineHeight: 1.1 }}>
                  GST-compliant. <br />Invoiced through HDFC.
                </h3>
                <p style={{ color: 'var(--text-on-ink-soft)', fontSize: 15, lineHeight: 1.65, marginBottom: 24 }}>
                  Typically 40% advance, 40% at v1 staging, 20% at delivery. Larger projects split into smaller milestones. Government-eligible MSME for scheme benefits.
                </p>
                <Link to="/contact" className="btn btn-on-ink">
                  Verify with us <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>
          <style>{`@media (max-width: 920px) { .msme { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>

      {/* Founder note */}
      <section className="section" style={{ background: 'var(--bg-pure)' }}>
        <div className="container-narrow">
          <span className="t-eyebrow">From the founder</span>
          <h2 className="h-display" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', marginTop: 16, marginBottom: 36, lineHeight: 1.04 }}>
            A note from <span className="serif-italic" style={{ color: 'var(--accent)' }}>Rahul.</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, fontSize: 'clamp(1.05rem, 1.4vw, 1.2rem)', color: 'var(--text)', lineHeight: 1.7, fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400 }}>
            <p>I started Urban Cairn because I'd seen too many ambitious operators get burned — pay agency rates, wait six weeks, and end up with a Bootstrap template they didn't even own.</p>
            <p>The thing is, Indian businesses don't need bigger agencies. They need partners who think like operators — who ask "how does this make you more money?" before they touch a stack.</p>
            <p>So we built that. <span style={{ fontStyle: 'normal', fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--accent)' }}>MSME pricing. Custom code. Direct WhatsApp. 14-day delivery. 100% ownership transferred at the end.</span> No middlemen, no "discovery phase", no surprise invoices.</p>
            <p>If that sounds like the kind of partner you've been looking for — let's talk. The free strategy call is genuinely free. No upsell. Just clarity.</p>
          </div>

          <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'var(--ink)', color: 'var(--bg-pure)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 16
            }}>RD</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 17 }}>{company.founder}</div>
              <div style={{ fontSize: 14, color: 'var(--text-soft)' }}>Founder · Urban Cairn Tech Solution</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={11} /> Anand · Gujarat
              </div>
            </div>
            <Link to="/free-audit" className="btn btn-accent">Talk to me <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
