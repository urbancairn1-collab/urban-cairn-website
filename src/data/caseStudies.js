export const caseStudies = [
  {
    slug: 'trading-dashboard',
    industry: 'Trading Business',
    icon: 'TrendingUp',
    color: '#22c55e',
    headline: 'Custom Trading Dashboard',
    problem: 'No proper tracking of trades & performance. Manual P&L calculations taking hours every day. No way to see strategy-level performance.',
    solution: 'Built a real-time trading dashboard with live market data feed, automated P&L tracking, strategy backtesting engine, and performance reports broken down by setup type and market condition.',
    deliverables: ['Live market data integration', 'P&L tracker by strategy', 'Backtest engine', 'Risk metrics & drawdown tracking', 'Daily performance reports'],
    metrics: [
      { label: 'Trading Accuracy', value: '+42%', positive: true },
      { label: 'Profit Increase', value: '+28%', positive: true },
      { label: 'Time Saved Daily', value: '3 hrs', positive: true }
    ],
    timeline: '12 days',
    stack: ['React', 'Node.js', 'WebSocket', 'PostgreSQL'],
    chartData: [
      { month: 'Jan', before: 100, after: 100 },
      { month: 'Feb', before: 105, after: 118 },
      { month: 'Mar', before: 102, after: 132 },
      { month: 'Apr', before: 108, after: 145 },
      { month: 'May', before: 110, after: 162 },
      { month: 'Jun', before: 115, after: 178 }
    ]
  },
  {
    slug: 'real-estate',
    industry: 'Real Estate Company',
    icon: 'Home',
    color: '#f97316',
    headline: 'Lead Engine + CRM Automation',
    problem: 'Website was getting traffic but not generating leads. Follow-ups were manual, inconsistent, and hot enquiries went cold within 24 hours.',
    solution: 'Rebuilt the website around a high-converting funnel, added a lead capture system feeding directly into a CRM with automated WhatsApp + email follow-up sequences triggered the moment a lead came in.',
    deliverables: ['High-converting property landing pages', 'Lead capture multi-step form', 'CRM with auto-routing', 'WhatsApp + email follow-up sequences', 'Sales team dashboard'],
    metrics: [
      { label: 'Lead Increase', value: '+65%', positive: true },
      { label: 'Site Visits', value: '+40%', positive: true },
      { label: 'Response Time', value: '< 2 min', positive: true }
    ],
    timeline: '14 days',
    stack: ['React', 'Node.js', 'WhatsApp API', 'MongoDB'],
    chartData: [
      { month: 'Wk 1', before: 12, after: 12 },
      { month: 'Wk 2', before: 14, after: 22 },
      { month: 'Wk 3', before: 13, after: 31 },
      { month: 'Wk 4', before: 15, after: 38 }
    ]
  },
  {
    slug: 'multi-clinic',
    industry: 'Multi-Speciality Clinic',
    icon: 'Plus',
    color: '#a855f7',
    headline: 'Appointment & Patient Management System',
    problem: 'Appointments managed through phone calls and a register. High no-show rate, no follow-up reminders, no patient history available at the front desk.',
    solution: 'Custom appointment booking system with WhatsApp reminders, patient management module, and staff dashboard. Patients self-book, get auto-reminders, and the clinic can see history instantly.',
    deliverables: ['Online appointment booking', 'WhatsApp reminder automation', 'Patient records system', 'Doctor schedule manager', 'Front-desk dashboard'],
    metrics: [
      { label: 'Appointments', value: '+55%', positive: true },
      { label: 'No-Shows', value: '-35%', positive: false },
      { label: 'Front-desk time saved', value: '4 hrs/day', positive: true }
    ],
    timeline: '14 days',
    stack: ['React', 'Node.js', 'WhatsApp API', 'PostgreSQL'],
    chartData: [
      { month: 'M1', before: 100, after: 100 },
      { month: 'M2', before: 102, after: 125 },
      { month: 'M3', before: 105, after: 140 },
      { month: 'M4', before: 108, after: 155 }
    ]
  },
  {
    slug: 'ecommerce-store',
    industry: 'E-Commerce Store',
    icon: 'ShoppingCart',
    color: '#f59e0b',
    headline: 'Cart Recovery + Email Marketing',
    problem: 'Cart abandonment rate was over 70%. No email or SMS recovery system in place. Repeat-purchase rate was low because nobody was nurturing existing customers.',
    solution: 'Optimized the checkout flow, added abandoned cart recovery via email + WhatsApp, built customer segmentation, and set up automated email campaigns for repeat purchases.',
    deliverables: ['Checkout optimization', 'Abandoned cart sequence', 'Customer segmentation', 'Email marketing automation', 'Sales analytics dashboard'],
    metrics: [
      { label: 'Sales Increase', value: '+48%', positive: true },
      { label: 'Repeat Customers', value: '+30%', positive: true },
      { label: 'Cart Recovery', value: '22%', positive: true }
    ],
    timeline: '10 days',
    stack: ['Shopify', 'Klaviyo', 'WhatsApp API'],
    chartData: [
      { month: 'M1', before: 100, after: 100 },
      { month: 'M2', before: 104, after: 122 },
      { month: 'M3', before: 108, after: 138 },
      { month: 'M4', before: 112, after: 148 }
    ]
  },
  {
    slug: 'education-institute',
    industry: 'Education Institute',
    icon: 'GraduationCap',
    color: '#06b6d4',
    headline: 'Lead Management & Counselor Dashboard',
    problem: 'Lead follow-up was slow. Counselors had no system to track conversations, prioritize hot leads, or measure their own performance.',
    solution: 'Built a complete Lead Management System with auto-routing, follow-up sequences, and per-counselor performance dashboards. Hot leads are now contacted within 5 minutes.',
    deliverables: ['Lead management system', 'Auto-assignment to counselors', 'Follow-up automation', 'Counselor performance dashboard', 'Admission funnel analytics'],
    metrics: [
      { label: 'Admissions', value: '+60%', positive: true },
      { label: 'Counselor Productivity', value: '+25%', positive: true },
      { label: 'Lead Response', value: '< 5 min', positive: true }
    ],
    timeline: '14 days',
    stack: ['React', 'Node.js', 'PostgreSQL'],
    chartData: [
      { month: 'M1', before: 100, after: 100 },
      { month: 'M2', before: 105, after: 130 },
      { month: 'M3', before: 110, after: 150 },
      { month: 'M4', before: 115, after: 160 }
    ]
  }
];
