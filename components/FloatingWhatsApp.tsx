import React from 'react';
import { Phone, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMinimized, setIsMinimized] = React.useState(false);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/51948162531?text=Hola%20nyuk.pe%20quiero%20hacer%20un%20pedido', '_blank');
  };

  const handleQuickMessage = (message: string) => {
    window.open(`https://wa.me/51948162531?text=${encodeURIComponent(message)}`, '_blank');
  };

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsMinimized(true);
      } else {
        setIsMinimized(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Quick Messages */}
      {isOpen && (
        <div className="mb-4 space-y-2 animate-fade-up">
          <button
            onClick={() => handleQuickMessage('Hola, quiero hacer un pedido de flores')}
            className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors text-sm whitespace-nowrap"
          >
            🌹 Hacer pedido
          </button>
          <button
            onClick={() => handleQuickMessage('¿Cuáles son los precios de los arreglos?')}
            className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors text-sm whitespace-nowrap"
          >
            💰 Ver precios
          </button>
          <button
            onClick={() => handleQuickMessage('¿Tienen envío gratis hoy?')}
            className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors text-sm whitespace-nowrap"
          >
            🚚 Envío gratis
          </button>
        </div>
      )}

      {/* WhatsApp Button */}
      <div className="relative">
        {/* Main WhatsApp Button */}
        <button
          onClick={handleWhatsAppClick}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className={`bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${
            isMinimized ? 'w-14 h-14' : 'w-16 h-16'
          }`}
          title="Contáctanos por WhatsApp 948 162 531"
        >
          <Phone size={isMinimized ? 24 : 28} strokeWidth={2} />
        </button>

        {/* Pulse Animation */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
        
        {/* Badge */}
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
          1
        </div>
      </div>

      {/* Help Text */}
      {!isMinimized && (
        <div className="absolute -top-12 right-0 bg-gray-800 text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap">
          💬 ¿Necesitas ayuda?
        </div>
      )}
    </div>
  );
};
