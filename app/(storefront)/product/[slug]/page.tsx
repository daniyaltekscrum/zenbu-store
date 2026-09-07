import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/catalog";
import { ProductDetailView } from "@/components/storefront/product-detail-view";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found — Zenbu.Store",
    };
  }

  return {
    title: `${product.title} — Zenbu.Store Baby Nutrition & Care`,
    description: `Buy genuine ${product.title} (${product.brand}) for Rs. ${product.price.toLocaleString()} with Cash on Delivery nationwide. Sealed, authentic, and fast delivery.`,
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 160),
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([
    getProductBySlug(slug),
    getProducts(),
  ]);

  if (!product) {
    notFound();
  }

  // Filter related products within the same category
  const related = allProducts
    .filter((p) => p.category.slug === product.category.slug && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <ProductDetailView product={product} relatedProducts={related} />
    </main>
  );
}
