import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm">Shop by Category</h3>
      <ScrollArea className="w-full">
        <div className="flex space-x-2 pb-2">
          <Button
            variant={selectedCategory === null ? "accent" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(null)}
            className={`category-pill whitespace-nowrap ${selectedCategory === null ? 'ring-2 ring-accent' : ''}`}
            aria-pressed={selectedCategory === null}
          >
            All Products
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "accent" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category)}
              className={`category-pill whitespace-nowrap ${selectedCategory === category ? 'ring-2 ring-accent' : ''}`}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};