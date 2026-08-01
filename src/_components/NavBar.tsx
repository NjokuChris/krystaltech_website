"use client";

/**
 * NavBar - Krystal Tech Hub
 * ------------------------------------------------------------
 * Clean, minimal top navigation matching the site design system:
 *   - #F3F1EA sand background, #11142B ink, #FFB627 amber accent
 *   - Logo left, simple text links center, pill CTA right
 *   - Framer Motion entrance + animated mobile sheet
 *   - Subtle bottom border + blur that appear once you scroll
 *
 * SETUP: npm install framer-motion react-icons
 * Point the links and the CTA at your real routes.
 */

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";

const NAV_LINKS = [
  { label: "Programs", href: "/programs" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled
          ? "border-b border-[#11142B]/10 bg-[#F3F1EA]/80 backdrop-blur-md"
          : "border-b border-transparent bg-[#F3F1EA]"
      }`}
    >
      <nav className="mx-auto flex h-20 w-full max-w-[1400px] items-center justify-between px-5 md:px-10">
        {/* logo */}
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/krystal4.png"
            alt="Krystal Technologies"
            width={170}
            height={64}
            priority
            className="h-10 w-auto md:h-12"
          />
        </Link>

        {/* desktop links */}
        <ul className="hidden items-center gap-7 md:flex lg:gap-9">
          {NAV_LINKS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="group relative text-sm font-medium text-[#11142B]/70 transition-colors hover:text-[#11142B]"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 rounded-full bg-[#FFB627] transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* desktop CTA */}
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="hidden items-center gap-2 rounded-full bg-[#11142B] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#11142B]/10 transition-shadow hover:shadow-[#11142B]/25 md:flex"
        >
          Get in touch <FiArrowRight className="text-xs" />
        </motion.a>

        {/* mobile toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-[#11142B] transition-colors hover:bg-[#11142B]/5 md:hidden"
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[#11142B]/10 bg-[#F3F1EA] md:hidden"
          >
            <ul className="flex flex-col px-5 py-4">
              {NAV_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-3 py-3 text-base font-medium text-[#11142B]/80 transition-colors hover:bg-[#11142B]/5 hover:text-[#11142B]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#11142B] px-6 py-3 text-sm font-semibold text-white"
                >
                  Get in touch <FiArrowRight className="text-xs" />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
