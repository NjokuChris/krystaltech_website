// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

interface JwtPayload {
  id: number;
  username: string;
  role: "SUPER_ADMIN" | "ADMIN";
  iat: number;
  exp: number;
}

async function verifyToken(token?: string | null): Promise<JwtPayload | null> {
  if (!token) return null;
  try {
    const encoder = new TextEncoder();
    const secret = encoder.encode(process.env.JWT_SECRET || "");
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as JwtPayload;
  } catch {
    return null;
  }
}

// CMS API routes whose write operations (POST/PATCH/PUT/DELETE) require auth.
const CMS_API_PREFIXES = ["/api/posts", "/api/announcements", "/api/projects", "/api/team"];

// Super-admin-only API prefixes
const SUPER_ADMIN_API_PREFIXES = ["/api/invites", "/api/users"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value ?? null;
  const { pathname } = req.nextUrl;

  // Gate CMS write operations
  const isCmsApi = CMS_API_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
  if (isCmsApi) {
    if (req.method === "GET") return NextResponse.next();
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // /api/invites/accept is public: invitees have no token yet — it does its
  // own token + email validation internally. Must be excluded from the gate.
  const isPublicInviteRoute = pathname === "/api/invites/accept";

  // Gate super-admin API routes (invites, user management)
  const isSuperAdminApi =
    !isPublicInviteRoute &&
    SUPER_ADMIN_API_PREFIXES.some(
      (p) => pathname === p || pathname.startsWith(`${p}/`),
    );
  if (isSuperAdminApi) {
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (payload.role !== "SUPER_ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    return NextResponse.next();
  }

  // Protect /admin/dashboard/users — super admin only
  if (pathname.startsWith("/admin/dashboard/users")) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.redirect(new URL("/login", req.url));
    if (payload.role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));
    const payload = await verifyToken(token);
    if (!payload) return NextResponse.redirect(new URL("/login", req.url));
    return NextResponse.next();
  }

  // Redirect logged-in users away from /login
  if (pathname === "/login" && token) {
    const payload = await verifyToken(token);
    if (payload) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
    "/api/posts/:path*",
    "/api/announcements/:path*",
    "/api/projects/:path*",
    "/api/projects",
    "/api/team/:path*",
    "/api/team",
    "/api/invites/:path*",
    "/api/invites",
    "/api/users/:path*",
    "/api/users",
  ],
};
