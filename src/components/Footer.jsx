import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import { Wordmark } from './Mark';
import { company } from '../data/company';
import { LinkedinIcon, InstagramIcon, XIcon, FacebookIcon, GithubIcon } from './SocialIcons';

const SOCIAL = [
  { label: 'LinkedIn', href: company.social.linkedin, Icon: LinkedinIcon },
  { label: 'Instagram', href: company.social.instagram, Icon: InstagramIcon },
  { label: 'X (Twitter)', href: company.social.twitter, Icon: XIcon },
  { label: 'Facebook', href: company.social.facebook, Icon: FacebookIcon },
  { label: 'GitHub', href: company.social.github, Icon: GithubIcon }
];

const Footer = () => {
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--text-on-ink)', padding: 'clamp(80px, 10vw, 140px) 0 32px' }}>
      <div className="container">
        {/* Big CTA top of footer */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48,
          alignItems: 'flex-end', paddingBottom: 80,
          borderBottom: '1px solid var(--line-on-ink)'
        }} className="footer-top">
          <h2 className="h-display" style={{
            fontSize: 'clamp(2.4rem, 7vw, 5.4rem)', color: 'var(--text-on-ink)',
            margin: 0
          }}>
            Let's ship <br />
            <span className="serif-italic" style={{ color: 'var(--accent)' }}>something.</span>
          </h2>
          <div>
            <p style={{ color: 'var(--text-on-ink-soft)', fontSize: 17, lineHeight: 1.55, marginBottom: 28, maxWidth: 380 }}>
              45-min strategy call. Free. No upsell. Either we're a fit, or we point you somewhere better.
            </p>
            <Link to="/free-audit" className="btn btn-accent btn-lg">
              Book the call <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>

        {/* Body */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr', gap: 56,
          padding: '64px 0'
        }} className="footer-body">
          <div>
            <Wordmark size="lg" tone="light" />
            <p style={{ color: 'var(--text-on-ink-soft)', fontSize: 14, lineHeight: 1.7, marginTop: 22, maxWidth: 320 }}>
              A studio for ambitious operators. We build the systems that turn ideas into revenue — not slides into invoices.
            </p>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 22,
              padding: '6px 12px', borderRadius: 'var(--r-pill)',
              background: 'rgba(255,255,255,0.05)', border: '1px solid var(--line-on-ink)',
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em',
              color: 'var(--text-on-ink-soft)', textTransform: 'uppercase'
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)' }} /> MSME · {company.udyam}
            </div>
          </div>

          <FooterCol title="Studio" items={[
            { label: 'Work', to: '/portfolio' },
            { label: 'Capabilities', to: '/services' },
            { label: 'Process', to: '/process' },
            { label: 'About', to: '/about' },
            { label: 'Notes', to: '/blog' }
          ]} />

          <FooterCol title="Build" items={[
            { label: 'Free audit', to: '/free-audit', accent: true },
            { label: 'Trading tools', to: '/trading-tools' },
            { label: 'WhatsApp suite', to: '/whatsapp-automation' },
            { label: 'Custom software', to: '/services#software' },
            { label: 'Lead engines', to: '/services#leadgen' }
          ]} />

          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--text-on-ink-soft)', textTransform: 'uppercase', fontWeight: 500, marginBottom: 18 }}>
              Reach us
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <li>
                <a href={`tel:${company.phoneRaw}`} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-on-ink)', fontSize: 14, fontWeight: 500 }}>
                  <Phone size={14} /> {company.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-on-ink-soft)', fontSize: 14 }}>
                  <Mail size={14} /> {company.email}
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: 'var(--text-on-ink-soft)', fontSize: 14, lineHeight: 1.6 }}>
                <MapPin size={14} style={{ marginTop: 3, flexShrink: 0 }} />
                <span>India · remote<br />IST 9 AM – 9 PM · Mon – Sat</span>
              </li>
            </ul>
            <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
              {SOCIAL.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow Urban Cairn on ${s.label}`}
                  title={s.label}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    border: '1px solid var(--line-on-ink)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-on-ink-soft)',
                    transition: 'background 160ms ease, color 160ms ease, border-color 160ms ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-on-ink-soft)'; e.currentTarget.style.borderColor = 'var(--line-on-ink)'; }}
                >
                  <s.Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* SEO link strips */}
        <div style={{ paddingTop: 32, paddingBottom: 24, borderTop: '1px solid var(--line-on-ink)', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--text-on-ink-soft)', textTransform: 'uppercase', marginRight: 8 }}>We work in →</span>
            {[
              ['Anand', 'anand'], ['Vadodara', 'vadodara'], ['Ahmedabad', 'ahmedabad'], ['Surat', 'surat'],
              ['Mumbai', 'mumbai'], ['Pune', 'pune'], ['Bangalore', 'bangalore'], ['Delhi NCR', 'delhi-ncr'],
              ['Hyderabad', 'hyderabad'], ['Jaipur', 'jaipur']
            ].map(([n, s]) => (
              <Link key={s} to={`/in/${s}`} style={{ fontSize: 12, color: 'var(--text-on-ink-soft)', padding: '4px 10px', borderRadius: 'var(--r-pill)', border: '1px solid var(--line-on-ink)' }}>{n}</Link>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--text-on-ink-soft)', textTransform: 'uppercase', marginRight: 8 }}>Built for →</span>
            {[
              ['Real estate', 'real-estate'], ['Healthcare', 'healthcare'], ['Education', 'education'],
              ['E-commerce', 'ecommerce'], ['Trading', 'trading'], ['Manufacturing', 'manufacturing']
            ].map(([n, s]) => (
              <Link key={s} to={`/for/${s}`} style={{ fontSize: 12, color: 'var(--text-on-ink-soft)', padding: '4px 10px', borderRadius: 'var(--r-pill)', border: '1px solid var(--line-on-ink)' }}>{n}</Link>
            ))}
          </div>
        </div>

        {/* Big wordmark display */}
        <div style={{
          padding: '48px 0',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="h-display" style={{
            fontSize: 'clamp(4rem, 16vw, 14rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.12)',
            letterSpacing: '-0.06em', lineHeight: 0.85, textAlign: 'center'
          }}>
            urban<span className="serif-italic" style={{ WebkitTextStroke: '0', color: 'rgba(255,90,31,0.15)' }}>cairn</span>
          </div>
        </div>

        {/* Fine print */}
        <div style={{
          paddingTop: 24, borderTop: '1px solid var(--line-on-ink)',
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap',
          gap: 16, fontSize: 12, color: 'var(--text-on-ink-soft)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em'
        }}>
          <span>© {new Date().getFullYear()} URBAN CAIRN TECH SOLUTION</span>
          <span>UDYAM-GJ-03-0077762 · GSTIN 24ETKPD1689B1ZU · INDIA</span>
          <span style={{ display: 'inline-flex', gap: 16 }}>
            <Link to="/privacy" style={{ color: 'var(--text-on-ink-soft)' }}>PRIVACY</Link>
            <Link to="/terms" style={{ color: 'var(--text-on-ink-soft)' }}>TERMS</Link>
            <Link to="/audit-checklist" style={{ color: 'var(--text-on-ink-soft)' }}>FREE PDF</Link>
          </span>
        </div>
      </div>

      <style>{`
        footer a:hover { color: var(--accent) !important; }
        @media (max-width: 992px) {
          .footer-top { grid-template-columns: 1fr !important; gap: 32px !important; }
          .footer-body { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 600px) {
          .footer-body { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
};

const FooterCol = ({ title, items }) => (
  <div>
    <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', color: 'var(--text-on-ink-soft)', textTransform: 'uppercase', fontWeight: 500, marginBottom: 18 }}>{title}</h4>
    <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {items.map(i => (
        <li key={i.to}>
          <Link to={i.to} style={{
            color: i.accent ? 'var(--accent)' : 'var(--text-on-ink)',
            fontSize: 14, fontWeight: i.accent ? 600 : 500,
            display: 'inline-flex', alignItems: 'center', gap: 4
          }}>
            {i.label}
            {i.accent && <ArrowUpRight size={13} />}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
