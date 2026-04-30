import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, ArrowUpRight, Tag, User } from 'lucide-react';
import SEO from '../components/SEO';
import { getPost, posts } from '../data/posts';
import { SITE_URL } from '../data/seo';

const BlogPost = () => {
  const { slug } = useParams();
  const p = getPost(slug);
  if (!p) return <Navigate to="/blog" replace />;

  const idx = posts.findIndex(x => x.slug === slug);
  const next = posts[(idx + 1) % posts.length];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}/blog/${p.slug}`,
    headline: p.title,
    description: p.excerpt,
    datePublished: p.dateISO,
    dateModified: p.dateISO,
    author: { '@type': 'Person', name: p.author },
    publisher: { '@id': `${SITE_URL}/#organization` },
    keywords: p.keywords,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${p.slug}` }
  };

  return (
    <>
      <SEO
        title={p.title}
        description={p.excerpt}
        path={`/blog/${p.slug}`}
        keywords={p.keywords}
        type="article"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <article style={{ paddingTop: 32 }}>
        <div className="container-narrow">
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-soft)', fontSize: 14, marginBottom: 32, fontWeight: 500 }}>
            <ArrowLeft size={14} /> All notes
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', borderRadius: 'var(--r-pill)',
              background: 'var(--accent-tint)', color: 'var(--accent)',
              fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em'
            }}><Tag size={11} /> {p.category.toUpperCase()}</span>

            <h1 className="h-display" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.8rem)', marginTop: 22, marginBottom: 24, lineHeight: 1.04 }}>
              {p.title}
            </h1>

            <p style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.25rem)', color: 'var(--text-soft)', lineHeight: 1.55, marginBottom: 32, maxWidth: 720 }}>
              {p.excerpt}
            </p>

            <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center', fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><User size={12} /> {p.author}</span>
              <span>·</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Calendar size={12} /> {p.date}</span>
              <span>·</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Clock size={12} /> {p.readTime} read</span>
            </div>
          </motion.div>
        </div>

        <div style={{
          height: 240, marginTop: 48, marginBottom: 56,
          background: p.cover, position: 'relative'
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at center, transparent, rgba(10,10,15,0.18))'
          }} />
        </div>

        <div className="container-narrow" style={{ paddingBottom: 'var(--section-y)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, fontSize: 17, lineHeight: 1.75, color: 'var(--text)', maxWidth: 720 }}>
            {p.body.map((block, i) => {
              if (block.type === 'h2') return <h2 key={i} className="h-display" style={{ fontSize: 'clamp(1.7rem, 3vw, 2.2rem)', marginTop: 36, marginBottom: 4, lineHeight: 1.2 }}>{block.text}</h2>;
              if (block.type === 'h3') return <h3 key={i} className="h-display" style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.55rem)', marginTop: 22, marginBottom: 0, lineHeight: 1.3 }}>{block.text}</h3>;
              if (block.type === 'p') return <p key={i}>{block.text}</p>;
              if (block.type === 'list') return (
                <ul key={i} style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingLeft: 0 }}>
                  {block.items.map((it, j) => (
                    <li key={j} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', marginTop: 12, flexShrink: 0 }} />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              );
              if (block.type === 'cta') return (
                <div key={i} style={{
                  marginTop: 28, padding: 32, borderRadius: 'var(--r-lg)',
                  background: 'var(--ink)', color: 'var(--text-on-ink)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  flexWrap: 'wrap', gap: 16
                }}>
                  <p className="h-display" style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)', color: 'var(--text-on-ink)', margin: 0, maxWidth: 440 }}>{block.text}</p>
                  <Link to={block.to} className="btn btn-accent">{block.button} <ArrowUpRight size={16} /></Link>
                </div>
              );
              return null;
            })}
          </div>

          {/* Inline lead capture */}
          <div style={{
            marginTop: 64, padding: 'clamp(28px, 4vw, 44px)',
            background: 'var(--bg-soft)', borderRadius: 'var(--r-xl)',
            display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center'
          }} className="ip">
            <div>
              <span className="t-eyebrow">Free strategy call</span>
              <h3 className="h-display" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', marginTop: 12, lineHeight: 1.15 }}>
                Liked this? Get a <span className="serif-italic" style={{ color: 'var(--accent)' }}>custom plan for your business.</span>
              </h3>
            </div>
            <Link to="/free-audit" className="btn btn-accent btn-lg">Book the call <ArrowUpRight size={18} /></Link>
          </div>
        </div>

        {/* Next post */}
        <section className="section" style={{ background: 'var(--bg-soft)' }}>
          <div className="container-narrow">
            <span className="t-eyebrow">Read next</span>
            <Link to={`/blog/${next.slug}`} style={{ display: 'block', marginTop: 16 }}>
              <h3 className="h-display" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.6rem)', lineHeight: 1.15, color: 'var(--text)' }}>
                {next.title} <ArrowUpRight size={20} style={{ display: 'inline-block', verticalAlign: 'middle', color: 'var(--accent)' }} />
              </h3>
            </Link>
          </div>
        </section>

        <style>{`@media (max-width: 720px) { .ip { grid-template-columns: 1fr !important; } }`}</style>
      </article>
    </>
  );
};

export default BlogPost;
