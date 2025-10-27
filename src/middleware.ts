// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

async function verifyToken(token?: string | null) {
  if (!token) return false;
  try {
    // jose expects the secret as a Uint8Array
    const encoder = new TextEncoder();
    const secret = encoder.encode(process.env.JWT_SECRET || "");

    // verify; this will throw if invalid/expired
    await jwtVerify(token, secret, {
      // allowed algorithms can be specified if needed:
      // algorithms: ["HS256"]
    });
    return true;
  } catch (err) {
    // optionally console.error(err);
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value ?? null;
  const { pathname } = req.nextUrl;

  // Protect /admin and /signup routes
  if (pathname.startsWith("/admin") || pathname === "/signup") {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const valid = await verifyToken(token);
    if (!valid) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

    // Redirect logged-in users away from /signup and /login
  if ((pathname === "/login") && token) {
    const valid = await verifyToken(token);
    if (valid) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  }

  // Prevent logged-in users from accessing /login
  if (pathname === "/login" && token) {
    const valid = await verifyToken(token);
    if (valid) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    } else {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/signup"],
};
