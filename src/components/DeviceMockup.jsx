// Realistic device frames — drop any content inside.
// Used for premium product imagery feel without external image hosting.

export const Laptop = ({ children, label = 'urbancairn.in' }) => (
  <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto' }}>
    {/* Screen */}
    <div style={{
      background: '#0A0A0F',
      borderRadius: '14px 14px 4px 4px',
      padding: '22px 14px 14px',
      border: '2px solid #2A2A33',
      boxShadow: '0 30px 80px rgba(10,10,15,0.18), inset 0 0 0 1px rgba(255,255,255,0.04)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, padding: '0 4px' }}>
        <Dot c="#FF5F57" /><Dot c="#FEBC2E" /><Dot c="#28C840" />
        <div style={{
          flex: 1, marginLeft: 12, height: 20, borderRadius: 6,
          background: '#1A1A22', border: '1px solid rgba(255,255,255,0.04)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-on-ink-soft)'
        }}>
          {label}
        </div>
      </div>
      <div style={{
        background: '#FFFFFF', borderRadius: 8, overflow: 'hidden',
        aspectRatio: '16 / 10'
      }}>
        {children}
      </div>
    </div>
    {/* Bottom bezel */}
    <div style={{
      width: '110%', height: 14, marginLeft: '-5%',
      background: 'linear-gradient(180deg, #353544 0%, #1F1F28 100%)',
      borderRadius: '2px 2px 14px 14px',
      position: 'relative'
    }}>
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 60, height: 4, borderRadius: '0 0 8px 8px', background: '#0A0A0F' }} />
    </div>
  </div>
);

export const Phone = ({ children, label = 'WhatsApp' }) => (
  <div style={{
    width: 260,
    margin: '0 auto',
    background: '#0A0A0F',
    borderRadius: 32,
    padding: 8,
    border: '1.5px solid #2A2A33',
    boxShadow: '0 28px 64px rgba(10,10,15,0.20)'
  }}>
    <div style={{
      borderRadius: 26,
      overflow: 'hidden',
      aspectRatio: '9 / 19',
      background: '#FAFAFA',
      position: 'relative'
    }}>
      {/* Notch */}
      <div style={{
        position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
        width: 90, height: 22, background: '#0A0A0F', borderRadius: 999, zIndex: 2
      }} />
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  </div>
);

export const BrowserCard = ({ children, label = 'preview' }) => (
  <div style={{
    background: 'var(--bg-pure)',
    borderRadius: 'var(--r-md)',
    overflow: 'hidden',
    border: '1px solid var(--line)',
    boxShadow: 'var(--shadow-sm)'
  }}>
    <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 6, background: 'var(--bg-soft)' }}>
      <Dot c="#FF5F57" /><Dot c="#FEBC2E" /><Dot c="#28C840" />
      <span style={{ marginLeft: 8, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>{label}</span>
    </div>
    <div style={{ padding: 18 }}>{children}</div>
  </div>
);

const Dot = ({ c }) => <span style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />;
