import { useEffect, useRef, useCallback } from 'react';
import { ProductCard } from './ProductCard';
import { ProductSkeleton } from './ProductSkeleton';

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

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export const ProductGrid = ({ products, loading, hasMore, onLoadMore }: ProductGridProps) => {
  const observer = useRef<IntersectionObserver>();

  const lastProductElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        onLoadMore();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, onLoadMore]);

  return (
    <div className="space-y-8">
      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, index) => {
          if (products.length === index + 1) {
            return (
              <div key={product.id} ref={lastProductElementRef}>
                <ProductCard product={product} />
              </div>
            );
          } else {
            return (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            );
          }
        })}
        
        {/* Loading Skeletons */}
        {loading && (
          <>
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={`skeleton-${index}`} />
            ))}
          </>
        )}
      </div>

      {/* Load More Button (fallback for mobile) */}
      {!loading && hasMore && (
        <div className="flex justify-center">
          <button
            onClick={onLoadMore}
            className="text-accent hover:text-accent-hover font-medium transition-colors"
          >
            Load More Products
          </button>
        </div>
      )}

      {/* End of Results */}
      {!loading && !hasMore && products.length > 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">You've reached the end of our catalog!</p>
        </div>
      )}
    </div>
  );
};