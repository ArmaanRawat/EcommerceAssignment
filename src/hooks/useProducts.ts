import { useState, useEffect, useCallback } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
  category: string;
}

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  refetch: () => void;
}

export const useProducts = (category: string | null = null, limit: number = 8): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = useCallback(async (pageNum: number, reset: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      let url = '';
      if (category) {
        url = `https://fakestoreapi.in/api/categories/${category}/products`;
      } else {
        url = `https://fakestoreapi.in/api/products?page=${pageNum}&limit=${limit}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const result = await response.json();
      let newProducts = result.products || [];

      // If using category endpoint, we need to implement our own pagination
      if (category && newProducts.length > 0) {
        const startIndex = (pageNum - 1) * limit;
        const endIndex = startIndex + limit;
        newProducts = newProducts.slice(startIndex, endIndex);
        // Check if there are more products for this category
        const totalInCategory = result.products?.length || 0;
        setHasMore(endIndex < totalInCategory);
      } else {
        // For main products endpoint, check if we have less than requested
        setHasMore(newProducts.length === limit);
      }

      if (reset) {
        setProducts(newProducts);
      } else {
        setProducts(prev => [...prev, ...newProducts]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [category, limit]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProducts(nextPage);
    }
  }, [loading, hasMore, page, fetchProducts]);

  const refetch = useCallback(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    setError(null);
    fetchProducts(1, true);
  }, [fetchProducts]);

  // Reset and fetch when category changes
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    setError(null);
    fetchProducts(1, true);
  }, [category, fetchProducts]);

  return {
    products,
    loading,
    error,
    hasMore,
    loadMore,
    refetch,
  };
};