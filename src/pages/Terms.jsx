import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { company } from '../data/company';

const Terms = () => (
  <>
    <SEO title="Terms of service" description="The agreement between you and Urban Cairn Tech Solution when you use this website or engage our services." path="/terms" />

    <article style={{ padding: 'clamp(60px, 8vw, 120px) 0 var(--section-y)' }}>
      <div className="container-narrow">
        <span className="t-eyebrow">Legal</span>
        <h1 className="h-display" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.4rem)', marginTop: 18, marginBottom: 18, lineHeight: 0.96 }}>
          Terms of <span className="serif-italic" style={{ color: 'var(--accent)' }}>service.</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 13, marginBottom: 48, letterSpacing: '0.04em' }}>
          Last updated: 30 April 2026 · Effective immediately
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, fontSize: 16, lineHeight: 1.75, color: 'var(--text)' }}>
          <p>By using this website or engaging <strong>{company.name}</strong> ("we", "our", "us") for any service, you agree to these Terms. If you don't agree, please don't use the site or engage us.</p>

          <Heading>1. Who we are</Heading>
          <p>{company.name} is a sole-proprietorship software studio in Gujarat, India, founded by {company.founder}. Officially registered as a Micro enterprise under the Government of India's Udyam framework (registration no. {company.udyam}) and registered under the Goods &amp; Services Tax Act (GSTIN: {company.gstin}).</p>

          <Heading>2. Use of this website</Heading>
          <List items={[
            'Don\'t scrape, mass-download, or attempt to reverse-engineer the site beyond reasonable browsing.',
            'Don\'t submit false information through forms.',
            'Don\'t use the site for any unlawful purpose.',
            'Content (case studies, sample mockups, written articles) is © Urban Cairn — re-use only with written permission.'
          ]} />

          <Heading>3. Services & engagement</Heading>
          <p>Each project we take on is governed by a separate written blueprint document and quote. That blueprint, once you approve it, forms the binding agreement between us and supersedes any prior conversation.</p>
          <List items={[
            'Free 45-minute strategy calls have no obligation on either side.',
            'Paid engagements begin only after written approval of the blueprint and the agreed advance payment.',
            'Scope changes after sign-off are quoted separately.'
          ]} />

          <Heading>4. Payments</Heading>
          <p>Standard schedule for projects: 40% advance, 40% at v1 staging, 20% at delivery. Larger or longer projects may be split into more milestones. All amounts in INR. GST will be charged at the applicable rate under GSTIN {company.gstin}. Invoices issued through our HDFC business account against the Udyam registration.</p>

          <Heading>5. Delivery & timelines</Heading>
          <p>Most projects deliver within 7-14 days; complex platforms within 3-6 weeks. Timelines start from the day of advance payment receipt and can shift if you delay feedback or input. We commit to clear communication: progress updates every 48 hours during build.</p>

          <Heading>6. Code & ownership</Heading>
          <p>On full payment, all source code, design assets, and credentials are transferred to you. We do not retain hidden control. We may reuse generic components, libraries, and architectural patterns for other clients (none of your business logic, content, or branding).</p>

          <Heading>7. Post-launch support</Heading>
          <p>30 days of free post-launch support is included with every project (bug fixes, deployment issues, minor adjustments). Beyond that, support is billed at retainer or hourly rates as agreed.</p>

          <Heading>8. Warranties & limitations</Heading>
          <p>We deliver custom software with reasonable care and skill. We don't warrant that the software is bug-free or uninterrupted. To the extent allowed by law, our total liability is limited to the fees you have paid us for the specific project giving rise to the claim. We are not liable for indirect or consequential losses (lost profits, lost data, business interruption).</p>

          <Heading>9. Confidentiality</Heading>
          <p>Anything you share that's reasonably understood as confidential (business strategy, customer data, internal docs) stays confidential. We sign separate NDAs on request. We may publicly mention you as a client unless you ask us not to.</p>

          <Heading>10. Termination</Heading>
          <p>Either party can end the engagement with 7 days written notice. You pay for work completed up to the termination date. We hand over partial deliverables and you are free to take them to another partner.</p>

          <Heading>11. Governing law & jurisdiction</Heading>
          <p>These Terms and any engagement we have with you are governed by the laws of India. Disputes are subject to the exclusive jurisdiction of courts in Anand district, Gujarat, India.</p>

          <Heading>12. Contact</Heading>
          <p>{company.name} · {company.founder} (proprietor) · {company.address.full} · <a href={`mailto:${company.email}`} style={{ color: 'var(--accent)', fontWeight: 600 }}>{company.email}</a> · {company.phone}</p>

          <p style={{ marginTop: 32, fontSize: 14, color: 'var(--text-muted)' }}>
            Related: <Link to="/privacy" style={{ color: 'var(--accent)', fontWeight: 600 }}>Privacy Policy</Link>
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

export default Terms;
