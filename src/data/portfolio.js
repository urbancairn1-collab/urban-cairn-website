// Project gallery — 12 buildable demos. `mock` selects a coded mockup (see components/mockups/Mock.jsx);
// `image` (optional, relative to BASE_URL) is a real photograph where one exists in /public.

export const portfolio = [
  {
    slug: 'enterprise-crm',
    title: 'Enterprise CRM',
    category: 'Software',
    mock: 'crm',
    metric: '+40% lead conversion',
    summary: 'Unified sales, support, and customer data into one accountable system.',
    challenge:
      'Customer data lived in spreadsheets, inboxes, and three disconnected tools. Sales had no pipeline visibility and leads slipped through the cracks.',
    solution:
      'A centralized CRM with automated lead capture, stage-based pipelines, task automation, and live dashboards — a single source of truth for the whole revenue team.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'WebSockets'],
    impact: ['+40% lead conversion', '60% less manual data entry', 'Full pipeline visibility'],
    benefits: ['One unified customer view', 'Automated follow-ups', 'Forecasting on real data'],
  },
  {
    slug: 'erp-platform',
    title: 'ERP Platform',
    category: 'Software',
    mock: 'dashboard',
    metric: '-35% operating cost',
    summary: 'Finance, inventory, HR, and procurement on one connected backbone.',
    challenge:
      'Departments ran on isolated software with duplicate data entry and month-end reconciliation taking days.',
    solution:
      'A modular ERP linking finance, inventory, HR, and procurement with role-based access, approvals, and real-time reporting.',
    stack: ['Next.js', 'NestJS', 'PostgreSQL', 'Docker'],
    impact: ['-35% operating cost', 'Real-time financials', 'Days to minutes reconciliation'],
    benefits: ['Cross-department clarity', 'Audit-ready records', 'Scales with headcount'],
  },
  {
    slug: 'school-management',
    title: 'School Management Software',
    category: 'Software',
    mock: 'dashboard',
    image: 'case/education-institute.jpg',
    metric: '+60% admin efficiency',
    summary: 'Admissions, attendance, fees, and parent communication in one portal.',
    challenge:
      'Manual attendance, paper fee receipts, and scattered parent communication overwhelmed staff and frustrated parents.',
    solution:
      'A full school ERP: online admissions, digital attendance, automated fee reminders, results, and a parent app with instant notifications.',
    stack: ['React', 'Express', 'MongoDB', 'Twilio'],
    impact: ['+60% admin efficiency', 'Online fee collection', 'Instant parent updates'],
    benefits: ['Less paperwork', 'Transparent to parents', 'Faster fee recovery'],
  },
  {
    slug: 'hospital-management',
    title: 'Hospital Management Software',
    category: 'Software',
    mock: 'dashboard',
    image: 'case/multi-clinic.jpg',
    metric: '-35% patient no-shows',
    summary: 'Appointments, records, billing, and pharmacy across multiple clinics.',
    challenge:
      'A multi-branch clinic group struggled with double-booked slots, paper records, and high no-show rates.',
    solution:
      'A HIPAA-minded hospital system: online appointments, digital patient records, automated reminders, billing, and pharmacy/inventory tracking.',
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'WhatsApp API'],
    impact: ['-35% no-shows', 'Unified patient records', 'Faster billing cycles'],
    benefits: ['Better patient experience', 'Branches in sync', 'Compliant data handling'],
  },
  {
    slug: 'ecommerce-platform',
    title: 'E-commerce Platform',
    category: 'Website',
    mock: 'mobile',
    image: 'case/ecommerce-store.jpg',
    metric: '+300% orders',
    summary: 'A modern storefront engineered for conversion and retention.',
    challenge:
      'A slow, clunky store with a 1% conversion rate and almost no repeat customers.',
    solution:
      'A blazing-fast storefront with smart search, one-page checkout, abandoned-cart recovery, and a loyalty program.',
    stack: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis'],
    impact: ['+300% orders', 'Higher conversion rate', 'Stronger retention'],
    benefits: ['Faster shopping', 'Recovered lost carts', 'Repeat-buyer loyalty'],
  },
  {
    slug: 'trading-dashboard',
    title: 'Trading Dashboard',
    category: 'Trading',
    mock: 'trading',
    image: 'case/trading-dashboard.jpg',
    metric: 'Real-time decisions',
    summary: 'Live market data, positions, and analytics in one cockpit.',
    challenge:
      'A trading desk juggled five screens and manual spreadsheets, losing precious seconds on every decision.',
    solution:
      'A unified, low-latency dashboard streaming live prices, P&L, option-chain analytics, and custom alerts.',
    stack: ['React', 'WebSockets', 'Python', 'TimescaleDB'],
    impact: ['Faster decisions', 'One-screen workflow', 'Professional analytics'],
    benefits: ['Less context-switching', 'Data-backed trades', 'Real-time alerts'],
  },
  {
    slug: 'trading-indicator-suite',
    title: 'Trading Indicator Suite',
    category: 'Trading',
    mock: 'trading',
    metric: 'Backtested signals',
    summary: 'Custom indicators and scanners encoding a desk’s strategy.',
    challenge:
      'A trader’s edge lived only in their head — impossible to scale or apply consistently.',
    solution:
      'A suite of custom indicators, a market scanner, and a backtesting engine that turn discretionary rules into repeatable signals.',
    stack: ['Python', 'Pandas', 'React', 'FastAPI'],
    impact: ['Repeatable signals', 'Validated by backtests', 'Automated scanning'],
    benefits: ['Consistent execution', 'Confidence in setups', 'Scans the whole market'],
  },
  {
    slug: 'restaurant-ordering-app',
    title: 'Restaurant Ordering App',
    category: 'Mobile',
    mock: 'mobile',
    metric: '+48% repeat orders',
    summary: 'QR dine-in ordering, delivery, and a kitchen display system.',
    challenge:
      'Phone orders were error-prone and the restaurant paid heavy commissions to aggregators.',
    solution:
      'A branded ordering app with QR table ordering, online payments, live order tracking, and a kitchen display — commission-free.',
    stack: ['React Native', 'Node.js', 'Stripe', 'Firebase'],
    impact: ['+48% repeat orders', 'Zero aggregator fees', 'Fewer order errors'],
    benefits: ['Own your customers', 'Higher margins', 'Smoother kitchen flow'],
  },
  {
    slug: 'real-estate-crm',
    title: 'Real Estate CRM',
    category: 'Software',
    mock: 'crm',
    image: 'case/real-estate.jpg',
    metric: '+65% qualified leads',
    summary: 'Capture, score, and nurture property leads automatically.',
    challenge:
      'Leads arrived from portals, ads, and walk-ins with no system to track or follow up — most went cold.',
    solution:
      'A real-estate CRM with multi-source lead capture, automated WhatsApp nurturing, site-visit scheduling, and agent dashboards.',
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'WhatsApp API'],
    impact: ['+65% qualified leads', 'Automated nurturing', 'No lead left cold'],
    benefits: ['Every lead followed up', 'Agents focused on closing', 'Clear attribution'],
  },
  {
    slug: 'manufacturing-erp',
    title: 'Manufacturing ERP',
    category: 'Software',
    mock: 'dashboard',
    metric: '+30% throughput',
    summary: 'Production planning, inventory, and shop-floor visibility.',
    challenge:
      'Production schedules lived on whiteboards; stock-outs and overproduction were constant.',
    solution:
      'A manufacturing ERP with BOM management, production planning, real-time inventory, and shop-floor dashboards.',
    stack: ['React', 'NestJS', 'PostgreSQL', 'IoT sensors'],
    impact: ['+30% throughput', 'Fewer stock-outs', 'Live shop-floor view'],
    benefits: ['Predictable production', 'Lean inventory', 'On-time delivery'],
  },
  {
    slug: 'inventory-management',
    title: 'Inventory Management System',
    category: 'Software',
    mock: 'dashboard',
    metric: '-28% stock waste',
    summary: 'Multi-warehouse stock, barcode flows, and smart reordering.',
    challenge:
      'Multiple warehouses, no real-time stock counts, and frequent expiry write-offs.',
    solution:
      'A barcode-driven inventory system with multi-warehouse tracking, low-stock alerts, and automated reorder suggestions.',
    stack: ['React', 'Express', 'MongoDB', 'Barcode SDK'],
    impact: ['-28% stock waste', 'Real-time counts', 'Automated reordering'],
    benefits: ['Accurate stock always', 'Less dead inventory', 'Faster fulfilment'],
  },
  {
    slug: 'business-automation',
    title: 'Business Automation Platform',
    category: 'AI',
    mock: 'dashboard',
    image: 'blog/automation.jpg',
    metric: '20+ hrs saved / week',
    summary: 'AI workflows that connect tools and remove manual busywork.',
    challenge:
      'Staff spent hours copying data between apps, sending the same emails, and chasing approvals.',
    solution:
      'An automation platform with AI workflows: auto data-sync, document generation, smart routing, and a no-code rule builder.',
    stack: ['Next.js', 'Python', 'OpenAI', 'Workflow engine'],
    impact: ['20+ hrs saved / week', 'Fewer manual errors', 'Faster approvals'],
    benefits: ['Teams freed up', 'Consistent processes', 'Scales without hiring'],
  },
  {
    slug: 'pine-indicators',
    title: 'Pine Trading Indicators',
    category: 'Trading',
    mock: 'pine',
    metric: 'Precise BUY / SELL signals',
    summary: 'In-house TradingView Pine Script indicator suite — trend, momentum, volatility, S&R, and signals.',
    challenge:
      'Traders drowned in lagging, noisy indicators that fired late and contradicted each other — no consistent, rule-based edge.',
    solution:
      'A custom Pine Script suite: an adaptive trend engine with dynamic bands, a momentum oscillator, a volatility regime filter, auto-plotted support/resistance, and a confluence signal layer that prints clean BUY / SELL arrows.',
    stack: ['Pine Script v5', 'TradingView', 'Backtesting'],
    impact: ['Cleaner, earlier signals', 'Fewer false triggers', 'Repeatable rule-based entries'],
    benefits: ['Accurate signals', 'Trend clarity', 'Lower-risk entries'],
  },
];

export const getProject = (slug) => portfolio.find((p) => p.slug === slug);
export const portfolioCategories = ['All', 'Website', 'Software', 'Mobile', 'Trading', 'AI'];
