import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal, Grid3X3, LayoutGrid, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import { useStore } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';

const Shop: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { products, categories, isLoading } = useStore();
  const [priceRange, setPriceRange] = useState<number[]>([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('category') ? [searchParams.get('category')!] : []
  );
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [gridCols, setGridCols] = useState(4);

  const fabrics = [...new Set(products.map(p => p.fabric))];
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(p => p.inStock);

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    if (selectedFabrics.length > 0) {
      filtered = filtered.filter(p => selectedFabrics.includes(p.fabric));
    }

    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p => p.sizes.some(s => selectedSizes.includes(s)));
    }

    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [products, selectedCategories, selectedFabrics, selectedSizes, priceRange, sortBy]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleFabric = (fabric: string) => {
    setSelectedFabrics(prev =>
      prev.includes(fabric)
        ? prev.filter(f => f !== fabric)
        : [...prev, fabric]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedFabrics([]);
    setSelectedSizes([]);
    setPriceRange([0, 5000]);
  };

  const hasFilters = selectedCategories.length > 0 || selectedFabrics.length > 0 || selectedSizes.length > 0 || priceRange[0] > 0 || priceRange[1] < 5000;

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Price Range */}
      <div>
        <h4 className="font-semibold mb-4">Price Range</h4>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={5000}
          step={100}
          className="mb-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-semibold mb-4">Categories</h4>
        <div className="space-y-3">
          {categories.map(category => (
            <label key={category.id} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={selectedCategories.includes(category.name)}
                onCheckedChange={() => toggleCategory(category.name)}
              />
              <span className="text-sm">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fabrics */}
      <div>
        <h4 className="font-semibold mb-4">Fabric</h4>
        <div className="space-y-3">
          {fabrics.map(fabric => (
            <label key={fabric} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={selectedFabrics.includes(fabric)}
                onCheckedChange={() => toggleFabric(fabric)}
              />
              <span className="text-sm">{fabric}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h4 className="font-semibold mb-4">Size</h4>
        <div className="flex flex-wrap gap-2">
          {sizes.map(size => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`w-10 h-10 rounded-lg border text-sm font-medium transition-colors ${
                selectedSizes.includes(size)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border hover:border-primary'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {hasFilters && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          <X className="w-4 h-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Our Collection
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Discover our handpicked collection of premium ethnic wear
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="w-5 h-5" />
                  <h3 className="font-semibold">Filters</h3>
                </div>
                <FilterContent />
              </div>
            </div>

            {/* Products */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> products
                </p>
                
                <div className="flex items-center gap-4">
                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden">
                        <SlidersHorizontal className="w-4 h-4 mr-2" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterContent />
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="discount">Best Discount</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Grid Toggle */}
                  <div className="hidden sm:flex items-center gap-2 border rounded-lg p-1">
                    <button
                      onClick={() => setGridCols(3)}
                      className={`p-2 rounded ${gridCols === 3 ? 'bg-primary text-primary-foreground' : ''}`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setGridCols(4)}
                      className={`p-2 rounded ${gridCols === 4 ? 'bg-primary text-primary-foreground' : ''}`}
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {isLoading ? (
                <div className={`grid gap-6 ${
                  gridCols === 3
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                }`}>
                  {Array.from({ length: 8 }).map((_, index) => (
                    <ProductCardSkeleton key={index} index={index} />
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className={`grid gap-6 ${
                  gridCols === 3
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                }`}>
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">No products found matching your criteria</p>
                  <Button onClick={clearFilters} className="mt-4">
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Shop;
