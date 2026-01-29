"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useState, use } from "react";
import { getProductBySlug, getFeaturedProducts } from "@/lib/mockData";
import { ProductGallery } from "@/components/app/ProductGallery";
// Note: For testing iPhone products, a slug like 'apple-20w-power-adapter' might be used. Example URL: http://localhost:3000/products/apple-20w-power-adapter
import { ProductInfo } from "@/components/app/ProductInfo";
import { ProductSpecs } from "@/components/app/ProductSpecs";
import { ProductFAQ } from "@/components/app/ProductFAQ";
import { ProductCard } from "@/components/app/ProductCard";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  const [selectedVariantImage, setSelectedVariantImage] = useState<string | null>(null);

  // Mock data fetch
  const product = getProductBySlug(slug);
  const similarProducts = getFeaturedProducts().filter(p => p.slug !== slug).slice(0, 4);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start transition-all">
          {/* Image Gallery */}
          <ProductGallery
            images={product.images}
            productName={product.name}
            selectedVariantImage={selectedVariantImage}
          />

          {/* Product Info */}
          <div className="lg:sticky lg:top-32">
            <ProductInfo
              product={product as any}
              onVariantChange={(variant) => setSelectedVariantImage(variant.image || null)}
            />

            <div className="mt-12 space-y-2 lg:mt-16">
              <ProductSpecs specifications={product.specifications || []} features={product.features} />
              <ProductFAQ faqs={product.faqs || []} />
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-32 pt-24 border-t border-zinc-100">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-4xl font-black text-black uppercase tracking-tighter sm:text-5xl leading-none">
              More <span className="text-[#108561]">Innovations</span>
            </h2>
            <Link href="/products" className="text-xs font-black uppercase tracking-widest text-[#108561] hover:underline">
              See Full Inventory
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {similarProducts.map((p) => (
              <ProductCard key={p._id} product={p as any} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

