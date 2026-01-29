"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShoppingBag, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "@/components/app/CheckoutButton";
import { cn, formatPrice } from "@/lib/utils";
import {
  useCartItems,
  useTotalPrice,
  useTotalItems,
} from "@/lib/store/cart-store-provider";
import { useCartStock } from "@/lib/hooks/useCartStock";

export function CheckoutClient() {
  const items = useCartItems();
  const totalPrice = useTotalPrice();
  const totalItems = useTotalItems();
  const { stockMap, isLoading, hasStockIssues } = useCartStock(items);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-32 sm:px-6 lg:px-8 bg-white min-h-screen">
        <div className="text-center">
          <div className="relative mb-8 flex justify-center">
            <div className="absolute inset-0 bg-[#108561]/5 rounded-full blur-3xl" />
            <ShoppingBag className="relative h-20 w-20 text-zinc-100" />
          </div>
          <h1 className="text-2xl font-black text-black uppercase tracking-tighter">
            Secure Terminal Empty
          </h1>
          <p className="mt-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest max-w-sm mx-auto leading-relaxed">
            Your innovative journey is awaiting fuel. Add some premium electronics to your cart to initialize the checkout sequence.
          </p>
          <Button asChild className="mt-12 h-14 px-10 rounded-2xl bg-black text-white text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-xl shadow-black/10">
            <Link href="/">Re-enter Storefront</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 pb-20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 border-b border-zinc-100 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <Link
              href="/"
              className="group inline-flex items-center text-[10px] font-black text-zinc-400 hover:text-black uppercase tracking-widest transition-colors mb-6"
            >
              <div className="mr-3 h-6 w-6 rounded-full border border-zinc-100 flex items-center justify-center group-hover:bg-zinc-50">
                <ArrowLeft className="h-3 w-3" />
              </div>
              Return to Innovation Hub
            </Link>
            <h1 className="text-4xl font-black text-black tracking-tighter uppercase sm:text-6xl leading-none">
              Finalizing <span className="text-[#108561]">Order</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 bg-zinc-50 p-4 rounded-3xl border border-zinc-100">
            <div className="flex -space-x-3 overflow-hidden">
              {items.slice(0, 3).map((item, i) => (
                <div key={i} className="relative h-10 w-10 rounded-full border-2 border-white overflow-hidden bg-white shadow-sm">
                  <Image src={item.image ?? ""} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Total Selection</span>
              <span className="text-xs font-black text-black">{totalItems} Professional Devices</span>
            </div>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Cart Items */}
          <div className="lg:col-span-7 space-y-8">
            <div className="rounded-[2.5rem] border border-zinc-100 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.02)] overflow-hidden">
              <div className="border-b border-zinc-50 px-10 py-8 flex items-center justify-between">
                <h2 className="text-sm font-black text-black uppercase tracking-widest">
                  Order Manifest
                </h2>
                {isLoading && (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-3 w-3 animate-spin text-[#108561]" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Syncing...</span>
                  </div>
                )}
              </div>

              {/* Stock Issues Warning */}
              {hasStockIssues && !isLoading && (
                <div className="mx-10 mt-6 flex items-center gap-4 rounded-2xl border border-red-100 bg-red-50/50 px-6 py-4 text-[10px] font-black uppercase tracking-widest text-red-600">
                  <AlertTriangle className="h-5 w-5 shrink-0" />
                  <span>
                    Critical Logistis Alert: Inventory mismatch detected.
                  </span>
                </div>
              )}

              {/* Items List */}
              <div className="divide-y divide-zinc-50 px-10 pb-4">
                {items.map((item) => {
                  const stockInfo = stockMap.get(item.productId);
                  const hasIssue = stockInfo?.isOutOfStock || stockInfo?.exceedsStock;

                  return (
                    <div
                      key={item.productId}
                      className={cn(
                        "flex gap-8 py-8 items-center",
                        hasIssue && "bg-red-50/30 -mx-10 px-10"
                      )}
                    >
                      {/* Image */}
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-3xl bg-zinc-50 border border-zinc-100 flex items-center justify-center p-2 shadow-inner">
                        {item.image ? (
                          <div className="relative w-full h-full bg-white rounded-2xl p-2 inset-shadow-sm">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain p-2"
                              sizes="96px"
                            />
                          </div>
                        ) : (
                          <div className="flex h-full items-center justify-center text-[10px] font-black text-zinc-200">
                            NO ASSET
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex flex-1 flex-col">
                        <div>
                          <h3 className="text-sm font-black text-black uppercase tracking-wide truncate max-w-[200px]">
                            {item.name}
                          </h3>
                          <div className="mt-1 flex items-center gap-3">
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                              Quantity: <span className="text-black">{item.quantity}</span>
                            </span>
                            {stockInfo?.isOutOfStock && (
                              <span className="text-[8px] font-black bg-red-100 text-red-600 px-2 py-0.5 rounded-full uppercase">
                                DEPLETED
                              </span>
                            )}
                            {stockInfo?.exceedsStock && !stockInfo.isOutOfStock && (
                              <span className="text-[8px] font-black bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full uppercase">
                                LIMITED: {stockInfo.currentStock}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-base font-black text-black tracking-tighter">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-[9px] font-black text-zinc-300 uppercase tracking-widest mt-1">
                            {formatPrice(item.price)} PER UNIT
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                { label: "End-to-End Encryption", icon: "🔒" },
                { label: "TZA Express Verified", icon: "⚡" },
                { label: "Secured by Stripe", icon: "🛡️" },
                { label: "Real-time Tracking", icon: "📍" },
              ].map((badge, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 rounded-3xl bg-zinc-50 border border-zinc-100 hover:bg-white hover:shadow-xl transition-all cursor-default">
                  <span className="text-xl mb-3">{badge.icon}</span>
                  <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Order Total & Checkout */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 rounded-[2.5rem] border-2 border-zinc-100 bg-zinc-50 p-10 shadow-2xl shadow-zinc-100/50 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <ShoppingBag className="h-40 w-40" />
              </div>

              <h2 className="text-2xl font-black text-black tracking-tighter uppercase mb-2">
                Checkout Details
              </h2>
              <div className="h-1 w-12 bg-[#108561] mb-10" />

              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center group">
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest group-hover:text-zinc-600 transition-colors">
                    Hardware Subtotal
                  </span>
                  <span className="text-base font-black text-black tracking-tighter">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between items-center group">
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest group-hover:text-zinc-600 transition-colors">
                    Logistics (TSh)
                  </span>
                  <span className="text-[10px] font-black text-[#108561] uppercase tracking-widest">
                    Express Calculation Incoming
                  </span>
                </div>

                <div className="h-px bg-zinc-200 my-8" />

                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-black text-black uppercase tracking-widest">
                      Total Investment
                    </span>
                    <span className="text-3xl font-black text-black tracking-tightest">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  <p className="text-[8px] font-black text-zinc-400 uppercase tracking-[0.2em] text-right">
                    Inclusive of VAT & Electronic Tax
                  </p>
                </div>
              </div>

              <div className="mt-12 space-y-4 relative z-10">
                <CheckoutButton
                  disabled={hasStockIssues || isLoading}
                  className="h-16 w-full rounded-2xl bg-[#108561] hover:bg-[#0d6e50] text-white text-[12px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-emerald-900/40 active:scale-95 transition-all"
                />

                <div className="flex items-center justify-center gap-4 pt-4 grayscale opacity-40">
                  <div className="h-4 w-10 relative">
                    <div className="absolute inset-0 border border-zinc-200 rounded flex items-center justify-center text-[6px] font-black">VISA</div>
                  </div>
                  <div className="h-4 w-10 relative">
                    <div className="absolute inset-0 border border-zinc-200 rounded flex items-center justify-center text-[6px] font-black">STRIPE</div>
                  </div>
                  <div className="h-4 w-10 relative">
                    <div className="absolute inset-0 border border-zinc-200 rounded flex items-center justify-center text-[6px] font-black">M-PESA</div>
                  </div>
                </div>

                <p className="text-center text-[8px] font-black text-zinc-300 uppercase tracking-widest pt-4">
                  Secured by Global Cryptographic Standards
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
