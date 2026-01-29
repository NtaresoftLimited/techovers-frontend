"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { HERO_DATA, HeroBanner } from "@/lib/heroData";

const BannerContent = ({ banner, size }: { banner: HeroBanner; size: "large" | "medium" | "small" }) => (
    <div className="relative w-full h-full group overflow-hidden rounded-xl">
        {/* Background Image */}
        <Image
            src={banner.image}
            alt={banner.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority={size === "large"}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        {/* Content */}
        <div className={`absolute bottom-0 left-0 w-full p-4 md:p-6 lg:p-8 flex flex-col items-start gap-2 ${banner.color === 'white' ? 'text-white' : 'text-black'}`}>
            <span className="text-xs md:text-sm font-bold tracking-wider uppercase bg-[#108561] text-white px-2 py-1 rounded">
                {banner.subtitle}
            </span>
            <h2 className={`${size === 'large' ? 'text-3xl md:text-5xl' : size === 'medium' ? 'text-2xl md:text-3xl' : 'text-xl'} font-bold leading-tight`}>
                {banner.title}
            </h2>

            {banner.buttonText && (
                <Button asChild size={size === "small" ? "sm" : "default"} className="mt-2 bg-white text-black hover:bg-zinc-200 border-none">
                    <Link href={banner.link} className="flex items-center gap-2">
                        {banner.buttonText} <ArrowRight className="w-4 h-4" />
                    </Link>
                </Button>
            )}

            {!banner.buttonText && (
                <Link href={banner.link} className="mt-1 flex items-center gap-1 text-sm font-medium hover:underline">
                    Shop Collection <ArrowRight className="w-3 h-3" />
                </Link>
            )}
        </div>
    </div>
);

export function HeroSection() {
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-auto lg:h-[500px]">

                {/* Left Zone: Main Slider (50%) */}
                <div className="lg:col-span-2 h-[300px] lg:h-full rounded-xl overflow-hidden shadow-lg">
                    <Swiper
                        spaceBetween={0}
                        centeredSlides={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={false}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="h-full w-full"
                    >
                        {HERO_DATA.mainSlider.map((banner) => (
                            <SwiperSlide key={banner.id}>
                                <BannerContent banner={banner} size="large" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Middle Zone: Side Slider (25%) */}
                <div className="hidden md:block lg:col-span-1 h-[250px] lg:h-full rounded-xl overflow-hidden shadow-md">
                    <Swiper
                        spaceBetween={0}
                        centeredSlides={true}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                        className="h-full w-full"
                    >
                        {HERO_DATA.sideSlider.map((banner) => (
                            <SwiperSlide key={banner.id}>
                                <BannerContent banner={banner} size="medium" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Right Zone: Stacked (25%) */}
                <div className="lg:col-span-1 flex flex-col gap-4 h-full">
                    {/* Top Right */}
                    <div className="flex-1 h-[200px] lg:h-auto rounded-xl overflow-hidden shadow-sm">
                        <Swiper
                            spaceBetween={0}
                            centeredSlides={true}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            modules={[Autoplay]}
                            className="h-full w-full"
                        >
                            {HERO_DATA.topRightSlider.map((banner) => (
                                <SwiperSlide key={banner.id}>
                                    <BannerContent banner={banner} size="small" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Bottom Right */}
                    <div className="flex-1 h-[200px] lg:h-auto rounded-xl overflow-hidden shadow-sm">
                        <Swiper
                            spaceBetween={0}
                            centeredSlides={true}
                            autoplay={{
                                delay: 6000,
                                disableOnInteraction: false,
                            }}
                            modules={[Autoplay]}
                            className="h-full w-full"
                        >
                            {HERO_DATA.bottomRightSlider.map((banner) => (
                                <SwiperSlide key={banner.id}>
                                    <BannerContent banner={banner} size="small" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

            </div>
        </div>
    );
}
