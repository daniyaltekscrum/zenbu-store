import Link from "next/link";
import { CheckCircle2, MessageCircle, Truck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_PHONE, STORE_NAME } from "@/lib/constants";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return {
    title: `Order Confirmation #${id} — ${STORE_NAME}`,
    description: `Details and tracking status for Cash on Delivery order #${id}.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function OrderConfirmationPage({ params }: Props) {
  const { id } = await params;

  return (
    <main className="max-w-xl mx-auto px-4 py-12 sm:py-16 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
          Order Confirmed
        </span>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">
          Order #{id}
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Your order has been recorded for Cash on Delivery dispatch within 24–48 hours.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-black/5 dark:border-white/5 text-left space-y-3">
        <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
          <Truck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Status: Preparing for dispatch</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
          <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>WhatsApp Inquiries: {WHATSAPP_PHONE}</span>
        </div>
      </div>

      <Link href="/products">
        <Button size="lg" className="rounded-2xl font-bold min-h-[44px]">
          Continue Shopping
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </Link>
    </main>
  );
}
