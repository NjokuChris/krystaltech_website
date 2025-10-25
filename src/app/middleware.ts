import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl.pathname;

  // Protect dashboard
  if (path.startsWith("/dashboard")) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Protect signup page (only accessible if logged in)
  if (path.startsWith("/signup")) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));

    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // All other routes are public
  return NextResponse.next();
}

// Apply middleware to both /dashboard and /signup
export const config = {
  matcher: ["/dashboard/:path*", "/signup/:path*"],
};
