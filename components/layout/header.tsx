'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/auth-context';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const pathname = usePathname();
  const { cart } = useCart();
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-200',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            Minimal<span className="text-cyan-600">Shop</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-8">
          <Link
            href="/"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              pathname === '/'
                ? 'text-primary'
                : 'text-muted-foreground'
            )}
          >
            Home
          </Link>
          <Link
            href="/product/minimalist-ceramic-vase"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              pathname === '/product/minimalist-ceramic-vase'
                ? 'text-primary'
                : 'text-muted-foreground'
            )}
          >
            Shop
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center space-x-4 md:flex">
          {user ? (
            <Link href="/account">
              <Button variant="ghost\" size="sm">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
          )}

          <Link href="/cart">
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cart.items.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-600 text-xs text-white">
                  {cart.items.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <Link href="/cart" className="mr-4">
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cart.items.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-600 text-xs text-white">
                  {cart.items.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
          >
            <div className="border-t border-border px-4 py-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    pathname === '/'
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                >
                  Home
                </Link>
                <Link
                  href="/product/minimalist-ceramic-vase"
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    pathname === '/product/minimalist-ceramic-vase'
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                >
                  Shop
                </Link>
                {user ? (
                  <Link
                    href="/account"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    My Account
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    Login
                  </Link>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}