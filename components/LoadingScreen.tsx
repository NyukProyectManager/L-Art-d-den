import React, { useState, useEffect } from 'react';
import { DetailedFlower } from '../constants';

export const LoadingScreen: React.FC = () => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Start fade-out after 3 seconds
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 3000);

    // Remove component after fade-out completes
    const removeTimer = setTimeout(() => {
      setShouldRender(false);
    }, 4000); // 3s visible + 1s fade-out

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div className={`fixed inset-0 z-[200] bg-[#FAF9F6] flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${
      isFadingOut ? 'opacity-0' : 'opacity-100'
    }`}>
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Decorative Ring */}
        <div className="absolute inset-0 border-[1px] border-[#A3B18A]/20 rounded-full animate-slow-spin"></div>
        
        {/* The Flower with Blooming Animation */}
        <div className="relative w-48 h-48 drop-shadow-2xl animate-[bloom-birth_2s_cubic-bezier(0.16,1,0.3,1)_forwards]">
          <DetailedFlower className="w-full h-full" />
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="serif text-3xl md:text-4xl text-[#2D2D2D] italic tracking-[0.1em] opacity-0 animate-[fade-up_1s_ease-out_0.5s_forwards]">
          nyuk.pe
        </h2>
        <p className="mt-4 text-[10px] uppercase tracking-[0.6em] text-[#A3B18A] opacity-0 animate-[fade-up_1s_ease-out_0.8s_forwards]">
          Floreciendo para ti
        </p>
        
        <div className="mt-10 w-40 h-[1px] bg-[#EAEAEA] mx-auto overflow-hidden relative">
          <div className="absolute inset-0 bg-[#A3B18A] w-full -translate-x-full animate-[loading-progress_2.5s_infinite]"></div>
        </div>
      </div>

      <style>{`
        @keyframes bloom-birth {
          0% { transform: scale(0) rotate(-45deg); opacity: 0; }
          60% { transform: scale(1.1) rotate(5deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes loading-progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
