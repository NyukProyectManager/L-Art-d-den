import React, { useEffect, useRef } from 'react';

// TypeScript declaration for Unicorn Studio
declare global {
  interface Window {
    UnicornStudio: any;
  }
}

interface UnicornBackgroundProps {
  projectId?: string;
  opacity?: number;
  className?: string;
}

export const UnicornBackground: React.FC<UnicornBackgroundProps> = ({ 
  projectId = "your-project-id", 
  opacity = 0.4,
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Unicorn Studio when component mounts
    if (window.UnicornStudio && containerRef.current) {
      const unicorn = new window.UnicornStudio({
        container: containerRef.current,
        projectId: projectId,
        options: {
          responsive: true,
          autoPlay: true,
          interactive: true,
          opacity: opacity
        }
      });

      // Clean up on unmount
      return () => {
        unicorn.destroy();
      };
    }
  }, [projectId, opacity]);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-[-1] pointer-events-none ${className}`}
      style={{ opacity }}
    />
  );
};
