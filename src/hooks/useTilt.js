import { useRef } from 'react';

// 3D-tilt hover effect for cards. Returns an object you spread on a JSX element:
// const tilt = useTilt({ max: 8 });
// <div {...tilt}>...</div>

export const useTilt = ({ max = 8, perspective = 800, scale = 1.02 } = {}) => {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * -2 * max; // up = positive tilt up
    const ry = (px - 0.5) *  2 * max;
    el.style.transform = `perspective(${perspective}px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`;
  };

  return {
    ref,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    style: { transition: 'transform 240ms cubic-bezier(0.32, 0.72, 0, 1)', transformStyle: 'preserve-3d', willChange: 'transform' }
  };
};
