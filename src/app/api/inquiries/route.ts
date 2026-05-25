import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendInquiryNotification } from "@/lib/email";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^[6-9]\d{9}$/),
  subject: z.string().optional(),
  message: z.string().min(10),
  type: z.enum(["GENERAL", "PRODUCT", "QUOTE", "INSTALLATION", "CONSULTATION", "COMPLAINT"]),
  productId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const inquiry = await prisma.inquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        type: data.type,
        productId: data.productId,
      },
    });

    // Send notification email to admin
    try {
      await sendInquiryNotification(
        process.env.ADMIN_EMAIL || "admin@yatipowers.com",
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
          type: data.type,
        }
      );
    } catch (emailError) {
      console.error("Failed to send inquiry notification:", emailError);
    }

    return NextResponse.json({ success: true, id: inquiry.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.issues }, { status: 400 });
    }
    console.error("Inquiry creation error:", error);
    return NextResponse.json({ success: false, error: "Failed to submit inquiry" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const status = searchParams.get("status");

  try {
    const where = status ? { status: status as any } : {};
    const [inquiries, total] = await Promise.all([
      prisma.inquiry.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: { product: { select: { name: true, slug: true } } },
      }),
      prisma.inquiry.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: inquiries,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch inquiries" }, { status: 500 });
  }
}
