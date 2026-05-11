import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// Wraps page content with a fade + small slide transition.
// Each page export should render <PageTransition>...</PageTransition> at top level,
// OR App-level: wrap <Routes> children inside this via location.pathname key.

const PageTransition = ({ children }) => {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
