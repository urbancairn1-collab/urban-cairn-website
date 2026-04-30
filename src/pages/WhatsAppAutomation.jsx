import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bot, Calendar, CreditCard, Users, Send, Zap, ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import { Phone } from '../components/DeviceMockup';

const WhatsAppAutomation = () => (
  <>
    <SEO title="WhatsApp automation suite" description="Your fastest sales rep. 24/7. Books calls, sends payment links, never on leave." path="/whatsapp-automation" />

    <section style={{ padding: 'clamp(80px, 10vw, 160px) 0 60px', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(at 30% 0%, rgba(37,211,102,0.14), transparent 55%), radial-gradient(at 80% 80%, rgba(255,90,31,0.10), transparent 55%)',
        pointerEvents: 'none'
      }} />
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 60, alignItems: 'center' }} className="th">
          <div>
            <span className="t-eyebrow">WhatsApp suite</span>
            <h1 className="h-display" style={{ fontSize: 'clamp(2.6rem, 7vw, 6rem)', marginTop: 22, lineHeight: 0.94 }}>
              Your fastest sales rep. <br /><span className="serif-italic" style={{ color: 'var(--accent)' }}>Never sleeps.</span>
            </h1>
            <p style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)', color: 'var(--text-soft)', maxWidth: 540, lineHeight: 1.55, marginTop: 28, marginBottom: 32 }}>
              Automated qualifying, instant booking, payment links, CRM logging — on the channel your customers actually check. Bot + human handoff. 0.8s response times.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
              <Link to="/free-audit" className="btn btn-whatsapp btn-lg">Get a custom bot <ArrowUpRight size={18} /></Link>
              <Link to="/free-audit" className="btn btn-secondary btn-lg">See live demo</Link>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
              <span>OFFICIAL WHATSAPP API</span>
              <span>·</span>
              <span>GREEN-TICK READY</span>
              <span>·</span>
              <span>CRM SYNC</span>
            </div>
          </div>
          <div className="hide-mobile" style={{ display: 'flex', justifyContent: 'center' }}>
            <Phone>
              <ChatScene />
            </Phone>
          </div>
        </div>
        <style>{`@media (max-width: 920px) { .th { grid-template-columns: 1fr !important; } }`}</style>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div style={{ marginBottom: 56 }}>
          <span className="t-eyebrow">What it does</span>
          <h2 className="h-display" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', marginTop: 16, lineHeight: 1, maxWidth: 720 }}>
            Six superpowers <span className="serif-italic" style={{ color: 'var(--accent)' }}>your team gets.</span>
          </h2>
        </div>
        <div className="grid grid-3">
          {[
            { icon: Bot, title: 'Auto-qualify leads', desc: 'Smart conversational flow that asks the right questions, tags hot leads.' },
            { icon: Calendar, title: 'Calendar booking', desc: 'Customers pick slots, get confirmations. Synced with Google Calendar.' },
            { icon: CreditCard, title: 'Payment links', desc: 'Razorpay / UPI links inside the chat. Track who paid, who didn\'t.' },
            { icon: Users, title: 'Bot + human handoff', desc: 'Bot handles 80% of load. Complex queries escalate to your team seamlessly.' },
            { icon: Send, title: 'Bulk broadcasts', desc: 'WhatsApp-approved campaigns to your list — without getting banned.' },
            { icon: Zap, title: 'CRM auto-logging', desc: 'Every conversation, every detail logged. No manual entry, ever.' }
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card"
                style={{ padding: 28 }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 'var(--r-md)',
                  background: 'rgba(37,211,102,0.12)', color: 'var(--whatsapp)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18
                }}>
                  <Icon size={20} />
                </div>
                <h3 className="h-display" style={{ fontSize: 18, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.55 }}>{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    <section className="section" style={{ background: 'var(--ink)', color: 'var(--text-on-ink)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(37,211,102,0.18), transparent 60%)', pointerEvents: 'none' }} />
      <div className="container" style={{ position: 'relative' }}>
        <h2 className="h-display" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: 'var(--text-on-ink)', marginBottom: 24, lineHeight: 0.98, maxWidth: 720, marginInline: 'auto' }}>
          Stop missing leads <span className="serif-italic" style={{ color: 'var(--accent)' }}>at 11pm.</span>
        </h2>
        <Link to="/free-audit" className="btn btn-whatsapp btn-lg">Book free demo <ArrowUpRight size={18} /></Link>
      </div>
    </section>
  </>
);

const ChatScene = () => {
  const messages = [
    { from: 'u', t: 'Interested in your service' },
    { from: 'b', t: 'Welcome 👋 Business size?' },
    { from: 'u', t: '10-20 staff' },
    { from: 'b', t: 'Free call tomorrow 4 PM ✓' },
    { from: 'u', t: 'Done. Thanks!' },
    { from: 'b', t: 'Calendar invite sent ✨' }
  ];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ paddingTop: 38, paddingBottom: 12, paddingLeft: 16, paddingRight: 16, background: '#0FAB6F', color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#fff', color: '#0A0A0F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 11 }}>UC</div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600 }}>Urban Cairn</div>
          <div style={{ fontSize: 9, opacity: 0.85 }}>online · 0.8s avg</div>
        </div>
      </div>
      <div style={{ flex: 1, padding: 12, display: 'flex', flexDirection: 'column', gap: 6, background: '#ECE5DD' }}>
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: m.from === 'u' ? 12 : -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.18 }}
            style={{
              alignSelf: m.from === 'u' ? 'flex-end' : 'flex-start',
              background: m.from === 'u' ? '#DCF8C6' : '#fff',
              padding: '5px 9px', borderRadius: 8, fontSize: 9, color: '#0A0A0F', maxWidth: '78%'
            }}
          >{m.t}</motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhatsAppAutomation;
