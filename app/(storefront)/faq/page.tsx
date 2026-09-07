import Link from "next/link";
import { HelpCircle, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STORE_NAME, WHATSAPP_PHONE, getWhatsAppGeneralUrl } from "@/lib/constants";
import { BreadcrumbJsonLd } from "@/components/storefront/seo-jsonld";

export const metadata = {
  title: `Frequently Asked Questions (FAQ) | ${STORE_NAME}`,
  description:
    "Find answers regarding Cash on Delivery, formula authenticity, delivery timelines across Pakistan, and package inspection.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: `Frequently Asked Questions — ${STORE_NAME}`,
    description: "Find answers regarding Cash on Delivery, formula authenticity, and delivery times in Pakistan.",
    url: "/faq",
    siteName: STORE_NAME,
    images: ["/logo/1.png"],
  },
};

const faqs = [
  {
    q: "How does Cash on Delivery (COD) work?",
    a: "You place your order through the website without entering any debit/credit card details or paying in advance. When the courier rider arrives at your doorstep, you inspect the parcel and pay the total amount in cash.",
  },
  {
    q: "Are your baby milk formulas and diapers 100% genuine?",
    a: "Yes. Every single tin (Pediasure, Meiji, Enfagrow) and diaper pack (Canbebe, Bona Papa, Molfix) is 100% genuine, brand-sealed, and sourced from authorized distributors. We guarantee zero counterfeit items.",
  },
  {
    q: "How long does delivery take across Pakistan?",
    a: "Orders in major cities (Karachi, Lahore, Islamabad, Rawalpindi) typically arrive within 24–48 hours. Other cities and remote regions take approximately 2–4 business days.",
  },
  {
    q: "What are the shipping charges?",
    a: "Delivery is completely FREE for all orders over Rs. 3,000! For orders below Rs. 3,000, a flat delivery fee of Rs. 200 is charged nationwide.",
  },
  {
    q: "Can I order directly on WhatsApp?",
    a: `Yes! You can order anytime by tapping the WhatsApp button or messaging ${WHATSAPP_PHONE} with the products and delivery address.`,
  },
];

export default function FaqPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "FAQ", url: "/faq" },
        ]}
      />

      <div className="space-y-2 text-center">
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
          Got Questions?
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-sm sm:text-base text-zinc-500">
          Everything you need to know about shopping, delivery, and payments at Zenbu.Store.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white/70 dark:bg-zinc-900/60 border border-black/5 dark:border-white/5 space-y-2"
          >
            <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              {faq.q}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed pl-6">
              {faq.a}
            </p>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-500/20 text-center space-y-3">
        <h3 className="text-sm font-bold">Have a specific question not listed here?</h3>
        <a href={getWhatsAppGeneralUrl()} target="_blank" rel="noopener noreferrer" className="inline-block">
          <Button size="sm" className="rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white">
            <MessageCircle className="w-4 h-4 mr-1.5" />
            Ask Us on WhatsApp
          </Button>
        </a>
      </div>
    </main>
  );
}
