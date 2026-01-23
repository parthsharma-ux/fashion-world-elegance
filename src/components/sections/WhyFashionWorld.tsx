import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Shield, CreditCard, Clock } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Premium Fabric',
    description: 'Handpicked quality materials for ultimate comfort and elegance',
  },
  {
    icon: CreditCard,
    title: 'Affordable Price',
    description: 'Luxury ethnic wear at prices that won\'t break the bank',
  },
  {
    icon: Clock,
    title: 'Fast Dispatch',
    description: 'Orders dispatched within 2-3 working days',
  },
  {
    icon: Truck,
    title: 'Pan India Delivery',
    description: 'All over India delivery within 5-7 working days',
  },
];

const WhyFashionWorld: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-secondary/50 via-background to-accent/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm uppercase tracking-widest font-medium">
            Why Choose Us
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 mb-6">
            The Fashion World Promise
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to bringing you the finest ethnic wear experience
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="relative p-8 rounded-2xl bg-card border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center mb-6 shadow-gold"
                  >
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyFashionWorld;
