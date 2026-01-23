export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  addedAt?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Transaction {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string; // Para contactar por WhatsApp
  address: string;
  total: number;
  items: { name: string; quantity: number; price: number }[];
  paymentMethod: string;
  receiptImage?: string; // Comprobante en base64
  giftMessage?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'failed';
  date: string;
  deliveryDate: string;
}