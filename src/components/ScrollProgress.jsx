import { motion, useScroll, useSpring } from 'framer-motion';

// Top-of-page thin progress bar that fills as the user scrolls.
// Uses framer-motion's useScroll → useSpring for smooth easing.

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 28, mass: 0.4 });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: 2,
        background: 'linear-gradient(90deg, #FF5A1F 0%, #FF8A4C 50%, #FFD27D 100%)',
        transformOrigin: '0% 50%',
        scaleX,
        zIndex: 1000,
        boxShadow: '0 0 12px rgba(255,90,31,0.45)',
        pointerEvents: 'none'
      }}
    />
  );
};

export default ScrollProgress;
