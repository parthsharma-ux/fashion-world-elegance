import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Loader2, UserPlus, LogIn } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ADMIN_EMAIL = 'radhuparthu@gmail.com';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    // Check if already logged in as admin
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user?.email) {
          const { data: adminData } = await supabase
            .from('admin_users')
            .select('email')
            .eq('email', session.user.email)
            .single();

          if (adminData) {
            navigate('/admin');
            return;
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setIsCheckingSession(false);
      }
    };

    checkSession();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if email is authorized admin
    if (email !== ADMIN_EMAIL) {
      toast({
        title: 'Access Denied',
        description: 'You are not authorized to access the admin panel.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Verify admin status
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('email')
        .eq('email', email)
        .single();

      if (adminError || !adminData) {
        await supabase.auth.signOut();
        throw new Error('You are not authorized to access the admin panel');
      }

      toast({ title: 'Welcome back!' });
      navigate('/admin');
    } catch (error: any) {
      toast({
        title: 'Login failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Only allow signup for authorized admin email
    if (email !== ADMIN_EMAIL) {
      toast({
        title: 'Access Denied',
        description: 'Only authorized administrators can create accounts.',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Password too short',
        description: 'Password must be at least 6 characters.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
        },
      });

      if (error) throw error;

      toast({ 
        title: 'Account created successfully!',
        description: 'You can now log in with your credentials.',
      });
      
      // Auto-login after signup (auto-confirm is enabled)
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!loginError) {
        navigate('/admin');
      }
    } catch (error: any) {
      toast({
        title: 'Signup failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-accent/30 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-accent/30 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-card rounded-2xl border shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold mb-2">
              Fashion<span className="text-primary">World</span>
            </h1>
            <p className="text-muted-foreground">Admin Panel Access</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                First Time Setup
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Label htmlFor="login-email">Admin Email</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter admin email"
                      className="pl-10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="pl-10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <Button type="submit" className="btn-luxury w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Login to Dashboard'
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <div className="mb-4 p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  First time? Create your admin account here. Only the authorized admin email can register.
                </p>
              </div>
              
              <form onSubmit={handleSignup} className="space-y-6">
                <div>
                  <Label htmlFor="signup-email">Admin Email</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="radhuparthu@gmail.com"
                      className="pl-10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="signup-password">Create Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="pl-10"
                      required
                      minLength={6}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <Button type="submit" className="btn-luxury w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    'Create Admin Account'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
