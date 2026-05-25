import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${BASE_URL}/products`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/services/residential`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/services/commercial`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/services/industrial`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  // Product pages (static demo data — replace with DB in prod)
  const productSlugs = [
    "adani-400w-mono-perc", "waaree-550w-bifacial", "tata-power-335w-rooftop",
    "luminous-150ah-lithium", "exide-200ah-tubular", "luminous-5kw-hybrid-inverter",
  ];
  const productPages = productSlugs.map((slug) => ({
    url: `${BASE_URL}/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Blog pages (static demo data)
  const blogSlugs = [
    "pm-surya-ghar-yojana-2024-guide",
    "choose-right-solar-panel-types",
    "lithium-vs-lead-acid-battery-solar",
    "5kw-vs-10kw-solar-system-size",
    "net-metering-india-earn-money-solar",
    "solar-panel-maintenance-annual-checklist",
  ];
  const blogPages = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...productPages, ...blogPages];
}
