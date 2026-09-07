"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, MessageCircle, Menu, X, Home, Grid, Heart } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { WHATSAPP_PHONE, getWhatsAppGeneralUrl } from "@/lib/constants";
import { useCart } from "@/components/cart-provider";

export function StorefrontNavbar() {
  const { openCart, itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-black/5 dark:border-white/5 bg-white/75 dark:bg-zinc-950/75 backdrop-blur-2xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Mobile Menu Button + Brand Logo */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-11 h-11 rounded-xl flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5 active:scale-95"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-xs group-hover:scale-105 transition-transform">
                <Image
                  src="/logo/1.png"
                  alt="Zenbu.Store"
                  fill
                  sizes="36px"
                  className="object-cover"
                  priority
                />
              </div>
              <span className="text-base sm:text-lg font-bold tracking-tight">
                Zenbu<span className="text-emerald-600 dark:text-emerald-400">.Store</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <Link href="/products" className="hover:text-foreground transition-colors">
              All Products
            </Link>
            <Link href="/category/baby-nutrition" className="hover:text-foreground transition-colors">
              Baby Nutrition
            </Link>
            <Link href="/category/baby-diapers" className="hover:text-foreground transition-colors">
              Diapers & Pants
            </Link>
            <Link href="/category/adult-care" className="hover:text-foreground transition-colors">
              Adult Care
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* WhatsApp Direct */}
            <a
              href={getWhatsAppGeneralUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex"
            >
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/30"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp Order
              </Button>
            </a>

            {/* Search */}
            <Link href="/search">
              <button
                className="w-11 h-11 rounded-xl flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5 active:scale-95"
                aria-label="Search store"
              >
                <Search className="w-4 h-4" />
              </button>
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Cart Drawer Trigger */}
            <button
              onClick={openCart}
              className="relative min-w-[44px] min-h-[44px] px-2.5 rounded-xl flex items-center justify-center bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 active:scale-95 transition-all"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {itemCount > 0 && (
                <span className="ml-1.5 text-xs font-bold bg-white text-emerald-700 dark:bg-zinc-900 dark:text-emerald-400 px-1.5 py-0.5 rounded-full text-[11px]">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-black/5 dark:border-white/5 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl p-4 space-y-3 animate-in slide-in-from-top-2">
            <nav className="flex flex-col space-y-1">
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5"
              >
                <Grid className="w-4 h-4 text-emerald-500" /> All 31 Products
              </Link>
              <Link
                href="/category/baby-nutrition"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5"
              >
                Baby & Child Nutrition
              </Link>
              <Link
                href="/category/baby-diapers"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5"
              >
                Baby Diapers & Pants
              </Link>
              <Link
                href="/category/adult-care"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5"
              >
                Adult Care & Incontinence
              </Link>
            </nav>

            <div className="pt-2 border-t border-black/5 dark:border-white/5">
              <a
                href={getWhatsAppGeneralUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 text-sm font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp ({WHATSAPP_PHONE})
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Sticky Bottom Nav Bar (Thumb-reachable 44px+) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-2xl border-t border-black/10 dark:border-white/10 pb-[env(safe-area-inset-bottom,0px)]">
        <div className="grid grid-cols-4 h-14 items-center text-[10px] font-medium text-zinc-500">
          <Link
            href="/"
            className="flex flex-col items-center justify-center h-full hover:text-emerald-600 active:scale-95"
          >
            <Home className="w-4 h-4 mb-0.5" />
            Home
          </Link>
          <Link
            href="/products"
            className="flex flex-col items-center justify-center h-full hover:text-emerald-600 active:scale-95"
          >
            <Grid className="w-4 h-4 mb-0.5" />
            Catalog
          </Link>
          <Link
            href="/search"
            className="flex flex-col items-center justify-center h-full hover:text-emerald-600 active:scale-95"
          >
            <Search className="w-4 h-4 mb-0.5" />
            Search
          </Link>
          <button
            onClick={openCart}
            className="flex flex-col items-center justify-center h-full hover:text-emerald-600 active:scale-95 relative"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 mb-0.5" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-emerald-600 text-white rounded-full text-[9px] w-3.5 h-3.5 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </div>
            Bag
          </button>
        </div>
      </nav>
    </>
  );
}
