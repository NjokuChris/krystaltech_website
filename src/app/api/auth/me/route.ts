// GET /api/auth/me — returns the current user's public profile from the JWT cookie
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "");
    const { payload } = await jwtVerify(token, secret);
    const { id, username, role } = payload as {
      id: number;
      username: string;
      role: "SUPER_ADMIN" | "ADMIN";
    };
    return NextResponse.json({ id, username, role });
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
