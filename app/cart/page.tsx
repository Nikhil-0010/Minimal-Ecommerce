'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';

export default function CartPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      toast({
        title: 'Please log in',
        description: 'You need to be logged in to checkout',
        variant: 'destructive',
      });
      router.push('/login');
      return;
    }

    setIsCheckingOut(true);
    try {
      // In a real app, we would make an API call to create an order
      // const response = await fetch('/api/checkout', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     items: cart.items,
      //     total: cart.total,
      //   }),
      // });

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Clear the cart and redirect to success page
      clearCart();
      router.push('/order-success');
    } catch (error) {
      toast({
        title: 'Checkout failed',
        description: 'Something went wrong while processing your order',
        variant: 'destructive',
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">
            Looks like you haven&apos;t added any products to your cart yet.
          </p>
          <Button className="mt-8" onClick={() => router.push('/')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Cart Items */}
        <div className="lg:col-span-8">
          <Card>
            <CardContent className="p-6">
              {cart.items.map((item, index) => (
                <div key={item.product.id}>
                  <div className="flex flex-col items-start sm:flex-row">
                    {/* Product Image */}
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="object-cover"
                        fill
                        sizes="100px"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="mt-4 flex-1 sm:ml-6 sm:mt-0">
                      <div className="flex justify-between">
                        <h3 className="text-base font-medium">
                          {item.product.name}
                        </h3>
                        <p className="text-base font-medium">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        ${item.product.price.toFixed(2)} each
                      </p>

                      {/* Quantity Controls */}
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="mx-2 w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1
                              )
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {index < cart.items.length - 1 && (
                    <Separator className="my-6" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium">Order Summary</h2>
              <div className="mt-4 space-y-4">
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p className="font-medium">${cart.total.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Shipping</p>
                  <p className="font-medium">Free</p>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <p className="font-medium">Total</p>
                  <p className="font-bold">${cart.total.toFixed(2)}</p>
                </div>
                <Button
                  className="mt-6 w-full"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? 'Processing...' : 'Checkout'}
                </Button>
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  {!user && (
                    <p>
                      <Link
                        href="/login"
                        className="font-medium text-cyan-600 hover:text-cyan-500"
                      >
                        Log in
                      </Link>{' '}
                      to checkout
                    </p>
                  )}
                  <p className="mt-2">
                    or{' '}
                    <Link
                      href="/"
                      className="font-medium text-cyan-600 hover:text-cyan-500"
                    >
                      Continue Shopping
                    </Link>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}