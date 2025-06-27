import React from 'react';
import { motion } from 'framer-motion';

interface SentenceAnimateProps {
  text: string;
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      duration: 1,
      ease: 'easeInOut',
      staggerChildren: 0.2,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: -20, filter: 'blur(5px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5 } },
};

const SentenceAnimate: React.FC<SentenceAnimateProps> = ({ text }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="text-center"
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', rowGap: '0px' }}
    >
      {text.split(' ').map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          style={{ display: 'inline-block' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default SentenceAnimate;
