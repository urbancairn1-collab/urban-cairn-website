import { motion } from 'framer-motion';

const HERO_SRC = `${import.meta.env.BASE_URL}hero-photo.jpg`;

// Hero photograph composition. The photo is a Gemini-generated Indian
// founder/client meeting in a premium home-office. Static frame — no
// tilt or scale animation on hover (per RD: image still rahe).

const HeroPhoto = () => {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 560, aspectRatio: '5 / 4' }}>
      {/* Halo behind the frame */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: -40,
        background: 'radial-gradient(50% 50% at 50% 45%, rgba(255,90,31,0.22), transparent 70%)',
        filter: 'blur(8px)',
        pointerEvents: 'none'
      }} />

      {/* Decorative ring offset */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
        style={{
          position: 'absolute', inset: '6% -4% -4% 6%',
          borderRadius: 24,
          border: '1.5px solid var(--accent)',
          pointerEvents: 'none'
        }}
      />

      {/* Photo frame — static, no tilt */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.32, 0.72, 0, 1] }}
        style={{
          position: 'relative',
          width: '100%', height: '100%',
          borderRadius: 22,
          overflow: 'hidden',
          background: '#0A0A0F',
          boxShadow: '0 40px 100px rgba(10,10,15,0.22), 0 0 0 1px rgba(10,10,15,0.06), inset 0 0 0 1px rgba(255,255,255,0.05)'
        }}
      >
        <img
          src={HERO_SRC}
          alt="Two collaborators reviewing a build inside a sunlit Indian home-office studio"
          width="1600"
          height="893"
          loading="eager"
          decoding="async"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />

        {/* Top gradient overlay for label readability */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(10,10,15,0.18) 0%, transparent 30%, transparent 60%, rgba(10,10,15,0.25) 100%)',
          pointerEvents: 'none'
        }} />

        {/* Top-left "live" pill */}
        <div style={{
          position: 'absolute', top: 14, left: 14,
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '6px 11px', borderRadius: 999,
          background: 'rgba(10,10,15,0.6)',
          backdropFilter: 'blur(8px)',
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em',
          color: '#fff', fontWeight: 600
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#16A34A', boxShadow: '0 0 8px #16A34A' }} />
          STRATEGY · LIVE
        </div>
      </motion.div>

      {/* Floating stat badge — bottom-left, overlaps frame */}
      <motion.div
        initial={{ opacity: 0, y: 16, x: -8 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.7, delay: 0.7, ease: [0.32, 0.72, 0, 1] }}
        style={{
          position: 'absolute',
          bottom: -22, left: -18,
          padding: '14px 18px',
          background: 'var(--bg-pure)',
          borderRadius: 14,
          boxShadow: '0 18px 40px rgba(10,10,15,0.16), 0 0 0 1px var(--line)',
          minWidth: 168
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <span style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'linear-gradient(135deg, #16A34A, #22C55E)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 16, fontWeight: 800
          }}>↑</span>
          <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', color: 'var(--text-muted)', fontWeight: 600 }}>
            AVG LIFT
          </span>
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }}>
          +52% on KPI
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-soft)', marginTop: 2 }}>
          across 5 demo cases · 90 days
        </div>
      </motion.div>

      {/* Floating "14d" badge — top-right, overlaps frame */}
      <motion.div
        initial={{ opacity: 0, y: -12, x: 8 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.7, delay: 0.85, ease: [0.32, 0.72, 0, 1] }}
        style={{
          position: 'absolute',
          top: -16, right: -12,
          padding: '12px 14px',
          background: 'var(--ink)',
          color: 'var(--text-on-ink)',
          borderRadius: 12,
          boxShadow: '0 14px 32px rgba(10,10,15,0.28)'
        }}
      >
        <div style={{ fontSize: 9, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', color: 'var(--text-on-ink-soft)', fontWeight: 600, marginBottom: 2 }}>
          DELIVERY
        </div>
        <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.02em' }}>
          14 days
        </div>
      </motion.div>
    </div>
  );
};

export default HeroPhoto;
