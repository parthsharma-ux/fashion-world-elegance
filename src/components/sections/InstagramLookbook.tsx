import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

const instagramPosts = [
  'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1583391733975-c7ed8ca3b0c8?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1604502083953-462de452ee95?w=400&h=400&fit=crop',
];

const InstagramLookbook: React.FC = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm uppercase tracking-widest font-medium">
            @fashionworld
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 mb-6">
            Shop the Look
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Follow us on Instagram for daily inspiration and styling tips
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
            <motion.a
              key={index}
              href="https://instagram.com/fashionworld"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group relative aspect-square rounded-xl overflow-hidden"
            >
              <img
                src={post}
                alt="Instagram post"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="https://instagram.com/fashionworld"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all"
          >
            <Instagram className="w-5 h-5" />
            Follow Us on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramLookbook;
