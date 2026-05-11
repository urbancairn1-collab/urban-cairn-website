import { useEffect, useRef, useState } from 'react';

// Minimal cursor enhancement: native cursor stays visible throughout. A
// soft accent halo appears ONLY when hovering interactive elements
// (links, buttons, inputs) — gives the "premium tech studio" feel
// without overriding the user's mouse pointer at rest.
// Disabled on touch + when prefers-reduced-motion is set.

const CustomCursor = () => {
  const haloRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reduced) return;
    setEnabled(true);

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf = 0;
    let hovering = false;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };

    const tick = () => {
      rx += (mx - rx) * 0.22;
      ry += (my - ry) * 0.22;
      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e) => {
      const t = e.target;
      if (!haloRef.current) return;
      const hoverable = t.closest('a, button, [role="button"], input, textarea, label, [data-cursor]');
      const next = !!hoverable;
      if (next !== hovering) {
        hovering = next;
        haloRef.current.classList.toggle('on', next);
      }
    };
    const onLeave = () => {
      if (haloRef.current) haloRef.current.classList.remove('on');
      hovering = false;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;
  return <div ref={haloRef} className="cc-halo" aria-hidden="true" />;
};

export default CustomCursor;
