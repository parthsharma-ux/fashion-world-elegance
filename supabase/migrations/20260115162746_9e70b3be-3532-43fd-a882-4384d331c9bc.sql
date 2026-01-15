-- Products Table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  original_price NUMERIC DEFAULT 0,
  discount INTEGER DEFAULT 0,
  images TEXT[] NOT NULL DEFAULT '{}',
  category TEXT NOT NULL,
  fabric TEXT NOT NULL,
  sizes TEXT[] NOT NULL DEFAULT '{}',
  description TEXT,
  care_instructions TEXT,
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  trending BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Categories Table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  image TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Orders Table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  items JSONB NOT NULL DEFAULT '[]',
  total NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Banners Table
CREATE TABLE public.banners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image TEXT,
  title TEXT,
  subtitle TEXT,
  cta_text TEXT,
  cta_link TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Site Settings Table
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  whatsapp_number TEXT DEFAULT '916376327343',
  email TEXT DEFAULT 'contact@fashionworld.in',
  phone TEXT DEFAULT '+91 6376327343',
  address TEXT DEFAULT 'Jaipur, Rajasthan, India',
  instagram_url TEXT,
  facebook_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Admin Users Table
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Public Read Policies for Products and Categories
CREATE POLICY "Products are viewable by everyone" 
ON public.products FOR SELECT USING (true);

CREATE POLICY "Categories are viewable by everyone" 
ON public.categories FOR SELECT USING (true);

CREATE POLICY "Banners are viewable by everyone" 
ON public.banners FOR SELECT USING (true);

CREATE POLICY "Site settings are viewable by everyone" 
ON public.site_settings FOR SELECT USING (true);

-- Admin Write Policies (using admin_users table)
CREATE POLICY "Admins can manage products" 
ON public.products FOR ALL 
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE email = auth.jwt() ->> 'email'));

CREATE POLICY "Admins can manage categories" 
ON public.categories FOR ALL 
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE email = auth.jwt() ->> 'email'));

CREATE POLICY "Admins can manage orders" 
ON public.orders FOR ALL 
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE email = auth.jwt() ->> 'email'));

CREATE POLICY "Admins can manage banners" 
ON public.banners FOR ALL 
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE email = auth.jwt() ->> 'email'));

CREATE POLICY "Admins can manage site settings" 
ON public.site_settings FOR ALL 
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE email = auth.jwt() ->> 'email'));

-- Anyone can insert orders (for customers placing orders)
CREATE POLICY "Anyone can create orders" 
ON public.orders FOR INSERT WITH CHECK (true);

-- Insert default admin user
INSERT INTO public.admin_users (email) VALUES ('radhuparthu@gmail.com');

-- Insert default categories
INSERT INTO public.categories (name, image, description) VALUES
  ('Daily Wear Kurtis', 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400', 'Comfortable everyday elegance'),
  ('Festive Kurtis', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400', 'Celebrate in style'),
  ('Office Wear Kurtis', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400', 'Professional & graceful'),
  ('Designer Kurtis', 'https://images.unsplash.com/photo-1583391733975-c7ed8ca3b0c8?w=400', 'Exclusive designs'),
  ('Cotton Collection', 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400', 'Pure comfort'),
  ('Silk Collection', 'https://images.unsplash.com/photo-1604502083953-462de452ee95?w=400', 'Luxurious feel');

-- Insert default site settings
INSERT INTO public.site_settings (whatsapp_number, email, phone, address, instagram_url, facebook_url) 
VALUES ('916376327343', 'contact@fashionworld.in', '+91 6376327343', 'Jaipur, Rajasthan, India', 'https://instagram.com/fashionworld', 'https://facebook.com/fashionworld');

-- Insert sample products
INSERT INTO public.products (name, price, original_price, discount, images, category, fabric, sizes, description, care_instructions, in_stock, featured, trending) VALUES
  ('Royal Blue Chanderi Kurti', 1499, 2499, 40, ARRAY['https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600'], 'Festive Kurtis', 'Chanderi Silk', ARRAY['S', 'M', 'L', 'XL', 'XXL'], 'Elegant royal blue chanderi kurti with intricate gold embroidery. Perfect for festive occasions and celebrations.', 'Dry clean only. Store in a cool, dry place.', true, true, true),
  ('Blush Pink Cotton Kurti', 899, 1299, 30, ARRAY['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600'], 'Daily Wear Kurtis', 'Pure Cotton', ARRAY['S', 'M', 'L', 'XL'], 'Comfortable blush pink cotton kurti for everyday wear. Soft fabric with beautiful prints.', 'Machine wash cold. Tumble dry low.', true, true, false),
  ('Emerald Green Silk Kurti', 2299, 3499, 35, ARRAY['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600'], 'Designer Kurtis', 'Pure Silk', ARRAY['S', 'M', 'L', 'XL', 'XXL'], 'Stunning emerald green pure silk kurti with hand-embroidered details. A statement piece for special occasions.', 'Dry clean only. Iron on low heat.', true, true, true),
  ('Ivory White Rayon Kurti', 799, 1199, 33, ARRAY['https://images.unsplash.com/photo-1583391733975-c7ed8ca3b0c8?w=600'], 'Office Wear Kurtis', 'Rayon', ARRAY['S', 'M', 'L', 'XL'], 'Classic ivory white rayon kurti perfect for office wear. Elegant and comfortable.', 'Machine wash cold. Hang to dry.', true, false, true),
  ('Maroon Velvet Kurti', 1899, 2999, 37, ARRAY['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600'], 'Festive Kurtis', 'Velvet', ARRAY['M', 'L', 'XL'], 'Rich maroon velvet kurti with golden zari work. Perfect for winter celebrations.', 'Dry clean only.', true, true, false),
  ('Yellow Printed Cotton Kurti', 699, 999, 30, ARRAY['https://images.unsplash.com/photo-1604502083953-462de452ee95?w=600'], 'Daily Wear Kurtis', 'Cotton', ARRAY['S', 'M', 'L', 'XL', 'XXL'], 'Bright yellow cotton kurti with beautiful floral prints. Cheerful and comfortable.', 'Machine wash cold.', true, false, true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();