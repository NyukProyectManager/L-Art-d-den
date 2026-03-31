import React from 'react';
import { Helmet } from 'react-helmet-async';
import BlogNavbar from '../../components/BlogNavbar';
import Footer from '../../components/Footer';

const GuiaFloresOcasionesPage: React.FC = () => {
  const tableOfContents = [
    { id: 'introduccion', title: 'Introducción: El Lenguaje de las Flores' },
    { id: 'amor-y-romance', title: 'Amor y Romance: Rosas y sus Significados' },
    { id: 'amistad', title: 'Amistad: Girasoles y Lirios' },
    { id: 'agradecimiento', title: 'Agradecimiento: Girasoles y Margaritas' },
    { id: 'condolencias', title: 'Condolencias: Lirios Blancos y Claveles' },
    { id: 'cumpleanos', title: 'Cumpleaños: Gerberas y Tulipanes' },
    { id: 'aniversarios', title: 'Aniversarios: Orquídeas y Flores Exóticas' },
    { id: 'consejos-expertos', title: 'Consejos de Expertos' },
    { id: 'cuidado-flores', title: 'Cómo Hacer que tus Flores Duren Más' }
  ];

  const flowerData = [
    {
      occasion: 'Amor y Romance',
      flowers: [
        { name: 'Rosas Rojas', meaning: 'Amor apasionado', tip: 'El clásico absoluto para declaraciones de amor' },
        { name: 'Rosas Rosadas', meaning: 'Amor romántico', tip: 'Perfectas para relaciones establecidas' },
        { name: 'Tulipanes Rojos', meaning: 'Amor verdadero', tip: 'Elegantes y sofisticados' }
      ]
    },
    {
      occasion: 'Amistad',
      flowers: [
        { name: 'Girasoles', meaning: 'Lealtad y amistad', tip: 'Alegran cualquier día' },
        { name: 'Lirios Amarillos', meaning: 'Amistad y alegría', tip: 'Vibrantes y llenos de energía' },
        { name: 'Margaritas', meaning: 'Inocencia y amistad', tip: 'Clásicas y siempre apropiadas' }
      ]
    },
    {
      occasion: 'Agradecimiento',
      flowers: [
        { name: 'Girasoles', meaning: 'Gratitud y admiración', tip: 'Expresan agradecimiento sincero' },
        { name: 'Margaritas Blancas', meaning: 'Pureza y gratitud', tip: 'Elegantes y significativas' },
        { name: 'Claveles Rosados', meaning: 'Agradecimiento', tip: 'Suaves y expresivos' }
      ]
    },
    {
      occasion: 'Condolencias',
      flowers: [
        { name: 'Lirios Blancos', meaning: 'Pureza y majestad', tip: 'Símbolo de paz y consuelo' },
        { name: 'Claveles Blancos', meaning: 'Amor puro e inocencia', tip: 'Tradicionales y respetuosos' },
        { name: 'Gladiolos Blancos', meaning: 'Integridad y fuerza', tip: 'Expresan apoyo sincero' }
      ]
    },
    {
      occasion: 'Cumpleaños',
      flowers: [
        { name: 'Gerberas', meaning: 'Alegría y celebración', tip: 'Colores vibrantes para festejar' },
        { name: 'Tulipanes Multicolor', meaning: 'Felicidad y celebración', tip: 'Diversión y energía' },
        { name: 'Girasoles', meaning: 'Alegría y vitalidad', tip: 'Perfectos para celebrar la vida' }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Guía Completa de Flores para Cada Ocasión | Blog Nyuk</title>
        <meta name="description" content="Descubre qué flores elegir para cada momento especial. Guía experta con significados, tips y recomendaciones para elegir el ramo perfecto." />
        <meta name="keywords" content="flores para ocasiones, significado de flores, guías de flores, tips floristería, elegir flores, flores para amor, amistad, agradecimiento" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Guía Completa de Flores para Cada Ocasión | Blog Nyuk" />
        <meta property="og:description" content="Descubre qué flores elegir para cada momento especial. Guía experta con significados, tips y recomendaciones." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://nyuk.vercel.app/blog/guia-completa-flores-ocasiones" />
        <meta property="og:image" content="https://nyuk.vercel.app/imagenes/blog/guia-flores-ocasiones.jpg" />
        <meta property="article:author" content="Nyuk Boutique Floral" />
        <meta property="article:published_time" content="2026-03-17T10:00:00-05:00" />
        <meta property="article:section" content="Guías" />
        <meta property="article:tag" content="flores, ocasiones, significado, tips" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Guía Completa de Flores para Cada Ocasión | Blog Nyuk" />
        <meta name="twitter:description" content="Descubre qué flores elegir para cada momento especial. Guía experta con significados y tips." />
        <meta name="twitter:image" content="https://nyuk.vercel.app/imagenes/blog/guia-flores-ocasiones.jpg" />
        <meta name="twitter:site" content="@nyuk_pe" />
        <meta name="twitter:creator" content="@nyuk_pe" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://nyuk.vercel.app/blog/guia-completa-flores-ocasiones" />
        
        {/* Schema Article */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "Guía Completa de Flores para Cada Ocasión",
          "description": "Descubre qué flores elegir para cada momento especial. Guía experta con significados, tips y recomendaciones para elegir el ramo perfecto.",
          "image": "https://nyuk.vercel.app/imagenes/blog/guia-flores-ocasiones.jpg",
          "author": {
            "@type": "Person",
            "name": "Nyuk Boutique Floral"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Nyuk Boutique Floral",
            "logo": {
              "@type": "ImageObject",
              "url": "https://nyuk.vercel.app/imagenes/favicon-round-256.png"
            }
          },
          "datePublished": "2026-03-17T10:00:00-05:00",
          "dateModified": "2026-03-17T10:00:00-05:00",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://nyuk.vercel.app/blog/guia-completa-flores-ocasiones"
          },
          "wordCount": 2500,
          "keywords": "flores para ocasiones, significado de flores, guías de flores, tips floristería",
          "articleSection": "Guías"
        })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50">
        <BlogNavbar />
        
        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-4 py-12">
          <header className="text-center mb-12">
            <div className="flex justify-center gap-2 mb-4">
              <span className="bg-rose-100 px-3 py-1 rounded-full text-sm font-medium text-rose-700">
                Guía Completa
              </span>
              <span className="bg-pink-100 px-3 py-1 rounded-full text-sm font-medium text-pink-700">
                12 min lectura
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-serif text-rose-900 mb-6">
              Guía Completa de Flores para Cada Ocasión
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Descubre el lenguaje secreto de las flores y aprende a elegir el ramo perfecto 
              para cada momento especial. Desde el amor hasta las condolencias, cada flor tiene 
              su propio mensaje.
            </p>
            
            <div className="flex items-center justify-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <span>✍️</span>
                <span>Nyuk Boutique Floral</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>17 de marzo, 2026</span>
              </div>
            </div>
          </header>

          {/* Table of Contents */}
          <nav className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-serif text-rose-900 mb-6">📋 Tabla de Contenidos</h2>
            <ul className="space-y-3">
              {tableOfContents.map((item, index) => (
                <li key={item.id}>
                  <a 
                    href={`#${item.id}`}
                    className="flex items-center gap-3 text-gray-700 hover:text-rose-600 transition-colors"
                  >
                    <span className="text-rose-500 font-semibold">{index + 1}.</span>
                    <span>{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <section id="introduccion" className="mb-12">
              <h2 className="text-3xl font-serif text-rose-900 mb-6">🌹 Introducción: El Lenguaje de las Flores</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Las flores han sido durante siglos el medio universal para expresar emociones 
                que a veces son difíciles de poner en palabras. Cada flor, cada color y cada 
                combinación cuenta una historia única. En Nyuk Boutique Floral, entendemos que 
                elegir las flores adecuadas puede transformar un momento ordinario en algo 
                extraordinario.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Esta guía completa te ayudará a navegar el fascinante mundo del lenguaje floral, 
                asegurando que cada ramo que elijas comunique exactamente lo que sientes.
              </p>
            </section>

            {flowerData.map((section, sectionIndex) => (
              <section id={section.occasion.toLowerCase().replace(/\s+/g, '-')} className="mb-12" key={sectionIndex}>
                <h2 className="text-3xl font-serif text-rose-900 mb-6">
                  {sectionIndex + 2}. {section.occasion}
                </h2>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  {section.occasion === 'Amor y Romance' && 
                    "El amor es la emoción más poderosa que existe, y las flores han sido sus mensajeras por siglos. Desde las rosas rojas que declaran pasión hasta los tulipanes que susurran promesas de amor verdadero."}
                  {section.occasion === 'Amistad' && 
                    "La amistad merece ser celebrada con flores tan vibrantes y leales como el vínculo que representan. Los girasoles siguen al sol así como los amigos verdaderos nos siguen en la vida."}
                  {section.occasion === 'Agradecimiento' && 
                    "Decir 'gracias' con flores transforma un simple agradecimiento en un gesto memorable. Estas flores expresan gratitud de manera elegante y sincera."}
                  {section.occasion === 'Condolencias' && 
                    "En momentos difíciles, las flores ofrecen consuelo cuando las palabras no son suficientes. Estas opciones tradicionales expresan respeto y apoyo sincero."}
                  {section.occasion === 'Cumpleaños' && 
                    "Los cumpleaños son celebraciones de vida y alegría. Estas flores vibrantes capturan perfectamente la energía festiva de un nuevo año de vida."}
                </p>

                <div className="grid md:grid-cols-1 gap-6">
                  {section.flowers.map((flower, flowerIndex) => (
                    <div key={flowerIndex} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-rose-400">
                      <div className="flex items-start gap-4">
                        <span className="text-3xl">🌸</span>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {flower.name}
                          </h3>
                          <div className="space-y-2">
                            <p className="text-gray-700">
                              <span className="font-medium text-rose-600">Significado:</span> {flower.meaning}
                            </p>
                            <p className="text-gray-600 text-sm">
                              <span className="font-medium text-rose-600">Tip de experto:</span> {flower.tip}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <section id="consejos-expertos" className="mb-12">
              <h2 className="text-3xl font-serif text-rose-900 mb-6">💡 Consejos de Expertos Nyuk</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Considera la Personalidad</h3>
                  <p className="text-gray-700">
                    Más allá de la ocasión, piensa en la personalidad de quien recibirá las flores. 
                    ¿Es clásica y elegante? Opta por orquídeas. ¿Es divertida y energética? 
                    Las gerberas multicolor son perfectas.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-pink-50 to-amber-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">2. El Color es Clave</h3>
                  <p className="text-gray-700">
                    Los colores tienen sus propios significados. El rojo para pasión, el amarillo 
                    para alegría, el blanco para pureza, el rosa para gratitud. Elige colores que 
                    complementen tanto la ocasión como la personalidad.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-rose-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">3. La Presentación Importa</h3>
                  <p className="text-gray-700">
                    Un ramo bien presentado duplica el impacto. Considera el envoltorio, la tarjeta 
                    personalizada y el momento perfecto para la entrega.
                  </p>
                </div>
              </div>
            </section>

            <section id="cuidado-flores" className="mb-12">
              <h2 className="text-3xl font-serif text-rose-900 mb-6">💧 Cómo Hacer que tus Flores Duren Más</h2>
              
              <div className="bg-white rounded-xl shadow-lg p-8">
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-rose-600 font-bold">1.</span>
                    <div>
                      <strong className="text-gray-900">Agua fresca diaria:</strong> 
                      Cambia el agua cada 2 días y recorta los tallos en ángulo.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-600 font-bold">2.</span>
                    <div>
                      <strong className="text-gray-900">Ubicación adecuada:</strong> 
                      Mantén las flores lejos de corrientes de aire y luz solar directa.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-600 font-bold">3.</span>
                    <div>
                      <strong className="text-gray-900">Alimento floral:</strong> 
                      Usa el paquete de alimento que viene con las flores o prepara uno casero.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-600 font-bold">4.</span>
                    <div>
                      <strong className="text-gray-900">Limpieza regular:</strong> 
                      Retira las flores marchitas para evitar que afecten a las demás.
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl p-8 text-center">
                <h2 className="text-3xl font-serif text-rose-900 mb-4">🌸 Conclusión</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Las flores son más que simples adornos; son mensajeras de emociones, 
                  portadoras de significados y creadoras de recuerdos inolvidables. 
                  Con esta guía, estás listo para elegir el ramo perfecto que diga exactamente 
                  lo que tu corazón quiere expresar.
                </p>
                <p className="text-gray-700 leading-relaxed mb-8">
                  En Nyuk Boutique Floral, estamos aquí para ayudarte a crear esos momentos 
                  especiales. Cada flor es seleccionada con cuidado y cada arreglo está 
                  diseñado con amor.
                </p>
                
                <div className="bg-white rounded-xl p-6 max-w-md mx-auto">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">¿Listo para elegir el ramo perfecto?</h3>
                  <p className="text-gray-600 mb-4">
                    Visita nuestra tienda o contacta a nuestros expertos florales.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <a 
                      href="tel:+51948162531" 
                      className="bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition-colors"
                    >
                      📞 Llamar ahora
                    </a>
                    <a 
                      href="https://wa.me/51948162531" 
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      💬 WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Author Bio */}
          <footer className="border-t border-gray-200 pt-8 mt-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full flex items-center justify-center">
                <span className="text-2xl">🌹</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Nyuk Boutique Floral</h3>
                <p className="text-gray-600">Expertos en flores premium en Lima</p>
                <div className="flex gap-2 text-sm text-gray-500">
                  <span>📍 Lima, Perú</span>
                  <span>•</span>
                  <span>📞 +51 934 202 560</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Sobre este artículo</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Tiempo de lectura:</span> 12 minutos
                </div>
                <div>
                  <span className="font-medium">Palabras:</span> ~2,500
                </div>
                <div>
                  <span className="font-medium">Categoría:</span> Guías
                </div>
                <div>
                  <span className="font-medium">Última actualización:</span> 17 de marzo, 2026
                </div>
              </div>
            </div>
          </footer>
        </article>

        <Footer />
      </div>
    </>
  );
};

export default GuiaFloresOcasionesPage;
