
//cambioooooooooooooooooooooooooooooooooooos4
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { FloralAssistant } from './components/FloralAssistant';
import { PRODUCTS, TESTIMONIALS, DetailedFlower, POPULAR_PRODUCTS, COLLECTIONS, GALLERY_IMAGES } from './constants';
import { cargarProductos, Product as ProductFromSheet } from './services/productService';
import { CartItem, Product, Transaction } from './types';
import { recordTransaction, validateCardNumber, getCardType } from './services/transactionService';
import { X, Minus, Plus, Trash2, Quote, ArrowRight, Info, ChevronRight, Instagram, ShoppingBag, Heart, CreditCard, Truck, Calendar, MessageSquare, CheckCircle2, QrCode, Wallet, Smartphone, ArrowLeft, Camera, ShieldCheck, AlertCircle, Star } from 'lucide-react';

interface FlyingItem {
  id: number;
  src: string;
  start: { x: number; y: number; width: number; height: number };
}

type CheckoutStep = 'shipping' | 'message' | 'payment' | 'success';
type PaymentMethod = 'yape' | 'plin';
type AppView = 'home' | 'collection' | 'catalog';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
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
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Cargar productos desde Google Sheets
    cargarProductosDesdeSheets();

    // Actualizar wishlist cuando cambie
    window.addEventListener('wishlistUpdated', updateWishlistItems);

    return () => {
      clearTimeout(timer);
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
      const currentScroll = window.scrollY;
      setIsWishlistOpen(true);
      window.history.pushState(
        { view: currentView, panel: 'wishlist', scrollY: currentScroll },
        '',
        '#wishlist'
      );
    } else if (sectionName === 'Home') {
      setCurrentView('home');
      window.history.pushState(
        { view: 'home', scrollY: 0 },
        '',
        '#home'
      );
      window.scrollTo(0, 0);
    } else {
      setShowSoonModal(sectionName);
    }
  };

  const openCollection = (collection: any) => {
    setSelectedCollection(collection);
    setCurrentView('collection');

    // Agregar al historial
    window.history.pushState(
      { view: 'collection', collection, scrollY: 0 },
      '',
      `#collection/${collection.id}`
    );

    window.scrollTo(0, 0);
  };

  const addToCart = (product: any, startRect?: DOMRect) => {
    if (startRect) {
      const id = Date.now();
      setFlyingItems(prev => [...prev, {
        id,
        src: product.image,
        start: {
          x: startRect.left,
          y: startRect.top,
          width: startRect.width,
          height: startRect.height
        }
      }]);

      setTimeout(() => {
        setFlyingItems(prev => prev.filter(item => item.id !== id));
        window.dispatchEvent(new CustomEvent('cartImpact'));
      }, 850);
    }

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError(null);

    if (checkoutStep === 'shipping') {
      setCheckoutStep('message');
    } else if (checkoutStep === 'message') {
      setCheckoutStep('payment');
    } else if (checkoutStep === 'payment') {

      // Validación: Solo verificar que se subió el comprobante
      if ((paymentMethod === 'yape' || paymentMethod === 'plin') && !receiptImage) {
        setPaymentError('Por favor, sube una captura del comprobante de pago.');
        return;
      }

      setIsProcessing(true);

      const newTransaction: Transaction = {
        orderId: `EDEN-${new Date().getDate()}${new Date().getMonth() + 1}-${Math.random().toString(36).substr(2, 3).toUpperCase()}`,
        customerName: checkoutData.name,
        customerEmail: checkoutData.email || 'cliente@ejemplo.pe',
        customerPhone: checkoutData.phone, // ← AGREGADO: Teléfono
        address: checkoutData.address,
        total: totalPrice,
        items: cart.map(item => ({ name: item.name, quantity: item.quantity, price: item.price })),
        paymentMethod: paymentMethod,
        giftMessage: checkoutData.giftMessage, // ← AGREGADO: Mensaje regalo
        status: 'pending', // ← CAMBIADO: pending en lugar de completed
        date: new Date().toISOString(),
        deliveryDate: `${checkoutData.day} de ${checkoutData.month}`
      };

      // Registro en Google Sheets con comprobante
      const success = await recordTransaction(newTransaction, receiptImage); // ← AGREGADO: receiptImage

      setTimeout(() => {
        setIsProcessing(false);
        if (success) {
          setCheckoutStep('success');
          setCart([]);
          triggerPetalRain();
        } else {
          setPaymentError('Error al procesar el registro. Intente nuevamente.');
        }
      }, 2000);
    }
  };

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setReceiptImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const popularIds = POPULAR_PRODUCTS.map(p => p.id);
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  return (
    <div className="relative min-h-screen selection:bg-[#A3B18A] selection:text-white overflow-x-hidden bg-[#FAF9F6]">
      {isLoading && <LoadingScreen />}

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

      <main className={`transition-opacity duration-[800ms] ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {currentView === 'home' && (
          <>
            <Hero onShopClick={(e) => handleLinkClick(e, 'Colecciones')}
              onCatalogClick={(e) => handleLinkClick(e, 'Catálogo')}
              mediaUrl="/videos/FondoFloral-Hero.mp4" />
            <section className="py-16 md:py-32 px-4 md:px-6 bg-[#FDFCFB]">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
                  <div className="lg:col-span-5 reveal">
                    <p className="text-[10px] uppercase tracking-[0.5em] text-[#A3B18A] mb-4 font-bold">Selección Destacada</p>
                    <h2 className="serif text-5xl md:text-7xl italic leading-tight mb-8">Lo último en
                      L'Art d'Éden</h2>
                    <p className="text-gray-500 text-lg font-light leading-relaxed mb-10 max-w-md">Descubra las piezas que han capturado los corazones de nuestros clientes.</p>
                    <div className="flex flex-col space-y-12">
                      {POPULAR_PRODUCTS.map((product, i) => (
                        <div key={product.id} className="flex items-center space-x-6 group cursor-pointer" onClick={() => addToCart(product)}>
                          <span className="serif text-3xl text-[#EAEAEA] group-hover:text-[#A3B18A] transition-colors italic">0{i + 1}</span>
                          <div>
                            <h4 className="text-xs uppercase tracking-[0.2em] font-bold group-hover:translate-x-2 transition-transform">{product.name}</h4>
                            <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest italic">Best Seller</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6 reveal reveal-delay-2">
                    {/* Producto Popular 1 */}
                    <div className="aspect-[4/5] md:aspect-[3/5] relative group overflow-hidden shadow-2xl md:mt-12 rounded-sm">
                      <img
                        src={POPULAR_PRODUCTS[0].image}
                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                        alt="popular-1"
                      />

                      {/* Overlay con botón */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const imgElement = e.currentTarget.closest('.aspect-\\[4\\/5\\]')?.querySelector('img') ||
                              e.currentTarget.closest('.aspect-\\[3\\/5\\]')?.querySelector('img');
                            if (imgElement) {
                              const rect = imgElement.getBoundingClientRect();
                              addToCart(POPULAR_PRODUCTS[0], rect);
                            } else {
                              addToCart(POPULAR_PRODUCTS[0]);
                            }
                          }}
                          className="bg-white text-black text-[10px] uppercase tracking-widest px-6 py-3 font-bold hover:bg-[#2D2D2D] hover:text-white transition-all"
                        >
                          Añadir al Carrito
                        </button>
                      </div>

                      {/* Badges Stack - Mantiene diseño original */}
                      <div className="absolute top-5 left-5 flex flex-col space-y-2 items-start z-10">
                        {/* Badge "Nuevo" */}
                        <span className="bg-white/95 backdrop-blur-sm border border-[#A3B18A]/30 px-3 py-1 text-[10px] serif italic shadow-sm text-[#A3B18A] tracking-wider">
                          Nuevo
                        </span>
                        {/* Badge Categoría */}
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[8px] uppercase tracking-[0.25em] font-bold shadow-sm text-[#2D2D2D]">
                          {POPULAR_PRODUCTS[0].category}
                        </span>
                        {/* Badge "Edición Limitada" */}
                        <span className="bg-[#A3B18A]/90 backdrop-blur-sm text-white px-3 py-1.5 text-[8px] uppercase tracking-[0.25em] font-bold shadow-sm flex items-center space-x-1.5 animate-pulse">
                          <Star size={8} fill="currentColor" />
                          <span>Edición Limitada</span>
                        </span>
                      </div>
                    </div>

                    {/* Producto Popular 2 */}
                    <div className="aspect-[4/5] md:aspect-[3/5] relative group overflow-hidden shadow-2xl md:-mt-12 rounded-sm">
                      <img
                        src={POPULAR_PRODUCTS[1].image}
                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                        alt="popular-2"
                      />

                      {/* Overlay con botón */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const imgElement = e.currentTarget.closest('.aspect-\\[4\\/5\\]')?.querySelector('img') ||
                              e.currentTarget.closest('.aspect-\\[3\\/5\\]')?.querySelector('img');
                            if (imgElement) {
                              const rect = imgElement.getBoundingClientRect();
                              addToCart(POPULAR_PRODUCTS[1], rect);
                            } else {
                              addToCart(POPULAR_PRODUCTS[1]);
                            }
                          }}
                          className="bg-white text-black text-[10px] uppercase tracking-widest px-6 py-3 font-bold hover:bg-[#2D2D2D] hover:text-white transition-all"
                        >
                          Añadir al carrito
                        </button>
                      </div>

                      {/* Badges Stack - Mantiene diseño original */}
                      <div className="absolute top-5 left-5 flex flex-col space-y-2 items-start z-10">
                        {/* Badge Categoría */}
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[8px] uppercase tracking-[0.25em] font-bold shadow-sm text-[#2D2D2D]">
                          {POPULAR_PRODUCTS[1].category}
                        </span>
                        {/* Badge "Edición Limitada" */}
                        <span className="bg-[#A3B18A]/90 backdrop-blur-sm text-white px-3 py-1.5 text-[8px] uppercase tracking-[0.25em] font-bold shadow-sm flex items-center space-x-1.5 animate-pulse">
                          <Star size={8} fill="currentColor" />
                          <span>Edición Limitada</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section id="collections" ref={collectionsRef} className="py-32 px-6 bg-white">
              <div className="max-w-7xl mx-auto">
                <div className="mb-20 text-center">
                  <p className="text-[10px] uppercase tracking-[0.5em] text-[#A3B18A] mb-4 font-bold">Inspiración por últimas tendencias</p>
                  <h2 className="serif text-5xl md:text-6xl italic">Colecciones Florales</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {COLLECTIONS.map((collection) => (
                    <div key={collection.id} className="relative group h-[500px] overflow-hidden cursor-pointer" onClick={() => openCollection(collection)}>
                      <img src={collection.image} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" alt={collection.title} />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-700"></div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-10">
                        <p className="text-[10px] uppercase tracking-[0.4em] mb-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 font-bold">{collection.subtitle}</p>
                        <h3 className="serif text-5xl italic mb-6">{collection.title}</h3>
                        <div className="w-12 h-[1px] bg-white group-hover:w-24 transition-all duration-700"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <section id="catalog" className="py-32 px-6">
              <div className="max-w-7xl mx-auto text-center">
                <div className="mb-20 reveal">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-[#588157] mb-3 font-medium">Catálogo General</p>
                  <h3 className="serif text-5xl italic tracking-tight">Selección de la Temporada</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 mb-24 text-left">
                  {productos.slice(0, 6).map((product, idx) => (
                    <div key={product.id} className={`reveal reveal-delay-${(idx % 3) + 1}`}>
                      <ProductCard product={product} onAddToCart={(p, rect) => addToCart(p, rect)} isPopular={popularIds.includes(product.id)} />
                    </div>
                  ))}
                </div>
                <div className="flex justify-center">
                  <button onClick={() => navigateToSection('Catálogo')} className="group flex flex-col items-center space-y-4 text-[10px] uppercase tracking-[0.3em] font-bold text-[#2D2D2D]">
                    <span>Ver todo el catálogo</span>
                    <div className="w-16 h-[1px] bg-[#2D2D2D] group-hover:w-40 transition-all duration-700 ease-in-out"></div>
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {currentView === 'collection' && selectedCollection && (
          <div className="pt-32 pb-32 animate-[fade-up_0.8s_ease-out]">
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
          <div className="pt-32 pb-32 animate-[fade-up_0.8s_ease-out]">
            <div className="max-w-7xl mx-auto px-6">
              <button onClick={() => window.history.back()} className="flex items-center space-x-3 text-[9px] uppercase tracking-widest font-bold text-gray-400 hover:text-black mb-12 transition-colors group">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                <span>Volver a Inicio</span>
              </button>
              <div className="mb-24 text-center">
                <p className="text-[10px] uppercase tracking-[0.5em] text-[#A3B18A] mb-4 font-bold">Nuestra Seleeción</p>
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

        {currentView === 'home' && (
          <>
            <section className="bg-[#DAD7CD]/20 py-32 overflow-hidden">
              <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-24">
                <div className="w-full lg:w-1/2 relative group">
                  <img src="/imagenes/FOTO-HISTORIA.jpg" alt="Artista floral" className="w-full h-[700px] object-cover rounded-sm grayscale-[30%] shadow-2xl" />
                </div>
                <div className="w-full lg:w-1/2">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-[#A3B18A] mb-6 block font-bold">El Oficio</span>
                  <h2 className="serif text-6xl mb-10 leading-[1.1] italic">La fleur est une trace du divin...</h2>
                  <p className="text-gray-600 leading-relaxed mb-12 text-xl font-light italic">En L’Art d’Éden creemos que toda belleza nace de Dios y vuelve a Él. Cada creación es un gesto silencioso de gratitud, un recuerdo del primer jardín y una forma delicada de expresar lo que el corazón no siempre puede decir.

                    Porque hay emociones que no se explican.
                    Se confían, simplemente, a una flor.</p>
                </div>
              </div>
            </section>
            <section className="py-32 bg-[#FAF9F6]">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-24 reveal">
                  <DetailedFlower className="w-10 h-10 grayscale opacity-40 mx-auto mb-6" />
                  <p className="text-[10px] uppercase tracking-[0.5em] text-[#A3B18A] mb-4 font-bold">Voces Botánicas</p>
                  <h2 className="serif text-4xl italic tracking-tight">Elogios de Nuestros Clientes</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
                  {TESTIMONIALS.map((t, idx) => (
                    <div key={t.id} className={`reveal reveal-delay-${idx + 1} flex flex-col items-center text-center group`}>
                      <Quote size={40} strokeWidth={1} className="mb-10 text-[#DAD7CD] group-hover:text-[#A3B18A] transition-colors" />
                      <blockquote className="serif text-2xl mb-10 italic text-[#4A4A4A]">"{t.quote}"</blockquote>
                      <p className="text-[11px] uppercase tracking-[0.3em] font-bold">{t.author}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
        <footer className="bg-white border-t border-[#EAEAEA] py-24 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="serif text-4xl mb-8">L'Art d'Éden</h2>
            <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400 italic">Florería L'Art d'Éden TODOS LOS DERECHOS RESERVADOS &copy; 2026</p>
          </div>
        </footer>
      </main>

      {/* Checkout Overlay Real Funcional */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[110] bg-white flex flex-col lg:flex-row overflow-hidden animate-[fade-up_0.6s_ease-out]">
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
                <form onSubmit={handleCheckoutSubmit} className="reveal">
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

                    {/* ← NUEVO: Campo de teléfono para WhatsApp */}
                    <input
                      required
                      type="tel"
                      className="w-full bg-transparent border-b border-[#2D2D2D]/10 py-4 focus:outline-none focus:border-[#A3B18A] transition-colors italic text-lg"
                      placeholder="Teléfono WhatsApp (+51 987 654 321)"
                      value={checkoutData.phone}
                      onChange={e => setCheckoutData({ ...checkoutData, phone: e.target.value })}
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

                    <button
                      type="submit"
                      className="w-full bg-[#2D2D2D] text-white py-6 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#588157] transition-all flex items-center justify-center space-x-4 mt-12"
                    >
                      <span>Continuar</span> <ArrowRight size={14} />
                    </button>
                  </div>
                </form>
              )}

              {checkoutStep === 'message' && (
                <form onSubmit={handleCheckoutSubmit} className="reveal">
                  <h2 className="serif text-5xl italic mb-6">El Toque Personal</h2>
                  <div className="bg-white p-12 shadow-xl border border-[#EAEAEA] mb-12">
                    <textarea required className="w-full h-48 bg-transparent focus:outline-none serif italic text-2xl leading-relaxed" placeholder="Escribe aquí tu mensaje..." value={checkoutData.giftMessage} onChange={e => setCheckoutData({ ...checkoutData, giftMessage: e.target.value })} />
                  </div>
                  <button type="submit" className="w-full bg-[#2D2D2D] text-white py-6 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#588157] transition-all flex items-center justify-center space-x-4">
                    <span>Siguiente: Pago Seguro</span> <ArrowRight size={14} />
                  </button>
                </form>
              )}

              {checkoutStep === 'payment' && (
                <div className="reveal">
                  <h2 className="serif text-5xl italic mb-4">Finalizar Compra</h2>
                  <div className="flex items-center space-x-2 text-[#A3B18A] mb-8 bg-[#A3B18A]/5 p-4 rounded-lg">
                    <ShieldCheck size={18} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Transacción Segura Protegida</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-12 max-w-md mx-auto">
                    {[
                      { id: 'yape', label: 'Yape', icon: <Smartphone size={18} className="text-[#8e24aa]" /> },
                      { id: 'plin', label: 'Plin', icon: <Smartphone size={18} className="text-[#00bcd4]" /> }
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
                    {/* Formulario Yape/Plin - ÚNICO */}
                    <div className="text-center p-12 bg-white rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#A3B18A] to-transparent"></div>
                      <QrCode size={180} className="mx-auto text-[#2D2D2D] mb-8" />
                      <p className="serif italic text-2xl mb-2">Escanea para pagar</p>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-4 font-bold">L'Art d'Éden Boutique</p>
                      <p className="text-[13px] text-gray-500 mb-8">Número: <span className="font-bold">955354633</span></p>

                      <label className="block cursor-pointer bg-[#F8F8F8] p-6 rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#A3B18A] transition-all">
                        <input type="file" accept="image/*" className="hidden" onChange={handleReceiptUpload} />
                        {receiptImage ? (
                          <div className="flex items-center justify-center space-x-3 text-[#A3B18A]">
                            <CheckCircle2 size={20} />
                            <span className="text-[10px] uppercase font-bold tracking-widest">Comprobante Cargado</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center space-y-3 text-gray-400">
                            <Camera size={24} />
                            <span className="text-[12px] uppercase font-bold tracking-widest">Subir captura del pago</span>
                            <p className="text-[8px] uppercase tracking-widest text-gray-400 mb-4 font-bold">Una vez verificado, se confirmará la orden por WhatsApp.</p>
                          </div>
                        )}
                      </label>
                    </div>

                    <button type="submit" disabled={isProcessing} className="w-full bg-[#A3B18A] text-white py-6 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#588157] mt-12 shadow-[0_20px_40px_-10px_rgba(163,177,138,0.5)] transition-all disabled:opacity-50 flex items-center justify-center space-x-4">
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Procesando Pago Seguro...</span>
                        </>
                      ) : (
                        <span>Pagar — S/ {totalPrice.toFixed(2)}</span>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {checkoutStep === 'success' && (
                <div className="text-center reveal py-12">
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
                  <button onClick={() => { setIsCheckoutOpen(false); setCheckoutStep('shipping'); setCurrentView('home'); window.scrollTo(0, 0); }} className="w-full bg-[#2D2D2D] text-white py-6 text-[10px] uppercase tracking-[0.3em] font-bold hover:opacity-80 transition-all shadow-lg">Volver a la Boutique</button>
                </div>
              )}
            </div>
          </div>
          {checkoutStep !== 'success' && (
            <div className="hidden lg:block w-[450px] bg-white border-l border-[#EAEAEA] p-16 relative">
              <div className="sticky top-24">
                <h3 className="serif text-3xl italic mb-12">Detalle</h3>
                <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4 mb-12 scrollbar-hide">
                  {cart.map(item => (
                    <div key={item.id} className="flex space-x-4 items-center animate-[fade-up_0.4s_ease-out]">
                      <div className="w-16 h-20 bg-gray-50 overflow-hidden rounded-sm">
                        <img src={item.image} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-1">{item.name}</p>
                        <p className="text-[9px] text-gray-400">Cantidad: {item.quantity}</p>
                      </div>
                      <span className="text-xs font-medium">S/{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4 pt-10 border-t border-gray-100">
                  <div className="flex justify-between text-gray-400 text-[10px] uppercase tracking-widest">
                    <span>Subtotal</span> <span>S/ {totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 text-[10px] uppercase tracking-widest">
                    <span>Envío (Lima Metropolitana)</span> <span>Gratis</span>
                  </div>
                  <div className="flex justify-between pt-6">
                    <span className="serif text-3xl italic">Total</span>
                    <span className="serif text-3xl italic">S/ {totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
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

      <FloralAssistant />
    </div>
  );
};

export default App;
