"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartActions } from "@/lib/store/cart-store-provider";
import { AddToCartButton } from "@/components/app/AddToCartButton";
import { StockBadge } from "@/components/app/StockBadge";
import { cn, formatPrice } from "@/lib/utils";
import type { CartItem as CartItemType } from "@/lib/store/cart-store";
import type { StockInfo } from "@/lib/hooks/useCartStock";

interface CartItemProps {
  item: CartItemType;
  stockInfo?: StockInfo;
}

export function CartItem({ item, stockInfo }: CartItemProps) {
  const { removeItem } = useCartActions();

  const isOutOfStock = stockInfo?.isOutOfStock ?? false;
  const exceedsStock = stockInfo?.exceedsStock ?? false;
  const currentStock = stockInfo?.currentStock ?? 999;
  const hasIssue = isOutOfStock || exceedsStock;

  return (
    <div
      className={cn(
        "flex gap-6 py-4",
        hasIssue && "rounded-[1.5rem] bg-red-50/50 p-4 border border-red-100",
      )}
    >
      {/* Image */}
      <div
        className={cn(
          "relative h-24 w-24 shrink-0 overflow-hidden rounded-[1.5rem] bg-zinc-50 border border-zinc-100 flex items-center justify-center p-2 shadow-inner",
          isOutOfStock && "opacity-40 grayscale",
        )}
      >
        {item.image ? (
          <div className="relative w-full h-full bg-white rounded-xl p-2 inset-shadow-sm">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-contain p-1"
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
        <div className="flex justify-between items-start">
          <div className="min-w-0 flex-1">
            <Link
              href={`/products/${item.productId}`}
              className={cn(
                "text-sm font-black text-black uppercase tracking-wide truncate block",
                isOutOfStock && "text-zinc-300",
              )}
            >
              {item.name}
            </Link>
            <p className="mt-1 text-[10px] font-black text-[#108561] tracking-tightest">
              {formatPrice(item.price)}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-zinc-300 hover:text-black hover:bg-zinc-50 rounded-full transition-all"
            onClick={() => removeItem(item.productId)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove {item.name}</span>
          </Button>
        </div>

        {/* Stock Badge & Quantity Controls */}
        <div className="mt-auto flex flex-row justify-between items-center gap-4">
          <div className="flex-1">
            <StockBadge productId={item.productId} stock={currentStock} />
          </div>
          {!isOutOfStock && (
            <div className="shrink-0 flex items-center gap-2">
              <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest hidden sm:block">Adjust Allocation:</span>
              <div className="w-28 scale-90 origin-right">
                <AddToCartButton
                  productId={item.productId}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  stock={currentStock}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
