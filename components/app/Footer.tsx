import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-zinc-950 border-t border-white/5 pt-20 pb-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block">
                            <div className="relative h-12 w-32 overflow-hidden">
                                <Image
                                    src="/logo.png"
                                    alt="TechOvers Logo"
                                    fill
                                    className="object-contain object-left"
                                />
                            </div>
                        </Link>
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
                            TechOvers is Tanzania&apos;s leading destination for premium electronics, professional gadgets, and high-fidelity accessories.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 text-zinc-400 hover:bg-[#108561] hover:text-white transition-all">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 text-zinc-400 hover:bg-[#108561] hover:text-white transition-all">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 text-zinc-400 hover:bg-[#108561] hover:text-white transition-all">
                                <Twitter className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Electronics</h3>
                        <ul className="space-y-4">
                            <li><Link href="/?category=smartphones" className="text-zinc-400 text-sm hover:text-[#108561] transition-colors">Smartphones</Link></li>
                            <li><Link href="/?category=audio" className="text-zinc-400 text-sm hover:text-[#108561] transition-colors">Premium Audio</Link></li>
                            <li><Link href="/?category=computing" className="text-zinc-400 text-sm hover:text-[#108561] transition-colors">Computing & Hubs</Link></li>
                            <li><Link href="/?category=wearables" className="text-zinc-400 text-sm hover:text-[#108561] transition-colors">Smart Wearables</Link></li>
                            <li><Link href="/?category=chargers" className="text-zinc-400 text-sm hover:text-[#108561] transition-colors">Fast Charging</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Support</h3>
                        <ul className="space-y-4">
                            <li><Link href="/orders" className="text-zinc-400 text-sm hover:text-[#108561] transition-colors">Track Your Order</Link></li>
                            <li><Link href="#" className="text-zinc-400 text-sm hover:text-[#108561] transition-colors">Shipping & Delivery</Link></li>
                            <li><Link href="#" className="text-zinc-400 text-sm hover:text-[#108561] transition-colors">Returns & Exchanges</Link></li>
                            <li><Link href="#" className="text-zinc-400 text-sm hover:text-[#108561] transition-colors">Warranty Policy</Link></li>
                            <li><Link href="#" className="text-zinc-400 text-sm hover:text-[#108561] transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Contact Us</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <MapPin className="h-5 w-5 text-[#108561] shrink-0" />
                                <p className="text-zinc-400 text-sm">Dar es Salaam, Tanzania<br />Premium Tech Hub</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone className="h-5 w-5 text-[#108561] shrink-0" />
                                <p className="text-zinc-400 text-sm">+255 700 000 000</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail className="h-5 w-5 text-[#108561] shrink-0" />
                                <p className="text-zinc-400 text-sm">support@techovers.co.tz</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-zinc-500 text-xs">
                        © {new Date().getFullYear()} TechOvers Tanzania. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="text-zinc-600 text-[10px] uppercase tracking-widest">Premium Partner of</span>
                        <div className="flex items-center gap-4 opacity-30 grayscale invert">
                            <div className="relative h-4 w-12">
                                <Image src="/brands/Apple-brandpage-menu-logo-1-1.png" alt="Apple" fill className="object-contain" />
                            </div>
                            <div className="relative h-4 w-15">
                                <Image src="/brands/Samsung-Logo-100x100.png" alt="Samsung" fill className="object-contain" />
                            </div>
                            <div className="relative h-4 w-12">
                                <Image src="/brands/HPIoutlinelogorgb72MD-1.png" alt="HP" fill className="object-contain" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
