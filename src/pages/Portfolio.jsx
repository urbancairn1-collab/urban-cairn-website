import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  { id: 1, title: 'Fintech Dashboard', category: 'Software', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Luxury Real Estate', category: 'Website', image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Premium Fashion Store', category: 'E-commerce', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'AI Marketing Campaign', category: 'Ads', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' },
  { id: 5, title: 'Healthcare Portal', category: 'Software', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800' },
  { id: 6, title: 'Corporate Branding', category: 'Website', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800' }
];

const categories = ['All', 'Website', 'Software', 'E-commerce', 'Ads'];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-title"
          >
            Our <span className="gold-text">Portfolio</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-subtitle"
          >
            Explore our premium projects and witness the digital excellence we deliver to our partners.
          </motion.p>

          {/* Filter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginBottom: '50px' }}
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: activeCategory === cat ? 'var(--gold-gradient)' : 'transparent',
                  color: activeCategory === cat ? '#000' : '#fff',
                  border: `1px solid ${activeCategory === cat ? 'transparent' : 'rgba(212, 175, 55, 0.5)'}`,
                  padding: '8px 24px',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  fontFamily: 'var(--font-heading)'
                }}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-3">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    aspectRatio: '4/3',
                    cursor: 'pointer',
                    group: 'true'
                  }}
                  className="portfolio-item"
                >
                  <img 
                    src={project.image} 
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    className="portfolio-img"
                  />
                  <div 
                    className="portfolio-overlay"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: '30px',
                      opacity: 0,
                      transition: 'opacity 0.3s ease'
                    }}
                  >
                    <span style={{ color: 'var(--gold-primary)', fontSize: '0.9rem', fontWeight: 500, marginBottom: '5px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                      {project.category}
                    </span>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{project.title}</h3>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--gold-primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#000' }}>
                        <ExternalLink size={20} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Inline styles for hover effects since React doesn't support complex hover selectors easily without CSS */}
          <style>{`
            .portfolio-item:hover .portfolio-img {
              transform: scale(1.1);
            }
            .portfolio-item:hover .portfolio-overlay {
              opacity: 1 !important;
            }
          `}</style>

        </div>
      </section>
    </div>
  );
};

export default Portfolio;
