import Link from "next/link";
import { MessageCircle, Phone, Mail, Clock, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STORE_NAME, WHATSAPP_PHONE, getWhatsAppGeneralUrl } from "@/lib/constants";
import { BreadcrumbJsonLd } from "@/components/storefront/seo-jsonld";

export const metadata = {
  title: `Contact Us & WhatsApp Support | ${STORE_NAME}`,
  description:
    `Get in touch with Zenbu.Store customer support via WhatsApp (${WHATSAPP_PHONE}) for order updates, product inquiries, and bulk orders.`,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact Us — ${STORE_NAME}`,
    description: `Get in touch with Zenbu.Store customer support via WhatsApp (${WHATSAPP_PHONE}).`,
    url: "/contact",
    siteName: STORE_NAME,
    images: ["/logo/1.png"],
  },
};

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ]}
      />

      <div className="space-y-2 text-center">
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
          We&apos;re Here to Help
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
          Contact Customer Support
        </h1>
        <p className="text-sm sm:text-base text-zinc-500 max-w-md mx-auto">
          Need help choosing the right infant formula, tracking an existing parcel, or placing an order? Reach us instantly.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-white/70 dark:bg-zinc-900/60 border border-black/5 dark:border-white/5 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-base font-bold text-zinc-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
              <MessageCircle className="w-5 h-5 text-emerald-600" />
              WhatsApp Live Chat
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-300">
              Instant responses Monday – Sunday (9:00 AM – 11:00 PM PKT)
            </p>
            <div className="font-mono text-sm font-bold text-emerald-700 dark:text-emerald-400 pt-1">
              {WHATSAPP_PHONE}
            </div>
          </div>

          <a href={getWhatsAppGeneralUrl()} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="rounded-2xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md">
              <MessageCircle className="w-4 h-4 mr-2" />
              Open WhatsApp
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-600 dark:text-zinc-400">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 flex items-start gap-3">
            <Clock className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-foreground">Support Hours</div>
              <div>Mon – Sat: 9:00 AM – 11:00 PM</div>
              <div>Sunday: 11:00 AM – 8:00 PM</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 flex items-start gap-3">
            <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-foreground">Dispatch Hubs</div>
              <div>Karachi, Lahore & Islamabad</div>
              <div>Nationwide Delivery in 24–48 Hours</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
