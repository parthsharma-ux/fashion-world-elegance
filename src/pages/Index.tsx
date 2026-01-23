import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import HeroSection from '@/components/sections/HeroSection';
import FeaturedCollections from '@/components/sections/FeaturedCollections';
import TrendingProducts from '@/components/sections/TrendingProducts';
import WhyFashionWorld from '@/components/sections/WhyFashionWorld';
import CustomerReviews from '@/components/sections/CustomerReviews';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedCollections />
        <TrendingProducts />
        <WhyFashionWorld />
        <CustomerReviews />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
