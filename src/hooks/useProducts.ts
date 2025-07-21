import { useState, useEffect, useCallback } from 'react';
import { useRef } from 'react';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  // Add more fields as needed
}

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  refetch: () => void;
  total: number;
}

export const useProducts = (category: string | null = null, limit: number = 8): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const skipRef = useRef(0);

  const fetchProducts = useCallback(async (reset: boolean = false) => {
    try {
      setLoading(true);
      setError(null);
      let url = '';
      let skip = reset ? 0 : skipRef.current;
      if (category) {
        url = `https://dummyjson.com/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
      } else {
        url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const result = await response.json();
      const newProducts = Array.isArray(result.products) ? result.products : [];
      setTotal(result.total || 0);
      if (reset) {
        setProducts(newProducts);
        skipRef.current = limit;
      } else {
        setProducts(prev => [...prev, ...newProducts]);
        skipRef.current += limit;
      }
      setHasMore((reset ? limit : skipRef.current) < (result.total || 0));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [category, limit]);

  // Reset and fetch when category changes
  useEffect(() => {
    setProducts([]);
    setHasMore(true);
    setError(null);
    setTotal(0);
    skipRef.current = 0;
    fetchProducts(true);
  }, [category, fetchProducts]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchProducts(false);
    }
  }, [loading, hasMore, fetchProducts]);

  const refetch = useCallback(() => {
    setProducts([]);
    setHasMore(true);
    setError(null);
    setTotal(0);
    skipRef.current = 0;
    fetchProducts(true);
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    hasMore,
    loadMore,
    refetch,
    total,
  };
};