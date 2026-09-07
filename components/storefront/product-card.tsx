"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { CatalogProduct } from "@/lib/catalog";
import { useCart } from "@/components/cart-provider";

export function ProductCard({ product }: { product: CatalogProduct }) {
  const { addItem } = useCart();

  const discountPercent =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null;

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-black/5 dark:border-white/10 p-3 sm:p-4 hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300">
      <div>
        {/* Image Container with Badges */}
        <Link href={`/product/${product.slug}`} className="block relative aspect-square w-full rounded-xl sm:rounded-2xl overflow-hidden bg-white dark:bg-zinc-800 border border-black/5 dark:border-white/5 p-3">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          />
          {discountPercent && (
            <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md text-[10px] sm:text-xs font-bold bg-rose-500 text-white shadow-xs">
              -{discountPercent}%
            </span>
          )}
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-zinc-100/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-300 border border-black/5 dark:border-white/5">
            {product.brand}
          </span>
        </Link>

        {/* Product Details */}
        <div className="pt-2.5 sm:pt-3">
          <Link href={`/category/${product.category.slug}`}>
            <span className="text-[10px] sm:text-[11px] font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider line-clamp-1">
              {product.category.name}
            </span>
          </Link>
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-xs sm:text-sm font-bold line-clamp-2 mt-1 text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 transition-colors">
              {product.title}
            </h3>
          </Link>
        </div>
      </div>

      {/* Pricing & Cart Action */}
      <div className="pt-3 mt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between gap-1.5">
        <div>
          <div className="text-sm sm:text-base font-extrabold text-zinc-900 dark:text-white">
            Rs. {product.price.toLocaleString()}
          </div>
          {product.compareAtPrice && (
            <div className="text-[10px] sm:text-xs text-zinc-400 line-through">
              Rs. {product.compareAtPrice.toLocaleString()}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          {/* Quick Add To Bag Button (Min 44x44px touch target) */}
          <button
            onClick={() => addItem(product, 1)}
            className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center bg-emerald-600 text-white hover:bg-emerald-700 active:scale-90 transition-all shadow-xs"
            aria-label={`Add ${product.title} to bag`}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
