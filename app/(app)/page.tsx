import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getAllProducts,
  getAllCategories,
  getFeaturedProducts,
  searchProducts,
  getAllBrands
} from "@/lib/mockData";
import { ProductSection } from "@/components/app/ProductSection";
import { FeaturedCarousel } from "@/components/app/FeaturedCarousel";
import { FeaturedCarouselSkeleton } from "@/components/app/FeaturedCarouselSkeleton";
import { BrandsSection } from "@/components/app/BrandsSection";
import { CategoryTiles } from "@/components/app/CategoryTiles";
import { CollectionHub } from "@/components/app/CollectionHub";
import { DealBanners } from "@/components/app/DealBanners";
import { HeroSection } from "@/components/app/HeroSection";
import { AutoRotatingCarousel } from "@/components/app/AutoRotatingCarousel";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;

  const searchQuery = params.q ?? "";
  const categorySlug = params.category ?? "";

  // Mock Data Fetching
  const allProducts = searchQuery ? searchProducts(searchQuery) : getAllProducts();
  const categories = getAllCategories();
  const featuredProducts = getFeaturedProducts();
  const brands = getAllBrands();

  // Filter by category if slug is present
  const products = categorySlug
    ? allProducts.filter(p => p.category?.slug === categorySlug)
    : allProducts;

  // Limit products on home page if not searching/filtering
  const displayedProducts = (searchQuery || categorySlug) ? products : products.slice(0, 8);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Noon-style Collection Hub */}
      <CollectionHub categories={categories} />

      {/* Feature / Deal Banners */}
      <DealBanners />

      {/* Auto-Rotating 10s Carousel */}
      <AutoRotatingCarousel products={featuredProducts as any} />

      {/* Featured Innovations */}
      {featuredProducts.length > 0 && !searchQuery && !categorySlug && (
        <section className="py-24 bg-zinc-950/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12 flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-white uppercase tracking-widest text-xs">
              Trending <span className="text-[#108561]">Innovations</span>
            </h2>
          </div>
          <Suspense fallback={<FeaturedCarouselSkeleton />}>
            <FeaturedCarousel products={featuredProducts as any} />
          </Suspense>
        </section>
      )}

      {/* Main Inventory Section */}
      <section id="inventory" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <h2 className="text-3xl font-black tracking-tight text-white uppercase sm:text-4xl leading-none mb-2">
              {searchQuery ? "Search Results" : categorySlug ? `${categorySlug} collection` : "The Electronics Catalog"}
            </h2>
            <div className="h-1 w-20 bg-[#108561] mb-6" />
            <p className="text-zinc-500 uppercase tracking-widest text-[10px] font-black">
              {products.length} Professional products available
            </p>
          </div>

          <ProductSection
            categories={categories as any}
            products={displayedProducts as any}
            searchQuery={searchQuery}
          />

          {!searchQuery && !categorySlug && allProducts.length > 8 && (
            <div className="mt-20 text-center">
              <Button asChild size="lg" variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-full px-12 h-16 font-black uppercase tracking-widest text-xs transition-all active:scale-95">
                <Link href="/products">Explore Full Catalog</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Global Brands */}
      <BrandsSection brands={brands} />
    </div>
  );
}
