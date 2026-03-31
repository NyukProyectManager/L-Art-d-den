import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Filter, Search, ShoppingCart, Heart, Star, Clock, MapPin } from 'lucide-react';
import BlogNavbar from '../../components/BlogNavbar';
import Footer from '../../components/Footer';
import { Product } from '../../types';

const CollectionsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [loading, setLoading] = useState(true);

  // Simulated product data - in real app this would come from API
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'Rosa de Ébano Eterna',
        description: 'Exquisito ramo de rosas rojas premium con 25 flores seleccionadas manualmente',
        price: 125,
        image: '/imagenes/productos/rosa-ebano.jpg',
        category: 'romance',
        inStock: true,
        rating: 5.0,
        reviews: 127,
        isNew: false,
        isPopular: true,
        addedAt: '2026-03-10'
      },
      {
        id: 2,
        name: 'Jardín de Primavera',
        description: 'Colorida mezcla de flores de temporada con lirios, tulipanes y margaritas',
        price: 89,
        image: '/imagenes/productos/jardin-primavera.jpg',
        category: 'alegria',
        inStock: true,
        rating: 4.8,
        reviews: 89,
        isNew: true,
        isPopular: true,
        addedAt: '2026-03-15'
      },
      {
        id: 3,
        name: 'Elegancia Blanca',
        description: 'Sofisticado arreglo de lirios blancos y claveles para ocasiones especiales',
        price: 95,
        image: '/imagenes/productos/elegancia-blanca.jpg',
        category: 'elegancia',
        inStock: true,
        rating: 4.9,
        reviews: 156,
        isNew: false,
        isPopular: false,
        addedAt: '2026-03-05'
      },
      {
        id: 4,
        name: 'Pasión Tropical',
        description: 'Vibrante combinación de flores tropicales con orquídeas y heliconias',
        price: 145,
        image: '/imagenes/productos/pasion-tropical.jpg',
        category: 'exotico',
        inStock: true,
        rating: 5.0,
        reviews: 203,
        isNew: true,
        isPopular: true,
        addedAt: '2026-03-17'
      },
      {
        id: 5,
        name: 'Serenidad Azul',
        description: 'Tranquilo arreglo con delphiniums y hydrangeas azules',
        price: 105,
        image: '/imagenes/productos/serenidad-azul.jpg',
        category: 'tranquilidad',
        inStock: true,
        rating: 4.7,
        reviews: 67,
        isNew: false,
        isPopular: false,
        addedAt: '2026-03-08'
      },
      {
        id: 6,
        name: 'Corazón Dorado',
        description: 'Romántico ramo con rosas doradas y rojas en elegante presentación',
        price: 135,
        image: '/imagenes/productos/corazon-dorado.jpg',
        category: 'romance',
        inStock: true,
        rating: 4.9,
        reviews: 298,
        isNew: false,
        isPopular: true,
        addedAt: '2026-03-01'
      }
    ];

    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
    setLoading(false);
  }, []);

  const categories = [
    { id: 'all', name: 'Todas', count: products.length },
    { id: 'romance', name: 'Romance', count: products.filter(p => p.category === 'romance').length },
    { id: 'alegria', name: 'Alegría', count: products.filter(p => p.category === 'alegria').length },
    { id: 'elegancia', name: 'Elegancia', count: products.filter(p => p.category === 'elegancia').length },
    { id: 'exotico', name: 'Exótico', count: products.filter(p => p.category === 'exotico').length },
    { id: 'tranquilidad', name: 'Tranquilidad', count: products.filter(p => p.category === 'tranquilidad').length }
  ];

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered = [...filtered].sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
        break;
      case 'featured':
      default:
        filtered = [...filtered].sort((a, b) => {
          if (a.isPopular && !b.isPopular) return -1;
          if (!a.isPopular && b.isPopular) return 1;
          return 0;
        });
        break;
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, sortBy, products]);

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const [isLiked, setIsLiked] = useState(false);

    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
        {/* Product Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-rose-50 to-pink-50">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
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
          </div>
          
          {/* Like Button */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-600 text-rose-600' : 'text-gray-600'}`} />
          </button>
          
          {/* Quick Actions */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="w-full bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors flex items-center justify-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span>Agregar al Carrito</span>
            </button>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-6">
          <h3 className="text-xl font-serif text-gray-900 mb-2 line-clamp-1">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviews})
            </span>
          </div>
          
          {/* Price and Action */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-rose-600">
                S/. {product.price}
              </div>
              <div className="text-sm text-gray-500">
                Delivery incluido
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="w-10 h-10 bg-rose-100 text-rose-600 rounded-lg hover:bg-rose-200 transition-colors flex items-center justify-center">
                <ShoppingCart className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center">
                <span className="text-sm">💬</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Colecciones de Flores Premium | Nyuk Boutique Floral | Comprar Online</title>
        <meta name="description" content="Explora nuestras colecciones de flores premium: romance, alegría, elegancia y exótico. Comprar flores online con delivery inmediato en Lima." />
        <meta name="keywords" content="colecciones flores, comprar flores online, flores premium lima, arreglos florales, ramos de flores, delivery flores" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Colecciones de Flores Premium | Nyuk Boutique Floral" />
        <meta property="og:description" content="Explora nuestras colecciones de flores premium: romance, alegría, elegancia y exótico. Comprar flores online con delivery inmediato." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nyuk.vercel.app/collections/" />
        <meta property="og:image" content="https://nyuk.vercel.app/imagenes/collections/colecciones-flores-nyuk.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Colecciones de Flores Premium | Nyuk Boutique Floral" />
        <meta name="twitter:description" content="Explora nuestras colecciones de flores premium: romance, alegría, elegancia y exótico." />
        <meta name="twitter:image" content="https://nyuk.vercel.app/imagenes/collections/colecciones-flores-nyuk.jpg" />
        <meta name="twitter:site" content="@nyuk_pe" />
        <meta name="twitter:creator" content="@nyuk_pe" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://nyuk.vercel.app/collections/" />
        
        {/* Schema E-commerce */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Colecciones de Flores Premium",
          "description": "Explora nuestras colecciones de flores premium: romance, alegría, elegancia y exótico",
          "url": "https://nyuk.vercel.app/collections/",
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": filteredProducts.length,
            "itemListElement": filteredProducts.map((product, index) => ({
              "@type": "Product",
              "position": index + 1,
              "name": product.name,
              "description": product.description,
              "image": product.image,
              "offers": {
                "@type": "Offer",
                "price": product.price,
                "priceCurrency": "PEN",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@type": "Organization",
                  "name": "Nyuk Boutique Floral"
                }
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
                "name": "Colecciones",
                "item": "https://nyuk.vercel.app/collections/"
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
                🌸 Colecciones Premium
              </span>
              <span className="bg-pink-100 px-3 py-1 rounded-full text-sm font-medium text-pink-700">
                🛒 Comprar Online
              </span>
              <span className="bg-amber-100 px-3 py-1 rounded-full text-sm font-medium text-amber-700">
                🚚 Delivery Gratis
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-serif text-rose-900 mb-6">
              Colecciones de Flores Premium
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Descubre nuestras colecciones curadas de flores premium. Cada arreglo está diseñado 
              con amor y entregado con garantía de frescura.
            </p>
            
            <div className="flex items-center justify-center gap-8 text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-rose-600" />
                <span>Delivery 30 min</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-rose-600" />
                <span>Todo Lima</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-rose-600" />
                <span>5.0 Rating</span>
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="grid md:grid-cols-4 gap-6">
                {/* Search */}
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Buscar flores..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>
                
                {/* Category Filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 appearance-none"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="featured">Destacados</option>
                  <option value="price-low">Precio: Menor a Mayor</option>
                  <option value="price-high">Precio: Mayor a Menor</option>
                  <option value="rating">Mejor Rating</option>
                  <option value="newest">Más Nuevos</option>
                </select>
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
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {filteredProducts.length} Productos encontrados
                  </h2>
                  <div className="text-gray-600">
                    Mostrando {filteredProducts.length} de {products.length}
                  </div>
                </div>
                
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">🌸</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No se encontraron productos
                    </h3>
                    <p className="text-gray-600">
                      Intenta ajustar los filtros o términos de búsqueda
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </>
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

export default CollectionsPage;
