import React from 'react';
import { motion } from 'framer-motion';
import { Ruler } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import sizeChartImage from '@/assets/size-chart.jpg';

interface SizeGuideProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SizeGuide: React.FC<SizeGuideProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl flex items-center gap-2">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.5 }}
            >
              <Ruler className="w-6 h-6 text-primary" />
            </motion.div>
            Size Guide
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Size Chart Image */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="relative rounded-xl overflow-hidden border border-border shadow-lg"
          >
            <motion.img
              src={sizeChartImage}
              alt="Size Chart for Women's Ethnic Wear Kurtas"
              className="w-full h-auto"
              initial={{ filter: 'blur(10px)' }}
              animate={{ filter: 'blur(0px)' }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>

          {/* Tips */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="bg-primary/10 rounded-xl p-4 border border-primary/20"
          >
            <h3 className="font-semibold text-primary mb-2">💡 Tips for Perfect Fit</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• If you're between sizes, we recommend choosing the larger size</li>
              <li>• Free Size is designed to fit most body types comfortably</li>
              <li>• For a looser fit, go one size up from your regular size</li>
              <li>• Contact us on WhatsApp for personalized sizing assistance</li>
            </ul>
          </motion.div>

          {/* Conversion Note */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xs text-muted-foreground text-center"
          >
            All measurements are in inches. For cm, multiply by 2.54
          </motion.p>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default SizeGuide;
