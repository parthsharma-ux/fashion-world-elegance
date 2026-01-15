import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

const WhatsAppButton: React.FC = () => {
  const { settings } = useStore();
  
  const handleClick = () => {
    const message = encodeURIComponent('Hi! I am interested in your products.');
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center hover:bg-[#128C7E] transition-colors"
      style={{
        boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
      }}
    >
      <MessageCircle className="w-7 h-7 text-white" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
    </motion.button>
  );
};

export default WhatsAppButton;
