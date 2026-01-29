import Image from "next/image";
import Link from "next/link";
import { type Brand } from "@/lib/mockData";

interface BrandsSectionProps {
    brands: Brand[];
}

export function BrandsSection({ brands }: BrandsSectionProps) {
    return (
        <section className="bg-black py-24 border-t border-white/5">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Trusted by <span className="text-[#108561]">Global Brands</span>
                    </h2>
                    <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
                        We partner with the world's leading technology manufacturers to bring you only the most reliable and innovative gadgets.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5 items-center justify-items-center">
                    {brands.map((brand) => (
                        <Link
                            key={brand._id}
                            href={`/?q=${brand.name.toLowerCase()}`}
                            className="group relative flex items-center justify-center p-8 grayscale transition-all duration-300 hover:grayscale-0 bg-zinc-900/40 rounded-2xl border border-white/5 hover:border-[#108561]/30 hover:bg-zinc-900/60"
                        >
                            <div className="relative h-12 w-32">
                                <Image
                                    src={brand.logo}
                                    alt={brand.name}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 50vw, 20vw"
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
