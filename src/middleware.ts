import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
    const isAdminLoginPage = req.nextUrl.pathname === "/admin/login";

    // Allow access to login page
    if (isAdminLoginPage) {
      // If already logged in, redirect to admin dashboard
      if (token) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      return NextResponse.next();
    }

    // Protect admin routes
    if (isAdminRoute) {
      if (!token) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }

      // Check if user has admin role
      if (token.role !== "ADMIN" && token.role !== "EDITOR") {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to login page without token
        if (req.nextUrl.pathname === "/admin/login") {
          return true;
        }
        // Require token for other admin routes
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
