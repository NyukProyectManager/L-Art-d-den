import { useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useMemo, useCallback } from 'react';

// Hook personalizado para scroll animations con configuración de lujo optimizada
export const useLuxuryInView = (options = {}) => {
  const defaultOptions = useMemo(() => ({
    amount: 0.12,
    once: true,
    margin: '-50px 0px' // Trigger earlier for better UX
  }), []);
  
  const ref = useRef(null);
  const inView = useInView(ref, { ...defaultOptions, ...options });
  
  return { ref, inView };
};

// Hook para parallax scroll con performance optimizada
export const useParallax = (speed = 0.5) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);
  
  return { ref, y };
};

// Hook para split text animation con memoization
export const useSplitText = useCallback((text) => {
  return useMemo(() => {
    if (typeof text !== 'string') return [];
    
    return text.split(' ').map((word, index) => ({
      word,
      id: `word-${index}`
    }));
  }, [text]);
}, []);

// Hook para stagger animations optimizado
export const useStagger = useCallback((itemCount, baseDelay = 0.04) => {
  return useMemo(() => 
    Array.from({ length: itemCount }, (_, i) => ({
      delay: baseDelay * i,
      id: `stagger-${i}`
    })),
    [itemCount, baseDelay]
  );
}, []);

// Hook para detectar reduced motion preference
export const useReducedMotion = () => {
  return useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);
};
