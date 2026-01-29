"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import {
  useTotalPrice,
  useTotalItems,
  useCartActions,
} from "@/lib/store/cart-store-provider";

interface CartSummaryProps {
  hasStockIssues?: boolean;
}

export function CartSummary({ hasStockIssues = false }: CartSummaryProps) {
  const totalPrice = useTotalPrice();
  const totalItems = useTotalItems();
  const { closeCart } = useCartActions();

  if (totalItems === 0) return null;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Subtotal Estimate</span>
          <span className="text-xl font-black text-black tracking-tighter">{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between items-center pb-4 border-b border-zinc-100">
          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Calculated Shipping</span>
          <span className="text-[10px] font-black text-[#108561] uppercase tracking-widest">TZA Express</span>
        </div>
      </div>

      <div className="space-y-3">
        {hasStockIssues ? (
          <Button disabled className="w-full h-14 rounded-2xl bg-zinc-100 text-zinc-400 text-[10px] font-black uppercase tracking-widest cursor-not-allowed">
            Action Required: Resolve Stock Issues
          </Button>
        ) : (
          <Button asChild className="w-full h-16 rounded-2xl bg-[#108561] hover:bg-[#0d6e50] text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-900/20 active:scale-95 transition-all">
            <Link href="/checkout" onClick={() => closeCart()}>
              Secure Galactic Checkout
            </Link>
          </Button>
        )}

        <div className="text-center">
          <Link
            href="/"
            onClick={closeCart}
            className="text-[9px] font-black text-zinc-400 hover:text-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
          >
            <div className="h-4 w-4 rounded-full border border-zinc-200 flex items-center justify-center">
              <ArrowLeft className="h-2.5 w-2.5" />
            </div>
            Continue Innovations
          </Link>
        </div>
      </div>
    </div>
  );
}
