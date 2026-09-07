"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Plus,
  Minus,
  Sparkles,
  Heart,
  Share2,
} from "lucide-react";
import { CatalogProduct } from "@/lib/catalog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/components/cart-provider";
import { getWhatsAppProductInquiryUrl, WHATSAPP_PHONE } from "@/lib/constants";
import { ProductCard } from "@/components/storefront/product-card";

interface ProductDetailViewProps {
  product: CatalogProduct;
  relatedProducts: CatalogProduct[];
}

export function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  const { addItem, openCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const discountPercent =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null;

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 md:pb-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-zinc-500">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-foreground">
          Catalog
        </Link>
        <span>/</span>
        <Link href={`/category/${product.category.slug}`} className="hover:text-foreground">
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="text-zinc-800 dark:text-zinc-200 font-medium truncate max-w-[150px] sm:max-w-[250px]">
          {product.title}
        </span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Gallery Section */}
        <div className="space-y-4">
          {/* Main Large Image Container */}
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 p-6 flex items-center justify-center shadow-lg shadow-black/5">
            <Image
              src={images[selectedImageIndex] || product.image}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-4"
            />
            {discountPercent && (
              <span className="absolute top-4 left-4 px-2.5 py-1 rounded-xl text-xs font-extrabold bg-rose-500 text-white shadow-md">
                SAVE {discountPercent}%
              </span>
            )}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md border border-black/5 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 text-zinc-600 dark:text-zinc-300 shadow-xs"
                title="Share product link"
                aria-label="Share product"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Thumbnail list if multiple images */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border shrink-0 transition-all ${
                    selectedImageIndex === idx
                      ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs"
                      : "border-black/10 dark:border-white/10 opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`${product.title} photo ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} - View ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information & Desktop Buy Controls */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="glass" className="text-xs text-emerald-700 dark:text-emerald-400 font-bold border-emerald-500/30">
                {product.brand}
              </Badge>
              <span className="text-xs text-zinc-500">• In Stock & Ready to Dispatch</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
              {product.title}
            </h1>

            {product.sku && (
              <p className="text-xs text-zinc-400 font-mono">
                SKU: {product.sku}
              </p>
            )}
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 flex items-baseline gap-3">
            <span className="text-3xl font-black text-zinc-900 dark:text-white">
              Rs. {product.price.toLocaleString()}
            </span>
            {product.compareAtPrice && (
              <span className="text-base text-zinc-400 line-through">
                Rs. {product.compareAtPrice.toLocaleString()}
              </span>
            )}
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 ml-auto">
              Cash on Delivery (COD)
            </span>
          </div>

          {/* Value Props & Assurances */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2 text-xs text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/60 dark:bg-zinc-900/60 border border-black/5 dark:border-white/5">
              <Truck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Nationwide Delivery in 24–48 Hours</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/60 dark:bg-zinc-900/60 border border-black/5 dark:border-white/5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>100% Sealed & Authentic Stock</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/60 dark:bg-zinc-900/60 border border-black/5 dark:border-white/5">
              <RotateCcw className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Easy Return if Damaged or Unsealed</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/60 dark:bg-zinc-900/60 border border-black/5 dark:border-white/5">
              <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>WhatsApp Live Support (+92 312 0813050)</span>
            </div>
          </div>

          {/* Desktop Quantity & Action Buttons */}
          <div className="hidden md:flex flex-col gap-3 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Quantity
              </span>
              <div className="flex items-center border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-zinc-900 shadow-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-black/5 active:scale-95"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-black/5 active:scale-95"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button
                size="lg"
                onClick={handleBuyNow}
                className="flex-1 min-h-[50px] rounded-2xl gap-2 font-bold text-base shadow-lg shadow-emerald-600/20"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Bag • Rs. {(product.price * quantity).toLocaleString()}
              </Button>

              <a
                href={getWhatsAppProductInquiryUrl(product.title, product.sourceUrl)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="min-h-[50px] rounded-2xl gap-2 font-bold border-emerald-500/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                >
                  <MessageCircle className="w-5 h-5" />
                  Order on WhatsApp
                </Button>
              </a>
            </div>
          </div>

          {/* Product Description */}
          <div className="border-t border-black/5 dark:border-white/5 pt-6 space-y-3">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
              Product Information
            </h2>
            <div className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed space-y-3">
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Carousel / Grid */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-black/5 dark:border-white/5 pt-12 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                Frequently Bought Together
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500">
                Customers who viewed this item also purchased
              </p>
            </div>
            <Link
              href={`/category/${product.category.slug}`}
              className="text-xs sm:text-sm font-semibold text-emerald-600 hover:text-emerald-700"
            >
              View More
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {relatedProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Mobile Sticky Bottom Thumb Bar (Touch targets >= 44x44px) */}
      <div className="md:hidden fixed bottom-14 left-0 right-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border-t border-black/10 dark:border-white/10 p-3 flex items-center justify-between gap-2 shadow-2xl">
        <div className="flex flex-col justify-center min-w-0 pr-2">
          <div className="text-xs text-zinc-400">Total Price</div>
          <div className="text-base font-black text-zinc-900 dark:text-white truncate">
            Rs. {product.price.toLocaleString()}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={getWhatsAppProductInquiryUrl(product.title, product.sourceUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 active:scale-95"
            aria-label="Order on WhatsApp"
          >
            <MessageCircle className="w-5 h-5" />
          </a>

          <button
            onClick={handleBuyNow}
            className="min-h-[44px] px-4 rounded-xl bg-emerald-600 text-white font-bold text-sm flex items-center gap-2 active:scale-95 shadow-md shadow-emerald-600/30"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
}
