import { BadgeCheck, ShieldCheck, FileCode2, UserRound } from 'lucide-react';
import Reveal from './Reveal';
import { company } from '../data/company';

// Honest, verifiable trust signals — real government registrations + the
// guarantees we actually stand behind. No invented client counts or logos:
// a brand-new studio earns trust through accountability and proof you can
// check, not numbers a visitor can't verify.
const CREDENTIALS = [
  {
    icon: BadgeCheck,
    label: 'Udyam (MSME) Registered',
    value: company.udyam,
    note: 'Government of India registered business'
  },
  {
    icon: ShieldCheck,
    label: 'GST Registered',
    value: company.gstin,
    note: 'Compliant, invoiced, on the record'
  },
  {
    icon: FileCode2,
    label: '100% Code Ownership',
    value: 'Transferred on delivery',
    note: 'You own every line — no lock-in, no rented platforms'
  },
  {
    icon: UserRound,
    label: 'Founder-Led',
    value: company.founder,
    note: 'You work directly with the engineer who builds it'
  }
];

const TrustCredentials = () => (
  <section className="section-sm" style={{ background: 'var(--bg-soft)', borderBottom: '1px solid var(--line)' }}>
    <div className="container">
      <Reveal>
        <span className="t-eyebrow">Credentials you can verify</span>
        <h2 className="h-display" style={{ fontSize: 'clamp(1.9rem, 4vw, 3.2rem)', marginTop: 14, marginBottom: 14, maxWidth: '18ch' }}>
          Real registration. <span className="serif-italic" style={{ color: 'var(--accent)' }}>Real accountability.</span>
        </h2>
        <p style={{ color: 'var(--text-soft)', fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', maxWidth: 600, marginBottom: 'clamp(32px, 4vw, 52px)' }}>
          A focused, founder-led studio — so you work directly with the person accountable for your build, never a sales layer. Everything below is verifiable.
        </p>
      </Reveal>

      <div className="cred-grid">
        {CREDENTIALS.map((c, i) => {
          const Icon = c.icon;
          return (
            <Reveal key={c.label} delay={i * 0.06}>
              <div className="cred-card">
                <span className="wwb-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.8} /></span>
                <span className="cred-label">{c.label}</span>
                <span className="cred-value">{c.value}</span>
                <span className="cred-note">{c.note}</span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default TrustCredentials;
