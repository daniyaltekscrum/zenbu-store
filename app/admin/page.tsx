import Link from "next/link";
import {
  Package,
  ShoppingCart,
  BarChart3,
  ArrowUpRight,
  MessageCircle,
  Database,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WHATSAPP_PHONE } from "@/lib/constants";

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Admin Console</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Manage your catalog, Cash on Delivery orders, and track store analytics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="accent" className="gap-1.5 py-1 px-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Storefront Ready
          </Badge>
        </div>
      </div>

      {/* Quick Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card glass>
          <CardHeader className="p-5 pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider">
              Payment Model
            </CardDescription>
            <CardTitle className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
              COD Only
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0 text-xs text-zinc-500">
            Zero gateway fees, cash on delivery nationwide
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader className="p-5 pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider">
              Support Line
            </CardDescription>
            <CardTitle className="text-sm font-bold truncate">{WHATSAPP_PHONE}</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0 text-xs text-zinc-500 flex items-center gap-1">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-500" /> WhatsApp customer
            assistance
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader className="p-5 pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider">
              Database
            </CardDescription>
            <CardTitle className="text-xl font-extrabold flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-500" /> Supabase
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0 text-xs text-zinc-500">
            Postgres + Auth + Storage connected
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader className="p-5 pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider">
              Build Phase
            </CardDescription>
            <CardTitle className="text-xl font-extrabold text-zinc-900 dark:text-white">
              Phase 1
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0 text-xs text-zinc-500">
            Scaffold & Architecture Complete
          </CardContent>
        </Card>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
              <Package className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-bold text-base">Products & Import</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Upload via CSV, import from web links with AI descriptions, and manage
              stock.
            </p>
          </div>
          <div className="pt-6">
            <Link href="/admin/products">
              <Button variant="outline" size="sm" className="w-full justify-between">
                Open Catalog
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
              <ShoppingCart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-bold text-base">Order Management</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Process Cash on Delivery orders, confirm statuses, and update dispatch
              tracking.
            </p>
          </div>
          <div className="pt-6">
            <Link href="/admin/orders">
              <Button variant="outline" size="sm" className="w-full justify-between">
                View Orders
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
              <BarChart3 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-bold text-base">Analytics Dashboard</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Track conversion funnels, form drop-offs, search queries, and top products.
            </p>
          </div>
          <div className="pt-6">
            <Link href="/admin/dashboard">
              <Button variant="outline" size="sm" className="w-full justify-between">
                View Analytics
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
