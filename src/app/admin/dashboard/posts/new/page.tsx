import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import PostEditor from "../../../components/dashboard/PostEditor";
import { ui } from "../../../components/dashboard/ui";

export default function NewPostPage() {
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
        <h2 className={ui.heading}>New post</h2>
      </div>
      <PostEditor />
    </div>
  );
}
