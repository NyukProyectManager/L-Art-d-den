import React, { useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { useLuxuryInView } from '../hooks/useAnimations';

interface LuxuryCardProps {
  product: any;
  onAddToCart: (product: any, rect?: DOMRect) => void;
  onToggleWishlist: (product: any) => void;
  isInWishlist: boolean;
  className?: string;
  delay?: number;
}

export const LuxuryCard: React.FC<LuxuryCardProps> = ({ 
  product, 
  onAddToCart, 
  onToggleWishlist, 
  isInWishlist,
  className = '',
  delay = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  
  const { ref, inView } = useLuxuryInView();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);
    
    // Limit rotation to ±6 degrees
    rotateX.set(deltaY * -6);
    rotateY.set(deltaX * 6);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative group cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 800
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onAddToCart(product)}
    >
      {/* Card Image with 3D effect */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          animate={{ 
            scale: isHovered ? 1.06 : 1,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 25 
          }}
        />
        
        {/* Overlay with animated underline */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
        
        {/* Product Name with animated underline */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-6 text-white"
          initial={{ y: 20, opacity: 0 }}
          animate={{ 
            y: isHovered ? 0 : 20, 
            opacity: isHovered ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <h3 className="serif text-xl mb-2">{product.name}</h3>
            {/* Animated underline */}
            <motion.div
              className="absolute bottom-0 left-0 h-px bg-white origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ width: '100%' }}
            />
          </div>
        </motion.div>
        
        {/* Wishlist Button */}
        <motion.button
          className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all"
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            scale: isHovered ? 1 : 0.8 
          }}
          transition={{ duration: 0.2 }}
        >
          <Heart 
            size={16} 
            className={isInWishlist ? 'fill-current text-red-500' : ''} 
          />
        </motion.button>
      </div>
      
      {/* Price with fade-in animation */}
      <motion.div 
        className="mt-4 flex items-center justify-between"
        initial={{ y: 8, opacity: 0 }}
        animate={{ 
          y: isHovered ? 0 : 8, 
          opacity: isHovered ? 1 : 0.7 
        }}
        transition={{ duration: 0.3 }}
      >
        <span className="serif text-2xl">S/.{product.price}</span>
        <motion.button
          className="p-3 bg-black text-white rounded-full opacity-0 group-hover:opacity-100 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            x: isHovered ? 0 : 20 
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <ShoppingBag size={16} />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
