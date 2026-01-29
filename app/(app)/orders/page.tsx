import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { Package, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { sanityFetch } from "@/sanity/lib/live";
import { ORDERS_BY_USER_QUERY } from "@/lib/sanity/queries/orders";
import { getOrderStatus } from "@/lib/constants/orderStatus";
import { cn, formatPrice, formatDate, formatOrderNumber } from "@/lib/utils";
import { StackedProductImages } from "@/components/app/StackedProductImages";

export const metadata = {
  title: "Order History | TechOvers Innovations",
  description: "Track and archive your premium tech acquisitions",
};

export default async function OrdersPage() {
  const { userId } = await auth();

  const { data: orders } = await sanityFetch({
    query: ORDERS_BY_USER_QUERY,
    params: { clerkUserId: userId ?? "" },
  });

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-32 sm:px-6 lg:px-8 bg-white min-h-screen">
        <div className="text-center">
          <div className="relative mb-8 flex justify-center">
            <div className="absolute inset-0 bg-[#108561]/5 rounded-full blur-3xl" />
            <Package className="relative h-20 w-20 text-zinc-100" />
          </div>
          <h1 className="text-2xl font-black text-black uppercase tracking-tighter">
            Archive Empty
          </h1>
          <p className="mt-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest max-w-sm mx-auto leading-relaxed">
            You haven't initialized any tech acquisitions yet. Browse our innovations to start your journey.
          </p>
          <Button asChild className="mt-12 h-14 px-10 rounded-2xl bg-black text-white text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-xl shadow-black/10">
            <Link href="/">Explore Devices</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-16 border-b border-zinc-100 pb-12">
          <h1 className="text-4xl font-black text-black tracking-tighter uppercase sm:text-6xl leading-none">
            Order <span className="text-[#108561]">Archive</span>
          </h1>
          <p className="mt-4 text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">
            Acquisition History & Deployment Logs
          </p>
        </div>

        <div className="space-y-8">
          {orders.map((order) => {
            const status = getOrderStatus(order.status);
            const StatusIcon = status.icon;
            const images = (order.itemImages ?? []).filter(
              (url): url is string => url !== null,
            );

            return (
              <Link
                key={order._id}
                href={`/orders/${order._id}`}
                className="group block rounded-[2.5rem] border border-zinc-100 bg-white p-8 transition-all hover:border-[#108561]/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.04)] active:scale-[0.99]"
              >
                <div className="flex flex-col md:flex-row gap-10">
                  {/* Left: Product Images Stack */}
                  <div className="shrink-0 flex justify-center md:block">
                    <StackedProductImages
                      images={images}
                      totalCount={order.itemCount ?? 0}
                      size="lg"
                    />
                  </div>

                  {/* Right: Order Details */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    {/* Top: Order Info + Status */}
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-6 mb-6">
                      <div className="min-w-0">
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block mb-1">Acquisition Log</span>
                        <p className="text-xl font-black text-black tracking-tightest uppercase truncate">
                          Archive #{formatOrderNumber(order.orderNumber)}
                        </p>
                        <p className="mt-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                          Initialized {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className={cn(
                        "px-6 py-2 rounded-full border flex items-center gap-2",
                        status.label === "Delivered" ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-zinc-50 border-zinc-100 text-zinc-600"
                      )}>
                        <StatusIcon className="h-4 w-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{status.label}</span>
                      </div>
                    </div>

                    {/* Middle: Items List Snippet */}
                    <div className="mb-6">
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest truncate">
                        {order.itemNames?.slice(0, 3).filter(Boolean).join(", ")}
                        {(order.itemNames?.length ?? 0) > 3 && " & more"}
                      </p>
                    </div>

                    {/* Bottom: Items + Total */}
                    <div className="mt-auto pt-6 border-t border-zinc-50 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-2 w-2 rounded-full bg-[#108561]" />
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                          {order.itemCount} Premium {order.itemCount === 1 ? "Component" : "Components"}
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1">Total Valuation</span>
                        <p className="text-2xl font-black text-black tracking-tightest">
                          {formatPrice(order.total)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
