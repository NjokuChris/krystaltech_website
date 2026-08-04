import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { announcementSchema } from "@/lib/validation";

// GET /api/announcements  -> all announcements (admin list). Newest first.
export async function GET() {
  const announcements = await db.announcement.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(announcements);
}

// POST /api/announcements  (admin only - gated by middleware)
// If the new announcement is active, deactivate all others in a transaction.
export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = announcementSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Validation failed", errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const data = parsed.data;
    const created = await db.$transaction(async (tx) => {
      if (data.active) {
        await tx.announcement.updateMany({ data: { active: false } });
      }
      return tx.announcement.create({ data });
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
