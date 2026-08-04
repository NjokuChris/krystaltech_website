"use client";

/**
 * About - Krystal Tech Hub
 * ------------------------------------------------------------
 * Clean, minimal about page in the site design system:
 *   - #F3F1EA sand, #11142B ink, #FFB627 amber, #2DD4BF teal
 *   - Real photos from /public, grounded copy (Port Harcourt)
 *   - Framer Motion, rounded cards, pill CTAs
 */

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiMapPin,
  FiHeart,
  FiTool,
  FiUsers,
} from "react-icons/fi";

import NavBar from "@/_components/NavBar";
import Footer from "@/_components/Footer";
import DeviceCTABanner from "@/_components/DeviceCTABanner";
import { ctaConfigs } from "@/_components/ctaConfigs";

const STATS = [
  { n: "120+", label: "students trained" },
  { n: "10+", label: "businesses served" },
  { n: "8", label: "learning tracks" },
  { n: "2+", label: "years running" },
];

const VALUES = [
  {
    Icon: FiTool,
    title: "Build, don't memorise",
    body: "Every track ends with something real - a game, a site, a robot, a poster. Students leave with work they can show, not just notes they can recite.",
    color: "#D97706",
  },
  {
    Icon: FiUsers,
    title: "Small cohorts",
    body: "We cap our classes so mentors actually know each learner by name and can move at the pace of the room, not a syllabus.",
    color: "#0D9488",
  },
  {
    Icon: FiHeart,
    title: "Taught by people who ship",
    body: "The same team that builds websites and apps for paying clients is the team in the classroom. Kids learn from working practice, not theory alone.",
    color: "#7C3AED",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export default function AboutPage() {
  return (
    <main className="bg-[#F3F1EA] font-sans text-[#11142B]">
      <NavBar />

      {/* ---------------------------------------------------------- hero */}
      <section className="px-5 pb-16 pt-16 md:px-10 md:pb-24 md:pt-24">
        <div className="mx-auto max-w-[1400px]">
          <motion.span
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full bg-[#11142B]/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#11142B]/50"
          >
            Who we are
          </motion.span>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 max-w-4xl text-4xl font-light leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            We train the future,
            <br />
            and <span className="font-semibold">build for the present.</span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-xl text-base text-[#11142B]/60 sm:text-lg"
          >
            Krystal Tech Hub is a technology hub in Port Harcourt with two jobs:
            teaching young people to build with computers, and shipping real
            software and design for the businesses around us.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-10 overflow-hidden rounded-[36px]"
          >
            <div className="relative aspect-[16/10] w-full sm:aspect-[16/7]">
              <Image
                src="/hero-image.jpg"
                alt="Students working together at Krystal Tech Hub"
                fill
                priority
                sizes="(max-width: 1400px) 100vw, 1400px"
                className="object-cover"
              />
            </div>
          </motion.div>

          <div className="mt-4 flex items-center gap-2 text-sm text-[#11142B]/50">
            <FiMapPin className="text-[#FFB627]" />
            54 Old Factory Road, Elelenwo, Port Harcourt, Rivers State
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- story */}
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-[#11142B]/50">
              How we started
            </span>
            <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
              It began with a room and a few laptops.
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-[#11142B]/65">
              <p>
                We kept meeting bright kids who were curious about computers but
                had nowhere to actually use one properly. And we kept meeting
                business owners who needed a website or an app but didn&apos;t
                know who to trust with it.
              </p>
              <p>
                So we put both under one roof. The studio work pays for good
                equipment and keeps our mentors sharp on real projects. The
                classroom passes that experience straight down to the next set
                of builders. One feeds the other.
              </p>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="overflow-hidden rounded-[36px]"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/contact-bg.jpg"
                alt="The team working around a shared table"
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- two sides */}
      <section className="px-5 py-8 md:px-10">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7 }}
          className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 md:grid-cols-2"
        >
          {/* tech hub */}
          <div className="flex flex-col justify-between rounded-[36px] bg-[#11142B] p-8 md:p-12">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#FFB627]">
                The Tech Hub
              </span>
              <h3 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                Where curious kids become confident builders.
              </h3>
              <p className="mt-4 text-white/60">
                Eight hands-on tracks - from ICT fundamentals and Scratch to web
                development, design and robotics - taught in small cohorts by
                mentors who build for a living.
              </p>
            </div>
            <Link
              href="/programs"
              className="mt-8 flex w-fit items-center gap-2 rounded-full bg-[#FFB627] px-6 py-3 text-sm font-semibold text-[#11142B] transition-transform hover:-translate-y-0.5"
            >
              See our programs <FiArrowRight className="text-xs" />
            </Link>
          </div>

          {/* dev studio */}
          <div className="flex flex-col justify-between rounded-[36px] bg-[#EAE7DD] p-8 md:p-12">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#0D9488]">
                The Development Studio
              </span>
              <h3 className="mt-4 text-2xl font-semibold sm:text-3xl">
                Where that skill goes to work for business.
              </h3>
              <p className="mt-4 text-[#11142B]/65">
                Websites, brands, mobile apps and security work - built and
                shipped for real companies. The projects fund the hub and keep
                our teaching honest.
              </p>
            </div>
            <Link
              href="/services"
              className="mt-8 flex w-fit items-center gap-2 rounded-full bg-[#11142B] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              See our services <FiArrowRight className="text-xs" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------- values */}
      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-3xl font-medium tracking-tight sm:text-4xl"
          >
            What we hold ourselves to.
          </motion.h2>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl bg-white p-8"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${v.color}1A`, color: v.color }}
                >
                  <v.Icon className="text-xl" />
                </span>
                <h3 className="mt-6 text-lg font-semibold">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#11142B]/60">
                  {v.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- founder */}
      <section className="px-5 py-8 md:px-10">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7 }}
          className="mx-auto grid max-w-[1400px] grid-cols-1 overflow-hidden rounded-[36px] bg-[#11142B] md:grid-cols-[0.9fr_1.1fr]"
        >
          <div className="relative min-h-[320px] w-full">
            <Image
              src="/Njoku_chris.jpg"
              alt="Njoku Chris, founder of Krystal Tech Hub"
              fill
              sizes="(max-width: 768px) 100vw, 560px"
              className="object-cover object-top"
            />
          </div>
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#FFB627]">
              A note from the founder
            </span>
            <p className="mt-6 text-xl font-light leading-snug text-white sm:text-2xl">
              &ldquo;I didn&apos;t want another place where kids watch slides and
              copy notes. I wanted a workshop - where a twelve-year-old can build
              something on Monday and demo it by Friday. That&apos;s still the
              whole point.&rdquo;
            </p>
            <div className="mt-8">
              <p className="font-semibold text-white">Njoku Chris</p>
              <p className="text-sm text-white/50">Founder &amp; Lead Mentor</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------- stats */}
      <section className="px-5 py-16 md:px-10 md:py-24">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-y-8 border-y border-[#11142B]/10 py-12"
        >
          {STATS.map((s) => (
            <div key={s.label} className="min-w-[140px] flex-1 text-center">
              <p className="text-4xl font-semibold sm:text-5xl">{s.n}</p>
              <p className="mt-2 text-xs uppercase tracking-wide text-[#11142B]/45">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ---------------------------------------------------------- cta */}
      <DeviceCTABanner {...ctaConfigs.about} />

      <Footer />
    </main>
  );
}
