"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: any[] | null;
  productName: string | null;
  selectedVariantImage?: string | null;
}

export function ProductGallery({ images, productName, selectedVariantImage }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Update selected index if variant image changes
  useEffect(() => {
    if (selectedVariantImage && images) {
      const index = images.findIndex(img => img.asset?.url === selectedVariantImage);
      if (index !== -1) {
        setSelectedIndex(index);
      }
    }
  }, [selectedVariantImage, images]);

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-[2.5rem] bg-zinc-50 border border-zinc-100 p-12">
        <span className="text-zinc-400 font-black uppercase tracking-widest text-[10px]">No visuals available</span>
      </div>
    );
  }

  const selectedImage = images[selectedIndex];

  return (
    <div className="flex flex-col-reverse gap-6 lg:flex-row lg:items-start lg:gap-8 transition-all">
      {/* Thumbnail Grid - Vertical on Desktop */}
      <div className="grid grid-cols-4 gap-4 lg:flex lg:w-20 lg:flex-col lg:gap-4 shrink-0">
        {images.map((image, index) => (
          <button
            key={image._key || index}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className={cn(
              "group relative aspect-square overflow-hidden rounded-2xl border-2 transition-all duration-500",
              selectedIndex === index
                ? "border-[#108561] bg-white shadow-xl shadow-emerald-900/10 scale-105 z-10"
                : "border-zinc-100 bg-zinc-50 hover:border-zinc-200"
            )}
          >
            {image.asset?.url ? (
              <Image
                src={image.asset.url}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-contain p-2 transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-[8px] font-black text-zinc-300">
                LOCKED
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Main Image Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-[3rem] border border-zinc-100 bg-zinc-50/50 p-12 group">
        <div className="absolute inset-0 bg-white/40 pointer-events-none" />

        <div className="relative h-full w-full flex items-center justify-center bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-zinc-100 overflow-hidden">
          {selectedImage?.asset?.url ? (
            <Image
              src={selectedImage.asset.url}
              alt={productName ?? "Product image"}
              fill
              className="object-contain p-12 transition-transform duration-1000 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-zinc-300 font-black uppercase text-[10px] tracking-widest">
              Missing Asset
            </div>
          )}
        </div>

        {/* Exclusive Badge */}
        <div className="absolute top-10 left-10">
          <div className="bg-black text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#108561] animate-pulse" />
            Certified Authentic
          </div>
        </div>
      </div>
    </div>
  );
}
