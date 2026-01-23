import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, MessageCircle, ChevronLeft, ChevronRight, Star, Truck, RotateCcw, Shield, Minus, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import SizeGuide from '@/components/SizeGuide';
import { useStore } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart, addToWishlist, removeFromWishlist, isInWishlist, settings } = useStore();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const product = products.find(p => p.id === id);
  const inWishlist = product ? isInWishlist(product.id) : false;

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 text-center">
          <h1 className="font-display text-3xl font-bold">Product not found</h1>
          <Button onClick={() => navigate('/shop')} className="mt-4">
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: 'Please select a size',
        variant: 'destructive',
      });
      return;
    }
    addToCart(product, selectedSize, quantity);
    toast({
      title: 'Added to cart!',
      description: `${product.name} (${selectedSize}) x ${quantity}`,
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast({
        title: 'Please select a size',
        variant: 'destructive',
      });
      return;
    }
    addToCart(product, selectedSize, quantity);
    navigate('/cart');
  };

  const handleWhatsAppOrder = () => {
    const imageUrl = product.images[0] || '';
    const message = encodeURIComponent(
      `🛍️ *New Order Request*\n\n` +
      `📦 *${product.name}*\n` +
      `━━━━━━━━━━━━━━\n` +
      `📏 Size: ${selectedSize || 'Not selected'}\n` +
      `🔢 Quantity: ${quantity}\n` +
      `💰 Price: ₹${product.price.toLocaleString()} × ${quantity} = *₹${(product.price * quantity).toLocaleString()}*\n\n` +
      `🖼️ Product Image:\n${imageUrl}`
    );
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${message}`, '_blank');
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast({ title: 'Removed from wishlist' });
    } else {
      addToWishlist(product);
      toast({ title: 'Added to wishlist' });
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Discount Badge */}
                {product.discount > 0 && (
                  <div className="absolute top-4 left-4 px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-full">
                    -{product.discount}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnail Strip */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-20 h-24 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                        index === currentImageIndex ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              {/* Breadcrumb */}
              <p className="text-sm text-muted-foreground">
                Home / {product.category} / {product.name}
              </p>

              {/* Title & Price */}
              <div className="space-y-2">
                <h1 className="font-display text-3xl md:text-4xl font-bold">
                  {product.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                  <span>{product.fabric}</span>
                  {product.color && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                      <span>{product.color}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                  ))}
                </div>
                <span className="text-muted-foreground">(24 reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-primary">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-sm font-semibold text-green-600">
                      Save ₹{(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  </>
                )}
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Select Size</h3>
                  <button 
                    onClick={() => setShowSizeGuide(true)}
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    📏 Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      onDoubleClick={() => setShowSizeGuide(true)}
                      className={`relative group w-14 h-12 rounded-lg border-2 font-medium transition-all ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:border-primary'
                      }`}
                      title="Double-click for size guide"
                    >
                      {size}
                      {/* Size guide hint on hover */}
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Double-click for guide
                      </span>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  💡 Tip: Double-click any size or tap "Size Guide" for measurements
                </p>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="font-semibold mb-3">Quantity</h3>
                <div className="inline-flex items-center gap-4 border rounded-lg px-4 py-2">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-1 hover:text-primary transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="font-semibold w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-1 hover:text-primary transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 min-w-[200px] py-4 px-6 bg-foreground text-background rounded-full font-medium flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuyNow}
                  className="btn-luxury flex-1 min-w-[200px] py-4"
                >
                  Buy Now
                </motion.button>
              </div>

              {/* WhatsApp Order */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsAppOrder}
                className="btn-whatsapp w-full justify-center py-4"
              >
                <MessageCircle className="w-5 h-5" />
                Order via WhatsApp
              </motion.button>

              {/* Wishlist Button */}
              <button
                onClick={handleWishlist}
                className={`flex items-center gap-2 ${inWishlist ? 'text-primary' : 'text-muted-foreground hover:text-primary'} transition-colors`}
              >
                <Heart className={`w-5 h-5 ${inWishlist && 'fill-current'}`} />
                {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm">Free Shipping</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm">7-Day Returns</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm">Secure Payment</p>
                </div>
              </div>

              {/* Product Video */}
              {product.video && (
                <div className="pt-8 border-t">
                  <h3 className="font-semibold mb-4">Product Video</h3>
                  <div className="rounded-xl overflow-hidden bg-muted">
                    <video
                      src={product.video}
                      controls
                      className="w-full h-auto max-h-[70vh] object-contain"
                      poster={product.images[0]}
                      playsInline
                    />
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="pt-8 border-t">
                <h3 className="font-semibold mb-4">Description</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {/* Care Instructions */}
              <div className="pt-8 border-t">
                <h3 className="font-semibold mb-4">Care Instructions</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.careInstructions}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <SizeGuide open={showSizeGuide} onOpenChange={setShowSizeGuide} />
    </div>
  );
};

export default ProductDetail;
