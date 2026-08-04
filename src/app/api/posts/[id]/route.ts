import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { postSchema } from "@/lib/validation";
import { Prisma } from "@prisma/client";

type Params = { params: Promise<{ id: string }> };

// GET /api/posts/[id]
export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;
  const post = await db.post.findUnique({ where: { id } });
  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}

// PATCH /api/posts/[id]  (admin only - gated by middleware)
// Partial update. Accepts any subset of the post fields.
export async function PATCH(req: Request, { params }: Params) {
  const { id } = await params;

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = postSchema.partial().safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Validation failed", errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const post = await db.post.update({ where: { id }, data: parsed.data });
    return NextResponse.json(post);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json({ message: "Post not found" }, { status: 404 });
      }
      if (error.code === "P2002") {
        return NextResponse.json(
          { message: "A post with that slug already exists", errors: { slug: ["Slug must be unique"] } },
          { status: 409 },
        );
      }
    }
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// PUT is treated as a full replace - delegate to the same handler.
export { PATCH as PUT };

// DELETE /api/posts/[id]  (admin only - gated by middleware)
export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;
  try {
    await db.post.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
