import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, X } from 'lucide-react';
import { trackEvent } from './Analytics';

// Appears after 60% scroll on home (and lazy on other pages),
// hides on /free-audit and /contact (already converting there).

const HIDE_ON = ['/free-audit', '/contact'];

const StickyScrollCTA = () => {
  const { pathname } = useLocation();
  const [shown, setShown] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (HIDE_ON.includes(pathname)) { setShown(false); return; }
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
      setShown(pct > 0.55);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => { setDismissed(false); }, [pathname]);

  if (HIDE_ON.includes(pathname) || dismissed) return null;

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 240, damping: 28 }}
          className="hide-mobile"
          style={{
            position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
            zIndex: 985, display: 'flex', alignItems: 'center', gap: 14,
            background: 'var(--ink)', color: 'var(--text-on-ink)',
            padding: '10px 12px 10px 22px', borderRadius: 'var(--r-pill)',
            boxShadow: '0 16px 48px rgba(10,10,15,0.32)',
            border: '1px solid rgba(255,255,255,0.08)'
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 500 }}>
            <span style={{ color: 'var(--accent)' }}>●</span> 8 free audit slots open this quarter
          </span>
          <Link
            to="/free-audit"
            onClick={() => trackEvent('sticky_cta_click', { page: pathname })}
            className="btn btn-accent btn-sm"
            style={{ height: 36 }}
          >
            Claim <ArrowUpRight size={14} />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', color: 'var(--text-on-ink-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyScrollCTA;
