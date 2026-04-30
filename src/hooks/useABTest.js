import { useEffect, useMemo, useState } from 'react';
import { trackEvent } from '../components/Analytics';

// Lightweight client-side A/B test. Persists assignment per visitor in localStorage,
// fires GA event on first exposure. Use for hero copy, CTA labels, etc.

export const useABTest = (testName, variants) => {
  const key = `ab_${testName}`;
  const [variant, setVariant] = useState(variants[0]);

  useEffect(() => {
    let chosen = localStorage.getItem(key);
    if (!chosen || !variants.includes(chosen)) {
      chosen = variants[Math.floor(Math.random() * variants.length)];
      localStorage.setItem(key, chosen);
      trackEvent('ab_assigned', { test: testName, variant: chosen });
    }
    setVariant(chosen);
  }, [testName]);

  return useMemo(() => ({
    variant,
    track: (eventName, params = {}) => trackEvent(eventName, { ...params, ab_test: testName, ab_variant: variant })
  }), [variant, testName]);
};
