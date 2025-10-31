import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    // ✅ Await cookies() — required in Next.js 15+
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Not logged in" }, { status: 401 });
    }

    // ✅ Verify token safely
    const user = jwt.verify(token, process.env.JWT_SECRET);

    return NextResponse.json(
      {
        role: user.role,
        email: user.email,
        message: "Authenticated successfully",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("JWT verify error:", err.message);
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}

// ✅ Ensure Node.js runtime (not Edge)
export const runtime = "nodejs";
