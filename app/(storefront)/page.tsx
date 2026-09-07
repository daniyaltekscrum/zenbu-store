import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { WHATSAPP_PHONE, getWhatsAppGeneralUrl } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export default async function HomePage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Quick connectivity probe (graceful fallback)
  let dbConnected = true;
  try {
    const { error } = await supabase.from("categories").select("count").limit(1);
    if (error && error.code !== "PGRST116") {
      // Not a fatal issue for Phase 1 since migration runs in Phase 2
      dbConnected = true;
    }
  } catch {
    dbConnected = false;
  }

  return (
    <main className="relative overflow-hidden">
      {/* Background Soft Gradient Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl -z-10 pointer-events-none" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
          <Badge
            variant="glass"
            className="gap-2 px-3.5 py-1 text-xs shadow-xs border-emerald-500/30"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
              Zenbu.Store Launch Edition
            </span>
            <span className="text-zinc-400">|</span>
            <span>Cash on Delivery Only</span>
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Curated Goods for <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400">
              Effortless Living.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl font-normal">
            A minimalist marketplace of lifestyle essentials, electronics, and daily
            necessities. Zero online payment hassle — pay in cash right at your doorstep.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/products">
              <Button
                size="lg"
                className="rounded-2xl gap-2 font-semibold shadow-lg shadow-zinc-900/10 dark:shadow-emerald-950/40"
              >
                <ShoppingBag className="w-4 h-4" />
                Explore Catalog
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <a href={getWhatsAppGeneralUrl()} target="_blank" rel="noopener noreferrer">
              <Button
                variant="glass"
                size="lg"
                className="rounded-2xl gap-2 font-semibold border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Chat & Order on WhatsApp
              </Button>
            </a>
          </div>

          <div className="flex items-center gap-6 pt-6 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-500" /> Nationwide COD
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Inspected Before
              Dispatch
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-emerald-500" /> {WHATSAPP_PHONE}
            </span>
          </div>
        </div>
      </section>

      {/* Featured Preview Grid (Glassmorphism Showcase) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Featured Collections</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Browse top categories available for immediate home delivery.
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-1 group"
          >
            View all
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Home & Organization",
              description: "Sleek gadgets and modern storage organizers for calm spaces.",
              tag: "Popular",
            },
            {
              title: "Personal Electronics",
              description: "Reliable audio gear, cables, and everyday desktop utilities.",
              tag: "Trending",
            },
            {
              title: "Daily Lifestyle",
              description: "Everyday carry items, travel goods, and curated essentials.",
              tag: "New In",
            },
          ].map((item, idx) => (
            <Card
              key={idx}
              glass
              className="glass-panel-hover p-6 rounded-3xl border-black/5 dark:border-white/10 group cursor-pointer"
            >
              <CardContent className="p-0 space-y-4">
                <div className="w-full h-44 rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center relative overflow-hidden">
                  <div className="text-center p-4">
                    <span className="text-3xl font-extrabold text-zinc-300 dark:text-zinc-700">
                      0{idx + 1}
                    </span>
                  </div>
                  <Badge
                    variant="glass"
                    className="absolute top-3 right-3 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400"
                  >
                    {item.tag}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-lg font-bold group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-snug">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
