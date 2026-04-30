import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { company } from '../data/company';
import { trackEvent } from './Analytics';

const SERVICE = import.meta.env.VITE_EMAILJS_SERVICE || 'service_urbancairn';
const TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE || 'template_lead';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC || 'YOUR_PUBLIC_KEY';

const businessTypes = [
  'Trading / Investing', 'Real Estate', 'Healthcare / Clinic',
  'E-commerce / Retail', 'Education / Coaching', 'Service business',
  'Manufacturing', 'Other'
];

const interests = [
  'Website', 'Mobile app', 'WhatsApp automation',
  'Custom software', 'Trading dashboard', 'Lead engine',
  'Not sure — need advice'
];

const LeadForm = ({ compact = false, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState('');
  const [d, setD] = useState({
    name: '', phone: '', email: '',
    businessType: '', interest: '', message: ''
  });

  const set = (k, v) => setD(p => ({ ...p, [k]: v }));

  const next = () => {
    setErr('');
    if (step === 1 && (!d.name.trim() || !d.phone.trim())) return setErr('Name and phone are required');
    if (step === 2 && (!d.businessType || !d.interest)) return setErr('Select both options');
    setStep(s => s + 1);
  };

  const submit = async (e) => {
    e.preventDefault();
    setErr(''); setSubmitting(true);
    const wa = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
      `Hi Urban Cairn! Lead form submission.\nName: ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email || '—'}\nBusiness: ${d.businessType}\nInterest: ${d.interest}\nDetails: ${d.message || '—'}`
    )}`;
    try {
      await emailjs.send(SERVICE, TEMPLATE, {
        from_name: d.name, from_phone: d.phone, from_email: d.email || 'not provided',
        business_type: d.businessType, interest: d.interest,
        message: d.message || 'No additional details', to_email: company.email
      }, PUBLIC_KEY);
    } catch (_) { /* fall through */ }
    setSuccess(true);
    trackEvent('lead_submit', {
      business_type: d.businessType,
      interest: d.interest,
      has_email: Boolean(d.email)
    });
    trackEvent('generate_lead', { value: 1, currency: 'INR' });
    onSuccess?.(d);
    setTimeout(() => window.open(wa, '_blank'), 800);
    setSubmitting(false);
  };

  if (success) return (
    <div style={{ textAlign: 'center', padding: '32px 8px' }}>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
        style={{
          width: 64, height: 64, borderRadius: '50%',
          background: 'var(--success)', color: 'white',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22
        }}
      >
        <Check size={28} strokeWidth={3} />
      </motion.div>
      <h3 className="h-display" style={{ fontSize: '1.6rem', marginBottom: 10 }}>
        Got it, {d.name.split(' ')[0]}.
      </h3>
      <p style={{ color: 'var(--text-soft)', fontSize: 15, lineHeight: 1.6, maxWidth: 360, margin: '0 auto 24px' }}>
        Opening WhatsApp now so you can finish the conversation directly with us.
      </p>
      <a href={`https://wa.me/${company.whatsapp}?text=Hi%20Urban%20Cairn!%20I%20just%20submitted%20a%20lead.`}
         target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
        Continue on WhatsApp
      </a>
    </div>
  );

  return (
    <form onSubmit={submit}>
      {/* Progress */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
        {[1, 2, 3].map(s => (
          <div key={s} style={{
            flex: 1, height: 3, borderRadius: 3,
            background: step >= s ? 'var(--accent)' : 'var(--line)',
            transition: 'all 320ms var(--ease)'
          }} />
        ))}
      </div>

      <div className="t-eyebrow" style={{ marginBottom: 12 }}>Step {step} of 3</div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }}>
            <h3 className="h-display" style={{ fontSize: compact ? '1.4rem' : '1.8rem', marginBottom: 6 }}>Tell us about you.</h3>
            <p style={{ color: 'var(--text-soft)', marginBottom: 22, fontSize: 14 }}>30 seconds. We won't spam you.</p>
            <div style={{ marginBottom: 14 }}>
              <label className="label">Your name</label>
              <input className="input" placeholder="Rahul Patel" value={d.name} onChange={e => set('name', e.target.value)} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label className="label">WhatsApp / phone</label>
              <input className="input" placeholder="+91 98XXXXXXXX" value={d.phone} onChange={e => set('phone', e.target.value)} />
            </div>
            <div>
              <label className="label">Email <span style={{ color: 'var(--text-faint)' }}>(optional)</span></label>
              <input className="input" type="email" placeholder="you@business.com" value={d.email} onChange={e => set('email', e.target.value)} />
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }}>
            <h3 className="h-display" style={{ fontSize: compact ? '1.4rem' : '1.8rem', marginBottom: 6 }}>Tell us about the business.</h3>
            <p style={{ color: 'var(--text-soft)', marginBottom: 22, fontSize: 14 }}>So we route you to the right person.</p>
            <div style={{ marginBottom: 22 }}>
              <label className="label">Business type</label>
              <Pills items={businessTypes} value={d.businessType} onChange={v => set('businessType', v)} />
            </div>
            <div>
              <label className="label">What do you need?</label>
              <Pills items={interests} value={d.interest} onChange={v => set('interest', v)} />
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }}>
            <h3 className="h-display" style={{ fontSize: compact ? '1.4rem' : '1.8rem', marginBottom: 6 }}>What's the biggest blocker?</h3>
            <p style={{ color: 'var(--text-soft)', marginBottom: 22, fontSize: 14 }}>Optional. Helps us prep the call.</p>
            <textarea className="textarea"
              placeholder="e.g. Site is fast but conversions are flat. Manual follow-ups eating 6 hours/week."
              value={d.message} onChange={e => set('message', e.target.value)} />
          </motion.div>
        )}
      </AnimatePresence>

      {err && <div style={{ color: '#dc2626', fontSize: 13, marginTop: 14 }}>{err}</div>}

      <div style={{ display: 'flex', gap: 8, marginTop: 28, justifyContent: 'space-between' }}>
        {step > 1
          ? <button type="button" onClick={() => setStep(s => s - 1)} className="btn btn-ghost btn-sm"><ArrowLeft size={16} /> Back</button>
          : <span />}
        {step < 3
          ? <button type="button" onClick={next} className="btn btn-accent">Continue <ArrowRight size={16} /></button>
          : <button type="submit" disabled={submitting} className="btn btn-accent">
              {submitting ? <><Loader2 size={16} className="spin" /> Sending</> : <>Get my audit <ArrowRight size={16} /></>}
            </button>}
      </div>

      <style>{`
        .spin { animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </form>
  );
};

const Pills = ({ items, value, onChange }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
    {items.map(t => (
      <button
        type="button"
        key={t}
        onClick={() => onChange(t)}
        style={{
          padding: '9px 16px', borderRadius: 'var(--r-pill)',
          border: '1px solid ' + (value === t ? 'var(--ink)' : 'var(--line)'),
          background: value === t ? 'var(--ink)' : 'var(--bg-pure)',
          color: value === t ? 'var(--bg-pure)' : 'var(--text)',
          fontSize: 13, fontWeight: 500, letterSpacing: '-0.005em',
          transition: 'all 180ms var(--ease)'
        }}
      >{t}</button>
    ))}
  </div>
);

export default LeadForm;
