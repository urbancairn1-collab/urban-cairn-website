import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Plus, Minus } from 'lucide-react';
import SEO from '../components/SEO';
import Mark from '../components/Mark';
import Counter from '../components/Counter';
import TrustStrip from '../components/TrustStrip';
import ROICalculator from '../components/ROICalculator';
import MagneticButton from '../components/MagneticButton';
import Reveal from '../components/Reveal';
import HeroPhoto from '../components/HeroPhoto';
import { useTilt } from '../hooks/useTilt';
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
        description="Urban Cairn builds the systems that turn ideas into revenue. Custom websites, automation, dashboards. Shipped in 14 days. India · remote, IST."
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
  const spotRef = useRef(null);
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

  // Mouse-tracked spotlight glow
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      if (spotRef.current) {
        spotRef.current.style.setProperty('--mx', `${x}%`);
        spotRef.current.style.setProperty('--my', `${y}%`);
      }
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section ref={ref} style={{ position: 'relative', minHeight: 'calc(100vh - var(--header-h))', display: 'flex', alignItems: 'center', overflow: 'hidden', padding: '60px 0 80px' }}>
      <div className="gradient-mesh-animated" style={{ opacity: 0.8 }} />
      <div ref={spotRef} className="hero-spotlight" />
      <div className="noise" />

      <motion.div className="container hero-grid" style={{ position: 'relative', zIndex: 1, opacity, y, display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 48, alignItems: 'center' }}>
       <div>
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
          <MagneticButton>
            <Link
              to="/free-audit"
              className="btn btn-accent btn-lg"
              onClick={() => track('hero_cta_click')}
            >
              {ctaCopy} <ArrowUpRight size={18} />
            </Link>
          </MagneticButton>
          <MagneticButton strength={0.25}>
            <Link to="/portfolio" className="btn btn-secondary btn-lg">
              See the work
            </Link>
          </MagneticButton>
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
       </div>

       {/* Right: realistic founder/workspace photo — hides on mobile */}
       <div className="hero-cairn" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         <HeroPhoto />
       </div>
      </motion.div>

      <style>{`
        @media (max-width: 920px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-cairn { display: none !important; }
        }
      `}</style>
    </section>
  );
};

/* ═══════════ LOGO TICKER ═══════════ */
const LogoTicker = () => {
  // Each brand gets a one-character mark colour-coded by industry.
  const row1 = [
    { name: 'Patel Realty',     mark: 'P', tag: 'Real estate', hue: 18 },
    { name: 'Aarogya Clinic',   mark: 'A', tag: 'Healthcare',  hue: 165 },
    { name: 'Karan Capital',    mark: 'K', tag: 'Finance',     hue: 220 },
    { name: 'Trendora',         mark: 'T', tag: 'E-commerce',  hue: 332 },
    { name: 'Vidya Institute',  mark: 'V', tag: 'Education',   hue: 264 },
    { name: 'Nivaan Wellness',  mark: 'N', tag: 'Healthcare',  hue: 150 },
    { name: 'Shah Fintech',     mark: 'S', tag: 'Finance',     hue: 200 },
    { name: 'Green Grow',       mark: 'G', tag: 'Agri',        hue: 95 }
  ];
  const row2 = [
    { name: 'Mehta Motors',     mark: 'M', tag: 'Auto',        hue: 12 },
    { name: 'Sanjivani Lab',    mark: 'S', tag: 'Diagnostics', hue: 178 },
    { name: 'Brixly Builds',    mark: 'B', tag: 'Construction',hue: 32 },
    { name: 'Yug Travels',      mark: 'Y', tag: 'Travel',      hue: 195 },
    { name: 'Coral Coffee',     mark: 'C', tag: 'F&B',         hue: 8 },
    { name: 'Vega Apparel',     mark: 'V', tag: 'Retail',      hue: 282 },
    { name: 'Helix Edtech',     mark: 'H', tag: 'Education',   hue: 248 },
    { name: 'Anvi Jewelers',    mark: 'A', tag: 'Jewelry',     hue: 42 }
  ];

  const Chip = ({ item }) => (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '8px 14px 8px 8px',
      background: 'var(--bg-pure)',
      border: '1px solid var(--line)',
      borderRadius: 999,
      whiteSpace: 'nowrap',
      transition: 'transform 240ms var(--ease), border-color 240ms ease, box-shadow 240ms ease'
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 10px 24px rgba(10,10,15,0.08)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <span style={{
        width: 26, height: 26, borderRadius: 7,
        background: `linear-gradient(135deg, hsl(${item.hue}, 70%, 58%), hsl(${item.hue + 18}, 75%, 42%))`,
        color: '#fff', fontWeight: 800, fontSize: 13,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `inset 0 -2px 4px rgba(0,0,0,0.12), 0 2px 6px hsla(${item.hue}, 70%, 50%, 0.25)`
      }}>{item.mark}</span>
      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{item.name}</span>
      <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', borderLeft: '1px solid var(--line)', paddingLeft: 10 }}>{item.tag}</span>
    </div>
  );

  return (
    <section style={{ padding: '52px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', background: 'var(--bg-soft)' }}>
      <div className="container" style={{ marginBottom: 26, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12 }}>
        <span className="t-eyebrow">Trusted by ambitious operators · India · Global</span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
          {row1.length + row2.length}+ brands · 12 industries
        </span>
      </div>
      <div className="ticker-mask">
        <div className="ticker" style={{ gap: 16, animationDuration: '48s' }}>
          {[...row1, ...row1, ...row1].map((it, i) => <Chip key={`a-${i}`} item={it} />)}
        </div>
      </div>
      <div className="ticker-mask" style={{ marginTop: 14 }}>
        <div className="ticker" style={{ gap: 16, animationDuration: '62s', animationDirection: 'reverse' }}>
          {[...row2, ...row2, ...row2].map((it, i) => <Chip key={`b-${i}`} item={it} />)}
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
  <div style={{ height: '100%', background: 'linear-gradient(180deg, #FAFAFA 0%, #F2F2F4 100%)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
    {/* Nav */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 18px', borderBottom: '1px solid rgba(10,10,15,0.06)', background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(8px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <div style={{ width: 18, height: 18, borderRadius: 4, background: 'linear-gradient(135deg, #C2410C, #FF8A4C)' }} />
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.04em', color: '#0A0A0F' }}>PATEL REALTY</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {['Properties', 'EMI Calculator', 'About', 'Contact'].map(t => (
          <span key={t} style={{ fontSize: 9, color: '#4A4A55', fontWeight: 500 }}>{t}</span>
        ))}
        <div style={{ padding: '5px 11px', background: '#C2410C', color: '#fff', borderRadius: 999, fontSize: 9, fontWeight: 600 }}>Book viewing →</div>
      </div>
    </div>

    {/* Hero */}
    <div style={{ padding: '16px 18px 14px', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 14, alignItems: 'center' }}>
      <div>
        <div style={{ display: 'inline-block', padding: '3px 8px', background: 'rgba(194,65,12,0.10)', color: '#C2410C', borderRadius: 999, fontSize: 8, fontWeight: 700, letterSpacing: '0.06em', marginBottom: 8 }}>NEW · ANAND PHASE-2</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#0A0A0F', lineHeight: 1.1, marginBottom: 4 }}>
          Find your next <span style={{ fontStyle: 'italic', color: '#C2410C', fontFamily: 'Georgia, serif' }}>home,</span>
        </div>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#0A0A0F', lineHeight: 1.1, marginBottom: 8 }}>not just a flat.</div>
        <div style={{ fontSize: 8.5, color: '#52525B', lineHeight: 1.45, marginBottom: 10, maxWidth: 200 }}>
          240+ verified 2/3/4 BHK properties across Anand, Vadodara, Ahmedabad. Site-visit booking in under 30 seconds.
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          <div style={{ padding: '4px 10px', background: '#0A0A0F', color: '#fff', borderRadius: 4, fontSize: 8, fontWeight: 600 }}>Browse properties</div>
          <div style={{ padding: '4px 10px', background: 'transparent', color: '#0A0A0F', borderRadius: 4, fontSize: 8, fontWeight: 600, border: '1px solid #0A0A0F' }}>Talk to advisor</div>
        </div>
      </div>
      {/* Building "photo" — gradient placeholder with depth */}
      <div style={{ position: 'relative', height: 92, borderRadius: 6, overflow: 'hidden', boxShadow: '0 6px 16px rgba(10,10,15,0.10)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #7DA5C8 0%, #B9D2E5 55%, #E8DFC9 100%)' }} />
        {/* sun */}
        <div style={{ position: 'absolute', top: 8, right: 12, width: 14, height: 14, borderRadius: '50%', background: '#FFD27D', boxShadow: '0 0 18px rgba(255,210,125,0.7)' }} />
        {/* buildings */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', alignItems: 'flex-end', gap: 1, paddingLeft: 4 }}>
          {[42, 56, 70, 48, 62, 38, 52, 64].map((h, i) => (
            <div key={i} style={{
              flex: 1, height: h,
              background: `linear-gradient(180deg, hsl(220, 18%, ${28 + i * 2}%) 0%, hsl(220, 22%, ${18 + i}%) 100%)`,
              borderRadius: '2px 2px 0 0',
              position: 'relative'
            }}>
              {/* windows */}
              <div style={{ position: 'absolute', inset: '6px 2px 4px 2px', display: 'grid', gridTemplateColumns: '1fr 1fr', gridAutoRows: '3px', gap: '2px 2px', opacity: 0.7 }}>
                {Array.from({ length: Math.floor(h / 6) * 2 }).map((_, j) => (
                  <div key={j} style={{ background: j % 3 === 0 ? '#FFD27D' : 'rgba(255,255,255,0.15)' }} />
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* price chip overlay */}
        <div style={{ position: 'absolute', bottom: 8, left: 8, padding: '4px 8px', background: 'rgba(255,255,255,0.95)', borderRadius: 4, fontSize: 8, fontWeight: 700, color: '#0A0A0F', boxShadow: '0 2px 6px rgba(10,10,15,0.15)' }}>
          ₹62 L · 3BHK · 1,420 sqft
        </div>
      </div>
    </div>

    {/* Property cards row */}
    <div style={{ padding: '0 18px 14px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 7 }}>
      {[
        { name: 'Shantiniketan Heights', price: '₹48 L', bhk: '2 BHK', loc: 'Anand', sqft: '1,080 sqft', hue: 18 },
        { name: 'Krishna Residency', price: '₹72 L', bhk: '3 BHK', loc: 'Vadodara', sqft: '1,560 sqft', hue: 165 },
        { name: 'Sun Palms Villa', price: '₹1.4 Cr', bhk: '4 BHK', loc: 'Ahmedabad', sqft: '2,280 sqft', hue: 32 }
      ].map((p, i) => (
        <div key={i} style={{ background: '#fff', borderRadius: 5, overflow: 'hidden', boxShadow: '0 2px 6px rgba(10,10,15,0.06)', border: '1px solid rgba(10,10,15,0.04)' }}>
          <div style={{ height: 30, background: `linear-gradient(135deg, hsl(${p.hue}, 35%, 70%) 0%, hsl(${p.hue + 10}, 45%, 55%) 100%)`, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 3, right: 3, padding: '1px 4px', background: 'rgba(255,255,255,0.95)', borderRadius: 2, fontSize: 6, fontWeight: 700, color: '#0A0A0F' }}>{p.price}</div>
          </div>
          <div style={{ padding: '5px 6px 6px' }}>
            <div style={{ fontSize: 7.5, fontWeight: 700, color: '#0A0A0F', marginBottom: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
            <div style={{ fontSize: 6.5, color: '#71717A' }}>{p.bhk} · {p.sqft}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 3 }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#16A34A' }} />
              <span style={{ fontSize: 6, color: '#52525B' }}>{p.loc} · RERA verified</span>
            </div>
          </div>
        </div>
      ))}
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
  <section className="section" style={{ background: 'var(--bg-pure)', position: 'relative', overflow: 'hidden' }}>
    {/* Faint ambient orb for depth */}
    <div className="orb orb-b" style={{ width: 460, height: 460, top: '20%', right: '-15%', background: 'radial-gradient(circle, rgba(255,90,31,0.18), transparent 70%)', opacity: 0.5 }} />
    <div className="container" style={{ position: 'relative' }}>
      <Reveal>
        <div style={{ marginBottom: 60, maxWidth: 720 }}>
          <span className="t-eyebrow">Capabilities</span>
          <h2 className="h-display" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)', marginTop: 16, lineHeight: 0.96 }}>
            What we build, <br /><span className="serif-italic" style={{ color: 'var(--accent)' }}>and what it earns you.</span>
          </h2>
        </div>
      </Reveal>

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

const BentoCard = ({ span, rows, title, tag, desc, tint, visual, link }) => {
  const tilt = useTilt({ max: 6, scale: 1.015 });
  return (
    <Link to={link} {...tilt} style={{
      ...tilt.style,
      gridColumn: span, gridRow: rows ? `span ${rows}` : undefined,
      background: tint, borderRadius: 'var(--r-lg)',
      padding: 28, position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      minHeight: 220, cursor: 'pointer'
    }}>
      {/* Sheen overlay on hover */}
      <div className="bento-sheen" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18, position: 'relative', zIndex: 2 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink)', letterSpacing: '0.1em', fontWeight: 500 }}>
          {tag}
        </span>
        <span style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'var(--ink)', color: 'var(--bg-pure)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: 'translateZ(20px)'
        }}>
          <ArrowUpRight size={14} />
        </span>
      </div>

      <div style={{ position: 'relative', zIndex: 2, marginBottom: 16 }}>
        <h3 className="h-display" style={{ fontSize: 'clamp(1.3rem, 1.8vw, 1.7rem)', marginBottom: 6, color: 'var(--ink)' }}>{title}</h3>
        <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.5 }}>{desc}</p>
      </div>

      <div style={{ position: 'relative', zIndex: 1, marginTop: 'auto', transform: 'translateZ(10px)' }}>
        {visual}
      </div>
    </Link>
  );
};

const MiniWebsite = () => (
  <div style={{ background: '#0A0A0F', borderRadius: 12, padding: '8px 8px 0', boxShadow: '0 8px 24px rgba(10,10,15,0.18)' }}>
    {/* Window chrome */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6, padding: '0 2px 6px' }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF5F57' }} />
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FEBC2E' }} />
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#28C840' }} />
      <div style={{ marginLeft: 8, flex: 1, height: 10, borderRadius: 3, background: '#1A1A22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 6, color: 'rgba(255,255,255,0.5)' }}>patelrealty.in</span>
      </div>
    </div>
    {/* Browser page */}
    <div style={{ background: 'linear-gradient(180deg, #FAFAFA, #F2F2F4)', borderRadius: '6px 6px 0 0', padding: 8, height: 92, overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: 'linear-gradient(135deg, #C2410C, #FF8A4C)' }} />
          <span style={{ fontSize: 6.5, fontWeight: 800, color: '#0A0A0F', letterSpacing: '0.04em' }}>PATEL REALTY</span>
        </div>
        <div style={{ padding: '2px 6px', background: '#C2410C', color: '#fff', borderRadius: 999, fontSize: 5.5, fontWeight: 600 }}>Book →</div>
      </div>
      <div style={{ fontSize: 9, fontWeight: 800, color: '#0A0A0F', lineHeight: 1, marginBottom: 2 }}>Find your <span style={{ fontStyle: 'italic', color: '#C2410C', fontFamily: 'Georgia, serif' }}>home.</span></div>
      <div style={{ fontSize: 5.5, color: '#52525B', marginBottom: 5 }}>240+ verified properties · 30-sec booking</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
        {[18, 165, 32].map((hue, i) => (
          <div key={i} style={{ height: 22, borderRadius: 3, background: `linear-gradient(135deg, hsl(${hue}, 35%, 70%) 0%, hsl(${hue + 10}, 45%, 55%) 100%)`, position: 'relative' }}>
            <div style={{ position: 'absolute', bottom: 1, left: 2, right: 2, fontSize: 4.5, fontWeight: 700, color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>{['₹48L', '₹72L', '₹1.4Cr'][i]}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const MiniPhone = () => (
  <div style={{ display: 'flex', justifyContent: 'center', gap: 10, alignItems: 'flex-end' }}>
    {/* Phone 1 — order tracking */}
    <div style={{ width: 74, height: 138, background: '#0A0A0F', borderRadius: 14, padding: 3, boxShadow: '0 14px 30px rgba(10,10,15,0.25)', transform: 'rotate(-4deg)' }}>
      <div style={{ background: '#FAFAFA', borderRadius: 11, height: '100%', overflow: 'hidden', position: 'relative' }}>
        {/* Status bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px 5px 0', fontSize: 4.5, color: '#0A0A0F', fontWeight: 700 }}>
          <span>9:41</span>
          <div style={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <span style={{ width: 4, height: 3, borderRadius: 1, background: '#0A0A0F' }} />
            <span style={{ width: 6, height: 3, borderRadius: 1, border: '0.5px solid #0A0A0F' }} />
          </div>
        </div>
        {/* Notch */}
        <div style={{ position: 'absolute', top: 1, left: '50%', transform: 'translateX(-50%)', width: 22, height: 4, background: '#0A0A0F', borderRadius: 999 }} />
        {/* Header */}
        <div style={{ padding: '5px 5px 0' }}>
          <div style={{ fontSize: 5, color: '#71717A', fontWeight: 500 }}>Hi Rahul 👋</div>
          <div style={{ fontSize: 7.5, fontWeight: 800, color: '#0A0A0F' }}>Today's orders</div>
        </div>
        {/* Hero card */}
        <div style={{ margin: '5px 5px 4px', borderRadius: 6, background: 'linear-gradient(135deg, #C2410C 0%, #FF8A4C 100%)', padding: '5px 6px', color: '#fff' }}>
          <div style={{ fontSize: 4.5, opacity: 0.8, letterSpacing: '0.06em', fontWeight: 600 }}>NEW THIS WEEK</div>
          <div style={{ fontSize: 7.5, fontWeight: 800, marginTop: 1 }}>Summer collection</div>
          <div style={{ fontSize: 4.5, opacity: 0.9, marginTop: 1 }}>Up to 40% off · Free ship</div>
        </div>
        {/* List items */}
        {[
          { name: 'Cotton kurta', price: '₹899', dot: '#16A34A' },
          { name: 'Linen shirt', price: '₹1,249', dot: '#F59E0B' }
        ].map((it, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 5px', borderTop: '0.5px solid rgba(10,10,15,0.06)' }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, background: `linear-gradient(135deg, hsl(${i * 80 + 20}, 50%, 75%), hsl(${i * 80 + 30}, 60%, 55%))` }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 5, fontWeight: 700, color: '#0A0A0F' }}>{it.name}</div>
              <div style={{ fontSize: 4.5, color: '#71717A' }}>{it.price}</div>
            </div>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: it.dot }} />
          </div>
        ))}
      </div>
    </div>

    {/* Phone 2 — push notification stack */}
    <div style={{ width: 74, height: 138, background: '#0A0A0F', borderRadius: 14, padding: 3, boxShadow: '0 14px 30px rgba(10,10,15,0.25)', transform: 'rotate(5deg) translateY(6px)' }}>
      <div style={{ background: 'linear-gradient(180deg, #1F3A5F 0%, #3A6FA5 100%)', borderRadius: 11, height: '100%', overflow: 'hidden', position: 'relative', padding: '3px 4px' }}>
        {/* Notch */}
        <div style={{ position: 'absolute', top: 1, left: '50%', transform: 'translateX(-50%)', width: 22, height: 4, background: '#0A0A0F', borderRadius: 999, zIndex: 2 }} />
        {/* Lockscreen time */}
        <div style={{ textAlign: 'center', color: '#fff', marginTop: 8 }}>
          <div style={{ fontSize: 5, fontWeight: 500, opacity: 0.85 }}>TUESDAY, 11 MAY</div>
          <div style={{ fontSize: 18, fontWeight: 200, letterSpacing: '-0.04em', lineHeight: 1 }}>9:41</div>
        </div>
        {/* Notification cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2.5, marginTop: 7 }}>
          {[
            { app: 'PATEL REALTY', body: 'New 3BHK match in Vadodara — ₹72L', tint: '#C2410C' },
            { app: 'ORDERS', body: '2 new orders · ₹3,148 today', tint: '#16A34A' },
            { app: 'CRM', body: 'Lead: Priya Shah · WhatsApp now', tint: '#FF5A1F' }
          ].map((n, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.95)', borderRadius: 4, padding: '3px 4px', backdropFilter: 'blur(6px)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <span style={{ width: 5, height: 5, borderRadius: 1.2, background: n.tint }} />
                  <span style={{ fontSize: 4.2, fontWeight: 700, color: '#0A0A0F', letterSpacing: '0.04em' }}>{n.app}</span>
                </div>
                <span style={{ fontSize: 4, color: '#71717A' }}>now</span>
              </div>
              <div style={{ fontSize: 4.5, color: '#0A0A0F', lineHeight: 1.2 }}>{n.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const MiniFunnel = () => (
  <div style={{ background: '#fff', borderRadius: 8, padding: '8px 10px', boxShadow: '0 4px 12px rgba(10,10,15,0.06)', border: '1px solid rgba(10,10,15,0.05)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
      <span style={{ fontSize: 7, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', color: '#71717A', fontWeight: 600 }}>LAST 30 DAYS</span>
      <span style={{ fontSize: 6.5, color: '#16A34A', fontWeight: 700 }}>↑ 18% MoM</span>
    </div>
    {[
      { l: 'Visits',    v: '12,840', w: 100, c: '#0A0A0F' },
      { l: 'Leads',     v: '2,156',  w: 70,  c: '#1F3A5F' },
      { l: 'Qualified', v: '1,184',  w: 50,  c: '#3A6FA5' },
      { l: 'Demos',     v: '487',    w: 32,  c: '#C2410C' },
      { l: 'Closed',    v: '142',    w: 18,  c: '#16A34A' }
    ].map((r, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
        <div style={{ width: 42, fontSize: 6, color: '#52525B', fontWeight: 600 }}>{r.l}</div>
        <div style={{ flex: 1, height: 9, background: '#F4F4F5', borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
          <div style={{ width: `${r.w}%`, height: '100%', background: r.c, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 4 }}>
            <span style={{ fontSize: 5, color: '#fff', fontWeight: 700 }}>{r.w}%</span>
          </div>
        </div>
        <div style={{ width: 30, fontSize: 6.5, fontWeight: 700, textAlign: 'right', color: '#0A0A0F', fontVariantNumeric: 'tabular-nums' }}>{r.v}</div>
      </div>
    ))}
  </div>
);

const MiniDashboard = () => (
  <div style={{ background: '#0A0A0F', borderRadius: 10, padding: 12, color: '#fff', boxShadow: '0 8px 24px rgba(10,10,15,0.20)', border: '1px solid rgba(255,255,255,0.06)' }}>
    {/* Header */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#16A34A', boxShadow: '0 0 6px #16A34A' }} />
        <span style={{ fontSize: 7, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.08em', fontWeight: 600 }}>LIVE · STORE.PATELDAIRY.IN</span>
      </div>
      <span style={{ fontSize: 6, color: 'rgba(255,255,255,0.5)' }}>updated 12s ago</span>
    </div>
    {/* KPI cards */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 5, marginBottom: 8 }}>
      {[
        { l: 'REVENUE', v: '₹2.4L', sub: '+12% WoW', up: true },
        { l: 'ORDERS',  v: '128',   sub: '+8 today',  up: true },
        { l: 'CR',      v: '3.2%',  sub: '−0.4%',     up: false }
      ].map((k, i) => (
        <div key={i} style={{ padding: '5px 6px', background: 'rgba(255,255,255,0.04)', borderRadius: 4, border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', fontWeight: 600 }}>{k.l}</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: i === 2 ? '#fff' : 'var(--accent)', lineHeight: 1.1, marginTop: 1 }}>{k.v}</div>
          <div style={{ fontSize: 5, color: k.up ? '#16A34A' : '#F87171', fontWeight: 600, marginTop: 1 }}>{k.up ? '↑' : '↓'} {k.sub}</div>
        </div>
      ))}
    </div>
    {/* Chart with axis hints */}
    <div style={{ height: 44, position: 'relative', borderRadius: 4, padding: '2px 2px 0' }}>
      <svg viewBox="0 0 200 44" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
        <defs>
          <linearGradient id="md-gr" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF5A1F" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FF5A1F" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* gridlines */}
        {[11, 22, 33].map(y => <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />)}
        {/* area */}
        <path d="M0,34 L25,30 L50,32 L75,22 L100,18 L125,15 L150,11 L175,7 L200,4 L200,44 L0,44 Z" fill="url(#md-gr)" />
        {/* line */}
        <polyline points="0,34 25,30 50,32 75,22 100,18 125,15 150,11 175,7 200,4" stroke="#FF5A1F" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* end dot */}
        <circle cx="200" cy="4" r="2" fill="#FF5A1F" />
        <circle cx="200" cy="4" r="3.5" fill="#FF5A1F" fillOpacity="0.25" />
      </svg>
    </div>
    {/* X-axis labels */}
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 5, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-mono)', marginTop: 1 }}>
      <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
    </div>
  </div>
);

const MiniChat = () => (
  <div style={{ background: '#ECE5DD', borderRadius: 8, padding: 0, overflow: 'hidden', boxShadow: '0 4px 12px rgba(10,10,15,0.08)' }}>
    {/* Header */}
    <div style={{ padding: '7px 10px', background: '#0FAB6F', color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, #C2410C, #FF8A4C)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: '#fff' }}>UC</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 8.5, fontWeight: 700, lineHeight: 1.1 }}>Urban Cairn Sales</div>
        <div style={{ fontSize: 6, opacity: 0.85, display: 'flex', alignItems: 'center', gap: 3 }}>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#A7F3D0' }} />
          online · typically replies in 30 sec
        </div>
      </div>
    </div>
    {/* Bubbles */}
    <div style={{ padding: '8px 8px 10px', display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ alignSelf: 'flex-end', maxWidth: '80%' }}>
        <div style={{ background: '#DCF8C6', padding: '5px 8px', borderRadius: '8px 8px 2px 8px', fontSize: 8, color: '#0A0A0F', lineHeight: 1.3 }}>Interested in your WhatsApp setup. Run a 12-staff clinic.</div>
        <div style={{ fontSize: 5, color: '#71717A', textAlign: 'right', marginTop: 1 }}>10:24 ✓✓</div>
      </div>
      <div style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
        <div style={{ background: '#fff', padding: '5px 8px', borderRadius: '8px 8px 8px 2px', fontSize: 8, color: '#0A0A0F', lineHeight: 1.3 }}>
          Great 👋 For 12-staff clinics we usually bundle booking + reminders + intake.
        </div>
        <div style={{ fontSize: 5, color: '#71717A', marginTop: 1 }}>10:24</div>
      </div>
      <div style={{ alignSelf: 'flex-start', maxWidth: '70%' }}>
        <div style={{ background: '#fff', padding: '5px 8px', borderRadius: '8px 8px 8px 2px', fontSize: 8, color: '#0A0A0F', lineHeight: 1.3 }}>
          📅 Free 30-min strategy call — Wed 4 PM works?
        </div>
        <div style={{ fontSize: 5, color: '#71717A', marginTop: 1 }}>10:24</div>
      </div>
    </div>
  </div>
);

const MiniTrading = () => {
  // Realistic OHLC candle data
  const candles = [
    { o: 38, c: 34, h: 36, l: 30 }, { o: 34, c: 32, h: 33, l: 30 }, { o: 32, c: 36, h: 36, l: 31 },
    { o: 36, c: 28, h: 37, l: 27 }, { o: 28, c: 30, h: 31, l: 26 }, { o: 30, c: 24, h: 31, l: 22 },
    { o: 24, c: 26, h: 27, l: 22 }, { o: 26, c: 20, h: 27, l: 18 }, { o: 20, c: 16, h: 21, l: 14 },
    { o: 16, c: 18, h: 19, l: 14 }, { o: 18, c: 12, h: 19, l: 10 }, { o: 12, c: 8,  h: 13, l: 6 }
  ];
  return (
    <div style={{ background: '#0A0A0F', borderRadius: 10, padding: 10, color: '#fff', boxShadow: '0 8px 24px rgba(10,10,15,0.20)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
        <div>
          <div style={{ fontSize: 7, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.08em', fontWeight: 600 }}>NIFTY · 5M</div>
          <div style={{ fontSize: 11, fontWeight: 800, marginTop: 1, fontVariantNumeric: 'tabular-nums' }}>22,548.<span style={{ color: '#16A34A' }}>70</span></div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: '#16A34A', fontVariantNumeric: 'tabular-nums' }}>+₹24,580</div>
          <div style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.55)' }}>+1.84% · 4 trades</div>
        </div>
      </div>
      {/* Candle chart with EMA */}
      <svg viewBox="0 0 200 52" preserveAspectRatio="none" style={{ width: '100%', height: 52, display: 'block' }}>
        {/* gridlines */}
        {[13, 26, 39].map(y => <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="2 2" />)}
        {/* candles */}
        {candles.map((c, i) => {
          const x = 6 + i * 16;
          const isUp = c.c < c.o;
          const color = isUp ? '#16A34A' : '#F87171';
          const bodyTop = Math.min(c.o, c.c);
          const bodyHeight = Math.max(1.5, Math.abs(c.c - c.o));
          return (
            <g key={i}>
              <line x1={x} x2={x} y1={c.h} y2={c.l} stroke={color} strokeWidth="0.8" />
              <rect x={x - 3} y={bodyTop} width="6" height={bodyHeight} fill={color} rx="0.5" />
            </g>
          );
        })}
        {/* EMA line — smooth downtrend (uptrend after flip) */}
        <polyline points="0,38 16,36 32,34 48,33 64,31 80,28 96,25 112,21 128,18 144,15 160,12 176,9 192,7" stroke="#FF5A1F" strokeWidth="1.1" fill="none" strokeOpacity="0.85" />
      </svg>
      {/* Order strip */}
      <div style={{ marginTop: 5, display: 'flex', gap: 4, fontSize: 5.5, fontFamily: 'var(--font-mono)' }}>
        <span style={{ padding: '1px 4px', background: 'rgba(22,163,74,0.15)', color: '#16A34A', borderRadius: 2, fontWeight: 700 }}>BUY 22,520</span>
        <span style={{ padding: '1px 4px', background: 'rgba(255,90,31,0.15)', color: '#FF5A1F', borderRadius: 2, fontWeight: 700 }}>SL 22,485</span>
        <span style={{ padding: '1px 4px', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.75)', borderRadius: 2, fontWeight: 700 }}>TGT 22,580</span>
      </div>
    </div>
  );
};

/* ═══════════ BIG STATS ═══════════ */
const BigStats = () => (
  <section className="section surface-ink" style={{ position: 'relative', overflow: 'hidden' }}>
    <div className="gradient-mesh-dark-animated" style={{ opacity: 0.85 }} />
    {/* Floating ambient orbs */}
    <div className="orb orb-a" style={{ width: 480, height: 480, top: '-10%', left: '-8%', background: 'radial-gradient(circle, rgba(255,90,31,0.55), transparent 70%)' }} />
    <div className="orb orb-b" style={{ width: 540, height: 540, bottom: '-20%', right: '-12%', background: 'radial-gradient(circle, rgba(80,40,140,0.55), transparent 70%)' }} />
    <div className="orb orb-a" style={{ width: 320, height: 320, top: '30%', right: '20%', background: 'radial-gradient(circle, rgba(10,102,255,0.4), transparent 70%)', opacity: 0.4, animationDelay: '4s' }} />
    <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
      <Reveal>
        <span className="t-eyebrow" style={{ color: 'var(--text-on-ink-soft)' }}>Receipts</span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="h-display" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)', color: 'var(--text-on-ink)', maxWidth: 880, margin: '20px auto 12px', lineHeight: 0.98 }}>
          Numbers that <span className="serif-italic" style={{ color: 'var(--accent)' }}>don't lie.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.12}>
        <p style={{ color: 'var(--text-on-ink-soft)', maxWidth: 560, margin: '0 auto 64px', fontSize: 17 }}>
          The systems we ship are measured against KPIs — not vanity metrics. Here's the average lift across 5 demo cases.
        </p>
      </Reveal>

      <Reveal stagger>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }} className="bigstats">
          <Reveal.Item><Stat n={42} suffix="%" label="trading accuracy" /></Reveal.Item>
          <Reveal.Item><Stat n={65} suffix="%" label="more leads" /></Reveal.Item>
          <Reveal.Item><Stat n={48} suffix="%" label="more sales" /></Reveal.Item>
          <Reveal.Item><Stat n={60} suffix="%" label="more admissions" /></Reveal.Item>
        </div>
      </Reveal>

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
// Deterministic hue per name so the same person always gets the same gradient.
const hueFromName = (name) => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return h % 360;
};

const Stars = ({ n = 5, dark = false }) => (
  <div style={{ display: 'inline-flex', gap: 2 }} aria-label={`${n} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < n ? '#FFC107' : 'transparent'} stroke={i < n ? '#FFC107' : (dark ? 'rgba(255,255,255,0.25)' : 'var(--line-strong)')} strokeWidth="1.5">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ))}
  </div>
);

const Testimonials = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);
  const t = testimonials[i];
  const hue = hueFromName(t.name);
  return (
    <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Giant decorative quote watermark */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 20, right: 'var(--pad-x)',
        fontFamily: 'Georgia, serif', fontSize: 'clamp(220px, 32vw, 420px)',
        lineHeight: 0.7, color: 'var(--accent)', opacity: 0.06, fontStyle: 'italic',
        pointerEvents: 'none', zIndex: 0, userSelect: 'none'
      }}>"</div>

      <div className="container" style={{ position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 60, alignItems: 'center' }} className="testi">
          <Reveal>
            <div>
              <span className="t-eyebrow">Voices</span>
              <h2 className="h-display" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', marginTop: 16, lineHeight: 0.98 }}>
                Real founders. <br /><span className="serif-italic" style={{ color: 'var(--accent)' }}>Real numbers.</span>
              </h2>
              <p style={{ color: 'var(--text-soft)', fontSize: 15, lineHeight: 1.6, marginTop: 18, maxWidth: 360 }}>
                Six engagements across real estate, healthcare, trading, e-commerce, education and wellness — averaging +52% on the primary KPI in under 90 days.
              </p>
              <div style={{ display: 'flex', gap: 6, marginTop: 28 }}>
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setI(idx)}
                    style={{
                      width: idx === i ? 32 : 8, height: 8, borderRadius: 8,
                      background: idx === i ? 'var(--accent)' : 'var(--line-strong)',
                      transition: 'all 280ms var(--ease)',
                      border: 'none', padding: 0, cursor: 'pointer'
                    }}
                    aria-label={`Show testimonial ${idx + 1}`}
                  />
                ))}
              </div>
              <div style={{ marginTop: 18, fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
                {String(i + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
              </div>
            </div>
          </Reveal>
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
              style={{
                position: 'relative',
                padding: 'clamp(28px, 4vw, 44px)',
                background: 'var(--bg-pure)',
                borderRadius: 'var(--r-xl)',
                border: '1px solid var(--line)',
                boxShadow: '0 24px 60px rgba(10,10,15,0.06)'
              }}
            >
              {/* Accent corner */}
              <div style={{
                position: 'absolute', top: 0, left: 0, width: 80, height: 4,
                background: `linear-gradient(90deg, hsl(${hue}, 70%, 55%), var(--accent))`,
                borderRadius: '12px 0 0 0'
              }} />
              <Stars n={t.rating} />
              <p className="h-display" style={{
                fontSize: 'clamp(1.4rem, 2.6vw, 2.1rem)',
                fontWeight: 500, lineHeight: 1.25, letterSpacing: '-0.02em',
                color: 'var(--text)', marginTop: 18, marginBottom: 32
              }}>
                "{t.quote}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: `linear-gradient(135deg, hsl(${hue}, 70%, 58%), hsl(${(hue + 30) % 360}, 75%, 42%))`,
                  color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 17,
                  boxShadow: `0 6px 16px hsla(${hue}, 70%, 50%, 0.28), inset 0 -3px 6px rgba(0,0,0,0.15)`
                }}>{t.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{t.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-soft)' }}>{t.role} · <span style={{ color: 'var(--text-muted)' }}>{t.location}</span></div>
                </div>
                <span style={{
                  padding: '7px 13px', borderRadius: 'var(--r-pill)',
                  background: 'var(--accent-tint)', color: 'var(--accent)',
                  fontWeight: 700, fontSize: 13, letterSpacing: '-0.01em',
                  whiteSpace: 'nowrap'
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
