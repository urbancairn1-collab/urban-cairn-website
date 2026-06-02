import { ShieldCheck, Zap, Code2, MessageCircle } from 'lucide-react';

const points = [
  { icon: Zap, label: '14-day delivery' },
  { icon: Code2, label: '100% code ownership' },
  { icon: MessageCircle, label: 'Direct WhatsApp' },
  { icon: ShieldCheck, label: 'Udyam-verified MSME' }
];

const TrustStrip = ({ tone = 'light' }) => {
  const isDark = tone === 'dark';
  return (
    <div className="trust-strip" style={{
      display: 'inline-flex', flexWrap: 'wrap',
      padding: '6px', borderRadius: 'var(--r-pill)',
      gap: 4,
      background: isDark ? 'rgba(255,255,255,0.05)' : 'var(--bg-pure)',
      border: `1px solid ${isDark ? 'var(--line-on-ink)' : 'var(--line)'}`
    }}>
      {points.map(({ icon: Icon, label }) => (
        <span key={label} style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '8px 14px', borderRadius: 'var(--r-pill)',
          fontSize: 12, fontWeight: 500, letterSpacing: '-0.005em',
          color: isDark ? 'var(--text-on-ink-soft)' : 'var(--text-soft)'
        }}>
          <Icon size={13} color="var(--accent)" /> {label}
        </span>
      ))}
    </div>
  );
};

export default TrustStrip;
