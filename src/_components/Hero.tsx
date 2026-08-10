"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import ContactDrawer from "@/_components/ContactDrawer";

// ── Photo collage cards (right side) ────────────────────────────────────────
// 4 cards: one large feature, three smaller supporting shots.
// Positions are absolute within the collage container.
const PHOTOS = [
  {
    src: "/students-1.jpg",
    alt: "Krystal Tech Hub classroom",
    className:
      "absolute top-0 left-0 w-[58%] aspect-[4/5] rounded-[28px] object-cover object-center shadow-2xl shadow-[#11142B]/20 z-20",
  },
  {
    src: "/students-3.jpg",
    alt: "Student at work",
    className:
      "absolute bottom-[5%] right-0 w-[44%] aspect-[3/4] rounded-[24px] object-cover object-top shadow-xl shadow-[#11142B]/15 z-30",
  },
];

// ── Stats strip ──────────────────────────────────────────────────────────────
const fadeLeft = {
  initial: { opacity: 0, x: -24 },
  animate: { opacity: 1, x: 0 },
};

export default function Hero() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section className="relative isolate overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/newheroimg1.png"
          alt=""
          fill
          priority
          sizes="90vw"
          className="object-cover object-center"
        />
      </div>

      {/* ── Full background image ──────────────────────────────────────────── */}

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-2 lg:gap-16 lg:py-32">
        {/* ── LEFT: copy + CTAs ─────────────────────────────────────────────── */}
        <div className="flex flex-col items-start">
          {/* headline */}
          <motion.h1
            {...fadeLeft}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-6 text-5xl font-light leading-[1.05] tracking-tight text-[#11142B] sm:text-6xl lg:text-7xl"
          >
            We Train
            <br />
            <span className="relative font-bold">
              the Future.
              {/* amber underline swipe */}
              <svg
                viewBox="0 0 260 16"
                className="absolute -bottom-1 left-0 h-3 w-full"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M4 10 C 70 16, 190 3, 256 8"
                  fill="none"
                  stroke="#FFB627"
                  strokeWidth={5}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, delay: 0.7, ease: "easeInOut" }}
                />
              </svg>
            </span>
            <br />
            <span className="text-[#11142B]/50">Build the Present.</span>
          </motion.h1>

          {/* subtext */}
          <motion.p
            {...fadeLeft}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-[#11142B]/65 sm:text-lg"
          >
            Krystal Tech Hub runs hands-on coding programs for young people and
            ships real websites, apps and brands for businesses — all under one
            roof in Port Harcourt.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeLeft}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-[#FFB627] px-7 py-3.5 text-sm font-semibold text-[#11142B] shadow-lg shadow-[#11142B]/20 transition-shadow hover:shadow-[#11142B]/35"
            >
              Start a Project <FiArrowRight className="text-xs" />
            </motion.button>

            <Link href="/programs">
              <motion.span
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#11142B]/25 bg-white px-7 py-3.5 text-sm font-semibold text-[#11142B] transition-colors hover:bg-[#11142B]/5"
              >
                Explore Programs <FiArrowRight className="text-xs" />
              </motion.span>
            </Link>
          </motion.div>

        </div>

        {/* ── RIGHT: photo collage ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
        >
          {/* collage background decorators */}
          <div className="absolute inset-0 -right-8 -top-8 rounded-[40px] bg-[#11142B]/5" />
          <div className="absolute inset-0 -bottom-8 -left-4 rounded-[40px] border border-[#FFB627]/40" />

          {/* collage wrapper — fixed height so cards have room */}
          <div className="relative h-[580px] w-full">
            {PHOTOS.map((photo, i) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={photo.className}
                style={{ position: "absolute" }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 1400px) 50vw, 600px"
                  className={`rounded-[inherit] object-cover ${photo.className.includes("object-top") ? "object-top" : "object-center"}`}
                  priority={i === 0}
                />
              </motion.div>
            ))}

            {/* floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="absolute bottom-[14%] left-[54%] z-40 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-[#11142B]/15"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFB627]">
                <svg viewBox="0 0 20 20" fill="#11142B" className="h-5 w-5">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </span>
              <div>
                <p className="text-xs font-bold text-[#11142B]">8 Programs</p>
                <p className="text-[10px] text-[#11142B]/50">Enrolment open</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <ContactDrawer open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
}
