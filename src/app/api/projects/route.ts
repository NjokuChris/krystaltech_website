import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { projectSchema } from "@/lib/validation";
import { Prisma } from "@prisma/client";

// GET /api/projects — public list (published only) or all with ?all=1 (admin)
export async function GET(req: NextRequest) {
  const includeDrafts = req.nextUrl.searchParams.get("all") === "1";
  const projects = await db.project.findMany({
    where: includeDrafts ? undefined : { published: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(projects);
}

// POST /api/projects — admin only, gated by middleware
export async function POST(req: Request) {
  let json: unknown;
  try { json = await req.json(); }
  catch { return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 }); }

  const parsed = projectSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Validation failed", errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const project = await db.project.create({ data: parsed.data });
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ message: "A project with that slug already exists" }, { status: 409 });
    }
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
