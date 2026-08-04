import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { postSchema } from "@/lib/validation";
import { Prisma } from "@prisma/client";

// GET /api/posts
// Public list. By default returns only published posts (for the site).
// Pass ?all=1 (admin, behind middleware) to include drafts.
export async function GET(req: NextRequest) {
  const includeDrafts = req.nextUrl.searchParams.get("all") === "1";

  const posts = await db.post.findMany({
    where: includeDrafts ? undefined : { published: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(posts);
}

// POST /api/posts  (admin only - gated by middleware)
export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = postSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Validation failed", errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    const post = await db.post.create({ data: parsed.data });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json(
        { message: "A post with that slug already exists", errors: { slug: ["Slug must be unique"] } },
        { status: 409 },
      );
    }
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
