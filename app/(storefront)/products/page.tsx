import { getProducts, getCategories } from "@/lib/catalog";
import { ProductListing } from "@/components/storefront/product-listing";

export const metadata = {
  title: "All Products — Zenbu.Store Baby Nutrition & Care",
  description: "Browse 30+ verified powdered milk formulas, baby diapers, and healthcare supplies with Cash on Delivery nationwide.",
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <ProductListing
        initialProducts={products}
        categories={categories}
        title="All Products"
        description="Every product is 100% genuine, brand-sealed, and delivered with Cash on Delivery across Pakistan."
      />
    </main>
  );
}
