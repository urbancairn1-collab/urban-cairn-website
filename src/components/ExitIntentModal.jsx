import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Mark from './Mark';

const ExitIntentModal = () => {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('uc_exit_shown')) { setShown(true); return; }
    let timer = null;
    const onMouseLeave = (e) => {
      if (e.clientY < 5 && !shown) {
        setOpen(true); setShown(true);
        sessionStorage.setItem('uc_exit_shown', '1');
      }
    };
    timer = setTimeout(() => document.addEventListener('mouseleave', onMouseLeave), 9000);
    return () => { clearTimeout(timer); document.removeEventListener('mouseleave', onMouseLeave); };
  }, [shown]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: 'rgba(10,10,15,0.6)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
          }}
        >
          <motion.div
            onClick={e => e.stopPropagation()}
            initial={{ scale: 0.94, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            style={{
              maxWidth: 520, width: '100%',
              background: 'var(--bg-pure)', borderRadius: 'var(--r-xl)',
              padding: 'clamp(28px, 4vw, 44px)', position: 'relative',
              boxShadow: '0 32px 80px rgba(0,0,0,0.4)'
            }}
          >
            <button onClick={() => setOpen(false)} aria-label="Close" style={{
              position: 'absolute', top: 14, right: 14, width: 36, height: 36,
              borderRadius: 'var(--r-pill)', background: 'var(--bg-soft)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <X size={16} />
            </button>

            <Mark size={36} />
            <span className="t-eyebrow" style={{ marginTop: 18, display: 'inline-flex' }}>One sec — before you go</span>

            <h2 className="h-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginTop: 14, marginBottom: 14 }}>
              Take the audit <span className="serif-italic" style={{ color: 'var(--accent)' }}>with you.</span>
            </h2>
            <p style={{ color: 'var(--text-soft)', marginBottom: 28, fontSize: 15, lineHeight: 1.6 }}>
              12-point teardown of your current site — speed, SEO, mobile UX, conversion blockers. Worth ₹10,000. Yours, free, in 48 hours.
            </p>

            <Link to="/free-audit" onClick={() => setOpen(false)} className="btn btn-accent btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
              Claim my audit <ArrowUpRight size={18} />
            </Link>
            <button onClick={() => setOpen(false)} style={{
              width: '100%', marginTop: 12, padding: '8px',
              fontSize: 13, color: 'var(--text-muted)'
            }}>
              No thanks
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentModal;
