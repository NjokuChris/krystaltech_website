import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { db } from "@/lib/prisma";
import PostEditor from "../../../../components/dashboard/PostEditor";
import { ui } from "../../../../components/dashboard/ui";
import { POST_CATEGORIES } from "@/lib/validation";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await db.post.findUnique({ where: { id } });

  if (!post) notFound();

  // DB stores category as a plain string; narrow to the known set, falling
  // back to the first category if it somehow doesn't match.
  const category = (POST_CATEGORIES as readonly string[]).includes(post.category)
    ? (post.category as (typeof POST_CATEGORIES)[number])
    : POST_CATEGORIES[0];

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/dashboard/posts"
          className="mb-2 inline-flex items-center gap-1.5 text-sm text-[#11142B]/60 transition-colors hover:text-[#11142B]"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to posts
        </Link>
        <h2 className={ui.heading}>Edit post</h2>
      </div>
      <PostEditor
        post={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          category,
          image: post.image,
          readTime: post.readTime,
          published: post.published,
        }}
      />
    </div>
  );
}
