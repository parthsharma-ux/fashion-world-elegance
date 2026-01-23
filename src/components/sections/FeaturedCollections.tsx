import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStore } from '@/context/StoreContext';

const FeaturedCollections: React.FC = () => {
  const { categories } = useStore();

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm uppercase tracking-widest font-medium">
            Explore Our World
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 mb-6">
            Featured Collections
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collections of premium ethnic wear, designed for every occasion
          </p>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/shop?category=${encodeURIComponent(category.name)}`}>
                <div
                  className="relative h-80 rounded-2xl overflow-hidden shadow-lg"
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: '1000px',
                  }}
                >
                  <motion.div
                    whileHover={{
                      rotateY: 5,
                      rotateX: -5,
                      scale: 1.02,
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="relative w-full h-full"
                  >
                    {/* Image */}
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <motion.div
                        initial={false}
                        animate={{ y: 0 }}
                        className="transform transition-transform duration-300 group-hover:-translate-y-2"
                      >
                        <h3 className="font-display text-2xl font-bold text-white mb-2">
                          {category.name}
                        </h3>
                        <p className="text-white/80 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {category.description}
                        </p>
                        <div className="flex items-center gap-2 text-primary font-medium text-sm">
                          <span>Explore Collection</span>
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            →
                          </motion.span>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
