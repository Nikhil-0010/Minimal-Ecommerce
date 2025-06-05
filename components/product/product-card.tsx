'use client';

import { Product } from '@/types/product';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="w-full max-w-sm"
    >
      <Card className="overflow-hidden border-0 shadow-md transition-shadow hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            className="object-cover transition-transform hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-medium">{product.name}</h3>
          <p className="mt-2 text-lg font-bold text-cyan-600">
            ${product.price.toFixed(2)}
          </p>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button
            onClick={() => router.push(`/product/${product.slug}`)}
            className="w-full"
            variant="outline"
          >
            View Details
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}