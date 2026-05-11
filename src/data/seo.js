// Centralized per-route meta. Targets Indian SMB keywords.

const BASE_DESC = 'Urban Cairn — software studio for ambitious operators across India. Custom websites, WhatsApp automation, trading dashboards, and lead engines. Shipped in 14 days. Udyam + GST registered MSME.';

export const SITE_URL = 'https://urbancairn1-collab.github.io/urban-cairn-website';
export const SITE_NAME = 'Urban Cairn Tech Solution';

export const seoMap = {
  '/': {
    title: 'Urban Cairn — A studio for ambitious operators',
    description: 'Custom websites, WhatsApp automation, trading dashboards, and lead engines. Shipped in 14 days. India · remote, IST. Udyam + GST registered MSME.',
    keywords: 'website development india, software studio india, whatsapp automation india, trading dashboard, lead generation system, msme tech partner, custom software development'
  },
  '/about': {
    title: 'Studio · About Urban Cairn',
    description: 'A small, opinionated software studio founded by Rahulkumar Dhobi. Strategy-first, ROI-driven, fully accountable. India-based · IST hours · Udyam + GST registered MSME.',
    keywords: 'urban cairn studio, rahulkumar dhobi founder, software studio india, msme it company'
  },
  '/services': {
    title: 'Capabilities · What we ship',
    description: 'Six engines built to earn — high-converting websites, mobile apps, WhatsApp automation, custom software, trading dashboards, lead generation systems.',
    keywords: 'website development services, mobile app development india, business automation, custom software, trading tools, lead generation services'
  },
  '/portfolio': {
    title: 'Work · Real demos, real numbers',
    description: 'Trading dashboard +42% accuracy · Real estate +65% leads · Clinic -35% no-shows · E-commerce +48% sales · Education +60% admissions.',
    keywords: 'software case studies india, web development portfolio, trading dashboard demo, lead generation case study'
  },
  '/process': {
    title: 'Process · 14-day delivery',
    description: 'From first call to live system in 5 precise steps. 14 days. Fixed price. Full code ownership transferred.',
    keywords: '14 day website delivery, fast software development, project process, fixed price software'
  },
  '/contact': {
    title: 'Contact · Direct line to Rahul',
    description: 'Direct WhatsApp, call, or email. India-based · IST hours. We respond within 4 business hours. Udyam + GST registered MSME.',
    keywords: 'urban cairn contact, software developer india, web developer india, msme tech consultant'
  },
  '/blog': {
    title: 'Notes · Practical articles for builders',
    description: 'Practical, no-fluff articles on web, automation, lead generation, and trading tools — written by people who actually ship.',
    keywords: 'website blog india, automation guide, whatsapp business api, custom software tips'
  },
  '/free-audit': {
    title: 'Free strategy audit + 12-point website report (worth ₹10,000)',
    description: '45-min strategy call + 12-point website audit + live system demo. Worth ₹10,000. 8 free slots open this quarter. No obligation.',
    keywords: 'free website audit india, free strategy call, website teardown, free seo audit'
  },
  '/trading-tools': {
    title: 'Custom trading dashboards & tools',
    description: 'Custom trading dashboards, signal scanners, P&L trackers, and backtesting engines for active Indian traders. Live data, multi-broker, your edge.',
    keywords: 'custom trading dashboard india, p&l tracker, backtesting tool, zerodha custom dashboard, signal scanner, algo trading tools'
  },
  '/whatsapp-automation': {
    title: 'WhatsApp automation suite for Indian SMBs',
    description: 'Your fastest sales rep. 24/7. Auto-qualifying conversations, instant booking, payment links, CRM logging. Official WhatsApp Business API.',
    keywords: 'whatsapp automation india, whatsapp business api, whatsapp chatbot, lead automation whatsapp, whatsapp crm'
  }
};

export const getSeo = (path) => seoMap[path] || {
  title: 'Urban Cairn Tech Solution',
  description: BASE_DESC
};
