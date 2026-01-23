import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Mail, Phone, MapPin, Send } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer: React.FC = () => {
  const { settings } = useStore();

  const quickLinks = [
    { href: '/shop', label: 'Shop All' },
    { href: '/categories', label: 'Categories' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  const customerService = [
    { href: '/shipping', label: 'Shipping Info' },
    { href: '/faq', label: 'FAQ' },
    { href: '/size-guide', label: 'Size Guide' },
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold mb-2">
                Join the Fashion World Family
              </h3>
              <p className="text-background/70">
                Subscribe for exclusive offers and new arrivals
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50 w-full md:w-80"
              />
              <Button className="btn-luxury whitespace-nowrap">
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <span className="font-display text-3xl font-bold">
                Fashion<span className="text-primary">World</span>
              </span>
            </Link>
            <p className="text-background/70 mb-6 leading-relaxed">
              Where elegance meets tradition. Discover premium Indian ethnic wear crafted with love and passion.
            </p>
            <div className="flex gap-4">
              <motion.a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-display text-xl font-semibold mb-6">Customer Service</h4>
            <ul className="space-y-3">
              {customerService.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xl font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-background/70">{settings.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href={`tel:${settings.phone}`} className="text-background/70 hover:text-primary transition-colors">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href={`mailto:${settings.email}`} className="text-background/70 hover:text-primary transition-colors">
                  {settings.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/50 text-sm">
              © 2026 Fashion World. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-background/50 text-sm hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-background/50 text-sm hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
