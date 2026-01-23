-- Add color and video columns to products table
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS color text,
ADD COLUMN IF NOT EXISTS video text;

-- Insert new categories
INSERT INTO public.categories (name, description, image) VALUES
  ('Lehnga', 'Beautiful traditional lehengas for special occasions', 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800'),
  ('Gown', 'Elegant gowns for every celebration', 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800'),
  ('Festive Wear', 'Perfect attire for festivals and celebrations', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800'),
  ('Daily/Casual Wear', 'Comfortable everyday ethnic wear', 'https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=800'),
  ('Trendy', 'Latest fashion trends in ethnic wear', 'https://images.unsplash.com/photo-1583391733975-b593c2040485?w=800'),
  ('Cord Set', 'Stylish coordinated sets', 'https://images.unsplash.com/photo-1614093302611-8efc4de12964?w=800'),
  ('3 Piece', 'Complete three piece ethnic ensembles', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800')
ON CONFLICT (name) DO NOTHING;