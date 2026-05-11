import { Link } from 'react-router-dom';
import { Printer, ArrowUpRight, Check } from 'lucide-react';
import SEO from '../components/SEO';
import Mark from '../components/Mark';
import { company } from '../data/company';

const sections = [
  {
    title: '01 · Speed & Core Web Vitals',
    items: [
      'Lighthouse mobile score 90+ (Performance category)',
      'Largest Contentful Paint (LCP) under 2.5 seconds',
      'Cumulative Layout Shift (CLS) under 0.1',
      'Interaction to Next Paint (INP) under 200ms',
      'Hero image preloaded; below-fold images lazy-loaded',
      'WebP/AVIF used; no PNG/JPG larger than 200KB',
      'JavaScript code-split by route; initial JS under 200KB gzipped'
    ]
  },
  {
    title: '02 · Mobile UX',
    items: [
      'Responsive across 375px, 768px, 1024px, 1440px',
      'All tap targets at least 44×44px',
      'No horizontal scroll on any viewport',
      'Forms usable without zooming',
      'Click-to-call and click-to-WhatsApp buttons visible on mobile',
      'Sticky bottom action bar on mobile (CTA always reachable)'
    ]
  },
  {
    title: '03 · Conversion architecture',
    items: [
      'Primary CTA visible above the fold on every page',
      'Single primary action (no choice paralysis between 3+ buttons)',
      'Multi-step lead form (3 short steps beats 1 long form)',
      'Form submits to email + WhatsApp (Indian customers prefer WhatsApp)',
      'Trust signals near every CTA (MSME badge, client logos, testimonials)',
      'Exit-intent capture for first-time visitors',
      'Sticky CTA appears after 60% scroll depth'
    ]
  },
  {
    title: '04 · SEO foundation',
    items: [
      'Unique <title> and <meta description> per page',
      'One H1 per page; semantic H2/H3 hierarchy',
      'Canonical URL declared on every page',
      'Open Graph + Twitter Card meta with 1200×630 image',
      'JSON-LD schema: LocalBusiness + WebSite + (BreadcrumbList per route)',
      'sitemap.xml present and submitted to Google Search Console',
      'robots.txt references the sitemap',
      'All deep links return HTTP 200 (not 404 with SPA fallback)',
      'Geo meta tags (region, lat/lng) for local search',
      'Internal linking from home → services → case studies → contact'
    ]
  },
  {
    title: '05 · Trust & credibility',
    items: [
      'Real founder name + photo + LinkedIn link',
      'Real client logos (or marquee with real partner names)',
      'At least 3 detailed testimonials with name + role + result metric',
      'Case studies with actual before/after numbers',
      'MSME / Udyam / GST badge visible in footer',
      'Privacy Policy + Terms of Service pages (legal hygiene)',
      'Working hours, NAP (Name/Address/Phone) consistent everywhere'
    ]
  },
  {
    title: '06 · Analytics & measurement',
    items: [
      'Google Analytics 4 installed (with conversion events)',
      'Microsoft Clarity for heatmaps + session recordings',
      'Form submit, WhatsApp click, call click tracked as events',
      'Goals/conversions configured in GA4',
      'Search Console verified + sitemap submitted',
      'Monthly review of top pages, bounce rate, conversion rate'
    ]
  },
  {
    title: '07 · Lead nurture',
    items: [
      'Welcome email auto-sends within 5 minutes of form submit',
      'Lead routed to CRM with source attribution',
      'WhatsApp deep-link with pre-filled context message',
      'Calendar booking option (Calendly / Cal.com) for instant scheduling',
      'Follow-up sequence (3-5 touches) for unconverted leads',
      'Newsletter sign-up in footer for slow-cycle nurture'
    ]
  },
  {
    title: '08 · Content & topical authority',
    items: [
      'At least 3 pillar blog posts (1500+ words each)',
      'Blog has category pages, related posts, table of contents',
      'Programmatic city/industry pages for long-tail capture',
      'New content shipped at least monthly',
      'Internal links between blog posts and service pages',
      'BlogPosting schema on every article'
    ]
  },
  {
    title: '09 · Off-page authority',
    items: [
      'Listed on Google Business Profile (verified)',
      'Listed on Justdial, Sulekha, IndiaMART (Indian directories)',
      'Listed on Clutch.co or GoodFirms (B2B)',
      'LinkedIn company page complete + active',
      'YouTube short-demo videos embedded back into site',
      '3+ guest posts on relevant publications'
    ]
  },
  {
    title: '10 · Accessibility & code quality',
    items: [
      'Semantic HTML (header/main/footer/nav/article)',
      'ARIA labels on icon-only buttons',
      'Color contrast meets WCAG AA on all text',
      'Keyboard navigation works on every interactive element',
      'Reduced-motion media query respected',
      'No console errors on production'
    ]
  },
  {
    title: '11 · Security & resilience',
    items: [
      'HTTPS everywhere (no mixed content)',
      'Security headers (HSTS, X-Frame-Options, CSP basics)',
      'Form spam protection (honeypot or hCaptcha)',
      '404 page is designed (not browser default)',
      'Backups of code, content, database, credentials',
      'Email + DNS configured with SPF/DKIM/DMARC for deliverability'
    ]
  },
  {
    title: '12 · Brand & differentiation',
    items: [
      'Original logo (not a stock or AI-generated mark)',
      'Distinctive primary color outside the over-used Indian agency palette',
      'Custom typography combination (not just system defaults)',
      'Editorial photography or device mockups (not stock photos)',
      'Voice + tone consistent across pages, blog, emails',
      'Brand-of-one positioning ("studio for X" beats "agency that does Y")'
    ]
  }
];

const AuditChecklist = () => (
  <>
    <SEO title="12-point website audit checklist (free)" description="A printable, copy-friendly 12-point checklist for evaluating a website's speed, conversion, SEO, trust, and accessibility. Free download." path="/audit-checklist" />

    <article style={{ padding: 'clamp(60px, 8vw, 120px) 0 var(--section-y)' }} className="audit-doc">
      <div className="container-narrow">
        <div className="hide-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 36 }}>
          <span className="t-eyebrow">Free download</span>
          <button onClick={() => window.print()} className="btn btn-primary">
            <Printer size={16} /> Save as PDF
          </button>
        </div>

        <header style={{ marginBottom: 48 }}>
          <Mark size={48} />
          <h1 className="h-display" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', marginTop: 22, marginBottom: 16, lineHeight: 0.98 }}>
            12-point website <span className="serif-italic" style={{ color: 'var(--accent)' }}>audit checklist.</span>
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--text-soft)', maxWidth: 640 }}>
            The same checklist we use when teardown-ing client websites in our free audit. Print it, screenshot it, share it with your team. Score yourself honestly — anything that fails is leaking pipeline.
          </p>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 14, letterSpacing: '0.04em' }}>
            URBAN CAIRN TECH SOLUTION · UDYAM-GJ-03-0077762 · GSTIN 24ETKPD1689B1ZU · ANAND, GUJARAT
          </p>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          {sections.map((s, i) => (
            <section key={i} style={{ pageBreakInside: 'avoid' }}>
              <h2 className="h-display" style={{ fontSize: 'clamp(1.3rem, 2.4vw, 1.7rem)', marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid var(--line)' }}>
                {s.title}
              </h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {s.items.map((it, j) => (
                  <li key={j} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{
                      width: 16, height: 16, marginTop: 4, flexShrink: 0,
                      border: '1.5px solid var(--text-soft)', borderRadius: 3
                    }} />
                    <span style={{ fontSize: 15, lineHeight: 1.55 }}>{it}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <footer style={{ marginTop: 64, paddingTop: 32, borderTop: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.6 }}>
            <strong>Got 8+ items unchecked?</strong> That's normal — and it's exactly what our free 45-minute strategy call helps you triage. Book here →
          </p>
          <div className="hide-print" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link to="/free-audit" className="btn btn-accent">Book free audit <ArrowUpRight size={16} /></Link>
            <a href={`https://wa.me/${company.whatsapp}?text=Hi!%20Need%20help%20fixing%20our%20website%20checklist.`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">WhatsApp us</a>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            © {new Date().getFullYear()} Urban Cairn Tech Solution · urbancairn1@gmail.com · +91 93135 60694
          </p>
        </footer>
      </div>
    </article>

    <style>{`
      @media print {
        .hide-print, header[role="banner"], footer, nav, .promo-strip, .mobile-dock { display: none !important; }
        .audit-doc { padding: 16px 0 !important; }
        .audit-doc h1 { font-size: 28pt !important; }
        .audit-doc h2 { font-size: 14pt !important; }
        .audit-doc li { font-size: 11pt !important; line-height: 1.5 !important; }
        body { background: #fff !important; }
      }
    `}</style>
  </>
);

export default AuditChecklist;
