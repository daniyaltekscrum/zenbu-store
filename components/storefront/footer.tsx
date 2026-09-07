import Link from "next/link";
import { MessageCircle, Truck, ShieldCheck, Clock } from "lucide-react";
import { WHATSAPP_PHONE, getWhatsAppGeneralUrl } from "@/lib/constants";

export function StorefrontFooter() {
  return (
    <footer className="w-full border-t border-black/5 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-950/50 backdrop-blur-xl mt-auto transition-colors">
      {/* Value Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 border-b border-black/5 dark:border-white/5">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold">Cash on Delivery</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Pay with cash when your package arrives
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold">WhatsApp Support</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Instant order updates on {WHATSAPP_PHONE}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold">Verified Quality</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Tested & inspected before dispatch
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold">Fast Shipping</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Reliable delivery right to your doorstep
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">
            Shop
          </h5>
          <ul className="space-y-2.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              <Link href="/products" className="hover:text-foreground">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/category/trending" className="hover:text-foreground">
                Trending Items
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="hover:text-foreground">
                My Wishlist
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">
            Help & Orders
          </h5>
          <ul className="space-y-2.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              <Link href="/faq" className="hover:text-foreground">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/shipping-returns" className="hover:text-foreground">
                Shipping & Returns
              </Link>
            </li>
            <li>
              <a
                href={getWhatsAppGeneralUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-600 flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                WhatsApp Assistance
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">
            About Zenbu
          </h5>
          <ul className="space-y-2.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              <Link href="/about" className="hover:text-foreground">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-foreground">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-4">
            Legal
          </h5>
          <ul className="space-y-2.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              <Link href="/privacy" className="hover:text-foreground">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-foreground">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-black/5 dark:border-white/5 py-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
        &copy; {new Date().getFullYear()} Zenbu.Store. All rights reserved. Built with
        Next.js & Supabase.
      </div>
    </footer>
  );
}
