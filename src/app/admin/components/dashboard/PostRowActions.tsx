"use client";

/**
 * PostRowActions - per-row publish toggle, edit link, delete for the
 * admin posts table. Calls the /api/posts/[id] endpoints then refreshes.
 */

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PostRowActions({
  id,
  published,
}: {
  id: string;
  published: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const togglePublished = async () => {
    setBusy(true);
    await fetch(`/api/posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !published }),
    });
    setBusy(false);
    router.refresh();
  };

  const remove = async () => {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setBusy(true);
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    setBusy(false);
    router.refresh();
  };

  const chip =
    "inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold transition disabled:opacity-50";

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={togglePublished}
        disabled={busy}
        className={`${chip} ${
          published
            ? "bg-[#11142B]/8 text-[#11142B]/70 hover:bg-[#11142B]/12"
            : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
        }`}
      >
        {published ? "Unpublish" : "Publish"}
      </button>
      <Link
        href={`/admin/dashboard/posts/${id}/edit`}
        className={`${chip} border border-[#11142B]/15 text-[#11142B] hover:bg-[#11142B]/5`}
      >
        Edit
      </Link>
      <button
        onClick={remove}
        disabled={busy}
        className={`${chip} text-red-600 hover:bg-red-50`}
      >
        Delete
      </button>
    </div>
  );
}
