import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductCardSkeletonProps {
  index?: number;
}

const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({ index = 0 }) => {
  return (
    <div 
      className="group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-card shadow-lg">
        {/* Image Skeleton */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <Skeleton className="w-full h-full" />
        </div>

        {/* Product Info Skeleton */}
        <div className="p-5 space-y-3">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-5 w-3/4" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
