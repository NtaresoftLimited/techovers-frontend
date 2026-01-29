"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, formatPrice } from "@/lib/utils";
import type { FEATURED_PRODUCTS_QUERYResult } from "@/sanity.types";

type FeaturedProduct = FEATURED_PRODUCTS_QUERYResult[number];

interface FeaturedCarouselProps {
  products: FEATURED_PRODUCTS_QUERYResult;
}

export function FeaturedCarousel({ products }: FeaturedCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full bg-black">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: "start",
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {products.map((product) => (
            <CarouselItem key={product._id} className="pl-0">
              <FeaturedSlide product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation arrows */}
        <CarouselPrevious className="left-4 border-white/10 bg-black/40 text-white hover:bg-[#108561] hover:text-white sm:left-8 backdrop-blur-md" />
        <CarouselNext className="right-4 border-white/10 bg-black/40 text-white hover:bg-[#108561] hover:text-white sm:right-8 backdrop-blur-md" />
      </Carousel>

      {/* Dot indicators */}
      {count > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-6">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={`dot-${index}`}
              type="button"
              onClick={() => scrollTo(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                current === index
                  ? "w-8 bg-[#108561]"
                  : "w-2 bg-white/20 hover:bg-white/40",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface FeaturedSlideProps {
  product: FeaturedProduct;
}

function FeaturedSlide({ product }: FeaturedSlideProps) {
  const mainImage = product.images?.[0]?.asset?.url;

  return (
    <div className="flex min-h-[500px] flex-col md:min-h-[600px] md:flex-row items-center border-b border-white/5">
      {/* Image Section */}
      <div className="relative h-[300px] w-full md:h-[600px] md:w-1/2 overflow-hidden">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={product.name ?? "Featured product"}
            fill
            className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-zinc-900">
            <span className="text-zinc-700 font-bold tracking-widest uppercase text-xs">Innovation Preview</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:hidden" />
      </div>

      {/* Content Section */}
      <div className="flex w-full flex-col justify-center px-6 py-12 md:w-1/2 md:px-16 lg:px-24">
        {product.category && (
          <Badge
            className="mb-6 w-fit bg-[#108561]/10 text-[#108561] border-[#108561]/20 px-3 py-1 font-bold uppercase tracking-widest text-[10px]"
          >
            {product.category.title}
          </Badge>
        )}

        <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl">
          {product.name}
        </h2>

        {product.description && (
          <p className="mt-6 line-clamp-3 text-lg text-zinc-400 sm:text-xl leading-relaxed">
            {product.description}
          </p>
        )}

        <div className="mt-8 flex items-baseline gap-4">
          <span className="text-4xl font-black text-[#108561]">{formatPrice(product.price)}</span>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-[#108561] text-white hover:bg-[#0d6e50] px-10 rounded-full h-14 font-bold uppercase tracking-widest text-xs"
          >
            <Link href={`/products/${product.slug}`}>
              Buy Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
