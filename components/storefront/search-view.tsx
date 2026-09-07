"use client";

import React, { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { CatalogProduct } from "@/lib/catalog";
import { ProductCard } from "@/components/storefront/product-card";

export function SearchView({ allProducts }: { allProducts: CatalogProduct[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return allProducts;
    const q = query.toLowerCase().trim();
    return allProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.name.toLowerCase().includes(q)
    );
  }, [allProducts, query]);

  const quickSearches = ["Pediasure", "Meiji", "Enfagrow", "Canbebe", "Bona Papa", "Molfix"];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          Search Store
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Find powdered milk, diapers, and baby healthcare products.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
        <input
          type="search"
          placeholder="Search by product name, brand (e.g. Pediasure, Meiji)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          className="w-full min-h-[52px] pl-12 pr-12 rounded-2xl bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 text-base focus:border-emerald-500 focus:outline-hidden shadow-xs"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="w-10 h-10 absolute right-2 top-1/2 -translate-y-1/2 rounded-xl flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Quick Search Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <span className="text-xs font-semibold text-zinc-400 shrink-0">Popular:</span>
        {quickSearches.map((term) => (
          <button
            key={term}
            onClick={() => setQuery(term)}
            className="min-h-[36px] px-3.5 rounded-full text-xs font-medium bg-white/80 dark:bg-zinc-900/80 border border-black/5 dark:border-white/10 hover:border-emerald-500/30 active:scale-95 shrink-0"
          >
            {term}
          </button>
        ))}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-zinc-500 border-b border-black/5 dark:border-white/5 pb-3">
        <span>
          Found <strong className="text-foreground">{filtered.length}</strong> {filtered.length === 1 ? "product" : "products"}
        </span>
        {query && (
          <span>
            Matching &ldquo;<span className="text-emerald-600 dark:text-emerald-400 font-semibold">{query}</span>&rdquo;
          </span>
        )}
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white/50 dark:bg-zinc-900/50 rounded-3xl border border-black/5 dark:border-white/5 p-8 space-y-3">
          <p className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
            No products found matching &ldquo;{query}&rdquo;
          </p>
          <p className="text-sm text-zinc-500">
            Check your spelling or try searching for a brand like &ldquo;Meiji&rdquo; or &ldquo;Pediasure&rdquo;.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
