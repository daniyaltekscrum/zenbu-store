import Link from "next/link";
import { STORE_NAME, WHATSAPP_PHONE } from "@/lib/constants";
import { BreadcrumbJsonLd } from "@/components/storefront/seo-jsonld";

export const metadata = {
  title: `Privacy Policy | ${STORE_NAME}`,
  description: "Learn how Zenbu.Store securely handles customer delivery details and phone numbers.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: `Privacy Policy — ${STORE_NAME}`,
    description: "Learn how Zenbu.Store securely handles customer data.",
    url: "/privacy",
    siteName: STORE_NAME,
    images: ["/logo/1.png"],
  },
};

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Privacy Policy", url: "/privacy" },
        ]}
      />

      <div className="space-y-2 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="text-sm text-zinc-500">
          Last updated: September 2026
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-white/70 dark:bg-zinc-900/60 border border-black/5 dark:border-white/5 space-y-6 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-white">1. Information We Collect</h2>
          <p>
            When you place an order or message us on WhatsApp, we collect only the necessary details required to fulfill your delivery: your full name, mobile number, delivery address, and order items. We never store or ask for debit or credit card information.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-white">2. How We Use Your Information</h2>
          <p>
            Your information is used strictly to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Coordinate package dispatch and delivery with local courier partners.</li>
            <li>Send order tracking updates and confirmations via SMS or WhatsApp.</li>
            <li>Respond to customer support requests and product inquiries.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-white">3. Third-Party Sharing</h2>
          <p>
            We do not sell, rent, or trade your personal data. Delivery information is only shared with our verified courier logistics services for package fulfillment.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-zinc-900 dark:text-white">4. Contact Us</h2>
          <p>
            If you have questions regarding your data or wish to have your contact details updated, please message us on WhatsApp at {WHATSAPP_PHONE}.
          </p>
        </section>
      </div>
    </main>
  );
}
