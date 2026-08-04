"use client";

/**
 * Work - Krystal Tech Hub
 * ------------------------------------------------------------
 * Full portfolio, filterable by category. Clean design matching
 * Programs/Services/About/Blog pages.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import NavBar from "@/_components/NavBar";
import Footer from "@/_components/Footer";
import WorkComp from "@/_components/WorkComp";
import DeviceCTABanner from "@/_components/DeviceCTABanner";
import { ctaConfigs } from "@/_components/ctaConfigs";
import { projects } from "@/_components/workData";
import type { Project } from "@/_components/workData";

type Category = "All" | Project["category"];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

const STATS = [
  { n: "40+", label: "projects shipped" },
  { n: "10+", label: "businesses served" },
  { n: "100%", label: "built in-house" },
];

export default function WorkPage() {
  const [filter, setFilter] = useState<Category>("All");

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const categories: Category[] = [
    "All",
    "Website",
    "Mobile App",
    "Branding",
    "Security",
  ];

  return (
    <main className="bg-[#F3F1EA] font-sans text-[#11142B]">
      <NavBar />

      {/* hero */}
      <section className="px-5 pb-14 pt-16 md:px-10 md:pb-20 md:pt-24">
        <div className="mx-auto max-w-[1400px]">
          <motion.span
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full bg-[#11142B]/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#11142B]/50"
          >
            Our work
          </motion.span>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 max-w-3xl text-4xl font-light leading-[1.05] tracking-tight sm:text-6xl"
          >
            Real projects for
            <br />
            <span className="font-semibold">real Port Harcourt businesses.</span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-xl text-base text-[#11142B]/60 sm:text-lg"
          >
            The same team that teaches in the classroom builds for paying clients.
            Here is a sample of websites, apps, brands, and security work we have
            shipped.
          </motion.p>

          {/* stats */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-10 flex flex-wrap gap-10"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-semibold text-[#11142B]">{s.n}</p>
                <p className="text-sm text-[#11142B]/55">{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* filter row */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
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

      {/* projects */}
      <section className="px-5 py-10 md:px-10 md:py-16">
        <div className="mx-auto max-w-[1400px]">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project) => (
                <WorkComp key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <p className="text-center text-[#11142B]/50">
              No projects in this category yet.
            </p>
          )}
        </div>
      </section>

      <DeviceCTABanner {...ctaConfigs.work} />

      <Footer />
    </main>
  );
}
