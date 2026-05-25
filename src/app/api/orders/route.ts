import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { generateOrderNumber } from "@/lib/utils";
import { sendOrderConfirmation } from "@/lib/email";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  pincode: z.string(),
  gstin: z.string().optional(),
  paymentMethod: z.enum(["RAZORPAY", "COD", "BANK_TRANSFER"]),
  notes: z.string().optional(),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
    price: z.number().positive(),
  })),
  subtotal: z.number(),
  gstAmount: z.number(),
  totalAmount: z.number(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const data = schema.parse(body);

    const orderNumber = generateOrderNumber();

    // Verify products exist and calculate totals
    const productIds = data.items.map((i) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, price: true, salePrice: true, gstRate: true, stock: true },
    });

    const productMap = new Map(products.map((p) => [p.id, p]));

    // Validate stock
    for (const item of data.items) {
      const product = productMap.get(item.productId);
      if (!product) {
        return NextResponse.json({ success: false, error: `Product ${item.productId} not found` }, { status: 400 });
      }
      if (product.stock < item.quantity) {
        return NextResponse.json({ success: false, error: `Insufficient stock for product ${item.productId}` }, { status: 400 });
      }
    }

    // Create order in transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId: session?.user ? (session.user as any).id : undefined,
          status: "PENDING",
          paymentStatus: data.paymentMethod === "COD" ? "PENDING" : "PENDING",
          paymentMethod: data.paymentMethod,
          subtotal: data.subtotal,
          gstAmount: data.gstAmount,
          shippingAmount: 0,
          totalAmount: data.totalAmount,
          shippingName: data.name,
          shippingEmail: data.email,
          shippingPhone: data.phone,
          shippingAddress: data.address,
          shippingCity: data.city,
          shippingState: data.state,
          shippingPincode: data.pincode,
          shippingGstin: data.gstin,
          notes: data.notes,
          items: {
            create: data.items.map((item) => {
              const product = productMap.get(item.productId)!;
              const gstRate = Number(product.gstRate);
              return {
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                gstRate,
                total: item.price * item.quantity * (1 + gstRate / 100),
              };
            }),
          },
        },
      });

      // Reduce stock
      for (const item of data.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return newOrder;
    });

    // Send confirmation email
    try {
      await sendOrderConfirmation(
        data.email,
        orderNumber,
        data.items.map((item) => ({
          name: productMap.get(item.productId)?.id || "Product",
          quantity: item.quantity,
          price: item.price,
        })),
        data.totalAmount
      );
    } catch (emailErr) {
      console.error("Failed to send order confirmation:", emailErr);
    }

    return NextResponse.json({ success: true, orderNumber, orderId: order.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.issues }, { status: 400 });
    }
    console.error("Order creation error:", error);
    return NextResponse.json({ success: false, error: "Failed to place order" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const userId = (session.user as any).id;
  const isAdmin = (session.user as any).role === "ADMIN";

  try {
    const where = isAdmin ? {} : { userId };
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          items: {
            include: { product: { select: { name: true, slug: true, images: { where: { isPrimary: true }, take: 1 } } } },
          },
        },
      }),
      prisma.order.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: orders,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 });
  }
}
