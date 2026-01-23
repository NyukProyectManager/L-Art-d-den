
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, MessageSquare, Paperclip, Image as ImageIcon } from 'lucide-react';
import { getFloralAdvice } from '../geminiService';
import { ChatMessage } from '../types';

export const FloralAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setHasGreeted(true);
      setIsTyping(true);
      setTimeout(() => {
        const welcomeMsg: ChatMessage = { 
          role: 'model', 
          text: 'Bienvenido a L\'Art d\'Éden. Soy tu estilista floral personal. Estoy aquí para resolver tus dudas y ayudarte a crear el diseño de tus sueños.' 
        };
        setMessages([welcomeMsg]);
        setIsTyping(false);
      }, 1000);
    }
  }, [isOpen, hasGreeted]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return;
    
    const userMsg: ChatMessage = { 
      role: 'user', 
      text: input || (selectedImage ? "He subido una imagen para que la evalúes." : "")
    };
    
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    const currentImage = selectedImage;
    
    setInput('');
    setSelectedImage(null);
    setIsTyping(true);

    try {
      const response = await getFloralAdvice(currentInput, currentImage);
      setMessages(prev => [...prev, { role: 'model', text: response || 'Lo siento, no he podido analizar tu solicitud.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Mis disculpas, mis sentidos botánicos están un poco enredados. Inténtalo de nuevo más tarde.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[60]">
      {isOpen ? (
        <div className="bg-white rounded-[2rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.2)] w-[calc(100vw-2rem)] sm:w-[420px] max-h-[85vh] flex flex-col overflow-hidden border border-[#EAEAEA] transition-all duration-500 animate-[fade-up_0.5s_ease-out]">
          <div className="bg-[#A3B18A] p-5 sm:p-6 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Sparkles size={18} className="animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="serif italic text-lg sm:text-xl tracking-wide leading-tight">Estilista Floral</span>
                <span className="text-[7px] sm:text-[8px] uppercase tracking-[0.2em] opacity-80 font-bold">Atención Exclusiva</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform p-1"><X size={20} /></button>
          </div>

          <div 
            ref={scrollRef}
            className="h-[380px] sm:h-[450px] overflow-y-auto p-5 sm:p-6 space-y-6 bg-[#FAF9F6]/50 scrollbar-hide"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-[fade-up_0.3s_ease-out]`}>
                <div className={`max-w-[90%] sm:max-w-[85%] p-4 rounded-2xl text-[12px] sm:text-[13px] leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#A3B18A] text-white rounded-tr-none' 
                    : 'bg-white border border-[#EAEAEA] text-[#2D2D2D] rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-[#EAEAEA] p-4 rounded-2xl rounded-tl-none shadow-sm">
                  <div className="flex space-x-1.5">
                    <div className="w-1.5 h-1.5 bg-[#A3B18A] rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-[#A3B18A] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-[#A3B18A] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {selectedImage && (
            <div className="px-5 py-3 bg-gray-50 border-t border-[#EAEAEA] flex items-center space-x-4">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden border-2 border-[#A3B18A]">
                <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl-lg"
                >
                  <X size={10} />
                </button>
              </div>
              <span className="text-[9px] text-gray-400 uppercase tracking-widest italic font-bold">Imagen Lista</span>
            </div>
          )}

          <div className="p-5 sm:p-6 border-t border-[#EAEAEA] bg-white flex items-center space-x-3">
            <input 
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageSelect}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="text-gray-400 hover:text-[#A3B18A] transition-colors p-1"
            >
              <ImageIcon size={20} strokeWidth={1.5} />
            </button>
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="¿En qué puedo ayudarte?"
              className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-gray-300 italic"
            />
            <button 
              onClick={handleSend}
              className={`p-2 rounded-full transition-all ${input.trim() || selectedImage ? 'bg-[#A3B18A] text-white scale-110' : 'text-gray-200'}`}
              disabled={!input.trim() && !selectedImage}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-[#2D2D2D] hover:bg-[#588157] text-white p-4 sm:p-5 rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center space-x-3 group"
        >
          <MessageSquare size={22} strokeWidth={1.2} className="sm:w-[26px] sm:h-[26px] group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline font-bold text-[9px] tracking-[0.3em] uppercase pr-2">Stylist</span>
        </button>
      )}
    </div>
  );
};