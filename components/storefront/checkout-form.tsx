"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { WHATSAPP_PHONE, getWhatsAppOrderUrl } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";

export function CheckoutForm() {
  const { items, subtotal, shippingFee, total, clearCart } = useCart();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [altPhone, setAltPhone] = useState("");
  const [city, setCity] = useState("Karachi");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const cities = [
    "Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Peshawar",
    "Quetta",
    "Sialkot",
    "Gujranwala",
    "Hyderabad",
    "Other City",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      setErrorMsg("Please fill in your name, phone number, and delivery address.");
      return;
    }

    if (items.length === 0) {
      setErrorMsg("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      const orderNumber = `ZB-${Date.now().toString().slice(-6)}`;
      const supabase = createClient();

      // Try saving order to Supabase
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          order_number: orderNumber,
          customer_name: fullName,
          customer_phone: phone,
          shipping_city: city,
          shipping_address: address,
          shipping_notes: notes || null,
          payment_method: "cod",
          payment_status: "pending",
          subtotal: subtotal,
          shipping_fee: shippingFee,
          total: total,
          item_count: items.reduce((acc, item) => acc + item.quantity, 0),
        })
        .select()
        .single();

      // Save order items if order was saved
      if (orderData && !orderError) {
        const orderItems = items.map((i) => ({
          order_id: orderData.id,
          product_title: i.product.title,
          product_sku: i.product.sku,
          price: i.product.price,
          quantity: i.quantity,
          total: i.product.price * i.quantity,
        }));
        await supabase.from("order_items").insert(orderItems);
      }

      // Order success object
      const completed = {
        orderNumber,
        fullName,
        phone,
        city,
        address,
        subtotal,
        shippingFee,
        total,
        items,
      };

      setOrderComplete(completed);
      clearCart();
    } catch (err: any) {
      // If DB throws error, still proceed to fallback confirmation with WhatsApp
      const fallbackOrder = `ZB-${Date.now().toString().slice(-6)}`;
      setOrderComplete({
        orderNumber: fallbackOrder,
        fullName,
        phone,
        city,
        address,
        subtotal,
        shippingFee,
        total,
        items,
      });
      clearCart();
    } finally {
      setLoading(false);
    }
  };

  if (orderComplete) {
    const summaryLines = orderComplete.items.map(
      (item: any) => `${item.quantity}x ${item.product.title} (Rs. ${item.product.price * item.quantity})`
    );
    const whatsappOrderUrl = getWhatsAppOrderUrl(
      orderComplete.orderNumber,
      summaryLines,
      orderComplete.total,
      `${orderComplete.address}, ${orderComplete.city}`,
      orderComplete.phone
    );

    return (
      <div className="max-w-xl mx-auto py-8 sm:py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            Order Placed Successfully
          </span>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">
            Thank You, {orderComplete.fullName}!
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Order ID: <span className="font-mono font-bold text-foreground">{orderComplete.orderNumber}</span>
          </p>
        </div>

        {/* Order Details Card */}
        <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-black/5 dark:border-white/5 text-left space-y-4">
          <div className="flex justify-between items-center text-sm font-bold border-b border-black/5 dark:border-white/5 pb-3">
            <span>Payment Method</span>
            <span className="text-emerald-600 dark:text-emerald-400">Cash on Delivery (COD)</span>
          </div>

          <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
            <div className="flex justify-between">
              <span>Delivery To:</span>
              <span className="font-semibold text-foreground text-right">{orderComplete.address}, {orderComplete.city}</span>
            </div>
            <div className="flex justify-between">
              <span>Contact Phone:</span>
              <span className="font-semibold text-foreground">{orderComplete.phone}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-foreground pt-2 border-t border-black/5 dark:border-white/5">
              <span>Total Amount Payable:</span>
              <span className="text-emerald-600 dark:text-emerald-400">Rs. {orderComplete.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* WhatsApp Notification CTA */}
        <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-500/20 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Fast-track dispatch with WhatsApp confirmation</span>
          </div>
          <a
            href={whatsappOrderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button size="lg" className="w-full min-h-[48px] rounded-2xl gap-2 font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20">
              <MessageCircle className="w-5 h-5" />
              Confirm via WhatsApp ({WHATSAPP_PHONE})
            </Button>
          </a>
        </div>

        <div>
          <Link href="/products">
            <Button variant="outline" className="rounded-xl min-h-[44px]">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 mx-auto flex items-center justify-center text-zinc-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold">Your cart is empty</h2>
        <p className="text-sm text-zinc-500">
          Add items to your cart before proceeding to checkout.
        </p>
        <Link href="/products">
          <Button size="lg" className="rounded-2xl font-bold min-h-[44px]">
            Browse Catalog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Checkout Form - Mobile First Single Column */}
      <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
        <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-black/5 dark:border-white/5 space-y-5">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              Shipping & Delivery Information
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Enter the exact address where you would like to receive your package.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-500/20 text-xs text-rose-600 dark:text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Muhammad Ali"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full min-h-[48px] px-4 rounded-xl text-sm bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 focus:border-emerald-500 focus:outline-hidden"
            />
          </div>

          {/* Phone Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                Mobile Number (WhatsApp) *
              </label>
              <input
                type="tel"
                required
                placeholder="03123456789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full min-h-[48px] px-4 rounded-xl text-sm bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 focus:border-emerald-500 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                Alternative Phone (Optional)
              </label>
              <input
                type="tel"
                placeholder="03001234567"
                value={altPhone}
                onChange={(e) => setAltPhone(e.target.value)}
                className="w-full min-h-[48px] px-4 rounded-xl text-sm bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 focus:border-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* City Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Delivery City *
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full min-h-[48px] px-4 rounded-xl text-sm bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 focus:border-emerald-500 focus:outline-hidden cursor-pointer"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Street Address */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Complete Delivery Address (House / Flat / Street / Landmark) *
            </label>
            <textarea
              required
              rows={3}
              placeholder="e.g. House # 12-B, Street 4, Block 7, Gulshan-e-Iqbal"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 rounded-xl text-sm bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 focus:border-emerald-500 focus:outline-hidden resize-none"
            />
          </div>

          {/* Delivery Note */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Special Delivery Notes (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Please call before arriving or deliver between 2 PM - 6 PM"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full min-h-[48px] px-4 rounded-xl text-sm bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 focus:border-emerald-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Payment Method Notice */}
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-500/20 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-zinc-600 dark:text-zinc-300">
            <div className="font-bold text-zinc-900 dark:text-white text-sm">
              Payment Method: Cash on Delivery (COD) Only
            </div>
            <p>
              Pay in cash to the delivery rider once you receive and inspect your package. No advance deposit or credit card required.
            </p>
          </div>
        </div>

        {/* Submit Order Button (Min 50px height for mobile ergonomics) */}
        <Button
          type="submit"
          disabled={loading}
          size="lg"
          className="w-full min-h-[52px] rounded-2xl gap-2 font-bold text-base shadow-xl shadow-emerald-600/20"
        >
          {loading ? "Placing Order..." : `Confirm Order • Rs. ${total.toLocaleString()}`}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      {/* Order Summary Sidebar */}
      <div className="lg:col-span-5 space-y-4">
        <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-black/5 dark:border-white/5 space-y-4">
          <h2 className="text-base font-bold text-zinc-900 dark:text-white">
            Order Items ({items.length})
          </h2>

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-3 items-center">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white dark:bg-zinc-800 border border-black/5 dark:border-white/5 shrink-0 flex items-center justify-center">
                  <Image
                    src={item.product.image}
                    alt={item.product.title}
                    fill
                    sizes="56px"
                    className="object-contain p-1"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold truncate">{item.product.title}</div>
                  <div className="text-[11px] text-zinc-500">
                    Qty: {item.quantity} × Rs. {item.product.price.toLocaleString()}
                  </div>
                </div>
                <div className="text-xs font-bold text-zinc-900 dark:text-white">
                  Rs. {(item.product.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing breakdown */}
          <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400 border-t border-black/5 dark:border-white/5 pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-foreground">Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee (Nationwide)</span>
              <span className="font-semibold text-foreground">
                {shippingFee === 0 ? "FREE" : `Rs. ${shippingFee}`}
              </span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-foreground pt-2 border-t border-black/5 dark:border-white/5">
              <span>Total (Pay on Delivery)</span>
              <span className="text-emerald-600 dark:text-emerald-400">
                Rs. {total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* WhatsApp Assistance Box */}
        <div className="p-4 rounded-2xl bg-white/40 dark:bg-zinc-900/40 border border-black/5 dark:border-white/5 flex items-center justify-between gap-3">
          <div className="text-xs text-zinc-500">
            Need help placing your order?
          </div>
          <a
            href={getWhatsAppOrderUrl("NEW-ORDER", ["Assistance needed"], total, city, phone || "Customer")}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="sm"
              className="gap-1 text-xs text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Chat Live
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
