'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/lib/auth-context';
import { motion } from 'framer-motion';

export default function OrderSuccessPage() {
  const router = useRouter();
  const { user } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [router, user]);

  if (!user) {
    return null; // Return null while redirecting
  }

  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-2xl flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <Card className="overflow-hidden border-0 shadow-lg">
          <CardHeader className="flex flex-col items-center justify-center bg-green-50 py-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                delay: 0.2,
              }}
            >
              <CheckCircle className="h-16 w-16 text-green-500" strokeWidth={1.5} />
            </motion.div>
            <h1 className="mt-4 text-3xl font-bold text-green-700">
              Order Confirmed!
            </h1>
            <p className="mt-2 text-center text-muted-foreground">
              Thank you for your purchase. Your order has been confirmed.
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6 text-center">
              <p className="font-medium">Order number</p>
              <p className="mt-1 text-xl font-bold">{orderNumber}</p>
            </div>

            <Separator className="mb-6" />

            <div className="space-y-4">
              <div>
                <p className="font-medium">Order details</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  We&apos;ve sent an order confirmation to your email.
                </p>
              </div>

              <div>
                <p className="font-medium">Shipping information</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your order will be processed and shipped within 1-2 business
                  days.
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-center space-x-4">
              {/* This would link to an order tracking page in a real app */}
              <Button
                variant="outline"
                className="flex items-center"
                onClick={() => router.push('/')}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}