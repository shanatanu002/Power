import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MainLayout } from "@/components/layout/main-layout";
import { Calendar, Clock, ArrowLeft, Tag, Share2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

const posts: Record<string, {
  title: string; slug: string; excerpt: string; content: string;
  featuredImage: string; publishedAt: Date; readTime: number;
  authorName: string; tags: { name: string; slug: string }[];
  metaTitle?: string; metaDescription?: string;
}> = {
  "pm-surya-ghar-yojana-2024-guide": {
    title: "PM Surya Ghar Yojana 2024: Complete Guide to Free Solar Subsidy",
    slug: "pm-surya-ghar-yojana-2024-guide",
    excerpt: "Everything you need to know about India's biggest residential solar subsidy scheme.",
    featuredImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=600&fit=crop",
    publishedAt: new Date("2024-03-15"),
    readTime: 8,
    authorName: "Yati Powers Team",
    tags: [{ name: "Government Scheme", slug: "government-scheme" }, { name: "Subsidy", slug: "subsidy" }],
    content: `
## What is PM Surya Ghar Muft Bijli Yojana?

Launched in February 2024 by the Government of India, PM Surya Ghar Muft Bijli Yojana is the largest residential solar scheme in India's history. The scheme aims to install rooftop solar panels on **1 crore homes** and provide **300 units of free electricity** per month.

## Key Benefits

- **Direct subsidy** of ₹30,000 to ₹78,000 depending on system size
- **300 units free electricity** per month to enrolled households
- **Reduced electricity bills** — potentially zero for average households
- **Additional income** through net metering for excess power sold to grid

## Subsidy Amount Details

| System Size | Subsidy Amount |
|------------|----------------|
| Up to 2 kW | ₹30,000 per kW |
| 2–3 kW | ₹18,000 per additional kW |
| Above 3 kW | Maximum ₹78,000 |

## Eligibility Criteria

1. Indian residential household (not commercial or industrial)
2. Electricity connection from a DISCOM
3. Rooftop available for solar installation
4. Net metering facility available in your area

## How to Apply

**Step 1:** Visit the official portal at pmsuryaghar.gov.in

**Step 2:** Register with your electricity consumer number

**Step 3:** Apply for rooftop solar through your DISCOM

**Step 4:** Get technical feasibility certificate

**Step 5:** Choose an empaneled installer (Yati Powers is MNRE empaneled)

**Step 6:** Get installation done

**Step 7:** Submit documents for subsidy release

## Why Choose Yati Powers for PM Surya Ghar?

As an MNRE-empaneled solar installer, Yati Powers handles the **entire subsidy application process** for our customers — from documentation to DISCOM coordination. We ensure maximum subsidy utilization.

**Contact us today** for a free consultation and complete subsidy guidance.
    `,
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.featuredImage] },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  // Convert markdown-ish content to HTML (simplified)
  const contentHtml = post.content
    .split("\n")
    .map((line) => {
      if (line.startsWith("## ")) return `<h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">${line.slice(3)}</h2>`;
      if (line.startsWith("### ")) return `<h3 class="text-xl font-bold text-slate-900 mt-6 mb-3">${line.slice(4)}</h3>`;
      if (line.startsWith("**") && line.endsWith("**")) return `<p class="text-slate-700 font-semibold">${line.slice(2, -2)}</p>`;
      if (line.startsWith("- ")) return `<li class="text-slate-600 ml-4 list-disc">${line.slice(2)}</li>`;
      if (line.startsWith("|")) return `<tr class="border-b border-slate-100">${line.split("|").filter(Boolean).map((c) => `<td class="px-4 py-2 text-sm text-slate-600">${c.trim()}</td>`).join("")}</tr>`;
      if (line.trim() === "") return "<br/>";
      return `<p class="text-slate-600 leading-relaxed mb-3">${line}</p>`;
    })
    .join("\n");

  return (
    <MainLayout>
      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* Back */}
        <Link href="/blog" className="flex items-center gap-2 text-slate-400 hover:text-slate-600 text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {post.tags.map((tag) => (
            <span key={tag.slug} className="flex items-center gap-1 text-xs bg-amber-50 text-amber-600 px-3 py-1 rounded-full">
              <Tag className="w-3 h-3" />{tag.name}
            </span>
          ))}
        </div>

        <h1 className="text-4xl font-bold text-slate-900 leading-tight mb-5">{post.title}</h1>

        <div className="flex items-center gap-5 text-sm text-slate-400 mb-8 pb-6 border-b border-slate-200">
          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formatDate(post.publishedAt)}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime} min read</span>
          <span>By {post.authorName}</span>
        </div>

        {/* Featured image */}
        <div className="relative h-72 rounded-2xl overflow-hidden mb-10">
          <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
        </div>

        {/* Content */}
        <div
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Ready to Go Solar?</h3>
          <p className="text-slate-500 mb-6">Get a free consultation from our solar experts and claim your government subsidy.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-8 py-3 rounded-xl transition-colors">
            Get Free Quote
          </Link>
        </div>
      </article>
    </MainLayout>
  );
}
