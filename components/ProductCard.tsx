
import React, { useRef, useState, useEffect } from 'react';
import { Product } from '../types';
import { ShoppingBag, Star, Heart, Package, Shield, Truck, Sparkles, Gift, Flower2 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, startRect?: DOMRect) => void;
  isPopular?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, isPopular }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Lógica para determinar si el producto es nuevo (menos de 7 días)
  const isNew = product.addedAt 
    ? (new Date().getTime() - new Date(product.addedAt).getTime()) < (7 * 24 * 60 * 60 * 1000)
    : false;

  useEffect(() => {
    const checkWishlist = () => {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setIsLiked(wishlist.includes(product.id));
    };

    checkWishlist();
    window.addEventListener('wishlistUpdated', checkWishlist);
    
    return () => {
      window.removeEventListener('wishlistUpdated', checkWishlist);
    };
  }, [product.id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    let newWishlist;
    
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);

    if (wishlist.includes(product.id)) {
      newWishlist = wishlist.filter((id: string) => id !== product.id);
      setIsLiked(false);
    } else {
      newWishlist = [...wishlist, product.id];
      setIsLiked(true);
    }
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = imageRef.current?.getBoundingClientRect();
    onAddToCart(product, rect);
  };

  return (
    <div 
      className="group relative bg-gradient-to-br from-white via-pink-50 to-rose-50 rounded-3xl shadow-xl hover:shadow-[0_25px_50px_-15px_rgba(244,114,182,0.2)] transition-all duration-700 overflow-hidden border border-pink-100/60 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge de estado con colores pastel */}
      <div className="absolute top-4 left-4 z-20 flex flex-col space-y-2">
        {isNew && (
          <div className="bg-gradient-to-r from-pink-400 to-rose-400 text-white px-4 py-2 rounded-full text-[10px] font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
            <Sparkles size={12} className="animate-pulse" />
            <span>NUEVO</span>
          </div>
        )}
        {isPopular && !isNew && (
          <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-4 py-2 rounded-full text-[10px] font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
            <Star size={12} fill="currentColor" />
            <span>POPULAR</span>
          </div>
        )}
      </div>

      {/* Decoración floral */}
      <div className="absolute top-4 right-4 z-10 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
        <Flower2 size={24} className="text-pink-300" />
      </div>

      {/* Contenedor de imagen con tema pastel */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
        <img 
          ref={imageRef}
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-all duration-800 group-hover:scale-105"
        />
        
        {/* Overlay romántico */}
        <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 via-pink-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600"></div>
        
        {/* Efecto de luz mágico */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 via-transparent to-rose-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-800"></div>
        
        {/* Partículas decorativas */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
          <div className="absolute top-10 left-10 w-2 h-2 bg-pink-300 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-15 w-1.5 h-1.5 bg-rose-300 rounded-full animate-pulse delay-100"></div>
          <div className="absolute bottom-20 left-20 w-2.5 h-2.5 bg-pink-400 rounded-full animate-pulse delay-200"></div>
        </div>

        {/* Overlay con descripción - aparece sobre la imagen */}
        <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-rose-600/90 via-pink-500/80 to-transparent p-6 transition-all duration-700 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Destello rosa animado */}
          <div className="absolute inset-0 bg-gradient-to-t from-pink-400/50 to-transparent animate-pulse"></div>
          
          {/* Contenido de la descripción */}
          <div className="relative z-10">
            <p className="text-white text-sm leading-relaxed mb-3 line-clamp-3">
              {product.description}
            </p>
            <div className="flex items-center space-x-3 text-white/80 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span>Premium</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-pink-200 rounded-full animate-pulse delay-100"></div>
                <span>Handmade</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wishlist Heart con estilo romántico */}
        <button 
          onClick={toggleWishlist}
          className={`absolute top-4 right-4 z-20 p-3 rounded-full bg-white/95 backdrop-blur-lg shadow-xl transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
            isLiked 
              ? 'opacity-100 scale-110 text-pink-500 rotate-12 shadow-pink-500/30' 
              : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 text-gray-400 hover:text-pink-500 hover:scale-110 hover:rotate-6'
          } ${isAnimating ? 'animate-pulse' : ''}`}
        >
          <Heart 
            size={18} 
            fill={isLiked ? "currentColor" : "none"} 
            strokeWidth={2}
            className={`transition-all duration-300 ${isLiked ? 'text-pink-500' : 'text-gray-400'}`}
          />
        </button>

        {/* Botón de acción flotante con estilo gift */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-600">
          <button 
            onClick={handleAdd}
            className="bg-white text-gray-800 px-8 py-4 rounded-full text-[11px] uppercase tracking-[0.3em] font-bold shadow-2xl hover:bg-pink-500 hover:text-white hover:shadow-[0_10px_30px_-10px_rgba(244,114,182,0.4)] transition-all duration-400 flex items-center space-x-3 transform hover:scale-105 active:scale-95"
          >
            <Gift size={14} />
            <span>Regalar</span>
          </button>
        </div>
      </div>

      {/* Contenido con detalles románticos */}
      <div className="p-8 bg-gradient-to-b from-white to-pink-50/30">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] text-pink-600 uppercase tracking-[0.2em] font-medium transition-colors duration-300 group-hover:text-rose-600">
            {product.category}
          </span>
          <div className="flex items-center space-x-2 text-xs text-pink-400 transition-colors duration-300 group-hover:text-rose-500">
            <Package size={12} className="animate-pulse" />
            <span>Disponible</span>
          </div>
        </div>
        
        <h3 className="serif text-2xl font-bold text-gray-900 mb-4 leading-tight transition-all duration-300 group-hover:text-pink-600">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-baseline">
            <span className="text-sm text-pink-500 mr-1 transition-colors duration-300 group-hover:text-rose-500">S/</span>
            <span className="text-3xl font-bold text-gray-900 transition-all duration-300 group-hover:text-pink-600">{product.price}</span>
            <span className="text-sm text-pink-500 ml-1 transition-colors duration-300 group-hover:text-rose-500">.00</span>
          </div>
          
          {/* Iconos de beneficios con colores pastel */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 text-xs text-pink-400 transition-all duration-300 group-hover:text-rose-500 group-hover:scale-110">
              <Truck size={10} />
            </div>
            <div className="flex items-center space-x-1 text-xs text-pink-400 transition-all duration-300 group-hover:text-purple-500 group-hover:scale-110">
              <Shield size={10} />
            </div>
          </div>
        </div>

        {/* Línea divisoria con colores pastel */}
        <div className="h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent mb-6 transition-all duration-500 group-hover:via-rose-300"></div>

        {/* Beneficios adicionales */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="flex items-center space-x-1 text-xs text-pink-500">
            <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
            <span>Envío gratis</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-pink-500">
            <div className="w-2 h-2 bg-rose-300 rounded-full"></div>
            <span>Gift card</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-pink-500">
            <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
            <span>Premium</span>
          </div>
        </div>

        {/* Botón principal con estilo romántico */}
        <button 
          onClick={handleAdd}
          className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white py-4 rounded-2xl text-[11px] uppercase tracking-[0.3em] font-bold shadow-xl hover:shadow-[0_15px_35px_-10px_rgba(244,114,182,0.4)] hover:from-pink-500 hover:to-rose-500 transition-all duration-400 transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100"></div>
          <div className="relative z-10 flex items-center justify-center space-x-3">
            <ShoppingBag size={16} />
            <span>Comprar Ahora</span>
          </div>
        </button>
      </div>
    </div>
  );
};
