"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import WorkComp from "./WorkComp";
import { projects } from "./workData";

/**
 * Work section for the home page. Header with a "see all" link, then
 * the three most recent projects in a clean grid. Matches BlogSection.
 */

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

const OurWork = () => {
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
              Recent work
            </span>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-[#11142B] sm:text-4xl">
              What we ship for clients
            </h2>
          </div>
          <Link
            href="/work"
            className="flex items-center gap-2 rounded-full border border-[#11142B]/20 px-6 py-3 text-sm font-semibold text-[#11142B] transition-colors hover:bg-[#11142B]/5"
          >
            See all projects <FiArrowRight className="text-xs" />
          </Link>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <WorkComp key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurWork;
