import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Search, Loader2, Image as ImageIcon, Upload } from 'lucide-react';
import DraggableImageGrid from '@/components/admin/DraggableImageGrid';
import { supabase } from '@/integrations/supabase/client';
import { useStore } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  original_price: number;
  discount: number;
  images: string[];
  category: string;
  fabric: string;
  sizes: string[];
  description: string;
  care_instructions: string;
  in_stock: boolean;
  featured: boolean;
  trending: boolean;
  color?: string;
  video?: string;
}

interface Category {
  id: string;
  name: string;
}

const emptyProduct = {
  name: '',
  price: 0,
  original_price: 0,
  discount: 0,
  images: [] as string[],
  category: '',
  fabric: '',
  sizes: [] as string[],
  description: '',
  care_instructions: '',
  in_stock: true,
  featured: false,
  trending: false,
  color: '',
  video: '',
};

const AdminProducts: React.FC = () => {
  const { toast } = useToast();
  const { refreshProducts } = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState(emptyProduct);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fabrics = ['Cotton', 'Rayon', 'Silk', 'Muslin', 'Chinnon', 'Georgette', 'Velvet', 'Chanderi', 'Fancy', 'Linen', 'Pure Cotton', 'Pure Silk'];
  const sizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'Free Size'];
  const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Orange', 'Purple', 'Black', 'White', 'Maroon', 'Navy', 'Beige', 'Brown', 'Gold', 'Silver', 'Multi-Color'];

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast({ title: 'Error loading products', description: error.message, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from('categories').select('id, name');
      if (error) throw error;
      setCategories(data || []);
    } catch (error: any) {
      console.error('Error fetching categories:', error);
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddDialog = () => {
    setEditingProduct(null);
    setFormData(emptyProduct);
    setIsDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      original_price: product.original_price || 0,
      discount: product.discount || 0,
      images: product.images?.length ? product.images : [],
      category: product.category,
      fabric: product.fabric,
      sizes: product.sizes || [],
      description: product.description || '',
      care_instructions: product.care_instructions || '',
      in_stock: product.in_stock,
      featured: product.featured,
      trending: product.trending,
      color: product.color || '',
      video: product.video || '',
    });
    setIsDialogOpen(true);
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    const uploadedUrls: string[] = [];
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          toast({ title: 'Invalid file type', description: `${file.name} is not an image`, variant: 'destructive' });
          continue;
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast({ title: 'File too large', description: `${file.name} exceeds 5MB limit`, variant: 'destructive' });
          continue;
        }
        
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `products/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, file);
        
        if (uploadError) {
          console.error('Upload error:', uploadError);
          toast({ title: 'Upload failed', description: uploadError.message, variant: 'destructive' });
          continue;
        }
        
        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);
        
        uploadedUrls.push(publicUrl);
      }
      
      if (uploadedUrls.length > 0) {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...uploadedUrls],
        }));
        toast({ title: `${uploadedUrls.length} image(s) uploaded successfully!` });
      }
    } catch (error: any) {
      toast({ title: 'Upload error', description: error.message, variant: 'destructive' });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const reorderImages = (newImages: string[]) => {
    setFormData(prev => ({
      ...prev,
      images: newImages,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const productData = {
      name: formData.name,
      price: formData.price,
      original_price: formData.original_price,
      discount: formData.discount,
      images: formData.images.length > 0 ? formData.images : ['https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600'],
      category: formData.category,
      fabric: formData.fabric,
      sizes: formData.sizes,
      description: formData.description,
      care_instructions: formData.care_instructions,
      in_stock: formData.in_stock,
      featured: formData.featured,
      trending: formData.trending,
      color: formData.color || null,
      video: formData.video || null,
    };

    try {
      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);
        
        if (error) throw error;
        toast({ title: 'Product updated successfully!' });
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);
        
        if (error) throw error;
        toast({ title: 'Product added successfully!' });
      }
      
      setIsDialogOpen(false);
      setFormData(emptyProduct);
      fetchProducts();
      // Also refresh the store context so frontend updates
      refreshProducts();
    } catch (error: any) {
      toast({ title: 'Error saving product', description: error.message, variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);
      
      if (error) throw error;
      toast({ title: 'Product deleted successfully!' });
      setDeleteConfirm(null);
      fetchProducts();
      refreshProducts();
    } catch (error: any) {
      toast({ title: 'Error deleting product', description: error.message, variant: 'destructive' });
    }
  };

  const toggleSize = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const calculateDiscount = (price: number, originalPrice: number) => {
    if (originalPrice > price) {
      return Math.round(((originalPrice - price) / originalPrice) * 100);
    }
    return 0;
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">{products.length} products in catalog</p>
        </div>
        <Button onClick={openAddDialog} className="btn-luxury">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="bg-card rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium">Product</th>
                <th className="text-left p-4 font-medium">Category</th>
                <th className="text-left p-4 font-medium">Price</th>
                <th className="text-left p-4 font-medium">Images</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-right p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-t hover:bg-muted/30 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images?.[0] || 'https://via.placeholder.com/100'}
                        alt={product.name}
                        className="w-12 h-14 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.fabric}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{product.category}</td>
                  <td className="p-4">
                    <p className="font-semibold">₹{product.price?.toLocaleString()}</p>
                    {product.discount > 0 && (
                      <p className="text-xs text-green-600">-{product.discount}%</p>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <ImageIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{product.images?.length || 0}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        product.in_stock 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {product.in_stock ? 'In Stock' : 'Out'}
                      </span>
                      {product.featured && (
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">Featured</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(product)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteConfirm(product.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label>Product Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Royal Blue Chanderi Kurti"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Fabric *</Label>
                <Select
                  value={formData.fabric}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, fabric: value }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select fabric" />
                  </SelectTrigger>
                  <SelectContent>
                    {fabrics.map(fabric => (
                      <SelectItem key={fabric} value={fabric}>{fabric}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Color</Label>
                <Select
                  value={formData.color}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, color: value }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colors.map(color => (
                      <SelectItem key={color} value={color}>{color}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Selling Price (₹) *</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => {
                    const price = Number(e.target.value);
                    setFormData(prev => ({
                      ...prev,
                      price,
                      discount: calculateDiscount(price, prev.original_price),
                    }));
                  }}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Original Price (₹)</Label>
                <Input
                  type="number"
                  value={formData.original_price}
                  onChange={(e) => {
                    const original_price = Number(e.target.value);
                    setFormData(prev => ({
                      ...prev,
                      original_price,
                      discount: calculateDiscount(prev.price, original_price),
                    }));
                  }}
                  className="mt-1"
                />
              </div>

              {/* Multiple Image Upload Section */}
              <div className="md:col-span-2">
                <Label>Product Images *</Label>
                <div className="mt-2 space-y-4">
                  {/* Upload Area */}
                  <div 
                    className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="hidden"
                    />
                    {isUploading ? (
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        <p className="text-sm text-muted-foreground">Uploading images...</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="w-8 h-8 text-muted-foreground" />
                        <p className="text-sm font-medium">Click to upload images</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, WEBP up to 5MB each</p>
                      </div>
                    )}
                  </div>

                  {/* Draggable Image Previews Grid */}
                  {formData.images.length > 0 && (
                    <>
                      <p className="text-xs text-muted-foreground">
                        Drag images to reorder. First image will be the main product image.
                      </p>
                      <DraggableImageGrid
                        images={formData.images}
                        onReorder={reorderImages}
                        onRemove={removeImage}
                      />
                    </>
                  )}

                  {formData.images.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center">
                      No images uploaded yet. Upload at least one image for your product.
                    </p>
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <Label>Available Sizes *</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`w-12 h-10 rounded-lg border-2 font-medium transition-all ${
                        formData.sizes.includes(size)
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <Label>Description *</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the product..."
                  required
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <div className="md:col-span-2">
                <Label>Care Instructions</Label>
                <Input
                  value={formData.care_instructions}
                  onChange={(e) => setFormData(prev => ({ ...prev, care_instructions: e.target.value }))}
                  placeholder="Dry clean only. Store in a cool, dry place."
                  className="mt-1"
                />
              </div>

              <div className="md:col-span-2">
                <Label>Product Video URL (Optional)</Label>
                <Input
                  value={formData.video}
                  onChange={(e) => setFormData(prev => ({ ...prev, video: e.target.value }))}
                  placeholder="https://example.com/video.mp4"
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">Add a video URL to showcase your product</p>
              </div>

              <div className="md:col-span-2 flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.in_stock}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, in_stock: checked }))}
                  />
                  <Label>In Stock</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                  />
                  <Label>Featured</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.trending}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, trending: checked }))}
                  />
                  <Label>Trending</Label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="btn-luxury flex-1" disabled={isSaving || isUploading}>
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  editingProduct ? 'Update Product' : 'Add Product'
                )}
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Are you sure you want to delete this product? This action cannot be undone.
          </p>
          <div className="flex gap-3 mt-4">
            <Button
              variant="destructive"
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              className="flex-1"
            >
              Delete
            </Button>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
