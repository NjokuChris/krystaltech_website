import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { projectSchema } from "@/lib/validation";
import { Prisma } from "@prisma/client";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;
  const project = await db.project.findUnique({ where: { id } });
  if (!project) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(project);
}

export async function PATCH(req: Request, { params }: Params) {
  const { id } = await params;
  let json: unknown;
  try { json = await req.json(); }
  catch { return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 }); }

  const parsed = projectSchema.partial().safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Validation failed", errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const project = await db.project.update({ where: { id }, data: parsed.data });
    return NextResponse.json(project);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") return NextResponse.json({ message: "Not found" }, { status: 404 });
      if (error.code === "P2002") return NextResponse.json({ message: "Slug already exists" }, { status: 409 });
    }
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export { PATCH as PUT };

export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;
  try {
    await db.project.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
