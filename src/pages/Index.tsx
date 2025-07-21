import { useState, useMemo, useEffect } from 'react';
import { ProductGrid } from '@/components/ProductGrid';
import { CategoryFilter } from '@/components/CategoryFilter';
import { useProducts } from '@/hooks/useProducts';
import { useSearch } from '@/contexts/SearchContext';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  
  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  // Pass selectedCategory as slug to useProducts
  const { products, loading, hasMore, loadMore } = useProducts(selectedCategory, 8);
  const { search } = useSearch();

  // Only filter by search term client-side
  const filteredProducts = products.filter(product => {
    return search ? product.title.toLowerCase().includes(search.toLowerCase()) : true;
  });

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
          Discover Amazing Products
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse through our curated collection of quality products with infinite scroll and smart filtering.
        </p>
      </div>

      {/* Category Filter */}
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Products Grid */}
      <ProductGrid 
        products={filteredProducts}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMore}
      />
    </div>
  );
};

export default Index;
