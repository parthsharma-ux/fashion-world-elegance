import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Award, Truck, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import storeImage from '@/assets/store-interior.jpg';

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

  // Smoother animation variants for mobile
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary text-xs sm:text-sm uppercase tracking-widest font-medium">
              Our Story
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
              About Fashion World
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed px-2">
              We are passionate about bringing the rich heritage of Jaipuri craftsmanship 
              to modern women through our exquisite collection of ethnic wear.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section with Store Image */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInLeft}
              className="order-2 lg:order-1"
            >
              <div className="relative">
                <div className="aspect-[4/3] sm:aspect-[4/5] lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={storeImage}
                    alt="Fashion World Store Interior"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-24 sm:w-32 h-24 sm:h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-20 sm:w-24 h-20 sm:h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInRight}
              className="space-y-4 sm:space-y-6 order-1 lg:order-2"
            >
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">
                A Legacy of <span className="text-primary">Elegance</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Fashion World was born from a deep love for India's rich textile heritage. 
                Based in the pink city of Jaipur, we work directly with skilled artisans 
                who have inherited their craft through generations.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Our mission is to bring you authentic Jaipuri kurtis that blend traditional 
                artistry with contemporary designs. Every piece in our collection tells a 
                story of dedication, skill, and artistic excellence.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                We believe that every woman deserves to feel beautiful and confident. 
                That's why we focus on creating comfortable, stylish, and affordable 
                ethnic wear that celebrates Indian craftsmanship.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 sm:py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">
              Why Choose Us
            </h2>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className="text-center p-4 sm:p-6 rounded-2xl bg-background border border-border hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                </div>
                <h3 className="font-display text-base sm:text-lg font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Join Our Fashion Family
            </h2>
            <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base px-2">
              Experience the beauty of authentic Jaipuri kurtis. Shop our latest 
              collection and become part of our growing family of satisfied customers.
            </p>
            <a
              href="/shop"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors text-sm sm:text-base"
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
