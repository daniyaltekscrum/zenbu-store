import Link from "next/link";
import { Truck, RotateCcw, ShieldCheck, CheckCircle2 } from "lucide-react";
import { STORE_NAME, WHATSAPP_PHONE } from "@/lib/constants";
import { BreadcrumbJsonLd } from "@/components/storefront/seo-jsonld";

export const metadata = {
  title: `Shipping & Return Policy | ${STORE_NAME}`,
  description:
    "Review Zenbu.Store's nationwide Cash on Delivery shipping terms, delivery timelines (24-48 hours), and replacement policy for damaged or broken seals.",
  alternates: {
    canonical: "/shipping-returns",
  },
  openGraph: {
    title: `Shipping & Return Policy — ${STORE_NAME}`,
    description: "Review Zenbu.Store's nationwide Cash on Delivery shipping and return policy.",
    url: "/shipping-returns",
    siteName: STORE_NAME,
    images: ["/logo/1.png"],
  },
};

export default function ShippingReturnsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Shipping & Returns", url: "/shipping-returns" },
        ]}
      />

      <div className="space-y-2 text-center">
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
          Delivery & Returns
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
          Shipping & Return Policy
        </h1>
        <p className="text-sm text-zinc-500">
          Transparent, reliable nationwide shipping with Cash on Delivery peace of mind.
        </p>
      </div>

      <div className="space-y-6 text-sm text-zinc-600 dark:text-zinc-300">
        <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/60 border border-black/5 dark:border-white/5 space-y-3">
          <div className="flex items-center gap-2 font-bold text-base text-zinc-900 dark:text-white">
            <Truck className="w-5 h-5 text-emerald-600" />
            Nationwide Delivery Details
          </div>
          <ul className="space-y-2 text-xs sm:text-sm list-disc pl-5">
            <li><strong>Major Cities:</strong> Karachi, Lahore, Islamabad, and Rawalpindi orders are dispatched via priority courier and delivered in 24–48 hours.</li>
            <li><strong>Other Cities & Towns:</strong> Delivery takes 2 to 4 business days.</li>
            <li><strong>Free Shipping:</strong> Automatically applied to all orders with a subtotal above Rs. 3,000.</li>
            <li><strong>Standard Shipping:</strong> A flat fee of Rs. 200 applies to orders below Rs. 3,000.</li>
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/60 border border-black/5 dark:border-white/5 space-y-3">
          <div className="flex items-center gap-2 font-bold text-base text-zinc-900 dark:text-white">
            <RotateCcw className="w-5 h-5 text-emerald-600" />
            Returns & Damaged Seal Policy
          </div>
          <p className="text-xs sm:text-sm leading-relaxed">
            Due to the health, safety, and nutritional integrity of baby food, opened or unsealed formula tins cannot be returned once accepted. However, we offer immediate 100% free replacements or refunds in the following events:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm list-disc pl-5">
            <li>The protective foil or safety seal is broken upon arrival.</li>
            <li>The packaging was visibly dented or punctured during transit.</li>
            <li>An incorrect item or size was dispatched.</li>
          </ul>
          <p className="text-xs text-zinc-500 pt-1">
            To report an issue, simply WhatsApp a picture of the unopened tin and courier slip to {WHATSAPP_PHONE} within 24 hours of delivery.
          </p>
        </div>
      </div>
    </main>
  );
}
