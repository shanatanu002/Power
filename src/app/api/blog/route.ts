import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { slugify, readTime } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "9");
  const tag = searchParams.get("tag");
  const search = searchParams.get("search");

  try {
    const where: any = { status: "PUBLISHED" };
    if (tag) where.tags = { some: { slug: tag } };
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
      ];
    }

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { publishedAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true, title: true, slug: true, excerpt: true,
          featuredImage: true, publishedAt: true, readTime: true,
          authorName: true, tags: true, views: true,
        },
      }),
      prisma.blogPost.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: posts,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch posts" }, { status: 500 });
  }
}

const postSchema = z.object({
  title: z.string().min(5),
  excerpt: z.string().optional(),
  content: z.string().min(100),
  featuredImage: z.string().optional(),
  authorName: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = postSchema.parse(body);

    const slug = slugify(data.title);
    const rt = readTime(data.content);

    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug,
        excerpt: data.excerpt,
        content: data.content,
        featuredImage: data.featuredImage,
        authorName: data.authorName || (session.user as any).name,
        status: data.status,
        publishedAt: data.status === "PUBLISHED" ? new Date() : null,
        readTime: rt,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        tags: data.tags ? {
          connectOrCreate: data.tags.map((tag) => ({
            where: { slug: slugify(tag) },
            create: { name: tag, slug: slugify(tag) },
          })),
        } : undefined,
      },
    });

    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: "Failed to create post" }, { status: 500 });
  }
}
