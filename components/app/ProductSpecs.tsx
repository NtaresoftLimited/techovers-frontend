"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Spec {
    label: string;
    value: string;
}

interface ProductSpecsProps {
    specifications: Spec[];
    features?: string[];
}

export function ProductSpecs({ specifications, features }: ProductSpecsProps) {
    const [isOpen, setIsOpen] = useState(true);

    if (!specifications.length && !features?.length) return null;

    return (
        <div className="border-t border-zinc-100 py-10 mt-10">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between text-left group transition-all"
            >
                <div>
                    <h2 className="text-sm font-black text-black uppercase tracking-[0.2em]">Technical Specifications</h2>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1 group-hover:text-black transition-colors">
                        Engineering Details & Professional Features
                    </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                    {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
            </button>

            <div className={cn("mt-10 overflow-hidden transition-all duration-700 ease-in-out", isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0")}>
                {features && features.length > 0 && (
                    <div className="mb-12">
                        <ul className="grid gap-6 sm:grid-cols-2">
                            {features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-4 bg-zinc-50 p-4 rounded-2xl border border-zinc-100/50 group hover:border-[#108561]/30 transition-all">
                                    <div className="h-2 w-2 shrink-0 rounded-full bg-[#108561] shadow-[0_0_10px_rgba(16,133,97,0.4)]" />
                                    <span className="text-[11px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-black transition-colors">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="grid gap-x-12 gap-y-2 sm:grid-cols-2">
                    {specifications.map((spec, i) => (
                        <div key={i} className="flex justify-between items-center border-b border-zinc-50 py-4 group">
                            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest group-hover:text-zinc-600 transition-colors">{spec.label}</span>
                            <span className="text-xs font-black text-black uppercase tracking-tight">{spec.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
