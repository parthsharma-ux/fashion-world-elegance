import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/types/store';
import { useStore } from '@/context/StoreContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const inWishlist = isInWishlist(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0] || 'M');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="card-3d">
          <div className="card-3d-inner relative overflow-hidden rounded-2xl bg-card shadow-lg">
            {/* Image Container */}
            <div className="relative min-h-[280px] max-h-[400px] overflow-hidden bg-muted/50 flex items-center justify-center">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Discount Badge */}
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                  -{product.discount}%
                </div>
              )}

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWishlist}
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-lg',
                    inWishlist ? 'bg-primary text-primary-foreground' : 'bg-white/90 text-foreground hover:bg-primary hover:text-primary-foreground'
                  )}
                >
                  <Heart className={cn('w-5 h-5', inWishlist && 'fill-current')} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg"
                >
                  <Eye className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Add to Cart Button */}
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="w-full py-3 bg-card text-card-foreground backdrop-blur-sm rounded-full font-medium flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg border border-border"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </motion.button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider mb-2">
                <span>{product.fabric}</span>
                {product.color && (
                  <>
                    <span>•</span>
                    <span>{product.color}</span>
                  </>
                )}
              </div>
              <h3 className="font-display text-lg font-semibold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
