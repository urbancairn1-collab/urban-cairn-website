// Programmatic SEO data — city + industry combos.

export const cities = [
  { slug: 'anand', name: 'Anand', state: 'Gujarat', tone: 'home', context: 'our home base. Local-first delivery, in-person available, GST-compliant invoicing.' },
  { slug: 'vadodara', name: 'Vadodara', state: 'Gujarat', context: 'one of our most active markets — manufacturing, real-estate, healthcare clients.' },
  { slug: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', context: 'Gujarat\'s commercial capital — fintech, retail, and education clients we ship for.' },
  { slug: 'surat', name: 'Surat', state: 'Gujarat', context: 'textile, jewelry, and trading-business clients — high WhatsApp + e-commerce demand.' },
  { slug: 'mumbai', name: 'Mumbai', state: 'Maharashtra', context: 'fintech, real-estate, and finance professionals — we deliver remotely with weekly check-ins.' },
  { slug: 'pune', name: 'Pune', state: 'Maharashtra', context: 'IT services, startups, and education institutes — strong remote-collab market.' },
  { slug: 'bangalore', name: 'Bangalore', state: 'Karnataka', context: 'tech founders and startups — usually need custom dashboards and API-heavy builds.' },
  { slug: 'delhi-ncr', name: 'Delhi NCR', state: 'Delhi', context: 'service businesses, real-estate, and retail — high lead-gen / CRM demand.' },
  { slug: 'hyderabad', name: 'Hyderabad', state: 'Telangana', context: 'fast-scaling SMBs across pharma, education, and SaaS.' },
  { slug: 'jaipur', name: 'Jaipur', state: 'Rajasthan', context: 'tourism, retail, and education — strong e-commerce and lead-engine demand.' }
];

export const industries = [
  {
    slug: 'real-estate',
    name: 'Real estate',
    pains: ['Cold leads going dark within 24 hours', 'No CRM tracking, sales team flying blind', 'Property listings scattered across portals'],
    solution: 'High-converting property funnels with CRM-routed lead capture, WhatsApp follow-up automation, and a sales-team dashboard for accountability.',
    metric: '+65% leads in 60 days',
    sample: 'real-estate'
  },
  {
    slug: 'healthcare',
    name: 'Clinics & healthcare',
    pains: ['Manual appointment booking eating front-desk time', 'High no-show rate from missing reminders', 'No patient history at the front desk'],
    solution: 'Online appointment booking + WhatsApp reminders + patient management dashboard. Patients self-book, get reminded, history available instantly.',
    metric: '−35% no-shows',
    sample: 'multi-clinic'
  },
  {
    slug: 'education',
    name: 'Education & coaching',
    pains: ['Slow lead follow-up costing admissions', 'No counselor performance tracking', 'Manual enquiry forms with no qualification logic'],
    solution: 'Lead management system with auto-routing to counselors, automated follow-up sequences, and per-counselor performance dashboards.',
    metric: '+60% admissions',
    sample: 'education-institute'
  },
  {
    slug: 'ecommerce',
    name: 'E-commerce & retail',
    pains: ['Cart abandonment over 70%', 'No email or WhatsApp recovery system', 'Repeat-purchase rate flat — no nurture'],
    solution: 'Checkout optimization, abandoned-cart recovery via WhatsApp + email, customer segmentation, and automated repeat campaigns.',
    metric: '+48% sales',
    sample: 'ecommerce-store'
  },
  {
    slug: 'trading',
    name: 'Trading & finance',
    pains: ['Multi-broker P&L scattered across apps', 'No backtesting on your own strategies', 'Risk metrics computed manually in Excel'],
    solution: 'Custom dashboards with multi-broker sync, strategy-tagged P&L, backtesting engine, risk metrics — all real-time, your data on your server.',
    metric: '+42% trading accuracy',
    sample: 'trading-dashboard'
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing & MSMEs',
    pains: ['Inventory tracking through spreadsheets', 'Order management on WhatsApp groups', 'No real-time production visibility'],
    solution: 'Custom ERP with inventory tracking, order management, and live production dashboards — built around your actual workflow, not a SaaS template.',
    metric: '70%+ time saved on admin',
    sample: 'real-estate'
  }
];

export const getCity = (slug) => cities.find(c => c.slug === slug);
export const getIndustry = (slug) => industries.find(i => i.slug === slug);
