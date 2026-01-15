import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

const CustomerReviews: React.FC = () => {
  const { reviews } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-20 md:py-32 bg-foreground text-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm uppercase tracking-widest font-medium">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 mb-6">
            What Our Customers Say
          </h2>
        </motion.div>

        {/* Reviews Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Quote Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-gold">
            <Quote className="w-8 h-8 text-primary-foreground" />
          </div>

          <div className="relative pt-12 pb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center px-8 md:px-16"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star
                        className={`w-6 h-6 ${
                          i < reviews[currentIndex].rating
                            ? 'text-primary fill-primary'
                            : 'text-background/30'
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Review Text */}
                <p className="font-display text-xl md:text-2xl lg:text-3xl leading-relaxed mb-8">
                  "{reviews[currentIndex].comment}"
                </p>

                {/* Reviewer */}
                <div className="flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {reviews[currentIndex].avatar}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-lg">{reviews[currentIndex].name}</p>
                    <p className="text-background/60 text-sm">{reviews[currentIndex].date}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevReview}
                className="w-12 h-12 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors pointer-events-auto"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextReview}
                className="w-12 h-12 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors pointer-events-auto"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-background/30 hover:bg-background/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
