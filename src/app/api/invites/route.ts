// POST /api/invites  — super admin creates an invite link tied to an email
// GET  /api/invites  — super admin lists pending invites
import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { randomBytes } from "crypto";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

async function getCallerPayload() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "");
    const { payload } = await jwtVerify(token, secret);
    return payload as { id: number; username: string; role: string };
  } catch {
    return null;
  }
}

export async function GET() {
  const invites = await db.invite.findMany({
    where: { used: false, expiresAt: { gt: new Date() } },
    orderBy: { createdAt: "desc" },
    include: { invitedBy: { select: { username: true } } },
  });
  return NextResponse.json(invites);
}

export async function POST(req: Request) {
  const caller = await getCallerPayload();
  if (!caller) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let email: string;
  try {
    ({ email } = await req.json());
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ message: "A valid email is required" }, { status: 400 });
  }

  const normalised = email.trim().toLowerCase();

  // Block if a user with this email already exists
  const existingUser = await db.user.findUnique({ where: { email: normalised } });
  if (existingUser) {
    return NextResponse.json(
      { message: "A user with that email already exists" },
      { status: 409 },
    );
  }

  // Generate a fresh token and upsert — re-generating replaces any old invite for this email
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48 h

  const invite = await db.invite.upsert({
    where: { email: normalised },
    update: { token, used: false, expiresAt, invitedById: caller.id },
    create: { email: normalised, token, expiresAt, invitedById: caller.id },
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const inviteUrl = `${baseUrl}/invite/${invite.token}`;

  return NextResponse.json({ inviteUrl, email: normalised }, { status: 201 });
}
