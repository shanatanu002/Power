import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { ProductDetail } from "@/components/products/product-detail";

// Demo data — replaced with DB lookup in production
const products: Record<string, {
  id: string; name: string; slug: string;
  description: string; shortDescription: string;
  brand: { name: string; slug: string };
  category: { name: string; slug: string };
  price: number; salePrice?: number; gstRate: number;
  wattage?: number; voltage?: number; capacity?: string; warranty?: string;
  images: { url: string; isPrimary: boolean; alt: string; id: string; sortOrder: number }[];
  stock: number; isAvailable: boolean; isNewArrival: boolean; isFeatured: boolean;
  specifications: Record<string, string>;
  usageType: string[];
  rating: number; reviewCount: number;
}> = {
  "adani-400w-mono-perc": {
    id: "p1",
    name: "Adani 400W Mono PERC Solar Panel",
    slug: "adani-400w-mono-perc",
    shortDescription: "High-efficiency 400W monocrystalline PERC solar panel with 21.3% efficiency.",
    description: `The Adani 400W Mono PERC Solar Panel represents the pinnacle of residential and commercial solar technology.
    With an exceptional 21.3% module efficiency, this panel delivers maximum power output from minimum roof space.

    Manufactured at Adani Solar's state-of-the-art facility in India, this panel uses advanced PERC (Passivated Emitter Rear Cell)
    technology to capture more sunlight — especially in low-light conditions. The half-cell design reduces resistive losses
    and improves shade tolerance.

    This panel is ideal for rooftop installations across India — from humid coastal regions to extreme heat conditions.
    It features a robust aluminum frame that withstands 2400 Pa wind load and 5400 Pa snow load, ensuring durability
    in all weather conditions.`,
    brand: { name: "Adani Solar", slug: "adani-solar" },
    category: { name: "Solar Panels", slug: "solar-panels" },
    price: 12500,
    salePrice: 10800,
    gstRate: 12,
    wattage: 400,
    voltage: 24,
    warranty: "25 Years",
    images: [
      { id: "i1", url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop", isPrimary: true, alt: "Adani 400W Solar Panel Front", sortOrder: 0 },
      { id: "i2", url: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop", isPrimary: false, alt: "Solar Panel Installation", sortOrder: 1 },
      { id: "i3", url: "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=800&h=600&fit=crop", isPrimary: false, alt: "Solar Panel Array", sortOrder: 2 },
    ],
    stock: 50,
    isAvailable: true,
    isNewArrival: false,
    isFeatured: true,
    usageType: ["RESIDENTIAL", "COMMERCIAL"],
    rating: 4.8,
    reviewCount: 156,
    specifications: {
      "Panel Type": "Monocrystalline PERC (Half-Cell)",
      "Rated Power (Pmax)": "400 Wp",
      "Module Efficiency": "21.3%",
      "Open Circuit Voltage (Voc)": "48.8 V",
      "Short Circuit Current (Isc)": "10.30 A",
      "Max Power Voltage (Vmp)": "41.2 V",
      "Max Power Current (Imp)": "9.71 A",
      "Dimensions": "1765 × 1048 × 35 mm",
      "Weight": "22.5 kg",
      "Cell Count": "132 (Half-cut)",
      "Glass": "3.2mm Tempered Anti-reflective",
      "Frame": "Anodized Aluminium Alloy",
      "Junction Box": "IP68 Rated",
      "Connector": "MC4 Compatible",
      "Max System Voltage": "1500 V DC",
      "Operating Temperature": "-40°C to +85°C",
      "Wind Load": "2400 Pa",
      "Snow Load": "5400 Pa",
      "BIS Certification": "Yes (IS 14286)",
      "Performance Warranty": "25 Years Linear",
      "Product Warranty": "12 Years",
    },
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = products[slug];
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [product.images[0]?.url],
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products[slug];

  if (!product) notFound();

  return (
    <MainLayout>
      <ProductDetail product={product} />
    </MainLayout>
  );
}
