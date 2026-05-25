import type { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
import { BlogListing } from "@/components/blog/blog-listing";

export const metadata: Metadata = {
  title: "Solar Energy Blog — Tips, Guides & News",
  description: "Learn about solar energy, government subsidies, battery backup, and energy-saving tips from India's solar experts at Yati Powers.",
};

export default function BlogPage() {
  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-slate-900 to-slate-800 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest">Knowledge Hub</span>
          <h1 className="text-5xl font-bold mt-3 mb-4">Solar Energy Blog</h1>
          <p className="text-slate-300 text-lg">
            Expert guides, government subsidy updates, installation tips, and everything solar for Indian homes and businesses.
          </p>
        </div>
      </div>
      <BlogListing />
    </MainLayout>
  );
}
