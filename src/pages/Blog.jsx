import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogs = [
  {
    id: 1,
    title: 'Why Every Business Needs a Custom Website in 2026',
    excerpt: 'In today\'s digital-first world, a template website just doesn\'t cut it anymore. Discover how a custom web presence can exponentially increase your brand authority and conversion rates.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800',
    date: 'Apr 15, 2026',
    author: 'Urban Cairn Team',
    category: 'Web Development'
  },
  {
    id: 2,
    title: 'Top Digital Marketing Trends Dominating the Market',
    excerpt: 'From AI-driven ad campaigns to hyper-personalization, learn about the cutting-edge marketing strategies that are redefining customer acquisition.',
    image: 'https://images.unsplash.com/photo-1432888117426-146ac81ea006?auto=format&fit=crop&q=80&w=800',
    date: 'Mar 28, 2026',
    author: 'Marketing Desk',
    category: 'Digital Marketing'
  },
  {
    id: 3,
    title: 'How E-commerce is Exploding in the Indian Market',
    excerpt: 'The Indian e-commerce sector is experiencing unprecedented growth. Here is what you need to know to position your business for maximum profitability.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
    date: 'Feb 10, 2026',
    author: 'Industry Analyst',
    category: 'E-commerce'
  }
];

const Blog = () => {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-title"
          >
            Insights & <span className="gold-text">Updates</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-subtitle"
          >
            Stay ahead of the curve with our expert analysis, industry trends, and strategic digital insights.
          </motion.p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid grid-cols-3">
          {blogs.map((blog, idx) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              className="glass-panel"
              style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
            >
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Calendar size={14} color="var(--gold-primary)" /> {blog.date}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><User size={14} color="var(--gold-primary)" /> {blog.author}</span>
                </div>
                
                <span style={{ 
                  display: 'inline-block', 
                  padding: '4px 12px', 
                  background: 'rgba(212,175,55,0.1)', 
                  color: 'var(--gold-primary)', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem', 
                  marginBottom: '15px',
                  alignSelf: 'flex-start',
                  fontWeight: 500
                }}>
                  {blog.category}
                </span>

                <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', lineHeight: 1.4 }}>
                  <Link to="#" className="hover-gold">{blog.title}</Link>
                </h3>
                
                <p style={{ color: 'var(--text-secondary)', marginBottom: '25px', fontSize: '0.95rem', lineHeight: 1.6, flex: 1 }}>
                  {blog.excerpt}
                </p>

                <Link to="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-primary)', fontWeight: 600, fontSize: '0.95rem', marginTop: 'auto' }}>
                  Read Full Article <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <style>{`
        .hover-gold:hover {
          color: var(--gold-primary) !important;
        }
      `}</style>
    </div>
  );
};

export default Blog;
