
import { Product } from './types';
import React from 'react';

const today = new Date().toISOString();
const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Rosa de Ébano Eterna',
    price: 125,
    image: '/imagenes/especial1.jpg', //este
    category: 'Arreglos',
    description: 'Una mezcla sofisticada de rosas secas y eucalipto en un jarrón de cerámica.',
    addedAt: today
  },
  {
    id: '2',
    name: 'Peonías Rocío del Alba',
    price: 85,
    image: 'https://images.unsplash.com/photo-1596073413202-486cbbac3300?q=80&w=800&auto=format&fit=crop',
    category: 'Frescas',
    description: 'Peonías rosa suave capturadas en su momento más radiante.'
  },
  {
    id: '3',
    name: 'Ramo Terciopelo de Medianoche',
    price: 150,
    image: '/imagenes/especial2.jpg', //este
    category: 'Ocasión',
    description: 'Flores de color borgoña profundo para momentos de elegancia dramática.'
  },
  {
    id: '4',
    name: 'Silvestre de Verano',
    price: 65,
    image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=800&auto=format&fit=crop',
    category: 'Frescas',
    description: 'Un arreglo juguetón estilo campo de margaritas y flores silvestres.',
    addedAt: threeDaysAgo
  },
  {
    id: '5',
    name: 'Lirios de Alabastro',
    price: 110,
    image: 'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?q=80&w=800&auto=format&fit=crop',
    category: 'Arreglos',
    description: 'Lirios blancos puros que irradian paz y claridad.'
  },
  {
    id: '6',
    name: 'Atardeceres de Azafrán',
    price: 95,
    image: 'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?q=80&w=800&auto=format&fit=crop',
    category: 'Ocasión',
    description: 'Ranúnculos amarillos cálidos combinados con hojas de otoño.'
  },
  {
    id: '7',
    name: 'Pasión de Terciopelo',
    price: 140,
    image: 'https://images.unsplash.com/photo-1550983058-ba68da937845?q=80&w=800&auto=format&fit=crop',
    category: 'San Valentín',
    description: 'Rosas rojas premium de tallo largo en una caja editorial.'
  },
  {
    id: '9',
    name: 'Cosecha de Oro',
    price: 120,
    image: 'https://images.unsplash.com/photo-1494333165143-0d855f5d827f?q=80&w=800&auto=format&fit=crop',
    category: 'Colecciones',
    description: 'Un arreglo estructural inspirado en los campos de trigo al atardecer.'
  }
];

export const COLLECTIONS = [
  {
    id: 'san-valentin',
    title: '',
    subtitle: 'El lenguaje del amor',
    image: '/imagenes/portada-sanvalentin.jpg', // ← minúsculas
    category: 'San Valentín'
  },
  {
    id: 'arreglos',
    title: '',
    subtitle: 'Diseño estructural',
    image: '/imagenes/portada-arreglos.png', // ← minúsculas
    category: 'Arreglos'
  },
  {
    id: 'ramos',
    title: '',
    subtitle: 'Frescura portátil',
    image: '/imagenes/portada-ramos.png', // ← minúsculas
    category: 'Frescas'
  }
];

export const GALLERY_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=1200&auto=format&fit=crop',
    title: 'Peonías de Seda',
    span: 'col-span-1 row-span-2'
  },
  {
    url: 'https://images.unsplash.com/photo-1550983058-ba68da937845?q=80&w=1200&auto=format&fit=crop',
    title: 'Composición Editorial',
    span: 'col-span-2 row-span-1'
  },
  {
    url: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?q=80&w=1200&auto=format&fit=crop',
    title: 'Minimalismo Blanco',
    span: 'col-span-1 row-span-1'
  },
  {
    url: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?q=80&w=1200&auto=format&fit=crop',
    title: 'Texturas Botánicas',
    span: 'col-span-1 row-span-1'
  },
  {
    url: 'https://images.unsplash.com/photo-1494333165143-0d855f5d827f?q=80&w=1200&auto=format&fit=crop',
    title: 'Curaduría Nocturna',
    span: 'col-span-2 row-span-1'
  }
];

export const POPULAR_PRODUCTS = [PRODUCTS[0], PRODUCTS[2]];

export const TESTIMONIALS = [
  {
    id: 1,
    quote: "Los arreglos no son simplemente flores, son poesía visual. La atención al detalle en cada pétalo es sublime.",
    author: "@newnyuk",
    role: "Coleccionista de Arte",
    location: "Madrid"
  },
  {
    id: 2,
    quote: "Buscaba algo único para mi aniversario y la curaduría editorial de L'Art de la Fleur superó todas mis expectativas.",
    author: "@shes.paoo",
    role: "Arquitecto",
    location: "Barcelona"
  },
  {
    id: 3,
    quote: "La fragancia y la frescura de las peonías transformaron por completo la atmósfera de mi estudio. Simplemente impecable.",
    author: "@balarezo_grc",
    role: "Diseñadora de Interiores",
    location: "Valencia"
  }
];

export const DetailedFlower = ({ className }: { className?: string }) => {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="petalGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E57373" />
          <stop offset="100%" stopColor="#C62828" />
        </radialGradient>
      </defs>
      <g transform="translate(50, 50)">
        {[...Array(12)].map((_, i) => (
          <path
            key={i}
            d="M0,0 Q-15,-35 0,-45 Q15,-35 0,0"
            fill="url(#petalGrad)"
            transform={`rotate(${i * 30})`}
            stroke="#B71C1C"
            strokeWidth="0.5"
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <path
            key={i}
            d="M0,0 Q-10,-25 0,-35 Q10,-25 0,0"
            fill="#EF5350"
            transform={`rotate(${i * 30 + 15})`}
            opacity="0.8"
          />
        ))}
        <circle cx="0" cy="0" r="10" fill="#FFD54F" stroke="#F9A825" strokeWidth="1" />
        <circle cx="0" cy="0" r="6" fill="#FBC02D" />
        {[...Array(10)].map((_, i) => (
          <circle
            key={i}
            cx={Math.cos(i * (Math.PI * 2 / 10)) * 4}
            cy={Math.sin(i * (Math.PI * 2 / 10)) * 4}
            r="1"
            fill="#E65100"
          />
        ))}
      </g>
    </svg>
  );
};
