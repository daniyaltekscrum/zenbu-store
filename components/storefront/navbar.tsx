"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, MessageCircle } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { WHATSAPP_PHONE, getWhatsAppGeneralUrl } from "@/lib/constants";

export function StorefrontNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 dark:border-white/5 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-sm group-hover:scale-105 transition-transform">
            <Image
              src="/logo/1.png"
              alt="Zenbu.Store Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight font-sans">
              Zenbu<span className="text-emerald-600 dark:text-emerald-400">.Store</span>
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <Link
            href="/products"
            className="hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            All Products
          </Link>
          <Link
            href="/category/trending"
            className="hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            Trending
          </Link>
          <Link
            href="/about"
            className="hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* WhatsApp Quick Order & Inquiry */}
          <a
            href={getWhatsAppGeneralUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex"
            title={`Direct WhatsApp Support: ${WHATSAPP_PHONE}`}
          >
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/30 hover:bg-emerald-100/50"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp COD
            </Button>
          </a>

          {/* Search Trigger */}
          <Link href="/search">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="w-4 h-4" />
            </Button>
          </Link>

          {/* Cart Drawer Link */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
              <ShoppingBag className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                0
              </span>
            </Button>
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
