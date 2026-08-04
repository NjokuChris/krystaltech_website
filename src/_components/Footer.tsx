"use client";

/**
 * Footer - Krystal Tech Hub
 * ------------------------------------------------------------
 * Dark counterpart to the sand NavBar, using the same design system:
 *   - #11142B ink background, #F3F1EA sand text, #FFB627 amber accent
 *   - Logo + socials, three link columns, and the live MapPreview
 *   - Framer Motion entrance on scroll into view
 *   - Slim legal bar with animated underline links
 *
 * SETUP: npm install framer-motion react-icons
 * Point the links and socials at your real routes.
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";
import MapPreview from "./MapPreview";

const LINK_COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Web Development", href: "/services/web" },
      { label: "Mobile Apps", href: "/services/mobile" },
      { label: "AI Solutions", href: "/services/ai" },
      { label: "Cloud & DevOps", href: "/services/cloud" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Pricing", href: "/pricing" },
      { label: "FAQ", href: "/contact#faq" },
      { label: "System Status", href: "/status" },
    ],
  },
];

const SOCIALS = [
  { label: "Facebook", href: "https://facebook.com", Icon: FaFacebook },
  { label: "Instagram", href: "https://instagram.com", Icon: FaInstagram },
  { label: "X", href: "https://x.com", Icon: FaXTwitter },
];

const LEGAL_LINKS = [
  { label: "Terms of Use", href: "#" },
  { label: "Cookie Policy", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const Footer = () => {
  return (
    <footer className="relative w-full md:h-[78vh] overflow-hidden rounded-t-[2rem] bg-[#11142B] text-[#F3F1EA] md:rounded-t-[4rem]">
      {/* huge two-line watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-4 z-0 flex select-none flex-col items-start px-5 leading-[0.8] md:px-10"
      >
        <span className="text-[19vw] font-black tracking-tighter text-[#F3F1EA]/[0.04] md:text-[15vw]">
          Krystal
        </span>
        <span className="text-[19vw] font-black tracking-tighter text-[#F3F1EA]/[0.04] md:text-[15vw]">
          Technologies
        </span>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-20 mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-12 px-5 py-16 md:grid-cols-2 md:px-10 lg:grid-cols-12 lg:gap-8"
      >
        {/* brand + socials */}
        <motion.div
          variants={item}
          className="flex flex-col items-start lg:col-span-4"
        >
          <p className="max-w-xs text-sm leading-relaxed text-[#F3F1EA]/60">
            Building thoughtful digital products — web, mobile, AI, and cloud —
            for teams that care about the details.
          </p>

          <div className="mt-6 flex gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.94 }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#F3F1EA]/15 text-lg text-[#F3F1EA]/80 transition-colors hover:border-[#FFB627] hover:bg-[#FFB627] hover:text-[#11142B]"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* link columns */}
        {LINK_COLUMNS.map((column) => (
          <motion.div
            key={column.title}
            variants={item}
            className="lg:col-span-2"
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FFB627]">
              {column.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-[#F3F1EA]/70 transition-colors hover:text-[#F3F1EA]"
                  >
                    {link.label}
                    <FiArrowUpRight className="text-xs opacity-0 -translate-x-1 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}

        {/* map */}
        <motion.div
          variants={item}
          className="flex justify-start md:col-span-2 lg:col-span-2 lg:justify-end"
        >
          <MapPreview />
        </motion.div>
      </motion.div>

      {/* legal bar */}
      <div className="relative z-20 border-b border-[#F3F1EA]/10">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col-reverse items-center justify-between gap-4 px-5 py-6 md:flex-row md:px-10">
          <p className="text-sm text-[#F3F1EA]/50">
            © {new Date().getFullYear()} Krystal Technologies. All rights
            reserved.
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="group relative text-sm text-[#F3F1EA]/60 transition-colors hover:text-[#F3F1EA]"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-[#FFB627] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
