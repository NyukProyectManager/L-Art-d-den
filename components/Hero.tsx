import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface HeroProps {
  onShopClick: (e: React.MouseEvent) => void;
  onCatalogClick: (e: React.MouseEvent) => void;
  mediaUrl?: string; // URL o ruta local del archivo
}

export const Hero: React.FC<HeroProps> = ({ 
  onShopClick, 
  onCatalogClick, 
  // Por defecto usa una imagen de Unsplash, pero puedes cambiarlo por tu archivo local
  mediaUrl = "/videos/FondoFloral-Hero.mp4"
}) => {
  const { scrollYProgress } = useScroll();
  
  // Parallax effects
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 0.4]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -0.2]);
  
  // Spring animation for CTA
  const ctaScale = useSpring(1, { stiffness: 80, damping: 20 });

  /**
   * Detecta si el archivo es un video basándose en la extensión
   * Soporta: mp4, webm, ogg, mov
   */
  const isVideo = (url: string) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    return videoExtensions.some(ext => url.toLowerCase().includes(ext));
  };

  /**
   * Detecta el tipo de video para el tag source
   */
  const getVideoType = (url: string): string => {
    if (url.includes('.mp4')) return 'video/mp4';
    if (url.includes('.webm')) return 'video/webm';
    if (url.includes('.ogg')) return 'video/ogg';
    if (url.includes('.mov')) return 'video/quicktime';
    return 'video/mp4'; // Por defecto
  };

  return (
    <section className="relative h-[100vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: imageY }}
      >
        {isVideo(mediaUrl) ? (
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            preload="auto"
            className="w-full h-full object-cover grayscale-[15%] brightness-[0.75]"
          >
            <source src={mediaUrl} type={getVideoType(mediaUrl)} />
            Tu navegador no soporta la reproducción de video.
          </video>
        ) : (
          <img 
            src={mediaUrl} 
            alt="Hero background"
            className="w-full h-full object-cover grayscale-[15%] brightness-[0.75]"
          />
        )}
      </motion.div>
      
      {/* Capa de refinamiento estético */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="relative z-10 text-center text-white px-6 pt-16 sm:pt-8">
        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-1 sm:py-2 rounded-full border border-white/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm font-medium">Envío inmediato hoy en Lima</span>
          </div>
        </div>
        
        <h2 className="reveal reveal-delay-1 serif text-5xl md:text-8xl mb-6 leading-tight italic">
          Flores du jardin <br className="hidden md:block" /> d'Éden
        </h2>
        
        <p className="reveal reveal-delay-2 text-lg md:text-xl mb-6 max-w-2xl mx-auto leading-relaxed text-white/95">
          Arreglos florales frescos con entrega el mismo día. 
          <span className="font-semibold text-white">Garantía de frescura por 7 días.</span>
        </p>
        
        <div className="reveal reveal-delay-3 mb-6">
          <div className="flex items-center justify-center space-x-6 text-white/90">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">✓</span>
              <span className="text-sm">Entrega hoy</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">✓</span>
              <span className="text-sm">Pago seguro</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">✓</span>
              <span className="text-sm">Garantía 7 días</span>
            </div>
          </div>
        </div>
        
        <div className="reveal reveal-delay-3 mt-8">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={onCatalogClick}
              className="px-12 py-6 bg-gradient-to-r from-[#588157] to-[#A3B18A] text-white text-[11px] uppercase tracking-widest hover:from-[#4a7346] hover:to-[#8b9b7a] transition-all duration-500 transform hover:-translate-y-2 shadow-2xl hover:shadow-3xl font-bold rounded-full"
            >
              Comprar Ahora - Envío inmediato
            </button>
            <button 
              onClick={onShopClick}
              className="px-12 py-6 border-2 border-white text-white text-[11px] uppercase tracking-widest hover:bg-white hover:text-[#2D2D2D] transition-all duration-500 transform hover:-translate-y-2 font-bold rounded-full"
            >
              Ver Catálogo Completo
            </button>
          </div>
        </div>
        
        <div className="reveal reveal-delay-4 mt-12">
          <p className="text-sm text-white/80">
            <span className="font-semibold">+500 clientes felices</span> esta semana • 
            <span className="font-semibold"> 4.9/5 estrellas</span>
          </p>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <span className="text-[8px] uppercase tracking-[0.4em] text-white/60 mb-3">Desliza</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent opacity-40"></div>
      </div>
    </section>
  );
};