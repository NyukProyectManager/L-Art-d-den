
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Search, Heart } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onLinkClick: (e: React.MouseEvent, sectionName: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onLinkClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isCartBouncing, setIsCartBouncing] = useState(false);

  const updateWishlistCount = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistCount(wishlist.length);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    updateWishlistCount();
    window.addEventListener('wishlistUpdated', updateWishlistCount);

    const handleCartImpact = () => {
      setIsCartBouncing(true);
      setTimeout(() => setIsCartBouncing(false), 600);
    };
    window.addEventListener('cartImpact', handleCartImpact);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wishlistUpdated', updateWishlistCount);
      window.removeEventListener('cartImpact', handleCartImpact);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
      isScrolled || isMenuOpen ? 'bg-white shadow-sm py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button className="md:hidden z-50 p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-10 text-[11px] uppercase tracking-[0.25em] font-medium">
          <button onClick={(e) => onLinkClick(e, 'Ver Todo')} className="hover:text-[#A3B18A] transition-colors relative group">
            Ver Todo
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#A3B18A] transition-all group-hover:w-full"></span>
          </button>
          <button onClick={(e) => onLinkClick(e, 'Colecciones')} className="hover:text-[#A3B18A] transition-colors relative group">
            Colecciones
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#A3B18A] transition-all group-hover:w-full"></span>
          </button>
        </div>

        {/* Logo */}
        <div className={`absolute left-1/2 -translate-x-1/2 transition-opacity duration-500 ${isMenuOpen ? 'opacity-0 md:opacity-100' : 'opacity-100'}`}>
          <h1 onClick={(e) => onLinkClick(e, 'Home')} className="serif text-2xl md:text-3xl tracking-tighter text-[#2D2D2D] hover:opacity-70 transition-opacity cursor-pointer">
            L'Art d'Éden
          </h1>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <button onClick={(e) => onLinkClick(e, 'Favoritos')} className="relative group hover:text-[#A3B18A] transition-colors p-2">
            <Heart size={20} strokeWidth={1.2} />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 text-[7px] font-bold bg-[#2D2D2D] text-white rounded-full w-3.5 h-3.5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>
          <button 
            onClick={onOpenCart}
            className={`flex items-center space-x-1 hover:text-[#A3B18A] transition-colors group relative p-2 ${isCartBouncing ? 'animate-cart-impact text-[#A3B18A]' : ''}`}
          >
            <ShoppingBag size={22} strokeWidth={1.2} className={`${isCartBouncing ? 'fill-current' : ''}`} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 text-[8px] font-bold bg-[#A3B18A] text-white rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay - More Elegant and Solid */}
      <div className={`fixed inset-0 top-0 bg-white z-40 md:hidden transition-all duration-500 ease-in-out transform ${
        isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="pt-24 pb-12 px-10 h-full flex flex-col justify-between overflow-y-auto">
          <div className="flex flex-col space-y-8">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-bold mb-4">Navegación</p>
            {['Home', 'Ver Todo', 'Colecciones', 'Favoritos'].map((item) => (
              <button 
                key={item}
                className="text-left serif italic text-5xl tracking-tight text-[#2D2D2D] hover:text-[#A3B18A] transition-colors py-1"
                onClick={(e) => { setIsMenuOpen(false); onLinkClick(e, item); }}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="pt-12 border-t border-gray-100">
             <div className="flex flex-col space-y-4">
                <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-bold">Contacto: 934202560</p>
                <p className="serif italic text-lg text-gray-600">Francísco Pizarro 698, Lima</p>
                <div className="flex space-x-6 pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1">Instagram</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1">Pinterest</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </nav>
  );
};