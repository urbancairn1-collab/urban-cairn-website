import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-title"
          >
            Get in <span className="gold-text">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-subtitle"
          >
            Ready to start your next big project? Contact us today for a free consultation and quote.
          </motion.p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid grid-cols-2" style={{ gap: '50px' }}>
          
          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
          >
            <div className="glass-panel" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Contact Information</h3>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--gold-primary)', flexShrink: 0 }}>
                  <Phone size={24} />
                </div>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '5px' }}>Call Us Directly</p>
                  <a href="tel:9313560694" style={{ fontSize: '1.2rem', fontWeight: 600 }}>+91 9313560694</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--gold-primary)', flexShrink: 0 }}>
                  <Mail size={24} />
                </div>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '5px' }}>Email Address</p>
                  <a href="mailto:urbancairn1@gmail.com" style={{ fontSize: '1.2rem', fontWeight: 600 }}>urbancairn1@gmail.com</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--gold-primary)', flexShrink: 0 }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '5px' }}>Office Location</p>
                  <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Anand, Gujarat, India</span>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="glass-panel" style={{ padding: '10px', height: '300px', overflow: 'hidden' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d117498.42878411037!2d72.87192621043343!3d22.563065306381014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e4e7e721516bd%3A0xc34664a3d4f40f0c!2sAnand%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1714023451234!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '8px' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel"
            style={{ padding: '40px' }}
          >
            <h3 style={{ fontSize: '1.8rem', marginBottom: '30px' }}>Send us a Message</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Full Name</label>
                <input type="text" placeholder="John Doe" className="form-input" />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email Address</label>
                <input type="email" placeholder="john@example.com" className="form-input" />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Phone Number</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" className="form-input" />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Your Message</label>
                <textarea placeholder="Tell us about your project..." rows="5" className="form-input" style={{ resize: 'vertical' }}></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-glow" style={{ width: '100%', marginTop: '10px', display: 'flex', gap: '10px', fontSize: '1.1rem', padding: '16px' }}>
                Send Message <Send size={20} />
              </button>
            </form>
          </motion.div>

        </div>
      </section>

      <style>{`
        .form-input {
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid var(--glass-border);
          padding: 15px 20px;
          border-radius: 8px;
          color: #fff;
          font-family: var(--font-body);
          font-size: 1rem;
          transition: all 0.3s ease;
          outline: none;
        }
        .form-input:focus {
          border-color: var(--gold-primary);
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.2);
        }
      `}</style>
    </div>
  );
};

export default Contact;
