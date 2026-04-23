import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Zap, Users } from 'lucide-react';

const About = () => {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      {/* Header */}
      <section className="section" style={{ textAlign: 'center', background: 'radial-gradient(circle at top, rgba(212, 175, 55, 0.1) 0%, transparent 60%)' }}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-title"
          >
            About <span className="gold-text">Urban Cairn</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-subtitle"
            style={{ maxWidth: '800px' }}
          >
            Urban Cairn Tech Solution is a modern IT and digital services company based in Gujarat, India. We empower businesses globally through innovative technology and strategic digital execution.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section" style={{ background: '#0a0a0a' }}>
        <div className="container grid grid-cols-2">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel"
            style={{ padding: '50px 40px', display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <Target size={40} color="var(--gold-primary)" />
            <h2 style={{ fontSize: '2rem' }}>Our Mission</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              To deliver high-end, scalable, and affordable digital solutions that bridge the gap between complex technology and business growth. We strive to be the ultimate growth partner for modern enterprises.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel"
            style={{ padding: '50px 40px', display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <Eye size={40} color="var(--gold-primary)" />
            <h2 style={{ fontSize: '2rem' }}>Our Vision</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              To emerge as a global leader in IT innovation, recognized for our premium quality, futuristic designs, and unwavering commitment to client success in an ever-evolving digital landscape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="section-title">Why <span className="gold-text">Choose Us</span></h2>
            <p className="section-subtitle">We don't just build software; we engineer digital experiences.</p>
          </div>

          <div className="grid grid-cols-3">
            {[
              { icon: <Zap size={32} />, title: 'Lightning Fast', desc: 'Optimized performance and rapid delivery cycles.' },
              { icon: <ShieldCheck size={32} />, title: 'Premium Quality', desc: 'Uncompromising standards in design and code.' },
              { icon: <Users size={32} />, title: 'Dedicated Support', desc: 'Round-the-clock assistance and maintenance.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  padding: '40px 30px',
                  borderRadius: '16px',
                  textAlign: 'center'
                }}
              >
                <div style={{ display: 'inline-flex', padding: '15px', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '50%', color: 'var(--gold-primary)', marginBottom: '20px' }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '15px' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
