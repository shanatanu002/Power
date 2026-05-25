import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Yati Powers database...");

  // Create admin user
  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || "Admin@123456", 12);
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@yatipowers.com" },
    update: {},
    create: {
      name: "Yati Powers Admin",
      email: process.env.ADMIN_EMAIL || "admin@yatipowers.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin user created:", admin.email);

  // Create brands
  const brandsData = [
    { name: "Adani Solar", slug: "adani-solar", description: "India's largest integrated solar manufacturer" },
    { name: "Tata Power Solar", slug: "tata-power-solar", description: "Trusted since 1989, Tata Group company" },
    { name: "Waaree", slug: "waaree", description: "Pioneer in solar manufacturing since 1989" },
    { name: "Luminous", slug: "luminous", description: "India's No.1 power backup brand" },
    { name: "Exide", slug: "exide", description: "India's leading battery manufacturer" },
    { name: "Livguard", slug: "livguard", description: "Advanced energy storage solutions" },
    { name: "Loom Solar", slug: "loom-solar", description: "Mono PERC solar technology leader" },
  ];

  const brands: any[] = [];
  for (const brand of brandsData) {
    const b = await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: {},
      create: { ...brand, isActive: true },
    });
    brands.push(b);
  }
  console.log("✅ Brands created:", brands.length);

  // Create categories
  const categoriesData = [
    { name: "Solar Panels", slug: "solar-panels", icon: "☀️", description: "High-efficiency solar panels for all applications" },
    { name: "Batteries", slug: "batteries", icon: "🔋", description: "Lithium and lead-acid batteries for energy storage" },
    { name: "Inverters", slug: "inverters", icon: "⚡", description: "Grid-tie, hybrid, and off-grid solar inverters" },
    { name: "Charge Controllers", slug: "charge-controllers", icon: "🎛️", description: "MPPT and PWM solar charge controllers" },
    { name: "Complete Systems", slug: "complete-systems", icon: "🏠", description: "Turnkey solar system packages" },
    { name: "Solar Water Pumps", slug: "water-pumps", icon: "💧", description: "Solar-powered water pumping solutions" },
  ];

  const categories: any[] = [];
  for (const cat of categoriesData) {
    const c = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: { ...cat, isActive: true },
    });
    categories.push(c);
  }
  console.log("✅ Categories created:", categories.length);

  const brandMap = Object.fromEntries(brands.map((b) => [b.slug, b.id]));
  const catMap = Object.fromEntries(categories.map((c) => [c.slug, c.id]));

  // Create products
  const productsData = [
    {
      name: "Adani 400W Mono PERC Solar Panel",
      slug: "adani-400w-mono-perc",
      shortDescription: "High-efficiency 400W monocrystalline PERC panel with 21.3% efficiency",
      description: "The Adani 400W Mono PERC Solar Panel is ideal for residential and commercial rooftop installations. Advanced PERC technology ensures maximum energy yield even in low-light conditions.",
      brandSlug: "adani-solar",
      categorySlug: "solar-panels",
      price: 12500,
      salePrice: 10800,
      gstRate: 12,
      wattage: 400,
      warranty: "25 Years",
      stock: 50,
      isFeatured: true,
      usageType: ["RESIDENTIAL", "COMMERCIAL"],
      imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop",
    },
    {
      name: "Waaree 550W Bifacial Solar Panel",
      slug: "waaree-550w-bifacial",
      shortDescription: "550W bifacial panel capturing energy from both sides",
      description: "Waaree's 550W bifacial panel generates power from both front and rear surfaces, offering up to 20% more energy yield compared to traditional panels.",
      brandSlug: "waaree",
      categorySlug: "solar-panels",
      price: 17500,
      salePrice: 15200,
      gstRate: 12,
      wattage: 550,
      warranty: "25 Years",
      stock: 35,
      isFeatured: true,
      usageType: ["COMMERCIAL", "INDUSTRIAL"],
      imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop",
    },
    {
      name: "Tata Power Solar 335W Rooftop Panel",
      slug: "tata-power-335w-rooftop",
      shortDescription: "Reliable 335W panel from India's trusted Tata brand",
      description: "Tata Power Solar panels are manufactured with stringent quality controls. Perfect for Indian rooftop conditions with excellent heat tolerance.",
      brandSlug: "tata-power-solar",
      categorySlug: "solar-panels",
      price: 9800,
      salePrice: null,
      gstRate: 12,
      wattage: 335,
      warranty: "25 Years",
      stock: 60,
      isFeatured: false,
      usageType: ["RESIDENTIAL"],
      imageUrl: "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=800&h=600&fit=crop",
    },
    {
      name: "Luminous 150Ah LiFePO4 Lithium Battery",
      slug: "luminous-150ah-lithium",
      shortDescription: "Advanced lithium iron phosphate battery with 10-year design life",
      description: "Luminous LiFePO4 batteries offer 4x longer life than lead-acid batteries, lightweight design, and zero maintenance.",
      brandSlug: "luminous",
      categorySlug: "batteries",
      price: 32000,
      salePrice: 28500,
      gstRate: 18,
      wattage: null,
      capacity: "150Ah / 1.92kWh",
      warranty: "5 Years",
      stock: 20,
      isFeatured: true,
      isNewArrival: true,
      usageType: ["RESIDENTIAL", "COMMERCIAL"],
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    },
    {
      name: "Exide 200Ah Tall Tubular Battery",
      slug: "exide-200ah-tubular",
      shortDescription: "Long-lasting tubular battery trusted for solar applications",
      description: "Exide Tall Tubular batteries are specifically designed for solar deep-cycle applications. Excellent charge acceptance and deep discharge recovery.",
      brandSlug: "exide",
      categorySlug: "batteries",
      price: 18000,
      salePrice: null,
      gstRate: 18,
      wattage: null,
      capacity: "200Ah",
      warranty: "3 Years",
      stock: 40,
      isFeatured: false,
      usageType: ["RESIDENTIAL"],
      imageUrl: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&h=600&fit=crop",
    },
    {
      name: "Luminous 5kW Solar Hybrid Inverter",
      slug: "luminous-5kw-hybrid-inverter",
      shortDescription: "Smart hybrid inverter supporting grid, solar and battery simultaneously",
      description: "The Luminous 5kW Hybrid Inverter intelligently manages power from solar panels, grid, and batteries to minimize electricity bills.",
      brandSlug: "luminous",
      categorySlug: "inverters",
      price: 45000,
      salePrice: 39500,
      gstRate: 18,
      wattage: 5000,
      warranty: "2 Years",
      stock: 15,
      isFeatured: true,
      usageType: ["RESIDENTIAL", "COMMERCIAL"],
      imageUrl: "https://images.unsplash.com/photo-1601132359864-c974e79890ac?w=800&h=600&fit=crop",
    },
  ];

  for (const product of productsData) {
    const { brandSlug, categorySlug, imageUrl, usageType, isNewArrival, ...productData } = product;
    const p = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        ...productData,
        brandId: brandMap[brandSlug],
        categoryId: catMap[categorySlug],
        usageType: usageType as any,
        isAvailable: true,
        isNewArrival: isNewArrival || false,
        specifications: {},
        images: {
          create: [{ url: imageUrl, isPrimary: true, alt: productData.name, sortOrder: 0 }],
        },
      },
    });
  }
  console.log("✅ Products created:", productsData.length);

  // Create testimonials
  const testimonials = [
    { name: "Rajesh Sharma", location: "Delhi", role: "Homeowner", rating: 5, content: "Yati Powers installed a 5kW system. My electricity bill dropped from ₹4,500 to under ₹200!", isVerified: true, isActive: true },
    { name: "Priya Patel", location: "Mumbai", role: "Shop Owner", rating: 5, content: "Commercial solar for my garment store. ROI has been incredible. Best investment!", isVerified: true, isActive: true },
    { name: "Amit Kumar", location: "Pune", role: "Factory Owner", rating: 5, content: "50kW industrial solar system. Best price for Waaree panels and ahead-of-schedule installation.", isVerified: true, isActive: true },
  ];
  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log("✅ Testimonials created:", testimonials.length);

  // Create blog posts
  await prisma.blogPost.upsert({
    where: { slug: "pm-surya-ghar-yojana-2024-guide" },
    update: {},
    create: {
      title: "PM Surya Ghar Yojana 2024: Complete Guide to Free Solar Subsidy",
      slug: "pm-surya-ghar-yojana-2024-guide",
      excerpt: "Everything you need to know about India's biggest residential solar subsidy scheme.",
      content: "Detailed guide about PM Surya Ghar Yojana — eligibility, application process, and subsidy amounts.",
      authorName: "Yati Powers Team",
      status: "PUBLISHED",
      publishedAt: new Date("2024-03-15"),
      readTime: 8,
      metaTitle: "PM Surya Ghar Yojana 2024 Guide | Yati Powers",
    },
  });
  console.log("✅ Blog posts created");

  console.log("🌞 Seeding complete!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
