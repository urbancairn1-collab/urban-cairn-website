import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, ShieldCheck, ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import LeadForm from '../components/LeadForm';
import { company } from '../data/company';
import { LinkedinIcon, InstagramIcon, XIcon, FacebookIcon, GithubIcon } from '../components/SocialIcons';

const WIcon = () => (
  <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const Contact = () => {
  return (
    <>
      <SEO title="Contact" description="Direct WhatsApp, call, or email. India-based · IST hours. We respond within 4 business hours." path="/contact" />

      <section style={{ padding: 'clamp(80px, 10vw, 160px) 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div className="gradient-mesh" style={{ opacity: 0.4 }} />
        <div className="container" style={{ position: 'relative', maxWidth: 980 }}>
          <span className="t-eyebrow">Reach us</span>
          <h1 className="h-display" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', marginTop: 24, lineHeight: 0.92 }}>
            Let's ship <span className="serif-italic" style={{ color: 'var(--accent)' }}>something.</span>
          </h1>
          <p style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)', color: 'var(--text-soft)', maxWidth: 640, lineHeight: 1.55, marginTop: 28 }}>
            45 minutes. Zero pressure. Either we're a fit and we ship something remarkable together — or we point you toward a better partner. Either way, you leave with clarity.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 48 }} className="ch-grid">
            {[
              { icon: Phone, label: 'Direct line', value: company.phone, href: `tel:${company.phoneRaw}`, sub: 'Mon-Sat · 10am-8pm IST' },
              { icon: WIcon, label: 'WhatsApp', value: company.phone, href: `https://wa.me/${company.whatsapp}`, sub: 'Fastest · 24/7', accent: 'var(--whatsapp)' },
              { icon: Mail, label: 'Email', value: company.email, href: `mailto:${company.email}`, sub: 'Within 4 business hours' },
              { icon: MapPin, label: 'Coverage', value: 'India · remote', href: '#hours', sub: company.address.timezone }
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.a
                  key={i}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="card card-hover"
                  style={{ padding: 24, display: 'block' }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 'var(--r-md)',
                    background: c.accent ? `${c.accent}15` : 'var(--bg-soft)',
                    color: c.accent || 'var(--accent)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 18
                  }}>
                    <Icon size={18} />
                  </div>
                  <div className="t-eyebrow" style={{ marginBottom: 6 }}>{c.label}</div>
                  <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 4 }}>{c.value}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.sub}</div>
                </motion.a>
              );
            })}
          </div>

          {/* Form + Map */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="ct">
            <div>
              <div className="card" style={{ padding: 'clamp(28px, 4vw, 44px)' }}>
                <h2 className="h-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', marginBottom: 8 }}>
                  Send a <span className="serif-italic" style={{ color: 'var(--accent)' }}>message.</span>
                </h2>
                <p style={{ color: 'var(--text-soft)', marginBottom: 32, fontSize: 15 }}>We respond within 4 business hours. Always.</p>
                <LeadForm compact />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{
                background: 'var(--ink)', color: 'var(--text-on-ink)',
                borderRadius: 'var(--r-lg)', padding: 'clamp(24px, 3vw, 36px)'
              }}>
                <ShieldCheck size={20} color="var(--accent)" />
                <h3 className="h-display" style={{ fontSize: '1.3rem', color: 'var(--text-on-ink)', margin: '14px 0 8px' }}>
                  Officially registered. Fully accountable.
                </h3>
                <p style={{ fontSize: 13, color: 'var(--text-on-ink-soft)', lineHeight: 1.6, marginBottom: 16 }}>
                  Government of India recognized · GST-compliant invoicing · Full legal accountability for every engagement.
                </p>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-on-ink-soft)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span>UDYAM: <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{company.udyam}</span></span>
                  <span>GSTIN: <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{company.gstin}</span></span>
                </div>
              </div>
              <div className="card" style={{ padding: 28 }} id="hours">
                <Clock size={20} color="var(--accent)" />
                <div className="t-eyebrow" style={{ marginTop: 14, marginBottom: 14 }}>Hours</div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
                  <li style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-soft)' }}>Mon - Fri</span><span style={{ fontWeight: 600 }}>10am - 8pm IST</span></li>
                  <li style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-soft)' }}>Saturday</span><span style={{ fontWeight: 600 }}>10am - 4pm IST</span></li>
                  <li style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-soft)' }}>Sunday</span><span style={{ color: 'var(--text-muted)' }}>WhatsApp only</span></li>
                </ul>
              </div>
              <div className="card" style={{ padding: 28 }}>
                <div className="t-eyebrow" style={{ marginBottom: 16 }}>Follow us</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {[
                    { label: 'LinkedIn', href: company.social.linkedin, Icon: LinkedinIcon },
                    { label: 'Instagram', href: company.social.instagram, Icon: InstagramIcon },
                    { label: 'X (Twitter)', href: company.social.twitter, Icon: XIcon },
                    { label: 'Facebook', href: company.social.facebook, Icon: FacebookIcon },
                    { label: 'GitHub', href: company.social.github, Icon: GithubIcon }
                  ].map(s => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow Urban Cairn on ${s.label}`}
                      title={s.label}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '8px 14px', borderRadius: 'var(--r-pill)',
                        border: '1px solid var(--line)', background: 'var(--bg-pure)',
                        fontSize: 13, fontWeight: 500, color: 'var(--ink)',
                        transition: 'background 160ms, color 160ms, border-color 160ms'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-pure)'; e.currentTarget.style.color = 'var(--ink)'; e.currentTarget.style.borderColor = 'var(--line)'; }}
                    >
                      <s.Icon size={14} />
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <style>{`
            @media (max-width: 920px) { .ct { grid-template-columns: 1fr !important; } }
            @media (max-width: 720px) { .ch-grid { grid-template-columns: 1fr 1fr !important; } }
            @media (max-width: 480px) { .ch-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </div>
      </section>
    </>
  );
};

export default Contact;
