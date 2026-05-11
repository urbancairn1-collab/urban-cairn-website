import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Cairn-stone stack illustration — depth-shaded, glow halo, gentle floating
// stones. Stones drift subtly on mouse-track parallax.

const stones = [
  { y: 460, rx: 180, ry: 36, delay: 0.0, depth: 0.10 },
  { y: 388, rx: 152, ry: 32, delay: 0.08, depth: 0.18 },
  { y: 320, rx: 122, ry: 28, delay: 0.16, depth: 0.28 },
  { y: 256, rx: 96,  ry: 24, delay: 0.24, depth: 0.40 },
  { y: 198, rx: 72,  ry: 20, delay: 0.32, depth: 0.55 },
  { y: 148, rx: 50,  ry: 16, delay: 0.40, depth: 0.72 },
  { y: 104, rx: 32,  ry: 12, delay: 0.48, depth: 0.92 }
];

const AnimatedCairn = ({ size = 520 }) => {
  const wrapRef = useRef(null);
  const stoneRefs = useRef([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let raf = 0;
    let mx = 0, my = 0;
    let cx = 0, cy = 0;

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width - 0.5) * 2;  // -1..1
      my = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onLeave = () => { mx = 0; my = 0; };

    const tick = () => {
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;
      stoneRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = stones[i]?.depth || 0;
        el.style.transform = `translate(${cx * 18 * d}px, ${cy * 12 * d}px)`;
      });
      raf = requestAnimationFrame(tick);
    };

    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} style={{ width: size, maxWidth: '100%', aspectRatio: '1 / 1', position: 'relative' }}>
      <svg viewBox="0 0 500 540" width="100%" height="100%" style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          <radialGradient id="halo" cx="50%" cy="20%" r="60%">
            <stop offset="0%" stopColor="#FF8A4C" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#FF5A1F" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#FF5A1F" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ground" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(10,10,15,0.18)" />
            <stop offset="100%" stopColor="rgba(10,10,15,0)" />
          </radialGradient>
          <linearGradient id="stone-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFD1A8" />
            <stop offset="45%" stopColor="#FF8A4C" />
            <stop offset="100%" stopColor="#9C2F08" />
          </linearGradient>
          <linearGradient id="stone-highlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="stone-shade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.32" />
          </linearGradient>
          <filter id="soft-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
            <feOffset dx="0" dy="6" />
            <feComponentTransfer><feFuncA type="linear" slope="0.32" /></feComponentTransfer>
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Halo glow */}
        <motion.ellipse
          cx="250" cy="150" rx="220" ry="160"
          fill="url(#halo)"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0.7, 0.95, 0.7], scale: [1, 1.04, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Ground shadow */}
        <ellipse cx="250" cy="490" rx="200" ry="22" fill="url(#ground)" />

        {/* Stones — bottom to top with stagger */}
        {stones.map((s, i) => (
          <motion.g
            key={i}
            ref={(el) => (stoneRefs.current[i] = el)}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: s.delay, ease: [0.32, 0.72, 0, 1] }}
            style={{ originX: 0.5, originY: 0.5 }}
          >
            <motion.g
              animate={{ y: [0, -2.5, 0] }}
              transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            >
              <ellipse cx="250" cy={s.y} rx={s.rx} ry={s.ry} fill="url(#stone-grad)" filter="url(#soft-shadow)" />
              <ellipse cx="250" cy={s.y - s.ry * 0.4} rx={s.rx * 0.85} ry={s.ry * 0.45} fill="url(#stone-highlight)" />
              <ellipse cx="250" cy={s.y + s.ry * 0.35} rx={s.rx * 0.9} ry={s.ry * 0.55} fill="url(#stone-shade)" />
            </motion.g>
          </motion.g>
        ))}

        {/* Crown spark */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6, type: 'spring' }}
        >
          <motion.circle
            cx="250" cy="76" r="5"
            fill="#FFD27D"
            animate={{ opacity: [0.6, 1, 0.6], r: [4.5, 6, 4.5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <circle cx="250" cy="76" r="12" fill="#FFD27D" opacity="0.18" />
        </motion.g>

        {/* Orbit dots — floating particles */}
        {[
          { cx: 90,  cy: 220, r: 3,   delay: 0.0 },
          { cx: 420, cy: 280, r: 2.5, delay: 0.8 },
          { cx: 380, cy: 130, r: 2,   delay: 1.4 },
          { cx: 130, cy: 340, r: 2.5, delay: 2.0 },
          { cx: 60,  cy: 100, r: 1.8, delay: 2.6 }
        ].map((p, i) => (
          <motion.circle
            key={`dot-${i}`}
            cx={p.cx} cy={p.cy} r={p.r}
            fill="#FF5A1F" opacity="0.55"
            animate={{ y: [0, -14, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4 + i * 0.4, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}
      </svg>
    </div>
  );
};

export default AnimatedCairn;
