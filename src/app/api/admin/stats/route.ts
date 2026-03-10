import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function checkAuth() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user.role !== "ADMIN" && session.user.role !== "EDITOR")) {
    return false;
  }
  return true;
}

// GET - Dashboard statistics
export async function GET(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);

    const [
      totalProducts,
      activeProducts,
      totalLeads,
      newLeads,
      todayLeads,
      monthLeads,
      leadsByStatus,
      totalContacts,
      unreadContacts,
      totalBlogs,
      publishedBlogs,
      recentLeads,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { isActive: true } }),
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "NEW" } }),
      prisma.lead.count({ where: { createdAt: { gte: today } } }),
      prisma.lead.count({ where: { createdAt: { gte: thisMonth } } }),
      prisma.lead.groupBy({
        by: ["status"],
        _count: { status: true },
      }),
      prisma.contact.count(),
      prisma.contact.count({ where: { isRead: false } }),
      prisma.blog.count(),
      prisma.blog.count({ where: { isPublished: true } }),
      prisma.lead.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          phone: true,
          productInterest: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    // Transform leadsByStatus to object
    const statusCounts = leadsByStatus.reduce((acc, item) => {
      acc[item.status] = item._count.status;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      success: true,
      stats: {
        products: {
          total: totalProducts,
          active: activeProducts,
        },
        leads: {
          total: totalLeads,
          new: newLeads,
          today: todayLeads,
          thisMonth: monthLeads,
          byStatus: statusCounts,
        },
        contacts: {
          total: totalContacts,
          unread: unreadContacts,
        },
        blogs: {
          total: totalBlogs,
          published: publishedBlogs,
        },
        recentLeads,
      },
    });
  } catch (error) {
    console.error("Stats fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
