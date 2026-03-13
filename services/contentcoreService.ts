import React from 'react';
import { Product } from '../types';

// Contentcore.xyz API configuration
const CONTENTCORE_CONFIG = {
  baseUrl: 'https://api.contentcore.xyz/v1',
  projectId: 'your-project-id', // Replace with actual project ID
  apiKey: 'your-api-key' // Replace with actual API key
};

interface ContentcoreResponse {
  data: ContentcoreProduct[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

interface ContentcoreProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  availability: boolean;
  featured?: boolean;
  metadata?: Record<string, any>;
}

// Map Contentcore response to our Product interface
const mapContentcoreToProduct = (item: ContentcoreProduct): Product => ({
  id: item.id,
  name: item.name,
  description: item.description,
  price: item.price,
  image: item.images[0] || '/imagenes/placeholder.jpg',
  category: item.category,
  addedAt: item.metadata?.addedAt || new Date().toISOString()
});

// Fetch products from Contentcore.xyz
export const fetchProductsFromContentcore = async (
  category?: string,
  page: number = 1,
  limit: number = 20
): Promise<Product[]> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(category && { category })
    });

    const response = await fetch(
      `${CONTENTCORE_CONFIG.baseUrl}/projects/${CONTENTCORE_CONFIG.projectId}/content?${params}`,
      {
        headers: {
          'Authorization': `Bearer ${CONTENTCORE_CONFIG.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Contentcore API error: ${response.status}`);
    }

    const data: ContentcoreResponse = await response.json();
    return data.data.map(mapContentcoreToProduct);
  } catch (error) {
    console.error('Error fetching products from Contentcore:', error);
    throw error;
  }
};

// Fetch single product by ID
export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await fetch(
      `${CONTENTCORE_CONFIG.baseUrl}/projects/${CONTENTCORE_CONFIG.projectId}/content/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${CONTENTCORE_CONFIG.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Contentcore API error: ${response.status}`);
    }

    const item: ContentcoreProduct = await response.json();
    return mapContentcoreToProduct(item);
  } catch (error) {
    console.error('Error fetching product from Contentcore:', error);
    throw error;
  }
};

// Search products
export const searchProducts = async (
  query: string,
  page: number = 1,
  limit: number = 20
): Promise<Product[]> => {
  try {
    const params = new URLSearchParams({
      search: query,
      page: page.toString(),
      limit: limit.toString()
    });

    const response = await fetch(
      `${CONTENTCORE_CONFIG.baseUrl}/projects/${CONTENTCORE_CONFIG.projectId}/search?${params}`,
      {
        headers: {
          'Authorization': `Bearer ${CONTENTCORE_CONFIG.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Contentcore API error: ${response.status}`);
    }

    const data: ContentcoreResponse = await response.json();
    return data.data.map(mapContentcoreToProduct);
  } catch (error) {
    console.error('Error searching products from Contentcore:', error);
    throw error;
  }
};

// React hook for fetching products with caching
export const useContentcoreProducts = (category?: string) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProductsFromContentcore(category);
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category]);

  return { products, loading, error };
};
