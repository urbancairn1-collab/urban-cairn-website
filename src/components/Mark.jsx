// Geometric fallback mark — used in places where the full UC brand logo
// would feel too heavy (e.g., the footer dark surfaces). The Wordmark
// component below uses the real UC TECH SOL brand logo from public/.

const Mark = ({ size = 32, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="26" height="26" rx="7" stroke={color} strokeWidth="1.6" />
    <path d="M8 24 L24 8" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="24" cy="8" r="2.4" fill={color} />
  </svg>
);

// Brand logo asset path (Vite resolves base URL from import.meta.env.BASE_URL).
const LOGO_SRC = `${import.meta.env.BASE_URL}logo-mark.png`;

export const Wordmark = ({ size = 'md', tone = 'dark' }) => {
  // Heights chosen so the logo reads cleanly without dominating the navbar.
  const h = size === 'lg' ? 48 : size === 'sm' ? 26 : 36;
  // On dark surfaces, invert the logo to white so it remains legible.
  const filter = tone === 'light'
    ? 'brightness(0) invert(1)'
    : 'none';
  return (
    <img
      src={LOGO_SRC}
      alt="Urban Cairn Tech Solution · UC Tech Sol"
      style={{
        height: h,
        width: 'auto',
        display: 'block',
        filter,
        // Slight negative left margin pulls the logo into alignment with the
        // navbar's container padding (the PNG carries a touch of whitespace).
        marginLeft: -4
      }}
      width={Math.round((h / 200) * 457)}
      height={h}
    />
  );
};

export default Mark;
