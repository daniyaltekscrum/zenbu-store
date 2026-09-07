import { getProducts } from "@/lib/catalog";
import { SearchView } from "@/components/storefront/search-view";
import { STORE_NAME } from "@/lib/constants";

export const metadata = {
  title: "Search Catalog — Baby Nutrition & Care",
  description: "Search 30+ authentic baby milks, formulas, and diapers available with Cash on Delivery in Pakistan.",
  alternates: {
    canonical: "/search",
  },
  openGraph: {
    title: `Search Catalog — ${STORE_NAME}`,
    description: "Search authentic baby milks, formulas, and diapers available with Cash on Delivery in Pakistan.",
    url: "/search",
    siteName: STORE_NAME,
    images: ["/logo/1.png"],
  },
};

export default async function SearchPage() {
  const products = await getProducts();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <SearchView allProducts={products} />
    </main>
  );
}
