'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/lib/cart-context';
import { motion } from 'framer-motion';

// This would normally come from a database
const product = {
  id: '1',
  name: 'Minimalist Ceramic Vase',
  price: 89.99,
  description:
    'A handcrafted ceramic vase with a minimalist design, perfect for modern home decor. Each piece is uniquely made by skilled artisans using traditional techniques combined with contemporary design principles.',
  longDescription: `
    <p>This elegant vase embodies the essence of minimalist design with its clean lines and subtle curves. Made from high-quality ceramic, it features a matte finish that adds a touch of sophistication to any space.</p>
    <p>The neutral color palette ensures it complements any interior style, from Scandinavian to Modern to Japanese-inspired spaces.</p>
    <p>Each vase is meticulously handcrafted by skilled artisans, making every piece unique with subtle variations that add character and charm.</p>
    <h3>Product Details:</h3>
    <ul>
      <li>Dimensions: 8.5" H x 4.5" W</li>
      <li>Material: High-fired ceramic</li>
      <li>Finish: Matte</li>
      <li>Care: Wipe clean with a damp cloth</li>
    </ul>
  `,
  imageUrl: 'https://images.pexels.com/photos/6207762/pexels-photo-6207762.jpeg',
  slug: 'minimalist-ceramic-vase',
};

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // In a real app, we'd fetch product by slug from API
  // const { data, isLoading, error } = useSWR(`/api/products/${params.slug}`, fetcher);

  if (params.slug !== product.slug) {
    // Handle product not found
    return (
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-2 text-muted-foreground">
          The product you are looking for does not exist.
        </p>
        <Button className="mt-4" onClick={() => router.push('/')}>
          Go back to home
        </Button>
      </div>
    );
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: 'Added to cart',
      description: `${quantity} x ${product.name} added to your cart`,
    });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/cart');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.imageUrl}
            alt={product.name}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-2 text-2xl font-bold text-cyan-600">
            ${product.price.toFixed(2)}
          </p>

          <div className="mt-6">
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <Separator className="my-6" />

          {/* Quantity Selector */}
          <div className="mt-6">
            <h3 className="text-sm font-medium">Quantity</h3>
            <div className="mt-2 flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="mx-4 w-8 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={increaseQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart and Buy Now buttons */}
          <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-1/2"
            >
              <Button
                className="w-full"
                variant="outline"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-1/2"
            >
              <Button className="w-full" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </motion.div>
          </div>

          {/* Product Details */}
          <div className="mt-8">
            <h2 className="text-lg font-medium">Product Details</h2>
            <div
              className="mt-4 prose text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: product.longDescription }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}