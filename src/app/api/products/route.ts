import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const search = searchParams.get("search");
  const usageType = searchParams.get("type");
  const featured = searchParams.get("featured");
  const sortBy = searchParams.get("sort") || "createdAt";

  try {
    const session = await getServerSession(authOptions);
    const isAdmin = (session?.user as any)?.role === "ADMIN";
    const where: any = isAdmin ? {} : { isAvailable: true };
    if (category) where.category = { slug: category };
    if (brand) where.brand = { slug: brand };
    if (usageType) where.usageType = { has: usageType };
    if (featured === "true") where.isFeatured = true;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { brand: { name: { contains: search, mode: "insensitive" } } },
      ];
    }

    const orderBy: any = sortBy === "price_asc"
      ? { price: "asc" }
      : sortBy === "price_desc"
      ? { price: "desc" }
      : { [sortBy === "newest" ? "createdAt" : sortBy]: "desc" };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          brand: { select: { name: true, slug: true, logo: true } },
          category: { select: { name: true, slug: true } },
          images: { orderBy: { sortOrder: "asc" } },
          _count: { select: { reviews: true } },
        },
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: products,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Products fetch error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 });
  }
}

const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  shortDescription: z.string().optional(),
  brandId: z.string(),
  categoryId: z.string(),
  usageType: z.array(z.enum(["RESIDENTIAL", "COMMERCIAL", "INDUSTRIAL", "INSTITUTIONAL"])),
  price: z.number().positive(),
  salePrice: z.number().positive().optional(),
  gstRate: z.number().min(0).max(28),
  wattage: z.number().int().optional(),
  voltage: z.number().int().optional(),
  capacity: z.string().optional(),
  warranty: z.string().optional(),
  stock: z.number().int().min(0),
  specifications: z.record(z.string(), z.unknown()).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  isFeatured: z.boolean().optional(),
  isNewArrival: z.boolean().optional(),
  images: z.array(z.object({
    url: z.string().url(),
    alt: z.string().optional(),
    isPrimary: z.boolean().optional(),
    sortOrder: z.number().int().optional(),
  })).optional(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = productSchema.parse(body);

    const slug = slugify(data.name);

    const product = await prisma.$transaction(async (tx) => {
      const created = await tx.product.create({
        data: {
          name: data.name,
          slug,
          description: data.description,
          shortDescription: data.shortDescription,
          brandId: data.brandId,
          categoryId: data.categoryId,
          usageType: data.usageType,
          price: data.price,
          salePrice: data.salePrice,
          gstRate: data.gstRate,
          wattage: data.wattage,
          voltage: data.voltage,
          capacity: data.capacity,
          warranty: data.warranty,
          stock: data.stock,
          specifications: (data.specifications as any) ?? undefined,
          metaTitle: data.metaTitle,
          metaDescription: data.metaDescription,
          isFeatured: data.isFeatured ?? false,
          isNewArrival: data.isNewArrival ?? false,
        },
      });

      if (data.images?.length) {
        await tx.productImage.createMany({
          data: data.images.map((img, idx) => ({
            productId: created.id,
            url: img.url,
            alt: img.alt ?? "",
            isPrimary: img.isPrimary ?? idx === 0,
            sortOrder: img.sortOrder ?? idx,
          })),
        });
      }

      return created;
    });

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.issues }, { status: 400 });
    }
    console.error("Product creation error:", error);
    return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 500 });
  }
}
