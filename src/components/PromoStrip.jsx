import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, X } from 'lucide-react';

const PromoStrip = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div style={{
      background: 'var(--ink)', color: 'var(--text-on-ink)',
      padding: '10px var(--pad-x)', position: 'relative',
      fontSize: 13, fontFamily: 'var(--font-mono)', letterSpacing: '0.02em',
      display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, flexWrap: 'wrap'
    }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '2px 8px', borderRadius: 'var(--r-pill)',
        background: 'var(--accent)', color: 'white',
        fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600
      }}>
        Q2 · Free
      </span>
      <span>8 free strategy calls open this quarter — worth ₹10,000.</span>
      <Link to="/free-audit" style={{ color: 'var(--accent)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 2 }}>
        Claim yours <ArrowUpRight size={13} />
      </Link>
      <button onClick={() => setVisible(false)} aria-label="Close" style={{
        position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
        color: 'var(--text-on-ink-soft)', display: 'flex', alignItems: 'center'
      }}>
        <X size={14} />
      </button>
    </div>
  );
};

export default PromoStrip;
