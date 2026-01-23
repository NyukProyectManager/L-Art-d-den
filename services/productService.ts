/**
 * Servicio para cargar productos desde Google Sheets
 * E:\Documentos\magy web\services\productService.ts
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  addedAt?: string;
}

// URL de Google Apps Script de PRODUCTOS
const GOOGLE_SHEETS_PRODUCTOS_URL = 'https://script.google.com/macros/s/AKfycbyzjpgMPGQ9RLXvdFUfNrvRYnmuj0qDEbGdycwuRjdqYQn5iTGTcnVMGmKqAeCM1I94/exec';

/**
 * Cache de productos para no hacer requests innecesarios
 */
let productosCache: Product[] | null = null;
let ultimaActualizacion: number = 0;
const CACHE_DURACION = 5 * 60 * 1000; // 5 minutos

/**
 * Cargar productos desde Google Sheets
 */
export const cargarProductos = async (): Promise<Product[]> => {
  try {
    // Verificar si hay cache válido
    const ahora = Date.now();
    if (productosCache && (ahora - ultimaActualizacion) < CACHE_DURACION) {
      console.log('📦 Usando productos del cache');
      return productosCache;
    }

    console.log('🌐 Cargando productos desde Google Sheets...');

    // Hacer request a Google Sheets
    const response = await fetch(GOOGLE_SHEETS_PRODUCTOS_URL, {
      method: 'GET',
      mode: 'cors'
    });

    if (!response.ok) {
      throw new Error('Error al cargar productos');
    }

    const data = await response.json();

    if (data.success && data.data) {
      // Actualizar cache
      productosCache = data.data;
      ultimaActualizacion = ahora;
      
      console.log(`✅ ${data.count} productos cargados desde Google Sheets`);
      return data.data;
    } else {
      throw new Error('Respuesta inválida del servidor');
    }

  } catch (error) {
    console.error('❌ Error al cargar productos:', error);
    
    // Si falla, usar productos de respaldo
    console.log('📋 Usando productos de respaldo');
    return obtenerProductosRespaldo();
  }
};

/**
 * Forzar recarga de productos (ignorar cache)
 */
export const recargarProductos = async (): Promise<Product[]> => {
  productosCache = null;
  ultimaActualizacion = 0;
  return cargarProductos();
};

/**
 * Productos de respaldo (mientras no esté configurado Google Sheets)
 * Estos son los productos actuales que ya tienes en constants.tsx
 */
function obtenerProductosRespaldo(): Product[] {
  return [
    {
      id: '1',
      name: 'Rosa de Ébano Eterna',
      price: 125,
      image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=800&auto=format&fit=crop',
      category: 'Arreglos',
      description: 'Elegantes rosas en tonos profundos que evocan misterio y sofisticación.'
    },
    {
      id: '2',
      name: 'Peonías Rocío del Alba',
      price: 85,
      image: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?q=80&w=800&auto=format&fit=crop',
      category: 'Ocasión',
      description: 'Frescas peonías que capturan la esencia de la primavera.'
    },
    {
      id: '3',
      name: 'Ramo Terciopelo de Medianoche',
      price: 150,
      image: 'https://images.unsplash.com/photo-1594582595487-7ead14e63f36?q=80&w=800&auto=format&fit=crop',
      category: 'Arreglos',
      description: 'Composición dramática de flores oscuras y elegantes.'
    },
    {
      id: '4',
      name: 'Lirios del Valle Eternos',
      price: 95,
      image: 'https://images.unsplash.com/photo-1563241891-b0bb3769ac5f?q=80&w=800&auto=format&fit=crop',
      category: 'Ramos',
      description: 'Delicados lirios blancos que simbolizan pureza.'
    },
    {
      id: '5',
      name: 'Orquídeas Nocturnas',
      price: 180,
      image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=800&auto=format&fit=crop',
      category: 'Premium',
      description: 'Orquídeas exóticas de colección exclusiva.'
    },
    {
      id: '6',
      name: 'Tulipanes Whisper',
      price: 75,
      image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?q=80&w=800&auto=format&fit=crop',
      category: 'Ocasión',
      description: 'Tulipanes suaves en tonos pastel perfectos para cualquier ocasión.'
    }
  ];
}