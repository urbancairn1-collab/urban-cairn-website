import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const ROICalculator = () => {
  const [visitors, setVisitors] = useState(2000);
  const [conv, setConv] = useState(1.0);
  const [aov, setAov] = useState(15000);

  const before = useMemo(() => Math.round(visitors * (conv / 100) * aov), [visitors, conv, aov]);
  const after = useMemo(() => Math.round(visitors * ((conv * 2.5) / 100) * aov), [visitors, conv, aov]);
  const lift = after - before;

  return (
    <div style={{
      background: 'var(--bg-pure)',
      borderRadius: 'var(--r-xl)',
      padding: 'clamp(32px, 5vw, 64px)',
      border: '1px solid var(--line)',
      position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', top: -100, right: -100, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,90,31,0.16), transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <span className="t-eyebrow">Calculator · 60 sec</span>
        <h3 className="h-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', margin: '14px 0 14px', maxWidth: 580 }}>
          How much revenue is your <span className="serif-italic" style={{ color: 'var(--accent)' }}>weak funnel</span> losing every month?
        </h3>
        <p style={{ color: 'var(--text-soft)', maxWidth: 540, fontSize: 16, lineHeight: 1.5, marginBottom: 36 }}>
          A properly built funnel converts ~2.5× better than a generic site. Here's what that means for your numbers.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36 }} className="calc">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <Slider label="Monthly visitors" value={visitors} setValue={setVisitors} min={500} max={20000} step={100} format={v => v.toLocaleString('en-IN')} />
            <Slider label="Current conversion %" value={conv} setValue={setConv} min={0.2} max={5} step={0.1} format={v => `${v.toFixed(1)}%`} />
            <Slider label="Avg. order / deal value" value={aov} setValue={setAov} min={500} max={500000} step={500} format={v => `₹${v.toLocaleString('en-IN')}`} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ padding: 24, borderRadius: 'var(--r-md)', background: 'var(--bg-soft)', border: '1px solid var(--line)' }}>
              <div className="t-eyebrow" style={{ marginBottom: 10 }}>Today</div>
              <div className="h-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--text-soft)' }}>
                ₹{before.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>per month</div>
            </div>

            <motion.div key={after} initial={{ scale: 0.97 }} animate={{ scale: 1 }}
              style={{
                padding: 24, borderRadius: 'var(--r-md)',
                background: 'var(--ink)', color: 'var(--text-on-ink)'
              }}>
              <div className="t-eyebrow" style={{ marginBottom: 10, color: 'var(--accent)' }}>With Urban Cairn build</div>
              <div className="h-display" style={{ fontSize: 'clamp(1.8rem, 3.6vw, 2.8rem)', color: 'var(--bg-pure)' }}>
                ₹{after.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: 14, color: 'var(--accent)', marginTop: 6, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <TrendingUp size={14} /> +₹{lift.toLocaleString('en-IN')} monthly upside
              </div>
            </motion.div>
          </div>
        </div>

        <Link to="/free-audit" className="btn btn-accent btn-lg" style={{ marginTop: 36 }}>
          Get my conversion audit <ArrowUpRight size={18} />
        </Link>
        <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text-muted)' }}>
          Estimates based on 2024-25 industry benchmarks. Actuals depend on traffic quality + funnel design.
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .calc { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
};

const Slider = ({ label, value, setValue, min, max, step, format }) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
      <span className="t-eyebrow" style={{ '::before': 'none' }}>{label}</span>
      <span style={{ fontWeight: 700, color: 'var(--ink)', fontSize: 17, letterSpacing: '-0.02em' }}>{format(value)}</span>
    </div>
    <input
      type="range" min={min} max={max} step={step} value={value}
      onChange={e => setValue(Number(e.target.value))}
      style={{ width: '100%', accentColor: '#FF5A1F', height: 4, cursor: 'pointer' }}
    />
  </div>
);

export default ROICalculator;
