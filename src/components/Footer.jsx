import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Cpu } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      background: '#0a0a0a',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      padding: '80px 5% 30px',
      marginTop: 'auto'
    }}>
      <div className="container grid grid-cols-4" style={{ marginBottom: '60px' }}>
        
        {/* Brand */}
        <div>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Cpu color="#D4AF37" size={36} />
            <div>
              <h2 style={{ fontSize: '1.4rem', margin: 0, letterSpacing: '1px' }}>URBAN CAIRN</h2>
              <span style={{ fontSize: '0.8rem', color: '#a0a0a0', letterSpacing: '2px', textTransform: 'uppercase' }}>Tech Solution</span>
            </div>
          </Link>
          <p style={{ color: '#a0a0a0', marginBottom: '20px', fontSize: '0.95rem' }}>
            Smart Digital Solutions for Modern Businesses. We build digital power through innovative software, websites, and marketing strategies.
          </p>
          <div style={{ display: 'flex', gap: '15px' }}>
            <a href="#" style={{ color: '#a0a0a0' }}><Facebook size={20} /></a>
            <a href="#" style={{ color: '#a0a0a0' }}><Twitter size={20} /></a>
            <a href="#" style={{ color: '#a0a0a0' }}><Linkedin size={20} /></a>
            <a href="#" style={{ color: '#a0a0a0' }}><Instagram size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '25px', color: '#fff' }}>Quick Links</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><Link to="/about" style={{ color: '#a0a0a0' }}>About Us</Link></li>
            <li><Link to="/services" style={{ color: '#a0a0a0' }}>Our Services</Link></li>
            <li><Link to="/portfolio" style={{ color: '#a0a0a0' }}>Portfolio</Link></li>
            <li><Link to="/blog" style={{ color: '#a0a0a0' }}>Insights & Blog</Link></li>
            <li><Link to="/contact" style={{ color: '#a0a0a0' }}>Contact Us</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '25px', color: '#fff' }}>Our Services</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><Link to="/services" style={{ color: '#a0a0a0' }}>Software Development</Link></li>
            <li><Link to="/services" style={{ color: '#a0a0a0' }}>Web Development</Link></li>
            <li><Link to="/services" style={{ color: '#a0a0a0' }}>Digital Advertising</Link></li>
            <li><Link to="/services" style={{ color: '#a0a0a0' }}>E-commerce Solutions</Link></li>
            <li><Link to="/services" style={{ color: '#a0a0a0' }}>IT Consulting</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '25px', color: '#fff' }}>Contact Us</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <MapPin size={20} color="#D4AF37" style={{ flexShrink: 0, marginTop: '3px' }} />
              <span style={{ color: '#a0a0a0', fontSize: '0.95rem' }}>Anand, Gujarat, India</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Phone size={20} color="#D4AF37" style={{ flexShrink: 0 }} />
              <a href="tel:9313560694" style={{ color: '#a0a0a0', fontSize: '0.95rem' }}>+91 9313560694</a>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mail size={20} color="#D4AF37" style={{ flexShrink: 0 }} />
              <a href="mailto:urbancairn1@gmail.com" style={{ color: '#a0a0a0', fontSize: '0.95rem' }}>urbancairn1@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        paddingTop: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} Urban Cairn Tech Solution. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="#" style={{ color: '#666', fontSize: '0.9rem' }}>Privacy Policy</Link>
          <Link to="#" style={{ color: '#666', fontSize: '0.9rem' }}>Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
