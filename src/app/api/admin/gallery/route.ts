import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const gallerySchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  imageUrl: z.string().url(),
  category: z.string().optional(),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
});

async function checkAuth() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user.role !== "ADMIN" && session.user.role !== "EDITOR")) {
    return false;
  }
  return true;
}

// GET - List all gallery items
export async function GET(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const where: any = {};
    if (category) where.category = category;

    const items = await prisma.gallery.findMany({
      where,
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error("Gallery fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch gallery" },
      { status: 500 }
    );
  }
}

// POST - Create gallery item
export async function POST(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validated = gallerySchema.parse(body);

    const item = await prisma.gallery.create({
      data: validated,
    });

    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }
    console.error("Gallery creation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create gallery item" },
      { status: 500 }
    );
  }
}
