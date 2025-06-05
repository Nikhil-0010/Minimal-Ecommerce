import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-medium">MinimalShop</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Beautifully designed products for your minimal lifestyle.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/product/minimalist-ceramic-vase"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Shop
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium">Legal</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} MinimalShop. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Instagram
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Twitter
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Pinterest
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}