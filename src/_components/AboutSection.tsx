"use client";

import { motion } from "framer-motion";
import { FaGraduationCap, FaBriefcase, FaArrowRight } from "react-icons/fa6";

/**
 * AboutSection — Krystal Tech Hub
 * ------------------------------------------------------------
 * Same dark rounded card, same "text only, one CTA row" idea — but
 * now that each side's copy is a full paragraph, it's contained in
 * its own panel (instead of floating loose on the dark background)
 * with a bold lead sentence pulled out of each blurb, so it reads as
 * a scannable intro line + supporting detail instead of one dense
 * block of text.
 *
 * SETUP: npm install framer-motion react-icons
 * Point the two buttons at your real /programs and /services routes.
 */

const STATS = [
  { n: "120+", label: "students trained" },
  { n: "10+", label: "businesses served" },
  { n: "2+", label: "years building" },
];

export default function AboutSection() {
  return (
    <section className="w-full bg-[#F3F1EA] px-3 py-16 md:px-6 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-[1400px] overflow-hidden rounded-[36px] bg-[#11142B] px-6 py-16 md:px-16 md:py-20"
      >
        {/* intro */}
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-fit rounded-full bg-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[#FFB627]"
          >
            Who we are
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 text-4xl font-medium leading-tight text-white sm:text-5xl"
          >
            <span className="font-light"> Teaching today&apos;s kids.</span>
            <br />
            Building today&apos;s businesses.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base text-white/50 sm:text-lg"
          >
            Krystal Tech Hub is two things under one roof — a hands-on training
            ground for young builders, and a development studio shipping real
            work for real companies.
          </motion.p>
        </div>

        <div className="mx-auto mt-14 h-px w-full max-w-4xl bg-white/10" />

        {/* two sides — each in its own contained panel */}
        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-4 rounded-3xl bg-white/[0.03] p-7 ring-1 ring-white/10 sm:p-8"
          >
            <FaGraduationCap className="text-2xl text-[#FFB627]" />
            <h3 className="text-xl font-semibold text-white">Our Tech Hub</h3>
            <p className="text-sm leading-relaxed text-white/50 sm:text-base">
              <span className="font-medium text-white/85">
                We help curious minds become confident builders.
              </span>{" "}
              Through hands-on training in ICT, programming, UI/UX design,
              robotics and other digital skills, learners grow in small cohorts
              where they create real projects and develop the confidence to
              build with technology — preparing them for higher education,
              careers, entrepreneurship, and a world technology keeps shaping.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="flex flex-col gap-4 rounded-3xl bg-white/[0.03] p-7 ring-1 ring-white/10 sm:p-8"
          >
            <FaBriefcase className="text-2xl text-[#2DD4BF]" />
            <h3 className="text-xl font-semibold text-white">
              Our Development Hub
            </h3>
            <p className="text-sm leading-relaxed text-white/50 sm:text-base">
              <span className="font-medium text-white/85">
                We help businesses grow through digital solutions.
              </span>{" "}
              Working with startups, schools, SMEs and organizations, we design
              and build websites, software and brand experiences — turning ideas
              into functional products and improving existing systems with a
              practical, product-focused approach.
            </p>
          </motion.div>
        </div>

        {/* cta row — see the actual lists */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="/programs"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 rounded-full bg-[#FFB627] px-7 py-3 text-sm font-semibold text-[#11142B] shadow-md shadow-[#FFB627]/20 transition-shadow hover:shadow-[#FFB627]/40"
          >
            See our programs <FaArrowRight className="text-xs" />
          </motion.a>

          <motion.a
            href="/services"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
          >
            See our services <FaArrowRight className="text-xs" />
          </motion.a>
        </motion.div>

        {/* stats */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="mx-auto mt-14 flex max-w-4xl flex-wrap items-center justify-center gap-x-14 gap-y-6 border-t border-white/10 pt-10"
        >
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-semibold text-white">{s.n}</p>
              <p className="mt-1 text-xs text-white/45">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
