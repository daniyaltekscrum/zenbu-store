import { notFound } from "next/navigation";
import { getProducts, getCategories } from "@/lib/catalog";
import { ProductListing } from "@/components/storefront/product-listing";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const categories = await getCategories();
  const cat = categories.find((c) => c.slug === slug);

  if (!cat) {
    return {
      title: "Category Not Found — Zenbu.Store",
    };
  }

  return {
    title: `${cat.name} — Zenbu.Store Baby Nutrition & Care`,
    description: `Shop authentic ${cat.name} products with Cash on Delivery nationwide. Pediasure, Meiji, Enfagrow, Canbebe, and more.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const [allProducts, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const currentCategory = categories.find((c) => c.slug === slug);
  if (!currentCategory) {
    notFound();
  }

  const categoryProducts = allProducts.filter((p) => p.category.slug === slug);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <ProductListing
        initialProducts={categoryProducts}
        categories={categories}
        currentCategorySlug={slug}
        title={currentCategory.name}
        description={`Explore our curated collection of genuine ${currentCategory.name.toLowerCase()} products.`}
      />
    </main>
  );
}
