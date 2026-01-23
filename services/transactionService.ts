import { Transaction } from '../types';

const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycby6M-7J_OcTU96zrCTtE8rjCq_c6EdbQZHfa1p_AIgtx7QejYgipwlqiu0ytI_2lN9MYA/exec';

/**
 * Registrar pedido en Google Sheets
 */
export const recordTransaction = async (
  transaction: Transaction,
  receiptImage?: string | null
): Promise<boolean> => {
  try {
    // 1. Guardar backup local (por si falla internet)
    const history = JSON.parse(localStorage.getItem('order_history') || '[]');
    localStorage.setItem('order_history', JSON.stringify([...history, transaction]));
    console.log('💾 Pedido guardado localmente');

    // 2. Preparar datos para enviar
    const dataToSend = {
      orderId: transaction.orderId,
      customerName: transaction.customerName,
      customerEmail: transaction.customerEmail,
      customerPhone: transaction.customerPhone,
      address: transaction.address,
      items: transaction.items,
      total: transaction.total,
      paymentMethod: transaction.paymentMethod,
      receiptImage: receiptImage || 'Sin comprobante',
      giftMessage: transaction.giftMessage || '',
      deliveryDate: transaction.deliveryDate,
      status: transaction.status,
      date: transaction.date
    };

    // 3. Enviar a Google Sheets
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
      mode: 'no-cors'
    });

    console.log('✅ Pedido enviado a Google Sheets');
    return true;

  } catch (error) {
    console.error('❌ Error:', error);
    console.log('📋 Pedido guardado localmente como respaldo');
    return true; // No bloquear al cliente
  }
};

/**
 * Validar número de tarjeta (algoritmo de Luhn)
 */
export const validateCardNumber = (number: string): boolean => {
  let sum = 0;
  let shouldDouble = false;
  
  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number.charAt(i));
    
    if (shouldDouble) {
      if ((digit *= 2) > 9) digit -= 9;
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  return sum % 10 === 0 && number.length >= 13;
};

/**
 * Detectar tipo de tarjeta
 */
export const getCardType = (number: string): string => {
  if (number.startsWith('4')) return 'Visa';
  if (/^5[1-5]/.test(number)) return 'Mastercard';
  if (/^3[47]/.test(number)) return 'American Express';
  if (/^3(?:0[0-5]|[68])/.test(number)) return 'Diners Club';
  return 'Tarjeta';
};