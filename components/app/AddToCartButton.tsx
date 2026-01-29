"use client";

import { Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCartActions, useCartItem } from "@/lib/store/cart-store-provider";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  productId: string;
  name: string;
  price: number;
  image?: string;
  stock: number;
  className?: string;
}

export function AddToCartButton({
  productId,
  name,
  price,
  image,
  stock,
  className,
}: AddToCartButtonProps) {
  const { addItem, updateQuantity } = useCartActions();
  const cartItem = useCartItem(productId);

  const quantityInCart = cartItem?.quantity ?? 0;
  const isOutOfStock = stock <= 0;
  const isAtMax = quantityInCart >= stock;

  const handleAdd = () => {
    if (quantityInCart < stock) {
      addItem({ productId, name, price, image }, 1);
      toast.success(`Added ${name}`);
    }
  };

  const handleDecrement = () => {
    if (quantityInCart > 0) {
      updateQuantity(productId, quantityInCart - 1);
    }
  };

  // Out of stock
  if (isOutOfStock) {
    return (
      <Button
        disabled
        variant="secondary"
        className={cn("h-11 w-full", className)}
      >
        Out of Stock
      </Button>
    );
  }

  // Not in cart - show Add to Basket button
  if (quantityInCart === 0) {
    return (
      <Button
        onClick={handleAdd}
        className={cn(
          "h-14 w-full bg-[#108561] text-white hover:bg-[#0d6e50] border-0 text-lg font-bold uppercase tracking-widest transition-all duration-300 rounded-xl shadow-lg shadow-emerald-900/20",
          className
        )}
      >
        <ShoppingBag className="mr-2 h-5 w-5" />
        Add to Basket
      </Button>
    );
  }

  // In cart - show quantity controls
  return (
    <div
      className={cn(
        "flex h-11 w-full items-center rounded-md border border-white/10 bg-zinc-900",
        className,
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="h-full flex-1 rounded-r-none text-white hover:bg-white/5"
        onClick={handleDecrement}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="flex-1 text-center text-sm font-semibold tabular-nums text-white">
        {quantityInCart}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="h-full flex-1 rounded-l-none text-[#108561] hover:bg-white/5 disabled:opacity-20"
        onClick={handleAdd}
        disabled={isAtMax}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
