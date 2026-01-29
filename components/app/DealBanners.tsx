"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function DealBanners() {
    const banners = [
        {
            id: 1,
            title: "Work from Home Essentials",
            subtitle: "Professional Laptops & Setup",
            offer: "Up to 25% Off",
            image: "/banner-laptops.png",
            href: "/?category=laptops",
            dark: true,
        },
        {
            id: 2,
            title: "Premium Audio Experience",
            subtitle: "True High-Fidelity Sound",
            offer: "New Arrivals",
            image: "/banner-audio.png",
            href: "/?category=audio",
            dark: false,
        }
    ];

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {banners.map((banner) => (
                    <Link
                        key={banner.id}
                        href={banner.href}
                        className={`group relative h-64 w-full overflow-hidden rounded-3xl ${banner.dark ? "bg-zinc-900" : "bg-white"}`}
                    >
                        <Image
                            src={banner.image}
                            alt={banner.title}
                            fill
                            className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className={`absolute inset-0 p-10 flex flex-col justify-center ${banner.dark ? "text-white" : "text-black"}`}>
                            <div className="max-w-[180px]">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 opacity-70">
                                    {banner.subtitle}
                                </p>
                                <h3 className="text-2xl font-black uppercase tracking-tight mb-4 leading-none">
                                    {banner.title}
                                </h3>
                                <div className={`inline-block px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${banner.dark ? "bg-[#108561] text-white" : "bg-black text-white"}`}>
                                    {banner.offer}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
