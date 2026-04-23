import { motion } from 'framer-motion';
import { Code, Globe, Shield, Wrench, Database, ShoppingCart, TrendingUp, Cpu, CheckCircle2 } from 'lucide-react';

const servicesList = [
  {
    id: 'software',
    icon: <Code size={40} />,
    title: 'Software Development',
    desc: 'Custom software architecture engineered for scalability, security, and performance. We build enterprise-grade applications tailored to your exact business needs.',
    benefits: ['Increased operational efficiency', 'Custom workflows', 'High security standards'],
    useCases: ['ERP Systems', 'CRM Platforms', 'Custom SaaS Applications']
  },
  {
    id: 'web',
    icon: <Globe size={40} />,
    title: 'Web Development & Design',
    desc: 'Ultra-modern, responsive, and conversion-optimized websites. We craft digital experiences with premium aesthetics and lightning-fast loading speeds.',
    benefits: ['Enhanced brand perception', 'Higher conversion rates', 'SEO superiority'],
    useCases: ['Corporate Portals', 'Landing Pages', 'Web Applications']
  },
  {
    id: 'ecommerce',
    icon: <ShoppingCart size={40} />,
    title: 'E-commerce Solutions',
    desc: 'Robust digital storefronts designed to maximize sales. Secure payment gateways, inventory management, and seamless user experiences.',
    benefits: ['Global reach', 'Automated sales processes', 'Secure transactions'],
    useCases: ['Online Retail Stores', 'B2B Marketplaces', 'Subscription Platforms']
  },
  {
    id: 'marketing',
    icon: <TrendingUp size={40} />,
    title: 'Digital Advertising & Marketing',
    desc: 'Data-driven marketing campaigns that generate high-quality leads. We leverage advanced analytics and targeted strategies for maximum ROI.',
    benefits: ['Targeted audience reach', 'Measurable ROI', 'Brand awareness growth'],
    useCases: ['Social Media Ads', 'Search Engine Marketing', 'Content Strategies']
  },
  {
    id: 'hosting',
    icon: <Database size={40} />,
    title: 'Web Hosting Services',
    desc: 'Premium cloud infrastructure providing 99.9% uptime. Secure, scalable, and fully managed hosting environments for your critical applications.',
    benefits: ['Zero downtime', 'Automated backups', 'DDoS protection'],
    useCases: ['High-traffic Sites', 'Enterprise Applications', 'Secure Databases']
  },
  {
    id: 'consulting',
    icon: <Shield size={40} />,
    title: 'IT Consulting',
    desc: 'Strategic technology advisory to align your IT infrastructure with your business goals. We help you navigate digital transformation effortlessly.',
    benefits: ['Optimized IT spend', 'Future-proof technology stack', 'Risk mitigation'],
    useCases: ['Digital Transformation', 'Tech Stack Audits', 'Security Assessments']
  },
  {
    id: 'support',
    icon: <Wrench size={40} />,
    title: 'Software Support & Maintenance',
    desc: 'Comprehensive post-launch support to ensure your software remains secure, updated, and performs optimally at all times.',
    benefits: ['Continuous improvements', 'Bug fixes & patching', 'Performance monitoring'],
    useCases: ['Legacy System Updates', 'Ongoing App Maintenance', 'Security Patching']
  },
  {
    id: 'data',
    icon: <Cpu size={40} />,
    title: 'Data Processing & IT Services',
    desc: 'Advanced data handling and processing solutions. We turn raw data into actionable insights to drive informed business decisions.',
    benefits: ['Actionable business intelligence', 'Automated reporting', 'Data accuracy'],
    useCases: ['Big Data Analytics', 'Data Migration', 'Automated Workflows']
  }
];

const Services = () => {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-title"
          >
            Our <span className="gold-text">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-subtitle"
          >
            Comprehensive, high-end digital solutions engineered to accelerate your business growth and dominate the digital landscape.
          </motion.p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid grid-cols-2">
          {servicesList.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (idx % 2) * 0.2, duration: 0.5 }}
              className="glass-panel"
              style={{
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Decorative background glow */}
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: 0
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ color: 'var(--gold-primary)', marginBottom: '15px' }}>
                  {service.icon}
                </div>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>{service.title}</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '25px' }}>
                  {service.desc}
                </p>

                <div className="grid grid-cols-2" style={{ gap: '20px', marginTop: 'auto' }}>
                  <div>
                    <h4 style={{ color: '#fff', marginBottom: '10px', fontSize: '1rem' }}>Benefits</h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {service.benefits.map((benefit, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                          <CheckCircle2 size={16} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ color: '#fff', marginBottom: '10px', fontSize: '1rem' }}>Use Cases</h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {service.useCases.map((useCase, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold-primary)', marginTop: '8px', flexShrink: 0 }} />
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;
