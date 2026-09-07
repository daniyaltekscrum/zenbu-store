import { notFound } from "next/navigation";
import { getProducts, getCategories } from "@/lib/catalog";
import { ProductListing } from "@/components/storefront/product-listing";
import { BreadcrumbJsonLd } from "@/components/storefront/seo-jsonld";
import { STORE_NAME } from "@/lib/constants";

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

  const title = `${cat.name} — Buy Authentic Products with COD`;
  const description = `Shop authentic ${cat.name} products with Cash on Delivery nationwide. Pediasure, Meiji, Enfagrow, Canbebe, and more with zero advance payment.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/category/${cat.slug}`,
    },
    openGraph: {
      title: `${cat.name} — ${STORE_NAME}`,
      description,
      url: `/category/${cat.slug}`,
      siteName: STORE_NAME,
      images: [
        {
          url: cat.image,
          width: 800,
          height: 800,
          alt: `${cat.name} Collection`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${cat.name} — ${STORE_NAME}`,
      description,
      images: [cat.image],
    },
  };
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
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
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Catalog", url: "/products" },
          { name: currentCategory.name, url: `/category/${currentCategory.slug}` },
        ]}
      />
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

