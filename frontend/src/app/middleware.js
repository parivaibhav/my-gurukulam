import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    const pathname = req.nextUrl.pathname;

    // Admin routes
    if (pathname.startsWith("/dashboard/admin") && user.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard/" + user.role, req.url));
    }

    // Teacher routes
    if (pathname.startsWith("/dashboard/teacher") && user.role !== "teacher") {
      return NextResponse.redirect(new URL("/dashboard/" + user.role, req.url));
    }

    // Clerk routes
    if (pathname.startsWith("/dashboard/clerk") && user.role !== "clerk") {
      return NextResponse.redirect(new URL("/dashboard/" + user.role, req.url));
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
