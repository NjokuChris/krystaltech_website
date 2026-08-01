"use client";

/**
 * BusinessServices - Krystal Tech Hub
 * ------------------------------------------------------------
 * Stack: Next.js (App Router) + TypeScript + Tailwind + Framer Motion + react-icons
 *
 * Layout/build is the bento card grid you already had (one tall
 * standout card spanning 2 rows, four regular cards around it),
 * recolored to the site palette, with the numbered labels, the round
 * arrow button per card, and the section heading + "Start a project"
 * CTA added on top.
 *
 * SETUP: npm install framer-motion react-icons
 * Swap /ph-mockup.png and the arrow-button hrefs for your real asset
 * and routes.
 */

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaBullhorn,
  FaGlobe,
  FaMobileAlt,
  FaPalette,
  FaShieldAlt,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import type { IconType } from "react-icons";

// ---------------------------------------------------------------
// Content
// ---------------------------------------------------------------

type Service = {
  n: string;
  Icon: IconType;
  title: string;
  blurb: string;
  card: string; // gradient background
  iconColor: string;
  text: string; // heading text color
  body: string; // paragraph text color
  arrowBg: string; // round button background
  arrowFg: string; // round button icon color
  span?: string; // grid span override
  image?: string;
};

const SERVICES: Service[] = [
  {
    n: "01",
    Icon: FaPalette,
    title: "Graphic Design",
    blurb:
      "Visuals that speak clearly, build recognition, and keep a brand unforgettable.",
    card: "bg-gradient-to-br from-[#11142B] to-[#1B2145]",
    iconColor: "#8B7CF6",
    text: "text-white",
    body: "text-white/60",
    arrowBg: "bg-white/10",
    arrowFg: "text-white",
  },
  {
    n: "02",
    Icon: FaMobileAlt,
    title: "Mobile App Development",
    blurb:
      "Sleek, fast apps that engage users and bring ideas to life across every device.",
    card: "bg-gradient-to-br from-[#FFB627] to-[#FF6B4A]",
    iconColor: "#11142B",
    text: "text-[#11142B]",
    body: "text-[#11142B]/70",
    arrowBg: "bg-[#11142B]",
    arrowFg: "text-white",
    span: "sm:row-span-2",
    image: "/ph-mockup.png",
  },
  {
    n: "03",
    Icon: FaBullhorn,
    title: "Online Marketing",
    blurb:
      "Data-driven campaigns that reach the right audience and grow traffic that converts.",
    card: "bg-gradient-to-br from-[#2DD4BF] to-[#0D9488]",
    iconColor: "#ffffff",
    text: "text-white",
    body: "text-white/70",
    arrowBg: "bg-white/15",
    arrowFg: "text-white",
  },
  {
    n: "04",
    Icon: FaShieldAlt,
    title: "Cyber Security",
    blurb:
      "Proactive security strategies that protect data and users, and keep threats away for good.",
    card: "bg-gradient-to-br from-[#6366F1] to-[#4F46E5]",
    iconColor: "#ffffff",
    text: "text-white",
    body: "text-white/70",
    arrowBg: "bg-white/15",
    arrowFg: "text-white",
  },
  {
    n: "05",
    Icon: FaGlobe,
    title: "Website Development",
    blurb:
      "Powerful, fast-loading websites that turn visitors into loyal customers.",
    card: "bg-gradient-to-br from-[#11142B] to-[#1B2145]",
    iconColor: "#FF6B4A",
    text: "text-white",
    body: "text-white/60",
    arrowBg: "bg-white/10",
    arrowFg: "text-white",
  },
];

// ---------------------------------------------------------------
// One service card
// ---------------------------------------------------------------

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { Icon } = service;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ scale: 1.03 }}
      className={`card flex flex-col justify-between rounded-2xl  shadow-lg transition-shadow duration-300 hover:shadow-2xl ${service.card} ${service.span ?? ""}`}
    >
      <div className="flex flex-col gap-4 p-8">
        <div className="flex items-center justify-between">
          <Icon size={28} style={{ color: service.iconColor }} />
          <span className={`font-mono text-xs ${service.body}`}>
            {service.n}
          </span>
        </div>
        <h2 className={`text-xl font-semibold ${service.text}`}>
          {service.title}
        </h2>
        <p className={service.body}>{service.blurb}</p>
      </div>
      <div className="">
        {service.image && (
          <Image
            src={service.image}
            alt="mobile app mockup"
            width={280}
            height={280}
            className="mx-auto bottom-0 right-12 w-full max-w-[340px] rounded-2xl"
          />
        )}
      </div>{" "}
      {!service.image && (
        <div className="flex justify-end pr-4 pb-4">
          <motion.span
            whileHover={{ x: 3, y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`flex h-9 w-9 items-center justify-center self-end rounded-full ${service.arrowBg} ${service.arrowFg}`}
          >
            <FiArrowUpRight />
          </motion.span>
        </div>
      )}
    </motion.div>
  );
}

// ---------------------------------------------------------------
// Section
// ---------------------------------------------------------------

export default function BusinessServices() {
  return (
    <section className="flex w-full flex-col items-center overflow-hidden bg-[#F3F1EA] py-20">
      <div className="w-[90vw] md:w-[80vw]">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium uppercase tracking-[0.2em] text-[#11142B]/50"
          >
            Beyond the classroom
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-3 text-4xl font-light tracking-tight text-[#11142B] sm:text-5xl"
          >
            We also build for business.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 max-w-lg text-sm text-[#11142B]/60 sm:text-base"
          >
            Training the next generation is half of what we do. The other half
            is shipping real work for real businesses: sites, brands and tools
            our own students learn from.
          </motion.p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.n} service={service} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 flex justify-center"
        >
          <button className="rounded-full bg-[#11142B] px-8 py-3 text-sm font-semibold text-white shadow-xl transition-transform hover:-translate-y-0.5">
            Start a project
          </button>
        </motion.div>
      </div>
    </section>
  );
}
