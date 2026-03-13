import React, { useEffect, useRef, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { useLuxuryInView } from '../hooks/useAnimations';

interface LottieIconProps {
  animationData: any;
  className?: string;
  size?: number;
  loop?: boolean;
  autoplay?: boolean;
  triggerOnView?: boolean;
}

export const LottieIcon: React.FC<LottieIconProps> = ({ 
  animationData, 
  className = '', 
  size = 24,
  loop = false,
  autoplay = false,
  triggerOnView = true
}) => {
  const [isInView, setIsInView] = useState(false);
  const playerRef = useRef<any>(null);
  const { ref, inView } = useLuxuryInView();

  useEffect(() => {
    if (triggerOnView && inView && !isInView) {
      setIsInView(true);
      if (playerRef.current) {
        playerRef.current.play();
      }
    }
  }, [inView, isInView, triggerOnView]);

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      <Player
        ref={playerRef}
        autoplay={autoplay || (!triggerOnView && isInView)}
        loop={loop}
        keepLastFrame={true}
        src={animationData}
        style={{ 
          height: size, 
          width: size,
          opacity: isInView ? 1 : 0
        }}
      />
    </div>
  );
};

// Predefined animation data for floral icons
export const floralAnimations = {
  // These would be exported from Jitter as JSON
  flowerIcon: {
    // Placeholder for actual Jitter export
    v: "5.5.2",
    meta: { g: "LottieFiles AE ", a: "", k: "", d: "", tc: "" },
    fr: 30,
    ip: 0,
    op: 1,
    w: 64,
    h: 64,
    nm: "Flower Icon",
    ddd: 0,
    assets: [],
    layers: []
  },
  leafIcon: {
    v: "5.5.2",
    meta: { g: "LottieFiles AE ", a: "", k: "", d: "", tc: "" },
    fr: 30,
    ip: 0,
    op: 1,
    w: 64,
    h: 64,
    nm: "Leaf Icon",
    ddd: 0,
    assets: [],
    layers: []
  }
};
