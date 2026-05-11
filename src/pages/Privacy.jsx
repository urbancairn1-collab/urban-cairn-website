import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { company } from '../data/company';

const Privacy = () => (
  <>
    <SEO title="Privacy policy" description="How Urban Cairn Tech Solution collects, uses, and protects your information." path="/privacy" />

    <article style={{ padding: 'clamp(60px, 8vw, 120px) 0 var(--section-y)' }}>
      <div className="container-narrow">
        <span className="t-eyebrow">Legal</span>
        <h1 className="h-display" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.4rem)', marginTop: 18, marginBottom: 18, lineHeight: 0.96 }}>
          Privacy <span className="serif-italic" style={{ color: 'var(--accent)' }}>policy.</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 13, marginBottom: 48, letterSpacing: '0.04em' }}>
          Last updated: 30 April 2026 · Effective immediately
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, fontSize: 16, lineHeight: 1.75, color: 'var(--text)' }}>
          <p>This Privacy Policy describes how <strong>Urban Cairn Tech Solution</strong> ("we", "our", "us"), a sole-proprietorship MSME registered in Gujarat, India (Udyam: {company.udyam} · GSTIN: {company.gstin}), collects, uses, and shares information about you when you visit this website or engage our services.</p>

          <Heading>1. What we collect</Heading>
          <p>We collect only what's necessary to respond to you and operate the site:</p>
          <List items={[
            'Contact details you submit through forms (name, phone, email, business type, project interest, optional message).',
            'Anonymized analytics — page views, device type, referrer, country/region — via Google Analytics and Microsoft Clarity (heatmaps, no personal video).',
            'Standard server logs (IP, user-agent, timestamp) retained briefly for security.'
          ]} />
          <p>We do not collect financial information, government IDs, biometric data, or sensitive personal information through this website.</p>

          <Heading>2. How we use it</Heading>
          <List items={[
            'To respond to your inquiry, schedule a strategy call, or send you a quote you requested.',
            'To improve site performance and user experience based on aggregated analytics.',
            'For invoicing and tax compliance once you become a paying client (GST records as required by Indian law).'
          ]} />

          <Heading>3. Cookies & analytics</Heading>
          <p>We use first-party preferences (e.g., promo strip dismissal, A/B variant assignment) stored in your browser's localStorage. Third-party analytics scripts (Google Analytics 4, Microsoft Clarity) load only if you continue browsing past the first page; you can block them via your browser's tracking-protection settings or opt-out tools (e.g., Google's Ads Settings).</p>

          <Heading>4. Sharing</Heading>
          <p>We do not sell your data. We share information only with:</p>
          <List items={[
            'Service providers we use to operate (EmailJS for form delivery, GitHub Pages for hosting, Calendly for scheduling, WhatsApp for direct messaging) — bound by their own privacy policies.',
            'Government / legal authorities when legally required (court orders, tax notices).'
          ]} />

          <Heading>5. WhatsApp messaging</Heading>
          <p>If you contact us via WhatsApp or click a "WhatsApp" button on the site, the conversation occurs on Meta's WhatsApp platform under their privacy terms. We log the conversation in our internal records for project context.</p>

          <Heading>6. Data retention</Heading>
          <p>We retain inquiry messages for up to 24 months unless you ask us to delete them. Project-related records (contracts, invoices, code repositories) are kept for the longer of (a) the duration of our engagement, or (b) the period required by Indian tax/MSME law.</p>

          <Heading>7. Your rights</Heading>
          <List items={[
            'Access — ask what we have about you.',
            'Correction — fix anything inaccurate.',
            'Deletion — ask us to delete your inquiry data (subject to legal retention).',
            'Withdrawal — opt out of any future contact.'
          ]} />
          <p>Email <a href={`mailto:${company.email}`} style={{ color: 'var(--accent)', fontWeight: 600 }}>{company.email}</a> with the subject "Privacy request" and we'll action it within 30 days.</p>

          <Heading>8. Security</Heading>
          <p>We use TLS for all data in transit, follow least-privilege access for credentials, and perform routine security reviews. No system is perfectly secure; if you believe your data has been compromised, contact us immediately.</p>

          <Heading>9. Children's data</Heading>
          <p>This site is not directed at children under 18. We do not knowingly collect data from minors.</p>

          <Heading>10. Changes</Heading>
          <p>We'll update this page when our practices change. Material changes will be announced on this page with a new "Last updated" date.</p>

          <Heading>11. Contact</Heading>
          <p>{company.name} · {company.founder} (proprietor) · {company.address.full} · <a href={`mailto:${company.email}`} style={{ color: 'var(--accent)', fontWeight: 600 }}>{company.email}</a> · {company.phone}</p>

          <p style={{ marginTop: 32, fontSize: 14, color: 'var(--text-muted)' }}>
            Related: <Link to="/terms" style={{ color: 'var(--accent)', fontWeight: 600 }}>Terms of Service</Link>
          </p>
        </div>
      </div>
    </article>
  </>
);

const Heading = ({ children }) => (
  <h2 className="h-display" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', marginTop: 28, marginBottom: 0, lineHeight: 1.25 }}>{children}</h2>
);

const List = ({ items }) => (
  <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
    {items.map((it, i) => (
      <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', marginTop: 12, flexShrink: 0 }} />
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

export default Privacy;
