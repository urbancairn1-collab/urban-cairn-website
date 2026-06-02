import { Link } from 'react-router-dom';
import { Globe, Smartphone, Zap, Code, TrendingUp, Users, ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import { services } from '../data/services';

// Maps the icon string on each service to its lucide component.
const ICONS = { Globe, Smartphone, Zap, Code, TrendingUp, Users };

// One-line, plain-English summary of each service so a first-time visitor
// understands the full offering within five seconds — the "what do they do?"
// answer, scannable and visual, right under the hero.
const BLURB = {
  websites: 'Fast, persuasive sites built to convert visitors into customers.',
  apps: 'Native iOS & Android apps your users actually keep.',
  automation: 'WhatsApp & workflow bots that handle the busywork 24/7.',
  software: 'Custom internal tools, ERPs & dashboards — owned, not rented.',
  trading: 'Live dashboards, scanners & Pine Script indicators for traders.',
  leadgen: 'Funnels that capture, qualify & route leads on autopilot.'
};

const WhatWeBuild = () => (
  <section className="section-sm" style={{ borderBottom: '1px solid var(--line)' }}>
    <div className="container">
      <Reveal>
        <span className="t-eyebrow">What we build</span>
        <h2 className="h-display" style={{ fontSize: 'clamp(1.9rem, 4vw, 3.2rem)', marginTop: 14, marginBottom: 14, maxWidth: '16ch' }}>
          Six things we do <span className="serif-italic" style={{ color: 'var(--accent)' }}>exceptionally well.</span>
        </h2>
        <p style={{ color: 'var(--text-soft)', fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', maxWidth: 560, marginBottom: 'clamp(32px, 4vw, 52px)' }}>
          Pick what your business needs today — combine them as you grow. Every build is judged on one thing: does it make you more money?
        </p>
      </Reveal>

      <div className="wwb-grid">
        {services.map((s, i) => {
          const Icon = ICONS[s.icon] || Globe;
          return (
            <Reveal key={s.id} delay={i * 0.06}>
              <Link to="/services" className="wwb-card" aria-label={s.title}>
                <span className="wwb-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.8} /></span>
                <h3 className="wwb-title">{s.title}</h3>
                <p className="wwb-blurb">{BLURB[s.id] || s.desc}</p>
                <span className="wwb-go" aria-hidden="true">Explore <ArrowUpRight size={15} /></span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default WhatWeBuild;
