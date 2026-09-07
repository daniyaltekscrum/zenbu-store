"use client";

import React, { useState, useMemo } from "react";
import { SlidersHorizontal, ArrowUpDown, X, Check } from "lucide-react";
import { CatalogProduct, CatalogCategory } from "@/lib/catalog";
import { ProductCard } from "@/components/storefront/product-card";
import { Button } from "@/components/ui/button";

interface ProductListingProps {
  initialProducts: CatalogProduct[];
  categories: CatalogCategory[];
  currentCategorySlug?: string;
  title?: string;
  description?: string;
}

export function ProductListing({
  initialProducts,
  categories,
  currentCategorySlug,
  title = "All Products",
  description = "Explore our verified baby formulas, diapers, and healthcare supplies.",
}: ProductListingProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(currentCategorySlug || "all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [filterOpen, setFilterOpen] = useState(false);

  // Extract all unique brands
  const brands = useMemo(() => {
    const set = new Set<string>();
    initialProducts.forEach((p) => {
      if (p.brand) set.add(p.brand);
    });
    return Array.from(set).sort();
  }, [initialProducts]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        if (selectedCategory !== "all" && p.category.slug !== selectedCategory) {
          return false;
        }
        if (selectedBrand !== "all" && p.brand !== selectedBrand) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        return 0;
      });
  }, [initialProducts, selectedCategory, selectedBrand, sortBy]);

  const activeFiltersCount =
    (selectedCategory !== "all" && !currentCategorySlug ? 1 : 0) + (selectedBrand !== "all" ? 1 : 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/5 dark:border-white/5 pb-6">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 mt-1">
            {description}
          </p>
        </div>

        {/* Counter Badge */}
        <div className="text-xs sm:text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          Showing <span className="text-emerald-600 dark:text-emerald-400 font-bold">{filteredProducts.length}</span>{" "}
          items
        </div>
      </div>

      {/* Filter and Sorting Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Category Pill Filters (Horizontal scrollable on mobile) */}
        {!currentCategorySlug && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 w-full sm:w-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`min-h-[44px] px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
                selectedCategory === "all"
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm"
                  : "bg-white/80 dark:bg-zinc-900/80 border border-black/5 dark:border-white/10 text-zinc-700 dark:text-zinc-300"
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`min-h-[44px] px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
                  selectedCategory === cat.slug
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm"
                    : "bg-white/80 dark:bg-zinc-900/80 border border-black/5 dark:border-white/10 text-zinc-700 dark:text-zinc-300"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* Action Buttons: Filter Sheet Trigger & Sort dropdown */}
        <div className="flex items-center gap-2.5 ml-auto w-full sm:w-auto justify-between sm:justify-end">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setFilterOpen(true)}
            className="min-h-[44px] px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-semibold bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 hover:border-emerald-500/30 active:scale-95 transition-all shadow-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Filter Brands</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Sort Selector */}
          <div className="relative min-h-[44px] flex items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="min-h-[44px] pl-3 pr-8 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 hover:border-emerald-500/30 text-zinc-800 dark:text-zinc-200 outline-hidden cursor-pointer shadow-xs appearance-none"
              aria-label="Sort products"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 absolute right-2.5 text-zinc-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {(selectedBrand !== "all" || (selectedCategory !== "all" && !currentCategorySlug)) && (
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {selectedCategory !== "all" && !currentCategorySlug && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
              Category: {categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
              <button
                onClick={() => setSelectedCategory("all")}
                className="hover:text-emerald-900"
                aria-label="Remove category filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedBrand !== "all" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
              Brand: {selectedBrand}
              <button
                onClick={() => setSelectedBrand("all")}
                className="hover:text-emerald-900"
                aria-label="Remove brand filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={() => {
              setSelectedCategory("all");
              setSelectedBrand("all");
            }}
            className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 underline ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Products Grid: 2 cols on mobile (375px+), 3 on tablet, 4 on desktop */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white/50 dark:bg-zinc-900/50 rounded-3xl border border-black/5 dark:border-white/5 p-8 space-y-3">
          <p className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
            No products match your filter
          </p>
          <p className="text-sm text-zinc-500">
            Try resetting your brand or category filters to see all available items.
          </p>
          <Button
            onClick={() => {
              setSelectedCategory("all");
              setSelectedBrand("all");
            }}
            variant="outline"
            className="rounded-xl min-h-[44px]"
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Mobile Filter Bottom Sheet Modal */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            onClick={() => setFilterOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />
          <div className="fixed inset-x-0 bottom-0 max-h-[85vh] bg-white dark:bg-zinc-950 rounded-t-3xl border-t border-black/10 dark:border-white/10 p-6 space-y-6 shadow-2xl flex flex-col animate-in slide-in-from-bottom pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
            {/* Sheet Header */}
            <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
              <h3 className="text-lg font-bold">Filter Products</h3>
              <button
                onClick={() => setFilterOpen(false)}
                className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 active:scale-95"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sheet Body */}
            <div className="flex-1 overflow-y-auto space-y-6 pr-1">
              {/* Brand Filter */}
              <div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                  Brand ({brands.length})
                </h4>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedBrand("all")}
                    className={`w-full min-h-[44px] px-3.5 rounded-xl flex items-center justify-between text-sm transition-all ${
                      selectedBrand === "all"
                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold"
                        : "hover:bg-black/5 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-300 font-medium"
                    }`}
                  >
                    <span>All Brands</span>
                    {selectedBrand === "all" && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`w-full min-h-[44px] px-3.5 rounded-xl flex items-center justify-between text-sm transition-all ${
                        selectedBrand === brand
                          ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold"
                          : "hover:bg-black/5 dark:hover:bg-white/5 text-zinc-700 dark:text-zinc-300 font-medium"
                      }`}
                    >
                      <span>{brand}</span>
                      {selectedBrand === brand && <Check className="w-4 h-4 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sheet Footer */}
            <div className="pt-3 border-t border-black/5 dark:border-white/5 flex gap-3">
              <Button
                variant="outline"
                onClick={() => setSelectedBrand("all")}
                className="flex-1 min-h-[48px] rounded-2xl"
              >
                Reset
              </Button>
              <Button
                onClick={() => setFilterOpen(false)}
                className="flex-1 min-h-[48px] rounded-2xl font-bold"
              >
                Show Results
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
