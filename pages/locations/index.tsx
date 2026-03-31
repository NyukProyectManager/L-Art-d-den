import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Clock, Star, Navigation } from 'lucide-react';
import BlogNavbar from '../../components/BlogNavbar';
import Footer from '../../components/Footer';

const LocationsPage: React.FC = () => {
  const locations = [
    {
      name: 'San Isidro',
      description: 'Distrito financiero y residencial de alta gama. Delivery inmediato para oficinas corporativas y residencias exclusivas.',
      coordinate: '-12.0895,-77.0454',
      deliveryTime: '30-45 min',
      coverage: '100%',
      specialties: ['Arreglos Corporativos', 'Eventos Empresariales', 'Ramos Premium'],
      landmarks: ['Centro Empresarial', 'Country Club Lima', 'Galerías Pacífico']
    },
    {
      name: 'Miraflores',
      description: 'Zona turística y residencial por excelencia. Delivery para hoteles, restaurantes y eventos especiales.',
      coordinate: '-12.1175,-77.0335',
      deliveryTime: '25-40 min',
      coverage: '100%',
      specialties: ['Eventos Sociales', 'Hoteles 5 Estrellas', 'Restaurantes Gourmet'],
      landmarks: ['Larcomar', 'Parque Kennedy', 'Malecón de Miraflores']
    },
    {
      name: 'Lima Metropolitana',
      description: 'Cobertura completa en toda la ciudad. Delivery express para toda el área metropolitana.',
      coordinate: '-12.0464,-77.0428',
      deliveryTime: '45-90 min',
      coverage: '95%',
      specialties: ['Delivery Express', 'Eventos Masivos', 'Servicios Corporativos'],
      landmarks: ['Centro de Lima', 'San Borja', 'Surco']
    },
    {
      name: 'Larco Mar',
      description: 'Zona turística exclusiva. Delivery para tiendas, restaurantes y centros comerciales de primer nivel.',
      coordinate: '-12.1466,-77.0301',
      deliveryTime: '20-35 min',
      coverage: '100%',
      specialties: ['Turismo', 'Restaurantes', 'Tiendas Premium'],
      landmarks: ['Larcomar Shopping', 'Museo Larco', 'Restaurantes de lujo']
    },
    {
      name: 'San Borja',
      description: 'Distrito residencial familiar. Delivery para hogares, eventos familiares y celebraciones.',
      coordinate: '-12.0943,-77.0046',
      deliveryTime: '35-50 min',
      coverage: '100%',
      specialties: ['Eventos Familiares', 'Cumpleaños', 'Aniversarios'],
      landmarks: ['Parque San Borja', 'Centro Cívico', 'Zonas Residenciales']
    }
  ];

  const schemaLocations = locations.map(location => ({
    "@type": "LocalBusiness",
    "@id": `https://nyuk.vercel.app/locations/${location.name.toLowerCase().replace(/\s+/g, '-')}`,
    "name": `Nyuk Boutique Floral - ${location.name}`,
    "description": location.description,
    "url": `https://nyuk.vercel.app/locations/${location.name.toLowerCase().replace(/\s+/g, '-')}`,
    "telephone": "+51948162531",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": location.name,
      "addressRegion": "Lima",
      "addressCountry": "PE",
      "postalCode": "15001"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": parseFloat(location.coordinate.split(',')[0]),
      "longitude": parseFloat(location.coordinate.split(',')[1])
    },
    "openingHours": ["Mo-Su 09:00-21:00"],
    "priceRange": "$$$",
    "paymentAccepted": "Efectivo, Yape, Transferencia Bancaria",
    "currenciesAccepted": "PEN",
    "areaServed": location.name,
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": parseFloat(location.coordinate.split(',')[0]),
        "longitude": parseFloat(location.coordinate.split(',')[1])
      },
      "geoRadius": "5000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios Florales en " + location.name,
      "itemListElement": location.specialties.map((specialty, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": specialty,
          "description": `Servicios florales premium en ${location.name}`
        },
        "availability": "https://schema.org/InStock"
      }))
    }
  }));

  return (
    <>
      <Helmet>
        <title>Delivery de Flores en Lima | Nyuk Boutique Floral | Todas las Zonas</title>
        <meta name="description" content="Delivery de flores premium en San Isidro, Miraflores, Larco Mar y toda Lima. Entrega inmediata 30-45 minutos. Arreglos florales para eventos y ocasiones especiales." />
        <meta name="keywords" content="delivery flores lima, flores san isidro, flores miraflores, delivery larco mar, flores delivery lima, arreglos florales lima" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Delivery de Flores en Lima | Nyuk Boutique Floral" />
        <meta property="og:description" content="Delivery de flores premium en San Isidro, Miraflores, Larco Mar y toda Lima. Entrega inmediata 30-45 minutos." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nyuk.vercel.app/locations/" />
        <meta property="og:image" content="https://nyuk.vercel.app/imagenes/locations/delivery-flores-lima.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Delivery de Flores en Lima | Nyuk Boutique Floral" />
        <meta name="twitter:description" content="Delivery de flores premium en San Isidro, Miraflores, Larco Mar y toda Lima. Entrega inmediata 30-45 minutos." />
        <meta name="twitter:image" content="https://nyuk.vercel.app/imagenes/locations/delivery-flores-lima.jpg" />
        <meta name="twitter:site" content="@nyuk_pe" />
        <meta name="twitter:creator" content="@nyuk_pe" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://nyuk.vercel.app/locations/" />
        
        {/* Schema Locations */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Nyuk Boutique Floral - Locations",
          "description": "Delivery de flores premium en San Isidro, Miraflores, Larco Mar y toda Lima",
          "url": "https://nyuk.vercel.app/locations/",
          "mainEntity": schemaLocations,
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
                📍 Local SEO
              </span>
              <span className="bg-pink-100 px-3 py-1 rounded-full text-sm font-medium text-pink-700">
                🚚 Delivery Inmediato
              </span>
              <span className="bg-amber-100 px-3 py-1 rounded-full text-sm font-medium text-amber-700">
                ⭐ 5 Zonas Cubiertas
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-serif text-rose-900 mb-6">
              Delivery de Flores en Lima
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Entrega premium en San Isidro, Miraflores, Larco Mar y toda Lima Metropolitana. 
              Flores frescas con garantía de 24h y delivery inmediato.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+51948162531"
                className="bg-rose-600 text-white px-8 py-4 rounded-lg hover:bg-rose-700 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                <span>Llamar Ahora</span>
              </a>
              <a 
                href="https://wa.me/51948162531"
                className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <span className="w-5 h-5">💬</span>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

        {/* Coverage Map */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif text-rose-900 mb-4">
                🗺️ Cobertura en Lima
              </h2>
              <p className="text-gray-700 text-lg">
                Cubrimos las zonas más importantes de Lima con delivery inmediato
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="aspect-video bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl flex items-center justify-center mb-8">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-rose-600 mx-auto mb-4" />
                  <p className="text-gray-700 font-medium">Mapa Interactivo de Cobertura</p>
                  <p className="text-gray-600 text-sm">San Isidro • Miraflores • Larco Mar • San Borja • Lima Centro</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-rose-600 mb-2">95%</div>
                  <div className="text-gray-700 font-medium">Cobertura Total</div>
                  <div className="text-gray-600 text-sm">Del área metropolitana</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-rose-600 mb-2">30-45</div>
                  <div className="text-gray-700 font-medium">Minutos</div>
                  <div className="text-gray-600 text-sm">Tiempo de delivery</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-rose-600 mb-2">24h</div>
                  <div className="text-gray-700 font-medium">Garantía</div>
                  <div className="text-gray-600 text-sm">Frescura asegurada</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Locations Grid */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif text-rose-900 mb-4">
                📍 Nuestras Zonas de Delivery
              </h2>
              <p className="text-gray-700 text-lg">
                Cada ubicación con servicio especializado y tiempos de entrega optimizados
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {locations.map((location, index) => (
                <article 
                  key={location.name}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="h-48 bg-gradient-to-br from-rose-200 to-pink-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <MapPin className="w-12 h-12 text-rose-600" />
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full">
                      <span className="text-sm font-medium text-rose-700">
                        {location.deliveryTime}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-serif text-gray-900 mb-3">
                      {location.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {location.description}
                    </p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-rose-600" />
                        <span>Delivery: {location.deliveryTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Navigation className="w-4 h-4 text-rose-600" />
                        <span>Cobertura: {location.coverage}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Especialidades:</h4>
                      <div className="flex flex-wrap gap-2">
                        {location.specialties.map((specialty, idx) => (
                          <span 
                            key={idx}
                            className="bg-rose-100 text-rose-700 px-2 py-1 rounded-full text-xs font-medium"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Puntos Clave:</h4>
                      <div className="text-sm text-gray-600">
                        {location.landmarks.join(' • ')}
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <a 
                        href={`/locations/${location.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex-1 bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors text-center"
                      >
                        Ver Detalles
                      </a>
                      <a 
                        href="https://wa.me/51948162531"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        💬
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-rose-100 to-pink-100">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-serif text-rose-900 mb-8">
              🌸 Servicios por Zona
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">San Isidro & Miraflores</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Arreglos Corporativos Premium</li>
                  <li>• Eventos Empresariales</li>
                  <li>• Delivery Express 30 min</li>
                  <li>• Servicios para Hoteles 5★</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Lima Metropolitana</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Coverage Completa 95%</li>
                  <li>• Eventos Masivos</li>
                  <li>• Precios Competitivos</li>
                  <li>• Delivery Programado</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default LocationsPage;
