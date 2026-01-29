"use client";

import { AlertTriangle, Loader2, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  useCartItems,
  useCartIsOpen,
  useCartActions,
  useTotalItems,
} from "@/lib/store/cart-store-provider";
import { useCartStock } from "@/lib/hooks/useCartStock";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";

export function CartSheet() {
  const items = useCartItems();
  const isOpen = useCartIsOpen();
  const totalItems = useTotalItems();
  const { closeCart } = useCartActions();
  const { stockMap, isLoading, hasStockIssues } = useCartStock(items);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg gap-0 border-l border-zinc-100 bg-white p-0 shadow-2xl">
        <SheetHeader className="p-8 border-b border-zinc-100 bg-white">
          <SheetTitle className="flex items-center gap-4 text-2xl font-black text-black uppercase tracking-tighter">
            <div className="h-10 w-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-[#108561]" />
            </div>
            Your Selection
            <span className="ml-auto text-[10px] font-black bg-zinc-900 text-white px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-black/10">
              {totalItems} Items
            </span>
          </SheetTitle>
          {isLoading && (
            <div className="flex items-center gap-2 mt-2">
              <Loader2 className="h-3 w-3 animate-spin text-[#108561]" />
              <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Syncing with Inventory...</span>
            </div>
          )}
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center p-12 bg-zinc-50/50">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-[#108561]/5 rounded-full blur-2xl animate-pulse" />
              <ShoppingBag className="relative h-16 w-16 text-zinc-200" />
            </div>
            <h3 className="text-sm font-black text-black uppercase tracking-widest leading-none">
              Empty Selection
            </h3>
            <p className="mt-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest max-w-[200px] leading-relaxed">
              Your tech journey starts with a single component. Browse our catalog.
            </p>
            <Button
              variant="outline"
              onClick={closeCart}
              className="mt-8 rounded-2xl border-zinc-200 text-[10px] font-black uppercase tracking-widest px-8 h-12 hover:bg-black hover:text-white transition-all active:scale-95"
            >
              Start Browsing
            </Button>
          </div>
        ) : (
          <>
            {/* Stock Issues Banner */}
            {hasStockIssues && !isLoading && (
              <div className="m-8 flex items-center gap-3 rounded-[1.5rem] border border-red-100 bg-red-50/50 p-4 text-[10px] font-black uppercase tracking-widest text-red-600 shadow-sm shadow-red-900/5">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>
                  Inventory Alert: Some selections require adjustment.
                </span>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-8 py-2">
              <div className="space-y-4 divide-y divide-zinc-50">
                {items.map((item) => (
                  <div key={item.productId} className="first:pt-0 pt-4">
                    <CartItem
                      item={item}
                      stockInfo={stockMap.get(item.productId)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="p-8 bg-zinc-50/50 border-t border-zinc-100">
              <CartSummary hasStockIssues={hasStockIssues} />
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
