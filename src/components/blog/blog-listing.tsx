"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// Demo blog posts — loaded from DB in production
const posts = [
  {
    id: "b1",
    title: "PM Surya Ghar Yojana 2024: Complete Guide to Free Solar Subsidy",
    slug: "pm-surya-ghar-yojana-2024-guide",
    excerpt: "Everything you need to know about India's biggest residential solar subsidy scheme — eligibility, application process, and how to claim ₹78,000 subsidy.",
    featuredImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop",
    publishedAt: new Date("2024-03-15"),
    readTime: 8,
    authorName: "Yati Powers Team",
    tags: [{ name: "Government Scheme", slug: "government-scheme" }, { name: "Subsidy", slug: "subsidy" }],
  },
  {
    id: "b2",
    title: "How to Choose the Right Solar Panel: Mono vs Poly vs Bifacial",
    slug: "choose-right-solar-panel-types",
    excerpt: "A comprehensive comparison of monocrystalline, polycrystalline, and bifacial solar panels. Which is best for Indian rooftops and what factors matter most.",
    featuredImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop",
    publishedAt: new Date("2024-03-08"),
    readTime: 6,
    authorName: "Amit Verma",
    tags: [{ name: "Solar Panels", slug: "solar-panels" }, { name: "Guide", slug: "guide" }],
  },
  {
    id: "b3",
    title: "Lithium vs Lead Acid Battery: Which is Better for Solar in 2024?",
    slug: "lithium-vs-lead-acid-battery-solar",
    excerpt: "Detailed analysis of lithium LiFePO4 batteries vs traditional lead-acid for solar energy storage. Cost comparison, cycle life, and ROI calculations.",
    featuredImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    publishedAt: new Date("2024-02-28"),
    readTime: 7,
    authorName: "Technical Team",
    tags: [{ name: "Batteries", slug: "batteries" }, { name: "Comparison", slug: "comparison" }],
  },
  {
    id: "b4",
    title: "5kW vs 10kW Solar System: Which Size Do You Actually Need?",
    slug: "5kw-vs-10kw-solar-system-size",
    excerpt: "How to calculate the right solar system size for your home or business. Includes a detailed capacity calculator and real-world examples from India.",
    featuredImage: "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=600&h=400&fit=crop",
    publishedAt: new Date("2024-02-20"),
    readTime: 5,
    authorName: "Rajendra Patel",
    tags: [{ name: "Sizing", slug: "sizing" }, { name: "Residential", slug: "residential" }],
  },
  {
    id: "b5",
    title: "Net Metering in India: Earn Money from Your Solar Panels",
    slug: "net-metering-india-earn-money-solar",
    excerpt: "Learn how net metering works, which states have the best net metering policies, and how to sell excess solar power back to the grid for maximum ROI.",
    featuredImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop",
    publishedAt: new Date("2024-02-10"),
    readTime: 9,
    authorName: "Yati Powers Team",
    tags: [{ name: "Net Metering", slug: "net-metering" }, { name: "Policy", slug: "policy" }],
  },
  {
    id: "b6",
    title: "Solar Panel Maintenance: Annual Checklist for Maximum Output",
    slug: "solar-panel-maintenance-annual-checklist",
    excerpt: "Keep your solar panels performing at peak efficiency with this comprehensive annual maintenance guide. Cleaning tips, performance monitoring, and fault detection.",
    featuredImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop",
    publishedAt: new Date("2024-01-25"),
    readTime: 6,
    authorName: "Technical Team",
    tags: [{ name: "Maintenance", slug: "maintenance" }, { name: "Tips", slug: "tips" }],
  },
];

const allTags = Array.from(new Set(posts.flatMap((p) => p.tags).map((t) => JSON.stringify(t)))).map((s) => JSON.parse(s));

export function BlogListing() {
  const [selectedTag, setSelectedTag] = useState("all");

  const filtered = selectedTag === "all"
    ? posts
    : posts.filter((p) => p.tags.some((t) => t.slug === selectedTag));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Tags filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setSelectedTag("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedTag === "all" ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          All Posts
        </button>
        {allTags.map((tag) => (
          <button
            key={tag.slug}
            onClick={() => setSelectedTag(tag.slug)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedTag === tag.slug ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {tag.name}
          </button>
        ))}
      </div>

      {/* Featured post */}
      {selectedTag === "all" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <Link href={`/blog/${posts[0].slug}`} className="block group">
            <div className="grid md:grid-cols-2 gap-0 bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all">
              <div className="relative h-64 md:h-auto">
                <Image src={posts[0].featuredImage} alt={posts[0].title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <Badge className="w-fit mb-4">Featured</Badge>
                <h2 className="text-2xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-3">
                  {posts[0].title}
                </h2>
                <p className="text-slate-500 leading-relaxed mb-5">{posts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-5">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formatDate(posts[0].publishedAt)}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{posts[0].readTime} min read</span>
                </div>
                <div className="flex items-center gap-2 text-amber-500 font-semibold group-hover:gap-3 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(selectedTag === "all" ? filtered.slice(1) : filtered).map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link href={`/blog/${post.slug}`} className="block group h-full">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <Image src={post.featuredImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.map((tag) => (
                      <span key={tag.slug} className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Tag className="w-3 h-3" />{tag.name}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug mb-2 flex-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{formatDate(post.publishedAt)}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime} min</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
