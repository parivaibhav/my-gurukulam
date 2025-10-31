export const runtime = "nodejs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");
    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith("/dashboard/admin") && user.role !== "admin") {
      return NextResponse.redirect(new URL(`/dashboard/${user.role}`, req.url));
    }
    if (pathname.startsWith("/dashboard/teacher") && user.role !== "teacher") {
      return NextResponse.redirect(new URL(`/dashboard/${user.role}`, req.url));
    }
    if (pathname.startsWith("/dashboard/clerk") && user.role !== "clerk") {
      return NextResponse.redirect(new URL(`/dashboard/${user.role}`, req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Token decode error:", err.message);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
