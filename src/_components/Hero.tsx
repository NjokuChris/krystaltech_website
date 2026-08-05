"use client";

/**
 * TechHubHero - Krystal Tech Hub landing hero
 * ------------------------------------------------------------
 * Stack: Next.js (App Router) + TypeScript + Tailwind + Framer Motion
 * Layout modeled on a centered headline + fanned photo-card row,
 * with an underline swipe under the headline and a pill CTA
 * sitting below the card row.
 *
 * DESIGN NOTE ON IMAGES
 * The cards use generic stock photos (kids typing, coding, at
 * computers) from Pexels, just plain photos, no text/labels on them.
 * Six show on mobile, eight on desktop. Swap each `photo` URL in CARDS
 * for a real photo of your own students (with parental consent) when
 * ready, same img tag, same frame, same animation.
 *
 * SETUP
 * npm install framer-motion
 * Optional: load real fonts via next/font, e.g.
 *   import { Space_Grotesk } from 'next/font/google'
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ContactDrawer from "@/_components/ContactDrawer";

// ---------------------------------------------------------------
// Content
// ---------------------------------------------------------------

type Pose = { rotate: number; x: number; y: number };

type Card = {
  photo: string;
  mobile: Pose; // resting pose in the 6-up mobile fan
  desktop: Pose; // resting pose in the 8-up desktop fan
  desktopOnly?: boolean; // the two extra cards, hidden below md
};

// Six cards render on mobile, all eight on desktop. The two
// desktopOnly cards sit on the outer edges of the wider desktop fan.
const CARDS: Card[] = [
  {
    photo: "https://images.pexels.com/photos/8500352/pexels-photo-8500352.jpeg",
    mobile: { rotate: -15, x: -360, y: 40 },
    desktop: { rotate: -16, x: -430, y: 44 },
  },
  {
    photo: "/students-3.jpg",
    mobile: { rotate: -9, x: -216, y: 16 },
    desktop: { rotate: -11, x: -307, y: 20 },
  },
  {
    photo: "https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg",
    mobile: { rotate: -3, x: -72, y: -6 },
    desktop: { rotate: -6, x: -184, y: 2 },
  },
  {
    photo: "/students-5.jpg",
    mobile: { rotate: 3, x: 72, y: -6 },
    desktop: { rotate: -2, x: -61, y: -8 },
  },
  {
    photo: "/students-6.jpg",
    mobile: { rotate: 9, x: 216, y: 16 },
    desktop: { rotate: 2, x: 61, y: -8 },
  },
  {
    photo: "/students-2.jpg",
    mobile: { rotate: 15, x: 360, y: 40 },
    desktop: { rotate: 6, x: 184, y: 2 },
  },
  {
    photo: "/students-4.jpg",
    mobile: { rotate: 0, x: 0, y: 0 },
    desktop: { rotate: 11, x: 307, y: 20 },
    desktopOnly: true,
  },
  {
    photo: "https://images.pexels.com/photos/5212700/pexels-photo-5212700.jpeg",
    mobile: { rotate: 0, x: 0, y: 0 },
    desktop: { rotate: 16, x: 430, y: 44 },
    desktopOnly: true,
  },
];

// ---------------------------------------------------------------
// Hand-drawn underline swipe under the headline
// ---------------------------------------------------------------

function UnderlineSwipe() {
  return (
    <svg
      viewBox="0 0 300 20"
      className="absolute -bottom-2 left-0 h-4 w-full"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M4 12 C 80 18, 220 4, 296 10"
        fill="none"
        stroke="#FFB627"
        strokeWidth={5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, delay: 0.6, ease: "easeInOut" }}
      />
    </svg>
  );
}

// ---------------------------------------------------------------
// One plain photo card in the fanned row
// ---------------------------------------------------------------

function PhotoCard({ c, index, pose }: { c: Card; index: number; pose: Pose }) {
  return (
    <motion.div
      className={`absolute left-1/2 top-1/2 h-50 w-44 -translate-x-1/2 -translate-y-1/2 cursor-pointer overflow-hidden rounded-[28px] shadow-2xl sm:h-62 sm:w-52 ${
        c.desktopOnly ? "hidden md:block" : ""
      }`}
      style={{ zIndex: index }}
      initial={{ x: 0, y: 30, rotate: 0, opacity: 0, scale: 0.92 }}
      animate={{
        x: pose.x,
        y: pose.y,
        rotate: pose.rotate,
        opacity: 1,
        scale: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 110,
        damping: 15,
        delay: 0.15 * index,
      }}
      whileHover={{
        rotate: 0,
        scale: 1.06,
        y: pose.y - 16,
        zIndex: 50,
        transition: { type: "spring", stiffness: 300, damping: 18 },
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={c.photo}
        alt=""
        className="h-full w-full bg-[#e9e6dd] object-cover"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.background = "#e9e6dd";
        }}
      />
    </motion.div>
  );
}

// ---------------------------------------------------------------
// Hero
// ---------------------------------------------------------------

export default function TechHubHero() {
  // Pick each card's resting pose by breakpoint: the desktop fan is
  // wider (8 cards), the mobile fan tighter (6). md = 768px.
  const [isDesktop, setIsDesktop] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section className="relative isolate overflow-hidden z-50 bg-[#F3F1EA] px-6 pb-40 pt-7 md:px-12">
      <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl font-light leading-[1.05] tracking-tight text-[#11142B] sm:text-6xl lg:text-7xl"
        >
          We Train and build
          <br />
          <span className="relative uppercase inline-block font-bold">
            the future
            <UnderlineSwipe />
          </span>
        </motion.h1>

        {/* fanned photo row: 6 cards on mobile, 8 on desktop */}
        <div className="relative mt-10 h-72 w-full max-w-6xl sm:mt-10 sm:h-80">
          {CARDS.map((c, i) => (
            <PhotoCard
              key={c.photo}
              c={c}
              index={i}
              pose={isDesktop ? c.desktop : c.mobile}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8 max-w-md text-sm text-[#11142B]/70 font-medium sm:text-base"
        >
          We build future tech talent and premium software.
          <br />
          For ambitious people and growing businesses.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.15 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setContactOpen(true)}
            className="rounded-full bg-[#11142B] px-8 py-3 text-sm font-semibold text-white shadow-xl"
          >
            Start a Project
          </motion.button>
          <Link href="/programs">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full border border-[#11142B]/20 px-8 py-3 text-sm font-semibold text-[#11142B]"
            >
              See courses
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <ContactDrawer  open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
}
