import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    const where: any = { isActive: true };
    if (category) where.category = category;
    if (featured === "true") where.isFeatured = true;

    const products = await prisma.product.findMany({
      where,
      include: {
        variants: {
          where: { isActive: true },
          include: {
            colors: true,
          },
          orderBy: { isDefault: "desc" },
        },
      },
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("Products fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
