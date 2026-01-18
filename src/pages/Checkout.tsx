import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useStore } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Order } from '@/types/store';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart, addOrder, settings } = useStore();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  if (cart.length === 0 && !orderComplete) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const order: Order = {
      id: `ORD${Date.now()}`,
      items: [...cart],
      total: getCartTotal(),
      status: 'pending',
      customerName: formData.name,
      customerPhone: formData.phone,
      customerEmail: formData.email,
      address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
      createdAt: new Date().toISOString(),
    };

    addOrder(order);
    clearCart();
    setIsSubmitting(false);
    setOrderComplete(true);

    toast({
      title: 'Order Placed Successfully!',
      description: `Order ID: ${order.id}`,
    });
  };

  const handleWhatsAppOrder = () => {
    const itemsList = cart
      .map(item => {
        const imageUrl = item.product.images[0] || '';
        return `📦 *${item.product.name}*\n   Size: ${item.size} | Qty: ${item.quantity}\n   Price: ₹${item.product.price.toLocaleString()} × ${item.quantity} = ₹${(item.product.price * item.quantity).toLocaleString()}\n   Image: ${imageUrl}`;
      })
      .join('\n\n');
    
    const fullAddress = formData.address 
      ? `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`
      : 'Not provided';
    
    const message = encodeURIComponent(
      `🛍️ *New Order Request*\n\n` +
      `${itemsList}\n\n` +
      `━━━━━━━━━━━━━━\n` +
      `👤 *Customer Details*\n` +
      `Name: ${formData.name || 'Not provided'}\n` +
      `Phone: ${formData.phone || 'Not provided'}\n` +
      `Email: ${formData.email || 'Not provided'}\n` +
      `Address: ${fullAddress}\n\n` +
      `💰 *Total: ₹${getCartTotal().toLocaleString()}*`
    );
    window.open(`https://wa.me/${settings.whatsappNumber}?text=${message}`, '_blank');
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
              >
                <CheckCircle className="w-12 h-12 text-green-600" />
              </motion.div>
              <h1 className="font-display text-3xl font-bold mb-4">Order Confirmed!</h1>
              <p className="text-muted-foreground mb-8">
                Thank you for your order. We'll send you a confirmation message shortly.
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => navigate('/shop')}>
                  Continue Shopping
                </Button>
                <Button
                  variant="outline"
                  onClick={handleWhatsAppOrder}
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Track on WhatsApp
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <button
              onClick={() => navigate('/cart')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Cart
            </button>
            <h1 className="font-display text-4xl font-bold">Checkout</h1>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Checkout Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="font-display text-xl font-bold mb-6">Contact Information</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="font-display text-xl font-bold mb-6">Shipping Address</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="pincode">Pincode *</Label>
                        <Input
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Order */}
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h2 className="font-display text-xl font-bold mb-4">Complete Your Order</h2>
                  <p className="text-muted-foreground mb-6">
                    Fill in your details above and click the button below to place your order via WhatsApp.
                  </p>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleWhatsAppOrder}
                    className="btn-whatsapp w-full justify-center py-4"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Order via WhatsApp
                  </motion.button>
                </div>
              </form>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 bg-card rounded-2xl border border-border p-6">
                <h2 className="font-display text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-16 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Size: {item.size} × {item.quantity}
                        </p>
                        <p className="font-semibold mt-1">
                          ₹{(item.product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{getCartTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-xl text-primary">
                      ₹{getCartTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Checkout;
