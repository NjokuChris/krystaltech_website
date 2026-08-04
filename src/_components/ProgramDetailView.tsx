"use client";

/**
 * ProgramDetailView - Krystal Tech Hub
 * ------------------------------------------------------------
 * Presentation for a single program detail page. Content comes
 * from PROGRAM_DETAILS (see programDetails.ts) via the [slug] route.
 *
 * Design system: #F3F1EA sand, #11142B ink, #FFB627 amber.
 */

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiArrowLeft,
  FiClock,
  FiCheckCircle,
  FiAward,
  FiTag,
} from "react-icons/fi";

import NavBar from "@/_components/NavBar";
import Footer from "@/_components/Footer";
import type { ProgramDetail } from "@/_components/programDetails";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export default function ProgramDetailView({ data }: { data: ProgramDetail }) {
  return (
    <main className="bg-[#F3F1EA] font-sans text-[#11142B]">
      <NavBar />

      {/* ---------------------------------------------------------- hero */}
      <section className="px-5 pb-14 pt-12 md:px-10 md:pb-20 md:pt-20">
        <div className="mx-auto max-w-[1400px]">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#11142B]/50 transition-colors hover:text-[#11142B]"
            >
              <FiArrowLeft className="text-xs" /> All programs
            </Link>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <motion.span
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="text-xs font-medium uppercase tracking-[0.2em] text-[#92600a]"
              >
                {data.category}
              </motion.span>
              <motion.h1
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-4 text-4xl font-light leading-[1.05] tracking-tight sm:text-6xl"
              >
                {data.titleTop}
                <br />
                <span className="font-semibold">{data.titleBottom}</span>
              </motion.h1>

              <motion.div
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mt-6 flex flex-wrap gap-4"
              >
                <Link
                  href="/contact"
                  className="flex items-center gap-2 rounded-full bg-[#11142B] px-7 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  Register now <FiArrowRight className="text-xs" />
                </Link>
                <div className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium ring-1 ring-[#11142B]/[0.08]">
                  <FiClock className="text-[#FFB627]" /> {data.duration}
                </div>
              </motion.div>
            </div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="overflow-hidden rounded-[36px]"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={data.image}
                  alt={`${data.titleBottom} at Krystal Tech Hub`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* intro paragraphs */}
          <div className="mt-12 max-w-3xl space-y-5">
            {data.intro.map((para, i) => (
              <motion.p
                key={i}
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.05 }}
                className="text-base leading-relaxed text-[#11142B]/70 sm:text-lg"
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- who should attend */}
      <section className="px-5 py-10 md:px-10 md:py-16">
        <div className="mx-auto max-w-[1400px]">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#11142B]/40">
              From Beginner To Mastery
            </span>
            <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
              Who should attend
            </h2>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.whoShouldAttend.map((item, i) => (
              <motion.div
                key={item.n}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-3xl bg-white p-7 ring-1 ring-[#11142B]/[0.06]"
              >
                <span className="font-mono text-sm text-[#FFB627]">
                  {item.n}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#11142B]/60">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- why choose us */}
      <section className="px-5 py-10 md:px-10 md:py-16">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-[1400px] overflow-hidden rounded-[36px] bg-[#11142B] px-6 py-14 md:px-14 md:py-16"
        >
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#FFB627]">
            Benefits of training at Krystal Tech Hub
          </span>
          <h2 className="mt-4 max-w-2xl text-3xl font-medium text-white sm:text-4xl">
            Why choose us?
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60">
            {data.whyChooseUs}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {data.badges.map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 text-sm font-medium text-white ring-1 ring-white/10"
              >
                <FiAward className="text-[#FFB627]" /> {badge}
              </span>
            ))}
          </div>

          <Link
            href="/contact"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#FFB627] px-7 py-3 text-sm font-semibold text-[#11142B] transition-transform hover:-translate-y-0.5"
          >
            Register now <FiArrowRight className="text-xs" />
          </Link>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------- content + pricing */}
      <section className="px-5 py-10 md:px-10 md:py-16">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:gap-12">
          {/* course content */}
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#11142B]/40">
              What you will learn
            </span>
            <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
              Course content
            </h2>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {data.courseContent.map((topic, i) => (
                <motion.li
                  key={topic}
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                  className="flex items-start gap-3 rounded-2xl bg-white p-4 text-sm ring-1 ring-[#11142B]/[0.06]"
                >
                  <FiCheckCircle className="mt-0.5 shrink-0 text-[#FFB627]" />
                  <span className="font-medium text-[#11142B]/80">{topic}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* pricing card */}
          <motion.aside
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="h-fit rounded-3xl bg-white p-8 ring-1 ring-[#11142B]/[0.06] lg:sticky lg:top-24"
          >
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-[#11142B]/45">
              <FiClock className="text-[#FFB627]" /> Duration
            </div>
            <p className="mt-1 text-2xl font-semibold">{data.duration}</p>

            <div className="mt-6 border-t border-[#11142B]/[0.08] pt-6">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-[#11142B]/45">
                <FiTag className="text-[#FFB627]" /> Fee
              </div>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#11142B]">
                  {data.discountFee}
                </span>
                <span className="text-lg font-medium text-[#11142B]/35 line-through">
                  {data.fee}
                </span>
              </div>
              <p className="mt-1 text-xs font-medium text-[#059669]">
                Discount price - limited slots
              </p>
            </div>

            <Link
              href="/contact"
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[#11142B] px-7 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Register now <FiArrowRight className="text-xs" />
            </Link>
          </motion.aside>
        </div>
      </section>

      <div className="pb-10" />
      <Footer />
    </main>
  );
}
