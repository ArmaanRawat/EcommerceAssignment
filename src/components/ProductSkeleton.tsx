import { Card, CardContent } from '@/components/ui/card';

export const ProductSkeleton = () => {
  return (
    <Card className="h-full border-0 shadow-card bg-card overflow-hidden">
      <CardContent className="p-0">
        {/* Image Skeleton */}
        <div className="aspect-square pulse-loading" />
        
        {/* Content Skeleton */}
        <div className="p-4 space-y-3">
          <div className="space-y-2">
            {/* Title Skeleton */}
            <div className="h-4 pulse-loading rounded" />
            <div className="h-4 pulse-loading rounded w-3/4" />
            
            {/* Rating Skeleton */}
            <div className="h-3 pulse-loading rounded w-1/2" />
          </div>

          {/* Price and Button Skeleton */}
          <div className="flex items-center justify-between">
            <div className="h-6 pulse-loading rounded w-1/3" />
            <div className="h-8 pulse-loading rounded w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};