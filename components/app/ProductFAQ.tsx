"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FAQ {
    question: string;
    answer: string;
}

interface ProductFAQProps {
    faqs: FAQ[];
}

export function ProductFAQ({ faqs }: ProductFAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    if (!faqs.length) return null;

    return (
        <div className="border-t border-zinc-100 py-10">
            <h2 className="text-sm font-black text-black uppercase tracking-[0.2em] mb-8">Frequently Asked <span className="text-[#108561]">Questions</span></h2>
            <div className="space-y-4">
                {faqs.map((faq, i) => (
                    <div key={i} className="rounded-3xl border border-zinc-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                        <button
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="flex w-full items-center justify-between p-6 text-left hover:bg-zinc-50 transition-colors group"
                        >
                            <span className="text-xs font-black uppercase tracking-widest text-zinc-700 group-hover:text-black">{faq.question}</span>
                            <div className={cn("h-8 w-8 rounded-full flex items-center justify-center transition-all", openIndex === i ? "bg-black text-white" : "bg-zinc-50 text-zinc-400 group-hover:bg-zinc-100")}>
                                {openIndex === i ? (
                                    <ChevronUp className="h-3.5 w-3.5" />
                                ) : (
                                    <ChevronDown className="h-3.5 w-3.5" />
                                )}
                            </div>
                        </button>
                        <div
                            className={cn(
                                "overflow-hidden transition-all duration-500 ease-in-out",
                                openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                            )}
                        >
                            <div className="p-6 pt-0 text-[11px] font-bold uppercase tracking-widest text-zinc-400 leading-relaxed border-t border-zinc-50 bg-zinc-50/30">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
