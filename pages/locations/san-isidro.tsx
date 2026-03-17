import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Clock, Star, Navigation, Building, Briefcase, Award, Truck } from 'lucide-react';
import BlogNavbar from '../../components/BlogNavbar';
import Footer from '../../components/Footer';

const SanIsidroPage: React.FC = () => {
  const services = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: 'Arreglos Corporativos',
      description: 'Diseños exclusivos para oficinas, recepciones y eventos empresariales en San Isidro.',
      features: ['Diseño personalizado', 'Suscripción mensual', 'Delivery programado']
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: 'Eventos Empresariales',
      description: 'Decoración floral para conferencias, inauguraciones y eventos corporativos.',
      features: ['Setup completo', 'Retiro incluido', 'Staff profesional']
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Ramos Premium',
      description: 'Flores de lujo para ejecutivos, clientes VIP y regalos corporativos.',
      features: ['Flores importadas', 'Packaging premium', 'Tarjeta personalizada']
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Delivery Express',
      description: 'Entrega inmediata en 30 minutos a cualquier punto de San Isidro.',
      features: ['30 min garantizado', 'Tracking en tiempo real', 'Confirmación inmediata']
    }
  ];

  const landmarks = [
    { name: 'Centro Empresarial', distance: '5 min', type: 'Zona Corporativa' },
    { name: 'Country Club Lima', distance: '8 min', type: 'Club Exclusivo' },
    { name: 'Galerías Pacífico', distance: '10 min', type: 'Centro Comercial' },
    { name: 'Banco de la Nación', distance: '7 min', type: 'Institución Financiera' },
    { name: 'Real Plaza Salaverry', distance: '12 min', type: 'Shopping Center' },
    { name: 'Parque Central', distance: '3 min', type: 'Área Residencial' }
  ];

  const testimonials = [
    {
      name: 'María García',
      company: 'CEO, TechCorp Perú',
      text: 'El mejor servicio de flores corporativas en San Isidro. Siempre puntuales y con diseños espectaculares.',
      rating: 5
    },
    {
      name: 'Carlos Rodríguez',
      company: 'Gerente, Hotel San Isidro',
      text: 'Trabajamos con Nyuk para todos nuestros eventos. La calidad y atención son insuperables.',
      rating: 5
    },
    {
      name: 'Ana Martínez',
      company: 'Directora de Marketing',
      text: 'Sus arreglos transformaron nuestras oficinas. El servicio es profesional y confiable.',
      rating: 5
    }
  ];

  return (
    <>
      <Helmet>
        <title>Flores en San Isidro | Delivery Premium 30 Min | Nyuk Boutique Floral</title>
        <meta name="description" content="Delivery de flores premium en San Isidro con entrega en 30 minutos. Arreglos corporativos, eventos empresariales y ramos de lujo. Teléfono: 934202560." />
        <meta name="keywords" content="flores san isidro, delivery flores san isidro, arreglos corporativos san isidro, flores premium san isidro, floristería san isidro, eventos empresariales san isidro" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Flores en San Isidro | Delivery Premium 30 Min | Nyuk Boutique Floral" />
        <meta property="og:description" content="Delivery de flores premium en San Isidro con entrega en 30 minutos. Arreglos corporativos, eventos empresariales y ramos de lujo." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nyuk.vercel.app/locations/san-isidro" />
        <meta property="og:image" content="https://nyuk.vercel.app/imagenes/locations/flores-san-isidro.jpg" />
        <meta property="og:locale" content="es_PE" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Flores en San Isidro | Delivery Premium 30 Min | Nyuk Boutique Floral" />
        <meta name="twitter:description" content="Delivery de flores premium en San Isidro con entrega en 30 minutos. Arreglos corporativos y eventos empresariales." />
        <meta name="twitter:image" content="https://nyuk.vercel.app/imagenes/locations/flores-san-isidro.jpg" />
        <meta name="twitter:site" content="@nyuk_pe" />
        <meta name="twitter:creator" content="@nyuk_pe" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://nyuk.vercel.app/locations/san-isidro" />
        
        {/* Geographic SEO */}
        <meta name="geo.region" content="PE-LIM" />
        <meta name="geo.placename" content="San Isidro, Lima" />
        <meta name="geo.position" content="-12.0895;-77.0454" />
        <meta name="ICBM" content="-12.0895, -77.0454" />
        
        {/* Business Info San Isidro */}
        <meta name="business:contact_data:street_address" content="San Isidro, Lima" />
        <meta name="business:contact_data:locality" content="San Isidro" />
        <meta name="business:contact_data:region" content="Lima" />
        <meta name="business:contact_data:postal_code"="15001" />
        <meta name="business:contact_data:country_name" content="Perú" />
        <meta name="business:contact_data:phone_number" content="+51934202560" />
        <meta name="business:contact_data:website" content="https://nyuk.vercel.app/locations/san-isidro" />
        
        {/* Schema LocalBusiness San Isidro */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://nyuk.vercel.app/locations/san-isidro",
          "name": "Nyuk Boutique Floral - San Isidro",
          "description": "Delivery de flores premium en San Isidro con entrega en 30 minutos. Arreglos corporativos, eventos empresariales y ramos de lujo.",
          "url": "https://nyuk.vercel.app/locations/san-isidro",
          "telephone": "+51934202560",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "San Isidro",
            "addressRegion": "Lima",
            "addressCountry": "PE",
            "postalCode": "15001"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": -12.0895,
            "longitude": -77.0454
          },
          "openingHours": ["Mo-Su 09:00-21:00"],
          "priceRange": "$$$",
          "paymentAccepted": "Efectivo, Yape, Transferencia Bancaria",
          "currenciesAccepted": "PEN",
          "areaServed": "San Isidro",
          "serviceArea": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": -12.0895,
              "longitude": -77.0454
            },
            "geoRadius": "3000"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Servicios Florales en San Isidro",
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
            "reviewCount": "127",
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
                "name": "San Isidro",
                "item": "https://nyuk.vercel.app/locations/san-isidro"
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
                📍 San Isidro
              </span>
              <span className="bg-pink-100 px-3 py-1 rounded-full text-sm font-medium text-pink-700">
                🚚 30 Minutos
              </span>
              <span className="bg-amber-100 px-3 py-1 rounded-full text-sm font-medium text-amber-700">
                ⭐ 5.0 Estrellas
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-serif text-rose-900 mb-6">
              Flores Premium en San Isidro
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Delivery exclusivo en el distrito financiero de Lima. Arreglos corporativos, 
              eventos empresariales y ramos de lujo con entrega en 30 minutos.
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
                <div className="text-3xl font-bold text-rose-600 mb-2">30</div>
                <div className="text-gray-700 font-medium">Minutos</div>
                <div className="text-gray-600 text-sm">Delivery garantizado</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-3xl font-bold text-rose-600 mb-2">500+</div>
                <div className="text-gray-700 font-medium">Clientes Corporativos</div>
                <div className="text-gray-600 text-sm">En San Isidro</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-3xl font-bold text-rose-600 mb-2">100%</div>
                <div className="text-gray-700 font-medium">Cobertura</div>
                <div className="text-gray-600 text-sm">Del distrito</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-3xl font-bold text-rose-600 mb-2">5.0</div>
                <div className="text-gray-700 font-medium">Rating</div>
                <div className="text-gray-600 text-sm">127 reseñas</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif text-rose-900 mb-4">
                🌸 Servicios Exclusivos San Isidro
              </h2>
              <p className="text-gray-700 text-lg">
                Servicios premium diseñados para el mercado corporativo y residencial de San Isidro
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
                🏢 Puntos de Referencia San Isidro
              </h2>
              <p className="text-gray-700 text-lg">
                Cubrimos todos los puntos importantes del distrito financiero
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
                ⭐ Testimonios Clientes San Isidro
              </h2>
              <p className="text-gray-700 text-lg">
                Empresas y residentes confían en nuestro servicio premium
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
                🌸 ¿Listo para tu Delivery en San Isidro?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Contacta ahora y recibe tus flores premium en 30 minutos
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
                <p>📍 Entrega en toda San Isidro | ⏰ Lunes a Domingo 9am-9pm | 🚚 30 minutos garantizado</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default SanIsidroPage;
