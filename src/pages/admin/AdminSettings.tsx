import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Phone, Mail, MapPin, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useStore();
  const { toast } = useToast();
  const [formData, setFormData] = useState(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    toast({ title: 'Settings saved successfully!' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your store settings</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl border p-6"
        >
          <h2 className="font-semibold text-lg mb-6 flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            Contact Information
          </h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="whatsappNumber" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-green-500" />
                WhatsApp Number
              </Label>
              <Input
                id="whatsappNumber"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                placeholder="916376327343"
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Include country code without + (e.g., 916376327343)
              </p>
            </div>

            <div>
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 6376327343"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="contact@fashionworld.in"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Business Address
              </Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Jaipur, Rajasthan, India"
                className="mt-1"
              />
            </div>
          </div>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl border p-6"
        >
          <h2 className="font-semibold text-lg mb-6">Social Media Links</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="instagramUrl" className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-500" />
                Instagram URL
              </Label>
              <Input
                id="instagramUrl"
                name="instagramUrl"
                value={formData.instagramUrl}
                onChange={handleChange}
                placeholder="https://instagram.com/fashionworld"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="facebookUrl" className="flex items-center gap-2">
                <Facebook className="w-4 h-4 text-blue-500" />
                Facebook URL
              </Label>
              <Input
                id="facebookUrl"
                name="facebookUrl"
                value={formData.facebookUrl}
                onChange={handleChange}
                placeholder="https://facebook.com/fashionworld"
                className="mt-1"
              />
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button type="submit" className="btn-luxury w-full sm:w-auto">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </motion.div>
      </form>
    </div>
  );
};

export default AdminSettings;
