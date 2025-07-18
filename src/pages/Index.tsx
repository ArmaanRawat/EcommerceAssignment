import { useState, useMemo } from 'react';
import { ProductGrid } from '@/components/ProductGrid';
import { CategoryFilter } from '@/components/CategoryFilter';
import { useProducts } from '@/hooks/useProducts';
import { useSearch } from '@/contexts/SearchContext';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { products, loading, hasMore, loadMore } = useProducts(); // fetch all products
  const { search } = useSearch();

  // Extract unique categories from products
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach(product => {
      if (product.category) set.add(product.category);
    });
    return Array.from(set);
  }, [products]);

  // Filter products by search and selected category
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = search ? product.title.toLowerCase().includes(search.toLowerCase()) : true;
    return matchesCategory && matchesSearch;
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
