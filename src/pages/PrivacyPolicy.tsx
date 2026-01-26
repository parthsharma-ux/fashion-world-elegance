import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const PrivacyPolicy: React.FC = () => {
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
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: January 2026
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section className="bg-card border rounded-xl p-6">
              <h2 className="font-display text-xl font-bold mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                When you place an order or interact with Fashion World, we collect the following information:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                <li>Name and contact information (phone number, email address)</li>
                <li>Shipping address</li>
                <li>Order details and preferences</li>
                <li>Communication history with our team</li>
              </ul>
            </section>

            <section className="bg-card border rounded-xl p-6">
              <h2 className="font-display text-xl font-bold mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use the collected information to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your orders and deliveries</li>
                <li>Provide customer support</li>
                <li>Send order updates via WhatsApp or SMS</li>
                <li>Improve our products and services</li>
              </ul>
            </section>

            <section className="bg-card border rounded-xl p-6">
              <h2 className="font-display text-xl font-bold mb-4">3. Information Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only with:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                <li>Delivery partners for order fulfillment</li>
                <li>Payment processors for secure transactions</li>
                <li>Service providers who assist our operations</li>
              </ul>
            </section>

            <section className="bg-card border rounded-xl p-6">
              <h2 className="font-display text-xl font-bold mb-4">4. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="bg-card border rounded-xl p-6">
              <h2 className="font-display text-xl font-bold mb-4">5. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, though this may affect some functionality.
              </p>
            </section>

            <section className="bg-card border rounded-xl p-6">
              <h2 className="font-display text-xl font-bold mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section className="bg-card border rounded-xl p-6">
              <h2 className="font-display text-xl font-bold mb-4">7. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-foreground font-medium mt-3">
                Email: neetaspirant2k19@gmail.com<br />
                WhatsApp: +91 6376327343
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

export default PrivacyPolicy;
