/**
 * Admin posts list. Server component: reads all posts (drafts included)
 * and renders a table with per-row publish/edit/delete actions.
 */

import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { db } from "@/lib/prisma";
import { formatPostDate } from "@/lib/content";
import PostRowActions from "../../components/dashboard/PostRowActions";
import { ui, badge } from "../../components/dashboard/ui";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const posts = await db.post.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className={ui.heading}>Posts</h2>
          <p className={`mt-1 ${ui.subheading}`}>{posts.length} total</p>
        </div>
        <Link href="/admin/dashboard/posts/new" className={ui.btnPrimary}>
          <PlusIcon className="h-4 w-4" />
          New post
        </Link>
      </div>

      <div className={`overflow-hidden ${ui.card}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-[#11142B]/10 bg-[#F3F1EA]/60 text-xs uppercase tracking-wide text-[#11142B]/50">
              <tr>
                <th className="px-5 py-3 font-semibold">Title</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Created</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#11142B]/8">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-sm text-[#11142B]/40">
                    No posts yet. Create your first one.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="text-sm transition-colors hover:bg-[#F3F1EA]/40">
                    <td className="px-5 py-3.5 font-medium text-[#11142B]">{post.title}</td>
                    <td className="px-5 py-3.5 text-[#11142B]/60">{post.category}</td>
                    <td className="px-5 py-3.5">
                      <span className={badge(post.published ? "on" : "off")}>
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-[#11142B]/60">{formatPostDate(post.createdAt)}</td>
                    <td className="px-5 py-3.5">
                      <PostRowActions id={post.id} published={post.published} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
