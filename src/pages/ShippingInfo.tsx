import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Clock, Package, Video, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const ShippingInfo: React.FC = () => {
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
          <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">
            Shipping Information
          </h1>
          <p className="text-muted-foreground text-center mb-12">
            Everything you need to know about our shipping process
          </p>

          <div className="space-y-8">
            {/* Dispatch Time */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex gap-4 p-6 rounded-xl bg-card border"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold mb-2">Dispatch Time</h3>
                <p className="text-muted-foreground">
                  All orders are dispatched within <strong>2-3 working days</strong> after order confirmation.
                </p>
              </div>
            </motion.div>

            {/* Delivery Time */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex gap-4 p-6 rounded-xl bg-card border"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold mb-2">Pan-India Delivery</h3>
                <p className="text-muted-foreground">
                  All over India delivery within <strong>5-7 working days</strong>.
                </p>
              </div>
            </motion.div>

            {/* No Returns Policy */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-4 p-6 rounded-xl bg-card border"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold mb-2">No Returns & Exchange</h3>
                <p className="text-muted-foreground">
                  We do not accept returns or exchanges as we are already providing the real pic and all fabric details are mentioned in description.
                </p>
                <p className="text-muted-foreground mt-2">
                  <strong>Note:</strong> You can request for exchange within 24 hours by submitting a 360° unboxing video in case of any wrong parcel received.
                </p>
              </div>
            </motion.div>

            {/* Unboxing Video Requirement */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 p-6 rounded-xl bg-amber-500/10 border border-amber-500/30"
            >
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Video className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold mb-2 text-amber-600 dark:text-amber-400">
                  Important: 360° Unboxing Video Required
                </h3>
                <p className="text-muted-foreground">
                  A <strong>360° unboxing video is compulsory</strong> for solving any issues related to your order. Please record the complete unboxing process to help us resolve any concerns quickly.
                </p>
              </div>
            </motion.div>

            {/* Quality Assurance */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4 p-6 rounded-xl bg-card border"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold mb-2">Quality Assurance</h3>
                <p className="text-muted-foreground">
                  Every product is carefully inspected and packaged before dispatch. We ensure that you receive exactly what you ordered in perfect condition.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ShippingInfo;
