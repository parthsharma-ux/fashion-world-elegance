import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Award, Truck, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import aboutImage from '@/assets/about-craftsmanship.jpg';

const About: React.FC = () => {
  const features = [
    {
      icon: Heart,
      title: 'Handcrafted with Love',
      description: 'Each piece is carefully crafted by skilled artisans from Jaipur, carrying forward generations of traditional craftsmanship.',
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We use only the finest fabrics - pure cotton, soft rayon, and luxurious silk to ensure comfort and elegance.',
    },
    {
      icon: Truck,
      title: 'Pan India Delivery',
      description: 'We deliver across India with careful packaging to ensure your kurtis reach you in perfect condition.',
    },
    {
      icon: Shield,
      title: 'Trusted Brand',
      description: 'Thousands of happy customers trust us for authentic Jaipuri kurtis with excellent quality and service.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary text-sm uppercase tracking-widest font-medium">
              Our Story
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mt-4 mb-6">
              About Fashion World
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              We are passionate about bringing the rich heritage of Jaipuri craftsmanship 
              to modern women through our exquisite collection of ethnic wear.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
                  <img
                    src={aboutImage}
                    alt="Traditional Jaipuri Craftsmanship"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                A Legacy of <span className="text-primary">Elegance</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Fashion World was born from a deep love for India's rich textile heritage. 
                Based in the pink city of Jaipur, we work directly with skilled artisans 
                who have inherited their craft through generations.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our mission is to bring you authentic Jaipuri kurtis that blend traditional 
                artistry with contemporary designs. Every piece in our collection tells a 
                story of dedication, skill, and artistic excellence.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe that every woman deserves to feel beautiful and confident. 
                That's why we focus on creating comfortable, stylish, and affordable 
                ethnic wear that celebrates Indian craftsmanship.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Why Choose Us
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-background border border-border"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Join Our Fashion Family
            </h2>
            <p className="text-muted-foreground mb-8">
              Experience the beauty of authentic Jaipuri kurtis. Shop our latest 
              collection and become part of our growing family of satisfied customers.
            </p>
            <a
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors"
            >
              Explore Collection
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
