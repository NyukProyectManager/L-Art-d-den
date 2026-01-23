
import React, { useRef, useState, useEffect } from 'react';
import { Product } from '../types';
import { ShoppingBag, Star, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, startRect?: DOMRect) => void;
  isPopular?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, isPopular }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

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
    setTimeout(() => setIsAnimating(false), 450);

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
    <div className="group cursor-pointer relative transition-all duration-1000 hover:-translate-y-2">
      <div className="relative overflow-hidden aspect-[4/5] mb-8 bg-[#F8F8F8] rounded-sm group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-1000">
        <img 
          ref={imageRef}
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-[2.5s] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-1000"></div>
        
        {/* Wishlist Heart Icon */}
        <button 
          onClick={toggleWishlist}
          className={`absolute top-5 right-5 z-10 p-2.5 rounded-full bg-white/95 backdrop-blur-md shadow-sm transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
            isLiked 
              ? 'opacity-100 translate-y-0 text-[#A3B18A]' 
              : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 text-gray-400 hover:text-[#A3B18A]'
          } ${isAnimating ? 'animate-heart-pulse ring-2 ring-[#A3B18A]/20' : ''}`}
        >
          <Heart 
            size={16} 
            fill={isLiked ? "currentColor" : "none"} 
            strokeWidth={1.5} 
          />
        </button>

        {/* Hover Action */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-1000 pointer-events-none group-hover:pointer-events-auto">
          <button 
            onClick={handleAdd}
            className="bg-white text-[#2D2D2D] px-10 py-5 text-[10px] uppercase tracking-[0.4em] font-bold shadow-2xl hover:bg-[#2D2D2D] hover:text-white transition-all transform hover:scale-105 active:scale-95 flex items-center space-x-3"
          >
            <ShoppingBag size={14} />
            <span>Seleccionar</span>
          </button>
        </div>

        {/* Badges Stack */}
        <div className="absolute top-5 left-5 flex flex-col space-y-2 items-start">
          {isNew && (
            <span className="bg-white/95 backdrop-blur-sm border border-[#A3B18A]/30 px-3 py-1 text-[10px] serif italic shadow-sm text-[#A3B18A] tracking-wider animate-[fade-up_0.5s_ease-out]">
              Nuevo
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[8px] uppercase tracking-[0.25em] font-bold shadow-sm text-[#2D2D2D]">
            {product.category}
          </span>
          {isPopular && (
            <span className="bg-[#A3B18A]/90 backdrop-blur-sm text-white px-3 py-1.5 text-[8px] uppercase tracking-[0.25em] font-bold shadow-sm flex items-center space-x-1.5 animate-pulse">
              <Star size={8} fill="currentColor" />
              <span>Edición Limitada</span>
            </span>
          )}
        </div>
      </div>
      
      <div className="text-center px-4 flex flex-col items-center">
        <h3 className="serif text-xl md:text-[1.5rem] mb-3 italic tracking-tight group-hover:text-[#A3B18A] transition-colors duration-700 leading-tight">
          {product.name}
        </h3>
        <div className="w-8 h-[1px] bg-[#EAEAEA] mb-4 group-hover:w-16 group-hover:bg-[#A3B18A] transition-all duration-1000"></div>
        <p className="text-[11px] text-[#2D2D2D] uppercase tracking-[0.55em] font-black transition-all duration-700 group-hover:tracking-[0.65em] group-hover:text-[#588157]">
          S/{product.price}.00
        </p>
      </div>
    </div>
  );
};
