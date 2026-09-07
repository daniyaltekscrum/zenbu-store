import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { getCategories } from "@/lib/catalog";
import { ProductsManager } from "@/components/admin/products-manager";
import dvagoData from "@/data/dvago_products.json";

export const metadata = {
  title: "Products Management — Zenbu Admin",
  description: "Manage catalog, bulk CSV sheet imports, and scrape product links with AI descriptions.",
};

export default async function AdminProductsPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const [productsRes, categories] = await Promise.all([
    supabase
      .from("products")
      .select("*, categories(id, name, slug), product_images(id, url, position)")
      .order("created_at", { ascending: false }),
    getCategories(),
  ]);

  let initialProducts = productsRes.data || [];

  // Fallback to initial scraped catalog if database is not yet populated
  if (initialProducts.length === 0) {
    initialProducts = dvagoData.map((item, idx) => ({
      id: `prod-dvago-${idx + 1}`,
      title: item.title,
      slug: item.slug,
      price: item.price,
      compare_at_price: item.compare_at_price,
      stock_quantity: item.stock,
      status: "active" as const,
      source_type: "manual" as const,
      brand: item.brand,
      sku: item.sku,
      categories: {
        id: item.category.id,
        name: item.category.name,
        slug: item.category.slug,
      },
      product_images: [{ id: `img-${idx}`, url: item.image, position: 0 }],
    }));
  }

  return (
    <div className="space-y-6 max-w-7xl">
      <ProductsManager
        initialProducts={initialProducts as any}
        categories={categories}
      />
    </div>
  );
}
