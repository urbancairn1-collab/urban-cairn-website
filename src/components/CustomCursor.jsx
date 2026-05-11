import { useEffect, useRef, useState } from 'react';

// Trailing-dot cursor that expands into a ring when over links/buttons.
// Disabled on touch devices and when prefers-reduced-motion is set.

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add('custom-cursor-on');

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my; // ring eases toward mx,my
    let raf = 0;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e) => {
      const t = e.target;
      if (!ringRef.current || !dotRef.current) return;
      const hoverable = t.closest('a, button, [role="button"], input, textarea, label, [data-cursor]');
      if (hoverable) {
        ringRef.current.classList.add('hover');
        dotRef.current.classList.add('hover');
      } else {
        ringRef.current.classList.remove('hover');
        dotRef.current.classList.remove('hover');
      }
    };

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };
    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('custom-cursor-on');
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cc-dot" aria-hidden="true" />
      <div ref={ringRef} className="cc-ring" aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
