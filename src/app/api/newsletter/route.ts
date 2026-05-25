import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({ email: z.string().email() });

export async function POST(req: NextRequest) {
  try {
    const { email } = schema.parse(await req.json());

    await prisma.newsletterSubscriber.upsert({
      where: { email },
      create: { email, isActive: true },
      update: { isActive: true },
    });

    return NextResponse.json({ success: true, message: "Subscribed successfully!" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: "Invalid email" }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: "Failed to subscribe" }, { status: 500 });
  }
}
