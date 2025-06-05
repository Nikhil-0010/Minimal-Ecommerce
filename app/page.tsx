import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden bg-secondary/5">
        <div className="mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
              Minimalist Design,{' '}
              <span className="text-cyan-600">Maximum Quality</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Experience our signature product designed with simplicity and
              quality in mind. Crafted for those who appreciate the beauty in
              minimalism.
            </p>
            <Link href="/product/minimalist-ceramic-vase">
              <Button className="group px-6 py-6 text-base">
                Shop Now
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Product Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Featured Product</h2>
            <p className="mt-4 text-muted-foreground">
              Our most popular item, crafted with care
            </p>
          </div>
          <div className="flex justify-center">
            <ProductCard
              product={{
                id: '1',
                name: 'Minimalist Ceramic Vase',
                price: 89.99,
                description:
                  'A handcrafted ceramic vase with a minimalist design, perfect for modern home decor.',
                imageUrl: 'https://images.pexels.com/photos/6207762/pexels-photo-6207762.jpeg',
                slug: 'minimalist-ceramic-vase',
              }}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-primary/5 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">Our Philosophy</h2>
            <p className="mt-4 text-muted-foreground">
              We believe in the power of simplicity. Each product is
              thoughtfully designed to bring beauty and function to your
              everyday life. Less is more, and quality is everything.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}