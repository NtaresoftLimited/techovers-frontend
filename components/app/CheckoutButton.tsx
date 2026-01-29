"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCartItems } from "@/lib/store/cart-store-provider";
import { createCheckoutSession } from "@/lib/actions/checkout";
import { cn } from "@/lib/utils";

interface CheckoutButtonProps {
  disabled?: boolean;
  className?: string;
}

export function CheckoutButton({ disabled, className }: CheckoutButtonProps) {
  const router = useRouter();
  const items = useCartItems();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = () => {
    setError(null);

    startTransition(async () => {
      const result = await createCheckoutSession(items);

      if (result.success && result.url) {
        // Redirect to Stripe Checkout
        router.push(result.url);
      } else {
        setError(result.error ?? "Checkout failed");
        toast.error("Checkout Error", {
          description: result.error ?? "Something went wrong",
        });
      }
    });
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={handleCheckout}
        disabled={disabled || isPending || items.length === 0}
        size="lg"
        className={cn(
          "w-full h-14 bg-[#108561] hover:bg-[#0d6e50] text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-emerald-900/10 active:scale-95 transition-all disabled:opacity-50 disabled:bg-zinc-100 disabled:text-zinc-400",
          className
        )}
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Initializing Terminal...
          </>
        ) : (
          <>
            <CreditCard className="mr-3 h-5 w-5" />
            Initialize Payment
          </>
        )}
      </Button>
      {error && (
        <p className="text-[10px] font-black text-red-600 uppercase tracking-widest text-center bg-red-50 p-3 rounded-xl border border-red-100">
          Error: {error}
        </p>
      )}
    </div>
  );
}
