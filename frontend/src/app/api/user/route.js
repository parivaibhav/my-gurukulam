import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ role: null, message: "No token found" });

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "defaultsecret"
    );

    return NextResponse.json({
      role: decoded.role,
      id: decoded.id,
      message: "Authenticated",
    });
  } catch (err) {
    console.error("Token decode error:", err);
    return NextResponse.json({ role: null, message: "Invalid token" });
  }
}
