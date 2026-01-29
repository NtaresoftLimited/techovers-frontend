"use client";

import Link from "next/link";
import { useState } from "react";
import { AddToCartButton } from "@/components/app/AddToCartButton";
import { AskAISimilarButton } from "@/components/app/AskAISimilarButton";
import { StockBadge } from "@/components/app/StockBadge";
import { formatPrice, cn } from "@/lib/utils";
import { ShieldCheck, Truck, RotateCcw, Award, ChevronRight } from "lucide-react";

interface ProductInfoProps {
  product: any;
  onVariantChange?: (variant: { color: string; image?: string; condition: string }) => void;
}

export function ProductInfo({ product, onVariantChange }: ProductInfoProps) {
  // Initial selections map (Option Name -> Value)
  const [selections, setSelections] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.variants?.forEach((v: any) => {
      initial[v.name] = v.values?.[0] || "";
    });
    return initial;
  });

  // Find matching SKU based on current selections
  const currentSku = product.skus?.find((sku: any) => {
    return product.variants?.every((v: any) => {
      // SKU code format expected: "Color:Red|Size:M"
      // or we can match simpler logical rules if code isn't structured.
      // For now, assuming SKU code contains the value substrings or we use a strict matching logic if implemented.
      // A more robust way is to exact match if codes are generated deterministically.
      // Let's assume the SKU code includes the option values.
      return sku.code.includes(selections[v.name]);
    });
  }) || product.skus?.[0]; // Fallback

  const currentPrice = currentSku?.price ?? product.price;
  const currentStock = currentSku?.stock ?? product.stock;
  const currentImage = currentSku?.image?.asset?.url ?? product.images?.[0]?.asset?.url;

  // Notify parent of variant change (for image gallery update)
  const handleSelectionChange = (optionName: string, value: string) => {
    const newSelections = { ...selections, [optionName]: value };
    setSelections(newSelections);

    // Find new SKU to get image
    const newSku = product.skus?.find((sku: any) =>
      product.variants?.every((v: any) => sku.code.includes(newSelections[v.name]))
    );

    onVariantChange?.({
      color: newSelections["Color"] || "",
      image: newSku?.image?.asset?.url,
      condition: "new" // Legacy adaptation, strict to new for now
    });
  };

  // Pricing logic with SKU overriding
  const hasDiscount = (product.discountPercentage ?? 0) > 0;
  const originalPrice = hasDiscount ? currentPrice / (1 - (product.discountPercentage! / 100)) : currentPrice;

  return (
    <div className="flex flex-col space-y-10">
      <nav className="flex items-center space-x-2 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">
        <Link href="/" className="hover:text-black">Home</Link>
        <ChevronRight className="h-2.5 w-2.5" />
        {product.category && (
          <>
            <Link href={`/?category=${product.category.slug}`} className="hover:text-black">
              {product.category.title}
            </Link>
            <ChevronRight className="h-2.5 w-2.5" />
          </>
        )}
        <span className="text-zinc-800 truncate">{product.name}</span>
      </nav>

      <div>
        <div className="flex items-center gap-2 mb-3">
          {product.brand && (
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#108561]">
              {product.brand.name}
            </p>
          )}
          {product.isExpress && (
            <div className="flex items-center gap-1 bg-zinc-900 text-white rounded-full pl-1 pr-3 py-0.5 shadow-sm">
              <div className="bg-[#feee00] text-black rounded-full text-[8px] font-black w-3.5 h-3.5 flex items-center justify-center">N</div>
              <span className="text-[8px] font-black uppercase tracking-widest text-[#feee00]">Now Express</span>
            </div>
          )}
          {product.isDigital && (
            <div className="flex items-center gap-1 bg-blue-600 text-white rounded-full pl-2 pr-3 py-0.5 shadow-sm">
              <span className="text-[8px] font-black uppercase tracking-widest">Digital Download</span>
            </div>
          )}
        </div>

        <h1 className="text-4xl font-black text-zinc-900 tracking-tight leading-none uppercase lg:text-5xl">
          {product.name}
        </h1>

        <div className="mt-8 flex flex-col gap-1">
          <div className="flex items-baseline space-x-4">
            <span className="text-4xl font-black text-black tracking-tighter">
              {formatPrice(currentPrice)}
            </span>
            {hasDiscount && (
              <span className="text-lg text-zinc-300 line-through font-bold">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
          {hasDiscount && (
            <span className="text-xs font-black bg-red-100 text-red-600 px-3 py-1 rounded-full w-fit uppercase tracking-widest">
              Save {product.discountPercentage}% Today
            </span>
          )}
          {/* Club Points Display */}
          <div className="flex items-center gap-2 mt-2">
            <div className="bg-emerald-50 text-[#108561] px-3 py-1 rounded-full flex items-center gap-1.5 border border-emerald-100">
              <span className="text-[10px] font-black uppercase tracking-widest">
                Earn {(product.clubPoints || Math.floor(currentPrice / 1000)).toLocaleString()} Club Points
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-zinc-100" />

      {/* Dynamic Variants Selection */}
      {product.variants?.map((variant: any) => (
        <div key={variant.name} className="space-y-4">
          <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
            Select {variant.name}: <span className="text-black">{selections[variant.name]}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {variant.values.map((val: string) => {
              const isSelected = selections[variant.name] === val;
              // Special styling for Color options if needed, but keeping it uniform for simplicity first
              return (
                <button
                  key={val}
                  onClick={() => handleSelectionChange(variant.name, val)}
                  className={cn(
                    "px-6 py-4 text-xs font-black rounded-2xl border-2 transition-all uppercase tracking-widest",
                    isSelected
                      ? "bg-zinc-900 text-white border-zinc-900 shadow-lg"
                      : "bg-white text-zinc-500 border-zinc-100 hover:border-zinc-300"
                  )}
                >
                  {val}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Legacy Fallback for Mock Data (Condition/Storage if not in variants) */}
      {!product.variants && (
        <>
          {/* Legacy Condition Selection */}
          <div className="space-y-4">
            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              Condition
            </div>
            <div className="flex gap-2">
              {["new", "excellent", "good"].map((cond) => (
                <button key={cond} className="px-6 py-4 text-[10px] font-black rounded-2xl border-2 bg-white text-zinc-400 border-zinc-100 uppercase tracking-widest">{cond}</button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Action Buttons */}
      <div className="space-y-4 pt-4">
        <AddToCartButton
          productId={product._id}
          name={product.name ?? "Unknown Product"}
          price={currentPrice ?? 0}
          image={currentImage ?? undefined}
          stock={currentStock ?? 0}
          className="h-16 text-xs font-black uppercase tracking-widest rounded-2xl bg-[#108561] shadow-xl shadow-emerald-900/10 hover:bg-[#0d6e50] active:scale-95 transition-all"
        />
        <AskAISimilarButton productName={product.name ?? "this product"} />
      </div>

      {/* Localized TZA Trust Badges */}
      <div className="grid grid-cols-2 gap-4 pt-10 border-t border-zinc-100">
        {[
          { icon: ShieldCheck, label: "TechOvers Certified" },
          { icon: Award, label: "12 Months TZA Warranty" },
          { icon: Truck, label: "Express Dar es Salaam" },
          { icon: RotateCcw, label: "Official Tech Returns" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 bg-[#f7f7f7] p-4 rounded-2xl border border-zinc-100/50">
            <item.icon className="h-5 w-5 text-[#108561] shrink-0" />
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600 leading-tight">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
