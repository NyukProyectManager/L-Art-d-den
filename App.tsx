//cambioooooooooooooooooooooooooooooos4
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion, LazyMotion, domAnimation } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { FloatingSocialButtons } from './components/FloatingSocialButtons';
import { CountdownTimer } from './components/CountdownTimer';
import { PRODUCTS, TESTIMONIALS, DetailedFlower, POPULAR_PRODUCTS, COLLECTIONS, GALLERY_IMAGES } from './constants';
import { cargarProductos } from './services/productService';
import { CartItem, Product, Transaction } from './types';
import { recordTransaction, validateCardNumber, getCardType } from './services/transactionService';
import { X, Minus, Plus, Trash2, Quote, ArrowRight, ShoppingBag, Heart, CheckCircle2, QrCode, Smartphone, ArrowLeft, Camera, ShieldCheck, AlertCircle, Star } from 'lucide-react';

interface FlyingItem {
  id: number;
  src: string;
  start: { x: number; y: number; width: number; height: number };
}

type CheckoutStep = 'shipping' | 'message' | 'payment' | 'success';
type PaymentMethod = 'yape';
type AppView = 'home' | 'collection' | 'catalog';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedCollection, setSelectedCollection] = useState<any>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);
  const [showSoonModal, setShowSoonModal] = useState<string | null>(null);
  const [productos, setProductos] = useState<Product[]>([]);
  const [cargandoProductos, setCargandoProductos] = useState(false);

  // Checkout States
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('yape');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [receiptImage, setReceiptImage] = useState<string | null>(null);

  const [checkoutData, setCheckoutData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    day: '',
    month: '',
    giftMessage: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [petals, setPetals] = useState<{ id: number, left: string, duration: string, delay: string, size: string }[]>([]);

  const catalogRef = useRef<HTMLElement>(null);
  const collectionsRef = useRef<HTMLElement>(null);

  // Gestión de historial del navegador
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const state = e.state;

      if (state?.view) {
        setCurrentView(state.view);

        if (state.view === 'collection' && state.collection) {
          setSelectedCollection(state.collection);
        }
      } else {
        // Si no hay estado, volver a home
        setCurrentView('home');
      }

      // Manejar paneles
      if (state?.panel === 'wishlist') {
        setIsWishlistOpen(true);
      } else if (state?.panel === 'cart') {
        setIsCartOpen(true);
      } else {
        setIsWishlistOpen(false);
        setIsCartOpen(false);
      }

      // Restaurar scroll DESPUÉS de que React actualice el DOM
      if (state?.scrollY !== undefined) {
        // Solo restaurar scroll si NO estamos abriendo un panel
        if (!state.panel) {
          setTimeout(() => window.scrollTo(0, state.scrollY), 100);
        }
      } else if (!state?.view && !state?.panel) {
        // Solo ir arriba si no hay información de estado
        setTimeout(() => window.scrollTo(0, 0), 100);
      }

      // Cerrar checkout si está abierto
      setIsCheckoutOpen(false);
    };

    window.addEventListener('popstate', handlePopState);

    // Establecer estado inicial
    if (!window.history.state) {
      window.history.replaceState({ view: 'home', scrollY: 0 }, '', window.location.href);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const updateWishlistItems = useCallback(() => {
    const wishlistIds = JSON.parse(localStorage.getItem('wishlist') || '[]');

    console.log('🔍 DEBUG Favoritos:');
    console.log('  - IDs guardados:', wishlistIds);
    console.log('  - Productos cargados:', productos.length);

    const productosActuales = productos.length > 0 ? productos : PRODUCTS;
    console.log('  - Usando productos de:', productos.length > 0 ? 'Google Sheets' : 'constants.tsx');

    const items = productosActuales.filter(p => wishlistIds.includes(p.id));
    console.log('  - Productos encontrados:', items.length);
    console.log('  - Productos:', items.map(p => p.name));

    setWishlistItems(items);
  }, [productos]);


  useEffect(() => {
    // Cargar productos desde Google Sheets
    cargarProductosDesdeSheets();

    // Actualizar wishlist cuando cambie
    window.addEventListener('wishlistUpdated', updateWishlistItems);

    return () => {
      window.removeEventListener('wishlistUpdated', updateWishlistItems);
    };
  }, [updateWishlistItems]);

  useEffect(() => {
    console.log('📦 Productos cambiaron:', productos.length);
    if (productos.length > 0) {
      console.log('✅ Actualizando favoritos...');
      updateWishlistItems();
    }
  }, [productos, updateWishlistItems]);

  // Función para cargar productos
  const cargarProductosDesdeSheets = async () => {
    setCargandoProductos(true);
    try {
      console.log('🌐 Cargando productos desde Google Sheets...');
      const productosSheet = await cargarProductos();

      console.log(`✅ ${productosSheet.length} productos recibidos`);
      console.log('Productos:', productosSheet.map(p => `${p.id}: ${p.name}`));

      setProductos(productosSheet);

      // Dar tiempo para que React actualice el estado
      setTimeout(() => {
        console.log('⏰ Actualizando favoritos después de cargar productos');
        updateWishlistItems();
      }, 200);

    } catch (error) {
      console.error('❌ Error al cargar productos:', error);
      setProductos(PRODUCTS);
    } finally {
      setCargandoProductos(false);
    }
  };

  const triggerPetalRain = () => {
    const newPetals = Array.from({ length: 35 }).map((_, i) => ({
      id: Date.now() + i,
      left: `${Math.random() * 100}vw`,
      duration: `${4 + Math.random() * 5}s`,
      delay: `${Math.random() * 1.5}s`,
      size: `${12 + Math.random() * 18}px`
    }));
    setPetals(newPetals);
    setTimeout(() => setPetals([]), 8000);
  };


  const removeFromWishlist = (id: string) => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const newWishlist = wishlist.filter((itemId: string) => itemId !== id);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const handleLinkClick = (e: React.MouseEvent, sectionName: string) => {
    e?.preventDefault?.();
    if (currentView !== 'home' && sectionName !== 'Ver Todo' && sectionName !== 'Catálogo') {
      setCurrentView('home');
      setTimeout(() => navigateToSection(sectionName), 100);
    } else {
      navigateToSection(sectionName);
    }
  };

  const navigateToSection = (sectionName: string) => {
    if (sectionName === 'Ver Todo' || sectionName === 'Catálogo') {
      setCurrentView('catalog');
      window.history.pushState(
        { view: 'catalog', scrollY: 0 },
        '',
        '#catalog'
      );
      window.scrollTo(0, 0);
    } else if (sectionName === 'Colecciones' && collectionsRef.current) {
      collectionsRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionName === 'Favoritos') {
      setIsWishlistOpen(true);
      window.history.pushState(
        { view: currentView, panel: 'wishlist', scrollY: window.scrollY },
        '',
        '#wishlist'
      );
    } else if (sectionName === 'Home') {
      setCurrentView('home');
      window.history.pushState({ view: 'home', scrollY: 0 }, '', '#home');
      window.scrollTo(0, 0);
    }
  };

  const openCollection = (collection: any) => {
    setSelectedCollection(collection);
    setCurrentView('collection');
    window.history.pushState(
      { view: 'collection', collection, scrollY: 0 },
      '',
      `#collection/${collection.id}`
    );
    window.scrollTo(0, 0);
  };

  const addToCart = (product: Product, rect?: DOMRect) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // Animación de vuelo
    if (rect) {
      const flyingItem: FlyingItem = {
        id: Date.now(),
        src: product.image,
        start: {
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height
        }
      };
      setFlyingItems(prev => [...prev, flyingItem]);
      setTimeout(() => {
        setFlyingItems(prev => prev.filter(item => item.id !== flyingItem.id));
      }, 850);
    }

    // Efecto de impacto en el carrito
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('cartImpact'));
    }, 400);
  };

  const updateQuantity = (id: string, change: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        if (newQuantity <= 0) {
          return null;
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean));
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const popularIds = POPULAR_PRODUCTS.map(p => p.id);
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Checkout step:', checkoutStep);
    console.log('Receipt image exists:', !!receiptImage);
    
    if (checkoutStep === 'shipping') {
      setCheckoutStep('message');
    } else if (checkoutStep === 'message') {
      setCheckoutStep('payment');
    } else if (checkoutStep === 'payment') {
      if (!receiptImage) {
        console.log('No receipt image, cannot proceed');
        return;
      }
      setIsProcessing(true);
      setPaymentError(null);

      // Simular procesamiento de pago
      setTimeout(() => {
        const transaction: Transaction = {
          orderId: Date.now().toString(),
          customerName: checkoutData.name,
          customerEmail: checkoutData.email,
          customerPhone: checkoutData.phone,
          address: checkoutData.address,
          deliveryDate: `${checkoutData.day} de ${checkoutData.month}`,
          giftMessage: checkoutData.giftMessage,
          items: cart.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity
          })),
          total: totalPrice,
          paymentMethod: paymentMethod,
          status: 'pending',
          date: new Date().toISOString()
        };

        recordTransaction(transaction);
        // Mostrar éxito y mantener visible hasta que el usuario cierre
        setCheckoutStep('success');
        setIsProcessing(false);
        // No cerrar automáticamente - esperar a que el usuario presione el botón
      },2000);
    }
  };

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log('File uploaded:', file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        console.log('Receipt image set:', result);
        setReceiptImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-[#A3B18A] selection:text-white overflow-x-hidden bg-[#FAF9F6]">
      {petals.map(petal => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: petal.left,
            animationDuration: petal.duration,
            animationDelay: petal.delay,
            width: petal.size,
            height: petal.size
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#A3B18A]/40">
            <path d="M50 0 C70 30 100 50 50 100 C0 50 30 30 50 0" fill="currentColor" />
          </svg>
        </div>
      ))}

      <div id="nav-target-container">
        <Navbar
          cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
          onOpenCart={() => {
            const currentScroll = window.scrollY;
            setIsCartOpen(true);
            window.history.pushState(
              { view: currentView, panel: 'cart', scrollY: currentScroll },
              '',
              '#cart'
            );
          }}
          onLinkClick={handleLinkClick}
        />
      </div>

      {flyingItems.map(item => (
        <div
          key={item.id}
          className="fixed z-[9999] pointer-events-none overflow-hidden rounded-sm shadow-2xl"
          style={{
            top: item.start.y,
            left: item.start.x,
            width: item.start.width,
            height: item.start.height,
            animation: 'fly-to-cart 0.85s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
          }}
        >
          <img src={item.src} className="w-full h-full object-cover" alt="flying-flower" />
        </div>
      ))}

      <LazyMotion features={domAnimation}>
        <main className="transition-opacity duration-[800ms] opacity-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              {currentView === 'home' && (
                <>
                  <Hero onShopClick={(e) => handleLinkClick(e, 'Colecciones')}
                    onCatalogClick={(e) => handleLinkClick(e, 'Catálogo')}
                    mediaUrl="/videos/FondoFloral-Hero.mp4"
                  />
                  
                  {/* CATÁLOGO PRINCIPAL - INICIO */}
                  <section id="catalog" className="py-32 px-6 bg-gradient-to-b from-white to-[#FAF9F6]">
                    <div className="max-w-7xl mx-auto">
                      <div className="text-center mb-20">
                        <div className="inline-flex items-center space-x-2 bg-red-50 border border-red-200 px-4 py-2 rounded-full mb-6">
                          <span className="text-red-600 font-bold text-sm">⚡ OFERTA LIMITADA</span>
                          <span className="text-red-600 text-sm">-30% en selección premium</span>
                        </div>
                        
                        <h3 className="serif text-5xl md:text-6xl italic tracking-tight mb-6">
                          Nuestros Best Sellers
                        </h3>
                        
                        <div className="flex items-center justify-center space-x-6 mb-8">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-yellow-500 text-lg">★</span>
                            ))}
                          </div>
                          <span className="text-gray-600 font-medium">4.9/5 (523 reseñas)</span>
                        </div>
                        
                        <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed mb-8">
                          Los arreglos más amados por nuestros clientes. 
                          <span className="font-semibold text-[#588157]"> Entrega el mismo día en Lima.</span>
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
                          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                            <span className="text-green-500 font-bold">✓</span>
                            <span>Envío inmediato</span>
                          </div>
                          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                            <span className="text-green-500 font-bold">✓</span>
                            <span>Pago seguro</span>
                          </div>
                          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                            <span className="text-green-500 font-bold">✓</span>
                            <span>Garantía 7 días</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 mb-20">
                        {productos.slice(0, 6).map((product, idx) => {
                          const shouldShowStockBadge = Math.random() > 0.5;
                          const stockCount = Math.floor(Math.random() * 5) + 1;
                          
                          return (
                            <div key={product.id} className="group relative">
                              {/* Badge de descuento */}
                              <div className="absolute -top-4 -right-4 z-20 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                                -30%
                              </div>
                              
                              <ProductCard 
                                product={product} 
                                onAddToCart={(p, rect) => addToCart(p, rect)} 
                                isPopular={popularIds.includes(product.id)} 
                              />
                              
                              {/* Badge de stock bajo - solo en algunos productos */}
                              {shouldShowStockBadge && (
                                <div className="absolute bottom-4 left-4 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                                  ⚠️ Solo {stockCount} unidades
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="text-center mb-12">
                        <div className="bg-gradient-to-r from-[#588157] to-[#A3B18A] text-white p-8 rounded-2xl max-w-3xl mx-auto shadow-2xl">
                          <h4 className="serif text-2xl italic mb-4">🎁 Oferta Especial por Tiempo Limitado</h4>
                          <p className="mb-6 text-lg">30% de descuento en todos los arreglos + envío inmediato. ¡Solo por tiempo limitado!</p>
                          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <button 
                              onClick={() => navigateToSection('Catálogo')} 
                              className="bg-white text-[#588157] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors text-lg"
                            >
                              APROVECHAR OFERTA AHORA
                            </button>
                            <div className="text-sm">
                              <span className="font-bold">Termina en:</span>{' '}
                              <CountdownTimer targetDays={6} />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <button 
                          onClick={() => navigateToSection('Catálogo')} 
                          className="inline-flex items-center space-x-3 text-[11px] uppercase tracking-[0.4em] font-bold text-[#2D2D2D] hover:text-[#588157] transition-all duration-500 group border-2 border-[#2D2D2D] px-8 py-4 rounded-full hover:border-[#588157] shadow-lg hover:shadow-xl"
                        >
                          <span>Ver Todos los Productos</span>
                          <div className="w-4 h-4 bg-[#2D2D2D] group-hover:bg-[#588157] rounded-full transition-colors"></div>
                        </button>
                      </div>
                    </div>
                  </section>
                  <section className="bg-[#DAD7CD]/20 py-32 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-24">
                      <div className="w-full lg:w-1/2 relative group">
                        <img src="/imagenes/FOTO-HISTORIA.jpg" alt="Artista floral" className="w-full h-[700px] object-cover rounded-sm grayscale-[30%] shadow-2xl" />
                      </div>
                      <div className="w-full lg:w-1/2">
                        <span className="text-[10px] uppercase tracking-[0.5em] text-[#A3B18A] mb-6 block font-bold">El Oficio</span>
                        <h2 className="serif text-6xl mb-10 leading-[1.1] italic">La fleur est une trace du divin...</h2>
                        <p className="text-gray-600 leading-relaxed mb-12 text-xl font-light italic">En nyuk.pe creemos que toda belleza nace de Dios y vuelve a Él. Cada creación es un gesto silencioso de gratitud, un recuerdo del primer jardín y una forma delicada de expresar lo que el corazón no siempre puede decir.

                          Porque hay emociones que no se explican.
                          Se confían, simplemente, a una flor.</p>
                      </div>
                    </div>
                  </section>
                  
                  <section id="collections" ref={collectionsRef} className="py-32 px-6 bg-white relative overflow-hidden">
                    {/* Background decorative elements */}
                    <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-pink-50/30 to-rose-50/10 rounded-full blur-3xl opacity-50"></div>
                    <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-purple-50/20 to-pink-50/10 rounded-full blur-2xl opacity-40"></div>
                    
                    <div className="max-w-7xl mx-auto relative z-10">
                      <div className="text-center mb-32">
                        <div className="relative inline-block">
                          <p className="text-[10px] uppercase tracking-[0.5em] text-[#A3B18A] mb-6 font-bold relative inline-block">
                            <span className="relative z-10">Inspiración por últimas tendencias</span>
                            <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#A3B18A] to-transparent"></span>
                          </p>
                          <h2 className="serif text-5xl md:text-7xl italic tracking-tight mb-8 text-[#2D2D2D] relative">
                            <span className="relative z-10">Colecciones Florales</span>
                            <span className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-[#A3B18A] to-transparent"></span>
                          </h2>
                          <p className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed italic mb-8">El lenguaje del amor expresado a través de diseños estructurales que fusionan naturaleza y elegancia contemporánea</p>
                          
                          {/* Decorative line */}
                          <div className="flex items-center justify-center space-x-4 mb-12">
                            <div className="h-px w-16 bg-gradient-to-r from-[#A3B18A] to-transparent"></div>
                            <div className="w-2 h-2 bg-[#A3B18A] rounded-full"></div>
                            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#A3B18A]"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
                        {COLLECTIONS.map((collection, idx) => (
                          <div key={collection.id} className={`group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 border border-[#FAF9F6] hover:border-[#A3B18A]/20 transform hover:-translate-y-2 cursor-pointer`} onClick={() => openCollection(collection)}>
                            {/* Image container with enhanced overlay */}
                            <div className="relative h-[450px] md:h-[500px] overflow-hidden">
                              <img src={collection.image} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" alt={collection.title} />
                              
                              {/* Gradient overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                              
                              {/* Content overlay */}
                              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 pointer-events-none">
                                <div className="text-center">
                                  <p className="text-[10px] uppercase tracking-[0.4em] mb-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 font-bold">{collection.subtitle}</p>
                                  <h3 className="serif text-4xl md:text-5xl italic mb-6">{collection.title}</h3>
                                  
                                  {/* Enhanced decorative line */}
                                  <div className="w-20 h-[1px] bg-white/80 group-hover:w-32 transition-all duration-700"></div>
                                  
                                  {/* Call to action */}
                                  <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                                    <span className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                                      <span>Explorar colección</span>
                                      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Hover effect border */}
                              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-[#A3B18A]/50 transition-all duration-700 rounded-3xl pointer-events-none"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                  
                  <section id="testimonials" className="py-32 px-6 bg-gradient-to-b from-[#FAF9F6] to-white relative overflow-hidden">
                    {/* Decorative background elements */}
                    <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-pink-100/20 to-rose-100/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-purple-100/20 to-pink-100/10 rounded-full blur-2xl"></div>
                    <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-gradient-to-br from-rose-100/15 to-pink-100/5 rounded-full blur-xl"></div>
                    
                    <div className="max-w-7xl mx-auto relative z-10">
                      <div className="text-center mb-24">
                        <div className="relative flex items-center justify-center w-full">
                          <DetailedFlower className="w-12 h-12 grayscale opacity-60 mb-6 transition-all duration-500 hover:opacity-80 hover:scale-110" />
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-[#A3B18A] to-[#588157] rounded-full opacity-20 animate-pulse"></div>
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.5em] text-[#A3B18A] mb-6 font-bold relative inline-block">
                          <span className="relative z-10">Voces Botánicas</span>
                          <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#A3B18A] to-transparent"></span>
                        </p>
                        <h2 className="serif text-4xl md:text-5xl italic tracking-tight mb-4 text-[#2D2D2D]">Elogios de Nuestros Clientes</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed italic">Descubre las experiencias que transforman cada entrega en un momento inolvidable</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
                        {TESTIMONIALS.map((t, idx) => (
                          <div key={t.id} className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 border border-[#FAF9F6] hover:border-[#A3B18A]/20 transform hover:-translate-y-2 ${idx % 2 === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                            {/* Decorative corner element */}
                            <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-[#A3B18A]/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            {/* Quote icon with enhanced animation */}
                            <div className="relative mb-8">
                              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-[#DAD7CD]/10 to-[#A3B18A]/5 rounded-full flex items-center justify-center">
                                <Quote size={20} strokeWidth={1.5} className="text-[#DAD7CD] group-hover:scale-110 transition-all duration-500" />
                              </div>
                            </div>
                            
                            {/* Enhanced testimonial content */}
                            <blockquote className="serif text-xl md:text-2xl mb-8 italic text-[#4A4A4A] leading-relaxed relative">
                              <span className="absolute -top-2 -left-2 text-6xl text-[#A3B18A]/10 font-serif">"</span>
                              <span className="relative z-10 pl-6">{t.quote}</span>
                              <span className="absolute -bottom-6 -right-2 text-6xl text-[#A3B18A]/10 font-serif">"</span>
                            </blockquote>
                            
                            {/* Author section with enhanced styling */}
                            <div className="flex items-center justify-between mt-6 pt-6 border-t border-[#FAF9F6]">
                              <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-gradient-to-br from-[#A3B18A] to-[#588157] rounded-full"></div>
                                <p className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#2D2D2D] group-hover:text-[#A3B18A] transition-colors duration-300">{t.author}</p>
                              </div>
                              
                              {/* Social handles */}
                              <div className="flex space-x-2">
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#A3B18A]/10 transition-colors duration-300 cursor-pointer">
                                  <span className="text-xs text-gray-600">@</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Hover overlay effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#A3B18A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                  
                  <footer className="bg-white border-t border-[#EAEAEA] py-24 px-6">
                    <div className="max-w-7xl mx-auto text-center">
                      <h2 className="serif text-4xl mb-8">nyuk.pe</h2>
                      <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400 italic">nyuk.pe Boutique TODOS LOS DERECHOS RESERVADOS &copy; 2026</p>
                    </div>
                  </footer>
                </>
              )}

              {currentView === 'collection' && selectedCollection && (
                <div className="pt-32 pb-32">
                  <div className="max-w-7xl mx-auto px-6">
                    <button onClick={() => window.history.back()} className="flex items-center space-x-3 text-[9px] uppercase tracking-widest font-bold text-gray-400 hover:text-black mb-12 transition-colors group">
                      <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                      <span>Volver</span>
                    </button>
                    <div className="relative h-[400px] mb-24 overflow-hidden group">
                      <img src={selectedCollection.image} className="w-full h-full object-cover grayscale-[30%]" alt={selectedCollection.title} />
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
                        <p className="text-xs uppercase tracking-[0.4em] mb-4 font-bold opacity-80">{selectedCollection.subtitle}</p>
                        <h1 className="serif text-6xl md:text-8xl italic mb-2 tracking-tighter">{selectedCollection.title}</h1>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                      {productos.filter(p => p.category === selectedCollection.category).map((product) => (
                        <ProductCard key={product.id} product={product} onAddToCart={(p, rect) => addToCart(p, rect)} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentView === 'catalog' && (
                <div className="pt-32 pb-32">
                  <div className="max-w-7xl mx-auto px-6">
                    <button onClick={() => window.history.back()} className="flex items-center space-x-3 text-[9px] uppercase tracking-widest font-bold text-gray-400 hover:text-black mb-12 transition-colors group">
                      <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                      <span>Volver a Inicio</span>
                    </button>
                    <div className="mb-24 text-center">
                      <p className="text-[10px] uppercase tracking-[0.5em] text-[#A3B18A] mb-4 font-bold">Nuestra Selección</p>
                      <h1 className="serif text-6xl italic tracking-tighter">Catálogo General</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                      {productos.map((product) => (
                        <ProductCard key={product.id} product={product} onAddToCart={(p, rect) => addToCart(p, rect)} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </LazyMotion>

      {/* Checkout Overlay Real Funcional */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[110] bg-white flex flex-col lg:flex-row overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-12 lg:p-24 bg-[#FAF9F6]">
            <div className="max-w-xl mx-auto">
              <button onClick={() => setIsCheckoutOpen(false)} className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-gray-400 hover:text-black mb-16 transition-colors">
                <X size={14} /> <span>Cerrar</span>
              </button>

              {checkoutStep !== 'success' && (
                <div className="flex space-x-8 mb-16">
                  {(['shipping', 'message', 'payment'] as const).map((step, idx) => (
                    <div key={step} className={`flex flex-col space-y-2 flex-1 border-t-2 pt-4 transition-all duration-700 ${(idx === 0 && (checkoutStep === 'shipping' || checkoutStep === 'message' || checkoutStep === 'payment')) ||
                      (idx === 1 && (checkoutStep === 'message' || checkoutStep === 'payment')) ||
                      (idx === 2 && checkoutStep === 'payment')
                      ? 'border-[#A3B18A] text-[#2D2D2D]' : 'border-[#EAEAEA] text-gray-300'
                      }`}>
                      <span className="text-[9px] font-bold uppercase tracking-widest">Paso 0{idx + 1}</span>
                      <span className="serif italic text-sm capitalize">{step === 'shipping' ? 'Envío' : step === 'message' ? 'Deseos' : 'Finalizar'}</span>
                    </div>
                  ))}
                </div>
              )}

              {checkoutStep === 'shipping' && (
                <form onSubmit={handleCheckoutSubmit}>
                  <h2 className="serif text-5xl italic mb-12">Detalles de Entrega</h2>

                  <div className="space-y-10">
                    <input
                      required
                      type="text"
                      className="w-full bg-transparent border-b border-[#2D2D2D]/10 py-4 focus:outline-none focus:border-[#A3B18A] transition-colors italic text-lg"
                      placeholder="Nombre Completo del Destinatario"
                      value={checkoutData.name}
                      onChange={e => setCheckoutData({ ...checkoutData, name: e.target.value })}
                    />

                    <input
                      required
                      type="email"
                      className="w-full bg-transparent border-b border-[#2D2D2D]/10 py-4 focus:outline-none focus:border-[#A3B18A] transition-colors italic text-lg"
                      placeholder="Email (para su recibo)"
                      value={checkoutData.email}
                      onChange={e => setCheckoutData({ ...checkoutData, email: e.target.value })}
                    />

                    <input
                      required
                      type="tel"
                      maxLength={9}
                      pattern="[0-9]{9}"
                      className="w-full bg-transparent border-b border-[#2D2D2D]/10 py-4 focus:outline-none focus:border-[#A3B18A] transition-colors italic text-lg"
                      placeholder="Teléfono WhatsApp (9 dígitos)"
                      value={checkoutData.phone}
                      onChange={(e) => {
                        // Solo permitir números
                        const value = e.target.value.replace(/\D/g, '');
                        setCheckoutData({ ...checkoutData, phone: value });
                      }}
                    />

                    <input
                      required
                      type="text"
                      className="w-full bg-transparent border-b border-[#2D2D2D]/10 py-4 focus:outline-none focus:border-[#A3B18A] transition-colors italic text-lg"
                      placeholder="Dirección de Envío (Distrito, Calle, Número)"
                      value={checkoutData.address}
                      onChange={e => setCheckoutData({ ...checkoutData, address: e.target.value })}
                    />

                    <div className="grid grid-cols-2 gap-8">
                      <select
                        required
                        className="w-full bg-transparent border-b border-[#2D2D2D]/10 py-4 focus:outline-none focus:border-[#A3B18A] transition-colors italic text-lg appearance-none"
                        value={checkoutData.month}
                        onChange={e => setCheckoutData({ ...checkoutData, month: e.target.value })}
                      >
                        <option value="">Mes de Entrega</option>
                        {months.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                      <select
                        required
                        className="w-full bg-transparent border-b border-[#2D2D2D]/10 py-4 focus:outline-none focus:border-[#A3B18A] transition-colors italic text-lg appearance-none"
                        value={checkoutData.day}
                        onChange={e => setCheckoutData({ ...checkoutData, day: e.target.value })}
                      >
                        <option value="">Día</option>
                        {Array.from({ length: 31 }).map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#2D2D2D] text-white py-6 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#588157] transition-all flex items-center justify-center space-x-4 mt-12"
                  >
                    <span>Continuar</span> <ArrowRight size={14} />
                  </button>
                </form>
              )}

              {checkoutStep === 'message' && (
                <form onSubmit={handleCheckoutSubmit}>
                  <h2 className="serif text-5xl italic mb-6">El Toque Personal</h2>
                  <div className="bg-white p-12 shadow-xl border border-[#EAEAEA] mb-12">
                    <textarea required className="w-full h-48 bg-transparent focus:outline-none serif italic text-2xl leading-relaxed" placeholder="Escribe aquí tu mensaje..." value={checkoutData.giftMessage} onChange={e => setCheckoutData({ ...checkoutData, giftMessage: e.target.value })} />
                  </div>
                  <button type="submit" className="w-full bg-[#2D2D2D] text-white py-6 text-[10px] uppercase tracking-widest font-bold hover:bg-[#588157] transition-all flex items-center justify-center space-x-4">
                    <span>Siguiente: Pago Seguro</span> <ArrowRight size={14} />
                  </button>
                </form>
              )}

              {checkoutStep === 'payment' && (
                <div>
                  <h2 className="serif text-5xl italic mb-4">Finalizar Compra</h2>
                  <div className="flex items-center space-x-2 text-[#A3B18A] mb-8 bg-[#A3B18A]/5 p-4 rounded-lg">
                    <ShieldCheck size={18} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Transacción Segura Protegida</span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 mb-12 max-w-md mx-auto">
                    {[
                      { id: 'yape', label: 'Yape', icon: <Smartphone size={18} className="text-[#8e24aa]" /> }
                    ].map(method => (
                      <button
                        key={method.id}
                        onClick={() => { setPaymentMethod(method.id as PaymentMethod); setPaymentError(null); }}
                        className={`p-6 border flex flex-col items-center justify-center space-y-3 transition-all ${paymentMethod === method.id
                          ? 'border-[#A3B18A] bg-[#A3B18A]/5 ring-1 ring-[#A3B18A]'
                          : 'border-gray-100 hover:border-[#A3B18A]/30'
                          }`}
                      >
                        {method.icon}
                        <span className="text-[8px] uppercase tracking-widest font-bold">{method.label}</span>
                      </button>
                    ))}
                  </div>

                  {paymentError && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8 flex items-center space-x-3 text-xs border border-red-100 animate-pulse">
                      <AlertCircle size={16} />
                      <span>{paymentError}</span>
                    </div>
                  )}

                  <form onSubmit={handleCheckoutSubmit}>
                    <div className="text-center p-12 bg-white rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#A3B18A] to-transparent"></div>
                      <img src="/imagenes/qryape-nyuk.png" alt="QR para pagar nyuk.pe" className="w-[300px] h-[300px] mx-auto mb-8" />
                      <p className="serif italic text-2xl mb-2">Escanea para pagar</p>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-4 font-bold">nyuk.pe Boutique</p>
                      <p className="text-[20px] text-gray-500 mb-8">Número: <span className="font-bold">934202560</span></p>

                      <label className="block cursor-pointer bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-3xl border-2 border-dashed border-rose-300 hover:border-rose-500 hover:shadow-[0_20px_40px_-15px_rgba(244,114,182,0.4)] transition-all duration-500 group relative overflow-hidden">
                        {/* Efectos decorativos sutiles */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-6 left-6 w-3 h-3 bg-rose-300 rounded-full animate-pulse"></div>
                          <div className="absolute top-16 right-10 w-2 h-2 bg-pink-300 rounded-full animate-pulse delay-100"></div>
                          <div className="absolute bottom-10 left-8 w-4 h-4 bg-rose-200 rounded-full animate-pulse delay-200"></div>
                        </div>
                        
                        {/* Brillo sutil */}
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        
                        <input type="file" accept="image/*" className="hidden" onChange={handleReceiptUpload} />
                        {receiptImage ? (
                          <div className="relative z-10 flex items-center justify-center space-x-3 text-[#A3B18A]">
                            <CheckCircle2 size={20} />
                            <span className="text-[10px] uppercase tracking-widest font-bold">Comprobante Cargado</span>
                          </div>
                        ) : (
                          <div className="relative z-10 flex flex-col items-center space-y-4 text-gray-600 group-hover:text-rose-600 transition-colors">
                            <div className="relative">
                              <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                                <Camera size={32} className="text-white" />
                              </div>
                              <div className="absolute -top-2 -right-2 w-4 h-4 bg-rose-300 rounded-full animate-pulse"></div>
                            </div>
                            <span className="text-[14px] uppercase font-bold tracking-widest">Sube tu Captura de Pago</span>
                            <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold text-center px-4">Una vez verificado, se confirmará la orden por WhatsApp.</p>
                          </div>
                        )}
                      </label>

                      <button type="submit" disabled={isProcessing || !receiptImage} className="w-full bg-[#A3B18A] text-white py-6 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#588157] mt-12 shadow-[0_20px_40px_-10px_rgba(163,177,138,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-4">
                        {/* Debug: Log receipt state */}
                        {console.log('Button render - receiptImage exists:', !!receiptImage)}
                        {isProcessing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Procesando Pago Seguro...</span>
                          </>
                        ) : (
                          <>
                            {!receiptImage ? (
                              <>
                                <Camera size={16} />
                                <span>Sube el Comprobante para Pagar</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle2 size={16} />
                                <span>Pagar — S/ {totalPrice.toFixed(2)}</span>
                              </>
                            )}
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {checkoutStep === 'success' && (
                <div className="text-center py-12">
                  <div className="flex justify-center mb-12">
                    <div className="w-24 h-24 bg-[#A3B18A]/10 rounded-full flex items-center justify-center animate-[bounce_2s_infinite]">
                      <CheckCircle2 size={48} className="text-[#A3B18A]" strokeWidth={1} />
                    </div>
                  </div>
                  <h2 className="serif text-6xl italic mb-6">Pedido Confirmado.</h2>
                  <p className="text-gray-500 text-xl font-light italic leading-relaxed mb-12 max-sm mx-auto">
                    Gracias, {checkoutData.name}. Tu pedido ha sido registrado en nuestro sistema de despacho para el {checkoutData.day} de {checkoutData.month}.
                  </p>
                  <div className="bg-white p-8 rounded-2xl border border-[#EAEAEA] mb-12 text-left shadow-sm">
                    <p className="text-[9px] uppercase tracking-widest font-bold text-gray-400 mb-4">Resumen de Registro</p>
                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-xs">Estado de Pago:</span> <span className="text-xs font-bold text-[#A3B18A] uppercase">En revisión</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-xs">Fecha de Envío:</span> <span className="text-xs font-bold uppercase">{checkoutData.day} {checkoutData.month}</span>
                    </div>
                  </div>
                  <button onClick={() => {
        // Limpiar estado y cerrar
        setIsCheckoutOpen(false);
        setCart([]);
        setReceiptImage(null); // Limpiar imagen del comprobante
        // Resetear formulario
        setCheckoutData({
          name: '',
          email: '',
          phone: '',
          address: '',
          day: '',
          month: '',
          giftMessage: '',
        });
        // Resetear al paso inicial
        setCheckoutStep('shipping');
        // Volver al inicio
        setCurrentView('home');
        window.scrollTo(0, 0);
      }} className="w-full bg-[#2D2D2D] text-white py-6 text-[10px] uppercase tracking-[0.3em] font-bold hover:opacity-80 transition-all shadow-lg">Volver a la Página Principal</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-[120] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500" onClick={() => {
            if (window.location.hash === '#wishlist') {
              window.history.back();
            } else {
              setIsWishlistOpen(false);
            }
          }}></div>
          <div className="relative bg-[#FAF9F6] w-full max-w-md h-full shadow-2xl p-10 flex flex-col transform animate-[slide-in-right_0.5s_ease-out]">
            <div className="flex justify-between items-center mb-16">
              <h2 className="serif text-3xl italic tracking-tighter">Favoritos</h2>
              <button onClick={() => {
                setIsWishlistOpen(false);
                if (window.location.hash === '#wishlist') {
                  window.history.back();
                }
              }}><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-10 pr-2">
              {wishlistItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-6">
                  <Heart size={48} strokeWidth={1} className="text-gray-200 mb-6" />
                  <p className="serif italic text-2xl text-gray-300">"Tu jardín de deseos espera..."</p>
                </div>
              ) : (
                wishlistItems.map(item => (
                  <div key={item.id} className="flex space-x-6 items-start border-b border-gray-100 pb-8 last:border-0">
                    <img src={item.image} className="w-24 h-32 object-cover rounded-sm" alt="" />
                    <div className="flex-1">
                      <h3 className="text-[10px] font-bold uppercase mb-2">{item.name}</h3>
                      <p className="text-[10px] text-gray-400 mb-4">S/{item.price}</p>
                      <div className="flex items-center space-x-4">
                        <button onClick={() => { addToCart(item); setIsWishlistOpen(false); }} className="text-[9px] uppercase font-bold text-[#A3B18A] hover:underline">
                          Añadir a Bolsa
                        </button>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Eliminar de favoritos"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cart Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[120] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => {
            if (window.location.hash === '#cart') {
              window.history.back();
            } else {
              setIsCartOpen(false);
            }
          }}></div>
          <div className="relative bg-[#FAF9F6] w-full max-w-md h-full shadow-2xl p-10 flex flex-col transform animate-[slide-in-right_0.5s_ease-out]">
            <div className="flex justify-between items-center mb-16">
              <div className="flex-1">
                <h2 className="serif text-3xl italic tracking-tighter">Bolsa</h2>
                {cart.length > 0 && (
                  <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-1">
                    {cart.length} {cart.length === 1 ? 'artículo' : 'artículos'}
                  </p>
                )}
              </div>
              {cart.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm('¿Vaciar todo el carrito?')) {
                      setCart([]);
                    }
                  }}
                  className="text-gray-400 hover:text-red-500 transition-colors text-[9px] uppercase tracking-widest font-bold mr-6"
                >
                  Vaciar
                </button>
              )}
              <button onClick={() => {
                setIsCartOpen(false);
                if (window.location.hash === '#cart') {
                  window.history.back();
                }
              }}><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-8">
              {cart.map(item => (
                <div key={item.id} className="flex space-x-6 items-center border-b border-gray-100 pb-6">
                  <img src={item.image} className="w-16 h-20 object-cover rounded-sm" alt="" />
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase mb-3">{item.name}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-gray-100 rounded-sm bg-white">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-gray-50 transition-colors">
                          <Minus size={10} />
                        </button>
                        <span className="px-3 text-[10px] font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-gray-50 transition-colors">
                          <Plus size={10} />
                        </button>
                      </div>
                      <button
                        onClick={() => updateQuantity(item.id, -item.quantity)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <span className="text-xs font-bold">S/ {item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="pt-8 border-t border-gray-100">
                <div className="flex justify-between mb-8">
                  <span className="serif text-2xl italic">Total</span>
                  <span className="serif text-2xl italic">S/{totalPrice.toFixed(2)}</span>
                </div>
                <button onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }} className="w-full bg-[#2D2D2D] text-white py-6 text-[10px] uppercase tracking-widest font-bold hover:bg-[#588157] transition-all">Finalizar Pedido</button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Floating Social Buttons */}
      <FloatingSocialButtons />
    </div>
  );
};

export default App;
