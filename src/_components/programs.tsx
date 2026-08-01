"use client";

/**
 * CoursesGrid - Krystal Tech Hub
 * ------------------------------------------------------------
 * Stack: Next.js (App Router) + TypeScript + Tailwind + Framer Motion + react-icons
 *
 * 8 programs, 2 rows x 4 columns, each on its own color.
 *
 *  - Base card (always, all breakpoints): icon + title, nothing else.
 *  - Desktop only (md and up): hovering brings a dark overlay up over
 *    the card: icon, title, and a "Learn more" button. Below md this
 *    overlay never renders at all, so touch devices don't get a stuck
 *    hover state.
 *  - Tapping/clicking the card anywhere always goes straight to the
 *    course's detail page, no expand step, no in-between.
 *
 * SETUP
 *   npm install framer-motion react-icons
 * Routing assumes a page per course at /courses/[slug], adjust to
 * match your actual routes.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FiMonitor,
  FiGrid,
  FiGlobe,
  FiPenTool,
  FiFilm,
  FiSmartphone,
  FiCpu,
  FiZap,
} from "react-icons/fi";
import type { IconType } from "react-icons";

// ---------------------------------------------------------------
// Content - each card gets its own color
// ---------------------------------------------------------------

type Course = {
  slug: string;
  Icon: IconType;
  title: string;
  blurb: string;
  tint: string; // light card background
  ink: string; // icon / accent color on the base card
};

const COURSES: Course[] = [
  {
    slug: "ict-fundamentals",
    Icon: FiMonitor,
    title: "ICT Fundamentals",
    blurb: "Computers, files and the internet, the basics done right.",
    tint: "bg-[#FFB627]/15",
    ink: "#D97706",
  },
  {
    slug: "scratch-programming",
    Icon: FiGrid,
    title: "Scratch Programming",
    blurb: "Drag, drop and build your first game or animation.",
    tint: "bg-[#2DD4BF]/15",
    ink: "#0D9488",
  },
  {
    slug: "web-development",
    Icon: FiGlobe,
    title: "Web Development",
    blurb: "HTML, CSS and JavaScript, build and ship a real site.",
    tint: "bg-[#FF6B4A]/15",
    ink: "#DC2626",
  },
  {
    slug: "graphics-design",
    Icon: FiPenTool,
    title: "Graphics Design",
    blurb: "Color, layout and type, design work people notice.",
    tint: "bg-[#8B7CF6]/15",
    ink: "#7C3AED",
  },
  {
    slug: "video-editing",
    Icon: FiFilm,
    title: "Video Editing",
    blurb: "Cut, pace and polish footage into a real story.",
    tint: "bg-[#38BDF8]/15",
    ink: "#0284C7",
  },
  {
    slug: "ui-ux-design",
    Icon: FiSmartphone,
    title: "UI/UX Design",
    blurb: "Design screens that are easy and pleasant to use.",
    tint: "bg-[#FB7185]/15",
    ink: "#E11D48",
  },
  {
    slug: "robotics",
    Icon: FiCpu,
    title: "Robotics",
    blurb: "Sensors, motors and code, build things that move.",
    tint: "bg-[#34D399]/15",
    ink: "#059669",
  },
  {
    slug: "intro-to-ai",
    Icon: FiZap,
    title: "Intro to AI",
    blurb: "Prompting and automation, put AI to work on real tasks.",
    tint: "bg-[#6366F1]/15",
    ink: "#4F46E5",
  },
];

// ---------------------------------------------------------------
// One course card
// ---------------------------------------------------------------

function CourseCard({ course, index }: { course: Course; index: number }) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const { Icon } = course;

  const goToCourse = () => router.push(`/courses/${course.slug}`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={goToCourse}
      className={`relative min-h-[190px] cursor-pointer overflow-hidden rounded-2xl ${course.tint}`}
    >
      {/* base: icon + title + blurb */}
      <div className="flex h-full flex-col justify-between p-5">
        <Icon className="text-2xl" style={{ color: course.ink }} />
        <div>
          <h3 className="text-base font-semibold leading-snug text-[#11142B] sm:text-lg">
            {course.title}
          </h3>
          <p className="mt-1 text-sm text-[#11142B]/60">{course.blurb}</p>
        </div>
      </div>

      {/* desktop-only hover overlay: icon + name + button */}
      <div className="hidden md:block">
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-start justify-between bg-[#11142B] p-5"
            >
              <Icon className="text-2xl text-white" />
              <div className="flex w-full flex-col gap-3">
                <h3 className="text-base font-semibold text-white sm:text-lg">
                  {course.title}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToCourse();
                  }}
                  className="inline-flex w-fit items-center gap-1 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#11142B]"
                >
                  Learn more →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------
// Section
// ---------------------------------------------------------------

export default function CoursesGrid() {
  return (
    <section className="relative bg-[#F3F1EA] px-6 py-24 md:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium uppercase tracking-[0.2em] text-[#11142B]/50"
        >
          What we teach
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-3 text-4xl font-light tracking-tight text-[#11142B] sm:text-5xl"
        >
          Pick a track, start building.
        </motion.h2>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {COURSES.map((course, i) => (
            <CourseCard key={course.slug} course={course} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
