"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiArrowRight, FiChevronDown } from "react-icons/fi";
import { PROGRAM_NAV } from "@/_components/programDetails";
import ContactDrawer from "@/_components/ContactDrawer";
type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const NAV_LINKS: NavLink[] = [
  { label: "Programs", href: "/programs", children: PROGRAM_NAV },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = contactOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [contactOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileSubOpen(false);
  };

  return (
    <>
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
        <nav className="mx-auto flex h-20 w-full max-w-[1400px] items-center justify-between pr-5 md:px-10">
          {/* logo */}
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/krystal4.png"
              alt="Krystal Technologies"
              width={270}
              height={84}
              priority
              className="h-13 w-auto md:h-12"
            />
          </Link>

          {/* desktop links */}
          <ul className="hidden items-center gap-7 md:flex lg:gap-9">
            {NAV_LINKS.map((item) =>
              item.children ? (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setDesktopOpen(true)}
                  onMouseLeave={() => setDesktopOpen(false)}
                >
                  <Link
                    href={item.href}
                    className="group relative flex items-center gap-1 text-sm font-medium text-[#11142B]/70 transition-colors hover:text-[#11142B]"
                  >
                    {item.label}
                    <FiChevronDown
                      className={`text-xs transition-transform duration-300 ${
                        desktopOpen ? "rotate-180" : ""
                      }`}
                    />
                    <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 rounded-full bg-[#FFB627] transition-all duration-300 group-hover:w-full" />
                  </Link>

                  <AnimatePresence>
                    {desktopOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-4"
                      >
                        <div className="overflow-hidden rounded-2xl border border-[#11142B]/10 bg-[#F3F1EA] p-2 shadow-xl shadow-[#11142B]/10">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-[#11142B]/75 transition-colors hover:bg-[#11142B]/5 hover:text-[#11142B]"
                            >
                              {child.label}
                              <FiArrowRight className="text-xs opacity-0 -translate-x-1 text-[#FFB627] transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                            </Link>
                          ))}
                          <Link
                            href={item.href}
                            className="mt-1 flex items-center justify-center gap-1 rounded-xl bg-[#11142B]/[0.04] px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-[#11142B]/60 transition-colors hover:bg-[#11142B]/[0.08] hover:text-[#11142B]"
                          >
                            View all programs <FiArrowRight className="text-xs" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group relative text-sm font-medium text-[#11142B]/70 transition-colors hover:text-[#11142B]"
                  >
                    {item.label}
                    <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 rounded-full bg-[#FFB627] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ),
            )}
          </ul>

          {/* desktop CTA — opens overlay */}
          <motion.button
            onClick={() => setContactOpen(true)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="hidden items-center gap-2 rounded-full bg-[#11142B] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#11142B]/10 transition-shadow hover:shadow-[#11142B]/25 md:flex"
          >
            Get in touch <FiArrowRight className="text-xs" />
          </motion.button>

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
                {NAV_LINKS.map((item) =>
                  item.children ? (
                    <li key={item.label}>
                      <div className="flex items-center justify-between">
                        <Link
                          href={item.href}
                          onClick={closeMobile}
                          className="flex-1 rounded-xl px-3 py-3 text-base font-medium text-[#11142B]/80 transition-colors hover:bg-[#11142B]/5 hover:text-[#11142B]"
                        >
                          {item.label}
                        </Link>
                        <button
                          onClick={() => setMobileSubOpen((v) => !v)}
                          aria-label="Toggle programs submenu"
                          className="flex h-10 w-10 items-center justify-center rounded-xl text-[#11142B]/70 transition-colors hover:bg-[#11142B]/5"
                        >
                          <FiChevronDown
                            className={`transition-transform duration-300 ${
                              mobileSubOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

                      <AnimatePresence>
                        {mobileSubOpen && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden pl-3"
                          >
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={closeMobile}
                                  className="block rounded-xl border-l border-[#11142B]/10 px-4 py-2.5 text-sm text-[#11142B]/70 transition-colors hover:bg-[#11142B]/5 hover:text-[#11142B]"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  ) : (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={closeMobile}
                        className="block rounded-xl px-3 py-3 text-base font-medium text-[#11142B]/80 transition-colors hover:bg-[#11142B]/5 hover:text-[#11142B]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ),
                )}
                <li className="mt-2">
                  <button
                    onClick={() => { closeMobile(); setContactOpen(true); }}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#11142B] px-6 py-3 text-sm font-semibold text-white"
                  >
                    Get in touch <FiArrowRight className="text-xs" />
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── Contact drawer ─────────────────────────────────────────────── */}
      <ContactDrawer open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
