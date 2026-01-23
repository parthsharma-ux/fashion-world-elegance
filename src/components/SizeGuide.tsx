import React from 'react';
import { motion } from 'framer-motion';
import { X, Ruler } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface SizeGuideProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const sizeData = [
  { size: 'S', bust: '32-34', waist: '26-28', hip: '35-37', length: '42' },
  { size: 'M', bust: '34-36', waist: '28-30', hip: '37-39', length: '43' },
  { size: 'L', bust: '36-38', waist: '30-32', hip: '39-41', length: '44' },
  { size: 'XL', bust: '38-40', waist: '32-34', hip: '41-43', length: '45' },
  { size: 'XXL', bust: '40-42', waist: '34-36', hip: '43-45', length: '46' },
  { size: 'XXXL', bust: '42-44', waist: '36-38', hip: '45-47', length: '47' },
  { size: 'Free Size', bust: '32-40', waist: '26-34', hip: '35-43', length: '44' },
];

const SizeGuide: React.FC<SizeGuideProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl flex items-center gap-2">
            <Ruler className="w-6 h-6 text-primary" />
            Size Guide
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Measurement Instructions */}
          <div className="bg-muted/50 rounded-xl p-4">
            <h3 className="font-semibold mb-2">How to Measure</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• <strong>Bust:</strong> Measure around the fullest part of your bust</li>
              <li>• <strong>Waist:</strong> Measure around your natural waistline</li>
              <li>• <strong>Hip:</strong> Measure around the fullest part of your hips</li>
              <li>• <strong>Length:</strong> Measure from shoulder to hem</li>
            </ul>
          </div>

          {/* Size Chart Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="px-4 py-3 text-left font-semibold rounded-tl-lg">Size</th>
                  <th className="px-4 py-3 text-center font-semibold">Bust (inches)</th>
                  <th className="px-4 py-3 text-center font-semibold">Waist (inches)</th>
                  <th className="px-4 py-3 text-center font-semibold">Hip (inches)</th>
                  <th className="px-4 py-3 text-center font-semibold rounded-tr-lg">Length (inches)</th>
                </tr>
              </thead>
              <tbody>
                {sizeData.map((row, index) => (
                  <motion.tr
                    key={row.size}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`border-b border-border ${index % 2 === 0 ? 'bg-card' : 'bg-muted/30'}`}
                  >
                    <td className="px-4 py-3 font-semibold text-primary">{row.size}</td>
                    <td className="px-4 py-3 text-center">{row.bust}</td>
                    <td className="px-4 py-3 text-center">{row.waist}</td>
                    <td className="px-4 py-3 text-center">{row.hip}</td>
                    <td className="px-4 py-3 text-center">{row.length}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tips */}
          <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
            <h3 className="font-semibold text-primary mb-2">💡 Tips for Perfect Fit</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• If you're between sizes, we recommend choosing the larger size</li>
              <li>• Free Size is designed to fit most body types comfortably</li>
              <li>• For a looser fit, go one size up from your regular size</li>
              <li>• Contact us on WhatsApp for personalized sizing assistance</li>
            </ul>
          </div>

          {/* Conversion Note */}
          <p className="text-xs text-muted-foreground text-center">
            All measurements are in inches. For cm, multiply by 2.54
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SizeGuide;