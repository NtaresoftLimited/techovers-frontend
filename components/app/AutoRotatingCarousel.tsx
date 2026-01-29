"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/app/ProductCard";
import { Product } from "@/lib/mockData";

interface AutoRotatingCarouselProps {
    products: Product[];
}

export function AutoRotatingCarousel({ products }: AutoRotatingCarouselProps) {
    // Ensure we have at least 10 products for a good loop, or duplicate if less
    const carouselProducts = products.length < 5 ? [...products, ...products, ...products] : products;

    return (
        <section className="py-12 bg-zinc-50 border-y border-zinc-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-zinc-900 uppercase tracking-widest text-xs mb-1">
                            Flash <span className="text-[#108561]">Deals</span>
                        </h2>
                        <p className="text-zinc-500 text-xs font-medium">Limited time offers refreshing every 10s</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="animate-pulse flex gap-1">
                            <span className="h-2 w-2 rounded-full bg-[#108561]"></span>
                            <span className="h-2 w-2 rounded-full bg-[#108561]"></span>
                            <span className="h-2 w-2 rounded-full bg-[#108561]"></span>
                        </div>
                    </div>
                </div>

                <Swiper
                    spaceBetween={24}
                    autoplay={{
                        delay: 10000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Navigation]}
                    className="w-full py-4 px-1"
                    breakpoints={{
                        320: {
                            slidesPerView: 1.2,
                            spaceBetween: 16,
                        },
                        640: {
                            slidesPerView: 2.5,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                        1280: {
                            slidesPerView: 5,
                            spaceBetween: 24,
                        },
                    }}
                >
                    {carouselProducts.map((product, index) => (
                        <SwiperSlide key={`${product._id}-${index}`} className="h-auto">
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
