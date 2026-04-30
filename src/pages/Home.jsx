import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Plus, Minus } from 'lucide-react';
import SEO from '../components/SEO';
import Mark from '../components/Mark';
import Counter from '../components/Counter';
import TrustStrip from '../components/TrustStrip';
import ROICalculator from '../components/ROICalculator';
import { useABTest } from '../hooks/useABTest';
import { Laptop, Phone, BrowserCard } from '../components/DeviceMockup';
import { services } from '../data/services';
import { caseStudies } from '../data/caseStudies';
import { testimonials } from '../data/testimonials';
import { faqs } from '../data/faq';

const Home = () => {
  return (
    <>
      <SEO
        title="A studio for ambitious operators"
        description="Urban Cairn builds the systems that turn ideas into revenue. Custom websites, automation, dashboards. Shipped in 14 days. Anand, Gujarat."
      />
      <Hero />
      <LogoTicker />
      <ProductReveal />
      <BentoCapabilities />
      <BigStats />
      <CaseStudiesScroll />
      <ROISection />
      <Testimonials />
      <ProcessCompact />
      <PricingTeaser />
      <FAQSection />
      <FinalCTA />
    </>
  );
};

/* ═══════════ HERO ═══════════ */
const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const { variant: ctaVariant, track } = useABTest('hero_cta', ['audit', 'quote', 'demo']);
  const ctaCopy = {
    audit: 'Start with a free audit',
    quote: 'Get a quote in 48 hours',
    demo: 'See a live demo'
  }[ctaVariant];

  const [phrase, setPhrase] = useState(0);
  const phrases = ['ships outcomes', 'pays for itself', 'closes leads', 'compounds revenue'];
  useEffect(() => {
    const t = setInterval(() => setPhrase(p => (p + 1) % phrases.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} style={{ position: 'relative', minHeight: 'calc(100vh - var(--header-h))', display: 'flex', alignItems: 'center', overflow: 'hidden', padding: '60px 0 80px' }}>
      <div className="gradient-mesh" style={{ opacity: 0.7 }} />
      <div className="noise" />

      <motion.div className="container" style={{ position: 'relative', zIndex: 1, opacity, y }}>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="t-eyebrow">A studio for ambitious operators</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="h-display"
          style={{
            fontSize: 'clamp(3.2rem, 9.5vw, 9.5rem)',
            lineHeight: 0.92, marginTop: 22, marginBottom: 28,
            maxWidth: '12ch'
          }}
        >
          Software that <br />
          <span style={{ display: 'inline-flex', height: '1.05em', overflow: 'hidden', verticalAlign: 'top', position: 'relative' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={phrase}
                initial={{ y: '105%' }} animate={{ y: 0 }} exit={{ y: '-105%' }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="serif-italic"
                style={{ color: 'var(--accent)', display: 'inline-block', whiteSpace: 'nowrap' }}
              >
                {phrases[phrase]}.
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.35rem)', color: 'var(--text-soft)', maxWidth: 580, lineHeight: 1.55, marginBottom: 36 }}
        >
          Custom-built websites, automation, and dashboards for the operators who'd rather build than wait. Shipped in 14 days. Priced for the real world.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.28 }}
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 40 }}
        >
          <Link
            to="/free-audit"
            className="btn btn-accent btn-lg"
            onClick={() => track('hero_cta_click')}
          >
            {ctaCopy} <ArrowUpRight size={18} />
          </Link>
          <Link to="/portfolio" className="btn btn-secondary btn-lg">
            See the work
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}>
          <TrustStrip />
        </motion.div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: -10, right: 'var(--pad-x)',
          fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)',
          letterSpacing: '0.12em', textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: 10
        }} className="hide-mobile">
          <span>Scroll to explore</span>
          <motion.span
            animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
            style={{ width: 1, height: 36, background: 'var(--text-muted)', display: 'inline-block' }}
          />
        </div>
      </motion.div>
    </section>
  );
};

/* ═══════════ LOGO TICKER ═══════════ */
const LogoTicker = () => {
  const items = ['PATEL REALTY', 'AAROGYA CLINIC', 'KARAN CAPITAL', 'TRENDORA', 'VIDYA INSTITUTE', 'NIVAAN WELLNESS', 'SHAH FINTECH', 'GREEN GROW'];
  return (
    <section style={{ padding: '48px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="container" style={{ marginBottom: 24 }}>
        <span className="t-eyebrow">Trusted by ambitious operators · India · Global</span>
      </div>
      <div className="ticker-mask">
        <div className="ticker">
          {[...items, ...items, ...items].map((b, i) => (
            <span key={i} className="h-display" style={{ fontSize: 'clamp(1.4rem, 2.4vw, 2rem)', color: 'var(--text-faint)', letterSpacing: '-0.02em' }}>
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════ PRODUCT REVEAL — sticky scroll ═══════════ */
const ProductReveal = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const slides = [
    { title: 'High-converting websites', body: 'Funnels that turn visitors into pipeline. Engineered around your customer journey, not template aesthetics.', tint: 'var(--tint-coral)' },
    { title: 'WhatsApp automation', body: 'Your fastest sales rep. Available 24/7. Books calls, sends payment links, never on leave.', tint: 'var(--tint-mint)' },
    { title: 'Trading dashboards', body: 'Live data, instant decisions. P&L tracking, signal scanners, backtest engines — your edge, not noise.', tint: 'var(--tint-blue)' },
    { title: 'Lead engines', body: 'Capture, qualify, route — automated. Set up once, runs forever, scales without hiring.', tint: 'var(--tint-yellow)' }
  ];
  const idx = useTransform(scrollYProgress, v => Math.min(slides.length - 1, Math.floor(v * slides.length)));

  return (
    <section ref={ref} style={{ position: 'relative', height: `${slides.length * 100}vh` }}>
      <div style={{
        position: 'sticky', top: 'var(--header-h)',
        height: 'calc(100vh - var(--header-h))',
        display: 'flex', alignItems: 'center'
      }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 60, alignItems: 'center', width: '100%' }}>
          <div>
            <span className="t-eyebrow">What we build</span>
            <h2 className="h-display" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)', marginTop: 16, marginBottom: 24, lineHeight: 0.96 }}>
              Six engines. <br /><span className="serif-italic" style={{ color: 'var(--accent)' }}>One outcome.</span>
            </h2>
            <RevealText slides={slides} idx={idx} />
            <div style={{ marginTop: 32 }}>
              <Link to="/services" className="btn btn-primary">All capabilities <ArrowRight size={16} /></Link>
            </div>
          </div>
          <RevealVisual idx={idx} slides={slides} />
        </div>
      </div>
    </section>
  );
};

const RevealText = ({ slides, idx }) => {
  const [v, setV] = useState(0);
  useEffect(() => idx.on('change', setV), [idx]);
  return (
    <>
      <div style={{ display: 'flex', gap: 6, marginBottom: 22 }}>
        {slides.map((_, i) => (
          <div key={i} style={{
            width: i === v ? 28 : 6, height: 6, borderRadius: 6,
            background: i === v ? 'var(--accent)' : 'var(--line-strong)',
            transition: 'all 380ms var(--ease)'
          }} />
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={v}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="h-display" style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', marginBottom: 12 }}>
            {slides[v].title}
          </h3>
          <p style={{ color: 'var(--text-soft)', fontSize: 17, lineHeight: 1.55, maxWidth: 460 }}>{slides[v].body}</p>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

const RevealVisual = ({ idx, slides }) => {
  const [v, setV] = useState(0);
  useEffect(() => idx.on('change', setV), [idx]);
  return (
    <div style={{ position: 'relative', height: 480, display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="hide-mobile">
      <motion.div
        animate={{ background: slides[v].tint }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'absolute', inset: 0,
          borderRadius: 'var(--r-xl)',
          background: slides[v].tint
        }}
      />
      <AnimatePresence mode="wait">
        <motion.div key={v}
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -16 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          style={{ position: 'relative', zIndex: 1, padding: 48, width: '100%', maxWidth: 560 }}
        >
          {v === 0 && <Laptop label="patelrealty.in"><WebsiteScene /></Laptop>}
          {v === 1 && <Phone><WhatsAppScene /></Phone>}
          {v === 2 && <Laptop label="trading.dashboard"><TradingScene /></Laptop>}
          {v === 3 && <BrowserCard label="leads.dashboard"><LeadsScene /></BrowserCard>}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* Mockup scenes (real-feeling content) */
const WebsiteScene = () => (
  <div style={{ padding: 16, height: '100%', background: 'linear-gradient(180deg, #FAFAFA, #F2F2F4)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
      <div style={{ width: 80, height: 12, background: 'var(--ink)', borderRadius: 4 }} />
      <div style={{ display: 'flex', gap: 6 }}>
        {[1,2,3].map(i => <div key={i} style={{ width: 30, height: 6, background: 'var(--text-muted)', borderRadius: 4, opacity: 0.4 }} />)}
        <div style={{ width: 56, height: 18, background: 'var(--accent)', borderRadius: 999 }} />
      </div>
    </div>
    <div style={{ height: 18, background: 'var(--ink)', borderRadius: 6, marginBottom: 6, width: '70%' }} />
    <div style={{ height: 18, background: 'var(--ink)', borderRadius: 6, marginBottom: 12, width: '50%' }} />
    <div style={{ height: 8, background: 'var(--text-muted)', opacity: 0.3, borderRadius: 4, marginBottom: 6 }} />
    <div style={{ height: 8, background: 'var(--text-muted)', opacity: 0.3, borderRadius: 4, marginBottom: 14, width: '85%' }} />
    <div style={{ height: 26, background: 'var(--accent)', borderRadius: 999, width: 110, marginBottom: 14 }} />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
      {[1,2,3].map(i => <div key={i} style={{ aspectRatio: '4/3', background: 'var(--bg-tint)', borderRadius: 6 }} />)}
    </div>
  </div>
);

const WhatsAppScene = () => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
    <div style={{ paddingTop: 38, paddingBottom: 12, paddingLeft: 16, paddingRight: 16, background: '#0FAB6F', color: '#fff' }}>
      <div style={{ fontSize: 11, fontWeight: 600 }}>Urban Cairn Bot</div>
      <div style={{ fontSize: 9, opacity: 0.8 }}>online · 0.8s avg</div>
    </div>
    <div style={{ flex: 1, padding: 12, display: 'flex', flexDirection: 'column', gap: 8, background: '#ECE5DD' }}>
      {[
        { from: 'u', t: 'Interested in a demo' },
        { from: 'b', t: 'Welcome 👋 What\'s your business size?' },
        { from: 'u', t: '10-20 staff' },
        { from: 'b', t: 'Booking a free call for tomorrow 4 PM ✓' }
      ].map((m, i) => (
        <div key={i} style={{
          alignSelf: m.from === 'u' ? 'flex-end' : 'flex-start',
          background: m.from === 'u' ? '#DCF8C6' : '#fff',
          padding: '6px 10px', borderRadius: 8, fontSize: 9, color: '#0A0A0F', maxWidth: '78%'
        }}>{m.t}</div>
      ))}
    </div>
  </div>
);

const TradingScene = () => (
  <div style={{ padding: 14, height: '100%', background: '#0A0A0F', color: '#fff' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
      <div style={{ padding: 10, background: 'rgba(15,169,88,0.12)', borderRadius: 6, border: '1px solid rgba(15,169,88,0.2)' }}>
        <div style={{ fontSize: 8, fontFamily: 'var(--font-mono)', color: '#0FA958', letterSpacing: '0.1em' }}>P&L TODAY</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#0FA958' }}>+₹24,580</div>
      </div>
      <div style={{ padding: 10, background: 'rgba(255,90,31,0.12)', borderRadius: 6, border: '1px solid rgba(255,90,31,0.2)' }}>
        <div style={{ fontSize: 8, fontFamily: 'var(--font-mono)', color: 'var(--accent)', letterSpacing: '0.1em' }}>WIN RATE</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent)' }}>68.4%</div>
      </div>
    </div>
    <div style={{ height: 100, background: 'rgba(255,255,255,0.04)', borderRadius: 6, padding: 8 }}>
      <svg viewBox="0 0 300 80" style={{ width: '100%', height: '100%' }}>
        <polyline points="0,70 30,62 60,66 90,48 120,52 150,38 180,42 210,28 240,22 270,12 300,6"
          stroke="#0FA958" strokeWidth="1.6" fill="none" />
        <polyline points="0,80 0,70 30,62 60,66 90,48 120,52 150,38 180,42 210,28 240,22 270,12 300,6 300,80"
          fill="rgba(15,169,88,0.12)" />
      </svg>
    </div>
  </div>
);

const LeadsScene = () => (
  <div>
    <div className="t-eyebrow" style={{ marginBottom: 14 }}>Last 30 days</div>
    {[
      { l: 'Visits', v: '12,840', w: '100%', c: 'var(--ink)' },
      { l: 'Forms', v: '2,156', w: '70%', c: 'var(--accent)' },
      { l: 'Qualified', v: '1,184', w: '50%', c: 'var(--accent)' },
      { l: 'Calls', v: '487', w: '32%', c: 'var(--accent)' },
      { l: 'Deals', v: '142', w: '18%', c: 'var(--success)' }
    ].map((r, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{ width: 70, fontSize: 11, color: 'var(--text-soft)', fontWeight: 500 }}>{r.l}</div>
        <div style={{ flex: 1, height: 22, background: 'var(--bg-soft)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ width: r.w, height: '100%', background: r.c, borderRadius: 4 }} />
        </div>
        <div style={{ width: 56, fontSize: 11, fontWeight: 700, textAlign: 'right' }}>{r.v}</div>
      </div>
    ))}
  </div>
);

/* ═══════════ BENTO CAPABILITIES ═══════════ */
const BentoCapabilities = () => (
  <section className="section" style={{ background: 'var(--bg-pure)' }}>
    <div className="container">
      <div style={{ marginBottom: 60, maxWidth: 720 }}>
        <span className="t-eyebrow">Capabilities</span>
        <h2 className="h-display" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)', marginTop: 16, lineHeight: 0.96 }}>
          What we build, <br /><span className="serif-italic" style={{ color: 'var(--accent)' }}>and what it earns you.</span>
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gridAutoRows: 'minmax(220px, auto)',
        gap: 16
      }} className="bento">
        <BentoCard span="3 / span 3" rows="2"
          title="High-converting websites"
          tag="01"
          desc="Funnels that turn visitors into pipeline."
          tint="var(--tint-coral)"
          link="/services#websites"
          visual={<MiniWebsite />}
        />
        <BentoCard span="span 2"
          title="Mobile apps"
          tag="02"
          desc="Native, retention-engineered."
          tint="var(--tint-blue)"
          link="/services#apps"
          visual={<MiniPhone />}
        />
        <BentoCard span="span 2"
          title="Lead engines"
          tag="06"
          desc="Capture, qualify, route — automated."
          tint="var(--tint-yellow)"
          link="/services#leadgen"
          visual={<MiniFunnel />}
        />
        <BentoCard span="span 4" rows="1"
          title="Custom software"
          tag="04"
          desc="ERPs, CRMs, internal tools — built around how you actually operate."
          tint="var(--tint-lavender)"
          link="/services#software"
          visual={<MiniDashboard />}
        />
        <BentoCard span="span 3"
          title="WhatsApp automation"
          tag="03"
          desc="24/7 sales rep, never on leave."
          tint="var(--tint-mint)"
          link="/whatsapp-automation"
          visual={<MiniChat />}
        />
        <BentoCard span="span 3"
          title="Trading dashboards"
          tag="05"
          desc="Live data, instant decisions."
          tint="var(--tint-sand)"
          link="/trading-tools"
          visual={<MiniTrading />}
        />
      </div>

      <style>{`
        @media (max-width: 920px) {
          .bento { grid-template-columns: 1fr 1fr !important; }
          .bento > a { grid-column: span 2 !important; grid-row: auto !important; }
        }
        @media (max-width: 560px) {
          .bento { grid-template-columns: 1fr !important; }
          .bento > a { grid-column: 1 !important; }
        }
      `}</style>
    </div>
  </section>
);

const BentoCard = ({ span, rows, title, tag, desc, tint, visual, link }) => (
  <Link to={link} style={{
    gridColumn: span, gridRow: rows ? `span ${rows}` : undefined,
    background: tint, borderRadius: 'var(--r-lg)',
    padding: 28, position: 'relative', overflow: 'hidden',
    transition: 'all 320ms var(--ease)',
    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    minHeight: 220, cursor: 'pointer'
  }}
  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18, position: 'relative', zIndex: 2 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink)', letterSpacing: '0.1em', fontWeight: 500 }}>
        {tag}
      </span>
      <span style={{
        width: 32, height: 32, borderRadius: '50%',
        background: 'var(--ink)', color: 'var(--bg-pure)',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <ArrowUpRight size={14} />
      </span>
    </div>

    <div style={{ position: 'relative', zIndex: 2, marginBottom: 16 }}>
      <h3 className="h-display" style={{ fontSize: 'clamp(1.3rem, 1.8vw, 1.7rem)', marginBottom: 6, color: 'var(--ink)' }}>{title}</h3>
      <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.5 }}>{desc}</p>
    </div>

    <div style={{ position: 'relative', zIndex: 1, marginTop: 'auto' }}>
      {visual}
    </div>
  </Link>
);

const MiniWebsite = () => (
  <div style={{ background: 'var(--ink)', borderRadius: 12, padding: 12 }}>
    <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF5F57' }} />
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FEBC2E' }} />
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#28C840' }} />
    </div>
    <div style={{ background: 'var(--bg-pure)', borderRadius: 6, padding: 10 }}>
      <div style={{ width: '60%', height: 12, background: 'var(--ink)', borderRadius: 3, marginBottom: 6 }} />
      <div style={{ width: '40%', height: 8, background: 'var(--text-muted)', borderRadius: 3, marginBottom: 10, opacity: 0.5 }} />
      <div style={{ width: 70, height: 18, background: 'var(--accent)', borderRadius: 999 }} />
    </div>
  </div>
);

const MiniPhone = () => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div style={{ width: 60, height: 110, background: 'var(--ink)', borderRadius: 12, padding: 4 }}>
      <div style={{ background: 'var(--bg-pure)', borderRadius: 8, height: '100%', padding: 6 }}>
        <div style={{ width: 16, height: 4, background: 'var(--ink)', borderRadius: 2, marginBottom: 6 }} />
        <div style={{ width: '100%', height: 30, background: 'var(--accent)', borderRadius: 4, marginBottom: 4 }} />
        {[1,2].map(i => <div key={i} style={{ height: 6, background: 'var(--bg-soft)', borderRadius: 2, marginBottom: 3 }} />)}
      </div>
    </div>
  </div>
);

const MiniFunnel = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    {[100, 70, 50, 30, 18].map((w, i) => (
      <div key={i} style={{
        height: 10, width: `${w}%`,
        background: i === 4 ? 'var(--success)' : 'var(--ink)',
        borderRadius: 3, marginLeft: `${(100 - w) / 2}%`,
        opacity: i === 4 ? 1 : 0.6 + (i * 0.1)
      }} />
    ))}
  </div>
);

const MiniDashboard = () => (
  <div style={{ background: 'var(--ink)', borderRadius: 10, padding: 12, color: 'var(--bg-pure)' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 10 }}>
      {['Revenue', 'Orders', 'CR'].map((l, i) => (
        <div key={i} style={{ padding: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 4 }}>
          <div style={{ fontSize: 7, color: 'var(--text-on-ink-soft)', fontFamily: 'var(--font-mono)' }}>{l.toUpperCase()}</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)' }}>{['₹2.4L', '128', '3.2%'][i]}</div>
        </div>
      ))}
    </div>
    <div style={{ height: 36, background: 'linear-gradient(to top, rgba(255,90,31,0.2), transparent)', borderRadius: 4, position: 'relative' }}>
      <svg viewBox="0 0 200 36" style={{ width: '100%', height: '100%' }}>
        <polyline points="0,28 30,24 60,26 90,18 120,14 150,12 180,6 200,4" stroke="var(--accent)" strokeWidth="1.4" fill="none" />
      </svg>
    </div>
  </div>
);

const MiniChat = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <div style={{ alignSelf: 'flex-start', background: 'var(--bg-pure)', padding: '6px 10px', borderRadius: 8, fontSize: 10, color: 'var(--ink)', maxWidth: '70%' }}>
      Welcome 👋 What's your business size?
    </div>
    <div style={{ alignSelf: 'flex-end', background: '#DCF8C6', padding: '6px 10px', borderRadius: 8, fontSize: 10, color: 'var(--ink)', maxWidth: '60%' }}>
      10-20 staff
    </div>
    <div style={{ alignSelf: 'flex-start', background: 'var(--bg-pure)', padding: '6px 10px', borderRadius: 8, fontSize: 10, color: 'var(--ink)', maxWidth: '80%' }}>
      Booking a free call ✓
    </div>
  </div>
);

const MiniTrading = () => (
  <div style={{ background: 'var(--ink)', borderRadius: 10, padding: 12, color: 'var(--bg-pure)', height: 100 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
      <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-on-ink-soft)' }}>P&L · LIVE</span>
      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--success)' }}>+₹24,580</span>
    </div>
    <svg viewBox="0 0 200 50" style={{ width: '100%', height: 50 }}>
      <polyline points="0,40 30,32 60,36 90,22 120,26 150,14 180,8 200,4" stroke="var(--success)" strokeWidth="1.6" fill="none" />
      <polyline points="0,50 0,40 30,32 60,36 90,22 120,26 150,14 180,8 200,4 200,50" fill="rgba(15,169,88,0.18)" />
    </svg>
  </div>
);

/* ═══════════ BIG STATS ═══════════ */
const BigStats = () => (
  <section className="section surface-ink" style={{ position: 'relative', overflow: 'hidden' }}>
    <div className="gradient-mesh-dark" style={{ opacity: 0.6 }} />
    <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
      <span className="t-eyebrow" style={{ color: 'var(--text-on-ink-soft)' }}>Receipts</span>
      <h2 className="h-display" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)', color: 'var(--text-on-ink)', maxWidth: 880, margin: '20px auto 12px', lineHeight: 0.98 }}>
        Numbers that <span className="serif-italic" style={{ color: 'var(--accent)' }}>don't lie.</span>
      </h2>
      <p style={{ color: 'var(--text-on-ink-soft)', maxWidth: 560, margin: '0 auto 64px', fontSize: 17 }}>
        The systems we ship are measured against KPIs — not vanity metrics. Here's the average lift across 5 demo cases.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }} className="bigstats">
        <Stat n={42} suffix="%" label="trading accuracy" />
        <Stat n={65} suffix="%" label="more leads" />
        <Stat n={48} suffix="%" label="more sales" />
        <Stat n={60} suffix="%" label="more admissions" />
      </div>

      <style>{`
        @media (max-width: 720px) { .bigstats { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </div>
  </section>
);

const Stat = ({ n, suffix, label }) => (
  <div style={{ textAlign: 'left', borderTop: '1px solid var(--line-on-ink)', paddingTop: 24 }}>
    <div className="h-display" style={{ fontSize: 'clamp(3.4rem, 8vw, 6rem)', color: 'var(--text-on-ink)', lineHeight: 1, marginBottom: 14 }}>
      <span style={{ color: 'var(--accent)' }}>+</span><Counter end={n} suffix={suffix} />
    </div>
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-on-ink-soft)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
      {label}
    </div>
  </div>
);

/* ═══════════ CASE STUDIES — horizontal scroll feel ═══════════ */
const CaseStudiesScroll = () => (
  <section className="section">
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 48 }}>
        <div style={{ maxWidth: 640 }}>
          <span className="t-eyebrow">Case studies</span>
          <h2 className="h-display" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)', marginTop: 16, lineHeight: 0.96 }}>
            Five demos. <br /><span className="serif-italic" style={{ color: 'var(--accent)' }}>Each one shipped end-to-end.</span>
          </h2>
        </div>
        <Link to="/portfolio" className="btn btn-secondary">All work <ArrowUpRight size={16} /></Link>
      </div>

      <div className="grid grid-3">
        {caseStudies.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: i * 0.06 }}
          >
            <Link to={`/case-study/${c.slug}`} style={{ display: 'block' }}>
              <article className="card card-hover" style={{ overflow: 'hidden' }}>
                <div style={{
                  aspectRatio: '4 / 3',
                  background: `linear-gradient(135deg, ${c.color}28 0%, ${c.color}08 100%)`,
                  position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderBottom: '1px solid var(--line)'
                }}>
                  <div style={{
                    position: 'absolute', inset: 16,
                    background: 'var(--bg-pure)', borderRadius: 'var(--r-md)',
                    boxShadow: '0 12px 32px rgba(10,10,15,0.06)',
                    padding: 20,
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: c.color, fontWeight: 600, letterSpacing: '0.05em' }}>{c.industry.toUpperCase()}</span>
                      <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{c.timeline}</span>
                    </div>
                    <div>
                      <div className="h-display" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: c.color, marginBottom: 6 }}>
                        {c.metrics[0].value}
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--text-soft)' }}>
                        {c.metrics[0].label}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ padding: 24 }}>
                  <h3 className="h-display" style={{ fontSize: '1.3rem', marginBottom: 8 }}>{c.headline}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.5, marginBottom: 16 }}>
                    {c.problem.slice(0, 110)}…
                  </p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>
                    Read case <ArrowUpRight size={14} />
                  </span>
                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ═══════════ ROI ═══════════ */
const ROISection = () => (
  <section className="section" style={{ background: 'var(--bg-soft)' }}>
    <div className="container">
      <ROICalculator />
    </div>
  </section>
);

/* ═══════════ TESTIMONIALS ═══════════ */
const Testimonials = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);
  const t = testimonials[i];
  return (
    <section className="section">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 60, alignItems: 'center' }} className="testi">
          <div>
            <span className="t-eyebrow">Voices</span>
            <h2 className="h-display" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', marginTop: 16, lineHeight: 0.98 }}>
              Real founders. <br /><span className="serif-italic" style={{ color: 'var(--accent)' }}>Real numbers.</span>
            </h2>
            <div style={{ display: 'flex', gap: 6, marginTop: 32 }}>
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  style={{
                    width: idx === i ? 28 : 6, height: 6, borderRadius: 6,
                    background: idx === i ? 'var(--accent)' : 'var(--line-strong)',
                    transition: 'all 280ms var(--ease)'
                  }}
                  aria-label={`Show testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4 }}
            >
              <p className="h-display" style={{
                fontSize: 'clamp(1.4rem, 2.8vw, 2.2rem)',
                fontWeight: 500, lineHeight: 1.2, letterSpacing: '-0.025em',
                color: 'var(--text)', marginBottom: 36
              }}>
                "{t.quote}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'var(--ink)', color: 'var(--bg-pure)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700
                }}>{t.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{t.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-soft)' }}>{t.role} · <span style={{ color: 'var(--text-muted)' }}>{t.location}</span></div>
                </div>
                <span style={{
                  padding: '6px 12px', borderRadius: 'var(--r-pill)',
                  background: 'var(--accent-tint)', color: 'var(--accent)',
                  fontWeight: 700, fontSize: 13, letterSpacing: '-0.01em'
                }}>{t.metric}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <style>{`
          @media (max-width: 920px) { .testi { grid-template-columns: 1fr !important; gap: 32px !important; } }
        `}</style>
      </div>
    </section>
  );
};

/* ═══════════ PROCESS ═══════════ */
const ProcessCompact = () => {
  const steps = [
    { n: '01', day: 'Day 1', title: 'Strategy call', desc: 'We map your goal, audience, and the real outcome to ship.' },
    { n: '02', day: 'Day 2-3', title: 'Blueprint', desc: 'One page. Scope, stack, timeline, fixed price. You approve.' },
    { n: '03', day: 'Day 4-10', title: 'Build', desc: 'Updates every 48 hours. Live staging from day one.' },
    { n: '04', day: 'Day 11-13', title: 'Refine', desc: 'Cross-device QA, performance audit, your feedback round.' },
    { n: '05', day: 'Day 14+', title: 'Launch', desc: 'Deploy, hand over credentials, 30 days free support.' }
  ];
  return (
    <section className="section" style={{ background: 'var(--ink)', color: 'var(--text-on-ink)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 60 }} className="proc">
          <div>
            <span className="t-eyebrow" style={{ color: 'var(--text-on-ink-soft)' }}>Process</span>
            <h2 className="h-display" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: 'var(--text-on-ink)', marginTop: 16, lineHeight: 0.96, marginBottom: 28 }}>
              First call to live system. <br /><span className="serif-italic" style={{ color: 'var(--accent)' }}>14 days.</span>
            </h2>
            <Link to="/process" className="btn btn-on-ink">
              Full process <ArrowUpRight size={16} />
            </Link>
          </div>
          <ol style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {steps.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{
                  display: 'grid', gridTemplateColumns: 'auto 80px 1fr',
                  gap: 24, padding: '24px 0',
                  borderBottom: i < steps.length - 1 ? '1px solid var(--line-on-ink)' : 'none',
                  alignItems: 'baseline'
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text-on-ink-soft)' }}>{s.n}</span>
                <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--accent)', letterSpacing: '0.05em' }}>{s.day}</span>
                <div>
                  <h3 className="h-display" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.7rem)', color: 'var(--text-on-ink)', marginBottom: 6 }}>{s.title}</h3>
                  <p style={{ color: 'var(--text-on-ink-soft)', fontSize: 14, lineHeight: 1.55 }}>{s.desc}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
        <style>{`
          @media (max-width: 920px) { .proc { grid-template-columns: 1fr !important; gap: 32px !important; } }
        `}</style>
      </div>
    </section>
  );
};

/* ═══════════ PRICING TEASER ═══════════ */
const PricingTeaser = () => (
  <section className="section">
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }} className="prc">
        {[
          { name: 'Starter', price: '₹35,000', desc: 'Single landing page, mobile-perfect, 1 form.', tag: 'Founder special', tint: 'var(--bg-pure)', textColor: 'var(--ink)' },
          { name: 'Growth', price: '₹1,20,000', desc: 'Multi-page funnel, lead engine, CRM sync.', tag: 'Most chosen', tint: 'var(--ink)', textColor: 'var(--bg-pure)', popular: true },
          { name: 'Scale', price: 'From ₹3,50,000', desc: 'Custom software, dashboards, automation suite.', tag: 'Enterprise', tint: 'var(--bg-pure)', textColor: 'var(--ink)' }
        ].map((tier, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            style={{
              background: tier.tint, color: tier.textColor,
              border: '1px solid ' + (tier.popular ? 'transparent' : 'var(--line)'),
              borderRadius: 'var(--r-xl)', padding: 36,
              position: 'relative'
            }}
          >
            {tier.popular && (
              <span style={{
                position: 'absolute', top: 16, right: 16,
                padding: '4px 10px', borderRadius: 'var(--r-pill)',
                background: 'var(--accent)', color: 'white',
                fontSize: 11, fontWeight: 600, letterSpacing: '0.04em'
              }}>{tier.tag}</span>
            )}
            <div className="t-eyebrow" style={{ color: tier.popular ? 'var(--text-on-ink-soft)' : 'var(--text-muted)' }}>{tier.name}</div>
            <div className="h-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: 16, marginBottom: 12 }}>{tier.price}</div>
            <p style={{ fontSize: 14, opacity: 0.7, lineHeight: 1.5, marginBottom: 28 }}>{tier.desc}</p>
            <Link to="/free-audit" className={`btn ${tier.popular ? 'btn-on-ink' : 'btn-primary'}`} style={{ width: '100%', justifyContent: 'center' }}>
              Get a quote <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        ))}
      </div>
      <p style={{ textAlign: 'center', marginTop: 32, fontSize: 13, color: 'var(--text-muted)' }}>
        Indicative starting prices. Final quote after the free 45-min strategy call. GST extra.
      </p>
      <style>{`@media (max-width: 920px) { .prc { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  </section>
);

/* ═══════════ FAQ ═══════════ */
const FAQSection = () => {
  const [open, setOpen] = useState(0);
  return (
    <section className="section" style={{ background: 'var(--bg-soft)' }}>
      <div className="container-narrow">
        <span className="t-eyebrow">Q&A</span>
        <h2 className="h-display" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', marginTop: 16, marginBottom: 56, lineHeight: 0.98 }}>
          Things people ask <br /><span className="serif-italic" style={{ color: 'var(--accent)' }}>before booking.</span>
        </h2>
        <div>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                <button onClick={() => setOpen(isOpen ? -1 : i)}
                  style={{
                    width: '100%', textAlign: 'left',
                    padding: '24px 0', display: 'flex',
                    alignItems: 'center', justifyContent: 'space-between', gap: 24,
                    fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', fontWeight: 600
                  }}
                >
                  <span>{f.q}</span>
                  <span style={{
                    width: 32, height: 32, flexShrink: 0,
                    borderRadius: '50%', background: isOpen ? 'var(--accent)' : 'var(--bg-pure)',
                    color: isOpen ? 'white' : 'var(--ink)',
                    border: '1px solid var(--line)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 220ms var(--ease)'
                  }}>{isOpen ? <Minus size={14} /> : <Plus size={14} />}</span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ padding: '0 0 24px', color: 'var(--text-soft)', lineHeight: 1.65, fontSize: 15, maxWidth: 720 }}>
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ═══════════ FINAL CTA ═══════════ */
const FinalCTA = () => (
  <section style={{ position: 'relative', padding: 'clamp(80px, 12vw, 200px) 0', overflow: 'hidden', background: 'var(--bg-pure)' }}>
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(255,90,31,0.16) 0%, transparent 60%)', pointerEvents: 'none' }} />
    <div className="container" style={{ position: 'relative', textAlign: 'center', maxWidth: 880 }}>
      <Mark size={56} />
      <h2 className="h-display" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', marginTop: 28, marginBottom: 24, lineHeight: 0.92 }}>
        Build the system. <br /><span className="serif-italic" style={{ color: 'var(--accent)' }}>Ship the outcome.</span>
      </h2>
      <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', color: 'var(--text-soft)', maxWidth: 580, margin: '0 auto 44px', lineHeight: 1.55 }}>
        45 minutes. Free. We'll either find a fit and ship something remarkable, or point you somewhere better. Either way you leave with clarity.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/free-audit" className="btn btn-accent btn-lg">
          Book the call <ArrowUpRight size={18} />
        </Link>
        <a href="https://wa.me/919313560694" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
          WhatsApp instead
        </a>
      </div>
    </div>
  </section>
);

export default Home;
