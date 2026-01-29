"use client";

import Link from "next/link";
import Image from "next/image";
import { Package, ShoppingBag, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartActions, useTotalItems } from "@/lib/store/cart-store-provider";
import { useChatActions, useIsChatOpen } from "@/lib/store/chat-store-provider";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function Header() {
  const { openCart } = useCartActions();
  const { openChat } = useChatActions();
  const isChatOpen = useIsChatOpen();
  const totalItems = useTotalItems();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative h-12 w-32 overflow-hidden">
            <Image
              src="/logo.png"
              alt="TechOvers Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* My Orders - Only when signed in */}
          <SignedIn>
            <Button asChild variant="ghost" className="text-white hover:bg-white/10 hidden md:flex items-center gap-2">
              <Link href="/orders">
                <Package className="h-5 w-5" />
                <span className="text-sm font-medium">Orders</span>
              </Link>
            </Button>
            {/* Mock Loyalty Points */}
            <div className="hidden lg:flex items-center gap-1 bg-[#108561]/10 px-3 py-1.5 rounded-full border border-[#108561]/20">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#108561]">2,450 PTS</span>
            </div>
          </SignedIn>

          {/* AI Shopping Assistant */}
          {!isChatOpen && (
            <Button
              onClick={openChat}
              className="gap-2 bg-[#108561] text-white hover:bg-[#0d6e50] shadow-lg shadow-emerald-900/20"
            >
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline text-sm font-medium">Ask AI</span>
            </Button>
          )}

          {/* Cart Button */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-white hover:bg-white/10"
            onClick={openCart}
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#108561] text-[10px] font-bold text-white">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
            <span className="sr-only">Open cart ({totalItems} items)</span>
          </Button>

          {/* User Auth */}
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9 border border-white/20",
                  userButtonPopoverCard: "bg-zinc-950 border border-white/10 text-white",
                  userButtonPopoverActionButtonText: "text-white",
                  userButtonPopoverFooter: "hidden"
                }
              }}
            />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <User className="h-5 w-5" />
                <span className="sr-only">Sign in</span>
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
