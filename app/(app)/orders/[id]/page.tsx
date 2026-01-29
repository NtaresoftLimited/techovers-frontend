import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, CreditCard, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { sanityFetch } from "@/sanity/lib/live";
import { ORDER_BY_ID_QUERY } from "@/lib/sanity/queries/orders";
import { getOrderStatus } from "@/lib/constants/orderStatus";
import { cn, formatPrice, formatDate } from "@/lib/utils";

export const metadata = {
  title: "Shipment Specifications | TechOvers Innovations",
  description: "Detailed technical log for your tech acquisition",
};

interface OrderPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: OrderPageProps) {
  const { id } = await params;
  const { userId } = await auth();

  const { data: order } = await sanityFetch({
    query: ORDER_BY_ID_QUERY,
    params: { id },
  });

  // Verify order exists and belongs to current user
  if (!order || order.clerkUserId !== userId) {
    notFound();
  }

  const status = getOrderStatus(order.status);
  const StatusIcon = status.icon;

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 border-b border-zinc-100 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <Link
              href="/orders"
              className="group inline-flex items-center text-[10px] font-black text-zinc-400 hover:text-black uppercase tracking-widest transition-colors mb-6"
            >
              <div className="mr-3 h-6 w-6 rounded-full border border-zinc-100 flex items-center justify-center group-hover:bg-zinc-50">
                <ArrowLeft className="h-3 w-3" />
              </div>
              Back to Innovation Archive
            </Link>
            <h1 className="text-4xl font-black text-black tracking-tighter uppercase sm:text-6xl leading-none">
              Shipment <span className="text-[#108561]">Log</span>
            </h1>
            <p className="mt-4 text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">
              Archive Reference #{order.orderNumber} • Initialized {formatDate(order.createdAt)}
            </p>
          </div>

          <div className={cn(
            "px-8 py-3 rounded-full border flex items-center gap-3 shadow-xl shadow-black/5 bg-white",
            status.label === "Delivered" ? "border-emerald-100 text-emerald-600" : "border-zinc-100 text-zinc-600"
          )}>
            <div className={cn(
              "h-2 w-2 rounded-full animate-pulse",
              status.label === "Delivered" ? "bg-emerald-500" : "bg-zinc-400"
            )} />
            <StatusIcon className="h-4 w-4" />
            <span className="text-xs font-black uppercase tracking-widest">{status.label}</span>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Order Items */}
          <div className="lg:col-span-7">
            <div className="rounded-[2.5rem] border border-zinc-100 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.02)] overflow-hidden">
              <div className="border-b border-zinc-50 px-10 py-8 bg-zinc-50/20">
                <h2 className="text-sm font-black text-black uppercase tracking-widest flex items-center gap-3">
                  <div className="h-5 w-5 rounded bg-black text-white flex items-center justify-center text-[10px]">#</div>
                  Manifest Components ({order.items?.length ?? 0})
                </h2>
              </div>
              <div className="divide-y divide-zinc-50 px-10 pb-4">
                {order.items?.map((item) => (
                  <div key={item._key} className="flex gap-8 py-8 items-center group">
                    {/* Image */}
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-3xl bg-zinc-50 border border-zinc-100 flex items-center justify-center p-2 shadow-inner group-hover:bg-white transition-colors">
                      {item.product?.image?.asset?.url ? (
                        <div className="relative w-full h-full bg-white rounded-2xl p-2 inset-shadow-sm">
                          <Image
                            src={item.product.image.asset.url}
                            alt={item.product.name ?? "Product"}
                            fill
                            className="object-contain p-2"
                            sizes="96px"
                          />
                        </div>
                      ) : (
                        <div className="flex h-full items-center justify-center text-[10px] font-black text-zinc-200">
                          NO ASSET
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div>
                        <Link
                          href={`/products/${item.product?.slug}`}
                          className="text-sm font-black text-black uppercase tracking-wide truncate block hover:text-[#108561] transition-colors"
                        >
                          {item.product?.name ?? "Unknown Product"}
                        </Link>
                        <div className="mt-1 flex items-center gap-3">
                          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                            Quantity: <span className="text-black">{item.quantity}</span>
                          </span>
                          <span className="text-[8px] font-black bg-zinc-100 text-zinc-400 px-2 py-0.5 rounded-full uppercase tracking-widest">
                            COMPONENT VERIFIED
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-base font-black text-black tracking-tighter">
                        {formatPrice(
                          (item.priceAtPurchase ?? 0) * (item.quantity ?? 1),
                        )}
                      </p>
                      {(item.quantity ?? 1) > 1 && (
                        <p className="text-[9px] font-black text-zinc-300 uppercase tracking-widest mt-1">
                          {formatPrice(item.priceAtPurchase)} UNIT COST
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Placeholder */}
            <div className="mt-8 p-10 rounded-[2.5rem] bg-zinc-50 border border-zinc-100">
              <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-6 border-b border-zinc-200 pb-4">Real-time Deployment Log</h3>
              <div className="space-y-6">
                <div className="flex gap-6 items-start">
                  <div className="mt-1 h-3 w-3 rounded-full border-2 border-[#108561] bg-white ring-4 ring-[#108561]/10" />
                  <div>
                    <p className="text-xs font-black text-black uppercase tracking-widest">Acquisition Confirmed</p>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">{formatDate(order.createdAt, "datetime")}</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start opacity-40">
                  <div className="mt-1 h-3 w-3 rounded-full border-2 border-zinc-200 bg-white" />
                  <div>
                    <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">Processing Inventory</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary & Details */}
          <div className="lg:col-span-5 space-y-8">
            {/* Summary */}
            <div className="rounded-[2.5rem] border-2 border-zinc-100 bg-zinc-50 p-10 shadow-2xl shadow-zinc-100/50">
              <h2 className="text-xl font-black text-black tracking-tighter uppercase mb-2">
                Order Valuation
              </h2>
              <div className="h-1 w-12 bg-[#108561] mb-10" />

              <div className="space-y-6">
                <div className="flex justify-between items-center group text-sm">
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                    Hardware Subtotal
                  </span>
                  <span className="text-base font-black text-black tracking-tighter">
                    {formatPrice(order.total)}
                  </span>
                </div>
                <div className="flex justify-between items-center group text-sm">
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                    Logistics (TSh)
                  </span>
                  <span className="text-[10px] font-black text-[#108561] uppercase tracking-widest">
                    FREE EXPRESS TZA
                  </span>
                </div>

                <div className="h-px bg-zinc-200 my-8" />

                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-black text-black uppercase tracking-widest">
                      Total Investment
                    </span>
                    <span className="text-3xl font-black text-black tracking-tightest">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                  <p className="text-[8px] font-black text-zinc-400 uppercase tracking-[0.2em] text-right">
                    Ref Reference #{order.orderNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            {order.address && (
              <div className="rounded-[2.5rem] border border-zinc-100 bg-white p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-10 w-10 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-zinc-400" />
                  </div>
                  <h2 className="text-sm font-black text-black uppercase tracking-widest">
                    Deployment Zone
                  </h2>
                </div>
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-relaxed space-y-1">
                  {order.address.name && <p className="text-black font-black">{order.address.name}</p>}
                  {order.address.line1 && <p>{order.address.line1}</p>}
                  {order.address.line2 && <p>{order.address.line2}</p>}
                  <p>
                    {[order.address.city, order.address.postcode]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                  {order.address.country && <p className="text-[#108561]">{order.address.country}</p>}
                </div>
              </div>
            )}

            {/* Payment Info */}
            <div className="rounded-[2.5rem] border border-zinc-100 bg-white p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-10 w-10 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-zinc-400" />
                </div>
                <h2 className="text-sm font-black text-black uppercase tracking-widest">
                  Transaction Authenticated
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Verification</span>
                  <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    {order.status}
                  </span>
                </div>
                {order.email && (
                  <div className="flex items-center justify-between">
                    <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Credential</p>
                    <p className="min-w-0 truncate text-[10px] font-black text-black uppercase tracking-widest">
                      {order.email}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
