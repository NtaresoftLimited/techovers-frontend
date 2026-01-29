"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatPrice } from "@/lib/utils";
import { AddToCartButton } from "@/components/app/AddToCartButton";
import { StockBadge } from "@/components/app/StockBadge";
import type { FILTER_PRODUCTS_BY_NAME_QUERYResult } from "@/sanity.types";

interface Product {
  _id: string;
  _type?: "product";
  name: string | null;
  price: number | null;
  description?: string;
  slug: string | null;
  imageUrl?: string;
  images?: any[] | null;
  category?: { title: string | null } | null;
  brand?: { name: string | null; logo: string | null } | null;
  stock?: number;
  isExpress?: boolean;
  isBestseller?: boolean;
  discountPercentage?: number;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(null);

  const images = product.images ?? [];
  const mainImageUrl = images[0]?.asset?.url;
  const displayedImageUrl = hoveredImageIndex !== null ? images[hoveredImageIndex]?.asset?.url : mainImageUrl;

  const stock = product.stock ?? 0;
  const isOutOfStock = stock <= 0;
  const hasMultipleImages = images.length > 1;

  // Pricing with discounts
  const productPrice = product.price ?? 0;
  const hasDiscount = (product.discountPercentage ?? 0) > 0;
  const originalPrice = hasDiscount ? productPrice / (1 - (product.discountPercentage! / 100)) : productPrice;

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-zinc-50 bg-white p-0 shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
      <Link href={`/products/${product.slug ?? "#"}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-white p-8">
          {displayedImageUrl ? (
            <div className="relative h-full w-full bg-white rounded-[2rem] overflow-hidden flex items-center justify-center p-4 transition-all duration-500 group-hover:scale-110">
              <Image
                src={displayedImageUrl}
                alt={product.name ?? "Product image"}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-zinc-100">
              <span className="text-[10px] uppercase font-black tracking-tighter opacity-10 leading-none">TECH<br />ASSET</span>
            </div>
          )}

          {/* Badges Overlay */}
          <div className="absolute left-6 top-6 flex flex-col gap-2 z-10">
            {product.isExpress && (
              <div className="flex items-center gap-1.5 bg-zinc-900 text-white rounded-full pl-1 pr-4 py-1 shadow-xl shadow-black/20 ring-1 ring-white/10">
                <div className="bg-[#feee00] text-black rounded-full text-[9px] font-black w-5 h-5 flex items-center justify-center shadow-inner">N</div>
                <span className="text-[9px] font-black uppercase tracking-widest text-white">Express</span>
              </div>
            )}
            {product.isBestseller && (
              <div className="bg-[#108561] text-white text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg shadow-emerald-900/10 self-start">
                Ranked #1
              </div>
            )}
          </div>

          {/* Discount Sticker */}
          {hasDiscount && (
            <div className="absolute top-6 right-6 bg-[#108561] text-white text-[10px] font-black uppercase w-12 h-12 flex flex-col items-center justify-center rounded-full shadow-lg shadow-emerald-900/20 rotate-12 transition-transform group-hover:rotate-0">
              <span className="leading-none">-{product.discountPercentage}%</span>
            </div>
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 z-20 bg-white/40 backdrop-blur-sm flex items-center justify-center p-8">
              <div className="bg-white/80 border border-zinc-100 rounded-2xl px-6 py-3 shadow-xl backdrop-blur-md">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Inventory Depleted</span>
              </div>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="flex grow flex-col justify-between gap-6 p-8 bg-white">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            {product.brand?.name && (
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#108561]">
                {product.brand.name}
              </span>
            )}
            {product.category?.title && (
              <span className="text-[8px] font-black uppercase tracking-widest text-zinc-300">
                {product.category.title}
              </span>
            )}
          </div>
          <Link href={`/products/${product.slug ?? "#"}`} className="block">
            <h3 className="line-clamp-2 text-sm font-bold text-black leading-snug tracking-tight">
              {product.name ?? "Unknown Product"}
            </h3>
          </Link>
        </div>

        <div className="space-y-4">
          <div className="flex items-baseline gap-3">
            <p className="text-2xl font-black tracking-tightest text-black">
              {formatPrice(productPrice)}
            </p>
            {hasDiscount && (
              <p className="text-xs text-zinc-400 line-through font-bold tracking-tight">
                {formatPrice(originalPrice)}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between min-h-[20px]">
            <StockBadge productId={product._id} stock={stock} />
            {!isOutOfStock && (
              <div className="flex items-center gap-1">
                <div className="h-1 w-1 bg-[#108561] rounded-full animate-ping" />
                <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Live in TZA</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-8 pt-0 bg-white">
        <AddToCartButton
          productId={product._id}
          name={product.name ?? "Unknown Product"}
          price={product.price ?? 0}
          image={mainImageUrl ?? undefined}
          stock={stock}
          className="w-full h-14 bg-zinc-900 hover:bg-black text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-black/10 active:scale-95 transition-all"
        />
      </CardFooter>
    </Card>
  );
}
