// DELETE /api/users/[id]  — super admin removes a user (cannot remove yourself)
import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;
  const userId = parseInt(id, 10);

  // Prevent self-deletion
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "");
      const { payload } = await jwtVerify(token, secret);
      const caller = payload as { id: number };
      if (caller.id === userId) {
        return NextResponse.json({ message: "You cannot remove your own account" }, { status: 400 });
      }
    } catch {
      // ignore — middleware already validated
    }
  }

  try {
    await db.user.delete({ where: { id: userId } });
    return NextResponse.json({ message: "User removed" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
