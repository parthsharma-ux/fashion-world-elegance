-- Add SELECT policy to restrict order viewing to admins only
CREATE POLICY "Only admins can view orders"
  ON public.orders
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE admin_users.email = auth.jwt() ->> 'email'
    )
  );