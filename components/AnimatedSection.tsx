import React from 'react';
import { motion } from 'framer-motion';
import { useLuxuryInView } from '../hooks/useAnimations';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

// Variants para animaciones de entrada
const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

// Variants para títulos con clip-path
const titleVariants = {
  hidden: {
    opacity: 0,
    clipPath: 'inset(100% 0 0 0)'
  },
  visible: {
    opacity: 1,
    clipPath: 'inset(0% 0 0 0)',
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

// Variants para imágenes con scale
const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 1.08
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  duration = 0.9 
}) => {
  const { ref, inView } = useLuxuryInView();

  return (
    <motion.section
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={sectionVariants}
      transition={{ delay, duration }}
    >
      {children}
    </motion.section>
  );
};

export const AnimatedTitle: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className = '', 
  delay = 0 
}) => {
  const { ref, inView } = useLuxuryInView();

  return (
    <motion.h2
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={titleVariants}
      transition={{ delay }}
    >
      {children}
    </motion.h2>
  );
};

export const AnimatedImage: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className = '', 
  delay = 0 
}) => {
  const { ref, inView } = useLuxuryInView();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={imageVariants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};
