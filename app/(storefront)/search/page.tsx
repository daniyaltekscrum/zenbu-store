import { getProducts } from "@/lib/catalog";
import { SearchView } from "@/components/storefront/search-view";

export const metadata = {
  title: "Search Catalog — Zenbu.Store",
  description: "Search 30+ authentic baby milks, formulas, and diapers available with Cash on Delivery in Pakistan.",
};

export default async function SearchPage() {
  const products = await getProducts();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <SearchView allProducts={products} />
    </main>
  );
}
