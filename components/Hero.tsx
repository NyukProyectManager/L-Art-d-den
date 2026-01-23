import React from 'react';

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
      <div className="absolute inset-0 z-0">
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
            alt="Fondo floral de lujo" 
            className="w-full h-full object-cover grayscale-[15%] brightness-[0.75]"
            loading="eager"
          />
        )}
        {/* Capa de refinamiento estético */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-6">
        <p className="reveal reveal-delay-1 text-[10px] md:text-xs uppercase tracking-[0.5em] mb-6 font-light">
          Desde 2026 &mdash; Lima, Perú
        </p>
        <h2 className="reveal reveal-delay-2 serif text-6xl md:text-9xl mb-12 leading-tight italic">
          Flores del Jardin d'Éden <br className="hidden md:block" /> -Arte Floral-
        </h2>
        <div className="reveal reveal-delay-3 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
          <button 
            onClick={onShopClick}
            className="px-12 py-5 bg-white text-[#2D2D2D] text-[10px] uppercase tracking-widest hover:bg-[#FAF9F6] transition-all transform hover:-translate-y-2 shadow-xl"
          >
            Comprar Colección
          </button>
          <button 
            onClick={onCatalogClick}
            className="px-12 py-5 border border-white/40 text-white text-[10px] uppercase tracking-widest hover:bg-white hover:text-[#2D2D2D] transition-all backdrop-blur-md transform hover:-translate-y-2"
          >
            Ver Catálogo
          </button>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <span className="text-[8px] uppercase tracking-[0.4em] text-white/60 mb-3">Desliza</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent opacity-40"></div>
      </div>
    </section>
  );
};