"use client";

import Link from "next/link";
import Image from "next/image";
import { Category } from "@/lib/mockData";

interface CollectionHubProps {
    categories: Category[];
}

export function CollectionHub({ categories }: CollectionHubProps) {
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold tracking-tight text-white uppercase tracking-widest text-xs">
                    Exclusive <span className="text-[#108561]">Collections</span>
                </h2>
                <Link href="/products" className="text-[10px] font-bold uppercase tracking-widest text-[#108561] hover:underline">
                    See All
                </Link>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 md:gap-10">
                {categories.map((category) => (
                    <Link
                        key={category._id}
                        href={`/?category=${category.slug}`}
                        className="group flex flex-col items-center gap-3 transition-transform hover:scale-105"
                    >
                        <div className="relative h-16 w-16 md:h-24 md:w-24 overflow-hidden rounded-full bg-white p-2 shadow-lg ring-1 ring-white/10 group-hover:ring-[#108561]/50 transition-all">
                            {category.icon ? (
                                <Image
                                    src={category.icon}
                                    alt={category.title}
                                    fill
                                    className="object-contain p-2"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-white text-[10px] font-bold uppercase">
                                    {category.title.substring(0, 2)}
                                </div>
                            )}
                        </div>
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors text-center whitespace-nowrap">
                            {category.title}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
