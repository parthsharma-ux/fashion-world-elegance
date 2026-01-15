import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Banner } from '@/types/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const emptyBanner: Omit<Banner, 'id'> = {
  image: '',
  title: '',
  subtitle: '',
  ctaText: '',
  ctaLink: '',
  active: true,
};

const AdminBanners: React.FC = () => {
  const { banners, updateBanner } = useStore();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [formData, setFormData] = useState<Omit<Banner, 'id'>>(emptyBanner);

  const openAddDialog = () => {
    setEditingBanner(null);
    setFormData(emptyBanner);
    setIsDialogOpen(true);
  };

  const openEditDialog = (banner: Banner) => {
    setEditingBanner(banner);
    setFormData({
      image: banner.image,
      title: banner.title,
      subtitle: banner.subtitle,
      ctaText: banner.ctaText,
      ctaLink: banner.ctaLink,
      active: banner.active,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const banner: Banner = {
      ...formData,
      id: editingBanner?.id || `banner_${Date.now()}`,
    };
    
    updateBanner(banner);
    toast({ title: editingBanner ? 'Banner updated!' : 'Banner added!' });
    setIsDialogOpen(false);
  };

  const toggleBannerStatus = (banner: Banner) => {
    updateBanner({ ...banner, active: !banner.active });
    toast({ title: `Banner ${banner.active ? 'disabled' : 'enabled'}` });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Banners</h1>
          <p className="text-muted-foreground">Manage homepage banners</p>
        </div>
        <Button onClick={openAddDialog} className="btn-luxury">
          <Plus className="w-4 h-4 mr-2" />
          Add Banner
        </Button>
      </div>

      {/* Banners Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {banners.length > 0 ? (
          banners.map((banner, index) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-card rounded-xl border overflow-hidden ${!banner.active && 'opacity-50'}`}
            >
              {banner.image && (
                <div className="h-48 bg-muted">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold">{banner.title || 'Untitled Banner'}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">{banner.subtitle}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={banner.active}
                      onCheckedChange={() => toggleBannerStatus(banner)}
                    />
                    <span className="text-sm">{banner.active ? 'Active' : 'Inactive'}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(banner)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-2 text-center py-12 bg-card rounded-xl border">
            <p className="text-muted-foreground">No banners yet. Add your first banner!</p>
          </div>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              {editingBanner ? 'Edit Banner' : 'Add New Banner'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Banner Image URL</Label>
              <Input
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                placeholder="https://example.com/banner.jpg"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="New Collection"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Subtitle</Label>
              <Input
                value={formData.subtitle}
                onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                placeholder="Discover the latest trends"
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>CTA Button Text</Label>
                <Input
                  value={formData.ctaText}
                  onChange={(e) => setFormData(prev => ({ ...prev, ctaText: e.target.value }))}
                  placeholder="Shop Now"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>CTA Link</Label>
                <Input
                  value={formData.ctaLink}
                  onChange={(e) => setFormData(prev => ({ ...prev, ctaLink: e.target.value }))}
                  placeholder="/shop"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={formData.active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
              />
              <Label>Active</Label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="btn-luxury flex-1">
                {editingBanner ? 'Update Banner' : 'Add Banner'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBanners;
