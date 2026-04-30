// Original geometric mark — rounded square enclosure (the studio),
// rising diagonal (growth/shipping), precision dot (the outcome).
// Nothing taken from the brochure cairn-stones art.

const Mark = ({ size = 32, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="26" height="26" rx="7" stroke={color} strokeWidth="1.6" />
    <path d="M8 24 L24 8" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="24" cy="8" r="2.4" fill={color} />
  </svg>
);

export const Wordmark = ({ size = 'md', tone = 'dark' }) => {
  const fontSize = size === 'lg' ? 22 : size === 'sm' ? 14 : 17;
  const markSize = size === 'lg' ? 38 : size === 'sm' ? 24 : 30;
  const color = tone === 'light' ? 'var(--bg-pure)' : 'var(--ink)';
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <Mark size={markSize} color={color} />
      <span style={{
        color, fontWeight: 700, fontSize,
        letterSpacing: '-0.025em', lineHeight: 1
      }}>
        Urban Cairn
      </span>
    </div>
  );
};

export default Mark;
