import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <span className="text-primary text-sm uppercase tracking-widest font-medium">
              Legal
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">
              Last updated: January 2026
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section className="bg-card border rounded-xl p-6">
              <h2 className="font-display text-xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using Fashion World's website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="bg-card border rounded-xl p-6">
              <h2 className="font-display text-xl font-bold mb-4">2. Products and Orders</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>All product images are real photographs of actual items</li>
                <li>Fabric details and measurements are accurately described</li>
                <li>Colors may vary slightly due to screen settings</li>
                <li>Orders are confirmed only after successful payment or order confirmation via WhatsApp</li>
                <li>We reserve the right to cancel orders due to stock unavailability</li>
              </ul>
            </section>

            <section className="bg-card border rounded-xl p-6">
              <h2 className="font-display text-xl font-bold mb-4">3. Pricing and Payment</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>All prices are in Indian Rupees (INR)</li>
                <li>Prices are subject to change without prior notice</li>
                <li>We accept UPI, debit cards, credit cards, and net banking</li>
                <li>Payment must be completed before order processing</li>
              </ul>
            </section>

            <section className="bg-card border rounded-xl p-6">
              <h2 className="font-display text-xl font-bold mb-4">4. Shipping Policy</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Dispatch time: 2-3 working days after order confirmation</li>
                <li>All India delivery: 5-7 working days</li>
                <li>Shipping charges may apply based on location</li>
                <li>Tracking details will be shared via WhatsApp/SMS</li>
              </ul>
            </section>

            <section className="bg-card border rounded-xl p-6">
              <h2 className="font-display text-xl font-bold mb-4">5. Returns and Exchange Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                <strong className="text-foreground">No Returns & Exchange:</strong> We do not accept returns or exchanges as we provide real product pictures and all fabric details in descriptions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Exception:</strong> You can request an exchange within 24 hours by submitting a 360° unboxing video in case of wrong parcel received. Without an unboxing video, no claims will be processed.
              </p>
            </section>

            <section className="bg-card border rounded-xl p-6">
              <h2 className="font-display text-xl font-bold mb-4">6. Order Cancellation</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Orders can be cancelled within 24 hours of placing</li>
                <li>After 24 hours, cancellation may not be possible as order goes into processing</li>
                <li>Refunds for cancelled orders will be processed within 5-7 business days</li>
              </ul>
            </section>

            <section className="bg-card border rounded-xl p-6">
              <h2 className="font-display text-xl font-bold mb-4">7. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on this website including images, logos, designs, and text are the property of Fashion World and are protected by copyright laws. Unauthorized use is prohibited.
              </p>
            </section>

            <section className="bg-card border rounded-xl p-6">
              <h2 className="font-display text-xl font-bold mb-4">8. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                Fashion World shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services. Our liability is limited to the purchase price of the product.
              </p>
            </section>

            <section className="bg-card border rounded-xl p-6">
              <h2 className="font-display text-xl font-bold mb-4">9. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on the website. Continued use of our services constitutes acceptance of modified terms.
              </p>
            </section>

            <section className="bg-card border rounded-xl p-6">
              <h2 className="font-display text-xl font-bold mb-4">10. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For any questions regarding these Terms of Service, please contact us:
              </p>
              <p className="text-foreground font-medium mt-3">
                Email: neetaspirant2k19@gmail.com<br />
                WhatsApp: +91 6376327343<br />
                Address: Jaipur, Rajasthan, India
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default TermsOfService;
