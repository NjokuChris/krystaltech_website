"use client";

/**
 * Services - Krystal Tech Hub
 * ------------------------------------------------------------
 * Built in the site design system:
 *   - #F3F1EA sand, #11142B ink, #FFB627 amber
 *   - The five services, expanded with what's included + deliverables
 *   - "How we work" strip + project CTA
 *   - Real photos from /public, framer-motion, rounded cards
 */

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaGlobe,
  FaMobileAlt,
  FaPalette,
  FaShieldAlt,
  FaBullhorn,
} from "react-icons/fa";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import type { IconType } from "react-icons";

import NavBar from "@/_components/NavBar";
import Footer from "@/_components/Footer";
import PricingSection from "@/_components/Pricing";
import DeviceCTABanner from "@/_components/DeviceCTABanner";
import { ctaConfigs } from "@/_components/ctaConfigs";

type Service = {
  slug: string;
  Icon: IconType;
  title: string;
  blurb: string;
  includes: string[];
  ink: string;
  tint: string;
};

const SERVICES: Service[] = [
  {
    slug: "website-development",
    Icon: FaGlobe,
    title: "Website Development",
    blurb:
      "Fast, responsive sites that load well on Nigerian networks and turn visitors into customers - from a simple landing page to a full business site.",
    includes: [
      "Responsive design for phone and desktop",
      "Content management you can update yourself",
      "Hosting, domain and SSL setup",
    ],
    ink: "#DC2626",
    tint: "bg-[#FF6B4A]/12",
  },
  {
    slug: "mobile-app-development",
    Icon: FaMobileAlt,
    title: "Mobile App Development",
    blurb:
      "Android and cross-platform apps built to feel quick and simple - from the first prototype through to a store-ready release.",
    includes: [
      "Android and cross-platform builds",
      "Clean, tested user experience",
      "Play Store submission support",
    ],
    ink: "#0D9488",
    tint: "bg-[#2DD4BF]/12",
  },
  {
    slug: "graphic-design",
    Icon: FaPalette,
    title: "Graphic Design",
    blurb:
      "Logos, brand kits and the everyday graphics a business runs on - visuals that stay consistent and get recognised.",
    includes: [
      "Logo and brand identity",
      "Social media and print graphics",
      "Reusable brand style guide",
    ],
    ink: "#7C3AED",
    tint: "bg-[#8B7CF6]/12",
  },
  {
    slug: "online-marketing",
    Icon: FaBullhorn,
    title: "Online Marketing",
    blurb:
      "Campaigns that reach the right people and bring traffic that actually converts - built on numbers, not guesswork.",
    includes: [
      "Social and search campaigns",
      "Content and creative that lands",
      "Clear reporting on what works",
    ],
    ink: "#D97706",
    tint: "bg-[#FFB627]/12",
  },
  {
    slug: "cyber-security",
    Icon: FaShieldAlt,
    title: "Cyber Security",
    blurb:
      "Practical protection for your site, data and users - finding the weak spots before someone else does, and closing them.",
    includes: [
      "Security review and hardening",
      "Backups and recovery planning",
      "Ongoing monitoring options",
    ],
    ink: "#4F46E5",
    tint: "bg-[#6366F1]/12",
  },
];

const HOW = [
  {
    n: "01",
    title: "Talk it through",
    body: "We start with a conversation about what you need and what success looks like - no jargon, no upsell.",
  },
  {
    n: "02",
    title: "Scope and price",
    body: "You get a clear plan, timeline and fixed price before any work begins. No surprises later.",
  },
  {
    n: "03",
    title: "Build and ship",
    body: "We build in the open, share progress as we go, and hand over something you own and can run.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { Icon } = service;
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="flex flex-col rounded-3xl bg-white p-8 ring-1 ring-[#11142B]/[0.06] transition-shadow hover:shadow-xl hover:shadow-[#11142B]/5"
    >
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${service.tint}`}
        style={{ color: service.ink }}
      >
        <Icon size={22} />
      </span>

      <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-[#11142B]/60">
        {service.blurb}
      </p>

      <ul className="mt-6 space-y-2.5 border-t border-[#11142B]/[0.07] pt-6">
        {service.includes.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-sm text-[#11142B]/70"
          >
            <FiCheck
              className="mt-0.5 shrink-0"
              style={{ color: service.ink }}
            />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function ServicesPage() {
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
              What we build
            </motion.span>
            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 text-4xl font-light leading-[1.05] tracking-tight sm:text-6xl"
            >
              Real software,
              <br />
              <span className="font-semibold">built for business.</span>
            </motion.h1>
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 max-w-md text-base text-[#11142B]/60 sm:text-lg"
            >
              Training young builders is half of what we do. The other half is
              shipping websites, apps, brands and security work for the
              businesses around us - the same work our students learn from.
            </motion.p>
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <a
                href="#services"
                className="flex items-center gap-2 rounded-full bg-[#11142B] px-7 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                See what we do <FiArrowRight className="text-xs" />
              </a>
              <Link
                href="/contact"
                className="rounded-full border border-[#11142B]/20 px-7 py-3 text-sm font-semibold text-[#11142B] transition-colors hover:bg-[#11142B]/5"
              >
                Start a project
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
                src="/krystal-class-4.png"
                alt="A developer at work at Krystal Tech Hub"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 700px"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- services */}
      <section
        id="services"
        className="scroll-mt-24 px-5 py-10 md:px-10 md:py-16"
      >
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-end justify-between gap-4"
          >
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
              Five things we do well
            </h2>
            <p className="max-w-sm text-sm text-[#11142B]/55">
              Need something that spans a few of these? That&apos;s usually how
              a good project starts.
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}

            {/* closing tile in the grid */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="flex flex-col justify-between rounded-3xl bg-[#11142B] p-8"
            >
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Not sure where it fits?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  Tell us the problem in plain words. We&apos;ll help you figure
                  out what to build - and what to skip.
                </p>
              </div>
              <Link
                href="/contact"
                className="mt-8 flex w-fit items-center gap-2 rounded-full bg-[#FFB627] px-6 py-3 text-sm font-semibold text-[#11142B] transition-transform hover:-translate-y-0.5"
              >
                Talk to us <FiArrowRight className="text-xs" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- how we work */}
      <section className="px-5 py-16 md:px-10 md:py-24">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-[1400px] overflow-hidden rounded-[36px] bg-[#11142B] px-6 py-14 md:px-14 md:py-20"
        >
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#FFB627]">
              How we work
            </span>
            <h2 className="mt-4 text-3xl font-medium text-white sm:text-4xl">
              Clear from the first call.
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

      <PricingSection />
      {/* ---------------------------------------------------------- cta */}
      <DeviceCTABanner {...ctaConfigs.services} />

      <Footer />
    </main>
  );
}
