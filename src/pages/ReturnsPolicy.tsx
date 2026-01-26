import React from 'react';
import { motion } from 'framer-motion';
import { Package, Video, Clock, AlertTriangle, CheckCircle, XCircle, MessageCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useStore } from '@/context/StoreContext';

const ReturnsPolicy: React.FC = () => {
  const { settings } = useStore();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-primary text-sm uppercase tracking-widest font-medium">
              Policy
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-4">
              Returns & Exchange Policy
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Please read our policy carefully before placing an order
            </p>
          </div>

          {/* Main Policy Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-destructive/10 border border-destructive/30 rounded-2xl p-8 mb-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                <XCircle className="w-7 h-7 text-destructive" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-destructive mb-3">
                  No Returns & Exchange
                </h2>
                <p className="text-foreground text-lg leading-relaxed">
                  We do <strong>not accept returns or exchanges</strong> as we are already providing the real pictures and all fabric details are mentioned in the product description. What you see is exactly what you get!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Exception Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-8 mb-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-7 h-7 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-amber-600 dark:text-amber-400 mb-3">
                  Exception: Wrong Parcel Received
                </h2>
                <p className="text-foreground text-lg leading-relaxed mb-4">
                  You can request for an exchange <strong>within 24 hours</strong> of delivery by submitting a <strong>360° unboxing video</strong> in case of any wrong parcel received.
                </p>
                <div className="bg-background/50 rounded-xl p-4 border">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Important:</strong> Without an unboxing video, we will not be able to process any claims or exchange requests.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Unboxing Video Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border rounded-2xl p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold">360° Unboxing Video Requirements</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">Video must be <strong className="text-foreground">continuous without any cuts or edits</strong></p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">Start recording <strong className="text-foreground">before opening the package</strong> - show sealed package first</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">Show the <strong className="text-foreground">shipping label with order details</strong> clearly</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">Record a <strong className="text-foreground">complete 360° view</strong> of the product received</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">Ensure <strong className="text-foreground">good lighting</strong> so all details are visible</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">Video should be <strong className="text-foreground">minimum 1-2 minutes</strong> long</p>
              </div>
            </div>
          </motion.div>

          {/* Exchange Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card border rounded-2xl p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold">Exchange Process</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Record Unboxing Video</h3>
                  <p className="text-muted-foreground">Record a complete 360° unboxing video as per the requirements mentioned above.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Contact Within 24 Hours</h3>
                  <p className="text-muted-foreground">Send the unboxing video to us via WhatsApp within 24 hours of receiving your package.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Verification</h3>
                  <p className="text-muted-foreground">Our team will verify the video and confirm if the wrong product was shipped.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Exchange Arranged</h3>
                  <p className="text-muted-foreground">Once verified, we will arrange for the exchange and send you the correct product.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card border rounded-2xl p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold">Important Timeline</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-muted/50 rounded-xl p-5">
                <p className="text-3xl font-bold text-primary mb-2">24 Hours</p>
                <p className="text-muted-foreground">Time limit to raise an exchange request after delivery</p>
              </div>
              <div className="bg-muted/50 rounded-xl p-5">
                <p className="text-3xl font-bold text-primary mb-2">5-7 Days</p>
                <p className="text-muted-foreground">Time for exchange product delivery after verification</p>
              </div>
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8"
          >
            <h2 className="font-display text-2xl font-bold mb-4">Need Help?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              If you have received a wrong parcel, contact us immediately via WhatsApp with your unboxing video.
            </p>
            <a
              href={`https://wa.me/${settings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex"
            >
              <MessageCircle className="w-5 h-5" />
              Contact via WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ReturnsPolicy;
