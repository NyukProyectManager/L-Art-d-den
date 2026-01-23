
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "./constants";

// Always use the named parameter and environment variable directly for initialization
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFloralAdvice = async (userPrompt: string, base64Image?: string | null) => {
  const productList = PRODUCTS.map(p => `${p.name} ($${p.price}): ${p.description}`).join('\n');
  
  const systemInstruction = `Eres un estilista floral profesional de 'L'Art d'Éden', una boutique de flores de lujo.
    Tu objetivo es ayudar al cliente a elegir el arreglo perfecto o evaluar sus propios diseños.
    
    INSTRUCCIONES DE EVALUACIÓN DE IMAGEN:
    Si el usuario sube una imagen:
    1. Identifica las flores principales visibles.
    2. Comenta sobre la paleta de colores y el estilo (clásico, boho, editorial, minimalista).
    3. Evalúa la viabilidad técnica: ¿Es algo que L'Art d'Éden puede replicar? (Asume que somos expertos y podemos hacer casi todo si las flores están de temporada).
    4. Sugiere mejoras o complementos de nuestra colección.

    Nuestra colección actual para referencias:
    ${productList}
    
    Sé poético, elegante y profesional. Habla siempre en español.`;

  const parts: any[] = [];
  
  // Agregar imagen si existe
  if (base64Image) {
    const base64Data = base64Image.split(',')[1];
    const mimeType = base64Image.split(';')[0].split(':')[1];
    parts.push({
      inlineData: {
        data: base64Data,
        mimeType: mimeType
      }
    });
  }

  // Agregar texto
  parts.push({ text: userPrompt || "Por favor, evalúa este diseño floral." });

  // Implement robust error handling with exponential backoff as per coding guidelines
  let retries = 3;
  let delay = 1000;
  
  while (retries >= 0) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts },
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.8,
          // Guidelines recommend avoiding maxOutputTokens unless strictly required to prevent unexpected blocking
        }
      });
      return response.text;
    } catch (error) {
      if (retries === 0) throw error;
      console.warn(`Gemini API error, retrying in ${delay}ms...`, error);
      await new Promise(resolve => setTimeout(resolve, delay));
      retries--;
      delay *= 2;
    }
  }
};