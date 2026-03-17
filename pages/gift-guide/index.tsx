import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ShoppingCart, Heart, Star, Clock, MapPin, Gift, Users, Calendar, Briefcase } from 'lucide-react';
import BlogNavbar from '../../components/BlogNavbar';
import Footer from '../../components/Footer';

interface GiftCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  products: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    reviews: number;
    badge?: string;
  }[];
}

const GiftGuidePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const giftCategories: GiftCategory[] = [
    {
      id: 'romance',
      name: 'Amor y Romance',
      description: 'Expresa tus sentimientos más profundos con rosas y arreglos románticos',
      icon: <Heart className="w-6 h-6" />,
      products: [
        {
          id: 1,
          name: 'Rosa de Ébano Eterna',
          description: '25 rosas rojas premium con chocolate suizo',
          price: 145,
          image: '/imagenes/gifts/rosa-ebono.jpg',
          rating: 5.0,
          reviews: 298,
          badge: 'Best Seller'
        },
        {
          id: 2,
          name: 'Corazón Apasionado',
          description: 'Arreglo en forma de corazón con rosas rojas y rosadas',
          price: 125,
          image: '/imagenes/gifts/corazon-apasionado.jpg',
          rating: 4.9,
          reviews: 167
        }
      ]
    },
    {
      id: 'amistad',
      name: 'Amistad y Agradecimiento',
      description: 'Demuestra tu aprecio con colores alegres y vibrantes',
      icon: <Users className="w-6 h-6" />,
      products: [
        {
          id: 3,
          name: 'Jardín de Alegría',
          description: 'Mix vibrante de girasoles y margaritas multicolor',
          price: 89,
          image: '/imagenes/gifts/jardin-alegria.jpg',
          rating: 4.8,
          reviews: 156
        },
        {
          id: 4,
          name: 'Sonrisa Dorada',
          description: 'Girasoles frescos con detalles dorados',
          price: 95,
          image: '/imagenes/gifts/sonrisa-dorada.jpg',
          rating: 4.7,
          reviews: 89
        }
      ]
    },
    {
      id: 'corporativo',
      name: 'Regalos Corporativos',
      description: 'Impresiona colegas y clientes con elegancia profesional',
      icon: <Briefcase className="w-6 h-6" />,
      products: [
        {
          id: 5,
          name: 'Elegancia Ejecutiva',
          description: 'Arreglo sofisticado de lirios blancos y orquídeas',
          price: 155,
          image: '/imagenes/gifts/elegancia-ejecutiva.jpg',
          rating: 5.0,
          reviews: 203,
          badge: 'Premium'
        },
        {
          id: 6,
          name: 'Éxito Profesional',
          description: 'Diseño moderno con plantas y flores de oficina',
          price: 110,
          image: '/imagenes/gifts/exito-profesional.jpg',
          rating: 4.8,
          reviews: 67
        }
      ]
    },
    {
      id: 'ocasiones',
      name: 'Ocasiones Especiales',
      description: 'Celebra cumpleaños, aniversarios y momentos únicos',
      icon: <Calendar className="w-6 h-6" />,
      products: [
        {
          id: 7,
          name: 'Fiesta de Cumpleaños',
          description: 'Ramo festivo con globos y flores de temporada',
          price: 105,
          image: '/imagenes/gifts/fiesta-cumpleanos.jpg',
          rating: 4.9,
          reviews: 234,
          badge: 'Popular'
        },
        {
          id: 8,
          name: 'Aniversario Dorado',
          description: 'Ramo elegante con rosas doradas y blancas',
          price: 135,
          image: '/imagenes/gifts/aniversario-dorado.jpg',
          rating: 4.8,
          reviews: 145
        }
      ]
    }
  ];

  const allProducts = giftCategories.flatMap(category => 
    category.products.map(product => ({ ...product, category: category.name }))
  );

  const filteredProducts = selectedCategory === 'all' 
    ? allProducts 
    : giftCategories.find(cat => cat.id === selectedCategory)?.products.map(p => ({ ...p, category: giftCategories.find(cat => cat.id === selectedCategory)?.name })) || [];

  const ProductCard: React.FC<{ product: any }> = ({ product }) => {
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
          
          {/* Badge */}
          {product.badge && (
            <div className="absolute top-4 left-4">
              <span className="bg-rose-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {product.badge}
              </span>
            </div>
          )}
          
          {/* Like Button */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-600 text-rose-600' : 'text-gray-600'}`} />
          </button>
          
          {/* Gift Icon Overlay */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur rounded-full p-2">
            <Gift className="w-5 h-5 text-rose-600" />
          </div>
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
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-2xl font-bold text-rose-600">
                S/. {product.price}
              </div>
              <div className="text-sm text-gray-500">
                Gift wrapping incluido
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
        <title>Guía de Regalos | Flores para Todas las Ocasiones | Nyuk</title>
        <meta name="description" content="Encuentra el regalo floral perfecto: amor, amistad, corporativo y ocasiones especiales. Guía experta con recomendaciones personalizadas." />
        <meta name="keywords" content="guía de regalos flores, regalos florales, flores para regalar, regalos románticos, regalos corporativos, flores para ocasiones" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Guía de Regalos | Flores para Todas las Ocasiones | Nyuk" />
        <meta property="og:description" content="Encuentra el regalo floral perfecto: amor, amistad, corporativo y ocasiones especiales. Guía experta con recomendaciones." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nyuk.vercel.app/gift-guide/" />
        <meta property="og:image" content="https://nyuk.vercel.app/imagenes/gift-guide/guia-regalos-flores.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Guía de Regalos | Flores para Todas las Ocasiones | Nyuk" />
        <meta name="twitter:description" content="Encuentra el regalo floral perfecto: amor, amistad, corporativo y ocasiones especiales." />
        <meta name="twitter:image" content="https://nyuk.vercel.app/imagenes/gift-guide/guia-regalos-flores.jpg" />
        <meta name="twitter:site" content="@nyuk_pe" />
        <meta name="twitter:creator" content="@nyuk_pe" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://nyuk.vercel.app/gift-guide/" />
        
        {/* Schema Gift Guide */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Guía de Regalos - Nyuk Boutique Floral",
          "description": "Encuentra el regalo floral perfecto: amor, amistad, corporativo y ocasiones especiales",
          "url": "https://nyuk.vercel.app/gift-guide/",
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": filteredProducts.length,
            "itemListElement": filteredProducts.map((product, index) => ({
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
                🎁 Guía de Regalos
              </span>
              <span className="bg-pink-100 px-3 py-1 rounded-full text-sm font-medium text-pink-700">
                🌸 Todas las Ocasiones
              </span>
              <span className="bg-amber-100 px-3 py-1 rounded-full text-sm font-medium text-amber-700">
                🚚 Delivery Gratis
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-serif text-rose-900 mb-6">
              Guía de Regalos Perfectos
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Encuentra el regalo floral ideal para cada persona y ocasión. 
              Nuestra guía experta te ayudará a elegir con confianza.
            </p>
            
            <div className="flex items-center justify-center gap-8 text-gray-600">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-rose-600" />
                <span>Gift Wrapping</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-rose-600" />
                <span>5.0 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-rose-600" />
                <span>Same Day Delivery</span>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif text-rose-900 mb-4">
                🎯 Elige por Tipo de Regalo
              </h2>
              <p className="text-gray-700 text-lg">
                Selecciona la categoría que mejor se adapte a tu necesidad
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectedCategory === 'all' 
                    ? 'border-rose-600 bg-rose-50' 
                    : 'border-gray-200 bg-white hover:border-rose-300'
                }`}
              >
                <Gift className="w-8 h-8 text-rose-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">Todos</h3>
                <p className="text-sm text-gray-600">Ver todos los regalos</p>
              </button>
              
              {giftCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedCategory === category.id 
                      ? 'border-rose-600 bg-rose-50' 
                      : 'border-gray-200 bg-white hover:border-rose-300'
                  }`}
                >
                  <div className="text-rose-600 mx-auto mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {selectedCategory === 'all' ? 'Todos los Regalos' : giftCategories.find(cat => cat.id === selectedCategory)?.name}
              </h2>
              <div className="text-gray-600">
                {filteredProducts.length} productos encontrados
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Gift Tips */}
        <section className="py-16 px-4 bg-gradient-to-r from-rose-100 to-pink-100">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif text-rose-900 mb-4">
                💡 Tips para Elegir el Regalo Perfecto
              </h2>
              <p className="text-gray-700 text-lg">
                Consejos de expertos para hacer tu regalo inolvidable
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Considera la Personalidad</h3>
                <p className="text-gray-600 mb-4">
                  • Personas románticas: Rosas rojas y flores clásicas<br/>
                  • Amigas alegres: Colores vibrantes y girasoles<br/>
                  • Profesionales: Diseños elegantes y sofisticados<br/>
                  • Creativas: Arreglos únicos y exóticos
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Elige por Ocasión</h3>
                <p className="text-gray-600 mb-4">
                  • Aniversarios: Rosas y flores simbólicas<br/>
                  • Cumpleaños: Colores festivos y alegres<br/>
                  • Agradecimiento: Girasoles y margaritas<br/>
                  • Disculpas: Flores blancas y elegantes
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
                🎁 ¿Necesitas Ayuda para Elegir?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Nuestros expertos están listos para ayudarte a encontrar el regalo perfecto
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+51934202560"
                  className="bg-white text-rose-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 font-semibold"
                >
                  <span className="w-5 h-5">📞</span>
                  <span>Consultar Experto</span>
                </a>
                <a 
                  href="https://wa.me/51934202560"
                  className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-semibold"
                >
                  <span className="w-5 h-5">💬</span>
                  <span>WhatsApp</span>
                </a>
              </div>
              
              <div className="mt-8 text-sm opacity-75">
                <p>🎁 Gift Wrapping Gratis | 🚚 Same Day Delivery | 🌸 Freshness Guarantee</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default GiftGuidePage;
