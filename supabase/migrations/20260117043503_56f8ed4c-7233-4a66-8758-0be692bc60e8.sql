-- Drop the restrictive policy
DROP POLICY IF EXISTS "Admin users are viewable by admins only" ON public.admin_users;

-- Create a policy that allows everyone to check if an email is an admin (for login verification)
CREATE POLICY "Anyone can check admin status"
ON public.admin_users
FOR SELECT
USING (true);