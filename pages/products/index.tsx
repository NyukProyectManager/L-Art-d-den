import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ShoppingCart, Heart, Star, Clock, MapPin, Award, Share2, ChevronLeft } from 'lucide-react';
import BlogNavbar from '../../components/BlogNavbar';
import Footer from '../../components/Footer';

interface Product {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  image: string;
  gallery: string[];
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  features: string[];
  careInstructions: string[];
  dimensions: string;
  deliveryTime: string;
  occasions: string[];
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'Rosa de Ébano Eterna',
        description: 'Exquisito ramo de 25 rosas rojas premium seleccionadas manualmente',
        longDescription: 'Un ramo espectacular de 25 rosas rojas premium de la más alta calidad. Cada rosa es seleccionada manualmente por nuestros expertos floristas para garantizar perfección en cada pétalo. Ideal para expresar el amor más profundo y pasional en ocasiones especiales como aniversarios, San Valentín o simplemente para sorprender a esa persona especial.',
        price: 125,
        originalPrice: 145,
        image: '/imagenes/productos/rosa-ebono-hero.jpg',
        gallery: [
          '/imagenes/productos/rosa-ebono-hero.jpg',
          '/imagenes/productos/rosa-ebono-detail.jpg',
          '/imagenes/productos/rosa-ebono-close.jpg',
          '/imagenes/productos/rosa-ebono-packaging.jpg'
        ],
        category: 'Romance',
        rating: 5.0,
        reviews: 298,
        inStock: true,
        isPopular: true,
        features: [
          '25 rosas rojas premium',
          'Selección manual experta',
          'Packaging de lujo',
          'Tarjeta personalizada',
          'Garantía de frescura 24h',
          'Certificado de calidad'
        ],
        careInstructions: [
          'Cortar tallos en ángulo de 45°',
          'Cambiar agua cada 2 días',
          'Mantener alejado del sol directo',
          'Usar el alimento floral incluido',
          'Retirar pétalos marchitos'
        ],
        dimensions: '40cm alto x 35cm diámetro',
        deliveryTime: '30 minutos',
        occasions: ['Aniversario', 'San Valentín', 'Propuesta', 'Romance', 'Disculpas']
      },
      {
        id: 2,
        name: 'Jardín de Primavera',
        description: 'Colorida mezcla de flores de temporada con lirios, tulipanes y margaritas',
        longDescription: 'Una explosión de colores y alegría con esta mezcla perfecta de flores de temporada. Lirios blancos, tulipanes multicolor y margaritas frescas crean un arreglo vibrante que ilumina cualquier espacio. Perfecto para celebrar la vida, expresar gratitud o simplemente alegrar el día de alguien especial.',
        price: 89,
        image: '/imagenes/productos/jardin-primavera-hero.jpg',
        gallery: [
          '/imagenes/productos/jardin-primavera-hero.jpg',
          '/imagenes/productos/jardin-primavera-detail.jpg',
          '/imagenes/productos/jardin-primavera-close.jpg'
        ],
        category: 'Alegría',
        rating: 4.8,
        reviews: 156,
        inStock: true,
        isNew: true,
        features: [
          'Mix de flores de temporada',
          'Colores vibrantes',
          'Diseño equilibrado',
          'Perfecto para cualquier ocasión',
          'Larga duración',
          'Envuelto ecológico'
        ],
        careInstructions: [
          'Rociar agua en las flores',
          'Evitar corrientes de aire',
          'Mantener en lugar fresco',
          'Cambiar agua cada 2 días'
        ],
        dimensions: '35cm alto x 30cm diámetro',
        deliveryTime: '30 minutos',
        occasions: ['Cumpleaños', 'Agradecimiento', 'Amistad', 'Recuperación', 'Celebración']
      },
      {
        id: 3,
        name: 'Elegancia Blanca',
        description: 'Sofisticado arreglo de lirios blancos y claveles para ocasiones especiales',
        longDescription: 'Pureza y elegancia definidas en cada flor. Lirios blancos majestuosos combinados con claveles inmaculados crean un arreglo sofisticado perfecto para bodas, eventos formales o expresar condolencias con delicadeza y respeto.',
        price: 95,
        originalPrice: 110,
        image: '/imagenes/productos/elegancia-blanca-hero.jpg',
        gallery: [
          '/imagenes/productos/elegancia-blanca-hero.jpg',
          '/imagenes/productos/elegancia-blanca-detail.jpg',
          '/imagenes/productos/elegancia-blanca-close.jpg'
        ],
        category: 'Elegancia',
        rating: 4.9,
        reviews: 203,
        inStock: true,
        features: [
          'Lirios blancos premium',
          'Claveles inmaculados',
          'Diseño simétrico perfecto',
          'Aroma suave y delicado',
          'Ideal para eventos formales',
          'Presentación elegante'
        ],
        careInstructions: [
          'Mantener en lugar fresco',
          'Evitar humedad excesiva',
          'Cortar tallos diagonalmente',
          'Usar agua fresca'
        ],
        dimensions: '45cm alto x 40cm diámetro',
        deliveryTime: '35 minutos',
        occasions: ['Boda', 'Bautizo', 'Condolencias', 'Evento Formal', 'Graduación']
      }
    ];

    setProducts(mockProducts);
    setLoading(false);
  }, []);

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    const discountPercentage = product.originalPrice 
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
        {/* Image Gallery */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-rose-50 to-pink-50">
          <div className="relative h-full">
            <img 
              src={product.gallery[currentImage]} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Gallery Navigation */}
            {product.gallery.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
                {product.gallery.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImage ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {product.isNew && (
                <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Nuevo
                </span>
              )}
              {product.isPopular && (
                <span className="bg-rose-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Popular
                </span>
              )}
              {discountPercentage > 0 && (
                <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                  -{discountPercentage}%
                </span>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-600 text-rose-600' : 'text-gray-600'}`} />
              </button>
              <button className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-6">
          {/* Category */}
          <div className="text-sm text-rose-600 font-medium mb-2">
            {product.category}
          </div>
          
          <h3 className="text-2xl font-serif text-gray-900 mb-3">
            {product.name}
          </h3>
          
          <p className="text-gray-600 mb-4">
            {product.description}
          </p>
          
          {/* Features */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {product.features.slice(0, 3).map((feature, idx) => (
                <span key={idx} className="bg-rose-50 text-rose-700 px-2 py-1 rounded-full text-xs">
                  {feature}
                </span>
              ))}
              {product.features.length > 3 && (
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  +{product.features.length - 3} más
                </span>
              )}
            </div>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
              <span className="text-sm text-gray-600 ml-1">
                {product.rating}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              ({product.reviews} reseñas)
            </span>
          </div>
          
          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold text-rose-600">
                  S/. {product.price}
                </div>
                {product.originalPrice && (
                  <div className="text-sm text-gray-400 line-through">
                    S/. {product.originalPrice}
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-500">
                Delivery {product.deliveryTime}
              </div>
            </div>
            
            {/* Stock Status */}
            <div className="text-sm">
              {product.inStock ? (
                <span className="text-green-600 font-medium">✓ En stock</span>
              ) : (
                <span className="text-red-600 font-medium">✗ Agotado</span>
              )}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 bg-rose-600 text-white px-4 py-3 rounded-lg hover:bg-rose-700 transition-colors flex items-center justify-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span>Agregar al Carrito</span>
            </button>
            <button className="w-12 h-12 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
              <span className="text-sm">💬</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Todos los Productos | Flores Premium | Nyuk Boutique Floral</title>
        <meta name="description" content="Explora todos nuestros productos de flores premium: rosas, lirios, tulipanes y arreglos exclusivos. Calidad garantizada con delivery inmediato." />
        <meta name="keywords" content="productos flores, flores premium, arreglos florales, comprar flores, rosas, lirios, tulipanes" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Todos los Productos | Flores Premium | Nyuk Boutique Floral" />
        <meta property="og:description" content="Explora todos nuestros productos de flores premium: rosas, lirios, tulipanes y arreglos exclusivos." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nyuk.vercel.app/products/" />
        <meta property="og:image" content="https://nyuk.vercel.app/imagenes/products/nyuk-productos.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Todos los Productos | Flores Premium | Nyuk Boutique Floral" />
        <meta name="twitter:description" content="Explora todos nuestros productos de flores premium: rosas, lirios, tulipanes y arreglos exclusivos." />
        <meta name="twitter:image" content="https://nyuk.vercel.app/imagenes/products/nyuk-productos.jpg" />
        <meta name="twitter:site" content="@nyuk_pe" />
        <meta name="twitter:creator" content="@nyuk_pe" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://nyuk.vercel.app/products/" />
        
        {/* Schema Products */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Todos los Productos - Nyuk Boutique Floral",
          "description": "Explora todos nuestros productos de flores premium: rosas, lirios, tulipanes y arreglos exclusivos",
          "url": "https://nyuk.vercel.app/products/",
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": products.length,
            "itemListElement": products.map((product, index) => ({
              "@type": "Product",
              "position": index + 1,
              "name": product.name,
              "description": product.description,
              "image": product.image,
              "category": product.category,
              "offers": {
                "@type": "Offer",
                "price": product.price,
                "priceCurrency": "PEN",
                "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
                "seller": {
                  "@type": "Organization",
                  "name": "Nyuk Boutique Floral"
                },
                "highPrice": product.originalPrice
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": product.rating,
                "reviewCount": product.reviews
              }
            }))
          }
        })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50">
        <BlogNavbar />
        
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center gap-2 mb-6">
              <span className="bg-rose-100 px-3 py-1 rounded-full text-sm font-medium text-rose-700">
                🌸 Todos los Productos
              </span>
              <span className="bg-pink-100 px-3 py-1 rounded-full text-sm font-medium text-pink-700">
                🛒 Comprar Online
              </span>
              <span className="bg-amber-100 px-3 py-1 rounded-full text-sm font-medium text-amber-700">
                🚚 Delivery Gratis
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-serif text-rose-900 mb-6">
              Nuestra Colección Completa
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Descubre todos nuestros arreglos florales premium. 
              Cada flor es seleccionada con amor y entregada con garantía de frescura.
            </p>
            
            <div className="flex items-center justify-center gap-8 text-gray-600">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-rose-600" />
                <span>Calidad Premium</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-rose-600" />
                <span>Delivery 30 min</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-rose-600" />
                <span>5.0 Rating</span>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="aspect-[4/5] bg-gray-200 animate-pulse"></div>
                    <div className="p-6">
                      <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded mb-4 animate-pulse"></div>
                      <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl p-12 text-center text-white">
              <h2 className="text-4xl font-serif mb-6">
                🌸 ¿No encuentras lo que buscas?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Contáctanos para un arreglo personalizado hecho a tu medida
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+51948162531"
                  className="bg-white text-rose-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 font-semibold"
                >
                  <span className="w-5 h-5">📞</span>
                  <span>Llamar Ahora</span>
                </a>
                <a 
                  href="https://wa.me/51948162531"
                  className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-semibold"
                >
                  <span className="w-5 h-5">💬</span>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ProductsPage;
