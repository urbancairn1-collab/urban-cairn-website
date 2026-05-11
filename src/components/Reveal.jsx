import { motion } from 'framer-motion';

// Drop-in scroll-reveal wrapper. Fades + slides up children when they enter viewport.
// Use <Reveal>...</Reveal> for single items. Use <Reveal stagger>...</Reveal> with
// <Reveal.Item> children for cascading reveals.

const variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] } }
};

const staggerVariants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};

const Reveal = ({ children, stagger = false, delay = 0, as = 'div', ...rest }) => {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
      variants={stagger ? staggerVariants : { ...variants, show: { ...variants.show, transition: { ...variants.show.transition, delay } } }}
      {...rest}
    >
      {children}
    </Comp>
  );
};

const Item = ({ children, as = 'div', ...rest }) => {
  const Comp = motion[as] || motion.div;
  return <Comp variants={variants} {...rest}>{children}</Comp>;
};

Reveal.Item = Item;

export default Reveal;
