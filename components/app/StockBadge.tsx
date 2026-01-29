"use client";

import { Badge } from "@/components/ui/badge";
import { useCartItem } from "@/lib/store/cart-store-provider";
import { cn } from "@/lib/utils";
import { isLowStock as checkLowStock } from "@/lib/constants/stock";

interface StockBadgeProps {
  productId: string;
  stock: number;
  className?: string;
}

export function StockBadge({ productId, stock, className }: StockBadgeProps) {
  const cartItem = useCartItem(productId);

  const quantityInCart = cartItem?.quantity ?? 0;
  const isAtMax = quantityInCart >= stock && stock > 0;
  const lowStock = checkLowStock(stock);

  if (isAtMax) {
    return (
      <div className={cn("inline-flex items-center gap-2 px-3 py-1 bg-zinc-50 border border-zinc-100 rounded-full", className)}>
        <div className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
        <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Maximum Allocation</span>
      </div>
    );
  }

  if (lowStock) {
    return (
      <div className={cn("inline-flex items-center gap-2 px-3 py-1 bg-[#108561]/5 border border-[#108561]/10 rounded-full", className)}>
        <div className="h-1.5 w-1.5 rounded-full bg-[#108561] animate-pulse" />
        <span className="text-[8px] font-black uppercase tracking-widest text-[#108561]">Limited Dispatch: {stock} Left</span>
      </div>
    );
  }

  return null;
}
