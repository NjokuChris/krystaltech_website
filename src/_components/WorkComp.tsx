"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import type { Project } from "@/_components/workData";

/**
 * A single work/project card. Image dominates the card, with
 * category/client overlaid on the image and a slim content strip below.
 */

const categoryColor: Record<Project["category"], string> = {
  Website: "#DC2626",
  "Mobile App": "#0D9488",
  Branding: "#7C3AED",
  Security: "#4F46E5",
};

export default function WorkComp({ project }: { project: Project }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[28px] bg-[#11142B]"
    >
      <Link href={`/work/${project.slug}`} className="flex h-full flex-col">
        {/* Image fills the majority of the card */}
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Permanent bottom gradient so overlaid text stays legible */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

          {/* Category + client, floating top-left */}
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md"
              style={{
                backgroundColor: `${categoryColor[project.category]}22`,
                color: categoryColor[project.category],
              }}
            >
              {project.category}
            </span>
          </div>

          {/* Arrow, floating top-right, pops on hover */}
          <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:rotate-45">
            <FiArrowUpRight className="text-base text-white transition-colors duration-300 group-hover:text-[#11142B]" />
          </div>

          {/* Title + client sit on the image, above the gradient */}
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="text-xs font-medium text-white/60">
              {project.client}
            </p>
            <h3 className="mt-1 text-xl font-semibold leading-snug text-white">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Slim strip below: summary + tags only */}
        <div className="flex flex-1 flex-col justify-between gap-4 bg-white p-5">
          <p className="line-clamp-2 text-sm leading-relaxed text-[#11142B]/60">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#11142B]/5 px-2.5 py-1 text-xs text-[#11142B]/55"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
