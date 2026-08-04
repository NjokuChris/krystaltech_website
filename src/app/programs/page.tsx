"use client";

/**
 * Programs - Krystal Tech Hub
 * ------------------------------------------------------------
 * Built from scratch in the site design system:
 *   - #F3F1EA sand, #11142B ink, #FFB627 amber
 *   - The 8 learning tracks, expanded with age, duration, level
 *     and what each student actually builds
 *   - "How a term runs" strip + enrolment CTA
 *   - Real photos from /public, framer-motion, rounded cards
 */

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiMonitor,
  FiGrid,
  FiGlobe,
  FiPenTool,
  FiFilm,
  FiSmartphone,
  FiCpu,
  FiZap,
  FiArrowRight,
  FiClock,
  FiUser,
  FiCheckCircle,
} from "react-icons/fi";
import type { IconType } from "react-icons";

import NavBar from "@/_components/NavBar";
import Footer from "@/_components/Footer";
import DeviceCTABanner from "@/_components/DeviceCTABanner";
import { ctaConfigs } from "@/_components/ctaConfigs";

type Track = {
  slug: string;
  Icon: IconType;
  title: string;
  level: "Beginner" | "Intermediate";
  age: string;
  duration: string;
  blurb: string;
  builds: string;
  ink: string;
  tint: string;
};

const TRACKS: Track[] = [
  {
    slug: "ict-fundamentals",
    Icon: FiMonitor,
    title: "ICT Fundamentals",
    level: "Beginner",
    age: "Ages 8+",
    duration: "6 weeks",
    blurb:
      "Computers, files, typing and the internet - the groundwork every other track builds on.",
    builds: "A tidy digital workspace and a first typed, formatted document.",
    ink: "#D97706",
    tint: "bg-[#FFB627]/12",
  },
  {
    slug: "scratch-programming",
    Icon: FiGrid,
    title: "Scratch Programming",
    level: "Beginner",
    age: "Ages 8-13",
    duration: "8 weeks",
    blurb:
      "Drag-and-drop coding that teaches real logic - loops, events and conditions - without the syntax.",
    builds: "Your own playable game and a short animation.",
    ink: "#0D9488",
    tint: "bg-[#2DD4BF]/12",
  },
  {
    slug: "web-development",
    Icon: FiGlobe,
    title: "Web Development",
    level: "Intermediate",
    age: "Ages 13+",
    duration: "12 weeks",
    blurb:
      "HTML, CSS and JavaScript from the ground up - how the web actually works, then how to build on it.",
    builds: "A real, responsive website you deploy and share.",
    ink: "#DC2626",
    tint: "bg-[#FF6B4A]/12",
  },
  {
    slug: "graphics-design",
    Icon: FiPenTool,
    title: "Graphics Design",
    level: "Beginner",
    age: "Ages 11+",
    duration: "8 weeks",
    blurb:
      "Colour, layout, type and composition - the eye behind work people actually stop to look at.",
    builds: "A poster, a logo and a small brand kit for a real idea.",
    ink: "#7C3AED",
    tint: "bg-[#8B7CF6]/12",
  },
  {
    slug: "video-editing",
    Icon: FiFilm,
    title: "Video Editing",
    level: "Beginner",
    age: "Ages 11+",
    duration: "6 weeks",
    blurb:
      "Cutting, pacing, sound and colour - turning raw footage into something worth watching.",
    builds: "A finished short video, edited start to finish.",
    ink: "#0284C7",
    tint: "bg-[#38BDF8]/12",
  },
  {
    slug: "ui-ux-design",
    Icon: FiSmartphone,
    title: "UI/UX Design",
    level: "Intermediate",
    age: "Ages 13+",
    duration: "10 weeks",
    blurb:
      "How to design screens people find easy and pleasant - from wireframe to clickable prototype.",
    builds: "A clickable app prototype designed in Figma.",
    ink: "#E11D48",
    tint: "bg-[#FB7185]/12",
  },
  {
    slug: "robotics",
    Icon: FiCpu,
    title: "Robotics",
    level: "Intermediate",
    age: "Ages 10+",
    duration: "10 weeks",
    blurb:
      "Sensors, motors and code brought together - programming things that move and respond.",
    builds: "A working robot that reacts to its surroundings.",
    ink: "#059669",
    tint: "bg-[#34D399]/12",
  },
  {
    slug: "intro-to-ai",
    Icon: FiZap,
    title: "Intro to AI",
    level: "Intermediate",
    age: "Ages 13+",
    duration: "6 weeks",
    blurb:
      "What AI is, where it helps and where it doesn't - and how to put it to work on real tasks.",
    builds: "A small AI-assisted tool solving a problem you pick.",
    ink: "#4F46E5",
    tint: "bg-[#6366F1]/12",
  },
];

const HOW = [
  {
    n: "01",
    title: "Small cohorts",
    body: "Classes are capped so every learner gets attention and moves at a real pace.",
  },
  {
    n: "02",
    title: "Hands-on from day one",
    body: "You build in every session. No term goes by without something to show for it.",
  },
  {
    n: "03",
    title: "A project to finish",
    body: "Each track ends with a real piece of work - and a demo day to present it.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

function TrackCard({ track, index }: { track: Track; index: number }) {
  const { Icon } = track;
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.45, delay: (index % 4) * 0.06 }}
    >
      <Link
        href={`/programs/${track.slug}`}
        className="group flex h-full flex-col rounded-3xl bg-white p-7 ring-1 ring-[#11142B]/[0.06] transition-shadow hover:shadow-xl hover:shadow-[#11142B]/5"
      >
        <div className="flex items-start justify-between">
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${track.tint}`}
            style={{ color: track.ink }}
          >
            <Icon className="text-xl" />
          </span>
          <span className="rounded-full bg-[#11142B]/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-[#11142B]/50">
            {track.level}
          </span>
        </div>

        <h3 className="mt-5 text-lg font-semibold">{track.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#11142B]/60">
          {track.blurb}
        </p>

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#11142B]/55">
          <span className="flex items-center gap-1.5">
            <FiUser className="text-[#FFB627]" /> {track.age}
          </span>
          <span className="flex items-center gap-1.5">
            <FiClock className="text-[#FFB627]" /> {track.duration}
          </span>
        </div>

        <div className="mt-5 flex items-start gap-2 border-t border-[#11142B]/[0.07] pt-5 text-sm text-[#11142B]/70">
          <FiCheckCircle
            className="mt-0.5 shrink-0"
            style={{ color: track.ink }}
          />
          <span>
            <span className="font-medium text-[#11142B]">You build:</span>{" "}
            {track.builds}
          </span>
        </div>

        <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#11142B] transition-colors group-hover:text-[#92600a]">
          View program
          <FiArrowRight className="text-xs transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </motion.div>
  );
}

export default function ProgramsPage() {
  return (
    <main className="bg-[#F3F1EA] font-sans text-[#11142B]">
      <NavBar />

      {/* ---------------------------------------------------------- hero */}
      <section className="px-5 pb-14 pt-16 md:px-10 md:pb-20 md:pt-24">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <motion.span
              {...fadeUp}
              transition={{ duration: 0.5 }}
              className="inline-block rounded-full bg-[#11142B]/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#11142B]/50"
            >
              What we teach
            </motion.span>
            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 text-4xl font-light leading-[1.05] tracking-tight sm:text-6xl"
            >
              Pick a track,
              <br />
              <span className="font-semibold">start building.</span>
            </motion.h1>
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 max-w-md text-base text-[#11142B]/60 sm:text-lg"
            >
              Eight hands-on programs for young builders, from first-time
              computer skills to shipping a real website. Every track is taught
              in small cohorts and ends with something you made.
            </motion.p>
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <a
                href="#tracks"
                className="flex items-center gap-2 rounded-full bg-[#11142B] px-7 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Browse the tracks <FiArrowRight className="text-xs" />
              </a>
              <Link
                href="/contact"
                className="rounded-full border border-[#11142B]/20 px-7 py-3 text-sm font-semibold text-[#11142B] transition-colors hover:bg-[#11142B]/5"
              >
                Reserve a seat
              </Link>
            </motion.div>
          </div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="overflow-hidden rounded-[36px]"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/hero-image.jpg"
                alt="Students building together at Krystal Tech Hub"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 700px"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- tracks */}
      <section id="tracks" className="scroll-mt-24 px-5 py-10 md:px-10 md:py-16">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-end justify-between gap-4"
          >
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
              The eight tracks
            </h2>
            <p className="max-w-sm text-sm text-[#11142B]/55">
              Start anywhere that fits. Beginners usually begin with ICT
              Fundamentals or Scratch.
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRACKS.map((track, i) => (
              <TrackCard key={track.slug} track={track} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- how it runs */}
      <section className="px-5 py-16 md:px-10 md:py-24">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-[1400px] overflow-hidden rounded-[36px] bg-[#11142B] px-6 py-14 md:px-14 md:py-20"
        >
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#FFB627]">
              How a term runs
            </span>
            <h2 className="mt-4 text-3xl font-medium text-white sm:text-4xl">
              Less watching. More making.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {HOW.map((h, i) => (
              <motion.div
                key={h.n}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl bg-white/[0.04] p-8 ring-1 ring-white/10"
              >
                <span className="font-mono text-sm text-[#FFB627]">{h.n}</span>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {h.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  {h.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------- cta */}
      <DeviceCTABanner {...ctaConfigs.programs} />

      <Footer />
    </main>
  );
}
