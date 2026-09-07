"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal, shippingFee, total } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border-l border-black/10 dark:border-white/10 shadow-2xl flex flex-col transition-all duration-300 animate-in slide-in-from-right">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-base sm:text-lg font-bold">Your Bag</h2>
              <span className="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 px-2 py-0.5 rounded-full font-semibold">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 transition-all text-zinc-500"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold">Your bag is empty</h3>
                  <p className="text-sm text-zinc-500">Add products to place a Cash on Delivery order.</p>
                </div>
                <Button onClick={closeCart} className="mt-2 min-h-[44px] rounded-xl font-semibold">
                  Start Shopping
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3.5 p-3 rounded-2xl bg-zinc-50/80 dark:bg-zinc-900/60 border border-black/5 dark:border-white/5"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white dark:bg-zinc-800 shrink-0 border border-black/5 dark:border-white/5">
                    <Image
                      src={item.product.image}
                      alt={item.product.title}
                      fill
                      sizes="80px"
                      className="object-contain p-1.5"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold truncate leading-snug">
                        {item.product.title}
                      </h4>
                      <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                        Rs. {item.product.price.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper: Min 44x44px touch targets */}
                      <div className="flex items-center border border-black/10 dark:border-white/10 rounded-lg bg-white dark:bg-zinc-800">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5 active:scale-90"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5 active:scale-90"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 active:scale-90 transition-all"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-black/5 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-3 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
              <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-foreground">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Fee (Nationwide)</span>
                  <span className="font-semibold text-foreground">
                    {shippingFee === 0 ? "FREE" : `Rs. ${shippingFee}`}
                  </span>
                </div>
                {shippingFee > 0 && (
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400">
                    Add Rs. {(3000 - subtotal).toLocaleString()} more for FREE Delivery!
                  </p>
                )}
                <div className="flex justify-between text-sm font-bold text-foreground pt-1 border-t border-black/5 dark:border-white/5">
                  <span>Total (Pay on Delivery)</span>
                  <span className="text-emerald-600 dark:text-emerald-400">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Cash on Delivery only — pay when you inspect package</span>
              </div>

              <Link href="/checkout" onClick={closeCart} className="block w-full">
                <Button size="lg" className="w-full min-h-[48px] rounded-2xl gap-2 font-bold text-base shadow-lg shadow-emerald-600/20">
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
