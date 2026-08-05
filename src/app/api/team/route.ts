import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { teamMemberSchema } from "@/lib/validation";
import { Prisma } from "@prisma/client";

// GET /api/team — public, returns published members ordered by `order`
export async function GET() {
  const members = await db.teamMember.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(members);
}

// POST /api/team — admin only, gated by middleware
export async function POST(req: Request) {
  let json: unknown;
  try { json = await req.json(); }
  catch { return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 }); }

  const parsed = teamMemberSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Validation failed", errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const member = await db.teamMember.create({ data: parsed.data });
    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
