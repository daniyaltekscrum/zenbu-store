import { CheckoutForm } from "@/components/storefront/checkout-form";
import { ShieldCheck, Truck, Lock } from "lucide-react";
import { STORE_NAME } from "@/lib/constants";

export const metadata = {
  title: "Checkout (Cash on Delivery) — Safe & Fast",
  description: "Complete your Cash on Delivery order in Pakistan. Safe, fast, and no advance payment required.",
  alternates: {
    canonical: "/checkout",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: `Checkout (Cash on Delivery) — ${STORE_NAME}`,
    description: "Complete your Cash on Delivery order in Pakistan. Safe, fast, and sealed packages.",
    url: "/checkout",
    siteName: STORE_NAME,
    images: ["/logo/1.png"],
  },
};

export default function CheckoutPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <Lock className="w-3.5 h-3.5" />
          <span>Secure Checkout</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Truck className="w-3.5 h-3.5" /> 24–48h Dispatch
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          Cash on Delivery Checkout
        </h1>
        <p className="text-sm text-zinc-500">
          Pay with cash when your parcel is delivered to your doorstep.
        </p>
      </div>

      <CheckoutForm />
    </main>
  );
}
