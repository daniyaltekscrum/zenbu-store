import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/catalog";
import { ProductDetailView } from "@/components/storefront/product-detail-view";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/storefront/seo-jsonld";
import { STORE_NAME } from "@/lib/constants";

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

  const title = `${product.title} (${product.brand}) — Buy Online in Pakistan`;
  const description = `Buy 100% authentic ${product.title} for Rs. ${product.price.toLocaleString()} with Cash on Delivery nationwide. Sealed packaging, quick 24-48h dispatch, zero advance payment.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/product/${product.slug}`,
    },
    openGraph: {
      title: `${product.title} — Rs. ${product.price.toLocaleString()} | ${STORE_NAME}`,
      description,
      url: `/product/${product.slug}`,
      siteName: STORE_NAME,
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} — ${STORE_NAME}`,
      description,
      images: [product.image],
    },
  };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((prod) => ({
    slug: prod.slug,
  }));
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
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Catalog", url: "/products" },
          { name: product.category.name, url: `/category/${product.category.slug}` },
          { name: product.title, url: `/product/${product.slug}` },
        ]}
      />
      <ProductDetailView product={product} relatedProducts={related} />
    </main>
  );
}

