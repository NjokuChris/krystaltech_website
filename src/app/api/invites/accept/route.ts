// POST /api/invites/accept  — validates invite token + email, creates account, auto-logs in
import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  let token: string, email: string, username: string, password: string;
  try {
    ({ token, email, username, password } = await req.json());
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  if (!token || !email || !username || !password) {
    return NextResponse.json(
      { message: "token, email, username and password are all required" },
      { status: 400 },
    );
  }

  if (username.trim().length < 2) {
    return NextResponse.json({ message: "Username must be at least 2 characters" }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 });
  }

  const normalised = email.trim().toLowerCase();

  // Look up invite by token
  const invite = await db.invite.findUnique({ where: { token } });

  if (!invite) {
    return NextResponse.json({ message: "Invalid or expired invite link" }, { status: 400 });
  }
  if (invite.used) {
    return NextResponse.json({ message: "This invite has already been used" }, { status: 400 });
  }
  if (invite.expiresAt < new Date()) {
    return NextResponse.json({ message: "This invite link has expired" }, { status: 400 });
  }

  // ── Email verification ────────────────────────────────────────────────────
  if (invite.email.toLowerCase() !== normalised) {
    return NextResponse.json(
      { message: "The email address you entered doesn't match this invite" },
      { status: 403 },
    );
  }

  // Check username uniqueness
  const takenUsername = await db.user.findUnique({ where: { username: username.trim() } });
  if (takenUsername) {
    return NextResponse.json({ message: "That username is already taken" }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 10);

  // Create user + mark invite used atomically
  const user = await db.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: {
        email: invite.email,
        username: username.trim(),
        password: hashed,
        role: "ADMIN",
      },
    });
    await tx.invite.update({ where: { id: invite.id }, data: { used: true } });
    return newUser;
  });

  // Auto-login
  const jwtToken = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" },
  );

  const response = NextResponse.json({ message: "Account created successfully" });
  response.cookies.set("token", jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60,
    path: "/",
  });

  return response;
}
