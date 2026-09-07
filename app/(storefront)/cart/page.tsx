"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, shippingFee, total } = useCart();

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Shopping Cart
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Review your order before proceeding to Cash on Delivery checkout.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16 bg-white/60 dark:bg-zinc-900/60 rounded-3xl border border-black/5 dark:border-white/5 p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold">Your shopping bag is empty</h2>
              <p className="text-sm text-zinc-500">
                Looks like you haven&apos;t added any products yet.
              </p>
            </div>
            <Link href="/products">
              <Button size="lg" className="rounded-2xl font-bold min-h-[44px]">
                Browse 30+ Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 rounded-3xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-black/5 dark:border-white/5"
                >
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-white dark:bg-zinc-800 border border-black/5 dark:border-white/5 shrink-0 flex items-center justify-center">
                    <Image
                      src={item.product.image}
                      alt={item.product.title}
                      fill
                      sizes="96px"
                      className="object-contain p-2"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase">
                        {item.product.brand}
                      </div>
                      <Link href={`/product/${item.product.slug}`}>
                        <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2 hover:text-emerald-600 transition-colors">
                          {item.product.title}
                        </h3>
                      </Link>
                      <div className="text-sm font-extrabold text-zinc-900 dark:text-white mt-1">
                        Rs. {item.product.price.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3">
                      {/* Quantity Stepper (min 44px) */}
                      <div className="flex items-center border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-zinc-800 shadow-xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-black/5 active:scale-90"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs sm:text-sm font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-black/5 active:scale-90"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 active:scale-90 transition-all"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Sticky Card */}
            <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-black/5 dark:border-white/5 space-y-6">
              <h2 className="text-lg font-bold">Order Summary</h2>

              <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-foreground">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="font-semibold text-foreground">
                    {shippingFee === 0 ? "FREE" : `Rs. ${shippingFee}`}
                  </span>
                </div>
                {shippingFee > 0 && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">
                    Free shipping unlocked on orders over Rs. 3,000!
                  </p>
                )}
                <div className="flex justify-between text-base font-extrabold text-foreground pt-3 border-t border-black/5 dark:border-white/5">
                  <span>Total (Cash on Delivery)</span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-zinc-500">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Delivery in 24–48 hours nationwide</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>No card needed — Pay cash when package arrives</span>
                </div>
              </div>

              <Link href="/checkout" className="block">
                <Button
                  size="lg"
                  className="w-full min-h-[50px] rounded-2xl gap-2 font-bold text-base shadow-lg shadow-emerald-600/20"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
