import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/product-form";

export const metadata: Metadata = { title: "Edit Product | Admin" };

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EditProductPage({ params }: Props) {
  const { slug } = await params;

  const [product, brands, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { slug },
      include: { images: { orderBy: { sortOrder: "asc" } } },
    }),
    prisma.brand.findMany({
      where: { isActive: true },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
    prisma.category.findMany({
      where: { isActive: true },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);

  if (!product) notFound();

  // Prisma Decimal types are not JSON-serialisable; convert to number before
  // passing to the client component.
  const initialData = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    shortDescription: product.shortDescription,
    brandId: product.brandId,
    categoryId: product.categoryId,
    usageType: product.usageType as string[],
    price: Number(product.price),
    salePrice: product.salePrice != null ? Number(product.salePrice) : null,
    gstRate: Number(product.gstRate),
    wattage: product.wattage,
    voltage: product.voltage,
    capacity: product.capacity,
    warranty: product.warranty,
    stock: product.stock,
    specifications: product.specifications as Record<string, unknown> | null,
    isAvailable: product.isAvailable,
    isFeatured: product.isFeatured,
    isNewArrival: product.isNewArrival,
    metaTitle: product.metaTitle,
    metaDescription: product.metaDescription,
    images: product.images.map((img) => ({
      id: img.id,
      url: img.url,
      alt: img.alt,
      isPrimary: img.isPrimary,
      sortOrder: img.sortOrder,
    })),
  };

  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-6">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-3"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Products
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Edit Product</h1>
        <p className="text-slate-500 text-sm mt-1">
          Editing <span className="font-medium text-slate-700">{product.name}</span>
        </p>
      </div>

      <ProductForm brands={brands} categories={categories} initialData={initialData} />
    </div>
  );
}
