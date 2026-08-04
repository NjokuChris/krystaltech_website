"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

/**
 * A single blog card. Clean sand-on-white look matching the rest of the
 * site: image on top, category chip, title, excerpt, meta row.
 *
 * Accepts a minimal shape so both the static seed data and the DB `Post`
 * model can feed it. `date` is a preformatted display string.
 */

export type BlogCardPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
};

const categoryTint: Record<string, string> = {
  "Tech Hub": "bg-[#2DD4BF]/15 text-[#0f766e]",
  "Service Hub": "bg-[#FFB627]/20 text-[#92600a]",
  Guides: "bg-[#11142B]/10 text-[#11142B]",
};

export default function BlogComp({ post }: { post: BlogCardPost }) {
  const tint = categoryTint[post.category] ?? "bg-[#11142B]/10 text-[#11142B]";
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#11142B]/8 bg-white"
    >
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 360px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <span
            className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${categoryTint[post.category]}`}
          >
            {post.category}
          </span>

          <h3 className="mt-4 text-lg font-semibold leading-snug text-[#11142B] group-hover:text-[#92600a]">
            {post.title}
          </h3>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-[#11142B]/60">
            {post.excerpt}
          </p>

          <div className="mt-6 flex items-center justify-between border-t border-[#11142B]/8 pt-4 text-xs text-[#11142B]/50">
            <span>
              {post.date} · {post.readTime}
            </span>
            <FiArrowUpRight className="text-base text-[#11142B] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
