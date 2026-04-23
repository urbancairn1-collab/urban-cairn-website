import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Monitor, Smartphone, Globe, Shield, Zap, TrendingUp, Code, Database, ChevronRight, Star } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '80px',
        overflow: 'hidden'
      }}>
        {/* Animated Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #050505 100%)',
          zIndex: -2
        }} />
        <div className="grid-bg" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          zIndex: -1,
          opacity: 0.5
        }} />
        <motion.div 
          className="animate-float"
          style={{
            position: 'absolute',
            top: '20%',
            right: '10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0) 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            zIndex: -1
          }} 
        />
        <motion.div 
          className="animate-float"
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '5%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 70%)',
            borderRadius: '50%',
            filter: 'blur(30px)',
            zIndex: -1,
            animationDelay: '2s'
          }} 
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            style={{ maxWidth: '800px' }}
          >
            <motion.div variants={fadeInUp} style={{ 
              display: 'inline-block',
              padding: '8px 16px',
              background: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '20px',
              color: 'var(--gold-primary)',
              fontSize: '0.9rem',
              fontWeight: 500,
              marginBottom: '20px',
              letterSpacing: '1px'
            }}>
              INNOVATING THE FUTURE
            </motion.div>
            <motion.h1 variants={fadeInUp} style={{ 
              fontSize: 'clamp(3rem, 6vw, 5rem)', 
              lineHeight: 1.1, 
              marginBottom: '20px',
              letterSpacing: '-1px'
            }}>
              We Build <span className="gold-text">Digital Power</span> For Your Business
            </motion.h1>
            <motion.p variants={fadeInUp} style={{ 
              fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', 
              color: 'var(--text-secondary)',
              marginBottom: '40px',
              maxWidth: '600px',
              lineHeight: 1.6
            }}>
              Software, Websites, Hosting & Marketing Solutions designed for the modern era. We transform your ideas into premium digital reality.
            </motion.p>
            <motion.div variants={fadeInUp} style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-primary btn-glow" style={{ padding: '16px 36px', fontSize: '1.1rem' }}>
                Get Started
              </Link>
              <Link to="/services" className="btn btn-outline" style={{ padding: '16px 36px', fontSize: '1.1rem' }}>
                Explore Services
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section" style={{ background: '#0a0a0a' }}>
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-4"
          >
            <h2 className="section-title">Premium <span className="gold-text">Services</span></h2>
            <p className="section-subtitle">Comprehensive IT solutions tailored to elevate your business in the digital landscape.</p>
          </motion.div>

          <div className="grid grid-cols-3">
            {[
              { icon: <Code size={32} />, title: 'Software Development', desc: 'Custom software solutions built with cutting-edge technologies to streamline your operations.' },
              { icon: <Globe size={32} />, title: 'Web Development', desc: 'Stunning, high-performance websites and web applications that captivate and convert.' },
              { icon: <TrendingUp size={32} />, title: 'Digital Marketing', desc: 'Data-driven marketing strategies and advertising to accelerate your business growth.' },
              { icon: <Smartphone size={32} />, title: 'Mobile Apps', desc: 'Intuitive and engaging mobile applications for iOS and Android platforms.' },
              { icon: <Database size={32} />, title: 'Hosting Services', desc: 'Secure, blazing-fast, and reliable web hosting and cloud infrastructure.' },
              { icon: <Shield size={32} />, title: 'IT Consulting', desc: 'Expert guidance to navigate complex technological challenges and optimize your IT strategy.' }
            ].map((service, index) => (
              <motion.div 
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { delay: index * 0.1, duration: 0.5 } }
                }}
                className="glass-panel"
                style={{
                  padding: '40px 30px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(212, 175, 55, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--glass-border)';
                }}
              >
                <div style={{ color: 'var(--gold-primary)', marginBottom: '20px' }}>
                  {service.icon}
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '15px' }}>{service.title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.95rem' }}>{service.desc}</p>
                <Link to="/services" style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem', fontWeight: 500 }}>
                  Learn More <ChevronRight size={16} color="var(--gold-primary)" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section" style={{ position: 'relative', background: '#050505', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <div className="grid grid-cols-4 text-center">
            {[
              { num: '100+', label: 'Projects Delivered' },
              { num: '50+', label: 'Happy Clients' },
              { num: '5+', label: 'Years Experience' },
              { num: '24/7', label: 'Premium Support' }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <div style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#fff', marginBottom: '10px' }}>
                  {stat.num}
                </div>
                <div style={{ color: 'var(--gold-primary)', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.9rem' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ background: '#0a0a0a' }}>
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-4"
          >
            <h2 className="section-title">Client <span className="gold-text">Excellence</span></h2>
            <p className="section-subtitle">Don't just take our word for it. See what our partners say about our digital solutions.</p>
          </motion.div>

          <div className="grid grid-cols-3">
            {[1, 2, 3].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="glass-panel"
                style={{ padding: '40px 30px' }}
              >
                <div style={{ display: 'flex', gap: '5px', marginBottom: '20px' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="var(--gold-primary)" color="var(--gold-primary)" />)}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '30px', fontSize: '1rem', lineHeight: 1.7 }}>
                  "Urban Cairn Tech Solution completely transformed our digital presence. Their attention to detail and premium design approach helped us increase our conversions by over 150%."
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#222', border: '2px solid var(--gold-primary)' }}></div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Sarah Johnson</h4>
                    <span style={{ fontSize: '0.85rem', color: '#888' }}>CEO, TechFlow Inc</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ 
        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(5, 5, 5, 1) 100%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '3rem', marginBottom: '20px' }}
          >
            Ready to Build Your <span className="gold-text">Empire?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 40px auto', fontSize: '1.1rem' }}
          >
            Let's collaborate to create powerful digital solutions that set you apart from the competition.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/contact" className="btn btn-primary btn-glow" style={{ padding: '18px 40px', fontSize: '1.2rem' }}>
              Request a Quote
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
