import { useEffect } from 'react';
import { Calendar } from 'lucide-react';

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL;

// Inline lazy-load Calendly script the first time embed is mounted.
let scriptLoaded = false;
const ensureScript = () => {
  if (scriptLoaded || typeof document === 'undefined') return;
  scriptLoaded = true;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://assets.calendly.com/assets/external/widget.css';
  document.head.appendChild(link);

  const s = document.createElement('script');
  s.src = 'https://assets.calendly.com/assets/external/widget.js';
  s.async = true;
  document.body.appendChild(s);
};

const CalendlyEmbed = () => {
  useEffect(() => { if (CALENDLY_URL) ensureScript(); }, []);

  if (!CALENDLY_URL) {
    return (
      <div style={{
        background: 'var(--bg-soft)', borderRadius: 'var(--r-md)', padding: 24,
        border: '1px dashed var(--line-strong)', textAlign: 'center'
      }}>
        <Calendar size={20} color="var(--text-muted)" style={{ marginInline: 'auto' }} />
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 10 }}>
          Calendly will appear here once <code style={{ fontFamily: 'var(--font-mono)' }}>VITE_CALENDLY_URL</code> is set in <code style={{ fontFamily: 'var(--font-mono)' }}>.env.local</code>.
        </p>
      </div>
    );
  }

  return (
    <div
      className="calendly-inline-widget"
      data-url={`${CALENDLY_URL}?hide_event_type_details=1&primary_color=FF5A1F`}
      style={{ minWidth: 320, height: 640 }}
    />
  );
};

export default CalendlyEmbed;
