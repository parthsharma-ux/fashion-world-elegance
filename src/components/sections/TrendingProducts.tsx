import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';

const TrendingProducts: React.FC = () => {
  const { products, isLoading } = useStore();
  const trendingProducts = products.filter(p => p.trending).slice(0, 4);

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <span className="text-primary text-sm uppercase tracking-widest font-medium">
              What's Hot
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-4">
              Trending Now
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-primary font-medium mt-4 md:mt-0 hover:gap-4 transition-all"
          >
            View All Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ? (
            // Skeleton loading state
            Array.from({ length: 4 }).map((_, index) => (
              <ProductCardSkeleton key={index} index={index} />
            ))
          ) : (
            trendingProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
