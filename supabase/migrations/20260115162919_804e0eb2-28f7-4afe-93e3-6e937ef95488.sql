-- Fix function search path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add policy for admin_users table
CREATE POLICY "Admin users are viewable by admins only" 
ON public.admin_users FOR SELECT
USING (EXISTS (SELECT 1 FROM public.admin_users au WHERE au.email = auth.jwt() ->> 'email'));