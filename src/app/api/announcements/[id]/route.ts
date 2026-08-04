import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { announcementSchema } from "@/lib/validation";
import { Prisma } from "@prisma/client";

type Params = { params: Promise<{ id: string }> };

// GET /api/announcements/[id]
export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;
  const announcement = await db.announcement.findUnique({ where: { id } });
  if (!announcement) {
    return NextResponse.json({ message: "Announcement not found" }, { status: 404 });
  }
  return NextResponse.json(announcement);
}

// PATCH /api/announcements/[id]  (admin only - gated by middleware)
// Partial update. If set active, deactivate all others in a transaction.
export async function PATCH(req: Request, { params }: Params) {
  const { id } = await params;

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = announcementSchema.partial().safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Validation failed", errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const data = parsed.data;
    const updated = await db.$transaction(async (tx) => {
      if (data.active) {
        // deactivate every other announcement before activating this one
        await tx.announcement.updateMany({
          where: { id: { not: id } },
          data: { active: false },
        });
      }
      return tx.announcement.update({ where: { id }, data });
    });
    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ message: "Announcement not found" }, { status: 404 });
    }
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export { PATCH as PUT };

// DELETE /api/announcements/[id]  (admin only - gated by middleware)
export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;
  try {
    await db.announcement.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ message: "Announcement not found" }, { status: 404 });
    }
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
