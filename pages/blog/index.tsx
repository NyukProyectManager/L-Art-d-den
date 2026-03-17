import React from 'react';
import { Helmet } from 'react-helmet-async';
import BlogNavbar from '../../components/BlogNavbar';
import Footer from '../../components/Footer';

const BlogPage: React.FC = () => {
  const blogPosts = [
    {
      id: 'guia-completa-flores-ocasiones',
      title: 'Guía Completa de Flores para Cada Ocasión',
      excerpt: 'Descubre qué flores elegir para cada momento especial. Desde rosas para el amor hasta lirios para la amistad.',
      category: 'Guías',
      readTime: '12 min',
      publishDate: '2026-03-17',
      image: '/imagenes/blog/guia-flores-ocasiones.jpg',
      author: 'Nyuk Boutique Floral'
    },
    {
      id: 'como-elegir-ramo-perfecto-2026',
      title: 'Cómo Elegir el Ramo Perfecto: Guía 2026',
      excerpt: 'Tips expertos para seleccionar el ramo ideal según la persona, ocasión y presupuesto.',
      category: 'Tips',
      readTime: '8 min',
      publishDate: '2026-03-17',
      image: '/imagenes/blog/ramo-perfecto-2026.jpg',
      author: 'Nyuk Boutique Floral'
    },
    {
      id: 'delivery-flores-lima-guia',
      title: 'Delivery de Flores en Lima: Todo lo que Necesitas Saber',
      excerpt: 'Guía completa sobre delivery de flores en Lima: horarios, zonas de entrega y consejos.',
      category: 'Servicios',
      readTime: '10 min',
      publishDate: '2026-03-17',
      image: '/imagenes/blog/delivery-flores-lima.jpg',
      author: 'Nyuk Boutique Floral'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Blog Nyuk | Guías de Flores y Tips de Expertos</title>
        <meta name="description" content="Blog experto en flores: guías de cuidado, tips para elegir ramos y consejos de delivery en Lima. Aprende de los profesionales." />
        <meta name="keywords" content="blog flores, guías flores, tips floristería, cuidado de flores, delivery flores lima" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Blog Nyuk | Guías de Flores y Tips de Expertos" />
        <meta property="og:description" content="Blog experto en flores: guías de cuidado, tips para elegir ramos y consejos de delivery en Lima." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nyuk.vercel.app/blog/" />
        <meta property="og:image" content="https://nyuk.vercel.app/imagenes/blog/nyuk-blog-og.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog Nyuk | Guías de Flores y Tips de Expertos" />
        <meta name="twitter:description" content="Blog experto en flores: guías de cuidado, tips para elegir ramos y consejos de delivery en Lima." />
        <meta name="twitter:image" content="https://nyuk.vercel.app/imagenes/blog/nyuk-blog-og.jpg" />
        <meta name="twitter:site" content="@nyuk_pe" />
        <meta name="twitter:creator" content="@nyuk_pe" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://nyuk.vercel.app/blog/" />
        
        {/* Schema Blog */}
        <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Blog Nyuk Boutique Floral",
          "description": "Blog experto en flores: guías de cuidado, tips para elegir ramos y consejos de delivery en Lima.",
          "url": "https://nyuk.vercel.app/blog/",
          "publisher": {
            "@type": "Organization",
            "name": "Nyuk Boutique Floral",
            "logo": {
              "@type": "ImageObject",
              "url": "https://nyuk.vercel.app/imagenes/favicon-round-256.png"
            }
          },
          "blogPost": blogPosts.map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "url": `https://nyuk.vercel.app/blog/${post.id}`,
            "datePublished": post.publishDate,
            "author": {
              "@type": "Person",
              "name": post.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "Nyuk Boutique Floral"
            },
            "image": post.image,
            "keywords": "flores, guías, tips, lima, delivery"
          }))
        })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50">
        <BlogNavbar />
        
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-serif text-rose-900 mb-6">
              Blog Nyuk
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Guías expertas, tips de floristería y todo lo que necesitas saber sobre flores en Lima
            </p>
            <div className="flex justify-center gap-4 text-sm text-gray-600">
              <span className="bg-rose-100 px-3 py-1 rounded-full">🌹 Expertos en Flores</span>
              <span className="bg-pink-100 px-3 py-1 rounded-full">📍 Lima, Perú</span>
              <span className="bg-amber-100 px-3 py-1 rounded-full">📚 Tips Prácticos</span>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <article 
                  key={post.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="aspect-[16/9] bg-gradient-to-br from-rose-200 to-pink-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl">🌹</span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-medium text-rose-700">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h2 className="text-2xl font-serif text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <span>📅 {post.publishDate}</span>
                        <span>•</span>
                        <span>⏱️ {post.readTime}</span>
                      </div>
                      <span className="text-rose-600 font-medium">
                        Leer más →
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>✍️ {post.author}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-rose-100 to-pink-100">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-serif text-rose-900 mb-4">
              Recibe Nuestros Tips Semanales
            </h2>
            <p className="text-gray-700 mb-8">
              Únete a nuestra comunidad y recibe guías exclusivas, ofertas especiales y tips de cuidado de flores.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-4 py-3 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <button className="bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition-colors">
                Suscribirse
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default BlogPage;
