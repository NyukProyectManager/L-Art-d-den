import React from 'react';
import { Flower2, Instagram, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-rose-900 to-pink-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Flower2 className="w-8 h-8" />
              <span className="text-2xl font-serif">Nyuk</span>
            </div>
            <p className="text-rose-100 leading-relaxed">
              Flores premium en Lima con entrega el mismo día. 
              Transformamos momentos en recuerdos inolvidables.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://instagram.com/nyuk.pe" 
                className="w-10 h-10 bg-rose-800 rounded-full flex items-center justify-center hover:bg-rose-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/51948162531" 
                className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2 text-rose-100">
              <li><a href="/collections" className="hover:text-white transition-colors">Arreglos Florales</a></li>
              <li><a href="/collections" className="hover:text-white transition-colors">Ramos Frescos</a></li>
              <li><a href="/collections" className="hover:text-white transition-colors">Flores Premium</a></li>
              <li><a href="/collections" className="hover:text-white transition-colors">Delivery Inmediato</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Blog de Flores</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Contacto</h3>
            <div className="space-y-3 text-rose-100">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <a href="tel:+51948162531" className="hover:text-white transition-colors">
                  +51 948 162 531
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5" />
                <a href="https://wa.me/51948162531" className="hover:text-white transition-colors">
                  WhatsApp disponible
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <a href="mailto:contacto@nyuk.pe" className="hover:text-white transition-colors">
                  contacto@nyuk.pe
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <span>Francísco Pizarro 698, Lima</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Horarios</h3>
            <div className="space-y-2 text-rose-100">
              <div className="flex justify-between">
                <span>Lunes a Viernes</span>
                <span>9:00 - 21:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sábados</span>
                <span>9:00 - 21:00</span>
              </div>
              <div className="flex justify-between">
                <span>Domingos</span>
                <span>9:00 - 21:00</span>
              </div>
              <div className="mt-4 p-3 bg-rose-800 rounded-lg">
                <p className="text-sm font-medium">🚚 Delivery mismo día</p>
                <p className="text-xs">Pedidos antes de las 6pm</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-rose-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-rose-200 text-sm">
              © 2026 Nyuk Boutique Floral. Todos los derechos reservados.
            </div>
            <div className="flex gap-6 text-rose-200 text-sm">
              <a href="/privacy" className="hover:text-white transition-colors">Privacidad</a>
              <a href="/terms" className="hover:text-white transition-colors">Términos</a>
              <a href="/blog" className="hover:text-white transition-colors">Blog</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
