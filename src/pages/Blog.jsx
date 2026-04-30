import { motion } from 'framer-motion';
import { Calendar, ArrowUpRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { posts } from '../data/posts';

const Blog = () => (
  <>
    <SEO path="/blog" />

    <section style={{ padding: 'clamp(80px, 10vw, 160px) 0 60px', position: 'relative', overflow: 'hidden' }}>
      <div className="gradient-mesh" style={{ opacity: 0.4 }} />
      <div className="container" style={{ position: 'relative', maxWidth: 980 }}>
        <span className="t-eyebrow">Notes</span>
        <h1 className="h-display" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', marginTop: 24, lineHeight: 0.92 }}>
          No-fluff <span className="serif-italic" style={{ color: 'var(--accent)' }}>insights.</span>
        </h1>
        <p style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)', color: 'var(--text-soft)', maxWidth: 640, lineHeight: 1.55, marginTop: 28 }}>
          Practical articles on web, automation, lead gen, and trading tools — written by people who actually ship.
        </p>
      </div>
    </section>

    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="grid grid-3">
          {posts.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.06 }}
            >
              <Link to={`/blog/${p.slug}`} className="card card-hover" style={{ display: 'block', overflow: 'hidden', height: '100%' }}>
                <div style={{ aspectRatio: '16/10', background: p.cover, position: 'relative' }}>
                  <span style={{
                    position: 'absolute', top: 16, left: 16,
                    padding: '5px 12px', borderRadius: 'var(--r-pill)',
                    background: 'rgba(255,255,255,0.95)', color: 'var(--ink)',
                    fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '0.05em'
                  }}>{p.category.toUpperCase()}</span>
                </div>
                <div style={{ padding: 24, display: 'flex', flexDirection: 'column', height: 'calc(100% - 0px)' }}>
                  <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--text-muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Calendar size={11} /> {p.date}</span>
                    <span>·</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Clock size={11} /> {p.readTime}</span>
                  </div>
                  <h3 className="h-display" style={{ fontSize: '1.2rem', marginBottom: 10, lineHeight: 1.25 }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.6, marginBottom: 16, flex: 1 }}>{p.excerpt}</p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>
                    Read <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default Blog;
