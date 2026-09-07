import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import dvagoData from "@/data/dvago_products.json";

export interface CatalogCategory {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount?: number;
}

export interface CatalogProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  compareAtPrice: number | null;
  image: string;
  images: string[];
  description: string;
  brand: string;
  sku: string;
  stock: number;
  category: CatalogCategory;
  sourceUrl?: string;
}

export async function getCategories(): Promise<CatalogCategory[]> {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase.from("categories").select("*");

    if (!error && data && data.length > 0) {
      return data.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        image: c.image_url || "/logo/1.png",
      }));
    }
  } catch {
    // Fallback to local scraped categories
  }

  // Deduplicate categories from dvago data
  const map = new Map<string, CatalogCategory>();
  dvagoData.forEach((item) => {
    if (!map.has(item.category.slug)) {
      map.set(item.category.slug, {
        id: item.category.id,
        name: item.category.name,
        slug: item.category.slug,
        image: item.category.image,
      });
    }
  });

  return Array.from(map.values());
}

export async function getProducts(options?: {
  categorySlug?: string;
  limit?: number;
  search?: string;
}): Promise<CatalogProduct[]> {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    let query = supabase
      .from("products")
      .select("*, product_images(*), categories(*)")
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;

    if (!error && data && data.length > 0) {
      let results: CatalogProduct[] = data.map((p) => {
        const sortedImages = (p.product_images || []).sort(
          (a: { position: number }, b: { position: number }) => a.position - b.position
        );
        const firstImg = sortedImages[0]?.url || "/logo/1.png";

        return {
          id: p.id,
          slug: p.slug,
          title: p.title,
          price: Number(p.price),
          compareAtPrice: p.compare_at_price ? Number(p.compare_at_price) : null,
          image: firstImg,
          images: sortedImages.map((img: { url: string }) => img.url),
          description: p.description || "",
          brand: p.brand || "Zenbu Verified",
          sku: p.sku || "",
          stock: p.stock_quantity,
          category: {
            id: p.categories?.id || "",
            name: p.categories?.name || "General",
            slug: p.categories?.slug || "general",
            image: p.categories?.image_url || "/logo/1.png",
          },
          sourceUrl: p.source_url,
        };
      });

      if (options?.categorySlug) {
        results = results.filter((p) => p.category.slug === options.categorySlug);
      }
      if (options?.search) {
        const q = options.search.toLowerCase();
        results = results.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.category.name.toLowerCase().includes(q)
        );
      }

      return results;
    }
  } catch {
    // Fallback to local scraped products
  }

  // Fallback to dvago dataset
  let list: CatalogProduct[] = dvagoData.map((item, idx) => ({
    id: `prod-dvago-${idx + 1}`,
    slug: item.slug,
    title: item.title,
    price: item.price,
    compareAtPrice: item.compare_at_price,
    image: item.image,
    images: [item.image],
    description: item.description,
    brand: item.brand,
    sku: item.sku,
    stock: item.stock,
    category: {
      id: item.category.id,
      name: item.category.name,
      slug: item.category.slug,
      image: item.category.image,
    },
    sourceUrl: item.url,
  }));

  if (options?.categorySlug) {
    list = list.filter((p) => p.category.slug === options.categorySlug);
  }
  if (options?.search) {
    const q = options.search.toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.name.toLowerCase().includes(q)
    );
  }
  if (options?.limit) {
    list = list.slice(0, options.limit);
  }

  return list;
}

export async function getProductBySlug(slug: string): Promise<CatalogProduct | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) || null;
}
