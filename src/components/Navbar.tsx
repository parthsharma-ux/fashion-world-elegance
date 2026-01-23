import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getCartCount, wishlist } = useStore();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/categories', label: 'Categories' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/faq', label: 'FAQ' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-background/95 backdrop-blur-xl shadow-lg py-2'
            : 'bg-transparent py-4'
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center"
              >
                <span className={cn(
                  'font-display text-2xl md:text-3xl font-bold tracking-tight',
                  isScrolled ? 'text-foreground' : 'text-white'
                )}>
                  Fashion<span className="text-primary">World</span>
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'relative font-medium text-sm uppercase tracking-wider transition-colors',
                    isScrolled ? 'text-foreground' : 'text-white',
                    location.pathname === link.href && 'text-primary'
                  )}
                >
                  <motion.span
                    whileHover={{ y: -2 }}
                    className="relative"
                  >
                    {link.label}
                    {location.pathname === link.href && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      />
                    )}
                  </motion.span>
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(true)}
                className={cn(
                  'p-2 rounded-full transition-colors',
                  isScrolled ? 'hover:bg-muted' : 'hover:bg-white/10'
                )}
              >
                <Search className={cn('w-5 h-5', isScrolled ? 'text-foreground' : 'text-white')} />
              </motion.button>

              <Link to="/wishlist">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    'p-2 rounded-full transition-colors relative',
                    isScrolled ? 'hover:bg-muted' : 'hover:bg-white/10'
                  )}
                >
                  <Heart className={cn('w-5 h-5', isScrolled ? 'text-foreground' : 'text-white')} />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </motion.div>
              </Link>

              <Link to="/cart">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    'p-2 rounded-full transition-colors relative',
                    isScrolled ? 'hover:bg-muted' : 'hover:bg-white/10'
                  )}
                >
                  <ShoppingBag className={cn('w-5 h-5', isScrolled ? 'text-foreground' : 'text-white')} />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </motion.div>
              </Link>

{/* Admin link removed - admin panel is hidden from public access */}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={cn(
                  'lg:hidden p-2 rounded-full transition-colors',
                  isScrolled ? 'hover:bg-muted' : 'hover:bg-white/10'
                )}
              >
                <Menu className={cn('w-6 h-6', isScrolled ? 'text-foreground' : 'text-white')} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-[20rem] bg-background z-50 lg:hidden shadow-2xl"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <span className="font-display text-2xl font-bold">
                    Fashion<span className="text-primary">World</span>
                  </span>
                  <button onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'block py-3 text-lg font-medium border-b border-border transition-colors hover:text-primary',
                        location.pathname === link.href && 'text-primary'
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-50 flex items-start justify-center pt-32"
          >
            <div className="w-full max-w-2xl px-4">
              <div className="flex justify-end mb-8">
                <button onClick={() => setIsSearchOpen(false)}>
                  <X className="w-8 h-8" />
                </button>
              </div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <input
                  type="text"
                  placeholder="Search for kurtis, fabrics, styles..."
                  className="w-full text-2xl md:text-4xl font-display bg-transparent border-b-2 border-primary pb-4 outline-none placeholder:text-muted-foreground/50"
                  autoFocus
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
