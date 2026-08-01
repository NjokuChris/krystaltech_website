"use client";

/**
 * WhyChooseUs — Krystal Tech Hub
 * ------------------------------------------------------------
 * Stack: Next.js (App Router) + TypeScript + Tailwind + Framer Motion + react-icons
 *
 * Two panels, one per division — Training ("why parents choose us")
 * and Services ("why businesses choose us"). One is always expanded
 * (~82%), the other collapsed to a thin strip (~18%) showing just a
 * vertical label. Hovering (desktop) or tapping (any device) the
 * collapsed strip swaps which one is expanded.
 *
 * Expanded content: eyebrow + real headline copy, a numbered
 * two-column reason grid, and a horizontal stat bar pinned to the
 * bottom with a divider — one vertical anchor instead of two
 * competing alignment rules.
 *
 * SETUP: npm install framer-motion react-icons
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------
// Content
// ---------------------------------------------------------------

type Stat = { n: string; label: string };

type Division = {
  key: "training" | "services";
  label: string; // shown vertically when collapsed
  eyebrow: string; // small label above headline when expanded
  headline: string; // real message, shown when expanded
  reasons: string[]; // short 1-2 word "why" points
  stats: Stat[];
  theme: "light" | "dark";
};

const DIVISIONS: Division[] = [
  {
    key: "training",
    label: "Why parents choose us",
    eyebrow: "Training",
    headline: "A hands-on tech education, built for real careers.",
    reasons: [
      "Real projects",
      "Small cohorts",
      "Expert mentors",
      "Hands-on",
      "Career-ready",
      "Ongoing support",
    ],
    stats: [
      { n: "120+", label: "students trained" },
      { n: "6 wks", label: "per cohort" },
      { n: "1:8", label: "mentor ratio" },
    ],
    theme: "light",
  },
  {
    key: "services",
    label: "Why businesses choose us",
    eyebrow: "Services",
    headline: "Digital work that actually moves the needle.",
    reasons: [
      "Fast delivery",
      "Fair pricing",
      "Modern stack",
      "Full support",
      "Proven results",
      "Clear process",
    ],
    stats: [
      { n: "10+", label: "businesses served" },
      { n: "4x", label: "avg. revenue lift" },
      { n: "2+", label: "years building" },
    ],
    theme: "dark",
  },
];

// ---------------------------------------------------------------
// One panel
// ---------------------------------------------------------------

function Panel({
  division,
  isActive,
  onActivate,
}: {
  division: Division;
  isActive: boolean;
  onActivate: () => void;
}) {
  const isDark = division.theme === "dark";

  return (
    <motion.div
      onClick={onActivate}
      onMouseEnter={onActivate}
      animate={{ flexBasis: isActive ? "82%" : "18%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative min-w-0 flex-shrink-0 cursor-pointer overflow-hidden rounded-3xl ${
        isDark ? "bg-[#11142B]" : "bg-white"
      }`}
      style={{ flexBasis: isActive ? "82%" : "18%" }}
    >
      {/* collapsed: vertical label */}
      <AnimatePresence>
        {!isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span
              className={`whitespace-nowrap text-lg font-medium uppercase tracking-[0.2em] [writing-mode:vertical-rl] ${
                isDark ? "text-white/70" : "text-[#11142B]/60"
              }`}
            >
              {division.label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* expanded: eyebrow/headline, reason grid, stat bar */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="flex h-full flex-col justify-between p-8 sm:p-10"
          >
            {/* top: eyebrow + headline + reason grid */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                  isDark ? "text-[#FFB627]" : "text-[#92600a]"
                }`}
              >
                {division.eyebrow}
              </motion.span>

              <motion.h3
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.25 }}
                className={`mt-3 max-w-md text-3xl font-bold tracking-tight sm:text-4xl ${
                  isDark ? "text-white" : "text-[#11142B]"
                }`}
              >
                {division.headline}
              </motion.h3>

              {/* reason grid: 2 columns, numbered */}
              <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                {division.reasons.map((reason, i) => (
                  <motion.li
                    key={reason}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.06 }}
                    className="flex items-center gap-3"
                  >
                    <span
                      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        isDark
                          ? "bg-white/10 text-[#FFB627]"
                          : "bg-[#92600a]/10 text-[#92600a]"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-lg font-medium sm:text-xl ${
                        isDark ? "text-white/90" : "text-[#11142B]/90"
                      }`}
                    >
                      {reason}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* bottom: stat bar, horizontal, divided */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className={`mt-8 flex md:flex-row flex-col items-start md:items-end gap-8 border-t pt-6 ${
                isDark ? "border-white/10" : "border-[#11142B]/10"
              }`}
            >
              {division.stats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span
                    className={`text-3xl font-bold sm:text-4xl ${
                      isDark ? "text-white" : "text-[#11142B]"
                    }`}
                  >
                    {s.n}
                  </span>
                  <span
                    className={`mt-1 text-xs ${
                      isDark ? "text-white/50" : "text-[#11142B]/50"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ---------------------------------------------------------------
// Section
// ---------------------------------------------------------------

export default function WhyChooseUs() {
  const [active, setActive] = useState<Division["key"]>("training");

  return (
    <section className="bg-[#F3F1EA] px-6 py-24 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* accordion */}
        <div className="mt-14 flex md:h-[460px] gap-3 sm:h-[520px]">
          {DIVISIONS.map((division) => (
            <Panel
              key={division.key}
              division={division}
              isActive={active === division.key}
              onActivate={() => setActive(division.key)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
