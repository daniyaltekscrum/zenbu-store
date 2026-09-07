import Link from "next/link";
import { ShieldCheck, Truck, MessageCircle, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STORE_NAME, WHATSAPP_PHONE } from "@/lib/constants";
import { BreadcrumbJsonLd } from "@/components/storefront/seo-jsonld";

export const metadata = {
  title: `About Us — 100% Genuine Baby & Healthcare Products | ${STORE_NAME}`,
  description:
    "Learn about Zenbu.Store's commitment to delivering authentic, sealed baby nutrition formulas and essentials across Pakistan with Cash on Delivery.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About Us — ${STORE_NAME}`,
    description: "Learn about Zenbu.Store's commitment to delivering authentic baby care products.",
    url: "/about",
    siteName: STORE_NAME,
    images: ["/logo/1.png"],
  },
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "About Us", url: "/about" },
        ]}
      />

      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
          Our Mission & Promise
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
          Authentic Baby Care, Delivered With Confidence
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-300">
          Zenbu.Store was established to provide parents in Pakistan with guaranteed genuine powdered milk formulas, baby diapers, and healthcare essentials without the stress of counterfeit products or advance payments.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
        <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/60 border border-black/5 dark:border-white/5 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold">100% Brand Sealed</h2>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Every tin and pack comes directly from authorized distributors. We never sell unsealed or compromised inventory.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/60 border border-black/5 dark:border-white/5 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600">
            <Truck className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold">Cash on Delivery Only</h2>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Inspect your package first and pay the courier rider upon delivery. No advance online bank transfer required.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/60 border border-black/5 dark:border-white/5 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold">Direct WhatsApp Support</h2>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Have questions about product availability or feeding stages? Chat directly with our team on {WHATSAPP_PHONE}.
          </p>
        </div>
      </div>

      <div className="text-center pt-6">
        <Link href="/products">
          <Button size="lg" className="rounded-2xl font-bold min-h-[44px]">
            Explore Catalog
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
