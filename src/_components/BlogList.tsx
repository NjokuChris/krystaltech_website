"use client";

/**
 * BlogList - client child of the /blog server page.
 * Receives already-fetched posts (from the DB) and handles the
 * category filter + the animated hero, keeping the page a server
 * component that can read from Prisma.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import BlogComp, { type BlogCardPost } from "@/_components/BlogComp";

type Category = "All" | string;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export default function BlogList({ posts }: { posts: BlogCardPost[] }) {
  const [filter, setFilter] = useState<Category>("All");

  const filteredPosts =
    filter === "All" ? posts : posts.filter((p) => p.category === filter);

  const categories: Category[] = ["All", "Tech Hub", "Service Hub", "Guides"];

  return (
    <>
      {/* hero */}
      <section className="px-5 pb-14 pt-16 md:px-10 md:pb-20 md:pt-24">
        <div className="mx-auto max-w-[1400px]">
          <motion.span
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full bg-[#11142B]/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#11142B]/50"
          >
            From the hub
          </motion.span>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 max-w-3xl text-4xl font-light leading-[1.05] tracking-tight sm:text-6xl"
          >
            What we&apos;re learning,
            <br />
            <span className="font-semibold">what we&apos;re building.</span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-xl text-base text-[#11142B]/60 sm:text-lg"
          >
            Notes from the classroom and the studio. Teaching updates, project
            breakdowns, and the occasional guide for anyone building something in
            Port Harcourt.
          </motion.p>

          {/* filter row */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  filter === cat
                    ? "bg-[#11142B] text-white"
                    : "border border-[#11142B]/20 text-[#11142B] hover:bg-[#11142B]/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* posts */}
      <section className="px-5 py-10 md:px-10 md:py-16">
        <div className="mx-auto max-w-[1400px]">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogComp key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5 }}
              className="text-center text-[#11142B]/50"
            >
              No posts in this category yet.
            </motion.p>
          )}
        </div>
      </section>
    </>
  );
}
