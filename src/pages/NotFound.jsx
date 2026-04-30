import { Link } from 'react-router-dom';
import { ArrowUpRight, Home } from 'lucide-react';
import SEO from '../components/SEO';
import Mark from '../components/Mark';

const NotFound = () => (
  <>
    <SEO title="404 — Page not found" description="The page you're looking for doesn't exist. Let's get you back on track." path="/404" />

    <section style={{ minHeight: 'calc(100vh - var(--header-h))', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      <div className="gradient-mesh" style={{ opacity: 0.4 }} />
      <div className="container" style={{ position: 'relative', textAlign: 'center', maxWidth: 720 }}>
        <Mark size={56} />
        <div className="t-eyebrow" style={{ marginTop: 24, justifyContent: 'center' }}>Error 404</div>
        <h1 className="h-display" style={{ fontSize: 'clamp(3rem, 9vw, 7rem)', marginTop: 18, marginBottom: 24, lineHeight: 0.94 }}>
          Page not <span className="serif-italic" style={{ color: 'var(--accent)' }}>shipped yet.</span>
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', color: 'var(--text-soft)', maxWidth: 540, margin: '0 auto 36px', lineHeight: 1.6 }}>
          The page you're looking for doesn't exist — maybe a typo, maybe an old link. Either way, here's a path back.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary"><Home size={16} /> Back home</Link>
          <Link to="/free-audit" className="btn btn-accent">Claim free audit <ArrowUpRight size={16} /></Link>
        </div>

        <div style={{ marginTop: 80, paddingTop: 36, borderTop: '1px solid var(--line)', display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', fontSize: 14 }}>
          <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Try instead</span>
          {[
            ['Work', '/portfolio'],
            ['Services', '/services'],
            ['Process', '/process'],
            ['Studio', '/about'],
            ['Contact', '/contact']
          ].map(([l, h]) => (
            <Link key={h} to={h} style={{ color: 'var(--text-soft)', fontWeight: 500 }}>{l} →</Link>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default NotFound;
