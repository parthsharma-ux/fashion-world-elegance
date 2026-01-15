import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Phone, Mail, MapPin, Instagram, Facebook, MessageCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface SiteSettings {
  id: string;
  whatsapp_number: string;
  email: string;
  phone: string;
  address: string;
  instagram_url: string;
  facebook_url: string;
}

const AdminSettings: React.FC = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    whatsapp_number: '',
    email: '',
    phone: '',
    address: '',
    instagram_url: '',
    facebook_url: '',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setSettings(data);
        setFormData({
          whatsapp_number: data.whatsapp_number || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          instagram_url: data.instagram_url || '',
          facebook_url: data.facebook_url || '',
        });
      }
    } catch (error: any) {
      toast({ title: 'Error loading settings', description: error.message, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (settings?.id) {
        const { error } = await supabase
          .from('site_settings')
          .update(formData)
          .eq('id', settings.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('site_settings')
          .insert([formData]);
        
        if (error) throw error;
      }
      
      toast({ title: 'Settings saved successfully!' });
      fetchSettings();
    } catch (error: any) {
      toast({ title: 'Error saving settings', description: error.message, variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your store settings</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
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
              <Label htmlFor="whatsapp_number" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-green-500" />
                WhatsApp Number
              </Label>
              <Input
                id="whatsapp_number"
                name="whatsapp_number"
                value={formData.whatsapp_number}
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl border p-6"
        >
          <h2 className="font-semibold text-lg mb-6">Social Media Links</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="instagram_url" className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-500" />
                Instagram URL
              </Label>
              <Input
                id="instagram_url"
                name="instagram_url"
                value={formData.instagram_url}
                onChange={handleChange}
                placeholder="https://instagram.com/fashionworld"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="facebook_url" className="flex items-center gap-2">
                <Facebook className="w-4 h-4 text-blue-500" />
                Facebook URL
              </Label>
              <Input
                id="facebook_url"
                name="facebook_url"
                value={formData.facebook_url}
                onChange={handleChange}
                placeholder="https://facebook.com/fashionworld"
                className="mt-1"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button type="submit" className="btn-luxury w-full sm:w-auto" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </div>
  );
};

export default AdminSettings;
