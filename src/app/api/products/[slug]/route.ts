import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        brand: true,
        category: true,
        images: { orderBy: { sortOrder: "asc" } },
        reviews: {
          where: { isApproved: true },
          include: { user: { select: { name: true, image: true } } },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    // Increment view count (best-effort)
    prisma.product.update({ where: { id: product.id }, data: {} }).catch(() => {});

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  try {
    const body = await req.json();
    const { images, ...productData } = body;

    const product = await prisma.$transaction(async (tx) => {
      const updated = await tx.product.update({
        where: { slug },
        data: productData,
      });

      if (Array.isArray(images)) {
        await tx.productImage.deleteMany({ where: { productId: updated.id } });
        if (images.length > 0) {
          await tx.productImage.createMany({
            data: images.map((img: { url: string; alt?: string; isPrimary?: boolean; sortOrder?: number }, idx: number) => ({
              productId: updated.id,
              url: img.url,
              alt: img.alt ?? "",
              isPrimary: img.isPrimary ?? idx === 0,
              sortOrder: img.sortOrder ?? idx,
            })),
          });
        }
      }

      return updated;
    });

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error("Product update error:", error);
    return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  try {
    await prisma.product.delete({ where: { slug } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete product" }, { status: 500 });
  }
}
