import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_ID = import.meta.env.VITE_GA_ID;
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID;

let initialised = false;

const initGA = () => {
  if (initialised || !GA_ID) return;
  initialised = true;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { send_page_view: false });
};

const initClarity = () => {
  if (!CLARITY_ID || window.clarity) return;
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1; t.src = `https://www.clarity.ms/tag/${i}`;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, 'clarity', 'script', CLARITY_ID);
};

const Analytics = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    initGA();
    initClarity();
  }, []);

  useEffect(() => {
    if (!GA_ID || !window.gtag) return;
    window.gtag('event', 'page_view', {
      page_path: pathname + search,
      page_location: window.location.href,
      page_title: document.title
    });
  }, [pathname, search]);

  return null;
};

export const trackEvent = (name, params = {}) => {
  if (window.gtag) window.gtag('event', name, params);
  if (window.clarity) window.clarity('event', name);
};

export default Analytics;
