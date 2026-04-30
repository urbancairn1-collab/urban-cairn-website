import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, BarChart3, Bell, Shield, Zap, Layers, ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import { Laptop } from '../components/DeviceMockup';

const TradingTools = () => (
  <>
    <SEO title="Trading dashboards" description="Custom trading dashboards, signal scanners, P&L trackers, backtesting. Live data, your edge." path="/trading-tools" />

    <section style={{ padding: 'clamp(80px, 10vw, 160px) 0 60px', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(at 30% 0%, rgba(15,169,88,0.12), transparent 55%), radial-gradient(at 80% 80%, rgba(255,90,31,0.10), transparent 55%)',
        pointerEvents: 'none'
      }} />
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 60, alignItems: 'center' }} className="th">
          <div>
            <span className="t-eyebrow">Trading tools</span>
            <h1 className="h-display" style={{ fontSize: 'clamp(2.6rem, 7vw, 6rem)', marginTop: 22, lineHeight: 0.94 }}>
              Live data. <br /><span className="serif-italic" style={{ color: 'var(--accent)' }}>Instant decisions.</span>
            </h1>
            <p style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)', color: 'var(--text-soft)', maxWidth: 540, lineHeight: 1.55, marginTop: 28, marginBottom: 32 }}>
              Real-time market dashboards, signal scanners, P&L trackers, backtest engines — built for active traders who want an edge, not noise.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
              <Link to="/free-audit" className="btn btn-accent btn-lg">Get a custom build <ArrowUpRight size={18} /></Link>
              <Link to="/case-study/trading-dashboard" className="btn btn-secondary btn-lg">See live demo</Link>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
              <span>NSE · BSE · MCX READY</span>
              <span>·</span>
              <span>ALGO COMPATIBLE</span>
              <span>·</span>
              <span>MULTI-BROKER</span>
            </div>
          </div>
          <div className="hide-mobile">
            <Laptop label="trading.live"><DashScene /></Laptop>
          </div>
        </div>
        <style>{`@media (max-width: 920px) { .th { grid-template-columns: 1fr !important; } }`}</style>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div style={{ marginBottom: 56 }}>
          <span className="t-eyebrow">Features</span>
          <h2 className="h-display" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', marginTop: 16, lineHeight: 1, maxWidth: 720 }}>
            Built for traders. <span className="serif-italic" style={{ color: 'var(--accent)' }}>By people who code.</span>
          </h2>
        </div>
        <div className="grid grid-3">
          {[
            { icon: TrendingUp, title: 'Live P&L tracking', desc: 'Real-time profit/loss across positions with strategy-level breakdown.' },
            { icon: BarChart3, title: 'Backtest engine', desc: 'Test strategies on 10+ years of historical data before risking capital.' },
            { icon: Bell, title: 'Custom alerts', desc: 'Price, volume, signal, breakout — Telegram, WhatsApp, or email.' },
            { icon: Shield, title: 'Risk metrics', desc: 'Drawdown, Sharpe ratio, win rate, position sizing — automated.' },
            { icon: Zap, title: 'Signal scanner', desc: 'Multi-condition scanners across hundreds of stocks — setups in seconds.' },
            { icon: Layers, title: 'Multi-broker sync', desc: 'Zerodha, Upstox, Angel One — unified P&L across all accounts.' }
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card"
                style={{ padding: 28 }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 'var(--r-md)',
                  background: 'var(--success-soft)', color: 'var(--success)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18
                }}>
                  <Icon size={20} />
                </div>
                <h3 className="h-display" style={{ fontSize: 18, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.55 }}>{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    <section className="section" style={{ background: 'var(--ink)', color: 'var(--text-on-ink)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div className="gradient-mesh-dark" style={{ opacity: 0.5 }} />
      <div className="container" style={{ position: 'relative' }}>
        <h2 className="h-display" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: 'var(--text-on-ink)', marginBottom: 24, lineHeight: 0.98, maxWidth: 720, marginInline: 'auto' }}>
          Stop trading with <span className="serif-italic" style={{ color: 'var(--accent)' }}>incomplete data.</span>
        </h2>
        <Link to="/free-audit" className="btn btn-accent btn-lg">Book free demo <ArrowUpRight size={18} /></Link>
      </div>
    </section>
  </>
);

const DashScene = () => (
  <div style={{ padding: 16, height: '100%', background: '#0A0A0F', color: '#fff', display: 'flex', flexDirection: 'column' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
      {[
        { l: 'P&L', v: '+₹24,580', c: '#0FA958' },
        { l: 'WIN RATE', v: '68.4%', c: '#FF5A1F' },
        { l: 'OPEN', v: '12', c: '#fff' },
        { l: 'DD', v: '-2.1%', c: '#dc2626' }
      ].map((s, i) => (
        <div key={i} style={{ padding: 10, background: 'rgba(255,255,255,0.04)', borderRadius: 6 }}>
          <div style={{ fontSize: 8, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', marginBottom: 4 }}>{s.l}</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: s.c }}>{s.v}</div>
        </div>
      ))}
    </div>
    <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', borderRadius: 6, padding: 10 }}>
      <svg viewBox="0 0 300 130" style={{ width: '100%', height: '100%' }}>
        <polyline points="0,110 30,98 60,104 90,82 120,86 150,68 180,72 210,52 240,46 270,28 300,20" stroke="#0FA958" strokeWidth="1.8" fill="none" />
        <polyline points="0,130 0,110 30,98 60,104 90,82 120,86 150,68 180,72 210,52 240,46 270,28 300,20 300,130" fill="rgba(15,169,88,0.16)" />
      </svg>
    </div>
  </div>
);

export default TradingTools;
