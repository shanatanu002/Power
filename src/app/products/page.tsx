import type { Metadata } from "next";
import { Suspense } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { ProductsListing } from "@/components/products/products-listing";

export const metadata: Metadata = {
  title: "Solar Panels, Batteries & Inverters",
  description: "Browse our complete range of solar panels, lithium batteries, inverters and solar solutions from Adani, Tata, Luminous, Waaree, Exide and more. Best prices, genuine products, pan-India delivery.",
  keywords: ["buy solar panels India", "lithium battery price", "inverter price", "solar panel dealer"],
};

export default function ProductsPage() {
  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-slate-900 to-slate-800 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-white">
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest">Our Products</span>
            <h1 className="text-4xl font-bold mt-2 mb-3">Solar Panels, Batteries & More</h1>
            <p className="text-slate-400 max-w-xl mx-auto">
              Genuine products from India&apos;s top solar brands. BIS certified, competitive pricing, pan-India delivery.
            </p>
          </div>
        </div>
      </div>
      <Suspense fallback={<ProductsLoadingSkeleton />}>
        <ProductsListing />
      </Suspense>
    </MainLayout>
  );
}

function ProductsLoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-slate-200 overflow-hidden">
            <div className="aspect-[4/3] skeleton" />
            <div className="p-4 space-y-3">
              <div className="h-3 w-24 skeleton rounded" />
              <div className="h-4 skeleton rounded" />
              <div className="h-4 w-3/4 skeleton rounded" />
              <div className="h-6 w-28 skeleton rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
