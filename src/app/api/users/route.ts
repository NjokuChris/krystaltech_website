// GET /api/users  — super admin lists all users
import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET() {
  const users = await db.user.findMany({
    select: { id: true, username: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(users);
}
