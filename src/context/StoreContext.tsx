import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, Category, Review, Order, Banner, SiteSettings } from '@/types/store';
import { supabase } from '@/integrations/supabase/client';

interface StoreContextType {
  products: Product[];
  categories: Category[];
  reviews: Review[];
  orders: Order[];
  banners: Banner[];
  settings: SiteSettings;
  cart: CartItem[];
  wishlist: Product[];
  isAdmin: boolean;
  adminEmail: string;
  isLoading: boolean;
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateCartQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  getCartTotal: () => number;
  getCartCount: () => number;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateSettings: (settings: SiteSettings) => void;
  updateBanner: (banner: Banner) => void;
  refreshProducts: () => Promise<void>;
}

const defaultSettings: SiteSettings = {
  whatsappNumber: '916376327343',
  email: 'contact@fashionworld.in',
  phone: '+91 6376327343',
  address: 'Jaipur, Rajasthan, India',
  instagramUrl: 'https://instagram.com/fashionworld',
  facebookUrl: 'https://facebook.com/fashionworld',
};

const defaultCategories: Category[] = [];

const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'Royal Blue Chanderi Kurti',
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    images: ['https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600'],
    category: 'Festive Kurtis',
    fabric: 'Chanderi Silk',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Elegant royal blue chanderi kurti with intricate gold embroidery. Perfect for festive occasions and celebrations.',
    careInstructions: 'Dry clean only. Store in a cool, dry place.',
    inStock: true,
    featured: true,
    trending: true,
  },
  {
    id: '2',
    name: 'Blush Pink Cotton Kurti',
    price: 899,
    originalPrice: 1299,
    discount: 30,
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600'],
    category: 'Daily Wear Kurtis',
    fabric: 'Pure Cotton',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Comfortable blush pink cotton kurti for everyday wear. Soft fabric with beautiful prints.',
    careInstructions: 'Machine wash cold. Tumble dry low.',
    inStock: true,
    featured: true,
    trending: false,
  },
  {
    id: '3',
    name: 'Emerald Green Silk Kurti',
    price: 2299,
    originalPrice: 3499,
    discount: 35,
    images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600'],
    category: 'Designer Kurtis',
    fabric: 'Pure Silk',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Stunning emerald green pure silk kurti with hand-embroidered details. A statement piece for special occasions.',
    careInstructions: 'Dry clean only. Iron on low heat.',
    inStock: true,
    featured: true,
    trending: true,
  },
  {
    id: '4',
    name: 'Ivory White Rayon Kurti',
    price: 799,
    originalPrice: 1199,
    discount: 33,
    images: ['https://images.unsplash.com/photo-1583391733975-c7ed8ca3b0c8?w=600'],
    category: 'Office Wear Kurtis',
    fabric: 'Rayon',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Classic ivory white rayon kurti perfect for office wear. Elegant and comfortable.',
    careInstructions: 'Machine wash cold. Hang to dry.',
    inStock: true,
    featured: false,
    trending: true,
  },
  {
    id: '5',
    name: 'Maroon Velvet Kurti',
    price: 1899,
    originalPrice: 2999,
    discount: 37,
    images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600'],
    category: 'Festive Kurtis',
    fabric: 'Velvet',
    sizes: ['M', 'L', 'XL'],
    description: 'Rich maroon velvet kurti with golden zari work. Perfect for winter celebrations.',
    careInstructions: 'Dry clean only.',
    inStock: true,
    featured: true,
    trending: false,
  },
  {
    id: '6',
    name: 'Yellow Printed Cotton Kurti',
    price: 699,
    originalPrice: 999,
    discount: 30,
    images: ['https://images.unsplash.com/photo-1604502083953-462de452ee95?w=600'],
    category: 'Daily Wear Kurtis',
    fabric: 'Cotton',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Bright yellow cotton kurti with beautiful floral prints. Cheerful and comfortable.',
    careInstructions: 'Machine wash cold.',
    inStock: true,
    featured: false,
    trending: true,
  },
];

const defaultReviews: Review[] = [
  { id: '1', name: 'Priya Sharma', avatar: 'PS', rating: 5, comment: 'Absolutely beautiful kurti! The fabric quality is amazing and fits perfectly.', date: '2024-01-15' },
  { id: '2', name: 'Anita Gupta', avatar: 'AG', rating: 5, comment: 'Fast delivery and excellent customer service. Will definitely order again!', date: '2024-01-10' },
  { id: '3', name: 'Meera Patel', avatar: 'MP', rating: 4, comment: 'Love the designs! Very comfortable for daily wear.', date: '2024-01-08' },
  { id: '4', name: 'Kavita Singh', avatar: 'KS', rating: 5, comment: 'The festive collection is stunning. Got so many compliments!', date: '2024-01-05' },
];

// Helper function to map database product to frontend Product type
const mapDbProductToProduct = (dbProduct: any): Product => ({
  id: dbProduct.id,
  name: dbProduct.name,
  price: dbProduct.price,
  originalPrice: dbProduct.original_price || dbProduct.price,
  discount: dbProduct.discount || 0,
  images: dbProduct.images || [],
  category: dbProduct.category,
  fabric: dbProduct.fabric,
  sizes: dbProduct.sizes || [],
  description: dbProduct.description || '',
  careInstructions: dbProduct.care_instructions || '',
  inStock: dbProduct.in_stock ?? true,
  featured: dbProduct.featured ?? false,
  trending: dbProduct.trending ?? false,
  color: dbProduct.color || undefined,
  video: dbProduct.video || undefined,
});

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews] = useState<Review[]>(defaultReviews);
  
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('fashionworld_orders');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [banners, setBanners] = useState<Banner[]>(() => {
    const saved = localStorage.getItem('fashionworld_banners');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('fashionworld_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('fashionworld_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('fashionworld_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('fashionworld_admin') === 'true';
  });

  const adminEmail = 'radhuparthu@gmail.com';

  // Fetch products from Supabase
  const fetchProductsFromDb = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        return;
      }

      if (data && data.length > 0) {
        const mappedProducts = data.map(mapDbProductToProduct);
        setProducts(mappedProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProducts = async () => {
    await fetchProductsFromDb();
  };

  // Fetch categories from Supabase
  const fetchCategoriesFromDb = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching categories:', error);
        return;
      }

      if (data) {
        const mappedCategories: Category[] = data.map(cat => ({
          id: cat.id,
          name: cat.name,
          image: cat.image || '',
          description: cat.description || '',
        }));
        setCategories(mappedCategories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch products and categories on mount
  useEffect(() => {
    fetchProductsFromDb();
    fetchCategoriesFromDb();
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('fashionworld_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('fashionworld_banners', JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem('fashionworld_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('fashionworld_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('fashionworld_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: Product, size: string, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, size, quantity }];
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.size === size)));
  };

  const updateCartQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart(prev => prev.map(item =>
      item.product.id === productId && item.size === size
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => setCart([]);

  const addToWishlist = (product: Product) => {
    if (!wishlist.find(p => p.id === product.id)) {
      setWishlist(prev => [...prev, product]);
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(p => p.id !== productId));
  };

  const isInWishlist = (productId: string) => wishlist.some(p => p.id === productId);

  const getCartTotal = () => cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const getCartCount = () => cart.reduce((count, item) => count + item.quantity, 0);

  const login = (email: string, password: string) => {
    if (email === adminEmail && password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('fashionworld_admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('fashionworld_admin');
  };

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const addOrder = (order: Order) => {
    setOrders(prev => [...prev, order]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const updateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
  };

  const updateBanner = (banner: Banner) => {
    setBanners(prev => {
      const existing = prev.find(b => b.id === banner.id);
      if (existing) {
        return prev.map(b => b.id === banner.id ? banner : b);
      }
      return [...prev, banner];
    });
  };

  return (
    <StoreContext.Provider value={{
      products,
      categories,
      reviews,
      orders,
      banners,
      settings,
      cart,
      wishlist,
      isAdmin,
      adminEmail,
      isLoading,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      getCartTotal,
      getCartCount,
      login,
      logout,
      addProduct,
      updateProduct,
      deleteProduct,
      addOrder,
      updateOrderStatus,
      updateSettings,
      updateBanner,
      refreshProducts,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
