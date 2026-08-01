"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import BlogComp from "./BlogComp";
import { posts } from "./blogData";

/**
 * Blog section for the home page. Header row with a "read all" link,
 * then the three most recent posts in a clean grid. Sits on the sand
 * background like the rest of the site (no more dark carousel).
 */

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

const BlogSection = () => {
  return (
    <section className="bg-[#F3F1EA] px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#11142B]/50">
              From the blog
            </span>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-[#11142B] sm:text-4xl">
              Notes from the hub
            </h2>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-2 rounded-full border border-[#11142B]/20 px-6 py-3 text-sm font-semibold text-[#11142B] transition-colors hover:bg-[#11142B]/5"
          >
            Read all posts <FiArrowRight className="text-xs" />
          </Link>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <BlogComp key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
