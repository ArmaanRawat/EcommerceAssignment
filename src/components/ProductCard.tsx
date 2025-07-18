import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/components/CartProvider';
import { useToast } from '@/hooks/use-toast';

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

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <Card className="product-card h-full border-0 shadow-card bg-card overflow-hidden">
        <CardContent className="p-0">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            {imageLoading && (
              <div className="absolute inset-0 pulse-loading" />
            )}
            <img
              src={product.image}
              alt={product.title}
              className={`product-image w-full h-full object-cover ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              } transition-opacity duration-300`}
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
            />
            
            {/* Like Button */}
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-3 right-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background ${
                isLiked ? 'text-price' : 'text-muted-foreground'
              }`}
              onClick={handleLike}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>

            {/* Category Badge */}
            <Badge 
              variant="secondary" 
              className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm"
            >
              {product.category}
            </Badge>
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-3">
            <div className="space-y-2">
              <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-accent transition-colors">
                {product.title}
              </h3>
              
              {/* Rating */}
              {product.rating && (
                <div className="flex items-center space-x-1">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-muted-foreground ml-1">
                      {product.rating.rate} ({product.rating.count})
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Price and Add to Cart */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-lg font-bold text-accent">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              
              <Button
                variant="accent"
                size="sm"
                onClick={handleAddToCart}
                className="h-8 px-3"
              >
                <ShoppingCart className="h-3 w-3 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};