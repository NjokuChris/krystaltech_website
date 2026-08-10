"use client";

import { motion } from "framer-motion";
import { FiCircle, FiHexagon, FiOctagon, FiSquare, FiTriangle, FiZap } from "react-icons/fi";

const stats = [
  { value: "120+", label: "students trained" },
  { value: "10+", label: "businesses served" },
  { value: "8", label: "learning tracks" },
  { value: "2+", label: "years running" },
];

const partners = [
  { name: "NorthPeak", Icon: FiTriangle },
  { name: "Novacore", Icon: FiHexagon },
  { name: "Brightlab", Icon: FiZap },
  { name: "Orbit", Icon: FiCircle },
  { name: "Quadra", Icon: FiSquare },
  { name: "Octane", Icon: FiOctagon },
];

export default function StatsPartners() {
  const scrollingPartners = [...partners, ...partners];

  return (
    <section className="overflow-hidden bg-[#11142B] text-white">
      <div className="mx-auto grid max-w-[1400px] lg:grid-cols-2">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 px-5 py-10 md:px-10 lg:border-r lg:border-white/10 lg:py-12">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-semibold sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-xs text-white/55 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="min-w-0 border-t border-white/10 py-8 lg:border-t-0 lg:py-0">
          <p className="px-5 text-xs font-medium uppercase tracking-[0.2em] text-white/45 md:px-10 lg:pt-10">
            Partners and collaborators
          </p>
          <div className="mt-6 overflow-hidden">
            <motion.div
              className="flex w-max items-center gap-10 px-5 md:gap-16 md:px-10 lg:gap-20"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 24, ease: "linear", repeat: Infinity }}
            >
              {scrollingPartners.map(({ name, Icon }, index) => (
                <div key={`${name}-${index}`} className="flex shrink-0 items-center gap-3 text-white/70">
                  <Icon className="text-2xl text-[#FFB627] lg:text-7xl" />
                  <span className="text-lg font-semibold tracking-tight lg:text-4xl">{name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
