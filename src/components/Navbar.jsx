import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Wordmark } from './Mark';

const NAV = [
  { name: 'Work', path: '/portfolio' },
  { name: 'Capabilities', path: '/services' },
  { name: 'Industries', path: '/industries' },
  { name: 'Process', path: '/process' },
  { name: 'Studio', path: '/about' },
  { name: 'Notes', path: '/blog' }
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 1000,
      transition: 'all 280ms var(--ease)',
      background: scrolled ? 'rgba(250,250,250,0.78)' : 'rgba(250,250,250,0)',
      backdropFilter: scrolled ? 'saturate(160%) blur(18px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'saturate(160%) blur(18px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent'
    }}>
      <div className="container" style={{
        height: 'var(--header-h)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <Link to="/" aria-label="Urban Cairn home"><Wordmark size="md" /></Link>

        <nav className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {NAV.map(l => (
            <Link
              key={l.path}
              to={l.path}
              style={{
                fontSize: 14, fontWeight: 500, color: 'var(--text)',
                padding: '8px 14px', borderRadius: 'var(--r-pill)',
                background: pathname === l.path ? 'var(--bg-tint)' : 'transparent',
                transition: 'background 200ms var(--ease)'
              }}
            >
              {l.name}
            </Link>
          ))}
        </nav>

        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link to="/contact" style={{ fontSize: 14, fontWeight: 500, padding: '8px 14px' }}>Contact</Link>
          <Link to="/free-audit" className="btn btn-accent btn-sm">
            Free Audit
          </Link>
        </div>

        <button
          className="hide-desktop"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
          style={{ width: 40, height: 40, borderRadius: 'var(--r-pill)', background: 'var(--bg-tint)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {mobileOpen && (
        <div style={{
          background: 'var(--bg-pure)', borderTop: '1px solid var(--line)',
          padding: '24px var(--pad-x) 28px',
          display: 'flex', flexDirection: 'column', gap: 4
        }}>
          {NAV.map(l => (
            <Link
              key={l.path}
              to={l.path}
              style={{
                fontSize: 18, fontWeight: 500, padding: '14px 16px',
                borderRadius: 'var(--r-md)',
                background: pathname === l.path ? 'var(--bg-tint)' : 'transparent'
              }}
            >
              {l.name}
            </Link>
          ))}
          <Link to="/contact" style={{ fontSize: 18, fontWeight: 500, padding: '14px 16px' }}>Contact</Link>
          <Link to="/free-audit" className="btn btn-accent btn-lg" style={{ marginTop: 12, justifyContent: 'center' }}>
            Claim free audit
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
