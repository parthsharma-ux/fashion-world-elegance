export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: string[];
  category: string;
  fabric: string;
  sizes: string[];
  description: string;
  careInstructions: string;
  inStock: boolean;
  featured: boolean;
  trending: boolean;
  color?: string;
  video?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: string;
  createdAt: string;
}

export interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  active: boolean;
}

export interface SiteSettings {
  whatsappNumber: string;
  email: string;
  phone: string;
  address: string;
  instagramUrl: string;
  facebookUrl: string;
}
