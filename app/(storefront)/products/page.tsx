import { getProducts, getCategories } from "@/lib/catalog";
import { ProductListing } from "@/components/storefront/product-listing";
import { BreadcrumbJsonLd } from "@/components/storefront/seo-jsonld";
import { STORE_NAME } from "@/lib/constants";

export const metadata = {
  title: "All Products — Verified Baby Formulas & Healthcare",
  description:
    "Browse 30+ verified powdered milk formulas (Pediasure, Meiji, Enfagrow) and baby diapers with Cash on Delivery nationwide.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "All Products — Zenbu.Store Baby Nutrition & Care",
    description:
      "Browse 30+ verified powdered milk formulas and diapers with Cash on Delivery across Pakistan.",
    url: "/products",
    siteName: STORE_NAME,
    images: [
      {
        url: "/logo/1.png",
        width: 800,
        height: 800,
        alt: "All Products - Zenbu.Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Products — Zenbu.Store",
    description: "Browse 30+ verified baby formulas and diapers with COD.",
    images: ["/logo/1.png"],
  },
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "All Products", url: "/products" },
        ]}
      />
      <ProductListing
        initialProducts={products}
        categories={categories}
        title="All Products"
        description="Every product is 100% genuine, brand-sealed, and delivered with Cash on Delivery across Pakistan."
      />
    </main>
  );
}
