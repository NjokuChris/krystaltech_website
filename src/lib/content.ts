import { db } from "@/lib/prisma";
import type { Post, Announcement } from "@prisma/client";
import type { BlogCardPost } from "@/_components/BlogComp";

export type { Post, Announcement };

// Format a stored timestamp for display, e.g. "12 July 2026".
export function formatPostDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

// Map a DB Post to the minimal shape the blog card expects.
export function toCardPost(post: Post): BlogCardPost {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    date: formatPostDate(post.createdAt),
    readTime: post.readTime,
    image: post.image,
  };
}

// Published posts for the public site, newest first.
export async function getPublishedPosts(): Promise<Post[]> {
  return db.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
}

// A single published post by slug (used by /blog/[slug]).
export async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  return db.post.findFirst({ where: { slug, published: true } });
}

// The one announcement flagged active - powers the "Happening Now" band.
export async function getActiveAnnouncement(): Promise<Announcement | null> {
  return db.announcement.findFirst({
    where: { active: true },
    orderBy: { updatedAt: "desc" },
  });
}
