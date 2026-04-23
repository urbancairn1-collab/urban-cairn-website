import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Cpu } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      transition: 'all 0.3s ease',
      background: isScrolled ? 'rgba(10, 10, 10, 0.85)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(12px)' : 'none',
      borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
      padding: isScrolled ? '15px 5%' : '25px 5%'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Cpu color="#D4AF37" size={32} />
          <div>
            <h1 style={{ fontSize: '1.2rem', margin: 0, letterSpacing: '1px' }}>
              URBAN CAIRN
            </h1>
            <span style={{ fontSize: '0.7rem', color: '#a0a0a0', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Tech Solution
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              style={{
                fontSize: '0.95rem',
                fontWeight: 500,
                color: location.pathname === link.path ? '#D4AF37' : '#ffffff',
                position: 'relative'
              }}
            >
              {link.name}
              {location.pathname === link.path && (
                <span style={{
                  position: 'absolute',
                  bottom: '-5px',
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: 'var(--gold-gradient)',
                  borderRadius: '2px'
                }}></span>
              )}
            </Link>
          ))}
          <Link to="/contact" className="btn btn-primary btn-glow">
            Get a Quote
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="mobile-toggle" 
          onClick={toggleMenu}
          style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', display: 'none' }}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Basic responsive styles inline for navbar */}
      <style>{`
        @media (max-width: 992px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(15px)',
          padding: '20px 5%',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '1.2rem',
                color: location.pathname === link.path ? '#D4AF37' : '#ffffff',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                paddingBottom: '10px'
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
