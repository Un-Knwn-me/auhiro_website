import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const where: any = { isActive: true };
    if (category) where.category = category;

    const gallery = await prisma.gallery.findMany({
      where,
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ success: true, gallery });
  } catch (error) {
    console.error("Gallery fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch gallery" },
      { status: 500 }
    );
  }
}
