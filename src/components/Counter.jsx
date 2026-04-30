import { useEffect, useState, useRef } from 'react';

const Counter = ({ end, suffix = '', duration = 1800 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current) {
        triggered.current = true;
        if (typeof end !== 'number') return;
        const start = performance.now();
        const animate = (t) => {
          const p = Math.min((t - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.floor(end * eased));
          if (p < 1) requestAnimationFrame(animate);
          else setVal(end);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {typeof end === 'number' ? val : end}{suffix}
    </span>
  );
};

export default Counter;
