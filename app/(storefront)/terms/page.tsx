import Link from "next/link";
import { STORE_NAME, WHATSAPP_PHONE } from "@/lib/constants";
import { BreadcrumbJsonLd } from "@/components/storefront/seo-jsonld";

export const metadata = {
  title: `Terms of Service | ${STORE_NAME}`,
  description: "Read the Terms of Service governing purchases and Cash on Delivery orders at Zenbu.Store.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: `Terms of Service — ${STORE_NAME}`,
    description: "Read the Terms of Service governing purchases at Zenbu.Store.",
    url: "/terms",
    siteName: STORE_NAME,
    images: ["/logo/1.png"],
  },
};

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Terms of Service", url: "/terms" },
        ]}
      />

      <div className="space-y-2 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
          Terms of Service
        </h1>
        <p className="text-sm text-zinc-500">
          Last updated: September 2026
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-white/70 dark:bg-zinc-900/60 border border-black/5 dark:border-white/5 space-y-6 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-white">1. General Terms</h2>
          <p>
            By accessing or ordering from {STORE_NAME}, you agree to adhere to these terms. All products offered on this website are intended for end-consumer personal use.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-white">2. Cash on Delivery Orders</h2>
          <p>
            Orders placed via the website or WhatsApp are dispatched under Cash on Delivery terms. Customers are required to provide a valid contact number and address. Payment must be rendered in full to the courier rider upon package handoff.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-white">3. Product Integrity & Disclaimer</h2>
          <p>
            We supply sealed, brand-original formulas and items from recognized manufacturers. Feeding instructions, nutritional guidance, and suitability for individual infants should always follow the advice of a qualified pediatrician or medical professional.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-white">4. Modifications & Inquiries</h2>
          <p>
            We reserve the right to revise product pricing, shipping terms, and inventory availability at any time. For questions regarding your order, contact {WHATSAPP_PHONE}.
          </p>
        </section>
      </div>
    </main>
  );
}
