import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Clock, Star, Navigation, Building, Hotel, ShoppingBag } from 'lucide-react';
import BlogNavbar from '../../components/BlogNavbar';
import Footer from '../../components/Footer';

const MirafloresPage: React.FC = () => {
  const services = [
    {
      icon: <Hotel className="w-6 h-6" />,
      title: 'Hoteles y Restaurantes',
      description: 'Servicios premium para hoteles 5 estrellas y restaurantes gourmet de Miraflores.',
      features: ['Diseño exclusivo', 'Suscripción semanal', 'Setup diario', 'Retiro incluido']
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: 'Centros Comerciales',
      description: 'Arreglos para Larcomar, Larcomar 2 y centros comerciales de la zona.',
      features: ['Diseño moderno', 'Instalación profesional', 'Mantenimiento', 'Eventos especiales']
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: 'Residencias Premium',
      description: 'Flores para departamentos de lujo y residencias exclusivas de Miraflores.',
      features: ['Diseño personalizado', 'Suscripción mensual', 'Delivery express', 'Consultoría']
    },
    {
      icon: <Navigation className="w-6 h-6" />,
      title: 'Turismo y Visitantes',
      description: 'Regalos perfectos para turistas y visitantes con packaging especial.',
      features: ['Gift wrapping', 'Tarjeta multilingual', 'Delivery al hotel', 'Fotos del arreglo']
    }
  ];

  const landmarks = [
    { name: 'Larcomar', distance: '5 min', type: 'Centro Comercial Premium' },
    { name: 'Parque Kennedy', distance: '3 min', type: 'Punto Turístico' },
    { name: 'Malecón de Miraflores', distance: '8 min', type: 'Avenida Costera' },
    { name: 'Hotel Marriott', distance: '10 min', type: 'Hotel 5 Estrellas' },
    { name: 'Hilton Lima Miraflores', distance: '12 min', type: 'Hotel 5 Estrellas' },
    { name: 'Ricardo Palma', distance: '15 min', type: 'Centro Cultural' }
  ];

  const testimonials = [
    {
      name: 'Ana Morales',
      company: 'Hotel Marriott Miraflores',
      text: 'El mejor servicio floral para nuestro hotel. Siempre puntuales y con diseños espectaculares.',
      rating: 5
    },
    {
      name: 'Carlos Vargas',
      company: 'Restaurante Amor Amar',
      text: 'Sus arreglos transformaron nuestro restaurante. Clientes siempre elogian nuestras flores.',
      rating: 5
    },
    {
      name: 'Sofia Anderson',
      company: 'Residente Miraflores',
      text: 'Suscripción mensual perfecta para mi apartamento. Siempre recibimos flores frescas y hermosas.',
      rating: 5
    }
  ];

  return (
    <>
      <Helmet>
        <title>Flores en Miraflores | Delivery Premium 25 Min | Nyuk Boutique Floral</title>
        <meta name="description" content="Delivery de flores premium en Miraflores con entrega en 25 minutos. Hoteles, restaurantes y centros comerciales. Teléfono: 934202560." />
        <meta name="keywords" content="flores miraflores, delivery flores miraflores, hoteles miraflores, larcomar flores, floristería miraflores, restaurantes miraflores" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Flores en Miraflores | Delivery Premium 25 Min | Nyuk Boutique Floral" />
        <meta property="og:description" content="Delivery de flores premium en Miraflores con entrega en 25 minutos. Hoteles, restaurantes y centros comerciales." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nyuk.vercel.app/locations/miraflores" />
        <meta property="og:image" content="https://nyuk.vercel.app/imagenes/locations/flores-miraflores.jpg" />
        <meta property="og:locale" content="es_PE" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Flores en Miraflores | Delivery Premium 25 Min | Nyuk Boutique Floral" />
        <meta name="twitter:description" content="Delivery de flores premium en Miraflores con entrega en 25 minutos. Hoteles, restaurantes y centros comerciales." />
        <meta name="twitter:image" content="https://nyuk.vercel.app/imagenes/locations/flores-miraflores.jpg" />
        <meta name="twitter:site" content="@nyuk_pe" />
        <meta name="twitter:creator" content="@nyuk_pe" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://nyuk.vercel.app/locations/miraflores" />
        
        {/* Geographic SEO */}
        <meta name="geo.region" content="PE-LIM" />
        <meta name="geo.placename" content="Miraflores, Lima" />
        <meta name="geo.position" content="-12.1175;-77.0335" />
        <meta name="ICBM" content="-12.1175, -77.0335" />
        
        {/* Business Info Miraflores */}
        <meta name="business:contact_data:street_address" content="Miraflores, Lima" />
        <meta name="business:contact_data:locality" content="Miraflores" />
        <meta name="business:contact_data:region" content="Lima" />
        <meta name="business:contact_data:postal_code" content="15074" />
        <meta name="business:contact_data:country_name" content="Perú" />
        <meta name="business:contact_data:phone_number" content="+51934202560" />
        <meta name="business:contact_data:website" content="https://nyuk.vercel.app/locations/miraflores" />
        
        {/* Schema LocalBusiness Miraflores */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://nyuk.vercel.app/locations/miraflores",
          "name": "Nyuk Boutique Floral - Miraflores",
          "description": "Delivery de flores premium en Miraflores con entrega en 25 minutos. Hoteles, restaurantes y centros comerciales.",
          "url": "https://nyuk.vercel.app/locations/miraflores",
          "telephone": "+51934202560",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Miraflores",
            "addressRegion": "Lima",
            "addressCountry": "PE",
            "postalCode": "15074"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": -12.1175,
            "longitude": -77.0335
          },
          "openingHours": ["Mo-Su 09:00-21:00"],
          "priceRange": "$$$",
          "paymentAccepted": "Efectivo, Yape, Transferencia Bancaria",
          "currenciesAccepted": "PEN",
          "areaServed": "Miraflores",
          "serviceArea": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": -12.1175,
              "longitude": -77.0335
            },
            "geoRadius": "3000"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Servicios Florales en Miraflores",
            "itemListElement": services.map((service, index) => ({
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": service.title,
                "description": service.description
              },
              "availability": "https://schema.org/InStock"
            }))
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "89",
            "bestRating": "5",
            "worstRating": "1"
          },
          "review": testimonials.map((testimonial, index) => ({
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": testimonial.name
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": testimonial.rating.toString(),
              "bestRating": "5"
            },
            "reviewBody": testimonial.text
          })),
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
                "name": "Locations",
                "item": "https://nyuk.vercel.app/locations/"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Miraflores",
                "item": "https://nyuk.vercel.app/locations/miraflores"
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
                📍 Miraflores
              </span>
              <span className="bg-pink-100 px-3 py-1 rounded-full text-sm font-medium text-pink-700">
                🚚 25 Minutos
              </span>
              <span className="bg-amber-100 px-3 py-1 rounded-full text-sm font-medium text-amber-700">
                ⭐ 5.0 Estrellas
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-serif text-rose-900 mb-6">
              Flores Premium en Miraflores
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Delivery exclusivo en el corazón turístico de Lima. Hoteles 5 estrellas, 
              restaurantes gourmet y centros comerciales con entrega en 25 minutos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+51934202560"
                className="bg-rose-600 text-white px-8 py-4 rounded-lg hover:bg-rose-700 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                <span>Llamar Ahora</span>
              </a>
              <a 
                href="https://wa.me/51934202560"
                className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <span className="w-5 h-5">💬</span>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-3xl font-bold text-rose-600 mb-2">25</div>
                <div className="text-gray-700 font-medium">Minutos</div>
                <div className="text-gray-600 text-sm">Delivery garantizado</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-3xl font-bold text-rose-600 mb-2">200+</div>
                <div className="text-gray-700 font-medium">Hoteles y Restaurantes</div>
                <div className="text-gray-600 text-sm">Clientes satisfechos</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-3xl font-bold text-rose-600 mb-2">100%</div>
                <div className="text-gray-700 font-medium">Cobertura</div>
                <div className="text-gray-600 text-sm">Distrito completo</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-3xl font-bold text-rose-600 mb-2">5.0</div>
                <div className="text-gray-700 font-medium">Rating</div>
                <div className="text-gray-600 text-sm">89 reseñas</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif text-rose-900 mb-4">
                🌸 Servicios Exclusivos Miraflores
              </h2>
              <p className="text-gray-700 text-lg">
                Servicios premium diseñados para el mercado turístico y residencial de Miraflores
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center text-rose-600">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-serif text-gray-900">{service.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-gray-700">
                        <span className="w-2 h-2 bg-rose-600 rounded-full"></span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Landmarks */}
        <section className="py-16 px-4 bg-gradient-to-r from-rose-100 to-pink-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif text-rose-900 mb-4">
                🏢 Puntos de Referencia Miraflores
              </h2>
              <p className="text-gray-700 text-lg">
                Cubrimos todos los puntos turísticos y comerciales importantes
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {landmarks.map((landmark, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{landmark.name}</h3>
                    <MapPin className="w-5 h-5 text-rose-600" />
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Navigation className="w-4 h-4" />
                      <span>{landmark.distance}</span>
                    </div>
                    <span className="bg-rose-100 text-rose-700 px-2 py-1 rounded-full text-xs">
                      {landmark.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif text-rose-900 mb-4">
                ⭐ Testimonios Clientes Miraflores
              </h2>
              <p className="text-gray-700 text-lg">
                Hoteles, restaurantes y residentes confían en nuestro servicio premium
              </p>
            </div>
            
            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-600 text-sm">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl p-12 text-center text-white">
              <h2 className="text-4xl font-serif mb-6">
                🌸 ¿Listo para tu Delivery en Miraflores?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Contacta ahora y recibe tus flores premium en 25 minutos
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+51934202560"
                  className="bg-white text-rose-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 font-semibold"
                >
                  <Phone className="w-5 h-5" />
                  <span>Llamar 934 202 560</span>
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
                <p>📍 Entrega en toda Miraflores | ⏰ Lunes a Domingo 9am-9pm | 🚚 25 minutos garantizado</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default MirafloresPage;
