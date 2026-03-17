import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Clock, Truck, Phone, Star, Award, MapPin, Users, Calendar } from 'lucide-react';
import BlogNavbar from '../../components/BlogNavbar';
import Footer from '../../components/Footer';

const ServicesPage: React.FC = () => {
  const services = [
    {
      id: 'delivery-inmediato',
      title: 'Delivery Inmediato',
      description: 'Entrega express en 30 minutos para toda Lima Metropolitana. Flores frescas con garantía de calidad.',
      icon: <Truck className="w-8 h-8" />,
      features: ['30 minutos garantizado', 'Seguimiento en tiempo real', 'Packaging premium', 'Confirmación inmediata'],
      deliveryTime: '30 min',
      coverage: '95% Lima',
      price: 'Desde S/. 89',
      popular: true
    },
    {
      id: 'arreglos-corporativos',
      title: 'Arreglos Corporativos',
      description: 'Diseños exclusivos para oficinas, recepciones y eventos empresariales en San Isidro y Miraflores.',
      icon: <Award className="w-8 h-8" />,
      features: ['Diseño personalizado', 'Suscripción mensual', 'Setup profesional', 'Retiro incluido'],
      deliveryTime: 'Programado',
      coverage: 'San Isidro, Miraflores',
      price: 'Desde S/. 250',
      popular: false
    },
    {
      id: 'eventos-especiales',
      title: 'Eventos Especiales',
      description: 'Decoración floral completa para bodas, cumpleaños, aniversarios y celebraciones corporativas.',
      icon: <Calendar className="w-8 h-8" />,
      features: ['Consultoría gratuita', 'Diseño personalizado', 'Setup día evento', 'Staff profesional'],
      deliveryTime: 'Coordinado',
      coverage: 'Todo Lima',
      price: 'Desde S/. 500',
      popular: false
    },
    {
      id: 'suscripcion-mensual',
      title: 'Suscripción Mensual',
      description: 'Recibe flores frescas cada mes. Planes personalizados para hogares y oficinas.',
      icon: <Users className="w-8 h-8" />,
      features: ['Envío mensual', 'Diseño variado', 'Descuento especial', 'Cancela anytime'],
      deliveryTime: 'Programado',
      coverage: 'Todo Lima',
      price: 'Desde S/. 199/mes',
      popular: true
    }
  ];

  const benefits = [
    'Garantía de frescura 24 horas',
    'Flores seleccionadas manualmente',
    'Packaging eco-friendly premium',
    'Tarjeta personalizada incluida',
    'Soporte 24/7 por WhatsApp',
    'Satisfacción 100% garantizada'
  ];

  const testimonials = [
    {
      name: 'Carla Mendoza',
      company: 'Google Perú',
      text: 'El delivery inmediato salvó nuestra reunión de última hora. Excelente servicio corporativo.',
      rating: 5,
      service: 'Delivery Inmediato'
    },
    {
      name: 'Roberto Silva',
      company: 'Hotel Marriott',
      text: 'Sus arreglos corporativos transformaron nuestro lobby. Servicio profesional y confiable.',
      rating: 5,
      service: 'Arreglos Corporativos'
    },
    {
      name: 'Sofía Torres',
      company: 'Cliente Particular',
      text: 'La suscripción mensual es perfecta para mi oficina. Siempre recibimos flores frescas y hermosas.',
      rating: 5,
      service: 'Suscripción Mensual'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Servicios de Flores | Delivery Inmediato | Arreglos Corporativos | Nyuk</title>
        <meta name="description" content="Servicios premium de flores en Lima: delivery inmediato 30 min, arreglos corporativos, eventos especiales y suscripción mensual. Calidad garantizada." />
        <meta name="keywords" content="servicios flores lima, delivery inmediato flores, arreglos corporativos, eventos flores, suscripción flores, floristería premium" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Servicios de Flores | Delivery Inmediato | Arreglos Corporativos | Nyuk" />
        <meta property="og:description" content="Servicios premium de flores en Lima: delivery inmediato 30 min, arreglos corporativos, eventos especiales y suscripción mensual." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nyuk.vercel.app/services/" />
        <meta property="og:image" content="https://nyuk.vercel.app/imagenes/services/servicios-flores-lima.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Servicios de Flores | Delivery Inmediato | Arreglos Corporativos | Nyuk" />
        <meta name="twitter:description" content="Servicios premium de flores en Lima: delivery inmediato 30 min, arreglos corporativos, eventos especiales." />
        <meta name="twitter:image" content="https://nyuk.vercel.app/imagenes/services/servicios-flores-lima.jpg" />
        <meta name="twitter:site" content="@nyuk_pe" />
        <meta name="twitter:creator" content="@nyuk_pe" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://nyuk.vercel.app/services/" />
        
        {/* Schema Services */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Nyuk Boutique Floral - Servicios",
          "description": "Servicios premium de flores en Lima: delivery inmediato 30 min, arreglos corporativos, eventos especiales y suscripción mensual.",
          "url": "https://nyuk.vercel.app/services/",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Nyuk Boutique Floral",
            "telephone": "+51934202560",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Lima",
              "addressCountry": "PE"
            }
          },
          "areaServed": "Lima Metropolitana",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Servicios Florales",
            "itemListElement": services.map((service, index) => ({
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": service.title,
                "description": service.description
              },
              "price": service.price,
              "priceCurrency": "PEN",
              "availability": "https://schema.org/InStock"
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
                🌸 Servicios Premium
              </span>
              <span className="bg-pink-100 px-3 py-1 rounded-full text-sm font-medium text-pink-700">
                🚚 Delivery 30 Min
              </span>
              <span className="bg-amber-100 px-3 py-1 rounded-full text-sm font-medium text-amber-700">
                ⭐ 5.0 Rating
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-serif text-rose-900 mb-6">
              Servicios de Flores Premium
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Delivery inmediato, arreglos corporativos, eventos especiales y suscripción mensual. 
              Calidad premium con garantía de satisfacción en toda Lima.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+51934202560"
                className="bg-rose-600 text-white px-8 py-4 rounded-lg hover:bg-rose-700 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                <span>Consultar Ahora</span>
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

        {/* Services Grid */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif text-rose-900 mb-4">
                🌟 Nuestros Servicios
              </h2>
              <p className="text-gray-700 text-lg">
                Soluciones florales premium para cada necesidad
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <article 
                  key={service.id}
                  className={`relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
                    service.popular ? 'ring-2 ring-rose-500' : ''
                  }`}
                >
                  {service.popular && (
                    <div className="absolute top-4 right-4 bg-rose-600 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                      ⭐ Popular
                    </div>
                  )}
                  
                  <div className="h-32 bg-gradient-to-br from-rose-200 to-pink-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-rose-600">
                        {service.icon}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-serif text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-rose-600">{service.deliveryTime}</div>
                        <div className="text-xs text-gray-600">Tiempo</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-rose-600">{service.coverage}</div>
                        <div className="text-xs text-gray-600">Cobertura</div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Características:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-700">
                            <span className="w-2 h-2 bg-rose-600 rounded-full"></span>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="text-2xl font-bold text-rose-600">{service.price}</div>
                        <div className="text-sm text-gray-600">Desde</div>
                      </div>
                      <div className="flex gap-2">
                        <a 
                          href="tel:+51934202560"
                          className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors"
                        >
                          📞
                        </a>
                        <a 
                          href="https://wa.me/51934202560"
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          💬
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 px-4 bg-gradient-to-r from-rose-100 to-pink-100">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif text-rose-900 mb-4">
                ✅ Beneficios Nyuk
              </h2>
              <p className="text-gray-700 text-lg">
                Por qué elegir nuestros servicios premium
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center text-rose-600">
                      <span className="text-lg">✓</span>
                    </div>
                    <span className="text-gray-800 font-medium">{benefit}</span>
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
                ⭐ Testimonios Clientes
              </h2>
              <p className="text-gray-700 text-lg">
                Empresas y clientes confían en nuestros servicios
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
                  
                  <div className="flex items-center justify-between">
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
                    <div className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-sm font-medium">
                      {testimonial.service}
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
                🌸 ¿Listo para tu Servicio Premium?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Contacta ahora y recibe asesoría personalizada para tu evento o delivery
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
                <p>⏰ Disponible 24/7 | 📍 Todo Lima | 🌸 Calidad Premium Garantizada</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ServicesPage;
