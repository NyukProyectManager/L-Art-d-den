import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ShoppingCart, Heart, Star, Clock, MapPin, Award, TrendingUp } from 'lucide-react';
import BlogNavbar from '../../components/BlogNavbar';
import Footer from '../../components/Footer';

interface BestSellerProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  soldCount: number;
  inStock: boolean;
  badge?: string;
}

const BestSellersPage: React.FC = () => {
  const [products, setProducts] = useState<BestSellerProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bestSellers: BestSellerProduct[] = [
      {
        id: 1,
        name: 'Rosa de Ébano Eterna',
        description: 'Exquisito ramo de 25 rosas rojas premium seleccionadas manualmente. Perfecto para expresar amor apasionado.',
        price: 125,
        originalPrice: 145,
        image: '/imagenes/best-sellers/rosa-ebano.jpg',
        category: 'Romance',
        rating: 5.0,
        reviews: 298,
        soldCount: 1247,
        inStock: true,
        badge: 'Más Vendido'
      },
      {
        id: 2,
        name: 'Jardín de Primavera',
        description: 'Colorida mezcla de flores de temporada con lirios, tulipanes y margaritas. Alegría pura en cada pétalo.',
        price: 89,
        image: '/imagenes/best-sellers/jardin-primavera.jpg',
        category: 'Alegría',
        rating: 4.8,
        reviews: 156,
        soldCount: 892,
        inStock: true,
        badge: 'Popular'
      },
      {
        id: 3,
        name: 'Elegancia Blanca',
        description: 'Sofisticado arreglo de lirios blancos y claveles. Ideal para eventos formales y condolencias.',
        price: 95,
        originalPrice: 110,
        image: '/imagenes/best-sellers/elegancia-blanca.jpg',
        category: 'Elegancia',
        rating: 4.9,
        reviews: 203,
        soldCount: 756,
        inStock: true,
        badge: 'Premium'
      },
      {
        id: 4,
        name: 'Pasión Tropical',
        description: 'Vibrante combinación de orquídeas y heliconias tropicales. Exótico y memorable.',
        price: 145,
        image: '/imagenes/best-sellers/pasion-tropical.jpg',
        category: 'Exótico',
        rating: 5.0,
        reviews: 167,
        soldCount: 623,
        inStock: true,
        badge: 'Exclusivo'
      },
      {
        id: 5,
        name: 'Corazón Dorado',
        description: 'Romántico ramo con rosas doradas y rojas en elegante presentación. Lujo y pasión combinados.',
        price: 135,
        originalPrice: 155,
        image: '/imagenes/best-sellers/corazon-dorado.jpg',
        category: 'Romance',
        rating: 4.9,
        reviews: 234,
        soldCount: 589,
        inStock: true,
        badge: 'Trending'
      },
      {
        id: 6,
        name: 'Serenidad Azul',
        description: 'Tranquilo arreglo con delphiniums y hydrangeas azules. Paz y serenidad en flores.',
        price: 105,
        image: '/imagenes/best-sellers/serenidad-azul.jpg',
        category: 'Tranquilidad',
        rating: 4.7,
        reviews: 98,
        soldCount: 445,
        inStock: true
      }
    ];

    setProducts(bestSellers);
    setLoading(false);
  }, []);

  const ProductCard: React.FC<{ product: BestSellerProduct }> = ({ product }) => {
    const [isLiked, setIsLiked] = useState(false);

    const discountPercentage = product.originalPrice 
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group relative">
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {product.badge}
            </span>
          </div>
        )}

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              -{discountPercentage}%
            </span>
          </div>
        )}

        {/* Product Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-rose-50 to-pink-50">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Sold Count Badge */}
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
            <TrendingUp className="w-3 h-3 inline mr-1" />
            {product.soldCount} vendidos
          </div>
          
          {/* Like Button */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-600 text-rose-600' : 'text-gray-600'}`} />
          </button>
        </div>
        
        {/* Product Info */}
        <div className="p-6">
          {/* Category */}
          <div className="text-sm text-rose-600 font-medium mb-2">
            {product.category}
          </div>
          
          <h3 className="text-xl font-serif text-gray-900 mb-2 line-clamp-1">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
          
          {/* Rating and Reviews */}
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
                <div className="text-2xl font-bold text-rose-600">
                  S/. {product.price}
                </div>
                {product.originalPrice && (
                  <div className="text-sm text-gray-400 line-through">
                    S/. {product.originalPrice}
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-500">
                Delivery incluido
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
              <span>Agregar</span>
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
        <title>Los Más Vendidos | Best Sellers | Nyuk Boutique Floral</title>
        <meta name="description" content="Descubre los arreglos florales más vendidos de Nyuk. Rosa de Ébano, Jardín de Primavera y más. Calidad premium con delivery inmediato." />
        <meta name="keywords" content="best sellers flores, más vendidos, flores populares, arreglos florales top, comprar flores populares, nyuk best sellers" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Los Más Vendidos | Best Sellers | Nyuk Boutique Floral" />
        <meta property="og:description" content="Descubre los arreglos florales más vendidos de Nyuk. Rosa de Ébano, Jardín de Primavera y más. Calidad premium con delivery inmediato." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nyuk.vercel.app/best-sellers/" />
        <meta property="og:image" content="https://nyuk.vercel.app/imagenes/best-sellers/nyuk-best-sellers.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Los Más Vendidos | Best Sellers | Nyuk Boutique Floral" />
        <meta name="twitter:description" content="Descubre los arreglos florales más vendidos de Nyuk. Calidad premium con delivery inmediato." />
        <meta name="twitter:image" content="https://nyuk.vercel.app/imagenes/best-sellers/nyuk-best-sellers.jpg" />
        <meta name="twitter:site" content="@nyuk_pe" />
        <meta name="twitter:creator" content="@nyuk_pe" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://nyuk.vercel.app/best-sellers/" />
        
        {/* Schema Best Sellers */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Los Más Vendidos - Nyuk Boutique Floral",
          "description": "Descubre los arreglos florales más vendidos de Nyuk. Rosa de Ébano, Jardín de Primavera y más.",
          "url": "https://nyuk.vercel.app/best-sellers/",
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
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Inicio",
                "item": "https://nyuk.vercel.app/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Best Sellers",
                "item": "https://nyuk.vercel.app/best-sellers/"
              }
            ]
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
                🔥 Best Sellers
              </span>
              <span className="bg-pink-100 px-3 py-1 rounded-full text-sm font-medium text-pink-700">
                ⭐ 5.0 Rating
              </span>
              <span className="bg-amber-100 px-3 py-1 rounded-full text-sm font-medium text-amber-700">
                🚚 Delivery 30 Min
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-serif text-rose-900 mb-6">
              Los Más Vendidos
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Descubre nuestros arreglos florales más populares. 
              Elegidos por miles de clientes por su calidad y belleza excepcional.
            </p>
            
            <div className="flex items-center justify-center gap-8 text-gray-600">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-rose-600" />
                <span>Premiun Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-rose-600" />
                <span>Top Rated</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-rose-600" />
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-3xl font-bold text-rose-600 mb-2">4,552</div>
                <div className="text-gray-700 font-medium">Productos Vendidos</div>
                <div className="text-gray-600 text-sm">Este mes</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-3xl font-bold text-rose-600 mb-2">4.9</div>
                <div className="text-gray-700 font-medium">Rating Promedio</div>
                <div className="text-gray-600 text-sm">1,156 reseñas</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-3xl font-bold text-rose-600 mb-2">98%</div>
                <div className="text-gray-700 font-medium">Satisfacción</div>
                <div className="text-gray-600 text-sm">Clientes felices</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-3xl font-bold text-rose-600 mb-2">24h</div>
                <div className="text-gray-700 font-medium">Garantía</div>
                <div className="text-gray-600 text-sm">Frescura</div>
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

        {/* Trust Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-rose-100 to-pink-100">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-serif text-rose-900 mb-8">
              🌸 ¿Por Qué Son los Más Vendidos?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mx-auto mb-4">
                  <Star className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Calidad Premium</h3>
                <p className="text-gray-600">
                  Flores seleccionadas manualmente por nuestros expertos floristas
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mx-auto mb-4">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Diseño Exclusivo</h3>
                <p className="text-gray-600">
                  Arreglos únicos creados con amor y atención al detalle
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mx-auto mb-4">
                  <Clock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Entrega Rápida</h3>
                <p className="text-gray-600">
                  Delivery inmediato en 30 minutos con garantía de frescura
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl p-12 text-center text-white">
              <h2 className="text-4xl font-serif mb-6">
                🌸 Lleva el Best Seller a Casa
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Únete a miles de clientes satisfechos y descubre por qué estos son nuestros favoritos
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+51948162531"
                  className="bg-white text-rose-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 font-semibold"
                >
                  <span className="w-5 h-5">📞</span>
                  <span>Llamar 948 162 531</span>
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

export default BestSellersPage;
