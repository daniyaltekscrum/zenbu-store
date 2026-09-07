import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, ShoppingBag, Sparkles, ShieldCheck, Truck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/storefront/product-card";
import { WHATSAPP_PHONE, getWhatsAppGeneralUrl, getWhatsAppProductInquiryUrl, STORE_NAME } from "@/lib/constants";
import { getProducts, getCategories } from "@/lib/catalog";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/storefront/seo-jsonld";

export const metadata = {
  title: "Zenbu.Store — Trusted Baby Nutrition, Diapers & Healthcare in Pakistan",
  description:
    "Buy 100% original powdered milk formulas (Pediasure, Meiji, Enfagrow) and premium baby diapers with Cash on Delivery nationwide. Zero advance payment required.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Zenbu.Store — Trusted Baby Nutrition, Diapers & Healthcare",
    description:
      "Buy 100% original powdered milk formulas (Pediasure, Meiji, Enfagrow) and baby diapers with Cash on Delivery across Pakistan.",
    url: "/",
    siteName: STORE_NAME,
    images: [
      {
        url: "/logo/1.png",
        width: 800,
        height: 800,
        alt: "Zenbu.Store Pakistan",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenbu.Store — Baby Nutrition & Care Delivered",
    description:
      "Original powdered milk formulas & baby diapers with Cash on Delivery across Pakistan.",
    images: ["/logo/1.png"],
  },
};

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts({ limit: 8 }),
    getCategories(),
  ]);

  return (
    <main className="relative overflow-hidden">
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      {/* Background Soft Gradient Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl -z-10 pointer-events-none" />


      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 sm:pt-24 sm:pb-24">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
          <Badge variant="glass" className="gap-2 px-3.5 py-1 text-xs shadow-xs border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
              Zenbu.Store Baby & Healthcare Essentials
            </span>
            <span className="text-zinc-400">|</span>
            <span>Cash on Delivery Nationwide</span>
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Trusted Baby Nutrition & <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400">
              Care Delivered to Your Door.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl font-normal">
            100% genuine powdered milk formulas (Pediasure, Meiji, Enfagrow) and premium baby diapers (Canbebe, Bona Papa, Molfix). Order via website or WhatsApp with zero advance payment.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/products">
              <Button size="lg" className="rounded-2xl gap-2 font-semibold shadow-lg shadow-zinc-900/10 dark:shadow-emerald-950/40">
                <ShoppingBag className="w-4 h-4" />
                Browse 30+ Products
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <a
              href={getWhatsAppGeneralUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="glass"
                size="lg"
                className="rounded-2xl gap-2 font-semibold border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Instant Order on WhatsApp
              </Button>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-500" /> Cash on Delivery (COD)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Original & Sealed
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-emerald-500" /> {WHATSAPP_PHONE}
            </span>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Shop by Department</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Explore our core baby nutrition, diapers, and care collections.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/category/${cat.slug}`}>
              <Card
                glass
                className="glass-panel-hover p-6 rounded-3xl border-black/5 dark:border-white/10 group cursor-pointer h-full flex flex-col justify-between"
              >
                <CardContent className="p-0 space-y-4">
                  <div className="w-full h-40 rounded-2xl relative overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 text-white font-bold text-base drop-shadow-md">
                      {cat.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                    <span>View all items</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Featured In-Stock Products</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Authentic stock available for immediate dispatch.
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-1 group"
          >
            See all 30+ items
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
